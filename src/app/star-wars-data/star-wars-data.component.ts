import { Component, OnInit } from '@angular/core';
import {SwapiService} from '../swapi/swapi.service';
import {concatMap, filter, map} from 'rxjs/operators';
import {ActivatedRoute, ParamMap} from '@angular/router';

import {StarWarsMultipleResult, StarWarsSingleResult} from '../swapi/swapi';


@Component({
  selector: 'app-star-wars-data',
  templateUrl: './star-wars-data.component.html',
  styleUrls: ['./star-wars-data.component.css']
})
export class StarWarsDataComponent implements OnInit {

  private results: Array<StarWarsSingleResult>;
  private objectKeys: (object) => string[];
  private next: string;
  private pageName: string;

  constructor(private swapi: SwapiService, private activatedRoute: ActivatedRoute) {
    this.objectKeys = Object.keys;
  }

  ngOnInit() {
    this.pageName = this.activatedRoute.snapshot.url[0].path.toUpperCase();

    this.activatedRoute.paramMap.pipe(
      filter((paramMap: ParamMap) => paramMap.has('id')),
      concatMap(() => this.swapi.getData<StarWarsSingleResult>(window.location.pathname, false))
    ).subscribe((starWarsSingleResult: StarWarsSingleResult) => { this.results = [starWarsSingleResult]; });

    this.activatedRoute.paramMap.pipe(
      filter((paramMap: ParamMap) => !paramMap.has('id')),
      concatMap(() => this.swapi.getData<StarWarsMultipleResult>(window.location.pathname, false)),
      map((response: StarWarsMultipleResult) => {
        this.next = response.next;
        return response.results;
      })).subscribe((starWarsSingleResults: StarWarsSingleResult[]) => this.results = starWarsSingleResults);
  }

  loadMoreData() {
    if (this.next) {
      this.swapi.getData<StarWarsMultipleResult>(this.next, true)
        .subscribe((response: StarWarsMultipleResult) => {
          this.next = response.next;
          this.results.push(...response.results);
        });
    }
  }

  isNotArray(value: any) {
    return !Array.isArray(value);
  }

  isLink(value: any): boolean {
    if(typeof value === 'string')
      return value.includes('https');

    return false;
  }

  setRouteLink(originalLink: string): string {
    const regex: RegExp = /https:\/\/swapi.co\/api(\/.*)/;
    return regex.exec(originalLink)[1];
  }

}
