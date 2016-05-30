import {OnInit} from 'angular2/core';  
import {Page, Loading, NavController, NavParams} from 'ionic-angular';
import {Player} from '../../services/player';
import {GamesService} from '../../services/gamesService';
import {Game} from '../../services/game';

@Page({
  templateUrl: 'build/pages/playerdetails/playerdetails.html',
  providers: [GamesService]
})

export class PlayerDetailsPage {
   
  player: Player;
  games: Array<Game> = [];
   
  constructor(private nav: NavController, private navParams: NavParams, private gamesService: GamesService) {
      this.navParams = navParams;
  }
  
  ngOnInit() {
      
      let loading: Loading = Loading.create({
         content: "Please wait..."
      });
      
      this.player = this.navParams.get('player');
            
      this.nav.present(loading);
            
      this.gamesService.getGamesForPlayerByDate(this.player.knltbNumber).subscribe(
        (games: Array<Game>) => {
            loading.dismiss();
            this.games = games;
        },
        (err) => {
          loading.dismiss();
          console.log(err)
        });
            

  }
  
}
