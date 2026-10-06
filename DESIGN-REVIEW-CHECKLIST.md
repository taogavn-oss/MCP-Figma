# DESIGN REVIEW CHECKLIST (QA & HANDOFF CRITERIA)

> **Bộ Tiêu Chí Đánh Giá Thiết Kế**: Danh sách kiểm tra chất lượng toàn diện trước khi chốt thiết kế hoặc chuyển giao sang giai đoạn lập trình (Handoff to Implement). Bắt buộc phải đạt 100% các tiêu chí P0 để đảm bảo trải nghiệm người dùng hoàn hảo và tính nhất quán tuyệt đối.

---

## 1. Bảng Tiêu Chí Đánh Giá Chi Tiết (Review Categories)

### 1.1 Luồng & Trải Nghiệm Người Dùng (Flow & UX Logic)
| STT | Tiêu chí kiểm tra | Mức độ | Hướng dẫn kiểm tra | Kết quả |
| :---: | :--- | :---: | :--- | :---: |
| 1.1 | **Không có điểm nghẽn (No Dead-End)** | **P0** | Mọi màn hình, modal hoặc thông báo lỗi đều có nút thoát, quay lại hoặc tiếp tục rõ ràng. | [ ] Đạt |
| 1.2 | **Điều hướng Quay lại (Back Navigation)** | **P0** | Bấm quay lại trên header hoặc browser giữ nguyên dữ liệu đã chọn của bài test, không reset trắng. | [ ] Đạt |
| 1.3 | **Luồng Chưa đăng nhập (Guest Path)** | **P0** | Khi bấm CTA, nếu chưa login thì mở Sheet/Modal nhẹ nhàng, login xong đi tiếp ngay đến kết quả mong muốn. | [ ] Đạt |
| 1.4 | **Giảm thiểu số bước thao tác (Frictionless)** | **P1** | Khoảng cách từ lúc xem kết quả tóm tắt đến lúc xem tiếp không quá 1 chạm/click. | [ ] Đạt |

---

### 1.2 Nút Kêu Gọi Hành Động (CTA Excellence)
| STT | Tiêu chí kiểm tra | Mức độ | Hướng dẫn kiểm tra | Kết quả |
| :---: | :--- | :---: | :--- | :---: |
| 2.1 | **Tính độc tôn của Primary CTA** | **P0** | Mỗi viewport chỉ có duy nhất 1 nút Primary CTA nổi bật nhất (nút *「無料で続きを見る」*). | [ ] Đạt |
| 2.2 | **Thị giác thu hút (Visual Hierarchy)** | **P0** | Màu hồng chủ đạo kết hợp hồng nhạt tươi tắn, có độ tương phản nổi trội so với nền, không bị chìm. | [ ] Đạt |
| 2.3 | **Kích thước & Vùng bấm an toàn (Touch Target)** | **P0** | Chiều cao nút $\ge 48\text{px}$ (khuyến nghị $54\text{px}$ trên Mobile), diện tích chạm tối thiểu $48 \times 48\text{px}$. | [ ] Đạt |
| 2.4 | **Hiệu ứng phản hồi (Micro-interactions)** | **P1** | Đầy đủ phản hồi khi Hover (nâng lên, bóng tỏa rộng) và Active/Pressed (lún xuống nhẹ). | [ ] Đạt |
| 2.5 | **Nội dung nhãn nút (Copywriting)** | **P0** | Chữ trên nút rõ ràng, hướng hành động, font chữ đậm dễ đọc, không bị rớt dòng. | [ ] Đạt |

---

### 1.3 Tính Nhất Quán & Design System (Consistency & Tokens)
| STT | Tiêu chí kiểm tra | Mức độ | Hướng dẫn kiểm tra | Kết quả |
| :---: | :--- | :---: | :--- | :---: |
| 3.1 | **Mã màu chuẩn Token** | **P0** | Sử dụng chính xác bảng màu quy định trong `DESIGN-SYSTEM.md` (hồng san hô, hồng phấn, nền kem ấm). Không dùng mã màu lạ ngoài hệ thống. | [ ] Đạt |
| 3.2 | **Thang khoảng cách (8pt Grid)** | **P0** | Padding, margin, gap đều là bội số của 4px hoặc 8px (4, 8, 12, 16, 20, 24, 32, 40px). | [ ] Đạt |
| 3.3 | **Hệ thống Bo góc (Corner Radius)** | **P0** | Thẻ card bo góc $20\text{px}-24\text{px}$, nút bấm dạng Pill bo tròn hoàn hảo ($9999\text{px}$). | [ ] Đạt |
| 3.4 | **Phân cấp chữ (Typographic Hierarchy)** | **P0** | Tiêu đề H1, H2, nội dung Body, caption phân biệt rõ ràng về kích cỡ, độ đậm và chiều cao dòng (`line-height`). | [ ] Đạt |

