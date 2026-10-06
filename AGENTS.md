# PROJECT AGENTS & DESIGN WORKFLOW RULES

> **Bộ Quy Tắc Làm Việc Bắt Buộc Của Dự Án**: Mọi AI Agent và cộng tác viên khi làm việc trong workspace này đều phải tuân thủ nghiêm ngặt các nguyên tắc dưới đây và tham chiếu hệ thống tài liệu tiêu chuẩn đã được thiết lập.

---

## 📚 Hệ Thống Tài Liệu Chuẩn Cần Tham Chiếu

Trước khi thực hiện bất kỳ tác vụ nào (UI/UX, Figma MCP, HTML/CSS, Frontend), Agent **BẮT BUỘC** phải đọc các file sau:

1. [PRODUCT-REQUIREMENTS.md](file:///d:/figma-ui-mcp-main/PRODUCT-REQUIREMENTS.md): Mục tiêu sản phẩm, nhóm người dùng, chức năng MoSCoW, ma trận phân quyền, phạm vi thiết kế.
2. [USER-FLOWS.md](file:///d:/figma-ui-mcp-main/USER-FLOWS.md): Sơ đồ hành trình người dùng (Mermaid), điểm bắt đầu $\to$ hành động $\to$ màn hình kế tiếp; các nhánh thành công, lỗi, chưa đăng nhập, quay lại.
3. [SCREEN-SPECS.md](file:///d:/figma-ui-mcp-main/SCREEN-SPECS.md): Đặc tả chi tiết từng màn hình; mục đích, nội dung, CTA, điều kiện hiển thị và bắt buộc có đủ 4 trạng thái (**Loading, Empty, Error, Success**).
4. [DESIGN-SYSTEM.md](file:///d:/figma-ui-mcp-main/DESIGN-SYSTEM.md): Bảng Design Tokens chuẩn (màu sắc hồng chủ đạo/hồng nhạt, typography, lưới 4px/8px, radius, shadow) và danh mục linh kiện kèm toàn bộ trạng thái tương tác.
5. [FIGMA-MAP.md](file:///d:/figma-ui-mcp-main/FIGMA-MAP.md): Bảng ánh xạ Screen ID $\leftrightarrow$ Page Name $\leftrightarrow$ Node ID trên Figma; quy chuẩn đọc/ghi bằng MCP tool (`figma_read`, `figma_write`).
6. [DESIGN-REVIEW-CHECKLIST.md](file:///d:/figma-ui-mcp-main/DESIGN-REVIEW-CHECKLIST.md): Tiêu chí kiểm tra chất lượng (Flow, CTA, tính nhất quán, SP/PC, nội dung, trạng thái) trước khi chuyển giao lập trình.

---

## ⚡ 7 Nguyên Tắc Vàng Khi Làm Việc (Golden Rules)

1. **Nguyên tắc Documentation-First**: Không suy đoán yêu cầu; luôn đọc và đối chiếu 6 file đặc tả ở trên trước khi chỉnh sửa Figma hoặc viết code.
2. **Tuân thủ Design System (No Hardcode)**: Bắt buộc dùng đúng token từ [DESIGN-SYSTEM.md](file:///d:/figma-ui-mcp-main/DESIGN-SYSTEM.md). Nút Primary CTA luôn dùng gradient tông hồng chủ đạo kết hợp hồng nhạt tươi sáng, bo góc Pill (`border-radius: 9999px`) với hiệu ứng glow thu hút.
3. **Cân bằng & Đối xứng (Balanced Layout)**: Text không bao giờ được lệch méo; tiêu đề và nhận xét được căn giữa đối xứng với nút CTA. Sticker trang trí là dạng bong bóng mềm mại (Bubbles), không dùng ngôi sao nhọn gây rối mắt hoặc đè lên chữ.
4. **Đầy đủ 4 Trạng thái & Không Dead-End**: Mọi màn hình phải có đủ Loading (Skeleton Shimmer), Empty, Error (kèm nút Thử lại), và Success. Mọi modal/sheet phải có lối thoát rõ ràng.
5. **Đồng bộ Node Figma chính xác**: Chỉ đọc/ghi đúng Node ID được quy định trong [FIGMA-MAP.md](file:///d:/figma-ui-mcp-main/FIGMA-MAP.md). Khi tạo frame mới, bắt buộc cập nhật lại Node ID vào file này.
6. **Tự Rà Soát Trước Khi Bàn Giao**: Trước khi trả lời hoàn thành cho người dùng, Agent phải tự kiểm tra 100% các tiêu chí P0 trong [DESIGN-REVIEW-CHECKLIST.md](file:///d:/figma-ui-mcp-main/DESIGN-REVIEW-CHECKLIST.md).
7. **Tự Động Dọn Dẹp File Rác (Auto Cleanup Scratch & Temp Files)**: Mọi file script dùng 1 lần để test/debug (`debug_*.js`, `test_*.js`, `fix_*.js`, `build_*.js`, `query_*.js`) và các file ảnh chụp audit tạm thời (`audit_*.png`, `*_preview.png`) sau khi implement và nghiệm thu task thành công **BẮT BUỘC phải được xóa ngay lập tức khỏi workspace**. Tuyệt đối không để lại file rác làm ô nhiễm thư mục dự án.

