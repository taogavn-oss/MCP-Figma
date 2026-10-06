# PRODUCT REQUIREMENTS DOCUMENT (PRD)

> **Tài liệu Yêu cầu Sản phẩm**: Định nghĩa mục tiêu, đối tượng người dùng, tính năng cốt lõi, ma trận phân quyền và phạm vi thiết kế nhằm đảm bảo toàn bộ đội ngũ và AI Agent có chung một tầm nhìn chính xác.

---

## 1. Tổng Quan & Mục Tiêu Sản Phẩm (Product Vision & Goals)

### 1.1 Tầm nhìn (Vision)
- Xây dựng trải nghiệm số trực quan, thẩm mỹ cao, liền mạch và mang lại giá trị thực tế cho người dùng ngay từ những giây đầu tiên.
- Kết hợp chặt chẽ giữa thiết kế giao diện tinh tế (Figma Design System) và khả năng hiện thực hóa giao diện chuẩn chỉ bằng mã nguồn.

### 1.2 Mục tiêu kinh doanh & Người dùng (Goals & KPIs)
| Mục tiêu | Chỉ số đo lường (KPI / Metric) | Kỳ vọng đạt được |
| :--- | :--- | :--- |
| **Thu hút & Giữ chân** | Tỷ lệ hoàn thành flow chính (Completion Rate) | $\ge 75\%$ người dùng hoàn thành flow chẩn đoán/khám phá |
| **Tỷ lệ chuyển đổi** | Click-Through Rate (CTR) vào CTA chính | $\ge 25\%$ người dùng nhấp vào nút hành động chính |
| **Trải nghiệm mượt mà** | Điểm hài lòng CSAT / SUS | $\ge 85/100$ điểm đánh giá trải nghiệm UI/UX |
| **Hiệu năng hiển thị** | Thời gian tải trang (LCP) | $< 1.5$ giây trên cả mạng di động |

---

## 2. Đối Tượng Người Dùng & Chân Dung (Target Personas)

### 2.1 Persona 1: Người dùng phổ thông / Khách vãng lai (Primary Persona)
- **Hành vi**: Truy cập qua liên kết mạng xã hội, quảng cáo, hoặc bạn bè chia sẻ; sử dụng điện thoại thông minh (Mobile First, viewport 375px - 430px).
- **Nhu cầu**: Muốn xem nội dung nhanh chóng, kết quả chẩn đoán/hình ảnh trực quan, không muốn đọc quá nhiều chữ rườm rà.
- **Nỗi đau (Pain points)**: Giao diện rối mắt, quá nhiều quảng cáo hoặc pop-up che khuất nội dung, nút bấm khó bấm, bắt buộc đăng nhập quá sớm khi chưa thấy giá trị.

### 2.2 Persona 2: Người dùng chuyên sâu / Trả phí (Engaged / Premium User)
- **Hành vi**: Đã trải nghiệm bản dùng thử / miễn phí, có nhu cầu xem chi tiết kết quả chuyên sâu, tải về tài nguyên chất lượng cao hoặc lưu trữ lịch sử.
- **Nhu cầu**: Mở khóa toàn bộ tính năng, giao diện thanh toán an toàn, bảo mật thông tin cá nhân.
- **Nỗi đau**: Quy trình thanh toán rườm rà, thông tin quyền lợi gói dịch vụ không rõ ràng, thiếu các lựa chọn thanh toán tiện lợi.

---

## 3. Phân Quyền Người Dùng (Roles & Permissions Matrix)

| Chức năng / Tính năng | Khách (Guest) | Người dùng miễn phí (Free User) | Người dùng trả phí (Premium) | Quản trị viên (Admin) |
| :--- | :---: | :---: | :---: | :---: |
| **Xem Landing Page & Trắc nghiệm/Chẩn đoán** | ✅ Có | ✅ Có | ✅ Có | ✅ Có |
| **Xem kết quả tóm tắt ban đầu** | ✅ Có | ✅ Có | ✅ Có | ✅ Có |
| **Xem phân tích chuyên sâu / Toàn văn** | ❌ Bị khóa (Paywall) | 🟡 Giới hạn (1 lần) | ✅ Không giới hạn | ✅ Toàn quyền |
| **Lưu lịch sử & Tải tài nguyên HD** | ❌ Cần đăng ký | ✅ Có | ✅ Tốc độ cao | ✅ Toàn quyền |
| **Quản trị nội dung & Xem Analytics** | ❌ Không | ❌ Không | ❌ Không | ✅ Toàn quyền |

