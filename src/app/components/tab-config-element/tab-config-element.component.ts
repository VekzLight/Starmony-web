import { Component, OnInit } from '@angular/core';
import { Chord } from 'src/app/interfaces/chord.interface';
import { ConcreteScale } from 'src/app/interfaces/concreteScale.interface';
import { ElementsContainerService } from 'src/app/services/elements-container.service';
import { SeekerResultElementsService } from 'src/app/services/seeker-result-elements.service';
import { SignalsService } from 'src/app/services/signals.service';
import * as _ from 'lodash'; 

@Component({
  selector: 'app-tab-config-element',
  templateUrl: './tab-config-element.component.html',
  styleUrls: ['./tab-config-element.component.scss']
})
export class TabConfigElementComponent implements OnInit {


  // Simbolos de los acordes.
  types: string[] = [];
  type: string = "";
  adder: string = "";
  groupId: number;

  constructor(
    public signalsService: SignalsService,
    public elementsContainerService: ElementsContainerService,
    public seekerResultElements: SeekerResultElementsService) { }

  ngOnInit(): void {
    this.signalsService.tabFilter.setValue(0);
  }

  public selectType(type: Chord):void{
    this.seekerResultElements.filter.chordType = type;
    this.seekerResultElements.dataSourceChord.filter = JSON.stringify(this.seekerResultElements.filter);
  }

  public selectTypeInterval(type: string):void{
    let nType: number = -1;
    if(type == "Simple"){ nType = 1; }
    if(type == "Compuesto" ){ nType = 2; }

    console.log(nType);

    this.seekerResultElements.filterInterval.type = nType;
    this.seekerResultElements.dataSourceInterval.filter = JSON.stringify(this.seekerResultElements.filterInterval);
  }

  public selectDirection(type: string):void{
    let nType: number = -1;
    if(type == "Ascendente"){ nType = 1; }
    if(type == "Descendente" ){ nType = 2; }

    this.seekerResultElements.filterInterval.direction = nType;
    this.seekerResultElements.dataSourceInterval.filter = JSON.stringify(this.seekerResultElements.filterInterval);
  }

  public setSemitones(event: Event):void{
    const filterValue = (event.target as HTMLInputElement).value;
    this.seekerResultElements.filterInterval.semitones = parseInt(<string>filterValue);
    this.seekerResultElements.dataSourceInterval.filter = JSON.stringify(this.seekerResultElements.filterInterval);
  }

  public selectFirsTypeProgression(type: Chord):void{
    this.seekerResultElements.filterProgression.beginChord = type;
    this.seekerResultElements.dataSourceProgression.filter = JSON.stringify(this.seekerResultElements.filterProgression);

    if (this.seekerResultElements.dataSourceProgression.paginator) {
      this.seekerResultElements.dataSourceProgression.paginator.firstPage();
    }
  }

  public selectLastTypeProgression(type: Chord):void{
    this.seekerResultElements.filterProgression.endChord = type;
    this.seekerResultElements.dataSourceProgression.filter = JSON.stringify(this.seekerResultElements.filterProgression);
    
    if (this.seekerResultElements.dataSourceProgression.paginator) {
      this.seekerResultElements.dataSourceProgression.paginator.firstPage();
    }
  }

  public selectGroup(idTag: number):void{
    var  tagScales = this.elementsContainerService.tagScales.filter( (tagScale) => tagScale.tagDTO.id == idTag );
    this.seekerResultElements.filterScale.groupIds = tagScales.map( (tagScale) => { return tagScale.scaleDTO.id });
    this.seekerResultElements.dataSourceScale.filter = JSON.stringify(this.seekerResultElements.filterScale);
  }

