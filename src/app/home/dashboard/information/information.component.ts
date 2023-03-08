import { Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ExcelData } from 'src/app/interfaces/excel-data';

 

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})


export class InformationComponent implements OnInit, OnChanges {
  @Input('rows') rows : ExcelData[] = [];
  displayedColumns: string[] = ['date', 'city', 'population', 'death' , 'numbers'];
  
  dataSource = new MatTableDataSource<ExcelData>(this.rows);
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize: number = 5;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  constructor() { }
 
  ngOnChanges(changes: SimpleChanges): void {
    const EMPTY = 0;
    const rows = changes['rows'];
    if (
      !rows.firstChange ||
      rows.previousValue?.length === EMPTY ||
      rows.currentValue.length !== this.rows.length
    ) {
      this.dataSource.data = this.rows;
      this.dataSource.paginator = this.paginator;
      this.table.renderRows();
    }
  }

  getPercent(row: ExcelData){ 
     return ((row.numberOfDeath / row.Population) * 100).toFixed(2)
    
  }

  ngOnInit(): void {   }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
