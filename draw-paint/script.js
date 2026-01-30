const cizimAlani = document.querySelector(".cizim-alani");
const ctx = cizimAlani.getContext("2d");
const silgiButonu = document.getElementById("silgi");
const renkSecici = document.getElementById("renk-secici");
const kalinlikAyar = document.getElementById("kalinlik-ayari");
const geriAlButonu = document.getElementById("geri-al");

// durum değişkenleri
let renk = "#000000";
let yaricap = 5;
let silmeModu = false;
let sonX = 0;
let sonY = 0;
let alanSol = 0;
let alanUst = 0;
let cizimAktif = false;

// geri alma için history
const history = [];
const MAX_HISTORY = 50; // çok fazla olmasın diye sınır koyduk

// canvas beyaz başlat
ctx.fillStyle = "white";
ctx.fillRect(0, 0, cizimAlani.width, cizimAlani.height);
kaydetDurum(); // başlangıç durumunu kaydet

function kaydetDurum() {
    if (history.length >= MAX_HISTORY) {
        history.shift(); // eskiyi at
    }
    history.push(cizimAlani.toDataURL());
    geriAlButonu.disabled = history.length <= 1;
}

function geriAl() {
    if (history.length <= 1) return;
    history.pop(); // son durumu at
    const onceki = history[history.length - 1];
    const img = new Image();
    img.onload = () => {
        ctx.drawImage(img, 0, 0);
    };
    img.src = onceki;
    geriAlButonu.disabled = history.length <= 1;
}

// ──────────────────────────────────────────────
function konumlariGuncelle() {
    const rect = cizimAlani.getBoundingClientRect();
    alanSol = rect.left;
    alanUst = rect.top;
}

konumlariGuncelle();
window.addEventListener("resize", konumlariGuncelle);

// ──────────────────────────────────────────────
function ciz(e) {
    if (!cizimAktif) return;

    const x = e.clientX - alanSol;
    const y = e.clientY - alanUst;

    ctx.beginPath();
    ctx.arc(x, y, yaricap, 0, Math.PI * 2);
    ctx.fillStyle = silmeModu ? "white" : renk;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(sonX, sonY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = silmeModu ? "white" : renk;
    ctx.lineWidth = yaricap * 2;
    ctx.lineCap = "round";
    ctx.stroke();

    sonX = x;
    sonY = y;
}

// ──────────────────────────────────────────────
cizimAlani.addEventListener("mousedown", (e) => {
    cizimAktif = true;
    sonX = e.clientX - alanSol;
    sonY = e.clientY - alanUst;
    ciz(e);
});

cizimAlani.addEventListener("mousemove", (e) => {
    ciz(e);
});

cizimAlani.addEventListener("mouseup", () => {
    if (cizimAktif) {
        cizimAktif = false;
        kaydetDurum();
    }
});

cizimAlani.addEventListener("mouseout", () => {
    if (cizimAktif) {
        cizimAktif = false;
        kaydetDurum();
    }
});

// ──────────────────────────────────────────────
silgiButonu.addEventListener("click", () => {
    silmeModu = !silmeModu;
    silgiButonu.classList.toggle("aktif", silmeModu);
    silgiButonu.textContent = silmeModu ? "Silgi (Aktif)" : "Silgi";
});

geriAlButonu.addEventListener("click", geriAl);

renkSecici.addEventListener("input", (e) => {
    renk = e.target.value;
});

kalinlikAyar.addEventListener("input", (e) => {
    yaricap = Number(e.target.value);
});