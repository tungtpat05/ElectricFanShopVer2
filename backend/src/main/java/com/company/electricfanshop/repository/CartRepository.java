/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.company.electricfanshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.company.electricfanshop.entity.Cart;
import com.company.electricfanshop.entity.User;

/**
 *
 * @author nguye
 */
@Repository
public interface CartRepository extends JpaRepository<Cart, Integer>{
    Cart findByUser(User user);
}
