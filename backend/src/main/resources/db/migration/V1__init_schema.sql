USE master;
GO

-- Xóa database nếu đã tồn tại
IF DB_ID('ElectricFanShopDBVer2') IS NOT NULL
BEGIN
    DROP DATABASE ElectricFanShopDBVer2;
END
GO

-- Tạo lại database
CREATE DATABASE ElectricFanShopDBVer2;
GO

USE ElectricFanShopDBVer2;
GO

-- =========================
-- Tạo bảng (Chuẩn hóa snake_case)
-- =========================

-- Users
CREATE TABLE dbo.Users (
    id INT PRIMARY KEY IDENTITY(1,1),
    username NVARCHAR(50) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL, 
    email NVARCHAR(100) NOT NULL UNIQUE,
    full_name NVARCHAR(100) NOT NULL, -- Đã sửa fullName -> full_name
    role NVARCHAR(50),
    created_at DATETIME DEFAULT GETDATE() -- Đã sửa createdAt -> created_at
);

-- Categories
CREATE TABLE dbo.Categories (
    id INT PRIMARY KEY IDENTITY(1,1),
    category_name NVARCHAR(100) NOT NULL, -- Đã sửa category_name -> category_name
    description NVARCHAR(255) NOT NULL
);

-- Products
CREATE TABLE dbo.Products (
    id INT PRIMARY KEY IDENTITY(1,1),
    product_name NVARCHAR(100) NOT NULL, -- Đã sửa productName -> product_name
    description NVARCHAR(MAX) NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    image NVARCHAR(255) NOT NULL,
    category_id INT NOT NULL, -- Giữ nguyên category_id (Chuẩn)
    stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
    CONSTRAINT FK_Products_Categories FOREIGN KEY (category_id) REFERENCES dbo.Categories(id)
);

-- Carts
CREATE TABLE dbo.Carts (
    id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL, -- Đã sửa userId -> user_id
    CONSTRAINT UQ_Carts_User UNIQUE (user_id), 
    CONSTRAINT FK_Carts_Users FOREIGN KEY (user_id) REFERENCES dbo.Users(id)
);

-- CartItems
CREATE TABLE dbo.CartItems (
    id INT PRIMARY KEY IDENTITY(1,1),
    cart_id INT NOT NULL, -- Đã sửa cartId -> cart_id
    product_id INT NOT NULL, -- Đã sửa productId -> product_id
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    CONSTRAINT FK_CartItems_Carts FOREIGN KEY (cart_id) REFERENCES dbo.Carts(id),
    CONSTRAINT FK_CartItems_Products FOREIGN KEY (product_id) REFERENCES dbo.Products(id),
    CONSTRAINT UQ_CartItems_Cart_Product UNIQUE (cart_id, product_id)
);

-- Orders
CREATE TABLE dbo.Orders (
    id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL, -- Đã sửa userId -> user_id
    order_date DATETIME DEFAULT GETDATE(), -- Đã sửa orderDate -> order_date
    total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount >= 0), -- Đã sửa totalAmount -> total_amount
    status NVARCHAR(50) NOT NULL DEFAULT 'Pending',
    shipping_address NVARCHAR(255) NOT NULL, -- Đã sửa shippingAddress -> shipping_address
    shipping_phone NVARCHAR(20) NOT NULL, -- Đã sửa shippingPhone -> shipping_phone
    CONSTRAINT FK_Orders_Users FOREIGN KEY (user_id) REFERENCES dbo.Users(id)
);

-- OrderItems
CREATE TABLE dbo.OrderItems (
    id INT PRIMARY KEY IDENTITY(1,1),
    order_id INT NOT NULL, -- Đã sửa orderId -> order_id
    product_id INT NOT NULL, -- Đã sửa productId -> product_id
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price >= 0), -- Đã sửa unitPrice -> unit_price
    CONSTRAINT FK_OrderItems_Orders FOREIGN KEY (order_id) REFERENCES dbo.Orders(id),
    CONSTRAINT FK_OrderItems_Products FOREIGN KEY (product_id) REFERENCES dbo.Products(id)
);
GO

-- =========================
-- Thêm Data Mẫu (Cập nhật theo tên cột mới)
-- =========================

