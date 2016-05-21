import {Component, Input, OnChanges, SimpleChange} from 'angular2/core';
import {Player} from '../../services/player';

@Component({
    selector: 'players-list',
    template: `<ion-item-group class="alphabetList">
                 <div *ngFor="#player of players; #idx=index;">
                    <ion-item-divider light *ngIf="insertDivider(idx)">{{ currentLetter }}</ion-item-divider>
                    <ion-item>
                        <span class="icon-user player-icon"></span>
                        <span>{{ player.initials }}</span>
                        <span>{{ player.prefix }}</span> 
                        <span>{{ player.surName }}</span>
                        <span>({{ player.gender }})</span>
                        <div class="knltb">
                            <img class='knltb-image' src='build/images/knltb.png'/>
                            <span class="knltb-nr">{{ player.knltbNumber }}</span> 
                            Single <span class="knltb-ranking">{{ player.rankingSingleActual }}</span>
                            Dubbel <span class="knltb-ranking">{{ player.rankingDoubleActual }}</span>
                        </div>
                    </ion-item>
                 </div>
               </ion-item-group>` 
})

export class PlayersList {
        
    players: Array<Player>;
    currentLetter: string = '';
       
    @Input() 
    set list(players: Array<Player>) {
       this.players = players;
    }
        
    constructor() {
        
    }
    
    insertDivider(index: number) {
        if(this.players && this.players.length > 0) {
            let letter = this.firstLetter(this.players[index].surName);
            if(this.currentLetter != letter) {
                this.currentLetter = letter;
                return true;
            } else {
                return false;
            }
        }
    }
    
    // Return the first lowercase letter for the given string.    
    firstLetter(str: string) {
        return "" || str.charAt(0).toUpperCase();
    }
 
}