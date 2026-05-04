CREATE TABLE Brands
(
    id          INT IDENTITY PRIMARY KEY,
    brand_name  NVARCHAR(100) NOT NULL,
    logo_url    NVARCHAR(255),
    description NVARCHAR(500),
    is_active   BIT DEFAULT 1
);

CREATE TABLE Categories
(
    id             INT IDENTITY PRIMARY KEY,
    category_name  NVARCHAR(100) NOT NULL,
    slug           NVARCHAR(100) UNIQUE NOT NULL,
    category_image NVARCHAR(255),
    description    NVARCHAR(500),
    is_active      BIT DEFAULT 1
);

CREATE TABLE Products
(
    id             INT IDENTITY PRIMARY KEY,
    product_name   NVARCHAR(200) NOT NULL,
    slug           NVARCHAR(200) UNIQUE NOT NULL,
    brand_id       INT REFERENCES Brands (id),
    category_id    INT            NOT NULL REFERENCES Categories (id),
    summary        NVARCHAR(500),
    description    NVARCHAR(MAX),
    base_price     DECIMAL(18, 2) NOT NULL CHECK (base_price >= 0),
    discount_price DECIMAL(18, 2) CHECK (discount_price >= 0),
    thumbnail      NVARCHAR(255) NOT NULL,
    weight_gram    INT      DEFAULT 1000,
    length_cm      INT      DEFAULT 50,
    width_cm       INT      DEFAULT 50,
    height_cm      INT      DEFAULT 50,
    is_featured    BIT      DEFAULT 0,
    is_active      BIT      DEFAULT 1,
    created_at     DATETIME DEFAULT GETDATE()
);

CREATE TABLE ProductImages
(
    id            INT IDENTITY PRIMARY KEY,
    product_id    INT NOT NULL REFERENCES Products (id) ON DELETE CASCADE,
    image_url     NVARCHAR(255) NOT NULL,
    display_order INT DEFAULT 0
);

CREATE TABLE Colors
(
    id         INT IDENTITY PRIMARY KEY,
    color_name NVARCHAR(50) NOT NULL UNIQUE,
    color_code NVARCHAR(20)
);

CREATE TABLE ProductVariants
(
    id               INT IDENTITY PRIMARY KEY,
    product_id       INT NOT NULL REFERENCES Products (id) ON DELETE CASCADE,
    color_id         INT NOT NULL REFERENCES Colors (id),
    sku              NVARCHAR(100) UNIQUE NOT NULL,
    additional_price DECIMAL(18, 2) DEFAULT 0 CHECK (additional_price >= 0),
    stock_quantity   INT            DEFAULT 0 CHECK (stock_quantity >= 0),
    variant_image    NVARCHAR(255),
    is_active        BIT            DEFAULT 1,
    CONSTRAINT uq_product_color UNIQUE (product_id, color_id)
);

CREATE TABLE Users
(
    id            INT IDENTITY PRIMARY KEY,
    password_hash NVARCHAR(255) NULL,
    email         NVARCHAR(100) UNIQUE NOT NULL,
    full_name     NVARCHAR(100) NOT NULL,
    role          NVARCHAR(20) DEFAULT 'CUSTOMER' CHECK (role IN ('ADMIN', 'STAFF', 'CUSTOMER')),
    is_active     BIT      DEFAULT 1,
    created_at    DATETIME DEFAULT GETDATE()
);

CREATE TABLE UserSocialAccounts
(
    id          INT IDENTITY PRIMARY KEY,
    user_id     INT NOT NULL REFERENCES Users (id) ON DELETE CASCADE,
    provider    NVARCHAR(50) NOT NULL,
    provider_id NVARCHAR(255) NOT NULL,
    CONSTRAINT uq_social_provider UNIQUE (provider, provider_id)
);

