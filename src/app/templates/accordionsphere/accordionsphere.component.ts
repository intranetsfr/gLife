import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-accordion-sphere',
  standalone: true,
  imports: [
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
  templateUrl: './accordionsphere.component.html',
  styleUrl: './accordionsphere.component.scss',
})
export class AccordionSphereComponent {
  @Input() item: any;

  @Output() itemDeleted = new EventEmitter();
  constructor(public dialog: MatDialog, private apiService:ApiService){

  }
  deleteItem(id: number) {

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '33%',
      disableClose: true,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.apiService.delete(id).subscribe(resultDelete=>{
          if(resultDelete){
            console.log(resultDelete);
            this.itemDeleted.emit();
          }
        })
      }
    });
  }

}
