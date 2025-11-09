# 👨‍💻 SINH VIÊN 2: QUẢN LÝ NHÁNH FRONTEND

## 🎯 Vai Trò & Trách Nhiệm

**Tên:** [Tên của bạn]  
**Vai trò:** Quản lý nhánh Frontend  
**Nhiệm vụ:**
- ✅ Tạo và quản lý nhánh `frontend-auth`
- ✅ Tạo và quản lý nhánh `frontend-profile`
- 📸 Chụp screenshot các nhánh
- 🔄 Tạo Pull Request merge vào `main`
- 📝 Ghi lại lịch sử commit rõ ràng

---

## ✅ ĐÃ HOÀN THÀNH

### 1. Nhánh `frontend-auth` ✅
**Nội dung:**
- Login/Register UI
- Dashboard với role-based menu
- Admin Panel (quản lý users)
- Forgot Password form
- Reset Password form
- Change Password trong Dashboard
- Upload Avatar component

**Commits quan trọng:**
- `feat: Add admin panel with role management and user CRUD features`
- `feat: Add forgot/reset password, upload avatar, change password features`

**Link:** https://github.com/nguyendongho204/group6-project/tree/frontend-auth

---

### 2. Nhánh `frontend-profile` ✅
**Nội dung:**
- Profile page với edit user info
- Upload Avatar integration
- Change Password functionality
- Profile UI components

**Link:** https://github.com/nguyendongho204/group6-project/tree/frontend-profile

---

## 📸 SCREENSHOTS CẦN CHỤP

### Screenshot 1: GitHub Branches Overview
**URL:** https://github.com/nguyendongho204/group6-project/branches

**Cách chụp:**
1. Vào repository GitHub
2. Click tab "Branches" (hoặc vào `Insights` → `Network`)
3. Chụp màn hình hiển thị các nhánh:
   - ✅ frontend-auth
   - ✅ frontend-profile
   - main
   - backend-auth
   - backend-admin
   - database-auth

**Nội dung cần có:**
- Tên các nhánh rõ ràng
- Thời gian cập nhật gần nhất
- Người tạo nhánh

**Tên file:** `01-github-branches.png`

---

### Screenshot 2: frontend-auth Branch Details
**URL:** https://github.com/nguyendongho204/group6-project/tree/frontend-auth

**Cách chụp:**
1. Click vào nhánh `frontend-auth`
2. Chụp màn hình code tree
3. Highlight thư mục `frontend/src/components/`

**Nội dung cần có:**
- Branch selector hiển thị "frontend-auth"
- File tree với các components mới
- Commit message gần nhất
- Số commits (ví dụ: "X commits")

**Tên file:** `02-frontend-auth-branch.png`

---

### Screenshot 3: frontend-profile Branch Details
**URL:** https://github.com/nguyendongho204/group6-project/tree/frontend-profile

**Cách chụp:**
1. Click vào nhánh `frontend-profile`
2. Chụp màn hình code tree

**Tên file:** `03-frontend-profile-branch.png`

---

### Screenshot 4: Commit History - frontend-auth
**URL:** https://github.com/nguyendongho204/group6-project/commits/frontend-auth

**Cách chụp:**
1. Vào nhánh `frontend-auth`
2. Click "X commits"
3. Chụp danh sách commits

**Nội dung cần có:**
- Commit messages rõ ràng
- Author & date
- Commit hash
- Files changed

**Tên file:** `04-frontend-auth-commits.png`

---

### Screenshot 5: Commit History - frontend-profile
**URL:** https://github.com/nguyendongho204/group6-project/commits/frontend-profile

**Tên file:** `05-frontend-profile-commits.png`

---

### Screenshot 6: Network Graph
**URL:** https://github.com/nguyendongho204/group6-project/network

**Cách chụp:**
1. Vào `Insights` → `Network`
2. Chụp graph hiển thị các nhánh

**Nội dung cần có:**
- Nhánh main
- Nhánh frontend-auth branch ra từ main
- Nhánh frontend-profile branch ra từ frontend-auth
- Các commits trên mỗi nhánh

**Tên file:** `06-network-graph.png`

---

## 🔄 TẠO PULL REQUEST

### Pull Request 1: frontend-auth → main

**Bước 1: Tạo PR trên GitHub**
1. Vào: https://github.com/nguyendongho204/group6-project/pulls
2. Click "New pull request"
3. Base: `main` ← Compare: `frontend-auth`
4. Click "Create pull request"

