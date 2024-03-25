import { Component, Inject } from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SphereData } from '../../interface/SphereData';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-sphere-dialog-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './sphere-dialog-form.component.html',
  styleUrl: './sphere-dialog-form.component.scss',
})
export class SphereDialogFormComponent {
  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<SphereDialogFormComponent>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: SphereData
  ) {
    console.log(data.action);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  sphereFormGroup = this._formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    type: [this.data.type, Validators.required],
  });

  onSubmit(): void {
    if (this.sphereFormGroup.valid) {
      this.apiService.create(this.sphereFormGroup.value).subscribe((result) => {
        this.onNoClick();
      });
    }
  }
}
