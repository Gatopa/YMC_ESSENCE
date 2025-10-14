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

// ===== Murciélagos con SVG inline (sin PNG, aparecen siempre) =====
(function(){
  var wrap = document.getElementById("bats");
  if(!wrap) return;

  // Silueta de murciélago (SVG path)
  var PATH_D = "M100 50c8-18 23-32 48-39 7 9 14 14 25 16-9 8-15 17-17 28 10-4 21-4 34 0-8 10-18 16-30 18 3 6 5 12 6 19-12-4-22-11-30-21-8 10-18 17-30 21 1-7 3-13 6-19-12-2-22-8-30-18 13-4 24-4 34 0-2-11-8-20-17-28 11-2 18-7 25-16 25 7 40 21 48 39-9 7-19 11-30 12-10 1-19 0-28-2-9 2-18 3-28 2-11-1-21-5-30-12z";

  function rand(a,b){ return a + Math.random()*(b-a); }

  // Crea un murciélago (div .bat + SVG dentro)
  function makeBat(rtl){
    var el = document.createElement("div");
    el.className = "bat " + (rtl ? "rtl" : "ltr");

    // NO usamos background-image; quitamos por si lo define el CSS
    el.style.backgroundImage = "none";

    // Tamaño base (no tocamos transform para no romper animación)
    el.style.width = Math.round(rand(14, 22)) + "vw";  // tamaño normal
    el.style.maxWidth = "360px";
    el.style.minWidth = "120px";

    // Posición vertical y tiempos de animación
    el.style.top = rand(10, 70).toFixed(1) + "vh";
    el.style.animationDuration = rand(4.2, 6.0).toFixed(2) + "s";
    el.style.animationDelay    = rand(0, 1.6).toFixed(2) + "s";

    // Inserta SVG inline (se verá siempre)
    var svg =
      '<svg viewBox="0 0 200 110" xmlns="http://www.w3.org/2000/svg" ' +
      'style="width:100%;height:auto;display:block;filter:drop-shadow(0 3px 4px rgba(0,0,0,.35))">' +
      '<path d="' + PATH_D + '" fill="black"/></svg>';
    el.innerHTML = svg;

    return el;
  }

  // Genera varios murciélagos y luego limpia
  var N = 8;
  for(var i=0;i<N;i++){
    var rtl = Math.random() < 0.5;
    wrap.appendChild(makeBat(rtl));
  }

  // Limpieza después de volar
  setTimeout(function(){
    if(wrap && wrap.parentNode) wrap.parentNode.removeChild(wrap);
  }, 8000); // > duración máx (~6s) + margen
})();
