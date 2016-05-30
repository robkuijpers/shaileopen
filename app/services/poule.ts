export class Poule {  

    name: string = null;
    category: string = null;
    teams: Array<any> = [];
    
                            
    constructor(name: string, category: string) {
        this.name = name;
        this.category = category;
    }
    
}    