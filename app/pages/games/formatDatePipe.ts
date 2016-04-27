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
        let d = value.getDate() + ' ';
        d += this.months[value.getMonth()] + ' ';
        d += value.getFullYear();
        return d;
    }
}