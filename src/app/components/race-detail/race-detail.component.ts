import { Component, Input, ViewChild } from '@angular/core';
import { Race } from '../../models/race';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DndApiService } from '../../services/dnd-api.service';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ProgressSpinnerOverlayComponent } from '../progress-spinner-overlay/progress-spinner-overlay.component';

@Component({
  selector: 'app-race-detail',
  templateUrl: './race-detail.component.html',
  styleUrls: ['./race-detail.component.css']
})
export class RaceDetailComponent {
  @Input() race?: Race;

  constructor(private route: ActivatedRoute,
    private dndApiService: DndApiService,
    private location: Location,
    private dialog: MatDialog) { }

    ngOnInit(): void {
      this.getRace();
    }
    
    async getRace(): Promise<any> {
      const slug = this.route.snapshot.paramMap.get('slug');
      if (slug) {
        let dialogRef: MatDialogRef<ProgressSpinnerOverlayComponent> = this.dialog.open(ProgressSpinnerOverlayComponent, {
          panelClass: 'transparent',
          disableClose: true
        });
        this.race = await this.dndApiService.getRace(slug);
        dialogRef.close();
      }
    }

    goBack(): void {
      this.location.back();
    }
}
