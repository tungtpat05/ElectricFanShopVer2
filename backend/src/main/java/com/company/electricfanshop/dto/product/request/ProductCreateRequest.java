package com.company.electricfanshop.dto.product.request;

import lombok.*;
import java.math.BigDecimal;
import jakarta.validation.constraints.*;
import org.hibernate.validator.constraints.URL;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductCreateRequest {
    @NotBlank(message = "Product name must not be blank")
    @Size(min = 2, max = 255, message = "Product name must be between 2 and 255 characters")
    private String productName;

    @NotBlank(message = "Slug must not be blank")
    @Size(min = 2, max = 255, message = "Slug must be between 2 and 255 characters")
    @Pattern(regexp = "^[a-z0-9]+(?:-[a-z0-9]+)*$", message = "Slug must contain only lowercase letters, numbers, and hyphens")
    private String slug;

    @NotNull(message = "Brand ID must not be null")
    @Positive(message = "Brand ID must be positive")
    private Integer brandId;

    @NotNull(message = "Category ID must not be null")
    @Positive(message = "Category ID must be positive")
    private Integer categoryId;

    @NotBlank(message = "Summary must not be blank")
    @Size(min = 10, max = 500, message = "Summary must be between 10 and 500 characters")
    private String summary;

    @NotBlank(message = "Description must not be blank")
    @Size(min = 20, max = 2000, message = "Description must be between 20 and 2000 characters")
    private String description;

    @NotNull(message = "Base price must not be null")
    @Positive(message = "Base price must be greater than 0")
    private BigDecimal basePrice;

    @DecimalMin(value = "0.0", inclusive = true, message = "Discount price must be greater than or equal to 0")
    private BigDecimal discountPrice;

    @NotBlank(message = "Thumbnail must not be blank")
    @URL(message = "Thumbnail URL must be a valid URL")
    private String thumbnail;

    private String thumbnailPublicId;

    @PositiveOrZero(message = "Engine capacity must be zero or positive")
    private Integer engineCapacity;

    @Positive(message = "Weight must be positive")
    private Integer weightGram;

    @Positive(message = "Length must be positive")
    private Integer lengthCm;

    @Positive(message = "Width must be positive")
    private Integer widthCm;

    @Positive(message = "Height must be positive")
    private Integer heightCm;

    private Boolean isFeatured;

    @AssertTrue(message = "Discount price must not exceed base price")
    private boolean isDiscountPriceValid() {
        if (basePrice == null || discountPrice == null) {
            return true;
        }
        return discountPrice.compareTo(basePrice) <= 0;
    }
}
