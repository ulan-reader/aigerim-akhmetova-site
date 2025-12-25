// import fs from "fs";
// import path from "path";
// import sharp from "sharp";

// const folder = process.cwd(); // текущая папка
// const TARGET_RATIO = 0.5; // уменьшить вес ~в 2 раза
// const QUALITY = 90; // контроль качества (для JPEG/WebP)

// async function optimizeImage(filePath) {
//   const ext = path.extname(filePath).toLowerCase();
//   const base = path.basename(filePath, ext);
//   const newFile = path.join(path.dirname(filePath), `${base}_optimized${ext}`);

//   const image = sharp(filePath);
//   const metadata = await image.metadata();

//   let output;
//   switch (ext) {
//     case ".jpg":
//     case ".jpeg":
//       output = image
//         .jpeg({
//           quality: QUALITY,
//           mozjpeg: true,
//           chromaSubsampling: "4:4:4"
//         });
//       break;

//     case ".png":
//       output = image.png({
//         compressionLevel: 9,
//         palette: true
//       });
//       break;

//     case ".webp":
//       output = image.webp({
//         quality: QUALITY,
//         lossless: false
//       });
//       break;

//     default:
//       console.log(`❌ Пропущен ${filePath} — неизвестный формат`);
//       return;
//   }

//   await output.toFile(newFile);

//   const origSize = fs.statSync(filePath).size;
//   const newSize = fs.statSync(newFile).size;

//   console.log(
//     `✅ ${base}${ext}: ${Math.round(origSize / 1024)}KB → ${Math.round(newSize / 1024)}KB`
//   );
// }

// (async () => {
//   const files = fs.readdirSync(folder).filter(f =>
//     [".jpg", ".jpeg", ".png", ".webp"].includes(path.extname(f).toLowerCase())
//   );

//   if (files.length === 0) {
//     console.log("Нет изображений в текущей папке.");
//     process.exit(0);
//   }

//   console.log(`Найдено ${files.length} изображений.\n`);

//   for (const file of files) {
//     try {
//       await optimizeImage(path.join(folder, file));
//     } catch (err) {
//       console.error(`Ошибка при обработке ${file}:`, err.message);
//     }
//   }

//   console.log("\nГотово ✅");
// })();


import fs from "fs";
import path from "path";
import sharp from "sharp";

const folder = process.cwd();
const MAX_WIDTH = 2000;
const WEBP_QUALITY = 75;

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const base = path.basename(filePath, ext);

  const newFile = path.join(
    path.dirname(filePath),
    `${base}_optimized.webp`
  );

  const image = sharp(filePath).withMetadata(false);
  const metadata = await image.metadata();

  if (metadata.width && metadata.width > MAX_WIDTH) {
    image.resize({ width: MAX_WIDTH });
  }

  await image
    .webp({
      quality: WEBP_QUALITY,
      effort: 6,
      smartSubsample: true
    })
    .toFile(newFile);

  const origSize = fs.statSync(filePath).size;
  const newSize = fs.statSync(newFile).size;

  console.log(
    `✅ ${base}${ext}: ${Math.round(origSize / 1024)}KB → ${Math.round(newSize / 1024)}KB`
  );
}

(async () => {
  const files = fs.readdirSync(folder).filter(f =>
    [".jpg", ".jpeg", ".png", ".webp"].includes(
      path.extname(f).toLowerCase()
    )
  );

  if (!files.length) {
    console.log("Нет изображений в текущей папке.");
    return;
  }

  console.log(`Найдено ${files.length} изображений.\n`);

  for (const file of files) {
    try {
      await optimizeImage(path.join(folder, file));
    } catch (err) {
      console.error(`Ошибка при обработке ${file}:`, err.message);
    }
  }

  console.log("\nГотово ✅");
})();
