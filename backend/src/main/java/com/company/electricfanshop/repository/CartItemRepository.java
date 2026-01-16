/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.company.electricfanshop.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.company.electricfanshop.entity.Cart;
import com.company.electricfanshop.entity.CartItem;
import com.company.electricfanshop.entity.Product;

/**
 *
 * @author nguye
 */
@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Integer>{
    CartItem findByCartAndProduct(Cart cart, Product product);
    List<CartItem> findByCart(Cart cart);
}
