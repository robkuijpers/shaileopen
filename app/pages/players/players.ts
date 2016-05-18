import {OnInit, Output, EventEmitter} from 'angular2/core';  
import {Page, Loading, NavController} from 'ionic-angular';
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
                    },
                    () => {
                       this.players = [];
                       this.players = this.playersSave;
                    }
                ); 
                  
              }
              
          }, 
          (err) => { 
              this.loading.dismiss(); 
              console.log(err); 
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
