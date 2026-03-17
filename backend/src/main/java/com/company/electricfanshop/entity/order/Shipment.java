package com.company.electricfanshop.entity.order;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "shipments")
@Data
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