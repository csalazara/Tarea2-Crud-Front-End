import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { ICategory, IProduct } from '../../../interfaces';
import { ProductService } from '../../../services/product-service';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    ProductFormComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnChanges{ 
  @Input() itemList: IProduct[] = [];
  @Input() categoryList: ICategory[] = [];
  @Input() areActionsAvailable: boolean = false;
  public selectedItem: IProduct = {};
  public productService: ProductService = inject(ProductService);

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['areActionsAvailable']) {
      console.log('areActionsAvailable', this.areActionsAvailable);
    }
  }
  
  showDetailModal(item: IProduct, modal: any) {
    this.selectedItem = {...item}
    modal.show();
  }

  handleFormAction(item: IProduct) {
    this.productService.update(item);
  }

  deleteProduct(item: IProduct) {
    this.productService.delete(item);
  }
}
