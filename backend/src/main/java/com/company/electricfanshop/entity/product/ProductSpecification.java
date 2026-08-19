package com.company.electricfanshop.entity.product;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "product_specification", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"product_id", "spec_definition_id"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductSpecification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "spec_definition_id", nullable = false)
    private SpecDefinition specDefinition;

    private String value;

    private BigDecimal valueNumber;

    @ManyToOne
    @JoinColumn(name = "option_id")
    private SpecDefinitionOption option;
}
