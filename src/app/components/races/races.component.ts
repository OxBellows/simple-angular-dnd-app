import { Component, ViewChild } from '@angular/core';
import { Race } from '../../models/race';
import { DndApiService } from '../../services/dnd-api.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ProgressSpinnerOverlayComponent } from '../progress-spinner-overlay/progress-spinner-overlay.component';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent {
  races: Race[] = [];
  // table variables
  columnsToDisplay = ['name', 'size', 'speed', 'age'];
  dataSource = new MatTableDataSource<Race>();
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(private dndApiService: DndApiService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getRaces();
  }

  async getRaces(): Promise<any> {
    let dialogRef: MatDialogRef<ProgressSpinnerOverlayComponent> = this.dialog.open(ProgressSpinnerOverlayComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
    this.races = await this.dndApiService.getRaces();
    dialogRef.close();
    this.dataSource.data = this.races;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (race: Race, columnName: string): string => {
      if (columnName == "speed") return race.speed.walk;
      var columnValue = race[columnName as keyof Race] as string;
      return columnValue;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
