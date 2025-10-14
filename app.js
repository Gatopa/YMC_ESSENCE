// ===== FECHA DEL EVENTO (hora local Lima) =====
const EVENTO = "2025-10-25 19:00:00"; // "YYYY-MM-DD HH:MM:SS"

const $dd = document.getElementById("dd");
const $hh = document.getElementById("hh");
const $mm = document.getElementById("mm");
const $ss = document.getElementById("ss");

function tickCountdown(){
  const now = new Date();
  // Asegura compatibilidad: reemplaza espacio por 'T'
  const target = new Date(EVENTO.replace(" ", "T"));
  const diff = target - now;

  if (diff <= 0){
    $dd.textContent = "00";
    $hh.textContent = "00";
    $mm.textContent = "00";
    $ss.textContent = "00";
    return;
  }

  const sec = Math.floor(diff / 1000);
  const days  = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const mins  = Math.floor((sec % 3600) / 60);
  const secs  = sec % 60;

  $dd.textContent = String(days).padStart(2,"0");
  $hh.textContent = String(hours).padStart(2,"0");
  $mm.textContent = String(mins).padStart(2,"0");
  $ss.textContent = String(secs).padStart(2,"0");
}

// Inicia/actualiza
tickCountdown();
setInterval(tickCountdown, 1000);

// Pulso muy leve al cambiar segundos
let last = null;
setInterval(() => {
  const s = new Date().getSeconds();
  if (s !== last){
    last = s;
    $ss.parentElement.animate(
      [
        { filter:'drop-shadow(0 2px 6px rgba(0,0,0,.55))', transform:'translateY(0)' },
        { filter:'drop-shadow(0 2px 10px rgba(0,0,0,.65))', transform:'translateY(-1px)' }
      ],
      { duration: 140, easing:'ease-out' }
    );
  }
}, 140);
