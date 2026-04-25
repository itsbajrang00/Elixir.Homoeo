import fs from 'fs';

async function download() {
  try {
    const res = await fetch('https://drive.usercontent.google.com/download?id=1xvCoYLbquCQ178beYInuauYGI6r6Btu1&export=download');
    const buffer = await res.arrayBuffer();
    fs.writeFileSync('src/assets/dr-shivrani.jpg', Buffer.from(buffer));
    console.log('Downloaded successfully. Bytes:', buffer.byteLength);
  } catch (err) {
    console.error('Error:', err);
  }
}

download();