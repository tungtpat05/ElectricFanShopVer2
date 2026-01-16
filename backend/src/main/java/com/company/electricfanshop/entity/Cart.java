/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.company.electricfanshop.entity;

import jakarta.persistence.*;
import java.util.List;
import lombok.*;

/**
 *Created by Tungtpat05 on Sep 21, 2025.
 */
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Table(name="Carts")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;
    
    //Quan hệ 1-1 Cart-User
    @OneToOne
    @JoinColumn(name="userId")
    private User user;

    //Quan hệ 1-N Cart-CartItem
    @OneToMany(mappedBy = "cart")
    List<CartItem> cartItems;
}
