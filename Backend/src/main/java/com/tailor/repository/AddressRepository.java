package com.tailor.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tailor.modal.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
