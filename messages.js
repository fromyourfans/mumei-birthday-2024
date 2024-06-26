import { writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import 'dotenv/config';
import { google } from 'googleapis';

const { GOOGLE_SHEET_ID, GOOGLE_API_KEY } = process.env;

const sheetsAPI = google.sheets({
  version: 'v4',
  auth: GOOGLE_API_KEY,
});

(async () => {
  const sheetResults = await sheetsAPI.spreadsheets.values.get({
    spreadsheetId: GOOGLE_SHEET_ID,
    range: 'Form responses 1!D2:E',
  });
  const sheetData = sheetResults.data.values;

  const messages = sheetData
    .filter(([, message]) => !!message.trim())
    .map(([name, message]) => ({ name: name.trim(), message: message.trim() }));

  const DEST_FILE = resolve(join('.', 'src', 'assets', 'messages.json'));
  writeFileSync(DEST_FILE, JSON.stringify({ messages }, null, 2), { encoding: 'utf8' })
})();
