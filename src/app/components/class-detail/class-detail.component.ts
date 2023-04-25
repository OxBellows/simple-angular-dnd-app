import { Component, Input } from '@angular/core';
import { DndClass } from '../../models/dnd-class';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DndApiService } from '../../services/dnd-api.service';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ProgressSpinnerOverlayComponent } from '../progress-spinner-overlay/progress-spinner-overlay.component';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.css']
})
export class ClassDetailComponent {
  @Input() class?: DndClass;

  constructor(private route: ActivatedRoute,
    private dndApiService: DndApiService,
    private location: Location,
    private dialog: MatDialog) { }

    ngOnInit(): void {
      this.getClass();
    }
    
    async getClass(): Promise<any> {
      const slug = this.route.snapshot.paramMap.get('slug');
      if (slug) {
        let dialogRef: MatDialogRef<ProgressSpinnerOverlayComponent> = this.dialog.open(ProgressSpinnerOverlayComponent, {
          panelClass: 'transparent',
          disableClose: true
        });
        this.class = await this.dndApiService.getClass(slug);
        dialogRef.close();
      }
    }

    goBack(): void {
      this.location.back();
    }
}
