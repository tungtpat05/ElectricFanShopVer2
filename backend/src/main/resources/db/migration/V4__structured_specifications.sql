-- =============================================
-- V4: Structured Specification System
-- Replaces free-text product_specification with
-- category-driven spec_definition system
-- =============================================

-- 1. Drop old product_specification table
DROP TABLE IF EXISTS product_specification;

-- 2. Remove engine_capacity column from product (drop default constraint first in SQL Server)
DECLARE @ConstraintName nvarchar(200);
SELECT @ConstraintName = name FROM sys.default_constraints
WHERE parent_object_id = OBJECT_ID('product')
AND parent_column_id = (SELECT column_id FROM sys.columns WHERE name = N'engine_capacity' AND object_id = OBJECT_ID('product'));

IF @ConstraintName IS NOT NULL
    EXEC('ALTER TABLE product DROP CONSTRAINT ' + @ConstraintName);

IF EXISTS (SELECT * FROM sys.columns WHERE name = N'engine_capacity' AND object_id = OBJECT_ID('product'))
    ALTER TABLE product DROP COLUMN engine_capacity;

-- 3. Create spec_definition table (linked to category)
CREATE TABLE spec_definition
(
    id            INT IDENTITY PRIMARY KEY,
    category_id   INT NOT NULL REFERENCES category (id) ON DELETE CASCADE,
    key_code      NVARCHAR(100) NOT NULL,
    display_name  NVARCHAR(150) NOT NULL,
    data_type     NVARCHAR(20) NOT NULL DEFAULT 'text'
                  CHECK (data_type IN ('text', 'number', 'select')),
    unit          NVARCHAR(20),
    display_order INT DEFAULT 0,
    is_required   BIT DEFAULT 0,
    is_active     BIT DEFAULT 1,
    CONSTRAINT uq_category_key UNIQUE (category_id, key_code)
);

-- 4. Create spec_definition_option table (for select-type specs)
CREATE TABLE spec_definition_option
(
    id                 INT IDENTITY PRIMARY KEY,
    spec_definition_id INT NOT NULL REFERENCES spec_definition (id) ON DELETE CASCADE,
    option_value       NVARCHAR(150) NOT NULL,
    display_order      INT DEFAULT 0,
    CONSTRAINT uq_spec_option UNIQUE (spec_definition_id, option_value)
);

-- 5. Create new structured product_specification table
CREATE TABLE product_specification
(
    id                 INT IDENTITY PRIMARY KEY,
    product_id         INT NOT NULL REFERENCES product (id) ON DELETE CASCADE,
    spec_definition_id INT NOT NULL REFERENCES spec_definition (id),
    value              NVARCHAR(255),
    value_number       DECIMAL(18, 2),
    option_id          INT REFERENCES spec_definition_option (id),
    CONSTRAINT uq_product_specdef UNIQUE (product_id, spec_definition_id)
);
