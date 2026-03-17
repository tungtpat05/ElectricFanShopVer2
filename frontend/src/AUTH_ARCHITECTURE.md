# Authentication Architecture - ElectricFanShop

## Overview

Hệ thống Authentication được quản lý bằng React Context API, hỗ trợ 2 phương thức login:
1. **Email/Password** - Traditional login
2. **OAuth2 (Google)** - Social login

## Folder Structure

```
frontend/src/
├── context/                    # Authentication Context
│   ├── AuthContext.tsx         # Context definition & useAuth hook
│   ├── AuthProvider.tsx        # Context Provider component
│   └── index.ts                # Barrel export
│
├── services/
│   └── authService.ts          # API calls for auth operations
│
├── pages/
│   ├── SignInPage.tsx          # Email/Password login
│   ├── SignUpPage.tsx          # Registration
│   └── AuthSuccessPage.tsx     # OAuth2 callback handler
│
├── lib/
│   └── axiosClient.ts          # Axios with token interceptors
│
├── components/
│   └── Navbar.tsx              # Uses useAuth() hook
│
└── App.tsx                      # Wrapped with <AuthProvider>
```

## How It Works

### 1. AuthContext (`context/AuthContext.tsx`)

Định nghĩa Context và hook `useAuth`:

```typescript
export interface AuthContextType {
  isLogin: boolean;           // Current login state
  user: User | null;          // Authenticated user info
  loading: boolean;           // Loading state during init
  logout: () => Promise<void>; // Logout function
}

export const useAuth = () => {
  // Hook để consume auth context trong components
}
```

### 2. AuthProvider (`context/AuthProvider.tsx`)

- **Khởi tạo (initialization)**: Khi app load, nó kiểm tra `localStorage` có token không
  - Nếu có token → gọi `getUser()` để verify & lấy user info
  - Nếu không → set `isLogin = false`
  
- **Token Management**: Lưu token vào `localStorage` sau khi login thành công
  
- **Logout**: Xóa token từ localStorage và reset state

### 3. API Interceptors (`lib/axiosClient.ts`)

```typescript
// Request Interceptor: Tự động thêm token vào header
Authorization: Bearer <token>

// Response Interceptor: Handle 401 errors
// Nếu token expired → xóa token và redirect to /login
```

### 4. Auth Service (`services/authService.ts`)

Các API functions:

- `getUser()` - Lấy info user hiện tại
- `loginWithEmail(email, password)` - Login với email/password
- `register(email, password, fullName)` - Đăng ký tài khoản mới
- `loginWithOAuth(provider)` - OAuth2 flow
- `logout()` - Logout API call

### 5. Login Flow

#### Email/Password Login
```
SignInPage.tsx
    ↓
loginWithEmail() → axiosClient.post("/auth/login")
    ↓
Token stored in localStorage
    ↓
Navigate to "/"
    ↓
AuthProvider re-fetches user info
    ↓
isLogin = true
```

#### OAuth2 Login
```
SignInPage.tsx
    ↓
handleGoogleLogin() → redirect to backend OAuth endpoint
    ↓
Backend handles OAuth flow, issues token
    ↓
Redirect to /auth/success callback
    ↓
AuthSuccessPage verifies login status
    ↓
Redirect to "/"
```

## Using useAuth Hook

```typescript
import { useAuth } from '../context';

const MyComponent = () => {
  const { isLogin, user, loading, logout } = useAuth();
  
  if (loading) return <Loading />;
  
  if (isLogin && user) {
    return <p>Welcome {user.fullName}!</p>;
  }
  
  return <p>Please log in</p>;
};
```

## Token Management

- **Storage**: `localStorage.authToken`
- **Header**: Automatically added as `Authorization: Bearer <token>`
- **Expiration**: 401 response → auto-redirect to `/login`
- **Persistence**: Token persists across page refreshes until expired

## Protected Routes (Future Enhancement)

Có thể tạo `PrivateRoute` component để bảo vệ routes cần authentication:

```typescript
const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
  const { isLogin, loading } = useAuth();
  
  if (loading) return <Loading />;
  return isLogin ? element : <Navigate to="/login" />;
};

// Usage:
<Route path="/dashboard" element={<PrivateRoute element={<DashboardPage />} />} />
```

## Backend Integration Points

1. **POST `/auth/login`** - Email/password login
   - Request: `{ email, password }`
   - Response: `{ token, user }`

2. **POST `/auth/register`** - User registration
   - Request: `{ email, password, fullName }`
   - Response: `{ token, user }`

3. **GET `/auth/me`** - Get current user
   - Header: `Authorization: Bearer <token>`
   - Response: `{ id, email, fullName, role }`

4. **POST `/auth/logout`** - Logout (optional)
   - Header: `Authorization: Bearer <token>`

5. **GET `/oauth2/authorization/google`** - OAuth2 redirect
   - Backend handles Google OAuth flow

## Security Considerations

✅ **Implemented:**
- Token stored in localStorage (accessible to JS)
- Automatic token inclusion in all API calls
- Token expiration handling (401 redirects)

⚠️ **Future Improvements:**
- Use httpOnly cookies instead of localStorage (more secure against XSS)
- Add refresh token rotation
- Add CSRF protection
- Implement token refresh logic

## Troubleshooting

**Issue**: `useAuth() must be used within AuthProvider`
- **Solution**: Ensure `App.tsx` wraps child components with `<AuthProvider>`

**Issue**: Token not being sent in requests
- **Solution**: Check localStorage has `authToken` key set correctly

**Issue**: User not persisting after refresh
- **Solution**: Verify backend `/auth/me` endpoint works correctly and returns user data

---

Last Updated: March 2026

