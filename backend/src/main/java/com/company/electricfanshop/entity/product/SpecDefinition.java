package com.company.electricfanshop.entity.product;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "spec_definition", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"category_id", "key_code"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SpecDefinition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    private String keyCode;

    private String displayName;

    @Builder.Default
    private String dataType = "text";

    private String unit;

    @Builder.Default
    private Integer displayOrder = 0;

    @Builder.Default
    private Boolean isRequired = false;

    @Builder.Default
    private Boolean isActive = true;

    @OneToMany(mappedBy = "specDefinition", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("displayOrder ASC")
    private List<SpecDefinitionOption> options;
}
