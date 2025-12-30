/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
@Table(name="Orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;
    
    @ManyToOne
    @JoinColumn(name="userId")
    private User user;
    
    @CreationTimestamp
    @Column(name="orderDate")
    private LocalDateTime orderDate;
    
    @Column(name="totalAmount")
    private BigDecimal totalAmount;
    
    @Column(name = "status")
    private String status;
    
    @Column(name = "shippingAddress")
    private String shippingAddress;
    
    @Column(name = "shippingPhone")
    private String shippingPhone;
    
    @OneToMany(mappedBy = "order", fetch = FetchType.EAGER)
    private List<OrderItem> orderItems = new ArrayList<>();

}