import https from 'https';
import fs from 'fs';

const fileId = '1xvCoYLbquCQ178beYInuauYGI6r6Btu1';
const url = `https://drive.google.com/uc?export=download&id=${fileId}`;

function download(url, dest) {
  https.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      console.log('Redirecting to:', res.headers.location);
      download(res.headers.location, dest);
    } else {
      console.log('Status Code:', res.statusCode);
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        const stats = fs.statSync(dest);
        console.log(`Download completed. File size: ${stats.size} bytes`);
      });
    }
  }).on('error', (err) => {
    fs.unlink(dest, () => {});
    console.error('Error: ', err.message);
  });
}

download(url, 'public/dr-shivrani.jpg');