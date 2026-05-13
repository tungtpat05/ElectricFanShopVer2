-- 1. CartItems
DECLARE
@ConstraintCart NVARCHAR(200);

SELECT @ConstraintCart = fk.name
FROM sys.foreign_keys fk
         JOIN sys.foreign_key_columns fkc ON fk.object_id = fkc.constraint_object_id
         JOIN sys.columns c ON fkc.parent_object_id = c.object_id AND fkc.parent_column_id = c.column_id
WHERE fk.parent_object_id = OBJECT_ID('CartItems')
  AND c.name = 'product_id';

IF
@ConstraintCart IS NOT NULL
    EXEC('ALTER TABLE CartItems DROP CONSTRAINT ' + QUOTENAME(@ConstraintCart));

IF
EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('CartItems') AND name = 'product_id')
ALTER TABLE CartItems DROP COLUMN product_id;


-- 2. OrderItems
DECLARE
@ConstraintOrder NVARCHAR(200);

SELECT @ConstraintOrder = fk.name
FROM sys.foreign_keys fk
         JOIN sys.foreign_key_columns fkc ON fk.object_id = fkc.constraint_object_id
         JOIN sys.columns c ON fkc.parent_object_id = c.object_id AND fkc.parent_column_id = c.column_id
WHERE fk.parent_object_id = OBJECT_ID('OrderItems')
  AND c.name = 'product_id';

IF
@ConstraintOrder IS NOT NULL
    EXEC('ALTER TABLE OrderItems DROP CONSTRAINT ' + QUOTENAME(@ConstraintOrder));

IF
EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('OrderItems') AND name = 'product_id')
ALTER TABLE OrderItems DROP COLUMN product_id;