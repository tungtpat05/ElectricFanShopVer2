package com.company.electricfanshop.dto.product.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SpecDefinitionOptionResponse {
    private Integer id;
    private String optionValue;
    private Integer displayOrder;
}
