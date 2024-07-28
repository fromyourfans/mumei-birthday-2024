import { writeFileSync, createWriteStream } from 'node:fs';
import { resolve, join } from 'node:path';
import 'dotenv/config';
import { google } from 'googleapis';
import axios from 'axios';
import Jimp from 'jimp';

const { GOOGLE_SHEET_ID, GOOGLE_API_KEY } = process.env;

const sheetsAPI = google.sheets({
  version: 'v4',
  auth: GOOGLE_API_KEY,
});

(async () => {
  const sheetResults = await sheetsAPI.spreadsheets.values.get({
    spreadsheetId: GOOGLE_SHEET_ID,
    range: 'Form responses 1!D2:K',
  });
  const sheetData = sheetResults.data.values;

  const messages = sheetData
    .filter(([, message]) => !!(message || '').trim())
    .map(([name, message]) => ({ name: name.trim(), message: message.trim() }));

  const download = sheetData
    .filter(([,,,,, confirm,, img]) => confirm === 'Yes' && img)
    .map(([,,,,,, name, img], i) => ({ name: name.trim(), img }))
    .map(async ({ name, img }, i) => {
      const file = `${i + 1}-${name.replace(/\W|_/g, '')}.jpg`;
      const thumb = `${i + 1}-${name.replace(/\W|_/g, '')}-thumb.jpg`;
      const ch = img.split(', ')[0];
      const id = ch.split('?id=')[1];
      const url = `https://drive.google.com/uc?export=view&id=${id}`;
      const jimg = await Jimp.read(url);
      await jimg.write(resolve(join('.', 'public', 'fanart', file)));
      await jimg.resize(300, Jimp.AUTO).write(resolve(join('.', 'public', 'fanart', thumb)));
      return { name, file, thumb };
    });

  const DEST_FILE = resolve(join('.', 'src', 'assets', 'messages.json'));
  writeFileSync(DEST_FILE, JSON.stringify({ messages }, null, 2), { encoding: 'utf8' })

  const artwork = await Promise.all(download);
  const ART_FILE = resolve(join('.', 'src', 'assets', 'artwork.json'));
  writeFileSync(ART_FILE, JSON.stringify({ artwork }, null, 2), { encoding: 'utf8' })
})();
