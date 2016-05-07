import {Pipe} from 'angular2/core';

@Pipe({
    name: 'formatTime'
})

export class FormatTimePipe {
                      
    constructor() {
        
    }
    
    transform(value: Date, pattern: string): string {
        return value.getHours() + ':' + this.getFullMinutes(value);
    }
    
    getFullMinutes(date: Date) {
       if (date.getMinutes() < 10) {
          return '0' + date.getMinutes();
       }
       return date.getMinutes().toString();
    }
    
}