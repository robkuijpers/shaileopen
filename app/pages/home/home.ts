import {Platform, Page, NavController} from 'ionic-angular';
import {Network, Connection} from 'ionic-native';
import {CategoriesPage} from '../categories/categories';
import {EventsPage} from '../events/events';
import {GamesPage} from '../games/games';
import {PlayersPage} from '../players/players';
import {Toast} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {
      
  gamesPage = GamesPage;
  eventsPage = EventsPage;
  categoriesPage = CategoriesPage;
  playersPage = PlayersPage;
  
  slideOptions: Object = {
      pager: false,
      autoplay: 4000,
      speed: 1500,
      loop: true
  }
           
  toast: Toast = Toast.create({
      message: 'You network status',
      duration: 3000,
      showCloseButton: false,
      enableBackdropDismiss: true,
      dismissOnPageChange: true
  });
                      
  constructor(public platform: Platform, public nav: NavController) {
    this.checkNetwork();
  }
  
  openPage(page) {
    this.nav.setRoot(page);
  }
    
  checkNetwork() {
     this.platform.ready().then(() => {
       
        this.nav.present(this.toast);

        let states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';

        let networkConnection = navigator.connection;
        
        if(networkConnection) {
          let networkState = navigator.connection.type;
          this.toast.setMessage("Your network connection: " + states[networkState]);
          this.nav.present(this.toast);
        }
        
     });
  }
        
}
