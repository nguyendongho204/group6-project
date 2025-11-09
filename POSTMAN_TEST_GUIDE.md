# 📮 POSTMAN - TEST API FORGOT PASSWORD, RESET PASSWORD & UPLOAD AVATAR

## 🎯 Mục Tiêu
Test 3 API endpoints để chứng minh backend hoạt động đúng.

---

## ⚙️ CHUẨN BỊ

### 1. Đảm bảo Backend đang chạy
```powershell
cd backend
npm start
# ✅ Phải thấy: "Server is running on port 5001"
```

### 2. Tạo tài khoản test (nếu chưa có)

**Method:** POST  
**URL:** `http://localhost:5001/api/auth/signup`  
**Body (JSON):**
```json
{
  "name": "Test User",
  "email": "testuser@example.com",
  "password": "123456"
}
```

**Response mong đợi:**
```json
{
  "message": "Đăng ký thành công",
  "user": {
    "_id": "...",
    "name": "Test User",
    "email": "testuser@example.com",
    "role": "User"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 📧 TEST 1: API FORGOT PASSWORD

### Endpoint Information
- **Method:** POST
- **URL:** `http://localhost:5001/api/forgot-password`
- **Headers:** 
  - `Content-Type: application/json`
- **Authentication:** Không cần token

### Request Body (JSON)
```json
{
  "email": "testuser@example.com"
}
```

### Steps trong Postman:

1. **Tạo New Request**
   - Click "New" → "HTTP Request"
   - Đặt tên: "Forgot Password"

2. **Cấu hình Request**
   - Method: `POST`
   - URL: `http://localhost:5001/api/forgot-password`
   
3. **Thêm Headers**
   - Tab "Headers"
   - Key: `Content-Type`
   - Value: `application/json`

4. **Thêm Body**
   - Tab "Body"
   - Chọn "raw"
   - Chọn "JSON" (dropdown bên phải)
   - Paste:
   ```json
   {
     "email": "testuser@example.com"
   }
   ```

5. **Click "Send"**

### ✅ Response Mong Đợi (200 OK):
```json
{
  "message": "Email reset mật khẩu đã được gửi. Vui lòng kiểm tra email hoặc console log.",
  "resetUrl": "http://localhost:3000/reset-password/5c3a0208c984544..."
}
```

### ❌ Response Lỗi (404 Not Found):
```json
{
  "message": "Không tìm thấy tài khoản"
}
```

### 📸 Screenshot cần chụp:
1. **Postman Request** - URL, Headers, Body
2. **Postman Response** - Status 200, message thành công
3. **Backend Console** - Log hiển thị Reset URL

### 🔍 Kiểm tra Backend Console:
Sau khi gửi request, check terminal backend sẽ thấy:
```
========================================
📧 RESET PASSWORD REQUEST
========================================
Email: testuser@example.com
Reset URL: http://localhost:3000/reset-password/[token]
Token expires: [timestamp]
========================================
```

**💡 LƯU Ý:** Copy `token` từ resetUrl để dùng cho test tiếp theo!

---

## 🔑 TEST 2: API RESET PASSWORD

### Endpoint Information
- **Method:** POST
- **URL:** `http://localhost:5001/api/reset-password`
- **Headers:** 
  - `Content-Type: application/json`
- **Authentication:** Không cần token

### Request Body (JSON)
```json
{
  "token": "5c3a0208c984544c69c0848049d3268fc8cb2509d3d278da326e1ad6b10f3bf6",
  "password": "newpassword123"
}
```

**⚠️ QUAN TRỌNG:** Token phải lấy từ response của API Forgot Password ở trên!

### Steps trong Postman:

1. **Tạo New Request**
   - Click "New" → "HTTP Request"
   - Đặt tên: "Reset Password"

2. **Cấu hình Request**
   - Method: `POST`
   - URL: `http://localhost:5001/api/reset-password`

3. **Thêm Headers**
   - Tab "Headers"
   - Key: `Content-Type`
   - Value: `application/json`

