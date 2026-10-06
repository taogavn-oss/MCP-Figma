import http from "node:http";

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
            reject(new Error("Invalid response: " + raw));
          }
        });
      }
    );
    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

// Common SVG template parts
const bgAndShadow = `
  <path d="M194 0H28C12.536 0 0 12.536 0 28V204C0 219.464 12.536 232 28 232H194C209.464 232 222 219.464 222 204V28C222 12.536 209.464 0 194 0Z" fill="#FDE5EE"/>
  <path d="M112 218C149.555 218 180 212.18 180 205C180 197.82 149.555 192 112 192C74.4446 192 44 197.82 44 205C44 212.18 74.4446 218 112 218Z" fill="#F3CEDB"/>
  <!-- Body/Collar -->
  <path d="M112 198C144.585 198 171 178.748 171 155C171 131.252 144.585 112 112 112C79.4152 112 53 131.252 53 155C53 178.748 79.4152 198 112 198Z" fill="#FFF8F1" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Tick marks & feet -->
  <path d="M71 153L52 143M153 153L172 143M76 184V203M101 190V203M123 190V203M148 184V203" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M77 164C68 167 63 172 59 179M147 164C156 167 161 172 165 179" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
`;

const commonHeadAndFace = `
  <!-- Head -->
  <path d="M112 162C137.957 162 159 140.957 159 115C159 89.0426 137.957 68 112 68C86.0426 68 65 89.0426 65 115C65 140.957 86.0426 162 112 162Z" fill="#FFF8F1" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Dot Eyes -->
  <circle cx="95" cy="112" r="5" fill="#17151B"/>
  <circle cx="129" cy="112" r="5" fill="#17151B"/>
  <!-- Muzzle -->
  <path d="M112 145C124.15 145 134 138.284 134 130C134 121.716 124.15 115 112 115C99.8497 115 90 121.716 90 130C90 138.284 99.8497 145 112 145Z" fill="#EFA9BE" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Smile -->
  <path d="M104 132C109 137 115 137 120 132" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
`;

