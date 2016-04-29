import {OnInit} from 'angular2/core';  
import {IonicApp, Page, NavController} from 'ionic-angular';
import {CategoriesService} from '../../services/categoriesService';
import {Category} from '../../services/category';

@Page({
  templateUrl: 'build/pages/categories/categories.html',
  providers: [CategoriesService]
})

export class CategoriesPage {
  
  nav: NavController;
  app: IonicApp;
  
  categories: Array<Category>;
    
  constructor(private categoriesService: CategoriesService) {
      this.categoriesService = categoriesService;
  }

  ngOnInit() {
      this.categoriesService.getCategoriesByName().subscribe(
          (data) => {
              this.categories = data;
          }, 
          (err) => console.log(err));
  }
    
}
