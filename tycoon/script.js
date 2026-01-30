let para = 100;
let sahipOlunanİşletmeler = [];

const işletmeTipleri = [
    { id: '1', tür: 'otopark', isim: 'Otopark', maliyet: 50, gelir: 12, simge: '🅿️' },
    { id: '2', tür: 'kafe', isim: 'Kafe', maliyet: 150, gelir: 25, simge: '☕' },
    { id: '3', tür: 'market', isim: 'Mini Market', maliyet: 300, gelir: 45, simge: '🏪' },
    { id: '4', tür: 'restoran', isim: 'Restoran', maliyet: 500, gelir: 80, simge: '🍽️' },
    { id: '5', tür: 'otel', isim: 'Küçük Otel', maliyet: 1000, gelir: 150, simge: '🏨' },
    { id: '6', tür: 'fabrika', isim: 'Fabrika', maliyet: 2500, gelir: 350, simge: '🏭' },
];

const paraGösterge      = document.getElementById('money');
const toplamGelirGösterge = document.getElementById('totalIncome');
const işletmeListesiGösterge = document.getElementById('işletmeListesi');
const sahipListesiGösterge   = document.getElementById('sahipListesi');

function ekranıGüncelle() {
    paraGösterge.innerText = para.toFixed(2) + " TL";

    const toplamGelir = sahipOlunanİşletmeler.reduce((toplam, işletme) => toplam + işletme.gelir, 0);
    toplamGelirGösterge.innerText = "+" + toplamGelir + " TL/saat";

    if (sahipOlunanİşletmeler.length === 0) {
        sahipListesiGösterge.innerHTML = "<p>Henüz işletme yok. Kurmaya başla!</p>";
    } else {
        sahipListesiGösterge.innerHTML = '';
        sahipOlunanİşletmeler.forEach(işletme => {
            const div = document.createElement('div');
            div.className = 'sahip-öğe';
            div.innerHTML = `
                <div class="simge">${işletme.simge}</div>
                <div class="bilgi">
                    <div class="isim">${işletme.isim}</div>
                    <div class="gelir">+${işletme.gelir} TL/saat</div>
                </div>`;
            sahipListesiGösterge.appendChild(div);
        });
    }

    işletmeListesiGösterge.innerHTML = '';
    işletmeTipleri.forEach(işletme => {
        const kart = document.createElement('div');
        kart.className = 'kart';
        if (para < işletme.maliyet) kart.classList.add('devre-dışı');

        kart.innerHTML = `
            <div style="font-size:36px;">${işletme.simge}</div>
            <h3>${işletme.isim}</h3>
            <div class="maliyet">Maliyet: ${işletme.maliyet} TL</div>
            <div class="gelir-bilgisi">Gelir: ${işletme.gelir} TL/saat</div>`;

        if (para >= işletme.maliyet) {
            kart.onclick = () => işletmeKur(işletme);
        }

        işletmeListesiGösterge.appendChild(kart);
    });
}

function işletmeKur(işletme) {
    if (para >= işletme.maliyet) {
        para -= işletme.maliyet;
        sahipOlunanİşletmeler.push({ ...işletme, sahipId: işletme.id + '-' + Date.now() });
        ekranıGüncelle();
    }
}

function paraKazan() {
    const toplamGelir = sahipOlunanİşletmeler.reduce((toplam, işletme) => toplam + işletme.gelir, 0);
    para += toplamGelir / 3600;
    ekranıGüncelle();
}

setInterval(paraKazan, 1000);

ekranıGüncelle();