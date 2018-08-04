import {Component, OnInit} from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent  implements OnInit {
    pageTitle = 'Product List';
    imageWidth = 30;
    imagemMargin = 2;
    showImage = false;
    products: IProduct[] = [];

    // WE ADD SERVICE HERE
    // USING A ANGULAR INJECTABLE
    // OLD VERSIONS ANGULAR 5.x OR <
    // private _productService: ProductService;
    // constructor(private productService: ProductService) {
    //     this._productService = productService
    // }
    // NOW WE CAN DECLARE THE PRIVATE VARIABLE INLINE OF THE METHOD
    constructor(private _productService: ProductService) {
        // this.listFilter = 'cart';
    }
    filteredProducts: IProduct[];
    private _listFilter: string;
    public get listFilter(): string {
        return this._listFilter;
    }
    public set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((products: IProduct) => 
            products.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        console.warn('OnInit Method');
        this.products = this._productService.getProducts();
        this.filteredProducts = this.products;
    }

}
