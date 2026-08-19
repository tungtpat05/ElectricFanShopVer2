package com.company.electricfanshop.dto.product.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductSpecificationCreateRequest {
    @NotNull(message = "Spec definition ID must not be null")
    @Positive(message = "Spec definition ID must be positive")
    private Integer specDefinitionId;

    @Size(max = 255, message = "Value must be at most 255 characters")
    private String value;

    private BigDecimal valueNumber;

    private Integer optionId;
}
