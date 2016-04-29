import {OnInit} from 'angular2/core';  
import {IonicApp, Page, NavController} from 'ionic-angular';
import {EventsService} from '../../services/eventsService';
import {Event} from '../../services/event';

@Page({
  templateUrl: 'build/pages/events/events.html',
    providers: [EventsService]
})

export class EventsPage {

  nav: NavController;
  app: IonicApp;
  
  events: Array<Event>;
    
  constructor(private eventsService: EventsService) {
      this.eventsService = eventsService;
  }

  ngOnInit() {
      this.eventsService.getEventsByDate().subscribe(
          (data) => {
              this.events = data;
          }, 
          (err) => console.log(err));
  }
    
}
