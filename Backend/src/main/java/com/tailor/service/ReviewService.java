package com.tailor.service;

import java.util.List;

import com.tailor.exception.ProductException;
import com.tailor.modal.Review;
import com.tailor.modal.User;
import com.tailor.request.ReviewRequest;

public interface ReviewService {

	public Review createReview(ReviewRequest req,User user) throws ProductException;
	
	public List<Review> getAllReview(Long productId);
	
	
}
