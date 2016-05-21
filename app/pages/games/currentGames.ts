import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {Game} from '../../services/game';
import {Player} from '../../services/player';
import {FormatTimePipe} from '../../pipes/formatTimePipe';

@Component({
    selector: 'current-games',
    templateUrl: 'build/pages/games/currentGames.html',
    pipes: [FormatTimePipe]
})

export class CurrentGames {
        
    @Input() game: Game;
    @Output() showPlayer: EventEmitter<Player> = new EventEmitter();
    
    constructor() {
        
    }
    
    playerClicked(player) {
        this.showPlayer.emit(player);
    }
    
}