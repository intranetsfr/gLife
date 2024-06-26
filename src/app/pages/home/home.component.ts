import { Component } from '@angular/core';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { SphereDialogFormComponent } from '../../templates/sphere-dialog-form/sphere-dialog-form.component';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccordionSphereComponent } from '../../templates/accordionsphere/accordionsphere.component';
import { SphereData } from '../../interface/SphereData';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AccordionSphereComponent,
    CommonModule,
    CdkDropList,
    FormsModule,
    CdkDrag,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatTabsModule,
    MatIconModule,
    MatExpansionModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  panelOpenState = false;
  travails = [];
  persos = [];
  relations = [];
  spheres = [];

  constructor(public dialog: MatDialog, private apiService: ApiService) {}

  ngOnInit(): void {
    this.getAllResources();
  }
  getAllResources(): void {
    this.apiService.getAll().subscribe(
      (data: any) => {
        this.travails = data.travails;
        this.persos = data.persos;
        this.relations = data.relations;
      },
      (error) => {
        console.error('Erreur lors de la récupération des ressources :', error);
        // Vous pouvez gérer les erreurs ici
      }
    );
  }
  openDialog(type_selected: string): void {
    const dialogRef = this.dialog.open(SphereDialogFormComponent, {
      width: '75%',
      disableClose: true,
      data: { type: type_selected, action: 'insert' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllResources();
      }
    });
  }
  openDialogEdit(item: SphereData) {
    const dialogRef = this.dialog.open(SphereDialogFormComponent, {
      width: '75%',
      disableClose: true,
      data: {
        type: item.type,
        action: 'update',
        id: item.id,
        title: item.title,
        description: item.description,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllResources();
      }
      console.log(result);
    });
  }
  drop(event: CdkDragDrop<string[]>, items: any, type: string) {
    moveItemInArray(items, event.previousIndex, event.currentIndex);
    // Mettre à jour les index dans le tableau d'objets
    items.forEach((item: SphereData, index: number) => {
      item.index = index;
    });
    let newOrder = items.map((item: { id: any; index: any }) => ({
      id: item.id,
      index: item.index,
    }));
    this.apiService
      .updateIndex({ index: newOrder, type: type })
      .subscribe((result) => {});
  }
}