  public selectGradeType(idChord: number, grade: number):void{
 
    // Filtra los grados de las escalas y verifica que la posicion y el tipo de acorde coincidan
    var scaleGrades = this.elementsContainerService.scaleGrades.filter( (scaleGrade, index) => Object.values(scaleGrade.grades).filter( (_grade, _index) => (_grade.id == idChord) && (index == _index) ).length > 0);
    this.seekerResultElements.gradeTypes[grade] = scaleGrades;

    var elements: number[] = [];

    // Obtiene los id de los ScaleGrades en un array concatenado
    for(var key in this.seekerResultElements.gradeTypes){
      elements = this.seekerResultElements.gradeTypes[key].map( scaleGrade => scaleGrade.idScaleGrade ).concat(elements);
    }

    if( Object.values(this.seekerResultElements.gradeTypes).filter( scaleGrades => scaleGrades.length > 0 ).length > 1 ) elements = _(elements).groupBy().pickBy(x => x.length > 1).keys().value().map( element => _.parseInt(element));
    else elements = elements = _(elements).groupBy().pickBy(x => x.length > 0).keys().value().map( element => _.parseInt(element));

    var scalesIds: number[] = [];
    
    for(let element of elements){
      var finded = scaleGrades.find( scaleGrade => scaleGrade.idScaleGrade == element );
      if( finded !== undefined ) scalesIds.push(finded.id);
    } 

    this.seekerResultElements.filterScale.scalesIds = scalesIds;
    this.seekerResultElements.dataSourceScale.filter = JSON.stringify(this.seekerResultElements.filterScale);
  }

  public selectTypeProgression(type: string):void{
    let ended: string[] = [];
    if(type == "Autentica"){ ended.push("V-I"); ended.push("VII-I");}
    if(type == "Plagal" ){ ended.push("IV-I"); ended.push("II-I"); }
    if(type == "Semicadencia"){ ended.push("*-V"); }
    if(type == "Rota"){ ended.push("*-II"); ended.push("*-III"); ended.push("*-IV"); ended.push("*-V"); ended.push("*-VI"); ended.push("*-VII");}

    this.seekerResultElements.filterProgression.cadence = ended;
    this.seekerResultElements.dataSourceProgression.filter = JSON.stringify(this.seekerResultElements.filterProgression);
  }
  
  public codeFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.seekerResultElements.filterScale.code = filterValue.trim().toLowerCase();
    this.seekerResultElements.dataSourceScale.filter = JSON.stringify(this.seekerResultElements.filterScale);

    if (this.seekerResultElements.dataSourceScale.paginator) {
      this.seekerResultElements.dataSourceScale.paginator.firstPage();
    }
  }

  public codeProgressionFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.seekerResultElements.filterProgression.code = filterValue.trim().toLowerCase();
    this.seekerResultElements.dataSourceProgression.filter = JSON.stringify(this.seekerResultElements.filterProgression);

    if (this.seekerResultElements.dataSourceProgression.paginator) {
      this.seekerResultElements.dataSourceProgression.paginator.firstPage();
    }
  }
  
  
  
  public selectAdder(adder: string):void{
    let adderNumber = -1;
    let min = 1;
    let max = 12;
    if(adder == "-"){ adderNumber = -1;}
    if(adder == "Triada"){ adderNumber = 3; min = 3; max = 3; }
    if(adder == "Septima")  {adderNumber = 4;  min = 4; max = 4; }
    if(adder == "Novena")   {adderNumber = 5;  min = 5; max = 5; }
    if(adder == "Treceava") {adderNumber = 6;  min = 6; max = 6; }

    this.seekerResultElements.filter.adders = adderNumber;
    this.seekerResultElements.filter.min = min;
    this.seekerResultElements.filter.max = max;
    
    this.seekerResultElements.dataSourceChord.filter = JSON.stringify(this.seekerResultElements.filter);
  }

  public selectNumberChords(numberChords: string):void{
    let adderNumber = -1;
    let min = 1;
    let max = 12;

    if(numberChords == "2"){ adderNumber = 2;  min = 2; max = 2; }
    if(numberChords == "3"){ adderNumber = 3; min = 3; max = 3; }
    if(numberChords == "4"){adderNumber = 4;  min = 4; max = 4; }
    if(numberChords == "5"){adderNumber = 5;  min = 5; max = 5; }
    if(numberChords == "6"){adderNumber = 6;  min = 6; max = 6; }
    if(numberChords == "7"){adderNumber = 7;  min = 7; max = 7; }
    if(numberChords == "8"){adderNumber = 8;  min = 8; max = 8; }
    if(numberChords == "9"){adderNumber = 9;  min = 9; max = 9; }
    if(numberChords == "10"){adderNumber = 10;  min = 10; max = 10; }
    if(numberChords == "10+"){adderNumber = 11;  min = 10; max = 100;}

    console.log(adderNumber, min, max);

    this.seekerResultElements.filterProgression.nChords = adderNumber;
    this.seekerResultElements.filterProgression.min = min;
    this.seekerResultElements.filterProgression.max = max;
    
    this.seekerResultElements.dataSourceProgression.filter = JSON.stringify(this.seekerResultElements.filterProgression);
  }
}
