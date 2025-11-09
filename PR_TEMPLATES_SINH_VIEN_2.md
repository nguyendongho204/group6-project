# 🔄 PULL REQUEST TEMPLATES - SINH VIÊN 2

## 📋 PR #1: frontend-auth → main

### Title
```
[Frontend] Add authentication and advanced features
```

### Description
```markdown
## 📦 Summary
Thêm các tính năng authentication và quản lý user cho frontend.

## ✨ Features Added

### 1. Authentication System
- ✅ Login form với validation
- ✅ Register form với password confirmation
- ✅ Forgot Password flow
- ✅ Reset Password với token verification
- ✅ JWT token management trong AuthContext

### 2. Dashboard
- ✅ User dashboard với thông tin cá nhân
- ✅ Role-based menu (Admin/User)
- ✅ Change Password trực tiếp trong dashboard
- ✅ Quick actions

### 3. Admin Panel (Role: Admin only)
- ✅ Xem danh sách tất cả users
- ✅ Thay đổi role User ↔ Admin
- ✅ Xóa user
- ✅ Thống kê tổng users/admins

### 4. Advanced Features
- ✅ Upload Avatar với preview
- ✅ Profile edit page
- ✅ Password change với verify current password

## 📁 Files Changed

### New Components
- `src/components/auth/ForgotPassword.js` - Form quên mật khẩu
- `src/components/auth/ResetPassword.js` - Form reset mật khẩu với token
- `src/components/profile/ChangePassword.js` - Đổi mật khẩu trong dashboard
- `src/components/profile/UploadAvatar.js` - Upload ảnh đại diện
- `src/components/admin/AdminPanel.js` - Quản lý users (Admin)
- `src/components/admin/AdminPanel.css` - Styles cho admin panel

### Modified Components
- `src/App.js` - Thêm routes mới
- `src/components/Dashboard.js` - Tích hợp ChangePassword
- `src/components/Dashboard.css` - Styles mới
- `src/components/auth/Login.js` - Thêm link "Quên mật khẩu?"
- `src/components/auth/Auth.css` - Styles cho auth pages
- `src/components/profile/Profile.js` - Tích hợp UploadAvatar
- `src/components/profile/Profile.css` - Styles cho avatar upload

## 🧪 Testing Completed

- ✅ Login/Register flow
- ✅ Forgot/Reset Password flow
- ✅ Upload Avatar (local storage)
- ✅ Change Password
- ✅ Admin Panel CRUD operations
- ✅ Role-based access control

## 📸 Screenshots
- Dashboard với menu Admin
- Admin Panel với user list
- Upload Avatar form
- Change Password trong dashboard
- Forgot Password flow

## 🔗 Related Issues
Closes #[số issue nếu có]

## 👤 Author
**Sinh viên 2** - Frontend Developer  
Quản lý nhánh: `frontend-auth`, `frontend-profile`

## ✅ Checklist
- [x] Code đã test locally
- [x] UI responsive
- [x] No console errors
- [x] Integration với backend APIs thành công
- [x] Documentation đầy đủ
```

---

## 📋 PR #2: frontend-profile → main

### Title
```
[Frontend] Enhance profile management features
```

### Description
```markdown
## 📦 Summary
Cải thiện tính năng quản lý profile với upload avatar và change password.

## ✨ Features Enhanced

### Profile Page
- ✅ Edit user information (name, email)
- ✅ Upload avatar với preview real-time
- ✅ Change password form với validation
- ✅ Responsive design

### Components
- ✅ `UploadAvatar.js` - Upload component với preview
- ✅ `Profile.js` - Enhanced profile page
- ✅ `Profile.css` - Responsive styles

## 🎨 UI Improvements
- Avatar preview trong vòng tròn
- Form validation rõ ràng
- Success/Error messages
- Mobile-friendly design

## 🧪 Testing
- ✅ Upload ảnh JPG/PNG/GIF
- ✅ File size validation (max 5MB)
- ✅ Preview trước khi upload
- ✅ Update user context sau upload

## 👤 Author
**Sinh viên 2** - Frontend Developer

## ✅ Checklist
- [x] Tested locally
- [x] No errors
- [x] Responsive design
- [x] Integration successful
```

---

## 🎯 HƯỚNG DẪN TẠO PR TRÊN GITHUB

### Bước 1: Vào trang Pull Requests
1. Truy cập: https://github.com/nguyendongho204/group6-project
2. Click tab **"Pull requests"**
3. Click nút **"New pull request"** (màu xanh)

### Bước 2: Chọn branches
- **base:** `main` (nhánh đích)
- **compare:** `frontend-auth` (nhánh nguồn)

### Bước 3: Review changes
- Xem qua "Files changed" tab
- Đảm bảo chỉ có files frontend
- Screenshot tab này!

### Bước 4: Create PR
1. Click **"Create pull request"**
2. Copy-paste **Title** từ template trên
3. Copy-paste **Description** từ template trên
4. Click **"Create pull request"** lần nữa

### Bước 5: Screenshot
- Chụp màn hình PR vừa tạo
- Chụp tab "Files changed"
- Chụp tab "Commits"

### Bước 6: Assign Reviewer
- Click **"Reviewers"** bên phải
- Chọn **Sinh viên 3** (người review)
- Add labels nếu có: `frontend`, `enhancement`

---

## 📸 SCREENSHOTS CẦN CHỤP

### Khi tạo PR:
1. **Form tạo PR** - Title, Description, Base/Compare branches
2. **Files changed** - Danh sách files thay đổi
3. **Commits** - Lịch sử commits trong PR
4. **PR created** - Màn hình sau khi tạo thành công

### Sau khi được review:
5. **Comments** - Comments từ Sinh viên 3 (nếu có)
6. **Approved** - PR được approve
7. **Merged** - PR được merge vào main
8. **Closed PR** - Trạng thái merged với màu tím

---

## ⚠️ LƯU Ý QUAN TRỌNG

### Trước khi tạo PR:
```bash
# Đảm bảo code đã push lên GitHub
git push origin frontend-auth
git push origin frontend-profile

# Kiểm tra status sạch
git status
```

### Không merge tự ý!
- ❌ KHÔNG click nút "Merge" 
- ⏳ Đợi Sinh viên 3 review và approve
- ✅ Sinh viên 3 sẽ merge

### Nếu có conflicts:
```bash
# Pull latest main
git checkout main
git pull origin main

# Merge main vào branch
git checkout frontend-auth
git merge main

# Resolve conflicts
# Then commit và push
git push origin frontend-auth
```

---

## 🎯 KẾT QUẢ MONG ĐỢI

Sau khi hoàn thành:

### GitHub sẽ có:
- ✅ 2 nhánh frontend rõ ràng
- ✅ 2 Pull Requests với mô tả chi tiết
- ✅ PRs được review bởi Sinh viên 3
- ✅ PRs được merge vào main
- ✅ Lịch sử commit sạch đẹp

### Screenshots thu được:
- ✅ 10+ ảnh chứng minh quản lý nhánh tốt
- ✅ PR workflow rõ ràng
- ✅ Collaboration giữa team members

---

## 🚀 SẴN SÀNG TẠO PULL REQUEST!

Copy templates bên trên và tạo PR ngay! 🎉
