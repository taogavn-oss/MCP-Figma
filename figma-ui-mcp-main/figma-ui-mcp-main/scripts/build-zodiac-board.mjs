import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = path.resolve(__dirname, "../assets/zodiac");

const ZODIAC_DATA = [
  {
    order: "01",
    chi: "Tý",
    animal: "Bé Chuột",
    trait: "Nhút nhát & Lanh lợi",
    pose: "Ngồi ôm đuôi nghiêng đầu",
    colors: ["#F9F4EB", "#F2D8C9", "#E8AA93", "#4A3B32"],
    imageFile: "01_ty_chuot.jpg",
  },
  {
    order: "02",
    chi: "Sửu",
    animal: "Bé Trâu",
    trait: "Thư thái & Hiền lành",
    pose: "Nằm nghỉ thảnh thơi",
    colors: ["#F5F3F0", "#D8D6D2", "#D29062", "#3E3B3A"],
    imageFile: "02_suu_trau.jpg",
  },
  {
    order: "03",
    chi: "Dần",
    animal: "Bé Hổ",
    trait: "Tò mò & Tinh nghịch",
    pose: "Ngồi ôm đuôi sọc",
    colors: ["#FCE6C9", "#EBA059", "#784B28", "#332219"],
    imageFile: "03_dan_ho.jpg",
  },
  {
    order: "04",
    chi: "Mão",
    animal: "Bé Mèo",
    trait: "Thân thiện & Ngọt ngào",
    pose: "Ngồi giơ tay vẫy chào",
    colors: ["#FFFDF8", "#F4C497", "#E68966", "#3B2D26"],
    imageFile: "04_mao_meo.jpg",
  },
  {
    order: "05",
    chi: "Thìn",
    animal: "Bé Rồng",
    trait: "Hào sảng & Tinh nghịch",
    pose: "Đứng dang tay tươi cười",
    colors: ["#D4EFE5", "#A8DDCB", "#FFE6A3", "#2C4037"],
    imageFile: "05_thin_rong.jpg",
  },
  {
    order: "06",
    chi: "Tỵ",
    animal: "Bé Rắn",
    trait: "Nhút nhát & Đáng yêu",
    pose: "Cuộn tròn ấm áp",
    colors: ["#D6E6D8", "#A3C4A8", "#FFF2B2", "#2B3C2D"],
    imageFile: "06_ty_ran.jpg",
  },
  {
    order: "07",
    chi: "Ngọ",
    animal: "Bé Ngựa",
    trait: "Năng động & Vui tươi",
    pose: "Nhón chân vẫy bờm",
    colors: ["#FAEDE1", "#E6BA8E", "#C78752", "#473021"],
    imageFile: "07_ngo_ngua.jpg",
  },
  {
    order: "08",
    chi: "Mùi",
    animal: "Bé Dê",
    trait: "Thư thái & Ngoan ngoãn",
    pose: "Ngồi ôm cành cỏ may",
    colors: ["#FAF8F5", "#EDE4D6", "#99C886", "#3F3731"],
    imageFile: "08_mui_de.jpg",
  },
  {
    order: "09",
    chi: "Thân",
    animal: "Bé Khỉ",
    trait: "Tò mò & Hiếu động",
    pose: "Ngồi xổm giữ đuôi",
    colors: ["#F9EDE4", "#D8996B", "#AB6B40", "#3E291C"],
    imageFile: "09_than_khi.jpg",
  },
  {
    order: "10",
    chi: "Dậu",
    animal: "Bé Gà",
    trait: "Tinh nghịch & Lí lắc",
    pose: "Đứng vỗ cánh nhỏ",
    colors: ["#FFF9E6", "#FFE180", "#F28C68", "#453823"],
    imageFile: "10_dau_ga.jpg",
  },
  {
    order: "11",
    chi: "Tuất",
    animal: "Bé Cún",
    trait: "Trung thành & Hoạt bát",
    pose: "Ngồi lắc đuôi cười",
    colors: ["#FFFDF7", "#ECC387", "#D48B54", "#3D2E24"],
    imageFile: "11_tuat_cho.jpg",
  },
  {
    order: "12",
    chi: "Hợi",
    animal: "Bé Heo",
    trait: "Thư thái & Tròn trĩnh",
    pose: "Ngồi xoa bụng tròn",
    colors: ["#FFF0EC", "#FDC7BB", "#F58F84", "#482D26"],
    imageFile: "12_hoi_heo.jpg",
  },
];

