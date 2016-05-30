import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {Game} from '../../services/game';
import {Player} from '../../services/player';
import {FormatTimePipe} from '../../pipes/formatTimePipe';

@Component({
    selector: 'game',
    templateUrl: 'build/pages/games/game.html',
    pipes: [FormatTimePipe]    
})

export class GamePage {
        
    @Input() game: Game;
    @Output() showPlayer: EventEmitter<Player> = new EventEmitter();
    
    constructor() {
        
    }
    
    playerClicked(player) {
        this.showPlayer.next(player);
    }
    
}