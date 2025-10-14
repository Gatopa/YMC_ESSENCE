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

// ===== Murciélagos (la versión que funcionaba) =====
(function(){
  var wrap = document.getElementById("bats");
  if(!wrap) return;

  var N = 8;                 // cuántos grupos
  var durMin = 4.2, durMax = 6.0;
  var delaySpread = 1.6;

  function rand(a,b){ return a + Math.random()*(b-a); }

  for(var i=0;i<N;i++){
    var el = document.createElement("div");
    var rtl = Math.random() < 0.5;
    el.className = "bat " + (rtl ? "rtl" : "ltr");

    // altura de vuelo
    el.style.top = rand(10, 70).toFixed(1) + "vh";

    // tiempos
    el.style.animationDuration = rand(durMin, durMax).toFixed(2) + "s";
    el.style.animationDelay    = rand(0, delaySpread).toFixed(2) + "s";

    // variación leve de ancho (NO tocamos transform, así no rompemos la animación)
    el.style.width = Math.round(rand(14, 22)) + "vw";

    wrap.appendChild(el);
  }

  // limpia el DOM al terminar
  var total = (durMax + delaySpread + 1.0) * 1000;
  setTimeout(function(){
    if(wrap && wrap.parentNode) wrap.parentNode.removeChild(wrap);
  }, total);
})();
