package com.company.electricfanshop.entity.product;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "color")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Color {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String colorName;

    private String colorCode;
}