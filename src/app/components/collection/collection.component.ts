import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConcreteChord } from 'src/app/interfaces/concreteChord.interface';
import { ConcreteInterval } from 'src/app/interfaces/concreteInterval.interface';
import { ConcreteProgression } from 'src/app/interfaces/concreteProgression.interface';
import { ConcreteScale } from 'src/app/interfaces/concreteScale.interface';
import { AnalyzerService } from 'src/app/services/analyzer.service';
import { ElementsContainerService } from 'src/app/services/elements-container.service';
import { SeekerResultElementsService } from 'src/app/services/seeker-result-elements.service';
import { SignalsService } from 'src/app/services/signals.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {


  idConcreteChordSelected: number = -1;
  idConcreteScaleSelected: number = -1;
  idConcreteProgressionSelected: number = -1;
  idConcreteIntervalSelected: number = -1;

  userConcreteChords: ConcreteChord[] = []
  userConcreteIntervals: ConcreteInterval[] = []
  userConcreteScales: ConcreteScale[] = []
  userConcreteProgressions: ConcreteProgression[] = []

  constructor(
    public elementsContainerService: ElementsContainerService,
    public analyzerService:AnalyzerService,
    public seekerResultElementsService:SeekerResultElementsService,
    public signalsService: SignalsService,
    public router: Router
  ) {

  }

  ngOnInit(): void {
    this.userConcreteChords =       this.elementsContainerService.concreteChords.filter( _it => this.elementsContainerService.userConcreteChords.includes( _it.id_concrete_chord ) ) 
    this.userConcreteIntervals =    this.elementsContainerService.concreteIntervals.filter( _it => this.elementsContainerService.userConcreteIntervals.includes( _it.id_concrete_interval ) ) 
    this.userConcreteScales =       this.elementsContainerService.concreteScales.filter( _it => this.elementsContainerService.userConcreteScales.includes( _it.id_concrete_scale ) ) 
    this.userConcreteProgressions = this.elementsContainerService.concreteProgressions.filter( _it => { return this.elementsContainerService.userConcreteProgressions.includes( _it.id_concrete_progression ) }) 
  
  }

  getGrades(concreteGrades: {[key: string]: ConcreteChord}):string{
    var stringCode = "";
    for( var key in concreteGrades )
      stringCode += concreteGrades[key].tonic.symbol + concreteGrades[key].symbol + " - ";
  
    return stringCode.slice(0,-2);
  }

  public selectConcreteChord(idConcreteChord: number){ this.deselectedAll(); this.idConcreteChordSelected = idConcreteChord; }
  public selectConcreteScale(idConcreteScale: number){ this.deselectedAll(); this.idConcreteScaleSelected = idConcreteScale; }
  public selectConcreteProgression(idConcreteProgression: number){ this.deselectedAll(); this.idConcreteProgressionSelected = idConcreteProgression; }
  public selectConcreteInterval(idConcreteInterval: number){ this.deselectedAll(); this.idConcreteIntervalSelected = idConcreteInterval; }

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
        this.elementsContainerService.scaleAnalizedResp = resp;
      });


    localStorage.setItem("scaleAnalized", JSON.stringify( concreteScale ));
    localStorage.setItem("progressionAnalized", JSON.stringify(concreteProgression));
    localStorage.setItem("typeElementAnalized", "progression");

    if(concreteScale)
      this.elementsContainerService.scaleAnalized = concreteScale;
    this.elementsContainerService.progressionAnalized = concreteProgression;
    this.signalsService.typeElementAnalized = "progression";
    this.router.navigate(['/home/analizer']);
  }


}
