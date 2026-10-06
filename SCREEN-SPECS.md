# SCREEN SPECIFICATIONS (SCREEN-SPECS)

> **Đặc tả Chi Tiết Màn Hình**: Liệt kê toàn diện các màn hình trong ứng dụng, xác định rõ mục đích, nội dung hiển thị, nút kêu gọi hành động (CTA), điều kiện kích hoạt và bắt buộc đặc tả đầy đủ 4 trạng thái giao diện: **Loading, Empty, Error, Success**.

---

## 1. Bảng Danh Mục Màn Hình Tổng Thể (Master Screen Directory)

| Mã màn hình | Tên màn hình | Mục đích chính | Nền tảng hỗ trợ | Mức độ ưu tiên |
| :--- | :--- | :--- | :--- | :---: |
| `SCR-HOME` | Trang chủ / Bắt đầu chẩn đoán | Giới thiệu giá trị, dẫn dắt người dùng bắt đầu | SP & PC | P0 |
| `SCR-DIAG` | Bài trắc nghiệm / Chẩn đoán | Thu thập dữ liệu phản hồi từng bước | SP & PC | P0 |
| `SCR-RES-01` | Kết quả tóm tắt (Story Steps) | Hiển thị linh vật Chibi, nhận xét ngắn & CTA chuyển đổi | SP & PC | P0 |
| `SCR-RES-02` | Báo cáo phân tích chuyên sâu | Cung cấp toàn bộ góc nhìn chuyên sâu chi tiết | SP & PC | P1 |
| `MODAL-AUTH` | Modal đăng nhập / Đăng ký nhanh | Xác thực tài khoản người dùng không rời trang | SP (Sheet) / PC (Modal) | P0 |
| `MODAL-PAY` | Modal gói mở khóa (Paywall) | Hiển thị gói dịch vụ và phương thức thanh toán | SP & PC | P1 |
| `SCR-ERR` | Trang báo lỗi hệ thống / 404 / 500 | Thông báo sự cố và hướng dẫn người dùng khôi phục | SP & PC | P0 |

---

## 2. Đặc Tả Chi Tiết Từng Màn Hình

---

### Màn hình: `SCR-RES-01` - Kết Quả Chẩn Đoán (Pattern16 Story Steps)

#### A. Thông tin cơ bản
- **Tên hiển thị**: Màn hình kết quả chẩn đoán (診断結果の表示画面_イヌ_pattern16_Story Steps).
- **Mục đích**: Chúc mừng người dùng, khơi gợi sự tò mò qua hình ảnh linh vật dễ thương (Chibi) và nhận xét tóm tắt cá tính, thúc đẩy click vào CTA *"無料で続きを見る"*.
- **Điều kiện hiển thị**: Người dùng đã hoàn thành đủ các bước câu hỏi của bài chẩn đoán.

#### B. Cấu trúc nội dung (Content Structure)
1. **Header / Breadcrumb**: Logo, nút Back, nút Share kết quả.
2. **Hero Section (Linh vật & Danh hiệu)**:
   - Hình ảnh minh họa chất lượng cao (ví dụ: Chibi Dog / Con Giáp).
   - Huy hiệu/Tag phân loại tính cách (ví dụ: *"Trung thành & Trực giác nhạy bén"*).
   - Tiêu đề kết quả lớn (H1 / Heading).
3. **Story Step / Khối nhận xét**:
   - Đoạn văn bản mở đầu: *「自分自身をもっと深く知る」* (Thấu hiểu bản thân sâu sắc hơn).
   - Nội dung mô tả ngắn gồm 2 - 3 câu súc tích, định dạng canh đều, ngắt dòng thông minh.
   - Các sticker trang trí xung quanh (bong bóng mềm mại, sticker biểu tượng nhẹ nhàng, không che lấp chữ).
4. **Action Box (CTA chuyển đổi)**:
   - Nút hành động chính: *「無料で続きを見る」* (Xem tiếp miễn phí).
   - Tag phụ trợ: *"Hoàn toàn miễn phí · Không cần thẻ tín dụng"*.
   - Link text thứ cấp: *"Xem lại các câu trả lời trước"*.

#### C. Quy định CTA (Call-to-Action Specs)
- **Primary CTA**: Nút *「無料で続きを見る」*
  - **Màu sắc chủ đạo**: Gradient Hồng phấn kết hợp Hồng nhạt tươi sáng (`#FF6B8B` $\to$ `#FF8E53` hoặc tông Pastel Pink `#FF758C` $\to$ `#FF7EB3`).
  - **Đổ bóng (Box Shadow)**: Soft Pink Glow `0 10px 24px rgba(255, 117, 140, 0.35)`.
  - **Tương tác**: Phóng to nhẹ (`transform: translateY(-2px) scale(1.02)`) khi hover, lún xuống (`scale(0.98)`) khi tap/active.
  - **Icon**: Kèm icon mũi tên hoặc tia sáng (Sparkle icon) phía bên phải chữ.
- **Secondary CTA**: Nút chia sẻ kết quả (Ghost button có viền mỏng).

