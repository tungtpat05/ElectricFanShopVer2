package com.company.electricfanshop.dto.product.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SpecDefinitionResponse {
    private Integer id;
    private Integer categoryId;
    private String keyCode;
    private String displayName;
    private String dataType;
    private String unit;
    private Integer displayOrder;
    private Boolean isRequired;
    private Boolean isActive;
    private List<SpecDefinitionOptionResponse> options;
}
