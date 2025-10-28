# 🚀 group6-project

## 👨‍💻 Thành viên nhóm
- **Nguyễn Huỳnh Trân** 222543– Backend (Node.js + Express)  
- **Nguyễn Đông Hồ** 222598 – Frontend (React)  
- **Nguyễn Thanh Vũ** 221604 – Database (MongoDB)


## ⚙️ Mô tả dự án
Dự án nhóm 6 xây dựng ứng dụng quản lý người dùng cơ bản (CRUD) gồm:
- **Backend (Node.js + Express):** Tạo REST API (GET, POST, PUT, DELETE).
- **Frontend (React):** Giao diện hiển thị và thêm/sửa/xóa người dùng.
- **Database (MongoDB Atlas):** Lưu trữ dữ liệu người dùng thực tế.

---

## 🧱 Cấu trúc thư mục
group6-project/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── server.js
├── frontend/
│ ├── src/
│ ├── public/
│ └── package.json
└── README.md

yaml
Sao chép mã

---

## 🧪 Chức năng chính
- **GET** – Lấy danh sách người dùng  
- **POST** – Thêm người dùng mới  
- **PUT** – Cập nhật người dùng  
- **DELETE** – Xóa người dùng  

---

## 🚀 Cách chạy dự án

### 1️⃣ Clone repository
```bash
git clone <URL-REPO>
cd group6-project
2️⃣ Cài đặt và chạy Backend
bash
Sao chép mã
cd backend
npm install
npm start
3️⃣ Cài đặt và chạy Frontend
bash
Sao chép mã
cd ../frontend
npm install
npm start
🔗 Kết nối MongoDB Atlas
Database: groupDB

Collection: users

Model: User.js gồm các trường name, email

✅ Kết quả
API hoạt động: /users (GET, POST, PUT, DELETE)

Frontend hiển thị dữ liệu người dùng từ MongoDB

Giao diện React cho phép thêm, sửa, xóa user trực tiếp

📦 Công nghệ sử dụng
Node.js + Express

React.js

MongoDB Atlas + Mongoose

Axios

Git + GitHub

🏁 Trạng thái dự án
✅ Hoàn thiện CRUD đầy đủ
✅ Kết nối MongoDB
✅ Merge tất cả nhánh vào main
✅ Cập nhật README.md cuối cùng