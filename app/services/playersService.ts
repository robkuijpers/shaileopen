import {Injectable} from 'angular2/core';  
import {Http, Headers, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import {Player} from './player';

@Injectable()
export class PlayersService { 
    
    private dbUrl: string = 'https://api.mlab.com/api/1/databases/toernooi/collections/';
    private dbKey: string = '&apiKey=sx-HvoL-mQvXhyiMCuaiPsmrerSiveyX';

    // get player with knltbNumber 
    // https://api.mlab.com/api/1/databases/toernooi/collections/players?q={%22knltbNumber%22:%2212345633%22}&apiKey=sx-HvoL-mQvXhyiMCuaiPsmrerSiveyX
     
    private TIMEOUT: number = 5000;
     
    constructor(private http: Http) {
        this.http = http;
    }

    getPlayersBySurName() {

        let sortBySurName: Object = {
            surName: 1
        }

        let s = JSON.stringify(sortBySurName);
        
        return this.http.get(this.dbUrl + 'players?s=' + s + this.dbKey)
            .timeout(this.TIMEOUT)
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
                        p.rankingSingleEndOfYear = player.ranking;
                        p.rankingSingleActual = player.rankingActual;
                        p.rankingDoubleEndOfYear = player.ranking;
                        p.rankingDoubleActual = player.rankingActual;
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
            .timeout(this.TIMEOUT)
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
                    p.rankingSingleEndOfYear = player.ranking;
                    p.rankingSingleActual = player.rankingActual;
                    p.rankingDoubleEndOfYear = player.ranking;
                    p.rankingDoubleActual = player.rankingActual;
                    p.email = player.email;
                    p.phone = player.phone;
                    
                    result.push(p);
                } 
            
                return result;                  
            }); 
    }
    
    getKnltbRating(knltbNumber: string) {
        
        //let knltbUrl = "http://publiek.mijnknltb.nl/spelersprofiel.aspx?bondsnummer=" + knltbNumber;
        let knltbUrl = "/api?bondsnummer=" + knltbNumber;

        let headers = new Headers();
        
        return this.http.get(knltbUrl, { headers: headers })
            .timeout(this.TIMEOUT)
            .map( (res:Response) => {
                
                let parser = new DOMParser();
                                
                let htmlText = res.text().replace(/&nbsp;/g,'');
                let htmlDoc = parser.parseFromString(htmlText, "text/xml");
                let spelersProfielElem = htmlDoc.getElementById('MainContent_PanelSpelersProfielInfo'); 
                
                let spelersProfielTable;
                let spelersProfielRow1;
                let spelersProfielRow2;
                let spelersProfielRow3;
                    
                if(spelersProfielElem) {
                  spelersProfielTable = spelersProfielElem.getElementsByTagName('table')[0];
                  spelersProfielRow1 = spelersProfielTable.getElementsByTagName('tr')[0];
                  spelersProfielRow2 = spelersProfielTable.getElementsByTagName('tr')[1];
                  spelersProfielRow3 = spelersProfielTable.getElementsByTagName('tr')[2];
                }
                
                let singleEndOfYear = '';
                let doubleEndOfYear = '';
                let singleActual = '';
                let doubleActual = '';

                if(spelersProfielRow1) {
                  singleEndOfYear = spelersProfielRow1.getElementsByTagName('td')[1].textContent;       
                  doubleEndOfYear = spelersProfielRow1.getElementsByTagName('td')[3].textContent;
                }
                
                if(spelersProfielRow2) {
                  singleActual = spelersProfielRow2.getElementsByTagName('td')[1].textContent;
                  doubleActual = spelersProfielRow2.getElementsByTagName('td')[3].textContent;    
                }
                
                if(spelersProfielRow3) {
                  let singleEndOfYearActual = spelersProfielRow3.getElementsByTagName('td')[1].textContent;
                  let doubleEndOfYearActual = spelersProfielRow3.getElementsByTagName('td')[3].textContent;
                }
                
                return { 
                    'single': { 'endofyear': singleEndOfYear, 'actual': singleActual },
                    'double': { 'endofyear': doubleEndOfYear, 'actual': doubleActual }
                };        
            })
            
    }
    
}