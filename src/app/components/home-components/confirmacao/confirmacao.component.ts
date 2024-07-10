import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../shared/material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacao',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './confirmacao.component.html',
  styleUrl: './confirmacao.component.scss'
})
export class ConfirmacaoComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public mensagem: string
  ) { }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
