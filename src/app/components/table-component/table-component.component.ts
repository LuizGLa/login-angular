import { Component, input, Input } from '@angular/core';
import { CardModulesComponent } from '../card-modules/card-modules.component';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from '../../shared/material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-table-component',
  standalone: true,
  imports: [
    CardModulesComponent,
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  providers: [DatePipe],
  templateUrl: './table-component.component.html',
  styleUrl: './table-component.component.scss'
})
export class TableComponentComponent {
  @Input() rotaAdicionar!: string;
  @Input() nameButton!: string;
  @Input() columns: string[] = [];
  @Input() dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @Input() columnTitles: { [key: string]: string } = {};
  @Input() columnPipes: { [key: string]: { pipe: any, params: any[] } } = {};

  constructor(private datePipe: DatePipe) { }

  getColumnTitle(column: string): string {
    return this.columnTitles[column] || column;
  }

  getCellValue(column: string, element: any): any {
    let value = element;
    column.split('.').forEach(part => {
      if (value) {
        value = value[part];
      }
    });

    if (this.columnPipes[column]) {
      const { pipe, params } = this.columnPipes[column];
      if (pipe === 'date') {
        return this.datePipe.transform(value, ...params);
      }
    }
    return value;
  }
}
