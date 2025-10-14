// ===== FECHA DEL EVENTO =====
// 25 de ESTE mes a las 20:00 (hora local del dispositivo)
(function(){
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const EVENTO = `${year}-${month}-25 20:00:00`;

  const $dd = document.getElementById("dd");
  const $hh = document.getElementById("hh");
  const $mm = document.getElementById("mm");

  function tick(){
    const target = new Date(EVENTO.replace(" ", "T"));
    const diff = target - new Date();
    if (diff <= 0){
      $dd.textContent = $hh.textContent = $mm.textContent = "00";
      return;
    }
    const sec = Math.floor(diff / 1000);
    const d = Math.floor(sec / 86400);
    const h = Math.floor((sec % 86400) / 3600);
    const m = Math.floor((sec % 3600) / 60); // solo minutos

    $dd.textContent = String(d).padStart(2, "0");
    $hh.textContent = String(h).padStart(2, "0");
    $mm.textContent = String(m).padStart(2, "0");
  }

  tick();
  setInterval(tick, 1000); // actualiza cada segundo para que cambie el minuto exacto
})();

// ===== Murciélagos al entrar (SVG inline; sin data-URL) =====
(function batsOnLoad(){
  const swarm = document.getElementById("bat-swarm");
  if (!swarm) return;

  const BATS = 12;
  const durMin = 3.2, durMax = 5.4;
  const delaySpread = 1.2;

  const pathD = "M100 50c8-18 23-32 48-39 7 9 14 14 25 16-9 8-15 17-17 28 10-4 21-4 34 0-8 10-18 16-30 18 3 6 5 12 6 19-12-4-22-11-30-21-8 10-18 17-30 21 1-7 3-13 6-19-12-2-22-8-30-18 13-4 24-4 34 0-2-11-8-20-17-28 11-2 18-7 25-16 25 7 40 21 48 39-9 7-19 11-30 12-10 1-19 0-28-2-9 2-18 3-28 2-11-1-21-5-30-12z";

  const rand = (a,b)=> a + Math.random()*(b-a);

  for (let i = 0; i < BATS; i++){
    const div = document.createElement("div");
    div.className = "bat";
    div.style.setProperty("--scale",  rand(.75, 1.35).toFixed(2));
    div.style.setProperty("--rot",    `${rand(-12, 12).toFixed(1)}deg`);
    div.style.setProperty("--y0",     `${rand(5, 85).toFixed(1)}vh`);
    div.style.setProperty("--y1",     `${rand(5, 85).toFixed(1)}vh`);
    div.style.setProperty("--dur",    `${rand(durMin, durMax).toFixed(2)}s`);
    div.style.setProperty("--delay",  `${rand(0, delaySpread).toFixed(2)}s`);

    // SVG inline (evita problemas de CSS con data-URLs)
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 200 110");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill", "black");
    path.setAttribute("d", pathD);
    svg.appendChild(path);

    div.appendChild(svg);
    swarm.appendChild(div);
  }

  // Limpia el DOM al terminar
  const total = (durMax + delaySpread + 0.6) * 1000;
  setTimeout(() => swarm.remove(), total);
})();
