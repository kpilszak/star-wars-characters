import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  characters: any[] = [];
  activatedRoute: ActivatedRoute;
  starWarsService: StarWarsService;
  loadedSide = 'all';
  subscription: Subscription = new Subscription();

  constructor(activatedRoute: ActivatedRoute, starWarsService: StarWarsService) {
    this.activatedRoute = activatedRoute;
    this.starWarsService = starWarsService;
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.characters = this.starWarsService.getCharacters(params['side']);
        this.loadedSide = params['side']
      }
    );
    this.subscription = this.starWarsService.charactersChanged.subscribe(
      () => {
        this.characters = this.starWarsService.getCharacters(this.loadedSide);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
