export class Player {  

    knltbNumber: string = "";     
    initials: string = "";
    firstName: string = "";
    prefix: string = "";
    surName: string = "";
    dateOfBirth: Date = null;
    gender: string = "";
    club: string = "";
    email: string = "";
    phone: string = "";    
    ranking: string = "";
    rankingActual: string = "";
                                
    constructor(knltbNumber: string) {
        this.knltbNumber = knltbNumber;
    }
    
}    