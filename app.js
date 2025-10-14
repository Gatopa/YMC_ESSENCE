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

// ===== Murciélagos: URL absoluta + precarga + inline =====
(function(){
  var wrap = document.getElementById("bats");
  if(!wrap) return;

  // === DEBUG ===
  var DEBUG = false; // pon true para ver un murciélago fijo con borde rojo

  // Construir URL ABSOLUTA a /assets/img/bats.png bajo GitHub Pages
  // Esto funciona tanto en raiz del dominio como en /usuario/REPO/
  function absoluteUrl(relPath){
    var base = location.origin + location.pathname;
    // Si la ruta termina en archivo (index.html), quita el archivo
    if (!base.endsWith("/")) base = base.replace(/\/[^\/]*$/, "/");
    return base + relPath.replace(/^\/+/,"");
  }
  var PNG_ABS = absoluteUrl("assets/img/bats.png") + "?v=" + Date.now();

  function rand(a,b){ return a + Math.random()*(b-a); }

  function spawn(){
    wrap.innerHTML = "";

    if (DEBUG){
      var test = document.createElement("div");
      test.className = "bat ltr";
      test.style.backgroundImage = "url('"+PNG_ABS+"')";
      test.style.top = "20vh";
      test.style.width = "20vw";
      test.style.opacity = "1";             // se ve ya
      test.style.animation = "none";        // fijo
      test.style.outline = "2px solid red"; // borde para confirmar
      wrap.appendChild(test);
      console.log("[DEBUG] Murciélago de prueba colocado con", PNG_ABS);
      return;
    }

    var N = 8;                 // cuántos grupos
    var durMin = 4.2, durMax = 6.0;
    var delaySpread = 1.6;

    for(var i=0;i<N;i++){
      var el = document.createElement("div");
      var rtl = Math.random() < 0.5;
      el.className = "bat " + (rtl ? "rtl" : "ltr");

      // URL inline (evita cualquier ruta vieja en CSS)
      el.style.backgroundImage = "url('"+PNG_ABS+"')";

      // altura de vuelo
      el.style.top = rand(10, 70).toFixed(1) + "vh";

      // tiempos
      el.style.animationDuration = rand(durMin, durMax).toFixed(2) + "s";
      el.style.animationDelay    = rand(0, delaySpread).toFixed(2) + "s";

      // ancho moderado (no tocamos transform)
      el.style.width = Math.round(rand(14, 22)) + "vw";

      wrap.appendChild(el);
    }

    // limpieza tras terminar todo
    var total = (durMax + delaySpread + 1.0) * 1000;
    setTimeout(function(){
      if(wrap && wrap.parentNode) wrap.parentNode.removeChild(wrap);
    }, total);
  }

  // Precarga del PNG y luego creamos los murciélagos
  window.addEventListener("load", function(){
    var img = new Image();
    img.onload = function(){
      console.log("[OK] Cargó bats.png:", PNG_ABS);
      spawn();
    };
    img.onerror = function(){
      console.warn("[ERROR] No se pudo cargar bats.png en:", PNG_ABS);
      // Igual intentamos spawnear (si falla, verás borde rojo en DEBUG)
      spawn();
    };
    img.src = PNG_ABS;
  });
})();
