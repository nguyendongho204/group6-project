# 🚀 QUICK START - POSTMAN TEST

## ⚡ Import Collection (Nhanh Nhất!)

### Bước 1: Import
1. Mở Postman
2. Click **Import** (góc trái trên)
3. Kéo thả file `Postman_Collection.json` vào
4. Click **Import**

### Bước 2: Test Theo Thứ Tự

#### 1️⃣ Authentication → Signup
- Tạo tài khoản test
- Token tự động lưu

#### 2️⃣ Authentication → Login
- Đăng nhập
- Token tự động update

#### 3️⃣ Password Reset → Forgot Password
- Gửi request
- Check **Backend Console** để xem Reset Token
- Token tự động lưu vào biến

#### 4️⃣ Password Reset → Reset Password
- Token tự động điền từ bước trước
- Click Send
- Mật khẩu đổi thành `newpassword123`

#### 5️⃣ Password Reset → Login with New Password
- Verify đổi password thành công
- Token mới tự động lưu

#### 6️⃣ Upload Avatar → Upload Avatar
- Click Body → form-data
- Chọn file ảnh trong row `avatar`
- Click Send
- Check response có `avatarUrl`

#### 7️⃣ Upload Avatar → Verify Upload
- Kiểm tra user info có avatar
- Copy `avatarUrl` paste vào browser

---

## 📋 Manual Test (Không Import)

### Test 1: Forgot Password

```
POST http://localhost:5001/api/forgot-password
Content-Type: application/json

Body:
{
  "email": "testuser@example.com"
}
```

**Check:** Backend console có log Reset Token

---

### Test 2: Reset Password

```
POST http://localhost:5001/api/reset-password
Content-Type: application/json

Body:
{
  "token": "PASTE_TOKEN_FROM_CONSOLE",
  "password": "newpassword123"
}
```

**Expect:** "Đổi mật khẩu thành công"

---

### Test 3: Upload Avatar

**Bước 1: Login**
```
POST http://localhost:5001/api/auth/login
Content-Type: application/json

Body:
{
  "email": "testuser@example.com",
  "password": "newpassword123"
}
```

**Bước 2: Upload**
```
POST http://localhost:5001/api/upload-avatar
Authorization: Bearer YOUR_TOKEN_HERE

Body: form-data
- Key: avatar
- Type: File
- Value: [Select Image]
```

**Expect:** 
```json
{
  "message": "Cập nhật avatar thành công",
  "avatarUrl": "http://localhost:5001/uploads/avatars/avatar-xxx.jpg"
}
```

---

## ✅ Checklist

- [ ] Backend chạy (port 5001)
- [ ] Imported Postman Collection
- [ ] Forgot Password: 200 OK
- [ ] Reset Password: 200 OK
- [ ] Upload Avatar: 200 OK
- [ ] Ảnh lưu trong `backend/uploads/avatars/`
- [ ] Truy cập avatarUrl hiển thị ảnh

---

## 📸 Screenshots Cần Chụp

### Forgot Password:
1. Postman Request
2. Postman Response (200 OK)
3. Backend Console Log (Reset URL)

### Reset Password:
1. Postman Request (với token)
2. Postman Response (200 OK)

### Upload Avatar:
1. Postman Request (Headers + Body file)
2. Postman Response (200 OK, avatarUrl)
3. File trong `backend/uploads/avatars/`
4. Browser hiển thị ảnh (paste avatarUrl)

---

## 🎯 Kết Quả Mong Đợi

✅ Tất cả 3 API đều trả về **200 OK**  
✅ Forgot Password → Console log có token  
✅ Reset Password → Đổi mật khẩu thành công  
✅ Upload Avatar → File lưu + URL hoạt động  

**DONE!** 🎉
