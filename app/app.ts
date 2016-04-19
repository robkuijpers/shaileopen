import 'es6-shim';
import {App, Platform} from 'ionic-angular';
import {MenuController, IonicApp} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {CategoriesPage} from './pages/categories/categories';
import {EventsPage} from './pages/events/events';
import {GamesPage} from './pages/games/games';
import {PlayersPage} from './pages/players/players';


@App({
  template: `<ion-menu [content]="content">
               <ion-toolbar>
                 <ion-title>Menu</ion-title>
               </ion-toolbar>
               <ion-content>
                 <ion-list>
                   <button ion-item (click)="openPage(homePage)">
                     Home
                   </button>
                   <button ion-item (click)="openPage(gamesPage)">
                     Wedstrijden
                   </button>
                   <button ion-item (click)="openPage(playersPage)">
                     Spelers
                   </button>
                   <button ion-item (click)="openPage(categoriesPage)">
                     Categorieen
                   </button>
                   <button ion-item (click)="openPage(eventsPage)">
                     Programma
                   </button>
                 </ion-list>
               </ion-content>
             </ion-menu>
             <ion-nav [root]="rootPage" #content swipe-back-enabled="false"></ion-nav>`,
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})

export class MyApp {
  
  rootPage: any = HomePage;
  homePage: any = HomePage;
  gamesPage: any = GamesPage;
  eventsPage: any = EventsPage;
  playersPage: any = PlayersPage;
  categoriesPage: any = CategoriesPage;

  menu: MenuController;
  app: IonicApp
  
  constructor(platform: Platform, app: IonicApp, menu: MenuController) {
      
    this.app = app;
    this.menu = menu;
    
    this.homePage = HomePage;
    this.gamesPage = GamesPage;
    this.eventsPage = EventsPage;
    this.categoriesPage = CategoriesPage;
    this.playersPage = PlayersPage;
      
    this.rootPage = this.homePage;
          
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
  
    openPage(page) {
    // Reset the nav controller to have just this page
    // we wouldn't want the back button to show in this scenario
    this.rootPage = page;
  
    // close the menu when clicking a link from the menu
    this.menu.close();
  }
  
}
