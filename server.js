import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// ton Apps Script (il marche déjà : mail + sheet)
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbygrW8EC0BQer1x0MLqd5q6K1r7cL8gqqcIPuzSEmeRqVN35DvFRsGM8gA7JuUTuOWdsQ/exec";

const TELEGRAM_URL = "https://t.me/m/BYtCTOsXNGVk";

// fonction qui traite le formulaire (on la réutilise pour / et /form)
async function handleForm(req, res) {
  // on forward vers Apps Script
  try {
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      body: new URLSearchParams(req.body),
    });
  } catch (err) {
    console.error("Erreur vers Apps Script:", err);
    // on continue quand même
  }

  // on envoie une vraie redirection HTTP
  res.redirect(302, TELEGRAM_URL);
}

// 1) certains builders envoient sur /
app.post("/", handleForm);

// 2) notre route prévue
app.post("/form", handleForm);

// 3) si quelqu'un ouvre la racine en GET, on évite la page Render
app.get("/", (req, res) => {
  res.status(200).send("Service formulaire SmartTrader OK ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});


