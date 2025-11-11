import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";

const app = express();

// pour lire les formulaires HTML classiques
app.use(bodyParser.urlencoded({ extended: true }));

// ton URL Apps Script (celle qui enregistre dans le Sheet + envoie l'email)
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbygrW8EC0BQer1x0MLqd5q6K1r7cL8gqqcIPuzSEmeRqVN35DvFRsGM8gA7JuUTuOWdsQ/exec";

// ton lien Telegram
const TELEGRAM_URL = "https://t.me/m/BYtCTOsXNGVk";

app.post("/form", async (req, res) => {
  // 1) on envoie ce que l'utilisateur a soumis vers Google Apps Script
  try {
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      body: new URLSearchParams(req.body)
    });
  } catch (err) {
    console.error("Erreur vers Apps Script:", err);
    // on ne bloque pas l'utilisateur
  }

  // 2) on redirige l'utilisateur vers Telegram
  res.redirect(302, TELEGRAM_URL);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
