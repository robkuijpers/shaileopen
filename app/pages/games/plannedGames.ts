import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {Game} from '../../services/game';
import {Player} from '../../services/player';
import {FormatTimePipe} from '../../pipes/formatTimePipe';

@Component({
    selector: 'planned-games',
    templateUrl: 'build/pages/games/plannedGames.html',
    pipes: [FormatTimePipe]    
})

export class PlannedGames {
        
    @Input() game: Game;
    @Output() showPlayer: EventEmitter<Player> = new EventEmitter();
    
    constructor() {
        
    }
    
    playerClicked(player) {
        this.showPlayer.next(player);
    }
    
}