-- Data cho Category
INSERT INTO dbo.Categories (category_name, description) VALUES
(N'Quạt trần', N'Quạt gắn trên trần, tạo gió đều cho không gian rộng'),
(N'Quạt cây', N'Quạt đứng cao, dễ di chuyển, làm mát diện tích lớn'),
(N'Quạt treo tường', N'Quạt gắn tường, tiết kiệm diện tích, phù hợp phòng nhỏ'),
(N'Quạt sàn', N'Quạt đặt thấp gần sàn, gió mạnh, dùng cho không gian mở'),
(N'Quạt hộp', N'Quạt dạng hộp nhỏ gọn, tiện di chuyển và an toàn'),
(N'Quạt thông gió', N'Quạt hút gió, lưu thông không khí, giảm nóng và ẩm');
GO 

-- Data cho Product
INSERT INTO dbo.Products (product_name, description, price, image, category_id, stock) VALUES
--Quạt trần
(N'Quạt trần Vinawind QT-1400N', N'Quạt trần Vinawind QT-1400N 3 cánh là sản phẩm bình dân đến từ thương hiệu quạt trần Vinawind. Được thiết kế với kiểu dáng sang trọng, màu xanh ngọc, cánh quạt chắc chắn, động cơ hoạt động mạnh mẽ, tạo được luồng gió rộng trong không gian lớn. Đây là loại quạt trần được sử dụng rộng rãi không chỉ trong các hộ gia đình mà còn thích hợp lắp đặt ở những địa điểm lớn những trường học, quán ăn.', 890000, 'https://bizweb.dktcdn.net/100/431/060/products/quattranvinawindqt1400xcanhnho.jpg?v=1641820476533', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt trần'), 1000),
(N'Quạt trần Vinawind QT-1500X', N'Quạt trần Vinawind QT-1500X  5 cánh điều khiển từ xa là sản phẩm nổi bật của Công ty Điện cơ Thống Nhất, mang thương hiệu Vinawind uy tín hơn 50 năm tại Việt Nam. Đây không chỉ là một thiết bị làm mát hiệu quả mà còn là một vật dụng trang trí tinh tế, kết hợp hoàn hảo giữa thiết kế sang trọng, hiện đại và các tính năng thông minh. Với giá cả hợp lý, độ bền cao và khả năng ứng dụng linh hoạt.', 2390000, 'https://bizweb.dktcdn.net/100/431/060/products/quat-tran-vinawind-1500x-1.jpg?v=1741059028930', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt trần'), 1000),
(N'Quạt trần Panasonic F-56NCL', N'Quạt trần Panasonic F-56NCL Thiết kế cổ điển đẹp mắt, tinh tế đến từng chi tiết, Quạt đuợc trang bị hộp số 5 cấp, với màu sắc đồng cổ điển, phù hợp nhiều không gian nhất là không gian mở, như căn hộ, gia đình, nhà hàng, resort...căn hộ nghỉ dưỡng. Được sản xuất tại Malaysia, sử dụng bạc đạn giúp quạt chạy êm ái và bền bỉ.', 1530000, 'https://bizweb.dktcdn.net/100/431/060/products/f-56ncl.jpg?v=1659862241633', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt trần'), 1000),
(N'Quạt trần Panasonic F-60DHN', N'Quạt trần Panasonic F-60DHN 5 cánh động cơ DC, Điều khiển từ xa, điều khiển qua ứng dụng kết nối wifi, Giải pháp sáng tạo cung cấp sự tiện nghi hiện đại cho không gian sống mới. Sử dụng cùng với điều hòa không khí để tiết kiệm năng lượng. Quạt trần 5 cánh, động cơ DC, sải cánh 1500 mm được kết nối ứng dụng di động, Điều khiển bằng ứng dụng di động có kết nối Wi-Fi.', 6490000, 'https://bizweb.dktcdn.net/100/431/060/products/f-60dhn.jpg?v=1733124903540', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt trần'), 1000),
(N'Quạt trần panasonic F-80ZBR', N'Quạt trần Panasonic F-80ZBR sở hữu thiết kế 8 cánh 3D với sải cánh 2m, động cơ DC công suất 57W tiết kiệm điện và vận hành êm ái. Sản phẩm được trang bị 9 cấp độ gió, chế độ gió tự nhiên 1/f Yuragi, cảm biến chuyển động thông minh cùng hẹn giờ bật/tắt linh hoạt. Với chất liệu cánh PPG bền bỉ và remote LED tiện lợi, quạt mang lại luồng gió mạnh mẽ, êm ái và an toàn cho người dùng.', 11890000, 'https://bizweb.dktcdn.net/100/431/060/products/f-80zbr.jpg?v=1659862823630', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt trần'), 1000),
(N'Quạt Trần KDK Z60WS', N'Quạt trần KDK Z60WS là mẫu quạt cao cấp nhất của hãng quạt trần KDK xuất xứ Malaysia. Quạt được thiết kế với 5 cánh thiết kế dạng 3D theo phong cách Châu Âu, sang trọng và hiện đại, với sải cánh 150cm cho lượng gió nhiều và rất đều...', 6460000, 'https://bizweb.dktcdn.net/100/431/060/products/quatkdkz60wswinline5.jpg?v=1625795979660', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt trần'), 1000),
(N'Quạt trần đèn Mountain Air 2831', N'Quạt trần đèn Mountain Air 2831 mang màu vàng hoàng gia là một trong những sản phẩm bán chạy nhất trên thị trường. Màu vàng là màu của thành công và sự giàu sang. Màu vàng cho con người ta cảm giác dễ chịu và nhẹ nhàng. Càng nhìn ngắm lâu lại càng thấy bị thu hút không muốn rời mắt. Thành công và sự giàu sang cũng luôn khiến con người bị lôi cuốn vào như vậy. Trong kiến trúc cổ của người phương Tây, màu vàng là màu chủ đạo, là màu mang lại sự may mắn và hạnh phúc.', 3645000, 'https://bizweb.dktcdn.net/100/431/060/products/quattrandenmountainair2002831.png?v=1625795958070', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt trần'), 1000),
(N'Quạt trần đèn Mountain Air 2835 ', N'Quạt trần đèn Mountain Air 2835 mang trên mình những họa tiết hoa văn trang trí cổ điển của châu âu. Đây là những họa tiết vô cùng cầu kì bao gồm rất nhiều chi tiết nhỏ, là những nét vẽ cách điệu từ vẻ đẹp có trong thiên nhiên như hoa lá, cỏ cây, mây trời và biển gió. Quạt sở hữu một thiết kế ấn tượng, khiến người chiêm ngưỡng khó lòng rời mắt ngay được.', 3750000, 'https://bizweb.dktcdn.net/100/431/060/products/2002835anhdaidien.jpg?v=1625795956197', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt trần'), 1000),
(N'Quạt trần đèn Mountain Air cánh gỗ EU-2830', N'Quạt trần đèn Mountain Air cánh gỗ EU-2830 là sản phẩm cao cấp của hãng Mountain Air với thiết kế bắt mắt, cánh gỗ vân sáng thể hiện sự mạnh mẽ, vững chãi mang đến sự ấm áp cho không gian, sản phẩm được chế tạo trên công nghệ tiên tiến, động cơ được làm bằng thép không gỉ,vận hành êm ái, bền bỉ, ánh sáng đèn LED dịu nhẹ, cộng với màu nâu cam hài hòa nhã nhặn. chắc chắn sẽ đem đến một luồng gió mới cho ngôi nhà của bạn.', 3580000, 'https://bizweb.dktcdn.net/100/431/060/products/quattrandenmountainaircanhgoeu.jpg?v=1625795950093', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt trần'), 1000),

--Quạt cây
(N'Quạt cây Vinawind QĐ-400MS', N'Quạt cây Vinawind QĐ-400MS được người tiêu dùng yêu thích nhờ độ bền và thiết kế chắc chắn, chạy rất êm, lượng gió ra đều làm mát nhanh mà không gây cảm giác ngạt khó chịu. Quạt cây Vinawind 3 nút tốc độ giúp người dùng dễ dàng chọn lựa tùy theo nhu cầu và từng giai đoạn của giấc ngủ.', 640000, 'https://bizweb.dktcdn.net/100/431/060/products/qd-400ms-10.jpg?v=1678411257407', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt cây'), 1000),
(N'Quạt cây Senko DR-1608', N'Quạt cây Senko DR-1608 có thiết kế thon gọn, có thể điều chỉnh chiều cao linh hoạt, dễ dàng di chuyển. Quạt có 3 tốc độ gió, thích hợp để điều chỉnh độ mạnh nhẹ của gió phù hợp yêu cầu của người sử dụng.', 800000, 'https://bizweb.dktcdn.net/100/431/060/products/quat-dung-remote-dr1608.jpg?v=1697250096473', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt cây'), 1000),
(N'Quạt cây Vinawind QĐ-450ĐM', N'Quạt cây Vinawind QĐ-450ĐM có màu đen sạch sẽ, thiết kế dáng đứng, có thể thay đổi được chiều cao nên tản hơi mát ra một không gian rộng. Quạt cây Vinawind phù hợp sử dụng trong gia đình, trường học, văn phòng,… Sản phẩm khi xuất xưởng được kiểm tra một cách nghiêm ngặt nhất đảm bảo tất cả các tiêu chí về độ bền, ổn định và chạy êm của mô tơ, lượng gió ra đều làm mát nhanh và đặc biệt tính tiết kiệm điện rất cao.', 470000, 'https://bizweb.dktcdn.net/100/431/060/products/quat-cay-dung-qd450dm-e.jpg?v=1688983325483', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt cây'), 1000),
(N'Quạt cây điện cơ 91 QĐ-CN450P5', N'Quạt cây điện cơ 91 QĐ-CN450P5, Size 45cm, 60w cho không gian rộng. Là một sự lựa chọn lý tưởng cho những ai đang tìm kiếm một chiếc quạt có lưu lượng gió mạnh mẽ và khả năng đẩy gió xa. Với thiết kế kiểu dáng mạnh mẽ và công suất 60W, sản phẩm này sẽ mang đến cho bạn một không gian thoáng đãng và mát mẻ.', 490000, 'https://bizweb.dktcdn.net/100/431/060/products/dsc-0003-768x913.jpg?v=1751102951820', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt cây'), 1000),
(N'Quạt cây Senko L-1638', N'Quạt cây Senko L-1638 thiết kế với nhiều màu sắc cho người dùng lựa chọn: kem môn, kem nâu, xanh ngọc, xám, cốm. Đường kính sải cánh 39cm cho hiệu quả làm mát tốt hơn. Quạt cây Senko trang bị 3 tốc độ gió: gió nhẹ, trung bình và cao, đáp ứng được mọi nhu cầu làm mát của mỗi thành viên. Quạt có thể chỉnh độ cao từ 77cm - 95cm rất tiện lợi. Chuyển hướng đảo gió từ trái qua phải hoặc ngược lại dễ dàng, để tản gió mát khắp căn phòng. ', 400000, 'https://bizweb.dktcdn.net/100/431/060/products/quat-lung-senko-l1338-01.jpg?v=1709692535710', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt cây'), 1000),

--Quạt treo tường
(N'Quạt treo tường Chinghai W17', N'Quạt treo tường Chinghai W17 Sải cánh 430mm, điều khiển cơ, núm xoay 3 số, 2 dây kéo,  thiết kế treo tường tiện lợi, tiết kiệm không gian, động cơ hoạt động mạnh mẽ, Lồng quạt nan dầy chắc chắn, Phù hợp với nhiều không gian gia đình, nhà xưởng, nhà hàng...', 530000, 'https://bizweb.dktcdn.net/100/431/060/products/quat-treo-tuong-ching-hai-w917.jpg?v=1740471392137', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt treo tường'), 1000),
(N'Quạt treo tường Chinghai W20B', N'Quạt treo tường Chinghai W20B Sải cánh 500mm, điều khiển cơ, núm xoay 3 số, 2 dây kéo,  thiết kế treo tường tiện lợi, tiết kiệm không gian, động cơ hoạt động mạnh mẽ, gió mát giúp quạt mát trên diện tích rộng. Lồng quạt chắc chắn, 3 tốc độ gió khác nhau, Phù hợp với không gian rộng từ 25-50m2, sử dụng rộng rãi trong dân dụng và nhà xưởng', 850000, 'https://bizweb.dktcdn.net/100/431/060/products/anh-quat-w20b.jpg?v=1740471442247', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt treo tường'), 1000),
(N'Quạt treo tường Hatari HG-W16M6', N'Quạt treo tường Hatari HG-W16M6 Sải cánh 500mm, điều khiển cơ, núm xoay 3 số, 2 dây kéo,  thiết kế treo tường tiện lợi, tiết kiệm không gian, động cơ hoạt động mạnh mẽ, gió mát giúp quạt mát trên diện tích rộng. Lồng quạt chắc chắn, 3 tốc độ gió khác nhau, Phù hợp với không gian rộng từ 25-50m2, sử dụng rộng rãi trong dân dụng và nhà xưởng', 1150000, 'https://bizweb.dktcdn.net/100/431/060/products/ht-w16m6-f2140671n.jpg?v=1710235630760', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt treo tường'), 1000),
(N'Quạt treo tường Senko T1680', N'Quạt treo tường Senko T1680 có nhiều màu sắc cho khách hàng lựa chọn : kem cốm, kem môn, kem nâu, xanh ngọc. Quạt có 7 lá quạt, cùng 3 tốc độ gió giúp làm mát nhanh chóng, điều chỉnh tốc độ quạt mạnh nhẹ tùy theo nhu cầu của người sửa dụng.', 350000, 'https://bizweb.dktcdn.net/100/431/060/products/t1680-04.jpg?v=1740555977603', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt treo tường'), 1000),
(N'Quạt treo tường Panasonic F-409MB', N'Quạt treo tường Panasonic F-409MB sử dụng remote điều khiển giúp người dùng chủ động và dễ dàng hơn trong việc thay đổi vận tốc quạt. Ngoài ra, sẽ tiện lợi hơn rất nhiều khi có thể xoay góc của quạt (bằng tay). Quạt treo tường Panasonic F-409MB còn có điều khiển từ xa tiện lợi, giúp người dùng không mất công di chuyển mà vẫn điều chỉnh được các chế độ của quạt tùy ý.', 1840000, 'https://bizweb.dktcdn.net/100/431/060/products/quat-treo-tuong-panasonic-f-409mb-2.jpg?v=1689924301013', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt treo tường'), 1000),
(N'Quạt treo tường công nghiệp Tico B5', N'Quạt treo tường công nghiệp Tico B5 là loại quạt có công suất cao, sử dụng 5 cánh nhỏ cho luồng gió mạnh và đi xa, thân vỏ, bầu , lồng bằng nhựa. Phù hợp với gia đình, cá nhân, phòng trọ, bếp ăn, nhà hàng....Giá cả thuộc nhóm phổ thông', 400000, 'https://bizweb.dktcdn.net/100/431/060/products/quat-treo-tuong-tico-b500-5-canh.jpg?v=1688710114073', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt treo tường'), 1000),


--Quạt sàn
(N'Quạt sàn điện cơ 91 QS-400', N'Quạt sàn điện cơ 91 QS-400 là dòng quạt sàn dân dụng công suất trung bình (54W), chân sắt, cánh nhựa, sải cánh 400mm, thay thế những chiếc quạt bàn không chắc chắn khi di chuyển. Quạt có ưu điểm chân quỳ chắc chắn, dễ dàng di chuyển trong không gian hẹp, dễ bố trí, sắp đặt, sử dụng làm mát tầng thấp mặt sàn nhà, phù hợp với người ngồi', 520000, 'https://bizweb.dktcdn.net/100/431/060/products/dsc-9349-1.jpg?v=1689936577370', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt sàn'), 1000),
(N'Quạt sàn điện cơ 91 QS-450', N'Quạt sàn điện cơ 91 QS-450 sải cánh 450mm, chân sắt sơn tĩnh điện, cánh nhựa, công suất 58W dùng cho nhà hàng, gia đình, phòng trọ... là dòng quạt chân quỳ, thấp, thường dùng để thông thoáng phía dưới mặt sàn, phù hợp với người ngồi, như nhà hàng, công nhân làm việc đông, đóng hộp....', 540000, 'https://bizweb.dktcdn.net/100/431/060/products/quat-san-dien-co-91-qs-450-a.jpg?v=1689240897240', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt sàn'), 1000),
(N'Quạt sàn Chinghai FF-802', N'Quạt sàn Chinghai FF-802 có công suất quạt 49 W quạt nhỏ, dành cho cá nhân, dùng trong gia đình, giúp không gian quanh bạn nhanh chóng được thoáng đãng, dịu mát và khiến tâm trạng của bạn cũng được thoải mái, thư giãn hơn. Thiết kế để sàn nên chuyên dùng trong gia đình, văn phòng', 460000, 'https://bizweb.dktcdn.net/100/431/060/products/quat-san-chinghai-ff-802-1.jpg?v=1659351716643', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt sàn'), 1000),
(N'Quạt sàn chinghai FF-929', N'Quạt sàn Chinghai FF-929 có công suất quạt 105W, sải cánh 50cm, chất liệu cánh: Nhựa, cùng lưu lượng gió lớn, giúp không gian quanh bạn nhanh chóng được thông thoáng, giúp lưu thông không khí, làm mát. Thiết kế để sàn nên ngoài tên gọi là quạt sàn , nó còn có tên gọi quạt chân quỳ, Phù hợp dùng trong gia đình, văn phòng, cũng như trong môi trường sản xuất đông người.', 1000000, 'https://bizweb.dktcdn.net/100/431/060/products/quat-san-chinghai-ff929-2001928-winline-vn-7.jpg?v=1734936942130', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt sàn'), 1000),
(N'Quạt sàn công nghiệp Komasu BS-50TN', N'Quạt sàn công nghiệp Komasu BS-50TN là sản phẩm quạt công nghiệp, lồng sắt sơn tĩnh điện, cánh hợp kim nhôm, công suất 160W gió mạnh. Loại quạt chân quỳ này thường được sử dụng trong các không gian lớn như: nhà hàng, shop, văn phòng, xưởng sản xuất, hội trường công ty, gia đình...', 2000000, 'https://bizweb.dktcdn.net/100/431/060/products/quat-san-komasu-km-500.jpg?v=1748426987333', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt sàn'), 1000),


--Quạt hộp
(N'Quạt hộp Jiplai Thái lan JL-736', N'Quạt hộp Jiplai Thái lan JL-736  với thiết kế hợp lý, 3 tốc độ gió và 1 phím đảo gió dễ  sử dụng. Quạt được sản xuất tại Lào (nguồn gốc từ Thái Lan), là chiếc quạt nổi tiếng bền và gió khỏe.', 880000, 'https://bizweb.dktcdn.net/100/431/060/products/10363quattanjiplaithailanjl736.jpg?v=1625796499400', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt hộp'), 1000),
(N'Quạt hộp Vinawind QH-300LP', N'Quạt hộp Vinawind QH-300LP có thiết kế dáng hộp, cho nhiều vị trí trong nhà như phòng ngủ, phòng khách, phòng cá nhân,... Cánh quạt rộng 40cm, với tốc độ vòng quay lớn, tạo sức gió mạnh mẽ, đảm bảo cung cấp gió và làm mát ổn định nhất cho mọi hoạt động của bạn.', 420000, 'https://bizweb.dktcdn.net/100/431/060/products/quat-hop-vinawind-qh-300lp.jpg?v=1742288428487', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt hộp'), 1000),
(N'Quạt hộp Senko BD-1010', N'Quạt hộp Senko BD-1010 có thiết kế nhỏ gọn, tiện lợi, dễ di chuyển cùng nhiều màu sắc để khách hàng chọn lựa. Với 3 tốc độ khác nhau cùng 5 lá cánh quạt, quạt hộp Senko giúp người tiêu dùng dễ dàng điều chỉnh tốc độ mạnh yếu khác nhau theo nhu cầu của bản thân. Sải cánh rộng 30cm, quạt điện Senko BD-1010 cho làn gió mạnh mẽ, không khí lưu thông liên tục mang lại cảm giác mát mẻ và thoải mái khi sử dụng.', 400000, 'https://bizweb.dktcdn.net/100/431/060/products/bd88606.jpg?v=1625796628640', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt hộp'), 1000),
(N'Quạt hộp chinghai BF-168A Sải cánh 350', N'Quạt hộp Chinghai BF-168A tạo gió ổn định, rộng khắp và rất đều nhờ các lá chắn quay nhiều hướng cùng công suất hoạt động 56W. Với các cánh quạt rộng 35cm làm tăng năng suất làm mát, chắc chắn sẽ mang đến cho cả gia đình bạn những luồng gió mát tức thì.', 700000, 'https://bizweb.dktcdn.net/100/431/060/products/quathopchinghaibf168aremote.jpg?v=1625796500363', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt hộp'), 1000),
(N'Quạt hộp chinghai BF-168B', N'Quạt hộp Chinghai BF-168B có khả năng hoạt động êm ái, tạo sức gió đều và ổn định, không tạo tiếng ồn trong suốt quá trình hoạt động. Nhờ vào tính ổn định của mình mà quạt đảm bảo khả năng làm mát hiệu quả với diện tích làm mát rộng, tạo lưu thông gió trong khắp căn phòng của bạn.', 550000, 'https://bizweb.dktcdn.net/100/431/060/products/quat-hop-tan-gio-chinghai-bf168b.jpg?v=1717660190680', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt hộp'), 1000),

--Quạt thông gió
(N'Quạt thông gió gắn tường Tico TC-14AV6', N'Quạt thông gió gắn tường Tico TC-14AV6 có kích thước vuông, Quạt thông gió Tico được sản xuất tại Việt Nam, có giá rẻ, độ bền cao và vận hành êm ái. Lưu ý, bạn nên bớt lại 2cm để khoan bắt vít, nếu bớt lại kích thước quá nhỏ khi khoan sẽ gây vỡ tường.', 215000, 'https://bizweb.dktcdn.net/100/431/060/products/quathutgiogantuongticotc16av62-71eee5db-d1a1-4679-af8f-1a8e29889ae4.jpg?v=1625796491987', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt thông gió'), 1000),
(N'Quạt thông gió gắn tường Senko H100', N'Quạt thông gió gắn tường Senko H100 là dòng sản phẩm quạt hút tường với sắc trắng nổi bật, đường kính cánh 10cm, thích hợp sử dụng trong không gian nhà tắm, nhà bếp,... để thanh lọc không khí.', 220000, 'https://bizweb.dktcdn.net/100/431/060/products/quathuth100jpg.jpg?v=1625796489650', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt thông gió'), 1000),
(N'Quạt hút âm trần Senko HT150', N'Quạt hút âm trần Senko HT150 được thiết kế đẹp mắt với sắc trắng tinh tế, trang nhã. Với màng lọc được thiết kế theo công nghệ hiện đại, quạt hút âm trần Senko HT150 1 chiều có khả năng lọc khói bụi nhanh chóng, trả lại luồng không khí tươi mát, trong lành.', 300000, 'https://bizweb.dktcdn.net/100/431/060/products/ht150c.jpg?v=1625796668777', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt thông gió'), 1000),
(N'Quạt hút âm trần Vinawind QHT-150PN', N'Quạt hút âm trần Vinawind QHT-150PN được thiết kế đẹp mắt với sắc trắng tinh tế, trang nhã. Với màng lọc được thiết kế theo công nghệ hiện đại, quạt hút âm trần Senko HT150 1 chiều có khả năng lọc khói bụi nhanh chóng, trả lại luồng không khí tươi mát, trong lành.', 310000, 'https://bizweb.dktcdn.net/100/431/060/products/hut-am-tran-vinawind-1.jpg?v=1731662581083', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt thông gió'), 1000),
(N'Quạt hút âm trần Senko HT200', N'Quạt hút âm trần Senko HT200 được thiết kế đẹp mắt với sắc trắng tinh tế, trang nhã. Với màng lọc được thiết kế theo công nghệ hiện đại, quạt hút âm trần Senko HT200 1 chiều có khả năng lọc khói bụi nhanh chóng, trả lại luồng không khí tươi mát, trong lành. ', 320000, 'https://bizweb.dktcdn.net/100/431/060/products/ht200c.jpg?v=1625796476557', (SELECT id FROM dbo.Categories WHERE category_name=N'Quạt thông gió'), 1000);

GO

-- Admin
INSERT INTO dbo.Users (username, password, email, full_name, role)
VALUES ('admin', 'admin@123', 'admin@example.com', N'Quản trị viên', 'ADMIN');

INSERT INTO dbo.Carts (user_id)
SELECT id FROM dbo.Users WHERE role = 'ADMIN';
GO