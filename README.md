# group6-project

##  Mô tả dự án
Dự án được thực hiện trong **Buổi 4 – Thực hành nhóm: Node.js + React + MongoDB + GitHub**, nhằm thực hành quy trình **phát triển ứng dụng web fullstack**, bao gồm backend (Node.js + Express), frontend (React) và cơ sở dữ liệu (MongoDB).

Mục tiêu:
- Làm quen với quy trình phát triển ứng dụng web fullstack.  
- Sử dụng Git và GitHub để cộng tác nhóm.  
- Hiểu và áp dụng quy trình **Git branch – merge – resolve conflict – rebase – squash commit**.  

---

##  Thành viên nhóm

| STT | Họ và tên | Vai trò | Nhiệm vụ chính |
|-----|------------|----------|----------------|
| 1 | **Nguyễn Huỳnh Trân** | Backend Developer | Node.js + Express (API CRUD User) | 
| 2 | **Nguyễn Đông Hồ** | Frontend Developer | React (giao diện và kết nối API) |
| 3 | **Nguyễn Thành Vũ** | Database Developer | MongoDB (Atlas setup, model User) |

---

##  Cấu trúc dự án

group6-project/
│
├── backend/
│ ├── controllers/
│ │ └── userController.js
│ ├── models/
│ │ └── User.js
│ ├── routes/
│ │ └── user.js
│ ├── server.js
│ └── .gitignore
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── UserList.jsx
│ │ │ └── AddUser.jsx
│ │ └── App.js
│ └── package.json
│
├── database/
│ └── User.js
│
└── README.md


## Công nghệ sử dụng

| Thành phần | Công nghệ | Mô tả |
|-------------|------------|------|
| Backend | Node.js + Express | Xây dựng REST API (GET, POST, PUT, DELETE) |
| Frontend | React.js | Giao diện quản lý User |
| Database | MongoDB Atlas | Lưu trữ dữ liệu người dùng |
| Công cụ | Git, GitHub | Quản lý mã nguồn nhóm |

---

##  Hướng dẫn chạy dự án

### 1 Backend
```bash
cd backend
npm install
npm start
Server mặc định chạy tại:
👉 http://localhost:3000

2 Frontend
bash
Sao chép mã
cd frontend
npm install
npm start
Giao diện React chạy tại:
 http://localhost:3001

 Các API chính
Method	Endpoint	Mô tả
GET	/users	Lấy danh sách user
POST	/users	Thêm user mới
PUT	/users/:id	Cập nhật user
DELETE	/users/:id	Xóa user

 Các hoạt động thực hành
Cài đặt môi trường – VSCode, Node.js, Git

Khởi tạo dự án backend và frontend

Tạo REST API (GET/POST)

Kết nối React với API backend

Tích hợp MongoDB Atlas

Thêm CRUD nâng cao (PUT/DELETE)

Resolve conflict & squash commit

Merge code hoàn chỉnh vào branch main

Sản phẩm nộp
Ảnh VS Code và cấu trúc thư mục

Ảnh test API bằng Postman

Ảnh giao diện React hiển thị danh sách user

Ảnh dữ liệu MongoDB Atlas

Link repo GitHub:
👉 https://github.com/nguyendongho204/group6-project