// ============================================================
// PHÒNG TRIỂN LÃM VR — "Việt Nam: 30 năm kháng chiến chống xâm lược (1945–1975)"
// Dữ liệu hình ảnh Cloudinary; tổng 17 bức, treo 16 trên 4 tường.
//
// Bố trí tường (theo trục của game):
//   Front Wall  (z = -19.5)  — có EXIT GATE tại x ≈ 8.2 → 11.8  → 3 tranh (lệch trái + lệch phải)
//   Back Wall   (z = +19.5)  — có ENTRANCE GATE giữa tại x ≈ -1.8 → +1.8 → 3 tranh
//   Left Wall   (x = -19.5)  — không gate                          → 5 tranh đều
//   Right Wall  (x = +19.5)  — không gate                          → 5 tranh đều
//
// Entry index 0..16 (17 entries) ⇒ treo 16, bỏ entry index 16 "Chiến dịch Hồ Chí Minh"
// ============================================================

const sourceData = [
  // ── Front Wall (treo ở index 0, 1, 2) ───────────────────────────
  {
    "img": "https://res.cloudinary.com/yukiimin-cloud/image/upload/v1784155152/chu-tich-ho-chi-minh-doc-bang-tuyen-ngon_jl7x7j.webp",
    "title": "Tuyên ngôn Độc lập",
    "hoverText": "Bác Hồ đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình",
    "desc": "Thời gian: Ngày 02 tháng 9 năm 1945 [1].\nBối cảnh: Sau khi Nhật đầu hàng Đồng minh, chính quyền Nhật ở Đông Dương tan rã, tạo khoảng trống quyền lực [1]. Dưới sự lãnh đạo của Đảng và Mặt trận Việt Minh, Cách mạng Tháng Tám thành công, vua Bảo Đại thoái vị [1]. Việc tuyên bố độc lập là cấp thiết để khẳng định chủ quyền trước khi quân Đồng minh vào giải giáp và Pháp có ý định quay lại [1].\nDiễn biến chính:\n- Sáng 02/9/1945 tại Quảng trường Ba Đình, Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập trước hàng chục vạn đồng bào [2].\n- Bản tuyên ngôn khẳng định quyền tự do, bình đẳng của mọi dân tộc, tố cáo tội ác của thực dân Pháp và phát xít Nhật [2].\n- Tuyên bố chấm dứt quan hệ thuộc địa, xóa bỏ đặc quyền của Pháp và thành lập nước Việt Nam Dân chủ Cộng hòa [2].\nKết quả: Nhà nước Việt Nam Dân chủ Cộng hòa ra đời, nhân dân chính thức trở thành chủ nhân của một quốc gia độc lập [2].\nÝ nghĩa lịch sử: Đánh dấu thắng lợi vĩ đại của Cách mạng Tháng Tám, mở ra kỷ nguyên độc lập dân tộc và là cơ sở pháp lý vững chắc chống lại sự xâm lược trở lại của Pháp [3].",
    "quote": "Tuyên bố chấm dứt mọi quan hệ thuộc địa với Pháp, xóa bỏ mọi đặc quyền của Pháp trên lãnh thổ Việt Nam.",
    "tag": "Kháng chiến chống Pháp",
    "artist": "Tư liệu lịch sử",
    "year": "1945"
  },
  // ── Front Wall entry 1 ─────────────────────────────────────────
  {
    "img": "https://res.cloudinary.com/yukiimin-cloud/image/upload/v1784155144/phao-binh-trung-doan-song-lo-viet-bac-1947_teu9sa.gif",
    "title": "Chiến thắng Việt Bắc",
    "hoverText": "Pháo binh trung đoàn sông Lô, Việt Bắc",
    "desc": "Thời gian: 07/10 – 19/12/1947 [4].\nBối cảnh: Pháp mở cuộc tiến công quy mô lớn lên căn cứ Việt Bắc nhằm tiêu diệt cơ quan đầu não kháng chiến, bắt giữ lãnh đạo và kết thúc chiến tranh [4].\nDiễn biến chính:\n- Quân Pháp tiến công bằng ba hướng: đường không xuống Bắc Kạn, đường bộ theo Quốc lộ 4 và đường sông theo sông Lô [4].\n- Dưới sự chỉ huy của Trung ương Đảng và Đại tướng Võ Nguyên Giáp, quân ta tổ chức phục kích, chia cắt đội hình địch [4].\n- Các trận đánh tiêu biểu diễn ra tại Đèo Bông Lau, sông Lô khiến quân Pháp tổn thất nặng nề và buộc phải rút lui sau hai tháng [4].\nKết quả: Tiêu diệt lượng lớn sinh lực địch, bảo vệ an toàn căn cứ địa và cơ quan đầu não [5].\nÝ nghĩa lịch sử: Làm phá sản hoàn toàn chiến lược 'đánh nhanh thắng nhanh' của Pháp, buộc đối phương chuyển sang chiến tranh lâu dài và củng cố niềm tin thắng lợi [5].",
    "quote": "Chiến thắng Việt Bắc làm phá sản hoàn toàn chiến lược 'đánh nhanh thắng nhanh' của Pháp.",
    "tag": "Kháng chiến chống Pháp",
    "artist": "Tư liệu lịch sử",
    "year": "1947"
  },
  // ── Front Wall entry 2 ─────────────────────────────────────────
  {
    "img": "https://res.cloudinary.com/yukiimin-cloud/image/upload/v1784155144/tieu-doan-phao-binh-253-bien-gioi-1950_z4kton.jpg",
    "title": "Chiến dịch Biên giới",
    "hoverText": "Tiểu đoàn pháo binh 253 tại chiến dịch",
    "desc": "Thời gian: 16/09 – 22/10/1950 [5].\nBối cảnh: Nhu cầu mở thông biên giới để nhận viện trợ quốc tế trở nên cấp thiết, trong khi đó Pháp duy trì kiểm soát tuyến Cao Bằng – Lạng Sơn nhằm cô lập hoàn toàn căn cứ Việt Bắc [5].\nDiễn biến chính:\n- Quân đội ta mở màn chiến dịch bằng trận đánh Đông Khê, sau đó bao vây tiêu diệt hàng loạt cứ điểm quan trọng [6].\n- Khi Pháp từ Cao Bằng rút lui và từ Thất Khê lên ứng cứu, quân ta tổ chức phục kích đập tan đội hình địch [6].\nKết quả: Giải phóng hoàn toàn vùng biên giới Việt – Trung, khai thông tuyến viện trợ quốc tế [6].\nÝ nghĩa lịch sử: Đánh dấu sự trưởng thành vượt bậc của Quân đội Nhân dân Việt Nam khi chuyển từ phòng ngự sang chủ động tiến công, giành quyền chủ động trên chiến trường Bắc Bộ [6].",
    "quote": "Đánh dấu bước phát triển vượt bậc của Quân đội Nhân dân Việt Nam từ phòng ngự sang chủ động tiến công.",
    "tag": "Kháng chiến chống Pháp",
    "artist": "Tư liệu lịch sử",
    "year": "1950"
  },

  // ── Left Wall (5 tranh — index 3, 4, 5, 6, 7) ──────────────────
  {
    "img": "https://res.cloudinary.com/yukiimin-cloud/image/upload/v1784155149/truong-doan-2-khuc-dao-dau-hung-trang_gwsmul.jpg",
    "title": "Chiến thắng Điện Biên Phủ",
    "hoverText": "Bộ đội tấn công cứ điểm Điện Biên Phủ",
    "desc": "Thời gian: 13/03 – 07/05/1954 [7].\nBối cảnh: Pháp thực hiện Kế hoạch Nava, xây dựng Điện Biên Phủ thành tập đoàn cứ điểm mạnh nhất Đông Dương với hệ thống phòng thủ kiên cố nhằm giành thắng lợi quyết định [7].\nDiễn biến chính:\n- Ngày 13/03/1954, quân ta nổ súng tấn công cứ điểm Him Lam, mở màn chiến dịch [7].\n- Trải qua ba đợt tiến công liên tục gần hai tháng, bộ đội ta thu hẹp dần phạm vi phòng thủ của Pháp [7].\n- Chiều ngày 07/05/1954, ta đánh chiếm Sở chỉ huy, bắt sống tướng De Castries, kết thúc toàn thắng [7].\nKết quả: Tiêu diệt hoàn toàn tập đoàn cứ điểm Điện Biên Phủ, làm thất bại Kế hoạch Nava [8].\nÝ nghĩa lịch sử: Trở thành chiến thắng quân sự tiêu biểu của thế kỷ XX, buộc Pháp ký Hiệp định Genève, mở đầu sự sụp đổ của chủ nghĩa thực dân cũ [8].",
    "quote": "Mở đầu sự sụp đổ của chủ nghĩa thực dân cũ trên thế giới và trở thành một trong những chiến thắng quân sự tiêu biểu của thế kỷ XX.",
    "tag": "Kháng chiến chống Pháp",
    "artist": "Tư liệu lịch sử",
    "year": "1954"
  },
  {
    "img": "https://res.cloudinary.com/yukiimin-cloud/image/upload/v1784155149/toan-canh-phien-khai-mac-hoi-nghi_qjbrzc.avif",
    "title": "Hiệp định Genève",
    "hoverText": "Toàn cảnh phiên khai mạc Hội nghị Genève",
    "desc": "Thời gian: 21/07/1954 [8].\nBối cảnh: Sau thảm bại tại Điện Biên Phủ, Pháp không còn lựa chọn nào khác ngoài việc ngồi vào bàn đàm phán tại Hội nghị Genève để tìm giải pháp chấm dứt chiến tranh ở Đông Dương [8].\nDiễn biến chính:\n- Các bên thống nhất quy định đình chỉ chiến sự trên toàn bộ lãnh thổ Đông Dương [9].\n- Quân đội hai bên rút về hai miền tập kết, lấy vĩ tuyến 17 làm giới tuyến quân sự tạm thời [9].\n- Đề ra kế hoạch Việt Nam sẽ tiến hành tổng tuyển cử thống nhất đất nước vào tháng 7/1956 [9].\nKết quả: Chấm dứt chiến tranh Đông Dương, quân đội Pháp rút hoàn toàn khỏi Việt Nam, miền Bắc được hoàn toàn giải phóng [9].\nÝ nghĩa lịch sử: Đánh dấu thắng lợi trọn vẹn của cuộc kháng chiến chống Pháp, đưa miền Bắc bước vào thời kỳ xây dựng XHCN và trở thành hậu phương lớn cho cách mạng miền Nam [9].",
    "quote": "Đánh dấu thắng lợi của cuộc kháng chiến chống Pháp, tạo điều kiện để miền Bắc bước vào thời kỳ xây dựng chủ nghĩa xã hội.",
    "tag": "Kháng chiến chống Pháp",
    "artist": "Tư liệu lịch sử",
    "year": "1954"
  },
  {
    "img": "https://res.cloudinary.com/yukiimin-cloud/image/upload/v1784155150/dong-khoi-ben-tre-1960_ssmbv9.jpg",
    "title": "Phong trào Đồng Khởi",
    "hoverText": "Quần chúng nhân dân Đồng Khởi tại Bến Tre",
    "desc": "Thời gian: 1959–1960 [10].\nBối cảnh: Chính quyền Ngô Đình Diệm từ chối hiệp thương, đẩy mạnh đàn áp lực lượng cách mạng. Hội nghị Trung ương 15 (1959) chính thức cho phép sử dụng bạo lực để giành lại chính quyền [10].\nDiễn biến chính:\n- Phong trào bùng nổ mạnh mẽ nhất tại Bến Tre vào tháng 1/1960, sau đó lan rộng khắp Nam Bộ, Tây Nguyên và Trung Trung Bộ [10].\n- Nhân dân kết hợp khéo léo giữa đấu tranh chính trị và đấu tranh vũ trang [10].\n- Lực lượng nổi dậy phá tan nhiều bộ máy chính quyền cơ sở của địch, thiết lập chính quyền cách mạng tự quản [10].\nKết quả: Hàng nghìn ấp và xã được giải phóng, thế và lực của cách mạng miền Nam nâng cao rõ rệt [11].\nÝ nghĩa lịch sử: Đưa cách mạng miền Nam chuyển từ thế giữ gìn lực lượng sang thế tiến công, tạo tiền đề trực tiếp để thành lập Mặt trận Dân tộc Giải phóng miền Nam Việt Nam [11].",
    "quote": "Đưa cách mạng miền Nam chuyển từ thế giữ gìn lực lượng sang thế tiến công.",
    "tag": "Kháng chiến chống Mỹ",
    "artist": "Tư liệu lịch sử",
    "year": "1959-1960"
  },
  {
    "img": "https://res.cloudinary.com/yukiimin-cloud/image/upload/v1784155151/le-thanh-lap-mat-tran-20-12-1960_aafbgc.jpg",
    "title": "Thành lập Mặt trận Dân tộc Giải phóng miền Nam Việt Nam",
    "hoverText": "Lễ thành lập Mặt trận tại Tây Ninh",
    "desc": "Thời gian: 20/12/1960 [11].\nBối cảnh: Sự phát triển vũ bão của phong trào Đồng Khởi đòi hỏi phải có một tổ chức chính trị thống nhất để tập hợp lực lượng yêu nước, lãnh đạo kháng chiến [11].\nDiễn biến chính:\n- Ngày 20/12/1960, Mặt trận chính thức được thành lập tại xã Tân Lập, huyện Châu Thành, tỉnh Tây Ninh [12].\n- Tổ chức công bố chương trình hành động với mục tiêu cốt lõi là đánh đổ chế độ Mỹ - Diệm [12].\n- Hướng tới xây dựng một miền Nam độc lập, dân chủ, hòa bình [12].\nKết quả: Tập hợp rộng rãi mọi tầng lớp nhân dân yêu nước, nhanh chóng trở thành lực lượng chính trị đầu não [12].\nÝ nghĩa lịch sử: Tăng cường khối đại đoàn kết dân tộc, tạo cơ sở chính trị và tổ chức vững chắc cho các thắng lợi vang dội trong những giai đoạn tiếp theo [12].",
    "quote": "Tạo cơ sở chính trị và tổ chức cho các thắng lợi tiếp theo trong cuộc kháng chiến chống Mỹ.",
    "tag": "Kháng chiến chống Mỹ",
    "artist": "Tư liệu lịch sử",
    "year": "1960"
  },
  {
    "img": "https://res.cloudinary.com/yukiimin-cloud/image/upload/v1784155144/chien-thuat-truc-thang-van-cua-my_eornru.jpg",
    "title": "Đánh bại chiến lược \"Chiến tranh đặc biệt\"",
    "hoverText": "Chiến thuật trực thăng vận của Mỹ bị bẻ gãy",
    "desc": "Thời gian: 1961–1965 [13].\nBối cảnh: Mỹ triển khai 'Chiến tranh đặc biệt', dùng quân đội Sài Gòn làm lực lượng chủ yếu kết hợp với vũ khí hiện đại và dồn dân lập 'ấp chiến lược' [13].\nDiễn biến chính:\n- Đầu năm 1963, quân ta chiến thắng vang dội tại Ấp Bắc, bẻ gãy chiến thuật 'trực thăng vận' và 'thiết xa vận' của địch [13].\n- Phong trào phá ấp chiến lược của quần chúng phát triển rộng khắp [13].\n- Quân giải phóng tiếp tục giành thắng lợi lớn tại Bình Giã, Ba Gia, Đồng Xoài [13].\nKết quả: Đánh bại hoàn toàn chiến lược 'Chiến tranh đặc biệt', buộc Mỹ phải đưa quân viễn chinh vào tham chiến trực tiếp [14].\nÝ nghĩa lịch sử: Khẳng định bản lĩnh và khả năng đánh bại các hình thái chiến tranh hiện đại của quân dân miền Nam [14].",
    "quote": "Khẳng định khả năng đánh bại chiến tranh hiện đại của quân và dân miền Nam.",
    "tag": "Kháng chiến chống Mỹ",
    "artist": "Tư liệu lịch sử",
    "year": "1961-1965"
  },

  // ── Back Wall (3 tranh — index 8, 9, 10), né entrance gate ở giữa ───
  {
    "img": "https://res.cloudinary.com/yukiimin-cloud/image/upload/v1784155151/07-08-1964-quoc-hoi-my-thong-qua-nghi-quyet-vinh-bac-bo_gmle3o.jpg",
    "title": "Sự kiện Vịnh Bắc Bộ",
    "hoverText": "Quốc hội Mỹ thông qua Nghị quyết Vịnh Bắc Bộ",
    "desc": "Thời gian: Tháng 8 năm 1964 [14].\nBối cảnh: Mỹ tăng cường hoạt động trinh sát và khiêu khích miền Bắc; lợi dụng sự kiện tàu khu trục USS Maddox để lấy cớ mở rộng chiến tranh [14].\nDiễn biến chính:\n- Ngày 05/08/1964, không quân Mỹ ném bom hàng loạt mục tiêu trên miền Bắc Việt Nam [15].\n- Quốc hội Mỹ nhanh chóng thông qua Nghị quyết Vịnh Bắc Bộ, trao quyền cho Tổng thống Mỹ mở rộng can thiệp quân sự mà không cần tuyên chiến chính thức [15].\nKết quả: Khởi đầu chiến tranh phá hoại miền Bắc lần thứ nhất, mức độ can thiệp quân sự của Mỹ tăng vọt [15].\nÝ nghĩa lịch sử: Là bước leo thang nguy hiểm mở đường cho Mỹ đưa quân viễn chinh trực tiếp vào miền Nam từ năm 1965, làm cuộc chiến ác liệt hơn [15].",
    "quote": "Mở đường cho việc Mỹ đưa quân viễn chinh trực tiếp vào miền Nam.",
    "tag": "Kháng chiến chống Mỹ",
    "artist": "Tư liệu lịch sử",
    "year": "1964"
  },
  {
    "img": "https://res.cloudinary.com/yukiimin-cloud/image/upload/v1784154861/anh-III-H_nzhxsf.jpg",
    "title": "Đánh bại chiến lược \"Chiến tranh cục bộ\"",
    "hoverText": "Lực lượng giải phóng đẩy lùi quân viễn chinh Mỹ",
    "desc": "Thời gian: 1965–1968 [16].\nBối cảnh: Mỹ đưa quân viễn chinh và quân đồng minh trực tiếp vào miền Nam, kết hợp không quân ném bom miền Bắc nhằm thực hiện chiến lược 'tìm diệt' và 'bình định' nhanh [16].\nDiễn biến chính:\n- Trận Vạn Tường (8/1965) đánh bại cuộc hành quân 'tìm diệt' đầu tiên, mở đầu cao trào 'tìm Mỹ mà đánh' [16].\n- Quân dân ta lần lượt đánh bại hai cuộc phản công chiến lược mùa khô (1965-1966 và 1966-1967) với các trận tiêu biểu như Bàu Bàng – Dầu Tiếng [16, 17].\n- Phong trào đấu tranh chính trị tại đô thị kết hợp ba mũi giáp công dâng cao [17].\nKết quả: Quân Mỹ không đạt được mục tiêu chiến lược; quân dân ta giữ vững và mở rộng vùng giải phóng [17].\nÝ nghĩa lịch sử: Chứng minh khả năng đánh bại quân đội hiện đại của Mỹ, làm lung lay ý chí xâm lược và tạo tiền đề cho Tổng tiến công Tết Mậu Thân [17].",
    "quote": "Chứng minh khả năng đánh bại quân đội hiện đại của một đế quốc lớn ngay từ những trận đầu.",
    "tag": "Kháng chiến chống Mỹ",
    "artist": "Tư liệu lịch sử",
    "year": "1965-1968"
  },
  {
    "img": "https://res.cloudinary.com/yukiimin-cloud/image/upload/v1784154862/mau_than_1968_jkg1f7.jpg",
    "title": "Tổng tiến công và nổi dậy Tết Mậu Thân",
    "hoverText": "Lực lượng giải phóng tấn công đô thị dịp Tết Mậu Thân",
    "desc": "Thời gian: Đêm 30, rạng sáng 31/1/1968 [18].\nBối cảnh: Lợi dụng thời điểm địch lơ là dịp Tết, quân ta chủ trương đánh thẳng vào các đô thị và cơ quan đầu não của địch [18].\nDiễn biến chính:\n- Đồng loạt tổng công kích tại hầu hết các thành phố, thị xã miền Nam [18].\n- Tập kích trực diện vào Tòa Đại sứ Mỹ, Dinh Độc Lập, Bộ Tổng tham mưu và Đài phát thanh Sài Gòn [18].\n- Làm chủ thành phố Huế trong suốt 25 ngày đêm, gây tiếng vang lớn trên trường quốc tế [18, 19].\nKết quả: Dù chịu tổn thất lớn về lực lượng, cuộc tiến công đã giáng đòn quyết định làm lung lay ý chí xâm lược của Mỹ [19].\nÝ nghĩa lịch sử: Buộc nước Mỹ phải tuyên bố 'phi Mỹ hóa' chiến tranh, ngừng ném bom miền Bắc và chấp nhận đàm phán tại Paris [19].",
    "quote": "Làm lung lay ý chí xâm lược của Mỹ... mở ra cục diện 'vừa đánh vừa đàm'.",
    "tag": "Kháng chiến chống Mỹ",
    "artist": "Tư liệu lịch sử",
    "year": "1968"
  },

  // ── Right Wall (5 tranh — index 11, 12, 13, 14, 15) ───────────
  {
    "img": "https://res.cloudinary.com/yukiimin-cloud/image/upload/v1784154862/46546756-1616666757699_tha1jh.webp",
    "title": "Cuộc tiến công chiến lược năm 1972 (Mùa hè đỏ lửa)",
    "hoverText": "Chiến đấu bảo vệ thành cổ Quảng Trị",
    "desc": "Thời gian: Từ 30/3/1972 [20].\nBối cảnh: Nhằm đập tan chiến lược 'Việt Nam hóa chiến tranh' của Mỹ, ta mở cuộc tiến công chiến lược toàn miền Nam để hỗ trợ đấu tranh ngoại giao tại Paris [20].\nDiễn biến chính:\n- Mở màn chiến dịch tại Quảng Trị, chọc thủng tuyến phòng ngự mạnh nhất của địch và giải phóng toàn tỉnh vào 1/5/1972 [20].\n- Tiến công đồng loạt trên các chiến trường Tây Nguyên và Đông Nam Bộ [20].\n- Địch dồn toàn lực phản công ác liệt tái chiếm Quảng Trị, gây ra tổn thất lớn cho cả hai bên ('mùa hè đỏ lửa') [21].\nKết quả: Quân Sài Gòn lộ rõ sự suy yếu khi thiếu quân Mỹ; chiến lược 'Việt Nam hóa chiến tranh' bị giáng đòn nặng nề [21].\nÝ nghĩa lịch sử: Buộc Mỹ phải tuyên bố 'Mỹ hóa' trở lại bằng không quân và thúc đẩy sự nhượng bộ của chúng trên bàn đàm phán [21].",
    "quote": "Giáng đòn quyết định vào chiến lược 'Việt Nam hóa chiến tranh'.",
    "tag": "Kháng chiến chống Mỹ",
    "artist": "Tư liệu lịch sử",
    "year": "1972"
  },
  {
    "img": "https://res.cloudinary.com/yukiimin-cloud/image/upload/v1784154861/90a2e439-20d7-4546-8f15-ee2afa7f01bd_vwfily.jpg",
    "title": "Chiến thắng \"Điện Biên Phủ trên không\"",
    "hoverText": "Xác máy bay B-52 bị bắn rơi tại Hà Nội",
    "desc": "Thời gian: 18/12/1972 – 29/12/1972 [22].\nBối cảnh: Nhằm cứu vãn tình thế và ép ta nhượng bộ tại Paris, Mỹ dùng siêu pháo đài bay B-52 mở cuộc ném bom hủy diệt Hà Nội, Hải Phòng [22].\nDiễn biến chính:\n- Máy bay chiến lược B-52 ném bom dữ dội bất kể ngày đêm vào khu dân cư và các vùng phụ cận [22].\n- Quân dân miền Bắc, nòng cốt là lực lượng phòng không, tổ chức lưới lửa dày đặc đánh trả kiên cường [22].\n- Trong 12 ngày đêm, ta bắn rơi hàng loạt máy bay B-52, đập tan cuộc tập kích [22].\nKết quả: Mỹ hứng chịu thiệt hại nặng nề nhất về không quân trong chiến tranh và buộc phải ngừng ném bom từ vĩ tuyến 20 trở ra [23].\nÝ nghĩa lịch sử: Trở thành chiến thắng lịch sử ép Mỹ phải ký Hiệp định Paris, chấm dứt hoàn toàn thủ đoạn dùng không quân chiến lược đe dọa nước ta [23].",
    "quote": "Buộc Mỹ phải ký Hiệp định Paris, chấm dứt hoàn toàn việc dùng không quân chiến lược đe dọa Việt Nam.",
    "tag": "Kháng chiến chống Mỹ",
    "artist": "Tư liệu lịch sử",
    "year": "1972"
  },
  {
    "img": "https://res.cloudinary.com/yukiimin-cloud/image/upload/v1784154906/hiepdinh_1_b6yugo.jpg",
    "title": "Hiệp định Paris",
    "hoverText": "Lễ ký kết Hiệp định Paris năm 1973",
    "desc": "Thời gian: 27/01/1973 [23].\nBối cảnh: Thất bại toàn diện từ chiến trường đến bầu trời miền Bắc (Điện Biên Phủ trên không) đã buộc Mỹ phải chấp nhận các điều khoản hiệp định [23].\nDiễn biến chính:\n- Mỹ cam kết rút hết quân viễn chinh và quân đồng minh trong vòng 60 ngày, hủy bỏ mọi căn cứ quân sự [24].\n- Lệnh ngừng bắn có hiệu lực, hai bên trao đổi tù binh [24].\n- Mỹ phải để nhân dân miền Nam tự quyết định tương lai chính trị của mình [24].\nKết quả: Chấm dứt sự dính líu quân sự trực tiếp của quân đội Mỹ tại miền Nam Việt Nam [24].\nÝ nghĩa lịch sử: Hoàn thành nhiệm vụ 'Đánh cho Mỹ cút', tạo thời cơ vàng và mở đường cho nhiệm vụ 'đánh cho ngụy nhào' để thống nhất đất nước [24].",
    "quote": "Thời cơ chiến lược thuận lợi: 'Đánh cho Mỹ cút' đã hoàn thành, mở đường cho nhiệm vụ 'đánh cho ngụy nhào'.",
    "tag": "Kháng chiến chống Mỹ",
    "artist": "Tư liệu lịch sử",
    "year": "1973"
  },
  {
    "img": "https://res.cloudinary.com/yukiimin-cloud/image/upload/v1784154928/3015-8.12_sdgqio.webp",
    "title": "Chiến thắng Phước Long",
    "hoverText": "Giải phóng Phước Long, đòn trinh sát chiến lược",
    "desc": "Thời gian: 12/12/1974 – 6/1/1975 [25].\nBối cảnh: Mỹ đã rút nhưng vẫn tuồn vũ khí viện trợ cho chính quyền Sài Gòn; ta mở chiến dịch nhằm đánh giá thực lực quân ngụy và thăm dò phản ứng của Mỹ [25].\nDiễn biến chính:\n- Quân ta tiến công mãnh liệt, giải phóng toàn bộ tỉnh giáp ranh Phước Long [25].\n- Quân đội Sài Gòn phản ứng yếu ớt, không thể tổ chức phản công tái chiếm [25].\n- Mỹ đứng ngoài cuộc, không có động thái can thiệp trở lại bằng quân sự [25].\nKết quả: Phước Long là tỉnh đầu tiên ở miền Nam được hoàn toàn giải phóng, bộc lộ sự bất lực của chính quyền Sài Gòn [25, 26].\nÝ nghĩa lịch sử: Là trận 'trinh sát chiến lược' khẳng định sự hạn chế của Mỹ, củng cố quyết tâm giải phóng miền Nam trong hai năm 1975-1976 [26].",
    "quote": "Là 'trận trinh sát chiến lược' quan trọng, củng cố quyết tâm... giải phóng hoàn toàn miền Nam.",
    "tag": "Kháng chiến chống Mỹ",
    "artist": "Tư liệu lịch sử",
    "year": "1974-1975"
  },
  {
    "img": "https://res.cloudinary.com/yukiimin-cloud/image/upload/v1784154861/taynguyen_motaix.jpg",
    "title": "Chiến dịch Tây Nguyên",
    "hoverText": "Chiến dịch Tây Nguyên mở màn cuộc Tổng tiến công",
    "desc": "Thời gian: 4/3/1975 – 24/3/1975 [26, 27].\nBối cảnh: Nhận định thời cơ chiến lược đã chín muồi sau trận Phước Long, ta chọn Tây Nguyên làm hướng tiến công chủ yếu để mở màn cuộc Tổng tiến công mùa Xuân 1975 [27].\nDiễn biến chính:\n- Bộ đội ta giăng bẫy nghi binh tại Kon Tum và Pleiku để thu hút sự chú ý của địch [27].\n- Ngày 10/3/1975, ta bất ngờ tập trung lực lượng lớn đánh thọc sâu vào Buôn Ma Thuột, làm chủ hoàn toàn trận địa [27].\n- Quân địch hoảng loạn tháo chạy khỏi Tây Nguyên theo Đường 7 và bị ta truy kích tiêu diệt phần lớn [27].\nKết quả: Giải phóng một vùng Tây Nguyên rộng lớn, đánh tan rã Quân khu 2 của địch [28].\nÝ nghĩa lịch sử: Mang ý nghĩa bước ngoặt, chuyển cuộc kháng chiến từ tiến công chiến lược sang Tổng tiến công chiến lược trên toàn miền Nam [28].",
    "quote": "Chiến thắng Tây Nguyên là trận đánh mở đầu mang ý nghĩa bước ngoặt.",
    "tag": "Kháng chiến chống Mỹ",
    "artist": "Tư liệu lịch sử",
    "year": "1975"
  },

  // ── (Entry 16 — KHÔNG TREO — Chiến dịch Hồ Chí Minh dự phòng) ──
  {
    "img": "https://res.cloudinary.com/yukiimin-cloud/image/upload/v1784154925/63fbfbf1d61564555e8aad0395a86ef83_57192_ncattl.jpg",
    "title": "Chiến dịch Hồ Chí Minh",
    "hoverText": "Xe tăng giải phóng tiến vào Dinh Độc Lập",
    "desc": "Thời gian: 26/4/1975 – 30/4/1975 [29].\nBối cảnh: Thừa thắng xông lên sau khi giải phóng Tây Nguyên, Huế, Đà Nẵng, Bộ Chính trị quyết định mở chiến dịch quyết chiến cuối cùng mang tên Hồ Chí Minh để giải phóng Sài Gòn [29].\nDiễn biến chính:\n- Từ nhiều hướng, 5 cánh quân giải phóng hình thành thế siết chặt vòng vây quanh Sài Gòn, đập tan tuyến phòng thủ vòng ngoài tại Xuân Lộc [30].\n- Sáng 30/4/1975, các cánh quân thọc sâu vào nội đô, đánh chiếm tất cả mục tiêu trọng yếu [30].\n- 11 giờ 30 phút, xe tăng húc đổ cổng Dinh Độc Lập, Tổng thống Dương Văn Minh đầu hàng không điều kiện [30].\nKết quả: Chính quyền Sài Gòn sụp đổ hoàn toàn, miền Nam giải phóng, giang sơn thu về một mối [30].\nÝ nghĩa lịch sử: Kết thúc oanh liệt 21 năm kháng chiến chống Mỹ cứu nước, mở ra kỷ nguyên độc lập, thống nhất và đi lên chủ nghĩa xã hội của cả dân tộc [31].",
    "quote": "Kết thúc 21 năm kháng chiến chống Mỹ, 30 năm chiến tranh giải phóng dân tộc; mở ra thời kỳ đất nước độc lập, thống nhất.",
    "tag": "Kháng chiến chống Mỹ",
    "artist": "Tư liệu lịch sử",
    "year": "1975"
  }
];

