import { Component, OnInit } from '@angular/core';
import { AnalyzerService } from 'src/app/services/analyzer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public analyzer: AnalyzerService) {
    analyzer.getIntervarWithSemitone(3).subscribe((res: any) => {
      console.log(res);
    });;
  }

  ngOnInit(): void {
  }

}
