package com.tailor.service;

import java.util.List;

import com.tailor.exception.UserException;
import com.tailor.modal.User;

public interface UserService {
	
	public User findUserById(Long userId) throws UserException;
	
	public User findUserProfileByJwt(String jwt) throws UserException;
	
	public List<User> findAllUsers();

}
