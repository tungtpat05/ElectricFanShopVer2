package com.company.electricfanshop.dto.product.request;

import lombok.*;
import java.math.BigDecimal;
import jakarta.validation.constraints.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductVariantCreateRequest {
    @NotNull(message = "Color ID must not be null")
    @Positive(message = "Color ID must be positive")
    private Integer colorId;

    @NotBlank(message = "SKU must not be blank")
    @Size(min = 2, max = 50, message = "SKU must be between 2 and 50 characters")
    @Pattern(regexp = "^[A-Z0-9-]+$", message = "SKU must contain only uppercase letters, numbers, and hyphens")
    private String sku;

    @DecimalMin(value = "0.0", inclusive = true, message = "Additional price must be greater than or equal to 0")
    private BigDecimal additionalPrice;

    @NotNull(message = "Stock quantity must not be null")
    @Min(value = 0, message = "Stock quantity must be greater than or equal to 0")
    private Integer stockQuantity;

    @NotBlank(message = "Variant image must not be blank")
    private String variantImage;
}

