import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {Game} from '../../services/game';
import {Player} from '../../services/player';
import {FormatTimePipe} from '../../pipes/formatTimePipe';

@Component({
    selector: 'finished-games',
    templateUrl: 'build/pages/games/finishedGames.html',
    pipes: [FormatTimePipe]    
})

export class FinishedGames {
        
    @Input() game: Game;
    @Output() showPlayer: EventEmitter<Player> = new EventEmitter();
    
    constructor() {
        
    }
    
    playerClicked(player) {
        this.showPlayer.next(player);
    }
    
}