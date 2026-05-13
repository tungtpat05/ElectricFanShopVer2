package com.company.electricfanshop.dto.product.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ColorUpdateRequest {
    @NotBlank(message = "Color name must not be blank")
    @Size(min = 2, max = 50, message = "Color name must be between 2 and 50 characters")
    private String colorName;

    @NotBlank(message = "Color code must not be blank")
    @Pattern(regexp = "^#[0-9A-Fa-f]{6}$", message = "Color code must be a valid hex color (e.g., #FF5733)")
    private String colorCode;
}
