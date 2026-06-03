/* Bağımsız UI bileşenleri — app.jsx'ten ayrıldı */
import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import { C, S } from "./theme.js";
import { ATM_KONUMLAR, MIZAC_MARKET } from "./sabitler.js";
import { analiz, atmMesafe, bdToast } from "./helpers.js";

export function BolumKart({ ikon, renk, baslik, ozet, items }) {
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
export function AquaAtmGorsel() {
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

export function SuAtmSekmesi() {
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
export function ToplulugaKatki({ taramaSayisi }) {
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
export function TarifModal({ tarif, onKapat }) {
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

export function HaftalikRapor({ gecmis, onKapat }) {
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
export function SkorHalkasi({ skor, renk, boyut = 52 }) {
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
export function PaylasModal({ madde, onKapat, rutbeAd, rutbeRenk, lakap }) {
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

export function MizacMarket({ profil, onKapat }) {
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


export function KameraOCR({ onMetin, onIptal }) {
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
export function FotoIsim({ kategoriAd, onAra, onIptal }) {
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
