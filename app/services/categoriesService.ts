import {Injectable} from 'angular2/core';  
import {Http, Headers, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Category} from './category';

@Injectable()
export class CategoriesService { 
    
    private dbUrl: string = 'https://api.mlab.com/api/1/databases/toernooi/collections/';
    private dbKey: string = '&apiKey=sx-HvoL-mQvXhyiMCuaiPsmrerSiveyX';

    private categoriesByOrder: string = 'categories?s={%order%22:%201}';

    constructor(private http: Http) {
        this.http = http;
    }

    getCategoriesByName() {

        return this.http.get(this.dbUrl + this.categoriesByOrder + this.dbKey)
            .map( (res:Response) => { 
                return res.json();             
            })
            .map( (categories:any) => { 
                let result: Array<Category> = [];
            
                if(categories.length > 0) {
                    categories.forEach( (category) => {
                        let c: Category = new Category(category.name); 
                        c.schemas = category.schemas;
                        c.inschrijvingen = category.inschrijvingen;
                        result.push(c);
                    });
                } 
            
                return result;                  
            }); 
    }       
    
}