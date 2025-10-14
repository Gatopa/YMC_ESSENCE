// ===== Contador (25 de este mes a las 20:00) =====
(function(){
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth()+1).padStart(2,"0");
  const EVENTO = `${year}-${month}-25 20:00:00`;

  const $dd = document.getElementById("dd");
  const $hh = document.getElementById("hh");
  const $mm = document.getElementById("mm");

  function update(){
    const target = new Date(EVENTO.replace(" ","T"));
    const diff = target - new Date();
    if (diff <= 0){
      $dd.textContent = $hh.textContent = $mm.textContent = "00";
      return;
    }
    const s = Math.floor(diff/1000);
    const d = Math.floor(s/86400);
    const h = Math.floor((s%86400)/3600);
    const m = Math.floor((s%3600)/60);
    $dd.textContent = String(d).padStart(2,"0");
    $hh.textContent = String(h).padStart(2,"0");
    $mm.textContent = String(m).padStart(2,"0");
  }
  update();
  setInterval(update, 1000);
})();

// ===== Murciélagos simples usando tu bats.png =====
(function(){
  const wrap = document.getElementById("bats");
  if(!wrap) return;

  const N = 8;                       // número de grupos
  const durMin=3.6, durMax=6.2;      // duración
  const delaySpread=1.6;             // dispersión

  const rand = (a,b)=> a + Math.random()*(b-a);

  for(let i=0;i<N;i++){
    const el = document.createElement("div");
    el.className = "bat";
    if(Math.random()<0.5) el.classList.add("rtl");
    // AUMENTÉ la escala para algunos grupos
    el.style.setProperty("--s", rand(0.8, 1.4).toFixed(2));  // antes .55–1.0
    el.style.setProperty("--r", `${rand(-8,8).toFixed(1)}deg`);
    el.style.setProperty("--y",  `${rand(10,80).toFixed(1)}vh`);
    el.style.setProperty("--y2", `${rand(10,80).toFixed(1)}vh`);
    el.style.setProperty("--t",  `${rand(durMin,durMax).toFixed(2)}s`);
    el.style.setProperty("--d",  `${rand(0,delaySpread).toFixed(2)}s`);
    wrap.appendChild(el);
  }

  // Limpia el DOM tras la animación
  const total = (durMax + delaySpread + 0.8) * 1000;
  setTimeout(()=> wrap.remove(), total);
})();
