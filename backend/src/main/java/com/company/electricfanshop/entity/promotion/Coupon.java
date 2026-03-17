package com.company.electricfanshop.entity.promotion;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "coupons")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String code;

    private BigDecimal discountValue;
    private Boolean isPercent = true;
    private LocalDateTime expiryDate;
    private BigDecimal minOrderValue;
    private Boolean isActive = true;
}