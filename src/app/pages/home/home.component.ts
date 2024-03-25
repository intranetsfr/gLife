import { Component } from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CdkDropList, CdkDrag, MatCardModule, MatButtonModule, MatTooltipModule, MatTabsModule,MatIconModule,MatExpansionModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  panelOpenState = false;
  spheres = [
    {
      label:"Etape 1",
      type: "travail",
      description: "rekjnfz erkjnzerkjn flzerkjn ",
      allowDrag: false
    },
    {
      label:"Etape 2",
      type: "perso",
      description: "rekjnfz erkjnzerkjn flzerkjn ",
      allowDrag: false
    },{
      label:"Etape 3",
      type: "relations",
      description: "rekjnfz erkjnzerkjn flzerkjn ",
      allowDrag: false
    }
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.spheres, event.previousIndex, event.currentIndex);
  }
}
