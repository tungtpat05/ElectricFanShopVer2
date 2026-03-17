/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.company.electricfanshop.repository.order;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.company.electricfanshop.entity.order.Order;
import com.company.electricfanshop.entity.order.OrderItem;

/**
 *
 * @author nguye
 */
public interface OrderItemRepository extends JpaRepository<OrderItem, Integer>{

}
