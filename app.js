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
   MURCIÉLAGOS: ráfagas rápidas
=========================================== */
(function(){
  var wrap = document.getElementById("bats");
  if(!wrap) return;

  var WAVES = 3;            // tandas
  var PER_WAVE = 14;        // por tanda
  var SPACING = 400;        // ms entre tandas
  var durMin = 0.9, durMax = 1.6;
  var delaySpread = 0.5;

  function rand(a,b){ return a + Math.random()*(b-a); }

  function spawnWave(){
    for(var i=0;i<PER_WAVE;i++){
      var el = document.createElement("div");
      var goRight = Math.random() < 0.5;
      el.className = "bat centered " + (goRight ? "up-right" : "up-left");
      el.style.animationDuration = rand(durMin, durMax).toFixed(2) + "s";
      el.style.animationDelay    = rand(0, delaySpread).toFixed(2) + "s";
      el.style.width = Math.round(rand(12, 20)) + "vw";
      wrap.appendChild(el);
    }
  }

  for (var w=0; w<WAVES; w++){
    (function(delay){ setTimeout(spawnWave, delay); })(w * SPACING);
  }

  var lastDuration = durMax*1000 + delaySpread*1000;
  setTimeout(function(){
    if(wrap && wrap.parentNode) wrap.parentNode.removeChild(wrap);
  }, WAVES*SPACING + lastDuration + 400);
})();

/* ===========================================
   MÚSICA: autoplay si se puede; si no, 1er toque/click; suena 1 vez
=========================================== */
(function () {
  var audio = document.getElementById("bgm");
  if (!audio) return;

  audio.loop = false;
  audio.volume = 0.75;

  var started = false;
  var finished = false;

  function cleanupActivators() {
    window.removeEventListener("pointerdown", onInteract);
    window.removeEventListener("touchstart", onInteract);
    window.removeEventListener("click", onInteract);
    window.removeEventListener("keydown", onInteract);
  }
  function onInteract() {
    if (finished) { cleanupActivators(); return; }
    if (!started) {
      started = true;
      audio.currentTime = 0;
      audio.play().finally(cleanupActivators);
    } else {
      cleanupActivators();
    }
  }

  function tryAutoplay() {
    if (started || finished) return;
    started = true;
    audio.setAttribute("playsinline", "");
    audio.currentTime = 0;
    audio.play().catch(function () {
      started = false;
      window.addEventListener("pointerdown", onInteract, {passive:true});
      window.addEventListener("touchstart", onInteract, {passive:true});
      window.addEventListener("click", onInteract, {passive:true});
      window.addEventListener("keydown", onInteract, false);
    });
  }

  window.addEventListener("load", tryAutoplay);

  audio.addEventListener("ended", function () {
    finished = true;
    cleanupActivators();
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) audio.pause();
  });
  window.addEventListener("pagehide", function () { audio.pause(); });
  window.addEventListener("beforeunload", function () { audio.pause(); });
})();
