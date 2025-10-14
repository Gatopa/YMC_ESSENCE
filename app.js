// ===== FECHA DEL EVENTO =====
// 25 de este mes a las 20:00 (hora local del usuario)
(function(){
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth()+1).padStart(2, "0"); // mes actual
  const EVENTO = `${year}-${month}-25 20:00:00`;

  const $dd = document.getElementById("dd");
  const $hh = document.getElementById("hh");
  const $mm = document.getElementById("mm");
  const $ss = document.getElementById("ss");

  function tick(){
    const target = new Date(EVENTO.replace(" ", "T"));
    const diff = target - new Date();
    if (diff <= 0){
      $dd.textContent = $hh.textContent = $mm.textContent = $ss.textContent = "00";
      return;
    }
    const sec = Math.floor(diff/1000);
    const d = Math.floor(sec/86400);
    const h = Math.floor((sec%86400)/3600);
    const m = Math.floor((sec%3600)/60);
    const s = sec%60;

    $dd.textContent = String(d).padStart(2,"0");
    $hh.textContent = String(h).padStart(2,"0");
    $mm.textContent = String(m).padStart(2,"0");
    $ss.textContent = String(s).padStart(2,"0");
  }

  tick();
  setInterval(tick, 1000);

  // Pulso leve al cambiar segundos (detalle visual)
  let last = null;
  setInterval(()=>{
    const s = new Date().getSeconds();
    if (s !== last){
      last = s;
      $ss.parentElement.animate(
        [
          { filter:'drop-shadow(0 2px 6px rgba(0,0,0,.55))', transform:'translateY(0)' },
          { filter:'drop-shadow(0 2px 10px rgba(0,0,0,.65))', transform:'translateY(-1px)' }
        ],
        { duration:140, easing:'ease-out' }
      );
    }
  },140);
})();
