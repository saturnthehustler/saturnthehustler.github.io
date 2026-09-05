import { readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const svg = readFileSync('app/icon.svg');
const png = await sharp(svg, { density: 512 }).resize(180, 180).png().toBuffer();
writeFileSync('app/apple-icon.png', png);
console.log('app/apple-icon.png written — 180x180');
