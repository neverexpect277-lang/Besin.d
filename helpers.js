/* Yardımcı fonksiyonlar — app.jsx'ten ayrıldı */
import { C, S } from "./theme.js";
import { AYETLER, BELIRSIZ_KELIMELER, ESREF, HAKKINDA, MAKAMLAR, ORGAN_DESTEK, URUN_TURLERI } from "./sabitler.js";

export const rR = r => ({ kritik: C.kirmizi, yuksek: C.kirmizi, orta: C.sari, dusuk: C.yesil }[r] || "#888");
export const rE = r => ({ kritik: "● KRİTİK", yuksek: "️ YÜKSEK", orta: " ORTA", dusuk: " DÜŞÜK" }[r] || r);

// Uygulama içi yumuşak bildirim (alert yerine). Her ekrandan çağrılabilir.
export function bdToast(mesaj) {
 if (typeof document === "undefined") return;
 let host = document.getElementById("bd-toast-host");
 if (!host) {
   host = document.createElement("div");
   host.id = "bd-toast-host";
   host.style.cssText = "position:fixed;left:50%;bottom:calc(96px + env(safe-area-inset-bottom));transform:translateX(-50%);z-index:3000;display:flex;flex-direction:column;gap:8px;align-items:center;pointer-events:none;max-width:90vw;";
   document.body.appendChild(host);
 }
 const t = document.createElement("div");
 t.textContent = mesaj;
 t.style.cssText = "background:#1D1D1F;color:#fff;font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif;font-size:13px;font-weight:600;line-height:1.4;padding:11px 16px;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.18);opacity:0;transform:translateY(8px);transition:opacity .22s ease,transform .22s ease;text-align:center;";
 host.appendChild(t);
 requestAnimationFrame(() => { t.style.opacity = "1"; t.style.transform = "translateY(0)"; });
 setTimeout(() => { t.style.opacity = "0"; t.style.transform = "translateY(8px)"; setTimeout(() => t.remove(), 250); }, 2600);
}

