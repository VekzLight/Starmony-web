import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  message: String = "";
  messageLogin: String = "";
  userData: User ={
    id: -1,
    username: "",
    password: "",
    email:""
  };
  
  passwordConfirm: string = "";
  activeForm: boolean;
  token: any;
  
  constructor(
    private userService: UserService,
    private router: Router,
    private routerActivated: ActivatedRoute) {
    this.activeForm = false;
   }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null) this.router.navigate(['/home/elements_selector']);
    if(this.routerActivated.snapshot.params['type'] == 'registrar'){
      this.changeActive();
    }
  }

  changeActive () {
    this.activeForm = !this.activeForm;
  }

  loginUser(){
    this.userService.login(this.userData).subscribe((resp:any)=>{
      if(resp.type != 1){
        this.messageLogin = resp.message;
      } else {
        this.token = resp.message;
        localStorage.setItem('token', this.token);
        localStorage.setItem('username', this.userData.username);
        this.router.navigate(['/home/elements_selector']);
      }
    });
  }

  registrarUsuario(){
    if(this.passwordConfirm != this.userData.password){
      this.message = "Las contraseñas no son iguales."
      return;
    }
    this.userService.register(this.userData).subscribe((resp:any)=>{
      if(resp.type != 1){
        this.message = resp.message;
      } else {
        this.token = resp;
        localStorage.setItem('token', this.token);
        this.message = "Usuario Registrado. Puede Iniciar Session."
      }
    });
  }
}