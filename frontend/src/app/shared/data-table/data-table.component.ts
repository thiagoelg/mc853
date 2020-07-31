
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ContentChild, Input, OnInit, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface TableAction {
  name: string,
  label: string,
  icon?: string
}

export interface TableEmittedAction {
  action: string,
  element: any
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DataTableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() columnNames: any = { id: 'Número', name: 'Nome' };
  @Input() pageSizeOptions = [5, 10, 25, 100];
  @Input() actions: Array<TableAction> = [];
  
  @Output() onAction: EventEmitter<TableEmittedAction> = new EventEmitter();

  displayedColumns: string[] = [];

  @ContentChild(TemplateRef) templateRef;
  dataSource: MatTableDataSource<any>;

  expandedElement: any | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.displayedColumns = Object.keys(this.columnNames);
    if (this.actions.length) {
      this.displayedColumns.push('actions');
    }
    this.dataSource.data = this.data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    console.log(this.actions);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