// Açılır/kapanır bölüm kartı
export function atmMesafe(la1, lo1, la2, lo2) {
 const R = 6371, t = x => x * Math.PI / 180;
 const dLa = t(la2 - la1), dLo = t(lo2 - lo1);
 const h = Math.sin(dLa / 2) ** 2 + Math.cos(t(la1)) * Math.cos(t(la2)) * Math.sin(dLo / 2) ** 2;
 return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

// Gerçek fotoğraf public/atm/aqua-atm.jpg eklenince otomatik görünür; yoksa SVG çizim.
export const ayetSec = org => {
 const m = { "Beyin": 1, "Sinir Sistemi": 1, "Kalp": 2, "Damar": 2, "Karaciğer": 4, "Bağırsak": 4, "Böbrekler": 3, "Pankreas": 3, "Mide": 0, "Akciğer": 5 };
 for (const o of (org || [])) if (m[o] !== undefined) return AYETLER[m[o]];
 return AYETLER[0];
};

/* ── MAKAMLAR ───────────────────────────────── */
export const esrefAktif = () => ESREF[Math.floor(new Date().getHours() / 2) % 12];

/* ── BURÇLAR ────────────────────────────────── */

export function burcHesapla(t) {
 if (!t) return null;
 const d = new Date(t), m = d.getMonth() + 1, g = d.getDate();
 if ((m === 3 && g >= 21) || (m === 4 && g <= 19)) return "Koç";
 if ((m === 4 && g >= 20) || (m === 5 && g <= 20)) return "Boğa";
 if ((m === 5 && g >= 21) || (m === 6 && g <= 20)) return "İkizler";
 if ((m === 6 && g >= 21) || (m === 7 && g <= 22)) return "Yengeç";
 if ((m === 7 && g >= 23) || (m === 8 && g <= 22)) return "Aslan";
 if ((m === 8 && g >= 23) || (m === 9 && g <= 22)) return "Başak";
 if ((m === 9 && g >= 23) || (m === 10 && g <= 22)) return "Terazi";
 if ((m === 10 && g >= 23) || (m === 11 && g <= 21)) return "Akrep";
 if ((m === 11 && g >= 22) || (m === 12 && g <= 21)) return "Yay";
 if ((m === 12 && g >= 22) || (m === 1 && g <= 19)) return "Oğlak";
 if ((m === 1 && g >= 20) || (m === 2 && g <= 18)) return "Kova";
 return "Balık";
}


/* ══════════════════════════════════════════════
 KATEGORİLER (merkezi yapı)
 ══════════════════════════════════════════════ */
export function belirsizBul(txt) {
 const b = " " + normalize(txt) + " ";
 const bulunan = [];
 for (const bk of BELIRSIZ_KELIMELER) {
 const k = " " + normalize(bk.kelime) + " ";
 if (b.includes(k)) bulunan.push(bk);
 }
 return bulunan;
}

export function normalize(s) {
 return (s || "").toUpperCase()
 .replace(/İ/g, "I").replace(/I/g, "I")
 .replace(/Ş/g, "S").replace(/Ç/g, "C")
 .replace(/Ğ/g, "G").replace(/Ü/g, "U").replace(/Ö/g, "O")
 .replace(/[()[\]{}.,;:!?'"`*\-/\\_]/g, " ")
 .replace(/\s+/g, " ").trim();
}

export function ilkSiraTespit(txt) {
 // İçindekiler listesini ayır (virgül ile)
 const t = txt.replace(/içindekiler\s*[:：]/gi, "")
              .replace(/ingredients\s*[:：]/gi, "")
              .split(/[,;]/);
 const ilk5 = t.slice(0, 5).map(s => normalize(s));
 const uyarilar = [];
 // Tehlikeli "ana içerik" listesi - bu maddeler ilk 5'te varsa kırmızı alarm
 const tehlikeli = [
 { kelimeler: ["SEKER", "SUGAR", "SAKAROZ", "SUKROZ"], ad: "Şeker", uyari: "⚠️ Ana içerik ŞEKER/SUGAR. WHO günlük serbest şeker limiti 25g (6 çay kaşığı). Bu ürün tek porsiyonda o limiti aşabilir.\n\n🩺 Sağlık Etkileri: Sürekli yüksek şeker tüketimi insülin direnci, Tip 2 diyabet, yağlı karaciğer, kalp damar hastalığı ve obezite riskini artırır. Beyindeki dopamin sistemini uyararak bağımlılık yaratır.\n\n🌙 Mizaç & Makam: Aşırı şeker Safra mizacını (Sarfravi) uyarır. Hızlı enerji → ani düşüş döngüsü ruh halini olumsuz etkiler. Rast makamı dengeleyici.\n\nAlternatif: Az miktarda ham bal, hurma, taze meyve şekeri (fruktoz + lif birlikte)." },
 { kelimeler: ["GLIKOZ SURUBU", "GLUKOZ SURUBU", "GLIKOZ FRUKTOZ", "GLUKOZ FRUKTOZ", "MISIR SURUBU", "HFCS", "NISASTA BAZLI SEKER", "NBS"], ad: "Mısır/Glikoz Şurubu (HFCS)", uyari: "Ana içerik mısır şurubu (HFCS). Doğrudan karaciğere gider, yağlanma yapar." },
 { kelimeler: ["PALMIYE YAGI", "PALM YAGI", "PALM OIL", "PALMOLEIN", "HURMA YAGI"], ad: "Palmiye Yağı", uyari: "Ana içerik PALMİYE yağı. 3-MCPD ve glisidil ester kontaminantı. Çocuk için tehlikeli." },
 { kelimeler: ["BITKISEL YAG"], ad: "Belirtilmemiş Bitkisel Yağ", uyari: "Hangi bitkisel yağ olduğu yazmamış - genelde palmiye yağıdır. Üretici gizliyor." },
 { kelimeler: ["HIDROJENE", "HIDROJENIZE", "PARTIALLY HYDROGENATED"], ad: "Hidrojenize Yağ (Trans Yağ)", uyari: "Ana içeriklerden biri HİDROJENİZE yağ. Trans yağ kalp damar hastalığı temel sebebi." },
 { kelimeler: ["MARGARIN", "MARGARINE"], ad: "Margarin", uyari: "Ana içerik MARGARİN. Bitkisel yağ + emülgatör karışımı, trans yağ kalıntısı taşır." },
 { kelimeler: ["BEYAZ UN", "RAFINE UN"], ad: "Beyaz Un", uyari: "Ana içerik rafine beyaz un. Glisemik indeks yüksek, lif ve vitamin yok." },
 { kelimeler: ["İÇME SUYU", "MINERAL SU", "ENJEKSIYON SUYU", "DOLGU SUYU", "ADDED WATER", "WATER ADDED"], ad: "Su (Dolgu)", uyari: "Ürünün ana içeriği SU. Et, peynir, süt ürünlerinde bu hile - su parasına et alıyorsunuz." },
 { kelimeler: ["SOYA PROTEIN", "SOYA UNU"], ad: "Soya Proteini", uyari: "Et ürününde ana içerik soya proteini - bu et değil, soya dolgusu. Genelde GDO." },
 { kelimeler: ["MEKANIK AYRILMIS ET", "MAE", "MDM"], ad: "Mekanik Ayrılmış Et", uyari: "Ana içerik mekanik ayrılmış et - kemik kalıntısı, kıkırdak içerir." },
 { kelimeler: ["GLIKOZ", "GLUKOZ", "GLUCOSE", "DEKSTROZ"], ad: "Glikoz/Dekstroz", uyari: "Ana içerik saf şeker (glikoz/dekstroz). Kan şekerini şokla yükseltir." },
 { kelimeler: ["FRUKTOZ"], ad: "Fruktoz", uyari: "Ana içerik fruktoz. Doğrudan karaciğere gider, yağlı karaciğer (NAFLD) sebebi." },
 { kelimeler: ["MALTODEKSTRIN"], ad: "Maltodekstrin", uyari: "Ana içerik maltodekstrin. Glisemik indeks şekerden yüksek (110), bağırsak floranı bozar." },
 { kelimeler: ["MISIR NISASTASI", "MODIFIYE NISASTA"], ad: "Modifiye Nişasta", uyari: "Ana içerik modifiye nişasta - genelde GDO mısırdan kimyasal işlemle yapılır." },
 { kelimeler: ["KOKOLIN", "KAKAO KOMPOUND", "COCOA COMPOUND"], ad: "Kakao Kompound (Çikolata Taklidi)", uyari: "Ana içerik kakao kompound, gerçek çikolata değil - palmiye yağlı kakao taklididir." },
 ];
 ilk5.forEach((parca, idx) => {
 if (!parca || parca.length < 2) return;
 for (const teh of tehlikeli) {
 for (const kw of teh.kelimeler) {
 if (parca.includes(kw)) {
 // Aynı içerik tekrar eklenmesin
 if (!uyarilar.some(u => u.ad === teh.ad)) {
 uyarilar.push({ ...teh, sira: idx + 1 });
 }
 break;
 }
 }
 }
 });
 return uyarilar;
}

export function analiz(txt, db) {
 const b = " " + normalize(txt) + " ";
 const bulgu = [], eklendi = new Set();
 // E kodlarını yakala (E100, E 100, e-100)
 const eKodlari = new Set();
 const eMatches = b.match(/\bE\s*-?\s*\d{3,4}[A-D]?\b/gi) || [];
 eMatches.forEach(m => eKodlari.add(m.replace(/[\s-]/g, "").toUpperCase()));
 // Her madde için kontrol
 for (const [k, v] of Object.entries(db)) {
 if (eklendi.has(v.ad)) continue;
 const aramalar = [k, ...(v.arar || [])];
 // E kodu var mı (anahtarda veya ararda)
 const eKodu = (k.match(/E\d{3,4}[A-D]?/i) || [])[0];
 if (eKodu && eKodlari.has(eKodu.toUpperCase())) {
 bulgu.push({ kod: k, ...v }); eklendi.add(v.ad); continue;
 }
 // Normal arama
 for (const a of aramalar) {
 const na = " " + normalize(a) + " ";
 if (na.length < 6) continue; // çok kısa kelimeler eşleşmesin
 if (b.includes(na)) {
 bulgu.push({ kod: k, ...v }); eklendi.add(v.ad); break;
 }
 }
 }
 const s = { kritik: 0, yuksek: 1, orta: 2, dusuk: 3 };
 return bulgu.sort((a, b2) => s[a.risk] - s[b2.risk]);
}

/* ══════════════════════════════════════════════
 HAKKINDA İÇERİĞİ (TAM)
 ══════════════════════════════════════════════ */
export function organDestekToparla(organlar) {
  if (!organlar || organlar.length === 0) return null;
  const bulunan = [];
  organlar.forEach(org => {
    const anahtar = Object.keys(ORGAN_DESTEK).find(k =>
      org.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(org.toLowerCase())
    );
    if (anahtar && !bulunan.find(b => b.organ === anahtar)) {
      bulunan.push({ organ: anahtar, ...ORGAN_DESTEK[anahtar] });
    }
  });
  return bulunan.slice(0, 2); // En fazla 2 organ göster, kalabalık olmasın
}

/* ══════════════════════════════════════════════
   DOĞAL TARİF VERİTABANI
   ══════════════════════════════════════════════ */
export function urunTuruTespit(metin, kategori) {
  if (!metin) return null;
  const m = metin.toLowerCase();
  // Önce GÜÇLÜ eşleşme: ürün adı/marka
  for (const tur of URUN_TURLERI) {
    if (tur.kategori !== kategori) continue;
    if (tur.urun_a && tur.urun_a.some(k => m.includes(k))) return tur;
  }
  // Sonra ZAYIF eşleşme: içerik kodu ipuçları
  for (const tur of URUN_TURLERI) {
    if (tur.kategori !== kategori) continue;
    if (tur.icerik && tur.icerik.length > 0 && tur.icerik.some(k => m.includes(k))) return tur;
  }
  return null;
}


/* ══════════════════════════════════════════════
   DOĞAL TARİF MODAL BİLEŞENİ
   ══════════════════════════════════════════════ */

/* ══════════════════════════════════════════════
   3D ORGAN PUAN SİSTEMİ
   ══════════════════════════════════════════════ */
// Her organ için anatomik konum, gerçek şekil ve renk (atlas tarzı)
// shape: SVG path data, cx/cy: etkileşim merkezi, r: tıklama bölgesi yarıçapı
