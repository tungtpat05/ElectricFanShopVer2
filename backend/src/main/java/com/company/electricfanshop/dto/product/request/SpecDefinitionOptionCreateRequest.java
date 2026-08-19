package com.company.electricfanshop.dto.product.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SpecDefinitionOptionCreateRequest {
    @NotBlank(message = "Option value must not be blank")
    @Size(max = 150, message = "Option value must be at most 150 characters")
    private String optionValue;

    private Integer displayOrder;
}
