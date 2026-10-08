import sharp from "sharp";
import { readFileSync } from "fs";

const cartouche = readFileSync("public/media/logo/cartouche-lisboa.jpg");
const cartouchePng = await sharp(cartouche).resize(280, 242, { fit: "inside" }).png().toBuffer();
const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#FBFAF6"/>
  <text x="600" y="470" text-anchor="middle" font-family="Georgia, serif" font-size="54" fill="#20455e" letter-spacing="2">QUINTA DO TORNEIRO</text>
  <rect x="520" y="494" width="160" height="1" fill="#A78633"/>
  <text x="600" y="540" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="#5F6B73" letter-spacing="3">EVENTOS E CASAMENTOS</text>
</svg>`;
const base = await sharp(Buffer.from(svg)).png().toBuffer();
await sharp(base)
  .composite([{ input: cartouchePng, top: 90, left: 460 }])
  .png()
  .toFile("public/og.png");
console.log("og.png");
