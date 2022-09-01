import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Chord } from 'src/app/interfaces/chord.interface';
import { ConcreteChord } from 'src/app/interfaces/concreteChord.interface';
import { ConcreteInterval } from 'src/app/interfaces/concreteInterval.interface';
import { ConcreteProgression } from 'src/app/interfaces/concreteProgression.interface';
import { ConcreteScale } from 'src/app/interfaces/concreteScale.interface';
import { Interval } from 'src/app/interfaces/interval.interface';
import { Progression } from 'src/app/interfaces/progression.interface';
import { Scale } from 'src/app/interfaces/scale.interface';
import { AnalyzerService } from 'src/app/services/analyzer.service';
import { ElementsContainerService } from 'src/app/services/elements-container.service';
import { InterceptorLoaderService } from 'src/app/services/interceptor-loader.service';
import { SeekerResultElementsService } from 'src/app/services/seeker-result-elements.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-awaiting',
  templateUrl: './awaiting.component.html',
  styleUrls: ['./awaiting.component.scss']
})
export class AwaitingComponent implements OnInit {

  completed: boolean = false;
  type: string = "";
  element: string = "";

  constructor(
    private elementsContainerService: ElementsContainerService,
    private seekerResultElementsService: SeekerResultElementsService,
    private analyzerService: AnalyzerService,
    private userService: UserService,
    public interceptorLoaderService: InterceptorLoaderService) { }

  ngOnInit(): void {
    if( localStorage.getItem("savedData") == "true") this.restoreData()
    else this.loadData();
  }

  private restoreData():void{
    this.type = "Restaurando ";
    this.element = "notas";
    this.elementsContainerService.notes   = JSON.parse( localStorage.getItem("notes") || '{}');
    
    this.element = "acordes";
    this.elementsContainerService.chords  = JSON.parse( localStorage.getItem("chords") || '{}');
    this.elementsContainerService.concreteChords  = JSON.parse( localStorage.getItem("concreteChords") || '{}');
    this.seekerResultElementsService.selectedChords = JSON.parse( localStorage.getItem("concreteChordsSelecteds") || '[]');

    
    this.element = "escalas";
    this.elementsContainerService.scales  = JSON.parse( localStorage.getItem("scales") || '{}');
    this.elementsContainerService.concreteScales  = JSON.parse( localStorage.getItem("concreteScales") || '{}');
    this.seekerResultElementsService.selectedScales = JSON.parse( localStorage.getItem("concreteScalesSelecteds") || '[]');
    
    this.element = "intervalos";
    this.elementsContainerService.intervals   = JSON.parse( localStorage.getItem("intervals") || '{}');
    this.elementsContainerService.concreteIntervals   = JSON.parse( localStorage.getItem("concreteIntervals") || '{}');
    this.seekerResultElementsService.selectedIntervals = JSON.parse( localStorage.getItem("concreteIntervalsSelecteds") || '[]');
    
    this.element = "progresiones";
    this.elementsContainerService.progressions = JSON.parse( localStorage.getItem("progressions") || '{}');
    this.elementsContainerService.concreteProgressions = JSON.parse( localStorage.getItem("concreteProgressions") || '{}');
    this.seekerResultElementsService.selectedProgressions = JSON.parse( localStorage.getItem("concreteProgressionsSelecteds") || '[]');

    this.element = "tags"
    this.elementsContainerService.tagScales = JSON.parse( localStorage.getItem("tagScales") || '{}' );
    this.elementsContainerService.tagProgressions = JSON.parse( localStorage.getItem("tagProgressions") || '{}' );
    this.elementsContainerService.tags = JSON.parse(localStorage.getItem("tags") || '{}');

    this.element = "Grados"
    this.elementsContainerService.scaleGrades = JSON.parse(localStorage.getItem("scaleGrades") || '{}');
    this.elementsContainerService.concreteScaleGrades = JSON.parse(localStorage.getItem("concreteScaleGrades") || '{}');

    this.element = "Colección"
    this.elementsContainerService.userConcreteIntervals = JSON.parse( localStorage.getItem("userConcreteIntervals") || '[]');
    this.elementsContainerService.userConcreteChords    = JSON.parse( localStorage.getItem("userConcreteChords") || '[]');
    this.elementsContainerService.userConcreteScales    = JSON.parse( localStorage.getItem("userConcreteScales") || '[]');
    this.elementsContainerService.userConcreteProgressions  = JSON.parse( localStorage.getItem("userConcreteProgressions") || '[]');

    this.completed = true;
  }

