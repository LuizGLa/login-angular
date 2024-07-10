import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CardModulesComponent } from '../card-modules/card-modules.component';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from '../../shared/material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { RouterModule, Router } from '@angular/router';

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
  styleUrls: ['./table-component.component.scss']
})
export class TableComponentComponent implements OnInit {
  @Input() rotaAdicionar!: string;
  @Input() nameButton!: string;
  @Input() columns: string[] = [];
  @Input() dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @Input() set columnTitles(value: { [key: string]: string }) {
    this._columnTitles = value;
    this.updateDisplayedColumns();
  }
  @Input() columnPipes: { [key: string]: { pipe: string, params: any[] } } = {};
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  displayedColumns!: string[];

  private _columnTitles: { [key: string]: string } = {};

  constructor(private datePipe: DatePipe, private router: Router) { }

  ngOnInit() {
    this.updateDisplayedColumns();
  }

  private updateDisplayedColumns() {
    this.displayedColumns = [...this.columns];
    const currentUrl = this.router.url;

    if (currentUrl !== '/usuarios') {
      this.displayedColumns.push('actions');
    }
  }

  get columnTitles(): { [key: string]: string } {
    return this._columnTitles;
  }

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

  editElement(element: any) {
    this.edit.emit(element);
  }

  deleteElement(element: any) {
    this.delete.emit(element);
  }
}
