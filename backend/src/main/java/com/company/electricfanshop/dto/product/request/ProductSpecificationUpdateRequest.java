package com.company.electricfanshop.dto.product.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductSpecificationUpdateRequest {
    @NotBlank(message = "Specification key must not be blank")
    @Size(max = 100, message = "Specification key must be at most 100 characters")
    private String specKey;

    @NotBlank(message = "Specification value must not be blank")
    @Size(max = 255, message = "Specification value must be at most 255 characters")
    private String specValue;
}

