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
import { MatChipsModule } from '@angular/material/chips';

import { MatTooltipModule } from '@angular/material/tooltip';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ApiService } from '../../services/api.service';
import { SphereData } from '../../interface/SphereData';

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
    MatChipsModule,
    MatExpansionModule,
  ],
  templateUrl: './accordionsphere.component.html',
  styleUrl: './accordionsphere.component.scss',
})
export class AccordionSphereComponent {
  @Input() item: any;

  @Output() itemDeleted = new EventEmitter();
  @Output() itemEditEvent: EventEmitter<SphereData> =
    new EventEmitter<SphereData>();
  constructor(public dialog: MatDialog, private apiService: ApiService) {}
  nl2br(str: string, replaceMode:boolean = true, isXhtml:boolean=true) {
    var breakTag = (isXhtml) ? '<br />' : '<br>';

    var replaceStr = (replaceMode) ? '$1'+ breakTag : '$1'+ breakTag +'$2';

    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, replaceStr);
  }
  editItem(item: SphereData) {
    this.itemEditEvent.emit(item);
  }
  deleteItem(id: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '33%',
      disableClose: true,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.delete(id).subscribe((resultDelete) => {
          if (resultDelete) {
            console.log(resultDelete);
            this.itemDeleted.emit();
          }
        });
      }
    });
  }
}
