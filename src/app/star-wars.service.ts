import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Subject } from "rxjs";
import { LogService } from "./log.service";
import { map } from 'rxjs/operators';

@Injectable()
export class StarWarsService {
  private characters = [
    { name: 'Luke Skywalker', side: '' },
    { name: 'Darth Vader', side: '' }
  ];

  private logService: LogService;
  charactersChanged = new Subject<void>();
  http: HttpClient;

  constructor(logService: LogService, http: HttpClient) {
    this.logService = logService;
    this.http = http;
  }

  fetchCharacters() {
    this.http.get('https://swapi.dev/api/people/')
    .subscribe((response: any) => {
      const chars = response.results.map((char: any) => {
        return {name: char.name, side: ''};
      });
      this.characters = chars;
      this.charactersChanged.next();
    });
  }

  getCharacters(chosenList: string) {
    if (chosenList === 'all') {
      return this.characters.slice();
    }
    return this.characters.filter((char) => {
      return char.side === chosenList;
    });
  }

  onSideChosen(charInfo: any) {
    const pos = this.characters.findIndex((char) => {
      return char.name === charInfo.name;
    })
    this.characters[pos].side = charInfo.side;
    this.charactersChanged.next();
    this.logService.wirteLog('Changed side of ' + charInfo.name + ', new side: ' + charInfo.side);
  }

  addCharacter(name: string, side: string): void {
    const position = this.characters.findIndex((char) => {
      return char.name === name;
    })
    if (position !== -1) {
      return;
    }
    const newCharacter = { name: name, side: side };
    this.characters.push(newCharacter);
  }

}
