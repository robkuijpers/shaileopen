export class Category {  

    name: string = "";
    schemas: number = 0;
    inschrijvingen: number = 0;
                        
    // Use ES6 optional parameters with default value.                       
    constructor(name: string, schemas: number = 0, inschrijvingen: number = 0) {
        this.name = name;
    }
 
    toString() {
        // Use ES6 string templates
        return `Category: ${ this.name != null ?  this.name : "" }`;
    }
}    