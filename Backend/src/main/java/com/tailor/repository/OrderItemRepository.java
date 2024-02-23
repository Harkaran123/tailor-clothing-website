package com.tailor.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tailor.modal.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
