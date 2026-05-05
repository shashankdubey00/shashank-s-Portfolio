# Google Apps Script Contact Webhook

This script receives contact form submissions, stores them in Google Sheets, and forwards them to Telegram.

## 1. Create Spreadsheet

1. Create a new Google Sheet.
2. Copy the Sheet ID from URL:
   - `https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit`

## 2. Create Apps Script Project

1. Go to [https://script.google.com](https://script.google.com).
2. Create new project.
3. Replace default code with [`Code.gs`](./Code.gs).

## 3. Configure Script Properties

In Apps Script:

1. `Project Settings` -> `Script properties` -> `Add script property`
2. Add:
   - `SHEET_ID` = your sheet id
   - `TELEGRAM_BOT_TOKEN` = your bot token
   - `TELEGRAM_CHAT_ID` = your chat id

## 4. Deploy Web App

1. `Deploy` -> `New deployment`
2. Type: `Web app`
3. Execute as: `Me`
4. Who has access: `Anyone`
5. Deploy and copy Web App URL (`.../exec`)

## 5. Configure Frontend Env

In your frontend environment variables:

- `VITE_CONTACT_WEBHOOK_URL` = your Apps Script `.../exec` URL

For local:

1. Copy `client/.env.example` -> `client/.env`
2. Set `VITE_CONTACT_WEBHOOK_URL`

## 6. Test

1. Submit contact form on portfolio.
2. Verify:
   - New row in Sheet (`Leads` tab)
   - Telegram message received

## Security Notes

- Rotate bot token immediately if it was ever exposed in screenshot/chat.
- Keep script properties private.
- If spam appears, add rate limiting or captcha later.
