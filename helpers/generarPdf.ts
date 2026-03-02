import { Asset } from "expo-asset";
import { File } from "expo-file-system";

import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { obtenerDatos } from "./obtenerDatos";

interface BudgetData {
  name: string;
  items: string[];
  total: string;
}

export const generarPdf = async ({ name, items, total }: BudgetData) => {
  const datos = await obtenerDatos();

  // Cargar y convertir el logo a base64
  let logoBase64 = "";
  try {
    const asset = Asset.fromModule(require("../assets/images/Logo.png"));
    await asset.downloadAsync();

    if (asset.localUri) {
      const file = new File(asset.localUri);
      const logoDataUri = await file.base64();

      logoBase64 = `data:image/png;base64,${logoDataUri}`;
    }
  } catch (error) {
    console.error("Error cargando el logo:", error);
  }

  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: 'Helvetica', 'Arial', sans-serif;
          margin: 0;
          padding: 0;
          color: #1E293B;
          background-color: #fcfcfc;
        }
        .container {
          padding: 50px 40px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          position: relative;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 60px;
        }
        .logo-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .logo-text {
          color:${datos?.selectedColor ?? "#1E3A8A"};
          font-weight: 800;
          font-size: 26px;
          margin-top: 4px;
          text-transform: uppercase;
        }
        h1 {
          color:${datos?.selectedColor ?? "#1E3A8A"};
          font-size: 38px;
          margin: 0;
          font-weight: 900;
          letter-spacing: -1px;
        }
        .client-name {
          text-align: center;
          font-size: 24px;
          font-weight: 800;
          margin-bottom: 30px;
          text-decoration: underline;
          text-transform: uppercase;
        }
        .items-list {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 40px;
        }
        .item {
          font-size: 36px;
          margin-bottom: 12px;
          color: #475569;
          text-align: center;
          position: relative;
        }
        .item::before {
          content: "•";
          margin-right: 10px;
          color:${datos?.selectedColor ?? "#1E3A8A"};
        }
        .labor-cost {
          text-align: center;
          font-size: 22px;
          font-weight: 800;
          margin-top: 40px;
          margin-bottom: 40px;
          border-top: 1px solid #E2E8F0;
          padding-top: 20px;
        }
        .labor-title {
          text-decoration: underline;
        }
        .footer {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: ${datos?.selectedColor ?? "#1E3A8A"};
          color: white;
          padding: 20px;
          display: flex;
          justify-content: space-around;
          font-size: 20px;
          margin-top: 20px;
        }
        .footer-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 30px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo-container">
            <img src="${logoBase64}" alt="Logo" style="width: 200px; height: auto;">
            <div class="logo-text">${datos?.nombre ?? ""}<br>${datos?.profesion ?? ""}</div>
          </div>
          <h1>PRESUPUESTO</h1>
        </div>

        <div class="client-name">${name || "CLIENTE GENERAL"}</div>

        <div class="items-list">
          ${items.map((i) => `<div class="item">${i}</div>`).join("")}
        </div>

        <div class="labor-cost">
          <span class="labor-title">MANO DE OBRA</span>: $${total || "0.00"}-
        </div>

        <div class="footer">
          <div class="footer-item">
            <span>📞 ${datos?.telefono ?? ""}</span>
          </div>
          <div class="footer-item">
            <span>📍 ${datos?.direccion ?? ""}</span>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const { uri } = await Print.printToFileAsync({ html });
  const disponible = await Sharing.isAvailableAsync();

  if (disponible) {
    return uri;
  }
};
