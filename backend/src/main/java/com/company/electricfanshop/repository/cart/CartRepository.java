/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.company.electricfanshop.repository.cart;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.company.electricfanshop.entity.cart.Cart;

/**
 *
 * @author nguye
 */
@Repository
public interface CartRepository extends JpaRepository<Cart, Integer>{
    Optional<Cart> findByUserId(Integer userId);
}
