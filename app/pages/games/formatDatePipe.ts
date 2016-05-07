import {Pipe} from 'angular2/core';

@Pipe({
    name: 'formatDate'
})

export class FormatDatePipe {
    
    private months = ['januari', 'februari', 'maart', 'april',
                      'mei', 'juni' ,'juli', 'augustus',
                      'september', 'oktober', 'november', 'december'];
                      
    constructor() {
        
    }
    
    transform(value: Date, pattern: string): string {
        return value.getDate() + ' ' + 
               this.months[value.getMonth()] + ' ' + 
               value.getFullYear();
    }
}