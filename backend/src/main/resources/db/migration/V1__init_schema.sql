CREATE TABLE brand
(
    id          INT IDENTITY PRIMARY KEY,
    brand_name  NVARCHAR(100) NOT NULL,
    logo_url    NVARCHAR(255),
    description NVARCHAR(500),
    is_active   BIT DEFAULT 1
);

CREATE TABLE category
(
    id             INT IDENTITY PRIMARY KEY,
    category_name  NVARCHAR(100) NOT NULL,
    slug           NVARCHAR(100) UNIQUE NOT NULL,
    category_image NVARCHAR(255),
    description    NVARCHAR(500),
    is_active      BIT DEFAULT 1
);

CREATE TABLE product
(
    id              INT IDENTITY PRIMARY KEY,
    product_name    NVARCHAR(200) NOT NULL,
    slug            NVARCHAR(200) UNIQUE NOT NULL,
    brand_id        INT REFERENCES brand (id),
    category_id     INT            NOT NULL REFERENCES category (id),
    summary         NVARCHAR(500),
    description     NVARCHAR(MAX),
    base_price      DECIMAL(18, 2) NOT NULL CHECK (base_price >= 0),
    discount_price  DECIMAL(18, 2) CHECK (discount_price >= 0),
    thumbnail       NVARCHAR(255) NOT NULL,
    engine_capacity INT      DEFAULT 0,
    weight_gram     INT      DEFAULT 1000,
    length_cm       INT      DEFAULT 50,
    width_cm        INT      DEFAULT 50,
    height_cm       INT      DEFAULT 50,
    is_featured     BIT      DEFAULT 0,
    is_active       BIT      DEFAULT 1,
    created_at      DATETIME DEFAULT GETDATE()
);

CREATE TABLE product_image
(
    id            INT IDENTITY PRIMARY KEY,
    product_id    INT NOT NULL REFERENCES product (id) ON DELETE CASCADE,
    image_url     NVARCHAR(255) NOT NULL,
    display_order INT DEFAULT 0
);

CREATE TABLE color
(
    id         INT IDENTITY PRIMARY KEY,
    color_name NVARCHAR(50) NOT NULL UNIQUE,
    color_code NVARCHAR(20)
);

CREATE TABLE product_variant
(
    id               INT IDENTITY PRIMARY KEY,
    product_id       INT NOT NULL REFERENCES product (id) ON DELETE CASCADE,
    color_id         INT NOT NULL REFERENCES color (id),
    sku              NVARCHAR(100) UNIQUE NOT NULL,
    additional_price DECIMAL(18, 2) DEFAULT 0 CHECK (additional_price >= 0),
    stock_quantity   INT            DEFAULT 0 CHECK (stock_quantity >= 0),
    variant_image    NVARCHAR(255),
    is_active        BIT            DEFAULT 1,
    CONSTRAINT uq_product_color UNIQUE (product_id, color_id)
);

CREATE TABLE [user]
(
    id            INT IDENTITY PRIMARY KEY,
    password_hash NVARCHAR(255) NULL,
    email         NVARCHAR(100) UNIQUE NOT NULL,
    full_name     NVARCHAR(100) NOT NULL,
    role          NVARCHAR(20) DEFAULT 'CUSTOMER' CHECK (role IN ('ADMIN', 'STAFF', 'CUSTOMER')),
    is_active     BIT      DEFAULT 1,
    created_at    DATETIME DEFAULT GETDATE()
);

CREATE TABLE user_social_account
(
    id          INT IDENTITY PRIMARY KEY,
    user_id     INT NOT NULL REFERENCES [user] (id) ON DELETE CASCADE,
    provider    NVARCHAR(50) NOT NULL,
    provider_id NVARCHAR(255) NOT NULL,
    CONSTRAINT uq_social_provider UNIQUE (provider, provider_id)
);

CREATE TABLE cart
(
    id         INT IDENTITY PRIMARY KEY,
    user_id    INT NOT NULL UNIQUE REFERENCES [user] (id) ON DELETE CASCADE,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE cart_item
(
    id         INT IDENTITY PRIMARY KEY,
    cart_id    INT NOT NULL REFERENCES cart (id) ON DELETE CASCADE,
    variant_id INT NOT NULL REFERENCES product_variant (id),
    quantity   INT NOT NULL CHECK (quantity > 0),
    CONSTRAINT uq_cart_variant UNIQUE (cart_id, variant_id)
);

CREATE TABLE coupon
(
    id              INT IDENTITY PRIMARY KEY,
    code            NVARCHAR(50) UNIQUE NOT NULL,
    discount_value  DECIMAL(18, 2) NOT NULL,
    is_percent      BIT            DEFAULT 1,
    expiry_date     DATETIME,
    min_order_value DECIMAL(18, 2) DEFAULT 0,
    is_active       BIT            DEFAULT 1
);

CREATE TABLE user_address
(
    id             INT IDENTITY PRIMARY KEY,
    user_id        INT NOT NULL REFERENCES [user] (id) ON DELETE CASCADE,
    receiver_name  NVARCHAR(100) NOT NULL,
    receiver_phone NVARCHAR(20) NOT NULL,

    province_city  NVARCHAR(100) NOT NULL,
    district       NVARCHAR(100) NOT NULL,
    ward           NVARCHAR(100) NOT NULL,
    detail_address NVARCHAR(255) NOT NULL,

    is_default     BIT      DEFAULT 0,
    created_at     DATETIME DEFAULT GETDATE()
);

CREATE TABLE [order]
(
    id               INT IDENTITY PRIMARY KEY,
    user_id          INT            NOT NULL REFERENCES [user] (id),
    order_date       DATETIME       DEFAULT GETDATE(),
    total_amount     DECIMAL(18, 2) NOT NULL,
    discount_amount  DECIMAL(18, 2) DEFAULT 0,
    shipping_fee     DECIMAL(18, 2) DEFAULT 0,
    coupon_id        INT NULL REFERENCES coupon(id) ON DELETE SET NULL,

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

CREATE TABLE order_item
(
    id         INT IDENTITY PRIMARY KEY,
    order_id   INT            NOT NULL REFERENCES [order] (id) ON DELETE CASCADE,
    variant_id INT            NOT NULL REFERENCES product_variant (id),
    quantity   INT            NOT NULL CHECK (quantity > 0),
    price      DECIMAL(18, 2) NOT NULL CHECK (price >= 0)
);

CREATE TABLE shipment
(
    id                      INT IDENTITY PRIMARY KEY,
    order_id                INT NOT NULL UNIQUE REFERENCES [order] (id) ON DELETE CASCADE,
    tracking_number         NVARCHAR(100),
    shipping_provider       NVARCHAR(50),
    shipping_status         NVARCHAR(50),
    shipped_date            DATETIME,
    estimated_delivery_date DATETIME
);

CREATE TABLE review
(
    id            INT IDENTITY PRIMARY KEY,
    order_item_id INT NOT NULL UNIQUE REFERENCES order_item (id),
    user_id       INT NOT NULL REFERENCES [user] (id),
    rating        INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment       NVARCHAR(MAX),
    is_active     BIT      DEFAULT 1,
    created_at    DATETIME DEFAULT GETDATE()
);

CREATE TABLE product_specification
(
    id         INT IDENTITY PRIMARY KEY,
    product_id INT NOT NULL REFERENCES product (id) ON DELETE CASCADE,
    spec_key   NVARCHAR(100) NOT NULL,
    spec_value NVARCHAR(255) NOT NULL,
    CONSTRAINT uq_product_spec UNIQUE (product_id, spec_key)
);