import {Component, Input, OnChanges, SimpleChange } from 'angular2/core';
import {Player} from '../../services/player';

@Component({
    selector: 'alphabet-list',
    template: `<ion-list [innerHTML]="alphabetList" class="alphabetList"></ion-list>`
})

export class AlphabetList {

    currentLetter = "";
    alphabetList: string = "";
             
    @Input() 
    set list(list: Array<Player>) { 
        this.createList(list);
    }
     
    constructor() {
    }
    
    createList(list: Array<Player>){
       if(list) {
           let theList = "";
           list.forEach((player: Player) => {
              let firstLetter = this.firstLetter(player.surName);
              if(firstLetter != this.currentLetter) {
                  this.currentLetter = firstLetter;
                  theList = theList.concat(this.createLetter(firstLetter));
              }  
              theList = theList.concat(this.createEntry(player));       
           })
           this.alphabetList = theList;  
        } 
    }
    
    // ngOnChanges(changes: {[propKey:string]: SimpleChange}){
    //     console.log('list changed');
    // }
        
    firstLetter(str: string) {
        return "" || str.charAt(0).toUpperCase();
    }
    
    createLetter(letter: string) {
        return "<div class='letter'>" + letter + "</div>";
    }
    
    createEntry(player: Player) {
        
      let markup = `<span class="icon-user"></span>
                    <span>` + player.initials + `</span>
                    <span>` + player.prefix + `</span> 
                    <span>` + player.surName + `</span>
                    <span>(` + player.gender + `)</span
                    <span>` + player.knltbNumber + `</span> 
                    <span>` + player.rankingActual + `</span>`
               
                    // <span class="icon-phone"></span>{{ player.phone }}
                    // <span class="icon-envelop"></span>{{ player.email }}
                    // {{ player.gender }}
                    // {{ player.dateOfBirth }}
                                   
        return "<div class='entry'>" + markup + "</div>";
    }
        
}