CREATE TABLE Carts
(
    id         INT IDENTITY PRIMARY KEY,
    user_id    INT NOT NULL UNIQUE REFERENCES Users (id) ON DELETE CASCADE,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE CartItems
(
    id         INT IDENTITY PRIMARY KEY,
    cart_id    INT NOT NULL REFERENCES Carts (id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES Products (id),
    variant_id INT NOT NULL REFERENCES ProductVariants (id),
    quantity   INT NOT NULL CHECK (quantity > 0),
    CONSTRAINT uq_cart_variant UNIQUE (cart_id, variant_id)
);

CREATE TABLE Coupons
(
    id              INT IDENTITY PRIMARY KEY,
    code            NVARCHAR(50) UNIQUE NOT NULL,
    discount_value  DECIMAL(18, 2) NOT NULL,
    is_percent      BIT            DEFAULT 1,
    expiry_date     DATETIME,
    min_order_value DECIMAL(18, 2) DEFAULT 0,
    is_active       BIT            DEFAULT 1
);

CREATE TABLE UserAddresses
(
    id             INT IDENTITY PRIMARY KEY,
    user_id        INT NOT NULL REFERENCES Users (id) ON DELETE CASCADE,
    receiver_name  NVARCHAR(100) NOT NULL,
    receiver_phone NVARCHAR(20) NOT NULL,

    province_city  NVARCHAR(100) NOT NULL,
    district       NVARCHAR(100) NOT NULL,
    ward           NVARCHAR(100) NOT NULL,
    detail_address NVARCHAR(255) NOT NULL,

    is_default     BIT      DEFAULT 0,
    created_at     DATETIME DEFAULT GETDATE()
);

CREATE TABLE Orders
(
    id               INT IDENTITY PRIMARY KEY,
    user_id          INT            NOT NULL REFERENCES Users (id),
    order_date       DATETIME       DEFAULT GETDATE(),
    total_amount     DECIMAL(18, 2) NOT NULL,
    discount_amount  DECIMAL(18, 2) DEFAULT 0,
    shipping_fee     DECIMAL(18, 2) DEFAULT 0,
    coupon_id        INT NULL REFERENCES Coupons(id) ON DELETE SET NULL,

    order_status     NVARCHAR(50) DEFAULT 'PENDING',
    payment_status   NVARCHAR(50) DEFAULT 'UNPAID',
    payment_method   NVARCHAR(50),

    receiver_name    NVARCHAR(100) NOT NULL,
    receiver_phone   NVARCHAR(20) NOT NULL,
    shipping_address NVARCHAR(500) NOT NULL,
    note             NVARCHAR(500),

    confirmed_at     DATETIME,
    shipped_at       DATETIME,
    delivered_at     DATETIME,

    CONSTRAINT chk_order_status CHECK (order_status IN ('PENDING', 'CONFIRMED', 'SHIPPING', 'DELIVERED', 'CANCELLED')),
    CONSTRAINT chk_payment_status CHECK (payment_status IN ('UNPAID', 'PAID', 'REFUNDED'))
);

CREATE TABLE OrderItems
(
    id         INT IDENTITY PRIMARY KEY,
    order_id   INT            NOT NULL REFERENCES Orders (id) ON DELETE CASCADE,
    product_id INT            NOT NULL REFERENCES Products (id),
    variant_id INT            NOT NULL REFERENCES ProductVariants (id),
    quantity   INT            NOT NULL CHECK (quantity > 0),
    price      DECIMAL(18, 2) NOT NULL CHECK (price >= 0)
);

CREATE TABLE Shipments
(
    id                      INT IDENTITY PRIMARY KEY,
    order_id                INT NOT NULL UNIQUE REFERENCES Orders (id) ON DELETE CASCADE,
    tracking_number         NVARCHAR(100),
    shipping_provider       NVARCHAR(50),
    shipping_status         NVARCHAR(50),
    shipped_date            DATETIME,
    estimated_delivery_date DATETIME
);

CREATE TABLE Reviews
(
    id            INT IDENTITY PRIMARY KEY,
    order_item_id INT NOT NULL UNIQUE REFERENCES OrderItems (id),
    product_id    INT NOT NULL REFERENCES Products (id),
    user_id       INT NOT NULL REFERENCES Users (id),
    rating        INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment       NVARCHAR(MAX),
    is_active     BIT      DEFAULT 1,
    created_at    DATETIME DEFAULT GETDATE()
);