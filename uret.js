// sablon/olustur.js'in tarayıcı sürümü (otomatik üretildi): bilgi nesnesinden tek sayfalık site HTML'i.
function siteUret(b) {
// HTML'de özel anlamı olan karakterleri (<, >, &, ") zararsız hâle getirir.
const k = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Başlıkta *yıldız arasındaki* kelimeler vurgu renginde ve italik yazılır. | işareti satır atlatır.
const baslik = (s) => k(s).replace(/\*([^*]+)\*/g, '<em>$1</em>').replace(/\s*\|\s*/g, '<br>');
const telLink = (t) => 'tel:+90' + String(t).replace(/\D/g, '').replace(/^0/, '');
const waLink = (t) => 'https://wa.me/90' + String(t).replace(/\D/g, '').replace(/^0/, '') + '?text=' + encodeURIComponent(b.whatsappMesaji || 'Merhaba, randevu almak istiyorum.');

const eksik = ['ad', 'semt', 'baslik', 'aciklama', 'whatsapp', 'adres', 'saatler', 'hizmetler', 'nedenler'].filter((x) => !b[x]);
if (eksik.length) throw new Error('Eksik alanlar: ' + eksik.join(', '));

const r = Object.assign({ zemin: '#faf7f4', vurgu: '#b0846a', vurguKoyu: '#8e6650', koyu: '#1f1a17', acik: '#f3e6dc', acikYazi: '#6b4a36', gorsel1: '#f1d9c8', gorsel2: '#d9b29a', gorsel3: '#e9d3c3', cizim: '#ffffff' }, b.renkler || {});
const GUNLER = [['Pazartesi', 1], ['Salı', 2], ['Çarşamba', 3], ['Perşembe', 4], ['Cuma', 5], ['Cumartesi', 6], ['Pazar', 0]];
const wa = waLink(b.whatsapp);
const logo = b.logo ? `${k(b.logo[0])} <span>${k(b.logo[1])}</span>${b.logo[2] ? ' ' + k(b.logo[2]) : ''}` : k(b.ad);

const html = `<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
${b.taslak !== false ? '  <!-- Önizleme: arama motorları listelemesin. Yayına alınca bilgi.json içinde "taslak": false yap. -->\n  <meta name="robots" content="noindex, nofollow">\n' : ''}  <title>${k(b.ad)} · ${k(b.semt.split('·')[0].trim())}</title>
  <meta name="description" content="${k(b.aciklama)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --zemin: ${r.zemin}; --kart: #ffffff; --yazi: #1f1a17; --soluk: #6d625b;
      --vurgu: ${r.vurgu}; --vurgu-koyu: ${r.vurguKoyu}; --cizgi: #ece4dd; --koyu: ${r.koyu}; --acik: ${r.acik};
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: Inter, system-ui, sans-serif; background: var(--zemin); color: var(--yazi); line-height: 1.6; }
    h1, h2, h3 { font-family: "Cormorant Garamond", Georgia, serif; font-weight: 600; line-height: 1.1; }
    a { color: inherit; }
    .kap { max-width: 1080px; margin: 0 auto; padding: 0 20px; }
    section { padding: 80px 0; }
    .etiket { font-size: .78rem; letter-spacing: .16em; text-transform: uppercase; color: var(--vurgu); font-weight: 600; margin-bottom: 10px; }
    h2 { font-size: clamp(2rem, 4.5vw, 2.9rem); margin-bottom: 14px; }
    .alt-yazi { color: var(--soluk); max-width: 56ch; }
    .taslak { background: var(--acik); color: ${r.acikYazi}; font-size: .85rem; text-align: center; padding: 8px 16px; }
    nav { position: sticky; top: 0; z-index: 10; background: color-mix(in srgb, var(--zemin) 92%, transparent); backdrop-filter: blur(8px); border-bottom: 1px solid var(--cizgi); }
    nav .kap { display: flex; align-items: center; justify-content: space-between; height: 64px; }
    .logo { font-family: "Cormorant Garamond", serif; font-size: 1.55rem; font-weight: 700; text-decoration: none; letter-spacing: .02em; }
    .logo span { color: var(--vurgu); }
    nav ul { display: flex; gap: 26px; list-style: none; }
    nav ul a { text-decoration: none; color: var(--soluk); font-size: .95rem; }
    nav ul a:hover { color: var(--yazi); }
    .btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 24px; border-radius: 999px; font-weight: 600; text-decoration: none; transition: transform .15s, background .15s; }
    .btn:hover { transform: translateY(-2px); }
    .btn-ana { background: var(--vurgu); color: #fff; }
    .btn-ana:hover { background: var(--vurgu-koyu); }
    .btn-ikinci { border: 1.5px solid var(--yazi); }
    .giris { padding: 88px 0 96px; }
    .giris .kap { display: grid; grid-template-columns: 1.15fr .85fr; gap: 48px; align-items: center; }
    .giris h1 { font-size: clamp(2.7rem, 7vw, 4.6rem); margin-bottom: 20px; }
    .giris h1 em { font-style: italic; color: var(--vurgu); }
    .giris p { color: var(--soluk); font-size: 1.1rem; max-width: 40ch; margin-bottom: 30px; }
    .butonlar { display: flex; flex-wrap: wrap; gap: 12px; }
    .puan { display: inline-flex; align-items: center; gap: 10px; margin-top: 28px; font-size: .95rem; color: var(--soluk); }
    .puan b { color: var(--yazi); font-size: 1.05rem; }
    .yildiz { color: #e0a63a; letter-spacing: 2px; }
    .gorsel { aspect-ratio: 4/5; border-radius: 200px 200px 24px 24px; position: relative; overflow: hidden;
      background: radial-gradient(circle at 30% 25%, ${r.gorsel1} 0%, transparent 55%), radial-gradient(circle at 75% 70%, ${r.gorsel2} 0%, transparent 60%), linear-gradient(160deg, ${r.gorsel3}, ${r.vurgu}); }
    .gorsel svg { position: absolute; inset: 0; margin: auto; width: 55%; opacity: .9; }
    .hizmetler { background: var(--kart); border-top: 1px solid var(--cizgi); border-bottom: 1px solid var(--cizgi); }
    .izgara { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 20px; margin-top: 36px; }
    .hizmet { border: 1px solid var(--cizgi); border-radius: 20px; padding: 26px; background: var(--zemin); }
    .hizmet .ikon { width: 44px; height: 44px; border-radius: 50%; background: var(--acik); display: grid; place-items: center; margin-bottom: 16px; color: var(--vurgu-koyu); }
    .hizmet h3 { font-size: 1.5rem; margin-bottom: 8px; }
    .hizmet p { color: var(--soluk); font-size: .95rem; }
    .ozel { margin-top: 20px; border-radius: 20px; padding: 22px 26px; background: var(--koyu); color: #fff; display: flex; flex-wrap: wrap; gap: 6px 16px; align-items: baseline; }
    .ozel strong { font-family: "Cormorant Garamond", serif; font-size: 1.5rem; color: ${r.cizim === '#ffffff' ? 'var(--acik)' : r.cizim}; font-weight: 600; }
    .ozel span { color: #d6d0c4; }
    .neden .kap { display: grid; grid-template-columns: .9fr 1.1fr; gap: 56px; align-items: start; }
    .maddeler { display: grid; gap: 18px; }
    .madde { display: grid; grid-template-columns: 40px 1fr; gap: 14px; }
    .madde .no { font-family: "Cormorant Garamond", serif; font-size: 1.8rem; color: var(--vurgu); line-height: 1; }
    .madde h3 { font-family: Inter, sans-serif; font-size: 1.05rem; font-weight: 600; margin-bottom: 4px; }
    .madde p { color: var(--soluk); font-size: .95rem; }
    .randevu { background: var(--koyu); color: #fff; text-align: center; }
    .randevu h2 { color: #fff; }
    .randevu p { color: #cfc4bc; margin: 0 auto 28px; max-width: 46ch; }
    .iletisim .kap { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
    .saatler { list-style: none; margin-top: 10px; }
    .saatler li { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--cizgi); }
    .saatler li.bugun { font-weight: 600; }
    .bilgi p { margin-bottom: 12px; }
    .bilgi a { color: var(--vurgu-koyu); font-weight: 500; }
    .harita { margin-top: 18px; border: 0; width: 100%; height: 240px; border-radius: 18px; }
    footer { border-top: 1px solid var(--cizgi); padding: 26px 0; color: var(--soluk); font-size: .9rem; }
    footer .kap { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px; }
    .wp { position: fixed; right: 18px; bottom: 18px; z-index: 20; width: 58px; height: 58px; border-radius: 50%; background: #25d366; display: grid; place-items: center; box-shadow: 0 6px 20px rgba(0,0,0,.2); transition: transform .15s; }
    .wp:hover { transform: scale(1.08); }
    @media (max-width: 800px) {
      nav ul { display: none; }
      section { padding: 60px 0; }
      .giris { padding: 48px 0 64px; }
      .giris .kap, .neden .kap, .iletisim .kap { grid-template-columns: 1fr; }
      .gorsel { display: none; }
      footer { padding-bottom: 96px; }
    }
  </style>
</head>
<body>
${b.taslak !== false ? `\n  <div class="taslak">Taslak önizleme · ${k(b.ad)} için hazırlandı · Henüz yayında değildir</div>\n` : ''}
  <nav>
    <div class="kap">
      <a class="logo" href="#">${logo}</a>
      <ul>
        <li><a href="#hizmetler">Hizmetler</a></li>
        <li><a href="#neden">Neden biz</a></li>
        <li><a href="#iletisim">İletişim</a></li>
      </ul>
    </div>
  </nav>

  <header class="giris">
    <div class="kap">
      <div>
        <div class="etiket">${k(b.semt)}</div>
        <h1>${baslik(b.baslik)}</h1>
        <p>${k(b.aciklama)}</p>
        <div class="butonlar">
          <a class="btn btn-ana" href="${wa}" target="_blank" rel="noopener">WhatsApp'tan randevu al</a>
          <a class="btn btn-ikinci" href="#hizmetler">Hizmetler</a>
        </div>
${b.puan ? `        <div class="puan"><span class="yildiz">★★★★★</span><span><b>${k(b.puan)}</b> · Google'da ${k(b.yorum)} yorum</span></div>\n` : ''}      </div>
      <div class="gorsel" aria-hidden="true">
        <svg viewBox="0 0 100 120" fill="none" stroke="${r.cizim}" stroke-width="2.2" stroke-linecap="round">
          <circle cx="30" cy="96" r="12"/><circle cx="70" cy="96" r="12"/>
          <path d="M38 87 L66 12 M62 87 L34 12"/>
          <circle cx="50" cy="52" r="2.5" fill="${r.cizim}"/>
        </svg>
      </div>
    </div>
  </header>

  <section id="hizmetler" class="hizmetler">
    <div class="kap">
      <div class="etiket">Hizmetler</div>
      <h2>Ne yapıyoruz?</h2>
      <p class="alt-yazi">${k(b.hizmetNotu || "Fiyatlar işleme göre değişir. En doğru bilgi için WhatsApp'tan yazabilirsin.")}</p>
      <div class="izgara">
${b.hizmetler.map((h) => `        <div class="hizmet">
          <div class="ikon">${k(h.ikon || '✦')}</div>
          <h3>${k(h.ad)}</h3>
          <p>${k(h.metin)}</p>
        </div>`).join('\n')}
      </div>
${b.ozel ? `      <div class="ozel">
        <strong>${k(b.ozel.baslik)}</strong>
        <span>${k(b.ozel.metin)}</span>
      </div>\n` : ''}    </div>
  </section>

  <section id="neden" class="neden">
    <div class="kap">
      <div>
        <div class="etiket">Neden biz</div>
        <h2>Müşterilerimizin en çok söylediği üç şey.</h2>
        <p class="alt-yazi">Google'daki yorumlardan derledik.</p>
      </div>
      <div class="maddeler">
${b.nedenler.map((n, i) => `        <div class="madde"><span class="no">0${i + 1}</span><div><h3>${k(n.baslik)}</h3><p>${k(n.metin)}</p></div></div>`).join('\n')}
      </div>
    </div>
  </section>

  <section class="randevu">
    <div class="kap">
      <h2>Randevunu bir mesajla al.</h2>
      <p>Hangi işlemi istediğini ve uygun olduğun günü yaz, en kısa sürede dönelim.</p>
      <a class="btn btn-ana" href="${wa}" target="_blank" rel="noopener">WhatsApp'tan yaz</a>
    </div>
  </section>

  <section id="iletisim" class="iletisim">
    <div class="kap">
      <div>
        <div class="etiket">Çalışma saatleri</div>
        <h2>Ne zaman açığız?</h2>
        <ul class="saatler" id="saatler">
${GUNLER.map(([g, n]) => `          <li data-gun="${n}"><span>${g}</span><span>${k(b.saatler[g] || 'Kapalı')}</span></li>`).join('\n')}
        </ul>
      </div>
      <div class="bilgi">
        <div class="etiket">İletişim</div>
        <h2>Bize ulaş</h2>
        <p>${k(b.adres)}</p>
        <p>${(b.telefonlar || [b.whatsapp]).map((t) => `<a href="${telLink(t)}">${k(t)}</a>`).join(' · ')}</p>
${b.instagram ? `        <p><a href="https://www.instagram.com/${k(b.instagram)}/" target="_blank" rel="noopener">Instagram: @${k(b.instagram)}</a></p>\n` : ''}        <iframe class="harita" title="${k(b.ad)} konumu" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=${encodeURIComponent(b.haritaSorgu || b.ad + ', ' + b.adres)}&output=embed"></iframe>
      </div>
    </div>
  </section>

  <footer>
    <div class="kap">
      <span>© ${new Date().getFullYear()} ${k(b.ad)}</span>
      <span>${k(b.semt.split('·')[0].trim())}, İstanbul</span>
    </div>
  </footer>

  <a class="wp" href="${wa}" target="_blank" rel="noopener" aria-label="WhatsApp ile yaz">
    <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3z"/></svg>
  </a>

  <script>
    var bugun = document.querySelector('#saatler li[data-gun="' + new Date().getDay() + '"]');
    if (bugun) bugun.classList.add('bugun');
  </script>
</body>
</html>
`;
  return html;
}
