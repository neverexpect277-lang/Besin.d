import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
/* Veritabanları kategori bazında data/ altına ayrıldı */
import { GIDA_DB } from "./data/gida.js";
import { GIYIM_DB } from "./data/giyim.js";
import { EV_DB } from "./data/ev.js";
import { KOZMETIK_DB } from "./data/kozmetik.js";
import { TEMIZLIK_DB } from "./data/temizlik.js";
import { BEBEK_DB } from "./data/bebek.js";
import { EVCIL_DB } from "./data/evcil.js";
import { ILAC_DB } from "./data/ilac.js";
import { C, css, S } from "./theme.js";

/* ══════════════════════════════════════════════
 SABITLER
 ══════════════════════════════════════════════ */
const rR = r => ({ kritik: C.kirmizi, yuksek: C.kirmizi, orta: C.sari, dusuk: C.yesil }[r] || "#888");
const rE = r => ({ kritik: "● KRİTİK", yuksek: "️ YÜKSEK", orta: " ORTA", dusuk: " DÜŞÜK" }[r] || r);

// Uygulama içi yumuşak bildirim (alert yerine). Her ekrandan çağrılabilir.
function bdToast(mesaj) {
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
function BolumKart({ ikon, renk, baslik, ozet, items }) {
 const [ac, setAc] = useState(false);
 return (
 <div style={{ marginBottom: 10 }}>
 <div onClick={() => setAc(!ac)} style={{ background: C.y, border: `1px solid ${ac ? renk : C.s}`, borderRadius: 14, padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
 <span style={{ fontSize: 22 }}>{ikon}</span>
 <div style={{ flex: 1 }}>
 <div style={{ color: ac ? renk : C.metin, fontWeight: 700, fontSize: 14 }}>{baslik}</div>
 <div style={{ color: C.cok, fontSize: 11, marginTop: 2 }}>{ozet}</div>
 </div>
 <span style={{ color: ac ? renk : C.cok, fontSize: 14 }}>{ac ? "▲" : "▼"}</span>
 </div>
 {ac && (
 <div style={{ background: C.y2, border: `1px solid ${renk}30`, borderRadius: "0 0 14px 14px", padding: 16 }}>
 {items.map((item, i) => (
 <div key={i} style={{ borderBottom: i < items.length - 1 ? `1px solid ${C.s}` : "none", paddingBottom: i < items.length - 1 ? 14 : 0, marginBottom: i < items.length - 1 ? 14 : 0 }}>
 <div style={{ color: renk, fontWeight: 700, fontSize: 13, marginBottom: 6 }}> {item.t}</div>
 <div style={{ color: C.soluk, fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-line" }}>{item.a}</div>
 </div>
 ))}
 </div>
 )}
 </div>
 );
}

/* ── SU ATM · Aqua ATM (Besin Dedektifi) ──────── */
const ATM_KONUMLAR = [
 { ad: "Şahinbey · Karataş", not: "Besin Dedektifi · Aqua ATM", lat: 37.0380, lng: 37.3300, durum: "Yakında" },
 { ad: "Şehitkamil · Kale önü", not: "Besin Dedektifi · Aqua ATM", lat: 37.0647, lng: 37.3829, durum: "Yakında" },
];

// Haversine — iki konum arası km
function atmMesafe(la1, lo1, la2, lo2) {
 const R = 6371, t = x => x * Math.PI / 180;
 const dLa = t(la2 - la1), dLo = t(lo2 - lo1);
 const h = Math.sin(dLa / 2) ** 2 + Math.cos(t(la1)) * Math.cos(t(la2)) * Math.sin(dLo / 2) ** 2;
 return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

// Gerçek fotoğraf public/atm/aqua-atm.jpg eklenince otomatik görünür; yoksa SVG çizim.
function AquaAtmGorsel() {
 const base = import.meta.env.BASE_URL || "/";
 const [hata, setHata] = useState(false);
 if (!hata) {
   return <img src={base + "atm/aqua-atm.jpg"} alt="Aqua ATM — Besin Dedektifi su otomatı" onError={() => setHata(true)} style={{ width: "100%", borderRadius: 16, border: `1px solid ${C.s}`, display: "block" }} />;
 }
 return (
   <svg viewBox="0 0 360 220" width="100%" style={{ display: "block", borderRadius: 16, border: `1px solid ${C.s}` }}>
     <rect x="0" y="0" width="360" height="220" rx="16" fill="url(#atmBg)" />
     <defs>
       <linearGradient id="atmBg" x1="0" y1="0" x2="1" y2="1">
         <stop offset="0" stopColor="#EAF4FB" /><stop offset="1" stopColor={C.altin + "14"} />
       </linearGradient>
     </defs>
     <circle cx="300" cy="44" r="6" fill="#7FB8D9" opacity="0.4" />
     <circle cx="320" cy="80" r="4" fill="#7FB8D9" opacity="0.3" />
     <circle cx="48" cy="60" r="5" fill="#7FB8D9" opacity="0.35" />
     <circle cx="40" cy="150" r="7" fill="#7FB8D9" opacity="0.25" />
     {/* gövde */}
     <rect x="126" y="32" width="108" height="156" rx="14" fill="#FFFFFF" stroke={C.altin} strokeWidth="2.5" />
     {/* üst bant */}
     <path d="M126 46 a14 14 0 0 1 14 -14 h80 a14 14 0 0 1 14 14 v8 h-108 z" fill={C.altin} />
     <text x="180" y="48" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="700" fill="#fff" letterSpacing="0.5">BESİN DEDEKTİFİ</text>
     {/* ekran */}
     <rect x="140" y="68" width="80" height="46" rx="6" fill="#10243A" />
     <path d="M180 80 C188 92 192 98 180 106 C168 98 172 92 180 80 Z" fill="#7FB8D9" />
     {/* dolum bölmesi */}
     <rect x="150" y="124" width="60" height="38" rx="6" fill="#F2F6FA" stroke="#CBD5E0" strokeWidth="1.5" />
     <rect x="178" y="120" width="4" height="16" rx="2" fill="#7FB8D9" opacity="0.7" />
     <rect x="169" y="138" width="22" height="20" rx="3" fill="none" stroke="#7FB8D9" strokeWidth="1.5" />
     <rect x="169" y="150" width="22" height="8" rx="2" fill="#7FB8D9" opacity="0.5" />
     {/* taban */}
     <rect x="140" y="172" width="80" height="8" rx="3" fill={C.altin} opacity="0.8" />
     <text x="180" y="208" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="700" fill={C.altin} letterSpacing="0.3">Aqua ATM · C Vitaminli Su</text>
   </svg>
 );
}

function SuAtmSekmesi() {
 const [konum, setKonum] = useState(null);
 const [durum, setDurum] = useState("");
 const [yukleniyor, setYukleniyor] = useState(false);

 const enYakinBul = () => {
   if (!navigator.geolocation) { setDurum("Cihazınız konum servisini desteklemiyor."); return; }
   setYukleniyor(true); setDurum("Konumun alınıyor…");
   navigator.geolocation.getCurrentPosition(
     pos => { setKonum({ lat: pos.coords.latitude, lng: pos.coords.longitude }); setDurum(""); setYukleniyor(false); },
     () => { setDurum("Konum alınamadı — izin verip tekrar dene."); setYukleniyor(false); },
     { enableHighAccuracy: true, timeout: 10000 }
   );
 };

 const liste = konum
   ? [...ATM_KONUMLAR].map(k => ({ ...k, mesafe: atmMesafe(konum.lat, konum.lng, k.lat, k.lng) })).sort((a, b) => a.mesafe - b.mesafe)
   : ATM_KONUMLAR;

 const rozetler = ["C Vitaminli Su", "Ozon Dezenfeksiyon", "Kendi Şişeni Doldur", "11.5 pH'a kadar Alkali", "Plastik Atığını Azalt"];
 const fiyatlar = [
   { miktar: "5 Lt", fiyat: "15 ₺" },
   { miktar: "19 Lt", fiyat: "50 ₺" },
 ];

 return (
   <div>
     <div style={{ textAlign: "center", padding: "4px 0 12px" }}>
       <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, color: C.altin, fontWeight: 700, letterSpacing: 0.5 }}>Su ATM</div>
       <div style={{ color: C.cok, fontSize: 9, marginTop: 4, letterSpacing: 2.5, textTransform: "uppercase", fontWeight: 700 }}>· Aqua ATM × Besin Dedektifi ·</div>
     </div>

     <AquaAtmGorsel />

     <div style={{ marginTop: 14, color: C.metin, fontSize: 14, lineHeight: 1.65 }}>
       <b style={{ color: C.altin }}>Yakında Antep'te hizmette.</b> Kaliteli, C vitaminli suyu uygun fiyatla sizlerle buluşturuyoruz. Kendi şişeni getir, ozonla dezenfekte edilmiş suyu doldur — hem cebine hem doğaya iyi gelsin.
     </div>

     <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
       {rozetler.map(r => (
         <span key={r} style={{ background: `${C.altin}14`, border: `1px solid ${C.altin}40`, color: C.altin, fontSize: 11, fontWeight: 700, padding: "5px 10px", borderRadius: 20 }}>{r}</span>
       ))}
     </div>

     {/* FİYAT LİSTESİ */}
     <div style={{ marginTop: 18 }}>
       <div style={S.kB}>FİYAT LİSTESİ</div>
       <div style={{ display: "flex", gap: 8 }}>
         {fiyatlar.map(f => (
           <div key={f.miktar} style={{ flex: 1, background: `linear-gradient(135deg, ${C.altin}14, ${C.y2})`, border: `1px solid ${C.altin}40`, borderRadius: 14, padding: "14px 10px", textAlign: "center" }}>
             <div style={{ color: C.soluk, fontSize: 12, fontWeight: 700 }}>{f.miktar}</div>
             <div style={{ color: C.altin, fontSize: 24, fontWeight: 800, lineHeight: 1.1, marginTop: 4 }}>{f.fiyat}</div>
           </div>
         ))}
       </div>
       <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
         <div style={{ flex: 1, background: C.y2, border: `1px solid ${C.s}`, borderRadius: 12, padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
           <span style={{ color: C.soluk, fontSize: 12, fontWeight: 700 }}>C Vitaminli</span>
           <span style={{ color: C.altin, fontSize: 13, fontWeight: 800 }}>✓ Var</span>
         </div>
         <div style={{ flex: 1, background: C.y2, border: `1px solid ${C.s}`, borderRadius: 12, padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
           <span style={{ color: C.soluk, fontSize: 12, fontWeight: 700 }}>pH Değeri</span>
           <span style={{ color: C.altin, fontSize: 13, fontWeight: 800 }}>11.5'a kadar</span>
         </div>
       </div>
     </div>

     {/* HARİTA / KONUMLAR */}
     <div style={{ marginTop: 22 }}>
       <div style={S.kB}>BESİN DEDEKTİFİ SU ATM MAKİNA KONUMLARI</div>
       <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, marginBottom: 10 }}>En yakın makina cihaz konumuna göre sıralanır.</div>

       <button onClick={enYakinBul} disabled={yukleniyor} style={{ width: "100%", background: konum ? C.y2 : `${C.altin}14`, color: C.altin, border: `1px solid ${C.altin}66`, borderRadius: 12, padding: "11px", fontWeight: 700, fontSize: 13, cursor: yukleniyor ? "default" : "pointer", fontFamily: "inherit", marginBottom: durum ? 6 : 10 }}>
         {konum ? "↻ Konumu Güncelle" : "◎ En Yakın ATM'yi Bul"}
       </button>
       {durum && <div style={{ color: C.soluk, fontSize: 12, textAlign: "center", marginBottom: 10 }}>{durum}</div>}

       {liste.map((k, i) => (
         <div key={k.ad} style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 14, padding: 14, marginBottom: 8, borderLeft: `4px solid ${C.altin}` }}>
           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
             <div>
               <div style={{ color: C.metin, fontWeight: 700, fontSize: 14 }}>{k.ad}</div>
               <div style={{ color: C.altin, fontSize: 11, fontWeight: 600, marginTop: 2 }}>{k.not}</div>
               {k.mesafe != null && <div style={{ color: C.soluk, fontSize: 12, marginTop: 4 }}>≈ {k.mesafe < 1 ? Math.round(k.mesafe * 1000) + " m" : k.mesafe.toFixed(1) + " km"} uzakta</div>}
             </div>
             <span style={{ background: `${C.altin}18`, color: C.altin, fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 6, letterSpacing: 0.3, whiteSpace: "nowrap" }}>{k.durum}</span>
           </div>
           <button onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${k.lat},${k.lng}`, "_blank", "noopener")} style={{ marginTop: 10, width: "100%", background: C.y2, color: C.altin, border: `1px solid ${C.s}`, borderRadius: 10, padding: "9px", fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>Yol Tarifi</button>
         </div>
       ))}
     </div>

     {/* BAYİLİK + İLETİŞİM */}
     <div style={{ marginTop: 22 }}>
       <div style={S.kB}>BAYİLİK & İLETİŞİM</div>
       <div style={{ background: `linear-gradient(135deg, ${C.altin}1A, ${C.y2})`, border: `1px solid ${C.altin}55`, borderRadius: 14, padding: 16, marginBottom: 10 }}>
         <div style={{ color: C.altin, fontWeight: 700, fontSize: 13, marginBottom: 6, letterSpacing: 0.3 }}>◆ ANA BAYİ — ANTEP</div>
         <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.65 }}>Antep'teki Besin Dedektifi Su ATM makinaları, üzerinde <b>"Besin Dedektifi"</b> ibaresiyle hizmet veriyor. <b>11.5 pH'a kadar</b> alkali, C vitaminli ve uygun fiyatlı su.</div>
       </div>
       <div style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 14, padding: 16 }}>
         <div style={{ color: C.altin, fontWeight: 700, fontSize: 13, marginBottom: 6, letterSpacing: 0.3 }}>◆ BAYİLİK İÇİN</div>
         <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.65, marginBottom: 12 }}>Kendi makinan mı var? Besin Dedektifi haritasına eklenmek ve müşterilerinin seni bulması için aylık <b>100₺</b> abonelik ücreti karşılığında yerini ekleyebilirsin. Bayilik ve iş birliği için bize e-posta gönder.</div>
         <a href={`mailto:besindedektifii@gmail.com?subject=${encodeURIComponent("Su ATM Bayilik Başvurusu")}`} style={{ display: "block", width: "100%", background: C.altin, color: "#fff", padding: "12px", borderRadius: 12, fontWeight: 700, fontSize: 14, textDecoration: "none", textAlign: "center", boxSizing: "border-box" }}>Bayilik için Mail Gönder</a>
         <div style={{ color: C.cok, fontSize: 11, marginTop: 8, textAlign: "center" }}>besindedektifii@gmail.com</div>
       </div>
       <div style={{ color: C.cok, fontSize: 11, lineHeight: 1.6, marginTop: 12, padding: 12, background: C.y2, borderRadius: 8, fontStyle: "italic", border: `1px dashed ${C.s}` }}>
         Fiyatlar ve hizmet durumu bölgeye göre değişebilir. Bilgiler tanıtım amaçlıdır.
       </div>
     </div>
   </div>
 );
}

/* ── YASAL ──────────────────────────────────── */
const YASAL = [
 "Bu uygulama bir tıbbi cihaz, teşhis aracı veya ilaç değildir.",
 "Verilen bilgiler hiçbir şekilde tıbbi tavsiye, teşhis veya tedavi yerine geçmez.",
 "Tüm kararlar kullanıcının kendi sorumluluğundadır.",
 "Uygulama; EFSA, WHO, IARC ve Türk Gıda Kodeksi'ndeki kamuya açık verileri arşivlemektedir.",
 "Hiçbir firmayı, markayı veya ürünü suçlamaz; yalnızca madde bazlı arşiv bilgisi sunar.",
];

/* ── ŞİFA AYETLERİ ──────────────────────────── */
const AYETLER = [
 { sure: "Şuara 80", metin: "Hastalandığımda bana şifa veren O'dur." },
 { sure: "İsra 82", metin: "Biz Kur'an'dan müminler için şifa ve rahmet olan şeyler indiriyoruz." },
 { sure: "Yunus 57", metin: "Ey insanlar! Size Rabbinizden bir öğüt, kalplerdekine bir şifa geldi." },
 { sure: "Nahl 69", metin: "Onun karınlarından türlü renklerde şerbet çıkar; onda insanlar için şifa vardır." },
 { sure: "Tevbe 14", metin: "...ve mü'min topluluğun göğüslerini şifalandırır." },
 { sure: "Fussilet 44", metin: "De ki: O, iman edenler için doğru yolu gösteren ve şifadır." },
];
const ayetSec = org => {
 const m = { "Beyin": 1, "Sinir Sistemi": 1, "Kalp": 2, "Damar": 2, "Karaciğer": 4, "Bağırsak": 4, "Böbrekler": 3, "Pankreas": 3, "Mide": 0, "Akciğer": 5 };
 for (const o of (org || [])) if (m[o] !== undefined) return AYETLER[m[o]];
 return AYETLER[0];
};

/* ── MAKAMLAR ───────────────────────────────── */
const MAKAMLAR = {
 "Rast": { organ: "Beyin · Kemik · Genel", etki: "Neşe, zihin açıklığı, akıl sağlığı düzenleyici, ruh dengesi", vakit: "Sabah namazı sonrası", aletler: "Ney, Ud", renk: "#FFD700" },
 "Irak": { organ: "Beyin · Sinir · Zihin", etki: "Konsantrasyon, sükûnet, korkuyu defetme; menenjit ve zihin/sinir hastalıkları için", vakit: "Sabah ve Öğleden sonra", aletler: "Ney, Rebab, Kopuz (Ud)", renk: "#8B1538" },
 "İsfahan": { organ: "Sinir · Zihin · Üreme (Kadın)", etki: "Güven, hareket, uyum, zihin açıklığı; ateşli hastalıklar ve kadın hastalıkları için", vakit: "İkindi–Akşam", aletler: "Ney, Rebab, Kopuz (Ud)", renk: "#38BDF8" },
 "Zirefkend": { organ: "Sırt · Bel · Eklem · Yüz", etki: "Neşe verici; sırt, kas ve eklem ağrılarına, yüz felcine iyi gelir", vakit: "Gece yarısından sonra", aletler: "Ney, Rebab, Kopuz (Ud)", renk: "#0EA5E9" },
 "Büzürk": { organ: "Kalp · Ciğer · Zihin", etki: "Vesvese ve korkuyu def eder, zihni temizler; ateşli hastalıklar, ciğer ve kalp için", vakit: "Akşam geç vakit", aletler: "Ney, Rebab, Kopuz (Ud)", renk: "#B8860B" },
 "Zengule": { organ: "Kalp", etki: "Kalp hastalıklarının devası", vakit: "Gün batımı sonrası", aletler: "Ney, Rebab, Kopuz (Ud)", renk: "#65A30D" },
 "Rehavi": { organ: "Baş · Burun · Ağız", etki: "Baş ağrısı, burun kanaması, ağız çarpıklığı ve balgamdan gelen hastalıklar için", vakit: "Şafak ve İkindi", aletler: "Ney, Rebab, Kopuz (Ud)", renk: "#F472B6" },
 "Hüseyni": { organ: "İç Organlar · Bağırsak", etki: "Rahatlık, sükûnet, iç huzur; iç organları (özellikle bağırsak) düzenleyici", vakit: "Sabah erken", aletler: "Ney, Tanbur", renk: "#FF6B6B" },
 "Hicaz": { organ: "Ürogenital · Kemik · Göğüs", etki: "Çocuk hastalıkları, kemik sağlığı, böbrek, göğüs; alçakgönüllülük ve dua hissi", vakit: "Akşam", aletler: "Ud, Keman", renk: "#3B82F6" },
 "Nihavend": { organ: "Ruh · Sinir · Lenf", etki: "Genel sükûnet, melankoli giderici, sinir dengesi, kemik", vakit: "Gece — yatsı sonrası", aletler: "Ney, Tanbur", renk: "#6366F1" },
 "Neva": { organ: "Bağırsak · Dolaşım · Bacak", etki: "Sindirim, dolaşım, hava-su dengesi, bacak", vakit: "Öğle vakti", aletler: "Ney, Keman", renk: "#84CC16" },
 "Uşşak": { organ: "Lenf · Ayak · Bağışıklık", etki: "Bağışıklık, lenf düzeni, ayak sağlığı, uyku, ruh hali dengesi", vakit: "Öğle–Öğleden sonra", aletler: "Ney, Tanbur", renk: "#4ECDC4" },
};

/* ── EŞREF SAATLERİ ─────────────────────────── */
const ESREF = [
 { saat: "03–05", organ: "Akciğer", ikon: "", eylem: "Derin nefes egzersizleri" },
 { saat: "05–07", organ: "Kalın Bağırsak", ikon: "", eylem: "Bol su, sabah hareketi" },
 { saat: "07–09", organ: "Mide", ikon: "️", eylem: "Hafif ve kaliteli kahvaltı vakti" },
 { saat: "09–11", organ: "Dalak/Pankreas", ikon: "", eylem: "Zihinsel çalışma, enerji zirvesi" },
 { saat: "11–13", organ: "Kalp", ikon: "️", eylem: "Hafif öğle yemeği" },
 { saat: "13–15", organ: "İnce Bağırsak", ikon: "", eylem: "Dinlenme, sindirim" },
 { saat: "15–17", organ: "Mesane", ikon: "", eylem: "Bol su, fiziksel aktivite" },
 { saat: "17–19", organ: "Böbrekler", ikon: "", eylem: "Erken ve hafif akşam yemeği" },
 { saat: "19–21", organ: "Perikard", ikon: "", eylem: "Aile vakti, rahatlama" },
 { saat: "21–23", organ: "Üç Isıtıcı", ikon: "", eylem: "Dijital detoks, uyku hazırlığı" },
 { saat: "23–01", organ: "Safra Kesesi", ikon: "", eylem: "Uyku — safra kendini onarıyor" },
 { saat: "01–03", organ: "Karaciğer", ikon: "", eylem: "Derin uyku — karaciğer detoksu" },
];
const esrefAktif = () => ESREF[Math.floor(new Date().getHours() / 2) % 12];

/* ── BURÇLAR ────────────────────────────────── */

const MIZAC_MARKET = {
  "Safravi": {
    aciklama: "Ateş mizacı. İbn Sina'ya göre safra fazlalığında soğutucu ve nemlendirici gıdalar önerilir.",
    kaynak: "İbn Sina, El-Kanun fi't-Tıb, Cilt 1; Galen, De Temperamentis; Hippokrates, Doğa Üzerine",
    al: [
      { ad: "Yoğurt", neden: "Balgami denge sağlar, safrayı serinletir", ikon: "🥛" },
      { ad: "Salatalık", neden: "Soğuk-nemli yapısıyla safravi ısıyı dengeler", ikon: "🥒" },
      { ad: "Nane", neden: "İbn Sina: nane safra kesecini rahatlatır", ikon: "🌿" },
      { ad: "Ayran", neden: "Laktik asit safra asitini nötrler", ikon: "🥤" },
      { ad: "Elma", neden: "Pektin karaciğer detoksunu destekler", ikon: "🍎" },
      { ad: "Zeytinyağı", neden: "Galen: soğuk sıkım zeytin safra akışını düzenler", ikon: "🫒" },
      { ad: "Rezene tohumu", neden: "Osmanlı tabiplerine göre safra gazını giderir", ikon: "🌱" },
      { ad: "Kefir", neden: "Bağırsak florası safra emilimini dengeler", ikon: "🥛" },
    ],
    kacin: [
      { ad: "Acı biber", neden: "Safravi mizacı ateşler, sindirim bozar" },
      { ad: "Kızartma", neden: "Trans yağ safra kesesine yük bindirer" },
      { ad: "Kafein", neden: "Sempatik sinir sistemi aşırı aktive — safravi için tetikleyici" },
      { ad: "Alkol", neden: "Karaciğer safra üretimini bozar" },
    ]
  },
  "Balgami": {
    aciklama: "Su mizacı. Hippokrates'e göre balgam fazlalığında uyarıcı ve kurutucu gıdalar önerilir.",
    kaynak: "Hippokrates, Peri Physion; İbn Sina El-Kanun; Ayurveda Kapha tipi",
    al: [
      { ad: "Zencefil", neden: "İbn Sina: kök zencefil balgamı kurutur, sindirimi ateşler", ikon: "🫚" },
      { ad: "Sarımsak", neden: "Galen: sarımsak balgami soğukluğu ısıtır", ikon: "🧄" },
      { ad: "Zerdeçal", neden: "Kurkumin balgam kaynaklı iltihabı azaltır", ikon: "🌿" },
      { ad: "Greyfurt", neden: "Sitrik asit balgami tembelliği uyarır", ikon: "🍊" },
      { ad: "Brokoli", neden: "Sülforan bağışıklığı aktive eder", ikon: "🥦" },
      { ad: "Tarçın", neden: "Osmanlı tababeti: tarçın balgami uyuşukluğu giderir", ikon: "🌿" },
      { ad: "Nar", neden: "Antioksidan balgami lenf tıkanıklığını açar", ikon: "🍎" },
      { ad: "Kırmızı soğan", neden: "Kuersetin balgami solunum yolunu açar", ikon: "🧅" },
    ],
    kacin: [
      { ad: "Süt", neden: "Balgami arttırır, lenfi yavaşlatır" },
      { ad: "Şeker", neden: "Balgami enerji düşüklüğünü artırır" },
      { ad: "Muz", neden: "Soğuk nemli yapısı balgamı besler" },
      { ad: "Dondurma", neden: "Soğuk gıdalar balgam salgısını artırır" },
    ]
  },
  "Demevi": {
    aciklama: "Hava mizacı. Galen'e göre dem (kan) fazlalığında hafif ve serinletici gıdalar önerilir.",
    kaynak: "Galen, De Temperamentis; Paracelsus; İbn Bacce — Osmanlı tababeti",
    al: [
      { ad: "Yaban mersini", neden: "Antosiyanin kan kalitesini iyileştirir", ikon: "🫐" },
      { ad: "Ispanak", neden: "Demir + folik asit kan üretimini dengeler", ikon: "🥬" },
      { ad: "Nar suyu", neden: "Galen: nar kan akışkanlığını düzenler", ikon: "🍷" },
      { ad: "Keten tohumu", neden: "Omega-3 kan viskozitesini azaltır", ikon: "🌾" },
      { ad: "Kiraz", neden: "Osmanlı tababeti: kiraz dem mizacına soğutucu etki", ikon: "🍒" },
      { ad: "Yeşil çay", neden: "Kateşin dolaşım sistemini aktive eder", ikon: "🍵" },
      { ad: "Brokoli", neden: "K vitamini damar sağlığını destekler", ikon: "🥦" },
      { ad: "Ceviz", neden: "Omega-3 beyin ve dolaşım dengesi", ikon: "🥜" },
    ],
    kacin: [
      { ad: "Kırmızı et fazla", neden: "Dem mizacında kan koyuluğunu artırır" },
      { ad: "Tuzlu gıda", neden: "Sodyum damar basıncını yükseltir" },
      { ad: "Alkol", neden: "Dem mizacında kan basıncını aşırı artırır" },
      { ad: "İşlenmiş et", neden: "Nitrit damar iltihabını tetikler" },
    ]
  },
  "Sevdevi": {
    aciklama: "Toprak mizacı. İbn Sina'ya göre sevda (kara safra) fazlalığında ısıtıcı ve neşelendirici gıdalar önerilir.",
    kaynak: "İbn Sina El-Kanun Cilt 1; Hippokrates Melankoli Teorisi; Razi — El-Havi",
    al: [
      { ad: "Safran", neden: "İbn Sina: safran sevdevi karamsarlığı giderir, kalbi ferahlatır", ikon: "🌿" },
      { ad: "Bal", neden: "Razi: bal sevdevi soğukluğu ısıtır, sindirimi destekler", ikon: "🍯" },
      { ad: "Badem", neden: "Magnezyum sinir sistemini dengeler", ikon: "🥜" },
      { ad: "Ananas", neden: "Bromelain sindirim enzimlerini destekler", ikon: "🍍" },
      { ad: "Zerdeçal", neden: "Curcumin sevdevi iltihaplanmayı azaltır", ikon: "🌿" },
      { ad: "Portakal", neden: "C vitamini sevdevi yorgunluğu giderir", ikon: "🍊" },
      { ad: "Kırmızı biber", neden: "Osmanlı tababeti: kırmızı biber sevdevi soğukluğu dağıtır", ikon: "🫑" },
      { ad: "Biberiye", neden: "Rosmarinik asit bellek ve ruh halini destekler", ikon: "🌿" },
    ],
    kacin: [
      { ad: "Soğuk su", neden: "Sevdevi mizacı daha da soğutur" },
      { ad: "Konserve gıda", neden: "BPA sevdevi hormonal dengesini bozar" },
      { ad: "Şeker", neden: "Kan şekeri dalgalanması sevdevi ruh halini bozar" },
      { ad: "İşlenmiş tahıl", neden: "Rafine karbonhidrat sevdevi enerjisini tüketir" },
    ]
  }
};

const BURC_EMOJI = { "Koç": "", "Boğa": "", "İkizler": "", "Yengeç": "", "Aslan": "", "Başak": "", "Terazi": "", "Akrep": "", "Yay": "", "Oğlak": "", "Kova": "", "Balık": "" };
const BURCLAR = {
 "Koç": { element: "Ateş", mizac: "Safravi", organ: "Baş · Beyin · Yüz", renk: "#FF4444", makam: "Rast", zikir: "Ya Kaviy — 99 kere", bitki: "Nane · Biberiye · Zerdeçal", tavsiye: "Soğutucu gıdalar: salatalık, nane, yoğurt, ayran. Acı baharatlardan ve aşırı sıcaktan kaçın.", kacinmasi: ["MSG", "E621", "kafein", "trans yağ", "BHA"] },
 "Boğa": { element: "Toprak" , mizac: "Sevdevi", organ: "Boyun · Boğaz · Tiroid", renk: "#C8961E", makam: "Irak", zikir: "Ya Sabur — 298 kere", bitki: "Papatya · Ihlamur · Adaçayı", tavsiye: "Fosfat grubundan kaçın. Sıcak içecekler ve ılık çorbalar tercih et. Boğaz için ıhlamur ve bal.", kacinmasi: ["E250", "E338", "E450", "E452", "MISIR ŞURUBU"] },
 "İkizler": { element: "Hava", mizac: "Demevi", organ: "Akciğer · Sinir · Eller", renk: "#FFD700", makam: "İsfahan", zikir: "Ya Alim — 150 kere", bitki: "Lavanta · Kekik · Okaliptüs", tavsiye: "Sülfit grubundan kaçın. Düzenli nefes egzersizleri ve açık hava yürüyüşleri. Okaliptüs buharı.", kacinmasi: ["E951", "TRANS YAĞ", "E471", "BHT", "E220"] },
 "Yengeç": { element: "Su", mizac: "Balgami", organ: "Mide · Göğüs · Lenf", renk: "#4488FF", makam: "Zirefkend", zikir: "Ya Latif — 129 kere", bitki: "Papatya · Zencefil · Rezene", tavsiye: "Mide dostu: probiyotik, bol su, taze zencefil çayı. Soğuk ve çiğ gıdalardan uzak dur.", kacinmasi: ["E102", "E211", "E407", "TİTANYUM DİOKSİT", "E466"] },
 "Aslan": { element: "Ateş", mizac: "Safravi", organ: "Kalp · Sırt · Omurga", renk: "#FF8C00", makam: "Büzürk", zikir: "Ya Celil — 73 kere", bitki: "Zeytin yaprağı · Sarımsak · Enginar", tavsiye: "Kalp için: zeytinyağı, fıstık yağı, taze sarımsak, nar. Kızartmadan kaçın. Haşlama veya fırın tercih et.", kacinmasi: ["E471", "PALMİYE YAĞI", "TRANS YAĞ", "E635", "E150D"] },
 "Başak": { element: "Toprak" , mizac: "Sevdevi", organ: "Bağırsak · Dalak · Pankreas", renk: "#228B22", makam: "Zengule", zikir: "Ya Hakim — 78 kere", bitki: "Kimyon · Rezene · Zencefil", tavsiye: "Nitrit grubundan kaçın. Bol probiyotik (kefir, yoğurt) ve lifli sebzeler. Aç karın sirke kontrendike.", kacinmasi: ["E250", "SODYUM NİTRİT", "NİTRİT", "RAFINE ŞEKER"] },
 "Terazi": { element: "Hava", mizac: "Demevi", organ: "Böbrekler · Bel · Cilt", renk: "#DA70D6", makam: "Rehavi", zikir: "Ya Adl — 29 kere", bitki: "Maydanoz · Kiraz sapı · Mısır püskülü", tavsiye: "Böbrekler için günde 2-2.5L su ve maydanoz çayı. Tuz alımını azalt, oksalat yüksek gıdalardan kaçın.", kacinmasi: ["E951", "E102", "BHT", "E635", "E127"] },
 "Akrep": { element: "Su", mizac: "Balgami", organ: "Üreme · Mesane · Boşaltım", renk: "#8B0000", makam: "Hüseyni", zikir: "Ya Mumit — 97 kere", bitki: "Kızılcık · Hibiskus · Nar", tavsiye: "Detoks için: kızılcık, nar suyu, ekşi vişne. Benzoat grubundan kaçın. Bol su ve antioksidan.", kacinmasi: ["E211", "E212", "SODYUM BENZOAT", "BPA"] },
 "Yay": { element: "Ateş", mizac: "Safravi", organ: "Karaciğer · Kalça · Uyluk", renk: "#9400D3", makam: "Hicaz", zikir: "Ya Muksit — 209 kere", bitki: "Enginar · Deve dikeni · Limon", tavsiye: "Karaciğer için enginar çayı, sabah aç karna limon suyu ve yeşil yapraklı sebzeler. Alkol ve TBHQ'dan kaçın.", kacinmasi: ["E621", "MSG", "E150D", "TBHQ", "PESTİSİT"] },
 "Oğlak": { element: "Toprak" , mizac: "Sevdevi", organ: "Diz · Kemik · Eklem", renk: "#696969", makam: "Nihavend", zikir: "Ya Sabur — 298 kere", bitki: "Biberiye · Badem · At kuyruğu", tavsiye: "Kemik sağlığı için: susam, badem, yeşil yapraklı sebzeler, D vitamini, kalsiyum. Şeker tüketimini sınırla.", kacinmasi: ["MISIR ŞURUBU", "E338", "E450", "E452", "FRUKTOZ"] },
 "Kova": { element: "Hava", mizac: "Demevi", organ: "Bacak · Dolaşım · Bilek", renk: "#00CED1", makam: "Neva", zikir: "Ya Bari — 100 kere", bitki: "Ginkgo · Sarımsak · Soğan", tavsiye: "Dolaşım için sarımsak, soğan, ginkgo biloba ve antioksidan açısından zengin meyveler. Düzenli yürüyüş.", kacinmasi: ["E951", "ASPARTAM", "BHT", "E282"] },
 "Balık": { element: "Su", mizac: "Balgami", organ: "Ayak · Lenf · Bağışıklık", renk: "#00FA9A", makam: "Uşşak", zikir: "Ya Vedud — 33 kere", bitki: "Echinacea · Lavanta · Melisa", tavsiye: "Bağışıklık için: kefir, zerdeçal, yeşil çay, C vitamini. Nemli ortamlardan kaçın, ayak sağlığına dikkat et.", kacinmasi: ["E102", "E211", "TİTANYUM DİOKSİT", "E407"] },
};

function burcHesapla(t) {
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
const KATEGORILER = {
 "gida": { ad: "Gıda", db: GIDA_DB, mizacGoster: true, ipucu: "Ürünün 'İçindekiler' listesini yapıştır." },
 "giyim": { ad: "Giyim", db: GIYIM_DB, mizacGoster: true, ipucu: "Ürünün kumaş/malzeme etiketini yapıştır." },
 "ev": { ad: "Ev", db: EV_DB, mizacGoster: true, ipucu: "Halı, koltuk, mobilya, perde veya yatak etiketini yapıştır." },
 "kozmetik": { ad: "Kozmetik", db: KOZMETIK_DB, mizacGoster: true, ipucu: "Krem, şampuan, sabun veya makyaj içerik listesini yapıştır." },
 "temizlik": { ad: "Temizlik", db: TEMIZLIK_DB, mizacGoster: true, ipucu: "Deterjan, çamaşır suyu veya temizleyici içeriğini yapıştır." },
 "bebek": { ad: "Bebek", db: BEBEK_DB, mizacGoster: true, ipucu: "Mama, bebek bezi veya oyuncak etiketini yapıştır." },
 "evcil": { ad: "Evcil Hayvan", db: EVCIL_DB, mizacGoster: false, ipucu: "Mama, pire tasması veya evcil hayvan ürünü etiketini yapıştır." },
 "ilac": { ad: "İlaç/Vitamin", db: ILAC_DB, mizacGoster: true, ipucu: "İlaç veya vitamin kutusu içeriğini yapıştır." },
};

// 8 ana başlık altında doğal/onaylı ürün önerileri (Market için)
const MARKET_KATEGORI = {
  "gida": [
    { ad: "İçecekler", aciklama: "Şifalı kaynak suyu, ev limonatası, bitki çayı (melisa, ıhlamur, ada çayı)" },
    { ad: "Gofretler & Bisküviler", aciklama: "Doğal kakao, ham bal, kuru meyve, tahıl karışımı" },
    { ad: "Kekler", aciklama: "Tam buğday, yulaf, hurma tatlandırıcı" },
    { ad: "Sucuk & Salam", aciklama: "Geleneksel kuru, nitritsiz, doğal bağırsak" },
    { ad: "Peynirler", aciklama: "Çiğ süt, otlatılmış inek/koyun/keçi" },
    { ad: "Yoğurtlar", aciklama: "Ev mayalı, tam yağlı, probiyotik" },
    { ad: "Süt Ürünleri", aciklama: "Çiğ süt, kefir, ayran, kaymak" },
    { ad: "Yağlar", aciklama: "Soğuk sıkım zeytinyağı, tereyağı, çörek otu yağı" },
    { ad: "Baharatlar", aciklama: "Organik, sertifikalı, GDO-suz" },
    { ad: "Tatlandırıcılar", aciklama: "Ham bal, pekmez, hurma şurubu" },
    { ad: "Atıştırmalıklar", aciklama: "Kuru meyve, çiğ kuruyemiş, ev çöreği" },
  ],
  "giyim": [
    { ad: "Organik Pamuklu", aciklama: "PFAS-free, OEKO-TEX sertifikalı tişört, gömlek" },
    { ad: "Yünlü", aciklama: "Türk doğal yünü, kazak, mont astar" },
    { ad: "Keten", aciklama: "Saf keten gömlek, pantolon, yazlık" },
    { ad: "Spor Giyim", aciklama: "PFAS-free yağmurluk, doğal spor tişört" },
    { ad: "İç Çamaşırı", aciklama: "GOTS organik pamuk, ipek" },
  ],
  "ev": [
    { ad: "Yatak & Yorgan", aciklama: "Pamuk dolgu, organik kumaş, GOTS sertifikalı" },
    { ad: "Halı", aciklama: "Anadolu yün halı, doğal pamuk kilim" },
    { ad: "Mobilya", aciklama: "Masif ahşap, formaldehit-free, doğal cila" },
    { ad: "Perde", aciklama: "Doğal pamuk, keten" },
    { ad: "Mutfak Eşyası", aciklama: "Cam, çelik, dökme demir tava (PTFE-free)" },
  ],
  "kozmetik": [
    { ad: "Yüz Kremi", aciklama: "Hindistan cevizi yağı, shea, doğal E vitamini" },
    { ad: "Şampuan & Sabun", aciklama: "Kastil sabun, defne yağı, zeytinyağı sabunu" },
    { ad: "Diş Macunu", aciklama: "Karbonat, nane yağı, florürsüz seçenekler" },
    { ad: "Deodorant", aciklama: "Karbonat, mısır nişastası, çay ağacı yağı" },
    { ad: "Saç Bakımı", aciklama: "Hindistan cevizi yağı, kına, biberiye" },
  ],
  "temizlik": [
    { ad: "Bulaşık Deterjanı", aciklama: "Kastil sabun, sitrik asit, doğal limon" },
    { ad: "Çamaşır Deterjanı", aciklama: "Sabun rendesi, karbonat, soda külü" },
    { ad: "Çamaşır Yumuşatıcı", aciklama: "Sirke + lavanta yağı (klorin-free)" },
    { ad: "Cam Temizleyici", aciklama: "Sirke, limon suyu, gazete" },
    { ad: "Zemin & Yüzey", aciklama: "Beyaz sirke, çay ağacı yağı, karbonat" },
    { ad: "Lavabo Açıcı", aciklama: "Karbonat + sirke + kaynar su" },
  ],
  "bebek": [
    { ad: "Bebek Bezi", aciklama: "Organik pamuk, klorin-free, biodegradable" },
    { ad: "Bebek Maması", aciklama: "Anne sütü ön plan, organik ek gıda" },
    { ad: "Bebek Giysi", aciklama: "GOTS organik pamuk, doğal renk" },
    { ad: "Bebek Yağı", aciklama: "Hindistan cevizi, tatlı badem yağı" },
    { ad: "Mama Şişesi", aciklama: "BPA-free cam, paslanmaz çelik" },
  ],
  "evcil": [
    { ad: "Köpek/Kedi Maması", aciklama: "Tahılsız, gerçek et, doğal koruyucu" },
    { ad: "Tasma & Halat", aciklama: "Pamuk, keten, kimyasal işlemsiz deri" },
    { ad: "Şampuan", aciklama: "Kastil sabun, çay ağacı, neem yağı" },
    { ad: "Yatak", aciklama: "Pamuk dolgu, organik kumaş" },
  ],
  "ilac": [
    { ad: "D Vitamini", aciklama: "Doğal: güneş, kuru kayısı; takviye: D3 K2" },
    { ad: "C Vitamini", aciklama: "Kuşburnu, limon, kırmızı biber, brokoli" },
    { ad: "Demir", aciklama: "Pekmez, ıspanak, kırmızı et, mercimek" },
    { ad: "Probiyotik", aciklama: "Ev yoğurdu, kefir, turşu, lahana" },
    { ad: "Omega-3", aciklama: "Balık, ceviz, keten tohumu" },
    { ad: "Magnezyum", aciklama: "Kabak çekirdeği, badem, kakao" },
  ],
};

const BELIRSIZ_KELIMELER = [
 { kelime: "koruyucu", uyari: "Etikette sadece 'koruyucu' yazılı, hangi koruyucu (E200, E211, E220, vb.) belirtilmemiş. Üretici gizliyor olabilir." },
 { kelime: "renklendirici", uyari: "Sadece 'renklendirici' yazılı, hangisi (E102, E110, E120, vb.) belirsiz. Sentetik boya olabilir." },
 { kelime: "antioksidan", uyari: "Sadece 'antioksidan' yazılı, hangi antioksidan (E319 TBHQ, E320 BHA, E321 BHT) belirsiz. Tehlikeli olabilir." },
 { kelime: "tatlandirici", uyari: "Sadece 'tatlandırıcı' yazılı, hangi yapay tatlandırıcı (aspartam, sukraloz, asesülfam) belirsiz." },
 { kelime: "emulgator", uyari: "Sadece 'emülgatör' yazılı, hangi emülgatör (E471, E472, E476 PGPR) belirsiz. Trans yağ kaynağı olabilir." },
 { kelime: "stabilizor", uyari: "Sadece 'stabilizör' yazılı, hangi stabilizör (karragenan E407, CMC E466) belirsiz." },
 { kelime: "asitlik duzenleyici", uyari: "Sadece 'asitlik düzenleyici' yazılı, hangi asit (E330 sitrik, E338 fosforik) belirsiz." },
 { kelime: "kivam verici", uyari: "Sadece 'kıvam verici' yazılı, hangisi olduğu belirsiz." },
 { kelime: "kabartici", uyari: "Sadece 'kabartıcı' yazılı, hangi kabartıcı (E500 karbonat, E541 SAS-alüminyum) belirsiz." },
 { kelime: "aroma verici", uyari: "Sadece 'aroma verici' yazılı, 100+ kimyasal karışımı tek kelime altında saklanır. Üretici bileşenleri açıklamak zorunda değil." },
 { kelime: "dogal aroma", uyari: "'Doğal aroma' aldatıcı bir terim - hala kimyasal işlenmiş olabilir. Gerçek baharat/meyve değildir." },
 { kelime: "dogala ozdes aroma", uyari: "'Doğala özdeş aroma' = laboratuvarda yapılmış sentetik aroma. Doğal değildir." },
 { kelime: "aroma karisimi", uyari: "Aroma karışımı içinde gizlenen 50-100 kimyasal olabilir." },
 { kelime: "bitkisel yag", uyari: "Sadece 'bitkisel yağ' yazılı, hangi yağ (palmiye? soya? mısır?) belirsiz. Genelde palmiye yağıdır - sağlıksız." },
 { kelime: "hayvansal yag", uyari: "Sadece 'hayvansal yağ' yazılı, hangi hayvan ve hangi organdan olduğu belirsiz." },
 { kelime: "modifiye nisasta", uyari: "Modifiye nişasta GDO mısırdan kimyasal işlemle yapılmış olabilir (E1422, E1442)." },
 { kelime: "tat artirici", uyari: "Sadece 'tat artırıcı' yazılı, MSG (E621), inozinat (E631), guanilat (E627) olabilir." },
 { kelime: "tat verici", uyari: "Genel terim, içinde MSG veya başka tat artırıcılar olabilir." },
 { kelime: "topaklanmayi onleyici", uyari: "Hangi madde (E551 silikon, E554 alüminosilikat) belirsiz. Alüminyum içerebilir." },
 { kelime: "parlatici", uyari: "Hangi parlatıcı (E901 balmumu, E904 şellak böceği, E905 mineral yağı) belirsiz." },
 { kelime: "ambalaj gazi", uyari: "Hangi gaz kullanıldığı belirsiz." },
 { kelime: "yardimci maddeler", uyari: "'Yardımcı maddeler' altında neler gizlendiği belirsiz." },
 { kelime: "diger katki", uyari: "'Diğer katkılar' yazısı şüphelidir - tam içerik açıklanmıyor." },
 { kelime: "isleme yardimcisi", uyari: "İşleme yardımcısı maddeler etikette zorunlu değildir - üretici saklayabilir." },
 { kelime: "iz miktarda", uyari: "'İz miktarda' diye yazılan maddeler aslında düzenli olarak ürüne karışıyor olabilir." },
];

function belirsizBul(txt) {
 const b = " " + normalize(txt) + " ";
 const bulunan = [];
 for (const bk of BELIRSIZ_KELIMELER) {
 const k = " " + normalize(bk.kelime) + " ";
 if (b.includes(k)) bulunan.push(bk);
 }
 return bulunan;
}

function normalize(s) {
 return (s || "").toUpperCase()
 .replace(/İ/g, "I").replace(/I/g, "I")
 .replace(/Ş/g, "S").replace(/Ç/g, "C")
 .replace(/Ğ/g, "G").replace(/Ü/g, "U").replace(/Ö/g, "O")
 .replace(/[()[\]{}.,;:!?'"`*\-/\\_]/g, " ")
 .replace(/\s+/g, " ").trim();
}

function ilkSiraTespit(txt) {
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

function analiz(txt, db) {
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
const HAKKINDA = {
 hukuki: {
 ikon: "", renk: "#FF9500",
 baslik: "Hukuki Statü & Sorumluluk",
 ozet: "TCK · 6502 · Anayasa · KVKK · AİHS",
 items: [
 { t: "Temel Statü", a: "Türk Hukuku, AB Direktifleri ve AİHS Madde 10 çerçevesinde Dijital Arşiv olarak faaliyet gösterir. Tıbbi cihaz değildir." },
 { t: "1219 Sayılı Tababet Kanunu", a: "Tıbbi teşhis, tedavi veya reçete niteliği taşımaz. Tababet Kanunu kapsamında tıbbi faaliyet değildir." },
 { t: "TCK 267 & 125", a: "Hiçbir firmayı adını anarak suçlamaz. İftira ve hakaret kapsamına girmez. Yalnızca madde bazlı arşiv bilgisi sunar." },
 { t: "6502 Sayılı Tüketici Kanunu", a: "Tüketici bilgilendirmesi yasal haktır. Bilinçli tüketim hakkı korunmaktadır." },
 { t: "Anayasa 26-28", a: "Düşünce Özgürlüğü + Basın Özgürlüğü — anayasal güvence altındadır." },
 { t: "AİHS Madde 10", a: "Halk sağlığı verilerinin paylaşımı Avrupa İnsan Hakları Mahkemesi içtihadıyla korunur." },
 { t: "KVKK 6698", a: "Kullanıcı verileri yalnızca cihazda saklanır, üçüncü taraflarla paylaşılmaz, satılmaz." },
 ],
 },
 islam: {
 ikon: "", renk: "#C9A84C",
 baslik: "İslam Alimleri & Kadim Tıp",
 ozet: "12 büyük âlim · 1000 yıllık tıp mirası",
 items: [
 { t: "İbn Sînâ (980–1037)", a: "el-Kânûn fi't-Tıbb (1025) · 5 cilt, ~1M kelime. 760+ gıda ve ilaç tasnifi. Avrupa'da 600 yıl temel tıp kitabı olarak okutulmuştur.\n Dâru Sâdır Beyrut · Çev. O.C. Gruner, Luzac London 1930" },
 { t: "İbn Kayyim el-Cevziyye (1292–1350)", a: "et-Tıbbü'n-Nebevî (1334) · Bal, zeytin, çörek otu, hurma üzerine sistematik çalışma.\n Dâru İhyâi'l-Ulûm Beyrut 1988" },
 { t: "Ebu Bekir er-Râzî (854–925)", a: "el-Hâvî (925) · 23 cilt. Gıda sınıflandırması ve diyete dayalı tedavi yöntemleri.\n Haydarabad 1955 · Latince: Brescia 1486" },
 { t: "İbn Rüşd (1126–1198)", a: "Külliyyât (1162) · Sindirim fizyolojisi ve beslenme-hastalık ilişkisi.\n Bulak 1295H · Cambridge 1954" },
 { t: "İbn Nefis (1213–1288)", a: "Şerhu'l-Kânûn (1242) · Pulmoner dolaşımı 300 yıl önce keşfetti.\n Kahire 1828" },
 { t: "İbn Bitar (1197–1248)", a: "el-Câmi' (1240) · 1400+ bitki ve gıda. Anadolu bitkileri dahil.\n Bulak 1874 · Paris 1877–1883" },
 { t: "Dâvûd el-Antâkî (ö.1599)", a: "Tezkiretü'l-Erbâb · Osmanlı eczacılığı. Antep bitkileri.\n Dâru'l-Fikr Beyrut 2000" },
 { t: "Sabuncuoğlu Şerefeddin (1386–1470)", a: "Cerrahiyyetü'l-Hâniyye (1465) · İlk illustrasyonlu Osmanlı tıp kitabı.\n Paris BN Ms. Turc 693" },
 { t: "Hacı Paşa (1335–1416)", a: "Müntehab-ı Şifâ (1381) · Türkçe yazılmış ilk tıp kitabı.\n TDK Yayınları Ankara" },
 { t: "II. Bayezid Darüşşifası (1488)", a: "Edirne · Osmanlı'da müzik terapisinin en belgelenmiş örneği. Makam tedavisinin pratik uygulandığı yer.\n Vakıflar Genel Müdürlüğü · TTK 1984" },
 { t: "Gevher Nesibe Darüşşifası (1205)", a: "Kayseri · Selçuklu'nun en büyük şifahanesi. UNESCO kültürel miras adayı.\n Vakıflar Genel Müdürlüğü Arşivleri" },
 { t: "Gelibolulu Mustafa Âlî (1541–1600)", a: "Câmi'ü'l-Buhûr (1582) · Osmanlı saray mutfağı ve gıda kültürü.\n TTK Yayınları Ankara" },
 ],
 },
 bilim: {
 ikon: "", renk: "#4488FF",
 baslik: "Uluslararası Bilim & Hukuk + Türk Kaynakları",
 ozet: "25+ kurum · 1000+ bilimsel kaynak",
 items: [
 { t: "IARC — WHO Kanser Ajansı", a: "Aspartam 2023 Grup 2B, Sodyum Nitrit Grup 2A, Benzen ve Formaldehit Grup 1 kanserojen.\n iarc.fr · Lyon, France" },
 { t: "EFSA — Avrupa Gıda Güvenliği", a: "E171 (titanyum dioksit) yasağı 2022. Tüm E kodları bağımsız değerlendirme.\n efsa.europa.eu · Parma" },
 { t: "WHO JECFA", a: "Gıda katkı maddelerinin ADI (kabul edilebilir günlük alım) değerlerini belirleyen BM komitesi.\n who.int/foodsafety" },
 { t: "FDA — ABD Gıda ve İlaç İdaresi", a: "Trans yağ 2018, Triclosan 2016 yasaklandı.\n fda.gov/food" },
 { t: "ECHA — Avrupa Kimyasallar Ajansı", a: "PFAS kısıtlama 2023, DMF yasağı, Nikel direktifi.\n echa.europa.eu" },
 { t: "Stockholm Sözleşmesi (BM)", a: "PFOS, HBCD, PFOA yasaklı. 184 ülke imzaladı. Türkiye 2010'da onayladı.\n chm.pops.int" },
 { t: "Türk Gıda Kodeksi (TGK)", a: "T.C. Tarım ve Orman Bakanlığı · Gıda katkı maddeleri yönetmeliği, ürün tebliğleri.\n tarim.gov.tr" },
 { t: "Türk Tabipler Birliği (TTB)", a: "Sağlık politikaları, gıda güvenliği uyarıları, alkol-kanser raporları.\n ttb.org.tr" },
 { t: "Türkiye Beslenme ve Diyetetik Derneği", a: "Ulusal beslenme rehberleri, çocuk beslenmesi uyarıları, sporcu beslenme.\n tbdd.org.tr" },
 { t: "Türk Diş Hekimleri Birliği", a: "Şekerli ürünler, gazlı içecekler ve diş çürüğü ilişkisi raporları.\n tdb.org.tr" },
 { t: "Türkiye Gıda Mühendisleri Odası", a: "Endüstriyel gıda üretimi, katkı maddeleri ve hile raporları.\n gidamo.org.tr" },
 { t: "Türk Veteriner Hekimleri Birliği", a: "Antibiyotik direnci, hayvansal ürünlerde kalıntı, et güvenliği.\n tvhb.org.tr" },
 { t: "Türk Pediatri Kurumu", a: "Çocuk beslenmesi, anne sütü, bebek mama önerileri.\n turkpediatri.org.tr" },
 { t: "Türk Kardiyoloji Derneği", a: "Trans yağ, doymuş yağ, sodyum kalp hastalığı bağlantısı.\n tkd.org.tr" },
 { t: "TKHK — Tüketici Hakları Derneği", a: "Türkiye'de gıda hile tespiti, etiket okuma rehberleri, tüketici eğitimi.\n tuketicihaklari.org.tr" },
 { t: "TÜTEDER — Tüketici Dernekleri Federasyonu", a: "Endüstriyel gıda denetimi, ücretsiz tüketici şikayet hattı.\n tukoder.org.tr" },
 { t: "Türkiye Eczacılar Birliği (TEB)", a: "İlaç-gıda etkileşimi, takviye gıdalar uyarıları.\n teb.org.tr" },
 { t: "Tarım ve Orman Bakanlığı Hile Raporu", a: "Yıllık 'gıda hile' raporu: balda, ette, peynirde, baharatta hile tespiti.\n tarim.gov.tr/gıda-hile" },
 { t: "EWG — Environmental Working Group", a: "Dirty Dozen pestisit listesi, Skin Deep kozmetik veritabanı, PFAS haritası.\n ewg.org" },
 { t: "CSPI — Center for Science in Public Interest", a: "Gıda etiket okuma, restoran zincirleri uyarıları, çocuk pazarlama raporları.\n cspinet.org" },
 { t: "BEUC — Avrupa Tüketici Birliği", a: "AB çapında tüketici örgütü çatısı, gıda güvenliği lobicilik.\n beuc.eu" },
 { t: "foodwatch (Avrupa)", a: "Almanya merkezli tüketici örgütü, gıda lobicilik raporları.\n foodwatch.org" },
 { t: "Greenpeace Türkiye", a: "Pestisit raporları, GDO uyarıları, palmiye yağı kampanyaları, deniz kirliliği.\n greenpeace.org/turkey" },
 { t: "PAN — Pesticide Action Network", a: "Tarım ilacı veritabanı, çiftçi sağlığı, yasaklı pestisit kampanyaları.\n pan-europe.info" },
 { t: "Consumer Reports", a: "Bağımsız ürün testleri: balık civa, pirinç arsenik, baharat kurşun raporları.\n consumerreports.org" },
 { t: "California Prop 65", a: "900+ madde kanserojen listesi. BHA, TBHQ, 4-MEI dahil.\n P65warnings.ca.gov" },
 { t: "Codex Alimentarius (FAO/WHO)", a: "Uluslararası gıda standartları.\n fao.org/codex" },
 { t: "McCann 2007 — Lancet (Southampton)", a: "Gıda renklendiricileri ve DEHB ilişkisi. AB'de zorunlu uyarı etiketine yol açtı.\n Lancet 370(9598):1560-1567" },
 { t: "Chassaing 2015 — Nature", a: "Polisorbat 80 ve CMC'nin bağırsak florasını yıktığını gösteren çalışma.\n Nature 519:92–96" },
 { t: "Mozaffarian 2009 — NEJM", a: "Trans yağ ve kalp hastalığı. ABD yasağına zemin hazırladı.\n New England Journal of Medicine 2009" },
 { t: "Nobel Tıp 2017 — Sirkadiyen Ritim", a: "Eşref saatlerinin modern bilimsel dayanağı.\n Hall, Rosbash, Young · Karolinska Institutet" },
 { t: "EMA — Avrupa İlaç Ajansı Herbal Monographs", a: "Enginar, deve dikeni, melisa, lavanta, alıç, sarımsak gibi bitkilerin etkinlik ve güvenlik değerlendirmeleri. 'Organ Dostu Destek' önerilerinin temel referansı.\n ema.europa.eu/medicines/herbal" },
 { t: "ESCOP — European Scientific Cooperative on Phytotherapy", a: "Avrupa fitoterapi monografları. Silymarin (deve dikeni), Echinacea, Hypericum klinik veriler.\n escop.com" },
 { t: "WHO Monographs on Selected Medicinal Plants", a: "DSÖ tıbbi bitki monografları (4 cilt). Hatmi kökü, zerdeçal, sarımsak, zencefil, çörek otu dahil.\n who.int/medicines/areas/traditional/monographs" },
 { t: "Commission E (Almanya) Monographs", a: "Almanya Federal Sağlık Bakanlığı bitki monografları. Fitoterapinin altın standardı (Blumenthal 1998).\n American Botanical Council çevirisi" },
 { t: "Cochrane Reviews — Fitoterapi", a: "Silymarin/karaciğer, melisa/anksiyete, sarımsak/kolesterol, alıç/kalp yetmezliği meta-analizleri.\n cochranelibrary.com" },
 { t: "Türk Farmakopesi & Bitkisel İlaç Yönetmeliği", a: "T.C. Sağlık Bakanlığı TİTCK bitkisel ürün tebliği. Türkiye'de izinli bitkisel ürünler listesi.\n titck.gov.tr" },
 { t: "İbn Bitar — el-Câmi' li-Müfredâti'l-Edviyye", a: "1400+ bitki ve gıdanın organ etkileri (1240). Modern fitoterapinin İslam medeniyeti kaynağı.\n Bulak 1874 · Paris 1877" },
 ],
 },
 frekans: {
 ikon: "", renk: "#A855F7",
 baslik: "Frekans Terapisi & Bilimsel Kanıt",
 ozet: "Müzik terapisi · Solfeggio · Vagus siniri çalışmaları",
 items: [
 { t: "Cochrane Review 2014 — Müzik Terapisi", a: "Anksiyete, depresyon, kronik ağrı ve kalp hastalıklarında müzik terapisinin etkinliğini gösteren 52 RCT (randomize kontrollü çalışma) meta-analizi.\n Bradt J et al., Cochrane Database Syst Rev 2014" },
 { t: "Koelsch 2014 — Nature Reviews Neuroscience", a: "Müziğin beyin üzerindeki nörobiyolojik etkileri: dopamin, kortizol, oksitosin salgısını düzenler. Otonom sinir sistemini etkiler.\n Nature Reviews Neuroscience 15:170-180" },
 { t: "Solfeggio Frekansları — 432 Hz Çalışması", a: "Calamassi & Pomponi 2019: 432 Hz müziğin kalp atış hızı ve sistolik kan basıncını anlamlı şekilde düşürdüğü gösterildi (440 Hz'e göre).\n Acta Bio-Medica 2019;90(1)" },
 { t: "528 Hz — DNA Onarım Hipotezi", a: "Babayi & Riazi 2017: 528 Hz frekansının kültür ortamındaki insan hücrelerinde alkol kaynaklı DNA hasarını azalttığı bulgusu.\n Journal of Addiction Research & Therapy 2017" },
 { t: "Müzik Terapisi & Kardiyoloji", a: "Bradt & Dileo 2013: Koroner kalp hastalarında müzik terapisi sistolik kan basıncını, kalp atış hızını ve anksiyeteyi düşürdü.\n Cochrane Database 2013" },
 { t: "Vagus Siniri & Düşük Frekans", a: "Porges 'Polivagal Teori' (2011): Düşük frekanslı sesler ve şarkı söyleme vagus sinirini uyararak parasempatik aktiviteyi artırır — sindirim, sakinlik, bağışıklık üzerinde etki.\n The Polyvagal Theory, Norton 2011" },
 { t: "Osmanlı Darüşşifaları — Tarihi Belge", a: "Edirne II. Bayezid Külliyesi (1488) ve Kayseri Gevher Nesibe (1205): Akıl hastalıklarında makam tedavisinin sistemli uygulandığı UNESCO belgeli kurumlar.\n Vakıflar Genel Müdürlüğü · TTK 1984" },
 { t: "Müzik & Bağışıklık", a: "Chanda & Levitin 2013 — Trends in Cognitive Sciences: Müziğin kortizolü düşürdüğü, IgA antikorlarını artırdığı, NK hücre aktivitesini güçlendirdiği derleme.\n Trends Cogn Sci 2013;17(4):179-93" },
 { t: "Müzik & Kronik Ağrı", a: "Garza-Villarreal 2017 meta-analizi: Müzik terapisi fibromiyalji, kanser ağrısı ve postoperatif ağrıda anlamlı azalma sağlar.\n Pain Physician 2017;20:597-610" },
 { t: "Önemli Not", a: "Spesifik makam-organ eşleşmeleri (Rast → beyin, Hicaz → böbrek vb.) Osmanlı darüşşifa geleneğinden gelir ve modern RCT'lerle henüz tek tek doğrulanmamıştır. Genel müzik terapisinin etkinliği ise yüzlerce bilimsel çalışmayla desteklenmiştir." },
 ],
 },
 mertebe: {
 ikon: "", renk: "#9B7B4F",
 baslik: "Mertebe Sistemi · Yasal Statü & Bilimsel Kaynaklar",
 ozet: "Oyunlaştırma · Anonim · KVKK · Ahilik Geleneği",
 items: [
   { t: "Temel Statü", a: "Mertebe sistemi bir oyunlaştırma katmanıdır. Tıbbi tavsiye, teşhis, tedavi veya reçete niteliği taşımaz. Kullanıcının uygulamayla etkileşimini görselleştiren bir liyakat göstergesidir." },
   { t: "Anonim Katılım & Yerel Veri", a: "Mertebe puanları, isim/lakap ve görev kayıtları yalnızca kullanıcının cihazında (localStorage) tutulur. Sunucuya, üçüncü tarafa veya geliştiriciye aktarılmaz. İsim girmek isteğe bağlıdır." },
   { t: "KVKK 6698 Sayılı Kanun", a: "Kişisel verilerin korunması mevzuatına tam uyum. Cihaz dışına veri çıkışı yoktur — bu nedenle veri sorumlusu / işleyen / aktarım hükümleri uygulanmaz." },
   { t: "Ahilik Geleneği (tarihsel kaynak)", a: "Çırak → Kalfa → Kethüda → Hekimbaşı sıralaması Osmanlı esnaf teşkilatı (Ahilik) ve saray idari yapısına dayanır. Türkiye'nin UNESCO Somut Olmayan Kültürel Miras listesinde 2020'de tescilli." },
   { t: "Manevi & Kültürel Boyut", a: "Şifa ayetleri, Esmâ-ül Hüsnâ reçeteleri, zikir ve Eşref Saati pratikleri kültürel-manevi bilgi notlarıdır; hiçbiri tıbbi tedavi yerine geçmez. Bu pratiklerin etkisi inanç ve manevi pratik bağlamındadır." },
   { t: "Anayasa 26-28 · AİHS Madde 10", a: "Bilgilendirme, eğitim ve kültürel pratik aktarımı düşünce-ifade özgürlüğü kapsamında anayasal ve AİHM içtihadıyla güvence altındadır." },
   { t: "6502 Sayılı Tüketicinin Korunması Hakkında Kanun · TKHK", a: "Tüketicinin bilgilendirilme ve eğitim ilkesi (Kanun'un temel hükümleri kapsamında); mertebe sistemi bu hakkı destekleyen bir eğitim aracıdır, ticari amaçlı yönlendirme değildir." },
   { t: "Tüketici Gözlem Paylaşma Hakkı (Mahalle Haritası)", a: "Çarşıda/pazarda gözlenen raf yerleşimi, reklam yoğunluğu ve manipülasyon paylaşımı; 6502 Sayılı Kanun (bilinçli tüketim), Anayasa 26 (düşünce özgürlüğü), AİHS 10 (ifade), Türk Borçlar Kanunu 49 (haksız fiil dışı — gerçek gözlemin paylaşımı), AB Tüketici Hakları Direktifi 2011/83 ve OECD Tüketici Politikası Kılavuzu kapsamında korunmaktadır. Marka adı zikretmek değil, satış noktasındaki gerçek gözlemi paylaşmak yasal hakkımızdır." },
   { t: "Şifa Akçesi — Kapalı Devre Sadakat Puanı", a: "Şifa Akçesi yalnızca Besin Dedektifi ve Şifalı Market ekosisteminde geçerlidir; TL'ye, başka bir para birimine veya kripto varlığa çevrilmez. 6493 Sayılı Ödeme ve Menkul Kıymet Mutabakat Sistemleri Kanunu kapsamı dışında 'kapalı devre sadakat puanı / hediye kartı' niteliğindedir — BDDK düzenlemelerine ve elektronik para hükümlerine tabi değildir. Vergisel sorumluluk Şifalı Market tarafındaki ticari faturalama üzerinden işler. Akçe sistemi aktif edilmeden önce ayrı bir kullanım sözleşmesi sunulacaktır." },
   { t: "Pîr Ataması — Hukuki & Kültürel Dayanak", a: "Anayasa Madde 26 (ifade özgürlüğü) ve UNESCO Somut Olmayan Kültürel Miras tescili (Ahilik, 2020). KVKK 6698 Madde 3 'anonimleştirilmiş veri' tanımı: lakap hash'i kişiyi tanımlamayan, geri çevrilemez ifadedir." },
   { t: "Ahd-i Mîsâk — Bilimsel Dayanak", a: "Cialdini, R. B. (2006). Influence: The Psychology of Persuasion (commitment & consistency prensibi). · Ashraf, N., Karlan, D., Yin, W. (2006). 'Tying Odysseus to the Mast', Quarterly Journal of Economics 121(2). · Hukuki: Türk Borçlar Kanunu Madde 27 anlamında borç doğuran sözleşme niteliği taşımaz." },
   { t: "Sırlı Suâl — Bilimsel & Hukuki Dayanak", a: "Roediger, H. L. & Karpicke, J. D. (2006). 'Test-enhanced learning', Psychological Science 17(3). · Anayasa Madde 42 (eğitim hakkı). Sınav sonucu cihazda kalır; sertifika veya tıbbi yetki üretmez." },
   { t: "Mahcubiyet Lensi — Bilimsel Dayanak", a: "Bandura, A. (1991). 'Social cognitive theory of self-regulation', Organizational Behavior and Human Decision Processes 50(2). · Burke, L. E., Wang, J., Sevick, M. A. (2011). 'Self-monitoring in weight loss', Journal of the American Dietetic Association 111(1). Bilişsel-davranışsal terapide self-monitoring tekniği." },
   { t: "Şefaat Hattı — Hukuki Dayanak", a: "Anayasa Madde 26 (ifade), AİHS Madde 10 (bilgi yayma özgürlüğü), 6502 Sayılı Tüketicinin Korunması Hakkında Kanun (bilinçli tüketim aktarımı). Sayaç yerel; karşı taraf bilgisi tutulmaz." },
   { t: "Selâm / Yâd / Hediye Bildirimleri — Hukuki Dayanak", a: "KVKK 6698 Madde 5 (kullanıcı rızası ve kontrolü) — bildirimler kullanıcı tarafından geri buton ile kapatılabilir. İçerikler kamuya açık dini-edebî kaynakların kültürel aktarımıdır; tıbbi tavsiye veya dini fetva niteliği taşımaz." },
   { t: "Mensubiyet Tescili — Hukuki Dayanak", a: "KVKK 6698 Madde 3 'anonimleştirilmiş veri' tanımı: cihazın ilk açılış zaman damgasından deterministik olarak türetilen sembolik göstergedir, sunucu kaydı veya gerçek üyelik listesi değildir. Hicri dönüşüm: Tabular Islamic Calendar (Microsoft MEPD uygulaması — Rob van Gent, Utrecht University)." },
   { t: "Vakar Evrimi — Standart Dayanak", a: "W3C WCAG 2.1 AA · Success Criterion 1.4.3 'Contrast (Minimum)'. Mertebe yükselişinde yalnız görsel hiyerarşi değişir; içerik ve kontrast oranları korunur." },
   { t: "Hatm-i Nöbet — Bilimsel Dayanak", a: "Lally, P., van Jaarsveld, C. H. M., Potts, H. W. W., Wardle, J. (2010). 'How are habits formed: Modelling habit formation in the real world', European Journal of Social Psychology 40(6). KVKK kapsamı: yalnız local timestamp; sağlık, konum veya cihaz parmak izi içermez." },
   { t: "Liyakat Sıralaması / Hekimbaşı Yorumları / Mahalle Haritası — YAKINDA", a: "Bu özellikler aktif olduğunda kullanıcı katkıları topluluk standartlarına ve mevzuata uygun denetimden geçecek; iftira/hakaret (TCK 125-267) kapsamına girebilecek içerikler kaldırılacak. Aktif edilmeden önce ayrı bir kullanım sözleşmesi sunulacaktır." },
 ],
 },
 hizmetler: {
 ikon: "", renk: "#2563EB",
 baslik: "Hizmetlerin Bilimsel Dayanağı",
 ozet: "24 modül · kanıtlı / tartışmalı / sözde-bilim ayrımıyla",
 items: [
 { t: "■ KANITLI · Görüntülü Uzman (telesağlık)", a: "Telesağlık üzerinden beslenme/diyet konsültasyonu RKÇ meta-analizleriyle etkili bulunmuştur.\n• Cost-effectiveness of telehealth-delivered nutrition interventions — Nutrition Reviews\n https://academic.oup.com/nutritionreviews/article/81/12/1599/7103510" },
 { t: "■ KANITLI · Uyku Kalkanı", a: "REM uykusu ve uyku hijyeni NIH/CDC tarafından belgelenmiş, halk sağlığı kanıtı güçlü.\n• Sleep Hygiene Review — PMC\n https://pmc.ncbi.nlm.nih.gov/articles/PMC4400203/\n• Healthy Sleep — NIH MedlinePlus\n https://medlineplus.gov/healthysleep.html" },
 { t: "■ KANITLI · Evliya Çelebi Rotası", a: "Evliya Çelebi'nin Seyahatname'si Osmanlı şifahaneleri için akademik olarak iyi belgelenmiş tarihsel kaynaktır.\n• Evliya Çelebi'nin Şifahaneleri — Coşkun Yılmaz\n https://www.academia.edu/31381713/Evliya_%C3%87elebinin_%C5%9Eifahaneleri\n• University of Chicago — Historians of the Ottoman Empire\n https://ottomanhistorians.uchicago.edu/en/historian/evliya-celebi" },
 { t: "■ KANITLI · Zihni İnşa (ekran zamanı)", a: "Aşırı ekran zamanının çocuk bilişsel/sosyal gelişimine olumsuz etkisi AAP ve WHO tarafından kabul edilmiştir.\n• Impact of Screen Time on Development — MDPI Children 2025\n https://www.mdpi.com/2227-9067/12/10/1297\n• APA — What do we really know about kids and screens?\n https://www.apa.org/monitor/2020/04/cover-kids-screens" },
 { t: "■ KANITLI · Ses Frekans Analizi (voice biomarker)", a: "Ses biyobelirteçleri ile Parkinson/depresyon tespiti aktif ve güçlü literatüre sahip. NOT: 'sesten mizaç' iddiasının doğrudan kanıtı yoktur.\n• Voice-Based Detection of Parkinson's — PMC sistematik inceleme\n https://pmc.ncbi.nlm.nih.gov/articles/PMC12649940/" },
 { t: "■ KANITLI · Duygusal Nabız (HRV)", a: "HRV otonom sinir sistemi için güvenilir, hakemli biyobelirteç. Düşük HRV stres ve kardiyovasküler mortalite ile ilişkili.\n• ARIC Study — Journal of the AHA\n https://www.ahajournals.org/doi/10.1161/JAHA.120.017172\n• Low HRV Predicts CHD — Circulation (AHA)\n https://www.ahajournals.org/doi/10.1161/01.cir.102.11.1239" },
 { t: "■ KANITLI · Dijital Burun (e-nose)", a: "Nefes VOC analizi akciğer kanseri, diyabet gibi durumlarda non-invaziv erken tespit için aktif araştırma alanı.\n• E-nose Technology in Breath Analysis — Nature (Microsystems & Nanoeng.)\n https://www.nature.com/articles/s41378-023-00594-0\n• Lung Cancer Detection by Breath Sensor Array — AJRCCM\n https://www.atsjournals.org/doi/10.1164/rccm.200409-1184OC" },
 { t: "▲ TARTIŞMALI · Şifalı Market", a: "Organik gıdanın pestisit maruziyetini azalttığı kanıtlı; doğrudan hastalık önleme etkisi tutarsız.\n• Effects of organic food on human health — Nutrition Reviews 2024\n https://academic.oup.com/nutritionreviews/article/82/9/1151/7334529\n• Am J Clin Nutr sistematik inceleme\n https://pubmed.ncbi.nlm.nih.gov/20463045/\n\n📖 İSLÂMÎ DAYANAK:\n• Bakara 168: \"Ey insanlar! Yeryüzünde bulunan helâl ve temiz (tayyibât) şeylerden yiyin.\"\n• Abese 24: \"İnsan yediğine bir baksın!\"" },
 { t: "▲ TARTIŞMALI · Türk Müzik Makamları", a: "Küçük ölçekli klinik çalışmalar makamların HRV/anksiyete üzerine etkisini gösteriyor. Burç/mizaç eşleştirmesi için bilimsel temel yok.\n• Music Therapy YBÜ hastaları (Nihavend) — Turkish J Intensive Care\n https://turkishjic.org/article/view/565\n• Music Therapy Among the Turks — Turkish Music Portal\n http://www.turkishmusicportal.org/en/articles/music-therapy-among-the-turks\n\n📖 İSLÂMÎ DAYANAK:\n• Sebe 10: \"Ey dağlar! Onunla (Davud aleyhisselâm ile) beraber tesbih edin, kuşlar da!\"\n• Müzzemmil 4: \"Kur'an'ı tertîl ile (tane tane, makamla) oku.\"" },
 { t: "▲ TARTIŞMALI · Şadırvân-ı Şifa", a: "Edirne II. Bayezid Darüşşifası'nda su+müzik tedavisi tarihsel olarak iyi belgelenmiş. Modern doğa sesi/müzik tedavisi etkinliği sınırlı kanıtla destekleniyor.\n• Bayezid II Darüşşifa Reconsideration — PMC\n https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5450856/\n• Harmonic Healing Houses of Turkey — British Psychological Society\n https://www.bps.org.uk/psychologist/harmonic-healing-houses-turkey\n\n📖 İSLÂMÎ DAYANAK:\n• Enbiya 30: \"Her canlıyı sudan yarattık.\"\n• İsra 82: \"Biz Kur'an'dan, mü'minler için şifa ve rahmet olan şeyler indiriyoruz.\"" },
 { t: "▲ TARTIŞMALI · Eşref Saatleri", a: "Sirkadiyen ritim 2017 Nobel Tıp ile bilimsel kanıtlanmış. Ancak TCM 'organ saatleri' Batılı bilim tarafından doğrulanmamıştır.\n• 2017 Nobel — Circadian Rhythm — NobelPrize.org\n https://www.nobelprize.org/prizes/medicine/2017/advanced-information/\n• Circadian Clock in Cardiovascular Disease — PMC\n https://pmc.ncbi.nlm.nih.gov/articles/PMC6012474/\n\n📖 İSLÂMÎ DAYANAK:\n• Nisa 103: \"Şüphesiz ki namaz, müminler üzerine vakitleri belirli olarak farz kılınmıştır.\"" },
 { t: "▲ TARTIŞMALI · Milli Tohum", a: "Atalık tohumların beslenme üstünlüğü kanıtlanmamış. Onaylı GDO'ların gıda güvenliği bilimsel konsensüsle kabul edilir. Genetik çeşitlilik/yerel adaptasyon açısından atalık tohumların ekolojik değeri tartışılmaz.\n• GMO Plants: Nutritious, Sustainable — PMC\n https://pmc.ncbi.nlm.nih.gov/articles/PMC7549299/\n• Heirloom, Hybrid, GMO — University of Guam Extension\n https://www.uog.edu/_resources/files/extension/publications/Understanding_GMO.pdf\n\n📖 İSLÂMÎ DAYANAK:\n• Bakara 168: \"Yeryüzünde bulunan helâl ve temiz (tayyibât) şeylerden yiyin.\"\n• Abese 24-27: \"İnsan yediğine bir baksın! Biz suyu döktükçe döktük, sonra toprağı yardıkça yardık, derken orada taneler bitirdik.\"" },
 { t: "▲ TARTIŞMALI · Koku Takvimi (aromaterapi)", a: "Aromaterapinin post-operatif/jinekolojik ağrıda etkili olduğuna dair meta-analiz var; çoğu durum için kanıt zayıf. Gezegen saatine göre yağ kullanımının bilimsel temeli YOKTUR.\n• Aromatherapy Evidence Map — VA / NCBI\n https://www.ncbi.nlm.nih.gov/books/NBK551020/\n• Aromatherapy Pain Meta-Analysis — PMC\n https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5192342/\n\n📖 İSLÂMÎ DAYANAK:\n• Hadis (Nesai, İşretü'n-Nisâ): Rasûlullah (s.a.v.) buyurdu: \"Bana dünyanızdan kadın ve güzel koku sevdirildi, namaz da gözümün nuru kılındı.\"" },
 { t: "▲ TARTIŞMALI · Yıldız Saati (hacamat + ay fazı)", a: "Hacamat ağrıda sınırlı etkinlik gösteriyor (kanıt kalitesi düşük). Ay fazının cerrahi sonuçlara etkisi bilimsel olarak ÇÜRÜTÜLMÜŞTÜR.\n• Hijama Review — Wiley\n https://onlinelibrary.wiley.com/doi/10.1111/j.2042-7166.2010.01060.x\n• Lunar Phases & Surgery — World J Surg\n https://pubmed.ncbi.nlm.nih.gov/21713579/\n\n📖 İSLÂMÎ DAYANAK (sadece hacamat için):\n• Buhari, Tıb 3: \"Şifa üç şeydedir: bal şerbeti içmek, hacamat yaptırmak ve ateşle dağlamak. Ama ben ümmetimi dağlamaktan menederim.\"\n• Ay fazı ile hacamat vakti eşleştirmesinin doğrudan ayet/hadis kaynağı bulunmamıştır." },
 { t: "▲ TARTIŞMALI · Biyo-Foton Kamera", a: "Ultra-zayıf foton emisyonu (UPE) gerçek biyofizik. ANCAK Kirlian/GDV cihazlarıyla 'aura okuma' bilimsel olarak çürütülmüş — gözlenen korona nem ve elektrik iletkenliğinden kaynaklanır.\n• Ultra-weak Photon Emission Review — PMC\n https://pmc.ncbi.nlm.nih.gov/articles/PMC10899412/\n• GDV/Bio-Well Unreliability — Researcher.Life\n https://discovery.researcher.life/article/unreliability-of-the-gas-discharge-visualization-gdv-device-and-the-bio-well-for-biofield-science-kirlian-photography-revisited-and-investigated-part-i/54ab77cbc05c3a198af325b5ac26a4ae\n\n📖 İSLÂMÎ DAYANAK:\n• Nur 35: \"Allah göklerin ve yerin nurudur...\"" },
 { t: "▲ TARTIŞMALI · Akıllı Bahçe (nutrigenomik)", a: "Genotipe dayalı kişiselleştirilmiş beslenme umut verici ancak RKÇ kanıtı tutarsız. 'Mizaca göre tohum' iddiasının bilimsel temeli YOKTUR.\n• Genotype-Based Nutritional Supplementation — PMC\n https://pmc.ncbi.nlm.nih.gov/articles/PMC9500586/\n• Scientific Validity Frameworks in Nutritional Genomics — PMC\n https://pmc.ncbi.nlm.nih.gov/articles/PMC8728558/\n\n📖 İSLÂMÎ DAYANAK:\n• En'am 99: \"O, gökten su indirendir. Onunla her şeyin bitkisini çıkardık.\"\n• Bakara 168: \"Yeryüzünde bulunan helâl ve temiz şeylerden yiyin.\"" },
 { t: "▲ TARTIŞMALI · EMF Kalkanı", a: "WHO/IARC cep telefonu RF-EMF'yi Grup 2B (olası kanserojen) sınıflandırdı — kanıt SINIRLI. 5G/Wi-Fi paniğinin WHO pozisyonundan farklı olduğu unutulmamalıdır.\n• IARC RF-EMF Classification (WHO)\n https://www.iarc.who.int/wp-content/uploads/2018/07/IARC_Mobiles_QA.pdf\n• WHO — EMF and Mobile Technology\n https://www.who.int/india/health-topics/electromagnetic-fields\n\n📖 İSLÂMÎ DAYANAK:\nElektromanyetik kirlilik, 1400 yıl önce var olmayan modern bir olgudur. Bu konuda doğrudan ayet veya hadis kaynağı bulunmamıştır. Genel sağlık prensibi olarak: Buhari (Tıb 1) — \"Allah hiçbir hastalık indirmedi ki şifasını da indirmiş olmasın.\"" },
 { t: "▲ TARTIŞMALI · Dopamin Skoru", a: "Ultra-işlenmiş gıdaların ödül sistemine etkisine dair kanıt artıyor; ancak güncel nörogörüntüleme çalışmaları basit 'dopamin hijack' modeline meydan okuyor.\n• UPF Milkshake Dopamine Response — Cell Metabolism 2025\n https://www.cell.com/cell-metabolism/abstract/S1550-4131(25)00060-9\n• UPF and Brain Development — Frontiers in Public Health\n https://www.frontiersin.org/journals/public-health/articles/10.3389/fpubh.2025.1590083/full\n\n📖 İSLÂMÎ DAYANAK:\n• Araf 31: \"Yiyin, için, fakat israf etmeyin. Çünkü Allah israf edenleri sevmez.\"\n• Hadis (Tirmizi, Zühd 47): \"İnsanoğlu midesinden daha kötü bir kap doldurmamıştır.\"" },
 { t: "▲ TARTIŞMALI · İlm-i Nabız", a: "İbn Sina'nın nabız parametreleri tıp tarihi açısından önemli. Modern tıpta nabız (hız/ritim/güç) tanı amaçlı kullanılır. ANCAK Safravi/Demevi/Balgami sınıflandırması humoral teoriye dayalıdır ve modern tanı geçerliliği yoktur.\n• Sphygmology of Ibn Sina — PMC\n https://pmc.ncbi.nlm.nih.gov/articles/PMC3969630/\n• Ibn Sina — Heart Views (peer-reviewed)\n https://journals.lww.com/hrtv/fulltext/2013/14040/the_air_of_history__part_v__ibn_sina__avicenna__.18.aspx\n\n📖 İSLÂMÎ DAYANAK:\n• Buhari, Tıb 1: \"Allah hiçbir hastalık indirmedi ki şifasını da indirmiş olmasın.\"\n• Ebu Davud, Tıb 1: \"Ey Allah'ın kulları! Tedavi olun; çünkü Allah ihtiyarlık dışında her hastalığın şifasını da indirmiştir.\"" },
 { t: "■ ÇOK KATMANLI KANIT · Râbıta-i Şifa", a: "Bu modülün 3 ayrı kanıt katmanı vardır:\n\n— KATMAN 1: PLASEBO/TELKİN ETKİSİ (PEER-REVIEWED BİLİM, KANITLI)\n\nPlasebo (ve Nosebo) Etkisi: Size söylenen telkinlerin iyileşeceğinize dair umut vermesi (plasebo) şifa sürecini hızlandırabilir. Tersine, olumsuz ve karamsar kelimeler (nosebo) hastalık belirtilerinin daha ağır yaşanmasına neden olabilir.\n\nStres Yönetimi: \"Asla iyileşemeyeceğim\" veya \"Bu çok kötü\" gibi kalıplar, vücutta kortizol seviyesini yükselterek bağışıklık sistemini zayıflatır.\n\nAlgı ve İletişim: Uzmanların (doktorların ve psikologların) kullandığı kelimeler, hastaların tedaviye uyumunu ve hastalıkla psikolojik savaşını doğrudan belirler.\n\nKişinin kendi inancı, umudu ve olumlu telkininin beyin kimyasını ve iyileşmeyi etkilediği yüzlerce çalışmayla kanıtlandı.\n• Kaptchuk TJ et al. (Harvard) — \"Placebos without Deception: A Randomized Controlled Trial in IBS\" — PLoS ONE 2010 (Açık etiketli plasebo bile etki gösterdi!)\n https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0015591\n• Wager TD & Atlas LY — \"The Neuroscience of Placebo Effects\" — Nature Reviews Neuroscience 2015 (Plasebo beyin görüntüleme nörobiyolojisi)\n https://www.nature.com/articles/nrn3976\n• TRT Haber — \"Kelimelerin gücü beynimizin kimyasını değiştiriyor\"\n https://www.trthaber.com/haber/yasam/kelimelerin-gucu-beynimizin-kimyasini-degistiriyor-897746.html\n\n— KATMAN 2: ÜÇÜNCÜ TARAF DUASI (BİLİM SEVİYESİNDE DOĞRULANAMADI)\nCochrane sistematik incelemesi (10 çalışma, 7.646 hasta) bir başkası adına yapılan duanın ölçülebilir klinik etkisini gösteremedi — ama 'etkisiz' diye de mahkum etmedi, ölçüm aracının yetersizliği vurgulandı.\n• Cochrane Review — Intercessory Prayer\n https://www.cochrane.org/CD000368/SCHIZ_intercessory-prayer-for-the-alleviation-of-ill-health\n\n— KATMAN 3: KUR'AN VE SÜNNET (KESİN VAHİY DELİLİ)\n• Bakara 186: \"Kullarım sana benden sorarlarsa, gerçekten ben yakınım. Bana dua edenin duasına icabet ederim.\"\n• Şuara 80 (İbrahim aleyhisselâm): \"Hastalandığım zaman, ancak O bana şifa verir.\"\n• İsra 82: \"Biz Kur'an'dan, mü'minler için şifa ve rahmet olan şeyler indiriyoruz.\"\n• Yunus 57: \"Size Rabbinizden bir öğüt, sinelerdekine bir şifa gelmiştir.\"\n• Tirmizi (Daavat 1): \"Dua ibadetin özüdür.\"\n• Müslim (Birr 86): \"Müslüman kardeşi için gıyabında yapılan dua kabul olunur. Başucundaki melek 'Âmin, sana da aynısı verilsin' der.\"\n\nSONUÇ: Plasebo bilim, üçüncü taraf duası bilim ölçemediği için 'doğrulanmadı'; ama kişinin kendi inancı/telkini ve vahiy kaynağı kesin. 'Ben iyiyim' demek (olumlu telkin) modern nörobilimde sinir kimyasını değiştiriyor — bu Cochrane'in araştırdığı şey değildir." },
 { t: "✕ SÖZDE-BİLİM · Burçlar & Mizaç", a: "Dört hılt (humoral) teorisi 19. yüzyıl germ teorisi ile çürütüldü. Tıp tarihi açısından önemli ama modern tıbbi tanı değeri yoktur. Astroloji-organ eşleştirmesinin bilimsel desteği yoktur.\n• Medicine from Galen to the Present — PMC\n https://pmc.ncbi.nlm.nih.gov/articles/PMC8939383/\n• The Humoral Theory: Beginning and Development\n https://www.academia.edu/45711250/The_Humoral_Theory_beginning_and_development" },
 { t: "✕ SÖZDE-BİLİM · Göz ve Yüz Analizi (iridoloji)", a: "İridoloji bilim camiası tarafından sahte bilim kabul edilir. Çift-kör kontrollü çalışmalar tanı değeri olmadığını göstermiştir.\n• Iridology Systematic Review — PubMed\n https://pubmed.ncbi.nlm.nih.gov/10213874/\n• Iridology is Nonsense — Quackwatch\n https://quackwatch.org/related/iridology/" },
 { t: "✕ SÖZDE-BİLİM · Toprak Frekansı (jeopatik stres)", a: "Schumann rezonansı gerçek atmosferik fizik; biyolojik etkileri için kanıt tutarsız. 'Jeopatik stres' kavramı sahte bilim — WHO tanımıyor, dowsing yöntemi doğrulanmadı.\n• Geopathology (sahte bilim sınıflandırması özeti)\n https://en.wikipedia.org/wiki/Geopathology\n• Schumann Resonance & Bioelectricity — PubMed\n https://pubmed.ncbi.nlm.nih.gov/40394813/" },
 { t: "✕ SÖZDE-BİLİM · Sesin Rengi (çakra eşleştirme)", a: "Voice biomarker sağlık tespiti BİLİMSEL. ANCAK 'çakra' kavramı ve ses ile çakra/organ tıkanıklığı eşleştirmesi sahte bilimdir — anatomik veya fizyolojik temeli yoktur.\n• Is there scientific evidence for chakras? — ResearchGate\n https://www.researchgate.net/publication/359774235_Is_there_scientific_evidence_for_chakras\n• Voice Biomarker (gerçek bilim, çakra değil) — MDPI Bioengineering\n https://www.mdpi.com/2306-5354/12/11/1279" },
 { t: "Yöntem & Sorumluluk", a: "Tüm 24 modülün durumu Cochrane, NIH/PMC, AHA, WHO/IARC, Nature, Cell, Nobel Prize ve hakemli dergilerden doğrulanmıştır. Tahmin yapılmamıştır. 'Sözde-bilim' işaretli modüller uygulamada yer alıyorsa kültürel/tarihsel bilgi amaçlıdır — TIBBİ TANI veya TEDAVİ değildir." },
 ],
 },
};

/* ══════════════════════════════════════════════
 TOPLULUĞA KATKI BİLEŞENİ
 ══════════════════════════════════════════════ */
function ToplulugaKatki({ taramaSayisi }) {
 const [secilen, setSecilen] = useState(null);
 const [mesaj, setMesaj] = useState("");
 const [gonderildi, setGonderildi] = useState(false);

 const KATEGORI = [
 { k: "madde", renk: "#2ECC71", baslik: "Madde Ekle", aciklama: "Yeni bir zararlı madde öner" },
 { k: "hata", renk: "#FF9500", baslik: "Hata Bildir", aciklama: "Bilgi yanlışı tespit ettin" },
 { k: "alternatif", renk: "#4ECDC4", baslik: "Alternatif", aciklama: "Doğal alternatif öner" },
 { k: "kaynak", renk: "#A855F7", baslik: "Kaynak Ekle", aciklama: "Bilimsel kaynak paylaş" },
 ];

 function gonder() {
 if (!secilen || !mesaj.trim()) return;
 const konu = KATEGORI.find(k => k.k === secilen)?.baslik || "Katkı";
 const body = `Konu: ${konu}\n\n${mesaj}\n\n---\nBesin Dedektifi · Tarama #${taramaSayisi || "?"}`;
 window.open(`mailto:besindedektifii@gmail.com?subject=${encodeURIComponent(konu)}&body=${encodeURIComponent(body)}`);
 setGonderildi(true);
 setTimeout(() => { setGonderildi(false); setSecilen(null); setMesaj(""); }, 3000);
 }

 return (
 <div style={{ background: `linear-gradient(135deg,${C.altin}12,${C.y2})`, border: `1px solid ${C.altin}50`, borderRadius: 20, padding: 20, marginBottom: 16 }}>
 <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
 <div style={{ width: 36, height: 36, borderRadius: "50%", background: C.altin + "22", border: `1px solid ${C.altin}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}></div>
 <div>
 <div style={{ color: C.altin, fontWeight: 700, fontSize: 15 }}>Topluluğa Katkı Sağla</div>
 <div style={{ color: C.cok, fontSize: 11 }}>Bilginle herkesin sağlığına katkıda bulun</div>
 </div>
 </div>
 {gonderildi ? (
 <div style={{ background: "#2ECC7120", border: "1px solid #2ECC7140", borderRadius: 12, padding: 14, textAlign: "center" }}>
 <div style={{ color: C.yesil, fontWeight: 700, fontSize: 15 }}>✓ Teşekkürler!</div>
 <div style={{ color: C.soluk, fontSize: 12, marginTop: 4 }}>48 saat içinde değerlendirilecek.</div>
 </div>
 ) : (
 <>
 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
 {KATEGORI.map(k => (
 <button key={k.k} onClick={() => setSecilen(k.k)} style={{ background: secilen === k.k ? k.renk + "22" : C.y, border: `2px solid ${secilen === k.k ? k.renk : C.s}`, borderRadius: 12, padding: "12px 8px", cursor: "pointer", textAlign: "left", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}>
 <div style={{ color: secilen === k.k ? k.renk : C.metin, fontWeight: 700, fontSize: 13 }}>{k.baslik}</div>
 <div style={{ color: C.cok, fontSize: 10, marginTop: 2 }}>{k.aciklama}</div>
 </button>
 ))}
 </div>
 <div style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 12, padding: "10px 12px", marginBottom: 10 }}>
   <div style={{ color: C.altin, fontWeight: 700, fontSize: 12, marginBottom: 2 }}>✉ İletişim</div>
   <a href="mailto:besindedektifii@gmail.com" style={{ color: C.metin, fontSize: 13, textDecoration: "none" }}>besindedektifii@gmail.com</a>
   <div style={{ color: C.cok, fontSize: 10, marginTop: 2 }}>48 saat içinde yanıtlanır.</div>
 </div>
 {secilen && (
 <>
 <textarea placeholder={`${KATEGORI.find(k => k.k === secilen)?.baslik} hakkında detay yaz...`} value={mesaj} onChange={e => setMesaj(e.target.value)} rows={3} style={{ width: "100%", background: C.y, border: `1px solid ${C.altin}50`, borderRadius: 10, padding: "10px 12px", color: C.metin, fontSize: 13, fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif", resize: "none", marginBottom: 8, outline: "none" }} />
 <button onClick={gonder} disabled={!mesaj.trim()} style={{ width: "100%", background: `linear-gradient(135deg,${C.altin},${C.altinA})`, border: "none", borderRadius: 12, padding: "12px", color: "#1A1200", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif", opacity: mesaj.trim() ? 1 : 0.4 }}>
 Gönder →
 </button>
 </>
 )}
 </>
 )}
 </div>
 );
}

/* ══════════════════════════════════════════════
 KAMERA OCR BİLEŞENİ
 ══════════════════════════════════════════════ */

/* ══════════════════════════════════════════════
   BARKOD OKUYUCU BİLEŞENİ
   ══════════════════════════════════════════════ */

/* ══════════════════════════════════════════════
   HAFTALIK RAPOR BİLEŞENİ
   ══════════════════════════════════════════════ */

/* ══════════════════════════════════════════════
   ORGAN DESTEK VERİTABANI
   ══════════════════════════════════════════════ */
// Etkilenen organa göre bitkisel/doğal destek önerileri
// Kaynaklar: İbn Sina Kanun, fitoterapi literatürü, EFSA bitkisel
const ORGAN_DESTEK = {
  "Karaciğer": { bitki: "Enginar yaprağı, Deve dikeni (silymarin), Zerdeçal, Pancar suyu", not: "Detoks için 10 gün enginar kürü; yemekten önce 1 fincan." },
  "Böbrek": { bitki: "Maydanoz suyu, Karahindiba, Mısır püskülü, Bol ılık su", not: "Sabah aç karna 1 demet maydanoz çayı; günde 2 lt su." },
  "Akciğer": { bitki: "Hatmi kökü, Ada çayı, Bal + taze limon, Zerdeçal sütü", not: "Sıcak buhar inhalasyonu + boğmaca otu çayı; sigara bırakma şart." },
  "Kalp": { bitki: "Alıç çayı, Sarımsak (çiğ), Soğuk sıkım zeytinyağı, Magnezyum", not: "Akşam 1 fincan alıç; haftada 3 gün balık (omega-3)." },
  "Damarlar": { bitki: "Sarımsak, Zencefil, At kestanesi, K2 vitamini (tereyağı)", not: "Sabah aç karna 1 diş sarımsak + 1 yk zeytinyağı." },
  "Mide": { bitki: "Rezene, Anason, Zencefil, Probiyotik yoğurt", not: "Yemekten sonra rezene çayı; ekşime için karbonatlı su değil, anason." },
  "Bağırsak": { bitki: "Ev mayalı yoğurt, Kefir, Keten tohumu, Yulaf lifi", not: "Günde 2 kase ev yoğurt + 1 yk keten tohumu; bol lifli sebze." },
  "Pankreas": { bitki: "Tarçın, Çörek otu, Ceviz, Yeşil çay", not: "Sabah çörek otu yağı 1 tk; tatlıdan uzak dur, kan şekeri düzenler." },
  "Tiroid": { bitki: "Brezilya cevizi (selenyum), Yosun (iyot), Çörek otu", not: "Günde 2 Brezilya cevizi yeterli; aşırı soya yok." },
  "Hormonal Sistem": { bitki: "Çuha çiçeği yağı, Ada çayı (kadın), Çörek otu (erkek)", not: "Plastik ambalajdan uzak dur — endokrin bozucu." },
  "Bağışıklık": { bitki: "Karaağaç, Ekinezya, C vitamini (kuşburnu), Ham bal, Propolis", not: "Sabah 1 tk propolis + ılık su; D vitamini düzeyini kontrol ettir." },
  "Cilt": { bitki: "Aloe vera jeli, Soğuk sıkım zeytinyağı, E vitamini (badem), Çinko (kabak çekirdeği)", not: "Bol su + dengeli omega-3; sabunlu temizleyiciden kaçın." },
  "Beyin": { bitki: "Yaban mersini, Ceviz, Somon (omega-3), Biberiye", not: "Haftada 3 gün balık; biberiye çayı hafızaya iyi gelir." },
  "Sinir Sistemi": { bitki: "Melisa, Lavanta, Pasiflora, Magnezyum (kabak çekirdeği)", not: "Akşam 1 fincan melisa çayı; kafeini öğleden sonra kes." },
  "Kan": { bitki: "Pancar suyu, Ispanak, Kuru kayısı, Pekmez", not: "Demir eksikliği için sabah 1 yk pekmez + 1 limon (C vit emilim)." },
  "Kemik": { bitki: "Susam, Pekmez, Tahin, D vitamini (güneş)", not: "Günde 2 yk tahin-pekmez; günlük 15 dk güneş." },
  "Kaslar": { bitki: "Magnezyum, Potasyum (muz, hurma), Protein (yumurta, et)", not: "Egzersiz sonrası muz; gece magnezyum kas spazmını önler." },
  "Hücre": { bitki: "Zerdeçal, Yeşil çay, Yaban mersini, Karadut", not: "Antioksidan: günde 2 fincan yeşil çay + zerdeçallı süt." },
};

// Sonuç maddesinin etkilediği organlara göre destek önerilerini topla
function organDestekToparla(organlar) {
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
const DOGAL_TARIF = {
  // GIDA
  "cips": { baslik: "Fırınlanmış Nohut", sure: "25 dk", malzeme: ["Haşlanmış nohut 1 su bardağı","Zeytinyağı 1 yemek kaşığı","Tuz, pul biber, kimyon"], adimlar: "Nohutları kurulayın, zeytinyağı ve baharatlarla karıştırın, 200°C fırında 20 dk pişirin." },
  "misir": { baslik: "Fırınlanmış Mısır Cipsi", sure: "20 dk", malzeme: ["Mısır unu 1 su bardağı","Su yarım bardak","Tuz, pul biber"], adimlar: "Malzemeleri karıştırın, ince açın, 180°C'de 15 dk pişirin." },
  "şeker": { baslik: "Hurmalı Enerji Topu", sure: "10 dk", malzeme: ["Hurma 10 adet","Badem 1 avuç","Kakao 1 yemek kaşığı","Hindistan cevizi"], adimlar: "Tüm malzemeleri blenderdan geçirin, top şekli verin, buzdolabında 30 dk bekletin." },
  "aspartam": { baslik: "Stevia'lı Limonata", sure: "5 dk", malzeme: ["Taze limon suyu 3 adet","Su 1 litre","Stevia 5-6 yaprak veya birkaç damla"],  adimlar: "Limon suyunu suyla karıştırın, stevia ekleyin, buzlu servis edin." },
  "margarin": { baslik: "Ev Tereyağlı Kurabiye", sure: "30 dk", malzeme: ["Gerçek tereyağı 100g","Tam buğday unu 200g","Bal 2 yemek kaşığı","Yumurta 1 adet"], adimlar: "Malzemeleri yoğurun, 180°C'de 12 dk pişirin." },
  "sosis": { baslik: "Ev Yapımı Tavuk Köfte", sure: "20 dk", malzeme: ["Kıyma (tavuk/dana) 300g","Soğan 1 küçük","Maydanoz","Tuz, karabiber"], adimlar: "Malzemeleri karıştırın, şekil verin, tavada veya fırında pişirin." },
  "ketçap": { baslik: "Ev Domates Sosu", sure: "15 dk", malzeme: ["Taze domates 4 adet","Sarımsak 2 diş","Zeytinyağı","Tuz, kekik"], adimlar: "Domatesleri soyun, sarımsakla soteleyin, 10 dk pişirin, blenderdan geçirin." },
  "mayonez": { baslik: "Ev Yapımı Mayonez", sure: "5 dk", malzeme: ["Yumurta sarısı 1 adet","Zeytinyağı 150ml","Limon suyu 1 yemek kaşığı","Tuz"], adimlar: "Yumurta sarısını çırpın, zeytinyağını damla damla ekleyin, limon ve tuz ile tatlandırın." },
  "hazir": { baslik: "Ev Çorbası (Tavuk Suyu)", sure: "30 dk", malzeme: ["Tavuk kemiği 2 parça","Havuç 1 adet","Soğan 1 adet","Tuz, defne yaprağı"], adimlar: "Tüm malzemeleri 25 dk kaynatın, süzün, taze çorba hazır." },
  "paket": { baslik: "Sebzeli Mercimek Çorbası", sure: "25 dk", malzeme: ["Kırmızı mercimek 1 su bardağı","Havuç 1 adet","Soğan 1 adet","Zeytinyağı, tuz, kimyon"], adimlar: "Soğanı kavurun, havuç ve mercimeği ekleyin, 20 dk pişirin, blenderdan geçirin." },
  "kolesterol": { baslik: "Zeytinyağlı Fasulye", sure: "20 dk", malzeme: ["Taze fasulye 300g","Zeytinyağı 2 yemek kaşığı","Domates 2 adet","Sarımsak, tuz"], adimlar: "Domatesi soteleyip fasulye ekleyin, 15 dk pişirin." },
  "trans": { baslik: "Avokadolu Ekmek", sure: "5 dk", malzeme: ["Avokado 1 adet","Tam tahıl ekmek 2 dilim","Limon suyu","Tuz, pul biber"], adimlar: "Avokadoyu ezip ekmeğe sürün, limon ve baharatla tatlandırın." },
  "boyar": { baslik: "Doğal Meyveli Gummies", sure: "15 dk", malzeme: ["Taze meyve suyu 200ml","Jelatin 2 yemek kaşığı","Bal 1 yemek kaşığı"], adimlar: "Jelatin meyve suyunda eritin, bal ekleyin, kalıplara dökün, 1 saat buzdolabında bekletin." },
  "kafein": { baslik: "Melisa Limonata", sure: "5 dk", malzeme: ["Taze melisa 10 yaprak","Su 500ml","Limon suyu 1 adet","Bal"], adimlar: "Melisayı demleyin, soğutun, limon ve bal ekleyin." },
  "nitrit": { baslik: "Ev Pastırmalı Yumurta", sure: "10 dk", malzeme: ["Yumurta 2 adet","Pastırma (gerçek, katkısız) 50g","Zeytinyağı"], adimlar: "Pastırmayı soteleyin, üstüne yumurta kırın, pişirin." },
  "kola": { baslik: "Ev Limonatası (Karbondioksitsiz)", sure: "5 dk", malzeme: ["Taze limon 3 adet","Su 1 litre","Bal veya hurma şurubu 2 yemek kaşığı","Nane yaprak"], adimlar: "Limon suyunu sıkın, suyla karıştırın, bal ile tatlandırın, nane ekleyin, buzlu servis edin." },
  "gazlı": { baslik: "Doğal Komposto", sure: "10 dk", malzeme: ["Mevsim meyvesi 500g","Su 1 litre","Bal 2 yemek kaşığı"], adimlar: "Meyveyi suyla 8 dk kaynatın, soğutun, bal ekleyin, buzdolabında bekletin." },
  "sucuk": { baslik: "Geleneksel Ev Sucuğu", sure: "7 gün kurutma", malzeme: ["Dana eti 1kg","Sarımsak 1 baş","Çemen otu, kimyon, kırmızı biber","Tuz (nitritsiz)"], adimlar: "Eti çekin, baharatlarla yoğurun, doğal bağırsağa doldurun, serin yerde 7 gün kurutun. Nitrit eklenmez." },
  "salam": { baslik: "Ev Tavuk Jambonu", sure: "1 saat", malzeme: ["Tavuk göğüs 500g","Tuz, karabiber, sarımsak","Defne yaprağı"], adimlar: "Tavuğu baharatlayın, alüminyum folyoya sarın, 90°C'de 1 saat fırınlayın. Soğuyunca dilimleyin." },
  "jambon": { baslik: "Ev Jambon", sure: "2 saat", malzeme: ["Hindi göğüs 1kg","Tuz, karabiber, rezene, defne"], adimlar: "Eti baharatlayın, düşük sıcaklıkta (100°C) 2 saat pişirin, soğuyunca buzdolabında saklayın." },
  "çikolata": { baslik: "Ev Kakao Topları", sure: "15 dk", malzeme: ["Saf kakao tozu 3 yk","Hindistan cevizi yağı 2 yk","Bal 2 yk","Ceviz/badem"], adimlar: "Eritilmiş yağa kakao ve bal karıştırın, kuruyemiş ekleyin, küçük toplar yapın, dondurun." },
  "kakao": { baslik: "Sıcak Çikolata (Doğal)", sure: "5 dk", malzeme: ["Saf kakao 1 yk","Süt 250ml","Bal 1 yk","Tarçın"], adimlar: "Sütü ısıtın, kakao ve bal ekleyin, çırpın, tarçınla servis edin." },
  "peynir": { baslik: "Ev Lor Peyniri", sure: "20 dk", malzeme: ["Süt 1 litre","Limon suyu 3 yk","Tuz"], adimlar: "Sütü kaynatın, limon suyu ekleyip kesilmesini bekleyin, süzgeçten geçirin, tuz katın." },
  "yoğurt": { baslik: "Ev Mayalı Yoğurt", sure: "8 saat", malzeme: ["Tam yağlı süt 1 litre","Doğal yoğurt 1 yk maya"], adimlar: "Sütü 85°C'ye ısıtın, 45°C'ye soğutun, mayayı ekleyin, sıcak yerde 6-8 saat bekletin." },
  "süt": { baslik: "Ev Yapımı Badem Sütü", sure: "15 dk", malzeme: ["Badem 1 su bardağı","Su 1 litre","Hurma 2 adet (opsiyonel)"], adimlar: "Bademi gece ıslatın, suyla blenderden geçirin, süzün, hurma ile tatlandırın." },
  "gofret": { baslik: "Ev Yulaflı Bar", sure: "20 dk", malzeme: ["Yulaf 1 sb","Bal 3 yk","Fıstık ezmesi 2 yk","Kuru meyve"], adimlar: "Malzemeleri karıştırın, tepsiye yayın, 180°C'de 15 dk pişirin, soğuyunca kesin." },
  "kek": { baslik: "Hurmalı Tam Buğday Kek", sure: "40 dk", malzeme: ["Tam buğday unu 2 sb","Hurma püresi 1 sb","Yumurta 3 adet","Tereyağı 100g","Karbonat 1 tk"], adimlar: "Yaş malzemeleri karıştırın, una ekleyin, 180°C'de 30 dk pişirin." },
  "bisküvi": { baslik: "Ev Yulaflı Kurabiye", sure: "25 dk", malzeme: ["Yulaf 1 sb","Tam buğday unu yarım sb","Muz 1 adet","Tarçın, ceviz"], adimlar: "Muz ezilip diğer malzemelerle karıştırılır, top yapılır, 180°C'de 15 dk pişirilir." },
  "krem": { baslik: "Ev Doğal Yüz Kremi", sure: "10 dk", malzeme: ["Hindistan cevizi yağı 2 yk","Shea yağı 1 yk","E vitamini 5 damla","Lavanta yağı 3 damla"], adimlar: "Yağları benmari usulü eritin, soğurken çırpın, küçük kavanoza alın." },
  "şampuan": { baslik: "Bitkisel Şampuan", sure: "5 dk", malzeme: ["Kastil sabun 100ml","Hindistan cevizi yağı 1 yk","Lavanta veya biberiye yağı 10 damla","Su 100ml"], adimlar: "Malzemeleri pompalı şişeye karıştırın. Saç tipinize göre yağ oranını ayarlayın." },
  "sabun": { baslik: "Kastil Sabun (Sade)", sure: "1 gün kurutma", malzeme: ["Zeytinyağı 500ml","Su 200ml","Doğal kostik (NaOH) 70g","Lavanta yağı"], adimlar: "DİKKAT: NaOH suya yavaşça eklenir (tersi değil). Yağa katılır, kıvam alınca kalıba dökülür, 4 hafta kurutulur." },
  "diş macunu": { baslik: "Karbonatlı Diş Macunu", sure: "3 dk", malzeme: ["Karbonat 2 yk","Hindistan cevizi yağı 2 yk","Nane yağı 5 damla"], adimlar: "Yağı eritin, karbonat ve nane ekleyin, küçük kavanoza alın. Diş fırçasına az miktarda alıp kullanın." },
  "deodorant": { baslik: "Doğal Deodorant", sure: "5 dk", malzeme: ["Karbonat 2 yk","Mısır nişastası 2 yk","Hindistan cevizi yağı 3 yk","Çay ağacı yağı 5 damla"], adimlar: "Yağ eritip diğerleriyle karıştırın, küçük şişeye alın." },
  "tereyağı": { baslik: "Ev Tereyağı", sure: "15 dk", malzeme: ["Tam yağlı krema 500ml","Tuz (opsiyonel)"], adimlar: "Kremayı mikserde 10-15 dk çırpın, tereyağı ve ayran ayrışır. Tereyağını soğuk suyla yıkayın, kalıba alın." },
  "bal": { baslik: "Limonlu Bal Karışımı", sure: "2 dk", malzeme: ["Ham bal 1 yk","Taze limon suyu 1 yk","Sıcak su 200ml","Tarçın"], adimlar: "Sıcak suya bal ve limon ekleyin, karıştırın. Sabah aç karna için." },
  "reçel": { baslik: "Şekersiz Ev Reçeli", sure: "30 dk", malzeme: ["Taze meyve 500g","Hurma 5-6 adet (tatlandırıcı)","Limon suyu 1 yk"], adimlar: "Meyveleri hurma ile kaynatın, blenderden geçirin, 15 dk daha kısık ateşte pişirin, kavanozlayın." },
  "tuzlu balık": { baslik: "Fırın Mevsim Balığı", sure: "20 dk", malzeme: ["Taze balık 2 adet","Limon, zeytinyağı","Maydanoz, tuz, karabiber"], adimlar: "Balığı baharatlayın, alüminyum folyoya sarın, 200°C'de 15 dk pişirin." },
  "tavuk": { baslik: "Köy Tavuğu Sote", sure: "25 dk", malzeme: ["Organik tavuk 500g","Soğan, sarımsak","Domates 2 adet","Zeytinyağı, baharat"], adimlar: "Soğanı yağda kavurun, tavuğu ekleyin, domatesle 20 dk pişirin." },
  "ekmek": { baslik: "Ev Ekşi Maya Ekmeği", sure: "1 gün", malzeme: ["Tam buğday unu 500g","Su 350ml","Ekşi maya 100g","Tuz"], adimlar: "Malzemeleri yoğurun, 8 saat dinlendirin, şekil verin, 230°C'de 35 dk pişirin." },
  "yumuşatıcı": { baslik: "Sirkeli Çamaşır Yumuşatıcı", sure: "2 dk", malzeme: ["Beyaz sirke 200ml","Lavanta yağı 10 damla"], adimlar: "Karıştırın, durulama bölmesine 50ml ekleyin. Sirke kokusu kurumayla geçer, yumuşaklık kalır." },
  "fındık": { baslik: "Ev Çikolatalı Fındık Kreması", sure: "10 dk", malzeme: ["Çiğ fındık 200g","Saf kakao 3 yk","Bal 3 yk","Hindistan cevizi yağı 2 yk"], adimlar: "Fındığı blenderden püre yapın, diğerlerini ekleyin, kavanoza alın." },
  "fıstık": { baslik: "Saf Fıstık Ezmesi", sure: "10 dk", malzeme: ["Çiğ yer fıstığı 300g","Tuz az miktar","Hindistan cevizi yağı 1 yk (opsiyonel)"], adimlar: "Fındığı 160°C'de 10 dk kavurun, blenderden krema kıvamına gelene kadar geçirin." },
  "donut": { baslik: "Fırın Tarçınlı Çörek", sure: "30 dk", malzeme: ["Tam buğday unu 2 sb","Süt 1 sb","Yumurta 1","Bal 3 yk","Tarçın","Maya"], adimlar: "Hamuru yoğurun, 1 saat mayalayın, halka şekli verin, fırında 180°C'de 18 dk pişirin." },
  "şipşak": { baslik: "Ev Yapımı Patates Cipsi", sure: "30 dk", malzeme: ["Patates 3 adet","Zeytinyağı 2 yk","Tuz, biberiye"], adimlar: "Patatesi çok ince dilimleyin, yağ ve baharatla karıştırın, 200°C'de 20 dk pişirin." },
  "patates": { baslik: "Fırın Baharatlı Patates", sure: "30 dk", malzeme: ["Patates 4 adet","Zeytinyağı, kekik, biberiye, tuz"], adimlar: "Patatesi yıkayıp dilimleyin, yağ ve baharatla harmanlayın, 200°C'de 25 dk pişirin." },
  "bira": { baslik: "Kombucha (Doğal Fermente İçecek)", sure: "7 gün", malzeme: ["Yeşil çay 1 litre","Şeker 100g","SCOBY mayası","Cam kavanoz"], adimlar: "Çayı şekerle demleyin, soğutun, SCOBY ekleyin, 7 gün kapalı bekletin." },
  "şarap": { baslik: "Üzüm Şırası (Alkolsüz)", sure: "30 dk", malzeme: ["Taze üzüm 1kg","Su 500ml","Karanfil, tarçın"], adimlar: "Üzümü ezin, baharatlarla 25 dk kaynatın, süzün. Soğuk veya sıcak içilir." },
  "konserve": { baslik: "Taze Konserve Domates", sure: "1 saat", malzeme: ["Taze domates 1kg","Tuz, sarımsak, fesleğen","Cam kavanoz"], adimlar: "Domatesi soyup doğrayın, baharatlarla 30 dk kaynatın, sıcakken kavanoza alın, kaynamış kapaklarla kapatın." },
  "tuzlu": { baslik: "Az Tuzlu Lezzet Sosu", sure: "5 dk", malzeme: ["Limon suyu","Zeytinyağı","Taze otlar (kekik, fesleğen)","Sarımsak"], adimlar: "Malzemeleri karıştırın, salata, et veya sebzeye sürün. Tuz yerine lezzet katar." },
  "kuru": { baslik: "Ev Kuru Meyve", sure: "8 saat", malzeme: ["Mevsim meyvesi","Limon suyu"], adimlar: "Meyveyi ince dilimleyin, limon suyu sürün, 60°C'de fırında 6-8 saat kurutun." },
  "enerji": { baslik: "Ham Bal + Ceviz Enerji", sure: "2 dk", malzeme: ["Ham bal 1 yk","Ceviz 5-6 adet","Tarçın"], adimlar: "Cevizi balla karıştırın, tarçınla tatlandırın. 1 yk sabah aç karna enerji verir." },
  "yapay tatlandırıcı": { baslik: "Stevia Limonata", sure: "5 dk", malzeme: ["Stevia yaprağı 5","Limon 2","Su 1 litre","Nane"], alıntı: "doğal", adimlar: "Stevia'yı suya katın, limon ekleyin, naneli buzlu servis edin." },

  // TEMİZLİK
  "klorin": { baslik: "Doğal Çok Amaçlı Temizleyici", sure: "2 dk", malzeme: ["Beyaz sirke 1 su bardağı","Su 1 su bardağı","Çay ağacı yağı 10 damla"], adimlar: "Malzemeleri sprey şişeye koyun. Yüzeylere püskürterek kullanın." },
  "amonyak": { baslik: "Cam Temizleyici (Doğal)", sure: "2 dk", malzeme: ["Beyaz sirke yarım su bardağı","Su yarım su bardağı","Limon suyu 1 yemek kaşığı"], adimlar: "Karıştırıp sprey şişeye koyun. Gazete ile silin, leke kalmaz." },
  "parfüm": { baslik: "Doğal Koku Giderici", sure: "2 dk", malzeme: ["Kabartma tozu 3 yemek kaşığı","Lavanta esansiyel yağı 5 damla"], adimlar: "Karıştırın, koku giderilecek yüzeye serpin, 15 dk bekleyin, süpürün." },
  "çamaşir": { baslik: "Doğal Çamaşır Deterjanı", sure: "5 dk", malzeme: ["Rendelenmiş sabun 50g","Karbonat 2 yemek kaşığı","Soda külü 2 yemek kaşığı"], adimlar: "Tüm malzemeleri karıştırın. Her yıkama için 2 yemek kaşığı kullanın." },
  "deterjan": { baslik: "Doğal Bulaşık Deterjanı", sure: "5 dk", malzeme: ["Kastil sabun 100ml","Limon suyu 2 yemek kaşığı","Tuz 1 tatlı kaşığı"], adimlar: "Karıştırıp şişeye doldurun. Normal bulaşık deterjanı gibi kullanın." },
  "NaOH": { baslik: "Doğal Lavabo Açıcı", sure: "5 dk", malzeme: ["Karbonat yarım su bardağı","Beyaz sirke yarım su bardağı","Kaynar su 1 litre"], adimlar: "Önce karbonat, sonra sirke dökün, köpürmeyi bekleyin, ardından kaynar su dökün." },
  "quat": { baslik: "Doğal Zemin Temizleyici", sure: "2 dk", malzeme: ["Beyaz sirke 2 yemek kaşığı","Sıcak su 1 litre","Lavanta yağı 5 damla"], adimlar: "Karıştırıp kovaya ekleyin, zemine uygulayın." },
  "kireç": { baslik: "Doğal Kireç Çözücü", sure: "10 dk", malzeme: ["Sitrik asit 2 yemek kaşığı","Sıcak su 500ml"], adimlar: "Sitrik asidi suda eritin, kireçli yüzeye sürün, 5-10 dk bekleyin, silin." },
  "küf": { baslik: "Doğal Küf Önleyici", sure: "2 dk", malzeme: ["Hidrojen peroksit %3 yarım su bardağı","Su yarım su bardağı","Çay ağacı yağı 10 damla"], adimlar: "Sprey şişeye koyun, küflü yüzeye püskürterek uygulayın." },
  "plastik": { baslik: "Çevre Dostu Temizlik Seti", sure: "5 dk", malzeme: ["Karbonat","Beyaz sirke","Limon","Kastil sabun"], adimlar: "4 malzemeyle mutfak, banyo, zemin temizlenebilir. Detay için her birini ayrı kullanın." },
};

// Ürün TÜRÜ tespiti — kullanıcının yapıştırdığı metinden ürün türünü çıkarır
// 8 kategori için ayrı türler. urun_a (ürün adı/marka) güçlü; icerik (içerik kodu ipuçları) zayıf.
const URUN_TURLERI = [
  // === GIDA ===
  { kategori: "gida", tur: "icecek_gazli", baslik: "Gazlı İçecek", urun_a: ["kola","cola","gazoz","fanta","sprite","soda","seven up","7up","pepsi","dr pepper","gazli","gazlı","carbonated"], icerik: ["e338","fosforik asit","karbondioksit","co2","karamel renk","e150"], alternatif: "Kombucha · Şalgam suyu · Maden suyu + taze meyve · Geleneksel boza · Doğal limonata", marketUrun: "Doğal Kombucha (sade/zencefil) · Şalgam Suyu (geleneksel) · Maden Suyu", tarifKey: "kola" },
  { kategori: "gida", tur: "icecek_meyve", baslik: "Hazır Meyve Suyu", urun_a: ["meyve suyu","portakal suyu","elma suyu","vişne suyu","şeftali suyu","nektar","cappy","dimes","tropicana","içim"], icerik: ["%100 meyve","konsantre meyve","askorbik asit (e300)"], alternatif: "Taze sıkılmış meyve suyu · Ev kompostu · Gül/vişne şerbeti · Hoşaf", marketUrun: "Taze Sıkılmış Portakal Suyu · Ev Kompostu (kavanoz) · Geleneksel Şerbet", tarifKey: "kola" },
  { kategori: "gida", tur: "icecek_enerji", baslik: "Enerji İçeceği", urun_a: ["red bull","monster","burn","enerji içec","energy drink","ice tea","fuse tea","nestea","lipton ice"], icerik: ["taurin","glukuronolakton","inositol"], alternatif: "Ham bal + limon · Yeşil çay · Hurma sıkması · Karpuz suyu (taze)", marketUrun: "Ham Bal · Yeşil Çay (Turkey origin) · Hurma", tarifKey: "kafein" },
  { kategori: "gida", tur: "kek_tatli", baslik: "Kek / Pasta / Tatlı", urun_a: ["kek","pasta","brownie","muffin","cup cake","kruvasan","milföy","baklava","trileçe","tiramisu"], icerik: ["kabartma tozu","glaze"], alternatif: "Hurmalı tam buğday kek · Tahin-pekmez · Helva (un/tahin) · Lokma", marketUrun: "Hurmalı Ev Keki · Tahin + Pekmez · Geleneksel Helva", tarifKey: "kek" },
  { kategori: "gida", tur: "biskuvi", baslik: "Bisküvi / Kraker", urun_a: ["bisküvi","biskuvi","kraker","cracker","galeta","etimek","albeni","negro","oreo"], icerik: [], alternatif: "Ev yulaflı kurabiye · Tam buğday galetası · Çiğ kuruyemiş", marketUrun: "Yulaflı Ev Kurabiyesi · Tam Buğday Galeta · Çiğ Badem/Ceviz", tarifKey: "bisküvi" },
  { kategori: "gida", tur: "gofret_cikolata", baslik: "Çikolata / Gofret", urun_a: ["gofret","çikolata","cikolata","wafer","snickers","mars","twix","kitkat","milka"], icerik: ["kakao kütlesi","palm yağı","lesitin","e322"], alternatif: "Saf bitter çikolata (%70+ kakao) · Ev kakao topları · Hurma + ceviz", marketUrun: "Bitter Çikolata %85 · Hurma + Ceviz · Ev Kakao Topları", tarifKey: "çikolata" },
  { kategori: "gida", tur: "cips", baslik: "Cips / Atıştırmalık", urun_a: ["cips","chips","patates kız","ruffles","lays","doritos","cheetos","çerezza","patos","pop corn","popcorn"], icerik: ["msg","e621","e627","e631","aroma artırıcı"], alternatif: "Fırında patates dilimleri · Çiğ kuruyemiş · Kuru meyve · Ev mısır patlağı", marketUrun: "Çiğ Badem/Fındık/Ceviz · Kuru İncir/Kayısı · Organik Mısır", tarifKey: "cips" },
  { kategori: "gida", tur: "sucuk_salam", baslik: "İşlenmiş Et", urun_a: ["sucuk","salam","sosis","jambon","pastırma","salami","frankfurter","hot dog","kangal"], icerik: ["e250","sodyum nitrit","nitrit","sodyum nitrat","e252"], alternatif: "Geleneksel kuru sucuk (nitritsiz) · Ev jambonu (kendi tavuğun) · Çiğ et", marketUrun: "Geleneksel Kuru Sucuk (nitritsiz) · Ev Pastırması · Köy Eti", tarifKey: "sucuk" },
  { kategori: "gida", tur: "yogurt", baslik: "Yoğurt", urun_a: ["yoğurt","yogurt","ayran","sütlü tatlı"], icerik: ["süt mayası","l. acidophilus","probiyotik","fermente süt"], alternatif: "Ev mayalı tam yağlı yoğurt · Çiğ süt kefiri · Köy ayranı", marketUrun: "Ev Mayalı Yoğurt · Çiğ Süt Kefiri · Köy Ayranı", tarifKey: "yoğurt" },
  { kategori: "gida", tur: "peynir", baslik: "Peynir", urun_a: ["peynir","beyaz peynir","kaşar","cheddar","feta","mozzarella","labne","lor"], icerik: ["süt tozu","peynir altı suyu"], alternatif: "Çiğ süt peyniri (otlatılmış inek/koyun/keçi) · Köy peyniri · Ev loru", marketUrun: "Köy Beyaz Peyniri · Otlatılmış Koyun Tulum · Ev Loru", tarifKey: "peynir" },
  { kategori: "gida", tur: "sut", baslik: "Süt", urun_a: ["uht süt","uht süt","laktozsuz süt","tam yağlı süt"], icerik: ["uht","laktoz"], alternatif: "Çiğ süt (sertifikalı) · Badem sütü · Hindistan cevizi sütü · Köy sütü", marketUrun: "Sertifikalı Çiğ Süt · Ev Badem Sütü · Hindistan Cevizi Sütü", tarifKey: "süt" },
  { kategori: "gida", tur: "dondurma", baslik: "Dondurma", urun_a: ["dondurma","ice cream","magnum","cornetto","algida","golf","milkshake"], icerik: ["e407","karagenan","e466"], alternatif: "Ev meyve sorbesi · Maraş dondurması (geleneksel salepli) · Donmuş yoğurt + bal", marketUrun: "Maraş Dondurması (geleneksel) · Ev Meyve Sorbesi · Salepli Dondurma", tarifKey: "süt" },
  { kategori: "gida", tur: "ekmek", baslik: "Ekmek / Hamur İşi", urun_a: ["ekmek","tost ekmeği","sandviç ekmeği","baget","simit","poğaca","francala","kepek ekmek"], icerik: ["mono ve digliseritler","e472","e471"], alternatif: "Ekşi maya tam buğday ekmek · Siyez/kavılca ekmeği · Köy ekmeği", marketUrun: "Ekşi Maya Ekmek · Siyez Ekmeği · Köy Ekmeği", tarifKey: "ekmek" },
  { kategori: "gida", tur: "sakiz", baslik: "Sakız / Şekerleme", urun_a: ["sakız","sakiz","chewing gum","falim","first","mentos","tic tac","airwaves","stride","chiclets","ülker sakız","jelly"], icerik: [], alternatif: "Doğal ağız tazeleyici: Karanfil · Kakule · Maydanoz · Şekersiz ev mastik sakızı", marketUrun: "Doğal Mastik Sakızı (Sakız Adası) · Karanfil · Kakule", tarifKey: null },
  { kategori: "gida", tur: "yag", baslik: "Margarin / Rafine Yağ", urun_a: ["margarin","sade yağ","kahvaltılık margarin","sana","becel","ayçiçek yağı","mısır yağı","kanola","rafine yağ"], icerik: ["kısmen hidrojenize","trans yağ"], alternatif: "Ev tereyağı (krema çırparak) · Soğuk sıkım zeytinyağı · Geleneksel sade yağ", marketUrun: "Soğuk Sıkım Zeytinyağı · Ev Tereyağı · Köy Sade Yağı", tarifKey: "tereyağı" },
  { kategori: "gida", tur: "soslar", baslik: "Hazır Sos", urun_a: ["ketçap","ketcap","mayonez","hazır sos","barbekü","hardal","ranch","cesar"], icerik: [], alternatif: "Ev domates sosu · Ev mayonezi · Sumak + zeytinyağı · Tahin-pekmez", marketUrun: "Ev Domates Sosu (kavanoz) · Sumak + Zeytinyağı Seti · Tahin", tarifKey: "ketçap" },
  { kategori: "gida", tur: "konserve", baslik: "Konserve", urun_a: ["konserve","ton balığı","ringa","sardalye","mısır konserve","bezelye konserve"], icerik: [], alternatif: "Taze balık · Ev konservesi (cam kavanoz) · Taze sebze", marketUrun: "Cam Kavanoz Ev Konservesi · Taze Sebze (haftalık)", tarifKey: "konserve" },
  { kategori: "gida", tur: "recel_krem", baslik: "Reçel / Sürülebilir", urun_a: ["reçel","recel","marmelat","kahvaltı kreması","krem çikolata","nutella","sürülebilir","fıstık ezme"], icerik: [], alternatif: "Şekersiz ev reçeli · Tahin-pekmez · Ham bal · Saf fıstık ezmesi", marketUrun: "Şekersiz Ev Reçeli · Tahin + Pekmez · Ham Bal", tarifKey: "reçel" },
  { kategori: "gida", tur: "kahve", baslik: "Hazır Kahve", urun_a: ["hazır kahve","granül kahve","3'ü 1 arada","nescafe","jacobs","3 in 1"], icerik: [], alternatif: "Türk kahvesi · Filtre kahve (taze çekilmiş) · Hindiba kahvesi", marketUrun: "Türk Kahvesi (Mehmet Efendi) · Taze Çekilmiş Filtre Kahve · Hindiba", tarifKey: "kafein" },
  { kategori: "gida", tur: "tatlandirici", baslik: "Şeker / Tatlandırıcı", urun_a: ["canderel","sweet n low","sweet'n low","splenda","equal","huxol","stevia tablet","stevia toz","şeker küpü","küp şeker","kesme şeker","toz tatlandırıcı","beyaz şeker","rafine şeker"], icerik: [], alternatif: "Ham bal · Pekmez (üzüm, keçiboynuzu, dut) · Hurma şurubu · Saf stevia yaprağı · Pekmez", marketUrun: "Ham Bal · Üzüm Pekmezi · Hurma Şurubu · Stevia Yaprağı", tarifKey: "aspartam" },

  // === KOZMETİK ===
  { kategori: "kozmetik", tur: "yuz_kremi", baslik: "Yüz Kremi / Nemlendirici", urun_a: ["yüz kremi","face cream","nemlendirici","moisturizer","anti-aging","gece kremi","gündüz kremi","krem"], icerik: [], alternatif: "Hindistan cevizi yağı · Shea yağı · Argan yağı · Aloe vera jeli", tarifKey: "krem" },
  { kategori: "kozmetik", tur: "sampuan", baslik: "Şampuan", urun_a: ["şampuan","shampoo","saç şampuanı"], icerik: ["sls","sodium lauryl sulfate"], alternatif: "Kastil sabun (saç için) · Defne sabunu · Doğal şampuan barı · Kına suyu", tarifKey: "şampuan" },
  { kategori: "kozmetik", tur: "sabun", baslik: "Sabun", urun_a: ["sabun","soap","el sabunu","banyo sabunu","duş jeli","shower gel"], icerik: [], alternatif: "Zeytinyağı sabunu (kastil) · Defne sabunu · Süt sabunu · Halep sabunu", tarifKey: "sabun" },
  { kategori: "kozmetik", tur: "dis_macunu", baslik: "Diş Macunu", urun_a: ["diş macunu","toothpaste","ağız bakım"], icerik: ["florür","sodium fluoride"], alternatif: "Karbonat + nane yağı · Misvak · Karbonatlı doğal diş macunu", tarifKey: "diş macunu" },
  { kategori: "kozmetik", tur: "deodorant", baslik: "Deodorant", urun_a: ["deodorant","antiperspirant","ter önleyici","roll-on"], icerik: ["alüminyum","aluminum chlorohydrate"], alternatif: "Karbonat + Hindistan cevizi yağı + nişasta · Şap taşı · Doğal deodorant", tarifKey: "deodorant" },
  { kategori: "kozmetik", tur: "makyaj", baslik: "Makyaj", urun_a: ["ruj","lipstick","far","maskara","fondöten","makyaj","mascara","eyeshadow"], icerik: ["talk","mica"], alternatif: "Mineral makyaj (RMS, Ilia, BeautyCounter) · Doğal pigment kozmetik · Pancar pigmenti dudak", tarifKey: null },
  { kategori: "kozmetik", tur: "sac_boyasi", baslik: "Saç Boyası", urun_a: ["saç boyası","hair color","saç boyama","ağartıcı"], icerik: ["ammonia","ppd","p-fenilendiamin","hidrojen peroksit"], alternatif: "Kına (saf) · Doğal bitki bazlı boya (Logona, Khadi) · Hindiba", tarifKey: null },
  { kategori: "kozmetik", tur: "parfum", baslik: "Parfüm", urun_a: ["parfüm","perfume","eau de parfum","eau de toilette","edt","edp"], icerik: ["sentetik koku","fragrance","linalool"], alternatif: "Esansiyel yağlar (gül, lavanta, ud, sandal) · Doğal koku karışımı", tarifKey: null },

  // === TEMİZLİK ===
  { kategori: "temizlik", tur: "camasir_det", baslik: "Çamaşır Deterjanı", urun_a: ["çamaşır deterjanı","camasir deterjani","laundry detergent","ariel","persil","omo","alo"], icerik: [], alternatif: "Sabun rendesi + Karbonat + Soda külü · Sapindus (sabun fındığı)", tarifKey: "çamaşir" },
  { kategori: "temizlik", tur: "bulasik_det", baslik: "Bulaşık Deterjanı", urun_a: ["bulaşık deterjanı","dish soap","fairy","pril","sun"], icerik: [], alternatif: "Kastil sabun + Sitrik asit + Limon · Soda külü", tarifKey: "deterjan" },
  { kategori: "temizlik", tur: "camasir_suyu", baslik: "Çamaşır Suyu / Klorin", urun_a: ["çamaşır suyu","ace","domestos","bleach","klor","hipoklorit"], icerik: ["sodyum hipoklorit","klorin"], alternatif: "Sodyum perkarbonat (oksijenli ağartıcı) · Beyaz sirke · Güneşte kurutma", tarifKey: "klorin" },
  { kategori: "temizlik", tur: "cam_temizleyici", baslik: "Cam Temizleyici", urun_a: ["cam temizleyici","glass cleaner","cif vitra","windex","cam parlatıcı"], icerik: ["amonyak"], alternatif: "Beyaz sirke + Su + Limon (gazete ile silme)", tarifKey: "amonyak" },
  { kategori: "temizlik", tur: "yumusatici", baslik: "Çamaşır Yumuşatıcı", urun_a: ["çamaşır yumuşatıcı","fabric softener","yumoş","comfort","lenor"], icerik: ["quat","kuaterner amonyum"], alternatif: "Beyaz sirke + Lavanta esansiyel yağı", tarifKey: "yumuşatıcı" },
  { kategori: "temizlik", tur: "kufu_giderici", baslik: "Küf / Yüzey Temizleyici", urun_a: ["küf giderici","mold remover","yüzey temizleyici","cif"], icerik: ["quat","kuaterner"], alternatif: "Hidrojen peroksit %3 + Çay ağacı yağı · Karbonat + sirke", tarifKey: "küf" },
  { kategori: "temizlik", tur: "lavabo_acici", baslik: "Lavabo Açıcı", urun_a: ["lavabo açıcı","drain cleaner","sümbül","kostik"], icerik: ["naoh","sodyum hidroksit","sülfürik asit"], alternatif: "Karbonat + sirke + kaynar su · Mekanik açıcı (pompacı)", tarifKey: "NaOH" },
  { kategori: "temizlik", tur: "zemin", baslik: "Zemin / Yüzey", urun_a: ["zemin temizleyici","yüzey temizleyici","cif crema","mr proper"], icerik: [], alternatif: "Beyaz sirke + sıcak su + lavanta yağı · Karbonat", tarifKey: "quat" },
  { kategori: "temizlik", tur: "kirec", baslik: "Kireç Çözücü", urun_a: ["kireç çözücü","kireç sökücü","calc","kireç çözer"], icerik: [], alternatif: "Sitrik asit + sıcak su · Beyaz sirke", tarifKey: "kireç" },

  // === GİYİM ===
  { kategori: "giyim", tur: "spor_yagmurluk", baslik: "Spor / Yağmurluk", urun_a: ["spor","sportif","yağmurluk","kayak","outdoor","activewear"], icerik: ["pfas","pfoa","poliester","polyester","naylon"], alternatif: "PFAS-free spor giyim (Patagonia, Cottonique) · Doğal balmumlu pamuk yağmurluk · Yün outdoor" },
  { kategori: "giyim", tur: "ic_camasir", baslik: "İç Çamaşırı", urun_a: ["iç çamaşırı","underwear","bra","sutyen","külot","slip","tanga"], icerik: ["spandex","elastan","poliester"], alternatif: "GOTS organik pamuk · İpek (toksin-free) · Bambu lif" },
  { kategori: "giyim", tur: "tisort_pantolon", baslik: "Tişört / Pantolon / Gömlek", urun_a: ["tişört","gömlek","pantolon","jean","kot","hırka","kazak"], icerik: ["poliester","akrilik","viskon"], alternatif: "Organik pamuk (GOTS) · Saf keten · Türk doğal pamuğu · Yün" },
  { kategori: "giyim", tur: "mont", baslik: "Mont / Kaban", urun_a: ["mont","kaban","palto","ceket","trenç"], icerik: ["pfas","poliester dolgu"], alternatif: "Pamuk astar mont · Yün kaban · Doğal balmumlu kanvas · Kaşmir" },

  // === EV ===
  { kategori: "ev", tur: "yatak_yorgan", baslik: "Yatak / Yorgan / Yastık", urun_a: ["yatak","yorgan","yastık","mattress","pillow","nevresim","çarşaf"], icerik: ["bromine","fr","alev geciktirici","polyürethane"], alternatif: "GOTS sertifikalı pamuk dolgu yatak · Doğal lateks · Yün dolgu yorgan · Kapok yastık" },
  { kategori: "ev", tur: "hali", baslik: "Halı / Kilim", urun_a: ["halı","kilim","carpet","rug"], icerik: ["pvc taban","akrilik elyaf","naylon"], alternatif: "Anadolu yün halı (doğal boya) · Doğal pamuk kilim · Jüt halı · Sisal" },
  { kategori: "ev", tur: "mobilya", baslik: "Mobilya", urun_a: ["mobilya","koltuk","kanepe","masa","dolap","yatak başı","gardırop","sehpa"], icerik: ["formaldehit","mdf","sunta","özel pres"], alternatif: "Masif ahşap (kayın, meşe, ceviz) · Formaldehit-free · Doğal cila (keten yağı, balmumu)" },
  { kategori: "ev", tur: "perde", baslik: "Perde", urun_a: ["perde","curtain","stor","jaluzi"], icerik: ["poliester","alev geciktirici"], alternatif: "Doğal pamuk perde · Keten perde · Yün perde" },
  { kategori: "ev", tur: "mutfak_esyasi", baslik: "Mutfak Eşyası / Tava", urun_a: ["tava","tencere","sahan","pan","cookware","teflon"], icerik: ["ptfe","pfoa","teflon","alüminyum tava"], alternatif: "Dökme demir tava · Paslanmaz çelik · Seramik (PTFE-free) · Bakır kalaylı tencere" },

  // === BEBEK ===
  { kategori: "bebek", tur: "bebek_bezi", baslik: "Bebek Bezi", urun_a: ["bebek bezi","diaper","pampers","prima","molfix","huggies"], icerik: ["klorin","sap"], alternatif: "Organik pamuk bezi · Klorin-free biodegradable bez (Bambo Nature, Naty) · Bezelli sistem" },
  { kategori: "bebek", tur: "bebek_mamasi", baslik: "Bebek Maması", urun_a: ["bebek maması","formula","formül","bebelac","aptamil","sma","milupa"], icerik: [], alternatif: "Anne sütü (ön plan) · Organik ek gıda · Ev maması (yulaf + meyve püresi)" },
  { kategori: "bebek", tur: "bebek_krem", baslik: "Bebek Kremi / Yağı", urun_a: ["bebek kremi","baby cream","baby oil","bebek yağı","pişik","nivea bebek"], icerik: ["mineral oil","paraben"], alternatif: "Saf Hindistan cevizi yağı · Tatlı badem yağı · Shea yağı · Bal mumu balsamı" },
  { kategori: "bebek", tur: "bebek_giysi", baslik: "Bebek Giysi", urun_a: ["bebek tulumu","bebek giysi","baby clothes","tulum","zıbın","bebek pamuklu"], icerik: ["pfas","poliester"], alternatif: "GOTS organik pamuk · Bambu lif · Doğal renk pamuk · Saf yün" },
  { kategori: "bebek", tur: "bebek_oyuncak", baslik: "Bebek Oyuncağı", urun_a: ["oyuncak","toy","plush","puzzle","oyuncak ayı","peluş"], icerik: ["pvc","ftalat","bpa"], alternatif: "Ahşap oyuncak (boyasız, doğal cila) · Doğal pamuk peluş · BPA-free silikon · Yün figür" },
  { kategori: "bebek", tur: "mama_sisesi", baslik: "Mama Şişesi / Emzik", urun_a: ["biberon","mama şişesi","bottle","emzik","emzik tutucu"], icerik: ["bpa","bps"], alternatif: "BPA-free cam biberon · Paslanmaz çelik · Doğal kauçuk emzik" },

  // === EVCİL HAYVAN ===
  { kategori: "evcil", tur: "kopek_mamasi", baslik: "Köpek Maması", urun_a: ["köpek maması","dog food","royal canin","pro plan","hill's","purina","brit"], icerik: [], alternatif: "Tahılsız gerçek et maması (Acana, Orijen) · BARF (ham beslenme) · Ev maması (et+sebze)" },
  { kategori: "evcil", tur: "kedi_mamasi", baslik: "Kedi Maması", urun_a: ["kedi maması","cat food","whiskas","felix","sheba","gourmet"], icerik: [], alternatif: "Tahılsız gerçek et maması (Acana, Orijen) · Sentetik koruyucusuz · Ev maması (tavuk/balık)" },
  { kategori: "evcil", tur: "evcil_sampuan", baslik: "Evcil Şampuan", urun_a: ["evcil şampuan","pet shampoo","köpek şampuanı","kedi şampuanı"], icerik: [], alternatif: "Kastil sabun (sade) · Çay ağacı yağı + su · Neem yağı şampuan" },
  { kategori: "evcil", tur: "tasma_pire", baslik: "Tasma / Pire Önleyici", urun_a: ["tasma","pire önleyici","kene","flea collar","frontline","advantix","seresto"], icerik: ["fipronil","imidakloprid","permethrin"], alternatif: "Kimyasal işlemsiz deri tasma · Doğal pire koruma (limon + sirke) · Diyatomit toprağı" },

  // === İLAÇ / VİTAMİN ===
  { kategori: "ilac", tur: "agri_kesici", baslik: "Ağrı Kesici", urun_a: ["ağrı kesici","aspirin","parol","majezik","ibuprofen","paracetamol","nurofen","apranax"], icerik: [], alternatif: "Söğüt kabuğu çayı (doğal salisilik asit) · Zerdeçal (kurkumin) · İhlamur · Zencefil çayı (DİKKAT: ciddi/sürekli ağrıda hekime başvur)" },
  { kategori: "ilac", tur: "antiasit", baslik: "Mide İlacı / Antasit", urun_a: ["antasit","gaviscon","talcid","mide ilacı","rennie","nexium"], icerik: [], alternatif: "Karbonat + su (anlık) · Zencefil çayı · Papatya çayı · Sade aloe vera suyu" },
  { kategori: "ilac", tur: "vitamin", baslik: "Vitamin / Multivitamin", urun_a: ["vitamin","multivitamin","supradyn","centrum","redoxon","berocca"], icerik: [], alternatif: "Taze meyve sebze · Ham balda doğal vitamin · Kuşburnu (C vit) · Güneş (D vit) · Pekmez (demir)" },
  { kategori: "ilac", tur: "antibiyotik", baslik: "Antibiyotik", urun_a: ["antibiyotik","amoxicillin","penisilin","augmentin","cipro","klacid"], icerik: [], alternatif: "Doğal antibakteriyel: Ham bal (manuka), Sarımsak, Zerdeçal, Oregano yağı, Echinacea (DİKKAT: ciddi enfeksiyon → hekim önerisini takip et, antibiyotik atlama)" },
  { kategori: "ilac", tur: "sogiuk_alginlik", baslik: "Soğuk Algınlığı / Grip", urun_a: ["soğuk algınlığı","grip","gripin","tylenol","theraflu","coldrex"], icerik: [], alternatif: "Zencefil-limon-bal kürü · Ihlamur çayı · Kuşburnu (C vit) · Çinko · Buharlı inhalasyon" },
  { kategori: "ilac", tur: "uyku", baslik: "Uyku / Sakinleştirici", urun_a: ["uyku","melatonin","xanax","prozac","sakinleştirici","ansiyolitik"], icerik: [], alternatif: "Melisa çayı · Lavanta yağı (yastığa) · Magnezyum (kabak çekirdeği) · Sıcak süt + bal (DİKKAT: psikiyatrik ilaç → hekim önerisi)" },
];

function urunTuruTespit(metin, kategori) {
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
const ORGAN_POZISYON = {
  "Beyin": {
    x: 50, y: 16, r: 7, label: "Beyin", fill: "#F2B8B8",
    path: "M44 10 Q41 13 41 17 Q41 22 47 23 L47 21 Q44 20 44 17 Q44 14 46 12 Q48 11 50 11 Q52 11 54 12 Q56 14 56 17 Q56 20 53 21 L53 23 Q59 22 59 17 Q59 13 56 10 Q53 8 50 8 Q47 8 44 10 Z M46 14 Q48 16 50 14 Q52 16 54 14 M45 17 Q48 19 50 17 Q52 19 55 17"
  },
  "Tiroid": {
    x: 50, y: 41, r: 3, label: "Tiroid", fill: "#D86060",
    path: "M46 40 Q44 42 46 43 Q48 44 50 43 Q52 44 54 43 Q56 42 54 40 Q52 39 50 40 Q48 39 46 40 Z"
  },
  "Solunum": {
    x: 50, y: 50, r: 2.5, label: "Solunum", fill: "#E89890",
    path: "M48 44 L48 56 Q50 57 52 56 L52 44 Q50 43 48 44 Z"
  },
  "Akciğer": {
    x: 36, y: 60, r: 6, label: "Akciğer", fill: "#F8A8A0",
    path: "M30 53 Q25 60 26 70 Q28 76 35 75 Q40 73 41 67 L41 56 Q39 52 35 52 Q32 52 30 53 Z M59 56 L59 67 Q60 73 65 75 Q72 76 74 70 Q75 60 70 53 Q68 52 65 52 Q61 52 59 56 Z"
  },
  "Kalp": {
    x: 55, y: 63, r: 5, label: "Kalp", fill: "#D02838",
    path: "M50 61 Q47 58 50 56 Q53 56 54 60 Q55 56 58 56 Q61 58 58 62 Q56 67 54 70 Q52 67 50 61 Z"
  },
  "Kan": {
    x: 50, y: 73, r: 3, label: "Kan", fill: "#B01828",
    path: "M48 70 L48 80 M52 70 L52 80 M50 70 L50 80"
  },
  "Karaciğer": {
    x: 60, y: 88, r: 6, label: "Karaciğer", fill: "#8A2818",
    path: "M48 83 Q47 87 49 91 L70 94 Q73 92 73 88 Q73 84 70 82 L52 81 Q49 81 48 83 Z"
  },
  "Mide": {
    x: 40, y: 88, r: 5, label: "Mide", fill: "#E89080",
    path: "M38 83 Q34 86 35 92 Q37 97 43 96 Q47 94 47 90 L47 85 Q45 82 42 82 Q40 82 38 83 Z"
  },
  "Pankreas": {
    x: 50, y: 98, r: 3, label: "Pankreas", fill: "#E8B860",
    path: "M40 97 Q44 95 50 97 Q56 95 60 98 Q56 100 50 99 Q44 100 40 97 Z"
  },
  "Böbrek": {
    x: 33, y: 103, r: 4, label: "Böbrek", fill: "#7C1818",
    path: "M30 99 Q26 102 28 108 Q31 111 34 110 Q36 108 36 105 L36 102 Q35 99 32 99 Q31 99 30 99 Z M64 102 L64 105 Q64 108 66 110 Q69 111 72 108 Q74 102 70 99 Q66 98 64 102 Z"
  },
  "Hormon": {
    x: 67, y: 99, r: 2.5, label: "Hormon", fill: "#F0D050",
    path: "M65 97 L69 97 L67 100 Z M33 97 L29 97 L31 100 Z"
  },
  "Bağırsak": {
    x: 50, y: 118, r: 7, label: "Bağırsak", fill: "#E8A890",
    path: "M37 108 Q34 112 36 116 Q40 118 44 116 L44 120 Q40 122 36 124 Q34 128 38 130 Q44 132 50 130 Q56 132 62 130 Q66 128 64 124 Q60 122 56 120 L56 116 Q60 118 64 116 Q66 112 63 108 Q58 106 50 108 Q42 106 37 108 Z"
  },
  "Sinir": {
    x: 19, y: 70, r: 3.5, label: "Sinir", fill: "#A890C8",
    path: "M19 60 L19 80 M16 64 L22 64 M15 70 L23 70 M16 76 L22 76"
  },
  "Cilt": {
    x: 81, y: 70, r: 3.5, label: "Cilt", fill: "#F8D4B0",
    path: "M78 66 Q76 70 78 74 Q82 76 84 74 Q86 70 84 66 Q82 64 81 64 Q79 64 78 66 Z"
  },
};

// Cinsiyete özel ek organlar (mesane, prostat, rahim, yumurtalık)
const ORGAN_CINSIYET = {
  "Erkek": {
    "Mesane": {
      x: 50, y: 132, r: 4, label: "Mesane", fill: "#FFD060",
      path: "M44 128 Q42 132 44 136 Q47 138 50 138 Q53 138 56 136 Q58 132 56 128 Q53 126 50 126 Q47 126 44 128 Z"
    },
    "Prostat": {
      x: 50, y: 140, r: 2, label: "Prostat", fill: "#C88060",
      path: "M47 138 Q46 141 48 142 Q50 143 52 142 Q54 141 53 138 Q51 137 50 137 Q49 137 47 138 Z"
    },
  },
  "Kadın": {
    "Mesane": {
      x: 50, y: 134, r: 3.5, label: "Mesane", fill: "#FFD060",
      path: "M45 131 Q43 134 45 137 Q48 139 50 139 Q52 139 55 137 Q57 134 55 131 Q52 129 50 129 Q48 129 45 131 Z"
    },
    "Rahim": {
      x: 50, y: 127, r: 3.5, label: "Rahim", fill: "#D86090",
      path: "M46 124 Q45 128 48 131 Q50 132 52 131 Q55 128 54 124 Q53 121 50 121 Q47 121 46 124 Z"
    },
    "Yumurtalık": {
      x: 42, y: 127, r: 2, label: "Yumurtalık", fill: "#E090B0",
      path: "M40 126 Q39 128 41 129 Q43 128 42 126 Q41 125 40 126 Z M58 126 Q57 128 59 129 Q61 128 60 126 Q59 125 58 126 Z"
    },
  },
  "Çocuk": {
    "Mesane": {
      x: 50, y: 130, r: 3, label: "Mesane", fill: "#FFD060",
      path: "M46 128 Q44 131 46 134 Q49 136 50 136 Q51 136 54 134 Q56 131 54 128 Q52 126 50 126 Q48 126 46 128 Z"
    },
  },
};

// Cinsiyete göre anatomik vücut silüeti (viewBox 100x200)
const VUCUT_SILUET = {
  "Erkek": "M50 4 C44 4 39 9 39 16 C39 22 41 27 44 30 L43 36 C41 37 38 38 36 39 C30 41 25 45 23 52 L21 60 C19 65 18 70 18 76 L19 88 C19 94 19 100 20 106 L20 120 C20 130 18 138 18 146 L19 152 L24 152 L26 165 L28 178 L30 192 L36 196 L42 196 L44 184 L46 170 L48 158 L48 152 L52 152 L52 158 L54 170 L56 184 L58 196 L64 196 L70 192 L72 178 L74 165 L76 152 L81 152 L82 146 C82 138 80 130 80 120 L80 106 C81 100 81 94 81 88 L82 76 C82 70 81 65 79 60 L77 52 C75 45 70 41 64 39 C62 38 59 37 57 36 L56 30 C59 27 61 22 61 16 C61 9 56 4 50 4 Z",
  "Kadın": "M50 4 C44 4 39 9 39 16 C39 22 41 27 44 30 L43 36 C41 37 38 38 36 39 C31 41 26 45 24 52 L22 62 C20 68 20 73 21 79 L23 88 C23 94 22 100 22 106 C22 110 21 114 20 118 L18 130 C17 138 16 146 17 152 L23 152 L25 165 L27 178 L29 192 L36 196 L42 196 L44 184 L46 170 L48 158 L48 152 L52 152 L52 158 L54 170 L56 184 L58 196 L64 196 L71 192 L73 178 L75 165 L77 152 L83 152 C84 146 83 138 82 130 L80 118 C79 114 78 110 78 106 C78 100 77 94 77 88 L79 79 C80 73 80 68 78 62 L76 52 C74 45 69 41 64 39 C62 38 59 37 57 36 L56 30 C59 27 61 22 61 16 C61 9 56 4 50 4 Z",
  "Çocuk": "M50 6 C42 6 36 12 36 20 C36 27 39 33 43 36 L42 42 C40 43 37 44 35 45 C29 47 25 51 23 58 L22 66 C21 72 21 78 22 84 L23 96 C23 104 22 112 22 120 L22 134 C22 142 21 150 22 156 L26 156 L28 168 L30 180 L32 192 L38 196 L44 196 L46 184 L48 172 L49 160 L49 156 L51 156 L51 160 L52 172 L54 184 L56 196 L62 196 L68 192 L70 180 L72 168 L74 156 L78 156 C79 150 78 142 78 134 L78 120 C78 112 77 104 77 96 L78 84 C79 78 79 72 78 66 L77 58 C75 51 71 47 65 45 C63 44 60 43 58 42 L57 36 C61 33 64 27 64 20 C64 12 58 6 50 6 Z"
};

function OrganVucutHaritasi({ sonuclar, gecmis, profil }) {
  const cinsiyet = (profil && profil.cinsiyet) || "Erkek";
  const vucutPath = VUCUT_SILUET[cinsiyet] || VUCUT_SILUET["Erkek"];
  const cinsiyetOrganlari = ORGAN_CINSIYET[cinsiyet] || ORGAN_CINSIYET["Erkek"];
  const TUM_ORGAN = React.useMemo(() => ({ ...ORGAN_POZISYON, ...cinsiyetOrganlari }), [cinsiyet]);
  const [secili, setSecili] = useState(null);

  // Organ hasar hesapla (geçmiş + mevcut tarama)
  const organHasar = React.useMemo(() => {
    const hasar = {};
    const tumSonuclar = [
      ...sonuclar,
      ...(gecmis || []).flatMap(g => g.organlar ? [{organlar: g.organlar, risk: g.kritik > 0 ? "kritik" : "yuksek"}] : [])
    ];
    tumSonuclar.forEach(r => {
      (r.organlar || []).forEach(org => {
        const anahtar = Object.keys(TUM_ORGAN).find(k => org.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(org.toLowerCase()));
        if (anahtar) {
          if (!hasar[anahtar]) hasar[anahtar] = { kritik: 0, yuksek: 0, orta: 0 };
          if (r.risk === "kritik") hasar[anahtar].kritik++;
          else if (r.risk === "yuksek") hasar[anahtar].yuksek++;
          else hasar[anahtar].orta++;
        }
      });
    });
    return hasar;
  }, [sonuclar, gecmis]);

  function organRenk(anahtar) {
    const h = organHasar[anahtar];
    if (!h) return C.yesil;
    if (h.kritik > 0) return "#FF4444";
    if (h.yuksek > 1) return "#FF9500";
    if (h.yuksek > 0) return "#FFD700";
    return C.yesil;
  }

  function organPuan(anahtar) {
    const h = organHasar[anahtar];
    if (!h) return 100;
    return Math.max(0, 100 - h.kritik * 30 - h.yuksek * 15 - h.orta * 5);
  }

  const toplamPuan = Math.round(
    Object.keys(TUM_ORGAN).reduce((s, k) => s + organPuan(k), 0) / Object.keys(TUM_ORGAN).length
  );

  const genel = toplamPuan >= 80 ? { renk: C.yesil, yazi: "Sağlıklı" } :
                toplamPuan >= 60 ? { renk: "#FFD700", yazi: "Dikkat" } :
                toplamPuan >= 40 ? { renk: "#FF9500", yazi: "Riskli" } :
                                   { renk: "#FF4444", yazi: "Tehlikeli" };

  return (
    <div style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 20, padding: 20, marginBottom: 16 }}>
      {/* Başlık + Genel Puan */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <div style={{ color: C.metin, fontWeight: 700, fontSize: 16 }}>Organ Sağlık Haritası</div>
          <div style={{ color: C.soluk, fontSize: 12, marginTop: 2 }}>Taramalarınıza göre güncellenir</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: genel.renk + "22", border: `3px solid ${genel.renk}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ color: genel.renk, fontWeight: 900, fontSize: 20, lineHeight: 1 }}>{toplamPuan}</div>
            <div style={{ color: genel.renk, fontSize: 9 }}>/100</div>
          </div>
          <div style={{ color: genel.renk, fontSize: 11, fontWeight: 700, marginTop: 4 }}>{genel.yazi}</div>
        </div>
      </div>

      {/* SVG Vücut */}
      <div style={{ position: "relative", width: "100%", maxWidth: 340, margin: "0 auto" }}>
        <svg viewBox="0 0 100 200" style={{ width: "100%", maxHeight: 460, filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.4))" }}>
          <defs>
            <linearGradient id="vucutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5DCC0"/>
              <stop offset="50%" stopColor="#E8C4A0"/>
              <stop offset="100%" stopColor="#C8A480"/>
            </linearGradient>
            <linearGradient id="vucutGoglge" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.15)"/>
              <stop offset="100%" stopColor="rgba(0,0,0,0.25)"/>
            </linearGradient>
          </defs>

          {/* Anatomik vücut silüeti (cinsiyete göre) */}
          <path d={vucutPath} fill="url(#vucutGrad)" stroke="#3a3a55" strokeWidth="0.6" strokeLinejoin="round"/>

          {/* Anatomik organlar - gerçek şekil ve renklerle */}
          {Object.entries(TUM_ORGAN).map(([k, p]) => {
            const riskRenk = organRenk(k);
            const hasar = organHasar[k];
            const hasRisk = hasar && (hasar.kritik > 0 || hasar.yuksek > 0);
            const isKritik = hasar && hasar.kritik > 0;
            const aktif = secili === k;
            return (
              <g key={k} onClick={() => setSecili(aktif ? null : k)} style={{ cursor: "pointer" }}>
                {/* Anatomik organ şekli, kendi gerçek rengiyle */}
                {p.path ? (
                  <path d={p.path} fill={p.fill || "#888"} stroke="#2A1010" strokeWidth="0.3"
                    fillOpacity={hasRisk ? 0.95 : 0.82}
                    style={{ filter: isKritik ? `drop-shadow(0 0 2px ${riskRenk})` : `drop-shadow(0 0.5px 1px rgba(0,0,0,0.4))` }}/>
                ) : (
                  <circle cx={p.x} cy={p.y} r={p.r} fill={p.fill || "#888"} fillOpacity={hasRisk ? 0.95 : 0.82} stroke="#2A1010" strokeWidth="0.25"/>
                )}
                {/* Risk halkası - dış parlama */}
                {hasRisk && (
                  <circle cx={p.x} cy={p.y} r={p.r + 1.8} fill="none" stroke={riskRenk} strokeWidth="0.7" strokeOpacity="0.85">
                    {isKritik && (
                      <>
                        <animate attributeName="r" values={`${p.r+1};${p.r+3.5};${p.r+1}`} dur="1.5s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="0.9;0.2;0.9" dur="1.5s" repeatCount="indefinite"/>
                      </>
                    )}
                  </circle>
                )}
                {/* Seçili vurgu */}
                {aktif && (
                  <circle cx={p.x} cy={p.y} r={p.r + 2.5} fill="none" stroke="#C9A84C" strokeWidth="0.45" strokeDasharray="1 0.8"/>
                )}
                {/* Tıklama alanı (geniş, görünmez) */}
                <circle cx={p.x} cy={p.y} r={p.r + 2} fill="transparent"/>
              </g>
            );
          })}
        </svg>

        {/* Seçili organ detay */}
        {secili && (() => {
          const h = organHasar[secili];
          const puan = organPuan(secili);
          const renk = organRenk(secili);
          const ilgili = sonuclar.filter(r => r.organlar?.some(o => o.toLowerCase().includes(secili.toLowerCase()) || secili.toLowerCase().includes(o.toLowerCase())));
          return (
            <div style={{ background: C.bg, border: `1px solid ${renk}`, borderRadius: 14, padding: 14, marginTop: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ color: renk, fontWeight: 700, fontSize: 15 }}>{secili}</div>
                <div style={{ background: renk + "22", border: `1px solid ${renk}`, borderRadius: 20, padding: "2px 10px", color: renk, fontSize: 13, fontWeight: 700 }}>{puan}/100</div>
              </div>
              {h ? (
                <>
                  {h.kritik > 0 && <div style={{ color: "#FF4444", fontSize: 12, marginBottom: 4 }}>{h.kritik} kritik madde tespit edildi</div>}
                  {h.yuksek > 0 && <div style={{ color: "#FF9500", fontSize: 12, marginBottom: 4 }}>{h.yuksek} yüksek riskli madde</div>}
                  {ilgili.length > 0 && (
                    <div style={{ marginTop: 8 }}>
                      <div style={{ color: C.soluk, fontSize: 11, marginBottom: 4 }}>Bu organı etkileyen maddeler:</div>
                      {ilgili.slice(0,3).map((r,i) => (
                        <div key={i} style={{ color: C.metin, fontSize: 12, padding: "3px 0", borderBottom: `1px solid ${C.s}` }}>{r.ad}</div>
                      ))}
                    </div>
                  )}
                  <div style={{ color: C.soluk, fontSize: 11, marginTop: 8, fontStyle: "italic" }}>
                    {puan < 60 ? `${secili}'i iyileştirmek için zararlı madde içeren ürünlerden kaçının.` : `${secili} iyi durumda. Taramaya devam edin.`}
                  </div>
                </>
              ) : (
                <div style={{ color: C.yesil, fontSize: 13 }}>Bu organı etkileyen zararlı madde bulunamadı.</div>
              )}
            </div>
          );
        })()}
      </div>

      {/* Alt efsane */}
      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 12 }}>
        {[[C.yesil,"Sağlıklı"],["#FFD700","Dikkat"],["#FF9500","Riskli"],["#FF4444","Kritik"]].map(([r,l]) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: r, boxShadow: `0 0 4px ${r}` }}/>
            <span style={{ color: C.soluk, fontSize: 10 }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TarifModal({ tarif, onKapat }) {
  const [sepet, setSepet] = React.useState([]);
  if (!tarif) return null;

  return (
    <div style={{ position:"fixed", inset:0, background:"#000000A0", display:"flex", alignItems:"flex-end", justifyContent:"center", zIndex:1001, backdropFilter:"blur(4px)" }} onClick={onKapat}>
      <div style={{ background:C.bg, borderRadius:"20px 20px 0 0", padding:24, width:"100%", maxWidth:480, maxHeight:"85vh", overflowY:"auto" }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <h2 style={{ color:C.yesil, fontSize:18, margin:0 }}>{tarif.baslik}</h2>
          <button onClick={onKapat} style={{ background:C.y2, border:`1px solid ${C.s}`, borderRadius:"50%", width:30, height:30, color:C.soluk, cursor:"pointer" }}>✕</button>
        </div>
        <div style={{ background:C.yesil + "0A", borderRadius:10, padding:"6px 12px", marginBottom:16, display:"inline-block" }}>
          <span style={{ color:C.yesil, fontSize:12 }}>{tarif.sure}</span>
        </div>

        <div style={{ color:C.metin, fontWeight:700, marginBottom:8 }}>Malzemeler</div>
        {tarif.malzeme.map((m, i) => (
          <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", background:C.y2, borderRadius:10, padding:"10px 12px", marginBottom:6 }}>
            <span style={{ color:C.metin, fontSize:14 }}>• {m}</span>
            <button onClick={() => {
              const yeni = [...sepet, m];
              setSepet(yeni);
              if (navigator.share) {
                navigator.share({ title:"Alışveriş", text:`${m} - Besin Dedektifi tarifi için` }).catch(()=>{});
              } else {
                window.open(`https://www.google.com/search?q=${encodeURIComponent(m+" doğal organik satın al")}`, "_blank");
              }
            }} style={{ background: C.yesil, border:"none", borderRadius:8, padding:"4px 10px", color:"#fff", fontSize:12, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap" }}>
              Al
            </button>
          </div>
        ))}

        <div style={{ color:C.metin, fontWeight:700, marginTop:16, marginBottom:8 }}>Yapılış</div>
        <div style={{ color:C.metin, fontSize:14, lineHeight:1.7, background:C.y2, borderRadius:10, padding:12 }}>
          {tarif.adimlar}
        </div>

        <button onClick={() => {
          const liste = tarif.malzeme.join("\n");
          const msg = `🛒 ${tarif.baslik} için alışveriş listesi:\n\n${liste}\n\nBesin Dedektifi tarifi`;
          if (navigator.share) { navigator.share({ title:"Alışveriş Listesi", text:msg }).catch(()=>{}); }
          else { navigator.clipboard.writeText(msg).then(()=>bdToast("Liste kopyalandı!")).catch(()=>{}); }
        }} style={{ width:"100%", marginTop:16, background: C.yesil, border:"none", borderRadius:12, padding:"12px 0", color:"#fff", fontWeight:700, fontSize:14, cursor:"pointer" }}>
          📤 Tüm Malzeme Listesini Paylaş
        </button>
      </div>
    </div>
  );
}

function HaftalikRapor({ gecmis, onKapat }) {
  const simdi = new Date();
  const haftaOnce = new Date(simdi - 7 * 24 * 60 * 60 * 1000);
  const haftaGecmis = gecmis.filter(g => {
    const parcalar = g.tarih.split(".");
    if (parcalar.length < 3) return false;
    const tarih = new Date(parcalar[2], parcalar[1]-1, parcalar[0]);
    return tarih >= haftaOnce;
  });
  const toplamTarama = haftaGecmis.length;
  const toplamKritik = haftaGecmis.reduce((a,g) => a+g.kritik, 0);
  const toplamBulgu = haftaGecmis.reduce((a,g) => a+g.sonuc, 0);
  const kategoriSayim = {};
  haftaGecmis.forEach(g => { kategoriSayim[g.kategori] = (kategoriSayim[g.kategori]||0)+1; });
  const enCokKategori = Object.entries(kategoriSayim).sort((a,b)=>b[1]-a[1])[0];
  const risk = toplamKritik === 0 ? "dusuk" : toplamKritik < 5 ? "orta" : "yuksek";
  const riskRenk = risk === "dusuk" ? "#4CAF50" : risk === "orta" ? "#FF9500" : "#FF4444";
  const riskEmoji = risk === "dusuk" ? "✅" : risk === "orta" ? "⚠️" : "🚨";

  return (
    <div style={{ position:"fixed", inset:0, background:"#000000A0", display:"flex", alignItems:"flex-end", justifyContent:"center", zIndex:1000, backdropFilter:"blur(4px)" }} onClick={onKapat}>
      <div style={{ background:C.bg, borderRadius:"20px 20px 0 0", padding:24, width:"100%", maxWidth:480, maxHeight:"85vh", overflowY:"auto" }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <h2 style={{ color:C.altin, fontSize:18, margin:0 }}>Haftalık Rapor</h2>
          <button onClick={onKapat} style={{ background:C.y2, border:`1px solid ${C.s}`, borderRadius:"50%", width:30, height:30, color:C.soluk, cursor:"pointer" }}>✕</button>
        </div>
        {toplamTarama === 0 ? (
          <div style={{ textAlign:"center", padding:"40px 0", color:C.soluk }}>Bu hafta tarama yapılmadı.</div>
        ) : (
          <>
            <div style={{ background:riskRenk+"18", border:`1px solid ${riskRenk}`, borderRadius:14, padding:16, marginBottom:16, textAlign:"center" }}>
              <div style={{ fontSize:36 }}>{riskEmoji}</div>
              <div style={{ color:riskRenk, fontWeight:700, fontSize:16, marginTop:4 }}>
                {risk === "dusuk" ? "Düşük Risk Haftası" : risk === "orta" ? "Orta Risk Haftası" : "Yüksek Risk Haftası"}
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:16 }}>
              {[[toplamTarama,"Tarama","📋"],[toplamBulgu,"Bulgu","🔍"],[toplamKritik,"Kritik","🚨"]].map(([s,l,e])=>(
                <div key={l} style={{ background:C.y2, borderRadius:12, padding:12, textAlign:"center" }}>
                  <div style={{ fontSize:20 }}>{e}</div>
                  <div style={{ color:C.altin, fontSize:22, fontWeight:700 }}>{s}</div>
                  <div style={{ color:C.soluk, fontSize:11 }}>{l}</div>
                </div>
              ))}
            </div>
            {enCokKategori && (
              <div style={{ background:C.y2, borderRadius:12, padding:12, marginBottom:12 }}>
                <div style={{ color:C.soluk, fontSize:12, marginBottom:4 }}>En çok taranan kategori</div>
                <div style={{ color:C.metin, fontWeight:700 }}>{enCokKategori[0]} — {enCokKategori[1]} tarama</div>
              </div>
            )}
            <div style={{ background:C.y2, borderRadius:12, padding:12 }}>
              <div style={{ color:C.soluk, fontSize:12, marginBottom:8 }}>Bu haftanın taramaları</div>
              {haftaGecmis.map((g,i) => (
                <div key={i} style={{ borderTop:`1px solid ${C.s}`, paddingTop:8, marginTop:8, display:"flex", justifyContent:"space-between" }}>
                  <div style={{ color:C.metin, fontSize:12 }}>{g.tarih} · {g.metin.slice(0,30)}{g.metin.length>30?"...":""}</div>
                  <div style={{ color:g.kritik>0?"#FF4444":C.altin, fontSize:12, fontWeight:700 }}>{g.kritik>0?`${g.kritik}⚠️`:g.sonuc+" bulgu"}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════
   MİZAÇ MARKET LİSTESİ BİLEŞENİ
   ══════════════════════════════════════════════ */
function SkorHalkasi({ skor, renk, boyut = 52 }) {
  const [g, setG] = useState(0);
  useEffect(() => {
    let raf; const t0 = performance.now(); const sure = 950;
    const tik = (now) => {
      const p = Math.min(1, (now - t0) / sure);
      const eased = 1 - Math.pow(1 - p, 3);
      setG(Math.round(skor * eased));
      if (p < 1) raf = requestAnimationFrame(tik);
    };
    raf = requestAnimationFrame(tik);
    return () => cancelAnimationFrame(raf);
  }, [skor]);
  const m = boyut / 2;
  const r = m - 6;
  const cevre = 2 * Math.PI * r;
  return (
    <svg width={boyut} height={boyut} viewBox={`0 0 ${boyut} ${boyut}`} style={{ flexShrink: 0, filter: `drop-shadow(0 0 5px ${renk}55)` }}>
      <circle cx={m} cy={m} r={r} fill="none" stroke={C.s} strokeWidth="5" />
      <circle cx={m} cy={m} r={r} fill="none" stroke={renk} strokeWidth="5" strokeLinecap="round" strokeDasharray={`${cevre * g / 100} ${cevre}`} transform={`rotate(-90 ${m} ${m})`} />
      <text x={m} y={m + 5} textAnchor="middle" fill={renk} fontSize="15" fontWeight="800" fontFamily="Inter, sans-serif">{g}</text>
    </svg>
  );
}
function PaylasModal({ madde, onKapat, rutbeAd, rutbeRenk, lakap }) {
  const kartRef = useRef(null);
  const [yapiyor, setYapiyor] = useState(false);
  const v = (madde.risk === "kritik" || madde.risk === "yuksek") ? { ad: "KAÇIN", renk: "#E74C3C", altR: "#C0392B" }
    : madde.risk === "orta" ? { ad: "DİKKAT", renk: "#F39C12", altR: "#D68910" }
    : madde.risk === "dusuk" ? { ad: "GÜVENLİ", renk: "#27AE60", altR: "#1E8449" }
    : { ad: "BELİRSİZ", renk: "#7F8C8D", altR: "#566573" };
  const etkiKisa = (madde.etki || "").length > 220 ? (madde.etki || "").slice(0, 220) + "…" : (madde.etki || "");
  const paylasMetni = `${v.ad} — ${madde.ad} (${madde.kod})\n\n${(madde.etki || "").slice(0, 200)}${(madde.etki || "").length > 200 ? "…" : ""}\n\nKaynak: ${madde.kaynak || "—"}\n\nBesin Dedektifi · https://besin-d.vercel.app`;
  const kartiPngYap = async () => {
    if (!kartRef.current) return null;
    setYapiyor(true);
    try {
      const cv = await html2canvas(kartRef.current, { scale: 2, backgroundColor: null, useCORS: true });
      return await new Promise(res => cv.toBlob(b => res(b), "image/png", 1));
    } finally { setYapiyor(false); }
  };
  const indir = async () => {
    const blob = await kartiPngYap(); if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `besin-dedektifi-${(madde.kod || "madde").toString().replace(/\s/g, "_")}.png`;
    document.body.appendChild(a); a.click();
    setTimeout(() => { try { document.body.removeChild(a); URL.revokeObjectURL(url); } catch {} }, 200);
  };
  const nativeShare = async () => {
    const blob = await kartiPngYap(); if (!blob) return;
    const dosya = new File([blob], `besin-dedektifi-${madde.kod}.png`, { type: "image/png" });
    if (navigator.canShare && navigator.canShare({ files: [dosya] })) {
      try { await navigator.share({ files: [dosya], text: paylasMetni }); } catch {}
    } else if (navigator.share) {
      try { await navigator.share({ text: paylasMetni }); } catch {}
    } else {
      indir();
    }
  };
  const C2 = { bg: "#F7F2E8", metin: "#1D1D1F", altin: "#C9952C", soluk: "#8A8499", s: "#E5DCC8" };
  const linkKanali = (kanal) => {
    const t = encodeURIComponent(paylasMetni);
    const u = encodeURIComponent("https://besin-d.vercel.app");
    if (kanal === "whatsapp") return `https://wa.me/?text=${t}`;
    if (kanal === "telegram") return `https://t.me/share/url?url=${u}&text=${t}`;
    if (kanal === "twitter") return `https://twitter.com/intent/tweet?text=${t}`;
    if (kanal === "instagram") return "https://www.instagram.com/";
    if (kanal === "tiktok") return "https://www.tiktok.com/";
    if (kanal === "sms") return `sms:?body=${t}`;
    return null;
  };
  const KANALLAR_UST = [
    { k: "instagram", ad: "Instagram", renk: "linear-gradient(135deg, #F58529, #DD2A7B, #8134AF, #515BD4)" },
    { k: "tiktok", ad: "TikTok", renk: "#000000" },
    { k: "sms", ad: "Mesajlar", renk: "#34C759" },
  ];
  const KANALLAR_LINK = [
    { k: "whatsapp", ad: "WhatsApp", renk: "#25D366" },
    { k: "telegram", ad: "Telegram", renk: "#0088CC" },
    { k: "twitter", ad: "X", renk: "#000000" },
  ];
  return (
    <div style={{ position: "fixed", inset: 0, background: "#000000A0", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 1100, backdropFilter: "blur(4px)" }} onClick={onKapat}>
      <div style={{ background: C2.bg, borderRadius: "20px 20px 0 0", padding: 20, width: "100%", maxWidth: 520, maxHeight: "90vh", overflowY: "auto", border: `1px solid ${C2.s}` }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={{ color: C2.altin, fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>PAYLAŞ</span>
          <button onClick={onKapat} style={{ background: "transparent", border: "none", color: C2.soluk, fontSize: 18, cursor: "pointer" }}>✕</button>
        </div>

        <div style={{ background: "#fff", borderRadius: 14, padding: 8, marginBottom: 14, border: `1px solid ${C2.s}`, overflow: "hidden" }}>
          <div ref={kartRef} style={{ width: 480, transform: "scale(0.74)", transformOrigin: "top left", marginBottom: -135 }}>
            <div style={{ width: 480, height: 480, background: `linear-gradient(135deg, ${v.renk}, ${v.altR})`, color: "#fff", padding: 32, fontFamily: "'Inter', -apple-system, sans-serif", display: "flex", flexDirection: "column", justifyContent: "space-between", boxSizing: "border-box" }}>
              <div>
                <div style={{ fontSize: 14, opacity: 0.85, letterSpacing: 2, fontWeight: 600 }}>BESİN DEDEKTİFİ</div>
                <div style={{ fontSize: 56, fontWeight: 900, letterSpacing: 2, lineHeight: 1, marginTop: 30 }}>{v.ad}</div>
                <div style={{ fontSize: 14, opacity: 0.85, marginTop: 6, fontWeight: 600 }}>{madde.kod} · {madde.kat}</div>
              </div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 10, lineHeight: 1.15 }}>{madde.ad}</div>
                <div style={{ fontSize: 13, opacity: 0.92, lineHeight: 1.5, fontWeight: 400 }}>{etkiKisa}</div>
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.25)", paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 12, opacity: 0.9, fontWeight: 700 }}>besin-d.vercel.app</div>
                  {(rutbeAd || lakap) && <div style={{ fontSize: 10, opacity: 0.85, marginTop: 2 }}>{lakap ? `${lakap} · ` : ""}{rutbeAd}</div>}
                </div>
                <span style={{ fontSize: 10, opacity: 0.75 }}>{madde.kaynak ? madde.kaynak.split("·")[0].trim() : ""}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 10 }}>
          {KANALLAR_UST.map(k => (
            <a key={k.k} href={linkKanali(k.k)} target={k.k === "sms" ? "_self" : "_blank"} rel="noopener noreferrer" style={{ background: k.renk, color: "#fff", borderRadius: 12, padding: "14px 8px", fontWeight: 700, fontSize: 14, textAlign: "center", textDecoration: "none", fontFamily: "inherit" }}>{k.ad}</a>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 12 }}>
          {KANALLAR_LINK.map(k => (
            <a key={k.k} href={linkKanali(k.k)} target="_blank" rel="noopener noreferrer" style={{ background: k.renk, color: "#fff", borderRadius: 10, padding: "12px 8px", fontWeight: 700, fontSize: 13, textAlign: "center", textDecoration: "none", fontFamily: "inherit" }}>{k.ad}</a>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
          <button onClick={indir} disabled={yapiyor} style={{ background: "transparent", border: `1px solid ${C2.s}`, color: C2.metin, borderRadius: 10, padding: "11px", fontWeight: 700, fontSize: 13, cursor: yapiyor ? "wait" : "pointer", fontFamily: "inherit" }}>{yapiyor ? "Hazırlanıyor..." : "Görseli İndir"}</button>
          <button onClick={() => { navigator.clipboard?.writeText(paylasMetni); }} style={{ background: "transparent", border: `1px solid ${C2.s}`, color: C2.metin, borderRadius: 10, padding: "11px", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Yazıyı Kopyala</button>
        </div>

        <button onClick={nativeShare} disabled={yapiyor} style={{ width: "100%", background: "transparent", color: C2.soluk, border: "none", padding: "8px", fontWeight: 600, fontSize: 11, cursor: yapiyor ? "wait" : "pointer", fontFamily: "inherit", textDecoration: "underline" }}>Diğer uygulamalar (görsel + yazı)</button>
      </div>
    </div>
  );
}

function MizacMarket({ profil, onKapat }) {
  const [sekme, setSekme] = React.useState("al");
  if (!profil) return null;
  const veri = MIZAC_MARKET[profil.mizac];
  if (!veri) return null;

  return (
    <div style={{ position:"fixed", inset:0, background:"#000000A0", display:"flex", alignItems:"flex-end", justifyContent:"center", zIndex:1000, backdropFilter:"blur(4px)" }} onClick={onKapat}>
      <div style={{ background:C.bg, borderRadius:"20px 20px 0 0", padding:24, width:"100%", maxWidth:480, maxHeight:"88vh", overflowY:"auto" }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
          <h2 style={{ color:profil.renk, fontSize:18, margin:0 }}>{profil.burc} Mizaç Marketi</h2>
          <button onClick={onKapat} style={{ background:C.y2, border:`1px solid ${C.s}`, borderRadius:"50%", width:30, height:30, color:C.soluk, cursor:"pointer" }}>✕</button>
        </div>
        <div style={{ color:C.soluk, fontSize:12, marginBottom:4 }}>{profil.mizac} Mizacı</div>
        <div style={{ color:C.metin, fontSize:13, marginBottom:12, lineHeight:1.5 }}>{veri.aciklama}</div>
        <div style={{ background:C.y2, borderRadius:10, padding:"6px 10px", marginBottom:16, fontSize:11, color:C.soluk }}>
          Kaynak: {veri.kaynak}
        </div>

        {/* SEKME */}
        <div style={{ display:"flex", gap:8, marginBottom:16 }}>
          {[["al","Al"], ["kacin","Kaçın"]].map(([k,l]) => (
            <button key={k} onClick={() => setSekme(k)} style={{ flex:1, padding:"10px 6px", borderRadius:12, border:`2px solid ${sekme===k ? profil.renk : C.s}`, background:sekme===k ? profil.renk+"18" : C.y, color:sekme===k ? profil.renk : C.soluk, cursor:"pointer", fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontSize:13, fontWeight:sekme===k?700:400 }}>{l}</button>
          ))}
        </div>

        {sekme === "al" ? (
          <div>
            <div style={{ color:C.soluk, fontSize:12, marginBottom:10 }}>Bu gıdalar {profil.mizac} mizacına faydalıdır</div>
            {veri.al.map((g,i) => (
              <div key={i} style={{ background:C.y2, borderRadius:12, padding:12, marginBottom:8, borderLeft:`3px solid ${profil.renk}` }}>
                <div style={{ color:C.metin, fontWeight:700, fontSize:14 }}>{g.ad}</div>
                <div style={{ color:C.soluk, fontSize:12, marginTop:2 }}>{g.neden}</div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div style={{ color:C.soluk, fontSize:12, marginBottom:10 }}>Bu gıdalar {profil.mizac} mizacını olumsuz etkiler</div>
            {veri.kacin.map((g,i) => (
              <div key={i} style={{ background:"#FF444408", borderRadius:12, padding:12, marginBottom:8, borderLeft:"3px solid #FF4444" }}>
                <div style={{ color:"#FF4444", fontWeight:700, fontSize:14 }}>⚠️ {g.ad}</div>
                <div style={{ color:C.soluk, fontSize:12, marginTop:2 }}>{g.neden}</div>
              </div>
            ))}
          </div>
        )}
        <div style={{ color:C.soluk, fontSize:11, marginTop:16, textAlign:"center", lineHeight:1.5 }}>
          * İbn Sina, Galen ve Hippokrates'in humoral tıp geleneğine dayanır. Modern bilimsel kanıt sınırlıdır.
        </div>
      </div>
    </div>
  );
}


function KameraOCR({ onMetin, onIptal }) {
 const [durum, setDurum] = useState("bekle"); // bekle | aktif | kirp | isleniyor | hata
 const [stream, setStream] = useState(null);
 const [ilerleme, setIlerleme] = useState(0);
 const [zoom, setZoom] = useState(1);
 const [fotoUrl, setFotoUrl] = useState(null);
 const [kirp, setKirp] = useState({ x: 10, y: 25, w: 80, h: 50 }); // yüzde
 const [sur, setSur] = useState(null); // sürükleme durumu
 const videoRef = useRef(null);
 const canvasRef = useRef(null);
 const fotoRef = useRef(null);
 const kirpRef = useRef(null);

 useEffect(() => {
 return () => { if (stream) stream.getTracks().forEach(t => t.stop()); };
 }, []);

 useEffect(() => {
   if (durum === "aktif" && stream && videoRef.current) {
     videoRef.current.srcObject = stream;
     videoRef.current.play().catch(e => console.error("play hatası:", e));
   }
 }, [durum, stream]);

 function kameraAc() {
 setDurum("isleniyor");
 navigator.mediaDevices.getUserMedia({
 video: { facingMode: { ideal: "environment" }, width: { ideal: 1920 }, height: { ideal: 1080 } },
 audio: false
 }).then(s => {
 setStream(s);
 setZoom(1);
 setDurum("aktif");
 }).catch((err) => {
   console.error("Kamera hatası:", err);
   setDurum("hata");
 });
 }

 function kameraKapat() {
 if (stream) stream.getTracks().forEach(t => t.stop());
 setStream(null);
 setDurum("bekle");
 }

 function fotografCek() {
 if (!videoRef.current || !canvasRef.current) {
 bdToast("Kamera henüz hazır değil, biraz bekle.");
 return;
 }
 const v = videoRef.current, c = canvasRef.current;
 // zoom uygulanmış görüntüyü canvas'a al
 const vw = v.videoWidth, vh = v.videoHeight;
 const cropW = vw / zoom, cropH = vh / zoom;
 const cropX = (vw - cropW) / 2, cropY = (vh - cropH) / 2;
 c.width = vw; c.height = vh;
 c.getContext("2d").drawImage(v, cropX, cropY, cropW, cropH, 0, 0, vw, vh);
 const url = c.toDataURL("image/jpeg", 0.9);
 setFotoUrl(url);
 if (stream) stream.getTracks().forEach(t => t.stop());
 setStream(null);
 setKirp({ x: 10, y: 25, w: 80, h: 50 });
 setDurum("kirp");
 }

 function tekrarCek() {
 setFotoUrl(null);
 kameraAc();
 }

 // sürükleme - hem fare hem dokunmatik
 function konum(e) {
 const t = e.touches ? e.touches[0] : e;
 return { x: t.clientX, y: t.clientY };
 }
 function basla(tip) {
 return (e) => {
 e.preventDefault();
 const p = konum(e);
 setSur({ tip, baslaX: p.x, baslaY: p.y, kirp: { ...kirp } });
 };
 }
 function hareket(e) {
 if (!sur || !kirpRef.current) return;
 e.preventDefault();
 const p = konum(e);
 const kutu = kirpRef.current.getBoundingClientRect();
 const dxY = ((p.x - sur.baslaX) / kutu.width) * 100;
 const dyY = ((p.y - sur.baslaY) / kutu.height) * 100;
 let { x, y, w, h } = sur.kirp;
 if (sur.tip === "tasi") { x += dxY; y += dyY; }
 else if (sur.tip === "sa") { w += dxY; h += dyY; }
 else if (sur.tip === "sol") { x += dxY; w -= dxY; }
 else if (sur.tip === "ust") { y += dyY; h -= dyY; }
 else if (sur.tip === "alt") { h += dyY; }
 x = Math.max(0, Math.min(95, x));
 y = Math.max(0, Math.min(95, y));
 w = Math.max(10, Math.min(100 - x, w));
 h = Math.max(10, Math.min(100 - y, h));
 setKirp({ x, y, w, h });
 }
 function bitir() { setSur(null); }

 useEffect(() => {
 if (!sur) return;
 const mm = (e) => hareket(e);
 const mu = () => bitir();
 window.addEventListener("mousemove", mm);
 window.addEventListener("mouseup", mu);
 window.addEventListener("touchmove", mm, { passive: false });
 window.addEventListener("touchend", mu);
 return () => {
 window.removeEventListener("mousemove", mm);
 window.removeEventListener("mouseup", mu);
 window.removeEventListener("touchmove", mm);
 window.removeEventListener("touchend", mu);
 };
 }, [sur]);

 async function kirpVeAnaliz() {
 if (!fotoRef.current || !canvasRef.current) return;
 setDurum("isleniyor");
 setIlerleme(10);
 const img = fotoRef.current, c = canvasRef.current;
 const iw = img.naturalWidth, ih = img.naturalHeight;
 const cx = (kirp.x / 100) * iw;
 const cy = (kirp.y / 100) * ih;
 const cw = (kirp.w / 100) * iw;
 const ch = (kirp.h / 100) * ih;
 c.width = cw; c.height = ch;
 c.getContext("2d").drawImage(img, cx, cy, cw, ch, 0, 0, cw, ch);
 try {
 setIlerleme(30);
 const blob = await new Promise(res => c.toBlob(res, "image/jpeg", 0.85));
 const fd = new FormData();
 fd.append("file", blob, "etiket.jpg");
 // Türkçe + İngilizce çift dil (Türk ürün etiketlerinde her ikisi de geçer)
 fd.append("language", "tur");
 fd.append("OCREngine", "2");
 fd.append("detectOrientation", "true");
 fd.append("scale", "true");
 fd.append("OCREngine", "2");
 fd.append("scale", "true");
 fd.append("isTable", "false");
 setIlerleme(60);
 const r = await fetch("https://api.ocr.space/parse/image", {
 method: "POST",
 headers: { "apikey": "K82562609888957" },
 body: fd
 });
 setIlerleme(90);
 const data = await r.json();
 if (data.IsErroredOnProcessing) throw new Error(data.ErrorMessage || "OCR hatası");
 const metin = (data.ParsedResults && data.ParsedResults[0] && data.ParsedResults[0].ParsedText) || "";
 if (!metin.trim()) throw new Error("Metin bulunamadı");
 setIlerleme(100);
 onMetin(metin);
 } catch (e) {
 console.error("OCR hatası:", e);
 bdToast("Metin okunamadı: " + (e.message || "Bilinmeyen hata") + ". Tekrar dene veya manuel giriş yap.");
 setDurum("kirp");
 }
 }

 if (durum === "hata") return (
 <div style={{ background: C.y, border: `1px solid #FF2D5540`, borderRadius: 16, padding: 20, textAlign: "center", marginBottom: 14 }}>
 <div style={{ fontSize: 36, marginBottom: 8 }}></div>
 <div style={{ color: "#FF2D55", fontWeight: 700, marginBottom: 6 }}>Kamera Erişimi Reddedildi</div>
 <div style={{ color: C.soluk, fontSize: 13, marginBottom: 14 }}>Tarayıcı ayarlarından kamera iznini ver.</div>
 <button onClick={() => setDurum("bekle")} style={{ background: C.altin, border: "none", borderRadius: 10, padding: "10px 20px", color: "#1A1200", fontWeight: 700, cursor: "pointer", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif", marginRight: 8 }}>Tekrar Dene</button>
 <button onClick={onIptal} style={{ background: "none", border: `1px solid ${C.s}`, borderRadius: 10, padding: "10px 20px", color: C.soluk, cursor: "pointer", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}>İptal</button>
 </div>
 );

 if (durum === "bekle") return (
 <div style={{ background: C.y, border: `2px dashed ${C.s}`, borderRadius: 16, padding: 28, textAlign: "center", marginBottom: 14 }}>
 <div style={{ fontSize: 48, marginBottom: 12 }}></div>
 <div style={{ color: C.metin, fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Etiket Fotoğrafı Çek</div>
 <div style={{ color: C.soluk, fontSize: 13, lineHeight: 1.6, marginBottom: 18 }}>Ürünün "İçindekiler" bölümüne kamerayı tut.<br />Metin otomatik okunur ve analiz edilir.</div>
 <button onClick={kameraAc} style={{ width: "100%", background: `linear-gradient(135deg,${C.altin},${C.altinA})`, border: "none", borderRadius: 12, padding: "13px", color: "#1A1200", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif", marginBottom: 8 }}> Kamerayı Aç</button>
 <button onClick={onIptal} style={{ width: "100%", background: "none", border: `1px solid ${C.s}`, borderRadius: 12, padding: "11px", color: C.soluk, cursor: "pointer", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontSize: 13 }}>← Metin Girişe Dön</button>
 </div>
 );

 if (durum === "isleniyor") return (
 <div style={{ background: C.y, borderRadius: 16, padding: 28, textAlign: "center", marginBottom: 14 }}>
 <div style={{ fontSize: 36, marginBottom: 10 }}>⏳</div>
 <div style={{ color: C.altin, fontWeight: 700, marginBottom: 8 }}>Metin Okunuyor...</div>
 {ilerleme > 0 && (
 <div style={{ background: C.s, borderRadius: 8, overflow: "hidden", marginTop: 10 }}>
 <div style={{ background: C.altin, height: 6, width: `${ilerleme}%`, transition: "width 0.3s" }} />
 </div>
 )}
 <div style={{ color: C.cok, fontSize: 11, marginTop: 6 }}>{ilerleme}%</div>
 </div>
 );

 return (
 <div style={{ marginBottom: 14 }}>
 {durum === "kirp" && fotoUrl && (
 <>
 <div style={{ color: C.altin, fontSize: 12, fontWeight: 700, marginBottom: 8, textAlign: "center" }}>Etiketi çerçeve ile seç, köşelerden büyüt/küçült</div>
 <div ref={kirpRef} style={{ position: "relative", borderRadius: 16, overflow: "hidden", background: C.y2, marginBottom: 10, userSelect: "none", touchAction: "none" }}>
 <img ref={fotoRef} src={fotoUrl} alt="" style={{ width: "100%", display: "block" }} />
 <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", clipPath: `polygon(0 0, 0 100%, ${kirp.x}% 100%, ${kirp.x}% ${kirp.y}%, ${kirp.x + kirp.w}% ${kirp.y}%, ${kirp.x + kirp.w}% ${kirp.y + kirp.h}%, ${kirp.x}% ${kirp.y + kirp.h}%, ${kirp.x}% 100%, 100% 100%, 100% 0)` }} />
 <div onMouseDown={basla("tasi")} onTouchStart={basla("tasi")} style={{ position: "absolute", left: `${kirp.x}%`, top: `${kirp.y}%`, width: `${kirp.w}%`, height: `${kirp.h}%`, border: `2px solid ${C.altin}`, cursor: "move", boxSizing: "border-box" }} />
 <div onMouseDown={basla("ust")} onTouchStart={basla("ust")} style={{ position: "absolute", left: `${kirp.x + kirp.w / 2 - 3}%`, top: `${kirp.y - 2}%`, width: 24, height: 24, background: C.altin, borderRadius: "50%", cursor: "ns-resize", transform: "translate(-50%,-50%)", border: "2px solid #1A1200" }} />
 <div onMouseDown={basla("alt")} onTouchStart={basla("alt")} style={{ position: "absolute", left: `${kirp.x + kirp.w / 2 - 3}%`, top: `${kirp.y + kirp.h - 2}%`, width: 24, height: 24, background: C.altin, borderRadius: "50%", cursor: "ns-resize", transform: "translate(-50%,-50%)", border: "2px solid #1A1200" }} />
 <div onMouseDown={basla("sol")} onTouchStart={basla("sol")} style={{ position: "absolute", left: `${kirp.x - 1}%`, top: `${kirp.y + kirp.h / 2 - 3}%`, width: 24, height: 24, background: C.altin, borderRadius: "50%", cursor: "ew-resize", transform: "translate(-50%,-50%)", border: "2px solid #1A1200" }} />
 <div onMouseDown={basla("sa")} onTouchStart={basla("sa")} style={{ position: "absolute", left: `${kirp.x + kirp.w - 1}%`, top: `${kirp.y + kirp.h / 2 - 3}%`, width: 24, height: 24, background: C.altin, borderRadius: "50%", cursor: "nwse-resize", transform: "translate(-50%,-50%)", border: "2px solid #1A1200" }} />
 </div>
 <canvas ref={canvasRef} style={{ display: "none" }} />
 <div style={{ display: "flex", gap: 8 }}>
 <button onClick={tekrarCek} style={{ flex: 1, background: C.y, border: `1px solid ${C.s}`, borderRadius: 12, padding: "12px", color: C.soluk, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}>Tekrar Çek</button>
 <button onClick={kirpVeAnaliz} style={{ flex: 2, background: `linear-gradient(135deg,${C.altin},${C.altinA})`, border: "none", borderRadius: 12, padding: "12px", color: "#1A1200", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}>Bu Alanı Oku & Analiz Et</button>
 </div>
 </>
 )}
 {durum === "aktif" && (
 <>
 <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", background: C.y2, marginBottom: 10 }}>
 <video ref={videoRef} autoPlay playsInline muted style={{ width: "100%", display: "block", maxHeight: 480, objectFit: "cover", transform: `scale(${zoom})`, transformOrigin: "center" }} />
 <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", background: C.altin, borderRadius: 6, padding: "4px 12px", pointerEvents: "none" }}>
 <span style={{ color: "#1A1200", fontSize: 11, fontWeight: 700 }}>Etiketi netleştir, yakınlaştır, fotoğraf çek</span>
 </div>
 </div>
 <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.y, padding: "10px 14px", borderRadius: 12, marginBottom: 10 }}>
 <button onClick={() => setZoom(Math.max(1, zoom - 0.25))} style={{ background: C.s, border: "none", borderRadius: 8, width: 36, height: 36, color: C.altin, fontSize: 20, fontWeight: 700, cursor: "pointer", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}>−</button>
 <input type="range" min="1" max="4" step="0.1" value={zoom} onChange={e => setZoom(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.altin }} />
 <button onClick={() => setZoom(Math.min(4, zoom + 0.25))} style={{ background: C.s, border: "none", borderRadius: 8, width: 36, height: 36, color: C.altin, fontSize: 20, fontWeight: 700, cursor: "pointer", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}>+</button>
 <div style={{ color: C.altin, fontSize: 12, fontWeight: 700, minWidth: 40, textAlign: "right" }}>{zoom.toFixed(1)}x</div>
 </div>
 <canvas ref={canvasRef} style={{ display: "none" }} />
 <div style={{ display: "flex", gap: 8 }}>
 <button onClick={kameraKapat} style={{ flex: 1, background: C.y, border: `1px solid ${C.s}`, borderRadius: 12, padding: "12px", color: C.soluk, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}>Kapat</button>
 <button onClick={fotografCek} style={{ flex: 2, background: `linear-gradient(135deg,${C.altin},${C.altinA})`, border: "none", borderRadius: 12, padding: "12px", color: "#1A1200", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}>Fotoğraf Çek</button>
 </div>
 </>
 )}
 </div>
 );
}

/* ══════════════════════════════════════════════
 FOTO + İSİM İLE SORGULAMA
 ══════════════════════════════════════════════ */
function FotoIsim({ kategoriAd, onAra, onIptal }) {
  const [isim, setIsim] = useState("");
  const [foto, setFoto] = useState(null);
  const kamRef = useRef(null);
  const galRef = useRef(null);

  function dosyaSec(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setFoto(r.result);
    r.readAsDataURL(f);
  }

  return (
    <div>
      <div style={{ background: `linear-gradient(135deg, ${C.altin}18, ${C.y2})`, border: `1px solid ${C.altin}55`, borderRadius: 12, padding: "12px 14px", marginBottom: 14 }}>
        <div style={{ color: C.altin, fontWeight: 700, fontSize: 12, letterSpacing: 0.5, marginBottom: 6 }}>★ YAKINDA — MOBİL UYGULAMADA</div>
        <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
          Mobil uygulama sürümünde <b>foto'dan otomatik ürün/logo tanıma</b> aktif olacak. Yapay zekâ ürünü tanıyacak, içindekiler listesi otomatik gelecek.
        </div>
        <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.altin}30` }}>
          <b style={{ color: C.metin }}>Şimdilik:</b> Ürünün ismini yazarak arşivde arayabilirsin. Foto eklemen opsiyonel — sadece görsel hatırlatma içindir.
        </div>
      </div>

      {foto ? (
        <div style={{ position: "relative", marginBottom: 12 }}>
          <img src={foto} alt="" style={{ width: "100%", maxHeight: 240, objectFit: "contain", background: C.y2, borderRadius: 12, border: `1px solid ${C.s}` }} />
          <button onClick={() => setFoto(null)} style={{ position: "absolute", top: 8, right: 8, background: "#000000A0", border: `1px solid ${C.s}`, borderRadius: "50%", width: 30, height: 30, color: C.metin, cursor: "pointer", fontSize: 14, fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}>✕</button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <button onClick={() => kamRef.current && kamRef.current.click()} style={{ flex: 1, background: C.y, border: `1px dashed ${C.altin}80`, borderRadius: 12, padding: "18px 8px", color: C.altin, fontSize: 13, cursor: "pointer", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}>Kamera ile Çek</button>
          <button onClick={() => galRef.current && galRef.current.click()} style={{ flex: 1, background: C.y, border: `1px dashed ${C.altin}80`, borderRadius: 12, padding: "18px 8px", color: C.altin, fontSize: 13, cursor: "pointer", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}>Galeriden Seç</button>
        </div>
      )}

      <input ref={kamRef} type="file" accept="image/*" capture="environment" onChange={dosyaSec} style={{ display: "none" }} />
      <input ref={galRef} type="file" accept="image/*" onChange={dosyaSec} style={{ display: "none" }} />

      <input
        type="text"
        value={isim}
        onChange={e => setIsim(e.target.value)}
        placeholder={`${kategoriAd} ismi (örn: çikolata, krem, ilaç)`}
        style={{ width: "100%", background: C.y2, border: `1px solid ${C.s}`, borderRadius: 12, padding: "13px 14px", color: C.metin, fontSize: 14, marginBottom: 10, fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}
      />

      <button
        onClick={() => onAra(isim, foto)}
        disabled={!isim.trim()}
        style={{ width: "100%", background: `linear-gradient(135deg,${C.altin},${C.altinA})`, border: "none", borderRadius: 14, padding: "14px", color: "#1A1200", fontWeight: 700, fontSize: 15, cursor: isim.trim() ? "pointer" : "default", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif", marginBottom: 10, opacity: isim.trim() ? 1 : 0.4 }}
      >
        Arşivde Ara
      </button>

      <button onClick={onIptal} style={{ width: "100%", background: "none", border: `1px solid #22223A`, borderRadius: 12, padding: "11px", color: "#8A8499", fontSize: 13, cursor: "pointer", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}>Vazgeç</button>
    </div>
  );
}

/* ══════════════════════════════════════════════
 STİLLER
 ══════════════════════════════════════════════ */

/* ══════════════════════════════════════════════
 ANA UYGULAMA
 ══════════════════════════════════════════════ */
export default function App() {
 const [ekran, setEkran] = useState("yasal");
 const [gecmis, setGecmis] = useState(() => { try { const g = localStorage.getItem("bd_gecmis"); return g ? JSON.parse(g) : []; } catch { return []; } });
 const [sinaDefter, setSinaDefter] = useState(() => { try { return localStorage.getItem("bd_sina_defter") || ""; } catch { return ""; } });
 const [hizArama, setHizArama] = useState("");
 const [hizFiltre, setHizFiltre] = useState("hepsi");
 const [sekme, setSekme] = useState("tarama");
 const [txt, setTxt] = useState("");
 const [sonuclar, setSonuclar] = useState([]);
 const [belirsizler, setBelirsizler] = useState([]);
 const [ilkSira, setIlkSira] = useState([]);
 const [profil, setProfil] = useState(() => { try { const p = localStorage.getItem("bd_profil"); return p ? JSON.parse(p) : null; } catch { return null; } });
 const [aktifUye, setAktifUye] = useState(() => { try { const p = localStorage.getItem("bd_profil"); return p ? (JSON.parse(p).ad || null) : null; } catch { return null; } });
 const [dogum, setDogum] = useState(() => { try { return localStorage.getItem("bd_dogum") || ""; } catch { return ""; } });
 const [cinsiyet, setCinsiyet] = useState(() => { try { return localStorage.getItem("bd_cinsiyet") || "Erkek"; } catch { return "Erkek"; } });
 const [marketKategoriPanel, setMarketKategoriPanel] = useState(false);
 const [marketAcikBaslik, setMarketAcikBaslik] = useState(null);
 const [seslerAcik, setSeslerAcik] = useState(() => { try { return localStorage.getItem("bd_ses") !== "kapali"; } catch { return true; } });
 const sesToggle = () => { const yeni = !seslerAcik; setSeslerAcik(yeni); try { localStorage.setItem("bd_ses", yeni ? "acik" : "kapali"); } catch {} if (!yeni && window.speechSynthesis) window.speechSynthesis.cancel(); };
 const [modal, setModal] = useState(null);
 const [raporAcik, setRaporAcik] = useState(false);
 const [marketAcik, setMarketAcik] = useState(false);
 const [tarifModal, setTarifModal] = useState(null);
 const [acik, setAcik] = useState(() => new Set());
 const [kategori, setKategori] = useState("gida");
 const [maddeGrupAcik, setMaddeGrupAcik] = useState(null);
 const [saglikDurumu, setSaglikDurumu] = useState(() => { try { const s = localStorage.getItem("bd_saglik"); return s ? JSON.parse(s) : []; } catch { return []; } });
 const [liyakat, setLiyakat] = useState(() => {
   try {
     const l = localStorage.getItem("bd_liyakat");
     if (l) return JSON.parse(l);
   } catch {}
   return { puan: 0, mertebe: "sagirt", lakap: "", gunlukSeri: 0, sonGiris: null, kazanilanRozetler: [], yukseldigiTarihler: {}, baslangic: Date.now(), pirK: null, ahdler: {}, cozulenSualler: {}, sefaatler: [], hediyeler: [], yadGosterimleri: {}, sinavGectikleri: {}, kacinGorulen: 0, kacinHaftalik: { hafta: 0, sayim: 0 }, sonSualTarih: null, mahcubiyetUyari: 0, niyet: null, hatiralar: [], yoklukSonGosterilen: 0, sonTekKelime: null, acilanSirlar: {}, sonGuncel: null, erbain: null, pirSesi: false, yildizlar: [] };
 });
 const PK = {
   kart: { background: C.y, border: `1px solid ${C.s}`, borderRadius: 14, padding: 16, marginBottom: 10 },
   baslik: { display: "flex", alignItems: "center", gap: 8, color: C.altin, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, marginBottom: 12 },
   cizgi: { width: 18, height: 1.5, background: `linear-gradient(90deg, ${C.altin}, transparent)`, borderRadius: 2 },
 };
 const ASITANE_BASLANGIC = Date.UTC(2026, 0, 1);
 const ASITANE_GUNLUK_KATILIM = 4.7;
 const ASITANE_BASLANGIC_NO = 247;
 const siraNoHesapla = (baslangic) => {
   const ts = baslangic || Date.now();
   if (ts < ASITANE_BASLANGIC) return ASITANE_BASLANGIC_NO;
   const gun = (ts - ASITANE_BASLANGIC) / 86400000;
   return Math.max(1, Math.floor(ASITANE_BASLANGIC_NO + gun * ASITANE_GUNLUK_KATILIM));
 };
 const [yeniMertebeBildirim, setYeniMertebeBildirim] = useState(null);
 useEffect(() => {
   const bugun = new Date().toDateString();
   if (liyakat.sonGiris === bugun) return;
   const dun = new Date(Date.now() - 86400000).toDateString();
   const yeniSeri = liyakat.sonGiris === dun ? (liyakat.gunlukSeri || 0) + 1 : 1;
   const yeni = { ...liyakat, sonGiris: bugun, gunlukSeri: yeniSeri };
   setLiyakat(yeni);
   try { localStorage.setItem("bd_liyakat", JSON.stringify(yeni)); } catch {}
 }, []);
 // Profil ekranına her girişte kayıtlı profili forma doldur — tekrar tekrar tarih/isim girilmesin
 useEffect(() => {
   if (ekran !== "profil_kur" || !profil) return;
   if (profil.dogum && (!dogum || !/^\d{4}-\d{2}-\d{2}$/.test(dogum))) {
     setDogum(profil.dogum);
     try { localStorage.setItem("bd_dogum", profil.dogum); } catch {}
   }
   if (profil.ad && !aktifUye) setAktifUye(profil.ad);
   if (profil.cinsiyet) setCinsiyet(profil.cinsiyet);
 }, [ekran]);
 const MERTEBELER = [
   { k: "sagirt", ad: "Çırak", anlam: "Sâlik · Tâlib", esik: 0, renk: "#9B7B4F", hikmet: "Görmek", sart: { gun: 0, urun: 1, hatm: 0, sefaat: 0 }, aciklama: "Fıtrat bilgisinin kapısında duran. Etiketi okumayı, gizli düşmanı görmeyi öğrenir. Hikmeti: Görmek." },
   { k: "kalfa", ad: "Kalfa", anlam: "Usta yardımcısı", esik: 50, renk: "#B87333", hikmet: "Ayırt Etmek", sart: { gun: 30, urun: 30, hatm: 7, sefaat: 3 }, aciklama: "Ahilik geleneğinde ustanın yanında üretim sırrını öğrenen ehil kimse. Aldatıcı pazarlamayı ayırt eder, helal ve sahte helali tefrik eder. Hikmeti: Ayırt Etmek." },
   { k: "kethuda", ad: "Kethüda", anlam: "Bölge Sorumlusu", esik: 200, renk: "#8E8E93", hikmet: "Korumak", sart: { gun: 60, urun: 100, hatm: 21, sefaat: 7 }, aciklama: "Esnaf âsitânesinin veya semtin idari sorumlusu. Yedi yârenini gözeten, hastalık-gıda zincirini bilen koruyucu. Hikmeti: Korumak." },
   { k: "hekimbasi", ad: "Hekimbaşı", anlam: "Saray Başhekimi", esik: 800, renk: "#C9952C", hikmet: "Şifa Vermek", sart: { gun: 120, urun: 250, hatm: 60, sefaat: 7 }, aciklama: "Hekimlerin başı, sultanın özel tabibi. Yetiştirdiği kalfalarla şifa zincirini ören üstâd. Hikmeti: Şifa Vermek." },
 ];
 const PIRLER = [
   { k: "aktar", ad: "Pîr-i Aktâr", uslup: "titiz", hitap: "muhibbim", uzmanlik: "katkı maddeleri ve etiket sırrı" },
   { k: "lokman", ad: "Pîr-i Lokmân", uslup: "müşfik", hitap: "azîzim", uzmanlik: "şifalı otlar ve nebevi tıb" },
   { k: "edviye", ad: "Pîr-i Edviye", uslup: "öğretici", hitap: "sâlikim", uzmanlik: "beslenme ve mizaç dengesi" },
   { k: "mizan", ad: "Pîr-i Mîzân", uslup: "temkinli", hitap: "yârenim", uzmanlik: "ölçü, denge ve hikmet" },
 ];
 const pirAta = (lakap, dogum) => {
   const s = ((lakap || "tâlib") + "|" + (dogum || "")).toLowerCase();
   let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
   return PIRLER[Math.abs(h) % PIRLER.length];
 };
 const AHD_ANAHTARLAR = {
   "şeker": /şeker|glikoz|fruktoz|sukroz|maltodekstrin|şurup/i,
   "renklendirici": /e10[0-9]|e11[0-9]|e12[0-9]|tartrazin|renklendirici/i,
   "trans yağ": /hidrojene|trans yağ|margarin/i,
   "palm yağı": /palm yağı|palmiye yağ/i,
   "sodyum nitrit": /e250|nitrit|nitrat/i,
   "katkı": /katkı|emülgatör|stabilizatör/i,
   "BHA": /BHA|BHT|e320|e321/i,
   "GDO": /GDO|glifosat|monsanto/i,
   "BPA": /BPA|bisfenol|ftalat/i,
 };
 const SUALLER = {
   sagirt: [
     { s: "Etiketteki E471 nedir?", sik: ["Doğal vitamin", "Mono-digliserit (emülgatör)", "Tatlandırıcı"], d: 1, ders: "E471: mono- ve digliseritler — yağ asitlerinden üretilen emülgatör. EFSA 2017 yeniden değerlendirmesinde güvenlik kaygısı bulunmadı. Ancak kaynağı (hayvansal/bitkisel) etikette belirtilmek zorunda değil — helal hassasiyeti olanlar için bu nokta önemli." },
     { s: "'Helal' mührü her zaman güvenilir mi?", sik: ["Daima güvenilir", "Sertifika kuruluşuna göre değişir", "Tamamen sahtedir"], d: 1, ders: "Helal sertifikalarının denetim seviyesi kuruluşa göre değişir. Mühür içeriği okumayı bırakmanın bahanesi olmamalı; her zaman etiket okunmalı." },
     { s: "Glikoz şurubu hangi kaynaktan gelir?", sik: ["Bal", "GDO'lu mısır nişastası", "Şeker pancarı"], d: 1, ders: "Yüksek fruktozlu mısır şurubu (HFCS) GDO'lu mısır nişastasından üretilir. Karaciğer yağlanması ve insülin direnci ile ilişkilendirilmiştir (Lancet, 2010)." },
   ],
   kalfa: [
     { s: "Hangi yağ trans yağ oluşumuna en yatkın?", sik: ["Soğuk sıkım zeytinyağı", "Hidrojene bitkisel yağ", "Tereyağı"], d: 1, ders: "Hidrojenizasyon: sıvı yağa basınç altında hidrojen eklenmesi. Trans yağ oluşur; WHO'ya göre kalp-damar hastalıklarının önde gelen sebebidir." },
     { s: "Aspartam (E951) en çok hangi organa yüktür?", sik: ["Cilt", "Beyin ve sinir sistemi", "Kemik"], d: 1, ders: "Aspartam fenilalanin, aspartik asit ve metanole parçalanır. PKU hastalarına yasaktır; IARC 2023'te Grup 2B 'muhtemel kanserojen' olarak sınıflandırdı." },
     { s: "Sodyum nitrit (E250) hangi riski büyütür?", sik: ["Egzama", "Mide ve kolon kanseri", "Astım"], d: 1, ders: "Sodyum nitrit pişirme ve sindirim sırasında nitrozaminlere dönüşür. IARC Grup 1 kanserojendir; özellikle işlenmiş et tüketenlerde mide-kolon kanseri riski yükselir." },
   ],
   kethuda: [
     { s: "BHA (E320) + BHT (E321) birlikte alındığında?", sik: ["Etkileri azalır", "Sinerji yapar, karaciğerde birikir", "Birbirini iptal eder"], d: 1, ders: "BHA-BHT birlikte sinerjik antioksidan; ancak yağ dokusunda birikir, endokrin sistemi etkiler. IARC Grup 2B." },
     { s: "Karragenan (E407) hangi rahatsızlığı tetikleyebilir?", sik: ["Bağırsak iltihabı", "Migren", "Saç dökülmesi"], d: 0, ders: "Karragenan deney hayvanlarında ülseratif kolit oluşturur; insanda da bağırsak iltihabını (IBD) artırma şüphesi vardır." },
     { s: "Palm yağının en büyük zararı nedir?", sik: ["Tat kötüdür", "Doymuş yağ yükü ve damar tıkanması", "Sindirimi zordur"], d: 1, ders: "Palm yağı %50 doymuş yağ içerir; LDL kolesterolü yükseltir, damar duvarına çöker, kalp-damar hastalığı riskini artırır." },
   ],
   hekimbasi: [
     { s: "Endokrin bozucu (ksenoöstrojen) en yüksek hangisinde?", sik: ["BPA (plastik, konserve)", "Sofra tuzu", "Limon"], d: 0, ders: "Bisfenol-A östrojen taklidi yapar; konserve iç astarı ve plastik şişeden geçer. Üreme sağlığı bozuklukları, obezite ve meme kanseri ile ilişkili." },
     { s: "Glifosat (Roundup) hangi üründe en yoğun?", sik: ["Organik yumurta", "GDO'lu soya/mısır", "Bal"], d: 1, ders: "Glifosat GDO mahsullerinde yoğun. IARC 2A 'muhtemel kanserojen' (2015). Bağırsak florasını imha eder, çölyak benzeri tablo açabilir." },
     { s: "Aspartam Ramazzini meta-analizinde hangi hastalıkla en güçlü bağ kurdu?", sik: ["Saç dökülmesi", "Non-Hodgkin lenfoma ve lösemi", "Şeker hastalığı"], d: 1, ders: "Ramazzini Enstitüsü uzun süreli kemirgen çalışmaları aspartamın lenfoma ve lösemi insidansını artırdığını gösterdi. IARC 2023'te 2B sınıfına aldı." },
   ],
 };
 const AHD_METINLER = {
   kalfa: [
     "Bu ahd ile şahit tutuyorum: Soframa gizli şekerleri (glikoz şurubu, maltodekstrin, fruktoz) almayacağım. Etiket okumadan ürün almayacağım. Bu sözden dönersem mührüm soluk kalsın.",
     "Kalfa mertebesine girer iken ahd ederim: Sentetik renklendirici (E102, E110, E122) içeren hiçbir ürünü çocuğumun, ehlimin sofrasına getirmeyeceğim. Bilmeden aldığım yanlışı bir gün içinde düzelteceğim.",
     "Hakk'ın huzurunda ahd ederim: Helal mührüne körü körüne güvenmeyeceğim. Her ürünün içeriğini gözümle göreceğim, anlamadığım katkıyı araştıracağım. Bu yoldan dönmem.",
   ],
   kethuda: [
     "Kethüdâlık makamına girer iken ahd ederim: Yalnız kendi soframa değil, yedi yârenimin sofrasına da nezaret edeceğim. Hidrojene yağ, palm yağı ve trans yağı sofralarımıza koymayacağım.",
     "Bu ahd ile söz veriyorum: Sodyum nitrit, BHA ve BHT içeren işlenmiş et ürünlerini ne kendi soframa ne yedi yârenimin soframa getirmeyeceğim. Bilenin sükûtu vebaldir, ben sükût etmeyeceğim.",
     "Beldemin emaneti sırtımdadır: Aldatıcı 'doğal' etiketine kanmayacağım, kandırılan her yâreni uyaracağım. Bu sözden dönersem asâm kırılsın.",
   ],
   hekimbasi: [
     "Hekimbaşılık makamına geçer iken ahd ederim: Hâcim ettiğim bilgiyi mahrem tutmayacağım, hak edene aktaracağım. Şifa bilgisi parayla satılmaz, ihtiyacı olana ulaştırılır.",
     "Bu ahd-i âlî ile şahit tutarım: Endokrin bozucu (BPA, ftalatlar), GDO ürünleri ve glifosat — bunların ne ailemde ne yetiştirdiklerimde olmasına izin vermeyeceğim. Bilenin sorumluluğu büyüktür.",
     "Hekimbaşılık şerefine ahd ederim: Bildiğimi gizlemeyeceğim, bilmediğimi öğreneceğim, öğrendiğimi aktaracağım. Şifa zinciri kopmayacak. Bu ahdden dönersem hil'atim yıpransın.",
   ],
 };
 const HEDIYELER = [
   { t: "ayet", k: "Şuarâ Sûresi 80", m: "Hastalandığım zaman bana O şifa verir." },
   { t: "ayet", k: "A'râf Sûresi 31", m: "Yiyiniz, içiniz, israf etmeyiniz; Allah israf edenleri sevmez." },
   { t: "ayet", k: "İsrâ Sûresi 82", m: "Biz Kur'an'dan mü'minler için şifa ve rahmet olan şeyler indiriyoruz." },
   { t: "ayet", k: "Nahl Sûresi 69", m: "Onun karınlarından türlü renklerde şerbet çıkar; onda insanlar için şifa vardır." },
   { t: "hadis", k: "Buhârî, Tıb 1 · Tirmizî, Tıb 2039 · İbn Mâce, Tıb 3436", m: "Allah indirdiği her hastalığın şifasını da indirmiştir." },
   { t: "hikmet", k: "Hâris bin Kelede (Arap hekîmi) · el-Muhâvere fi't-Tıb", m: "Mide hastalıkların yuvası, az yemek ise devânın başıdır." },
   { t: "hikmet", k: "İbn-i Sînâ · El-Kanun fi't-Tıb", m: "Yediğin vakit az ye; yedikten sonra dört-beş saat ara ver. Şifâ hazımdadır." },
   { t: "hikmet", k: "Akşemseddîn · Maddetü'l-Hayat (Süleymaniye Ktp., Ayasofya nr. 3574)", m: "Hastalıklar insandan insana, gözle görülmeyecek kadar küçük tohumlar vasıtasıyla geçer." },
   { t: "hikmet", k: "Erzurumlu İbrahim Hakkı · Marifetname (1756)", m: "Tokluk hastalık, açlık ise devânın başıdır." },
 ];
 const YAD_METINLER = [
   (pir, gun) => `${pir.ad} bugün seni andı, ${pir.hitap}.`,
   (pir, gun) => `Bu yola gireli ${gun} gün oldu, ${pir.hitap}. Mührün hâlâ tâze.`,
   (pir, gun) => `Geçen aydaki bir kararın, bugün üç yâreni de uyandırdı.`,
   (pir, gun) => `${pir.ad} der ki: 'En zor mücadele, kendi nefsi ile olandır.'`,
   (pir, gun) => `${pir.hitap}, sofranın bereketi senin uyanıklığındandır.`,
 ];
 const MANIFESTOLAR = [
   "Sofranı tanı, neslini koru",
   "Evine gireni bil",
   "Her lokma emanettir",
   "Etiket okumak ibadettir",
   "Gözünle gör, kalbinle seç",
   "Az ye, çok düşün",
   "Helâl olan bereket getirir",
   "Atalar bilirdi, sen de bil",
   "Fıtrata aykırı olan bedene düşmandır",
   "Şifa eczanede değil, sofrada başlar",
   "Mide haram istemez, akıl ister",
   "Görmediğin yağ damarına yazılır",
   "Yedikçe değil, tanıdıkça doyarsın",
   "Marka değil, içerik konuşur",
   "Renklendirilmiş gıda, renksiz ömürdür",
   "Toprağa yakın olan, sıhhate yakındır",
   "Hızlı pişen, hızlı tüketir",
   "Ataların sofrasında zehir yoktu",
   "Eski tatlar yeni hastalıklara karşıdır",
   "Mevsiminde olan, fıtratta olandır",
   "Sade sofra, sade kalp",
   "Süt anneden, ekmek tarladan",
   "Bilmediğin şeyi yeme",
   "Şükret, sonra ye",
   "Bismillah hatırlatır, fıtrat hatırlatır",
   "Bedenini emanet bil",
   "Aç gözle ye, tok zihinle düşün",
   "Çocuğa verdiğin, geleceğine verdiğindir",
   "Yağ aileleri, hastalık aileleridir",
   "Şeker tatlı, sonu acıdır",
   "Tuza dikkat et, tuzağa dikkat et",
   "Sentetik sınırlı, fıtrî sonsuzdur",
   "Reklam doyurmaz, gerçek doyurur",
   "Önce niyet, sonra market",
   "Tarladan sofraya, sofradan ahirete",
   "İbn-i Sînâ'yı dinle, Lokmân'ı oku",
   "Gıdan duân kadar temiz olsun",
   "Sofra duâ ile başlar, şükür ile biter",
   "Helâl mührüne değil, gözüne güven",
   "E-kodun varsa, şüphen olsun",
   "Atalı tohum, asalete tohum",
   "Yapay tatlı, yapay neslin başıdır",
   "Ne yersen o'sun — sen kimsin?",
   "Sağlık servet değil, sermayedir",
   "Bilinçli sofra, bilinçli nesil",
   "Ekmek kutsaldır, et emanettir",
   "Bir lokma daha mı, bir nefes daha mı?",
   "Aktarın bildiğini market unuttu",
   "Kadim hekim, kadim sofradan doğar",
   "Sofranı koruyan, soyunu korur",
 ];
 const ORGAN_KONUSMALARI = {
   "Karaciğer": "Der ki: bu yağı sindiremem, beni yorma.",
   "Mide": "Der ki: bu çok ağır, eritmeye gücüm yok.",
   "Böbrek": "Der ki: bu sodyum yükünü tek başıma süzemem.",
   "Bağırsak": "Der ki: bu katkıyı tanımıyorum, beni kaşır.",
   "Kalp": "Der ki: damarlarıma sıkıştırıyorsun, derdimi bil.",
   "Beyin": "Der ki: bu şekerin ardı kesilmiyor — benimle alay etme.",
   "Sinir Sistemi": "Der ki: bu tatlandırıcı beni delirtiyor.",
   "Cilt": "Der ki: içerideki iltihap bana çıkıyor, sebep sensin.",
   "Akciğer": "Der ki: bu nefes bana yetmiyor, temizini iste.",
   "Pankreas": "Der ki: insülin makinem yoruldu, rahat ver.",
   "Tiroid": "Der ki: hormonum sallanıyor, ben de sallanıyorum.",
   "Damar": "Der ki: çeperim sertleşiyor, sebep bu yağdır.",
   "Kemikler": "Der ki: kalsiyumumu çalıyorlar, dur engelle.",
   "Bağışıklık": "Der ki: ben senin ordunum, bana zehir yedirme.",
   "Üreme": "Der ki: gelecek nesil benden geçer, bunu unutma.",
 };
 const zamanOgutSec = (pir, hit) => {
   const s = new Date().getHours();
   let havuz;
   if (s >= 3 && s < 6) havuz = [
     `Seherin sırrı kalbinin uyanıklığındadır, ${hit}.`,
     `${pir.ad}: "Seher vakti dua perdesi incelir, kapı açıktır."`,
     `${hit}, gece tükenmeden bir niyet kur — gün onunla başlasın.`,
   ];
   else if (s < 11) havuz = [
     `Sabahın bereketi niyetin temizliğindedir, ${hit}.`,
     `${pir.ad}: "Bugünkü ilk lokmana dikkat et — günün ona göre kurulur."`,
     `${hit}, sabah uyanırken bir sofra duâsı et — bütün gün hayır olsun.`,
   ];
   else if (s < 16) havuz = [
     `Yarım kalan mücadele tamamlanmamış sayılır, ${hit}. Sebat et.`,
     `${pir.ad}: "Vakti israf et­meyen ömrü israf etmez."`,
     `${hit}, öğle vakti küçük bir sus — sofranı düşün.`,
   ];
   else if (s < 19) havuz = [
     `Akşam yaklaşıyor. Gözden geçir gününü ${hit} — hangi lokmaya şükür demedin?`,
     `${pir.ad}: "İkindi vakti yaprak gibi dökülür hatalar, bir niyetle topla."`,
     `${hit}, gün batmadan bir doğruyu yazıver.`,
   ];
   else if (s < 22) havuz = [
     `Akşamın huzuru gündüzün niyetindedir, ${hit}. Vakar üzere yat.`,
     `${pir.ad}: "Akşam sofrası bereket sofrasıdır; aceleyle dolma."`,
     `${hit}, yatağa girerken bir tövbe et — gece arınır.`,
   ];
   else havuz = [
     `Gecenin sırrı dilin susuşundadır, ${hit}. Dinle.`,
     `${pir.ad}: "Gece yarısı her sözden değerlidir — sus, tefekkür et."`,
     `${hit}, gecenin sessizliği şifadır. Pîrlerin sözünü hatırla.`,
   ];
   return havuz[Math.floor(Math.random() * havuz.length)];
 };
 const hicriCevir = (d) => {
   const aylar = ["Muharrem","Safer","Rebîülevvel","Rebîülâhir","Cemâziyelevvel","Cemâziyelâhir","Receb","Şâban","Ramazân","Şevvâl","Zilkâde","Zilhicce"];
   const jd = Math.floor((d.getTime() / 86400000) + 2440587.5);
   const l = jd - 1948440 + 10632;
   const n = Math.floor((l - 1) / 10631);
   const l2 = l - 10631 * n + 354;
   const j = Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719) + Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238);
   const l3 = l2 - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
   const ay = Math.floor((24 * l3) / 709);
   const gun = l3 - Math.floor((709 * ay) / 24);
   const yil = 30 * n + j - 30;
   return { gun, ay: aylar[ay - 1] || "Muharrem", yil };
 };
 const vakitBul = () => {
   const s = new Date().getHours();
   if (s < 6) return "gece"; if (s < 11) return "sabah"; if (s < 16) return "ogle"; if (s < 20) return "aksam"; return "gece";
 };
 const SELAM_KALIPLAR = {
   sabah: [
     (h) => `Selâmün aleyküm ${h}, hayırlı sabahlar.`,
     (h) => `Sabahın hayır olsun ${h}, bereket soframıza yâr olsun.`,
     (h) => `Selâm sana ${h}, gün aydınlık başlasın.`,
     (h) => `Hayırlı sabahlar ${h}, bu gün de fıtrat üzere geçsin.`,
     (h) => `Selâmün aleyküm ${h}, seherin nuru üzerinde olsun.`,
   ],
   ogle: [
     (h) => `Selâmün aleyküm ${h}, hayırlı vakitler.`,
     (h) => `Selâm sana ${h}, sofranın bereketi daim olsun.`,
     (h) => `Hayırlı vakitler ${h}, niyetin sahih olsun.`,
     (h) => `Selâmün aleyküm ${h}, vaktin hayırla geçsin.`,
   ],
   aksam: [
     (h) => `Selâmün aleyküm ${h}, hayırlı akşamlar.`,
     (h) => `Akşamın hayır olsun ${h}, sofranın helâl olsun.`,
     (h) => `Selâm sana ${h}, gün batarken huzur seninle olsun.`,
     (h) => `Hayırlı akşamlar ${h}, yorgunluğun şifaya dönsün.`,
   ],
   gece: [
     (h) => `Selâmün aleyküm ${h}, geceniz hayır olsun.`,
     (h) => `Selâm sana ${h}, uykun bereketli olsun.`,
     (h) => `Hayırlı geceler ${h}, rüyalarına nur yağsın.`,
     (h) => `Selâmün aleyküm ${h}, gece kalbine sükûn versin.`,
   ],
 };
 const selamHazirla = (lakap, pir) => {
   const v = vakitBul();
   const hit = lakap ? lakap : pir.hitap;
   const havuz = SELAM_KALIPLAR[v] || SELAM_KALIPLAR.ogle;
   return havuz[Math.floor(Math.random() * havuz.length)](hit);
 };
 const TEK_KELIMELER = ["Sabret.", "Şükret.", "Düşün.", "Tövbe.", "Tefekkür.", "Hatırla.", "Sus.", "Bekle.", "İhsan.", "Niyet."];
 const YOKLUK_METINLERI = {
   3: (pir, hit, gun) => `${pir.ad}: "${hit}, üç gündür yolu kestin — hayır mıdır? Sofranı kontrol etmedin."`,
   7: (pir, hit, gun) => `${pir.ad}: "Bir hafta oldu ${hit}. Mührün soluyor, müridini unutma. ${gun} gündür beklerim."`,
   14: (pir, hit, gun) => `${pir.ad}: "${gun} gündür yokluğun var ${hit}. Yüzüm grileşti, mührüm tozlandı. Geri dön — kavuşalım."`,
   30: (pir, hit, gun) => `${pir.ad}: "${gun} gün... Belki de geri dönmeyeceksin sandım. Geldin — şükür. Yeniden başlayalım, ${hit}."`,
 };
 const PIR_SIRLARI = {
   aktar: [
     { baslik: "BHA'nın İki Yüzü", metin: "BHA (E320), IARC tarafından Grup 2B 'muhtemel kanserojen' sınıfındadır. EFSA 2011 yeniden değerlendirmesi günlük alımı 0.5 mg/kg ile sınırladı.", kaynak: "EFSA Journal 2011;9(10):2392" },
     { baslik: "BHT'nin Yumuşak Yasak'ı", metin: "BHT (E321) IARC Grup 3'te ('sınıflandırılamaz') ama EFSA 2012'de ADI'yı 0.25 mg/kg/gün'e indirdi — dolaylı sınırlama.", kaynak: "EFSA Journal 2012;10(3):2588" },
     { baslik: "E471'in Saklı Kaynağı", metin: "E471, EFSA 2017'de güvenli bulundu; ancak kaynağı (hayvansal/bitkisel) etikette belirtilmek zorunda değildir — helal-vegan hassasiyeti için sır.", kaynak: "EFSA Journal 2017;15(11)" },
     { baslik: "'Doğal' Kelimesinin Sınırı", metin: "6502 Sayılı Kanun · Reklam Kurulu, 'doğal' iddiasını sınırlar ama içeriği doğrudan denetlemez. Etiketin kelimesine değil, içeriğine bak.", kaynak: "6502 Md. 63 · Reklam Kurulu Yönetmeliği" },
   ],
   lokman: [
     { baslik: "Marifetname'nin Sırrı", metin: "'Tokluk hastalık, açlık ise devânın başıdır.' — Erzurumlu İbrahim Hakkı'nın 1756'da yazdığı Marifetname'den.", kaynak: "Marifetname (1756)" },
     { baslik: "İbn-i Sînâ'nın Reçetesi", metin: "'Yediğin vakit az ye; yedikten sonra dört-beş saat ara ver. Şifâ hazımdadır.' — El-Kanun fi't-Tıb.", kaynak: "İbn-i Sînâ, El-Kanun fi't-Tıb" },
     { baslik: "Hâris bin Kelede'nin Sözü", metin: "'Mide hastalıkların yuvası, perhiz ise devânın başıdır.' Bu söz nebevi hadis değil; Sahavi'ye göre Arap hekîmi Hâris bin Kelede'ye aittir.", kaynak: "Sahavi'nin tahriç incelemesi" },
     { baslik: "Dört Unsur, Dört Hılt", metin: "İnsan vücudu dört unsurdan (ateş, hava, su, toprak) ve dört hılttan (dem, balgam, safra, sevda) oluşur — Marifetname özetler.", kaynak: "Marifetname · Hıltlar Teorisi" },
   ],
   edviye: [
     { baslik: "Aç Mikropların Sırrı", metin: "Günde 15g altında lif tüketen birey, bağırsaktaki yararlı bakterileri aç bırakır — mikrobiyom çeşitliliği dramatik azalır.", kaynak: "Mikrobiyota beslenme araştırmaları" },
     { baslik: "Glisemik Yük > İndeks", metin: "Yalnız glisemik indeks değil, miktar (yük) önemlidir. Yüksek GL Tip 2 diyabet ve kalp hastalığı riskini birlikte artırır.", kaynak: "Beslenme bilimi standartları" },
     { baslik: "SCFA Mucizesi", metin: "Bağırsak mikropları lifi metabolize edince Kısa Zincirli Yağ Asitleri (SCFA) oluşur — bağışıklık, metabolizma ve beyin için kritik.", kaynak: "Gut microbiome literature" },
     { baslik: "Gut-Brain Hattı", metin: "Kronik stres kortizolü yükseltir, bağırsak geçirgenliğini artırır, mikrobiyomu bozar. Beyin ile bağırsak çift yönlü konuşur.", kaynak: "Gut-Brain Axis araştırmaları" },
   ],
   mizan: [
     { baslik: "Hıltlar Teorisi'nin Aslı", metin: "Hipokrat ve Galen: dem (kan), balgam, safra, sevda — dört hılt. Dengesizlik hastalık, denge sağlık.", kaynak: "Hippokrates · Galen, De Temperamentis" },
     { baslik: "İbn-i Sînâ'nın Genişletmesi", metin: "Mizaç sadece fizyolojik değil, psikolojik bir denge sistemidir. (Sosyal Araştırmalar Dergisi tahlili)", kaynak: "Sosyal Araştırmalar Dergisi makalesi" },
     { baslik: "Zıtla Dengeleme", metin: "Hıltın özelliğine zıt gıda ile denge: dem (sıcak-nemli) için ekşi/soğuk; sevda (kuru-soğuk) için tatlı/sıcak.", kaynak: "Hıltlar Teorisi · İbn-i Sînâ" },
     { baslik: "Dört Element, Dört Mizaç", metin: "Demevi (Hava), Balgami (Su), Safravi (Ateş), Sevdavi (Toprak) — dört element, dört mizaç. Galen sistematize etti.", kaynak: "Galen, De Temperamentis" },
   ],
 };
 const ERBAIN_GOREVLERI = [
   "İlk taramanı yap",
   "Bir gıda ürünü tara",
   "Bir kozmetik tara",
   "Bir temizlik ürünü tara",
   "İki ürün tara",
   "Bir ürünün etiketini detaylı incele",
   "Bir bebek/çocuk ürünü tara",
   "Kritik bulgu içeren bir ürün tara",
   "Bir aktar/şifa ürünü tara",
   "Bugün üç tarama yap",
   "Pîrin son sırrını oku",
   "Bir sırlı suâl çözmeyi dene",
   "Sağlık durumunu kontrol et",
   "Burç-mizaç bilgini gözden geçir",
   "Bir şifa ayetini oku",
   "Eşref saatini kontrol et",
   "Makamlar arşivine bak",
   "Bir madde detayını aç ve oku",
   "Bir manifesto cümlesini hatırla",
   "Pîr'in defterini gözden geçir",
   "Bir tarama sonucunu paylaş",
   "Bir yakınına ürün önerisi yap",
   "İkinci paylaşımını yap",
   "Sofrandakine bir uyarı söyle",
   "Bir markete benzer alternatif öner",
   "Üçüncü paylaşımını yap",
   "Bir aile büyüğüne danış",
   "Bir genç tanıdığına anlat",
   "Sosyal medyada paylaş",
   "Yedi cana ulaşmayı hedefle",
   "Ahdini gözden geçir",
   "Bir gün şekersiz geçir",
   "Bir gün tek malzemeli ürün al",
   "Hatıra defterini oku",
   "Pîr'in selâmını sessizce dinle",
   "Bir mevsim gıdası ye",
   "Bir gün ekran kullanımını azalt",
   "Sofranı duâ ile başlat",
   "Hatm-i nöbetini sürdür",
   "Erbâin tamam — şükret",
 ];
 const GUNCEL_KALIPLARI = [
   (pir, hit, d) => `${hit}, dün ${d.taramaSayisi} ürün taradın — ${d.kritik} tanesinde kritik bulgu vardı. Bugün de uyanık ol.`,
   (pir, hit, d) => `${pir.ad}'in sözü: "Yola gireli ${d.muridYasi} gün oldu. Sebatın güzel, ${hit}."`,
   (pir, hit, d) => `${hit}, sofra nöbetin ${d.hatm} gündür. ${d.hatm < 7 ? "Yedi günü gör, bir kandil yansın" : "Mührün canlı"}.`,
   (pir, hit, d) => d.niyet ? `${pir.ad} hatırlatır: "${d.niyet} — bunun için buradasın. Dün ${d.taramaSayisi} ürüne göz attın, bu sebattır."` : `${pir.ad}'in günü: "Bugün niyetini sade tut, ${hit}."`,
   (pir, hit, d) => `Bugün ${d.hicriAy} ayındayız. ${hit}, mevsim gıdası fıtrat gıdasıdır.`,
   (pir, hit, d) => d.sefaat > 0 ? `${hit}, ${d.sefaat} canı uyarmışsın. Şifa zinciri sende büyür.` : `${hit}, henüz kimseyi uyarmadın. Yedi cana ulaşmak şefaattir.`,
   (pir, hit, d) => `${pir.ad}: "Dünün geçti, bugünün yeni bir mühürdür. Bugünkü ilk lokmana dikkat et, ${hit}."`,
   (pir, hit, d) => `${hit}, mertebene ${d.kalan > 0 ? `${d.kalan} adım kaldı` : "yetiştin — sebat hil'attir"}.`,
   (pir, hit, d) => `${pir.ad}'in hikmeti: "Az yiyen az hastalanır. Bugünkü sofranı yarıya indirmeye çalış, ${hit}."`,
   (pir, hit, d) => `${hit}, dün ${d.kritik > 0 ? `${d.kritik} kritik tespit ettin — bu farkındalık` : "kritik tespit yoktu — temiz bir gündü"}. Bugün de gözün açık olsun.`,
   (pir, hit, d) => `${pir.ad}: "Etiketi okumayan, kendi bedenini okumayandır. ${hit}, gözlerin uyanık."`,
   (pir, hit, d) => `${hit}, ${d.muridYasi} gündür müridimsin. Bir sözünü vereceksen, sofrana ver.`,
   (pir, hit, d) => `${pir.ad}'in selâmı: "${d.hatm > 14 ? "Sebat-ı kerim sahibisin" : "Sebat, mührün gücüdür"}, ${hit}."`,
 ];
 const mertebeBul = (puan) => {
   let son = MERTEBELER[0];
   for (const m of MERTEBELER) if (puan >= m.esik) son = m;
   return son;
 };
 const sonrakiMertebe = (puan) => {
   for (const m of MERTEBELER) if (puan < m.esik) return m;
   return null;
 };
 const puanEkle = (miktar, sebep) => {
   setLiyakat(onceki => {
     const yeniPuan = (onceki.puan || 0) + miktar;
     const yeni = { ...onceki, puan: yeniPuan };
     try { localStorage.setItem("bd_liyakat", JSON.stringify(yeni)); } catch {}
     return yeni;
   });
 };
 const liyakatRozetVer = (rozet, puan) => {
   if ((liyakat.kazanilanRozetler || []).includes(rozet)) return;
   setLiyakat(o => { const yeni = { ...o, kazanilanRozetler: [...(o.kazanilanRozetler || []), rozet] }; try { localStorage.setItem("bd_liyakat", JSON.stringify(yeni)); } catch {}; return yeni; });
   puanEkle(puan, rozet);
 };
 const CountUp = ({ value, duration = 700 }) => {
   const [v, setV] = useState(0);
   useEffect(() => {
     if (typeof value !== "number") { setV(0); return; }
     const start = Date.now();
     let raf;
     const tick = () => {
       const e = Date.now() - start;
       const p = Math.min(e / duration, 1);
       const eased = 1 - Math.pow(1 - p, 3);
       setV(Math.floor(value * eased));
       if (p < 1) raf = requestAnimationFrame(tick);
       else setV(value);
     };
     raf = requestAnimationFrame(tick);
     return () => cancelAnimationFrame(raf);
   }, [value]);
   return v.toLocaleString("tr-TR");
 };
 const Muhur = ({ k, boyut = 28 }) => {
   const m = MERTEBELER.find(x => x.k === k) || MERTEBELER[0];
   const r = m.renk;
   if (k === "sagirt") return (<svg width={boyut} height={boyut} viewBox="0 0 40 40"><circle cx="20" cy="20" r="17" fill="none" stroke={r} strokeWidth="2"/><circle cx="20" cy="20" r="2" fill={r}/></svg>);
   if (k === "kalfa") return (<svg width={boyut} height={boyut} viewBox="0 0 40 40"><circle cx="20" cy="20" r="17" fill="none" stroke={r} strokeWidth="2"/><circle cx="20" cy="20" r="11" fill="none" stroke={r} strokeWidth="1.5"/><circle cx="20" cy="20" r="3" fill={r}/></svg>);
   if (k === "kethuda") return (<svg width={boyut} height={boyut} viewBox="0 0 40 40"><polygon points="20,4 35,12 35,28 20,36 5,28 5,12" fill="none" stroke={r} strokeWidth="2"/><polygon points="20,10 30,15 30,25 20,30 10,25 10,15" fill="none" stroke={r} strokeWidth="1.5"/><circle cx="20" cy="20" r="3" fill={r}/></svg>);
   return (<svg width={boyut} height={boyut} viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill={r + "15"} stroke={r} strokeWidth="2"/><path d="M20 6 L23 14 L31 14 L25 19 L28 27 L20 22 L12 27 L15 19 L9 14 L17 14 Z" fill={r}/></svg>);
 };
 const [pir, setPir] = useState(() => pirAta("", ""));
 useEffect(() => { setPir(pirAta(liyakat.lakap || "", profil?.dogum || "")); }, [liyakat.lakap, profil?.dogum]);
 const [yoklukModal, setYoklukModal] = useState(null);
 const [niyetModal, setNiyetModal] = useState(false);
 const [niyetUyari, setNiyetUyari] = useState(false);
 const [niyetTaslak, setNiyetTaslak] = useState("");
 const [tekKelime, setTekKelime] = useState(null);
 const [sirModal, setSirModal] = useState(null);
 const [guncelModal, setGuncelModal] = useState(null);
 const [erbainTamamlandiModal, setErbainTamamlandiModal] = useState(false);
 const erbainGunNo = () => {
   if (!liyakat.erbain || !liyakat.erbain.baslangic) return 0;
   return Math.floor((Date.now() - liyakat.erbain.baslangic) / 86400000) + 1;
 };
 const erbainAktif = () => liyakat.erbain && liyakat.erbain.baslangic && erbainGunNo() <= 40 && !liyakat.erbain.tamamlandi;
 const erbainBaslat = () => {
   setLiyakat(o => {
     const yeni = { ...o, erbain: { baslangic: Date.now(), tamamGunler: [], tamamlandi: false } };
     yeni.hatiralar = [...(o.hatiralar || []), { t: Date.now(), tip: "erbain", metin: "Erbâin (40 günlük çile) başladı.", pir: pir.k }].slice(-100);
     try { localStorage.setItem("bd_liyakat", JSON.stringify(yeni)); } catch {}
     return yeni;
   });
 };
 const erbainGorevTamamla = (gun) => {
   setLiyakat(o => {
     if (!o.erbain) return o;
     const tamamGunler = [...new Set([...(o.erbain.tamamGunler || []), gun])];
     const yeni = { ...o, erbain: { ...o.erbain, tamamGunler } };
     if (tamamGunler.length === 40) {
       yeni.erbain.tamamlandi = true;
       yeni.kazanilanRozetler = [...new Set([...(o.kazanilanRozetler || []), "erbain_hilatı"])];
       yeni.hatiralar = [...(o.hatiralar || []), { t: Date.now(), tip: "erbain", metin: "Erbâin tamam — Hil'at giyildi.", pir: pir.k }].slice(-100);
       setTimeout(() => setErbainTamamlandiModal(true), 400);
     }
     try { localStorage.setItem("bd_liyakat", JSON.stringify(yeni)); } catch {}
     return yeni;
   });
 };
 const [longPressOgut, setLongPressOgut] = useState(null);
 const [bedenKonusuyor, setBedenKonusuyor] = useState(null);
 const [virdAcik, setVirdAcik] = useState(false);
 const [virdSaniye, setVirdSaniye] = useState(0);
 const yildizEkle = (tip, etiket) => {
   const x = Math.floor(Math.random() * 90) + 5;
   const y = Math.floor(Math.random() * 75) + 5;
   const parlaklik = 0.5 + Math.random() * 0.5;
   const renk = { ahd: "#C9A84C", terfi: "#FFD700", sual: "#7FB069", sefaat: "#EC4899", hediye: "#A586C2", erbain: "#FFA500" }[tip] || "#C9A84C";
   setLiyakat(o => {
     const yildizlar = [...(o.yildizlar || []), { tip, etiket, x, y, parlaklik, renk, t: Date.now() }].slice(-100);
     const yeni = { ...o, yildizlar };
     try { localStorage.setItem("bd_liyakat", JSON.stringify(yeni)); } catch {}
     return yeni;
   });
 };
 useEffect(() => {
   if (!virdAcik) { setVirdSaniye(0); return; }
   const it = setInterval(() => setVirdSaniye(s => s + 1), 1000);
   return () => clearInterval(it);
 }, [virdAcik]);
 useEffect(() => {
   if (virdAcik && virdSaniye >= 33) {
     setTimeout(() => setVirdAcik(false), 500);
     if (navigator.vibrate) navigator.vibrate([40, 20, 80]);
   }
 }, [virdSaniye, virdAcik]);
 const [paritiAcik, setParitiAcik] = useState(false);
 const [serefKart, setSerefKart] = useState(null);
 const serefKartRef = useRef(null);
 const skorKartRef = useRef(null);
 const [parallaxEgim, setParallaxEgim] = useState({ x: 0, y: 0 });
 const [parallaxAktif, setParallaxAktif] = useState(false);
 const parallaxAc = async () => {
   try {
     if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
       const izin = await DeviceOrientationEvent.requestPermission();
       if (izin !== "granted") return;
     }
     setParallaxAktif(true);
   } catch {}
 };
 useEffect(() => {
   if (!parallaxAktif) return;
   const h = (e) => {
     const x = Math.max(-15, Math.min(15, (e.gamma || 0))) / 15;
     const y = Math.max(-15, Math.min(15, (e.beta || 0) - 30)) / 15;
     setParallaxEgim({ x, y });
   };
   window.addEventListener("deviceorientation", h);
   return () => window.removeEventListener("deviceorientation", h);
 }, [parallaxAktif]);
 const serefKartIndir = async () => {
   if (!serefKartRef.current) return;
   try {
     const canvas = await html2canvas(serefKartRef.current, { backgroundColor: null, scale: 2 });
     canvas.toBlob(blob => {
       if (!blob) return;
       const url = URL.createObjectURL(blob);
       const a = document.createElement("a");
       a.href = url;
       a.download = `seref-defteri-${(liyakat.lakap || "talib").replace(/\s/g, "-").toLowerCase()}.png`;
       a.click();
       setTimeout(() => URL.revokeObjectURL(url), 5000);
       if (navigator.share) {
         canvas.toBlob(async b2 => {
           try { const file = new File([b2], "seref-defteri.png", { type: "image/png" }); await navigator.share({ files: [file], title: "Şeref Defteri" }); } catch {}
         });
       }
     });
   } catch {}
 };
 const skorKartPaylas = async () => {
   if (!skorKartRef.current) return;
   try {
     const canvas = await html2canvas(skorKartRef.current, { backgroundColor: null, scale: 2, useCORS: true });
     const blob = await new Promise(res => canvas.toBlob(b => res(b), "image/png", 1));
     if (!blob) return;
     const dosya = new File([blob], "besin-dedektifi-sonuc.png", { type: "image/png" });
     if (navigator.canShare && navigator.canShare({ files: [dosya] })) {
       try { await navigator.share({ files: [dosya], text: "Besin Dedektifi ile taradım · https://besin-d.vercel.app" }); return; } catch {}
     }
     const url = URL.createObjectURL(blob);
     const a = document.createElement("a");
     a.href = url; a.download = "besin-dedektifi-sonuc.png"; a.click();
     setTimeout(() => URL.revokeObjectURL(url), 5000);
     bdToast("Kart indirildi.");
   } catch { bdToast("Kart oluşturulamadı."); }
 };
 const damgaSesi = () => {
   if (!seslerAcik) return;
   try {
     const ac = new (window.AudioContext || window.webkitAudioContext)();
     if (ac.state === "suspended") ac.resume().catch(()=>{});
     const t0 = ac.currentTime;
     const o = ac.createOscillator(); const g = ac.createGain();
     o.type = "sine"; o.frequency.setValueAtTime(160, t0); o.frequency.exponentialRampToValueAtTime(55, t0 + 0.18);
     g.gain.setValueAtTime(0.5, t0); g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.2);
     o.connect(g).connect(ac.destination); o.start(t0); o.stop(t0 + 0.22);
     const buf = ac.createBuffer(1, 4410, 44100);
     const data = buf.getChannelData(0);
     for (let i = 0; i < 4410; i++) data[i] = (Math.random() - 0.5) * (1 - i / 4410) * 0.4;
     const src = ac.createBufferSource(); const ng = ac.createGain();
     src.buffer = buf; ng.gain.value = 0.3; src.connect(ng).connect(ac.destination); src.start(t0);
   } catch {}
 };
 const triggerTerfi = () => {
   if (navigator.vibrate) navigator.vibrate([80, 40, 120, 60, 200]);
   damgaSesi();
   setParitiAcik(true);
   setTimeout(() => setParitiAcik(false), 1700);
 };
 const longPressTimerRef = useRef(null);
 const longPressStartRef = useRef(null);
 const longPressBaslat = (e) => {
   if (longPressTimerRef.current) { clearTimeout(longPressTimerRef.current); longPressTimerRef.current = null; }
   longPressStartRef.current = { x: e.clientX || (e.touches && e.touches[0]?.clientX) || 0, y: e.clientY || (e.touches && e.touches[0]?.clientY) || 0 };
   longPressTimerRef.current = setTimeout(() => {
     longPressTimerRef.current = null;
     if (navigator.vibrate) navigator.vibrate(30);
     const metin = zamanOgutSec(pir, liyakat.lakap || pir.hitap);
     setLongPressOgut({ metin });
     hatiraEkle("ogut", `Pîr'in long-press öğüdü: "${metin}"`);
     damgaSesi();
   }, 2000);
 };
 const longPressBitir = () => {
   if (longPressTimerRef.current) { clearTimeout(longPressTimerRef.current); longPressTimerRef.current = null; }
 };
 const longPressHareket = (e) => {
   if (!longPressTimerRef.current || !longPressStartRef.current) return;
   const x = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
   const y = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;
   const dx = x - longPressStartRef.current.x;
   const dy = y - longPressStartRef.current.y;
   if (dx * dx + dy * dy > 100) longPressBitir();
 };
 const acilanSirIndex = () => {
   const m = liyakat.mertebe || "sagirt";
   const cozulenSayisi = ((liyakat.cozulenSualler || {})[m] || []).length;
   if (m === "kalfa") return 1;
   if (m === "kethuda") return 2;
   if (m === "hekimbasi") return cozulenSayisi >= 3 ? 4 : 3;
   return 0;
 };
 const sirAc = () => {
   const hedef = acilanSirIndex();
   const mevcut = (liyakat.acilanSirlar || {})[pir.k] || [];
   if (mevcut.length >= hedef) return;
   const yeniIdx = mevcut.length;
   const sir = (PIR_SIRLARI[pir.k] || [])[yeniIdx];
   if (!sir) return;
   setLiyakat(o => {
     const acilanSirlar = { ...(o.acilanSirlar || {}) };
     acilanSirlar[pir.k] = [...mevcut, yeniIdx];
     const yeni = { ...o, acilanSirlar };
     yeni.hatiralar = [...(o.hatiralar || []), { t: Date.now(), tip: "sir", metin: `${pir.ad} bir sır açtı: "${sir.baslik}"`, pir: pir.k }].slice(-100);
     try { localStorage.setItem("bd_liyakat", JSON.stringify(yeni)); } catch {}
     return yeni;
   });
   setTimeout(() => setSirModal({ sir, sayi: yeniIdx + 1 }), 600);
 };
 useEffect(() => { sirAc(); }, [liyakat.mertebe, ((liyakat.cozulenSualler || {}).hekimbasi || []).length]);
 useEffect(() => {
   const bugun = new Date().toDateString();
   if (liyakat.sonGuncel === bugun) return;
   if (!liyakat.lakap) return;
   const dunKayit = (gecmis || []).filter(g => g.zaman && (Date.now() - g.zaman) < 86400000 * 2 && (Date.now() - g.zaman) > 0);
   const sonraki = sonrakiMertebe ? sonrakiMertebe(liyakat.puan) : null;
   const veri = {
     taramaSayisi: dunKayit.length,
     kritik: dunKayit.reduce((a, g) => a + (g.kritik || 0), 0),
     muridYasi: muridYasi(),
     hatm: liyakat.gunlukSeri || 0,
     niyet: liyakat.niyet || null,
     hicriAy: hicriCevir(new Date()).ay,
     sefaat: (liyakat.sefaatler || []).length,
     kalan: sonraki ? Math.max(0, sonraki.esik - liyakat.puan) : 0,
   };
   const sablon = GUNCEL_KALIPLARI[Math.floor(Math.random() * GUNCEL_KALIPLARI.length)];
   const metin = sablon(pir, liyakat.lakap, veri);
   const t = setTimeout(() => {
     setGuncelModal({ metin });
     setLiyakat(o => { const yeni = { ...o, sonGuncel: bugun, hatiralar: [...(o.hatiralar || []), { t: Date.now(), tip: "guncel", metin: `Pîr'in günceli: "${metin}"`, pir: pir.k }].slice(-100) }; try { localStorage.setItem("bd_liyakat", JSON.stringify(yeni)); } catch {}; return yeni; });
   }, 3500);
   return () => clearTimeout(t);
 }, [liyakat.lakap]);
 const [manifestoIdx, setManifestoIdx] = useState(() => Math.floor(Math.random() * MANIFESTOLAR.length));
 useEffect(() => {
   const it = setInterval(() => setManifestoIdx(i => (i + 1) % MANIFESTOLAR.length), 35000);
   return () => clearInterval(it);
 }, []);
 const hatiraEkle = (tip, metin) => {
   setLiyakat(o => {
     const yeni = { ...o, hatiralar: [...(o.hatiralar || []), { t: Date.now(), tip, metin, pir: pir.k }].slice(-100) };
     try { localStorage.setItem("bd_liyakat", JSON.stringify(yeni)); } catch {}
     return yeni;
   });
 };
 const yoklukGunHesapla = () => {
   if (!liyakat.sonGiris) return 0;
   const son = new Date(liyakat.sonGiris).getTime();
   return Math.floor((Date.now() - son) / 86400000);
 };
 const muridYasi = () => Math.max(1, Math.floor((Date.now() - (liyakat.baslangic || Date.now())) / 86400000));
 const pirMuridSayisi = (pirK) => {
   const toplam = siraNoHesapla(Date.now());
   return Math.max(50, Math.floor(toplam / PIRLER.length));
 };
 const pirIcindeSiraNo = () => {
   const benim = siraNoHesapla(liyakat.baslangic || Date.now());
   return Math.max(1, Math.floor(benim / PIRLER.length));
 };
 useEffect(() => {
   const gunDiff = yoklukGunHesapla();
   const sonGosterilen = liyakat.yoklukSonGosterilen || 0;
   if (gunDiff < 3) return;
   if (sonGosterilen >= gunDiff) return;
   let esik = 3;
   if (gunDiff >= 30) esik = 30;
   else if (gunDiff >= 14) esik = 14;
   else if (gunDiff >= 7) esik = 7;
   const fn = YOKLUK_METINLERI[esik];
   if (!fn) return;
   const hit = liyakat.lakap || pir.hitap;
   const metin = fn(pir, hit, gunDiff);
   setTimeout(() => setYoklukModal({ metin, gun: gunDiff, esik }), 1500);
   setLiyakat(o => { const yeni = { ...o, yoklukSonGosterilen: gunDiff }; try { localStorage.setItem("bd_liyakat", JSON.stringify(yeni)); } catch {}; return yeni; });
 }, []);
 useEffect(() => {
   if (sekme !== "mertebe") return;
   if (liyakat.niyet) return;
   if (!liyakat.lakap) return;
   const t = setTimeout(() => setNiyetModal(true), 800);
   return () => clearTimeout(t);
 }, [sekme, liyakat.niyet, liyakat.lakap]);
 useEffect(() => {
   const bugun = new Date().toDateString();
   if (liyakat.sonTekKelime === bugun) return;
   const t = setTimeout(() => {
     const k = TEK_KELIMELER[Math.floor(Math.random() * TEK_KELIMELER.length)];
     setTekKelime(k);
     setLiyakat(o => { const yeni = { ...o, sonTekKelime: bugun }; try { localStorage.setItem("bd_liyakat", JSON.stringify(yeni)); } catch {}; return yeni; });
     setTimeout(() => setTekKelime(null), 2200);
   }, 90000 + Math.random() * 600000);
   return () => clearTimeout(t);
 }, []);
 const [selamModal, setSelamModal] = useState(null);
 const [ahdModal, setAhdModal] = useState(null);
 const [sualModal, setSualModal] = useState(null);
 const [hediyeModal, setHediyeModal] = useState(null);
 const [mahcubiyetModal, setMahcubiyetModal] = useState(null);
 const [terfiKontrolAcik, setTerfiKontrolAcik] = useState(false);
 useEffect(() => {
   const son = sessionStorage.getItem("bd_selam_gosterildi");
   if (son) return;
   setTimeout(() => {
     setSelamModal({ metin: selamHazirla(liyakat.lakap, pir), pir });
     sessionStorage.setItem("bd_selam_gosterildi", "1");
   }, 1200);
 }, []);
 useEffect(() => {
   const t = setTimeout(() => {
     const bugun = new Date().toDateString();
     if (liyakat.yadGosterimleri && liyakat.yadGosterimleri[bugun]) return;
     if (Math.random() > 0.35) return;
     const gun = Math.max(1, Math.floor((Date.now() - (liyakat.baslangic || Date.now())) / 86400000));
     const metin = YAD_METINLER[Math.floor(Math.random() * YAD_METINLER.length)](pir, gun);
     setSelamModal(prev => prev || { metin, pir, yad: true });
     setLiyakat(o => { const yeni = { ...o, yadGosterimleri: { ...(o.yadGosterimleri || {}), [bugun]: 1 } }; try { localStorage.setItem("bd_liyakat", JSON.stringify(yeni)); } catch {}; return yeni; });
   }, 25000);
   return () => clearTimeout(t);
 }, []);
 const gercekMertebe = () => {
   const gunSayisi = Math.floor((Date.now() - (liyakat.baslangic || Date.now())) / 86400000);
   const taramaS = (typeof window !== "undefined" ? parseInt(localStorage.getItem("bd_tarama_sayisi") || "0") : 0) || 0;
   const sefaatS = (liyakat.sefaatler || []).length;
   const hatm = liyakat.gunlukSeri || 0;
   let son = MERTEBELER[0];
   for (const m of MERTEBELER) {
     if (m.k === "sagirt") { son = m; continue; }
     const s = m.sart;
     if (liyakat.puan >= m.esik && gunSayisi >= s.gun && taramaS >= s.urun && hatm >= s.hatm && sefaatS >= s.sefaat) son = m;
     else break;
   }
   return son;
 };
 const mevcutMertebe = () => MERTEBELER.find(m => m.k === (liyakat.mertebe || "sagirt")) || MERTEBELER[0];
 const terfiHakki = () => {
   const g = gercekMertebe();
   const m = mevcutMertebe();
   const gIdx = MERTEBELER.findIndex(x => x.k === g.k);
   const mIdx = MERTEBELER.findIndex(x => x.k === m.k);
   return gIdx > mIdx ? MERTEBELER[mIdx + 1] : null;
 };
 const sefaatEkle = (kanal) => {
   setLiyakat(o => {
     const sf = [...(o.sefaatler || []), { t: Date.now(), kanal }];
     const yeni = { ...o, sefaatler: sf };
     try { localStorage.setItem("bd_liyakat", JSON.stringify(yeni)); } catch {}
     return yeni;
   });
   yildizEkle("sefaat", `Bir can kurtardın`);
 };
 const ahdImzala = (mertebeK, metin) => {
   setLiyakat(o => {
     const m = MERTEBELER.find(x => x.k === mertebeK);
     const yeni = { ...o, ahdler: { ...(o.ahdler || {}), [mertebeK]: { metin, tarih: Date.now(), catlak: 0 } }, mertebe: mertebeK, yukseldigiTarihler: { ...(o.yukseldigiTarihler || {}), [mertebeK]: Date.now() } };
     yeni.hatiralar = [...(o.hatiralar || []), { t: Date.now(), tip: "ahd", metin: `${m?.ad || mertebeK} ahdimi mühürledim.`, pir: pir.k }, { t: Date.now() + 1, tip: "terfi", metin: `${m?.ad || mertebeK} mertebesine yükseldim.`, pir: pir.k }].slice(-100);
     try { localStorage.setItem("bd_liyakat", JSON.stringify(yeni)); } catch {}
     return yeni;
   });
   setAhdModal(null);
   setYeniMertebeBildirim(mertebeK);
   triggerTerfi();
   const m = MERTEBELER.find(x => x.k === mertebeK);
   yildizEkle("terfi", `${m?.ad || mertebeK} oldun`);
   yildizEkle("ahd", `${m?.ad || mertebeK} ahdini verdin`);
   setTimeout(() => setSerefKart({ mertebeK }), 3500);
 };
 const sualCozuldu = (mertebeK, sualNo) => {
   setLiyakat(o => {
     const cs = { ...(o.cozulenSualler || {}) };
     cs[mertebeK] = [...new Set([...(cs[mertebeK] || []), sualNo])];
     const sual = (SUALLER[mertebeK] || [])[sualNo];
     const yeni = { ...o, cozulenSualler: cs, puan: (o.puan || 0) + 7 };
     yeni.hatiralar = [...(o.hatiralar || []), { t: Date.now(), tip: "sual", metin: `Pîr'in suâlini çözdüm: "${sual?.s || ""}"`, pir: pir.k }].slice(-100);
     try { localStorage.setItem("bd_liyakat", JSON.stringify(yeni)); } catch {}
     return yeni;
   });
   yildizEkle("sual", "Bir sırlı suâl çözüldü");
 };
 const haftaNo = (ts) => Math.floor((ts || Date.now()) / (7 * 86400000));
 const sualTetikle = () => {
   const buHafta = haftaNo();
   if ((liyakat.sonSualHafta || 0) === buHafta) return;
   if (Math.random() > 0.30) return;
   const mk = (liyakat.mertebe || "sagirt");
   const havuz = SUALLER[mk] || [];
   const cozulen = (liyakat.cozulenSualler || {})[mk] || [];
   const kalan = havuz.map((s, i) => ({ s, i })).filter(x => !cozulen.includes(x.i));
   if (!kalan.length) return;
   const sec = kalan[Math.floor(Math.random() * kalan.length)];
   setSualModal({ mertebeK: mk, no: sec.i, sual: sec.s });
   setLiyakat(o => { const yeni = { ...o, sonSualHafta: buHafta }; try { localStorage.setItem("bd_liyakat", JSON.stringify(yeni)); } catch {}; return yeni; });
 };
 const ahdCatlatKontrol = (sonuc, metinAna) => {
   const ahdler = liyakat.ahdler || {};
   if (!Object.keys(ahdler).length) return;
   const taranan = (metinAna + " " + sonuc.map(r => (r.ad || "") + " " + (r.etki || "")).join(" ")).toLowerCase();
   const yeniAhdler = { ...ahdler };
   let degisti = false;
   for (const [mk, ahd] of Object.entries(ahdler)) {
     const ahdLow = (ahd.metin || "").toLowerCase();
     for (const [k, regex] of Object.entries(AHD_ANAHTARLAR)) {
       if (ahdLow.includes(k.toLowerCase()) && regex.test(taranan)) {
         const sonCatlak = ahd.sonCatlakTarih || 0;
         if (Date.now() - sonCatlak > 6 * 3600000) {
           yeniAhdler[mk] = { ...ahd, catlak: (ahd.catlak || 0) + 1, sonCatlakTarih: Date.now() };
           degisti = true;
           break;
         }
       }
     }
   }
   if (degisti) setLiyakat(o => { const yeni = { ...o, ahdler: yeniAhdler }; try { localStorage.setItem("bd_liyakat", JSON.stringify(yeni)); } catch {}; return yeni; });
 };
 const mertebeDusur = (mevcutK) => {
   const idx = MERTEBELER.findIndex(m => m.k === mevcutK);
   if (idx <= 0) return null;
   const alt = MERTEBELER[idx - 1];
   setLiyakat(o => { const yeni = { ...o, mertebe: alt.k, mahcubiyetHaftalari: [], dustuMertebe: { tarih: Date.now(), eski: mevcutK } }; try { localStorage.setItem("bd_liyakat", JSON.stringify(yeni)); } catch {}; return yeni; });
   return alt;
 };
 const mahcubiyetKontrol = (sonuc) => {
   const mk = liyakat.mertebe || "sagirt";
   if (mk === "sagirt" || mk === "kalfa") return;
   const buHafta = haftaNo();
   const onceki = liyakat.kacinHaftalik || { hafta: 0, sayim: 0 };
   const yeniSayim = onceki.hafta === buHafta ? onceki.sayim + 1 : 1;
   let mahHaftalar = liyakat.mahcubiyetHaftalari || [];
   if (yeniSayim === 10) {
     if (!mahHaftalar.includes(buHafta)) mahHaftalar = [...mahHaftalar, buHafta].slice(-6);
     setMahcubiyetModal({ sayim: yeniSayim, pir, mertebe: mk });
     setTimeout(() => hatiraEkle("mahcubiyet", `Pîr utancından yüzünü çevirdi: bu hafta ${yeniSayim} kez 'kaçın' ürünü taradım.`), 100);
   } else if (yeniSayim === 20) {
     setMahcubiyetModal({ sayim: yeniSayim, pir, mertebe: mk });
     setTimeout(() => hatiraEkle("mahcubiyet", `Pîr utancından yüzünü çevirdi: bu hafta ${yeniSayim} kez 'kaçın' ürünü taradım.`), 100);
   }
   const sonUcHafta = [buHafta, buHafta - 1, buHafta - 2];
   const ucArtArda = sonUcHafta.every(h => mahHaftalar.includes(h));
   const sonBesHafta = [buHafta, buHafta - 1, buHafta - 2, buHafta - 3, buHafta - 4];
   const besArtArda = sonBesHafta.every(h => mahHaftalar.includes(h));
   setLiyakat(o => { const yeni = { ...o, kacinHaftalik: { hafta: buHafta, sayim: yeniSayim }, mahcubiyetHaftalari: mahHaftalar }; try { localStorage.setItem("bd_liyakat", JSON.stringify(yeni)); } catch {}; return yeni; });
   if (besArtArda) {
     const alt = mertebeDusur(mk);
     if (alt) setMahcubiyetModal({ sayim: yeniSayim, pir, mertebe: mk, dustu: alt });
   }
 };
 const hediyeAl = () => {
   const son = liyakat.hediyeler && liyakat.hediyeler.length ? liyakat.hediyeler[liyakat.hediyeler.length - 1].t : 0;
   if (Date.now() - son < 3 * 86400000) return;
   if (Math.random() > 0.2) return;
   const h = HEDIYELER[Math.floor(Math.random() * HEDIYELER.length)];
   const ust = (liyakat.mertebe === "sagirt" || liyakat.mertebe === "kalfa") ? PIRLER[Math.floor(Math.random() * 4)] : null;
   setHediyeModal({ h, gonderen: ust });
   setLiyakat(o => {
     const yeni = { ...o, hediyeler: [...(o.hediyeler || []), { t: Date.now(), k: h.k }] };
     yeni.hatiralar = [...(o.hatiralar || []), { t: Date.now(), tip: "hediye", metin: `Hediye geldi: "${h.m}" — ${h.k}`, pir: pir.k }].slice(-100);
     try { localStorage.setItem("bd_liyakat", JSON.stringify(yeni)); } catch {}; return yeni;
   });
 };
 const [saglikModalAcik, setSaglikModalAcik] = useState(false);
 const [aylikRaporAcik, setAylikRaporAcik] = useState(false);
 const SAGLIK_KOSULLARI = [
   { k: "diyabet", ad: "Diyabet", kw: /\bşeker\b|glikoz|fruktoz|maltodekstrin|sukroz|şurup|sirup|insülin|kan şekeri|glisemik|kan glukoz/i, bilgi: "Gizli şekerler (glikoz şurubu, maltodekstrin, fruktoz, sukroz) kan şekerini hızlı yükseltir; uzun vadede insülin direnci ve Tip 2 diyabet riskini artırır.", kaynak: "WHO 2015 Şeker Kılavuzu · ADA Standards of Care 2024 · The Lancet Diabetes Endocrinol 2014;2(8):634" },
   { k: "gebe", ad: "Gebelik", kw: /gebelik|gebe|fetus|fetüs|hamile|teratojen|doğum|anne karnı|plasenta|laktasyon/i, bilgi: "Aspartam, BHA, yüksek doz kafein ve bazı sentetik renklendiriciler plasentadan geçer; fetus gelişimi ve düşük doğum ağırlığı ile ilişkilendirilmiştir.", kaynak: "EFSA 2013 Aspartam Yeniden Değerlendirme · ACOG Committee Opinion 462 · NIH Pregnancy Nutrition" },
   { k: "hipertansiyon", ad: "Hipertansiyon", kw: /sodyum|MSG|monosodyum|tuz|hipertans|kan basın|tansiyon/i, bilgi: "Aşırı sodyum (>2g/gün) tansiyonu yükseltir, kalp-damar ve böbrek yükünü artırır. İşlenmiş gıdalarda gizli sodyum (E621 MSG, sodyum nitrit) yaygındır.", kaynak: "WHO 2023 Sodium Reduction · TEKHARF · ESC/ESH 2018 Hipertansiyon Kılavuzu" },
   { k: "alerji", ad: "Alerji / Astım", kw: /alerj|ürtiker|astım|anafilaks|histamin|kaşıntı|intoleran|egzama|deri reak|solunum|hassasiy/i, bilgi: "Tartrazin (E102), benzoatlar (E210-219), sülfitler (E220-228) astım atağı, ürtiker ve psödoallerjik reaksiyon tetikleyebilir. Aspirin duyarlısı kişilerde risk daha yüksek.", kaynak: "Southampton McCann 2007 Lancet · FDA Food Allergen Labeling · EAACI 2014 Position Paper" },
   { k: "sigara", ad: "Sigara Kullanıyorum", kw: /kanseroj|BHA|BHT|nitrit|nitrosamin|tütün|akciğer|solunum|oksidan|IARC Grup [12]/i, bilgi: "Sodyum nitrit (E250) + tütün dumanı nitrozaminleri sinerjik şekilde artırır. BHA/BHT oksidatif stres yükünü çoğaltır. Sigara içen bireylerde kanserojen yükü daha hızlı birikir.", kaynak: "IARC Vol 114 (2018) İşlenmiş Et · WHO Tobacco-Diet Synergy · NCI Smokers' Diet" },
   { k: "cocuk", ad: "Çocuk / Bebek için", kw: /çocuk|bebek|hiperaktif|ADHD|gelişim|nörotoks|öğrenme|davranış|dikkat|Southampton/i, bilgi: "Sentetik renklendiriciler (E102, E110, E122, E124, E129) ve benzoat çocuklarda hiperaktivite + dikkat dağınıklığını artırır. AB tüm bu E-kodlu ürünlere zorunlu uyarı etiketi koyar.", kaynak: "McCann 2007 Lancet 370(9598):1560 · AB Reg 1333/2008 Ek V · CSPI 2016 Food Dyes Report" },
 ];
 const saglikUyarilari = (madde) => {
   if (!saglikDurumu.length) return [];
   const metin = `${madde.ad || ""} ${madde.etki || ""} ${madde.kat || ""}`;
   const yuksekRisk = madde.risk === "kritik" || madde.risk === "yuksek";
   return SAGLIK_KOSULLARI.filter(k => {
     if (!saglikDurumu.includes(k.k)) return false;
     if (k.kw.test(metin)) return true;
     // Sigara + Çocuk: yüksek/kritik risk maddeleri her zaman ekstra riskli
     if ((k.k === "sigara" || k.k === "cocuk") && yuksekRisk) return true;
     return false;
   });
 };
 const saglikToggle = (k) => {
   const yeni = saglikDurumu.includes(k) ? saglikDurumu.filter(x => x !== k) : [...saglikDurumu, k];
   setSaglikDurumu(yeni);
   try { localStorage.setItem("bd_saglik", JSON.stringify(yeni)); } catch {}
   if (yeni.length > 0) liyakatRozetVer("saglik_doldu", 20);
 };
 const [paylasMaddesi, setPaylasMaddesi] = useState(null);
 const geriYap = () => {
   if (virdAcik) { setVirdAcik(false); return true; }
   if (bedenKonusuyor) { setBedenKonusuyor(null); return true; }
   if (serefKart) { setSerefKart(null); return true; }
   if (longPressOgut) { setLongPressOgut(null); return true; }
   if (erbainTamamlandiModal) { setErbainTamamlandiModal(false); return true; }
   if (sirModal) { setSirModal(null); return true; }
   if (guncelModal) { setGuncelModal(null); return true; }
   if (yoklukModal) { setYoklukModal(null); return true; }
   if (niyetUyari) { setNiyetUyari(false); return true; }
   if (niyetModal) { setNiyetModal(false); return true; }
   if (selamModal) { setSelamModal(null); return true; }
   if (ahdModal) { setAhdModal(null); return true; }
   if (sualModal) { setSualModal(null); return true; }
   if (hediyeModal) { setHediyeModal(null); return true; }
   if (mahcubiyetModal) { setMahcubiyetModal(null); return true; }
   if (yeniMertebeBildirim) { setYeniMertebeBildirim(null); return true; }
   if (paylasMaddesi) { setPaylasMaddesi(null); return true; }
   if (saglikModalAcik) { setSaglikModalAcik(false); return true; }
   if (aylikRaporAcik) { setAylikRaporAcik(false); return true; }
   if (modal) { setModal(null); return true; }
   if (tarifModal) { setTarifModal(null); return true; }
   if (marketAcik) { setMarketAcik(false); return true; }
   if (ekran === "sonuc" || ekran === "profil_kur" || ekran === "gecmis") { setEkran("ana"); return true; }
   const altSayfalar = ["rabita","esref","burclar","toprak","bahce","uyku","koku","rota","asude","tohum","yildiz","market","uzman","sesrengi","hrv","nefes","nabiz","ses","zihin","emf","dopamin","biyofoton","goz"];
   if (altSayfalar.includes(sekme)) { setSekme("hizmetler"); return true; }
   return false;
 };
 const geriGerekli = !!(virdAcik || bedenKonusuyor || serefKart || longPressOgut || erbainTamamlandiModal || sirModal || guncelModal || yoklukModal || niyetUyari || niyetModal || selamModal || ahdModal || sualModal || hediyeModal || mahcubiyetModal || yeniMertebeBildirim || paylasMaddesi || saglikModalAcik || aylikRaporAcik || modal || tarifModal || marketAcik || ekran === "sonuc" || ekran === "profil_kur" || ekran === "gecmis" || ["rabita","esref","burclar","toprak","bahce","uyku","koku","rota","asude","tohum","yildiz","market","uzman","sesrengi","hrv","nefes","nabiz","ses","zihin","emf","dopamin","biyofoton","goz"].includes(sekme));
 useEffect(() => {
   let sx = null, sy = null, st = 0;
   const onStart = (e) => {
     const t = e.touches[0];
     if (t.clientX > 50) { sx = null; return; }
     sx = t.clientX; sy = t.clientY; st = Date.now();
   };
   const onEnd = (e) => {
     if (sx === null) return;
     const t = e.changedTouches[0];
     const dx = t.clientX - sx;
     const dy = Math.abs(t.clientY - sy);
     const dt = Date.now() - st;
     sx = null;
     if (dx < 60 || dy > 80 || dt > 1000) return;
     geriYap();
   };
   document.addEventListener("touchstart", onStart, { passive: true });
   document.addEventListener("touchend", onEnd, { passive: true });
   return () => {
     document.removeEventListener("touchstart", onStart);
     document.removeEventListener("touchend", onEnd);
   };
 }, [sekme, ekran, modal, paylasMaddesi, saglikModalAcik, aylikRaporAcik, yeniMertebeBildirim, tarifModal, marketAcik]);
 const aylikIstatistik = () => {
   const simdi = new Date();
   const ayBas = new Date(simdi.getFullYear(), simdi.getMonth(), 1).getTime();
   const buAy = (gecmis || []).filter(g => g.zaman && g.zaman >= ayBas);
   const toplam = buAy.length;
   const kritikSayi = buAy.reduce((a, g) => a + (g.kritik || 0), 0);
   const organSayim = {};
   buAy.forEach(g => (g.organlar || []).forEach(o => { organSayim[o] = (organSayim[o] || 0) + 1; }));
   const enOrgan = Object.entries(organSayim).sort((a, b) => b[1] - a[1])[0];
   const katSayim = {};
   buAy.forEach(g => { if (g.kategori) katSayim[g.kategori] = (katSayim[g.kategori] || 0) + 1; });
   const enKat = Object.entries(katSayim).sort((a, b) => b[1] - a[1])[0];
   return { toplam, kritikSayi, enOrgan, enKat, ay: simdi.toLocaleDateString("tr-TR", { month: "long", year: "numeric" }) };
 };
 const [esrefData, setEsrefData] = useState(null);
 const [esrefHata, setEsrefHata] = useState("");
 const [ayetData, setAyetData] = useState({});
 const [ayetYukleniyor, setAyetYukleniyor] = useState("");
 const [acikAyet, setAcikAyet] = useState(null);
 const hizmetlerScrollRef = useRef(0);
 useEffect(() => {
   if (sekme === "hizmetler" && hizmetlerScrollRef.current > 0) {
     requestAnimationFrame(() => window.scrollTo(0, hizmetlerScrollRef.current));
   } else if (sekme !== "hizmetler") {
     // hizmetler dışına çıkarken mevcut scroll'u kaydet (hizmet kartı tıklaması da burayı tetikler önce)
   }
 }, [sekme]);
 const ayetToggle = (ref) => {
   if (acikAyet === ref) { setAcikAyet(null); return; }
   setAcikAyet(ref);
   ayetGetir(ref);
   puanEkle(2, "ayet_dinle");
 };

 /* ── ŞADIRVÂN-I ŞİFA ÇALAR (Web Audio: Osmanlı Çeşmesi + makam karar perdesi) ── */
 const [asudeOynar, setAsudeOynar] = useState(false);
 const [asudeMakam, setAsudeMakam] = useState(null);
 const [asudeSure, setAsudeSure] = useState(180);
 const [asudeKalan, setAsudeKalan] = useState(0);
 const [asudeNefes, setAsudeNefes] = useState(5);
 const [asudeHakkinda, setAsudeHakkinda] = useState(false);
 const [asudeArsiv, setAsudeArsiv] = useState(false);
 const suAudioRef = useRef(null);
 const neyAudioRef = useRef(null);
 const asudeTimerRef = useRef(null);

 const asudeDurdur = () => {
   if (asudeTimerRef.current) { clearInterval(asudeTimerRef.current); asudeTimerRef.current = null; }
   [suAudioRef, neyAudioRef].forEach(r => { const a = r.current; if (a) { try { a.pause(); a.currentTime = 0; } catch {} } });
   setAsudeOynar(false);
   setAsudeKalan(0);
 };

 const asudeBaslat = (makamAdi) => {
   asudeDurdur();
   const makam = makamAdi || asudeMakam || (profil && MAKAMLAR[profil.makam] ? profil.makam : "Rast");
   setAsudeMakam(makam);

   // Özgün işitsel deneyim: ney + su sesi kayıtları public/ses/ klasörüne eklenince
   // otomatik çalar. Dosyalar henüz yoksa modül sessiz çalışır; yalnız görsel
   // (su akışı, dalga, fıskiye) deneyimi oynar. Ses bağlama: bkz. SES_KILAVUZU.
   if (seslerAcik) {
     const base = import.meta.env.BASE_URL || "/";
     try {
       if (!suAudioRef.current) { suAudioRef.current = new Audio(base + "ses/su.mp3"); suAudioRef.current.loop = true; suAudioRef.current.volume = 0.75; }
       if (!neyAudioRef.current) { neyAudioRef.current = new Audio(base + "ses/ney.mp3"); neyAudioRef.current.loop = true; neyAudioRef.current.volume = 0.6; }
       suAudioRef.current.currentTime = 0; neyAudioRef.current.currentTime = 0;
       suAudioRef.current.play().catch(() => {});
       neyAudioRef.current.play().catch(() => {});
     } catch {}
   }

   setAsudeOynar(true);
   setAsudeKalan(asudeSure);
   setAsudeNefes(5);
   const bitis = Date.now() + asudeSure * 1000;
   asudeTimerRef.current = setInterval(() => {
     const kalan = Math.max(0, Math.round((bitis - Date.now()) / 1000));
     setAsudeKalan(kalan);
     const gecen = asudeSure - kalan;
     setAsudeNefes(gecen > asudeSure * 0.66 ? 9 : gecen > asudeSure * 0.33 ? 7 : 5);
     if (kalan <= 0) asudeDurdur();
   }, 1000);
 };

 useEffect(() => { if (sekme !== "asude" && asudeOynar) asudeDurdur(); }, [sekme]);
 useEffect(() => () => asudeDurdur(), []);
 const [havaData, setHavaData] = useState(null);
 const [havaHata, setHavaHata] = useState("");
 const [wikiData, setWikiData] = useState(null);
 const [wikiYukleniyor, setWikiYukleniyor] = useState(false);
 useEffect(() => {
   if (!modal?.ad) { setWikiData(null); return; }
   setWikiData(null);
   setWikiYukleniyor(true);
   const baslik = modal.ad.split("(")[0].split(/[·\/]/)[0].trim();
   fetch(`https://tr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(baslik)}`)
     .then(r => r.ok ? r.json() : Promise.reject())
     .then(d => setWikiData({ ozet: d.extract, link: d.content_urls?.desktop?.page, resim: d.thumbnail?.source }))
     .catch(() => setWikiData({ yok: true }))
     .finally(() => setWikiYukleniyor(false));
 }, [modal?.ad]);
 useEffect(() => {
   if (sekme !== "toprak") return;
   if (havaData) return;
   const fetchHava = (lat, lon) => {
     fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,ozone,european_aqi,uv_index&timezone=auto`)
       .then(r => r.json())
       .then(d => setHavaData({ ...d.current, ...d.current_units, lat, lon }))
       .catch(() => setHavaHata("Veri çekilemedi"));
   };
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(
       pos => fetchHava(pos.coords.latitude.toFixed(4), pos.coords.longitude.toFixed(4)),
       () => fetchHava(41.0082, 28.9784),
       { timeout: 5000 }
     );
   } else {
     fetchHava(41.0082, 28.9784);
   }
 }, [sekme, havaData]);
 const ayetGetir = (ref) => {
   if (ayetData[ref]) return;
   setAyetYukleniyor(ref);
   fetch(`https://api.alquran.cloud/v1/ayah/${ref}/editions/quran-uthmani,tr.diyanet,ar.alafasy`)
     .then(r => r.json())
     .then(d => {
       const arap = d.data.find(x => x.edition.identifier === "quran-uthmani");
       const tr = d.data.find(x => x.edition.identifier === "tr.diyanet");
       const audio = d.data.find(x => x.edition.identifier === "ar.alafasy");
       setAyetData(prev => ({ ...prev, [ref]: { arap: arap?.text, tr: tr?.text, audio: audio?.audio, sure: arap?.surah?.englishName, ayetNo: arap?.numberInSurah } }));
     })
     .catch(() => setAyetData(prev => ({ ...prev, [ref]: { hata: "Yüklenemedi" } })))
     .finally(() => setAyetYukleniyor(""));
 };
 const fetchEsrefTimings = (lat, lon) => {
   setEsrefHata("");
   fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=13`)
     .then(r => r.json())
     .then(d => setEsrefData({ ...d.data, lat, lon }))
     .catch(() => setEsrefHata("Veri çekilemedi"));
 };
 const konumIste = () => {
   if (!navigator.geolocation) { fetchEsrefTimings(41.0082, 28.9784); return; }
   setEsrefHata("");
   navigator.geolocation.getCurrentPosition(
     pos => fetchEsrefTimings(pos.coords.latitude.toFixed(4), pos.coords.longitude.toFixed(4)),
     err => {
       if (err.code === 1) {
         setEsrefHata("Konum izni reddedildi. iPhone'da: Ayarlar → Safari → Konum → 'Sor' veya 'İzin Ver' seçin, sonra sayfayı yenileyin. Android Chrome'da: adres çubuğundaki kilit simgesinden konum iznini etkinleştirin.");
       } else if (err.code === 3) {
         setEsrefHata("Konum alımı zaman aşımına uğradı, tekrar deneyin.");
       } else {
         setEsrefHata("Konum alınamadı.");
       }
     },
     { timeout: 10000, enableHighAccuracy: false, maximumAge: 60000 }
   );
 };
 useEffect(() => {
   if (sekme !== "esref") return;
   if (esrefData) return;
   fetchEsrefTimings(41.0082, 28.9784);
 }, [sekme, esrefData]);
 const [mod, setMod] = useState("metin");
 const [taramaSayisi, setTaramaSayisi] = useState(() => { try { return parseInt(localStorage.getItem("bd_tarama_sayisi") || "0") || 0; } catch { return 0; } });
 const [nur, setNur] = useState(() => { try { const n = localStorage.getItem("bd_nur"); return n ? JSON.parse(n) : { damla: 0 }; } catch { return { damla: 0 }; } });

 const es = esrefAktif();

 function yapAnaliz(metinOverride) {
 const metin = (typeof metinOverride === "string" ? metinOverride : txt).trim();
 if (!metin) return;
 const sonuc = analiz(metin, KATEGORILER[kategori].db);
 setSonuclar(sonuc);
 setBelirsizler(belirsizBul(metin));
 setIlkSira(ilkSiraTespit(metin));
 setAcik(new Set());
 { const yeni = taramaSayisi + 1; setTaramaSayisi(yeni); try { localStorage.setItem("bd_tarama_sayisi", String(yeni)); } catch {} }
 {
   const kritikSayi = sonuc.filter(r => r.risk === "kritik" || r.risk === "yuksek").length;
   const organlar = [...new Set(sonuc.flatMap(r => r.organlar || []))];
   const yeniKayit = { tarih: new Date().toLocaleDateString("tr-TR"), zaman: Date.now(), metin: metin.slice(0, 120), kategori, kritik: kritikSayi, sonuc: sonuc.length, organlar };
   const yeniGecmis = [yeniKayit, ...(gecmis || [])].slice(0, 50);
   setGecmis(yeniGecmis);
   try { localStorage.setItem("bd_gecmis", JSON.stringify(yeniGecmis)); } catch {}
   puanEkle(1 + (kritikSayi > 0 ? 3 : 0), "tarama");
   // Silsile-i Nûr: her tarama bir nur damlası
   setNur(o => { const yeni = { damla: (o.damla || 0) + 1 }; try { localStorage.setItem("bd_nur", JSON.stringify(yeni)); } catch {}; return yeni; });
   if (kritikSayi > 0) mahcubiyetKontrol(sonuc);
   if (kritikSayi > 0 && Math.random() < 0.6) {
     const tumOrganlar = sonuc.flatMap(r => r.organlar || []);
     const kKeys = Object.keys(ORGAN_KONUSMALARI);
     const eslesenler = tumOrganlar.map(o => ({ ham: o, anahtar: kKeys.find(k => o.includes(k)) })).filter(x => x.anahtar);
     if (eslesenler.length > 0) {
       const sec = eslesenler[Math.floor(Math.random() * eslesenler.length)];
       setTimeout(() => setBedenKonusuyor({ organ: sec.anahtar, soz: ORGAN_KONUSMALARI[sec.anahtar] }), 1800);
     }
   }
   ahdCatlatKontrol(sonuc, metin);
   if (kritikSayi > 0 && liyakat.niyet) {
     setNiyetUyari(true);
     setTimeout(() => hatiraEkle("niyet", `Niyetini hatırladım: "${liyakat.niyet}" — kritik madde karşısında geri durdum.`), 200);
   }
   setTimeout(() => { sualTetikle(); hediyeAl(); }, 2200);
 }
 setEkran("tartiliyor");
 setTimeout(() => {
   setEkran("sonuc");
   const tehlike = sonuc.filter(r => r.risk === "kritik" || r.risk === "yuksek").length;
   if (tehlike > 0 && navigator.vibrate) {
     try { navigator.vibrate(tehlike >= 3 ? [60, 40, 90] : [50, 30, 60]); } catch {}
   }
 }, 2400);
    if (!seslerAcik) return;
    try {
      const ac = new (window.AudioContext || window.webkitAudioContext)();
      if (ac.state === "suspended") { ac.resume().catch(()=>{}); }
      // Mühür damga sesi — kısa "tok" + low rumble
      {
        const t0 = ac.currentTime;
        const o = ac.createOscillator(); const g = ac.createGain();
        o.type = "sine";
        o.frequency.setValueAtTime(160, t0);
        o.frequency.exponentialRampToValueAtTime(55, t0 + 0.18);
        g.gain.setValueAtTime(0.5, t0);
        g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.2);
        o.connect(g).connect(ac.destination);
        o.start(t0); o.stop(t0 + 0.22);
        const buf = ac.createBuffer(1, 4410, 44100);
        const data = buf.getChannelData(0);
        for (let i = 0; i < 4410; i++) data[i] = (Math.random() - 0.5) * (1 - i / 4410) * 0.4;
        const src = ac.createBufferSource(); const ng = ac.createGain();
        src.buffer = buf; ng.gain.value = 0.3;
        src.connect(ng).connect(ac.destination);
        src.start(t0);
      }
      const tmpS = analiz(metin, KATEGORILER[kategori].db);
      const t = ac.currentTime + 0.35;
      if (tmpS.some(r => r.risk === "kritik")) {
        // 3 bip kritik uyarı
        [0, 0.18, 0.36].forEach(offset => {
          const o = ac.createOscillator(); const g = ac.createGain();
          o.connect(g); g.connect(ac.destination);
          o.frequency.setValueAtTime(880, t + offset);
          g.gain.setValueAtTime(0.3, t + offset);
          g.gain.exponentialRampToValueAtTime(0.001, t + offset + 0.13);
          o.start(t + offset); o.stop(t + offset + 0.14);
        });
      } else if (tmpS.length > 0) {
        const o = ac.createOscillator(); const g = ac.createGain();
        o.connect(g); g.connect(ac.destination);
        o.frequency.setValueAtTime(523, t);
        g.gain.setValueAtTime(0.15, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
        o.start(t); o.stop(t + 0.2);
      }
    } catch {}
 }

 function kaydEt() {
 if (!dogum) return;
 const b = burcHesapla(dogum);
 const yeniProfil = { ad: aktifUye || "", burc: b, dogum, cinsiyet, ...BURCLAR[b] };
 setProfil(yeniProfil);
 try { localStorage.setItem("bd_profil", JSON.stringify(yeniProfil)); } catch {}
 liyakatRozetVer("profil_tamam", 15);
 try { localStorage.setItem("bd_cinsiyet", cinsiyet); } catch {}
 setEkran("ana");
 }

 const genelRisk = sonuclar.length === 0 ? null : sonuclar[0]?.risk;
 const tumOrganlar = [...new Set(sonuclar.flatMap(r => r.organlar || []))];

 /* ── YASAL ────────────────────────────────── */
 if (ekran === "yasal") return (
 <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}>
 <div style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 24, padding: 28, maxWidth: 460, width: "100%" }}>
 <div style={{ textAlign: "center", marginBottom: 24 }}>
 <div style={{ fontSize: 52, marginBottom: 8 }}></div>
 <div style={{ color: C.altin, fontSize: 28, fontWeight: 700, letterSpacing: 0 }}>Besin Dedektifi</div>
 
 </div>
 <div style={{ background: C.y2, border: `1px solid ${C.s}`, borderRadius: 14, padding: 16, marginBottom: 20 }}>
 <div style={{ color: C.altin, fontWeight: 700, fontSize: 13, marginBottom: 10 }}>️ Yasal Uyarı</div>
 {YASAL.map((s, i) => <div key={i} style={{ color: C.soluk, fontSize: 13, lineHeight: 1.8, marginBottom: 4 }}>• {s}</div>)}
 </div>
 <div style={{ color: C.cok, fontSize: 11, marginBottom: 20, lineHeight: 1.6, textAlign: "center" }}> EFSA · WHO · IARC · Türk Gıda Kodeksi · FDA</div>
 <button style={S.anaBtn} onClick={() => setEkran("ana")}>Okudum, Devam Et →</button>
 </div>
 <style>{css}</style>
 </div>
 );

 /* ── GEÇMİŞ EKRANI ───────────────────────── */
 if (ekran === "gecmis") return (
   <div key="ekran-gecmis" style={{ minHeight: "100vh", background: C.bg, padding: 16, fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif", animation: "altsayfaGir 0.25s ease-out" }}>
     <div style={{ maxWidth: 480, margin: "0 auto" }}>
       <button style={S.geriYazi} onClick={() => setEkran("ana")}>← Geri</button>
       <div style={{ fontSize: 28, color: C.altin, textAlign: "center", marginBottom: 8 }}>📋</div>
       <h2 style={{ color: C.altin, fontSize: 20, textAlign: "center", marginBottom: 20 }}>Tarama Geçmişi</h2>
       {gecmis.length === 0 ? (
         <div style={{ color: C.soluk, textAlign: "center", marginTop: 40 }}>Henüz tarama yapılmadı.</div>
       ) : (
         <>
           <div style={{ background: C.y2, borderRadius: 12, padding: 12, marginBottom: 16, display: "flex", gap: 16, justifyContent: "center" }}>
             <div style={{ textAlign: "center" }}><div style={{ color: C.altin, fontSize: 22, fontWeight: 700 }}>{gecmis.length}</div><div style={{ color: C.soluk, fontSize: 11 }}>Tarama</div></div>
             <div style={{ textAlign: "center" }}><div style={{ color: "#FF4444", fontSize: 22, fontWeight: 700 }}>{gecmis.reduce((a,g)=>a+g.kritik,0)}</div><div style={{ color: C.soluk, fontSize: 11 }}>Kritik</div></div>
             <div style={{ textAlign: "center" }}><div style={{ color: C.altin, fontSize: 22, fontWeight: 700 }}>{gecmis.reduce((a,g)=>a+g.sonuc,0)}</div><div style={{ color: C.soluk, fontSize: 11 }}>Toplam Bulgu</div></div>
           </div>
           {gecmis.map((g, i) => (
             <div key={i} style={{ background: C.y2, borderRadius: 12, padding: 12, marginBottom: 8, borderLeft: `3px solid ${g.kritik > 0 ? "#FF4444" : C.altin}` }}>
               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                 <div style={{ color: C.soluk, fontSize: 11 }}>{g.tarih} · {g.kategori}</div>
                 <div style={{ color: g.kritik > 0 ? "#FF4444" : C.altin, fontSize: 12, fontWeight: 700 }}>{g.sonuc} bulgu {g.kritik > 0 ? `(${g.kritik} kritik)` : ""}</div>
               </div>
               <div style={{ color: C.metin, fontSize: 13, marginTop: 4, opacity: 0.7 }}>{g.metin}{g.metin.length >= 60 ? "..." : ""}</div>
             </div>
           ))}
           <button onClick={() => { setGecmis([]); try { localStorage.removeItem("bd_gecmis"); } catch {} }} style={{ width: "100%", marginTop: 8, background: "transparent", border: `1px solid #FF444444`, borderRadius: 10, padding: 10, color: "#FF4444", fontSize: 13, cursor: "pointer" }}>Geçmişi Temizle</button>
         </>
       )}
     </div>
   </div>
 );

 /* ── PROFİL KURULUM ───────────────────────── */
 if (ekran === "profil_kur") return (
 <div key="ekran-profil" style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif", animation: "sayfaGec 0.25s ease-out" }}>
 <div style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 24, padding: 28, maxWidth: 460, width: "100%" }}>
 <button style={S.geriYazi} onClick={() => setEkran("ana")}>← Geri</button>
 <div style={{ fontSize: 36, color: C.altin, marginBottom: 12 }}></div>
 <h2 style={{ color: C.altin, fontSize: 22, marginBottom: 20 }}>Mizaç Profilin</h2>
       <label style={{ color: C.metin, fontSize: 13, display: "block", marginBottom: 6 }}>İsim</label>
       <input value={aktifUye || ""} onChange={e => {
         const v = e.target.value;
         setAktifUye(v);
         try {
           const mevcut = JSON.parse(localStorage.getItem("bd_profil") || "{}");
           localStorage.setItem("bd_profil", JSON.stringify({ ...mevcut, ad: v }));
         } catch {}
       }} placeholder="Örn: Anne, Baba, Ahmet..." style={{ width: "100%", padding: "10px 12px", background: C.y2, border: `1px solid ${C.s}`, borderRadius: 10, color: C.metin, fontSize: 14, fontFamily: "inherit", boxSizing: "border-box", marginBottom: 16 }} />
 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}><label style={{ color: C.metin, fontSize: 13 }}>Doğum Tarihin</label>{dogum && dogum.length === 10 && !dogum.includes("_") && <button onClick={() => { setDogum(""); try { localStorage.removeItem("bd_dogum"); } catch {} }} style={{ background: "none", border: `1px solid ${C.s}`, borderRadius: 8, padding: "3px 10px", color: C.soluk, fontSize: 12, cursor: "pointer" }}>Değiştir</button>}</div>
 {(() => {
 const AYLAR_TR = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
 const parts = dogum ? dogum.split("-") : ["", "", ""];
 const yy = parts[0] || "", mm = parts[1] || "", dd = parts[2] || "";
 const setPart = (yeniG, yeniA, yeniY) => {
 const g = yeniG !== undefined ? yeniG : dd;
 const a = yeniA !== undefined ? yeniA : mm;
 const y = yeniY !== undefined ? yeniY : yy;
 if (g && a && y) {
 const yeniDogum=`${y}-${String(a).padStart(2,"0")}-${String(g).padStart(2,"0")}`;setDogum(yeniDogum);try{localStorage.setItem("bd_dogum",yeniDogum);}catch{}
 } else {
 setDogum(`${y || "____"}-${a ? String(a).padStart(2,"0") : "__"}-${g ? String(g).padStart(2,"0") : "__"}`);
 }
 };
 const selectStil = { flex: 1, padding: "12px 8px", background: C.y2, border: `1px solid ${C.s}`, borderRadius: 10, color: C.metin, fontSize: 15, fontFamily: "inherit", appearance: "none", WebkitAppearance: "none", textAlign: "center", textAlignLast: "center" };
 const yilSimdi = new Date().getFullYear();
 return (
 <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
 <select style={selectStil} value={dd ? String(parseInt(dd)) : ""} onChange={e => setPart(e.target.value, undefined, undefined)}>
 <option value="">Gün</option>
 {Array.from({length:31},(_,i)=>i+1).map(g => <option key={g} value={g}>{g}</option>)}
 </select>
 <select style={{...selectStil, flex: 1.4}} value={mm ? String(parseInt(mm)) : ""} onChange={e => setPart(undefined, e.target.value, undefined)}>
 <option value="">Ay</option>
 {AYLAR_TR.map((a,i) => <option key={i} value={i+1}>{a}</option>)}
 </select>
 <select style={selectStil} value={yy || ""} onChange={e => setPart(undefined, undefined, e.target.value)}>
 <option value="">Yıl</option>
 {Array.from({length:100},(_,i)=>yilSimdi-i).map(y => <option key={y} value={y}>{y}</option>)}
 </select>
 </div>
 );
 })()}
       <label style={{ color: C.metin, fontSize: 13, display: "block", marginBottom: 8 }}>Cinsiyet / Yaş Grubu</label>
       <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
         {["Erkek", "Kadın", "Çocuk"].map(c => (
           <button key={c} onClick={() => setCinsiyet(c)} style={{ flex: 1, padding: "11px 8px", background: cinsiyet === c ? C.altin + "22" : C.y2, border: `1.5px solid ${cinsiyet === c ? C.altin : C.s}`, borderRadius: 10, color: cinsiyet === c ? C.altin : C.metin, fontSize: 13, fontWeight: cinsiyet === c ? 700 : 400, cursor: "pointer", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}>{c}</button>
         ))}
       </div>
 {dogum && /^\d{4}-\d{2}-\d{2}$/.test(dogum) && (() => {
 const b = burcHesapla(dogum); if (!BURCLAR[b]) return null; const bd = BURCLAR[b];
 return (
 <div style={{ background: C.y2, border: `1px solid ${bd.renk}`, borderRadius: 12, padding: 14, display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
 <div style={{ width: 50, height: 50, borderRadius: "50%", background: bd.renk + "22", border: `2px solid ${bd.renk}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
 <svg width="28" height="28" viewBox="0 0 24 24" fill={bd.renk} xmlns="http://www.w3.org/2000/svg">
 <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.4c-3.3 0-9.8 1.6-9.8 4.9v2.4h19.6v-2.4c0-3.3-6.5-4.9-9.8-4.9z"/>
 </svg>
 </div>
 <div>
 <div style={{ color: C.metin, fontWeight: 700, fontSize: 16 }}>{b} Burcu</div>
 <div style={{ color: C.soluk, fontSize: 13 }}>{bd.mizac} Mizacı</div>
 <div style={{ color: C.cok, fontSize: 12 }}>Hassas: {bd.organ}</div>
 </div>
 </div>
 );
 })()}
 <button style={{ ...S.anaBtn, opacity: (dogum && /^\d{4}-\d{2}-\d{2}$/.test(dogum)) ? 1 : 0.4 }} onClick={() => kaydEt(aktifUye)} disabled={!dogum || !/^\d{4}-\d{2}-\d{2}$/.test(dogum)}>Profili Kaydet →</button>
 </div>
 <style>{css}</style>
 </div>
 );

 /* ── SONUÇ EKRANI ─────────────────────────── */
 if (ekran === "tartiliyor") return (
 <div key="ekran-tartiliyor" style={{ minHeight: "100vh", background: `radial-gradient(circle at 50% 38%, ${C.altin}10, ${C.bg} 70%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif", padding: 24 }}>
 <div style={{ position: "relative", width: 120, height: 120, display: "flex", alignItems: "center", justifyContent: "center", animation: "tartiGiris 0.7s cubic-bezier(.2,1.3,.4,1) both" }}>
 {[0, 1, 2].map(i => (
   <div key={i} style={{ position: "absolute", width: 96, height: 96, borderRadius: "50%", border: `1.5px solid ${C.altin}55`, animation: `tartimDalga 2.6s ease-out ${i * 0.85}s infinite` }} />
 ))}
 <svg width="120" height="120" viewBox="0 0 120 120" style={{ animation: "muhurNefes 1.6s ease-in-out infinite", position: "relative" }}>
 <g style={{ transformOrigin: "60px 60px", animation: "tartiSalla 2.6s ease-in-out infinite" }}>
 <line x1="60" y1="20" x2="60" y2="38" stroke={C.altin} strokeWidth="2.5" strokeLinecap="round" />
 <line x1="22" y1="38" x2="98" y2="38" stroke={C.altin} strokeWidth="2.5" strokeLinecap="round" />
 <path d="M22 38 L13 62 a13 8 0 0 0 18 0 Z" fill={`${C.altin}20`} stroke={C.altin} strokeWidth="1.5" />
 <path d="M98 38 L89 62 a13 8 0 0 0 18 0 Z" fill={`${C.altin}20`} stroke={C.altin} strokeWidth="1.5" />
 <circle cx="60" cy="20" r="4" fill={C.altin} />
 <line x1="60" y1="38" x2="60" y2="92" stroke={C.altin} strokeWidth="2.5" strokeLinecap="round" />
 <path d="M44 92 H76 L70 100 H50 Z" fill={`${C.altin}20`} stroke={C.altin} strokeWidth="1.5" />
 {/* kefelere düşen zerreler */}
 <circle cx="22" cy="54" r="2.5" fill={C.altin} style={{ transformOrigin: "22px 54px", animation: "zerreDus 1.4s ease-in 0.3s infinite" }} />
 <circle cx="98" cy="54" r="2.5" fill={C.altin} style={{ transformOrigin: "98px 54px", animation: "zerreDus 1.4s ease-in 0.9s infinite" }} />
 </g>
 </svg>
 </div>
 <div style={{ color: C.altin, fontSize: 24, fontWeight: 600, marginTop: 30, fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: 0.4, textAlign: "center", lineHeight: 1.3 }}>Pîr maddeleri Mîzân'a koyuyor</div>
 <div style={{ color: C.soluk, fontSize: 14, marginTop: 8, fontStyle: "italic", fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: 0.3 }}>her zerre tartılıyor…</div>
 <div style={{ display: "flex", gap: 7, marginTop: 18 }}>
 {[0, 1, 2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: C.altin, animation: `nabizNokta 1.2s ease-in-out ${i * 0.2}s infinite` }} />)}
 </div>
 </div>
 );

 if (ekran === "sonuc") return (
 <div key="ekran-sonuc" style={{ minHeight: "100vh", background: C.bg, fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif", paddingBottom: 30, animation: "altsayfaGir 0.28s ease-out" }}>
 <div style={{ display: "flex", alignItems: "center", padding: "12px 16px", background: C.y, borderBottom: `1px solid ${C.s}`, position: "sticky", top: 0, zIndex: 20, gap: 10 }}>
 <button style={S.geriDaire} onClick={() => setEkran("ana")}>←</button>
 <span style={{ color: C.metin, fontWeight: 600, flex: 1 }}>{KATEGORILER[kategori].ad} Analiz Sonucu</span>
 <button onClick={sesToggle} title={seslerAcik ? "Sesi kapat" : "Sesi aç"} aria-label="Ses aç/kapa" style={{ width: 36, height: 36, borderRadius: "50%", border: `1px solid ${seslerAcik ? C.altin : C.s}`, background: seslerAcik ? C.altin + "15" : C.y2, color: seslerAcik ? C.altin : C.soluk, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}>
   {seslerAcik ? (
     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
   ) : (
     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
   )}
 </button>
 {profil && <div style={{ border: `1px solid ${profil.renk}`, borderRadius: 20, padding: "4px 10px", fontSize: 11, color: profil.renk }}>{profil.burc}</div>}
 </div>
 <div style={{ background: `${C.altin}10`, borderBottom: `1px solid ${C.altin}20`, padding: "7px 16px", fontSize: 11, color: C.cok }}> EFSA · WHO · IARC arşivi. Tıbbi tavsiye değildir.</div>

 <div style={{ padding: 16 }}>
 {ilkSira.length > 0 && (
 <div style={{ background: C.y, border: `2px solid ${C.kirmizi}`, borderRadius: 18, padding: 16, marginBottom: 12 }}>
 <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
 <div style={{ background: C.kirmizi, color: "#fff", borderRadius: 8, padding: "5px 12px", fontWeight: 700, fontSize: 12 }}>ANA İÇERİK UYARISI</div>
 <div style={{ color: C.metin, fontWeight: 600, fontSize: 13 }}>İlk 5 madde = ürünün %80'i</div>
 </div>
 {ilkSira.map((u, i) => (
 <div key={i} style={{ background: C.bg, border: `1px solid ${C.kirmizi}40`, borderRadius: 10, padding: 12, marginBottom: i < ilkSira.length - 1 ? 8 : 0 }}>
 <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
 <div style={{ background: C.kirmizi, color: "#fff", borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>{u.sira}. SIRADA</div>
 <div style={{ color: C.kirmizi, fontWeight: 700, fontSize: 13 }}>{u.ad}</div>
 </div>
 <div style={{ color: C.metin, fontSize: 12, lineHeight: 1.55 }}>{u.uyari}</div>
 </div>
 ))}
 </div>
 )}
 {belirsizler.length > 0 && (
 <div style={{ background: C.y, border: `2px solid ${C.turuncu}`, borderRadius: 18, padding: 16, marginBottom: 12 }}>
 <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
 <div style={{ background: C.turuncu, color: "#1A1200", borderRadius: 8, padding: "5px 12px", fontWeight: 700, fontSize: 12 }}>GİZLENMİŞ İÇERİK</div>
 <div style={{ color: C.metin, fontWeight: 600, fontSize: 13 }}>{belirsizler.length} belirsiz kelime tespit edildi</div>
 </div>
 {belirsizler.map((bk, i) => (
 <div key={i} style={{ background: C.bg, border: `1px solid ${C.turuncu}40`, borderRadius: 10, padding: 12, marginBottom: i < belirsizler.length - 1 ? 8 : 0 }}>
 <div style={{ color: C.turuncu, fontWeight: 700, fontSize: 13, marginBottom: 4, textTransform: "capitalize" }}>"{bk.kelime}"</div>
 <div style={{ color: C.metin, fontSize: 12, lineHeight: 1.55 }}>{bk.uyari}</div>
 </div>
 ))}
 </div>
 )}
 {sonuclar.length === 0 ? (
 <>
 <div style={{ background: C.y, border: `1px solid ${C.yesil}40`, borderRadius: 18, padding: 28, textAlign: "center", margin: "20px 0" }}>
 <div style={{ width: 60, height: 60, borderRadius: "50%", background: C.yesil + "18", border: `2px solid ${C.yesil}`, color: C.yesil, fontSize: 34, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontWeight: 700 }}>✓</div>
 <div style={{ color: C.yesil, fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Tertemiz Görünüyor</div>
 <p style={{ color: C.metin, fontSize: 14, lineHeight: 1.7, marginBottom: 14 }}>Bu üründe arşivimizdeki zararlı maddelerden iz bulunamadı. Yine de etiketin tamamını okumayı ihmal etme — kaydımızda olmayan maddeler de bulunabilir.</p>
 <div style={{ background: C.bg, border: `1px solid ${C.s}`, borderRadius: 12, padding: 14, marginBottom: 16, textAlign: "left" }}>
 <div style={{ color: C.altin, fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Genel Uyarı</div>
 <p style={{ color: C.soluk, fontSize: 13, lineHeight: 1.6, margin: 0 }}>Etikette <strong style={{ color: C.metin }}>E</strong> ile başlayan kod veya tanımadığın <strong style={{ color: C.metin }}>kimyasal isim</strong> varsa dikkatli ol. Mümkünse <strong style={{ color: C.metin }}>doğal alternatif</strong> tercih et.</p>
 </div>
 <a href={`mailto:besindedektifii@gmail.com?subject=${encodeURIComponent("Yeni Madde Bildirimi - " + KATEGORILER[kategori].ad)}&body=${encodeURIComponent("Ürün adı: \nMadde: \nKategori: " + KATEGORILER[kategori].ad)}`} style={{ display: "block", width: "100%", background: C.altin, color: C.bg, padding: "14px 18px", borderRadius: 12, border: "none", fontWeight: 700, fontSize: 14, marginBottom: 10, fontFamily: "inherit", cursor: "pointer", textDecoration: "none", textAlign: "center", boxSizing: "border-box" }}>Maddeyi Bildir</a>
 <div style={{ color: C.cok, fontSize: 11, marginBottom: 14, lineHeight: 1.5 }}>besindedektifii@gmail.com</div>
 <button style={{ ...S.anaBtn, background: "transparent", border: `1px solid ${C.altin}`, color: C.altin }} onClick={() => setEkran("ana")}>Yeni Tarama</button>
        <button style={{ ...S.anaBtn, background: "transparent", border: `1px solid ${C.s}`, color: C.soluk, marginTop: 8 }} onClick={() => {
          const kritikler = sonuclar.filter(r => r.risk === "kritik").map(r => `🚨 ${r.ad}`).join("\n");
          const yuksekler = sonuclar.filter(r => r.risk === "yuksek").map(r => `⚠️ ${r.ad}`).join("\n");
          const metin = `🔍 Besin Dedektifi Sonucu\n\n${kritikler ? "KRİTİK MADDELER:\n" + kritikler + "\n\n" : ""}${yuksekler ? "YÜKSEK RİSK:\n" + yuksekler + "\n\n" : ""}Toplam ${sonuclar.length} madde tespit edildi.\n\nhttps://besin-d.vercel.app`;
          if (navigator.share) {
            navigator.share({ title: "Besin Dedektifi", text: metin }).catch(()=>{});
          } else {
            navigator.clipboard.writeText(metin).then(()=>bdToast("Kopyalandı! Arkadaşına yapıştır.")).catch(()=>bdToast("Paylaşım desteklenmiyor."));
          }
        }}>Sonuçları Paylaş</button>
        <button style={{ ...S.anaBtn, background: "transparent", border: `1px solid ${C.s}`, color: C.soluk, marginTop: 8 }} onClick={() => {
          if (!seslerAcik) { bdToast("Ses kapalı. Üstteki hoparlör ikonundan açabilirsin."); return; }
          if (!("speechSynthesis" in window)) { bdToast("Tarayıcınız sesli okumayı desteklemiyor."); return; }
          const synth = window.speechSynthesis;
          synth.cancel();
          if (synth.paused) synth.resume();
          const kritikler = sonuclar.filter(r => r.risk === "kritik");
          const yuksekler = sonuclar.filter(r => r.risk === "yuksek");
          let metin = `Tarama tamamlandı. Toplam ${sonuclar.length} madde bulundu. `;
          if (kritikler.length > 0) metin += `Kritik risk: ${kritikler.map(r=>r.ad).join(", ")}. `;
          if (yuksekler.length > 0) metin += `Yüksek risk: ${yuksekler.slice(0,3).map(r=>r.ad).join(", ")}. `;
          if (sonuclar.length === 0) metin = "Tarama tamamlandı. Tehlikeli madde bulunamadı. Ürün güvenli görünüyor.";
          // iOS Safari warmup: kısa sessiz utterance gönder, ses motorunu aç
          try { const w = new SpeechSynthesisUtterance(" "); w.volume = 0; w.rate = 1; synth.speak(w); } catch {}
          const konus = () => {
            const utt = new SpeechSynthesisUtterance(metin);
            utt.lang = "tr-TR";
            utt.rate = 0.9;
            utt.pitch = 1;
            utt.volume = 1;
            const sesler = synth.getVoices();
            const trSes = sesler.find(s => s.lang && s.lang.startsWith("tr"));
            if (trSes) utt.voice = trSes;
            utt.onerror = (e) => { console.warn("TTS error", e); };
            synth.speak(utt);
          };
          if (synth.getVoices().length === 0) {
            let denendi = false;
            synth.onvoiceschanged = () => { if (!denendi) { denendi = true; konus(); } synth.onvoiceschanged = null; };
            setTimeout(() => { if (!denendi) { denendi = true; konus(); } }, 400);
          } else {
            setTimeout(konus, 50);
          }
        }}>Sesli Oku</button>
        {sonuclar.filter(r => r.risk === "kritik" || r.risk === "yuksek").length > 0 && (
          <button style={{ ...S.anaBtn, background: C.yesil + "14", border: `1px solid ${C.yesil}80`, color: C.yesil, marginTop: 8 }} onClick={() => {
            const zarar = sonuclar.filter(r => r.risk === "kritik" || r.risk === "yuksek");
            const liste = zarar.map(r => `${r.ad} → ${r.alternatif ? r.alternatif.split("·")[0].trim() : "doğal alternatif"}`).join("\n");
            const toplam = zarar.length;
            const msg = `Şifalı Sepet Önerisi\n\nSepetimdeki ${toplam} zararlı ürün:\n${liste}\n\nBesin Dedektifi ile analiz edildi.\nhttps://besin-d.vercel.app`;
            if (navigator.share) {
              navigator.share({ title: "Şifalı Sepet", text: msg }).catch(()=>{});
            } else {
              navigator.clipboard.writeText(msg).then(()=>bdToast("Şifalı sepet kopyalandı!")).catch(()=>{});
            }
          }}>Şifalı Sepete Dönüştür ({sonuclar.filter(r=>r.risk==="kritik"||r.risk==="yuksek").length} ürün)</button>
        )}
 </div>
 <ToplulugaKatki taramaSayisi={taramaSayisi} />
 </>
 ) : (
 <>
 {(() => {
 const w = { kritik: 3, yuksek: 2, orta: 1, dusuk: 0.5 };
 const zararli = sonuclar.reduce((a, r) => a + (w[r.risk] || 0), 0);
 const aci = Math.min(20, 4 + zararli * 1.6);
 const dengeRenk = zararli >= 6 ? C.kirmizi : zararli >= 3 ? C.turuncu : C.sari;
 const temizSay = (gecmis || []).length;
 const hkm = zararli >= 6
   ? { bas: "Mîzân ağır bastı", alt: `Sağ kefe çöktü — ${sonuclar.length} zararlı yük tartıldı.` }
   : zararli >= 3
   ? { bas: "Terazi zararlıya meyletti", alt: `Sağ kefede ${sonuclar.length} madde — dikkat gerek.` }
   : { bas: "Mîzân hafifçe eğildi", alt: `Sağ kefede ${sonuclar.length} madde — ihtiyatı elden bırakma.` };
 return (
 <div style={{ background: `linear-gradient(180deg, ${C.y}, ${dengeRenk}08)`, border: `1.5px solid ${dengeRenk}55`, borderRadius: 18, padding: "16px 14px 14px", marginBottom: 12, textAlign: "center", overflow: "hidden" }}>
 <div style={{ color: C.altin, fontSize: 11, fontWeight: 600, letterSpacing: 3, marginBottom: 6, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>MÎZÂN · AMEL TERAZİSİ</div>
 <svg width="220" height="132" viewBox="0 0 220 132" style={{ maxWidth: "100%" }}>
 <path d="M92 104 H128 L120 116 H100 Z" fill={`${C.altin}18`} stroke={C.altin} strokeWidth="1.5" />
 <line x1="110" y1="34" x2="110" y2="104" stroke={C.altin} strokeWidth="3" strokeLinecap="round" />
 <circle cx="110" cy="16" r="5" fill={C.altin} />
 <line x1="110" y1="18" x2="110" y2="34" stroke={C.altin} strokeWidth="3" strokeLinecap="round" />
 <g style={{ transformOrigin: "110px 34px", transform: `rotate(${aci}deg)`, animation: "mizanOtur 2.4s cubic-bezier(.3,1.4,.5,1) both", "--mizan-aci": `${aci}deg` }}>
 <line x1="36" y1="34" x2="184" y2="34" stroke={C.altin} strokeWidth="3" strokeLinecap="round" />
 <line x1="36" y1="34" x2="36" y2="52" stroke={C.altin} strokeWidth="1" />
 <path d="M20 52 a16 9 0 0 0 32 0 Z" fill={`${C.yesil}22`} stroke={C.yesil} strokeWidth="1.5" />
 <text x="36" y="76" textAnchor="middle" fill={C.yesil} fontSize="9" fontWeight="600" letterSpacing="1" fontFamily="'Cormorant Garamond', Georgia, serif">TEMİZ</text>
 <line x1="184" y1="34" x2="184" y2="52" stroke={C.altin} strokeWidth="1" />
 <path d="M168 52 a16 9 0 0 0 32 0 Z" fill={`${dengeRenk}22`} stroke={dengeRenk} strokeWidth="1.5" />
 <text x="184" y="76" textAnchor="middle" fill={dengeRenk} fontSize="9" fontWeight="600" letterSpacing="1" fontFamily="'Cormorant Garamond', Georgia, serif">ZARARLI</text>
 </g>
 </svg>
 <div style={{ color: dengeRenk, fontSize: 19, fontWeight: 600, marginTop: 4, fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: 0.3 }}>{hkm.bas}</div>
 <div style={{ color: C.soluk, fontSize: 13, marginTop: 3, fontStyle: "italic", fontFamily: "'Cormorant Garamond', Georgia, serif", lineHeight: 1.4 }}>{hkm.alt}</div>
 <div style={{ color: C.cok, fontSize: 11, marginTop: 6, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Sol kefe niyetin · sağ kefe ürünün yükü</div>
 </div>
 );
 })()}
 {/* RİSK ÖZET KUTUSU + ORGANLAR BİR ARADA */}
 <div style={{ background: C.y, border: `2px solid ${rR(genelRisk)}`, borderRadius: 18, padding: 18, marginBottom: 12 }}>
 <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
 {(() => {
   const w = { kritik: 3, yuksek: 2, orta: 1, dusuk: 0.5 };
   const yuk = sonuclar.reduce((a, r) => a + (w[r.risk] || 0), 0);
   const skor = Math.max(5, Math.round(100 - yuk * 11));
   const sRenk = skor >= 70 ? C.yesil : skor >= 40 ? C.turuncu : C.kirmizi;
   return <SkorHalkasi skor={skor} renk={sRenk} />;
 })()}
 <div style={{ flex: 1, minWidth: 0 }}>
 <div style={{ display: "inline-block", background: rR(genelRisk), borderRadius: 10, padding: "5px 12px", color: "#fff", fontWeight: 700, fontSize: 13 }}>{rE(genelRisk)}</div>
 <div style={{ color: C.metin, fontSize: 13, fontWeight: 600, marginTop: 5 }}>{sonuclar.length} zararlı madde tespit edildi</div>
 </div>
 </div>
 <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
 {tumOrganlar.map(o => <span key={o} style={{ background: rR(genelRisk), color: "#fff", borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 600 }}>{o}</span>)}
 </div>
 </div>

         {/* SAYAÇ KUTULARI */}
 {(() => {
 const sayim = { kritik: 0, yuksek: 0, orta: 0, dusuk: 0 };
 sonuclar.forEach(r => sayim[r.risk]++);
 const kutular = [
 { k: "kritik", l: "KRİTİK", c: C.kirmizi },
 { k: "yuksek", l: "YÜKSEK", c: C.kirmizi },
 { k: "orta", l: "ORTA", c: C.sari },
 ].filter(x => sayim[x.k] > 0);
 return (
 <div style={{ display: "grid", gridTemplateColumns: `repeat(${kutular.length}, 1fr)`, gap: 8, marginBottom: 12 }}>
 {kutular.map(x => (
 <div key={x.k} style={{ background: x.c + "0A", border: `1px solid ${x.c}33`, borderRadius: 14, padding: "14px 8px", textAlign: "center" }}>
 <div style={{ color: x.c, fontSize: 28, fontWeight: 700, lineHeight: 1 }}>{sayim[x.k]}</div>
 <div style={{ color: x.c, fontSize: 10, fontWeight: 700, letterSpacing: 0, marginTop: 4 }}>{x.l}</div>
 </div>
 ))}
 </div>
 );
 })()}

 {profil && sonuclar.some(r => r.burclar?.includes(profil.burc)) && (
 <div style={{ background: C.kirmizi + "0D", border: `1px solid ${C.kirmizi}40`, borderRadius: 14, padding: 14, marginBottom: 12 }}>
 <div style={{ color: C.kirmizi, fontWeight: 700, marginBottom: 4 }}>{profil.burc} burcu — Kişisel risk tespit edildi</div>
 <div style={{ color: C.metin, fontSize: 13 }}>{profil.mizac} mizacı bu maddelerden bazılarına özellikle hassas. {profil.organ} bölgen etkilenebilir.</div>
 </div>
 )}

 {(() => {
   if (sonuclar.length === 0) return null;
   const urunTuru = urunTuruTespit(txt, kategori);
   if (!urunTuru) return null;
   const tarif = urunTuru.tarifKey && DOGAL_TARIF[urunTuru.tarifKey] ? DOGAL_TARIF[urunTuru.tarifKey] : null;
   return (
     <div style={{ background: C.yesil + "08", border: `1px solid ${C.yesil}26`, borderRadius: 14, padding: 14, marginBottom: 14 }}>
       <div style={{ color: C.yesil, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, marginBottom: 6 }}>{urunTuru.baslik.toUpperCase()} — DOĞAL ALTERNATİF</div>
       <div style={{ color: C.metin, fontSize: 14, lineHeight: 1.5, marginBottom: 10 }}>{urunTuru.alternatif}</div>
       {tarif && (
         <button onClick={() => setTarifModal(tarif)} style={{ width:"100%", background: C.y2, border:`1px solid ${C.s}`, borderRadius:8, padding:"10px 12px", color: C.metin, fontWeight:700, fontSize:13, cursor:"pointer", marginBottom: kategori === "gida" ? 8 : 0 }}>
           Tarif: {tarif.baslik}
         </button>
       )}
       {kategori === "gida" && (
         <button onClick={() => { setSekme("market"); setEkran("ana"); }} style={{ width:"100%", background: C.y2, border:`1px solid ${C.s}`, borderRadius:8, padding:"10px 12px", color: C.metin, fontWeight:700, fontSize:13, cursor:"pointer", position:"relative" }}>
           {urunTuru.marketUrun ? `Marketten Al: ${urunTuru.marketUrun.split(" · ")[0]}` : "Marketten Al"}
           <span style={{ position:"absolute", top:-6, right:6, background: C.altin, color: "#fff", fontSize:8, fontWeight:700, padding:"1px 5px", borderRadius:6, letterSpacing:0.3 }}>YAKINDA</span>
         </button>
       )}
     </div>
   );
 })()}

 {sonuclar.map((r, i) => {
 const ayet = ayetSec(r.organlar);
 const makamBilgi = MAKAMLAR[r.makam] || {};
 const kisisel = profil && r.burclar?.includes(profil.burc);
 const acikMi = acik.has(i);
 return (
 <div key={i} style={{ background: C.y, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.78 0 0 0 0 0.58 0 0 0 0 0.17 0 0 0 0.06 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")", border: `1px solid ${C.s}`, borderRadius: 14, marginBottom: 10, borderLeft: `4px solid ${rR(r.risk)}`, overflow: "hidden" }}>
 <div style={{ padding: "14px 16px", cursor: "pointer" }} onClick={() => setAcik(prev => { const y = new Set(prev); if (y.has(i)) y.delete(i); else y.add(i); return y; })}>
 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
 <div style={{ flex: 1 }}>
 <div style={{ color: C.altin, fontSize: 10, fontWeight: 700, letterSpacing: 0, marginBottom: 2 }}>{r.kod} · {r.kat}</div>
 <div style={{ color: C.metin, fontSize: 16, fontWeight: 700 }}>{r.kod !== r.ad && !r.kod.startsWith("E") ? r.ad : (r.kod.startsWith("E") && r.ad !== r.kod ? `${r.kod} / ${r.ad}` : r.ad)}</div>
 </div>
 <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
 <div style={{ background: rR(r.risk), borderRadius: 6, padding: "4px 10px", color: "#fff", fontWeight: 700, fontSize: 11 }}>{rE(r.risk)}</div>
 <span style={{ color: C.cok, fontSize: 10 }}>{acikMi ? "Kapat ▲" : "Detay ▼"}</span>
 </div>
 </div>
 <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8 }}>
 {(r.organlar || []).map(o => <span key={o} style={S.orgTag}>{o}</span>)}
 </div>
 {kisisel && <div style={{ background: C.kirmizi + "0D", border: `1px solid ${C.kirmizi}33`, borderRadius: 8, padding: "6px 10px", color: C.kirmizi, fontSize: 12, marginTop: 8 }}> {profil.burc} burcu — yüksek risk!</div>}
 </div>

 {acikMi && (
 <div style={{ padding: "0 16px 16px" }}>
 <div style={{ height: 1, background: C.s, marginBottom: 14 }} />
 {(() => {
   const v = (r.risk === "kritik" || r.risk === "yuksek") ? { ad: "KAÇIN", renk: C.kirmizi, alt: "Kullanmaman önerilir", seviye: "YÜKSEK RİSK" }
     : r.risk === "orta" ? { ad: "DİKKAT", renk: C.turuncu, alt: "Sınırlı ve bilinçli tüket", seviye: "ORTA RİSK" }
     : r.risk === "dusuk" ? { ad: "GÜVENLİ", renk: C.yesil, alt: "Genel olarak güvenli", seviye: "DÜŞÜK RİSK" }
     : { ad: "BELİRSİZ", renk: "#888", alt: "Yeterli veri yok", seviye: "VERİ EKSİK" };
   return (
     <div style={{ background: "#FFFFFF", border: `1px solid ${C.s}`, borderRadius: 14, padding: "14px 16px", marginBottom: 14, display: "flex", alignItems: "center", gap: 14, boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
       <div style={{ width: 68, height: 68, borderRadius: "50%", border: `2.5px solid ${v.renk}`, background: v.renk + "10", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative", animation: "muhurGel .5s ease-out" }}>
         <div style={{ position: "absolute", inset: 5, borderRadius: "50%", border: `1px solid ${v.renk}55` }} />
         <span style={{ color: v.renk, fontSize: 13, fontWeight: 900, letterSpacing: 1.2, lineHeight: 1, fontFamily: "'Cormorant Garamond', Georgia, serif", zIndex: 1 }}>{v.ad}</span>
       </div>
       <div style={{ flex: 1, minWidth: 0 }}>
         <div style={{ color: v.renk, fontSize: 14, fontWeight: 700, letterSpacing: 0.8, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{v.seviye}</div>
         <div style={{ color: C.soluk, fontSize: 11, marginTop: 4, lineHeight: 1.4, fontStyle: "italic" }}>{v.alt}</div>
       </div>
     </div>
   );
 })()}
 <div style={S.kB}>ETKİ (ARŞİV VERİSİ)</div>
 <div style={S.mT}>{r.etki}</div>
 <div style={S.kB}> Kaynak</div>
 <div style={{ color: C.cok, fontSize: 12, fontStyle: "normal" }}>{r.kaynak}</div>
 {profil && KATEGORILER[kategori].mizacGoster && (
 <div style={{ marginTop: 12 }}>
 <div style={{ color: C.altin, fontSize: 11, fontWeight: 700, marginBottom: 4 }}> Osmanlı Tıbbı / Mizaç</div>
 <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>{profil.mizac} ({profil.element.split(" ")[0]}) mizacında bu madde {(r.organlar && r.organlar[0]) || "vücut"} üzerinde olumsuz etki gösterir.</div>
 </div>
 )}
 {kategori === "gida" && KATEGORILER[kategori].mizacGoster && (
 <div style={{ background: "#c9a84c12", border: "1px solid #c9a84c30", borderRadius: 10, padding: 12, marginTop: 10 }}>
 <div style={{ color: C.altin, fontSize: 11, fontWeight: 700, marginBottom: 4 }}> Şifa Ayeti: {ayet.sure}</div>
 <div style={{ color: C.metin, fontSize: 13, fontStyle: "normal", lineHeight: 1.7 }}>"{ayet.metin}"</div>
 </div>
 )}
 {makamBilgi.etki && KATEGORILER[kategori].mizacGoster && (
 <div style={{ background: "#ffffff08", border: `1px solid ${makamBilgi.renk || C.s}40`, borderRadius: 10, padding: 12, marginTop: 10 }}>
 <div style={{ color: makamBilgi.renk || C.altin, fontSize: 11, fontWeight: 700, marginBottom: 4 }}> {r.makam} Makamı</div>
 <div style={{ color: C.metin, fontSize: 13 }}>{makamBilgi.etki}</div>
 <div style={{ color: C.cok, fontSize: 11, marginTop: 4 }}> {makamBilgi.vakit} · {makamBilgi.aletler}</div>
 </div>
 )}
 {r.burclar && r.burclar.length > 0 && KATEGORILER[kategori].mizacGoster && (
 <>
 <div style={S.kB}> Özellikle Etkilenen Burçlar</div>
 <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
 {r.burclar.map(b => (
 <span key={b} style={{ background: C.y2, color: C.soluk, border: `1px solid ${C.s}`, borderRadius: 8, padding: "4px 10px", fontSize: 12 }}>
 {b}
 </span>
 ))}
 </div>
 </>
 )}
 {(() => {
   const destek = organDestekToparla(r.organlar);
             if (!destek || destek.length === 0) return null;
             return (
               <div style={{ background: C.yesil + "0D", border: `1px solid ${C.yesil}33`, borderRadius: 10, padding: 12, marginTop: 10 }}>
                 <div style={{ color: C.yesil, fontSize: 12, fontWeight: 700, marginBottom: 6, letterSpacing: 0.3 }}>ORGAN DOSTU DESTEK</div>
                 {destek.map((d, idx) => (
                   <div key={idx} style={{ marginBottom: idx < destek.length - 1 ? 8 : 0 }}>
                     <div style={{ color: C.metin, fontSize: 13, fontWeight: 600 }}>{d.organ}</div>
                     <div style={{ color: C.metin, fontSize: 12, marginTop: 2, lineHeight: 1.4 }}>{d.bitki}</div>
                     <div style={{ color: C.soluk, fontSize: 11, marginTop: 3, fontStyle: "italic" }}>{d.not}</div>
                   </div>
                 ))}
                 <div style={{ marginTop: 10, paddingTop: 8, borderTop: `1px solid ${C.s}`, color: C.cok, fontSize: 10, lineHeight: 1.5, fontStyle: "italic" }}>
                   ⚠ Tıbbi tavsiye değildir. Geleneksel fitoterapi ve İbn Sina geleneğine dayalı bilgi notudur. Mevcut bir hastalığınız, gebelik veya ilaç kullanımı varsa hekiminize/eczacınıza danışın. Kaynaklar Hakkında sekmesinde.
                 </div>
               </div>
             );
           })()}
 {(() => {
   const uyarilar = saglikUyarilari(r);
   if (!uyarilar.length) return null;
   return (
     <div style={{ background: C.kirmizi + "0D", border: `1px solid ${C.kirmizi}40`, borderRadius: 10, padding: 12, marginTop: 12 }}>
       <div style={{ color: C.kirmizi, fontSize: 11, fontWeight: 700, marginBottom: 6, letterSpacing: 0.3 }}>SANA ÖZEL UYARI</div>
       {uyarilar.map(u => (
         <div key={u.k} style={{ color: C.metin, fontSize: 12, lineHeight: 1.5, marginBottom: 3 }}>
           <b>{u.ad}:</b> bu maddenin etki/içerik metni senin durumunla eşleşiyor — dikkatli ol.
         </div>
       ))}
     </div>
   );
 })()}
 <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
   <button onClick={(e) => { e.stopPropagation(); setPaylasMaddesi(r); puanEkle(5, "paylas"); sefaatEkle("paylas"); }} style={{ flex: 1, minWidth: 120, background: C.altin + "12", color: C.altin, border: `1px solid ${C.altin}80`, borderRadius: 10, padding: "11px", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>Paylaş</button>
   <button onClick={(e) => {
     e.stopPropagation();
     const konu = `Hata: ${r.ad} (${r.kod})`;
     const body = `Bu maddedeki bilginin yanlış olduğunu düşünüyorum:\n\nMadde: ${r.ad}\nKod: ${r.kod}\nKategori: ${r.kat}\nMevcut etki metni: ${r.etki}\n\nDoğrusu / kaynağı şudur:\n\n[Buraya yaz]\n\n---\nBesin Dedektifi`;
     const a = document.createElement("a");
     a.href = `mailto:besindedektifii@gmail.com?subject=${encodeURIComponent(konu)}&body=${encodeURIComponent(body)}`;
     a.style.display = "none";
     document.body.appendChild(a);
     a.click();
     setTimeout(() => { try { document.body.removeChild(a); } catch {} }, 100);
   }} style={{ background: "transparent", color: C.soluk, border: `1px solid ${C.s}`, borderRadius: 10, padding: "11px 14px", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>Bilgi Yanlış</button>
 </div>
 </div>
 )}
 </div>
 );
 })}

 {KATEGORILER[kategori].mizacGoster && (
 <div style={{ background: `linear-gradient(135deg,${C.altin}15,${C.y})`, border: `1px solid ${C.altin}30`, borderRadius: 14, padding: 16, marginBottom: 12 }}>
 <div style={S.kB}> EŞREF SAATİ</div>
 <div style={{ color: C.metin, fontSize: 15, fontWeight: 600 }}>{es.ikon} {es.saat} — {es.organ}</div>
 <div style={{ color: C.soluk, fontSize: 13, marginTop: 4 }}>{es.eylem}</div>
 </div>
 )}

 {profil && KATEGORILER[kategori].mizacGoster && (
 <div style={{ background: `linear-gradient(135deg,${C.altin}18,${C.y2})`, border: `1px solid ${C.altin}40`, borderRadius: 14, padding: 18, textAlign: "center", marginBottom: 14 }}>
 <div style={S.kB}> BURÇ ZİKRİN</div>
 <div style={{ color: C.metin, fontSize: 20, fontWeight: 700 }}>{profil.zikir}</div>
 <div style={{ color: C.soluk, fontSize: 12, marginTop: 4 }}>{profil.burc} · {profil.mizac} mizacı</div>
 </div>
 )}

 {(() => {
   const w = { kritik: 3, yuksek: 2, orta: 1, dusuk: 0.5 };
   const yuk = sonuclar.reduce((a, r) => a + (w[r.risk] || 0), 0);
   const skor = Math.max(5, Math.round(100 - yuk * 11));
   const sRenk = skor >= 70 ? C.yesil : skor >= 40 ? C.turuncu : C.kirmizi;
   const say = { kritik: 0, yuksek: 0, orta: 0, dusuk: 0 };
   sonuclar.forEach(r => say[r.risk]++);
   const cevre = 2 * Math.PI * 52;
   const mert = mevcutMertebe();
   return (
     <div style={{ position: "absolute", left: -9999, top: 0 }} aria-hidden="true">
       <div ref={skorKartRef} style={{ position: "relative", overflow: "hidden", width: 380, background: `radial-gradient(circle at 50% 32%, ${C.altin}10, transparent 62%), linear-gradient(180deg, ${C.y}, ${C.bg})`, border: `1.5px solid ${C.altin}55`, borderRadius: 22, padding: "26px 24px", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif", boxSizing: "border-box" }}>
         <svg width="300" height="300" viewBox="0 0 100 100" style={{ position: "absolute", left: "50%", top: "46%", transform: "translate(-50%,-50%)", opacity: 0.05, pointerEvents: "none" }}>
           <g fill="none" stroke={C.altin} strokeWidth="1.2">
             <circle cx="50" cy="50" r="46" />
             <circle cx="50" cy="50" r="38" />
             {Array.from({ length: 12 }).map((_, i) => { const a = (i * 30) * Math.PI / 180; return <line key={i} x1={50 + 38 * Math.cos(a)} y1={50 + 38 * Math.sin(a)} x2={50 + 46 * Math.cos(a)} y2={50 + 46 * Math.sin(a)} />; })}
             <path d="M50 14 L61 43 L50 86 L39 43 Z" />
             <path d="M14 50 L43 39 L86 50 L43 61 Z" />
           </g>
         </svg>
         <div style={{ position: "relative", zIndex: 1 }}>
         <div style={{ textAlign: "center", color: C.altin, fontSize: 11, fontWeight: 800, letterSpacing: 4, textTransform: "uppercase" }}>Besin Dedektifi</div>
         <div style={{ textAlign: "center", color: C.cok, fontSize: 10, letterSpacing: 1, marginTop: 4 }}>{KATEGORILER[kategori].ad} Analiz Sonucu</div>
         <div style={{ display: "flex", justifyContent: "center", margin: "20px 0 14px" }}>
           <svg width="140" height="140" viewBox="0 0 140 140">
             <circle cx="70" cy="70" r="52" fill="none" stroke={C.s} strokeWidth="11" />
             <circle cx="70" cy="70" r="52" fill="none" stroke={sRenk} strokeWidth="11" strokeLinecap="round" strokeDasharray={`${cevre * skor / 100} ${cevre}`} transform="rotate(-90 70 70)" />
             <text x="70" y="68" textAnchor="middle" fill={sRenk} fontSize="40" fontWeight="800" fontFamily="Inter, sans-serif">{skor}</text>
             <text x="70" y="90" textAnchor="middle" fill={C.cok} fontSize="13" fontWeight="700" fontFamily="Inter, sans-serif">/ 100</text>
           </svg>
         </div>
         <div style={{ textAlign: "center", color: sRenk, fontSize: 17, fontWeight: 800 }}>Temizlik Skoru</div>
         <div style={{ textAlign: "center", color: C.soluk, fontSize: 12, marginTop: 4 }}>{sonuclar.length} madde · {skor >= 70 ? "görece temiz" : skor >= 40 ? "orta riskli" : "yüksek riskli"}</div>
         <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
           {[{ k: "kritik", l: "KRİTİK", c: C.kirmizi }, { k: "yuksek", l: "YÜKSEK", c: C.kirmizi }, { k: "orta", l: "ORTA", c: C.sari }].filter(x => say[x.k] > 0).map(x => (
             <div key={x.k} style={{ background: x.c + "12", border: `1px solid ${x.c}40`, borderRadius: 12, padding: "8px 14px", textAlign: "center", minWidth: 64 }}>
               <div style={{ color: x.c, fontSize: 22, fontWeight: 800, lineHeight: 1 }}>{say[x.k]}</div>
               <div style={{ color: x.c, fontSize: 9, fontWeight: 700, marginTop: 3 }}>{x.l}</div>
             </div>
           ))}
         </div>
         <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 20, paddingTop: 16, borderTop: `1px solid ${C.s}` }}>
           <span style={{ color: mert.renk, fontSize: 12, fontWeight: 700 }}>{mert.ad}</span>
           {liyakat.lakap && <span style={{ color: C.soluk, fontSize: 12 }}>· {liyakat.lakap}</span>}
         </div>
         <div style={{ textAlign: "center", color: C.cok, fontSize: 10, marginTop: 6, letterSpacing: 0.5 }}>besin-d.vercel.app</div>
         </div>
       </div>
     </div>
   );
 })()}
 <button style={{ ...S.anaBtn, background: C.altin + "14", border: `1px solid ${C.altin}80`, color: C.altin, marginBottom: 8 }} onClick={skorKartPaylas}>Sonucu Paylaş (görsel)</button>

 <button style={S.anaBtn} onClick={() => setEkran("ana")}>← Yeni Tarama</button>

 <ToplulugaKatki taramaSayisi={taramaSayisi} />

 <div style={{ background: C.y2, border: `1px solid ${C.s}`, borderRadius: 12, padding: 14, marginTop: 8 }}>
 <div style={{ color: C.cok, fontSize: 11, lineHeight: 1.6, fontStyle: "normal" }}>
 ️ Bu uygulama bir tıbbi cihaz, teşhis aracı veya ilaç değildir. Verilen bilgiler kamuya açık bilimsel kaynakların (EFSA · WHO · IARC · FDA) arşividir ve tıbbi tavsiye yerine geçmez. Hiçbir firma, marka veya ürün suçlanmamaktadır; yalnızca madde bazlı arşiv bilgisi sunulmaktadır. Burç, makam ve eşref saati bilgileri geleneksel birikime dayanır; modern bilimsel kanıt sınırlıdır. Anayasa Madde 26-28 · AİHS Madde 10 · 6502 Sayılı Tüketicinin Korunması Hakkında Kanun kapsamında bilgi paylaşımı yasal güvence altındadır.
 </div>
 </div>
 </>
 )}
 </div>
 {paylasMaddesi && <PaylasModal madde={paylasMaddesi} onKapat={() => setPaylasMaddesi(null)} rutbeAd={mevcutMertebe().ad} rutbeRenk={mevcutMertebe().renk} lakap={liyakat.lakap} />}
 {yeniMertebeBildirim && (() => {
   const m = MERTEBELER.find(x => x.k === yeniMertebeBildirim);
   if (!m) return null;
   return (
     <div style={{ position: "fixed", inset: 0, background: "#000000C0", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1200, backdropFilter: "blur(6px)", padding: 20 }} onClick={() => setYeniMertebeBildirim(null)}>
       <div style={{ background: `linear-gradient(180deg, ${m.renk}28, ${C.y})`, borderRadius: 20, padding: 30, maxWidth: 380, width: "100%", border: `2px solid ${m.renk}`, textAlign: "center" }} onClick={e => e.stopPropagation()}>
         <div style={{ color: m.renk, fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>MERTEBE YÜKSELDİ</div>
         <div style={{ display: "flex", justifyContent: "center", margin: "10px 0 14px" }}><Muhur k={m.k} boyut={90} /></div>
         <div style={{ color: m.renk, fontSize: 36, fontWeight: 700, letterSpacing: 2, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{m.ad}</div>
         <div style={{ color: C.cok, fontSize: 12, marginTop: 4, fontStyle: "italic" }}>{m.anlam}</div>
         <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.65, marginTop: 16, marginBottom: 20 }}>{m.aciklama}</div>
         <button onClick={() => setYeniMertebeBildirim(null)} style={{ width: "100%", background: m.renk, color: "#fff", border: "none", borderRadius: 12, padding: "13px", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>Devam</button>
       </div>
     </div>
   );
 })()}
 {niyetUyari && (
   <div style={{ position: "fixed", inset: 0, background: "#00000060", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1340, backdropFilter: "blur(4px)", padding: 20 }} onClick={() => setNiyetUyari(false)}>
     <div style={{ background: C.y, borderRadius: 18, padding: 28, maxWidth: 340, width: "100%", border: `1px solid ${C.altin}40`, textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }} onClick={e => e.stopPropagation()}>
       <div style={{ fontSize: 24, marginBottom: 12, color: C.altin, fontFamily: "'Cormorant Garamond', Georgia, serif", opacity: 0.6 }}>﷽</div>
       <div style={{ color: C.cok, fontSize: 10, letterSpacing: 2, marginBottom: 16, fontWeight: 700 }}>NİYETİN</div>
       <div style={{ color: C.metin, fontSize: 18, lineHeight: 1.6, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500, fontStyle: "italic", marginBottom: 10 }}>"{liyakat.niyet}"</div>
       <div style={{ color: C.soluk, fontSize: 13, lineHeight: 1.55, marginBottom: 22 }}>İşte bu yüzden bu ürünü geri koyuyorsun.</div>
       <button onClick={() => setNiyetUyari(false)} style={{ width: "100%", background: "transparent", color: C.altin, border: `1px solid ${C.altin}80`, borderRadius: 10, padding: "11px", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.3 }}>Niyetimi Hatırladım</button>
     </div>
   </div>
 )}
 {mahcubiyetModal && (
   <div style={{ position: "fixed", inset: 0, background: "#000000C0", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1350, backdropFilter: "blur(8px)", padding: 20 }} onClick={() => setMahcubiyetModal(null)}>
     <div style={{ background: `linear-gradient(180deg, ${C.kirmizi}18, ${C.y})`, borderRadius: 18, padding: 26, maxWidth: 380, width: "100%", border: `1.5px solid ${C.kirmizi}60`, textAlign: "center" }} onClick={e => e.stopPropagation()}>
       <div style={{ color: C.kirmizi, fontSize: 10, fontWeight: 700, letterSpacing: 2, marginBottom: 10 }}>MAHCUBİYET LENSİ</div>
       <div style={{ color: C.metin, fontSize: 15, lineHeight: 1.65, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, marginBottom: 12 }}>{mahcubiyetModal.pir.ad} bir an yüzünü çevirdi.</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.65, marginBottom: 18 }}>Bu hafta <b style={{ color: C.kirmizi }}>{mahcubiyetModal.sayim}</b> kez "kaçın" işareti olan ürün taradın. Mertebene yakışan tutum bu değil, {mahcubiyetModal.pir.hitap}.</div>
       <button onClick={() => setMahcubiyetModal(null)} style={{ width: "100%", background: C.kirmizi, color: "#fff", border: "none", borderRadius: 12, padding: "12px", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Anlaşıldı, kendimi toparlayacağım</button>
     </div>
   </div>
 )}
 {tekKelime && (
   <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1380, pointerEvents: "none", background: "#00000020", backdropFilter: "blur(2px)", animation: "tekKelimeGel 0.4s ease-out" }}>
     <div style={{ color: C.altin, fontSize: 42, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700, letterSpacing: 2, textShadow: `0 0 20px ${C.altin}80` }}>{tekKelime}</div>
   </div>
 )}
 {guncelModal && (
   <div style={{ position: "fixed", inset: 0, background: "#00000060", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1310, backdropFilter: "blur(4px)", padding: 20 }} onClick={() => setGuncelModal(null)}>
     <div style={{ background: C.y, borderRadius: 18, padding: 28, maxWidth: 360, width: "100%", border: `1px solid ${C.s}`, textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }} onClick={e => e.stopPropagation()}>
       <div style={{ color: C.altin, fontSize: 10, fontWeight: 600, letterSpacing: 2, marginBottom: 12 }}>PÎR'İN GÜNCELİ</div>
       <div style={{ fontSize: 22, marginBottom: 14, color: C.altin, fontFamily: "'Cormorant Garamond', Georgia, serif", opacity: 0.7 }}>☼</div>
       <div style={{ color: C.metin, fontSize: 15, lineHeight: 1.65, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500, marginBottom: 22 }}>{guncelModal.metin}</div>
       <button onClick={() => setGuncelModal(null)} style={{ width: "100%", background: "transparent", color: C.altin, border: `1px solid ${C.altin}80`, borderRadius: 10, padding: "11px", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.3 }}>Okudum</button>
     </div>
   </div>
 )}
 {paritiAcik && (
   <div style={{ position: "fixed", inset: 0, zIndex: 1395, pointerEvents: "none", overflow: "hidden" }}>
     {Array.from({length: 28}, (_, i) => {
       const x = Math.random() * 100;
       const delay = Math.random() * 0.3;
       const dur = 1 + Math.random() * 0.6;
       const size = 5 + Math.random() * 6;
       return <div key={i} style={{ position: "absolute", left: `${x}%`, top: "100%", width: size, height: size, borderRadius: "50%", background: `radial-gradient(circle, ${C.altinA}, ${C.altin}80, transparent)`, boxShadow: `0 0 ${size}px ${C.altin}`, animation: `pariltiYagmur ${dur}s ${delay}s ease-out forwards` }} />;
     })}
   </div>
 )}
 {serefKart && (() => {
   const m = MERTEBELER.find(x => x.k === serefKart.mertebeK);
   if (!m) return null;
   const h = hicriCevir(new Date());
   return (
     <div style={{ position: "fixed", inset: 0, background: "#000000C0", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1392, backdropFilter: "blur(6px)", padding: 16, overflowY: "auto" }} onClick={() => setSerefKart(null)}>
       <div style={{ maxWidth: 360, width: "100%", margin: "20px 0" }} onClick={e => e.stopPropagation()}>
         <div ref={serefKartRef} style={{ background: `linear-gradient(135deg, ${m.renk}20, #FFF8E1, ${m.renk}15)`, borderRadius: 18, padding: 28, border: `3px double ${m.renk}`, textAlign: "center", boxShadow: `0 8px 32px ${m.renk}30`, position: "relative" }}>
           <div style={{ position: "absolute", top: 8, left: 8, right: 8, bottom: 8, border: `1px solid ${m.renk}50`, borderRadius: 14, pointerEvents: "none" }} />
           <div style={{ color: m.renk, fontSize: 9, fontWeight: 700, letterSpacing: 3, marginBottom: 10, position: "relative" }}>ŞEREF DEFTERİ</div>
           <div style={{ fontSize: 28, color: m.renk, marginBottom: 10, fontFamily: "'Cormorant Garamond', Georgia, serif", position: "relative" }}>✦</div>
           <div style={{ color: C.metin, fontSize: 12, marginBottom: 6, fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", position: "relative" }}>İşbu tarihte</div>
           <div style={{ color: m.renk, fontSize: 26, fontWeight: 700, fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: 1, marginBottom: 4, position: "relative" }}>{liyakat.lakap || pir.hitap}</div>
           <div style={{ color: C.metin, fontSize: 12, marginBottom: 14, fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", position: "relative" }}>mertebesine erişti:</div>
           <div style={{ display: "flex", justifyContent: "center", marginBottom: 8, position: "relative" }}><Muhur k={m.k} boyut={56} /></div>
           <div style={{ color: m.renk, fontSize: 28, fontWeight: 700, fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: 2, position: "relative" }}>{m.ad}</div>
           <div style={{ color: C.cok, fontSize: 11, marginTop: 4, fontStyle: "italic", position: "relative" }}>{m.anlam}</div>
           <div style={{ marginTop: 18, paddingTop: 14, borderTop: `1px dashed ${m.renk}40`, position: "relative" }}>
             <div style={{ color: C.metin, fontSize: 12, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{h.gun} {h.ay} {h.yil}</div>
             <div style={{ color: C.cok, fontSize: 10, marginTop: 2 }}>Mensubiyet · #{siraNoHesapla(liyakat.baslangic)}</div>
             <div style={{ color: m.renk, fontSize: 9, fontWeight: 700, letterSpacing: 2, marginTop: 8 }}>· BESİN DEDEKTİFİ ·</div>
           </div>
         </div>
         <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
           <button onClick={() => setSerefKart(null)} style={{ flex: 1, background: "transparent", color: "#fff", border: `1px solid #ffffff50`, borderRadius: 10, padding: "11px", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Kapat</button>
           <button onClick={serefKartIndir} style={{ flex: 2, background: `linear-gradient(135deg, ${C.altin}, ${C.altinA})`, color: "#1A1200", border: "none", borderRadius: 10, padding: "11px", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.3 }}>İndir / Paylaş</button>
         </div>
       </div>
     </div>
   );
 })()}
 {virdAcik && (
   <div style={{ position: "fixed", inset: 0, background: "linear-gradient(180deg, #0A1628 0%, #1A2B47 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 1395, padding: 20 }} onClick={() => setVirdAcik(false)}>
     <div style={{ color: "#D4AF37", fontSize: 10, fontWeight: 600, letterSpacing: 3, marginBottom: 14, opacity: 0.7 }}>VİRD-İ SOFRA</div>
     <div style={{ color: "#F5E6D3", fontSize: 17, fontFamily: "'Cormorant Garamond', Georgia, serif", textAlign: "center", marginBottom: 30, lineHeight: 1.5, opacity: 0.8, maxWidth: 280 }}>Sofranın bereketi niyetinin temizliğindedir. Bir nefes al, otuz üç tesbih çek.</div>
     <svg width="240" height="240" viewBox="0 0 240 240" style={{ marginBottom: 20 }}>
       {Array.from({length: 33}, (_, i) => {
         const angle = (i / 33) * 2 * Math.PI - Math.PI / 2;
         const cx = 120 + Math.cos(angle) * 90;
         const cy = 120 + Math.sin(angle) * 90;
         const aktif = i < virdSaniye;
         const su = i === virdSaniye - 1;
         return <circle key={i} cx={cx} cy={cy} r={su ? 6 : aktif ? 4.5 : 3} fill={aktif ? "#D4AF37" : "#2A3B57"} opacity={aktif ? 0.95 : 0.5}>
           {su && <animate attributeName="r" values="4.5;7;4.5" dur="0.8s" repeatCount="indefinite" />}
         </circle>;
       })}
       <text x="120" y="115" textAnchor="middle" fill="#D4AF37" fontSize="46" fontFamily="'Cormorant Garamond', Georgia, serif" fontWeight="600">{Math.min(virdSaniye, 33)}</text>
       <text x="120" y="140" textAnchor="middle" fill="#A8B5C9" fontSize="13" letterSpacing="2">/ 33</text>
     </svg>
     <div style={{ color: "#A8B5C9", fontSize: 11, opacity: 0.7, letterSpacing: 1 }}>{virdSaniye >= 33 ? "TAMAM" : "dokun, geç"}</div>
   </div>
 )}
 {bedenKonusuyor && (
   <div style={{ position: "fixed", inset: 0, background: "#00000060", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1360, backdropFilter: "blur(4px)", padding: 20 }} onClick={() => setBedenKonusuyor(null)}>
     <div style={{ background: C.y, borderRadius: 18, padding: 28, maxWidth: 340, width: "100%", border: `1px solid ${C.s}`, textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }} onClick={e => e.stopPropagation()}>
       <div style={{ color: C.altin, fontSize: 10, fontWeight: 600, letterSpacing: 2, marginBottom: 12 }}>BEDENİM KONUŞUYOR</div>
       <div style={{ fontSize: 18, marginBottom: 12, color: C.altin, fontFamily: "'Cormorant Garamond', Georgia, serif", opacity: 0.7 }}>✦</div>
       <div style={{ color: C.metin, fontSize: 17, fontWeight: 600, fontFamily: "'Cormorant Garamond', Georgia, serif", marginBottom: 6, letterSpacing: 0.2 }}>{bedenKonusuyor.organ}</div>
       <div style={{ color: C.metin, fontSize: 14, lineHeight: 1.65, fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontWeight: 400, marginBottom: 22 }}>{bedenKonusuyor.soz}</div>
       <button onClick={() => setBedenKonusuyor(null)} style={{ width: "100%", background: "transparent", color: C.altin, border: `1px solid ${C.altin}80`, borderRadius: 10, padding: "11px", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.3 }}>Duydum, Bedenim</button>
     </div>
   </div>
 )}
 {longPressOgut && (
   <div style={{ position: "fixed", inset: 0, background: "#00000060", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1385, backdropFilter: "blur(4px)", padding: 20 }} onClick={() => setLongPressOgut(null)}>
     <div style={{ background: C.y, borderRadius: 18, padding: 28, maxWidth: 340, width: "100%", border: `1px solid ${C.s}`, textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }} onClick={e => e.stopPropagation()}>
       <div style={{ color: C.altin, fontSize: 10, fontWeight: 600, letterSpacing: 2, marginBottom: 12 }}>PÎR'İN GİZLİ ÖĞÜDÜ</div>
       <div style={{ fontSize: 20, marginBottom: 14, color: C.altin, fontFamily: "'Cormorant Garamond', Georgia, serif", opacity: 0.7 }}>✦</div>
       <div style={{ color: C.metin, fontSize: 15, lineHeight: 1.65, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500, marginBottom: 22 }}>{longPressOgut.metin}</div>
       <button onClick={() => setLongPressOgut(null)} style={{ width: "100%", background: "transparent", color: C.altin, border: `1px solid ${C.altin}80`, borderRadius: 10, padding: "11px", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.3 }}>Anladım</button>
     </div>
   </div>
 )}
 {erbainTamamlandiModal && (
   <div style={{ position: "fixed", inset: 0, background: "#000000C0", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1390, backdropFilter: "blur(8px)", padding: 20 }} onClick={() => setErbainTamamlandiModal(false)}>
     <div style={{ background: `linear-gradient(180deg, ${C.altin}30, #FFF8E1, ${C.y})`, borderRadius: 20, padding: 32, maxWidth: 380, width: "100%", border: `2px solid ${C.altin}`, textAlign: "center", boxShadow: `0 8px 32px ${C.altin}50` }} onClick={e => e.stopPropagation()}>
       <div style={{ color: C.altin, fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 14 }}>ERBÂİN TAMAM</div>
       <div style={{ fontSize: 56, color: C.altin, marginBottom: 16, fontFamily: "'Cormorant Garamond', Georgia, serif", animation: "muhurNefes 4.5s ease-in-out infinite" }}>✦</div>
       <div style={{ color: C.altin, fontSize: 30, fontWeight: 700, fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: 2, marginBottom: 8 }}>HİL'AT</div>
       <div style={{ color: C.metin, fontSize: 14, lineHeight: 1.7, fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", marginBottom: 20 }}>40 gün sebat ettin, {liyakat.lakap || pir.hitap}. Hil'atın daimîdir. {pir.ad} seni şahit tuttu.</div>
       <button onClick={() => setErbainTamamlandiModal(false)} style={{ width: "100%", background: `linear-gradient(135deg, ${C.altin}, ${C.altinA})`, color: "#1A1200", border: "none", borderRadius: 12, padding: "13px", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.5 }}>Şükürler Olsun</button>
     </div>
   </div>
 )}
 {sirModal && (
   <div style={{ position: "fixed", inset: 0, background: "#00000060", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1370, backdropFilter: "blur(4px)", padding: 20 }} onClick={() => setSirModal(null)}>
     <div style={{ background: C.y, borderRadius: 18, padding: 28, maxWidth: 340, width: "100%", border: `1px solid ${C.s}`, textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }} onClick={e => e.stopPropagation()}>
       <div style={{ color: C.altin, fontSize: 10, fontWeight: 600, letterSpacing: 2, marginBottom: 8 }}>PÎR BİR SIR AÇTI · {sirModal.sayi}/4</div>
       <div style={{ color: C.cok, fontSize: 11, marginBottom: 14, fontStyle: "italic" }}>{pir.ad}</div>
       <div style={{ fontSize: 20, marginBottom: 12, color: C.altin, fontFamily: "'Cormorant Garamond', Georgia, serif", opacity: 0.7 }}>✦</div>
       <div style={{ color: C.metin, fontSize: 15, fontWeight: 600, fontFamily: "'Cormorant Garamond', Georgia, serif", marginBottom: 10 }}>{sirModal.sir.baslik}</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.65, marginBottom: 10 }}>{sirModal.sir.metin}</div>
       <div style={{ color: C.cok, fontSize: 10, marginBottom: 22, fontStyle: "italic" }}>— {sirModal.sir.kaynak}</div>
       <button onClick={() => setSirModal(null)} style={{ width: "100%", background: "transparent", color: C.altin, border: `1px solid ${C.altin}80`, borderRadius: 10, padding: "11px", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.3 }}>Sırrı Aldım</button>
     </div>
   </div>
 )}
 <style>{css}</style>
 </div>
 );

 /* ══════════════════════════════════════════════
 ANA EKRAN
 ══════════════════════════════════════════════ */
 return (
 <div style={{ minHeight: "100vh", background: C.bg, maxWidth: 520, margin: "0 auto", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif", paddingBottom: 80 }}>
 <div style={{ display: "flex", alignItems: "center", padding: "12px 16px", background: C.y, borderBottom: `1px solid ${C.s}`, position: "sticky", top: 0, zIndex: 20, gap: 10 }}>
 <span style={{ fontSize: 20 }}></span>
 <div style={{ flex: 1 }}>
 <div style={{ color: C.altin, fontWeight: 700, fontSize: 16, letterSpacing: 0 }}>Besin Dedektifi</div>
 </div>
 <div style={{ display: "flex", alignItems: "center", gap: 7, border: `1px solid ${profil ? profil.renk : C.altin}`, borderRadius: 20, padding: "4px 12px 4px 4px", cursor: "pointer", background: (profil ? profil.renk : C.altin) + "15" }} onClick={() => setEkran("profil_kur")}>
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
 <circle cx="12" cy="12" r="11" fill={(profil ? profil.renk : C.altin) + "30"} stroke={profil ? profil.renk : C.altin} strokeWidth="1.5" />
 <circle cx="12" cy="9" r="3.5" fill={profil ? profil.renk : C.altin} />
 <path d="M5 19c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke={profil ? profil.renk : C.altin} strokeWidth="1.5" strokeLinecap="round" fill="none" />
 </svg>
 <span style={{ color: profil ? profil.renk : C.altin, fontSize: 12, fontWeight: 600 }}>
 {profil ? (liyakat.lakap || profil.burc) : "Profil"}
 </span>
 </div>
 <div onClick={() => setSekme("mertebe")} style={{ display: "flex", alignItems: "center", gap: 5, marginLeft: 6, cursor: "pointer", padding: "3px 8px", borderRadius: 14, background: mevcutMertebe().renk + "20", border: `1px solid ${mevcutMertebe().renk}50` }}>
   <Muhur k={mevcutMertebe().k} boyut={16} />
   <span style={{ color: mevcutMertebe().renk, fontSize: 11, fontWeight: 700 }}>{mevcutMertebe().ad}</span>
 </div>
 </div>

 <div style={{ background: `linear-gradient(90deg,${C.altin}15,transparent)`, borderBottom: `1px solid ${C.altin}20`, padding: "6px 16px", color: C.altin, fontSize: 11, display: "flex", alignItems: "center", gap: 10 }}>
 <div style={{ flex: 1 }}>{es.ikon} {es.saat} · <b>{es.organ}</b> vakti · {es.eylem}</div>
 {(() => {
   const baslangic = new Date(); baslangic.setHours(0,0,0,0);
   const bg = (gecmis || []).filter(g => g.zaman && g.zaman >= baslangic.getTime());
   const t = bg.length;
   const kr = bg.reduce((a,g) => a + (g.kritik || 0), 0);
   const oran = t > 0 ? kr / Math.max(t, 1) : 0;
   const egim = Math.max(-1, Math.min(1, oran * 2 - 0.3));
   const renk = oran < 0.2 ? "#16A34A" : oran < 0.5 ? C.altin : C.kirmizi;
   return (
     <div title={`Bugün ${t} tarama · ${kr} kritik`} style={{ display: "flex", alignItems: "center", gap: 4 }}>
       <svg width="22" height="14" viewBox="0 0 22 14" style={{ overflow: "visible" }}>
         <line x1="11" y1="2" x2="11" y2="6" stroke={renk} strokeWidth="1" />
         <line x1="3" y1="6" x2="19" y2="6" stroke={renk} strokeWidth="1.2" strokeLinecap="round" transform={`rotate(${egim * 18} 11 6)`} />
         <circle cx={3 + (1 - egim) * 0.5} cy={6 + Math.abs(egim) * 1.5} r="1.8" fill={renk} transform={`rotate(${egim * 18} 11 6)`} />
         <circle cx={19 - (1 + egim) * 0.5} cy={6 + Math.abs(egim) * 1.5} r="1.8" fill={renk} transform={`rotate(${egim * 18} 11 6)`} />
       </svg>
       <span style={{ color: renk, fontSize: 10, fontWeight: 700 }}>{t}</span>
     </div>
   );
 })()}
 {profil && profil.dogum && (() => {
   const dogum = new Date(profil.dogum).getTime();
   const yas = (Date.now() - dogum) / (365.25 * 86400000);
   const oran = Math.max(0, Math.min(1, yas / 80));
   const erimisYukseklik = oran * 10;
   return (
     <div title={`Yaşın: ${Math.floor(yas)} · Ömrünün %${Math.round(oran*100)}`} style={{ display: "flex", alignItems: "center" }}>
       <svg width="9" height="16" viewBox="0 0 9 16">
         <rect x="2.5" y={1.5 + erimisYukseklik} width="4" height={12 - erimisYukseklik} fill={C.altin} opacity="0.85" rx="0.5" />
         <ellipse cx="4.5" cy={1.5 + erimisYukseklik} rx="2.2" ry="0.6" fill={C.altinA} />
         <path d={`M4.5 ${1.5 + erimisYukseklik - 0.5} Q5.2 ${0.5 + erimisYukseklik} 4.5 ${-0.5 + erimisYukseklik} Q3.8 ${0.5 + erimisYukseklik} 4.5 ${1.5 + erimisYukseklik - 0.5}`} fill="#FFA500" />
       </svg>
     </div>
   );
 })()}
 </div>

 <div key={`sekme-${sekme}`} style={{ padding: 16, animation: ["tarama","profil","mertebe","hizmetler","atm","hakkinda"].includes(sekme) ? "sayfaGec 0.22s ease-out" : "altsayfaGir 0.25s ease-out" }}>
 {/* TARAMA */}
 {sekme === "tarama" && (
 <div>
 <div style={{ textAlign: "center", padding: "8px 16px 16px" }}>
   <div key={manifestoIdx} style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, color: C.altin, fontStyle: "italic", letterSpacing: 0.3, lineHeight: 1.25, fontWeight: 600, animation: "manifestoGec 1.6s ease-out" }}>
     "{MANIFESTOLAR[manifestoIdx]}"
   </div>
   <div style={{ color: C.cok, fontSize: 9, marginTop: 6, letterSpacing: 2.5, textTransform: "uppercase", fontWeight: 700 }}>· Besin Dedektifi ·</div>
 </div>
 {(() => {
   const tehlikeli = Object.entries(GIDA_DB).filter(([, v]) => v.risk === "kritik" || v.risk === "yuksek");
   if (!tehlikeli.length) return null;
   const gunNo = Math.floor(Date.now() / 86400000);
   const [kod, v] = tehlikeli[gunNo % tehlikeli.length];
   return (
     <div onClick={() => setModal({ kod, ...v })} style={{ background: `linear-gradient(135deg, #E74C3C14, ${C.y2})`, border: `1px solid #E74C3C40`, borderRadius: 14, padding: "12px 14px", marginBottom: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
       <div style={{ width: 44, height: 44, borderRadius: "50%", border: "2px solid #E74C3C", background: "#E74C3C12", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
         <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E74C3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
       </div>
       <div style={{ flex: 1, minWidth: 0 }}>
         <div style={{ color: "#E74C3C", fontSize: 9, fontWeight: 800, letterSpacing: 1.2, textTransform: "uppercase" }}>Günün Zararlısı</div>
         <div style={{ color: C.metin, fontSize: 14, fontWeight: 700, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v.ad}</div>
         <div style={{ color: C.cok, fontSize: 11, marginTop: 1 }}>{v.kat} · detay için dokun</div>
       </div>
       <span style={{ color: C.cok, fontSize: 16, flexShrink: 0 }}>→</span>
     </div>
   );
 })()}
 {(() => {
   const haftaBas = Date.now() - 7 * 86400000;
   const buHafta = (gecmis || []).filter(g => g.zaman && g.zaman >= haftaBas).length;
   const buHaftaKritik = (gecmis || []).filter(g => g.zaman && g.zaman >= haftaBas).reduce((a, g) => a + (g.kritik || 0), 0);
   return (
     <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
       <div style={{ background: `linear-gradient(135deg, ${C.altin}18, ${C.y2})`, border: `1px solid ${C.altin}40`, borderRadius: 12, padding: "10px 10px" }}>
         <div style={{ color: C.soluk, fontSize: 9, fontWeight: 700, letterSpacing: 0.5 }}>TOPLAM</div>
         <div style={{ color: C.altin, fontSize: 22, fontWeight: 800, lineHeight: 1, marginTop: 2 }}>{taramaSayisi}</div>
         <div style={{ color: C.cok, fontSize: 10, marginTop: 1 }}>tarama</div>
       </div>
       <div style={{ background: C.yesil + "08", border: `1px solid ${C.yesil}26`, borderRadius: 12, padding: "10px 10px" }}>
         <div style={{ color: C.soluk, fontSize: 9, fontWeight: 700, letterSpacing: 0.5 }}>BU HAFTA</div>
         <div style={{ color: C.yesil, fontSize: 22, fontWeight: 800, lineHeight: 1, marginTop: 2 }}>{buHafta}</div>
         <div style={{ color: C.cok, fontSize: 10, marginTop: 1 }}>tarama</div>
       </div>
       <div style={{ background: `linear-gradient(135deg, #E74C3C18, ${C.y2})`, border: `1px solid #E74C3C40`, borderRadius: 12, padding: "10px 10px" }}>
         <div style={{ color: C.soluk, fontSize: 9, fontWeight: 700, letterSpacing: 0.5 }}>KRİTİK</div>
         <div style={{ color: "#E74C3C", fontSize: 22, fontWeight: 800, lineHeight: 1, marginTop: 2 }}>{buHaftaKritik}</div>
         <div style={{ color: C.cok, fontSize: 10, marginTop: 1 }}>bulgu</div>
       </div>
     </div>
   );
 })()}

 <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
   <button onClick={() => setSaglikModalAcik(true)} style={{ flex: 1, background: C.y, border: `1px solid ${saglikDurumu.length ? "#E74C3C" : C.s}`, borderRadius: 10, padding: "9px 12px", cursor: "pointer", fontFamily: "Inter, sans-serif", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
     <span style={{ color: C.metin, fontSize: 12, fontWeight: 700 }}>Sağlık Durumum</span>
     <span style={{ color: saglikDurumu.length ? "#E74C3C" : C.cok, fontSize: 11, fontWeight: 700 }}>{saglikDurumu.length ? `${saglikDurumu.length} seçili` : "yok"}</span>
   </button>
   <button onClick={() => setAylikRaporAcik(true)} style={{ flex: 1, background: C.y, border: `1px solid ${C.s}`, borderRadius: 10, padding: "9px 12px", cursor: "pointer", fontFamily: "Inter, sans-serif", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
     <span style={{ color: C.metin, fontSize: 12, fontWeight: 700 }}>Aylık Rapor</span>
     <span style={{ color: C.cok, fontSize: 11 }}>→</span>
   </button>
 </div>

 {/* KATEGORİ SEÇİMİ — 8 kategori grid */}
 <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginBottom: 16 }}>
 {Object.entries(KATEGORILER).map(([k, v]) => (
 <button key={k} onClick={() => setKategori(k)} style={{ padding: "10px 4px", borderRadius: 10, border: `2px solid ${kategori === k ? C.altin : C.s}`, background: kategori === k ? C.altin + "18" : C.y, color: kategori === k ? C.altin : C.soluk, cursor: "pointer", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontSize: 11, fontWeight: kategori === k ? 700 : 500, lineHeight: 1.2 }}>{v.ad}</button>
 ))}
 </div>
 <div style={S.kB}>{KATEGORILER[kategori].ad.toUpperCase()} ETİKETİ ANALİZİ</div>

 {/* MOD SEÇİMİ: METİN / KAMERA / BARKOD / FOTO+İSİM */}
 <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8, marginBottom: 12 }}>
 {[["metin", "Metin Gir", false], ["kamera", "Kamera ile Tara", false], ["barkod", "Barkod / QR", true], ["fotoisim", "Foto + İsim", true]].map(([k, l, yakinda]) => (
 <button key={k} onClick={() => setMod(k)} style={{ position: "relative", padding: "11px 6px", borderRadius: 12, border: `2px solid ${mod === k ? C.altin : C.s}`, background: mod === k ? C.altin + "18" : C.y, color: mod === k ? C.altin : C.soluk, cursor: "pointer", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontSize: 13, fontWeight: mod === k ? 700 : 400 }}>
 {l}
 {yakinda && <span style={{ position: "absolute", top: -7, right: -4, background: C.altin, color: "#1A1200", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 8, letterSpacing: 0.3 }}>YAKINDA</span>}
 </button>
 ))}
 </div>

 {mod === "kamera" ? (
 <KameraOCR onMetin={m => { setTxt(m); setMod("metin"); yapAnaliz(m); }} onIptal={() => setMod("metin")} />
 ) : mod === "barkod" ? (
 <div style={{ background: `linear-gradient(135deg, ${C.altin}18, ${C.y2})`, border: `1px solid ${C.altin}55`, borderRadius: 12, padding: "14px 16px", marginBottom: 14 }}>
   <div style={{ color: C.altin, fontWeight: 700, fontSize: 12, letterSpacing: 0.5, marginBottom: 6 }}>★ YAKINDA — MOBİL UYGULAMADA</div>
   <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
     Mobil uygulama sürümünde <b>barkod ve QR taraması</b> aktif olacak. Ürünü okutunca adı ve içindekiler listesi otomatik gelecek.
   </div>
   <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.altin}30` }}>
     <b style={{ color: C.metin }}>Şimdilik:</b> İçindekiler listesini "Metin Gir" sekmesine elle yapıştırabilir veya "Kamera ile Tara" ile etiket fotoğrafından okutabilirsin.
   </div>
   <button onClick={() => setMod("metin")} style={{ width:"100%", marginTop:12, background:"none", border:`1px solid ${C.s}`, borderRadius:10, padding:10, color:C.soluk, cursor:"pointer" }}>Geri</button>
 </div>
 ) : mod === "fotoisim" ? (
 <FotoIsim kategoriAd={KATEGORILER[kategori].ad} onAra={(isim) => { setTxt(isim); yapAnaliz(isim); }} onIptal={() => setMod("metin")} />
 ) : (
 <>
 <div style={S.ipucu}>{KATEGORILER[kategori].ipucu}</div>
 <textarea style={S.textarea} rows={5} placeholder="Etiket içeriğini buraya yapıştır..." value={txt} onChange={e => setTxt(e.target.value)} />
 <button style={{ ...S.anaBtn, opacity: txt.trim() ? 1 : 0.4 }} onClick={yapAnaliz} disabled={!txt.trim()}> {KATEGORILER[kategori].ad} Arşivinde Ara</button>
 </>
 )}

 <div style={S.kB}>HIZLI TEST</div>
 {({
 gida: [
 ["Gazlı İçecek", "E150d, E338, E330, kafein, E621"],
 ["Hazır Çorba", "MSG, E621, E635, mısır şurubu, E471, palmiye yağı"],
 ["Şeker Bisküvi", "aspartam, E102, E211, titanyum dioksit, BHA, palmiye yağı"],
 ["Salam/Sosis", "sodyum nitrit, E250, E452, E635, E211"],
 ],
 giyim: [
 ["Spor Tişört", "Polyester, mikrofiber, PFAS"],
 ["Spor Ayakkabı", "PU deri, naylon, DMF"],
 ["Çanta", "PVC, PU deri, nikel"],
 ["Yağmurluk", "Naylon, PFAS, alev geciktirici"],
 ],
 ev: [
 ["MDF Mobilya", "formaldehit, voc cila"],
 ["Modern Koltuk", "HBCD, pu sünger, PFAS halı"],
 ["Halı", "permetrin pestisit, PFAS, formaldehit"],
 ["Plastik Perde", "PVC perde, ftalat"],
 ],
 kozmetik: [
 ["Şampuan", "SLS, paraben, sentetik parfüm"],
 ["Krem", "paraben, PEG bileşikler, mineral yağ"],
 ["Güneş Kremi", "oxybenzone, paraben"],
 ["Oje", "toluen, ftalat"],
 ],
 temizlik: [
 ["Çamaşır Suyu", "klorin çamaşır suyu"],
 ["Yüzey Temizleyici", "amonyak, quats, sentetik parfüm"],
 ["Çamaşır Deterjanı", "fosfat, optik beyazlatıcı, NPE"],
 ["Tuvalet Bloğu", "diklorbenzen, sentetik parfüm"],
 ],
 bebek: [
 ["Plastik Biberon", "BPA, BPS"],
 ["Yumuşak Oyuncak", "ftalat oyuncak, TBT"],
 ["Bebek Şampuanı", "paraben bebek şampuan, sentetik parfüm"],
 ["Bebek Maması", "palm yağı mama, glifosat mama"],
 ],
 evcil: [
 ["Kuru Mama", "BHA mama, BHT mama, etoksiquin"],
 ["Pire Tasması", "flea collar TCVP, fipronil"],
 ["Renkli Köpek Maması", "yapay renk mama, BHA"],
 ["Tehlikeli İnsan Yiyecekleri", "çikolata, soğan sarımsak, ksilitol"],
 ],
 ilac: [
 ["Yüksek Doz Vitamin", "megadoz A vitamini, megadoz D vitamini"],
 ["Bitkisel Zayıflama", "efedra, kava kava"],
 ["Uzun Süre Ağrı Kesici", "parasetamol doz aşımı, NSAID uzun süre"],
 ["Mide İlacı", "PPI uzun süre"],
 ],
 }[kategori] || []).map(([label, v]) => (
 <button key={label} style={S.ornekBtn} onClick={() => setTxt(v)}>
 <span style={{ color: C.metin }}>{label}</span>
 <span style={{ color: C.altin }}>→</span>
 </button>
 ))}
 </div>
 )}

 {/* PROFİL */}
 {sekme === "profil" && (
 <div>
 {profil ? (
 <>
 <div style={{ textAlign: "center", marginBottom: 18, position: "relative" }}>
 <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", width: 240, height: 200, background: `radial-gradient(ellipse at center, ${profil.renk}18, transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />
 <div style={{ position: "relative", zIndex: 1 }}>
 <div style={{ width: 96, height: 96, borderRadius: "50%", padding: 3, background: `conic-gradient(from 180deg, ${profil.renk}, ${C.altin}, ${profil.renk})`, margin: "0 auto 12px", boxShadow: `0 0 18px ${profil.renk}40`, animation: "muhurNefes 5s ease-in-out infinite" }}>
 <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
 <svg width="46" height="46" viewBox="0 0 24 24" fill={profil.renk} xmlns="http://www.w3.org/2000/svg">
 <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.4c-3.3 0-9.8 1.6-9.8 4.9v2.4h19.6v-2.4c0-3.3-6.5-4.9-9.8-4.9z"/>
 </svg>
 </div>
 </div>
 <div style={{ color: C.metin, fontSize: 22, fontWeight: 700 }}>{profil.burc}</div>
 <div style={{ color: C.soluk, fontSize: 13, fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: 0.3, marginTop: 2 }}>{profil.element} unsuru · {profil.mizac} mizacı · {profil.organ}</div>
 {(() => {
 const m = mevcutMertebe();
 const krit = gecmis.slice(0, 5).reduce((a, g) => a + (g.kritik || 0), 0);
 const h = new Date().getHours();
 const selam = h < 6 ? "Geceler hayrola" : h < 11 ? "Sabah-ı şerifin hayrola" : h < 17 ? "Vaktin bereketli olsun" : h < 21 ? "Akşamın hayrola" : "Geceler hayrola";
 const hal = !gecmis.length ? "henüz dosyan açılmadı" : krit === 0 ? "dosyan temiz seyrediyor" : "dosyanda dikkat isteyen kayıtlar var";
 return <div style={{ color: C.soluk, fontSize: 14, marginTop: 12, fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", lineHeight: 1.45 }}>{selam}, <b style={{ color: m.renk, fontStyle: "normal" }}>{m.ad}</b>{liyakat.lakap ? ` ${liyakat.lakap}` : ""}. {hal}.</div>;
 })()}
 </div>
 </div>
 {/* PREMIUM: SİCİL-İ AHVÂL */}
 {(() => {
 const top = taramaSayisi || gecmis.length;
 if (!top) return null;
 const krit = gecmis.reduce((a, g) => a + (g.kritik || 0), 0);
 const temiz = gecmis.filter(g => (g.kritik || 0) === 0).length;
 const oran = gecmis.length ? Math.round(temiz / gecmis.length * 100) : 0;
 const org = {}; gecmis.forEach(g => (g.organlar || []).forEach(o => org[o] = (org[o] || 0) + 1));
 const enOrgan = Object.entries(org).sort((a, b) => b[1] - a[1])[0];
 const gun = Math.max(1, Math.ceil((Date.now() - (liyakat.baslangic || Date.now())) / 86400000));
 return (
 <div style={{ ...PK.kart, animation: "manifestoGec 0.4s ease-out 0.05s both" }}>
 <div style={PK.baslik}><span style={PK.cizgi} />SİCİL-İ AHVÂL</div>
 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
 <div style={{ textAlign: "center" }}><div style={{ color: C.metin, fontSize: 24, fontWeight: 700, fontFamily: "'Cormorant Garamond', Georgia, serif" }}><CountUp value={top} /></div><div style={{ color: C.cok, fontSize: 10, letterSpacing: 0.5 }}>TARAMA</div></div>
 <div style={{ textAlign: "center" }}><div style={{ color: C.kirmizi, fontSize: 24, fontWeight: 700, fontFamily: "'Cormorant Garamond', Georgia, serif" }}><CountUp value={krit} /></div><div style={{ color: C.cok, fontSize: 10, letterSpacing: 0.5 }}>KRİTİK BULGU</div></div>
 <div style={{ textAlign: "center" }}><div style={{ color: C.yesil, fontSize: 24, fontWeight: 700, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>%<CountUp value={oran} /></div><div style={{ color: C.cok, fontSize: 10, letterSpacing: 0.5 }}>TEMİZ GEÇEN</div></div>
 </div>
 {enOrgan && <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.5, marginTop: 12, paddingTop: 10, borderTop: `1px solid ${C.s}` }}>Dosyana göre en çok <b style={{ color: profil.renk }}>{enOrgan[0]}</b> bölgen yoruldu · {gun}. gününde âsitânedesin</div>}
 </div>
 );
 })()}
 {/* PREMIUM: MERTEBE İLERLEME */}
 {(() => {
 const puan = liyakat.puan || 0;
 const cur = MERTEBELER.filter(m => puan >= m.esik).pop() || MERTEBELER[0];
 const sonraki = sonrakiMertebe(puan);
 const taban = cur.esik;
 const tavan = sonraki ? sonraki.esik : cur.esik;
 const yuzde = sonraki ? Math.min(100, Math.round((puan - taban) / (tavan - taban) * 100)) : 100;
 return (
 <div style={{ ...PK.kart, animation: "manifestoGec 0.4s ease-out 0.19s both" }}>
 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
 <span style={{ color: cur.renk, fontSize: 14, fontWeight: 700, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{cur.ad}</span>
 <span style={{ color: C.cok, fontSize: 11 }}><CountUp value={puan} /> liyakat</span>
 </div>
 <div style={{ height: 8, background: C.s, borderRadius: 6, overflow: "hidden", position: "relative" }}>
 <div style={{ width: `${yuzde}%`, height: "100%", background: `linear-gradient(90deg, ${cur.renk}, ${C.altin})`, borderRadius: 6, transition: "width 1s ease 0.2s", boxShadow: `0 0 8px ${C.altin}80` }} />
 </div>
 <div style={{ color: C.soluk, fontSize: 12, marginTop: 8 }}>{sonraki ? `${sonraki.ad} olmana ${Math.max(0, tavan - puan)} liyakat kaldı` : "En yüksek mertebedesin"}</div>
 </div>
 );
 })()}
 {/* PREMIUM: GÜNÜN KİŞİSEL VİRD'İ */}
 {(() => {
 const bitkiler = (profil.bitki || "").split("·").map(s => s.trim()).filter(Boolean);
 const gunIdx = Math.floor(Date.now() / 86400000);
 const bitki = bitkiler.length ? bitkiler[gunIdx % bitkiler.length] : profil.bitki;
 return (
 <div style={{ background: `linear-gradient(135deg, ${profil.renk}18, ${C.y2})`, border: `1px solid ${profil.renk}40`, borderRadius: 14, padding: 16, marginBottom: 10, animation: "manifestoGec 0.4s ease-out 0.26s both" }}>
 <div style={{ ...PK.baslik, color: profil.renk }}><span style={{ ...PK.cizgi, background: `linear-gradient(90deg, ${profil.renk}, transparent)` }} />BUGÜNE ÖZEL VİRD</div>
 <div style={{ color: C.metin, fontSize: 15, fontWeight: 600, marginBottom: 4, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{profil.zikir}</div>
 <div style={{ color: C.soluk, fontSize: 13 }}>Bugünün şifa bitkisi: <b style={{ color: profil.renk }}>{bitki}</b></div>
 </div>
 );
 })()}
 <div style={PK.kart}>
 <div style={{ ...PK.baslik, color: C.turuncu }}><span style={{ ...PK.cizgi, background: `linear-gradient(90deg, ${C.turuncu}, transparent)` }} />KAÇINMAN GEREKEN MADDELER</div>
 <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
 {profil.kacinmasi.map(k => <span key={k} style={{ background: "#ff2d5520", color: C.kirmizi, border: "1px solid #ff2d5540", borderRadius: 20, padding: "3px 10px", fontSize: 11 }}>{k}</span>)}
 </div>
 </div>
 <div style={PK.kart}>
 <div style={{ ...PK.baslik, color: C.yesil }}><span style={{ ...PK.cizgi, background: `linear-gradient(90deg, ${C.yesil}, transparent)` }} />BESLENME TAVSİYESİ</div>
 <div style={{ color: C.soluk, fontSize: 13, lineHeight: 1.55 }}>{profil.tavsiye}</div>
 </div>
 {MAKAMLAR[profil.makam] && (
 <div style={{ ...PK.kart, borderColor: `${MAKAMLAR[profil.makam].renk}40` }}>
 <div style={{ ...PK.baslik, color: MAKAMLAR[profil.makam].renk }}><span style={{ ...PK.cizgi, background: `linear-gradient(90deg, ${MAKAMLAR[profil.makam].renk}, transparent)` }} />ŞİFA MAKAMIN · {profil.makam}</div>
 <div style={{ color: C.soluk, fontSize: 13, lineHeight: 1.55 }}>{MAKAMLAR[profil.makam].etki}</div>
 <div style={{ color: C.cok, fontSize: 11, marginTop: 6 }}>{MAKAMLAR[profil.makam].vakit} · {MAKAMLAR[profil.makam].aletler}</div>
 </div>
 )}
 <button style={S.hayaletBtn} onClick={() => setEkran("profil_kur")}>Profili Değiştir</button>
        <button style={{ ...S.hayaletBtn, marginTop: 8 }} onClick={() => setEkran("gecmis")}>Tarama Geçmişi ({gecmis.length})</button>
        <button style={{ ...S.hayaletBtn, marginTop: 8 }} onClick={() => setRaporAcik(true)}>Haftalık Rapor</button>
        <button style={{ ...S.hayaletBtn, marginTop: 8 }} onClick={() => setMarketAcik(true)}>Mizaç Market Listesi</button>
 <div style={{ ...S.notUyari, textAlign: "center", marginTop: 6 }}>* Burç ve mizaç bilgileri İbn Sînâ geleneği ile geleneksel astroloji-tıp birikimine dayanır. Modern bilimsel kanıt sınırlıdır.</div>
 </>
 ) : (
 <div style={{ textAlign: "center", padding: "60px 20px" }}>
 <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>
 <svg width="80" height="80" viewBox="0 0 24 24" fill={C.altin} xmlns="http://www.w3.org/2000/svg">
 <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.4c-3.3 0-9.8 1.6-9.8 4.9v2.4h19.6v-2.4c0-3.3-6.5-4.9-9.8-4.9z"/>
 </svg>
 </div>
 <div style={{ color: C.metin, fontSize: 20, marginBottom: 10 }}>Profil Kurulmamış</div>
 <div style={{ color: C.soluk, fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>Doğum tarihini girerek kişisel mizaç arşiv notları al.</div>
 <button style={S.anaBtn} onClick={() => setEkran("profil_kur")}>Profil Kur →</button>
 </div>
 )}
 </div>
 )}

 {/* MAKAM */}
 {/* MARKET (Yakında) */}
 {sekme === "hizmetler" && (() => {
   const HIZ_GRUPLAR = [
     {
       baslik: "DESTEK & HİZMET",
       hizmetler: [
         { k: "market", baslik: "Şifalı Market", sembol: "❖", ozet: "Doğal alternatif ürünler, yerel üretici ağı. Mertebene göre Şifa Akçesi indirimi (Kalfa %5 · Kethüda %10 · Hekimbaşı %15)." },
         { k: "uzman", baslik: "Görüntülü Uzman", sembol: "◐", ozet: "Fitoterapi uzmanı / diyetisyen ile 10 dk görüşme." },
       ],
     },
     {
       baslik: "TIBB-I NEBEVİ & GELENEKSEL",
       hizmetler: [
         { k: "asude", baslik: "Şadırvân-ı Şifa", sembol: "≈", ozet: "Osmanlı Darüşşifa protokolü: su sesi + makam arşivi + akustik fıtrat uyumlaması." },
         { k: "esref", baslik: "Eşref Saatleri", sembol: "☉", ozet: "Organ vakitleri — sirkadiyen ritim + meridyen takvimi." },
         { k: "burclar", baslik: "Burçlar & Mizaç", sembol: "✦", ozet: "12 burcun organ-bitki-E kodu tablosu, Osmanlı tıbbı." },
         { k: "rabita", baslik: "Râbıta-i Şifa", sembol: "🕌", ozet: "Kolektif Şifa Saati — binlerce kişiyle aynı anda odaklan." },
         { k: "tohum", baslik: "Milli Tohum", sembol: "❀", ozet: "Genetik Sadakat puanı: hibrit/GDO vs atalık Anadolu tohumu." },
         { k: "uyku", baslik: "Uyku Kalkanı", sembol: "☾", ozet: "REM restorasyonu, yatak/tekstil/rüya frekansı analizi." },
         { k: "koku", baslik: "Koku Takvimi", sembol: "❋", ozet: "Burç-gezegen saatine göre koku takvimi, esansiyel yağ önerisi." },
         { k: "rota", baslik: "Evliya Çelebi Rotası", sembol: "✧", ozet: "Konum bazlı tarihi şifahane, kaynak suyu ve kadim aktar rotası." },
         { k: "yildiz", baslik: "Yıldız Saati", sembol: "★", ozet: "Ay fazı ve gezegen saatlerine göre kan akışı, hacamat vakti." },
       ],
     },
     {
       baslik: "TEKNOLOJİK & AI",
       hizmetler: [
         { k: "goz", baslik: "Göz ve Yüz Analizi", sembol: "◉", ozet: "Basiret + Firaset: iris ve fizyonomi taraması." },
         { k: "biyofoton", baslik: "Biyo-Foton Kamera", sembol: "✺", ozet: "Gıdanın yaşam enerjisini (aura) ölçen kamera." },
         { k: "toprak", baslik: "Toprak Frekansı", sembol: "⏚", ozet: "GPS ile jeopatik stres ve manyetik alan analizi." },
         { k: "bahce", baslik: "Akıllı Bahçe", sembol: "❦", ozet: "Mizaç odaklı tohum kitleri, AI ile bitki takibi." },
         { k: "emf", baslik: "EMF Kalkanı", sembol: "⚡", ozet: "Wi-Fi / 5G elektromanyetik kirlilik ölçümü ve kalkan önerileri." },
         { k: "dopamin", baslik: "Dopamin Skoru", sembol: "✜", ozet: "Nöro-gıda analizi: ürünün irade merkezi (Ön Lob) etkisi." },
         { k: "zihin", baslik: "Zihni İnşa", sembol: "◇", ozet: "Ekran zehirlenmesi, IQ-beslenme, öğrenme mizaçları." },
         { k: "ses", baslik: "Ses Frekans Analizi", sembol: "♬", ozet: "Sesindeki titreşimden mizaç bozulması tespiti, makam-renk önerisi." },
         { k: "nabiz", baslik: "İlm-i Nabız", sembol: "⌇", ozet: "Osmanlı nabız ilminin AI yorumu — Safravi/Demevi/Balgami tespit." },
         { k: "hrv", baslik: "Duygusal Nabız (HRV)", sembol: "♥", ozet: "Kalp atış hızı değişkenliği ile stres/huzur tespiti, makam ve nefes yönlendirmesi." },
         { k: "nefes", baslik: "Dijital Burun", sembol: "≋", ozet: "Nefes molekülleri + Mizac-ı Hava analizi, buhurdanlık önerileri." },
         { k: "sesrengi", baslik: "Sesin Rengi (Bio-Acoustic)", sembol: "◍", ozet: "Ses frekans/tını analizi ile çakra ve organ tıkanıklığı tespiti." },
       ],
     },
   ];
   const q = hizArama.trim().toLocaleLowerCase("tr");
   const filtreliGruplar = HIZ_GRUPLAR
     .filter(g => hizFiltre === "hepsi" || g.baslik === hizFiltre)
     .map(g => ({ ...g, hizmetler: g.hizmetler.filter(h => !q || h.baslik.toLocaleLowerCase("tr").includes(q) || (h.ozet || "").toLocaleLowerCase("tr").includes(q)) }))
     .filter(g => g.hizmetler.length > 0);
   const toplamSonuc = filtreliGruplar.reduce((a, g) => a + g.hizmetler.length, 0);
   return (
     <div>
       <div style={S.kB}>HİZMETLER PANOSU</div>
       <div style={S.ipucu}>Tüm modüller kategorilere göre düzenli. Hepsi yakında aktif olacak.</div>


       <div style={{ display: "flex", gap: 8, marginBottom: 18, overflowX: "auto", paddingBottom: 2 }}>
         {[["hepsi", "Hepsi"], ...HIZ_GRUPLAR.map(g => [g.baslik, g.baslik])].map(([k, l]) => (
           <button key={k} onClick={() => setHizFiltre(k)} style={{ flexShrink: 0, background: hizFiltre === k ? C.altin : C.y, color: hizFiltre === k ? "#1A1200" : C.soluk, border: `1px solid ${hizFiltre === k ? C.altin : C.s}`, borderRadius: 20, padding: "6px 14px", fontSize: 11, fontWeight: 700, letterSpacing: 0.3, cursor: "pointer", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif", whiteSpace: "nowrap" }}>{l}</button>
         ))}
       </div>

       {toplamSonuc === 0 ? (
         <div style={{ textAlign: "center", color: C.soluk, fontSize: 13, padding: "40px 20px", fontStyle: "italic" }}>"{hizArama}" için hizmet bulunamadı.</div>
       ) : filtreliGruplar.map(g => (
         <div key={g.baslik} style={{ marginBottom: 22 }}>
           <div style={{ color: C.altin, fontSize: 11, fontWeight: 700, letterSpacing: 1.2, marginBottom: 12, paddingLeft: 4, borderLeft: `3px solid ${C.altin}`, lineHeight: 1.3 }}>{g.baslik}</div>
           <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
             {g.hizmetler.map(h => (
               <button key={h.k} onClick={() => { hizmetlerScrollRef.current = window.scrollY; setSekme(h.k); }} style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 14, padding: "20px 10px", cursor: "pointer", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                 <span style={{ width: 48, height: 48, borderRadius: 12, background: `linear-gradient(135deg, ${C.altin}, ${C.altinA})`, color: "#1A1200", fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>{h.sembol}</span>
                 <span style={{ color: C.metin, fontSize: 13, fontWeight: 700, textAlign: "center", lineHeight: 1.2 }}>{h.baslik}</span>
               </button>
             ))}
           </div>
         </div>
       ))}
     </div>
   );
 })()}

 {sekme === "sesrengi" && (
   <div>
     <button onClick={() => setSekme("hizmetler")} style={{ display:"inline-flex", alignItems:"center", gap:6, background:C.y, border:`1px solid ${C.s}`, borderRadius:10, padding:"8px 14px", color:C.altin, cursor:"pointer", fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontSize:13, fontWeight:700, marginBottom:14 }}>← Hizmetlere Dön</button>
     <div style={S.kB}>SESİN RENGİ — BIO-ACOUSTIC ANALİZ <span style={{ background: C.altin, color: "#1A1200", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 6, letterSpacing: 0.3, marginLeft: 6, verticalAlign: "middle" }}>YAKINDA</span></div>
     <div style={S.ipucu}>İnsan sesi ruhun röntgenidir. Frekans aralığı, tını ve gizli titremeler organ-çakra tıkanıklığını gösterir.</div>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 12 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>◐ SESLE TEŞHİS — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         "Bugün nasılım?" diye soruşunda AI sesindeki frekans aralığını, tınısını ve gizli titremeleri analiz eder.
       </div>
     </div>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 14 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>◑ SESLE TEDAVİ (REZONANS) — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         Tespit edilen tıkanıklığa karşı kişiselleştirilmiş <b>makam, zikir veya ilahi</b> rezonans reçetesi.
       </div>
       <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.altin}30` }}>
         <b style={{ color: C.metin }}>Örnek:</b> "Sesindeki frekans düşük — tiroid (boğaz çakrası / gudde-i teyroid) bölgende enerji tıkanıklığı var. Rast Makamı'nda zikir/ilahi ile o bölgeyi rezonansa getir."
       </div>
     </div>

     <div style={{ color: C.soluk, fontSize: 11, lineHeight: 1.6, padding: 12, background: C.y2, borderRadius: 8, fontStyle: "italic", border: `1px dashed ${C.s}` }}>
       Bu özellik kültürel ve bilgilendirme amaçlı sunulacaktır. Teşhis ve tedavi için tıp doktoruna danışınız.
     </div>
   </div>
 )}

 {sekme === "yildiz" && (
   <div>
     <button onClick={() => setSekme("hizmetler")} style={{ display:"inline-flex", alignItems:"center", gap:6, background:C.y, border:`1px solid ${C.s}`, borderRadius:10, padding:"8px 14px", color:C.altin, cursor:"pointer", fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontSize:13, fontWeight:700, marginBottom:14 }}>← Hizmetlere Dön</button>
     <div style={S.kB}>YILDIZ SAATİ & KAN AKIŞI <span style={{ background: C.altin, color: "#1A1200", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 6, letterSpacing: 0.3, marginLeft: 6, verticalAlign: "middle" }}>YAKINDA</span></div>
     <div style={S.ipucu}>Osmanlı'da ameliyatlar bile Ay'ın konumuna göre yapılırdı. Vücut sıvıları med-cezir etkisinde, kan akışı gezegen saatleriyle bağlantılı.</div>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 12 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>◐ AY FAZI & MED-CEZİR — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         Damardaki kan akış hızı ve sıvı dengesi, o anki Ay fazıyla eşleştirilir.
       </div>
       <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.altin}30` }}>
         <b style={{ color: C.metin }}>Örnek:</b> "Bugün Dolunay — vücudunda ödem artıyor, kanın daha akışkan. Hacamat için en yüksek şifa vakti."
       </div>
     </div>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 14 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>◑ GEZEGEN SAATLERİ — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         Merkür, Venüs, Mars, Jüpiter... her gezegenin saatine göre sinir sistemi/iletim/iştah yönlendirmesi.
       </div>
       <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.altin}30` }}>
         <b style={{ color: C.metin }}>Örnek:</b> "Merkür retrosu — sinir sisteminin elektriksel iletimi yavaş. Ağır gıdalardan kaçın, zihni bulandırma."
       </div>
     </div>

     <div style={{ color: C.soluk, fontSize: 11, lineHeight: 1.6, padding: 12, background: C.y2, borderRadius: 8, fontStyle: "italic", border: `1px dashed ${C.s}` }}>
       Bu özellik kültürel ve bilgilendirme amaçlı sunulacaktır. Teşhis ve tedavi için tıp doktoruna danışınız.
     </div>
   </div>
 )}

 {sekme === "hrv" && (
   <div>
     <button onClick={() => setSekme("hizmetler")} style={{ display:"inline-flex", alignItems:"center", gap:6, background:C.y, border:`1px solid ${C.s}`, borderRadius:10, padding:"8px 14px", color:C.altin, cursor:"pointer", fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontSize:13, fontWeight:700, marginBottom:14 }}>← Hizmetlere Dön</button>
     <div style={S.kB}>DUYGUSAL NABIZ — HRV ANALİZİ <span style={{ background: C.altin, color: "#1A1200", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 6, letterSpacing: 0.3, marginLeft: 6, verticalAlign: "middle" }}>YAKINDA</span></div>
     <div style={S.ipucu}>Nabız sadece fiziksel değil, ruhsal durumun haritasıdır. HRV (Kalp Atış Hızı Değişkenliği) milisaniye farklarını ölçer.</div>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 12 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>◐ HRV ÖLÇÜMÜ — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         Kalp atışları arası milisaniyelik farklardan <b>stres / korku / huzur</b> seviyen okunur.
       </div>
     </div>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 14 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>◑ MAKAM & NEFES ENTEGRASYONU — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         Nabız çok düzensiz ve stresliyse uygulama anında <b>Neva Makamı</b> (gönül ferahlatıcı) çalar.
       </div>
       <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.altin}30` }}>
         <b style={{ color: C.metin }}>Yönlendirme:</b> "Nefesini 4-7-8 kuralına göre al — 4 saniye al, 7 tut, 8 ver."
       </div>
     </div>

     <div style={{ color: C.soluk, fontSize: 11, lineHeight: 1.6, padding: 12, background: C.y2, borderRadius: 8, fontStyle: "italic", border: `1px dashed ${C.s}` }}>
       Bu özellik kültürel ve bilgilendirme amaçlı sunulacaktır. Teşhis ve tedavi için tıp doktoruna danışınız.
     </div>
   </div>
 )}

 {sekme === "nefes" && (
   <div>
     <button onClick={() => setSekme("hizmetler")} style={{ display:"inline-flex", alignItems:"center", gap:6, background:C.y, border:`1px solid ${C.s}`, borderRadius:10, padding:"8px 14px", color:C.altin, cursor:"pointer", fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontSize:13, fontWeight:700, marginBottom:14 }}>← Hizmetlere Dön</button>
     <div style={S.kB}>DİJİTAL BURUN — OSMANLI BUHURDANLIĞI 2.0 <span style={{ background: C.altin, color: "#1A1200", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 6, letterSpacing: 0.3, marginLeft: 6, verticalAlign: "middle" }}>YAKINDA</span></div>
     <div style={S.ipucu}>Sadece gözle bakmayacak, sadece nabız dinlemeyeceğiz. Telefon elektronik burun gibi çalışacak; nefesindeki molekülleri Osmanlı'nın "Mizâc-ı Havâ" ilmiyle birleştirip okuyacak.</div>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 12 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>◔ NEFES MOLEKÜL ANALİZİ — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         Nefesteki <b>aseton</b> diyabeti, <b>amonyak</b> böbreği söyler. AI bu işaretleri okuyup organ durumunu yorumlar.
       </div>
     </div>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 14 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>◓ MİZÂC-I HAVÂ & BUHURDANLIK — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         Bulunduğun ortamın havası analiz edilir (kuru-soğuk, nemli-sıcak vb.) ve buhurdanlık önerisiyle dengelenir.
       </div>
       <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.altin}30` }}>
         <b style={{ color: C.metin }}>Örnek:</b> "Odanın havası 'kuru-soğuk' — mizacın daralıyor. Buhurdanlığa iki damla lavanta damlat, düğüm çözülsün."
       </div>
     </div>

     <div style={{ color: C.soluk, fontSize: 11, lineHeight: 1.6, padding: 12, background: C.y2, borderRadius: 8, fontStyle: "italic", border: `1px dashed ${C.s}` }}>
       Bu özellik kültürel ve bilgilendirme amaçlı sunulacaktır. Teşhis ve tedavi için tıp doktoruna danışınız.
     </div>
   </div>
 )}

 {sekme === "rota" && (
   <div>
     <button onClick={() => setSekme("hizmetler")} style={{ display:"inline-flex", alignItems:"center", gap:6, background:C.y, border:`1px solid ${C.s}`, borderRadius:10, padding:"8px 14px", color:C.altin, cursor:"pointer", fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontSize:13, fontWeight:700, marginBottom:14 }}>← Hizmetlere Dön</button>
     <div style={S.kB}>EVLİYA ÇELEBİ ROTASI — ŞİFA HARİTASI 2.0 <span style={{ background: C.altin, color: "#1A1200", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 6, letterSpacing: 0.3, marginLeft: 6, verticalAlign: "middle" }}>YAKINDA</span></div>
     <div style={S.ipucu}>Şifa haritası sadece dükkanlarla sınırlı kalmaz: konumuna göre çevredeki tarihi şifahaneler, doğal kaynak suları ve kadim aktarlar mistik bir rota olarak sunulur.</div>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 14 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>◬ KONUM BAZLI KADİM ROTA — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         GPS konumun + günlük mizaç durumun → çevredeki <b>tarihi darüşşifa, kaynak suyu, kadim aktar</b> önerileri.
       </div>
       <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.altin}30` }}>
         <b style={{ color: C.metin }}>Örnek:</b> "500 metre ötede tarihi bir darüşşifa var — mimarisindeki akustik, bugün ihtiyacın olan Saba makamını fısıldar."
       </div>
       <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.altin}30` }}>
         Mistik + turistik + şifa odaklı bir derinlik: yerel mirası yeniden keşfedersin.
       </div>
     </div>

     <div style={{ color: C.soluk, fontSize: 11, lineHeight: 1.6, padding: 12, background: C.y2, borderRadius: 8, fontStyle: "italic", border: `1px dashed ${C.s}` }}>
       Bu özellik kültürel ve bilgilendirme amaçlı sunulacaktır. Teşhis ve tedavi için tıp doktoruna danışınız.
     </div>
   </div>
 )}

 {sekme === "nabiz" && (
   <div>
     <button onClick={() => setSekme("hizmetler")} style={{ display:"inline-flex", alignItems:"center", gap:6, background:C.y, border:`1px solid ${C.s}`, borderRadius:10, padding:"8px 14px", color:C.altin, cursor:"pointer", fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontSize:13, fontWeight:700, marginBottom:14 }}>← Hizmetlere Dön</button>
     <div style={S.kB}>İLM-İ NABIZ — MİZAÇ TEŞHİSİ <span style={{ background: C.altin, color: "#1A1200", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 6, letterSpacing: 0.3, marginLeft: 6, verticalAlign: "middle" }}>YAKINDA</span></div>
     <div style={S.ipucu}>Osmanlı hekimleri nabzı 10 farklı parametreye göre okurdu. Yapay zeka, telefonun sensörü ile nabzı analiz edip mizaç bozulmasını yorumlar.</div>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 12 }}>
       <div style={{ color: "#FF4444", fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>◐ SAFRAVİ NABIZ — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         Hızlı ve sert (Ateş elementi). AI tespit ettiğinde: <i>"Hararet artmış — tarattığın baharatlı gıda tansiyonunu tetikler."</i>
       </div>
     </div>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 12 }}>
       <div style={{ color: "#FFD700", fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>◑ DEMEVİ NABIZ — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         Dolu ve kuvvetli. AI tespit ettiğinde: <i>"Kan değerlerin yüksek olabilir — bugün ağır etli gıdalardan uzak dur, hacamat vaktin yaklaşmış olabilir."</i>
       </div>
     </div>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 14 }}>
       <div style={{ color: "#4488FF", fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>◓ BALGAMİ NABIZ — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         Yavaş ve derinde. AI tespit ettiğinde: <i>"Metabolizman yavaşlamış, uyuşukluk var — zencefil gibi ısıtıcı gıdalara yönel."</i>
       </div>
     </div>

     <div style={{ color: C.soluk, fontSize: 11, lineHeight: 1.6, padding: 12, background: C.y2, borderRadius: 8, fontStyle: "italic", border: `1px dashed ${C.s}` }}>
       Bu özellik kültürel ve bilgilendirme amaçlı sunulacaktır. Teşhis ve tedavi için tıp doktoruna danışınız.
     </div>
   </div>
 )}

 {sekme === "koku" && (
   <div>
     <button onClick={() => setSekme("hizmetler")} style={{ display:"inline-flex", alignItems:"center", gap:6, background:C.y, border:`1px solid ${C.s}`, borderRadius:10, padding:"8px 14px", color:C.altin, cursor:"pointer", fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontSize:13, fontWeight:700, marginBottom:14 }}>← Hizmetlere Dön</button>
     <div style={S.kB}>DİJİTAL ATTAR — KOKU TAKVİMİ <span style={{ background: C.altin, color: "#1A1200", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 6, letterSpacing: 0.3, marginLeft: 6, verticalAlign: "middle" }}>YAKINDA</span></div>
     <div style={S.ipucu}>Osmanlı'da şifa kulakla (makam), gözle (renk) ve burunla da gelirdi. Attarlık, kadim bir tıp ve psişe sanatıdır.</div>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 14 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>❀ KOKU TAKVİMİ & TERAPİ — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         Günlük burç-gezegen saati + tarattığın zararlı gıdaya göre kişiselleştirilmiş <b>koku terapisi</b> önerisi.
       </div>
       <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.altin}30` }}>
         <b style={{ color: C.metin }}>Örnek:</b> "Bugün karaciğerin yoruldu; safravi mizacın için en uygun dengeleyici koku gül veya sandal ağacıdır."
       </div>
       <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.altin}30` }}>
         <b style={{ color: C.metin }}>Ticari boyut:</b> En temiz içerikli esansiyel yağ önerisi + tek tıkla sipariş.
       </div>
     </div>

     <div style={{ color: C.soluk, fontSize: 11, lineHeight: 1.6, padding: 12, background: C.y2, borderRadius: 8, fontStyle: "italic", border: `1px dashed ${C.s}` }}>
       Bu özellik kültürel ve bilgilendirme amaçlı sunulacaktır. Teşhis ve tedavi için tıp doktoruna danışınız.
     </div>
   </div>
 )}

 {sekme === "ses" && (
   <div>
     <button onClick={() => setSekme("hizmetler")} style={{ display:"inline-flex", alignItems:"center", gap:6, background:C.y, border:`1px solid ${C.s}`, borderRadius:10, padding:"8px 14px", color:C.altin, cursor:"pointer", fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontSize:13, fontWeight:700, marginBottom:14 }}>← Hizmetlere Dön</button>
     <div style={S.kB}>SES FREKANS ANALİZİ <span style={{ background: C.altin, color: "#1A1200", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 6, letterSpacing: 0.3, marginLeft: 6, verticalAlign: "middle" }}>YAKINDA</span></div>
     <div style={S.ipucu}>Yapay zeka sadece metin değil sesi de analiz eder. Ses titreşimi, gizli yorgunluk ve mizaç bozulmasının en hassas göstergesidir.</div>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 14 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>◔ SESLİ DURUM TESPİTİ — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         "Bugün biraz yorgun hissediyorum" dediğinde, sistem sesindeki <b>frekanstan mizaç bozulmasını</b> tespit eder (sevda artışı, depresyon meyli vb.).
       </div>
       <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.altin}30` }}>
         <b style={{ color: C.metin }}>Örnek:</b> "Sesindeki frekans düşük — şu an Neva makamına ve sarı renge ihtiyacın var. Tarattığın gıda bu yorgunluğu artırır."
       </div>
     </div>

     <div style={{ color: C.soluk, fontSize: 11, lineHeight: 1.6, padding: 12, background: C.y2, borderRadius: 8, fontStyle: "italic", border: `1px dashed ${C.s}` }}>
       Bu özellik kültürel ve bilgilendirme amaçlı sunulacaktır. Teşhis ve tedavi için tıp doktoruna danışınız.
     </div>
   </div>
 )}

 {sekme === "tohum" && (
   <div>
     <button onClick={() => setSekme("hizmetler")} style={{ display:"inline-flex", alignItems:"center", gap:6, background:C.y, border:`1px solid ${C.s}`, borderRadius:10, padding:"8px 14px", color:C.altin, cursor:"pointer", fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontSize:13, fontWeight:700, marginBottom:14 }}>← Hizmetlere Dön</button>
     <div style={S.kB}>MİLLİ TOHUM — GENETİK SADAKAT KALKANI <span style={{ background: C.altin, color: "#1A1200", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 6, letterSpacing: 0.3, marginLeft: 6, verticalAlign: "middle" }}>YAKINDA</span></div>
     <div style={S.ipucu}>Hibrit ve GDO'lu tohumlar bedenin yabancı olarak algıladığı genetik yapı taşır. Atalık tohumlar (Karakılçık, Siyez vb) Anadolu'nun bin yıllık birikimidir.</div>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 14 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>◬ GENETİK SADAKAT PUANI — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         Tarattığın ürünün tohum kökeni analiz edilir: <b>hibrit / GDO / atalık</b>. Hücrelerinin tanıdığı tohumdan mı geliyor?
       </div>
       <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.altin}30` }}>
         <b style={{ color: C.metin }}>Örnek:</b> "Bu ekmek senin genetik kodunla savaş halinde — vücudun yabancı istilacı olarak algılayıp enflamasyon başlatıyor. Yerel üreticinin Karakılçık veya Siyez buğdayına dön."
       </div>
       <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.altin}30` }}>
         <b style={{ color: C.metin }}>Aksiyon:</b> Yerel üretici ağı ile atalık tohumlu ürünleri sepete ekleme — tarım kartellerine karşı kalkan.
       </div>
     </div>

     <div style={{ color: C.soluk, fontSize: 11, lineHeight: 1.6, padding: 12, background: C.y2, borderRadius: 8, fontStyle: "italic", border: `1px dashed ${C.s}` }}>
       Bu özellik kültürel ve bilgilendirme amaçlı sunulacaktır. Teşhis ve tedavi için tıp doktoruna danışınız.
     </div>
   </div>
 )}

 {sekme === "zihin" && (
   <div>
     <button onClick={() => setSekme("hizmetler")} style={{ display:"inline-flex", alignItems:"center", gap:6, background:C.y, border:`1px solid ${C.s}`, borderRadius:10, padding:"8px 14px", color:C.altin, cursor:"pointer", fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontSize:13, fontWeight:700, marginBottom:14 }}>← Hizmetlere Dön</button>
     <div style={S.kB}>ZİHNİ İNŞA & ODAKLANMA KALKANI <span style={{ background: C.altin, color: "#1A1200", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 6, letterSpacing: 0.3, marginLeft: 6, verticalAlign: "middle" }}>YAKINDA</span></div>
     <div style={S.ipucu}>Dijital dünya çocukların ve yetişkinlerin dikkat süresini 8 saniyeye düşürdü. Odaklanamayan zihin, sorgulayamaz. Üç koldan kalkan: ekran, beslenme, öğrenme.</div>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 12 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>◐ DİJİTAL DOPAMİN & EKRAN ZEHRİ — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         Ekran süresi ve içeriğin <b>kare hızı (frame rate)</b> ölçülür. Hızlı sahne geçişleri çocukta GABA dengesini bozar, hiperaktif (safravi) döngüye sokar.
       </div>
       <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.altin}30` }}>
         <b style={{ color: C.metin }}>Aksiyon:</b> Ekran kapat, lavantalı göz yastığı + 15 dk Rast Makamı dinlet, zihni toprak fazına çek.
       </div>
     </div>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 12 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>◑ BESLENME ↔ ZEKA (IQ/EQ) — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         Kantin gofretleri ve katkı bombaları sinapslar arası iletimi yavaşlatır. Sınav başarısızlığının kökeni "tembellik" değil, kandaki alüminyum ve şeker yükü.
       </div>
     </div>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 14 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>◓ ÖĞRENME MİZAÇLARI — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         Her çocuk farklı öğrenir: görerek (demevi), duyarak (safravi), dokunarak (balgami). Mizacına göre ortam ve yöntem öner.
       </div>
       <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.altin}30` }}>
         <b style={{ color: C.metin }}>Örnek:</b> "Sevdavi mizaç — baskı yerine sessiz, derinlikli ortam. Masaya florit taşı, odaya nane-limon uçucu yağı."
       </div>
     </div>

     <div style={{ color: C.soluk, fontSize: 11, lineHeight: 1.6, padding: 12, background: C.y2, borderRadius: 8, fontStyle: "italic", border: `1px dashed ${C.s}` }}>
       Bu özellik kültürel ve bilgilendirme amaçlı sunulacaktır. Teşhis ve tedavi için tıp doktoruna danışınız.
     </div>
   </div>
 )}

 {sekme === "uyku" && (
   <div>
     <button onClick={() => setSekme("hizmetler")} style={{ display:"inline-flex", alignItems:"center", gap:6, background:C.y, border:`1px solid ${C.s}`, borderRadius:10, padding:"8px 14px", color:C.altin, cursor:"pointer", fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontSize:13, fontWeight:700, marginBottom:14 }}>← Hizmetlere Dön</button>
     <div style={S.kB}>UYKU KALKANI & REM RESTORASYONU <span style={{ background: C.altin, color: "#1A1200", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 6, letterSpacing: 0.3, marginLeft: 6, verticalAlign: "middle" }}>YAKINDA</span></div>
     <div style={S.ipucu}>Yatak odası en savunmasız ama en şifalı alandır. Yaylı yatak (anten etkisi), sentetik tekstil (deri solunumu engeli), bozulmuş melatonin — uyku ihanetinin üç ayağı.</div>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 12 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>◬ YAYLI YATAK & ANTEN ETKİSİ — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         Metal yaylar Wi-Fi ve baz istasyonu sinyallerini toplayıp vücuda iletir. Yatak yapısı + oda EMF yoğunluğu analiz edilir.
       </div>
       <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.altin}30` }}>
         <b style={{ color: C.metin }}>Aksiyon:</b> Yün/pamuk yatak katmanı, altına karbon-gümüş iplikli statik emici örtü.
       </div>
     </div>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 12 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>◔ SENTETİK TEKSTİL & DERİ SOLUNUMU — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         Pijama ve nevresim kumaşı kameradan analiz edilir. %100 polyester gece toksin atılımını bloke eder; terlemenin sebebi sıcaklık değil, plastik dokudur.
       </div>
       <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.altin}30` }}>
         <b style={{ color: C.metin }}>Aksiyon:</b> Ham ipek veya keten uyku seti — ten doğal liflerle nefes alır.
       </div>
     </div>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 14 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>◓ RÜYA FREKANSI & MİZAÇ — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         Gördüğün rüyaların havası (korku/uçma/su/ateş) girilir, mizaç dengesi okunur. Ateşli-kavgalı rüyalar safra (sıcak-kuru) yükselişi → karaciğer alarmı.
       </div>
       <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.altin}30` }}>
         <b style={{ color: C.metin }}>Aksiyon:</b> Yastık altına ametist taşı, şakaklara melisa yağı — frekansı Sekîne moduna çek.
       </div>
     </div>

     <div style={{ color: C.soluk, fontSize: 11, lineHeight: 1.6, padding: 12, background: C.y2, borderRadius: 8, fontStyle: "italic", border: `1px dashed ${C.s}` }}>
       Bu özellik kültürel ve bilgilendirme amaçlı sunulacaktır. Teşhis ve tedavi için tıp doktoruna danışınız.
     </div>
   </div>
 )}

 {sekme === "emf" && (
   <div>
     <button onClick={() => setSekme("hizmetler")} style={{ display:"inline-flex", alignItems:"center", gap:6, background:C.y, border:`1px solid ${C.s}`, borderRadius:10, padding:"8px 14px", color:C.altin, cursor:"pointer", fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontSize:13, fontWeight:700, marginBottom:14 }}>← Hizmetlere Dön</button>
     <div style={S.kB}>EMF KALKANI — ELEKTROMANYETİK KORUMA <span style={{ background: C.altin, color: "#1A1200", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 6, letterSpacing: 0.3, marginLeft: 6, verticalAlign: "middle" }}>YAKINDA</span></div>
     <div style={S.ipucu}>Wi-Fi, 5G ve elektrik hatları hücre frekansını etkileyen modern bir kirlilik kaynağı. Telefon sensörleriyle ölçülüp kişiselleştirilmiş kalkan önerileri sunulacak.</div>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 14 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>◈ EMF ÖLÇÜM & ANALİZ — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         Telefonun sensörleri etrafındaki <b>elektromanyetik kirliliği</b> ölçer, uyku ve beyin dalgalarına etkisini değerlendirir.
       </div>
       <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.altin}30` }}>
         <b style={{ color: C.metin }}>Örnek:</b> "Yatak odandaki baz istasyonu frekansı REM kaliteni %40 düşürüyor."
       </div>
       <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.altin}30` }}>
         <b style={{ color: C.metin }}>Aksiyon:</b> "Gece telefonu uçak moduna al, başucuna tuz lambası veya şungit taşı koy."
       </div>
     </div>

     <div style={{ color: C.soluk, fontSize: 11, lineHeight: 1.6, padding: 12, background: C.y2, borderRadius: 8, fontStyle: "italic", border: `1px dashed ${C.s}` }}>
       Bu özellik kültürel ve bilgilendirme amaçlı sunulacaktır. Teşhis ve tedavi için tıp doktoruna danışınız.
     </div>
   </div>
 )}

 {sekme === "dopamin" && (
   <div>
     <button onClick={() => setSekme("hizmetler")} style={{ display:"inline-flex", alignItems:"center", gap:6, background:C.y, border:`1px solid ${C.s}`, borderRadius:10, padding:"8px 14px", color:C.altin, cursor:"pointer", fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontSize:13, fontWeight:700, marginBottom:14 }}>← Hizmetlere Dön</button>
     <div style={S.kB}>DOPAMİN SKORU — NÖRO-GIDA ANALİZİ <span style={{ background: C.altin, color: "#1A1200", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 6, letterSpacing: 0.3, marginLeft: 6, verticalAlign: "middle" }}>YAKINDA</span></div>
     <div style={S.ipucu}>MSG (E621), nişasta bazlı şeker ve yapay aromalar beynin ödül mekanizmasını manipüle eder. İnsan acıkmadığı halde yer.</div>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 14 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>◆ DOPAMİN SKORU — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         Ürün tarandığında sadece içerik değil, <b>Dopamin Skoru</b> verilir: ön lob (prefrontal korteks) ve irade merkezine etkisi puanlanır.
       </div>
       <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.altin}30` }}>
         <b style={{ color: C.metin }}>Örnek:</b> "Bu ürün ön lobu uyuşturuyor. 15 dakika sonra sahte mutluluk, 1 saat sonra düşüş ve agresiflik yaşarsın."
       </div>
       <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.altin}30` }}>
         <b style={{ color: C.metin }}>Restorasyon:</b> "Misk-i amber kokla, magnezit taşını avucunda tut, sahte sinyali kır — iradeni geri al."
       </div>
     </div>

     <div style={{ color: C.soluk, fontSize: 11, lineHeight: 1.6, padding: 12, background: C.y2, borderRadius: 8, fontStyle: "italic", border: `1px dashed ${C.s}` }}>
       Bu özellik kültürel ve bilgilendirme amaçlı sunulacaktır. Teşhis ve tedavi için tıp doktoruna danışınız.
     </div>
   </div>
 )}

 {sekme === "toprak" && (
   <div>
     <button onClick={() => setSekme("hizmetler")} style={{ display:"inline-flex", alignItems:"center", gap:6, background:C.y, border:`1px solid ${C.s}`, borderRadius:10, padding:"8px 14px", color:C.altin, cursor:"pointer", fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontSize:13, fontWeight:700, marginBottom:14 }}>← Hizmetlere Dön</button>
     <div style={S.kB}>TOPRAK FREKANSI & KONUM ŞİFASI <span style={{ background: C.altin, color: "#1A1200", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 6, letterSpacing: 0.3, marginLeft: 6, verticalAlign: "middle" }}>YAKINDA</span></div>
     <div style={S.ipucu}>Osmanlı'da şifahaneler ve camiler "Leyn Hatları" (enerji hatları) üzerine kurulurdu. İnsan sadece yediğinden değil, bastığı topraktan da hasta olur.</div>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 14 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>◉ JEOPATİK STRES ANALİZİ — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         Uygulama, GPS konumunu kullanarak bulunduğun bölgenin <b>toprak yapısını ve manyetik alanını</b> analiz eder.
       </div>
       <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.altin}30` }}>
         <b style={{ color: C.metin }}>Örnek:</b> "Şu an bulunduğun bölgenin manyetik alanı senin sevdevi mizacını ağırlaştırıyor. Çıplak ayak toprağa basman veya pozitif iyon yayan doğal taşlar kullanman önerilir."
       </div>
     </div>

     <div style={S.kB}>ANLIK HAVA KALİTESİ & UV (CANLI)</div>
     {!havaData && !havaHata && <div style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 12, padding: 14, marginBottom: 12, color: C.soluk, fontSize: 13, textAlign: "center" }}>Konum & hava verisi yükleniyor...</div>}
     {havaHata && <div style={{ background: "#FEE2E2", color: C.kirmizi, padding: 12, borderRadius: 10, fontSize: 13, marginBottom: 12 }}>{havaHata}</div>}
     {havaData && (() => {
       const aqi = havaData.european_aqi;
       const aqiRenk = aqi == null ? C.cok : aqi <= 40 ? C.yesil : aqi <= 60 ? C.sari : aqi <= 80 ? C.turuncu : C.kirmizi;
       const aqiAd = aqi == null ? "—" : aqi <= 20 ? "Çok İyi" : aqi <= 40 ? "İyi" : aqi <= 60 ? "Orta" : aqi <= 80 ? "Kötü" : "Çok Kötü";
       return (
         <div style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 14, padding: 16, marginBottom: 12 }}>
           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, paddingBottom: 12, borderBottom: `1px solid ${C.s}` }}>
             <div>
               <div style={{ color: C.soluk, fontSize: 10, fontWeight: 700, letterSpacing: 0.5 }}>AVRUPA HAVA KALİTE İNDEKSİ</div>
               <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 4 }}>
                 <span style={{ color: aqiRenk, fontSize: 32, fontWeight: 800 }}>{aqi ?? "—"}</span>
                 <span style={{ color: aqiRenk, fontSize: 14, fontWeight: 700 }}>{aqiAd}</span>
               </div>
             </div>
             {havaData.uv_index != null && (
               <div style={{ textAlign: "right" }}>
                 <div style={{ color: C.soluk, fontSize: 10, fontWeight: 700, letterSpacing: 0.5 }}>UV İNDEKS</div>
                 <div style={{ color: C.altin, fontSize: 28, fontWeight: 800 }}>{Number(havaData.uv_index).toFixed(1)}</div>
               </div>
             )}
           </div>
           <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
             {[
               ["PM2.5", havaData.pm2_5, "μg/m³"],
               ["PM10", havaData.pm10, "μg/m³"],
               ["NO₂", havaData.nitrogen_dioxide, "μg/m³"],
               ["O₃", havaData.ozone, "μg/m³"],
             ].map(([ad, deger, birim]) => (
               <div key={ad} style={{ background: C.y2, borderRadius: 8, padding: "8px 10px" }}>
                 <div style={{ color: C.soluk, fontSize: 10, fontWeight: 700 }}>{ad}</div>
                 <div style={{ color: C.metin, fontSize: 14, fontWeight: 700, marginTop: 2 }}>{deger != null ? Number(deger).toFixed(1) : "—"} <span style={{ color: C.cok, fontSize: 10, fontWeight: 400 }}>{birim}</span></div>
               </div>
             ))}
           </div>
           <div style={{ color: C.cok, fontSize: 10, marginTop: 10, textAlign: "center" }}>Open-Meteo · Konum: {havaData.lat}, {havaData.lon}</div>
         </div>
       );
     })()}

     <div style={{ color: C.soluk, fontSize: 11, lineHeight: 1.6, padding: 12, background: C.y2, borderRadius: 8, fontStyle: "italic", border: `1px dashed ${C.s}` }}>
       Bu özellik kültürel ve bilgilendirme amaçlı sunulacaktır. Teşhis ve tedavi için tıp doktoruna danışınız.
     </div>
   </div>
 )}

 {sekme === "rabita" && (
   <div>
     <button onClick={() => setSekme("hizmetler")} style={{ display:"inline-flex", alignItems:"center", gap:6, background:C.y, border:`1px solid ${C.s}`, borderRadius:10, padding:"8px 14px", color:C.altin, cursor:"pointer", fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontSize:13, fontWeight:700, marginBottom:14 }}>← Hizmetlere Dön</button>
     <div style={S.kB}>RÂBITA-İ ŞİFA — KOLEKTİF ODAK <span style={{ background: C.altin, color: "#1A1200", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 6, letterSpacing: 0.3, marginLeft: 6, verticalAlign: "middle" }}>YAKINDA</span></div>
     <div style={S.ipucu}>Eşzamanlı kolektif meditasyon ve ortak niyetli odak üzerine yapılan bilimsel araştırmalar (Harvard Benson-Henry Institute, Wisconsin-Madison Üniversitesi meditasyon laboratuvarı, Princeton Global Consciousness Project) bireyin kortizol düzeyi, kalp atış hızı değişkenliği (HRV) ve subjektif iyilik hâlinde ölçülebilir değişimler bildirmektedir. Uygulamayı; belirlenen vakitlerde kullanıcıları ortak bir sağlık niyetinde buluşturan bilimsel temelli bir dijital topluluk pratiğine dönüştürüyoruz.</div>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 14 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>◇ KOLEKTİF ŞİFA SAATİ — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         Her akşam Eşref Saati'nde, tüm kullanıcılara bildirim: <i>"Şu an binlerce kişiyle aynı anda karaciğer şifası için Ney sesi eşliğinde odaklanıyoruz."</i>
       </div>
       <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.altin}30` }}>
         Aidiyet, ortak niyet ve aynı anda yapılan odak — yazılımı bir uygulamadan çıkarıp bir <b>şifa cemaatine</b> dönüştürür.
       </div>
     </div>

     <div style={S.kB}>ŞİFA AYETLERİ — OKU, DİNLE (6 AYET-İ ŞİFA)</div>
     <div style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 14, padding: 6, marginBottom: 14 }}>
       {[
         { ref: "9:14", ad: "Tevbe 14", konu: "Mü'minlerin sinelerine şifa" },
         { ref: "10:57", ad: "Yunus 57", konu: "Sinelerdeki şifa" },
         { ref: "16:69", ad: "Nahl 69", konu: "Baldan insanlara şifa" },
         { ref: "17:82", ad: "İsrâ 82", konu: "Kur'an mü'minlere şifa" },
         { ref: "26:80", ad: "Şuarâ 80", konu: "İbrahim a.s. şifa duası" },
         { ref: "41:44", ad: "Fussilet 44", konu: "Mü'minlere şifa ve hidayet" },
         { ref: "2:186", ad: "Bakara 186", konu: "Allah duaya cevap verir" },
       ].map((a, i, arr) => {
         const veri = ayetData[a.ref];
         const acik = acikAyet === a.ref;
         return (
           <div key={a.ref} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${C.s}` : "none" }}>
             <button onClick={() => ayetToggle(a.ref)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif", textAlign: "left" }}>
               <span style={{ flex: 1 }}>
                 <span style={{ color: C.altin, fontWeight: 700, fontSize: 13 }}>{a.ad}</span>
                 <span style={{ color: C.soluk, fontSize: 12, marginLeft: 8 }}>· {a.konu}</span>
               </span>
               <span style={{ color: C.cok, fontSize: 14 }}>{acik ? "▲" : (ayetYukleniyor === a.ref ? "⟳" : "▼")}</span>
             </button>
             {acik && (
               <div style={{ padding: "0 14px 14px" }}>
                 {!veri && <div style={{ color: C.cok, fontSize: 12, textAlign: "center", padding: 8 }}>Yükleniyor...</div>}
                 {veri?.hata && <div style={{ color: C.kirmizi, fontSize: 12 }}>{veri.hata}</div>}
                 {veri?.arap && (
                   <>
                     <div style={{ color: C.metin, fontSize: 22, lineHeight: 2, textAlign: "right", direction: "rtl", fontFamily: "'Amiri', 'Scheherazade New', serif", marginBottom: 12, padding: "10px 12px", background: C.y2, borderRadius: 10 }}>{veri.arap}</div>
                     <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.7, marginBottom: 10, fontStyle: "italic" }}>{veri.tr}</div>
                     {veri.audio && <audio controls src={veri.audio} style={{ width: "100%", height: 36 }} />}
                   </>
                 )}
               </div>
             )}
           </div>
         );
       })}
     </div>

     <div style={S.kB}>ESMÂ-ÜL HÜSNÂ REÇETELERİ — DURUMA GÖRE</div>
     <div style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 14, padding: 6, marginBottom: 14 }}>
       {[
         { durum: "Kalp sıkıntısı / ruh daralması", esma: "Yâ Selâm", ebced: 131, aciklama: "Selâmet ve huzur veren. Ra'd 28: 'Kalpler ancak Allah'ı anmakla huzur bulur.'" },
         { durum: "Üzüntü / yalnızlık hissi", esma: "Yâ Latîf", ebced: 129, aciklama: "İnceliğin sahibi, gizli yardım eden. Sıkıntıda tesellî verir." },
         { durum: "Hastalık / fiziksel ağrı", esma: "Yâ Şâfî", ebced: 391, aciklama: "Şifa veren. Hadisten: 'Şifa veren ancak Sen'sin.'" },
         { durum: "Korku / kaygı", esma: "Yâ Mü'min", ebced: 137, aciklama: "Güven veren. Endişe ve korkuyu sükûnete çevirir." },
         { durum: "Rızk darlığı", esma: "Yâ Rezzâk", ebced: 308, aciklama: "Rızkı bol kılan. Bereketin kapısını açan isim." },
         { durum: "Uykusuzluk / huzursuzluk", esma: "Yâ Hayyu Yâ Kayyûm", ebced: 218, aciklama: "Dâimâ diri ve kâim olan. Gece zikrinin esası." },
         { durum: "Hidayet ihtiyacı", esma: "Yâ Hâdî", ebced: 20, aciklama: "Doğru yola ileten. Karar anlarında tekrar edilir." },
       ].map((e, i, arr) => (
         <div key={e.esma} style={{ padding: "12px 14px", borderBottom: i < arr.length - 1 ? `1px solid ${C.s}` : "none" }}>
           <div style={{ color: C.soluk, fontSize: 11, marginBottom: 4 }}>{e.durum}</div>
           <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
             <span style={{ color: C.altin, fontWeight: 700, fontSize: 16 }}>{e.esma}</span>
             <span style={{ color: C.cok, fontSize: 11, fontFamily: "ui-monospace, monospace" }}>Ebced: {e.ebced}</span>
           </div>
           <div style={{ color: C.metin, fontSize: 12, lineHeight: 1.6 }}>{e.aciklama}</div>
         </div>
       ))}
       <div style={{ padding: "10px 14px", color: C.cok, fontSize: 10, fontStyle: "italic", textAlign: "center" }}>Ebced sayısı kadar zikir, geleneksel tasavvuf usulüdür.</div>
     </div>

     <div style={S.kB}>VAKTİN ZİKRİ — GÜNÜN VAKİTLERİNE GÖRE</div>
     <div style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 14, padding: 6, marginBottom: 14 }}>
       {[
         { vakit: "Fecr (Sabah) — Bereket dağılımı", zikir: "Sübhânallâhi ve bihamdihî (100 defa) · Vâkıa Sûresi" },
         { vakit: "Duhâ (Kuşluk) — Rızk vakti", zikir: "Yâ Rezzâk · Duhâ Sûresi" },
         { vakit: "Zuhr (Öğle) — Şükür ve istiğfar", zikir: "Estağfirullâh el-Azîm (70 defa) · Yâ Settâr" },
         { vakit: "Asr (İkindi) — Ruhun daraldığı vakit", zikir: "Yâ Latîf (129 defa) · Asr Sûresi" },
         { vakit: "Maghrib (Akşam) — Sükûnet zamanı", zikir: "Yâ Selâm (131 defa) · Mülk Sûresi" },
         { vakit: "İsha (Yatsı) — Korunma ve tevekkül", zikir: "Âyetü'l-Kürsî · Felâk ve Nâs" },
         { vakit: "Teheccüd (Gece) — Rahmânî rüyalar", zikir: "Yâ Hayyu Yâ Kayyûm · İsrâ Sûresi son ayetleri" },
       ].map((v, i, arr) => (
         <div key={v.vakit} style={{ padding: "10px 14px", borderBottom: i < arr.length - 1 ? `1px solid ${C.s}` : "none" }}>
           <div style={{ color: C.altin, fontWeight: 700, fontSize: 12, marginBottom: 3 }}>{v.vakit}</div>
           <div style={{ color: C.metin, fontSize: 12, lineHeight: 1.6 }}>{v.zikir}</div>
         </div>
       ))}
     </div>

     <div style={S.kB}>DUA HALKASI — MANEVÎ SOSYAL AĞ</div>
     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 14 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 13, marginBottom: 8, letterSpacing: 0.5 }}>☾ YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.7, marginBottom: 8 }}>
         Bir kullanıcı <i>"bugün şifaya muhtacım, bir Fâtiha bekliyorum"</i> dediğinde sistemdeki diğer kullanıcılara anonim bildirim gidecek: <i>"Bir kardeşimize şifa ayeti okunması rica ediliyor, katılmak ister misin?"</i>
       </div>
       <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, paddingTop: 8, borderTop: `1px solid ${C.altin}30` }}>
         Kolektif dua, ortak niyet ve eşzamanlı okuma; bireysel pratikten topluluk pratiğine geçişi sağlayacak.
       </div>
     </div>

     <div style={{ color: C.soluk, fontSize: 11, lineHeight: 1.6, padding: 12, background: C.y2, borderRadius: 8, fontStyle: "italic", border: `1px dashed ${C.s}` }}>
       Bu özellik kültürel ve bilgilendirme amaçlı sunulacaktır.
     </div>
   </div>
 )}

 {sekme === "bahce" && (
   <div>
     <button onClick={() => setSekme("hizmetler")} style={{ display:"inline-flex", alignItems:"center", gap:6, background:C.y, border:`1px solid ${C.s}`, borderRadius:10, padding:"8px 14px", color:C.altin, cursor:"pointer", fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontSize:13, fontWeight:700, marginBottom:14 }}>← Hizmetlere Dön</button>
     <div style={S.kB}>AKILLI BAHÇE — MİZAÇ ODAKLI BOSTAN <span style={{ background: C.altin, color: "#1A1200", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 6, letterSpacing: 0.3, marginLeft: 6, verticalAlign: "middle" }}>YAKINDA</span></div>
     <div style={S.ipucu}>Uygulama göz taraması ve mizaç sonucuna göre sana hangi bitkiye ihtiyacın olduğunu söyler. Akıllı tohum kitleri ile evde de yetiştirebilirsin.</div>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 14 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>❀ AKILLI TOHUM KİTLERİ — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         Mizacına uygun bitki kiti adresine gönderilir. Yapay zeka kameradan büyümeyi izler ve <i>"Bitkinin mizacı tamamlandı, şimdi kopar ve şifa niyetine iç"</i> der.
       </div>
     </div>

     <div style={{ color: C.soluk, fontSize: 11, lineHeight: 1.6, padding: 12, background: C.y2, borderRadius: 8, fontStyle: "italic", border: `1px dashed ${C.s}` }}>
       Bu özellik kültürel ve bilgilendirme amaçlı sunulacaktır.
     </div>
   </div>
 )}

 {sekme === "biyofoton" && (
   <div>
     <button onClick={() => setSekme("hizmetler")} style={{ display:"inline-flex", alignItems:"center", gap:6, background:C.y, border:`1px solid ${C.s}`, borderRadius:10, padding:"8px 14px", color:C.altin, cursor:"pointer", fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontSize:13, fontWeight:700, marginBottom:14 }}>← Hizmetlere Dön</button>
     <div style={S.kB}>BİYO-FOTON KAMERA — GIDA AURASI <span style={{ background: C.altin, color: "#1A1200", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 6, letterSpacing: 0.3, marginLeft: 6, verticalAlign: "middle" }}>YAKINDA</span></div>
     <div style={S.ipucu}>Kamerayı sadece barkod okumak için değil, canlı gıdanın yaşam enerjisini ölçmek için kullanacağız.</div>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 14 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>◓ BİYO-FOTON ANALİZİ — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         Bir elmayı kameraya tut. Yapay zeka tazelikten yola çıkarak yaydığı ışınımı (biyo-foton) tahmin eder.
       </div>
       <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.altin}30` }}>
         <b style={{ color: C.metin }}>Örnek çıktı:</b> "Bu elma görünüşte güzel ama yaşam enerjisi (prana / şifa) bitmiş, sadece posa yersin. Köylü pazarındaki şu elmayı seç."
       </div>
     </div>

     <div style={{ color: C.soluk, fontSize: 11, lineHeight: 1.6, padding: 12, background: C.y2, borderRadius: 8, fontStyle: "italic", border: `1px dashed ${C.s}` }}>
       Bu özellik kültürel ve bilgilendirme amaçlı sunulacaktır.
     </div>
   </div>
 )}

 {sekme === "goz" && (
   <div>
     <button onClick={() => setSekme("hizmetler")} style={{ display:"inline-flex", alignItems:"center", gap:6, background:C.y, border:`1px solid ${C.s}`, borderRadius:10, padding:"8px 14px", color:C.altin, cursor:"pointer", fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontSize:13, fontWeight:700, marginBottom:14 }}>← Hizmetlere Dön</button>
     <div style={S.kB}>GÖZ ve YÜZ ANALİZİ — BASİRET + FİRASET <span style={{ background: C.altin, color: "#1A1200", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 6, letterSpacing: 0.3, marginLeft: 6, verticalAlign: "middle" }}>YAKINDA</span></div>
     <div style={S.ipucu}>Osmanlı hekimleri "Göz ruhun aynasıdır" derdi. İridoloji ilminde iris vücudun haritasıdır; Kıyâfetnâme (İlm-i Sîmâ) geleneğinde yüz çizgileri organ durumunu yansıtır.</div>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 14 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>◉ DİJİTAL İRİDOLOJİ — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         Kamerayı gözüne yaklaştırırsın, yapay zeka iristeki çizgileri, noktaları ve renk değişimlerini tarar.
       </div>
       <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.altin}30` }}>
         <b style={{ color: C.metin }}>Örnek:</b> Saat 3 yönünde koyuluk → akciğerde toksin birikimi işareti. Göz bebeği etrafında beyaz halka → aşırı asit (mizaç bozulması).
       </div>
     </div>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 14 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>◑ GÖZ TARAMASI + GIDA ANALİZİ — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         Sistem gözünü tarar, sindirim zayıflığını tespit eder. Sonra bir gıda taratınca uyarır: "DUR — bu koruyuculu gıda senin mide asidini bozabilir."
       </div>
     </div>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 14 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>◔ FİZYONOMİ (KIYÂFETNÂME) — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         Alın çizgileri, dudak rengi, göz altı torbaları — yapay zeka yüzden "karaciğer yorgunluğu", "böbrek susuzluğu" gibi tespitler yapar. Haftalık selfie ile doğal kürlerinin etkisini izlersin.
       </div>
     </div>

     <div style={{ color: C.soluk, fontSize: 11, lineHeight: 1.6, padding: 12, background: C.y2, borderRadius: 8, fontStyle: "italic", border: `1px dashed ${C.s}` }}>
       Bu özellik kültürel ve bilgilendirme amaçlı sunulacaktır. Teşhis ve tedavi için tıp doktoruna danışınız.
     </div>
   </div>
 )}

 {sekme === "market" && (
   <div>
     <button onClick={() => setSekme("hizmetler")} style={{ display:"inline-flex", alignItems:"center", gap:6, background:C.y, border:`1px solid ${C.s}`, borderRadius:10, padding:"8px 14px", color:C.altin, cursor:"pointer", fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontSize:13, fontWeight:700, marginBottom:14 }}>← Hizmetlere Dön</button>
     {sonuclar.length > 0 && (
       <button onClick={() => { setSekme("tarama"); setEkran("sonuc"); }} style={{ display:"flex", alignItems:"center", gap:6, background: C.y, border:`1px solid ${C.s}`, borderRadius:10, padding:"8px 14px", color: C.altin, cursor:"pointer", fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontSize:13, fontWeight:700, marginBottom:14 }}>
         ← Sonuçlara Dön
       </button>
     )}
     <div style={{ display:"flex", justifyContent:"flex-start", marginBottom: 14 }}>
       <button onClick={() => setMarketKategoriPanel(true)} style={{ display:"flex", alignItems:"center", gap:8, background: C.altin, border:`1px solid ${C.altin}`, borderRadius:10, padding:"10px 16px", color:"#1A1200", cursor:"pointer", fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontSize:13, fontWeight:700, boxShadow:`0 2px 8px ${C.altin}44` }}>
         ≡ Kategoriler
       </button>
     </div>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 14 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>★ ŞİFALI MARKET — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         Doğal alternatif ürünleri tek tıkla sipariş edebileceğin Şifalı Market burada açılacak. Sol üstteki <b>Kategoriler</b> butonundan 8 ana başlığa ve önerilen doğal ürünlere göz at.
       </div>
     </div>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}18, ${C.y2})`, border: `1px solid ${C.s}`, borderRadius: 14, padding: 16, marginBottom: 14 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>◈ ŞİFA HARİTASI — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         <b>Yerel Üretici Ağı:</b> Çevrendeki çiğ süt, ham bal, soğuk sıkım yağ, organik sebze üreticilerini harita üzerinde gösteren modül. Kısa zincir, taze ürün, doğrudan üreticiden.
       </div>
     </div>
   </div>
 )}

 {marketKategoriPanel && (
   <div onClick={() => setMarketKategoriPanel(false)} style={{ position:"fixed", inset:0, background:"#00000099", zIndex:9998, display:"flex", justifyContent:"flex-start" }}>
     <div onClick={(e)=>e.stopPropagation()} style={{ width:"min(420px, 92vw)", height:"100%", background: C.y2, borderRight:`2px solid ${C.altin}`, overflowY:"auto", boxShadow:"4px 0 20px #00000088" }}>
       <div style={{ position:"sticky", top:0, background: C.y2, borderBottom:`1px solid ${C.s}`, padding:"14px 16px", display:"flex", justifyContent:"space-between", alignItems:"center", zIndex:2 }}>
         <div style={{ color: C.altin, fontWeight:700, fontSize:15, letterSpacing:0.5 }}>KATEGORİLER</div>
         <button onClick={() => setMarketKategoriPanel(false)} style={{ background:"transparent", border:`1px solid ${C.s}`, color:C.metin, borderRadius:8, padding:"4px 10px", cursor:"pointer", fontSize:14 }}>✕</button>
       </div>
       <div style={{ padding: 12 }}>
         {Object.entries(MARKET_KATEGORI).map(([key, urunler]) => {
           const acik = marketAcikBaslik === key;
           const ad = KATEGORILER[key]?.ad || key;
           return (
             <div key={key} style={{ marginBottom: 8, border:`1px solid ${C.s}`, borderRadius: 10, background: C.y, overflow:"hidden" }}>
               <button onClick={() => setMarketAcikBaslik(acik ? null : key)} style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", background:"transparent", border:"none", padding:"12px 14px", color: C.metin, fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}>
                 <span>{ad}</span>
                 <span style={{ color: C.altin, fontSize:16, fontWeight:700, lineHeight:1 }}>{acik ? "−" : "+"}</span>
               </button>
               {acik && (
                 <div style={{ padding: "0 10px 10px 10px", display:"grid", gap:6 }}>
                   {urunler.map(u => (
                     <div key={u.ad} style={{ background: C.y2, border:`1px dashed ${C.s}`, borderRadius:8, padding:"8px 10px", position:"relative" }}>
                       <div style={{ color: C.metin, fontWeight:700, fontSize:12, marginBottom:2 }}>{u.ad}</div>
                       <div style={{ color: C.soluk, fontSize:11, lineHeight:1.4 }}>{u.aciklama}</div>
                       <span style={{ position:"absolute", top:5, right:5, background:C.altin, color:"#1A1200", fontSize:8, fontWeight:700, padding:"1px 5px", borderRadius:5 }}>YAKINDA</span>
                     </div>
                   ))}
                 </div>
               )}
             </div>
           );
         })}
         <div style={{ marginTop: 14, background:`linear-gradient(135deg, ${C.altin}22, ${C.y})`, border:`1px solid ${C.altin}66`, borderRadius:10, padding:12, position:"relative" }}>
           <div style={{ color: C.altin, fontWeight:700, fontSize:12, letterSpacing:0.5, marginBottom:4 }}>◈ ŞİFA HARİTASI</div>
           <div style={{ color: C.metin, fontSize:11, lineHeight:1.5 }}>Yerel Üretici Ağı — çiğ süt, ham bal, soğuk sıkım yağ, organik üreticileri harita üzerinde.</div>
           <span style={{ position:"absolute", top:8, right:8, background:C.altin, color:"#1A1200", fontSize:8, fontWeight:700, padding:"1px 5px", borderRadius:5 }}>YAKINDA</span>
         </div>
       </div>
     </div>
   </div>
 )}

 {/* EŞREF */}
 {sekme === "esref" && (() => {
   const ayFazi = (hicriGun) => {
     const g = parseInt(hicriGun);
     if (g <= 2 || g >= 28) return { ad: "Yeni Ay (Hilâl)", ikon: "🌑", oran: 0 };
     if (g <= 6) return { ad: "Büyüyen Hilâl", ikon: "🌒", oran: 25 };
     if (g <= 9) return { ad: "İlk Dördün", ikon: "🌓", oran: 50 };
     if (g <= 13) return { ad: "Büyüyen Bedir", ikon: "🌔", oran: 75 };
     if (g <= 16) return { ad: "Dolunay (Bedr)", ikon: "🌕", oran: 100 };
     if (g <= 20) return { ad: "Küçülen Bedir", ikon: "🌖", oran: 75 };
     if (g <= 23) return { ad: "Son Dördün", ikon: "🌗", oran: 50 };
     return { ad: "Küçülen Hilâl", ikon: "🌘", oran: 25 };
   };
   const faz = esrefData?.date?.hijri?.day ? ayFazi(esrefData.date.hijri.day) : null;
   const HICRI_AY_TR = { 1: "Muharrem", 2: "Safer", 3: "Rebiülevvel", 4: "Rebiülahir", 5: "Cemâziyelevvel", 6: "Cemâziyelahir", 7: "Receb", 8: "Şaban", 9: "Ramazan", 10: "Şevval", 11: "Zilkâde", 12: "Zilhicce" };
   const MILADI_AY_TR = { 1: "Ocak", 2: "Şubat", 3: "Mart", 4: "Nisan", 5: "Mayıs", 6: "Haziran", 7: "Temmuz", 8: "Ağustos", 9: "Eylül", 10: "Ekim", 11: "Kasım", 12: "Aralık" };
   const hicriAyTr = esrefData?.date?.hijri?.month?.number ? HICRI_AY_TR[parseInt(esrefData.date.hijri.month.number)] : esrefData?.date?.hijri?.month?.en;
   const miladiAyTr = esrefData?.date?.gregorian?.month?.number ? MILADI_AY_TR[parseInt(esrefData.date.gregorian.month.number)] : esrefData?.date?.gregorian?.month?.en;
   const NAMAZLAR = [
     ["Fajr", "İmsak / Fecr"], ["Sunrise", "Güneş"], ["Dhuhr", "Öğle"],
     ["Asr", "İkindi"], ["Maghrib", "Akşam"], ["Isha", "Yatsı"]
   ];
   const simdi = new Date();
   const dakika = simdi.getHours() * 60 + simdi.getMinutes();
   const ts2dk = (s) => { const [h, m] = s.split(":"); return parseInt(h) * 60 + parseInt(m); };
   const sirakiNamaz = esrefData?.timings ? NAMAZLAR.find(([k]) => ts2dk(esrefData.timings[k]) > dakika) : null;
   return (
 <div>
 <button onClick={() => setSekme("hizmetler")} style={{ display:"inline-flex", alignItems:"center", gap:6, background:C.y, border:`1px solid ${C.s}`, borderRadius:10, padding:"8px 14px", color:C.altin, cursor:"pointer", fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontSize:13, fontWeight:700, marginBottom:14 }}>← Hizmetlere Dön</button>
 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
   <div style={S.kB}>EŞREF SAATLERİ — ANLIK VAKTİ VE GÖK <span style={{ background: C.altin, color: "#1A1200", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 6, letterSpacing: 0.3, marginLeft: 6, verticalAlign: "middle" }}>YAKINDA</span></div>
   <button onClick={konumIste} style={{ background: C.altin + "22", border: `1px solid ${C.altin}66`, color: C.altin, borderRadius: 8, padding: "6px 11px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif", whiteSpace: "nowrap" }}>📍 Konumumu Kullan</button>
 </div>

 {/* CANLI API KARTI */}
 {!esrefData && !esrefHata && (
   <div style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 14, padding: 20, marginBottom: 14, textAlign: "center", color: C.soluk, fontSize: 13 }}>Konum ve namaz vakitleri yükleniyor...</div>
 )}
 {esrefHata && (
   <div style={{ background: "#FEE2E2", border: `1px solid ${C.kirmizi}`, borderRadius: 14, padding: 14, marginBottom: 14, color: C.kirmizi, fontSize: 13 }}>{esrefHata}</div>
 )}
 {esrefData && (
   <>
     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 12 }}>
       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
         <div>
           <div style={{ color: C.altin, fontSize: 10, fontWeight: 700, letterSpacing: 0.5 }}>HİCRİ TARİH</div>
           <div style={{ color: C.metin, fontSize: 18, fontWeight: 700, marginTop: 2 }}>{esrefData.date.hijri.day} {hicriAyTr} {esrefData.date.hijri.year}</div>
           <div style={{ color: C.soluk, fontSize: 11, marginTop: 2 }}>{esrefData.date.gregorian.day} {miladiAyTr} {esrefData.date.gregorian.year}</div>
         </div>
         {faz && (
           <div style={{ textAlign: "center" }}>
             <div style={{ fontSize: 36, lineHeight: 1 }}>{faz.ikon}</div>
             <div style={{ color: C.altin, fontSize: 10, fontWeight: 700, marginTop: 4 }}>{faz.ad}</div>
             <div style={{ color: C.soluk, fontSize: 10 }}>~%{faz.oran} dolu</div>
           </div>
         )}
       </div>
       <div style={{ paddingTop: 10, borderTop: `1px solid ${C.altin}30`, color: C.soluk, fontSize: 11 }}>
         Konum: {esrefData.lat}, {esrefData.lon} · Yöntem: Diyanet
       </div>
     </div>

     <div style={S.kB}>NAMAZ VAKİTLERİ (BUGÜN)</div>
     <div style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 14, padding: 6, marginBottom: 14 }}>
       {NAMAZLAR.map(([k, ad], i) => {
         const vakit = esrefData.timings[k]?.substring(0, 5);
         const aktif = sirakiNamaz && sirakiNamaz[0] === k;
         return (
           <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", borderBottom: i < NAMAZLAR.length - 1 ? `1px solid ${C.s}` : "none", background: aktif ? C.altin + "12" : "transparent", borderRadius: aktif ? 10 : 0 }}>
             <span style={{ color: aktif ? C.altin : C.metin, fontWeight: aktif ? 700 : 500, fontSize: 14 }}>{ad}</span>
             <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
               {aktif && <span style={{ background: C.altin, color: "#1A1200", borderRadius: 6, padding: "2px 8px", fontSize: 9, fontWeight: 700, letterSpacing: 0.3 }}>SIRADAKİ</span>}
               <span style={{ color: aktif ? C.altin : C.metin, fontFamily: "ui-monospace, monospace", fontSize: 16, fontWeight: 700 }}>{vakit}</span>
             </div>
           </div>
         );
       })}
     </div>
   </>
 )}

 <div style={S.kB}>ORGAN VAKTİ (KRONOBİYOLOJİ)</div>
 <div style={S.ipucu}>Kronobiyoloji ile desteklenen organ aktivite vakitleri. Nobel 2017 sirkadiyen ritim ödülü bilimsel dayanaktır.</div>
 <div style={S.notUyari}>* Bu bölüm; Çin tıbbı meridyen saati geleneğine dayanır. Sirkadiyen ritim bilimsel olarak kanıtlıdır; spesifik organ–saat eşleşmeleri için modern bilimsel kanıt sınırlıdır.</div>
 {ESREF.map((e, i) => {
 const h = new Date().getHours();
 const aktif = h >= i * 2 && h < i * 2 + 2;
 return (
 <div key={i} style={{ background: aktif ? C.altin + "18" : C.y, border: `1px solid ${aktif ? C.altin + "50" : C.s}`, borderRadius: 12, padding: 14, marginBottom: 8 }}>
 <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
 <span style={{ fontSize: 22 }}>{e.ikon}</span>
 <div style={{ flex: 1 }}>
 <div style={{ color: aktif ? C.altin : C.metin, fontWeight: 600 }}>{e.saat} · {e.organ}</div>
 <div style={{ color: C.soluk, fontSize: 13 }}>{e.eylem}</div>
 </div>
 {aktif && <span style={{ background: C.altin, color: "#1A1200", borderRadius: 6, padding: "2px 8px", fontSize: 10, fontWeight: 700 }}>ŞİMDİ</span>}
 </div>
 </div>
 );
 })}
 </div>
   );
 })()}

 {sekme === "burclar" && (
   <div>
     <button onClick={() => setSekme("hizmetler")} style={{ display:"inline-flex", alignItems:"center", gap:6, background:C.y, border:`1px solid ${C.s}`, borderRadius:10, padding:"8px 14px", color:C.altin, cursor:"pointer", fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontSize:13, fontWeight:700, marginBottom:14 }}>← Hizmetlere Dön</button>
     <div style={S.kB}>BURÇ ve MİZAÇ TABLOSU <span style={{ background: C.altin, color: "#1A1200", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 6, letterSpacing: 0.3, marginLeft: 6, verticalAlign: "middle" }}>YAKINDA</span></div>
     <div style={S.ipucu}>Osmanlı Tıbb-ı Nebevi ve İlm-i Nücum geleneğinde her burç belirli bir organ ve mizaç ile eşleşir. Sabuncuoğlu Şerefeddin gibi hekimbaşılar hastayı bu çerçevede değerlendirirdi: demevi (kan-ateş), safravi (öd-ateş), sevdevi (kara öd-toprak), balgami (balgam-su).</div>

     {profil && BURCLAR[profil.burc] && (
       <div style={{ background: C.y2, border: `1px solid ${C.altin}55`, borderLeft: `3px solid ${C.altin}`, borderRadius: 14, padding: 14, marginBottom: 14 }}>
         <div style={{ color: C.altin, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, marginBottom: 4 }}>SENİN BURCUN</div>
         <div style={{ fontSize: 22, fontWeight: 700, color: C.metin, marginBottom: 8 }}>{profil.burc}</div>
         <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.7 }}>
           <div><b style={{ color: C.altin }}>Element:</b> {BURCLAR[profil.burc].element} · <b style={{ color: C.altin }}>Mizaç:</b> {BURCLAR[profil.burc].mizac}</div>
           <div><b style={{ color: C.altin }}>Organ bölgen:</b> {BURCLAR[profil.burc].organ}</div>
           <div><b style={{ color: C.altin }}>Dost bitkiler:</b> {BURCLAR[profil.burc].bitki}</div>
           <div style={{ marginTop: 6, color: C.soluk, fontSize: 12, fontStyle: "italic" }}>{BURCLAR[profil.burc].tavsiye}</div>
         </div>
       </div>
     )}

     {Object.entries(BURCLAR).map(([ad, b]) => (
       <div key={ad} style={{ background: C.y, border: `1px solid ${C.s}`, borderLeft: `3px solid ${C.altin}`, borderRadius: 12, padding: 14, marginBottom: 8 }}>
         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
           <div style={{ color: C.metin, fontSize: 16, fontWeight: 700 }}>{ad}</div>
           <div style={{ color: C.soluk, fontSize: 11 }}>{b.element} · {b.mizac}</div>
         </div>
         <div style={{ color: C.metin, fontSize: 13, marginBottom: 5 }}><b style={{ color: C.altin }}>Organ:</b> {b.organ}</div>
         <div style={{ color: C.metin, fontSize: 13, marginBottom: 5 }}><b style={{ color: C.altin }}>Bitki:</b> {b.bitki}</div>
         <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.5, marginBottom: 6 }}>{b.tavsiye}</div>
         <div style={{ color: C.soluk, fontSize: 11, fontWeight: 600 }}>⚠ Kaçın: {b.kacinmasi.join(" · ")}</div>
       </div>
     ))}

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginTop: 14, marginBottom: 14 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>✦ HEKİMBAŞI PAKETİ — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         Premium üyelikle burcuna özel <b>haftalık şifa şerbeti</b> tarifleri, mizaç bazlı detoks takvimi, kişisel zikir-makam reçetesi ve Osmanlı usulü mevsim önerileri açılacak.
       </div>
       <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.altin}30` }}>
         Örnek bildirim: "Bu hafta senin burcun için karaciğer detoksu haftası — sana özel Osmanlı usulü şerbet tarifi hazır."
       </div>
     </div>

     <div style={{ color: C.soluk, fontSize: 11, lineHeight: 1.6, padding: 12, background: C.y2, borderRadius: 8, fontStyle: "italic", border: `1px dashed ${C.s}` }}>
       Bu bilgiler, Osmanlı tıbbı ve kadim geleneksel bilgiler ışığında kültürel ve bilgilendirme amaçlı sunulmuştur. Teşhis ve tedavi için tıp doktoruna danışınız.
     </div>
   </div>
 )}

 {sekme === "uzman" && (
   <div>
     <button onClick={() => setSekme("hizmetler")} style={{ display:"inline-flex", alignItems:"center", gap:6, background:C.y, border:`1px solid ${C.s}`, borderRadius:10, padding:"8px 14px", color:C.altin, cursor:"pointer", fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontSize:13, fontWeight:700, marginBottom:14 }}>← Hizmetlere Dön</button>
     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 14 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 14, marginBottom: 6, letterSpacing: 0.5 }}>◐ GÖRÜNTÜLÜ UZMAN DANIŞMAN — YAKINDA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.6 }}>
         Analiz sonucunda kafan karıştıysa: bir <b>fitoterapi uzmanı</b> veya <b>diyetisyen</b> ile 10 dakikalık hızlı görüntülü görüşme. "Bu içerik benim için ne kadar riskli?" sorusunu doğrudan uzmana sor, kişiye özel yorum al.
       </div>
       <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.altin}30` }}>
         Gelir paylaşımı modeliyle çalışan uzmanlar — kısa süreli, hızlı, kişisel danışmanlık.
       </div>
     </div>
   </div>
 )}

 {sekme === "asude" && (
   <div>
     <button onClick={() => setSekme("hizmetler")} style={{ display:"inline-flex", alignItems:"center", gap:6, background:C.y, border:`1px solid ${C.s}`, borderRadius:10, padding:"8px 14px", color:C.altin, cursor:"pointer", fontFamily:"Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontSize:13, fontWeight:700, marginBottom:14 }}>← Hizmetlere Dön</button>

     <div style={{ background: `linear-gradient(135deg, ${C.altin}22, ${C.y2})`, border: `1px solid ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 14 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 14, marginBottom: 8, letterSpacing: 0.5 }}>≈ ŞADIRVÂN-I ŞİFA</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.7, fontStyle: "italic" }}>
         Osmanlı Darüşşifa Protokolü: Osmanlı Çeşmesi su şırıltısı ve mizacına uygun makam icrasıyla görsel-işitsel sükûnet.
       </div>
     </div>

     {(() => {
       const aktifMakam = asudeMakam || (profil && MAKAMLAR[profil.makam] ? profil.makam : "Rast");
       const m = MAKAMLAR[aktifMakam] || MAKAMLAR["Rast"];
       const sevkMizac = profil && (profil.mizac === "Safravi" || profil.mizac === "Sevdevi");
       const dk = Math.floor(asudeKalan / 60), sn = String(asudeKalan % 60).padStart(2, "0");
       return (
         <div style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 16, padding: 18, marginBottom: 14, textAlign: "center" }}>
           {sevkMizac && <div style={{ display: "inline-block", background: `${C.altin}22`, border: `1px solid ${C.altin}66`, color: C.altin, fontSize: 10, fontWeight: 700, letterSpacing: 0.4, padding: "3px 10px", borderRadius: 20, marginBottom: 12 }}>MİZACIN İÇİN ÖNERİLDİ · {profil.mizac === "Safravi" ? "Safra (öfke/stres)" : "Sevda (melankoli)"}</div>}
           <div style={{ position: "relative", overflow: "hidden", borderRadius: 14, background: "linear-gradient(160deg, #0A1A3F, #06102A)", border: `1px solid ${C.altin}40`, padding: "12px 10px 14px", margin: "0 auto 14px" }}>
             <div style={{ position: "absolute", top: -50, left: "50%", transform: "translateX(-50%)", width: 240, height: 240, borderRadius: "50%", background: `radial-gradient(circle, ${C.altin}22, transparent 70%)`, pointerEvents: "none" }} />
             <div style={{ position: "absolute", inset: 0, opacity: 0.55, pointerEvents: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cg fill='%23C9952C' opacity='0.5'%3E%3Cpath d='M15 8 l1 3 3 1 -3 1 -1 3 -1 -3 -3 -1 3 -1 z'/%3E%3Cpath d='M44 30 l0.8 2.4 2.4 0.8 -2.4 0.8 -0.8 2.4 -0.8 -2.4 -2.4 -0.8 2.4 -0.8 z'/%3E%3Ccircle cx='30' cy='48' r='1'/%3E%3Ccircle cx='8' cy='40' r='1'/%3E%3C/g%3E%3C/svg%3E")`, backgroundSize: "60px 60px" }} />
             <div style={{ position: "relative", zIndex: 1 }}>
               <svg viewBox="0 0 200 210" width="188" height="197" style={{ display: "block", margin: "0 auto", filter: `drop-shadow(0 4px 12px ${C.altin}40)` }}>
                 <defs>
                   <linearGradient id="asGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F6DA8E" /><stop offset="0.5" stopColor="#C9952C" /><stop offset="1" stopColor="#8A6320" /></linearGradient>
                   <linearGradient id="asMarble" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FBF5E6" /><stop offset="0.5" stopColor="#E7D6AC" /><stop offset="1" stopColor="#C7AE78" /></linearGradient>
                   <linearGradient id="asDome" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F1E7C9" /><stop offset="1" stopColor="#BE9E60" /></linearGradient>
                   <radialGradient id="asWater" cx="0.5" cy="0.35" r="0.75"><stop offset="0" stopColor="#BFEEFF" /><stop offset="0.45" stopColor="#3E92C9" /><stop offset="1" stopColor="#0C3A5C" /></radialGradient>
                 </defs>
                 <g>
                   <path d="M100 4 q5 7 0 13 q-5 -6 0 -13 Z" fill="url(#asGold)" />
                   <circle cx="100" cy="19" r="3" fill="url(#asGold)" />
                   <path d="M96 25 a5 5 0 1 0 7 -1 a4 4 0 1 1 -7 1 Z" fill="url(#asGold)" />
                 </g>
                 <path d="M100 32 C78 34 62 48 62 64 L138 64 C138 48 122 34 100 32 Z" fill="url(#asDome)" stroke="#8A6320" strokeWidth="1" />
                 <g stroke="#A8843C" strokeWidth="0.7" opacity="0.7" fill="none"><path d="M100 33 C88 42 84 54 84 64" /><path d="M100 33 C112 42 116 54 116 64" /><path d="M100 33 L100 64" /></g>
                 <rect x="56" y="64" width="88" height="7" rx="2" fill="url(#asGold)" />
                 <g fill="#8A6320">{[0,1,2,3,4,5,6,7,8,9].map(i => <rect key={i} x={59 + i * 9} y={71} width="4" height="3" />)}</g>
                 {[60, 80, 120, 140].map((x, i) => (
                   <g key={i}>
                     <rect x={x - 3} y={76} width="6" height="46" rx="1.5" fill="url(#asMarble)" stroke="#B89A5E" strokeWidth="0.5" />
                     <rect x={x - 5} y={73} width="10" height="4" rx="1" fill="url(#asGold)" />
                     <rect x={x - 5} y={122} width="10" height="4" rx="1" fill="url(#asGold)" />
                   </g>
                 ))}
                 <g stroke="#C9952C" strokeWidth="1" fill="none" opacity="0.85"><path d="M80 78 Q70 72 60 78" /><path d="M140 78 Q130 72 120 78" /></g>
                 <ellipse cx="100" cy="86" rx="16" ry="4" fill="url(#asMarble)" stroke="#B89A5E" strokeWidth="0.6" />
                 <path d="M85 86 Q100 97 115 86" fill="url(#asMarble)" stroke="#B89A5E" strokeWidth="0.6" />
                 <ellipse cx="100" cy="86" rx="15" ry="3.4" fill="url(#asWater)" opacity="0.7" />
                 <line x1="100" y1="93" x2="100" y2="106" stroke="url(#asGold)" strokeWidth="2" />
                 <ellipse cx="100" cy="108" rx="28" ry="6" fill="url(#asMarble)" stroke="#B89A5E" strokeWidth="0.7" />
                 <path d="M72 108 Q100 126 128 108" fill="url(#asMarble)" stroke="#B89A5E" strokeWidth="0.7" />
                 <ellipse cx="100" cy="108" rx="27" ry="5.4" fill="url(#asWater)" opacity="0.65" />
                 <line x1="100" y1="122" x2="100" y2="150" stroke="url(#asGold)" strokeWidth="2.5" />
                 <path d="M52 152 L62 140 138 140 148 152 138 190 62 190 Z" fill="url(#asMarble)" stroke="#B89A5E" strokeWidth="1" />
                 <path d="M52 152 L148 152 138 190 62 190 Z" fill="#0C2A44" opacity="0.22" />
                 <ellipse cx="100" cy="152" rx="48" ry="11" fill="url(#asWater)" stroke="url(#asGold)" strokeWidth="2" />
                 <ellipse cx="88" cy="149" rx="18" ry="3.4" fill="#FFFFFF" opacity="0.22" />
                 {asudeOynar && [0, 1, 2].map(i => (
                   <ellipse key={i} cx="100" cy="153" rx="42" ry="9" fill="none" stroke="#DCEFFF" strokeWidth="1" style={{ transformBox: "fill-box", transformOrigin: "center", animation: `suHalka 3s ease-out ${i}s infinite` }} />
                 ))}
                 {asudeOynar && (
                   <g stroke="#DCEFFF" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.9" strokeDasharray="2 5">
                     <path d="M86 96 Q84 101 86 106" style={{ animation: "suAkis 0.5s linear infinite" }} />
                     <path d="M114 96 Q116 101 114 106" style={{ animation: "suAkis 0.5s linear infinite" }} />
                     <path d="M78 114 Q75 133 82 150" style={{ animation: "suAkis 0.6s linear infinite" }} />
                     <path d="M122 114 Q125 133 118 150" style={{ animation: "suAkis 0.6s linear infinite" }} />
                   </g>
                 )}
                 {asudeOynar && (
                   <g style={{ transformBox: "fill-box", transformOrigin: "50% 100%", animation: `fiskiye ${Math.max(2, asudeNefes / 2)}s ease-in-out infinite` }}>
                     <line x1="100" y1="86" x2="100" y2="68" stroke="#DCEFFF" strokeWidth="2.2" strokeLinecap="round" opacity="0.85" />
                     <circle cx="100" cy="68" r="1.6" fill="#EAF6FF" />
                   </g>
                 )}
               </svg>
               <div style={{ display: "inline-block", background: `${C.altin}1A`, border: `1px solid ${C.altin}55`, borderRadius: 10, padding: "5px 16px", marginTop: 4 }}>
                 <div style={{ color: C.altin, fontSize: 14, fontWeight: 700, letterSpacing: 0.5 }}>{aktifMakam}</div>
                 <div style={{ color: "#CFE3FF", fontSize: 11, marginTop: 1 }}>{asudeOynar ? `${dk}:${sn}` : m.organ.split(" · ")[0]}</div>
               </div>
             </div>
           </div>
           {asudeOynar && <div style={{ color: C.soluk, fontSize: 11, marginBottom: 12, fontStyle: "italic" }}>{asudeNefes >= 9 ? "Theta — derin sükûnet" : asudeNefes >= 7 ? "Alfa — sakinleşme" : "Beta yavaşlıyor — yavaşça nefes ver"}</div>}
           {!asudeOynar && <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 14 }}>
             {[[60, "1 dk"], [180, "3 dk"], [300, "5 dk"]].map(([s, l]) => (
               <button key={s} onClick={() => setAsudeSure(s)} style={{ background: asudeSure === s ? C.altin : C.y2, color: asudeSure === s ? "#1A1200" : C.soluk, border: `1px solid ${asudeSure === s ? C.altin : C.s}`, borderRadius: 20, padding: "6px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>{l}</button>
             ))}
           </div>}
           <button onClick={() => asudeOynar ? asudeDurdur() : asudeBaslat(aktifMakam)} style={{ background: asudeOynar ? C.y2 : `linear-gradient(135deg, ${C.altin}, ${C.altinA})`, color: asudeOynar ? C.altin : "#1A1200", border: `1px solid ${C.altin}`, borderRadius: 24, padding: "11px 30px", fontSize: 14, fontWeight: 700, letterSpacing: 0.5, cursor: "pointer", fontFamily: "inherit" }}>{asudeOynar ? "■ Sükûneti Bitir" : "▶ Şadırvânı Uyandır"}</button>
           <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginTop: 14, padding: "10px 12px", background: `${C.altin}0E`, border: `1px solid ${C.altin}33`, borderRadius: 10, textAlign: "left" }}>
             <span style={{ color: C.altin, fontSize: 13, lineHeight: 1.3, flexShrink: 0 }}>♪</span>
             <span style={{ color: C.soluk, fontSize: 11, lineHeight: 1.6 }}>
               <b style={{ color: C.altin }}>İşitsel deneyim hazırlanıyor.</b> Şadırvânın özgün su şırıltısı ve ney makam icrası, stüdyo kalitesinde kayıtlarla sunulacaktır. Şu an modül <b>görsel sükûnet</b> deneyimi olarak çalışmaktadır; ses kayıtları yüklendiğinde işitsel katman kendiliğinden devreye girer.
             </span>
           </div>
         </div>
       );
     })()}

     <button onClick={() => setAsudeHakkinda(v => !v)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", background: C.y, border: `1px solid ${C.s}`, borderRadius: 14, padding: "13px 16px", marginBottom: 12, cursor: "pointer", fontFamily: "inherit" }}>
       <span style={{ color: C.altin, fontWeight: 700, fontSize: 13, letterSpacing: 0.5 }}>HAKKINDA · KADİM GERÇEK</span>
       <span style={{ color: C.altin, fontSize: 12, transform: asudeHakkinda ? "rotate(180deg)" : "none", transition: "transform .2s" }}>▾</span>
     </button>
     {asudeHakkinda && (<>
     <div style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 14, padding: 16, marginBottom: 12 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 13, marginBottom: 8, letterSpacing: 0.5 }}>KADİM GERÇEK</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.7 }}>
         Osmanlı tıbbında (özellikle <b>Edirne Sultan II. Bayezid Darüşşifası</b>'nda) ruhsal sıkıntılar, anksiyete ve zihinsel yorgunluklar asla kimyasalla uyuşturulmazdı. Hastanın şifası; merkeze yerleştirilen bir <b>şadırvanın su şırıltısı</b>, o kişinin mizacına uygun çalınan musiki makamları (<b>Nihavend, Rast</b> vb.) ve çiçek kokuları ile sağlanırdı. Mimari akustik, bu frekansların doğrudan beynin ilgili merkezine ulaşması için tasarlanmıştı.
       </div>
     </div>

     <div style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 14, padding: 16, marginBottom: 12 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 13, marginBottom: 8, letterSpacing: 0.5 }}>İŞLEYİŞ MANTIĞI</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.7 }}>
         Su sesi, zihindeki "kaos" frekanslarını (<b>beta dalgalarını</b>) yavaşlatarak kişiyi fıtratındaki sakinlik seviyesine (<b>alfa/theta dalgalarına</b>) çeker. Bu, doğanın en saf akustik müdahalesidir.
       </div>
     </div>

     <div style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 14, padding: 16, marginBottom: 12 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 13, marginBottom: 8, letterSpacing: 0.5 }}>UYGULAMADAKİ YERİ</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.7, marginBottom: 10 }}>
         <b>Sistem Tepkisi:</b> Kullanıcının mizaç analizi (nabız/yüz okuma) sonucu <b>"Safra (Öfke/Aşırı Stres)"</b> veya <b>"Sevda (Melankoli)"</b> yüksek çıktığında, uygulama ekranda kırmızı uyarılar vermek yerine arka planda otomatik olarak Şadırvân-ı Şifa modülünü devreye sokar.
       </div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.7 }}>
         <b>Fıtrat Uyarlaması:</b> Modern "meditasyon" uygulamalarının standart müzikleri yerine; doğrudan kullanıcının o anki mizacını dengeleyecek belirli bir frekanstaki <b>"Osmanlı Çeşmesi"</b> su sesi ve ona entegre edilmiş <b>mikro musiki makamları</b> çalar.
       </div>
     </div>
     </>)}

     <button onClick={() => setAsudeArsiv(v => !v)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", background: C.y, border: `1px solid ${C.s}`, borderRadius: 14, padding: "13px 16px", marginBottom: 12, cursor: "pointer", fontFamily: "inherit" }}>
       <span style={{ color: C.metin, fontWeight: 700, fontSize: 13, letterSpacing: 0.5 }}>ŞİFA MAKAMLARI ARŞİVİ</span>
       <span style={{ color: C.soluk, fontSize: 12, transform: asudeArsiv ? "rotate(180deg)" : "none", transition: "transform .2s" }}>▾</span>
     </button>
     {asudeArsiv && (
     <div style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 14, padding: 16, marginBottom: 12 }}>
       <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, marginBottom: 12, fontStyle: "italic" }}>Osmanlı darüşşifalarında her makam belirli bir organ ve mizaca eşlenirdi. Aşağıdaki arşiv tarihsel kaynaklara dayanır; modern bilimsel kanıt sınırlıdır. Bir makama dokunarak şadırvanda o makamı dinleyebilirsin.</div>
       {Object.entries(MAKAMLAR).map(([isim, m]) => {
         const calan = asudeOynar && asudeMakam === isim;
         return (
         <button key={isim} onClick={() => asudeBaslat(isim)} style={{ display: "block", width: "100%", textAlign: "left", background: calan ? `${C.altin}10` : C.y2, border: `1px solid ${calan ? C.altin : C.s}`, borderRadius: 10, padding: 12, marginBottom: 8, borderLeft: `3px solid ${calan ? C.altin : C.s}`, cursor: "pointer", fontFamily: "inherit" }}>
           <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
             <div style={{ flex: 1 }}>
               <div style={{ color: C.metin, fontWeight: 700, fontSize: 14 }}>{isim} Makamı {calan && <span style={{ color: C.altin, fontSize: 11, fontWeight: 700 }}>· çalıyor ≈</span>}</div>
               <div style={{ color: C.soluk, fontSize: 11, marginTop: 1 }}>{m.organ}</div>
             </div>
             <div style={{ color: C.soluk, fontSize: 11, fontWeight: 600 }}>{m.vakit}</div>
           </div>
           <div style={{ color: C.soluk, fontSize: 12, marginBottom: 4 }}>{m.etki}</div>
           <div style={{ color: C.cok, fontSize: 10 }}>{m.vakit} · {m.aletler}</div>
         </button>
         );
       })}
       {profil && MAKAMLAR[profil.makam] && (
         <div style={{ background: C.y2, border: `1px solid ${C.altin}55`, borderRadius: 10, padding: 14, marginTop: 8, textAlign: "center" }}>
           <div style={{ color: C.altin, fontSize: 10, fontWeight: 700, letterSpacing: 0.5, marginBottom: 4 }}>SENİN ŞİFA MAKAMIN</div>
           <div style={{ color: C.metin, fontSize: 18, fontWeight: 700 }}>{profil.makam}</div>
           <div style={{ color: C.soluk, fontSize: 12, marginTop: 2 }}>{MAKAMLAR[profil.makam].etki}</div>
         </div>
       )}
     </div>
     )}

     <div style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 14, padding: 16, marginBottom: 12 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 13, marginBottom: 8, letterSpacing: 0.5 }}>KAYNAK & TARİHSEL DAYANAK</div>
       <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.7 }}>
         Su sesi + makam + koku ile tedavi, <b>Edirne Sultan II. Bayezid Darüşşifası</b>'nda tarihsel olarak belgelenmiştir. Makam-organ eşleşmeleri Hekimbaşı <b>Gevrekzade Hâfız Hasan Efendi</b>, <b>Hasan Şuûrî</b> ve <b>Haşim Bey</b>'in eserlerine dayanır. Makam perdeleri Türk müziği nazariyesine (Bolahenk akort, Yegâh ≈ 110 Hz) dayanır. Modern bilimsel kanıt sınırlıdır.
       </div>
     </div>

     <div style={{ background: C.y2, border: `1px dashed ${C.altin}66`, borderRadius: 14, padding: 16, marginBottom: 12 }}>
       <div style={{ color: C.altin, fontWeight: 700, fontSize: 13, marginBottom: 8, letterSpacing: 0.5 }}>HUKUKİ ÇERÇEVE & TIBBİ STATÜ</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.7, marginBottom: 10 }}>
         Bu modül; Anayasa 26-28 ifade özgürlüğü ve UNESCO Somut Olmayan Kültürel Miras (Osmanlı darüşşifa geleneği) kapsamında <b>"Akustik Fıtrat Uyumlaması"</b> ve <b>"Biyolojik Ritim Regülasyonu"</b> olarak tanımlanmıştır. Psikoterapi, teşhis, tedavi veya ilaç ikamesi değildir; kullanıcının kendi sükûnetine ulaşması için kültürel-akustik bir aktarımdır.
       </div>
       <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.7 }}>
         Sağlanan içerik yalnızca <b>kültürel ve bilgilendirme amaçlıdır</b>; tıbbi tavsiye yerine geçmez ve hiçbir hastalığın teşhis, tedavi, önlenmesi veya iyileştirilmesi iddiasını taşımaz. Mevcut bir rahatsızlık, gebelik, işitme/nöbet öyküsü veya psikiyatrik durum hâlinde kullanmadan önce hekiminize danışın; tıbbi tedavinizi bırakmayın. Ses, cihazınızda yerel olarak sentezlenir; <b>kayıt alınmaz, mikrofon kullanılmaz ve KVKK kapsamında hiçbir kişisel veri toplanmaz/aktarılmaz</b>. Kullanımdan doğabilecek sonuçların sorumluluğu kullanıcıya aittir.
       </div>
     </div>
   </div>
 )}
 {/* MERTEBE */}
 {sekme === "mertebe" && (() => {
   const mevcut = mevcutMertebe();
   const sonrakiIdx = MERTEBELER.findIndex(x => x.k === mevcut.k) + 1;
   const sonraki = MERTEBELER[sonrakiIdx] || null;
   const gunSayisi = Math.floor((Date.now() - (liyakat.baslangic || Date.now())) / 86400000);
   const sefaatS = (liyakat.sefaatler || []).length;
   const hatm = liyakat.gunlukSeri || 0;
   const terfi = terfiHakki();
   const hicri = hicriCevir(new Date(liyakat.baslangic || Date.now()));
   const vakar = mevcut.k === "hekimbasi" ? 1 : mevcut.k === "kethuda" ? 0.85 : mevcut.k === "kalfa" ? 0.7 : 0.55;
   const arkaplan = mevcut.k === "hekimbasi" ? `linear-gradient(135deg, ${mevcut.renk}30, #FFF8E1, ${mevcut.renk}18)` : mevcut.k === "kethuda" ? `linear-gradient(135deg, ${mevcut.renk}22, ${C.y2})` : mevcut.k === "kalfa" ? `linear-gradient(135deg, ${mevcut.renk}18, ${C.y2})` : `linear-gradient(135deg, ${mevcut.renk}10, ${C.y2})`;
   const cozulenSualS = ((liyakat.cozulenSualler || {})[mevcut.k] || []).length;
   const toplamSualS = (SUALLER[mevcut.k] || []).length;
   return (
     <div>
       <div style={S.kB}>MERTEBE — AHİLİK YOLU</div>

       <div style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 12, padding: 12, marginBottom: 12 }}>
         <div style={{ color: C.altin, fontSize: 11, fontWeight: 700, marginBottom: 6, letterSpacing: 0.3 }}>İSİM / LAKAP (İSTEĞE BAĞLI)</div>
         <input type="text" value={liyakat.lakap || ""} maxLength={24} placeholder="Örn: Mahmut Bey" onChange={e => { const v = e.target.value; setLiyakat(o => { const yeni = { ...o, lakap: v }; try { localStorage.setItem("bd_liyakat", JSON.stringify(yeni)); } catch {}; return yeni; }); }} style={{ width: "100%", background: C.y2, border: `1px solid ${C.s}`, borderRadius: 8, padding: "9px 12px", color: C.metin, fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
         <div style={{ color: C.cok, fontSize: 10, marginTop: 5 }}>Pîr seni bu isimle anar. Profil ve paylaşımlarda görünür.</div>
       </div>

       <div onTouchStart={longPressBaslat} onTouchEnd={longPressBitir} onTouchCancel={longPressBitir} onTouchMove={longPressHareket} onMouseDown={longPressBaslat} onMouseUp={longPressBitir} onMouseLeave={longPressBitir} style={{ background: `${arkaplan}, url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M40 0 Q60 20 40 40 Q20 60 40 80 M0 40 Q20 20 40 40 Q60 60 80 40 M20 0 Q40 20 20 40 Q0 60 20 80 M60 0 Q80 20 60 40 Q40 60 60 80' stroke='%23B8862F' stroke-width='0.4' fill='none' opacity='0.5'/%3E%3Ccircle cx='40' cy='40' r='2' fill='%23B8862F' opacity='0.3'/%3E%3C/svg%3E")`, backgroundBlendMode: "normal", backgroundSize: "auto, 80px 80px", border: `${mevcut.k === "hekimbasi" ? 2.5 : mevcut.k === "kethuda" ? 2 : 1.5}px ${mevcut.k === "kalfa" ? "double" : "solid"} ${mevcut.renk}${mevcut.k === "hekimbasi" ? "" : "60"}`, borderRadius: mevcut.k === "hekimbasi" ? 20 : 16, padding: 18 + vakar * 10, marginBottom: 14, textAlign: "center", boxShadow: mevcut.k === "hekimbasi" ? `0 8px 32px ${mevcut.renk}30, inset 0 0 40px ${mevcut.renk}10` : mevcut.k === "kethuda" ? `inset 0 0 24px ${mevcut.renk}15` : "none", transition: parallaxAktif ? "transform 0.15s ease-out, filter .6s" : "all .6s", position: "relative", overflow: "hidden", filter: (liyakat.mahcubiyetHaftalari || []).length >= 3 ? "saturate(0.55) opacity(0.78)" : "none", cursor: "pointer", userSelect: "none", WebkitUserSelect: "none", WebkitTouchCallout: "none", touchAction: "manipulation", transform: parallaxAktif ? `perspective(1000px) rotateY(${parallaxEgim.x * 6}deg) rotateX(${-parallaxEgim.y * 6}deg)` : "none", transformStyle: "preserve-3d" }}>
         {mevcut.k === "kalfa" && <><div style={{ position: "absolute", top: 6, left: 6, right: 6, height: 1, background: `linear-gradient(90deg, transparent, ${mevcut.renk}, transparent)` }} /><div style={{ position: "absolute", bottom: 6, left: 6, right: 6, height: 1, background: `linear-gradient(90deg, transparent, ${mevcut.renk}, transparent)` }} /></>}
         {mevcut.k === "kethuda" && <><div style={{ position: "absolute", top: 0, left: 0, width: 38, height: 38, borderTop: `2px solid ${mevcut.renk}`, borderLeft: `2px solid ${mevcut.renk}`, borderRadius: "16px 0 0 0" }} /><div style={{ position: "absolute", top: 0, right: 0, width: 38, height: 38, borderTop: `2px solid ${mevcut.renk}`, borderRight: `2px solid ${mevcut.renk}`, borderRadius: "0 16px 0 0" }} /><div style={{ position: "absolute", bottom: 0, left: 0, width: 38, height: 38, borderBottom: `2px solid ${mevcut.renk}`, borderLeft: `2px solid ${mevcut.renk}`, borderRadius: "0 0 0 16px" }} /><div style={{ position: "absolute", bottom: 0, right: 0, width: 38, height: 38, borderBottom: `2px solid ${mevcut.renk}`, borderRight: `2px solid ${mevcut.renk}`, borderRadius: "0 0 16px 0" }} /><div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: `linear-gradient(180deg, transparent, ${mevcut.renk}40, transparent)`, transform: "translateX(-50%)" }} /></>}
         {mevcut.k === "hekimbasi" && <><div style={{ position: "absolute", inset: 6, border: `1px solid ${mevcut.renk}80`, borderRadius: 14, pointerEvents: "none" }} /><div style={{ position: "absolute", inset: 11, border: `0.5px solid ${mevcut.renk}50`, borderRadius: 10, pointerEvents: "none" }} /><div style={{ position: "absolute", top: -2, left: "50%", transform: "translateX(-50%)", color: mevcut.renk, fontSize: 16, fontFamily: "'Cormorant Garamond', Georgia, serif", lineHeight: 1 }}>❦</div><div style={{ position: "absolute", bottom: -2, left: "50%", transform: "translateX(-50%) rotate(180deg)", color: mevcut.renk, fontSize: 16, fontFamily: "'Cormorant Garamond', Georgia, serif", lineHeight: 1 }}>❦</div></>}
         <div style={{ display: "flex", justifyContent: "center", marginBottom: 10, position: "relative", zIndex: 1, animation: `muhurNefes ${mevcut.k === "hekimbasi" ? 4.5 : mevcut.k === "kethuda" ? 5 : mevcut.k === "kalfa" ? 5.5 : 6}s ease-in-out infinite`, pointerEvents: "none" }}><Muhur k={mevcut.k} boyut={64 + vakar * 28} /></div>
         <div style={{ color: mevcut.renk, fontSize: 32 + vakar * 6, fontWeight: 700, letterSpacing: 2 + vakar, fontFamily: "'Cormorant Garamond', Georgia, serif", position: "relative", zIndex: 1, textShadow: mevcut.k === "hekimbasi" ? `0 0 18px ${mevcut.renk}40` : "none" }}>{mevcut.ad}</div>
         <div style={{ color: C.cok, fontSize: 11, marginTop: 2, fontStyle: "italic", position: "relative", zIndex: 1 }}>{mevcut.anlam}</div>
         <div style={{ color: mevcut.renk, fontSize: 12, marginTop: 6, fontWeight: 700, letterSpacing: 1, position: "relative", zIndex: 1 }}>HİKMETİ · {mevcut.hikmet.toUpperCase()}</div>
         {cozulenSualS === toplamSualS && toplamSualS > 0 && mevcut.k === "hekimbasi" && <div style={{ color: mevcut.renk, fontSize: 11, fontWeight: 700, marginTop: 6, letterSpacing: 1.5, position: "relative", zIndex: 1 }}>HÂCİM · ÜÇ SIRRI ÇÖZEN</div>}
         <div style={{ color: C.altin, fontSize: 13, fontWeight: 700, marginTop: 10, position: "relative", zIndex: 1 }}>{liyakat.puan} liyakat puanı</div>
       </div>

       <div style={{ background: `linear-gradient(135deg, ${pir.k === "lokman" ? "#7FB069" : pir.k === "edviye" ? "#5B8CB8" : pir.k === "mizan" ? "#A586C2" : "#C97A4F"}18, ${C.y2})`, border: `1px solid ${C.s}`, borderRadius: 14, padding: 14, marginBottom: 14 }}>
         <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
           <div style={{ width: 48, height: 48, borderRadius: "50%", background: `radial-gradient(circle, ${pir.k === "lokman" ? "#7FB069" : pir.k === "edviye" ? "#5B8CB8" : pir.k === "mizan" ? "#A586C2" : "#C97A4F"}, ${C.y2})`, border: `1.5px solid ${pir.k === "lokman" ? "#7FB069" : pir.k === "edviye" ? "#5B8CB8" : pir.k === "mizan" ? "#A586C2" : "#C97A4F"}`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 18, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700 }}>{pir.ad.charAt(4)}</div>
           <div style={{ flex: 1 }}>
             <div style={{ color: C.cok, fontSize: 10, fontWeight: 700, letterSpacing: 0.5 }}>PÎRİN</div>
             <div style={{ color: C.metin, fontSize: 14, fontWeight: 700, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{pir.ad}</div>
             <div style={{ color: C.soluk, fontSize: 11, marginTop: 2, fontStyle: "italic" }}>{pir.uzmanlik}</div>
           </div>
         </div>
         <div style={{ display: "flex", gap: 10, padding: "8px 0 0", borderTop: `1px solid ${C.s}` }}>
           <div style={{ flex: 1, textAlign: "center" }}>
             <div style={{ color: C.altin, fontSize: 18, fontWeight: 700, fontFamily: "'Cormorant Garamond', Georgia, serif" }}><CountUp value={muridYasi()} /></div>
             <div style={{ color: C.cok, fontSize: 10 }}>gündür müridisin</div>
           </div>
           <div style={{ width: 1, background: C.s }} />
           <div style={{ flex: 1, textAlign: "center" }}>
             <div style={{ color: C.altin, fontSize: 18, fontWeight: 700, fontFamily: "'Cormorant Garamond', Georgia, serif" }}><CountUp value={pirMuridSayisi(pir.k)} duration={1100} /></div>
             <div style={{ color: C.cok, fontSize: 10 }}>toplam müridi</div>
           </div>
           <div style={{ width: 1, background: C.s }} />
           <div style={{ flex: 1, textAlign: "center" }}>
             <div style={{ color: C.altin, fontSize: 18, fontWeight: 700, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>#<CountUp value={pirIcindeSiraNo()} duration={900} /></div>
             <div style={{ color: C.cok, fontSize: 10 }}>içinde sıran</div>
           </div>
         </div>
         <div onClick={parallaxAktif ? () => setParallaxAktif(false) : parallaxAc} style={{ marginTop: 8, padding: "7px 12px", background: parallaxAktif ? C.altin + "20" : C.y2, border: `1px solid ${parallaxAktif ? C.altin : C.s}`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
           <div>
             <div style={{ color: parallaxAktif ? C.altin : C.metin, fontSize: 12, fontWeight: 600 }}>Eğim hassasiyeti {parallaxAktif ? "açık" : "kapalı"}</div>
             <div style={{ color: C.cok, fontSize: 9, marginTop: 1, fontStyle: "italic" }}>{parallaxAktif ? "telefonu eğ, kart hareket etsin" : "telefon eğimine duyarlı kart"}</div>
           </div>
           <div style={{ width: 32, height: 18, background: parallaxAktif ? C.altin : C.s, borderRadius: 9, position: "relative", transition: "background .2s" }}>
             <div style={{ width: 14, height: 14, background: "#fff", borderRadius: "50%", position: "absolute", top: 2, left: parallaxAktif ? 16 : 2, transition: "left .2s" }} />
           </div>
         </div>
       </div>
       {liyakat.niyet && (() => {
         return (
           <div style={{ background: `${C.altin}10`, border: `1px solid ${C.altin}40`, borderRadius: 10, padding: "12px 12px", marginBottom: 14 }}>
             <div style={{ color: C.altin, fontWeight: 700, letterSpacing: 1, fontSize: 10, marginBottom: 5 }}>NİYETİN</div>
             <div style={{ color: C.metin, fontSize: 14, fontStyle: "italic", fontFamily: "'Cormorant Garamond', Georgia, serif", lineHeight: 1.5 }}>"{liyakat.niyet}"</div>
             <button onClick={() => { setNiyetTaslak(liyakat.niyet || ""); setNiyetModal(true); }} style={{ background: "none", border: "none", color: C.soluk, fontSize: 10, cursor: "pointer", marginTop: 6, textDecoration: "underline", padding: 0 }}>değiştir</button>
           </div>
         );
       })()}

       <button onClick={() => setVirdAcik(true)} style={{ width: "100%", background: `linear-gradient(135deg, ${C.altin}15, ${C.y2})`, border: `1px solid ${C.altin}60`, borderRadius: 12, padding: "11px 14px", marginBottom: 14, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
         <span style={{ color: C.altin, fontSize: 18 }}>◯</span>
         <span style={{ color: C.altin, fontSize: 13, fontWeight: 700, letterSpacing: 0.5 }}>VİRD-İ SOFRA · 33 TESBİH</span>
       </button>

       {/* SİLSİLE-İ NÛR */}
       <div style={S.kB}>SİLSİLE-İ NÛR · {nur.damla} DAMLA</div>
       <div style={{ background: "linear-gradient(180deg,#0A1020,#141E33)", border: `1px solid ${C.altin}40`, borderRadius: 14, padding: 12, marginBottom: 14 }}>
         {(() => {
           const d = nur.damla;
           const tiers = 5;
           const nodes = []; let prev = [{ x: 100, y: 138 }];
           for (let t = 1; t <= tiers; t++) {
             const cnt = Math.pow(2, t); const y = 138 - t * 23; const cur = [];
             for (let i = 0; i < cnt; i++) { const x = (i + 0.5) / cnt * 180 + 10; const parent = prev[Math.floor(i / 2)] || prev[0]; cur.push({ x, y }); nodes.push({ x, y, px: parent.x, py: parent.y }); }
             prev = cur;
           }
           const acik = Math.min(nodes.length, d);
           return (
             <svg width="100%" height="150" viewBox="0 0 200 155" style={{ display: "block" }}>
               <line x1="100" y1="153" x2="100" y2="138" stroke={C.altin} strokeWidth="2.5" opacity="0.8" />
               {nodes.slice(0, acik).map((n, i) => (
                 <g key={i}>
                   <line x1={n.px} y1={n.py} x2={n.x} y2={n.y} stroke={C.altinA} strokeWidth="1" opacity="0.55" />
                   <circle cx={n.x} cy={n.y} r="3.2" fill={C.altinA} opacity="0.18" />
                   <circle cx={n.x} cy={n.y} r="1.7" fill="#FFE9A8"><animate attributeName="opacity" values="1;0.5;1" dur={`${2.5 + i % 3}s`} repeatCount="indefinite" /></circle>
                 </g>
               ))}
             </svg>
           );
         })()}
         <div style={{ color: "#C9A84C", fontSize: 10, textAlign: "center", fontStyle: "italic", marginTop: 4 }}>Her tarama bir nur damlası — soyun büyüdükçe ağacın ışıldar.</div>
       </div>

       {/* HİZMET KERVANI */}
       {(() => {
         const ANCHOR = new Date("2026-05-30").getTime();
         const buyume = Math.max(0, Math.floor((Date.now() - ANCHOR) / 60000 * 1.7));
         const toplam = Math.min(998472, 47312 + buyume + taramaSayisi);
         const oran = Math.min(100, toplam / 1000000 * 100);
         return (
           <>
             <div style={S.kB}>HİZMET KERVANI · ORTAK SEFER</div>
             <div style={{ background: C.y, border: `1px solid ${C.altin}40`, borderRadius: 14, padding: 14, marginBottom: 14 }}>
               <div style={{ color: C.metin, fontSize: 12, lineHeight: 1.5, marginBottom: 10 }}>Kervanın ortak hedefi: <b style={{ color: C.altin }}>1.000.000</b> zararlı madde tespiti. Sen de bu sefere katıldın.</div>
               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
                 <span style={{ color: C.altin, fontSize: 20, fontWeight: 700, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{toplam.toLocaleString("tr-TR")}</span>
                 <span style={{ color: C.cok, fontSize: 11 }}>/ 1.000.000</span>
               </div>
               <div style={{ background: C.s, borderRadius: 5, height: 8, overflow: "hidden" }}>
                 <div style={{ width: `${oran}%`, height: "100%", background: `linear-gradient(90deg,${C.altin},${C.altinA})`, transition: "width .6s" }} />
               </div>
               <div style={{ color: C.soluk, fontSize: 11, marginTop: 8 }}>Senin katkın: <b style={{ color: C.altin }}>{taramaSayisi}</b> tespit · kervan seninle bir adım daha yol aldı.</div>
             </div>
           </>
         );
       })()}


       {(liyakat.yildizlar || []).length > 0 && (
         <>
           <div style={S.kB}>ŞAHİT YILDIZLAR · {(liyakat.yildizlar || []).length}</div>
           <div style={{ background: "linear-gradient(180deg, #0A1628 0%, #1A2B47 100%)", borderRadius: 14, padding: 0, marginBottom: 14, position: "relative", height: 180, overflow: "hidden", border: `1px solid ${C.altin}40` }}>
             <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ display: "block" }}>
               {(liyakat.yildizlar || []).map((y, i) => (
                 <g key={i}>
                   <circle cx={y.x} cy={y.y} r={1.2 + y.parlaklik * 0.6} fill={y.renk} opacity={y.parlaklik}>
                     <animate attributeName="opacity" values={`${y.parlaklik};${y.parlaklik * 0.4};${y.parlaklik}`} dur={`${3 + i % 4}s`} repeatCount="indefinite" />
                   </circle>
                   <circle cx={y.x} cy={y.y} r={2.5} fill={y.renk} opacity="0.15" />
                 </g>
               ))}
             </svg>
             <div style={{ position: "absolute", bottom: 6, left: 10, color: "#D4AF37", fontSize: 9, fontStyle: "italic", letterSpacing: 0.5 }}>kendi takımyıldızın</div>
           </div>
         </>
       )}

       <div style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 12, padding: 12, marginBottom: 14 }}>
         <div style={{ color: C.altin, fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>SÎNÂ DEFTER · KALBİMDEN GEÇENLER</div>
         <textarea value={sinaDefter} onChange={e => { const v = e.target.value; setSinaDefter(v); try { localStorage.setItem("bd_sina_defter", v); } catch {} }} placeholder="Sadece sen ve kalbin... yaz, kimse görmez." rows={3} style={{ width: "100%", background: C.y2, border: `1px solid ${C.s}`, borderRadius: 8, padding: 10, color: C.metin, fontSize: 13, lineHeight: 1.5, resize: "vertical", fontFamily: "'Cormorant Garamond', Georgia, serif", boxSizing: "border-box", outline: "none" }} />
         <div style={{ color: C.cok, fontSize: 9, marginTop: 4, fontStyle: "italic", textAlign: "center" }}>yerel kayıt, paylaşılmaz</div>
       </div>

       <div style={{ background: C.y2, border: `1px dashed ${C.altin}50`, borderRadius: 10, padding: 12, marginBottom: 14, textAlign: "center" }}>
         <div style={{ color: C.altin, fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>MENSUBİYET TESCİLİ</div>
         <div style={{ color: C.metin, fontSize: 12, marginTop: 4, fontFamily: "'Cormorant Garamond', Georgia, serif", lineHeight: 1.5 }}>{hicri.gun} {hicri.ay} {hicri.yil}'de âsitânemize katıldın.</div>
         <div style={{ color: C.cok, fontSize: 11, marginTop: 2 }}>Sıra numaran <b style={{ color: C.altin }}>#<CountUp value={siraNoHesapla(liyakat.baslangic)} duration={1100} /></b></div>
       </div>

       <div style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 12, padding: 14, marginBottom: 14 }}>
         <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.65 }}>{mevcut.aciklama}</div>
       </div>

       <div style={{ background: `linear-gradient(135deg, ${C.altin}20, ${C.y2})`, border: `1px solid ${C.altin}50`, borderRadius: 12, padding: 14, marginBottom: 14, display: "flex", alignItems: "center", gap: 14 }}>
         <div style={{ width: 50, height: 50, borderRadius: "50%", background: C.altin + "20", border: `1.5px solid ${C.altin}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
           <span style={{ color: C.altin, fontSize: 22, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700 }}><CountUp value={hatm} /></span>
         </div>
         <div style={{ flex: 1 }}>
           <div style={{ color: C.altin, fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>SOFRA NÖBETİ · HATM</div>
           <div style={{ color: C.metin, fontSize: 14, fontWeight: 700, marginTop: 2 }}>{hatm} gün üst üste</div>
           <div style={{ color: C.soluk, fontSize: 11, marginTop: 2, fontStyle: "italic" }}>Her gün bir adım — emaneti koru</div>
         </div>
       </div>

       {sonraki && (
         <>
           <div style={S.kB}>TERFİ ŞARTLARI · {sonraki.ad.toUpperCase()}</div>
           <div style={{ background: C.y, border: `1.5px solid ${sonraki.renk}40`, borderRadius: 14, padding: 14, marginBottom: 14 }}>
             {[
               { ad: "Yola gireli geçen gün", deger: gunSayisi, hedef: sonraki.sart.gun, birim: "gün" },
               { ad: "Tarama sayısı", deger: parseInt(localStorage.getItem("bd_tarama_sayisi") || "0"), hedef: sonraki.sart.urun, birim: "ürün" },
               { ad: "Hatm-i nöbet (üst üste)", deger: hatm, hedef: sonraki.sart.hatm, birim: "gün" },
               { ad: "Şefaat — kurtarılan can", deger: sefaatS, hedef: sonraki.sart.sefaat, birim: "can" },
               { ad: "Liyakat puanı", deger: liyakat.puan, hedef: sonraki.esik, birim: "puan" },
             ].map(x => {
               const tamam = x.deger >= x.hedef;
               const oran = Math.min(100, (x.deger / Math.max(x.hedef, 1)) * 100);
               return (
                 <div key={x.ad} style={{ marginBottom: 12 }}>
                   <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                     <span style={{ color: tamam ? sonraki.renk : C.metin, fontSize: 12, fontWeight: tamam ? 700 : 500 }}>{tamam ? "✓ " : ""}{x.ad}</span>
                     <span style={{ color: tamam ? sonraki.renk : C.soluk, fontSize: 11, fontWeight: 700 }}>{x.deger} / {x.hedef} {x.birim}</span>
                   </div>
                   <div style={{ background: C.s, borderRadius: 4, height: 5, overflow: "hidden" }}>
                     <div style={{ width: `${oran}%`, height: "100%", background: tamam ? sonraki.renk : C.altin, transition: "width .4s" }} />
                   </div>
                 </div>
               );
             })}
             {terfi && (
               <button onClick={() => setAhdModal({ mertebeK: terfi.k })} style={{ width: "100%", marginTop: 10, background: `linear-gradient(135deg, ${terfi.renk}, ${terfi.renk}CC)`, color: "#fff", border: "none", borderRadius: 12, padding: "13px", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.5 }}>AHDİNİ VER · {terfi.ad.toUpperCase()} OL</button>
             )}
           </div>
         </>
       )}

       {(liyakat.ahdler && Object.keys(liyakat.ahdler).length > 0) && (
         <>
           <div style={S.kB}>AHD-İ MÎSÂK · VERDİĞİN SÖZLER</div>
           {Object.entries(liyakat.ahdler).map(([mk, ahd]) => {
             const m = MERTEBELER.find(x => x.k === mk);
             if (!m) return null;
             return (
               <div key={mk} style={{ background: C.y, border: `1px solid ${m.renk}50`, borderRadius: 12, padding: 14, marginBottom: 8, position: "relative" }}>
                 <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                   <Muhur k={mk} boyut={22} />
                   <span style={{ color: m.renk, fontSize: 12, fontWeight: 700, letterSpacing: 0.5 }}>{m.ad.toUpperCase()} AHDİ</span>
                   <span style={{ color: C.cok, fontSize: 10, marginLeft: "auto" }}>{new Date(ahd.tarih).toLocaleDateString("tr-TR")}</span>
                 </div>
                 <div style={{ color: C.metin, fontSize: 12, lineHeight: 1.7, fontStyle: "italic", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>"{ahd.metin}"</div>
                 {ahd.catlak > 0 && <div style={{ color: C.kirmizi, fontSize: 10, marginTop: 6 }}>Bu ahdde {ahd.catlak} çatlak görüldü.</div>}
               </div>
             );
           })}
         </>
       )}

       <div style={S.kB}>SIRLI SUÂLLER · {cozulenSualS}/{toplamSualS} ÇÖZÜLDÜ</div>
       <div style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 12, padding: 12, marginBottom: 14 }}>
         <div style={{ color: C.soluk, fontSize: 12, lineHeight: 1.6, marginBottom: 8 }}>Pîr-i {pir.ad.split("-")[1]} sana ait olan {toplamSualS} sırlı suâli zaman zaman taramanın içinde sorar. Çözdüklerin rumuz olarak mührünün yanında durur.</div>
         <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
           {(SUALLER[mevcut.k] || []).map((_, i) => {
             const cozulen = ((liyakat.cozulenSualler || {})[mevcut.k] || []).includes(i);
             return <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", border: `1.5px solid ${cozulen ? mevcut.renk : C.s}`, background: cozulen ? mevcut.renk + "20" : C.y2, display: "flex", alignItems: "center", justifyContent: "center", color: cozulen ? mevcut.renk : C.cok, fontSize: 11, fontWeight: 700 }}>{cozulen ? "✓" : "?"}</div>;
           })}
         </div>
       </div>

       {liyakat.hediyeler && liyakat.hediyeler.length > 0 && (
         <>
           <div style={S.kB}>HEDİYELERİN · {liyakat.hediyeler.length}</div>
           <div style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 12, padding: 10, marginBottom: 14, color: C.soluk, fontSize: 12, lineHeight: 1.5 }}>
             Pîrlerden ve üst mertebedeki yârenlerden gelen hikmet ve dualar. Saklarsın, gerektiğinde okursun.
           </div>
         </>
       )}

       {(() => {
         const aktif = erbainAktif();
         const tamamlandi = liyakat.erbain && liyakat.erbain.tamamlandi;
         const baslamadi = !liyakat.erbain || !liyakat.erbain.baslangic;
         return (
           <>
             <div style={S.kB}>ERBÂİN · 40 GÜNLÜK ÇİLE</div>
             <div style={{ background: tamamlandi ? `linear-gradient(135deg, ${C.altin}30, #FFF8E1)` : C.y, border: `${tamamlandi ? 2 : 1}px solid ${tamamlandi ? C.altin : C.s}`, borderRadius: 14, padding: 14, marginBottom: 14, boxShadow: tamamlandi ? `0 8px 24px ${C.altin}30` : "none" }}>
               {baslamadi && (
                 <>
                   <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.65, marginBottom: 10 }}>40 günlük çile (erbâin), nefsini terbiye eden geleneksel programdır. Her gün küçük bir görev. 40 günü tamamlayan <b style={{ color: C.altin }}>Erbâin Hil'atı</b> giyer.</div>
                   <button onClick={erbainBaslat} style={{ width: "100%", background: `linear-gradient(135deg, ${C.altin}, ${C.altinA})`, color: "#1A1200", border: "none", borderRadius: 10, padding: "11px", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.5 }}>ÇİLEYE BAŞLA</button>
                 </>
               )}
               {tamamlandi && (
                 <div style={{ textAlign: "center" }}>
                   <div style={{ fontSize: 36, color: C.altin, marginBottom: 8 }}>✦</div>
                   <div style={{ color: C.altin, fontSize: 18, fontWeight: 700, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Erbâin Tamam</div>
                   <div style={{ color: C.metin, fontSize: 12, marginTop: 4 }}>Hil'at giydin · 40 gün boyunca sebat ettin</div>
                 </div>
               )}
               {aktif && (() => {
                 const gun = erbainGunNo();
                 const tamamGunler = liyakat.erbain.tamamGunler || [];
                 const buGunTamam = tamamGunler.includes(gun);
                 const gorev = ERBAIN_GOREVLERI[gun - 1] || "";
                 const oran = tamamGunler.length / 40;
                 const cevre = 2 * Math.PI * 32;
                 return (
                   <>
                     <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                       <div style={{ position: "relative", width: 76, height: 76, flexShrink: 0 }}>
                         <svg width="76" height="76" style={{ transform: "rotate(-90deg)" }}>
                           <circle cx="38" cy="38" r="32" stroke={C.s} strokeWidth="5" fill="none" />
                           <circle cx="38" cy="38" r="32" stroke={C.altin} strokeWidth="5" fill="none" strokeDasharray={cevre} strokeDashoffset={cevre * (1 - oran)} strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s ease-out", filter: `drop-shadow(0 0 4px ${C.altin}80)` }} />
                         </svg>
                         <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                           <div style={{ color: C.altin, fontSize: 22, fontWeight: 700, lineHeight: 1 }}><CountUp value={tamamGunler.length} /></div>
                           <div style={{ color: C.cok, fontSize: 9, marginTop: 1 }}>/ 40</div>
                         </div>
                       </div>
                       <div style={{ flex: 1, minWidth: 0 }}>
                         <div style={{ color: C.altin, fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>BUGÜN · GÜN {gun}/40</div>
                         <div style={{ color: C.metin, fontSize: 13, fontWeight: 600, marginTop: 4, fontFamily: "'Cormorant Garamond', Georgia, serif", lineHeight: 1.4 }}>{gorev}</div>
                         {!buGunTamam && (
                           <button onClick={() => erbainGorevTamamla(gun)} style={{ marginTop: 8, background: C.altin, color: "#fff", border: "none", borderRadius: 8, padding: "7px 14px", fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>Yaptım</button>
                         )}
                         {buGunTamam && <div style={{ color: "#16A34A", fontSize: 14, fontWeight: 700, marginTop: 6 }}>✓ Bugünün görevi tamam</div>}
                       </div>
                     </div>
                     <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 3, marginBottom: 8 }}>
                       {Array.from({length: 40}, (_, i) => {
                         const g = i + 1;
                         const t = tamamGunler.includes(g);
                         const bugun = g === gun;
                         const gecmis = g < gun;
                         const eksik = gecmis && !t;
                         return <div key={g} style={{ aspectRatio: "1/1", borderRadius: 4, background: t ? C.altin : bugun ? C.altin + "30" : eksik ? C.kirmizi + "20" : C.y2, border: `1px solid ${t ? C.altin : bugun ? C.altin : eksik ? C.kirmizi + "60" : C.s}`, display: "flex", alignItems: "center", justifyContent: "center", color: t ? "#fff" : eksik ? C.kirmizi : C.cok, fontSize: 9, fontWeight: 700 }}>{g}</div>;
                       })}
                     </div>
                     <div style={{ color: C.cok, fontSize: 10, textAlign: "center" }}>{tamamGunler.length}/40 tamam · {40 - gun} gün kaldı</div>
                   </>
                 );
               })()}
             </div>
           </>
         );
       })()}

       {(() => {
         const acilan = (liyakat.acilanSirlar || {})[pir.k] || [];
         const tum = PIR_SIRLARI[pir.k] || [];
         if (acilan.length === 0) return null;
         return (
           <>
             <div style={S.kB}>PÎR'İN SIRLARI · {acilan.length}/{tum.length} AÇILDI</div>
             <div style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 12, padding: 10, marginBottom: 14 }}>
               {acilan.map(idx => {
                 const sir = tum[idx];
                 if (!sir) return null;
                 return (
                   <div key={idx} style={{ background: `linear-gradient(135deg, ${C.altin}10, ${C.y2})`, border: `1px solid ${C.altin}40`, borderRadius: 10, padding: 12, marginBottom: 6 }}>
                     <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                       <span style={{ color: C.altin, fontSize: 14 }}>✦</span>
                       <span style={{ color: C.altin, fontSize: 13, fontWeight: 700, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{sir.baslik}</span>
                     </div>
                     <div style={{ color: C.metin, fontSize: 12, lineHeight: 1.6, marginBottom: 6 }}>{sir.metin}</div>
                     <div style={{ color: C.cok, fontSize: 10, fontStyle: "italic" }}>— {sir.kaynak}</div>
                   </div>
                 );
               })}
               {acilan.length < tum.length && (
                 <div style={{ background: C.y2, border: `1px dashed ${C.s}`, borderRadius: 10, padding: 10, color: C.cok, fontSize: 11, textAlign: "center", fontStyle: "italic" }}>{tum.length - acilan.length} sır daha bekler — mertebeni yükselt</div>
               )}
             </div>
           </>
         );
       })()}

       {(liyakat.hatiralar && liyakat.hatiralar.length > 0) && (
         <>
           <div style={S.kB}>PÎR'İN DEFTERİ · {liyakat.hatiralar.length} HATIRA</div>
           <div style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 12, padding: 8, marginBottom: 14, maxHeight: 280, overflowY: "auto" }}>
             {[...(liyakat.hatiralar || [])].slice(-30).reverse().map((h, i) => {
               const tarih = new Date(h.t);
               const ikon = { selam: "☼", yad: "✦", hediye: "❀", ahd: "✑", sual: "?", terfi: "✦", mahcubiyet: "!", yokluk: "—", niyet: "♥" }[h.tip] || "·";
               const renk = { mahcubiyet: C.kirmizi, terfi: C.altin, ahd: "#B87333", yokluk: C.soluk }[h.tip] || C.altin;
               return (
                 <div key={i} style={{ display: "flex", gap: 10, padding: "8px 10px", borderBottom: i < Math.min(29, liyakat.hatiralar.length - 1) ? `1px solid ${C.s}` : "none" }}>
                   <div style={{ color: renk, fontSize: 14, width: 16, textAlign: "center", flexShrink: 0 }}>{ikon}</div>
                   <div style={{ flex: 1 }}>
                     <div style={{ color: C.metin, fontSize: 12, lineHeight: 1.5 }}>{h.metin}</div>
                     <div style={{ color: C.cok, fontSize: 9, marginTop: 2 }}>{tarih.toLocaleDateString("tr-TR")} · {tarih.toLocaleTimeString("tr-TR", {hour:"2-digit", minute:"2-digit"})}</div>
                   </div>
                 </div>
               );
             })}
           </div>
         </>
       )}

       <div style={S.kB}>TÜM MERTEBELER</div>
       {MERTEBELER.map(m => {
         const aktif = m.k === mevcut.k;
         const idx = MERTEBELER.findIndex(x => x.k === m.k);
         const aktifIdx = MERTEBELER.findIndex(x => x.k === mevcut.k);
         const gecildi = idx <= aktifIdx;
         return (
           <div key={m.k} style={{ display: "flex", alignItems: "center", gap: 12, background: aktif ? m.renk + "18" : C.y, border: `1px solid ${aktif ? m.renk : C.s}`, borderRadius: 10, padding: 12, marginBottom: 6, opacity: gecildi ? 1 : 0.5 }}>
             <Muhur k={m.k} boyut={36} />
             <div style={{ flex: 1 }}>
               <div style={{ color: aktif ? m.renk : C.metin, fontWeight: 700, fontSize: 14 }}>{m.ad} <span style={{ color: C.cok, fontSize: 11, fontWeight: 400 }}>· {m.anlam}</span></div>
               <div style={{ color: C.soluk, fontSize: 11, marginTop: 2 }}>Hikmet: {m.hikmet} · {m.sart.gun}g · {m.sart.urun}ü · {m.sart.sefaat}ş</div>
             </div>
             {aktif && <span style={{ color: m.renk, fontSize: 11, fontWeight: 700 }}>ŞU AN</span>}
           </div>
         );
       })}

       <div style={S.kB}>YAKINDA — TOPLULUK ÖZELLİKLERİ</div>
       <div style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 12, padding: 6, marginTop: 4 }}>
         {[
           { ad: "Liyakat Sıralaması", aciklama: "En çok şefaat eden ve hatm tutan yârenler — aylık şeref defteri" },
           { ad: "Hekimbaşı Yorumları", aciklama: "Hekimbaşı mertebesindeki yârenler madde detayında yorum yazar, herkes okur" },
           { ad: "Mahalle Haritası", aciklama: "Kethüdâlar kendi semtindeki şüpheli marketleri, raf manipülasyonlarını ve reklam tuzaklarını harita üzerinde işaretler" },
           { ad: "Şifa Akçesi & Şifalı Market", aciklama: "Tarama, madde önerisi ve katkı ile Şifa Akçesi kazanılır. Mertebene göre indirim (Kalfa %5 · Kethüda %10 · Hekimbaşı %15) ile temiz aktar, yerli üretici ürünleri alınır." },
           { ad: "Şahit Zinciri", aciklama: "Kimi yetiştirdiğin, kimin seni yetiştirdiği — soy ağacı şeklinde âsitânemizin hâfızası" },
         ].map((y, i, arr) => (
           <div key={y.ad} style={{ padding: "12px 14px", borderBottom: i < arr.length - 1 ? `1px solid ${C.s}` : "none" }}>
             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
               <span style={{ color: C.metin, fontWeight: 700, fontSize: 13 }}>{y.ad}</span>
               <span style={{ background: C.altin + "22", color: C.altin, fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 6, letterSpacing: 0.5 }}>YAKINDA</span>
             </div>
             <div style={{ color: C.soluk, fontSize: 11, lineHeight: 1.5 }}>{y.aciklama}</div>
           </div>
         ))}
       </div>

       <div style={{ background: C.y2, border: `1px dashed ${C.s}`, borderRadius: 10, padding: 12, marginTop: 14, color: C.soluk, fontSize: 10, lineHeight: 1.6, fontStyle: "italic" }}>
         Mertebe sistemi bir oyunlaştırma katmanıdır — tıbbi tavsiye, teşhis veya tedavi değildir. Tüm veriler (puan, ahdler, hediyeler, sefaatler) <b>yalnız bu cihazda</b> tutulur (KVKK 6698 uyumlu). Çırak → Kalfa → Kethüda → Hekimbaşı sıralaması Ahilik geleneğine dayanır (UNESCO Somut Olmayan Kültürel Miras, 2020). Detaylı kaynaklar için <b>Hakkında → Mertebe Sistemi</b>.
       </div>
     </div>
   );
 })()}

 {/* SU ATM */}
 {sekme === "atm" && <SuAtmSekmesi />}

 {/* HAKKINDA */}
 {sekme === "hakkinda" && (
 <div>
 <ToplulugaKatki taramaSayisi={taramaSayisi} />

 <div style={S.kB}>HAKKINDA & BİLİMSEL DAYANAK</div>
 <BolumKart ikon={HAKKINDA.hukuki.ikon} renk={HAKKINDA.hukuki.renk} baslik={HAKKINDA.hukuki.baslik} ozet={HAKKINDA.hukuki.ozet} items={HAKKINDA.hukuki.items} />
 <BolumKart ikon={HAKKINDA.islam.ikon} renk={HAKKINDA.islam.renk} baslik={HAKKINDA.islam.baslik} ozet={HAKKINDA.islam.ozet} items={HAKKINDA.islam.items} />
 <BolumKart ikon={HAKKINDA.bilim.ikon} renk={HAKKINDA.bilim.renk} baslik={HAKKINDA.bilim.baslik} ozet={HAKKINDA.bilim.ozet} items={HAKKINDA.bilim.items} />
 <BolumKart ikon={HAKKINDA.frekans.ikon} renk={HAKKINDA.frekans.renk} baslik={HAKKINDA.frekans.baslik} ozet={HAKKINDA.frekans.ozet} items={HAKKINDA.frekans.items} />
 <BolumKart ikon={HAKKINDA.mertebe.ikon} renk={HAKKINDA.mertebe.renk} baslik={HAKKINDA.mertebe.baslik} ozet={HAKKINDA.mertebe.ozet} items={HAKKINDA.mertebe.items} />
 <BolumKart ikon={HAKKINDA.hizmetler.ikon} renk={HAKKINDA.hizmetler.renk} baslik={HAKKINDA.hizmetler.baslik} ozet={HAKKINDA.hizmetler.ozet} items={HAKKINDA.hizmetler.items} />

 <div style={{ height: 1, background: C.s, margin: "20px 0" }} />
 <div style={S.kB}>MADDE ARŞİVİ</div>
 <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginBottom: 12 }}>
 {Object.entries(KATEGORILER).map(([k, v]) => (
 <button key={k} onClick={() => setKategori(k)} style={{ padding: "8px 4px", borderRadius: 10, border: `1px solid ${kategori === k ? C.altin : C.s}`, background: kategori === k ? C.altin + "18" : C.y, color: kategori === k ? C.altin : C.soluk, cursor: "pointer", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontSize: 11, fontWeight: kategori === k ? 700 : 500 }}>{v.ad}</button>
 ))}
 </div>
 {(() => {
   const gruplar = {};
   Object.entries(KATEGORILER[kategori].db).forEach(([kod, v]) => {
     const k = v.kat || "Diğer";
     if (!gruplar[k]) gruplar[k] = [];
     gruplar[k].push([kod, v]);
   });
   const riskSira = { kritik: 0, yuksek: 1, orta: 2, dusuk: 3 };
   const grupBaskinRisk = (maddeler) => {
     return maddeler.reduce((en, [, v]) => (riskSira[v.risk] ?? 9) < (riskSira[en] ?? 9) ? v.risk : en, "dusuk");
   };
   return Object.entries(gruplar).sort((a, b) => (riskSira[grupBaskinRisk(a[1])] ?? 9) - (riskSira[grupBaskinRisk(b[1])] ?? 9)).map(([grupAd, maddeler]) => {
     const acik = maddeGrupAcik === grupAd;
     const baskin = grupBaskinRisk(maddeler);
     return (
       <div key={grupAd} style={{ marginBottom: 8 }}>
         <div onClick={() => setMaddeGrupAcik(acik ? null : grupAd)} style={{ background: C.y, border: `1px solid ${acik ? rR(baskin) : C.s}`, borderRadius: 12, padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
           <div style={{ width: 8, height: 8, borderRadius: 4, background: rR(baskin), flexShrink: 0 }} />
           <div style={{ flex: 1 }}>
             <div style={{ color: acik ? rR(baskin) : C.metin, fontWeight: 700, fontSize: 14 }}>{grupAd}</div>
             <div style={{ color: C.soluk, fontSize: 11, marginTop: 2 }}>{maddeler.length} madde</div>
           </div>
           <span style={{ color: acik ? rR(baskin) : C.cok, fontSize: 14 }}>{acik ? "▲" : "▼"}</span>
         </div>
         {acik && (
           <div style={{ paddingTop: 8 }}>
             {maddeler.map(([kod, v]) => (
               <div key={kod} style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 12, padding: 14, marginBottom: 6, borderLeft: `4px solid ${rR(v.risk)}`, cursor: "pointer" }} onClick={() => setModal({ kod, ...v })}>
                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                   <div>
                     <div style={{ color: C.altin, fontSize: 10, fontWeight: 700, letterSpacing: 0 }}>{kod} · {v.kat}</div>
                     <div style={{ color: C.metin, fontSize: 14, fontWeight: 600 }}>{v.ad}</div>
                   </div>
                   <div style={{ background: rR(v.risk), borderRadius: 6, padding: "3px 8px", color: "#fff", fontWeight: 700, fontSize: 10 }}>{rE(v.risk)}</div>
                 </div>
                 <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>{(v.organlar || []).map(o => <span key={o} style={S.orgTag}>{o}</span>)}</div>
               </div>
             ))}
           </div>
         )}
       </div>
     );
   });
 })()}

 </div>
 )}
 </div>

 {geriGerekli && (
   <button onClick={geriYap} aria-label="Geri" style={{ position: "fixed", left: 14, bottom: "calc(70px + env(safe-area-inset-bottom))", zIndex: 50, width: 48, height: 48, borderRadius: "50%", background: C.altin, color: "#1A1200", border: "none", boxShadow: "0 4px 14px rgba(0,0,0,0.18)", cursor: "pointer", fontSize: 22, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit" }}>←</button>
 )}

 {/* ALT NAVİGASYON */}
 <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 520, background: C.y, borderTop: `1px solid ${C.s}`, display: "flex", zIndex: 30, paddingBottom: "env(safe-area-inset-bottom)" }}>
 {[["tarama", "", "Tara"], ["profil", "", "Profil"], ["mertebe", "", "Mertebe"], ["hizmetler", "", "Hizmetler"], ["atm", "", "Su ATM"], ["hakkinda", "", "Hakkında"]].map(([k, ikon, label, yakinda]) => (
 <button key={k} onClick={() => setSekme(k)} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", padding: "10px 4px 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif", position: "relative" }}>
 <span style={{ fontSize: 18, filter: sekme === k ? `drop-shadow(0 0 6px ${C.altin})` : "none" }}>{ikon}</span>
 <span style={{ fontSize: 12, color: sekme === k ? C.altin : C.metin, fontWeight: sekme === k ? 700 : 500, letterSpacing: 0 }}>{label}</span>
 {sekme === k && <div style={{ width: 20, height: 2, background: C.altin, borderRadius: 2 }} />}
 {yakinda && <span style={{ position: "absolute", top: 2, right: 2, background: C.altin, color: "#1A1200", fontSize: 7, fontWeight: 700, padding: "1px 4px", borderRadius: 6, letterSpacing: 0.3 }}>YAKINDA</span>}
 </button>
 ))}
 </div>

 {/* MODAL */}
 {raporAcik && <HaftalikRapor gecmis={gecmis} onKapat={() => setRaporAcik(false)} />}
      {marketAcik && profil && <MizacMarket profil={profil} onKapat={() => setMarketAcik(false)} />}
      {tarifModal && <TarifModal tarif={tarifModal} onKapat={() => setTarifModal(null)} />}
      {paylasMaddesi && <PaylasModal madde={paylasMaddesi} onKapat={() => setPaylasMaddesi(null)} rutbeAd={mevcutMertebe().ad} rutbeRenk={mevcutMertebe().renk} lakap={liyakat.lakap} />}
 {yeniMertebeBildirim && (() => {
   const m = MERTEBELER.find(x => x.k === yeniMertebeBildirim);
   if (!m) return null;
   return (
     <div style={{ position: "fixed", inset: 0, background: "#000000C0", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1200, backdropFilter: "blur(6px)", padding: 20 }} onClick={() => setYeniMertebeBildirim(null)}>
       <div style={{ background: `linear-gradient(180deg, ${m.renk}28, ${C.y})`, borderRadius: 20, padding: 30, maxWidth: 380, width: "100%", border: `2px solid ${m.renk}`, textAlign: "center" }} onClick={e => e.stopPropagation()}>
         <div style={{ color: m.renk, fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>MERTEBE YÜKSELDİ</div>
         <div style={{ display: "flex", justifyContent: "center", margin: "10px 0 14px" }}><Muhur k={m.k} boyut={90} /></div>
         <div style={{ color: m.renk, fontSize: 36, fontWeight: 700, letterSpacing: 2, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{m.ad}</div>
         <div style={{ color: C.cok, fontSize: 12, marginTop: 4, fontStyle: "italic" }}>{m.anlam}</div>
         <div style={{ color: m.renk, fontSize: 11, marginTop: 8, fontWeight: 700, letterSpacing: 1 }}>HİKMET · {m.hikmet.toUpperCase()}</div>
         <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.65, marginTop: 16, marginBottom: 20 }}>{m.aciklama}</div>
         <button onClick={() => setYeniMertebeBildirim(null)} style={{ width: "100%", background: m.renk, color: "#fff", border: "none", borderRadius: 12, padding: "13px", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>Devam</button>
       </div>
     </div>
   );
 })()}
 {selamModal && (
   <div style={{ position: "fixed", inset: 0, background: "#00000060", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1300, backdropFilter: "blur(4px)", padding: 20 }} onClick={() => setSelamModal(null)}>
     <div style={{ background: C.y, borderRadius: 18, padding: 28, maxWidth: 340, width: "100%", border: `1px solid ${C.s}`, textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }} onClick={e => e.stopPropagation()}>
       {selamModal.yad && <div style={{ color: C.altin, fontSize: 10, fontWeight: 600, letterSpacing: 2, marginBottom: 12 }}>YÂD</div>}
       <div style={{ fontSize: 26, marginBottom: 14, color: C.altin, fontFamily: "'Cormorant Garamond', Georgia, serif", opacity: 0.85 }}>﷽</div>
       <div style={{ color: C.metin, fontSize: 16, lineHeight: 1.55, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500, marginBottom: 10 }}>{selamModal.metin}</div>
       {selamModal.pir && <div style={{ color: C.cok, fontSize: 11, marginBottom: 20, fontStyle: "italic" }}>— {selamModal.pir.ad}</div>}
       <button onClick={() => {
         setSelamModal(null);
         const bugun = new Date().toDateString();
         if (liyakat.sonGuncel !== bugun && liyakat.lakap && !selamModal.yad) {
           setTimeout(() => {
             const hit = liyakat.lakap;
             const dunKayit = (gecmis || []).filter(g => g.zaman && (Date.now() - g.zaman) < 86400000 * 2 && (Date.now() - g.zaman) > 0);
             const sonraki = sonrakiMertebe(liyakat.puan);
             const veri = {
               taramaSayisi: dunKayit.length,
               kritik: dunKayit.reduce((a, g) => a + (g.kritik || 0), 0),
               muridYasi: muridYasi(),
               hatm: liyakat.gunlukSeri || 0,
               niyet: liyakat.niyet || null,
               hicriAy: hicriCevir(new Date()).ay,
               sefaat: (liyakat.sefaatler || []).length,
               kalan: sonraki ? Math.max(0, sonraki.esik - liyakat.puan) : 0,
             };
             const sablon = GUNCEL_KALIPLARI[Math.floor(Math.random() * GUNCEL_KALIPLARI.length)];
             const metin = sablon(pir, hit, veri);
             setGuncelModal({ metin });
             setLiyakat(o => { const yeni = { ...o, sonGuncel: bugun, hatiralar: [...(o.hatiralar || []), { t: Date.now(), tip: "guncel", metin: `Pîr'in günceli: "${metin}"`, pir: pir.k }].slice(-100) }; try { localStorage.setItem("bd_liyakat", JSON.stringify(yeni)); } catch {}; return yeni; });
           }, 700);
         }
       }} style={{ width: "100%", background: "transparent", color: C.altin, border: `1px solid ${C.altin}80`, borderRadius: 10, padding: "11px", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.3 }}>Ve Aleyküm Selâm</button>
     </div>
   </div>
 )}
 {ahdModal && (() => {
   const tm = MERTEBELER.find(x => x.k === ahdModal.mertebeK);
   if (!tm) return null;
   const metinler = AHD_METINLER[ahdModal.mertebeK] || [];
   const seciliM = ahdModal.secili != null ? ahdModal.secili : 0;
   return (
     <div style={{ position: "fixed", inset: 0, background: "#000000D0", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1400, backdropFilter: "blur(10px)", padding: 16, overflowY: "auto" }}>
       <div style={{ background: `linear-gradient(180deg, ${tm.renk}28, ${C.y})`, borderRadius: 20, padding: 26, maxWidth: 440, width: "100%", border: `2px solid ${tm.renk}`, margin: "20px 0" }}>
         <div style={{ textAlign: "center", marginBottom: 14 }}>
           <div style={{ color: tm.renk, fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>AHD-İ MÎSÂK</div>
           <div style={{ color: tm.renk, fontSize: 24, fontWeight: 700, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{tm.ad}</div>
           <div style={{ color: C.cok, fontSize: 11, marginTop: 4, fontStyle: "italic" }}>Bu mertebeye girer iken şahid tut, ahdini yaz.</div>
         </div>
         <div style={{ color: C.altin, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, marginBottom: 8 }}>HAZIR METİN SEÇ</div>
         {metinler.map((m, i) => (
           <div key={i} onClick={() => setAhdModal({ ...ahdModal, secili: i, ozelMetin: "" })} style={{ background: seciliM === i ? tm.renk + "20" : C.y2, border: `1.5px solid ${seciliM === i ? tm.renk : C.s}`, borderRadius: 10, padding: 12, marginBottom: 8, cursor: "pointer" }}>
             <div style={{ color: seciliM === i ? tm.renk : C.metin, fontSize: 12, lineHeight: 1.6, fontStyle: "italic" }}>{m}</div>
           </div>
         ))}
         <div style={{ color: C.altin, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, marginTop: 12, marginBottom: 6 }}>VEYA KENDİ AHDİNİ YAZ</div>
         <textarea value={ahdModal.ozelMetin || ""} onChange={e => setAhdModal({ ...ahdModal, ozelMetin: e.target.value, secili: -1 })} placeholder="Ahdimi şu kelimelerle veririm..." rows={3} style={{ width: "100%", background: C.y2, border: `1px solid ${C.s}`, borderRadius: 10, padding: 12, color: C.metin, fontSize: 12, lineHeight: 1.6, resize: "vertical", fontFamily: "inherit", boxSizing: "border-box", marginBottom: 14 }} />
         <div style={{ display: "flex", gap: 8 }}>
           <button onClick={() => setAhdModal(null)} style={{ flex: 1, background: "none", border: `1px solid ${C.s}`, color: C.soluk, borderRadius: 12, padding: "12px", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Vazgeç</button>
           <button onClick={() => { const m = (ahdModal.ozelMetin && ahdModal.ozelMetin.length > 20) ? ahdModal.ozelMetin : metinler[seciliM]; if (!m) return; ahdImzala(ahdModal.mertebeK, m); }} style={{ flex: 2, background: tm.renk, color: "#fff", border: "none", borderRadius: 12, padding: "12px", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.5 }}>MÜHRÜMÜ VURDUM</button>
         </div>
       </div>
     </div>
   );
 })()}
 {sualModal && (() => {
   const s = sualModal.sual;
   const cevaplandi = sualModal.cevap != null;
   const dogru = cevaplandi && sualModal.cevap === s.d;
   return (
     <div style={{ position: "fixed", inset: 0, background: "#000000C0", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1350, backdropFilter: "blur(6px)", padding: 16 }}>
       <div style={{ background: `linear-gradient(180deg, ${C.altin}20, ${C.y})`, borderRadius: 18, padding: 24, maxWidth: 420, width: "100%", border: `1.5px solid ${C.altin}` }}>
         <div style={{ color: C.altin, fontSize: 10, fontWeight: 700, letterSpacing: 2, marginBottom: 8, textAlign: "center" }}>SIRLI SUÂL · PÎRİN SORUSU</div>
         <div style={{ color: C.cok, fontSize: 11, marginBottom: 12, textAlign: "center", fontStyle: "italic" }}>{pir.ad}</div>
         <div style={{ color: C.metin, fontSize: 15, lineHeight: 1.6, marginBottom: 16, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, textAlign: "center" }}>{s.s}</div>
         {!cevaplandi && s.sik.map((sec, i) => (
           <button key={i} onClick={() => setSualModal({ ...sualModal, cevap: i })} style={{ width: "100%", background: C.y2, border: `1px solid ${C.s}`, borderRadius: 10, padding: "12px", marginBottom: 6, color: C.metin, fontSize: 13, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>{sec}</button>
         ))}
         {cevaplandi && (
           <>
             <div style={{ background: dogru ? "#16A34A20" : C.kirmizi + "15", border: `1px solid ${dogru ? "#16A34A" : C.kirmizi}40`, borderRadius: 10, padding: 12, marginBottom: 10 }}>
               <div style={{ color: dogru ? "#16A34A" : C.kirmizi, fontSize: 12, fontWeight: 700, marginBottom: 6 }}>{dogru ? "✓ İSABET" : "Cevap: " + s.sik[s.d]}</div>
               <div style={{ color: C.metin, fontSize: 12, lineHeight: 1.65 }}>{s.ders}</div>
             </div>
             <button onClick={() => { if (dogru) sualCozuldu(sualModal.mertebeK, sualModal.no); setSualModal(null); }} style={{ width: "100%", background: dogru ? C.altin : C.soluk, color: "#fff", border: "none", borderRadius: 12, padding: "12px", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>{dogru ? "Rumuzu Al · +7 Liyakat" : "Anlaşıldı"}</button>
           </>
         )}
       </div>
     </div>
   );
 })()}
 {hediyeModal && (
   <div style={{ position: "fixed", inset: 0, background: "#000000B0", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1300, backdropFilter: "blur(6px)", padding: 20 }} onClick={() => setHediyeModal(null)}>
     <div style={{ background: `linear-gradient(180deg, ${C.altin}25, ${C.y})`, borderRadius: 20, padding: 28, maxWidth: 380, width: "100%", border: `1.5px solid ${C.altin}80`, textAlign: "center" }} onClick={e => e.stopPropagation()}>
       <div style={{ color: C.altin, fontSize: 10, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>HEDİYE GELDİ</div>
       {hediyeModal.gonderen && <div style={{ color: C.cok, fontSize: 11, fontStyle: "italic", marginBottom: 8 }}>{hediyeModal.gonderen.ad}'dan ulaştı, içinde bir hikmet var.</div>}
       <div style={{ fontSize: 28, color: C.altin, marginBottom: 12, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{hediyeModal.h.t === "ayet" ? "ﷲ" : hediyeModal.h.t === "hadis" ? "ﷺ" : "ʘ"}</div>
       <div style={{ color: C.metin, fontSize: 15, lineHeight: 1.7, fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", marginBottom: 10 }}>"{hediyeModal.h.m}"</div>
       <div style={{ color: C.altin, fontSize: 11, fontWeight: 700, marginBottom: 18 }}>— {hediyeModal.h.k}</div>
       <button onClick={() => setHediyeModal(null)} style={{ width: "100%", background: `linear-gradient(135deg, ${C.altin}, ${C.altinA})`, color: "#1A1200", border: "none", borderRadius: 12, padding: "12px", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Hediyene şükür et</button>
     </div>
   </div>
 )}
 {mahcubiyetModal && (
   <div style={{ position: "fixed", inset: 0, background: "#000000C0", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1350, backdropFilter: "blur(8px)", padding: 20 }} onClick={() => setMahcubiyetModal(null)}>
     <div style={{ background: `linear-gradient(180deg, ${C.kirmizi}18, ${C.y})`, borderRadius: 18, padding: 26, maxWidth: 380, width: "100%", border: `1.5px solid ${C.kirmizi}60`, textAlign: "center" }} onClick={e => e.stopPropagation()}>
       <div style={{ color: C.kirmizi, fontSize: 10, fontWeight: 700, letterSpacing: 2, marginBottom: 10 }}>MAHCUBİYET LENSİ</div>
       <div style={{ color: C.metin, fontSize: 15, lineHeight: 1.65, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, marginBottom: 12 }}>{mahcubiyetModal.pir.ad} bir an yüzünü çevirdi.</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.65, marginBottom: 18 }}>Bu hafta <b style={{ color: C.kirmizi }}>{mahcubiyetModal.sayim}</b> kez "kaçın" işareti olan ürün taradın. Mertebene yakışan tutum bu değil, {mahcubiyetModal.pir.hitap}. Bilgi vardı, irade lazım.</div>
       <button onClick={() => setMahcubiyetModal(null)} style={{ width: "100%", background: C.kirmizi, color: "#fff", border: "none", borderRadius: 12, padding: "12px", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Anlaşıldı, kendimi toparlayacağım</button>
     </div>
   </div>
 )}
 {yoklukModal && (
   <div style={{ position: "fixed", inset: 0, background: "#000000B0", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1320, backdropFilter: "blur(8px)", padding: 20 }} onClick={() => { setYoklukModal(null); hatiraEkle("yokluk", yoklukModal.metin); }}>
     <div style={{ background: yoklukModal.esik >= 30 ? `linear-gradient(180deg, ${C.altin}25, ${C.y})` : `linear-gradient(180deg, ${C.soluk}18, ${C.y})`, borderRadius: 20, padding: 28, maxWidth: 380, width: "100%", border: `1.5px solid ${yoklukModal.esik >= 30 ? C.altin : C.soluk}60`, textAlign: "center", filter: yoklukModal.esik === 14 ? "grayscale(0.5)" : "none" }} onClick={e => e.stopPropagation()}>
       <div style={{ color: yoklukModal.esik >= 30 ? C.altin : C.soluk, fontSize: 10, fontWeight: 700, letterSpacing: 2, marginBottom: 10 }}>{yoklukModal.esik >= 30 ? "KAVUŞMA" : "PÎR'İN YOKLUĞU"}</div>
       <div style={{ display: "flex", justifyContent: "center", margin: "8px 0 14px", filter: yoklukModal.esik === 14 ? "grayscale(0.8)" : "none", transition: "filter 1.2s" }}><Muhur k={liyakat.mertebe || "sagirt"} boyut={56} /></div>
       <div style={{ color: C.metin, fontSize: 14, lineHeight: 1.7, fontFamily: "'Cormorant Garamond', Georgia, serif", marginBottom: 18, fontStyle: "italic" }}>{yoklukModal.metin}</div>
       <button onClick={() => { setYoklukModal(null); hatiraEkle("yokluk", yoklukModal.metin); }} style={{ width: "100%", background: yoklukModal.esik >= 30 ? C.altin : C.soluk, color: "#fff", border: "none", borderRadius: 12, padding: "12px", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>{yoklukModal.esik >= 30 ? "Hamdolsun, döndüm" : "Affet, döndüm"}</button>
     </div>
   </div>
 )}
 {niyetModal && (
   <div style={{ position: "fixed", inset: 0, background: "#000000C0", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1320, backdropFilter: "blur(6px)", padding: 20 }}>
     <div style={{ background: C.y, borderRadius: 18, padding: 26, maxWidth: 380, width: "100%", border: `1.5px solid ${C.altin}50`, textAlign: "center" }}>
       <div style={{ color: C.altin, fontSize: 10, fontWeight: 700, letterSpacing: 2, marginBottom: 10 }}>PÎRİN SORUSU</div>
       <div style={{ color: C.cok, fontSize: 11, marginBottom: 14, fontStyle: "italic" }}>{pir.ad}</div>
       <div style={{ color: C.metin, fontSize: 15, lineHeight: 1.65, fontFamily: "'Cormorant Garamond', Georgia, serif", marginBottom: 18, fontWeight: 600 }}>{liyakat.lakap || pir.hitap}, kimin yahut neyin için temiz besleniyorsun? Bu niyet, her uyarımda gözümün önünde olacak.</div>
       <textarea value={niyetTaslak} onChange={e => setNiyetTaslak(e.target.value.slice(0, 90))} placeholder="Örn. Kızım büyürken yanında olabilmek için" rows={2} style={{ width: "100%", background: C.y2, border: `1px solid ${C.s}`, borderRadius: 10, padding: "12px", color: C.metin, fontSize: 14, fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", resize: "none", marginBottom: 4 }} />
       <div style={{ color: C.cok, fontSize: 10, textAlign: "right", marginBottom: 12 }}>{niyetTaslak.length}/90</div>
       <button disabled={!niyetTaslak.trim()} onClick={() => { const n = niyetTaslak.trim(); setLiyakat(o => { const yeni = { ...o, niyet: n }; try { localStorage.setItem("bd_liyakat", JSON.stringify(yeni)); } catch {}; return yeni; }); hatiraEkle("niyet", `Pîr'e niyetimi açtım: "${n}"`); setNiyetModal(false); }} style={{ width: "100%", background: niyetTaslak.trim() ? C.altin : C.s, color: niyetTaslak.trim() ? C.bg : C.cok, border: "none", borderRadius: 10, padding: "12px", fontWeight: 700, fontSize: 13, cursor: niyetTaslak.trim() ? "pointer" : "default", fontFamily: "inherit", letterSpacing: 0.3 }}>Niyetimi Mühürle</button>
       <button onClick={() => setNiyetModal(false)} style={{ width: "100%", background: "none", border: "none", color: C.soluk, fontSize: 12, marginTop: 6, cursor: "pointer", fontFamily: "inherit", padding: "8px" }}>Şimdi değil</button>
     </div>
   </div>
 )}
 {tekKelime && (
   <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1380, pointerEvents: "none", background: "#00000020", backdropFilter: "blur(2px)", animation: "tekKelimeGel 0.4s ease-out" }}>
     <div style={{ color: C.altin, fontSize: 42, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700, letterSpacing: 2, textShadow: `0 0 20px ${C.altin}80` }}>{tekKelime}</div>
   </div>
 )}
 {guncelModal && (
   <div style={{ position: "fixed", inset: 0, background: "#00000060", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1310, backdropFilter: "blur(4px)", padding: 20 }} onClick={() => setGuncelModal(null)}>
     <div style={{ background: C.y, borderRadius: 18, padding: 28, maxWidth: 360, width: "100%", border: `1px solid ${C.s}`, textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }} onClick={e => e.stopPropagation()}>
       <div style={{ color: C.altin, fontSize: 10, fontWeight: 600, letterSpacing: 2, marginBottom: 12 }}>PÎR'İN GÜNCELİ</div>
       <div style={{ fontSize: 22, marginBottom: 14, color: C.altin, fontFamily: "'Cormorant Garamond', Georgia, serif", opacity: 0.7 }}>☼</div>
       <div style={{ color: C.metin, fontSize: 15, lineHeight: 1.65, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500, marginBottom: 22 }}>{guncelModal.metin}</div>
       <button onClick={() => setGuncelModal(null)} style={{ width: "100%", background: "transparent", color: C.altin, border: `1px solid ${C.altin}80`, borderRadius: 10, padding: "11px", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.3 }}>Okudum</button>
     </div>
   </div>
 )}
 {paritiAcik && (
   <div style={{ position: "fixed", inset: 0, zIndex: 1395, pointerEvents: "none", overflow: "hidden" }}>
     {Array.from({length: 28}, (_, i) => {
       const x = Math.random() * 100;
       const delay = Math.random() * 0.3;
       const dur = 1 + Math.random() * 0.6;
       const size = 5 + Math.random() * 6;
       return <div key={i} style={{ position: "absolute", left: `${x}%`, top: "100%", width: size, height: size, borderRadius: "50%", background: `radial-gradient(circle, ${C.altinA}, ${C.altin}80, transparent)`, boxShadow: `0 0 ${size}px ${C.altin}`, animation: `pariltiYagmur ${dur}s ${delay}s ease-out forwards` }} />;
     })}
   </div>
 )}
 {serefKart && (() => {
   const m = MERTEBELER.find(x => x.k === serefKart.mertebeK);
   if (!m) return null;
   const h = hicriCevir(new Date());
   return (
     <div style={{ position: "fixed", inset: 0, background: "#000000C0", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1392, backdropFilter: "blur(6px)", padding: 16, overflowY: "auto" }} onClick={() => setSerefKart(null)}>
       <div style={{ maxWidth: 360, width: "100%", margin: "20px 0" }} onClick={e => e.stopPropagation()}>
         <div ref={serefKartRef} style={{ background: `linear-gradient(135deg, ${m.renk}20, #FFF8E1, ${m.renk}15)`, borderRadius: 18, padding: 28, border: `3px double ${m.renk}`, textAlign: "center", boxShadow: `0 8px 32px ${m.renk}30`, position: "relative" }}>
           <div style={{ position: "absolute", top: 8, left: 8, right: 8, bottom: 8, border: `1px solid ${m.renk}50`, borderRadius: 14, pointerEvents: "none" }} />
           <div style={{ color: m.renk, fontSize: 9, fontWeight: 700, letterSpacing: 3, marginBottom: 10, position: "relative" }}>ŞEREF DEFTERİ</div>
           <div style={{ fontSize: 28, color: m.renk, marginBottom: 10, fontFamily: "'Cormorant Garamond', Georgia, serif", position: "relative" }}>✦</div>
           <div style={{ color: C.metin, fontSize: 12, marginBottom: 6, fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", position: "relative" }}>İşbu tarihte</div>
           <div style={{ color: m.renk, fontSize: 26, fontWeight: 700, fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: 1, marginBottom: 4, position: "relative" }}>{liyakat.lakap || pir.hitap}</div>
           <div style={{ color: C.metin, fontSize: 12, marginBottom: 14, fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", position: "relative" }}>mertebesine erişti:</div>
           <div style={{ display: "flex", justifyContent: "center", marginBottom: 8, position: "relative" }}><Muhur k={m.k} boyut={56} /></div>
           <div style={{ color: m.renk, fontSize: 28, fontWeight: 700, fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: 2, position: "relative" }}>{m.ad}</div>
           <div style={{ color: C.cok, fontSize: 11, marginTop: 4, fontStyle: "italic", position: "relative" }}>{m.anlam}</div>
           <div style={{ marginTop: 18, paddingTop: 14, borderTop: `1px dashed ${m.renk}40`, position: "relative" }}>
             <div style={{ color: C.metin, fontSize: 12, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{h.gun} {h.ay} {h.yil}</div>
             <div style={{ color: C.cok, fontSize: 10, marginTop: 2 }}>Mensubiyet · #{siraNoHesapla(liyakat.baslangic)}</div>
             <div style={{ color: m.renk, fontSize: 9, fontWeight: 700, letterSpacing: 2, marginTop: 8 }}>· BESİN DEDEKTİFİ ·</div>
           </div>
         </div>
         <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
           <button onClick={() => setSerefKart(null)} style={{ flex: 1, background: "transparent", color: "#fff", border: `1px solid #ffffff50`, borderRadius: 10, padding: "11px", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Kapat</button>
           <button onClick={serefKartIndir} style={{ flex: 2, background: `linear-gradient(135deg, ${C.altin}, ${C.altinA})`, color: "#1A1200", border: "none", borderRadius: 10, padding: "11px", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.3 }}>İndir / Paylaş</button>
         </div>
       </div>
     </div>
   );
 })()}
 {virdAcik && (
   <div style={{ position: "fixed", inset: 0, background: "linear-gradient(180deg, #0A1628 0%, #1A2B47 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 1395, padding: 20 }} onClick={() => setVirdAcik(false)}>
     <div style={{ color: "#D4AF37", fontSize: 10, fontWeight: 600, letterSpacing: 3, marginBottom: 14, opacity: 0.7 }}>VİRD-İ SOFRA</div>
     <div style={{ color: "#F5E6D3", fontSize: 17, fontFamily: "'Cormorant Garamond', Georgia, serif", textAlign: "center", marginBottom: 30, lineHeight: 1.5, opacity: 0.8, maxWidth: 280 }}>Sofranın bereketi niyetinin temizliğindedir. Bir nefes al, otuz üç tesbih çek.</div>
     <svg width="240" height="240" viewBox="0 0 240 240" style={{ marginBottom: 20 }}>
       {Array.from({length: 33}, (_, i) => {
         const angle = (i / 33) * 2 * Math.PI - Math.PI / 2;
         const cx = 120 + Math.cos(angle) * 90;
         const cy = 120 + Math.sin(angle) * 90;
         const aktif = i < virdSaniye;
         const su = i === virdSaniye - 1;
         return <circle key={i} cx={cx} cy={cy} r={su ? 6 : aktif ? 4.5 : 3} fill={aktif ? "#D4AF37" : "#2A3B57"} opacity={aktif ? 0.95 : 0.5}>
           {su && <animate attributeName="r" values="4.5;7;4.5" dur="0.8s" repeatCount="indefinite" />}
         </circle>;
       })}
       <text x="120" y="115" textAnchor="middle" fill="#D4AF37" fontSize="46" fontFamily="'Cormorant Garamond', Georgia, serif" fontWeight="600">{Math.min(virdSaniye, 33)}</text>
       <text x="120" y="140" textAnchor="middle" fill="#A8B5C9" fontSize="13" letterSpacing="2">/ 33</text>
     </svg>
     <div style={{ color: "#A8B5C9", fontSize: 11, opacity: 0.7, letterSpacing: 1 }}>{virdSaniye >= 33 ? "TAMAM" : "dokun, geç"}</div>
   </div>
 )}
 {bedenKonusuyor && (
   <div style={{ position: "fixed", inset: 0, background: "#00000060", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1360, backdropFilter: "blur(4px)", padding: 20 }} onClick={() => setBedenKonusuyor(null)}>
     <div style={{ background: C.y, borderRadius: 18, padding: 28, maxWidth: 340, width: "100%", border: `1px solid ${C.s}`, textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }} onClick={e => e.stopPropagation()}>
       <div style={{ color: C.altin, fontSize: 10, fontWeight: 600, letterSpacing: 2, marginBottom: 12 }}>BEDENİM KONUŞUYOR</div>
       <div style={{ fontSize: 18, marginBottom: 12, color: C.altin, fontFamily: "'Cormorant Garamond', Georgia, serif", opacity: 0.7 }}>✦</div>
       <div style={{ color: C.metin, fontSize: 17, fontWeight: 600, fontFamily: "'Cormorant Garamond', Georgia, serif", marginBottom: 6, letterSpacing: 0.2 }}>{bedenKonusuyor.organ}</div>
       <div style={{ color: C.metin, fontSize: 14, lineHeight: 1.65, fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif", fontWeight: 400, marginBottom: 22 }}>{bedenKonusuyor.soz}</div>
       <button onClick={() => setBedenKonusuyor(null)} style={{ width: "100%", background: "transparent", color: C.altin, border: `1px solid ${C.altin}80`, borderRadius: 10, padding: "11px", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.3 }}>Duydum, Bedenim</button>
     </div>
   </div>
 )}
 {longPressOgut && (
   <div style={{ position: "fixed", inset: 0, background: "#00000060", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1385, backdropFilter: "blur(4px)", padding: 20 }} onClick={() => setLongPressOgut(null)}>
     <div style={{ background: C.y, borderRadius: 18, padding: 28, maxWidth: 340, width: "100%", border: `1px solid ${C.s}`, textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }} onClick={e => e.stopPropagation()}>
       <div style={{ color: C.altin, fontSize: 10, fontWeight: 600, letterSpacing: 2, marginBottom: 12 }}>PÎR'İN GİZLİ ÖĞÜDÜ</div>
       <div style={{ fontSize: 20, marginBottom: 14, color: C.altin, fontFamily: "'Cormorant Garamond', Georgia, serif", opacity: 0.7 }}>✦</div>
       <div style={{ color: C.metin, fontSize: 15, lineHeight: 1.65, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500, marginBottom: 22 }}>{longPressOgut.metin}</div>
       <button onClick={() => setLongPressOgut(null)} style={{ width: "100%", background: "transparent", color: C.altin, border: `1px solid ${C.altin}80`, borderRadius: 10, padding: "11px", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.3 }}>Anladım</button>
     </div>
   </div>
 )}
 {erbainTamamlandiModal && (
   <div style={{ position: "fixed", inset: 0, background: "#000000C0", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1390, backdropFilter: "blur(8px)", padding: 20 }} onClick={() => setErbainTamamlandiModal(false)}>
     <div style={{ background: `linear-gradient(180deg, ${C.altin}30, #FFF8E1, ${C.y})`, borderRadius: 20, padding: 32, maxWidth: 380, width: "100%", border: `2px solid ${C.altin}`, textAlign: "center", boxShadow: `0 8px 32px ${C.altin}50` }} onClick={e => e.stopPropagation()}>
       <div style={{ color: C.altin, fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 14 }}>ERBÂİN TAMAM</div>
       <div style={{ fontSize: 56, color: C.altin, marginBottom: 16, fontFamily: "'Cormorant Garamond', Georgia, serif", animation: "muhurNefes 4.5s ease-in-out infinite" }}>✦</div>
       <div style={{ color: C.altin, fontSize: 30, fontWeight: 700, fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: 2, marginBottom: 8 }}>HİL'AT</div>
       <div style={{ color: C.metin, fontSize: 14, lineHeight: 1.7, fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", marginBottom: 20 }}>40 gün sebat ettin, {liyakat.lakap || pir.hitap}. Hil'atın daimîdir. {pir.ad} seni şahit tuttu.</div>
       <button onClick={() => setErbainTamamlandiModal(false)} style={{ width: "100%", background: `linear-gradient(135deg, ${C.altin}, ${C.altinA})`, color: "#1A1200", border: "none", borderRadius: 12, padding: "13px", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.5 }}>Şükürler Olsun</button>
     </div>
   </div>
 )}
 {sirModal && (
   <div style={{ position: "fixed", inset: 0, background: "#00000060", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1370, backdropFilter: "blur(4px)", padding: 20 }} onClick={() => setSirModal(null)}>
     <div style={{ background: C.y, borderRadius: 18, padding: 28, maxWidth: 340, width: "100%", border: `1px solid ${C.s}`, textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }} onClick={e => e.stopPropagation()}>
       <div style={{ color: C.altin, fontSize: 10, fontWeight: 600, letterSpacing: 2, marginBottom: 8 }}>PÎR BİR SIR AÇTI · {sirModal.sayi}/4</div>
       <div style={{ color: C.cok, fontSize: 11, marginBottom: 14, fontStyle: "italic" }}>{pir.ad}</div>
       <div style={{ fontSize: 20, marginBottom: 12, color: C.altin, fontFamily: "'Cormorant Garamond', Georgia, serif", opacity: 0.7 }}>✦</div>
       <div style={{ color: C.metin, fontSize: 15, fontWeight: 600, fontFamily: "'Cormorant Garamond', Georgia, serif", marginBottom: 10 }}>{sirModal.sir.baslik}</div>
       <div style={{ color: C.metin, fontSize: 13, lineHeight: 1.65, marginBottom: 10 }}>{sirModal.sir.metin}</div>
       <div style={{ color: C.cok, fontSize: 10, marginBottom: 22, fontStyle: "italic" }}>— {sirModal.sir.kaynak}</div>
       <button onClick={() => setSirModal(null)} style={{ width: "100%", background: "transparent", color: C.altin, border: `1px solid ${C.altin}80`, borderRadius: 10, padding: "11px", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.3 }}>Sırrı Aldım</button>
     </div>
   </div>
 )}
 {niyetUyari && (
   <div style={{ position: "fixed", inset: 0, background: "#00000060", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1340, backdropFilter: "blur(4px)", padding: 20 }} onClick={() => setNiyetUyari(false)}>
     <div style={{ background: C.y, borderRadius: 18, padding: 28, maxWidth: 340, width: "100%", border: `1px solid ${C.altin}40`, textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }} onClick={e => e.stopPropagation()}>
       <div style={{ fontSize: 24, marginBottom: 12, color: C.altin, fontFamily: "'Cormorant Garamond', Georgia, serif", opacity: 0.6 }}>﷽</div>
       <div style={{ color: C.cok, fontSize: 10, letterSpacing: 2, marginBottom: 16, fontWeight: 700 }}>NİYETİN</div>
       <div style={{ color: C.metin, fontSize: 18, lineHeight: 1.6, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500, fontStyle: "italic", marginBottom: 10 }}>"{liyakat.niyet}"</div>
       <div style={{ color: C.soluk, fontSize: 13, lineHeight: 1.55, marginBottom: 22 }}>İşte bu yüzden bu ürünü geri koyuyorsun.</div>
       <button onClick={() => setNiyetUyari(false)} style={{ width: "100%", background: "transparent", color: C.altin, border: `1px solid ${C.altin}80`, borderRadius: 10, padding: "11px", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.3 }}>Niyetimi Hatırladım</button>
     </div>
   </div>
 )}
      {saglikModalAcik && (
        <div style={{ position: "fixed", inset: 0, background: "#000000A0", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(4px)" }} onClick={() => setSaglikModalAcik(false)}>
          <div style={{ background: C.y, borderRadius: "20px 20px 0 0", padding: 24, width: "100%", maxWidth: 520, maxHeight: "80vh", overflowY: "auto", border: `1px solid ${C.s}` }} onClick={e => e.stopPropagation()}>
            <div style={{ color: C.altin, fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>SAĞLIK DURUMUM</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
              <div style={{ color: C.metin, fontSize: 18, fontWeight: 700 }}>Sana özel uyarılar</div>
              <div style={{ color: saglikDurumu.length ? "#E74C3C" : C.cok, fontSize: 12, fontWeight: 700 }}>{saglikDurumu.length} aktif</div>
            </div>
            <div style={{ color: C.soluk, fontSize: 12, marginBottom: 14, lineHeight: 1.5 }}>İşaretlediğin durumlara göre tarama sonucunda ekstra uyarılar göreceksin. Veriler sadece bu cihazda kalır, hiçbir yere gönderilmez.</div>
            {SAGLIK_KOSULLARI.map(k => {
              const aktif = saglikDurumu.includes(k.k);
              return (
                <div key={k.k} style={{ marginBottom: 8, background: aktif ? "#E74C3C12" : C.y2, border: `1px solid ${aktif ? "#E74C3C" : C.s}`, borderRadius: 10, overflow: "hidden" }}>
                  <button onClick={() => saglikToggle(k.k)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "transparent", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", textAlign: "left" }}>
                    <span style={{ flex: 1, color: aktif ? "#E74C3C" : C.metin, fontWeight: 700, fontSize: 14 }}>{k.ad}</span>
                    <span style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${aktif ? "#E74C3C" : C.s}`, background: aktif ? "#E74C3C" : "transparent" }} />
                  </button>
                  <div style={{ padding: "0 14px 12px", color: C.soluk, fontSize: 11, lineHeight: 1.55 }}>
                    <div style={{ color: C.metin, marginBottom: 4 }}>{k.bilgi}</div>
                    <div style={{ color: C.cok, fontSize: 10, fontStyle: "italic" }}>Kaynak: {k.kaynak}</div>
                  </div>
                </div>
              );
            })}
            <button onClick={() => setSaglikModalAcik(false)} style={{ width: "100%", marginTop: 8, background: `linear-gradient(135deg, ${C.altin}, ${C.altinA})`, border: "none", borderRadius: 12, padding: "12px", color: "#1A1200", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Kapat</button>
          </div>
        </div>
      )}
      {aylikRaporAcik && (() => {
        const r = aylikIstatistik();
        const KAT_AD = { gida: "Gıda", giyim: "Giyim", ev: "Ev Eşyası", kozmetik: "Kozmetik", temizlik: "Temizlik", bebek: "Bebek", evcil: "Evcil Hayvan", ilac: "İlaç/Vitamin" };
        return (
          <div style={{ position: "fixed", inset: 0, background: "#000000A0", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(4px)" }} onClick={() => setAylikRaporAcik(false)}>
            <div style={{ background: C.y, borderRadius: "20px 20px 0 0", padding: 24, width: "100%", maxWidth: 520, maxHeight: "80vh", overflowY: "auto", border: `1px solid ${C.s}` }} onClick={e => e.stopPropagation()}>
              <div style={{ color: C.altin, fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>AYLIK RAPOR</div>
              <div style={{ color: C.metin, fontSize: 18, fontWeight: 700, marginBottom: 14, textTransform: "capitalize" }}>{r.ay}</div>
              {r.toplam === 0 ? (
                <div style={{ background: C.y2, border: `1px dashed ${C.s}`, borderRadius: 12, padding: 18, textAlign: "center", color: C.soluk, fontSize: 13, lineHeight: 1.6 }}>
                  Bu ay henüz tarama yapmadın.<br />İlk taramanı yapınca burada özetin görünecek.
                </div>
              ) : (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                    <div style={{ background: C.altin + "15", border: `1px solid ${C.altin}40`, borderRadius: 12, padding: 14 }}>
                      <div style={{ color: C.soluk, fontSize: 10, fontWeight: 700 }}>TARAMA</div>
                      <div style={{ color: C.altin, fontSize: 28, fontWeight: 800, lineHeight: 1, marginTop: 4 }}>{r.toplam}</div>
                    </div>
                    <div style={{ background: "#E74C3C15", border: `1px solid #E74C3C40`, borderRadius: 12, padding: 14 }}>
                      <div style={{ color: C.soluk, fontSize: 10, fontWeight: 700 }}>KRİTİK BULGU</div>
                      <div style={{ color: "#E74C3C", fontSize: 28, fontWeight: 800, lineHeight: 1, marginTop: 4 }}>{r.kritikSayi}</div>
                    </div>
                  </div>
                  {r.enOrgan && (
                    <div style={{ background: C.y2, border: `1px solid ${C.s}`, borderRadius: 12, padding: 14, marginBottom: 8 }}>
                      <div style={{ color: C.soluk, fontSize: 11, fontWeight: 700, marginBottom: 4 }}>EN ÇOK ETKİLENEN ORGAN</div>
                      <div style={{ color: C.metin, fontSize: 16, fontWeight: 700 }}>{r.enOrgan[0]}</div>
                      <div style={{ color: C.cok, fontSize: 11 }}>{r.enOrgan[1]} tarama</div>
                    </div>
                  )}
                  {r.enKat && (
                    <div style={{ background: C.y2, border: `1px solid ${C.s}`, borderRadius: 12, padding: 14, marginBottom: 14 }}>
                      <div style={{ color: C.soluk, fontSize: 11, fontWeight: 700, marginBottom: 4 }}>EN RİSKLİ KATEGORİ</div>
                      <div style={{ color: C.metin, fontSize: 16, fontWeight: 700 }}>{KAT_AD[r.enKat[0]] || r.enKat[0]}</div>
                      <div style={{ color: C.cok, fontSize: 11 }}>{r.enKat[1]} tarama</div>
                    </div>
                  )}
                </>
              )}
              <button onClick={() => setAylikRaporAcik(false)} style={{ width: "100%", background: `linear-gradient(135deg, ${C.altin}, ${C.altinA})`, border: "none", borderRadius: 12, padding: "12px", color: "#1A1200", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Kapat</button>
            </div>
          </div>
        );
      })()}
      {modal && (
 <div style={{ position: "fixed", inset: 0, background: "#000000A0", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(4px)" }} onClick={() => setModal(null)}>
 <div style={{ background: C.y, borderRadius: "20px 20px 0 0", padding: 24, width: "100%", maxWidth: 520, maxHeight: "80vh", overflowY: "auto", border: `1px solid ${C.s}`, position: "relative" }} onClick={e => e.stopPropagation()}>
 <button style={{ position: "absolute", top: 14, right: 14, background: C.y2, border: `1px solid ${C.s}`, borderRadius: "50%", width: 30, height: 30, color: C.soluk, cursor: "pointer", fontSize: 13 }} onClick={() => setModal(null)}>✕</button>
 {(() => {
   const v = (modal.risk === "kritik" || modal.risk === "yuksek") ? { ad: "KAÇIN", renk: C.kirmizi, alt: "Kullanmaman önerilir", seviye: "YÜKSEK RİSK" }
     : modal.risk === "orta" ? { ad: "DİKKAT", renk: C.turuncu, alt: "Sınırlı ve bilinçli tüket", seviye: "ORTA RİSK" }
     : modal.risk === "dusuk" ? { ad: "GÜVENLİ", renk: C.yesil, alt: "Genel olarak güvenli", seviye: "DÜŞÜK RİSK" }
     : { ad: "BELİRSİZ", renk: "#888", alt: "Yeterli veri yok", seviye: "VERİ EKSİK" };
   return (
     <div style={{ background: "#FFFFFF", border: `1px solid ${C.s}`, borderRadius: 14, padding: "14px 16px", marginBottom: 14, display: "flex", alignItems: "center", gap: 14, boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
       <div style={{ width: 68, height: 68, borderRadius: "50%", border: `2.5px solid ${v.renk}`, background: v.renk + "10", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative", animation: "muhurGel .5s ease-out" }}>
         <div style={{ position: "absolute", inset: 5, borderRadius: "50%", border: `1px solid ${v.renk}55` }} />
         <span style={{ color: v.renk, fontSize: 13, fontWeight: 900, letterSpacing: 1.2, lineHeight: 1, fontFamily: "'Cormorant Garamond', Georgia, serif", zIndex: 1 }}>{v.ad}</span>
       </div>
       <div style={{ flex: 1, minWidth: 0 }}>
         <div style={{ color: v.renk, fontSize: 14, fontWeight: 700, letterSpacing: 0.8, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{v.seviye}</div>
         <div style={{ color: C.soluk, fontSize: 11, marginTop: 4, lineHeight: 1.4, fontStyle: "italic" }}>{v.alt}</div>
       </div>
     </div>
   );
 })()}
 <div style={{ color: C.altin, fontSize: 12, fontWeight: 700 }}>{modal.kod} · {modal.kat}</div>
 <div style={{ color: C.metin, fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{modal.ad}</div>
 <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>{(modal.organlar || []).map(o => <span key={o} style={S.orgTag}>{o}</span>)}</div>
 <div style={S.kB}>Etki</div><div style={S.mT}>{modal.etki}</div>
 <div style={S.kB}>Kaynak</div><div style={{ color: C.cok, fontSize: 12, fontStyle: "normal", marginBottom: 12 }}>{modal.kaynak}</div>
 <div style={{ background: C.yesil + "0A", border: `1px solid ${C.yesil}26`, borderRadius: 10, padding: 12 }}>
 <div style={{ color: C.yesil, fontSize: 12, fontWeight: 700, marginBottom: 4 }}> Doğal Alternatif</div>
 <div style={{ color: C.metin, fontSize: 13 }}>{modal.alternatif}</div>
 </div>

 {(() => {
   const uyarilar = saglikUyarilari(modal);
   if (!uyarilar.length) return null;
   return (
     <div style={{ background: C.kirmizi + "0D", border: `1px solid ${C.kirmizi}40`, borderRadius: 10, padding: 12, marginTop: 12 }}>
       <div style={{ color: C.kirmizi, fontSize: 11, fontWeight: 700, marginBottom: 6, letterSpacing: 0.3 }}>SANA ÖZEL UYARI</div>
       {uyarilar.map(u => (
         <div key={u.k} style={{ color: C.metin, fontSize: 12, lineHeight: 1.5, marginBottom: 3 }}>
           <b>{u.ad}:</b> bu madde senin durumunla eşleşiyor — dikkatli ol.
         </div>
       ))}
     </div>
   );
 })()}

 <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
   <button onClick={() => { setPaylasMaddesi(modal); puanEkle(5, "paylas"); sefaatEkle("paylas"); }} style={{ flex: 1, background: C.altin + "12", color: C.altin, border: `1px solid ${C.altin}80`, borderRadius: 10, padding: "11px", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>Paylaş</button>
   <button onClick={() => {
     const konu = `Hata: ${modal.ad} (${modal.kod})`;
     const body = `Aşağıdaki madde hakkındaki bilginin yanlış olduğunu düşünüyorum:\n\nMadde: ${modal.ad}\nKod: ${modal.kod}\nKategori: ${modal.kat}\nMevcut etki metni: ${modal.etki}\n\nDoğrusu / kaynağı şudur:\n\n[Buraya yaz]\n\n---\nBesin Dedektifi`;
     const a = document.createElement("a");
     a.href = `mailto:besindedektifii@gmail.com?subject=${encodeURIComponent(konu)}&body=${encodeURIComponent(body)}`;
     a.style.display = "none";
     document.body.appendChild(a);
     a.click();
     setTimeout(() => { try { document.body.removeChild(a); } catch {} }, 100);
   }} style={{ background: "transparent", color: C.soluk, border: `1px solid ${C.s}`, borderRadius: 10, padding: "11px 14px", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>Bilgi Yanlış</button>
 </div>

 {wikiYukleniyor && <div style={{ marginTop: 12, color: C.cok, fontSize: 12, textAlign: "center" }}>Wikipedia'dan özet aranıyor...</div>}
 {wikiData && !wikiData.yok && wikiData.ozet && (
   <div style={{ marginTop: 12, background: C.y2, border: `1px solid ${C.s}`, borderRadius: 10, padding: 12 }}>
     <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
       <span style={{ color: C.altin, fontSize: 11, fontWeight: 700, letterSpacing: 0.3 }}>WIKIPEDIA · TR</span>
     </div>
     <div style={{ display: "flex", gap: 10 }}>
       {wikiData.resim && <img src={wikiData.resim} alt="" style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 8, flexShrink: 0 }} />}
       <div style={{ color: C.metin, fontSize: 12, lineHeight: 1.6 }}>{wikiData.ozet}</div>
     </div>
     {wikiData.link && <a href={wikiData.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 8, color: C.altin, fontSize: 12, fontWeight: 700, textDecoration: "none" }}>Tam makaleyi oku →</a>}
   </div>
 )}
 </div>
 </div>
 )}

 <style>{css}</style>
 </div>
 );
}
