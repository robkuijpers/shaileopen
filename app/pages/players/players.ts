import {OnInit, Output, EventEmitter} from 'angular2/core';  
import {IonicApp, Page, NavController} from 'ionic-angular';
import {PlayersService} from '../../services/playersService';
import {Player} from '../../services/player';
import {AlphabetList} from './alphabetList';


@Page({
  templateUrl: 'build/pages/players/players.html',
  providers: [PlayersService],
  directives: [AlphabetList]
})

export class PlayersPage {

  @Output() playersLoaded = new EventEmitter();

  nav: NavController;
  app: IonicApp;

  players: Array<Player>;
               
  constructor(private playersService: PlayersService) {
      this.playersService = playersService;
  }

  ngOnInit() {
      this.playersService.getPlayersBySurName().subscribe(
          (data) => {
              this.players = data;
          }, 
          (err) => console.log(err));
  }
      
}
