package com.tailor.service;

import java.util.List;

import com.tailor.exception.ProductException;
import com.tailor.modal.Rating;
import com.tailor.modal.User;
import com.tailor.request.RatingRequest;

public interface RatingServices {
	
	public Rating createRating(RatingRequest req,User user) throws ProductException;
	
	public List<Rating> getProductsRating(Long productId);

}
