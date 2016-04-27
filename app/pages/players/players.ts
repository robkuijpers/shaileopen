import {OnInit} from 'angular2/core';  
import {IonicApp, Page, NavController} from 'ionic-angular';
import {PlayersService} from '../../services/playersService';
import {Player} from '../../services/player';

@Page({
  templateUrl: 'build/pages/players/players.html',
  providers: [PlayersService]
})

export class PlayersPage {

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