---

## 4. Danh Sách Tính Năng & Mức Độ Ưu Tiên (Feature Breakdown - MoSCoW)

### 4.1 Must Have (Bắt buộc phải có trong phiên bản hiện tại)
1. **Flow hiển thị kết quả chẩn đoán/khám phá trực quan**:
   - Trưng bày hình ảnh minh họa chủ đạo (Hero Illustration / Chibi Mascot).
   - Khối text nhận xét ngắn gọn, cô đọng, cân đối thẩm mỹ.
   - Nút kêu gọi hành động (CTA) nổi bật với hiệu ứng thị giác thu hút (như gradient, glow, micro-animation).
2. **Hỗ trợ đầy đủ Responsive**:
   - Tối ưu hoàn hảo cho Mobile (SP: 375px, 390px, 412px, 430px).
   - Tương thích tốt trên Desktop (PC: 1200px - 1440px+).
3. **Đầy đủ 4 trạng thái cốt lõi**:
   - Đang tải (Loading/Skeleton), Trống (Empty), Lỗi (Error/Retry), Thành công (Success).

### 4.2 Should Have (Nên có để tối ưu chuyển đổi)
1. Micro-animations cho CTA chính (nhịp thở/pulse nhẹ, hover/active elevation).
2. Sticker trang trí theo chủ đề (bong bóng, biểu tượng cảm xúc, sao lấp lánh nhẹ nhàng, không gây rối mắt).
3. Chia sẻ nhanh kết quả lên mạng xã hội (Facebook, Zalo, X, LINE) kèm hình ảnh preview tạo sẵn.

### 4.3 Could Have (Có thể làm sau khi MVP ổn định)
1. Chuyển đổi đa ngôn ngữ nhanh (Tiếng Việt, Tiếng Nhật, Tiếng Anh).
2. Chế độ giao diện Sáng / Tối (Light Mode / Dark Mode switch).

### 4.4 Won't Have (Chưa thực hiện ở giai đoạn này)
1. Hệ thống ví điện tử phức tạp trong ứng dụng (tạm thời tích hợp cổng ngoài).
2. Tính năng mạng xã hội/chat cộng đồng trực tiếp.

---

## 5. Phạm Vi Thiết Kế & Ràng Buộc Kỹ Thuật (Design Scope & Constraints)

### 5.1 Phạm vi thiết kế (In-Scope vs Out-of-Scope)
- **Trong phạm vi (In-Scope)**:
  - Màn hình kết quả chẩn đoán/bài test (Diagnosis Result Screen).
  - Khối chuyển đổi và CTA "Xem tiếp miễn phí / Trả phí" (Unlock More / Continuation Block).
  - Bộ linh kiện UI dùng chung (Buttons, Cards, Badges, Stickers, Modal thông báo).
- **Ngoài phạm vi (Out-of-Scope)**:
  - Màn hình cài đặt hệ thống backend phức tạp.
  - Các trang báo cáo tài chính/kế toán nội bộ.

### 5.2 Ràng buộc thiết kế & Kỹ thuật (Constraints)
- **Chuẩn hiển thị (Viewports)**:
  - Mobile (SP): Chiều rộng 375px - 430px (tiêu chuẩn chuẩn hóa ở 390px).
  - Desktop (PC): 1440px căn giữa, nội dung tối đa 1200px.
- **Tiêu chuẩn tương tác (Accessibility & Ergonomics)**:
  - Kích thước vùng bấm tối thiểu: $44 \times 44\text{px}$ (chuẩn Apple HIG) hoặc $48 \times 48\text{px}$ (chuẩn Material Design).
  - Tỷ lệ tương phản chữ/nền: Tối thiểu $4.5:1$ cho văn bản thường (chuẩn WCAG AA).
- **Ngôn ngữ & Font chữ**:
  - Hỗ trợ hiển thị mượt mà ký tự tiếng Việt có dấu và tiếng Nhật (Hiragana, Katakana, Kanji) không bị lỗi ngắt dòng hay vỡ font.

---

## 6. Tiêu Chí Nghiệm Thu Tổng Thể (Acceptance Criteria)
1. [ ] Mọi màn hình phải bám sát chính xác danh mục tính năng Must-have.
2. [ ] Thiết kế được phê duyệt qua `DESIGN-REVIEW-CHECKLIST.md` trước khi code.
3. [ ] Các thông số màu sắc, khoảng cách, font chữ phải khớp với `DESIGN-SYSTEM.md`.
