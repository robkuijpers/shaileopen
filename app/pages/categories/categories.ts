import {OnInit} from 'angular2/core';  
import {Page, Loading, NavController} from 'ionic-angular';
import {CategoriesService} from '../../services/categoriesService';
import {Category} from '../../services/category';
import {PoulesPage} from '../poules/poules';

@Page({
  templateUrl: 'build/pages/categories/categories.html',
  providers: [CategoriesService]
})

export class CategoriesPage {
   
  categories: Array<Category>;
    
  constructor(private nav: NavController, private categoriesService: CategoriesService) {
      this.categoriesService = categoriesService;
      this.nav = nav;
  }
  
  ngOnInit() {
      
      let loading: Loading = Loading.create({
         content: "Please wait..."
      });
      
      this.nav.present(loading);
            
      this.categoriesService.getCategoriesByName().subscribe(
          (data) => {
              loading.dismiss();
              this.categories = data;
          }, 
          (err) => {
              loading.dismiss(); 
              console.log(err)
          });
  }
  
  showPoules(category: Category) {
      console.log('poules page:' + category);
      this.nav.push(PoulesPage, { category: category });
  }
    
}