export const ZODIAC_MASCOTS = [
  {
    chi: "子",
    name: "01_子_ネズミ (Chuột)",
    svg: `<svg width="222" height="232" viewBox="0 0 222 232" fill="none" xmlns="http://www.w3.org/2000/svg">
      ${bgAndShadow}
      <!-- Mouse Ears Outer -->
      <path d="M72 85 C50 85 40 55 58 42 C75 30 90 55 86 75" fill="#FFF8F1" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M152 85 C174 85 184 55 166 42 C149 30 134 55 138 75" fill="#FFF8F1" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Mouse Ears Inner -->
      <path d="M68 76 C56 76 50 58 60 50 C70 42 78 58 76 70" fill="#EFA9BE" stroke="#17151B" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M156 76 C168 76 174 58 164 50 C154 42 146 58 148 70" fill="#EFA9BE" stroke="#17151B" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      ${commonHeadAndFace}
      <!-- Mouse Whiskers -->
      <path d="M68 128 L50 124 M68 135 L52 136 M156 128 L174 124 M156 135 L172 136" stroke="#17151B" stroke-width="6" stroke-linecap="round"/>
      <!-- Long Cute Tail -->
      <path d="M168 175 C190 175 198 150 188 135 C178 120 162 130 166 148" stroke="#17151B" stroke-width="7" stroke-linecap="round"/>
    </svg>`
  },
  {
    chi: "丑",
    name: "02_丑_ウシ (Trâu)",
    svg: `<svg width="222" height="232" viewBox="0 0 222 232" fill="none" xmlns="http://www.w3.org/2000/svg">
      ${bgAndShadow}
      <!-- Ox Horns -->
      <path d="M78 78 C60 62 50 40 64 28 C74 40 82 58 88 74" fill="#E2DDD5" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M146 78 C164 62 174 40 160 28 C150 40 142 58 136 74" fill="#E2DDD5" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Ox Floppy Ears -->
      <path d="M65 92 L42 98 L56 112 Z" fill="#FFF8F1" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M159 92 L182 98 L168 112 Z" fill="#FFF8F1" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      ${commonHeadAndFace}
      <!-- Ox Forehead Hair Tuft -->
      <path d="M102 70 C106 62 118 62 122 70" stroke="#17151B" stroke-width="7" stroke-linecap="round"/>
    </svg>`
  },
  {
    chi: "寅",
    name: "03_寅_トラ (Hổ)",
    svg: `<svg width="222" height="232" viewBox="0 0 222 232" fill="none" xmlns="http://www.w3.org/2000/svg">
      ${bgAndShadow}
      <!-- Tiger Round Ears -->
      <path d="M78 82 C65 72 65 50 78 44 C92 40 98 62 94 76" fill="#FFF8F1" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M146 82 C159 72 159 50 146 44 C132 40 126 62 130 76" fill="#FFF8F1" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M80 70 C72 64 74 54 82 52" stroke="#17151B" stroke-width="6" stroke-linecap="round"/>
      <path d="M144 70 C152 64 150 54 142 52" stroke="#17151B" stroke-width="6" stroke-linecap="round"/>
      ${commonHeadAndFace}
      <!-- Tiger Forehead Stripes (King character) -->
      <path d="M112 76 V92 M98 82 L112 90 L126 82" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Cheek Stripes -->
      <path d="M68 115 L54 114 M69 125 L56 127 M156 115 L170 114 M155 125 L168 127" stroke="#17151B" stroke-width="6" stroke-linecap="round"/>
      <!-- Striped Tail -->
      <path d="M165 170 C185 168 194 148 185 132 C178 122 165 130 166 145" stroke="#17151B" stroke-width="7" stroke-linecap="round"/>
      <path d="M176 156 L186 153 M180 142 L188 136" stroke="#17151B" stroke-width="6" stroke-linecap="round"/>
    </svg>`
  },
  {
    chi: "卯",
    name: "04_卯_ウサギ (Thỏ - Mẫu Gốc 40)",
    svg: `<svg width="222" height="232" viewBox="0 0 222 232" fill="none" xmlns="http://www.w3.org/2000/svg">
      ${bgAndShadow}
      <path d="M82 96L72 30L101 72M142 96L152 30L123 72" fill="#FFF8F1" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M83 78L78 47L94 73M141 78L146 47L130 73" fill="#EFA9BE" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      ${commonHeadAndFace}
    </svg>`
  },
  {
    chi: "辰",
    name: "05_辰_タツ (Rồng)",
    svg: `<svg width="222" height="232" viewBox="0 0 222 232" fill="none" xmlns="http://www.w3.org/2000/svg">
      ${bgAndShadow}
      <!-- Dragon Antlers / Horns -->
      <path d="M82 76 L70 42 L80 48 L76 28 L92 56" fill="#FFF8F1" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M142 76 L154 42 L144 48 L148 28 L132 56" fill="#FFF8F1" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      ${commonHeadAndFace}
      <!-- Dragon Whiskers -->
      <path d="M72 135 C52 142 42 138 36 150 M152 135 C172 142 182 138 188 150" stroke="#17151B" stroke-width="6" stroke-linecap="round"/>
      <!-- Dragon Tail with tuft -->
      <path d="M165 175 C190 175 198 145 186 130" stroke="#17151B" stroke-width="7" stroke-linecap="round"/>
      <path d="M186 130 L195 120 L188 116 L196 112" stroke="#17151B" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  {
    chi: "巳",
    name: "06_巳_ヘビ (Rắn)",
    svg: `<svg width="222" height="232" viewBox="0 0 222 232" fill="none" xmlns="http://www.w3.org/2000/svg">
      ${bgAndShadow}
      <!-- Snake Tail curled around -->
      <path d="M60 170 C40 150 40 120 60 105 C75 95 90 115 80 130" stroke="#17151B" stroke-width="7" stroke-linecap="round"/>
      <path d="M165 170 C185 150 185 120 165 105" stroke="#17151B" stroke-width="7" stroke-linecap="round"/>
      ${commonHeadAndFace}
      <!-- Cute Forked Tongue -->
      <path d="M112 145 V154 L107 160 M112 154 L117 160" stroke="#EFA9BE" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  {
    chi: "午",
    name: "07_午_ウマ (Ngựa)",
    svg: `<svg width="222" height="232" viewBox="0 0 222 232" fill="none" xmlns="http://www.w3.org/2000/svg">
      ${bgAndShadow}
      <!-- Horse Pointy Ears -->
      <path d="M78 82 L70 42 L92 68" fill="#FFF8F1" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M146 82 L154 42 L132 68" fill="#FFF8F1" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Horse Mane -->
      <path d="M104 68 L106 38 L112 48 L118 38 L120 68" fill="#FFF8F1" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      ${commonHeadAndFace}
      <!-- Horse Flowing Tail -->
      <path d="M165 172 C185 168 196 145 190 128 C182 145 175 160 166 168" fill="#FFF8F1" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  {
    chi: "未",
    name: "08_未_ヒツジ (Dê/Cừu)",
    svg: `<svg width="222" height="232" viewBox="0 0 222 232" fill="none" xmlns="http://www.w3.org/2000/svg">
      ${bgAndShadow}
      <!-- Sheep Curved Horns -->
      <path d="M76 75 C60 60 50 40 68 40 C78 50 82 62 86 74" fill="#FFF8F1" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M148 75 C164 60 174 40 156 40 C146 50 142 62 138 74" fill="#FFF8F1" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Sheep Fluffy Forehead Curls -->
      <path d="M96 68 C98 56 112 54 114 66 C116 54 130 56 130 68" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      ${commonHeadAndFace}
    </svg>`
  },
  {
    chi: "申",
    name: "09_申_サル (Khỉ)",
    svg: `<svg width="222" height="232" viewBox="0 0 222 232" fill="none" xmlns="http://www.w3.org/2000/svg">
      ${bgAndShadow}
      <!-- Monkey Big Side Ears -->
      <path d="M66 100 C45 95 42 125 65 125" fill="#FFF8F1" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M158 100 C179 95 182 125 159 125" fill="#FFF8F1" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M60 106 C50 106 50 118 60 118" stroke="#EFA9BE" stroke-width="6" stroke-linecap="round"/>
      <path d="M164 106 C174 106 174 118 164 118" stroke="#EFA9BE" stroke-width="6" stroke-linecap="round"/>
      ${commonHeadAndFace}
      <!-- Monkey Spiral Tail -->
      <path d="M165 170 C190 170 198 140 180 130 C165 122 170 142 185 142" stroke="#17151B" stroke-width="7" stroke-linecap="round"/>
    </svg>`
  },
  {
    chi: "酉",
    name: "10_酉_トリ (Gà)",
    svg: `<svg width="222" height="232" viewBox="0 0 222 232" fill="none" xmlns="http://www.w3.org/2000/svg">
      ${bgAndShadow}
      <!-- Rooster Comb on Head -->
      <path d="M96 68 C96 46 106 46 108 58 C112 40 120 40 122 56 C126 48 132 48 128 68" fill="#EFA9BE" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      ${commonHeadAndFace}
      <!-- Triangle Beak Overlay -->
      <path d="M106 122 L112 114 L118 122 Z" fill="#FFC043" stroke="#17151B" stroke-width="6" stroke-linejoin="round"/>
      <!-- Tiny Wings -->
      <path d="M60 142 C50 150 50 162 64 165 M164 142 C174 150 174 162 160 165" stroke="#17151B" stroke-width="7" stroke-linecap="round"/>
    </svg>`
  },
  {
    chi: "戌",
    name: "11_戌_イヌ (Chó)",
    svg: `<svg width="222" height="232" viewBox="0 0 222 232" fill="none" xmlns="http://www.w3.org/2000/svg">
      ${bgAndShadow}
      <!-- Puppy Floppy Droopy Ears -->
      <path d="M72 78 C52 78 44 110 52 135 C62 140 70 125 74 100" fill="#FFF8F1" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M152 78 C172 78 180 110 172 135 C162 140 154 125 150 100" fill="#FFF8F1" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      ${commonHeadAndFace}
      <!-- Wagging Tail -->
      <path d="M165 175 C185 170 195 150 188 135 C185 145 175 160 165 168" fill="#FFF8F1" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  {
    chi: "亥",
    name: "12_亥_イノシシ (Heo/Lợn)",
    svg: `<svg width="222" height="232" viewBox="0 0 222 232" fill="none" xmlns="http://www.w3.org/2000/svg">
      ${bgAndShadow}
      <!-- Pig Triangular Ears -->
      <path d="M78 82 L60 52 L84 66" fill="#FFF8F1" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M146 82 L164 52 L140 66" fill="#FFF8F1" stroke="#17151B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      ${commonHeadAndFace}
      <!-- Pig Snout 2 Dots -->
      <circle cx="106" cy="130" r="3" fill="#17151B"/>
      <circle cx="118" cy="130" r="3" fill="#17151B"/>
      <!-- Curly Tail -->
      <path d="M166 175 C180 175 186 160 178 152 C172 146 176 158 184 156" stroke="#17151B" stroke-width="7" stroke-linecap="round"/>
    </svg>`
  }
];

export async function run() {
  console.log("Creating 12 Zodiac Vector Mascots directly in Figma...");

  // 1. Create a Master Showcase Frame
  const container = await callBridge("create", {
    type: "FRAME",
    name: "12 Con Giáp · Mascot Vector System (Chuẩn Mẫu 40_ウサギ)",
    width: 1480,
    layoutMode: "VERTICAL",
    primaryAxisAlignItems: "MIN",
    counterAxisAlignItems: "CENTER",
    paddingTop: 56,
    paddingBottom: 56,
    paddingLeft: 56,
    paddingRight: 56,
    itemSpacing: 36,
    fill: "#FAF7F2",
    cornerRadius: 32,
    x: 8500,
    y: 20340
  });

  console.log("Container created:", container.id);

  // Header Title
  await callBridge("create", {
    type: "TEXT",
    parentId: container.id,
    content: "12 CON GIÁP · NATIVE VECTOR MASCOT COLLECTION",
    fontSize: 28,
    fontWeight: "Bold",
    fill: "#17151B",
  });

  await callBridge("create", {
    type: "TEXT",
    parentId: container.id,
    content: "Đồng bộ 100% phong cách nét viền đen dày (7px), mắt chấm tròn tối giản, mõm hồng và nền pastel từ mẫu gốc 40_卯_ウサギ",
    fontSize: 15,
    fill: "#7A6F68",
  });

  // 3 Rows of 4 Cards
  for (let r = 0; r < 3; r++) {
    const row = await callBridge("create", {
      type: "FRAME",
      parentId: container.id,
      name: `Row ${r + 1}`,
      layoutMode: "HORIZONTAL",
      primaryAxisAlignItems: "CENTER",
      counterAxisAlignItems: "CENTER",
      itemSpacing: 32,
    });

    for (let c = 0; c < 4; c++) {
      const idx = r * 4 + c;
      const m = ZODIAC_MASCOTS[idx];

      // Card Frame
      const card = await callBridge("create", {
        type: "FRAME",
        parentId: row.id,
        name: `Card_${m.chi}`,
        layoutMode: "VERTICAL",
        primaryAxisAlignItems: "CENTER",
        counterAxisAlignItems: "CENTER",
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,
        itemSpacing: 12,
        fill: "#FFFFFF",
        cornerRadius: 24,
        stroke: "#EFE8DC",
        strokeWeight: 1,
      });

      // Create SVG node
      const svgNode = await callBridge("create", {
        type: "SVG",
        parentId: card.id,
        name: `Mascot_${m.chi}`,
        svg: m.svg,
        width: 222,
        height: 232,
      });

      // Name Label
      await callBridge("create", {
        type: "TEXT",
        parentId: card.id,
        content: m.name,
        fontSize: 14,
        fontWeight: "Bold",
        fill: "#17151B",
      });

      console.log(`Created mascot ${m.name}`);
    }
  }

  // Adjust container height to AUTO
  await callBridge("modify", {
    id: container.id,
    primaryAxisSizingMode: "AUTO"
  });

  console.log("All 12 Vector Mascots created successfully in Figma!");
  return container.id;
}

if (process.argv[1] && process.argv[1].endsWith("generate-12-vector-mascots.mjs")) {
  run().then(id => console.log("Final ID:", id)).catch(console.error);
}