**Bước 2: Điền thông tin PR**
```
Title: [Frontend] Add authentication and advanced features

Description:
## 📦 Changes

### Authentication UI
- Login/Register forms with validation
- Forgot Password flow
- Reset Password with token
- Dashboard with user info

### Profile Management
- Profile edit page
- Change password in dashboard
- Upload avatar with preview

### Admin Features
- Admin panel for user management
- Role-based access control
- User CRUD operations

### Components Added
- ForgotPassword.js
- ResetPassword.js
- ChangePassword.js
- UploadAvatar.js
- AdminPanel.js

## ✅ Testing
- All forms validated
- APIs tested with backend
- Screenshots available

## 👤 Author
Sinh viên 2 - Frontend Developer
```

5. Click "Create pull request"

**Screenshot cần chụp:**
- PR form với title & description
- Files changed tab
- PR được tạo thành công

**Tên file:** `07-pr-frontend-auth-to-main.png`

---

### Pull Request 2: frontend-profile → main

**Title:** `[Frontend] Add profile management features`

**Description:**
```
## 📦 Changes

### Profile Features
- User profile page with edit functionality
- Avatar upload integration
- Password change in profile

### Components
- Profile.js (enhanced)
- UploadAvatar.js
- Profile.css (responsive)

## 👤 Author
Sinh viên 2 - Frontend Developer
```

**Tên file:** `08-pr-frontend-profile-to-main.png`

---

## ✅ SAU KHI SINH VIÊN 3 REVIEW & MERGE

### Screenshot 9: Merged PRs
**URL:** https://github.com/nguyendongho204/group6-project/pulls?q=is%3Amerged

**Nội dung:**
- Danh sách PRs đã merge
- Merged by: [Sinh viên 3]
- Merge commit

**Tên file:** `09-merged-prs.png`

---

### Screenshot 10: Main Branch After Merge
**URL:** https://github.com/nguyendongho204/group6-project/commits/main

**Nội dung:**
- Main branch có commits từ frontend-auth
- Main branch có commits từ frontend-profile
- Lịch sử merge rõ ràng

**Tên file:** `10-main-branch-after-merge.png`

---

## 📊 LỆNH GIT QUAN TRỌNG

### Kiểm tra nhánh hiện tại:
```bash
git branch
```

### Chuyển nhánh:
```bash
git checkout frontend-auth
git checkout frontend-profile
```

### Xem log commits:
```bash
git log --oneline --graph --all
```

### Pull changes từ remote:
```bash
git pull origin frontend-auth
git pull origin frontend-profile
```

---

## 📁 CẤU TRÚC THƯ MỤC SCREENSHOTS

```
screenshots/
├── sinh-vien-2-frontend/
│   ├── 01-github-branches.png
│   ├── 02-frontend-auth-branch.png
│   ├── 03-frontend-profile-branch.png
│   ├── 04-frontend-auth-commits.png
│   ├── 05-frontend-profile-commits.png
│   ├── 06-network-graph.png
│   ├── 07-pr-frontend-auth-to-main.png
│   ├── 08-pr-frontend-profile-to-main.png
│   ├── 09-merged-prs.png
│   └── 10-main-branch-after-merge.png
```

---

## ✅ CHECKLIST HOÀN THÀNH

### Quản lý nhánh:
- [x] Nhánh `frontend-auth` đã tạo và push
- [x] Nhánh `frontend-profile` đã tạo và push
- [ ] Screenshot các nhánh trên GitHub
- [ ] Screenshot commit history

### Pull Request:
- [ ] Tạo PR: frontend-auth → main
- [ ] Tạo PR: frontend-profile → main
- [ ] Screenshot các PR
- [ ] Đợi Sinh viên 3 review
- [ ] PR được merge thành công

### Documentation:
- [ ] Commit messages rõ ràng
- [ ] PR descriptions chi tiết
- [ ] Screenshots đầy đủ

---

## 🎯 TỔNG KẾT

**Nhánh được quản lý:** 2 nhánh
- frontend-auth
- frontend-profile

**Pull Requests:** 2 PRs
- frontend-auth → main
- frontend-profile → main

**Commits quan trọng:** 2+ commits
- Admin panel features
- Advanced authentication features

**Screenshots:** 10 ảnh

---

## 🚀 HOÀN THÀNH!

Sau khi Sinh viên 3 merge các PR vào main:
- ✅ Main branch có đầy đủ code frontend
- ✅ Lịch sử Git rõ ràng
- ✅ Branches được quản lý tốt

**Role của bạn: FRONTEND LEAD** 🎨
