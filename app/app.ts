import 'es6-shim';
import {App, Platform, Page} from 'ionic-angular';
import {MenuController, IonicApp} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {CategoriesPage} from './pages/categories/categories';
import {EventsPage} from './pages/events/events';
import {GamesPage} from './pages/games/games';
import {PlayersPage} from './pages/players/players';
import {AboutPage} from './pages/about/about';
import {HTTP_PROVIDERS} from 'angular2/http';

@App({
  template: `<ion-menu [content]="content">
               <ion-toolbar>
                 <ion-title>Menu</ion-title>
               </ion-toolbar>
               <ion-content>
                 <ion-list>
                    <button ion-item menuClose *ngFor="#pg of menuPages" (click)="openPage( pg.component )">
                      <span class="{{pg.class}}"></span>{{ pg.title }}
                    </button>
                 </ion-list>
               </ion-content>
             </ion-menu>
             <ion-nav [root]="rootPage" #content swipe-back-enabled="false"></ion-nav>`,
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})

export class MyApp {
  
  static get parameters() {
    return [
      [Platform], [IonicApp], [MenuController]
    ]
  }
  
  rootPage: any;
  menu: MenuController;
  app: IonicApp;
  menuPages: any[];
  
  constructor(platform: Platform, app: IonicApp, menu: MenuController) {
      
    this.app = app;
    this.menu = menu;
    
    this.rootPage = HomePage;
         
    this.menuPages = [
      { component: HomePage, class: 'icon-menu menu-icon', title: 'Home'},
      { component: GamesPage, class: 'icon-address-book menu-icon', title: 'Wedstrijden'},
      { component: PlayersPage, class: 'icon-users menu-icon', title: 'Spelers'},
      { component: CategoriesPage, class: 'icon-tree menu-icon', title: 'Categorieen'},
      { component: EventsPage, class: 'icon-glass2 menu-icon', title: 'Programma'},
      { component: AboutPage, class: 'icon-notification menu-icon', title: 'Over deze app'}
    ];
          
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
    // if page ==== HomePage -> homePage.nav = 
  
    // close the menu when clicking a link from the menu
    this.menu.close();
  }
  
}
