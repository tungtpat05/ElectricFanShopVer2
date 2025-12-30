/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

/**
 *Created by Tungtpat05 on Sep 21, 2025.
 */
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Table(name="Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;
    
    @Column(name="username")
    private String username;

    @Column(name="password")
    private String password;

    @Column(name="email")
    private String email;

    @Column(name= "fullName")
    private String fullName;

    @Column(name="role")
    private String role;

    @CreationTimestamp
    @Column(name = "createdAt")
    private LocalDateTime createdAt;
    
    //Quan hệ 1-1 User-Cart
    @OneToOne(mappedBy = "user")
    private Cart cart;
    
    //Quan hệ 1-N User-Order
    @OneToMany(mappedBy = "user")
    private List<Order> orders;
}
