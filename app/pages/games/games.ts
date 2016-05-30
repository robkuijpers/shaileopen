import {OnInit} from 'angular2/core';  
import {Page, Loading, NavController} from 'ionic-angular';
import {GamesService} from '../../services/gamesService';
import {Game} from '../../services/game';
import {Player} from '../../services/player';
import {GamePage} from './game2';
import {FormatDatePipe} from '../../pipes/formatDatePipe';
import {FormatTimePipe} from '../../pipes/formatTimePipe';
import {Toast} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/games/games.html',
  directives: [GamePage],
  providers: [GamesService],
  pipes: [FormatDatePipe, FormatTimePipe]
})

export class GamesPage {
  
  dates: Array<Date> = [];
  selectedDate: Date = new Date();
     
  finishedGames: Array<Game> = [];
  currentGames: Array<Game> = [];
  plannedGames: Array<Game> = [];
  
//   finishedTab: GamePage = null;
//   currentTab: GamePage = null;
//   plannedTab: GamePage = null;
      
  rotate = false;
              
  constructor(public nav: NavController, private gamesService: GamesService) {
      this.gamesService = gamesService;
      
    //   this.finishedTab = GamePage;
    //   this.currentTab = GamePage;
    //   this.plannedTab = GamePage;
    
  }

  ngOnInit() {
      
      let loading: Loading = Loading.create({
         content: "Please wait..."
      });
      
      this.nav.present(loading);
      
      this.gamesService.getDates().subscribe(
          (data) => {
              loading.dismiss();
              this.dates = data;
              this.setCurrentDay();
          }, 
          (err) => {
              loading.dismiss();
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
                
          });
  }
    
  dateSelected(evt) { 
    
    this.gamesService.getGamesForDateByDate(this.selectedDate).subscribe(
        (games: Array<Game>) => {
            
            this.finishedGames = [];
            this.currentGames = [];
            this.plannedGames = [];
    
            games.forEach( (game: Game) => {
                if(game.isFinished()) {
                    this.finishedGames.push(game);
                } else if(game.isCurrent()) {
                    this.currentGames.push(game);
                } else if(game.isPlanned()) {
                    this.plannedGames.push(game);
                } else {
                    console.log('game with unknown status retrieved.');
                }
            });
        },
        (err) => console.log(err));
  }
  
  refreshGames(evt) {
    
    let loading: Loading = Loading.create({
       content: "Please wait..."
    });
      
    // Add rotate class to icon.  
    this.rotate = true;
    this.nav.present(loading);
  
    this.gamesService.getCurrentGamesForDateByDate(this.selectedDate).subscribe(
        (games: Array<Game>) => {
            
            this.currentGames = [];
            
            games.forEach( (game: Game) => {
                this.currentGames.push(game);
            });
            
            loading.dismiss();
            this.rotate = false;  // Remove rotate class from icon. 
        },
        (err) => { 
            loading.dismiss();
            this.rotate = false;  // Remove rotate class from icon.  
            console.log(err)
        });    
  }
  
  // The the dropdown contains the current date then select it,
  // otherwise select the firdst date in the array.
  setCurrentDay() {
      let today: Date = new Date();  
      let day = this.findDay(today, this.dates);
      if(day) {
          this.selectedDate = day;
      } else {
          this.selectedDate = this.dates[0];
      }
      
      this.dateSelected(this.selectedDate) 
  }
    
  // Check if the dates array contains the given date.
  // If yes then return the date, otherwise return null.  
  findDay(day, dates: Array<Date>) {
      day.setHours(0,0,0,0); 
      for (var date of this.dates) {
          let dt: Date = new Date(date.getDate());
          dt.setHours(0,0,0,0);
          if(day === dt) {
              return dt;
          }    
      }
      return null;
  }
    
  // Event from child components  
  showPlayer(player: Player) {
      console.log('showPlayer:' + player.knltbNumber);
  }  
}
