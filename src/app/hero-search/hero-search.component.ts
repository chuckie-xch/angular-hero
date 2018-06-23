import { Component, OnInit } from '@angular/core';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import { Hero } from '../domain/hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes$: Observable<Hero[]>;

  private searchTerms = new Subject<String>();

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }

  search(term: string) {
    this.searchTerms.next(term);
  }

}