#### D. Ma trận 4 trạng thái bắt buộc (The 4 Critical States)

##### 1. Trạng thái Đang tải (Loading State)
- **Cơ chế**: Sử dụng Skeleton Shimmer thay vì Spinner xoay tròn đơn điệu.
- **Hiển thị**: 
  - Khung xám bo góc giả lập vị trí hình ảnh linh vật kích thước $240 \times 240\text{px}$.
  - 3 dòng skeleton mờ nhạt cho tiêu đề và đoạn văn bản nhận xét.
  - Khung nút CTA màu xám nhạt với hiệu ứng ánh sáng quét ngang (shimmer wave animation) chu kỳ 1.5s.

##### 2. Trạng thái Trống (Empty State)
- **Nguyên nhân**: Người dùng truy cập trực tiếp bằng link mà chưa có phiên làm trắc nghiệm.
- **Hiển thị**:
  - Hình minh họa linh vật đang ngủ hoặc cầm sổ tay tìm kiếm.
  - Tiêu đề: *"Chưa tìm thấy kết quả của bạn!"*.
  - Mô tả: *"Hãy dành 1 phút thực hiện bài trắc nghiệm nhanh để nhận phân tích cá tính độc quyền dành riêng cho bạn."*.
  - CTA thay thế: Nút *「Bắt đầu làm bài chẩn đoán ngay」*.

##### 3. Trạng thái Báo lỗi (Error State)
- **Nguyên nhân**: Lỗi timeout mạng ($>10\text{s}$) hoặc server trả về mã lỗi 500 khi tổng hợp kết quả.
- **Hiển thị**:
  - Banner cảnh báo nhẹ nhàng: *"Không thể tải kết quả vào lúc này do kết nối gián đoạn."*.
  - Giữ lại các câu trả lời tạm thời trong LocalStorage để người dùng không bị mất tiến trình.
  - Nút bấm: *「Thử tải lại kết quả」* (Primary) và *「Liên hệ trợ giúp」* (Link).

##### 4. Trạng thái Thành công (Success State)
- **Hiển thị**: Giao diện hoàn chỉnh với đầy đủ hình ảnh, sticker bóng nước chuyển động mượt mà, văn bản hiển thị sắc nét, nút CTA gradient hồng nổi bật ở vị trí trung tâm.

---

### Màn hình: `MODAL-AUTH` - Đăng Nhập / Đăng Ký 1-Chạm

#### A. Thông tin cơ bản
- **Mục đích**: Giúp người dùng xác thực danh tính nhanh nhất để mở khóa nội dung tiếp theo mà không làm đứt gãy luồng cảm xúc.
- **Dạng thức**: 
  - Mobile: Bottom Sheet trượt từ dưới lên, chiếm tối đa 70% chiều cao màn hình.
  - Desktop: Center Modal bo góc lớn ($24\text{px}$), có backdrop làm mờ nền (`backdrop-filter: blur(8px)`).

#### B. Cấu trúc nội dung
- **Header**: Tiêu đề *"Đăng nhập để xem tiếp phân tích miễn phí"*, nút đóng `[✕]`.
- **Nút Social Login**:
  - Nút Đăng nhập với Google (Chuẩn thương hiệu Google).
  - Nút Đăng nhập với Apple (Chuẩn Apple Sign-In).
  - Nút Đăng nhập với LINE / Email.
- **Footer**: Dòng cam kết bảo mật: *"Chúng tôi bảo vệ quyền riêng tư và không bao giờ đăng bài thay bạn."*.

#### C. Trạng thái (States)
- **Loading**: Disable toàn bộ các nút, hiển thị spinner xoay nhẹ trên nút mạng xã hội vừa bấm.
- **Error**: Hiển thị badge màu đỏ nhạt thông báo: *"Đăng nhập không thành công, vui lòng thử lại hoặc chọn phương thức khác."*.

---

## 3. Quy Định Tương Thích Thiết Bị (Responsive Adaptations)

| Thành phần | Mobile (SP: 375px - 430px) | Desktop (PC: 1200px - 1440px) |
| :--- | :--- | :--- |
| **Bố cục chính** | 1 cột dọc (Single Column), padding 2 bên 20px | 2 cột (Cột trái: Linh vật + Sticker; Cột phải: Nhận xét + CTA) hoặc Khung thẻ Card tập trung tối đa 720px |
| **Kích thước Mascot** | Chiều rộng $200\text{px} - 240\text{px}$, căn giữa | Chiều rộng $320\text{px} - 360\text{px}$ sắc nét |
| **Kích thước CTA** | Chiều rộng 100% full-width, chiều cao $54\text{px}$, font-size $17\text{px}$ bold | Chiều rộng cố định $320\text{px} - 380\text{px}$, căn giữa, chiều cao $56\text{px}$ |
| **Sticker trang trí** | Kích thước thu nhỏ $24\text{px} - 36\text{px}$, bố trí sát viền để không che text | Kích thước linh hoạt $40\text{px} - 56\text{px}$, hiệu ứng nổi 3D hoặc trôi nhẹ |
