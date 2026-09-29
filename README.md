# ⚡ ElectricFanShop (Version 2)

Hệ thống thương mại điện tử chuyên kinh xe mô tô, được xây dựng theo kiến trúc **Full-Stack Separated** (Spring Boot REST API + React TypeScript Frontend).

---

## 🚀 Công Nghệ Sử Dụng (Tech Stack)

### 🔹 Backend
* **Language & Framework**: Java 21, Spring Boot 3.2.3
* **Database**: Microsoft SQL Server
* **Database Migration**: Flyway
* **Security & Auth**: Spring Security, JWT (JSON Web Token), Google OAuth2 Client
* **Cloud Storage**: Cloudinary Java SDK (Quản lý và tải lên hình ảnh sản phẩm)
* **API Documentation**: Springdoc OpenAPI / Swagger UI
* **Build Tool**: Maven

### 🔹 Frontend
* **Core & Framework**: React 19, TypeScript, Vite
* **UI Library**: Material UI (MUI v7), Emotion, React Icons
* **State & Routing**: React Router v7, Axios (kết nối API backend)

---

## ✨ Tính Năng Chính

### 🛍️ Khách hàng (Client Portal)
* **Trang chủ & Danh mục**: Xem danh sách sản phẩm, lọc theo thương hiệu, loại quạt, khoảng giá.
* **Chi tiết sản phẩm**: Xem thông số kỹ thuật, hình ảnh, biến thể sản phẩm, đánh giá từ khách hàng.
* **Giỏ hàng & Đặt hàng**: Quản lý giỏ hàng, cập nhật số lượng, tạo và xem trạng thái đơn hàng.
* **Xác thực người dùng**: Đăng ký, Đăng nhập (JWT), Đăng nhập nhanh qua Google OAuth2.
* **Tài khoản cá nhân**: Quản lý thông tin profile, lịch sử mua hàng.

### 🛡️ Quản trị viên (Admin Portal)
* **Dashboard**: Tổng quan hệ thống.
* **Quản lý sản phẩm**: Thêm, sửa, xóa sản phẩm, tải ảnh trực tiếp lên Cloudinary.
* **Quản lý danh mục & thương hiệu**: Quản lý Category và Brand.
* **Quản lý đơn hàng & khuyến mãi**: Theo dõi đơn hàng, áp dụng các chương trình giảm giá.

---

## 📁 Cấu Trúc Dự Án (Project Structure)

```text
ElectricFanShopVer2/
├── backend/                  # Spring Boot REST API
│   ├── src/main/java/        # Mã nguồn Java (Controller, Service, Entity, Security, DTO...)
│   ├── src/main/resources/   # Application properties/yml & Flyway migration scripts
│   ├── .env                  # Cấu hình biến môi trường Backend
│   └── pom.xml               # Maven configuration
│
├── frontend/                 # React TypeScript Single Page Application
│   ├── src/                  # Components, Pages, Routes, Services, Assets
│   ├── package.json          # Node dependencies & npm scripts
│   └── vite.config.ts        # Vite configuration & proxy settings (Port 3000 -> 8081)
│
└── README.md                 # Tài liệu hướng dẫn dự án
```

---

## 🛠️ Hướng Dẫn Cài Đặt & Chạy Dự Án

### 📋 Yêu cầu hệ thống
* **Java**: JDK 21+
* **Node.js**: Node.js LTS (v18 trở lên)
* **Database**: SQL Server 2019+

---

### 1️⃣ Cấu hình Backend

1. Di chuyển vào thư mục `backend`:
   ```bash
   cd backend
   ```

2. Tạo hoặc chỉnh sửa file `.env` tại thư mục `backend/` với các thông số phù hợp:
   ```env
   SPRING_APPLICATION_NAME=electricfanshop
   SPRING_DATASOURCE_URL=jdbc:sqlserver://localhost:1433;databaseName=ElectricFanShopDB;encrypt=false;trustServerCertificate=true
   SPRING_DATASOURCE_USERNAME=sa
   SPRING_DATASOURCE_PASSWORD=your_password
   SERVER_PORT=8081

   # OAuth2 Google
   OAUTH2_GOOGLE_CLIENT_ID=your_google_client_id
   OAUTH2_GOOGLE_CLIENT_SECRET=your_google_client_secret
   OAUTH2_SUCCESS_REDIRECT_URL=http://localhost:3000

   # JWT
   JWT_SECRET_KEY=your_64_character_hex_secret_key

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

3. Khởi chạy Backend (Spring Boot sẽ tự động chạy Flyway migration để khởi tạo bảng dữ liệu):
   ```bash
   ./mvnw spring-boot:run
   ```
   Backend sẽ lắng nghe tại: `http://localhost:8081`

---

### 2️⃣ Cấu hình Frontend

1. Di chuyển vào thư mục `frontend`:
   ```bash
   cd frontend
   ```

2. Cài đặt các gói phụ thuộc (dependencies):
   ```bash
   npm install
   ```

3. Chạy ứng dụng Frontend ở chế độ Development:
   ```bash
   npm run dev
   ```
   Frontend sẽ khởi chạy tại: `http://localhost:3000`

---

## 📚 Tài Liệu API (Swagger UI)

Khi Backend đang chạy, truy cập đường dẫn sau để xem toàn bộ tài liệu API RESTful:
👉 **[http://localhost:8081/swagger-ui/index.html](http://localhost:8081/swagger-ui/index.html)**