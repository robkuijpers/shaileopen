import {OnInit} from 'angular2/core';  
import {Page, Loading, NavController} from 'ionic-angular';
import {GamesService} from '../../services/gamesService';
import {Game} from '../../services/game';
import {Player} from '../../services/player';
import {FinishedGames} from './finishedGames';
import {CurrentGames} from './currentGames';
import {PlannedGames} from './plannedGames';
import {FormatDatePipe} from '../../pipes/formatDatePipe';
import {FormatTimePipe} from '../../pipes/formatTimePipe';

@Page({
  templateUrl: 'build/pages/games/games.html',
  directives: [FinishedGames, CurrentGames, PlannedGames],
  providers: [GamesService],
  pipes: [FormatDatePipe, FormatTimePipe]
})

export class GamesPage {
  
  dates: Array<Date> = [];
  selectedDate: Date = new Date();
     
  finishedGames: Array<Game> = [];
  currentGames: Array<Game> = [];
  plannedGames: Array<Game> = [];
  
  rotate = false;
              
  constructor(public nav: NavController, private gamesService: GamesService) {
      this.gamesService = gamesService;
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
              console.log(err)
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
