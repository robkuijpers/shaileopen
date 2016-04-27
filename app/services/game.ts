export class Game {  

    date: Date = null;
    type: string = "";       // single / double
    category: string = "";   // HE7, GD7
    status: string = "";     // planned, current, finished
    court: string = "";      //
    duration: string = "";   //
    team1: any = [];         //
    team2: any = [];         //
    result = "";             // TEAM1_WALKOVER / TEAM2_WALKOVER / TEAM1_OPGEGEVEN / TEAM2_OPGEGEVEN / TEAM1_WINNER / TEAM2_WINNER
                        
    constructor() {

    }
    
    isFinished() {
        return this.status === 'finished';
    }
    
    isCurrent() {
        return this.status === 'current';
    }
    
    isPlanned() {
        return this.status === 'planned';
    }
    
}    