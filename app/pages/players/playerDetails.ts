import {Component, Input} from 'angular2/core';
import {Player} from '../../services/player';

@Component({
    selector: 'player-details',
    template: `<div class="icon-user"></div>
               <div>
                    {{ player.knltbNumber }}<br>
                    {{ player.initials }} 
                    {{ player.prefix }} 
                    {{ player.surName }}<br>
                    <span class="icon-phone"></span>{{ player.phone }}
                    <span class="icon-envelop"></span>{{ player.email }}<br>
                    {{ player.dateOfBirth }} 
                    {{ player.gender }}<br>
                    {{ player.ranking }}  
                    {{ player.rankingActual }}<br>
               <br>
               <br>
               </div>`
})

export class PlayerDetails {
        
    @Input() player: Player;
    
    constructor() {
        
    }
    
}