// ============================================================
// LAYOUT ĐÃ CẬP NHẬT — 16 tranh trên 4 tường, né vị trí gates
//   Front Wall  (z=-19.5) — 3 tranh (exit gate x≈8.2..11.8)
//   Left Wall   (x=-19.5) — 5 tranh (không gate)
//   Back Wall   (z=+19.5) — 3 tranh (entrance gate x≈-1.8..+1.8)
//   Right Wall  (x=+19.5) — 5 tranh (không gate)
// ============================================================

const FRONT_Z = -19.5;
const BACK_Z = 19.5;
const LEFT_X = -19.5;
const RIGHT_X = 19.5;
const PAINTING_Y = 2.5;

// Helper tạo object treo tường từ sourceData[i]
const wallMount = (i, position, rotationY, width, height) => {
  const d = sourceData[i];
  return {
    imgSrc: d.img,
    width,
    height,
    position,
    rotationY,
    info: {
      title: d.title,
      artist: d.artist,
      description: d.desc,
      year: d.year,
      hoverText: d.hoverText,
      quote: d.quote,
      tag: d.tag,
    },
  };
};

export const paintingData = [
  // ─── FRONT WALL (3 tranh, rotationY = 0, plane hướng -Z)
  // Gate nằm ở x ≈ 8.2–11.8 ⇒ z bị chiếm: ta né 2 bên
  wallMount(0, { x: -13, y: PAINTING_Y, z: FRONT_Z }, 0, 5, 3.5),
  wallMount(1, { x:  -3, y: PAINTING_Y, z: FRONT_Z }, 0, 5, 3.5),
  wallMount(2, { x:  16, y: PAINTING_Y, z: FRONT_Z }, 0, 5, 3.5),

  // ─── LEFT WALL (5 tranh, rotationY = +π/2, plane hướng +X)
  // Phân bố đều từ z=-16 đến z=+16
  wallMount(3, { x: LEFT_X, y: PAINTING_Y, z: -16 }, Math.PI / 2, 4.5, 3.2),
  wallMount(4, { x: LEFT_X, y: PAINTING_Y, z:  -8 }, Math.PI / 2, 4.5, 3.2),
  wallMount(5, { x: LEFT_X, y: PAINTING_Y, z:   0 }, Math.PI / 2, 4.5, 3.2),
  wallMount(6, { x: LEFT_X, y: PAINTING_Y, z:  +8 }, Math.PI / 2, 4.5, 3.2),
  wallMount(7, { x: LEFT_X, y: PAINTING_Y, z: +16 }, Math.PI / 2, 4.5, 3.2),

  // ─── BACK WALL (3 tranh, rotationY = π, plane hướng +Z)
  // Gate nằm chính giữa x ≈ -1.8…+1.8 ⇒ ta treo 2 bên + 1 bên phải
  wallMount(8,  { x: -15, y: PAINTING_Y, z: BACK_Z }, Math.PI, 5, 3.5),
  wallMount(9,  { x:  -7, y: PAINTING_Y, z: BACK_Z }, Math.PI, 5, 3.5),
  wallMount(10, { x:  14, y: PAINTING_Y, z: BACK_Z }, Math.PI, 5, 3.5),

  // ─── RIGHT WALL (5 tranh, rotationY = -π/2, plane hướng -X)
  wallMount(11, { x: RIGHT_X, y: PAINTING_Y, z: -16 }, -Math.PI / 2, 4.5, 3.2),
  wallMount(12, { x: RIGHT_X, y: PAINTING_Y, z:  -8 }, -Math.PI / 2, 4.5, 3.2),
  wallMount(13, { x: RIGHT_X, y: PAINTING_Y, z:   0 }, -Math.PI / 2, 4.5, 3.2),
  wallMount(14, { x: RIGHT_X, y: PAINTING_Y, z:  +8 }, -Math.PI / 2, 4.5, 3.2),
  wallMount(15, { x: RIGHT_X, y: PAINTING_Y, z: +16 }, -Math.PI / 2, 4.5, 3.2),
];
