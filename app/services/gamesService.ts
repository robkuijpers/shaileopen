import {Injectable} from 'angular2/core';  
import {Http, Headers, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Game} from './game';

@Injectable()
export class GamesService { 
    
    private dbUrl: string = 'https://api.mlab.com/api/1/databases/toernooi/collections/';
    private dbKey: string = '&apiKey=sx-HvoL-mQvXhyiMCuaiPsmrerSiveyX';

   // https://api.mlab.com/api/1/databases/toernooi/collections/dates?s={%22day%22:1}&apiKey=sx-HvoL-mQvXhyiMCuaiPsmrerSiveyX

    private allDatesByDate: string = 'dates?s={%22day%22:1}';
    private allGamesForDateByDate: string = 'games?s={%22date%22:1}';

    constructor(private http: Http) {
        this.http = http;
    }

    getDates() {
        
        return this.http.get(this.dbUrl + this.allDatesByDate + this.dbKey)
            .map( (res:Response) => { 
                return res.json();             
            })
            .map( (dates:any) => {
                let result: Array<Date> = [];
                if(dates.length > 0) {
                   dates.forEach( (date) => { 
                      result.push(new Date(date.day));
                   })
                }
                return result;    
             });
    }


    getGamesForDate(date: Date) {

        return this.http.get(this.dbUrl + this.allGamesForDateByDate + this.dbKey)
            .map( (res:Response) => { 
                return res.json();             
            })
            .map( (games:any) => { 
                let result: Array<Game> = [];
                if(games.length > 0) {
                    games.forEach( (game) => {
                        let g: Game = new Game(); 
                        g.date = game.date;
                        g.status = game.status;
                        g.category = game.category;
                        g.type = game.type;
                        g.court = game.court;
                        g.duration = game.duration;
                        g.team1 = game.team1;
                        g.team2 = game.team2
                        g.result = game.result;
                        result.push(g);
                    });
                } 
            
                return result;                  
            }); 
    }       
    
}