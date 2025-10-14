// ===== Contador: 25 de este mes a las 20:00 =====
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

// ===== Murciélagos: precarga + imagen inline + anti-caché =====
(function(){
  var wrap = document.getElementById("bats");
  if(!wrap) return;

  // Ruta al PNG (tal como está en tu repo) + cache bust
  var PNG = "assets/img/bats.png?v=" + Date.now();

  // 1) Espera a que cargue la página
  window.addEventListener("load", function(){

    // 2) Precarga del PNG para evitar que animen “invisibles”
    var img = new Image();
    img.onload = spawn;      // cuando el PNG esté listo, creamos los murciélagos
    img.onerror = function(){
      console.warn("No se pudo cargar", PNG, "— revisa la ruta/nombre.");
      spawn();               // incluso si falla, los creamos (sin imagen se notará)
    };
    img.src = PNG;
  });

  function rand(a,b){ return a + Math.random()*(b-a); }

  function spawn(){
    wrap.innerHTML = "";

    var N = 8;                 // cuántos grupos
    var durMin = 4.2, durMax = 6.0;
    var delaySpread = 1.6;

    for(var i=0;i<N;i++){
      var el = document.createElement("div");
      var rtl = Math.random() < 0.5;
      el.className = "bat " + (rtl ? "rtl" : "ltr");

      // Inline: forzamos la imagen por JS (aunque el CSS tuviera otra ruta)
      el.style.backgroundImage = "url('" + PNG + "')";

      // Altura de vuelo (si quieres solo arriba, usa rand(5,45))
      el.style.top = rand(10, 70).toFixed(1) + "vh";

      // Tiempos de animación
      el.style.animationDuration = rand(durMin, durMax).toFixed(2) + "s";
      el.style.animationDelay    = rand(0, delaySpread).toFixed(2) + "s";

      // Ancho moderado (no tocamos transform para no romper la animación)
      el.style.width = Math.round(rand(14, 22)) + "vw";

      wrap.appendChild(el);
    }

    // Limpieza tras terminar todo
    var total = (durMax + delaySpread + 1.0) * 1000;
    setTimeout(function(){
      if(wrap && wrap.parentNode) wrap.parentNode.removeChild(wrap);
    }, total);
  }
})();
