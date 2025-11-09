# 📧 HƯỚNG DẪN CẤU HÌNH EMAIL CHO FORGOT PASSWORD

## Bước 1: Tạo App Password cho Gmail

### Cách 1: Sử dụng Gmail Thực Tế (Khuyến Nghị)

1. **Đăng nhập Gmail** của bạn
2. Vào **Google Account Settings**: https://myaccount.google.com/
3. Chọn **Security** (Bảo mật)
4. Bật **2-Step Verification** (Xác minh 2 bước)
   - Nếu chưa bật, làm theo hướng dẫn để bật
5. Sau khi bật 2-Step Verification, quay lại **Security**
6. Tìm và click vào **App passwords** (Mật khẩu ứng dụng)
7. Chọn **Mail** và **Other (Custom name)**
8. Nhập tên: `Group6 Project`
9. Click **Generate**
10. **Sao chép 16 ký tự** được tạo ra (ví dụ: `abcd efgh ijkl mnop`)

### Cách 2: Email Test Miễn Phí (Nhanh Hơn)

Sử dụng dịch vụ email test như:
- **Ethereal Email**: https://ethereal.email/
  - Click "Create Ethereal Account"
  - Lấy thông tin SMTP
  
- **Mailtrap.io**: https://mailtrap.io/
  - Đăng ký tài khoản miễn phí
  - Lấy SMTP credentials

---

## Bước 2: Cập Nhật File `.env`

Mở file `backend/.env` và cập nhật:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-digit-app-password
```

**Ví dụ:**
```env
EMAIL_USER=nguyenvana@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

⚠️ **LƯU Ý:** 
- Không có khoảng trắng trong App Password (hoặc giữ nguyên khoảng trắng)
- Nếu có khoảng trắng, bỏ hết: `abcdefghijklmnop`

---

## Bước 3: Khởi Động Lại Backend

```powershell
# Tắt backend hiện tại (Ctrl + C)
# Sau đó chạy lại:
cd backend
npm start
```

---

## Bước 4: Test Chức Năng

### Test Forgot Password:

1. **Khởi động Frontend:**
   ```powershell
   cd frontend
   npm start
   ```

2. **Truy cập:** http://localhost:3000/login

3. **Click vào:** "Quên mật khẩu?"

4. **Nhập email** (email phải đã đăng ký trong hệ thống)

5. **Click "Gửi Email Reset"**

6. **Kiểm tra hộp thư email** → Click vào link trong email

7. **Nhập mật khẩu mới** → Reset thành công!

---

## Bước 5: Chụp Screenshot

### Screenshot cần chụp:

✅ **1. Form Forgot Password**
   - URL: http://localhost:3000/forgot-password
   - Chụp màn hình form nhập email

✅ **2. Thông báo thành công**
   - Sau khi gửi email
   - Thông báo: "Email reset mật khẩu đã được gửi"

✅ **3. Email nhận được**
   - Mở Gmail/Email
   - Chụp email với link reset password
   - Highlight link reset

✅ **4. Form Reset Password**
   - Click vào link trong email
   - Chụp form nhập mật khẩu mới

✅ **5. Reset thành công**
   - Thông báo "Đổi mật khẩu thành công"
   - Redirect về login

---

## ❌ Xử Lý Lỗi Thường Gặp

### Lỗi: "Invalid login: 535-5.7.8 Username and Password not accepted"

**Nguyên nhân:** Chưa bật 2-Step Verification hoặc App Password sai

**Giải pháp:**
1. Bật 2-Step Verification
2. Tạo lại App Password
3. Copy chính xác 16 ký tự

---

### Lỗi: "self signed certificate in certificate chain"

**Giải pháp:** Thêm vào `userAdvancedController.js`:

```javascript
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false  // Thêm dòng này
  }
});
```

---

### Lỗi: "Không tìm thấy tài khoản"

**Nguyên nhân:** Email chưa được đăng ký

**Giải pháp:**
1. Đăng ký tài khoản trước: http://localhost:3000/register
2. Sau đó mới test forgot password

---

## 🎯 Demo Nhanh (Không Cần Email Thật)

Nếu muốn demo nhanh mà không cần cấu hình email:

### Cách 1: Console Log (Debug)

Sửa `userAdvancedController.js`:

```javascript
// Thay vì gửi email, in ra console
console.log('===== RESET PASSWORD LINK =====');
console.log(resetUrl);
console.log('===============================');

// Comment phần sendMail
// await transporter.sendMail(mailOptions);

res.json({ 
  message: "Email reset mật khẩu đã được gửi",
  resetUrl  // Trả về link luôn (chỉ để test)
});
```

### Cách 2: Sử dụng Ethereal (Email Giả)

```javascript
// Tạo test account
const testAccount = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: testAccount.user,
    pass: testAccount.pass,
  },
});

// Sau khi send
const info = await transporter.sendMail(mailOptions);
console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
```

---

## 📝 Checklist Trước Khi Chụp Screenshot

- [ ] Backend đang chạy (port 5001)
- [ ] Frontend đang chạy (port 3000)
- [ ] Email đã cấu hình trong `.env`
- [ ] Đã có tài khoản test đăng ký sẵn
- [ ] Đã test gửi email thành công
- [ ] Đã nhận được email với link
- [ ] Đã test reset password thành công

---

## 🚀 Sẵn Sàng Chụp Screenshot!

Sau khi hoàn thành các bước trên, bạn có thể:
1. Chụp screenshot các màn hình
2. Chứng minh chức năng hoạt động
3. Nộp bài tập! 🎉
