import {Page, NavController} from 'ionic-angular';
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
  
  slideOptions = {
      pager: false,
      autoplay: 4000,
      speed: 1500,
      loop: true
  }
              
  constructor(private nav: NavController) {
        
  }
  
  openPage(page) {
    this.nav.setRoot(page, {});
  }
    
}
