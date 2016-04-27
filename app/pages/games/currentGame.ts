import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {Game} from '../../services/game';

@Component({
    selector: 'current-game',
    template: `<div>{{ game.category }}</div>
               <div>
                 Team 1:
                 <span>
                    <span *ngIf="game.team1.players.length > 0" (click)='fireEvent(game.team1.players[0])'>
                      {{ game.team1.players[0].knltbNumber}}
                    </span>
                    <span *ngIf="game.team1.players.length > 1" (click)='fireEvent(game.team1.players[1])'>
                      - {{ game.team1.players[1].knltbNumber}}
                    </span>
                 </span>
                 <span *ngFor="#set of game.team1.sets">
                   | {{ set }} 
                 </span>
               </div>
               
               <div>
                 Team 2:
                 <span>
                    <span *ngIf="game.team2.players.length > 0" (click)='fireEvent(game.team2.players[0])'>
                      {{ game.team2.players[0].knltbNumber}}
                    </span>
                    <span *ngIf="game.team2.players.length > 1" (click)='fireEvent(game.team2.players[1])'>
                      - {{ game.team2.players[1].knltbNumber}}
                    </span>
                 </span>
                 <span *ngFor="#set of game.team2.sets">
                   | {{ set }} 
                 </span>                        
               </div>                 
              `
})

export class CurrentGame {
        
    @Input() game: Game;
    @Output() myEvent: EventEmitter<any> = new EventEmitter();
    
    constructor() {
        
    }
    
    fireEvent(player) {
        this.myEvent.next(player);
    }
    
}