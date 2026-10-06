# DESIGN SYSTEM SPECIFICATION

> **Hệ Thống Thiết Kế Chuẩn Hóa**: Quy định chi tiết các Design Tokens (màu sắc, typography, spacing, radius, shadow) và danh mục linh kiện (Components) kèm tất cả các trạng thái tương tác để đảm bảo giao diện luôn đồng nhất, thẩm mỹ cao và chuẩn thiết kế UI/UX hiện đại.

---

## 1. Hệ Thống Màu Sắc (Color Tokens)

### 1.1 Màu Chủ Đạo & Accent (Brand & Accent Pink Palette)
Được tùy biến chuyên dụng cho các nút hành động, điểm nhấn thị giác và sticker:

| Token Name | Hex Code | HSL / RGB | Mô tả & Ứng dụng |
| :--- | :--- | :--- | :--- |
| `--color-primary-base` | `#FF4B72` | `hsl(347, 100%, 65%)` | Màu hồng san hô đậm - CTA Primary Hover/Active |
| `--color-primary-bright` | `#FF6584` | `hsl(348, 100%, 70%)` | Màu hồng tươi sáng - Điểm nhấn chính, icon nổi bật |
| `--color-primary-soft` | `#FF8FA3` | `hsl(349, 100%, 78%)` | Màu hồng phấn trung gian - Gradient nút bấm |
| `--color-primary-light` | `#FFD5DE` | `hsl(348, 100%, 92%)` | Màu hồng nhạt - Viền badge, viền sticker, nền nhấn |
| `--color-primary-bg` | `#FFF0F3` | `hsl(348, 100%, 97%)` | Hồng siêu nhạt - Nền khối CTA, nền bubble |
| `--gradient-cta-pink` | `linear-gradient(135deg, #FF6584 0%, #FFA07A 100%)` | Gradient hồng đào rực rỡ, thu hút thị giác cao độ |
| `--gradient-cta-hover`| `linear-gradient(135deg, #FF4B72 0%, #FF8E62 100%)` | Trạng thái hover tăng độ tương phản |

### 1.2 Màu Trung Tính & Bề Mặt (Neutral & Surface Palette)
| Token Name | Hex Code | Mô tả & Ứng dụng |
| :--- | :--- | :--- |
| `--color-bg-app` | `#FAF8F5` | Nền toàn trang - Kem nhạt tạo cảm giác ấm áp, cao cấp |
| `--color-surface-card` | `#FFFFFF` | Nền thẻ (Card), Container, Bottom Sheet |
| `--color-surface-subtle`| `#F5F1EB` | Nền khối phân cách, nền input, ô chọn |
| `--color-border-subtle` | `#EAE4DC` | Đường viền mỏng giữa các phần tử |
| `--color-border-strong` | `#D1C7BA` | Viền ô nhập liệu khi focus, viền chia nhóm |
| `--color-text-title` | `#1F1A18` | Tiêu đề chính, Heading H1, H2 (Tương phản cao) |
| `--color-text-body` | `#4A423D` | Văn bản nội dung nhận xét, đoạn mô tả |
| `--color-text-muted` | `#8C8178` | Chú thích phụ, ngày giờ, placeholder text |

### 1.3 Màu Báo Trạng Thái (Semantic Colors)
| Phân loại | Base Hex | Soft Background Hex | Border Hex | Ứng dụng |
| :--- | :--- | :--- | :--- | :--- |
| **Thành công (Success)** | `#10B981` | `#ECFDF5` | `#A7F3D0` | Hoàn thành, điểm số cao, mở khóa thành công |
| **Cảnh báo (Warning)** | `#F59E0B` | `#FFFBEB` | `#FDE68A` | Nhắc nhở thời gian, nội dung sắp hết hạn |
| **Lỗi (Error)** | `#EF4444` | `#FEF2F2` | `#FECACA` | Lỗi kết nối, thiếu thông tin bắt buộc |
| **Thông tin (Info)** | `#3B82F6` | `#EFF6FF` | `#BFDBFE` | Gợi ý mẹo vặt, chính sách bảo mật |

---

## 2. Hệ Thống Kiểu Chữ (Typography Scale)

- **Bộ Font chữ chính**:
  - Tiếng Anh / Ký tự Latin: `'Plus Jakarta Sans'`, `'Inter'`, `-apple-system, sans-serif`.
  - Tiếng Nhật (Kanji, Hiragana, Katakana): `'Noto Sans JP'`, `'Hiragino Kaku Gothic ProN'`, `'Meiryo', sans-serif`.

| Kiểu chữ (Role) | Font Size | Line Height | Font Weight | Letter Spacing | Áp dụng cho |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display / Hero** | `32px` (`2rem`) | `1.25` (`40px`) | `800` (ExtraBold) | `-0.02em` | Tên linh vật, danh hiệu lớn nhất |
| **Heading 1 (H1)** | `24px` (`1.5rem`)| `1.3` (`31px`) | `700` (Bold) | `-0.015em` | Tiêu đề khối kết quả, modal title |
| **Heading 2 (H2)** | `20px` (`1.25rem`)| `1.35` (`27px`)| `700` (Bold) | `-0.01em` | Đoạn mở đầu *「自分自身をもっと深く知る」* |
| **Heading 3 (H3)** | `18px` (`1.125rem`)| `1.4` (`25px`)| `600` (SemiBold) | `0em` | Tiêu đề phụ trong card |
| **Body Large** | `16px` (`1rem`) | `1.6` (`26px`) | `500` (Medium) | `0.01em` | Đoạn nhận xét chi tiết, câu trả lời |
| **Body Standard** | `14px` (`0.875rem`)| `1.5` (`21px`)| `400` / `500` | `0.01em` | Hướng dẫn thao tác, nội dung thẻ |
| **Button Text** | `16px` (`1rem`) | `1.25` (`20px`) | `700` (Bold) | `0.02em` | Nút *「無料で続きを見る」* |
| **Caption / Tiny** | `12px` (`0.75rem`)| `1.4` (`17px`) | `500` (Medium) | `0.02em` | Ghi chú *"Miễn phí · Không cần thẻ"* |

