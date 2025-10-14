// ===== Contador (25 de este mes a las 20:00) =====
(function(){
  var now = new Date();
  var year = now.getFullYear();
  var month = String(now.getMonth()+1).padStart(2,"0");
  var EVENTO = year + "-" + month + "-25 20:00:00";

  var $dd = document.getElementById("dd");
  var $hh = document.getElementById("hh");
  var $mm = document.getElementById("mm");

  function update(){
    var target = new Date(EVENTO.replace(" ","T"));
    var diff = target - new Date();
    if (diff <= 0){
      $dd.textContent = "00";
      $hh.textContent = "00";
      $mm.textContent = "00";
      return;
    }
    var s = Math.floor(diff/1000);
    var d = Math.floor(s/86400);
    var h = Math.floor((s%86400)/3600);
    var m = Math.floor((s%3600)/60);
    $dd.textContent = String(d).padStart(2,"0");
    $hh.textContent = String(h).padStart(2,"0");
    $mm.textContent = String(m).padStart(2,"0");
  }
  update();
  setInterval(update, 1000);
})();

// ===== Murciélagos grandes (PNG) =====
(function(){
  var wrap = document.getElementById("bats");
  if(!wrap) return;

  var N = 8;                 // cuántos grupos salen
  var durMin = 4.2, durMax = 6.8;
  var delaySpread = 1.8;

  function rand(a,b){ return a + Math.random()*(b-a); }

  for(var i=0;i<N;i++){
    var bat = document.createElement("div");
    var rtl = Math.random() < 0.5;
    bat.className = "bat " + (rtl ? "rtl" : "ltr");

    // Altura de vuelo (vh). Solo arriba: cambia 8,80 por 5,45
    var topVH = rand(8, 80);
    bat.style.top = topVH + "vh";

    // Duración y retraso por grupo
    var dur = rand(durMin, durMax).toFixed(2) + "s";
    var delay = rand(0, delaySpread).toFixed(2) + "s";
    bat.style.animationDuration = dur;
    bat.style.animationDelay = delay;

    // Tamaño extra y rotación ligera
    var scale = rand(1.1, 1.8).toFixed(2);   // más grandes
    var rot = rand(-8, 8).toFixed(1);
    var base = rtl ? "translateX(120vw)" : "translateX(-120vw)";
    bat.style.transform = base + " scale(" + scale + ") rotate(" + rot + "deg)";

    wrap.appendChild(bat);
  }

  // Limpia el DOM al terminar
  var total = (durMax + delaySpread + 1.0) * 1000;
  setTimeout(function(){
    if(wrap && wrap.parentNode){ wrap.parentNode.removeChild(wrap); }
  }, total);
})();
