package com.company.electricfanshop.entity.product;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "spec_definition_option", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"spec_definition_id", "option_value"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SpecDefinitionOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "spec_definition_id", nullable = false)
    private SpecDefinition specDefinition;

    private String optionValue;

    @Builder.Default
    private Integer displayOrder = 0;
}
