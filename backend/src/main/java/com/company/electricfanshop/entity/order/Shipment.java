package com.company.electricfanshop.entity.order;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "shipment")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Shipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // OneToOne: Order <-> Shipment
    @OneToOne
    @JoinColumn(name = "order_id", unique = true, nullable = false)
    private Order order;

    private String trackingNumber;
    private String shippingProvider;
    private String shippingStatus;
    private LocalDateTime shippedDate;
    private LocalDateTime estimatedDeliveryDate;
}