4. **Thêm Body**
   - Tab "Body"
   - Chọn "raw"
   - Chọn "JSON"
   - Paste (thay `token` bằng token thật từ forgot password):
   ```json
   {
     "token": "PASTE_TOKEN_FROM_FORGOT_PASSWORD_HERE",
     "password": "newpassword123"
   }
   ```

5. **Click "Send"**

### ✅ Response Mong Đợi (200 OK):
```json
{
  "message": "Đổi mật khẩu thành công"
}
```

### ❌ Response Lỗi (400 Bad Request):
```json
{
  "message": "Token không hợp lệ hoặc đã hết hạn"
}
```

### 📸 Screenshot cần chụp:
1. **Postman Request** - URL, Body với token
2. **Postman Response** - Status 200, message thành công

### ✅ Verify:
Sau khi reset, thử đăng nhập với mật khẩu mới:

**Method:** POST  
**URL:** `http://localhost:5001/api/auth/login`  
**Body:**
```json
{
  "email": "testuser@example.com",
  "password": "newpassword123"
}
```

Phải đăng nhập thành công! ✅

---

## 📷 TEST 3: API UPLOAD AVATAR

### Endpoint Information
- **Method:** POST
- **URL:** `http://localhost:5001/api/upload-avatar`
- **Headers:** 
  - `Authorization: Bearer <token>`
- **Authentication:** ✅ CẦN TOKEN (từ login)

### Bước 1: Lấy Token

Trước tiên phải đăng nhập để lấy token:

**Method:** POST  
**URL:** `http://localhost:5001/api/auth/login`  
**Body:**
```json
{
  "email": "testuser@example.com",
  "password": "newpassword123"
}
```

**Response:**
```json
{
  "message": "Đăng nhập thành công",
  "user": {...},
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**💡 Copy token này!**

---

### Bước 2: Upload Avatar

#### Steps trong Postman:

1. **Tạo New Request**
   - Click "New" → "HTTP Request"
   - Đặt tên: "Upload Avatar"

2. **Cấu hình Request**
   - Method: `POST`
   - URL: `http://localhost:5001/api/upload-avatar`

3. **Thêm Authorization Header**
   - Tab "Headers"
   - Key: `Authorization`
   - Value: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   
   **⚠️ QUAN TRỌNG:** Phải có chữ `Bearer ` (có khoảng trắng) trước token!

4. **Thêm File Upload**
   - Tab "Body"
   - Chọn "form-data" (không phải raw!)
   - Key: `avatar` (phải đúng tên này)
   - Type: Đổi từ "Text" sang "File" (click dropdown)
   - Value: Click "Select Files" → chọn ảnh JPG/PNG

5. **Click "Send"**

### ✅ Response Mong Đợi (200 OK):
```json
{
  "message": "Cập nhật avatar thành công",
  "avatarUrl": "http://localhost:5001/uploads/avatars/avatar-1699564800000-123456789.jpg"
}
```

### ❌ Response Lỗi (400 Bad Request):
```json
{
  "message": "Vui lòng chọn ảnh để tải lên"
}
```

### ❌ Response Lỗi (401 Unauthorized):
```json
{
  "message": "Token không hợp lệ"
}
```
→ Kiểm tra lại token trong Authorization header!

### 📸 Screenshot cần chụp:
1. **Postman Request** - URL, Headers (Authorization), Body (form-data với file)
2. **Postman Response** - Status 200, avatarUrl
3. **File Explorer** - Thư mục `backend/uploads/avatars/` có file ảnh mới
4. **Browser** - Truy cập `avatarUrl` để xem ảnh

### ✅ Verify Upload Thành Công:

**Cách 1: Kiểm tra file**
```powershell
# Mở Windows Explorer
explorer backend\uploads\avatars
# Phải thấy file ảnh mới được tạo
```

**Cách 2: Truy cập URL**
- Copy `avatarUrl` từ response
- Paste vào trình duyệt
- Phải thấy ảnh hiển thị!

**Cách 3: Kiểm tra DB**
Gọi API lấy thông tin user:

**Method:** GET  
**URL:** `http://localhost:5001/api/auth/me`  
**Headers:** `Authorization: Bearer <token>`

Response sẽ có field `avatar` với URL ảnh.

---

## 📁 POSTMAN COLLECTION

