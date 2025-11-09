# 🚀 HƯỚNG DẪN DEPLOYMENT - GROUP 6 PROJECT

## 📦 FRONTEND DEPLOYMENT (Vercel)

### Bước 1: Cấu hình biến môi trường

**File: `frontend/.env.production`**
```env
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

### Bước 2: Deploy lên Vercel

1. **Truy cập**: https://vercel.com
2. **Login**: Continue with GitHub
3. **Import Project**: 
   - Chọn repository: `nguyendongho204/group6-project`
   - Click **Import**

4. **Cấu hình**:
   ```
   Framework Preset: Create React App
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: build
   Install Command: npm install
   ```

5. **Environment Variables**:
   ```
   Key: REACT_APP_API_URL
   Value: https://your-backend-url.onrender.com/api
   ```

6. **Deploy**: Click "Deploy"

### Bước 3: Lấy domain

Sau khi deploy xong:
```
✅ Deployed to: https://group6-project-frontend.vercel.app
```

---

## 🖥️ BACKEND DEPLOYMENT (Render)

### Bước 1: Chuẩn bị backend

**File: `backend/package.json`**
```json
{
  "scripts": {
    "start": "node app.js"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### Bước 2: Deploy lên Render

1. **Truy cập**: https://render.com
2. **Login**: Continue with GitHub
3. **New Web Service**:
   - Repository: `group6-project`
   - Name: `group6-backend`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Environment Variables**:
   ```
   MONGO_URI=mongodb+srv://...
   JWT_SECRET=your_secret_key
   PORT=5001
   ```

5. **Deploy**: Click "Create Web Service"

### Bước 3: Lấy URL

```
✅ Backend URL: https://group6-backend.onrender.com
```

---

## 🔄 CẬP NHẬT LẠI FRONTEND

Sau khi có backend URL, quay lại Vercel:

1. Vào **Settings** → **Environment Variables**
2. Update `REACT_APP_API_URL`:
   ```
   https://group6-backend.onrender.com/api
   ```
3. Vào **Deployments** → Click **"Redeploy"**

---

## 📸 SCREENSHOTS CẦN NỘP

### Vercel (Frontend):
1. ✅ Build logs thành công
2. ✅ Deployment summary với domain
3. ✅ Environment variables settings
4. ✅ Website live trên browser

### Render (Backend):
1. ✅ Build logs thành công
2. ✅ Service dashboard với URL
3. ✅ Environment variables settings
4. ✅ Test API trên Postman với production URL

---

## 🧪 KIỂM TRA SAU KHI DEPLOY

### Frontend:
```bash
# Mở trình duyệt
https://group6-project-frontend.vercel.app

# Kiểm tra:
✅ Trang login hiển thị
✅ Có thể đăng ký/đăng nhập
✅ Console không có lỗi
```

### Backend:
```bash
# Test bằng Postman
GET https://group6-backend.onrender.com/api/health

# Response:
{ "status": "OK" }
```

---

## ⚠️ LƯU Ý

### CORS Configuration
Backend cần cho phép frontend domain:

**File: `backend/app.js`**
```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://group6-project-frontend.vercel.app'
  ],
  credentials: true
}));
```

### MongoDB Atlas
Whitelist IP của Render:
1. Vào MongoDB Atlas → Network Access
2. Click "Add IP Address"
3. Chọn "Allow access from anywhere" (0.0.0.0/0)

---

## 🎯 HOÀN THÀNH

Khi cả 2 đã deploy:
- ✅ Frontend: https://group6-project-frontend.vercel.app
- ✅ Backend: https://group6-backend.onrender.com
- ✅ Database: MongoDB Atlas
- ✅ Tất cả APIs hoạt động

---

## 📞 HỖ TRỢ

Nếu gặp lỗi:
1. Kiểm tra build logs trên Vercel/Render
2. Verify environment variables
3. Check CORS configuration
4. Test API endpoints với Postman
