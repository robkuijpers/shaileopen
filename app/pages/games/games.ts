import {OnInit} from 'angular2/core';  
import {IonicApp, Page, NavController} from 'ionic-angular';
import {GamesService} from '../../services/gamesService';

@Page({
  templateUrl: 'build/pages/games/games.html',
  providers: [GamesService]
})

export class GamesPage {
  
  nav: NavController;
  app: IonicApp;
  dates: Array<Date> = [];
  selectedDate: Date = new Date();
        
  constructor(private gamesService: GamesService) {
      this.gamesService = gamesService;
  }

  ngOnInit() {
      this.gamesService.getDates().subscribe(
          (data) => {
              this.dates = data;
              this.setCurrentDay();
          }, 
          (err) => console.log(err));
  }
    
  dateSelected(evt) {
    // this.gamesService.getGamesByDateForDate(this.selectedDate).subscribe(
    //     (games: Array<Game>) => {
    //         games.forEach( (game: Game) => {
    //             if(game.isFinished()) {
    //                 this.finishedGames.push(game);
    //             } else if(game.isCurrent()) {
    //                 this.currentGames.push(game);
    //             } else if(game.isPlanned()) {
    //                 this.plannedGames.push(game);
    //             } else {
    //                 console.log('game with unknown status retrieved.');
    //             }
    //         });
    //     },
    //     (err) => console.log(err));
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
    
}