---

### 1.4 Thích Ứng Thiết Bị: Di Động & Máy Tính (SP vs PC Adaptability)
| STT | Tiêu chí kiểm tra | Mức độ | Hướng dẫn kiểm tra | Kết quả |
| :---: | :--- | :---: | :--- | :---: |
| 4.1 | **Kiểm thử trên màn hình nhỏ (Mobile 375px)** | **P0** | Kiểm tra trên iPhone SE / iPhone Mini (375px width): Không có thanh cuộn ngang (horizontal scrollbar), không tràn chữ. | [ ] Đạt |
| 4.2 | **Vùng ngón tay cái (Mobile Thumb Zone)** | **P0** | Nút CTA chính nằm trong tầm với thuận tiện của ngón cái trên điện thoại một tay. | [ ] Đạt |
| 4.3 | **Hiển thị trên Desktop (PC 1440px)** | **P0** | Giao diện trên màn hình rộng được căn giữa gọn gàng, độ rộng card tối ưu ($720\text{px}-1200\text{px}$), không bị kéo giãn méo hình. | [ ] Đạt |
| 4.4 | **Cân đối Sticker & Minh họa** | **P1** | Sticker bong bóng và linh vật Mascot được co giãn tỉ lệ hợp lý, không đè lấn lên khối chữ đọc trên cả 2 màn hình. | [ ] Đạt |

---

### 1.5 Nội Dung & Ngôn Ngữ (Content, Typography & Localization)
| STT | Tiêu chí kiểm tra | Mức độ | Hướng dẫn kiểm tra | Kết quả |
| :---: | :--- | :---: | :--- | :---: |
| 5.1 | **Đúng chính tả & Ngữ pháp** | **P0** | Tiếng Nhật chuẩn xác (đặc biệt đoạn: *「自分自身をもっと深く知る」* và *「無料で続きを見る」*), không sai trợ từ, không dùng từ cấm. | [ ] Đạt |
| 5.2 | **Căn chỉnh văn bản (Text Alignment)** | **P0** | Tiêu đề và nhận xét được căn giữa đối xứng, cân đối tuyệt đối với khung nút bên dưới, khoảng cách lề hai bên đều nhau. | [ ] Đạt |
| 5.3 | **Ngắt dòng tự nhiên (Word Wrapping)** | **P1** | Không ngắt giữa chừng từ ngữ quan trọng, sử dụng `word-break: keep-all` hoặc ngữ nghĩa hợp lý cho chữ tiếng Nhật. | [ ] Đạt |

---

### 1.6 Kiểm Tra Đầy Đủ 4 Trạng Thái Màn Hình (States Completeness)
| STT | Trạng thái cần duyệt | Mức độ | Điều kiện nghiệm thu | Kết quả |
| :---: | :--- | :---: | :--- | :---: |
| 6.1 | **Loading State** | **P0** | Có khung Skeleton Shimmer mượt mà cho Mascot, đoạn chữ và nút bấm khi dữ liệu chưa tải xong. | [ ] Đạt |
| 6.2 | **Empty State** | **P0** | Khi không có dữ liệu chẩn đoán, hiển thị hình ảnh thân thiện kèm hướng dẫn và nút dẫn về bài test. | [ ] Đạt |
| 6.3 | **Error State** | **P0** | Khi mất mạng hoặc server lỗi, có thông báo lịch sự, không lộ mã lỗi kỹ thuật và có nút *「Thử lại」*. | [ ] Đạt |
| 6.4 | **Success State** | **P0** | Trạng thái hoàn thiện hiển thị đầy đủ linh vật, sticker bóng nước tinh tế, văn bản sắc nét và CTA sẵn sàng. | [ ] Đạt |

---

## 2. Quy Trình Phê Duyệt & Ký Duyệt (Sign-Off Matrix)

Trước khi tiến hành viết code (Implement), Agent và Trưởng nhóm thiết kế phải kiểm tra và xác nhận:

- [ ] **Tiêu chuẩn P0**: Đạt $100\%$ (Bắt buộc không có ngoại lệ).
- [ ] **Tiêu chuẩn P1**: Đạt $\ge 90\%$.
- [ ] **Figma Node Matching**: Đã kiểm tra khớp mã Node trên file `FIGMA-MAP.md`.
- [ ] **Đã đối chiếu với PRD**: Khớp yêu cầu kinh doanh trên `PRODUCT-REQUIREMENTS.md`.

**Trạng thái nghiệm thu**: 🟢 **SẴN SÀNG CHUYỂN GIAO CHO LẬP TRÌNH (READY FOR DEV)**
