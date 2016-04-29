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
     
    private playersBySurName: string = 'players?s={%22surName%22:%201}';
    private playerByKnltbNumber: string = 'players?s={%22knltbNumber%22:%201}';

    constructor(private http: Http) {
        this.http = http;
    }


    getPlayersBySurName() {

        return this.http.get(this.dbUrl + this.playersBySurName + this.dbKey)
            .map( (res:Response) => { 
                return res.json();             
            })
            .map( (players:any) => { 
                let result: Array<Player> = [];
            
                if(players.length > 0) {
                    players.forEach( (player) => {
                        let p: Player = new Player(); 
                        p.knltbNumber = player.knltbNumber;
                        p.initials = player.initials;
                        p.firstName = player.firstName;
                        p.prefix = player.prefix;
                        p.surName = player.surName;
                        p.dateOfBirth = player.dateOfBirth;
                        p.gender = player.gender;
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
    
}