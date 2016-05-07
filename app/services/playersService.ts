import {Injectable} from 'angular2/core';  
import {Http, Headers, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Player} from './player';

@Injectable()
export class PlayersService { 
    
    private dbUrl: string = 'https://api.mlab.com/api/1/databases/toernooi/collections/';
    private dbKey: string = '&apiKey=sx-HvoL-mQvXhyiMCuaiPsmrerSiveyX';

    // get player with knltbNumber 
    // https://api.mlab.com/api/1/databases/toernooi/collections/players?q={%22knltbNumber%22:%2212345633%22}&apiKey=sx-HvoL-mQvXhyiMCuaiPsmrerSiveyX
     
    private playersBySurName: string = 'players?s={surName:1}';
    private playerByKnltbNumber: string = 'players?q={%22knltbNumber%22:%201}';

    constructor(private http: Http) {
        this.http = http;
    }


    getPlayersBySurName() {

        let sortBySurName: Object = {
            surName: 1
        }

        let s = JSON.stringify(sortBySurName);
        
        return this.http.get(this.dbUrl + 'players?s=' + s + this.dbKey)
            .map( (res:Response) => { 
                return res.json();             
            })
            .map( (players:any) => { 
                let result: Array<Player> = [];
            
                if(players.length > 0) {
                    players.forEach( (player) => {
                        let p: Player = new Player(player.knltbNumber); 
                        p.initials = player.initials;
                        p.firstName = player.firstName;
                        p.prefix = player.prefix;
                        p.surName = player.surName;
                        p.dateOfBirth = new Date(player.dateOfBirth.$date);
                        p.gender = player.gender;
                        p.club = player.club;
                        p.ranking = player.ranking;
                        p.rankingActual = player.rankingActual;
                        p.email = player.email;
                        p.phone = player.phone;
                        result.push(p);
                    });
                } 
            
                return result;                  
            }); 
    }       
    
    
    getPlayerByKnltbNumber( kntlbNumber: string ) {

        let selectByKnltbNumber: Object = {
            knltbNumber: kntlbNumber
        }

        let q = JSON.stringify(selectByKnltbNumber);
        
        return this.http.get(this.dbUrl + 'players?q=' + q + this.dbKey)
            .map( (res:Response) => { 
                return res.json();             
            })
            .map( (players:any) => { 
                
                let result: Array<Player> = [];
            
                if(players.length > 0) {
                    
                    let player = players[0];
                    let p: Player = new Player(player.knltbNumber); 
                    
                    p.initials = player.initials;
                    p.firstName = player.firstName;
                    p.prefix = player.prefix;
                    p.surName = player.surName;
                    p.dateOfBirth = new Date(player.dateOfBirth.$date);
                    p.gender = player.gender;
                    p.club = player.club;
                    p.ranking = player.ranking;
                    p.rankingActual = player.rankingActual;
                    p.email = player.email;
                    p.phone = player.phone;
                    
                    result.push(p);
                } 
            
                return result;                  
            }); 
    }  
    
}