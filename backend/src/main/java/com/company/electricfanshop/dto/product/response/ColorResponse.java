package com.company.electricfanshop.dto.product.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ColorResponse {
    private Integer id;
    private String colorName;
    private String colorCode;
}
