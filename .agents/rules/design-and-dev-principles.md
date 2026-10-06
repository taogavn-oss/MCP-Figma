# NGUYÊN TẮC LÀM VIỆC BẮT BUỘC (DESIGN & DEVELOPMENT WORKFLOW RULE)

> **Phạm vi áp dụng**: Áp dụng cho mọi tác vụ liên quan đến phân tích, thiết kế giao diện (Figma MCP), xây dựng thành phần UI và lập trình mã nguồn trong dự án. Toàn bộ các Agent và Nhà phát triển bắt buộc phải tuân thủ nghiêm ngặt các nguyên tắc dưới đây.

---

## 1. Nguyên Tắc 1: Đọc & Đối Chiếu Tài Liệu Trước Khi Thực Hiện (Documentation-First)

Trước khi thực hiện bất kỳ hành động nào (tạo mới, sửa đổi Figma qua MCP, viết code HTML/CSS/JS/React):
1. **Agent PHẢI chủ động đọc và đối chiếu các file tài liệu chuẩn sau**:
   - `PRODUCT-REQUIREMENTS.md`: Xác định rõ mục tiêu tính năng, nhóm người dùng mục tiêu, phân quyền và phạm vi thiết kế (In-scope vs Out-of-scope).
   - `USER-FLOWS.md`: Nắm vững vị trí màn hình trong luồng tổng thể; xử lý đầy đủ các nhánh: *Đăng nhập*, *Chưa đăng nhập*, *Lỗi mạng*, *Quay lại (Back navigation)*.
   - `SCREEN-SPECS.md`: Xác định đúng mã màn hình, nội dung chi tiết, điều kiện hiển thị, CTA chính và quy chuẩn 4 trạng thái bắt buộc.
   - `DESIGN-SYSTEM.md`: Lấy chính xác các mã màu Token, quy chuẩn kiểu chữ (Typography), lưới khoảng cách (4px/8px Grid), độ bo góc (Radius) và đổ bóng (Shadow).
   - `FIGMA-MAP.md`: Tra cứu chính xác Page, Frame Name và Node ID cần thao tác bằng công cụ MCP.

---

## 2. Nguyên Tắc 2: Tuân Thủ Tuyệt Đối Design System & Tránh Hardcode

- **Không tùy tiện dùng mã màu lạ**: Mọi màu sắc trên giao diện phải lấy từ bảng token trong `DESIGN-SYSTEM.md`. Đối với nút bấm CTA chuyển đổi, bắt buộc dùng hệ màu gradient hồng chủ đạo kết hợp hồng nhạt tươi sáng (`--gradient-cta-pink` / `--color-primary-base`).
- **Hệ thống khoảng cách & căn lề**:
  - Toàn bộ `padding`, `margin`, `gap` phải tuân theo thang bội số 4px / 8px (4, 8, 12, 16, 20, 24, 32, 40, 48px).
  - Khối văn bản và nút bấm phải được căn giữa đối xứng và cân bằng thị giác, tuyệt đối không để lệch lề.
- **Tính đồng nhất của Component**:
  - Nút Primary CTA luôn có dạng **Pill** bo tròn hoàn hảo (`border-radius: 9999px`), có hiệu ứng hover nâng nhẹ và hiệu ứng active lún xuống phản hồi xúc giác.
  - Sticker trang trí phải sử dụng dạng bong bóng mềm mại (Bubble stickers) với màu pastel nhẹ nhàng, tuyệt đối không dùng ngôi sao góc nhọn thô cứng gây rối mắt hoặc đè lấn lên chữ.

---

## 3. Nguyên Tắc 3: Bắt Buộc Đầy Đủ 4 Trạng Thái & Không Có Điểm Nghẽn (No Dead-End)

- Mọi màn hình và luồng thao tác đều phải được thiết kế và lập trình sẵn sàng cho **4 trạng thái cốt lõi**:
  1. **Loading State**: Sử dụng hiệu ứng Skeleton Shimmer mượt mà, không dùng spinner tròn gây cảm giác chờ đợi nặng nề.
  2. **Empty State**: Khi chưa có dữ liệu, hiển thị hình ảnh linh vật thân thiện kèm lời khuyên và nút bấm hướng dẫn hành động tiếp theo.
  3. **Error State**: Khi xảy ra lỗi kết nối hoặc xử lý, thông báo lịch sự, không để lộ mã lỗi máy chủ và bắt buộc có nút *"Thử lại"* (Retry).
  4. **Success State**: Trạng thái hoàn chỉnh, sắc nét và hài hòa thị giác.
- **Không tạo ngõ cụt (Zero Dead-End)**:
  - Bất kỳ modal, popup hay thông báo lỗi nào cũng phải có đường thoát (nút đóng, nút quay lại trang trước hoặc trở về trang chủ).

---

## 4. Nguyên Tắc 4: Thích Ứng Thiết Bị Linh Hoạt (SP & PC Adaptability)

- **Mobile First (SP: 375px - 430px)**:
  - Kiểm thử hiển thị trên màn hình nhỏ nhất (375px): Không được xuất hiện thanh cuộn ngang, chữ không bị vỡ hàng bất hợp lý.
  - Vùng chạm (Touch Target) cho mọi nút bấm tối thiểu là $44 \times 44\text{px}$ (khuyến nghị chiều cao $54\text{px}$ cho CTA chính).
- **Desktop (PC: 1200px - 1440px+)**:
  - Giao diện được căn giữa trang nhã, chiều rộng card giới hạn hợp lý ($720\text{px} - 1200\text{px}$), không để nội dung bị giãn cách quá xa làm mất liên kết thị giác.

---

## 5. Nguyên Tắc 5: Thao Tác Chuẩn Xác Trên Figma MCP

- Khi gọi MCP (`figma_read`, `figma_write`):
  1. Chỉ đọc đúng Node ID đã ghi nhận trong `FIGMA-MAP.md`, không đọc bừa bãi toàn bộ file.
  2. Khi tạo mới Frame hoặc biến thể (Variant), Agent có trách nhiệm **cập nhật ngay lập tức Node ID mới vào file `FIGMA-MAP.md`**.
  3. Giữ nguyên cấu trúc layer Auto-layout chuẩn để lập trình viên có thể inspect và xuất code dễ dàng.

---

## 6. Nguyên Tắc 6: Tự Rà Soát Trước Khi Bàn Giao (Self-Review First)

Trước khi thông báo hoàn tất nhiệm vụ cho người dùng:
1. Agent **PHẢI** tự rà soát sản phẩm dựa trên từng tiêu chí P0 trong file `DESIGN-REVIEW-CHECKLIST.md`.
2. Kiểm tra lại:
   - [ ] CTA có nổi bật và đúng màu hồng chủ đạo không?
   - [ ] Văn bản tiếng Nhật/tiếng Việt có bị lệch lề hay sai chính tả không?
   - [ ] Sticker có che khuất nội dung không?
   - [ ] Đã có đủ các trạng thái chưa?
3. Báo cáo rõ ràng các hạng mục đã hoàn thành kèm đường dẫn tới các file liên quan.
