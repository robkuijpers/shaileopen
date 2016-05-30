import {OnInit} from 'angular2/core';  
import {Page, Loading, NavController, NavParams} from 'ionic-angular';
import {CategoriesService} from '../../services/categoriesService';
import {Category} from '../../services/category';

@Page({
  templateUrl: 'build/pages/poules/poules.html',
  providers: [CategoriesService]
})

export class PoulesPage {
   
  poules: Array<any>;
  category: Category;
    
  constructor(private nav: NavController, private navParams: NavParams, private categoriesService: CategoriesService) {
      this.categoriesService = categoriesService;
      this.navParams = navParams;
  }
  
  ngOnInit() {
      
      let loading: Loading = Loading.create({
         content: "Please wait..."
      });
      
      this.category = this.navParams.get('category');
            
      //this.nav.present(loading);
      
      this.poules = this.categoriesService.getPoulesForCategory(this.category.name); 
      
      //loading.dismiss();
  }
  
}
