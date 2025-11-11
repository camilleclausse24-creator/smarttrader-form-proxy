import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";

const app = express();

// pour lire les formulaires HTML classiques
app.use(bodyParser.urlencoded({ extended: true }));

// ton URL Apps Script (enregistre + email)
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbygrW8EC0BQer1x0MLqd5q6K1r7cL8gqqcIPuzSEmeRqVN35DvFRsGM8gA7JuUTuOWdsQ/exec";

// ton lien Telegram
const TELEGRAM_URL = "https://t.me/m/BYtCTOsXNGVk";

app.post("/form", async (req, res) => {
  // 1) on forward les données vers Google Apps Script
  try {
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      body: new URLSearchParams(req.body)
    });
  } catch (err) {
    console.error("Erreur vers Apps Script:", err);
    // on n'empêche pas la suite
  }

  // 2) on renvoie une page qui force la redirection dans la fenêtre principale
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Redirection…</title>
      </head>
      <body>
        <p>Redirection vers Telegram…</p>
        <script>
          try {
            // si le formulaire est dans un iframe (constructeur), on sort de l'iframe
            window.top.location.href = "${TELEGRAM_URL}";
          } catch (e) {
            // fallback
            window.location.href = "${TELEGRAM_URL}";
          }
        </script>
      </body>
    </html>
  `;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(html);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

