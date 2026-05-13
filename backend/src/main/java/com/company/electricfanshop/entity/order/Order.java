package com.company.electricfanshop.entity.order;

import com.company.electricfanshop.entity.common.enums.OrderStatus;
import com.company.electricfanshop.entity.common.enums.PaymentStatus;
import com.company.electricfanshop.entity.promotion.Coupon;
import com.company.electricfanshop.entity.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @CreationTimestamp
    private LocalDateTime orderDate;

    private BigDecimal totalAmount;
    private BigDecimal discountAmount;
    private BigDecimal shippingFee;

    @ManyToOne
    @JoinColumn(name = "coupon_id")
    private Coupon coupon;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    private String paymentMethod;
    private String receiverName;
    private String receiverPhone;
    private String shippingAddress;
    private String note;

    private LocalDateTime confirmedAt;
    private LocalDateTime shippedAt;
    private LocalDateTime deliveredAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems;

    // One Order -> One Shipment
    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)
    private Shipment shipment;
}