import { Component, ViewChild } from '@angular/core';
import { DndClass } from '../../models/dnd-class';
import { DndApiService } from '../../services/dnd-api.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ProgressSpinnerOverlayComponent } from '../progress-spinner-overlay/progress-spinner-overlay.component';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent {
  classes: DndClass[] = [];
  // table variables
  columnsToDisplay = ['name', 'hit_dice', 'prof_saving_throws', 'prof_armor', 'prof_weapons'];
  dataSource = new MatTableDataSource<DndClass>();
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(private dndApiService: DndApiService,
    private toastr: ToastrService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getClasses();
  }

  async getClasses(): Promise<any> {
    let dialogRef: MatDialogRef<ProgressSpinnerOverlayComponent> = this.dialog.open(ProgressSpinnerOverlayComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
    this.classes = await this.dndApiService.getClasses();
    dialogRef.close();
    this.dataSource.data = this.classes;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (dndClass: DndClass, columnName: string): string | number => {
      if (columnName == "hit_dice") {
        try {
          let lastTwoChars = dndClass.hit_dice.slice(dndClass.hit_dice.length - 2, dndClass.hit_dice.length);
          let numFromLastTwo = lastTwoChars.replace(/[^0-9]/g, '');
          return Number(numFromLastTwo);
        } catch (err) {
          this.toastr.error(`Error sorting hit dice: ${err}`);
        }
      }
      var columnValue = dndClass[columnName as keyof DndClass] as string;
      return columnValue;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
