import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// 🔗 URLs
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbygrW8EC0BQer1x0MLqd5q6K1r7cL8gqqcIPuzSEmeRqVN35DvFRsGM8gA7JuUTuOWdsQ/exec";
const TELEGRAM_URL = "https://t.me/m/BYtCTOsXNGVk";

// 🧠 Gestion du formulaire
async function handleForm(req, res) {
  try {
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      body: new URLSearchParams(req.body),
    });
  } catch (err) {
    console.error("Erreur vers Apps Script:", err);
  }

  // 🌑 Page noire avec ton GIF + redirection
  const html = `
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <title>SmartTrader | Redirection...</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          body {
            margin: 0;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: #000000;
            color: #ffffff;
            font-family: "Poppins", Arial, sans-serif;
            overflow: hidden;
          }
          img {
            width: 140px;
            margin-bottom: 30px;
            border-radius: 50%;
            animation: pulse 2.5s infinite ease-in-out;
          }
          p {
            font-size: 1.1rem;
            opacity: 0.9;
            letter-spacing: 0.5px;
            text-align: center;
            animation: fadeIn 1s ease-in-out;
          }
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.85; }
            50% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(1); opacity: 0.85; }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        </style>
      </head>
      <body>
        <img src="https://assets.zyrosite.com/Cn4FvBvoJDP0YoBM/copy_a10db606-d059-4e37-91d0-8b32cb52d33a-ulojuzkhbvhcKTox.GIF" />
        <p id="phrase">Connexion à SmartTrader...</p>

        <script>
          const phrases = [
            "Connexion sécurisée à SmartTrader...",
            "Vérification de votre profil...",
            "Préparation du canal Telegram...",
            "Redirection vers notre communauté..."
          ];
          let i = 0;
          setInterval(() => {
            document.getElementById('phrase').textContent = phrases[i++ % phrases.length];
          }, 1000);

          // ⏩ Redirection automatique vers Telegram
          setTimeout(() => {
            try {
              window.top.location.href = "${TELEGRAM_URL}";
            } catch(e) {
              window.location.href = "${TELEGRAM_URL}";
            }
          }, 2500);
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




