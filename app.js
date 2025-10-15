/* ===========================
   CONTADOR (25 a las 20:00)
=========================== */
(function(){
  var now = new Date();
  var year = now.getFullYear();
  var month = String(now.getMonth()+1).padStart(2,"0");
  var EVENTO = year + "-" + month + "-25 20:00:00";

  var dd = document.getElementById("dd");
  var hh = document.getElementById("hh");
  var mm = document.getElementById("mm");

  function update(){
    var target = new Date(EVENTO.replace(" ","T"));
    var diff = target - new Date();
    if (diff <= 0){
      dd.textContent = hh.textContent = mm.textContent = "00";
      return;
    }
    var s = Math.floor(diff/1000);
    var d = Math.floor(s/86400);
    var h = Math.floor((s%86400)/3600);
    var m = Math.floor((s%3600)/60);
    dd.textContent = String(d).padStart(2,"0");
    hh.textContent = String(h).padStart(2,"0");
    mm.textContent = String(m).padStart(2,"0");
  }
  update();
  setInterval(update, 1000);
})();

/* ===========================================
   MURCIÉLAGOS (de abajo hacia arriba)
=========================================== */
(function(){
  var wrap = document.getElementById("bats");
  if(!wrap) return;

  var N = 8;
  var durMin = 4.2, durMax = 6.2;
  var delaySpread = 1.6;

  function rand(a,b){ return a + Math.random()*(b-a); }

  for(var i=0;i<N;i++){
    var el = document.createElement("div");
    var goRight = Math.random() < 0.5;
    el.className = "bat " + (goRight ? "up-right" : "up-left");
    el.style.left = rand(20, 80).toFixed(1) + "vw";
    el.style.animationDuration = rand(durMin, durMax).toFixed(2) + "s";
    el.style.animationDelay    = rand(0, delaySpread).toFixed(2) + "s";
    el.style.width = Math.round(rand(14, 22)) + "vw";
    wrap.appendChild(el);
  }

  var total = (durMax + delaySpread + 1.0) * 1000;
  setTimeout(function(){
    if(wrap && wrap.parentNode) wrap.parentNode.removeChild(wrap);
  }, total);
})();

/* ===========================================
   MÚSICA: reproducir 1 sola vez al entrar,
   pausar al salir, sin reanudar al volver.
=========================================== */
(function(){
  var audio = document.getElementById("bgm");
  if(!audio) return;

  audio.loop = false;      // solo una vez
  audio.volume = 0.75;

  var started = false;     // ya intentamos/arrancamos
  var finished = false;    // terminó de reproducir

  function removeActivator(){
    var btn = document.getElementById("sound-activate");
    if(btn && btn.parentNode) btn.parentNode.removeChild(btn);
  }

  function showActivator(){
    if (document.getElementById("sound-activate")) return;
    var b = document.createElement("button");
    b.id = "sound-activate";
    b.textContent = "▶ Activar sonido";
    Object.assign(b.style, {
      position:"fixed", bottom:"16px", left:"50%", transform:"translateX(-50%)",
      zIndex:10000, background:"rgba(0,0,0,.75)", color:"#FFD37A",
      border:"1px solid rgba(255,211,122,.6)", borderRadius:"999px",
      padding:"10px 16px", font:"600 14px system-ui,-apple-system,Segoe UI,Roboto,sans-serif",
      letterSpacing:".3px", cursor:"pointer", backdropFilter:"blur(4px)"
    });
    var activate = function(){
      if (finished) return;           // si ya terminó, no reproducimos de nuevo
      audio.currentTime = 0;
      audio.play().finally(removeActivator);
      started = true;
    };
    b.addEventListener("click", activate, {passive:true});
    b.addEventListener("touchstart", activate, {passive:true});
    document.body.appendChild(b);
  }

  function tryPlayOnce(){
    if (started || finished) return;  // no reintentes si ya comenzó/terminó
    started = true;
    audio.setAttribute("playsinline", "");
    audio.currentTime = 0;
    audio.play().then(removeActivator).catch(showActivator);
  }

  // Intento inicial al cargar
  window.addEventListener("load", tryPlayOnce);

  // Marcar fin y asegurarnos de que no vuelva a sonar
  audio.addEventListener("ended", function(){
    finished = true;
    removeActivator();
  });

  // Pausar al ocultar o salir; NO reanudar automáticamente
  document.addEventListener("visibilitychange", function(){
    if (document.hidden) audio.pause();
  });
  window.addEventListener("pagehide", function(){ audio.pause(); });
  window.addEventListener("beforeunload", function(){ audio.pause(); });
})();