---

## 3. Hệ Thống Lưới Khoảng Cách (Spacing Grid System)

Tuân thủ nguyên tắc bội số **4px / 8px**:

| Token Name | Giá trị | Ứng dụng cụ thể |
| :--- | :--- | :--- |
| `--space-1` | `4px` | Khoảng cách siêu nhỏ giữa icon và badge text |
| `--space-2` | `8px` | Khoảng cách giữa các thành phần inline, padding badge |
| `--space-3` | `12px` | Khoảng cách giữa tiêu đề phụ và body text |
| `--space-4` | `16px` | Padding trong card nhỏ, khoảng cách giữa các trường |
| `--space-5` | `20px` | Padding 2 bên cạnh màn hình Mobile |
| `--space-6` | `24px` | Padding trong Main Card, khoảng cách giữa các section |
| `--space-8` | `32px` | Khoảng cách giữa Hero Illustration và khối văn bản |
| `--space-10` | `40px` | Khoảng cách tới nút CTA chính |
| `--space-12` | `48px` | Margin top/bottom cho các khối lớn trên Desktop |

---

## 4. Hệ Thống Bo Góc & Đổ Bóng (Radius & Elevation)

### 4.1 Bo góc (Border Radius Scale)
- `--radius-xs`: `4px` (Tags rất nhỏ, tooltip).
- `--radius-sm`: `8px` (Dropdown, checkbox, ô nhập liệu).
- `--radius-md`: `12px` (Thẻ phụ, nút con).
- `--radius-lg`: `20px` (Main Card, khung hiển thị kết quả).
- `--radius-xl`: `28px` (Container chính, Bottom Sheet đỉnh).
- `--radius-pill`: `9999px` (Nút bấm CTA, Badge oval, Sticker bong bóng).

### 4.2 Đổ bóng & Phát sáng (Box Shadows & Glows)
- `--shadow-card`: `0 8px 24px rgba(31, 26, 24, 0.06)` (Khối thẻ nổi nhẹ, tự nhiên).
- `--shadow-modal`: `0 20px 48px rgba(31, 26, 24, 0.16)` (Modal, Bottom Sheet).
- `--shadow-cta-pink`: `0 10px 25px -4px rgba(255, 75, 114, 0.40), 0 4px 10px -2px rgba(255, 75, 114, 0.20)` (Tạo cảm giác nút bấm tràn đầy năng lượng và mời gọi).
- `--shadow-cta-hover`: `0 16px 32px -4px rgba(255, 75, 114, 0.50), 0 6px 14px -2px rgba(255, 75, 114, 0.25)`.

---

## 5. Quy Chuẩn Linh Kiện UI & Toàn Bộ Trạng Thái (Component States)

### 5.1 Nút Bấm Chính (Primary CTA: 「無料で続きを見る」)

| Trạng thái (State) | Biểu hiện thị giác (Visual Representation) | CSS / Thuộc tính tương ứng |
| :--- | :--- | :--- |
| **Default (Mặc định)** | Nền gradient hồng-đào, bo tròn pill, chữ trắng in đậm, đổ bóng hồng dịu nhẹ | `background: var(--gradient-cta-pink); box-shadow: var(--shadow-cta-pink);` |
| **Hover (Rê chuột)** | Gradient sáng hơn, nút nhấc lên $2\text{px}$, đổ bóng tỏa rộng hơn | `transform: translateY(-2px); box-shadow: var(--shadow-cta-hover);` |
| **Active / Pressed** | Nút lún xuống $1\text{px}$, bóng co lại, mang lại cảm giác chạm vật lý thật | `transform: translateY(1px) scale(0.98);` |
| **Focus Visible** | Viền outline kép màu hồng sáng tương phản cao bảo đảm chuẩn trợ năng | `outline: 3px solid rgba(255, 101, 132, 0.6); outline-offset: 3px;` |
| **Disabled** | Màu xám nhạt (`#E0D9D5`), chữ xám mờ (`#A39891`), mất bóng, con trỏ `not-allowed` | `opacity: 0.6; cursor: not-allowed; pointer-events: none;` |
| **Loading** | Ẩn văn bản, xuất hiện vòng xoay tròn trắng (Spinner) tại tâm nút | `pointer-events: none; content: spinner;` |

### 5.2 Khối Sticker Trang Trí (Stickers & Bubbles)
- **Thiết kế**: Hình tròn/oval mềm mại (Pill/Organic bubble) chứa icon cảm xúc dễ thương (trái tim, bàn chân cún, vệt sáng, bọt nước).
- **Màu sắc**: Nền hồng nhạt mờ (`rgba(255, 240, 243, 0.85)` kèm `backdrop-filter: blur(4px)`), viền mỏng pastel (`#FFD5DE`).
- **Chuyển động (Micro-animation)**: Chuyển động bồng bềnh nhẹ nhàng (Floating animation $\pm 4\text{px}$, thời gian chu kỳ 3.5s - 4.5s) tạo cảm giác sống động nhưng không gây mất tập trung khỏi nội dung đọc.
