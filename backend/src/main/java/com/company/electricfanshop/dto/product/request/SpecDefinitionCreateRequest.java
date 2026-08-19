package com.company.electricfanshop.dto.product.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SpecDefinitionCreateRequest {
    @NotBlank(message = "Key code must not be blank")
    @Size(max = 100, message = "Key code must be at most 100 characters")
    @Pattern(regexp = "^[a-z0-9_]+$", message = "Key code must contain only lowercase letters, numbers, and underscores")
    private String keyCode;

    @NotBlank(message = "Display name must not be blank")
    @Size(max = 150, message = "Display name must be at most 150 characters")
    private String displayName;

    @NotBlank(message = "Data type must not be blank")
    @Pattern(regexp = "^(text|number|select)$", message = "Data type must be 'text', 'number', or 'select'")
    private String dataType;

    @Size(max = 20, message = "Unit must be at most 20 characters")
    private String unit;

    private Integer displayOrder;

    private Boolean isRequired;
}
