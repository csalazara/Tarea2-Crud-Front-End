import { Component, inject, OnInit } from '@angular/core';
import { ProductFormComponent } from '../../components/product/product-form/product-form.component';
import { ProductListComponent } from '../../components/product/product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../interfaces';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product-service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    LoaderComponent,
    CommonModule,
    ModalComponent,
    ProductListComponent,
    ProductFormComponent
    
  ],
  templateUrl: './products.component.html', 
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  public productService: ProductService = inject(ProductService);
  public categoryService: CategoryService = inject(CategoryService);
  public route: ActivatedRoute = inject(ActivatedRoute);
  public areActionsAvailable: boolean = false;
  public authService: AuthService =  inject(AuthService);
  public routeAuthorities: string[] =  [];

  ngOnInit(): void {
    this.productService.getAll();
    this.categoryService.getAll();
    this.route.data.subscribe( data => {
      this.routeAuthorities = data['authorities'] ? data['authorities'] : [];
      this.areActionsAvailable = this.authService.areActionsAvailable(this.routeAuthorities);
    });
  }

  handleFormAction(item: IProduct) {
    console.log(item)
    this.productService.save(item);
  }
}
