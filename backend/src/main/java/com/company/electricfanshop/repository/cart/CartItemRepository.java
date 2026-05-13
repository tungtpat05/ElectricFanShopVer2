/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.company.electricfanshop.repository.cart;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.company.electricfanshop.entity.cart.CartItem;

/**
 *
 * @author nguye
 */
@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Integer>{
    Optional<CartItem> findByCartIdAndVariantId(Integer cartId, Integer variantId);
    List<CartItem> findByCartId(Integer cartId);
}
