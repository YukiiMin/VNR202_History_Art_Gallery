# Việt Nam: 30 Năm Kháng Chiến (1945–1975)

Phòng triển lãm lịch sử 3D — Tái hiện hai cuộc kháng chiến vĩ đại của dân tộc Việt Nam trong không gian thực tế ảo ba chiều.

## Nội dung trưng bày

- **Chương I** — Kháng chiến chống Pháp (1945–1954)
  - Tuyên Ngôn Độc Lập 2/9/1945
  - Chiến thắng Việt Bắc 1947
  - Chiến dịch Biên Giới 1950
  - Chiến thắng Điện Biên Phủ 1954

- **Chương II** — Kháng chiến chống Mỹ (1954–1975)
  - Phong trào Đồng Khởi 1960
  - Tổng tiến công Tết Mậu Thân 1968
  - Chiến dịch Hồ Chí Minh 1975

## Cài đặt

Yêu cầu: [Node.js](https://nodejs.org) và trình soạn thảo như [VS Code](https://code.visualstudio.com/Download).

Sau khi clone hoặc tải source code, mở terminal và chạy:

```bash
npm install
```

Đợi cài đặt xong, chạy:

```bash
npm run dev
```

Server sẽ khởi động tại `http://localhost:5173/`

## Các lệnh khác

```bash
npm run build   # Build phiên bản production vào thư mục dist/
npm run preview # Xem trước bản build production
```

## Deploy lên Vercel

```bash
npm i -g vercel
vercel
```

Hoặc kết nối repo với [Vercel](https://vercel.com) để auto-deploy.

## Controls

| Phím | Hành động |
|------|-----------|
| `W A S D` | Di chuyển |
| `Chuột` | Nhìn xung quanh |
| `E` | Tương tác với tranh/tượng |
| `I` | Bật/tắt HUD |
| `ESC` | Mở menu thoát |
