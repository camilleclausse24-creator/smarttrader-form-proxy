import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbygrW8EC0BQer1x0MLqd5q6K1r7cL8gqqcIPuzSEmeRqVN35DvFRsGM8gA7JuUTuOWdsQ/exec";

const TELEGRAM_URL = "https://t.me/m/BYtCTOsXNGVk";

// fonction commune
async function handleForm(req, res) {
  try {
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      body: new URLSearchParams(req.body),
    });
  } catch (err) {
    console.error("Erreur vers Apps Script:", err);
  }

  // page très simple, avec bon titre
  const html = `
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <title></title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style="margin:0;display:flex;align-items:center;justify-content:center;height:100vh;font-family:Arial,sans-serif;background:#0d1117;color:#fff;">
        <div>
          <p style="text-align:center;">Redirection vers notre canal Telegram…</p>
        </div>
        <script>
          try {
            window.top.location.href = "${TELEGRAM_URL}";
          } catch (e) {
            window.location.href = "${TELEGRAM_URL}";
          }
        </script>
      </body>
    </html>
  `;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(html);
}

app.post("/", handleForm);
app.post("/form", handleForm);

app.get("/", (req, res) => {
  res.status(200).send("Service formulaire SmartTrader ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});



