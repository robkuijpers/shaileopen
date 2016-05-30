import {OnInit, Output, EventEmitter} from 'angular2/core';  
import {Page, Loading, NavController} from 'ionic-angular';
import {PlayersService} from '../../services/playersService';
import {Player} from '../../services/player';
import {PlayersList} from './playersList';
import {Toast} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/players/players.html',
  providers: [PlayersService],
  directives: [PlayersList]
})

export class PlayersPage {

  @Output() playersLoaded = new EventEmitter();

  loading: Loading = Loading.create({
         content: "Please wait..."
      });
      
  players: Array<Player>;
  playersSave: Array<Player>;
  searchQuery: string = '';
               
  constructor(private nav: NavController, private playersService: PlayersService) {
      this.nav = nav;
      this.playersService = playersService;
  }

  ngOnInit() {
      
      this.nav.present(this.loading);
        
      this.playersService.getPlayersBySurName().subscribe(
          (data) => {
              this.loading.dismiss();
              this.players = data;
              this.playersSave = this.shallowCopy(this.players);
              
              for (var index = 0; index < this.players.length; index++) {
                
                let player: Player = this.players[index];
                
                this.playersService.getKnltbRating(player.knltbNumber).subscribe(
                    (data) => {
                        player.rankingSingleEndOfYear = data.single.endofyear;
                        player.rankingSingleActual = data.single.actual;
                        player.rankingDoubleEndOfYear = data.double.endofyear;
                        player.rankingDoubleActual = data.double.actual;
                    },
                    (err) => {
                        console.log(err); 
                    }
                ); 
                  
              }
              
          }, 
          (err) => { 
              this.loading.dismiss(); 
              console.log(err); 
              
               // TODO: make this generic in a parent.
               let message: Toast = Toast.create({
                    message: "Fout tijdens ophalen gegevens.",
                    duration: 5000,
                    showCloseButton: false,
                    enableBackdropDismiss: true,
                    dismissOnPageChange: true
                });
                this.nav.present(message);
                 
          },
          () => {
              // Complete.
              // Trigger a change on the list to display the ranking data.
              this.players = this.playersSave;
          });
    
  }
 
  getFilteredPlayers(searchbar) {
      
        // Reset items back to all of the items
        this.players = this.playersSave;    
        
        // set q to the value of the searchbar
        var q = searchbar.value;

        // if the value is an empty string don't filter the items
        if (q.trim() == '') {
            return;
        }

        this.players = this.players.filter((v: Player) => {
            if (v.surName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                return true;
            }
            return false;
        })

  }
     
  shallowCopy(arr: Array<any>) {
      if(!arr) {
          return;
      }
      
      var newArr = arr.map(function(elem) {
         return elem;
      });

      return newArr;
  }   
    
}
