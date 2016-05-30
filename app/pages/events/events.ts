import {OnInit} from 'angular2/core';  
import {Page, Loading, NavController} from 'ionic-angular';
import {EventsService} from '../../services/eventsService';
import {Event} from '../../services/event';
import {FormatDatePipe} from '../../pipes/formatDatePipe';
import {FormatTimePipe} from '../../pipes/formatTimePipe';
import {Toast} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/events/events.html',
    providers: [EventsService],
    pipes: [FormatDatePipe, FormatTimePipe]
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
              
               // TODO: make this generic in a parent.
               let message: Toast = Toast.create({
                    message: "Fout tijdens ophalen gegevens.",
                    duration: 5000,
                    showCloseButton: false,
                    enableBackdropDismiss: true,
                    dismissOnPageChange: true
                });
                this.nav.present(message);
    
              console.log(err)
          });
  }
    
}
