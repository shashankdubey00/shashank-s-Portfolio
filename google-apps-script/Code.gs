/**
 * Portfolio contact webhook for Google Apps Script.
 *
 * Required Script Properties:
 * - SHEET_ID
 * - TELEGRAM_BOT_TOKEN
 * - TELEGRAM_CHAT_ID
 */

function doPost(e) {
  var now = new Date();

  try {
    var body = (e && e.postData && e.postData.contents) ? e.postData.contents : "{}";
    var payload = JSON.parse(body);

    var name = clean(payload.name);
    var email = clean(payload.email);
    var message = clean(payload.message);
    var source = clean(payload.source || "portfolio-control-room");
    var submittedAt = clean(payload.submittedAt || now.toISOString());

    if (!name || !email || !message) {
      return outputJson({
        ok: false,
        error: "Missing required fields: name, email, message"
      });
    }

    appendToSheet({
      timestamp: now.toISOString(),
      submittedAt: submittedAt,
      name: name,
      email: email,
      message: message,
      source: source
    });

    notifyTelegram({
      name: name,
      email: email,
      message: message,
      source: source,
      submittedAt: submittedAt
    });

    return outputJson({ ok: true });
  } catch (error) {
    // Keep webhook resilient: log detailed error and return generic response.
    console.error("[portfolio-webhook] " + error);
    return outputJson({
      ok: false,
      error: "Server error while processing contact submission"
    });
  }
}

function appendToSheet(data) {
  var scriptProps = PropertiesService.getScriptProperties();
  var sheetId = scriptProps.getProperty("SHEET_ID");

  if (!sheetId) {
    throw new Error("Missing SHEET_ID in Script Properties");
  }

  var ss = SpreadsheetApp.openById(sheetId);
  var sheet = ss.getSheetByName("Leads") || ss.insertSheet("Leads");

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "timestamp",
      "submittedAt",
      "name",
      "email",
      "message",
      "source"
    ]);
  }

  sheet.appendRow([
    data.timestamp,
    data.submittedAt,
    data.name,
    data.email,
    data.message,
    data.source
  ]);
}

function notifyTelegram(data) {
  var scriptProps = PropertiesService.getScriptProperties();
  var token = scriptProps.getProperty("TELEGRAM_BOT_TOKEN");
  var chatId = scriptProps.getProperty("TELEGRAM_CHAT_ID");

  if (!token || !chatId) {
    // Notification is optional; skip if not configured.
    return;
  }

  var text =
    "New Portfolio Lead\n\n" +
    "Name: " + data.name + "\n" +
    "Email: " + data.email + "\n" +
    "Source: " + data.source + "\n" +
    "Submitted At: " + data.submittedAt + "\n\n" +
    "Message:\n" + data.message;

  var url = "https://api.telegram.org/bot" + token + "/sendMessage";
  var options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({
      chat_id: chatId,
      text: text
    }),
    muteHttpExceptions: true
  };

  UrlFetchApp.fetch(url, options);
}

function outputJson(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function clean(value) {
  return String(value || "").trim();
}
