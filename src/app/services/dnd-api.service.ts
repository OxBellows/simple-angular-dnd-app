import { Injectable } from '@angular/core';
import { Race } from '../models/race';
import { DndClass } from '../models/dnd-class';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DndApiService {
  private rootUrl = 'https://api.open5e.com/';
  private racesUrl = 'races/';
  private classesUrl = 'classes/';

  constructor(private toastr: ToastrService) { }

  async getRaces(): Promise<Race[]> {
    let races = [];
    let response;
    try {
      response = await fetch(this.rootUrl + this.racesUrl);
    } catch (error) {
      this.toastr.error(`Error loading races: ${error}`);
    }
    if (response?.ok) {
      const jsonData = await response.json();
      races = jsonData.results;
      let raceNameString = '';
      for (let i = 0; i < races.length; i++) {
        i < races.length - 1 ? raceNameString += races[i].name + ', ' : raceNameString += races[i].name;
      }
      this.toastr.success(`Fetched races: ${raceNameString}`);
    } else {
      this.toastr.error(`Response code: ${response?.status}`);
    }
    return races;
  }

  async getRace(slug: string): Promise<Race> {
    let race;
    let response;
    try {
      response = await fetch(this.rootUrl + this.racesUrl + slug);
    } catch (error) {
      this.toastr.error(`Error loading class: ${error}`);
    }
    if (response?.ok) {
      const jsonData = await response.json();
      race = jsonData;
      this.toastr.success(`Fetched race: ${race.name}`);
    } else {
      this.toastr.error(`Response code: ${response?.status}`);
    }
    return race;
  }

  async getClasses(): Promise<DndClass[]> {
    let classes = [];
    let response;
    try {
      response = await fetch(this.rootUrl + this.classesUrl);
    } catch (error) {
      this.toastr.error(`Error loading classes: ${error}`);
    }
    if (response?.ok) {
      const jsonData = await response.json();
      classes = jsonData.results;
      let classNameString = '';
      for (let i = 0; i < classes.length; i++) {
        i < classes.length - 1 ? classNameString += classes[i].name + ', ' : classNameString += classes[i].name;
      }
      this.toastr.success(`Fetched classes: ${classNameString}`);
    } else {
      this.toastr.error(`Response code: ${response?.status}`);
    }
    return classes;
  }

  async getClass(slug: string): Promise<DndClass> {
    let dndClass;
    let response;
    try {
      response = await fetch(this.rootUrl + this.classesUrl + slug);
    } catch (error) {
      this.toastr.error(`Error loading class: ${error}`);
    }
    if (response?.ok) {
      const jsonData = await response.json();
      dndClass = jsonData;
      this.toastr.success(`Fetched class: ${dndClass.name}`);
      console.log('dndClass: ', dndClass);
    } else {
      this.toastr.error(`Response code: ${response?.status}`);
    }
    return dndClass;
  }
}
