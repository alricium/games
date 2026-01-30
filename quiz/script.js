const sorular = {
    html: [
        {
            soru: "HTML'de en üst seviye başlık etiketi hangisidir?",
            secenekler: ["<title>", "<h1>", "<header>", "<h6>"],
            dogru: 1
        },
        {
            soru: "Bir paragraf oluşturmak için hangi etiket kullanılır?",
            secenekler: ["<p>", "<div>", "<span>", "<text>"],
            dogru: 0
        },
        {
            soru: "Resim eklemek için kullanılan etiket aşağıdakilerden hangisidir?",
            secenekler: ["<img>", "<picture>", "<photo>", "<image>"],
            dogru: 0
        },
        {
            soru: "Link (bağlantı) oluşturmak için hangi etiket kullanılır?",
            secenekler: ["<a>", "<link>", "<href>", "<url>"],
            dogru: 0
        },
        {
            soru: "Bir liste oluşturmak için kullanılan etiket çifti hangisidir?",
            secenekler: ["<ul> ve <li>", "<list> ve <item>", "<ol> ve <li>", "Her ikisi de: <ul> ve <ol>"],
            dogru: 3
        }
    ],

    css: [
        {
            soru: "CSS'de metin rengini değiştirmek için hangi özellik kullanılır?",
            secenekler: ["text-color", "color", "font-color", "textcolor"],
            dogru: 1
        },
        {
            soru: "Arka plan rengi vermek için hangi özellik kullanılır?",
            secenekler: ["background", "background-color", "bg-color", "color-back"],
            dogru: 1
        },
        {
            soru: "Bir elementi ortalamak için en yaygın kullanılan flex özelliği hangisidir?",
            secenekler: ["justify-content: center;", "align-items: center;", "text-align: center;", "Hepsi doğru olabilir"],
            dogru: 3
        },
        {
            soru: "CSS'de kutunun kenar boşluğunu ayarlayan özellik nedir?",
            secenekler: ["margin", "padding", "border", "spacing"],
            dogru: 0
        },
        {
            soru: "Bir elementi yuvarlak yapmak için hangi özellik kullanılır?",
            secenekler: ["border-radius", "round", "circle", "curve"],
            dogru: 0
        }
    ],

    js: [
        {
            soru: "JavaScript'te değişken tanımlamanın en modern ve önerilen yolları hangileridir?",
            secenekler: ["var", "let ve const", "const sadece", "hepsi aynıdır"],
            dogru: 1
        },
        {
            soru: "Bir koşul ifadesi yazmak için kullanılan anahtar kelime nedir?",
            secenekler: ["if", "when", "check", "condition"],
            dogru: 0
        },
        {
            soru: "Dizi (array) oluşturmak için hangi sembol kullanılır?",
            secenekler: ["{}", "[]", "()", "<>"],
            dogru: 1
        },
        {
            soru: "Bir fonksiyonu çağırmak için hangi sembol kullanılır?",
            secenekler: ["{}", "()", "[]", "->"],
            dogru: 1
        },
        {
            soru: "console.log() ne işe yarar?",
            secenekler: [
                "Ekrana yazı yazar",
                "Tarayıcı konsoluna mesaj yazar",
                "Değişken oluşturur",
                "Sayfayı yeniler"
            ],
            dogru: 1
        }
    ]
};

let secilenKonu = null;
let suankiSoru = 0;
let puan = 0;
let secimYapildi = false;

const konuSecimEkran = document.getElementById("konu-secim");
const quizEkran = document.getElementById("quiz");
const sonucEkran = document.getElementById("sonuc");

const soruEl = document.getElementById("soru");
const seceneklerEl = document.getElementById("secenekler");
const sonrakiBtn = document.getElementById("sonraki-btn");
const puanYazisi = document.getElementById("puan-yazisi");
const yorumEl = document.getElementById("yorum");
const tekrarBaslaBtn = document.getElementById("tekrar-basla");

document.querySelectorAll(".konu-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        secilenKonu = btn.dataset.konu;
        konuSecimEkran.classList.remove("active");
        konuSecimEkran.classList.add("gizli");
        quizEkran.classList.remove("gizli");
        suankiSoru = 0;
        puan = 0;
        soruyuYukle();
    });
});

function soruyuYukle() {
    const q = sorular[secilenKonu][suankiSoru];
    soruEl.textContent = q.soru;
    seceneklerEl.innerHTML = "";

    q.secenekler.forEach((secenek, index) => {
        const div = document.createElement("div");
        div.classList.add("secenek");
        div.textContent = secenek;
        div.addEventListener("click", () => secimYap(index));
        seceneklerEl.appendChild(div);
    });

    sonrakiBtn.disabled = true;
    secimYapildi = false;
}

function secimYap(index) {
    if (secimYapildi) return;
    secimYapildi = true;

    const secenekler = document.querySelectorAll(".secenek");
    secenekler.forEach(el => el.classList.remove("secili"));

    secenekler[index].classList.add("secili");

    const dogruMu = index === sorular[secilenKonu][suankiSoru].dogru;
    if (dogruMu) {
        puan++;
        secenekler[index].classList.add("dogru");
    } else {
        secenekler[index].classList.add("yanlis");
        secenekler[sorular[secilenKonu][suankiSoru].dogru].classList.add("dogru");
    }

    sonrakiBtn.disabled = false;
}

function sonucuGoster() {
    quizEkran.classList.add("gizli");
    sonucEkran.classList.remove("gizli");

    puanYazisi.textContent = `${puan} / ${sorular[secilenKonu].length}`;

    let yorum = "";
    if (puan === 5) yorum = `Vay be! ${secilenKonu.toUpperCase()} konusunda bayağı iyisin! 🔥`;
    else if (puan >= 3) yorum = `Güzel iş ${secilenKonu.toUpperCase()} için fena değil ha! Devam devam 💪`;
    else if (puan >= 1) yorum = `Başlangıç seviyesindeyiz galiba 😅 Ama pes etmek yok!`;
    else yorum = `Kanka daha yeni tanışıyoruz ${secilenKonu} ile galiba 😂 Hadi baştan!`;

    yorumEl.textContent = yorum;
}

sonrakiBtn.addEventListener("click", () => {
    suankiSoru++;
    if (suankiSoru < sorular[secilenKonu].length) {
        soruyuYukle();
    } else {
        sonucuGoster();
    }
});

tekrarBaslaBtn.addEventListener("click", () => {
    sonucEkran.classList.add("gizli");
    konuSecimEkran.classList.remove("gizli");
    konuSecimEkran.classList.add("active");
    secilenKonu = null;
    suankiSoru = 0;
    puan = 0;
});