async function callBridge(operation, params = {}) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ operation, params });
    const req = http.request(
      "http://localhost:38451/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(postData),
        },
      },
      (res) => {
        let raw = "";
        res.on("data", (chunk) => (raw += chunk));
        res.on("end", () => {
          try {
            const parsed = JSON.parse(raw);
            if (parsed.success) resolve(parsed.data);
            else reject(new Error(parsed.error || "Bridge call failed"));
          } catch (e) {
            reject(new Error("Invalid response from bridge: " + raw));
          }
        });
      }
    );
    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

export async function run() {
  console.log("Checking bridge connection...");
  const statusRes = await new Promise((resolve, reject) => {
    http.get("http://localhost:38451/", (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve(JSON.parse(data)));
    }).on("error", reject);
  });

  if (!statusRes.pluginConnected) {
    console.error("Plugin not connected! In Figma Desktop: Plugins → Development → Figma UI MCP Bridge → Run");
    return;
  }

  console.log("Creating Zodiac Collection Board in Figma...");

  // 1. Create Root Frame
  const root = await callBridge("create", {
    type: "FRAME",
    name: "12 Con Giáp · Vietnamese Zodiac Chibi",
    width: 1540,
    layoutMode: "VERTICAL",
    primaryAxisAlignItems: "MIN",
    counterAxisAlignItems: "CENTER",
    paddingTop: 64,
    paddingBottom: 64,
    paddingLeft: 64,
    paddingRight: 64,
    itemSpacing: 48,
    fill: "#FAF7F2",
    cornerRadius: 32,
  });

  console.log("Root frame created:", root.id);

  // 2. Header Container
  const header = await callBridge("create", {
    type: "FRAME",
    parentId: root.id,
    name: "Header",
    layoutAlign: "STRETCH",
    layoutMode: "VERTICAL",
    primaryAxisAlignItems: "CENTER",
    counterAxisAlignItems: "CENTER",
    itemSpacing: 16,
  });

  // Badge pill
  const badge = await callBridge("create", {
    type: "FRAME",
    parentId: header.id,
    name: "Badge",
    layoutMode: "HORIZONTAL",
    primaryAxisAlignItems: "CENTER",
    counterAxisAlignItems: "CENTER",
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 16,
    paddingRight: 16,
    cornerRadius: 20,
    fill: "#FFF0E6",
    stroke: "#FFD9C7",
    strokeWeight: 1,
  });
  await callBridge("create", {
    type: "TEXT",
    parentId: badge.id,
    content: "VIETNAMESE ZODIAC · CHIBI ART COLLECTION",
    fontSize: 12,
    fontWeight: "Bold",
    fill: "#D95C2B",
  });

  // Title
  await callBridge("create", {
    type: "TEXT",
    parentId: header.id,
    content: "Bộ Sưu Tập Linh Vật 12 Con Giáp",
    fontSize: 40,
    fontWeight: "Bold",
    fill: "#2C231E",
    textAlign: "CENTER",
  });

  // Subtitle
  await callBridge("create", {
    type: "TEXT",
    parentId: header.id,
    content: "Phong cách minh họa Chibi 2D ấm áp, đường nét tròn trịa mềm mại, đôi mắt lấp lánh và bảng màu pastel hài hòa",
    fontSize: 16,
    fill: "#7A6F68",
    textAlign: "CENTER",
    width: 800,
  });

  // 3. Grid Rows (3 rows of 4 cards)
  for (let r = 0; r < 3; r++) {
    const row = await callBridge("create", {
      type: "FRAME",
      parentId: root.id,
      name: `Row ${r + 1}`,
      layoutAlign: "STRETCH",
      layoutMode: "HORIZONTAL",
      primaryAxisAlignItems: "SPACE_BETWEEN",
      counterAxisAlignItems: "MIN",
      itemSpacing: 24,
    });

    for (let c = 0; c < 4; c++) {
      const idx = r * 4 + c;
      const item = ZODIAC_DATA[idx];

      // Card Frame
      const card = await callBridge("create", {
        type: "FRAME",
        parentId: row.id,
        name: `Card · ${item.chi} (${item.animal})`,
        width: 330,
        layoutMode: "VERTICAL",
        primaryAxisAlignItems: "MIN",
        counterAxisAlignItems: "MIN",
        paddingTop: 16,
        paddingBottom: 20,
        paddingLeft: 16,
        paddingRight: 16,
        itemSpacing: 14,
        fill: "#FFFFFF",
        cornerRadius: 24,
        stroke: "#EFE8DC",
        strokeWeight: 1,
      });

      // Image Container
      const imgContainer = await callBridge("create", {
        type: "FRAME",
        parentId: card.id,
        name: "Image Container",
        width: 298,
        height: 298,
        cornerRadius: 18,
        fill: "#FFFDF9",
        clipContent: true,
      });

      // Load Image
      const imgPath = path.join(ASSETS_DIR, item.imageFile);
      if (fs.existsSync(imgPath)) {
        const b64 = fs.readFileSync(imgPath).toString("base64");
        await callBridge("create", {
          type: "IMAGE",
          parentId: imgContainer.id,
          name: item.animal,
          width: 298,
          height: 298,
          cornerRadius: 18,
          imageData: b64,
          scaleMode: "FILL",
        });
      }

      // Title & Chi row
      const titleRow = await callBridge("create", {
        type: "FRAME",
        parentId: card.id,
        layoutAlign: "STRETCH",
        layoutMode: "HORIZONTAL",
        primaryAxisAlignItems: "SPACE_BETWEEN",
        counterAxisAlignItems: "CENTER",
      });

      // Chi badge
      const chiBadge = await callBridge("create", {
        type: "FRAME",
        parentId: titleRow.id,
        layoutMode: "HORIZONTAL",
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 10,
        paddingRight: 10,
        cornerRadius: 8,
        fill: "#F6F1EA",
      });
      await callBridge("create", {
        type: "TEXT",
        parentId: chiBadge.id,
        content: `${item.chi} · ${item.order}`,
        fontSize: 12,
        fontWeight: "Bold",
        fill: "#7E6551",
      });

      // Animal Name
      await callBridge("create", {
        type: "TEXT",
        parentId: titleRow.id,
        content: item.animal,
        fontSize: 18,
        fontWeight: "Bold",
        fill: "#2C231E",
      });

      // Trait Pill
      const traitPill = await callBridge("create", {
        type: "FRAME",
        parentId: card.id,
        layoutAlign: "STRETCH",
        layoutMode: "HORIZONTAL",
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        cornerRadius: 8,
        fill: "#FAF6F0",
        counterAxisAlignItems: "CENTER",
        itemSpacing: 6,
      });
      await callBridge("create", {
        type: "TEXT",
        parentId: traitPill.id,
        content: `✨ Tính cách: ${item.trait}`,
        fontSize: 12,
        fill: "#6E625A",
      });

      // Pose Pill
      const posePill = await callBridge("create", {
        type: "FRAME",
        parentId: card.id,
        layoutAlign: "STRETCH",
        layoutMode: "HORIZONTAL",
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        cornerRadius: 8,
        fill: "#FAF6F0",
        counterAxisAlignItems: "CENTER",
        itemSpacing: 6,
      });
      await callBridge("create", {
        type: "TEXT",
        parentId: posePill.id,
        content: `🐾 Tư thế: ${item.pose}`,
        fontSize: 12,
        fill: "#6E625A",
      });

      // Color Palette row
      const paletteRow = await callBridge("create", {
        type: "FRAME",
        parentId: card.id,
        layoutAlign: "STRETCH",
        layoutMode: "HORIZONTAL",
        primaryAxisAlignItems: "SPACE_BETWEEN",
        counterAxisAlignItems: "CENTER",
        paddingTop: 4,
      });
      await callBridge("create", {
        type: "TEXT",
        parentId: paletteRow.id,
        content: "Bảng màu",
        fontSize: 11,
        fill: "#A39992",
      });

      const swatchesRow = await callBridge("create", {
        type: "FRAME",
        parentId: paletteRow.id,
        layoutMode: "HORIZONTAL",
        itemSpacing: 6,
      });
      for (const color of item.colors) {
        await callBridge("create", {
          type: "RECTANGLE",
          parentId: swatchesRow.id,
          width: 14,
          height: 14,
          cornerRadius: 7,
          fill: color,
          stroke: "#E0D8CE",
          strokeWeight: 1,
        });
      }

      console.log(`Card ${item.order} (${item.animal}) created`);
    }
  }

  console.log("All 12 Zodiac Cards successfully implemented into Figma!");
}

if (process.argv[1] && process.argv[1].endsWith("build-zodiac-board.mjs")) {
  run().catch(console.error);
}
