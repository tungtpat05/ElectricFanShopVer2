/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.company.electricfanshop.repository.order;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.company.electricfanshop.entity.order.Order;
import com.company.electricfanshop.entity.user.User;

/**
 *
 * @author nguye
 */
@Repository
public interface OrderRepository extends JpaRepository<Order, Integer>{
}
