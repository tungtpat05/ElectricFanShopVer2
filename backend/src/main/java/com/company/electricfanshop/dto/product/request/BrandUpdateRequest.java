package com.company.electricfanshop.dto.product.request;

import lombok.*;
import jakarta.validation.constraints.*;
import org.hibernate.validator.constraints.URL;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BrandUpdateRequest {
    @NotBlank(message = "Brand name must not be blank")
    @Size(min = 2, max = 100, message = "Brand name must be between 2 and 100 characters")
    private String brandName;

    @NotBlank(message = "Logo URL must not be blank")
    @URL(message = "Logo URL must be a valid URL")
    private String logoUrl;

    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;

    private Boolean isActive;
}