  private loadData():void{
    this.type = "Obteniendo ";
    this.element = "notas";
    this.analyzerService.getAllNotes().subscribe( notes => { 
      this.elementsContainerService.notes = notes 
      localStorage.setItem("notes", JSON.stringify(notes));
    });
    
    this.element = "acordes";
    this.analyzerService.getAllChords().subscribe( chords => {
      chords.unshift({id: -1, symbol:"", name:"", code:""});
      this.elementsContainerService.chords = chords;
      localStorage.setItem("chords", JSON.stringify(chords));
    });
        

    this.analyzerService.getAllConcreteChords().subscribe( concreteChords => {
      this.elementsContainerService.concreteChords = concreteChords;
      localStorage.setItem("concreteChords", JSON.stringify(concreteChords));
    });

    this.element = "escalas";
    this.analyzerService.getAllScales().subscribe( scales => { 
      this.elementsContainerService.scales = scales
      localStorage.setItem("scales", JSON.stringify(scales));
    });
    
    this.analyzerService.getAllConcreteScales().subscribe( concreteScales => {
      this.elementsContainerService.concreteScales = concreteScales;
      localStorage.setItem("concreteScales", JSON.stringify(concreteScales));
    });

    this.element = "intervalos";
    this.analyzerService.getAllIntervals().subscribe( intervals => { 
      this.elementsContainerService.intervals = intervals
      localStorage.setItem("intervals", JSON.stringify(intervals));
    });

    this.analyzerService.getAllConcreteIntervals().subscribe( concreteIntervals => {
      this.elementsContainerService.concreteIntervals = concreteIntervals;
      localStorage.setItem("concreteIntervals", JSON.stringify(concreteIntervals));
    });

    this.element = "progresiones";
    this.analyzerService.getAllProgressions().subscribe( progressions => {
      this.elementsContainerService.progressions = progressions 
      localStorage.setItem("progressions", JSON.stringify(progressions));
    });

    this.analyzerService.getAllConcreteProgressions().subscribe( concreteProgressions => {
      this.elementsContainerService.concreteProgressions = concreteProgressions;
      localStorage.setItem("concreteProgressions", JSON.stringify(concreteProgressions));
    });

    this.element = "tags";
    this.analyzerService.getAllTags().subscribe( tags => {
      this.elementsContainerService.tags = tags
      localStorage.setItem("tags", JSON.stringify(tags));
    });

    this.analyzerService.getAllTagsScale().subscribe( tagScales => {
      this.elementsContainerService.tagScales = tagScales;
      localStorage.setItem("tagScales", JSON.stringify(tagScales));
    });

    this.analyzerService.getAllTagsProgression().subscribe( tagProgressions => {
      this.elementsContainerService.tagProgressions = tagProgressions;
      localStorage.setItem("tagProgressions", JSON.stringify(tagProgressions));
    });


    this.element = "Grados";
    this.analyzerService.getAllScaleGrades().subscribe( scaleGrades => {
      this.elementsContainerService.scaleGrades = scaleGrades;
      localStorage.setItem("scaleGrades", JSON.stringify(scaleGrades));
    });

    this.analyzerService.getAllConcreteScaleGrades().subscribe( concreteScaleGrades => {
      this.elementsContainerService.concreteScaleGrades = concreteScaleGrades;
      localStorage.setItem("concreteScaleGrades", JSON.stringify(concreteScaleGrades));
    });


    this.element = "Colección";
    this.userService.getAllConcreteIntervals().subscribe((resp: ConcreteInterval[])=>{
      this.elementsContainerService.userConcreteIntervals = resp.map( _it => _it.id_concrete_interval );
      localStorage.setItem("userConcreteIntervals", JSON.stringify(this.elementsContainerService.userConcreteIntervals));
    });

    this.userService.getAllConcreteChords().subscribe((resp: ConcreteChord[])=>{
      this.elementsContainerService.userConcreteChords= resp.map( _it => _it.id_concrete_chord );
      localStorage.setItem("userConcreteChords", JSON.stringify( this.elementsContainerService.userConcreteChords));
    });

    this.userService.getAllConcreteScales().subscribe((resp: ConcreteScale[])=>{
      this.elementsContainerService.userConcreteScales = resp.map( _it => _it.id_concrete_scale );
      localStorage.setItem("userConcreteScales", JSON.stringify(this.elementsContainerService.userConcreteScales));
    });

    this.userService.getAllConcreteProgressions().subscribe((resp:ConcreteProgression[])=>{
      this.elementsContainerService.userConcreteProgressions = resp.map( _it => _it.id_concrete_progression );
      localStorage.setItem("userConcreteProgressions", JSON.stringify(this.elementsContainerService.userConcreteProgressions));
    });

    localStorage.setItem("concreteChords", JSON.stringify('[]'));
    localStorage.setItem("concreteScales", JSON.stringify('[]'));
    localStorage.setItem("concreteIntervals", JSON.stringify('[]'));
    localStorage.setItem("concreteProgressions", JSON.stringify('[]'));

    this.completed = true;
    localStorage.setItem("savedData", "true");
  }

}
