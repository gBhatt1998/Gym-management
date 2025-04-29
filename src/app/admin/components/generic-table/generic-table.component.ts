import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css']
})
export class GenericTableComponent<T> {
  @Input() tableData: T[] = [];
  @Input() columnHeader: { [key: string]: string } = {};
  
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  objectKeys = Object.keys;
  dataSource = new MatTableDataSource<T>();
  columnFilters: { [key: string]: string } = {};

  constructor() {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tableData'] && this.tableData) {
      this.dataSource = new MatTableDataSource(this.tableData);
      this.dataSource.filterPredicate = this.createFilter();
      if (this.paginator) this.dataSource.paginator = this.paginator;
      if (this.sort) this.dataSource.sort = this.sort;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

 

// Current filter values
globalFilterValue: string = '';
columnFilterValues: { [key: string]: string } = {};

//  global filter
applyFilter(event: Event) {
  this.globalFilterValue = (event.target as HTMLInputElement).value;
  this.updateFilter();
}

//  column filter
applyColumnFilter(event: Event, columnName: string) {
  this.columnFilterValues[columnName] = (event.target as HTMLInputElement).value;
  this.updateFilter();
}


updateFilter() {
  this.dataSource.filter = JSON.stringify({
    globalFilter: this.globalFilterValue,
    columnFilters: this.columnFilterValues
  });

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

 
createFilter(): (data: T, filter: string) => boolean {
  return (data: T, filter: string): boolean => {
    const search = JSON.parse(filter);
    console.log(search)
    const globalFilter = search.globalFilter;
    const columnFilters = search.columnFilters;

    // Global filter matches any column
    const matchesGlobalFilter = !globalFilter || 
      Object.keys(this.columnHeader).some(column => {
        const value = data[column as keyof T]?.toString().toLowerCase();
        return value?.includes(globalFilter);
      });

    // Column specific filters
    const matchesColumnFilters = Object.keys(columnFilters).every(column => {
      const columnFilter = columnFilters[column];
     
      
      const value = data[column as keyof T]?.toString().toLowerCase();
      return value?.includes(columnFilter);
    });

    return matchesGlobalFilter && matchesColumnFilters;
  };
}


clearFilters() {
  this.globalFilterValue = '';
  this.columnFilterValues = {};
  
  // Clear input 
  const globalFilterInput = document.querySelector('.global-filter input') as HTMLInputElement;
  if (globalFilterInput) globalFilterInput.value = '';
  
  const columnFilterInputs = document.querySelectorAll('.column-filter input');
  columnFilterInputs.forEach(input => (input as HTMLInputElement).value = '');
  
  this.updateFilter();
}
}