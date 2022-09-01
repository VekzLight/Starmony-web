import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { ConcreteChord } from 'src/app/interfaces/concreteChord.interface';
import { ConcreteInterval } from 'src/app/interfaces/concreteInterval.interface';
import { ConcreteProgression } from 'src/app/interfaces/concreteProgression.interface';
import { ConcreteScale } from 'src/app/interfaces/concreteScale.interface';
import { AnalyzerService } from 'src/app/services/analyzer.service';
import { ElementsContainerService } from 'src/app/services/elements-container.service';
import { SeekerResultElementsService } from 'src/app/services/seeker-result-elements.service';
import { SignalsService } from 'src/app/services/signals.service';
import { UserService } from 'src/app/services/user.service';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-select-elements',
  templateUrl: './select-elements.component.html',
  styleUrls: ['./select-elements.component.scss']
})
export class SelectElementsComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;

  idConcreteChordSelected: number = -1;
  idConcreteScaleSelected: number = -1;
  idConcreteProgressionSelected: number = -1;
  idConcreteIntervalSelected: number = -1;

  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'},
    ],
  };

  allComplete: boolean = false;

  constructor(
    public seekerResultElementsService: SeekerResultElementsService,
    private elementsContainerService: ElementsContainerService,
    private analyzerService: AnalyzerService,
    private signalsService: SignalsService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  getGrades(concreteGrades: {[key: string]: ConcreteChord}):string{
    var stringCode = "";
    for( var key in concreteGrades )
      stringCode += concreteGrades[key].tonic.symbol + concreteGrades[key].symbol + " - ";
    
    
    return stringCode.slice(0,-2);
  }

  public setAllChords(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }

  public selectConcreteChord(idConcreteChord: number){ this.deselectedAll(); this.idConcreteChordSelected = idConcreteChord; }
  public selectConcreteScale(idConcreteScale: number){ this.deselectedAll();this.idConcreteScaleSelected = idConcreteScale; }
  public selectConcreteProgression(idConcreteProgression: number){ this.deselectedAll();this.idConcreteProgressionSelected = idConcreteProgression; }
  public selectConcreteInterval(idConcreteInterval: number){ this.deselectedAll();this.idConcreteIntervalSelected = idConcreteInterval; }

  
  public isSelectedChord(id: number):boolean{return this.elementsContainerService.musicalElementsAnalized.concreteChordIds.includes(id) }
  public isSelectedScale(id: number):boolean{return this.elementsContainerService.musicalElementsAnalized.concreteScaleIds.includes(id) }
  public isSelectedProgression(id: number):boolean{return this.elementsContainerService.musicalElementsAnalized.concreteProgressionIds.includes(id) }
  public isSelectedInterval(id: number):boolean{return this.elementsContainerService.musicalElementsAnalized.concreteIntervalIds.includes(id) }

  private deselectedAll():void{
    this.idConcreteChordSelected = -1;
    this.idConcreteScaleSelected = -1;
    this.idConcreteProgressionSelected = -1;
    this.idConcreteIntervalSelected = -1;
  }

  public checkInterval(id: number):void{ 
    if(!this.elementsContainerService.musicalElementsAnalized.concreteIntervalIds.includes(id)) this.elementsContainerService.addConcreteIntervalME(id);
    else this.elementsContainerService.removeConcreteIntervaldME(id);
  }
  public checkProgression(id: number):void{
    if(!this.elementsContainerService.musicalElementsAnalized.concreteProgressionIds.includes(id))  this.elementsContainerService.addConcreteProgressionME(id);
    else this.elementsContainerService.removeConcreteProgressionME(id);
  }
  public checkScale(id: number):void{ 
    if(!this.elementsContainerService.musicalElementsAnalized.concreteScaleIds.includes(id)) this.elementsContainerService.addConcreteScaleME(id);
    else this.elementsContainerService.removeConcreteScaleME(id);
  }
  public checkChord(id: number):void{ 
    if(!this.elementsContainerService.musicalElementsAnalized.concreteChordIds.includes(id)) this.elementsContainerService.addConcreteChordME(id);
    else this.elementsContainerService.removeConcreteChordME(id);
  }


  public addChordCollection(element: ConcreteChord):void{
    this.userService.addChord(element.id_concrete_chord).subscribe( (resp: any) => {
      this.elementsContainerService.userConcreteChords.push( resp );
    });
  }
  public addIntervalCollection(element: ConcreteInterval):void{
    this.userService.addInterval(element.id_concrete_interval).subscribe( (resp: any) => {
      this.elementsContainerService.userConcreteIntervals.push( resp );
    });
  }
  public addScaleCollection(element: ConcreteScale):void{
    this.userService.addScale(element.id_concrete_scale).subscribe( (resp: any) => {
      this.elementsContainerService.userConcreteScales.push( resp );
    });
  }
  public addProgressionCollection(element: ConcreteProgression):void{
    this.userService.addProgression(element.id_concrete_progression).subscribe( (resp: any) => {
      this.elementsContainerService.userConcreteProgressions.push( resp );
    });
  }




  public upToneChord(concreteChord: ConcreteChord):void{
    let index = this.seekerResultElementsService.selectedChords.findIndex( _concreteChord => _concreteChord.id_concrete_chord == concreteChord.id_concrete_chord );
    let idNote = concreteChord.tonic.id == 12 ? 1 : concreteChord.tonic.id + 1;
    let concreteChordRes = this.elementsContainerService.concreteChords.find( _concreteChord => (_concreteChord.id == concreteChord.id) && ( _concreteChord.tonic.id == idNote));
    if(concreteChordRes)
      this.seekerResultElementsService.selectedChords[index] = concreteChordRes;
      console.log(index, concreteChord.tonic.id, idNote, concreteChordRes);
  }
  
  public downToneChord(concreteChord: ConcreteChord):void{
    let index = this.seekerResultElementsService.selectedChords.findIndex( _concreteChord => _concreteChord.id_concrete_chord == concreteChord.id_concrete_chord );
    let idNote = concreteChord.tonic.id == 1 ? 12 : concreteChord.tonic.id - 1;
    let concreteChordRes = this.elementsContainerService.concreteChords.find( _concreteChord => (_concreteChord.id == concreteChord.id) && ( _concreteChord.tonic.id == idNote));
    if(concreteChordRes)
      this.seekerResultElementsService.selectedChords[index] = concreteChordRes;
  }

  public upToneScale(concreteScale: ConcreteScale):void{
    let index = this.seekerResultElementsService.selectedScales.findIndex( _concreteScale => _concreteScale.id_concrete_scale == concreteScale.id_concrete_scale );
    let idNote = concreteScale.tonic.id == 12 ? 1 : concreteScale.tonic.id + 1;
    let concreteScaleRes = this.elementsContainerService.concreteScales.find( _concreteScale => (_concreteScale.id == concreteScale.id) && ( _concreteScale.tonic.id == idNote));
    if(concreteScaleRes)
      this.seekerResultElementsService.selectedScales[index] = concreteScaleRes;
  }
  
  public downToneScale(concreteScale: ConcreteScale):void{
    let index = this.seekerResultElementsService.selectedScales.findIndex( _concreteScale => _concreteScale.id_concrete_scale == concreteScale.id_concrete_scale );
    let idNote = concreteScale.tonic.id == 1 ? 12 : concreteScale.tonic.id - 1;
    let concreteScaleRes = this.elementsContainerService.concreteScales.find( _concreteScale => (_concreteScale.id == concreteScale.id) && ( _concreteScale.tonic.id == idNote));
    if(concreteScaleRes)
      this.seekerResultElementsService.selectedScales[index] = concreteScaleRes;
  }


  public analizeChord(concreteChord: ConcreteChord, type: boolean):void{
    this.analyzerService.analizeConcreteChord(concreteChord.id_concrete_chord).subscribe( resp => {
      localStorage.setItem("chordAnalized", JSON.stringify(concreteChord));
      localStorage.setItem("chordAnalizedResp", JSON.stringify(resp));
      localStorage.setItem("typeElementAnalized", "chord");
      this.elementsContainerService.chordAnalizedResp = resp;
      this.elementsContainerService.chordAnalized = concreteChord;
      this.signalsService.typeElementAnalized = "chord";
      this.router.navigate(['/home/analizer']);
    });
  }

  public analizeScale(concreteScale: ConcreteScale, type: boolean):void{
    this.analyzerService.analizeConcreteScale(concreteScale.id_concrete_scale).subscribe( resp => {

      localStorage.setItem("scaleAnalized", JSON.stringify(concreteScale));
      localStorage.setItem("scaleAnalizedResp", JSON.stringify(resp));
      localStorage.setItem("typeElementAnalized", "scale");

      this.elementsContainerService.scaleAnalizedResp = resp;
      this.elementsContainerService.scaleAnalized = concreteScale;
      this.signalsService.typeElementAnalized = "scale";
      this.router.navigate(['/home/analizer']);
    });
  }

  public analizeProgression(concreteProgression: ConcreteProgression, type: boolean):void{
    let concreteScale = this.elementsContainerService.concreteScales.find( concreteScale => concreteScale.id_concrete_scale == concreteProgression.id_concrete_scale );
    if(concreteScale)
    this.analyzerService.analizeConcreteScale(concreteScale.id_concrete_scale).subscribe( resp => {

      localStorage.setItem("scaleAnalizedResp", JSON.stringify(resp));

      localStorage.setItem("scaleAnalized", JSON.stringify( concreteScale ));
      localStorage.setItem("progressionAnalized", JSON.stringify(concreteProgression));
      localStorage.setItem("typeElementAnalized", "progression");
  
      if(concreteScale)
        this.elementsContainerService.scaleAnalized = concreteScale;
      this.elementsContainerService.progressionAnalized = concreteProgression;
      this.signalsService.typeElementAnalized = "progression";
      this.router.navigate(['/home/analizer']);
    });



  }

}
