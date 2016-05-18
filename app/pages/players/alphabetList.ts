import {Component, Input, OnChanges, SimpleChange } from 'angular2/core';
import {Player} from '../../services/player';

@Component({
    selector: 'alphabet-list',
    template: `<ion-item-group [innerHTML]="alphabetList" class="alphabetList"></ion-item-group>`
})

export class AlphabetList {

    currentLetter = "";
    alphabetList: string = "";
    players: Array<Player>;
             
    @Input() 
    set list(list: Array<Player>) { 
        this.players = list;
        this.createList();
    }
     
    constructor() {
    }
    
    createList(){
       if(this.players && this.players.length > 0) {
           
           let html = "";
           
           // Add all players but when the first letter changes add the letter.
           this.players.forEach((player: Player) => {
              let firstLetter = this.firstLetter(player.surName);
              if(firstLetter != this.currentLetter) {
                  this.currentLetter = firstLetter;
                  html = html.concat(this.createLetter(firstLetter));
              }  
              html = html.concat(this.createEntry(player));       
           })
           this.alphabetList = html;  
        } 
    }
    
    // Return the first lowercase letter for the given string.    
    firstLetter(str: string) {
        return "" || str.charAt(0).toUpperCase();
    }
    
    // Return the html for a letter.
    createLetter(letter: string) {
        return "<ion-item-divider light>" + letter + "</ion-item-divider>";
    }
    
    // Return the html for a player.
    createEntry(player: Player) {
        
      return `<ion-item>
                <span class="icon-user player-icon"></span>
                <span>` + player.initials + `</span>
                <span>` + player.prefix + `</span> 
                <span>` + player.surName + `</span>
                <span>(` + player.gender + `)</span>
                <div class="knltb">
                  <img class='knltb-image' src='/build/images/knltb.png'/>
                   Nr <span class="knltb-data">` + player.knltbNumber + `</span> 
                   Single <span class="knltb-data">` + player.rankingSingleActual + `</span>
                   Dubbel <span class="knltb-data"> ` + player.rankingDoubleActual + `</span>
                </div>
              </ion-item>` 
        
            // <span class="icon-phone"></span>{{ player.phone }}
            // <span class="icon-envelop"></span>{{ player.email }}
            // {{ player.gender }}
            // {{ player.dateOfBirth }}

    }
        
}