### Import Collection (Optional)

Tạo file `Postman_Collection.json`:

```json
{
  "info": {
    "name": "Group6 API Tests",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Signup",
          "request": {
            "method": "POST",
            "header": [{"key": "Content-Type", "value": "application/json"}],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Test User\",\n  \"email\": \"testuser@example.com\",\n  \"password\": \"123456\"\n}"
            },
            "url": "http://localhost:5001/api/auth/signup"
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [{"key": "Content-Type", "value": "application/json"}],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"testuser@example.com\",\n  \"password\": \"123456\"\n}"
            },
            "url": "http://localhost:5001/api/auth/login"
          }
        }
      ]
    },
    {
      "name": "Password Reset",
      "item": [
        {
          "name": "Forgot Password",
          "request": {
            "method": "POST",
            "header": [{"key": "Content-Type", "value": "application/json"}],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"testuser@example.com\"\n}"
            },
            "url": "http://localhost:5001/api/forgot-password"
          }
        },
        {
          "name": "Reset Password",
          "request": {
            "method": "POST",
            "header": [{"key": "Content-Type", "value": "application/json"}],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"token\": \"PASTE_TOKEN_HERE\",\n  \"password\": \"newpassword123\"\n}"
            },
            "url": "http://localhost:5001/api/reset-password"
          }
        }
      ]
    },
    {
      "name": "Upload Avatar",
      "request": {
        "method": "POST",
        "header": [{"key": "Authorization", "value": "Bearer PASTE_TOKEN_HERE"}],
        "body": {
          "mode": "formdata",
          "formdata": [{"key": "avatar", "type": "file", "src": ""}]
        },
        "url": "http://localhost:5001/api/upload-avatar"
      }
    }
  ]
}
```

**Import vào Postman:**
1. Postman → Import → Upload Files
2. Chọn file `Postman_Collection.json`
3. Tất cả requests đã sẵn sàng!

---

## ✅ CHECKLIST TEST HOÀN CHỈNH

### Test Forgot Password:
- [ ] Request gửi thành công (200 OK)
- [ ] Response có `message` và `resetUrl`
- [ ] Backend console log hiển thị token
- [ ] Screenshot Postman request
- [ ] Screenshot Postman response
- [ ] Screenshot backend console

### Test Reset Password:
- [ ] Request với token hợp lệ (200 OK)
- [ ] Response: "Đổi mật khẩu thành công"
- [ ] Đăng nhập với mật khẩu mới thành công
- [ ] Screenshot Postman request
- [ ] Screenshot Postman response
- [ ] Screenshot login với password mới

### Test Upload Avatar:
- [ ] Login lấy token thành công
- [ ] Upload với Authorization header (200 OK)
- [ ] Response có `avatarUrl`
- [ ] File xuất hiện trong `backend/uploads/avatars/`
- [ ] Truy cập URL hiển thị ảnh
- [ ] Screenshot Postman request (Headers + Body)
- [ ] Screenshot Postman response
- [ ] Screenshot file trong thư mục
- [ ] Screenshot ảnh hiển thị trong browser

---

## 🎯 TEST CASES BONUS (Error Handling)

### Forgot Password - Email không tồn tại:
```json
{
  "email": "notexist@example.com"
}
```
→ Expect: 404, "Không tìm thấy tài khoản"

### Reset Password - Token không hợp lệ:
```json
{
  "token": "invalid-token-123",
  "password": "newpass123"
}
```
→ Expect: 400, "Token không hợp lệ hoặc đã hết hạn"

### Upload Avatar - Không có token:
Gửi request không có Authorization header  
→ Expect: 401 Unauthorized

### Upload Avatar - Không chọn file:
Gửi request với body trống  
→ Expect: 400, "Vui lòng chọn ảnh để tải lên"

---

## 🚀 SẴN SÀNG TEST!

**Thứ tự test:**
1. ✅ Signup/Login (lấy token)
2. ✅ Forgot Password (lấy reset token)
3. ✅ Reset Password (dùng reset token)
4. ✅ Login lại (với password mới)
5. ✅ Upload Avatar (dùng JWT token)

**Tất cả đều phải thành công!** 🎉
