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
    rankingSingleEndOfYear: string = "";
    rankingSingleActual: string = "";
    rankingDoubleEndOfYear: string = "";
    rankingDoubleActual: string = "";    
                                
    constructor(knltbNumber: string) {
        this.knltbNumber = knltbNumber;
    }
    
}    