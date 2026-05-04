-- ---------------------------------------------------------
-- 1. SEED DATA FOR BRANDS
-- ---------------------------------------------------------
INSERT INTO Brands (brand_name, logo_url, description)
VALUES (N'Panasonic', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b',
        N'Thương hiệu Nhật Bản chất lượng cao'),
       (N'Mitsubishi', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b', N'Bền bỉ và tiết kiệm điện'),
       (N'Senko', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b', N'Thương hiệu Việt Nam quốc dân'),
       (N'AsiaVina', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b', N'Quạt điện hàng đầu Việt Nam'),
       (N'KDK', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b', N'Phân khúc cao cấp từ Nhật Bản'),
       (N'Toshiba', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b', N'Công nghệ hiện đại, vận hành êm ái'),
       (N'Sharp', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b', N'Thiết kế thông minh, đa năng');

-- ---------------------------------------------------------
-- 2. SEED DATA FOR CATEGORIES
-- ---------------------------------------------------------
INSERT INTO Categories (category_name, slug, category_image, description)
VALUES (N'Quạt Đứng', 'quat-dung', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b',
        N'Quạt cây đứng có thể thay đổi chiều cao'),
       (N'Quạt Treo Tường', 'quat-treo-tuong', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b',
        N'Tiết kiệm diện tích cho căn phòng'),
       (N'Quạt Trần', 'quat-tran', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b',
        N'Làm mát diện rộng cho phòng khách'),
       (N'Quạt Bàn', 'quat-ban', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b',
        N'Nhỏ gọn để bàn làm việc'),
       (N'Quạt Hộp', 'quat-hop', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b', N'An toàn cho trẻ nhỏ'),
       (N'Quạt Phun Sương', 'quat-phun-suong', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b',
        N'Làm mát sâu bằng hơi nước'),
       (N'Quạt Tích Điện', 'quat-tich-dien', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b',
        N'Giải pháp cho mùa hè mất điện'),
       (N'Quạt Công Nghiệp', 'quat-cong-nghiep', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b',
        N'Công suất lớn cho nhà xưởng'),
       (N'Quạt Tháp', 'quat-thap', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b',
        N'Thiết kế sang trọng, hiện đại'),
       (N'Quạt Thông Gió', 'quat-thong-gio', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b',
        N'Lưu thông không khí nhà bếp, phòng tắm');

-- ---------------------------------------------------------
-- 3. SEED DATA FOR COLORS
-- ---------------------------------------------------------
INSERT INTO Colors (color_name, color_code)
VALUES (N'Trắng', '#FFFFFF'),
       (N'Đen', '#000000'),
       (N'Xám', '#808080'),
       (N'Xanh Dương', '#0000FF'),
       (N'Vân Gỗ', '#8B4513');

-- ---------------------------------------------------------
-- 4. GENERATE 150 SAMPLE PRODUCTS
-- ---------------------------------------------------------
SET
NOCOUNT ON;
DECLARE
@i INT = 1;
DECLARE
@brand_id INT;
DECLARE
@cat_id INT;
DECLARE
@price DECIMAL(18,2);

WHILE
@i <= 150
BEGIN
SELECT TOP 1 @brand_id = id
FROM Brands
ORDER BY NEWID();
SELECT TOP 1 @cat_id = id
FROM Categories
ORDER BY NEWID();
SET
@price = (FLOOR(RAND()*(5000-500+1))+500) * 1000;

INSERT INTO Products (product_name, slug, brand_id, category_id, summary, description, base_price, thumbnail,
                      is_featured)
VALUES (N'Quạt ' + (SELECT category_name FROM Categories WHERE id = @cat_id) + ' Model ' + CAST(@i AS NVARCHAR(10)),
        'quat-model-sku-' + CAST(@i AS NVARCHAR(10)),
        @brand_id,
        @cat_id,
        N'Mô tả ngắn cho sản phẩm quạt thứ ' + CAST(@i AS NVARCHAR(10)),
        N'Đây là phần mô tả chi tiết cho sản phẩm. Quạt có khả năng tiết kiệm điện, vận hành êm ái và bền bỉ.',
        @price,
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b',
        CASE WHEN @i % 10 = 0 THEN 1 ELSE 0 END);
SET
@i = @i + 1;
END;

-- ---------------------------------------------------------
-- 5. SEED PRODUCT VARIANTS
-- ---------------------------------------------------------
-- Create one default variant for every product
INSERT INTO ProductVariants (product_id, color_id, sku, additional_price, stock_quantity, variant_image)
SELECT id,
       (SELECT TOP 1 id FROM Colors ORDER BY NEWID()),
       'SKU-' + CAST(id AS NVARCHAR(10)) + '-MAIN',
       0,
       100,
       'https://images.unsplash.com/photo-1546435770-a3e426bf472b'
FROM Products;

-- ---------------------------------------------------------
-- 6. SEED SAMPLE USERS
-- ---------------------------------------------------------
INSERT INTO Users (email, password_hash, full_name, role)
VALUES ('admin@shopquat.com', 'hashed_password_123', N'Quản Trị Viên', 'ADMIN'),
       ('staff1@shopquat.com', 'hashed_password_123', N'Nguyễn Nhân Viên', 'STAFF'),
       ('khachhang1@gmail.com', 'hashed_password_123', N'Trần Văn Khách', 'CUSTOMER'),
       ('khachhang2@gmail.com', 'hashed_password_123', N'Lê Thị Mua', 'CUSTOMER');

-- ---------------------------------------------------------
-- 7. SEED USER ADDRESSES
-- ---------------------------------------------------------
DECLARE
@uid1 INT = (SELECT id FROM Users WHERE email = 'khachhang1@gmail.com');
DECLARE
@uid2 INT = (SELECT id FROM Users WHERE email = 'khachhang2@gmail.com');

INSERT INTO UserAddresses (user_id, receiver_name, receiver_phone, province_city, district, ward, detail_address,
                           is_default)
VALUES (@uid1, N'Trần Văn Khách', '0901234567', N'Hồ Chí Minh', N'Quận 1', N'Phường Bến Nghé', N'123 Lê Lợi', 1),
       (@uid2, N'Lê Thị Mua', '0908887776', N'Hà Nội', N'Hoàn Kiếm', N'Phường Hàng Đào', N'45 Hàng Ngang', 1);

-- ---------------------------------------------------------
-- 8. SEED PROMOTIONAL COUPONS
-- ---------------------------------------------------------
INSERT INTO Coupons (code, discount_value, is_percent, expiry_date, min_order_value)
VALUES ('SUMMER2026', 10, 1, '2026-12-31', 500000),
       ('GIAM50K', 50000, 0, '2026-12-31', 200000);

-- ---------------------------------------------------------
-- 9. SEED SAMPLE ORDER & ORDER ITEMS
-- ---------------------------------------------------------
DECLARE
@p_id INT = (SELECT TOP 1 id FROM Products);
DECLARE
@v_id INT = (SELECT TOP 1 id FROM ProductVariants WHERE product_id = @p_id);
DECLARE
@p_price DECIMAL(18,2) = (SELECT base_price FROM Products WHERE id = @p_id);

-- Create sample order for customer 1
INSERT INTO Orders (user_id, total_amount, payment_method, receiver_name, receiver_phone, shipping_address,
                    order_status)
VALUES (@uid1, @p_price, 'COD', N'Trần Văn Khách', '0901234567', N'123 Lê Lợi, P. Bến Nghé, Q1, HCM', 'CONFIRMED');

-- Link item to the order using SCOPE_IDENTITY()
INSERT INTO OrderItems (order_id, product_id, variant_id, quantity, price)
VALUES (SCOPE_IDENTITY(), @p_id, @v_id, 1, @p_price);

-- ---------------------------------------------------------
-- 10. APPLY DISCOUNTS
-- ---------------------------------------------------------
-- Apply a 15% discount to all even-numbered product IDs
-- Round to the nearest thousand (e.g., 425,123 -> 425,000)
UPDATE Products
SET discount_price = ROUND(base_price * 0.85, -3)
WHERE id % 2 = 0;
GO