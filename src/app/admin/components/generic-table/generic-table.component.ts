import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css']
})
export class GenericTableComponent<T extends Record<string, any>> {
  @Input() tableData: T[] = [];
  @Input() columnHeader: { [key: string]: string } = {};

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  objectKeys = Object.keys;
  dataSource = new MatTableDataSource<T>();

  globalFilterValue: string = '';
  selectedGenders: string[] = [];
  selectedPackages: string[] = [];

  showGenderFilter: boolean = false;
  showPackageFilter: boolean = false;

  constructor() { }

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

      const columns = Object.keys(this.columnHeader);
      this.showGenderFilter = columns.includes('gender');
      this.showPackageFilter = columns.includes('package');
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    this.globalFilterValue = (event.target as HTMLInputElement).value;
    this.updateFilter();
  }

  get uniqueGenders(): string[] {
    return [...new Set(this.tableData.map(row => row['gender']).filter(Boolean))];
  }

  get uniquePackages(): string[] {
    return [...new Set(this.tableData.map(row => row['package']).filter(Boolean))];
  }

  updateFilter() {
    this.dataSource.filter = JSON.stringify({
      globalFilter: this.globalFilterValue,
      genderFilters: this.selectedGenders,
      packageFilters: this.selectedPackages
    });

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createFilter(): (data: T, filter: string) => boolean {
    return (data: T, filter: string): boolean => {
      const search = JSON.parse(filter);
      const globalFilter = search.globalFilter?.toLowerCase() || '';
      const genderFilters: string[] = search.genderFilters || [];
      const packageFilters: string[] = search.packageFilters || [];

      const matchesGlobal = !globalFilter || Object.keys(this.columnHeader).some(column => {
        const value = data[column as keyof T]?.toString().toLowerCase();
        return value?.includes(globalFilter);
      });

      const genderMatch = genderFilters.length === 0 || genderFilters.includes(data['gender']?.toString());
      const packageMatch = packageFilters.length === 0 || packageFilters.includes(data['package']?.toString());

      return matchesGlobal && genderMatch && packageMatch;
    };
  }

  clearFilters() {
    this.globalFilterValue = '';
    this.selectedGenders = [];
    this.selectedPackages = [];
    this.updateFilter();
  }
}
