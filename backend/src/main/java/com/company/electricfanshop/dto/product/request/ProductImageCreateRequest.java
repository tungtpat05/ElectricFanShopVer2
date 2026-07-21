package com.company.electricfanshop.dto.product.request;

import lombok.*;
import jakarta.validation.constraints.*;
import org.hibernate.validator.constraints.URL;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductImageCreateRequest {
    @NotBlank(message = "Image URL must not be blank")
    @URL(message = "Image URL must be a valid URL")
    private String imageUrl;

    private String imagePublicId;
}

