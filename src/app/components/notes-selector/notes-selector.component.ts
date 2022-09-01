import { Component, OnInit } from '@angular/core';
import { ElementsContainerService } from 'src/app/services/elements-container.service';
import { SeekerResultElementsService } from 'src/app/services/seeker-result-elements.service';

@Component({
  selector: 'app-notes-selector',
  templateUrl: './notes-selector.component.html',
  styleUrls: ['./notes-selector.component.scss']
})
export class NotesSelectorComponent implements OnInit {

  constructor(
    public seekerResultElementsService: SeekerResultElementsService,
    public elementsContainerService: ElementsContainerService) { }

  ngOnInit(): void {
  }

  
}
