import {Page} from 'ionic-angular';
import {CategoriesPage} from '../categories/categories';
import {EventsPage} from '../events/events';
import {GamesPage} from '../games/games';
import {PlayersPage} from '../players/players';

@Page({
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {
  
  gamesPage = GamesPage;
  eventsPage = EventsPage;
  categoriesPage = CategoriesPage;
  playersPage = PlayersPage;
    
  constructor() {

  }
  
  openPage(page) {
    // Reset the nav controller to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.rootPage = page;
  }
    
}
