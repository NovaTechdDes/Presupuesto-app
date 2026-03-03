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
            <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="200.000000pt" height="200.000000pt" viewBox="0 0 500.000000 500.000000" preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)" fill="${datos?.selectedColor ?? "#1E3A8A"}" stroke="none">
<path d="M2285 3973 c-522 -94 -929 -529 -985 -1055 -14 -126 -1 -307 30 -429 116 -452 471 -790 935 -891 94 -20 392 -17 485 5 93 22 231 69 228 77 -2 3 -85 159 -185 346 -101 187 -183 351 -183 365 0 13 7 37 15 52 14 28 13 33 -46 144 -37 68 -70 118 -83 124 -17 8 -87 -20 -375 -151 -195 -88 -360 -160 -366 -160 -23 0 -43 38 -155 287 -82 184 -111 259 -106 277 4 18 22 31 71 51 36 16 65 33 65 39 0 6 -9 31 -20 55 -21 46 -25 78 -12 99 5 7 273 127 597 268 551 240 591 256 614 243 17 -10 43 -59 92 -172 38 -87 69 -166 69 -176 0 -10 -8 -25 -17 -33 -10 -9 -280 -129 -601 -268 -555 -239 -584 -251 -606 -236 -13 8 -32 35 -42 60 -20 47 -31 55 -52 34 -21 -21 -13 -48 59 -210 55 -120 77 -160 93 -164 14 -3 139 49 364 151 189 85 351 155 362 155 26 0 46 -29 131 -189 l74 -141 42 0 c29 0 50 -7 68 -22 14 -13 106 -173 204 -356 l179 -333 59 49 c196 165 339 407 399 679 24 107 24 357 0 468 -54 248 -160 448 -325 615 -181 183 -400 298 -650 345 -104 19 -316 18 -426 -2z"/>
<path d="M1549 1456 c-1 -57 -3 -64 -9 -38 -17 71 -69 102 -175 102 l-75 0 0 -140 0 -140 71 0 c109 0 160 32 179 113 6 25 8 16 9 -40 l1 -73 135 0 135 0 0 30 0 30 -65 0 c-63 0 -65 1 -65 25 0 24 3 25 55 25 54 0 55 0 55 30 0 30 -1 30 -55 30 -54 0 -55 0 -55 30 l0 30 65 0 65 0 0 30 0 30 -135 -1 -135 -1 -1 -72z m-94 -21 c24 -24 31 -57 19 -90 -8 -20 -56 -45 -89 -45 -25 0 -25 1 -25 80 l0 80 35 0 c25 0 44 -8 60 -25z"/>
<path d="M1912 1510 c-52 -32 -74 -76 -69 -138 3 -45 9 -59 39 -89 29 -29 46 -37 86 -41 29 -2 58 1 73 8 17 10 24 10 27 1 2 -6 17 -11 33 -11 29 0 29 1 30 58 0 48 2 53 10 32 15 -38 58 -78 96 -91 105 -34 213 70 183 179 -22 85 -129 129 -210 87 -34 -17 -70 -61 -70 -84 0 -14 -10 -16 -70 -13 l-70 4 0 -31 c0 -28 3 -31 30 -31 36 0 38 -13 8 -34 -87 -61 -187 56 -112 131 23 23 31 25 74 20 39 -5 51 -2 65 13 17 19 17 20 -18 35 -49 20 -96 19 -135 -5z m397 -51 c63 -22 77 -107 24 -149 -71 -55 -166 19 -132 103 10 24 31 39 75 57 1 0 15 -5 33 -11z"/>
<path d="M2860 1376 c0 -145 -1 -157 -20 -168 -12 -8 -20 -24 -20 -40 0 -24 4 -28 30 -28 37 0 67 29 75 72 3 18 5 96 3 173 l-3 140 -32 3 -33 3 0 -155z"/>
<path d="M2940 1385 l0 -145 100 0 100 0 0 30 0 30 -65 0 c-63 0 -65 1 -65 25 0 24 3 25 55 25 54 0 55 0 55 30 0 30 -1 30 -55 30 -54 0 -55 0 -55 30 l0 30 65 0 65 0 0 30 0 30 -100 0 -100 0 0 -145z"/>
<path d="M2593 1500 c-47 -28 -66 -72 -61 -137 4 -42 11 -60 33 -83 60 -62 150 -64 210 -5 61 62 57 155 -10 214 -30 26 -44 31 -88 31 -34 0 -63 -7 -84 -20z m112 -44 c62 -26 74 -89 26 -137 -38 -37 -82 -39 -116 -4 -53 52 -24 137 53 154 1 1 18 -5 37 -13z"/>
<path d="M3150 1380 l0 -140 70 0 c111 0 169 42 178 128 9 102 -47 152 -170 152 l-78 0 0 -140z m165 55 c14 -13 25 -36 25 -50 0 -37 -50 -85 -89 -85 l-31 0 0 80 0 80 35 0 c25 0 44 -8 60 -25z"/>
<path d="M3532 1468 c-16 -29 -51 -92 -77 -140 l-47 -88 41 0 c31 0 41 4 46 20 5 17 15 20 65 20 49 0 61 -3 70 -20 8 -14 21 -20 45 -20 19 0 35 2 35 5 0 5 -138 264 -145 273 -2 2 -16 -21 -33 -50z m47 -115 c11 -21 9 -23 -14 -23 -27 0 -33 18 -13 38 6 6 12 11 13 9 1 -1 8 -12 14 -24z"/>
<path d="M2290 1135 c0 -8 7 -15 15 -15 8 0 15 7 15 15 0 8 -7 15 -15 15 -8 0 -15 -7 -15 -15z"/>
<path d="M2120 1045 c0 -78 3 -95 15 -95 10 0 15 10 15 30 0 26 4 30 28 30 45 0 72 26 72 69 0 50 -14 61 -77 61 l-53 0 0 -95z m94 42 c9 -15 7 -21 -9 -33 -30 -22 -50 -13 -53 24 -3 31 -1 33 24 30 15 -2 32 -11 38 -21z"/>
<path d="M2540 1122 c0 -10 -6 -24 -12 -31 -10 -11 -10 -14 0 -18 7 -3 12 -23 12 -52 0 -54 12 -71 52 -71 20 0 26 4 22 15 -3 8 -11 13 -17 12 -8 -1 -13 16 -15 46 -2 37 0 47 12 47 9 0 16 7 16 15 0 8 -6 15 -14 15 -7 0 -16 9 -19 20 -6 25 -37 27 -37 2z"/>
<path d="M2290 1025 c0 -60 3 -75 15 -75 12 0 15 15 15 75 0 60 -3 75 -15 75 -12 0 -15 -15 -15 -75z"/>
<path d="M2370 1025 c0 -60 3 -75 15 -75 11 0 15 12 15 48 0 51 12 72 42 72 15 0 18 -9 18 -60 0 -53 2 -60 20 -60 17 0 20 7 20 49 0 91 -26 120 -81 91 -13 -7 -19 -7 -19 0 0 5 -7 10 -15 10 -12 0 -15 -15 -15 -75z"/>
<path d="M2657 1083 c-25 -29 -26 -93 -1 -117 21 -22 77 -20 97 2 23 26 22 94 -1 115 -24 22 -75 22 -95 0z m79 -37 c10 -41 -4 -68 -34 -64 -21 2 -28 9 -30 31 -5 41 4 57 32 57 19 0 27 -7 32 -24z"/>
<path d="M2810 1025 c0 -60 3 -75 15 -75 11 0 15 12 15 51 0 47 2 52 30 62 17 6 30 17 30 24 0 17 -22 17 -39 1 -11 -10 -14 -10 -18 0 -3 6 -11 12 -19 12 -11 0 -14 -17 -14 -75z"/>
</g>
</svg>
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

  if (disponible) return uri;
};
