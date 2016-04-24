import {Injectable} from 'angular2/core';  
import {Http, Headers, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
//import {Game} from '../pages/games/game';

@Injectable()
export class GamesService { 
    
    private dbUrl: string = 'https://api.mlab.com/api/1/databases/toernooi/collections/';
    private dbKey: string = '&apiKey=sx-HvoL-mQvXhyiMCuaiPsmrerSiveyX';

    private allDatesByDate: string = 'dates?s={%22date%22:%201}&apiKey=sx-HvoL-mQvXhyiMCuaiPsmrerSiveyX';
    //private allGamesForDateByDate: string = 'games?s={%22date%22:%201}&apiKey=sx-HvoL-mQvXhyiMCuaiPsmrerSiveyX';

    constructor(private http: Http) {
        this.http = http;
    }

    getDates() {
        
        return this.http.get(this.dbUrl + this.allDatesByDate + this.dbKey)
            .map( (res:Response) => { 
                return res.json();             
            })
            .map( (array:any) => {
                let result: Array<Date> = [];
                if(array[0] && array[0].dates) {
                   let dates = array[0].dates;
                   dates.forEach( (date) => { 
                      result.push(new Date(date.day));
                   })
                }
                return result;    
             });
    }


    // getGamesByDateForDate(date: Date) {

    //     return this.http.get(this.dbUrl + this.allGamesForDateByDate + this.dbKey)
    //         .map( (res:Response) => { 
    //             let result: Array<Game> = [];
    //             let json = res.json();  
                
    //             if(json[0] && json[0].games) {
    //                 let arr = json[0].games; 
    //                 arr.forEach( (game) => {
    //                     let g: Game = new Game(); 
    //                     g.date = game.date;
    //                     g.status = game.status;
    //                     g.category = game.category;
    //                     g.type = game.type;
    //                     g.teams = game.teams;
    //                     g.sets = game.sets;
    //                     g.result = game.result;
    //                     result.push(g);
    //                 });
    //             } 
                
    //             return result;                  
    //         });
            
    // }       
    
}