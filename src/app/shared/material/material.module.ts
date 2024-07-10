import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDialogModule,
  ],
  exports: [
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
  ]
})
export class MaterialModule { }
