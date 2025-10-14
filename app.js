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

// ===== Murciélagos con búsqueda de ruta robusta =====
(function(){
  var wrap = document.getElementById("bats");
  if(!wrap) return;

  // Muestra un mensaje visible si algo falla
  function showAlert(msg){
    var box = document.createElement("div");
    box.textContent = msg;
    box.style.position = "fixed";
    box.style.top = "8px";
    box.style.left = "8px";
    box.style.zIndex = "99999";
    box.style.background = "rgba(180,0,0,.9)";
    box.style.color = "#fff";
    box.style.font = "14px/1.4 system-ui, sans-serif";
    box.style.padding = "8px 10px";
    box.style.borderRadius = "6px";
    box.style.maxWidth = "90vw";
    document.body.appendChild(box);
  }

  // Construye URL absoluta desde una relativa (respeta /usuario/REPO/)
  function abs(rel){
    try {
      // base = carpeta donde está index.html
      var base = location.origin + location.pathname;
      if (!base.endsWith("/")) base = base.replace(/\/[^\/]*$/, "/");
      return new URL(rel.replace(/^\/+/, ""), base).toString();
    } catch(e){
      return rel; // fallback
    }
  }

  // Candidatos de ruta más comunes (con y sin carpeta, casos de mayúsculas/extensión)
  var candidates = [
    "assets/img/bats.png",
    "assets/img/Bats.png",
    "assets/img/bats.PNG",
    "assets/Bats.png",
    "assets/bats.png",
    "bats.png",
    "Bats.png",
    "bats.PNG"
  ].map(abs);

  function tryLoad(urls, onSuccess, onFail){
    if (!urls.length){ onFail(); return; }
    var url = urls[0] + "?v=" + Date.now(); // rompe caché
    var img = new Image();
    img.onload = function(){ onSuccess(urls[0]); };
    img.onerror = function(){ tryLoad(urls.slice(1), onSuccess, onFail); };
    img.src = url;
  }

  function spawn(batsURL){
    wrap.innerHTML = "";
    var N = 8;                 // cuántos grupos
    var durMin = 4.2, durMax = 6.0;
    var delaySpread = 1.6;

    function rand(a,b){ return a + Math.random()*(b-a); }

    for(var i=0;i<N;i++){
      var el = document.createElement("div");
      var rtl = Math.random() < 0.5;
      el.className = "bat " + (rtl ? "rtl" : "ltr");

      // Forzamos la imagen por inline (ignora lo que diga el CSS)
      el.style.backgroundImage = "url('"+ batsURL +"?v="+Date.now()+"')";

      // altura y tiempos
      el.style.top = rand(10, 70).toFixed(1) + "vh";
      el.style.animationDuration = rand(durMin, durMax).toFixed(2) + "s";
      el.style.animationDelay    = rand(0, delaySpread).toFixed(2) + "s";

      // tamaño normal (no tocamos transform)
      el.style.width = Math.round(rand(14, 22)) + "vw";

      wrap.appendChild(el);
    }

    // limpieza tras la animación
    var total = (durMax + delaySpread + 1.0) * 1000;
    setTimeout(function(){
      if(wrap && wrap.parentNode) wrap.parentNode.removeChild(wrap);
    }, total);
  }

  window.addEventListener("load", function(){
    tryLoad(candidates,
      function(foundURL){
        spawn(foundURL);
      },
      function(){
        showAlert("No pude cargar bats.png en ninguna ruta común. Verifica que exista, con este nombre exacto, en assets/img/ o assets/. También revisa mayúsculas/minúsculas.");
      }
    );
  });
})();
