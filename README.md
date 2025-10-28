# group6-project

##  Mô tả dự án
Dự án được thực hiện trong **Buổi 4 – Thực hành nhóm: Node.js + React + MongoDB + GitHub**, nhằm thực hành quy trình **phát triển ứng dụng web fullstack**, bao gồm backend (Node.js + Express), frontend (React) và cơ sở dữ liệu (MongoDB).

Mục tiêu:
- Làm quen với quy trình phát triển ứng dụng web fullstack.  
- Sử dụng Git và GitHub để cộng tác nhóm.  
- Hiểu và áp dụng quy trình **Git branch – merge – resolve conflict – rebase – squash commit**.  

---

##  Thành viên nhóm

| STT | Họ và tên | Vai trò | MSSV |
|-----|------------|----------|------|
| 1 | **Nguyễn Huỳnh Trân** | Backend Developer | 222543 |
| 2 | **Nguyễn Đông Hồ** | Frontend Developer | 222598 |
| 3 | **Nguyễn Thành Vũ** | Database Developer | 221604 |

---
##  Phân công công việc chi tiết

| Thành viên | Vai trò chính | Công việc đã thực hiện | File / Thành phần phụ trách |
|-------------|----------------|--------------------------|-------------------------------|
| **Nguyễn Huỳnh Trân (SV1)** | Backend (Node.js + Express) | - Thiết lập cấu trúc thư mục backend<br>- Tạo các API CRUD (GET, POST, PUT, DELETE)<br>- Kết nối backend với MongoDB Atlas<br>- Xử lý lỗi và cấu hình server | `backend/server.js`<br>`backend/controllers/userController.js`<br>`backend/routes/user.js` |
| **Nguyễn Đông Hồ (SV2)** | Frontend (React) | - Khởi tạo project React<br>- Tạo component `UserList` và `AddUser`<br>- Kết nối với API backend bằng Axios<br>- Hiển thị và thêm user từ giao diện<br>- Thêm chức năng Sửa/Xóa user<br>- Cải thiện UI và validation form | `frontend/src/components/UserList.jsx`<br>`frontend/src/components/AddUser.jsx`<br>`frontend/src/App.js` |
| **Nguyễn Thành Vũ (SV3)** | Database (MongoDB) | - Tạo cluster trên MongoDB Atlas<br>- Thiết lập kết nối bằng Mongoose<br>- Tạo model `User.js` (name, email)<br>- Kiểm thử CRUD trực tiếp trên database | `backend/models/User.js`<br>Cấu hình `.env` kết nối MongoDB |

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

 1. Backend

Các bước thực hiện:

Mở thư mục backend trong VS Code.

Cài đặt các thư viện cần thiết:

npm install


Khởi động server:

npm start


Sau khi chạy, server mặc định hoạt động tại địa chỉ:
👉 http://localhost:3000

 2. Frontend

Các bước thực hiện:

Mở thư mục frontend.

Cài đặt các thư viện:

npm install


Chạy giao diện React:

npm start


Sau khi chạy, ứng dụng frontend hiển thị tại:
 http://localhost:3001

 3. Các API chính
Phương thức	Endpoint	Chức năng
GET	/users	Lấy danh sách người dùng
POST	/users	Thêm người dùng mới
PUT	/users/:id	Cập nhật thông tin người dùng
DELETE	/users/:id	Xóa người dùng
 4. Các hoạt động chính trong quá trình phát triển

Cài đặt môi trường làm việc (VSCode, Node.js, Git).

Khởi tạo dự án backend và frontend.

Xây dựng REST API cơ bản (GET/POST).

Kết nối React với API backend.

Tích hợp cơ sở dữ liệu MongoDB Atlas.

Hoàn thiện CRUD nâng cao (PUT/DELETE).

Xử lý conflict & squash commit khi merge code nhóm.

Merge các branch vào main để hoàn thiện dự án.

 5. Sản phẩm nộp

Ảnh chụp cấu trúc thư mục và VS Code.

Ảnh test API bằng Postman.

Ảnh giao diện React hiển thị danh sách người dùng.

Ảnh dữ liệu trong MongoDB Atlas.

 Link repo GitHub:
 https://github.com/nguyendongho204/group6-project