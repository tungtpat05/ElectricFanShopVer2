-- 1. REMOVE UNIQUE constraint (product_id, color_id)
ALTER TABLE ProductVariants
DROP
CONSTRAINT uq_product_color;
GO

-- 2. ADD version column for optimistic locking
ALTER TABLE ProductVariants
    ADD version INT DEFAULT 0;
GO

CREATE TABLE Attributes
(
    id   INT IDENTITY PRIMARY KEY,
    name NVARCHAR(100) NOT NULL
);
GO

CREATE TABLE AttributeValues
(
    id           INT IDENTITY PRIMARY KEY,
    attribute_id INT NOT NULL REFERENCES Attributes (id),
    value        NVARCHAR(100) NOT NULL
);
GO

CREATE TABLE VariantAttributes
(
    id                 INT IDENTITY PRIMARY KEY,
    variant_id         INT NOT NULL REFERENCES ProductVariants (id) ON DELETE CASCADE,
    attribute_value_id INT NOT NULL REFERENCES AttributeValues (id),
    CONSTRAINT uq_variant_attr UNIQUE (variant_id, attribute_value_id)
);
GO
