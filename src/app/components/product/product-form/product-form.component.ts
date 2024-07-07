import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICategory, IProduct } from '../../../interfaces';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './product-form.component.html', 
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  @Input() product: IProduct =  {};
  @Input() itemList: ICategory[] = [];
  @Input() action = '';
  @Output() callParentEvent: EventEmitter<IProduct> = new EventEmitter<IProduct>()

  compareCategories(category1: ICategory, category2: ICategory): boolean {
    return category1 && category2 ? category1.id === category2.id : category1 === category2;
  }

  callEvent() {
    this.callParentEvent.emit(this.product);
  }
}
