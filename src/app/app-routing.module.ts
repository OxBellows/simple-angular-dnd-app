import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RacesComponent } from './components/races/races.component';
import { RaceDetailComponent } from './components/race-detail/race-detail.component';
import { ClassesComponent } from './components/classes/classes.component';
import { ClassDetailComponent } from './components/class-detail/class-detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'races', component: RacesComponent },
  { path: 'races/:slug', component: RaceDetailComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'classes/:slug', component: ClassDetailComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
