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
    
    constructor(private http: Http) {
        this.http = http;
    }

    getDates() {
        
        let allDatesByDate: string = 'dates?s={%22day%22:1}';
            
        return this.http.get(this.dbUrl + allDatesByDate + this.dbKey)
            .map( (res:Response) => { 
                return res.json();             
            })
            .map( (dates:any) => {
                let result: Array<Date> = [];
                if(dates.length > 0) {
                   dates.forEach( (date) => {
                      var localDate = new Date(date.day.$date);                        
                      result.push(localDate);
                   })
                }
                return result;    
             });
    }


    getGamesForDateByDate(date: Date) {
            
        let todayStart: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
        let todayEnd: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
        
        let forDate: Object = {
            date: {
               $gte: { $date: todayStart.toISOString() },
               $lt: { $date: todayEnd.toISOString() },
            }
        };
        
        let byDate: any = { date: 1 };
            
        let q = JSON.stringify(forDate);
        let s = JSON.stringify(byDate);
                
        return this.http.get(this.dbUrl + "games?q=" + q + "&s=" +  s + this.dbKey)
            .map( (res:Response) => { 
                return res.json();             
            })
            .map( (games:any) => { 
                let result: Array<Game> = [];
                if(games.length > 0) {
                    games.forEach( (game) => {
                        let g: Game = new Game(); 
                        g.date = new Date(game.date.$date);
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
    
    
    getCurrentGamesForDateByDate(date: Date) {
             
        let todayStart: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
        let todayEnd: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
           
        let query: Object = {
            date: {
               $gte: { $date: todayStart.toISOString() },
               $lt: { $date: todayEnd.toISOString() },
            },
            status: 'current'
        };
        
        let byDate: any = { date: 1 };
            
        let q = JSON.stringify(query);
        let s = JSON.stringify(byDate);
                
        return this.http.get(this.dbUrl + "games?q=" + q + "&s=" +  s + this.dbKey)
            .map( (res:Response) => { 
                return res.json();             
            })
            .map( (games:any) => { 
                let result: Array<Game> = [];
                if(games.length > 0) {
                    games.forEach( (game) => {
                        let g: Game = new Game(); 
                        g.date = new Date(game.date.$date);
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

    getGamesForPlayerByDate(knltbNumber: string) {
        
        // where team1.players contains knltbNumber || team2.players contains knltbNumber    
        let forPlayer: Object = {
            knltbNumber: knltbNumber
        };
        
        let byDate: Object = { date: 1 };
            
        let q = JSON.stringify(forPlayer);
        let s = JSON.stringify(byDate);
                
        return this.http.get(this.dbUrl + "games?q=" + q + "&s=" +  s + this.dbKey)
            .map( (res:Response) => { 
                return res.json();             
            })
            .map( (games:any) => { 
                let result: Array<Game> = [];
                if(games.length > 0) {
                    games.forEach( (game) => {
                        let g: Game = new Game(); 
                        g.date = new Date(game.date.$date);
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