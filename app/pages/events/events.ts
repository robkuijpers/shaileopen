import {OnInit} from 'angular2/core';  
import {Page, Loading, NavController} from 'ionic-angular';
import {EventsService} from '../../services/eventsService';
import {Event} from '../../services/event';

@Page({
  templateUrl: 'build/pages/events/events.html',
    providers: [EventsService]
})

export class EventsPage {

  events: Array<Event>;
    
  constructor(public nav: NavController, private eventsService: EventsService) {
      this.eventsService = eventsService;
  }

  ngOnInit() {
      
      let loading: Loading = Loading.create({
         content: "Please wait..."
      });
      
      this.nav.present(loading);
            
      this.eventsService.getEventsByDate().subscribe(
          (data) => {
              loading.dismiss();
              this.events = data;
          }, 
          (err) => { 
              loading.dismiss();    
              console.log(err)
          });
  }
    
}
