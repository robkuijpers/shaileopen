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
  template: `<ion-menu id="leftMenu" [content]="content">
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
             <ion-nav id="nav" [root]="rootPage" #content swipe-back-enabled="false"></ion-nav>`,
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})

class MyApp {
  
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
      { component: CategoriesPage, class: 'icon-tree menu-icon', title: 'Onderdelen'},
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
    
    // navigate to the new page if it is not the current page
    let nav = this.app.getComponent('nav');
    nav.setRoot(page);
  
    // // close the menu when clicking a link from the menu
    this.menu.close();  // or: this.app.getComponent('leftMenu').close();
  }
  
}
