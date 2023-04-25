import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { CdkColumnDef } from '@angular/cdk/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RacesComponent } from './components/races/races.component';
import { RaceDetailComponent } from './components/race-detail/race-detail.component';
import { ClassesComponent } from './components/classes/classes.component';
import { ClassDetailComponent } from './components/class-detail/class-detail.component';
import { HeaderComponent } from './structure/header/header.component';
import { BodyComponent } from './structure/body/body.component';
import { ProgressSpinnerOverlayComponent } from './components/progress-spinner-overlay/progress-spinner-overlay.component';
import { StarHidePipe } from './pipes/star-hide.pipe';

import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClassesComponent,
    ClassDetailComponent,
    RacesComponent,
    RaceDetailComponent,
    StarHidePipe,
    ProgressSpinnerOverlayComponent,
    HeaderComponent,
    BodyComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    ToastrModule.forRoot()
  ],
  providers: [CdkColumnDef],
  bootstrap: [AppComponent]
})
export class AppModule { }
