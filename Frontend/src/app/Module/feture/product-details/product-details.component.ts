import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Models/AppState';
import {
  findProductByIdRequest,
  updateProductRequest,
} from 'src/app/state/Product/Actions';
import { productdata } from 'src/productsData';
import { Observable } from 'rxjs';
import {
  addItemToCartRequest,
  getCartRequest,
} from 'src/app/state/Cart/cart.actions';
import { ProductService } from 'src/app/state/Product/product.service';
import { CartService } from 'src/app/state/Cart/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  selectedSize!: string;
  relatedProducts: any;
  reviews = [1, 1, 1];
  productDetails$!: Observable<any>;
  productId!: Number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private productService: ProductService,
    private cartService:CartService,
  ) {
    this.relatedProducts = productdata;
  }

  navigateToCart = () => {
    this.router.navigate(['/cart']);
  };

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log('productId', id);

    if (id) {
      console.log('id ', id);
      this.productService.findProductById(id)
    }

    this.productDetails$ = this.store.select(
      (state) => state.product.selectedProduct
    );

    this.productDetails$.subscribe((productdata) => {
      this.productId = Number(productdata.id);
      console.log('product details from store - ', productdata.id);
    });
  }

  handleAddToCart = () => {
    // Create an object with data for the cart item (size and productId)
    const data = { size: this.selectedSize, productId: this.productId };

    // Call the cartService to add the item to the cart
    this.cartService.addItemToCart(data)

    // Call the cartService to get the updated cart data
    this.cartService.getCart()

    // Dispatch a Redux action (getCartRequest) to indicate the start of a cart request
    this.store.dispatch(getCartRequest());

    // Navigate to the cart page.
    this.navigateToCart();
  };
}

//Data Preparation: Create an object data containing information needed to add an item to the cart. It includes the selected size (this.selectedSize) and the product ID (this.productId).

//Add Item to Cart: Call the addItemToCart method of cartService with the prepared data. This presumably adds the selected item to the shopping cart.

//Get Updated Cart Data: Call the getCart method of cartService. This is likely used to fetch the updated cart data after adding an item. The assumption is that this method updates the state or performs some action related to the cart.

//Dispatch Redux Action: Dispatch a Redux action (getCartRequest) using this.store.dispatch. This action is likely used to signal the start of a cart request, and it might be handled by a Redux reducer to update the cart-related state.

//Navigate to Cart: Call navigateToCart to navigate the user to the cart page. This function is assumed to be defined elsewhere in your code and handles the navigation logic.
