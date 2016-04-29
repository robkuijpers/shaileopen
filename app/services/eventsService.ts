import {Injectable} from 'angular2/core';  
import {Http, Headers, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Event} from './event';

@Injectable()
export class EventsService { 
    
    private dbUrl: string = 'https://api.mlab.com/api/1/databases/toernooi/collections/';
    private dbKey: string = '&apiKey=sx-HvoL-mQvXhyiMCuaiPsmrerSiveyX';

    private eventsByDate: string = 'events?s={%22date%22:1}';

    constructor(private http: Http) {
        this.http = http;
    }


    getEventsByDate() {

        return this.http.get(this.dbUrl + this.eventsByDate + this.dbKey)
            .map( (res:Response) => { 
                return res.json();             
            })
            .map( (events:any) => { 
                let result: Array<Event> = []; 
                if(events.length > 0) {
                    events.forEach( (event) => {
                        let e: Event = new Event(); 
                        e.date = event.date;
                        e.name = event.name;
                        e.description = event.description;
                        result.push(e);
                    });
                } 
            
                return result;                  
            }); 
    }       
    
}