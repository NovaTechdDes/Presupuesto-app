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
          color: ${datos.selectedColor};
          font-weight: 800;
          font-size: 10px;
          margin-top: 4px;
          text-transform: uppercase;
        }
        h1 {
          color: ${datos.selectedColor};
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
          font-size: 18px;
          margin-bottom: 12px;
          color: #475569;
          text-align: center;
          position: relative;
        }
        .item::before {
          content: "•";
          margin-right: 10px;
          color: ${datos.selectedColor};
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
          background-color: ${datos.selectedColor};
          color: white;
          padding: 20px;
          display: flex;
          justify-content: space-around;
          font-size: 12px;
          margin-top: 20px;
        }
        .footer-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo-container">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="4" width="16" height="8" rx="2" fill="#1E3A8A"/>
              <rect x="11" y="12" width="2" height="8" fill="#1E3A8A"/>
              <path d="M7 6H17" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <div class="logo-text">${datos.nombre}<br>Pintor</div>
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
            <span>📞 ${datos.telefono}</span>
          </div>
          <div class="footer-item">
            <span>📍 ${datos.direccion}</span>
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
