package com.tailor.service;

import com.tailor.exception.ProductException;
import com.tailor.modal.Cart;
import com.tailor.modal.CartItem;
import com.tailor.modal.User;
import com.tailor.request.AddItemRequest;

public interface CartService {
	
	public Cart createCart(User user);
	
	public CartItem addCartItem(Long userId,AddItemRequest req) throws ProductException;
	
	public Cart findUserCart(Long userId);

}
