// ===== FECHA DEL EVENTO =====
// 25 de este mes a las 20:00 (hora local del usuario)
(function(){
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth()+1).padStart(2, "0");
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
    const sec = Math.floor(diff/1000);
    const d = Math.floor(sec/86400);
    const h = Math.floor((sec%86400)/3600);
    const m = Math.floor((sec%3600)/60); // solo minutos

    $dd.textContent = String(d).padStart(2,"0");
    $hh.textContent = String(h).padStart(2,"0");
    $mm.textContent = String(m).padStart(2,"0");
  }

  tick();
  // aunque no mostramos segundos, actualizamos cada 1s para que el minuto cambie justo
  setInterval(tick, 1000);
})();

// ===== Murciélagos al entrar (se borra solo) =====
(function batsOnLoad(){
  const swarm = document.getElementById('bat-swarm');
  if (!swarm) return;

  const BATS = 12;
  const durMin = 3.2, durMax = 5.4;
  const delaySpread = 1.2;

  for (let i=0; i<BATS; i++){
    const b = document.createElement('div');
    b.className = 'bat';

    const rand = (a,b)=> a + Math.random()*(b-a);
    b.style.setProperty('--scale',  rand(.75, 1.35).toFixed(2));
    b.style.setProperty('--rot',    `${rand(-12, 12).toFixed(1)}deg`);
    b.style.setProperty('--y0',     `${rand(5, 85).toFixed(1)}vh`);
    b.style.setProperty('--y1',     `${rand(5, 85).toFixed(1)}vh`);
    b.style.setProperty('--dur',    `${rand(durMin, durMax).toFixed(2)}s`);
    b.style.setProperty('--delay',  `${rand(0, delaySpread).toFixed(2)}s`);

    swarm.appendChild(b);
  }

  const total = (durMax + delaySpread + 0.6) * 1000;
  setTimeout(()=> swarm.remove(), total);
})();
