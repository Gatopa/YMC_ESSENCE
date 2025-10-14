// ===== FECHA DEL EVENTO =====
// 25 de este mes a las 20:00 (hora local del dispositivo)
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
  setInterval(tick, 1000); // para que el minuto cambie exacto
})();

// ===== Murciélagos al entrar (usando tu PNG) =====
(function batsOnLoad(){
  const swarm = document.getElementById("bat-swarm");
  if (!swarm) return;

  const GROUPS = 8;                   // cuántos grupos vuelan
  const durMin = 3.6, durMax = 6.2;   // duración vuelo
  const delaySpread = 1.6;            // dispersión de salida

  const rand = (a,b)=> a + Math.random()*(b-a);

  for (let i=0; i<GROUPS; i++){
    const bat = document.createElement("div");
    bat.className = "bat";
    if (Math.random() < 0.5) bat.classList.add("rtl"); // mitad a la inversa

    // Variables por grupo
    bat.style.setProperty("--scale",  rand(.55, 1.0).toFixed(2));
    bat.style.setProperty("--rot",    `${rand(-8, 8).toFixed(1)}deg`);
    bat.style.setProperty("--y0",     `${rand(8, 80).toFixed(1)}vh`);
    bat.style.setProperty("--y1",     `${rand(8, 80).toFixed(1)}vh`);
    bat.style.setProperty("--dur",    `${rand(durMin, durMax).toFixed(2)}s`);
    bat.style.setProperty("--delay",  `${rand(0, delaySpread).toFixed(2)}s`);

    swarm.appendChild(bat);
  }

  // Limpia el DOM al terminar
  const total = (durMax + delaySpread + 0.8) * 1000;
  setTimeout(() => swarm.remove(), total);
})();
