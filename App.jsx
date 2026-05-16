import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════
 SABITLER
 ══════════════════════════════════════════════ */
const C = {
 bg: "#07070F", y: "#0F0F1A", y2: "#161623", s: "#22223A",
 altin: "#C9A84C", altinA: "#E8C97A",
 metin: "#F0EDE8", soluk: "#8A8499", cok: "#45435A",
 kirmizi: "#FF2D55", turuncu: "#FF9500", sari: "#FFCC00", yesil: "#2ECC71",
};
const rR = r => ({ kritik: C.kirmizi, yuksek: C.turuncu, orta: C.sari, dusuk: C.yesil }[r] || "#888");
const rE = r => ({ kritik: "● KRİTİK", yuksek: "️ YÜKSEK", orta: " ORTA", dusuk: " DÜŞÜK" }[r] || r);

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
 "Rast": { organ: "Beyin · Sinir", etki: "Neşe, zihin açıklığı, baş ağrısı giderici", vakit: "Sabah namazı sonrası", frekans: "432 Hz", aletler: "Ney, Ud", renk: "#FFD700" },
 "Hüseyni": { organ: "Kalp · Karaciğer", etki: "Kalp sağlığı, iltihap giderici, güç", vakit: "Sabah 9–10", frekans: "396 Hz", aletler: "Ud, Kanun", renk: "#FF6B6B" },
 "Uşşak": { organ: "Mide · Pankreas", etki: "Sindirim, uyku, ruh hali dengesi", vakit: "Öğle–Öğleden sonra", frekans: "528 Hz", aletler: "Ney, Tanbur", renk: "#4ECDC4" },
 "Acemaşiran": { organ: "Karaciğer · Bağırsak", etki: "Detoks, bağırsak düzeni", vakit: "İkindi sonrası", frekans: "417 Hz", aletler: "Kanun", renk: "#A855F7" },
 "Hicaz": { organ: "Böbrek · Kemik", etki: "Böbrek sağlığı, kemik güçlendirici, mineral dengesi, özlem ve dua hissi", vakit: "Akşam", frekans: "639 Hz", aletler: "Ud, Keman", renk: "#3B82F6" },
 "Segah": { organ: "Mide · Akciğer", etki: "Mide asidi dengesi, kaygı giderme", vakit: "İkindi–Akşam", frekans: "741 Hz", aletler: "Ney, Tambur", renk: "#10B981" },
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
const BURC_EMOJI = { "Koç": "", "Boğa": "", "İkizler": "", "Yengeç": "", "Aslan": "", "Başak": "", "Terazi": "", "Akrep": "", "Yay": "", "Oğlak": "", "Kova": "", "Balık": "" };
const BURCLAR = {
 "Koç": { element: "Ateş", mizac: "Safravi", organ: "Baş · Beyin · Yüz", renk: "#FF4444", makam: "Rast", zikir: "Ya Kaviy — 99 kere", bitki: "Nane · Biberiye · Zerdeçal", tavsiye: "Soğutucu gıdalar: salatalık, nane, yoğurt, ayran. Acı baharatlardan ve aşırı sıcaktan kaçın.", kacinmasi: ["MSG", "E621", "kafein", "trans yağ", "BHA"] },
 "Boğa": { element: "Toprak" , mizac: "Sevdevi", organ: "Boyun · Boğaz · Tiroid", renk: "#C8961E", makam: "Hicaz", zikir: "Ya Sabur — 298 kere", bitki: "Papatya · Ihlamur · Adaçayı", tavsiye: "Fosfat grubundan kaçın. Sıcak içecekler ve ılık çorbalar tercih et. Boğaz için ıhlamur ve bal.", kacinmasi: ["E250", "E338", "E450", "E452", "MISIR ŞURUBU"] },
 "İkizler": { element: "Hava", mizac: "Demevi", organ: "Akciğer · Sinir · Eller", renk: "#FFD700", makam: "Segah", zikir: "Ya Alim — 150 kere", bitki: "Lavanta · Kekik · Okaliptüs", tavsiye: "Sülfit grubundan kaçın. Düzenli nefes egzersizleri ve açık hava yürüyüşleri. Okaliptüs buharı.", kacinmasi: ["E951", "TRANS YAĞ", "E471", "BHT", "E220"] },
 "Yengeç": { element: "Su", mizac: "Balgami", organ: "Mide · Göğüs · Lenf", renk: "#4488FF", makam: "Uşşak", zikir: "Ya Latif — 129 kere", bitki: "Papatya · Zencefil · Rezene", tavsiye: "Mide dostu: probiyotik, bol su, taze zencefil çayı. Soğuk ve çiğ gıdalardan uzak dur.", kacinmasi: ["E102", "E211", "E407", "TİTANYUM DİOKSİT", "E466"] },
 "Aslan": { element: "Ateş", mizac: "Safravi", organ: "Kalp · Sırt · Omurga", renk: "#FF8C00", makam: "Hüseyni", zikir: "Ya Celil — 73 kere", bitki: "Zeytin yaprağı · Sarımsak · Enginar", tavsiye: "Kalp için: zeytinyağı, fıstık yağı, taze sarımsak, nar. Kızartmadan kaçın. Haşlama veya fırın tercih et.", kacinmasi: ["E471", "PALMİYE YAĞI", "TRANS YAĞ", "E635", "E150D"] },
 "Başak": { element: "Toprak" , mizac: "Sevdevi", organ: "Bağırsak · Dalak · Pankreas", renk: "#228B22", makam: "Hicaz", zikir: "Ya Hakim — 78 kere", bitki: "Kimyon · Rezene · Zencefil", tavsiye: "Nitrit grubundan kaçın. Bol probiyotik (kefir, yoğurt) ve lifli sebzeler. Aç karın sirke kontrendike.", kacinmasi: ["E250", "SODYUM NİTRİT", "NİTRİT", "RAFINE ŞEKER"] },
 "Terazi": { element: "Hava", mizac: "Demevi", organ: "Böbrekler · Bel · Cilt", renk: "#DA70D6", makam: "Rast", zikir: "Ya Adl — 29 kere", bitki: "Maydanoz · Kiraz sapı · Mısır püskülü", tavsiye: "Böbrekler için günde 2-2.5L su ve maydanoz çayı. Tuz alımını azalt, oksalat yüksek gıdalardan kaçın.", kacinmasi: ["E951", "E102", "BHT", "E635", "E127"] },
 "Akrep": { element: "Su", mizac: "Balgami", organ: "Üreme · Mesane · Boşaltım", renk: "#8B0000", makam: "Acemaşiran", zikir: "Ya Mumit — 97 kere", bitki: "Kızılcık · Hibiskus · Nar", tavsiye: "Detoks için: kızılcık, nar suyu, ekşi vişne. Benzoat grubundan kaçın. Bol su ve antioksidan.", kacinmasi: ["E211", "E212", "SODYUM BENZOAT", "BPA"] },
 "Yay": { element: "Ateş", mizac: "Safravi", organ: "Karaciğer · Kalça · Uyluk", renk: "#9400D3", makam: "Rast", zikir: "Ya Muksit — 209 kere", bitki: "Enginar · Deve dikeni · Limon", tavsiye: "Karaciğer için enginar çayı, sabah aç karna limon suyu ve yeşil yapraklı sebzeler. Alkol ve TBHQ'dan kaçın.", kacinmasi: ["E621", "MSG", "E150D", "TBHQ", "PESTİSİT"] },
 "Oğlak": { element: "Toprak" , mizac: "Sevdevi", organ: "Diz · Kemik · Eklem", renk: "#696969", makam: "Hicaz", zikir: "Ya Sabur — 298 kere", bitki: "Biberiye · Badem · At kuyruğu", tavsiye: "Kemik sağlığı için: susam, badem, yeşil yapraklı sebzeler, D vitamini, kalsiyum. Şeker tüketimini sınırla.", kacinmasi: ["MISIR ŞURUBU", "E338", "E450", "E452", "FRUKTOZ"] },
 "Kova": { element: "Hava", mizac: "Demevi", organ: "Bacak · Dolaşım · Bilek", renk: "#00CED1", makam: "Segah", zikir: "Ya Bari — 100 kere", bitki: "Ginkgo · Sarımsak · Soğan", tavsiye: "Dolaşım için sarımsak, soğan, ginkgo biloba ve antioksidan açısından zengin meyveler. Düzenli yürüyüş.", kacinmasi: ["E951", "ASPARTAM", "BHT", "E282"] },
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
 GIDA VERİTABANI
 ══════════════════════════════════════════════ */
const GIDA_DB = {
 "E951": { ad: "Aspartam", kat: "Tatlandırıcı", risk: "kritik", organlar: ["Karaciğer"], etki: "IARC 2023 (Vol 134) Grup 2B 'olası kanserojen' sınıflandırması. Gerekçe: karaciğer kanseri (hepatosellüler karsinom) ile sınırlı insan kanıtı. JECFA günlük kabul edilebilir alım: 40 mg/kg vücut ağırlığı (≈70 kg kişi için ~14 kutu diyet kola).", kaynak: "IARC Monograph Vol 134 (2023) · Riboli et al. Lancet Oncology 2023 · WHO/JECFA 96. toplantı", alternatif: "Ham bal · Stevia yaprağı · Hurma şurubu", makam: "Hüseyni", burclar: ["İkizler", "Terazi", "Kova"] },
 "ASPARTAM": { ad: "Aspartam", kat: "Tatlandırıcı", risk: "kritik", organlar: ["Karaciğer"], etki: "E951 ile aynı. IARC 2023 Grup 2B. Karaciğer kanseri ile sınırlı kanıt.", kaynak: "IARC Vol 134 (2023)", alternatif: "Ham bal · Hurma · Stevia", makam: "Hüseyni", burclar: ["İkizler", "Kova"] },
 "E950": { ad: "Asesülfam K", kat: "Tatlandırıcı", risk: "orta", organlar: ["Bağırsak Florası"], etki: "EFSA 2025 yeniden değerlendirmesinde güvenli ilan edildi. ADI 9 → 15 mg/kg vücut ağırlığı/gün yükseltildi. Kanser, böbrek, karaciğer veya insülin bozukluğu kanıtı bulunamadı. Bağırsak mikrobiyomu üzerine sınırlı/tartışmalı veri mevcut.", kaynak: "EFSA FAF Panel · EFSA Journal 2025;23(4):9317", alternatif: "Ham bal · Hurma şekeri · Stevia", makam: "Hicaz", burclar: ["Yengeç", "Akrep"] },
 "E954": { ad: "Sakarin", kat: "Tatlandırıcı", risk: "dusuk", organlar: [], etki: "EFSA 2024 yeniden değerlendirmesinde güvenli ilan edildi. IARC Grup 3 (insanlar için kanserojen olarak sınıflandırılamaz). Eski rat mesane tümörü çalışmaları insana uymayan bir mekanizmaya dayandığı için geçersiz sayıldı. ADI 5 → 9 mg/kg/gün'e yükseltildi.", kaynak: "EFSA Journal 2024;22(11):e9044 · IARC Vol 73 (Grup 3)", alternatif: "Ham bal · Hurma · Stevia (tercih meselesi)", makam: "Acemaşiran", burclar: ["Boğa", "Oğlak"] },
 "E955": { ad: "Sukraloz", kat: "Tatlandırıcı", risk: "orta", organlar: ["Bağırsak Florası"], etki: "WHO 2023 kılavuzu: kilo kontrolü için tatlandırıcı önerilmedi, uzun vadede potansiyel zararlar (Tip 2 diyabet, kardiyovasküler hastalık) ile ilişkilendirildi. Hayvan çalışmalarında bağırsak florası ve karaciğer enflamasyonu gösterildi. İnsan kanıtı sınırlı.", kaynak: "WHO Guideline on Non-Sugar Sweeteners 2023 · Bian PLOS ONE 2017 · Sucralose Review Pharmaceuticals 2024", alternatif: "Stevia yaprağı · Ham bal", makam: "Acemaşiran", burclar: ["Yengeç", "Balık"] },
 "E102": { ad: "Tartrazin (Sarı 5)", kat: "Renklendirici", risk: "yuksek", organlar: ["Bağırsak", "Bağışıklık", "Davranış (Çocuk)"], etki: "Southampton çalışması (2007) çocuklarda hiperaktivite artışı buldu. AB zorunlu uyarı etiketi: 'Çocukların aktivitesini ve dikkatini olumsuz etkileyebilir'. ADI: 7.5 mg/kg/gün. Hassas kişilerde ürtiker ve astım tetikleyici.", kaynak: "McCann et al. Lancet 2007;370(9598):1560-1567 · EFSA Journal 2009;7(11):1331 · AB Reg 1333/2008", alternatif: "Zerdeçal · Safran · Havuç suyu", makam: "Uşşak", burclar: ["Yengeç", "Balık"] },
 "E110": { ad: "Sunset Yellow FCF", kat: "Renklendirici", risk: "yuksek", organlar: ["Bağırsak", "Bağışıklık", "Davranış (Çocuk)"], etki: "Southampton çalışmasında hiperaktivite ile ilişkili. AB'de uyarı etiketi zorunlu. EFSA ADI'yi 2.5 → 4 mg/kg/gün'e yeniden değerlendirdi.", kaynak: "McCann Lancet 2007 · EFSA Journal 2009;7(11):1330 · AB Reg 1333/2008", alternatif: "Zerdeçal · Safran · Beta-karoten", makam: "Uşşak", burclar: ["Koç", "Aslan"] },
 "E129": { ad: "Allura Red AC", kat: "Renklendirici", risk: "yuksek", organlar: ["Bağırsak", "Bağışıklık", "Beyin"], etki: "Hiperaktivite, kolitis tetikleyici.", kaynak: "McCann 2007 Lancet", alternatif: "Pancar suyu · Nar", makam: "Hüseyni", burclar: ["Yengeç", "Akrep"] },
 "E150D": { ad: "Amonyak-Sülfit Karamel (Sınıf IV)", kat: "Renklendirici", risk: "yuksek", organlar: ["Akciğer", "Karaciğer"], etki: "Üretiminde 4-MEI (4-Metilimidazol) yan ürün olarak oluşur. IARC 2011'de 4-MEI'yi Grup 2B 'olası kanserojen' sınıflandırdı (NTP fare çalışmalarında akciğer tümörü). California Prop 65 listesinde, günlük 29 µg üzeri ürünler uyarı etiketi zorunlu. Tipik kola: 9-130 µg/12oz.", kaynak: "IARC Vol 101 (2013) · NTP Tech Report 535 (2007) · California OEHHA Prop 65 · Consumer Reports 2014", alternatif: "Doğal hurma karameli · Pekmez · Düşük işlenmiş E150a", makam: "Acemaşiran", burclar: ["Koç", "Aslan", "Yay"] },
 "E171": { ad: "Titanyum Dioksit", kat: "Renklendirici", risk: "yuksek", organlar: ["Bağırsak", "DNA (olası)"], etki: "AB Komisyon Regülasyonu 2022/63 ile 7 Şubat 2022'den itibaren gıdalarda yasaklandı. EFSA 2021 görüşü: genotoksisite endişesi (DNA hasarı potansiyeli) dışlanamadığı için güvenli günlük alım belirlenemedi. ABD FDA hâlâ GRAS olarak kabul ediyor.", kaynak: "EFSA Journal 2021;19(5):6585 · AB Reg 2022/63 · FDA Color Additive Status", alternatif: "Pirinç unu · Kalsiyum karbonat · Doğal opaklaştırıcılar", makam: "Acemaşiran", burclar: ["Yengeç", "Balık"] },
 "TİTANYUM DİOKSİT": { ad: "Titanyum Dioksit", kat: "Renklendirici", risk: "yuksek", organlar: ["Bağırsak", "DNA (olası)"], etki: "AB'de gıdalarda 2022'den beri yasak (Reg 2022/63). EFSA: genotoksisite riski dışlanamıyor.", kaynak: "EFSA 2021 · AB Reg 2022/63", alternatif: "Pirinç unu · Doğal opaklaştırıcılar", makam: "Acemaşiran", burclar: ["Yengeç", "Balık"] },
 "E211": { ad: "Sodyum Benzoat", kat: "Koruyucu", risk: "yuksek", organlar: ["Bağırsak Florası", "Solunum (hassas kişiler)"], etki: "Tek başına EFSA/FDA tarafından güvenli kabul edilir. Ancak askorbik asit (C vitamini) + ısı/ışık ile temas ettiğinde Grup 1 kanserojen benzen oluşur. FDA 2005-2007 testlerinde bazı meyveli içeceklerde EPA içme suyu limiti olan 5 ppb'yi aşan benzen tespit edildi. Southampton çalışmasında hiperaktivite ile ilişkilendirildi.", kaynak: "FDA Voluntary Beverage Testing 2007 · McCann Lancet 2007 · EFSA Reg 1333/2008 · WHO benzen", alternatif: "Doğal sirke · Limon suyu · Tuz", makam: "Acemaşiran", burclar: ["Yengeç", "Akrep", "Balık"] },
 "SODYUM BENZOAT": { ad: "Sodyum Benzoat", kat: "Koruyucu", risk: "yuksek", organlar: ["Bağırsak Florası", "Solunum"], etki: "C vitaminiyle birlikte ısı/ışıkta benzen oluşturabilir (kanserojen).", kaynak: "FDA 2007 · WHO benzen değerlendirmesi", alternatif: "Limon suyu · Sirke", makam: "Acemaşiran", burclar: ["Yengeç", "Akrep"] },
 "E250": { ad: "Sodyum Nitrit", kat: "Koruyucu", risk: "kritik", organlar: ["Bağırsak", "Mide"], etki: "İşlenmiş et IARC Grup 1 kanserojen (2015, Vol 114) — kolorektal kanser kanıtı kesin. Nitritin kendisi endojen nitrozasyon koşullarında Grup 2A (IARC Vol 94). 50g/gün işlenmiş et tüketimi kolorektal kanser riskini %17-18 artırır. NHS sınırı 70g/gün. AB 2024'te nitrit kullanım limitlerini azalttı.", kaynak: "IARC Vol 114 (2018) · IARC Vol 94 (2010) · WHO 2015 · ANSES 2022", alternatif: "Taze et · Doğal tuzlama · Kekik-biberiye marinade", makam: "Hicaz", burclar: ["Boğa", "Başak", "Oğlak"] },
 "SODYUM NİTRİT": { ad: "Sodyum Nitrit", kat: "Koruyucu", risk: "kritik", organlar: ["Bağırsak", "Mide"], etki: "İşlenmiş et IARC Grup 1 kanserojen, nitrit Grup 2A. Kolorektal kanser ile pozitif ilişki.", kaynak: "IARC Vol 114 · WHO 2015", alternatif: "Taze et · Doğal tuzlama", makam: "Hicaz", burclar: ["Boğa", "Başak"] },
 "E220": { ad: "Kükürt Dioksit / Sülfit", kat: "Koruyucu", risk: "yuksek", organlar: ["Akciğer (astım)", "Bağışıklık"], etki: "EFSA 2022 yeniden değerlendirmesinde grup ADI 0.7 mg SO2/kg/gün olarak geçici tutuldu; yüksek tüketicilerde aşılma riski belirlendi. Astım hastalarında ciddi solunum krizi tetikleyebilir, anafilaktik şoka neden olabilir. AB'nin 14 yasal alerjeninden biri.", kaynak: "EFSA Journal 2022;20(11):7594 · AB Alerjen Listesi (Reg 1169/2011)", alternatif: "Doğal kurutma · Tuz · Sirke", makam: "Hicaz", burclar: ["İkizler", "Kova"] },
 "E319": { ad: "TBHQ (Tersiyer Bütil Hidrokinon)", kat: "Antioksidan", risk: "yuksek", organlar: ["Karaciğer (yüksek doz)", "DNA (hayvan)"], etki: "Japonya'da gıda katkı maddesi olarak izinli değil. AB'de bazı uygulamalarda kısıtlı. FDA: maksimum 200 mg/kg yağ. JECFA ADI: 0.7 mg/kg/gün. Hayvan çalışmalarında DNA hasarı ve ön mide tümörü öncülleri rapor edildi (yüksek dozda). EFSA genotoksik değil olarak değerlendirdi.", kaynak: "JECFA 2004 · FDA 21 CFR 172.185 · Japan MHLW Positive List · PMC9764193 (review 2022)", alternatif: "E vitamini (tokoferol) · Biberiye ekstresi", makam: "Acemaşiran", burclar: ["Koç", "Aslan", "Yay"] },
 "TBHQ": { ad: "TBHQ", kat: "Antioksidan", risk: "yuksek", organlar: ["Karaciğer (yüksek doz)"], etki: "Japonya'da izinli değil. JECFA ADI 0.7 mg/kg/gün. Yüksek dozda DNA hasarı gösterildi.", kaynak: "JECFA · FDA 21 CFR 172.185", alternatif: "Biberiye · E vitamini", makam: "Acemaşiran", burclar: ["Koç", "Aslan"] },
 "E320": { ad: "BHA (Butil Hidroksianisol)", kat: "Antioksidan", risk: "yuksek", organlar: ["Mide ön kısmı (hayvan)", "Hormonal Sistem (potansiyel)"], etki: "IARC Grup 2B (olası insan kanserojeni, 1986/1987). Rat ön mide hiperplazisi gözlemi. EFSA 2011 ADI: 1.0 mg/kg/gün. California Prop 65 'insanlar için kanserojen olduğu makul ölçüde tahmin edilen' madde listesinde. AB'de izinli ama Japonya gibi bazı ülkelerde kısıtlı.", kaynak: "IARC Vol 40 (1986) · EFSA Journal 2011;9(10):2392 · California OEHHA Prop 65", alternatif: "E vitamini (tokoferol) · Biberiye ekstresi", makam: "Acemaşiran", burclar: ["Koç", "Aslan", "Yay"] },
 "BHA": { ad: "BHA", kat: "Antioksidan", risk: "yuksek", organlar: ["Mide", "Hormonal Sistem"], etki: "IARC Grup 2B olası kanserojen. California Prop 65 listesinde.", kaynak: "IARC Vol 40 · California Prop 65", alternatif: "E vitamini · Biberiye", makam: "Acemaşiran", burclar: ["Koç", "Aslan"] },
 "E321": { ad: "BHT (Butil Hidroksitoluen)", kat: "Antioksidan", risk: "orta", organlar: ["Karaciğer", "Tiroid (yüksek doz)"], etki: "IARC Grup 3 (insanlar için kanserojen olarak sınıflandırılamaz). FDA GRAS statüsü mevcut. EFSA 2012 ADI: 0.25 mg/kg/gün. Yüksek dozda fare karaciğer tümörü gösterildi ama insan kanıtı yetersiz. BHA ile birlikte kullanıldığında riski tartışmalı.", kaynak: "IARC Vol 40 · EFSA Journal 2012;10(3):2588 · FDA GRAS", alternatif: "Rozmarin ekstresi · E vitamini", makam: "Rast", burclar: ["İkizler", "Terazi"] },
 "BHT": { ad: "BHT", kat: "Antioksidan", risk: "orta", organlar: ["Karaciğer (yüksek doz)"], etki: "IARC Grup 3 — kanserojen olarak sınıflandırılamaz. EFSA ADI: 0.25 mg/kg/gün.", kaynak: "IARC Vol 40 · EFSA 2012", alternatif: "Rozmarin · E vitamini", makam: "Rast", burclar: ["İkizler"] },
 "E338": { ad: "Fosforik Asit", kat: "Asit Düzenleyici", risk: "orta", organlar: ["Kemikler", "Böbrekler", "Diş Minesi"], etki: "EFSA/FDA güvenli kabul eder (ADI 'belirtilmemiş', iyi imalat uygulaması). Ancak Tucker 2006 (Framingham Osteoporoz Çalışması, AJCN 84:936): kola tüketen kadınlarda kemik mineral yoğunluğunda azalma. Yüksek tüketimde diş minesi erozyonu ve böbrek taşı riski. Kolada pH ~2.5 — batarya asidine benzer aşındırıcılık.", kaynak: "Tucker KL et al. AJCN 2006;84:936-942 · EFSA ADI not specified · General Dentistry erosion study", alternatif: "Maden suyu · Limonata · Ayran · Kefir", makam: "Hicaz", burclar: ["Boğa", "Başak", "Oğlak"] },
 "E407": { ad: "Karragenan", kat: "Emülgatör/Kıvam", risk: "yuksek", organlar: ["Bağırsak", "Bağışıklık (potansiyel)"], etki: "EFSA 2018 yeniden değerlendirmesi: AB'de 12 haftalıktan küçük bebekler için süt formüllerinde YASAK. Yetişkinler için 'kabul edilebilir' fakat ileri araştırma önerildi. Hayvan çalışmalarında bozunmuş karragenan kolitis ve bağırsak iltihabı yaratır; gıda sınıfı için tartışma sürüyor. IBD ve IBS hastalarında semptomlarla ilişkilendirildi.", kaynak: "EFSA Journal 2018;16(4):5238 · Tobacman EHP 2001 · Bhattacharyya Nutrition 2017", alternatif: "Agar agar · Pektin · Keçiboynuzu sakızı · Guar gum", makam: "Acemaşiran", burclar: ["Yengeç", "Akrep", "Balık"] },
 "E450": { ad: "Difosfat", kat: "Emülgatör/Asit Düzenleyici", risk: "yuksek", organlar: ["Böbrekler", "Damar (yüksek tüketim)"], etki: "EFSA 2019: fosforik asit ve fosfatlar (E338-341, E343, E450-452) için grup ADI 40 mg fosfor/kg/gün belirlendi; gıda kaynaklı alımın bazı popülasyonlarda aşıldığı belirtildi. Yüksek serum fosfat seviyeleri kardiyovasküler mortalite ve damar kireçlenmesi ile ilişkilendirildi. Kronik böbrek hastalarında özellikle önemli.", kaynak: "EFSA Journal 2019;17(6):5674 · Tonelli Circulation 2005 · Dhingra Arch Intern Med 2007", alternatif: "Doğal bikarbonat · Limon suyu · Maden suyu", makam: "Hicaz", burclar: ["Boğa", "Başak", "Oğlak"] },
 "E452": { ad: "Polifosfat", kat: "Emülgatör", risk: "yuksek", organlar: ["Böbrekler", "Damar"], etki: "EFSA 2019 grup ADI 40 mg P/kg/gün. Aynı fosfat grubu — yüksek alım kardiyovasküler ve böbrek riski.", kaynak: "EFSA 2019;17(6):5674", alternatif: "Taze et · Limon suyu", makam: "Hicaz", burclar: ["Boğa", "Oğlak"] },
 "E471": { ad: "Mono ve Digliseritler", kat: "Emülgatör", risk: "yuksek", organlar: ["Kalp", "Damar (gizli trans yağ)", "Bağırsak Florası"], etki: "EFSA güvenli kabul eder. Ancak üretimde küçük miktarda trans yağ içerebilir; FDA trans yağ yasağı emülgatörleri kapsamaz. Sellem 2024 (NutriNet-Santé, Fransa): yüksek E471 tüketimi meme/prostat kanseri ile pozitif ilişki (gözlemsel).", kaynak: "EFSA 2017 · Mozaffarian NEJM 2006;354:1601 · Sellem PLOS Med 2024", alternatif: "Zeytinyağı · Tereyağı · Doğal lesitin", makam: "Hüseyni", burclar: ["Aslan", "Koç"] },
 "E621": { ad: "Monosodyum Glutamat (MSG)", kat: "Lezzet Güçlendirici", risk: "orta", organlar: ["Hassas kişilerde baş ağrısı / tansiyon"], etki: "EFSA 2017 yeniden değerlendirmesinde grup ADI 30 mg/kg/gün belirlendi. EFSA bazı popülasyonların (özellikle çocuklar) bu ADI'yi aştığını, yüksek alımda baş ağrısı, kan basıncı artışı ve insülin yükselmesi ile ilişkili olabileceğini belirtti. FDA: GRAS. Hayvan çalışmalarında (Olney 1969) yenidoğan farelerde eksitotoksisite gösterildi; insan kanıtı tartışmalı. AB'de etikette 'monosodyum glutamat' veya 'E621' beyanı zorunlu.", kaynak: "EFSA Journal 2017;15(7):4910 · Olney Science 1969;164:719 · FDA GRAS", alternatif: "Zerdeçal · Kimyon · Kekik · Doğal et/sebze suyu · Mantar tozu (doğal umami)", makam: "Rast", burclar: ["Koç", "Aslan", "Yay"] },
 "MSG": { ad: "Monosodyum Glutamat", kat: "Lezzet Güçlendirici", risk: "orta", organlar: ["Hassas kişilerde baş ağrısı / tansiyon"], etki: "E621 ile aynı. EFSA 2017 ADI 30 mg/kg/gün. Yüksek alımda baş ağrısı, kan basıncı artışı.", kaynak: "EFSA 2017 · Olney 1969", alternatif: "Mantar tozu · Doğal baharat · Et suyu", makam: "Rast", burclar: ["Koç", "Aslan", "Yay"] },
 "E635": { ad: "Disodyum Ribonükleotit", kat: "Lezzet Güçlendirici", risk: "orta", organlar: ["Eklemler/Ürik Asit (gut hastaları)"], etki: "JECFA ve EFSA güvenli kabul eder (ADI 'belirtilmemiş'). MSG ile sinerjik etki yapar (umami güçlendirici). Pürin metabolizması sonucu ürik aside dönüşür — gut, hiperürisemi ve ürik asit böbrek taşı olan kişilerde dikkat. AB'de bebek/küçük çocuk gıdalarında izinli değil.", kaynak: "JECFA 1974 · EFSA E626-635 yeniden değerlendirme süreci · AB Reg 1333/2008", alternatif: "Mantar tozu · Doğal et/sebze suyu · Kuru domates", makam: "Hicaz", burclar: ["Boğa", "Başak", "Oğlak"] },
 "MISIR ŞURUBU": { ad: "Yüksek Fruktozlu Mısır Şurubu (HFCS)", kat: "Tatlandırıcı", risk: "yuksek", organlar: ["Karaciğer", "Pankreas", "Damar"], etki: "Yağlı karaciğer hastalığı (NAFLD/MASLD), insülin direnci, obezite ve metabolik sendrom ile güçlü ilişki. Glukozdan farklı olarak GLUT5 yoluyla doğrudan karaciğere giderek de novo lipogenezi tetikler. Yüksek tüketim hipertrigliseridemiye yol açar.", kaynak: "Yu et al. Front Nutr 2025 sistematik derleme · Bray AJCN 2004 · Softic 2024 Biomolecules · Sigala 2022 (insan RCT)", alternatif: "Ham bal · Pekmez · Hurma · Taze meyve", makam: "Uşşak", burclar: ["Boğa", "Başak", "Oğlak"] },
 "GLİKOZ ŞURUBU": { ad: "Glikoz Şurubu", kat: "Tatlandırıcı", risk: "orta", organlar: ["Pankreas", "Karaciğer"], etki: "Yüksek glisemik indeks. Ani kan şekeri yükselişi, pankreas yorgunluğu. HFCS'ye göre daha az lipogenezik ama yüksek miktarda obezite ve Tip 2 diyabet riski.", kaynak: "ADA Diyabet Kılavuzu · Stanhope JCI 2009", alternatif: "Pekmez · Ham bal · Hurma", makam: "Uşşak", burclar: ["Boğa", "Yengeç"] },
 "PALMİYE YAĞI": { ad: "Palm Yağı (Rafine)", kat: "Yağ", risk: "orta", organlar: ["Kalp/Damar (yüksek tüketim)", "İşleme kontaminantları"], etki: "Rafineri sürecinde yüksek ısıda 3-MCPD ve glisidil esterler oluşur. EFSA 2018 bunları potansiyel kanserojen/genotoksik olarak değerlendirdi; AB sınır değerleri belirledi (Reg 2020/1322). Doymuş yağ oranı %50, WHO doymuş yağ alımının kalori %10'unu aşmaması önerisi.", kaynak: "EFSA Journal 2018;16(1):5083 · AB Reg 2020/1322 · WHO Saturated Fat Guideline 2018", alternatif: "Zeytinyağı · Hindistancevizi yağı · Tereyağı", makam: "Hüseyni", burclar: ["Aslan", "Koç"] },
 "TRANS YAĞ": { ad: "Trans Yağ (Endüstriyel)", kat: "Yağ", risk: "kritik", organlar: ["Kalp", "Damar", "Beyin"], etki: "FDA Haziran 2018'de kısmi hidrojenize yağları (PHO) yasakladı. WHO 2018'de küresel REPLACE programı başlattı. LDL kolesterolü yükseltir, HDL'yi düşürür, koroner kalp hastalığı ve ani kalp ölümü ile güçlü neden-sonuç ilişkisi. Tahmini olarak ABD'de 90.000 erken ölümü önler.", kaynak: "FDA Final PHO Determination 2015/2018 · Mozaffarian NEJM 2006;354:1601 · WHO REPLACE 2018", alternatif: "Zeytinyağı · Tereyağı · Avokado yağı", makam: "Hüseyni", burclar: ["Aslan", "Koç"] },
 "HİDROJENİZE YAĞ": { ad: "Hidrojenize Yağ (PHO)", kat: "Yağ", risk: "kritik", organlar: ["Kalp", "Damar"], etki: "Trans yağ kaynağı. FDA 2018'de yasakladı (GRAS değil).", kaynak: "FDA 2015 Final Determination", alternatif: "Zeytinyağı · Tereyağı", makam: "Hüseyni", burclar: ["Aslan"] },
 "MARGARİN": { ad: "Margarin (Endüstriyel)", kat: "Yağ", risk: "yuksek", organlar: ["Kalp", "Damar"], etki: "Modern margarinlerde trans yağ büyük ölçüde kaldırıldı (FDA 2018 yasağı sonrası). Ancak yüksek omega-6, palm yağı ve emülgatör içeriği nedeniyle dikkatli kullanım önerilir.", kaynak: "AHA 2020 · FDA PHO yasağı", alternatif: "Tereyağı · Zeytinyağı · Hindistancevizi yağı", makam: "Hüseyni", burclar: ["Aslan", "Koç"] },
 "RAFINE ŞEKER": { ad: "Rafine Şeker (Sukroz)", kat: "Tatlandırıcı", risk: "orta", organlar: ["Pankreas", "Damar", "Diş Minesi"], etki: "WHO 2015 kılavuzu: serbest şeker günlük kalorinin %10'undan az, ideali %5 (≈25g). Yüksek tüketim Tip 2 diyabet, obezite, kalp hastalığı, diş çürüğü.", kaynak: "WHO Sugars Guideline 2015 · AHA 2009 Circulation 120:1011", alternatif: "Ham bal · Pekmez · Hurma", makam: "Uşşak", burclar: ["Boğa", "Başak"] },
 "YAPAY AROMA": { ad: "Yapay Aroma", kat: "Aroma", risk: "orta", organlar: ["İçerik gizli — şeffaflık eksikliği"], etki: "AB ve FDA'da kayıtlı binlerce aroma bileşeni güvenli kabul edilir. Ancak 'aroma' beyanı altında çok sayıda kimyasal kullanılabilir — tüketici şeffaflığı sınırlı. EWG ve CSPI bu kategoriyi eleştirir.", kaynak: "AB Reg 1334/2008 · FEMA GRAS · EWG Food Scores", alternatif: "Doğal baharatlar · Vanilya çubuğu · Esans", makam: "Acemaşiran", burclar: ["Koç", "Aslan"] },
 "MAYA EKSTRESİ": { ad: "Maya Ekstresi (Otoliz)", kat: "Lezzet Bileşeni", risk: "orta", organlar: ["MSG'ye hassas kişilerde reaksiyon"], etki: "Doğal olarak serbest glutamat içerir (MSG benzeri etki). 'MSG yok' diyen ürünlerde umami sağlamak için kullanılır. MSG hassasiyeti olan kişilerde benzer semptomlar yaratabilir. FDA 'doğal aroma' kapsamında izinli.", kaynak: "FDA 21 CFR 101.22 · Mortensen EFSA 2017", alternatif: "Doğal baharat · Mantar tozu · Et/sebze suyu", makam: "Rast", burclar: ["Koç"] },
 "KAFEİN": { ad: "Kafein (İlave Edilmiş)", kat: "Uyarıcı", risk: "orta", organlar: ["Sinir Sistemi", "Kalp"], etki: "EFSA 2015 (EFSA J 13:4102): yetişkinlerde günlük 400 mg'a kadar güvenli, hamilelerde 200 mg sınırı. Çocuklarda 3 mg/kg sınırı. Enerji içeceklerinde yüksek dozda çarpıntı, kaygı, uyku bozukluğu, bağımlılık.", kaynak: "EFSA Journal 2015;13(5):4102", alternatif: "Yeşil çay · Ihlamur · Mate", makam: "Rast", burclar: ["Koç", "Aslan", "Yay"] },
 "GLİFOSAT": { ad: "Glifosat (Roundup)", kat: "Pestisit Kalıntısı", risk: "yuksek", organlar: ["Lenf Sistemi (NHL)", "Bağırsak Florası"], etki: "IARC Mart 2015 (Vol 112): 'insanlar için muhtemel kanserojen' (Grup 2A) — gerekçe: Non-Hodgkin Lenfoma ile sınırlı insan kanıtı + hayvanlarda yeterli kanıt + güçlü genotoksisite. EFSA ve EPA güvenli olarak değerlendiriyor (görüş ayrılığı). Monsanto'ya karşı ABD'de milyarlarca dolarlık davalar açıldı.", kaynak: "IARC Monograph Vol 112 (2015) · Zhang Mutation Research 2019 (NHL meta-analiz %41 artış)", alternatif: "Organik sertifikalı (USDA/AB Bio) tahıllar ve sebzeler", makam: "Acemaşiran", burclar: ["Koç", "Aslan"] },
 "BPA": { ad: "Bisfenol A (BPA)", kat: "Kirlilik (Ambalaj)", risk: "kritik", organlar: ["Hormonal Sistem", "Bağışıklık", "Üreme"], etki: "EFSA Nisan 2023 yeniden değerlendirmesi: Tolere edilebilir günlük alım 4 µg/kg'dan 0.2 ng/kg'a düşürüldü (20.000 kat azaltma). Tüm yaş gruplarının ortalama maruziyet bu sınırı aşıyor. Gerekçe: bağışıklık sistemi üzerine etki, östrojen taklit eden endokrin bozucu özellik. AB'de bebek biberonlarında 2011'den yasak. 2025'ten itibaren gıda ile temas eden malzemelerde geniş yasak.", kaynak: "EFSA Journal 2023;21(4):e6857 · ECHA endokrin bozucu listesi · AB Reg 2018/213", alternatif: "Cam ambalaj · Paslanmaz çelik · BPA-free sertifikalı", makam: "Hüseyni", burclar: ["Yengeç", "Akrep"] },
 "AKRİLAMİD": { ad: "Akrilamid", kat: "İşleme Kontaminantı", risk: "yuksek", organlar: ["Sinir Sistemi", "DNA (genotoksik)"], etki: "IARC Grup 2A (muhtemel insan kanserojeni). 120°C üzerinde nişastalı gıdalarda Maillard reaksiyonuyla oluşur (kızarmış patates, ekmek kabuğu, kahve, bisküvi). EFSA: maruziyet endişe seviyesinde. AB 2017 azaltma referans değerleri belirledi.", kaynak: "IARC Vol 60 · EFSA Journal 2015;13(6):4104 · AB Reg 2017/2158", alternatif: "Düşük ısı (haşlama/buharda pişirme) · Patatesi koyu kızartmama", makam: "Rast", burclar: ["Koç", "Aslan"] },
 "E466": { ad: "Karboksimetil Selüloz (CMC)", kat: "Emülgatör/Kıvam Verici", risk: "orta", organlar: ["Bağırsak Florası", "Bağırsak duvarı"], etki: "Chassaing 2015 (Nature 519:92): farelerde bağırsak florasını bozdu, düşük dereceli iltihap ve metabolik sendrom tetikledi. Chassaing 2022 (Gastroenterology, insan müdahale): bağırsak mikrobiyom kompozisyonunu değiştirdi.", kaynak: "Chassaing Nature 2015;519:92 · Chassaing Gastroenterology 2022", alternatif: "Agar agar · Pektin · Keçiboynuzu sakızı", makam: "Acemaşiran", burclar: ["Yengeç", "Balık"] },
 "E433": { ad: "Polisorbat 80", kat: "Emülgatör", risk: "orta", organlar: ["Bağırsak Florası"], etki: "Chassaing 2015 (Nature): CMC ile beraber test edildi, bağırsak florası yıkımı ve sistemik iltihaplanma gösterdi.", kaynak: "Chassaing Nature 2015;519:92", alternatif: "Doğal lesitin (ayçiçeği/soya)", makam: "Acemaşiran", burclar: ["Yengeç", "Balık"] },
 "E330": { ad: "Sitrik Asit", kat: "Asit Düzenleyici", risk: "dusuk", organlar: ["Diş Minesi (yüksek tüketim)"], etki: "EFSA/FDA GRAS — günlük alım sınırı 'belirtilmemiş'. Genel olarak güvenli. Aşırı asit içecek tüketiminde diş erozyonuna katkı sağlayabilir. Sentetik üretiminde küflerden kaynaklı nadir alerji vakaları rapor edildi.", kaynak: "EFSA Re-evaluation 2014 · FDA GRAS 21 CFR 184.1033", alternatif: "Doğal limon suyu · Sirke", makam: "Segah", burclar: ["Koç", "Aslan"] },
 "FRUKTOZ": { ad: "İlave Fruktoz", kat: "Tatlandırıcı", risk: "yuksek", organlar: ["Karaciğer", "Pankreas"], etki: "Stanhope 2009 (JCI 119:1322): 10 hafta fruktoz tüketimi insülin direnci ve viseral yağlanma artırdı. Yağlı karaciğer hastalığı (NAFLD) ile bağlantılı. Doğal meyvedeki fruktoz lif ile dengelendiği için aynı etkiyi göstermez.", kaynak: "Stanhope JCI 2009;119:1322 · Lustig Nature 2012;482:27", alternatif: "Taze meyve (lifli)", makam: "Uşşak", burclar: ["Boğa", "Yengeç"] },
 "NİTRİT": { ad: "Nitrit (Genel)", kat: "Koruyucu", risk: "yuksek", organlar: ["Bağırsak", "Mide"], etki: "Endojen nitrozasyon koşullarında IARC Grup 2A. İşlenmiş et bağlantısı Grup 1.", kaynak: "IARC Vol 94 · IARC Vol 114", alternatif: "Taze gıda · Doğal tuzlama", makam: "Hicaz", burclar: ["Boğa", "Başak"] },
};

/* ══════════════════════════════════════════════
 GİYİM VERİTABANI
 ══════════════════════════════════════════════ */
const GIYIM_DB = {
 "POLİESTER": { ad: "Polyester (PET)", kat: "Sentetik Kumaş", risk: "yuksek", organlar: ["Cilt (kontakt dermatit)", "Hormonal (mikroplastik)"], etki: "Petrol türevi (PET). Üretim katalizörü antimon trioksit içerir (olası kanserojen, IARC Grup 2B). Geri dönüştürülmüş polyester BPA içerebilir (Xue 2018). Mikroplastik salımı: yıkamada lif başına ortalama 700.000 mikrofiber (Napper 2016). Mikroplastiklerin endokrin bozucu kimyasalları taşıdığı gösterildi.", kaynak: "Westerhoff Env Sci 2018 · Napper Mar Pollut Bull 2016 · IARC Vol 47 (antimon)", alternatif: "Organik pamuk · Keten · Yün · GOTS sertifikalı", makam: "Hicaz" },
 "POLYESTER": { ad: "Polyester (PET)", kat: "Sentetik Kumaş", risk: "yuksek", organlar: ["Cilt", "Hormonal Sistem (mikroplastik)"], etki: "Mikroplastik kaynağı. Antimon ve BPA kalıntıları içerebilir.", kaynak: "Napper 2016 · IARC Vol 47", alternatif: "Organik pamuk · Keten", makam: "Hicaz" },
 "NAİLON": { ad: "Naylon", kat: "Sentetik Kumaş", risk: "yuksek", organlar: ["Cilt", "Hormonal Sistem"], etki: "Kaprolaktam kalıntısı. Mikroplastik.", kaynak: "REACH · Greenpeace Detox 2012", alternatif: "Organik pamuk · Bambu", makam: "Segah" },
 "NYLON": { ad: "Naylon/Nylon", kat: "Sentetik Kumaş", risk: "yuksek", organlar: ["Cilt", "Hormonal Sistem"], etki: "Kaprolaktam kalıntısı. Mikroplastik.", kaynak: "REACH Yönetmeliği", alternatif: "Organik pamuk · Bambu", makam: "Segah" },
 "AKRİLİK": { ad: "Akrilik Lif (Akrilonitril Bazlı)", kat: "Sentetik Kumaş", risk: "kritik", organlar: ["Akciğer (mesleki maruziyet)", "DNA"], etki: "Akrilik liflerin ana hammaddesi akrilonitril, IARC 2024 (Vol 136) ile Grup 2B'den **Grup 1 (insanlar için kanserojen)** seviyesine yükseltildi. İşçilerde insan kanseri kanıtı yeterli görüldü. Bitmiş giysilerde monomer kalıntısı düşük seviyede olsa da üretim koşullarına bağlı. Mikroplastik salımı (yüksek), cilt teması durumunda dermatit.", kaynak: "IARC Volume 136 (2024) · IARC Vol 71 (1999) güncellemesi · EPA acrylonitrile toxicity profile", alternatif: "Merino yünü · Organik pamuk · Yün karışım", makam: "Acemaşiran" },
 "VİSKOZ": { ad: "Viskoz/Rayon", kat: "Yarı Sentetik", risk: "yuksek", organlar: ["Cilt", "Karaciğer"], etki: "Üretimde karbon disülfür. Kimyasal kalıntı riski.", kaynak: "CHEM Trust 2018", alternatif: "Organik pamuk · Keten", makam: "Segah" },
 "RAYON": { ad: "Rayon/Viskoz", kat: "Yarı Sentetik", risk: "yuksek", organlar: ["Cilt", "Karaciğer"], etki: "Karbon disülfür kalıntısı.", kaynak: "CHEM Trust 2018", alternatif: "Organik pamuk", makam: "Segah" },
 "ELASTAN": { ad: "Elastan/Likra", kat: "Sentetik Kumaş", risk: "yuksek", organlar: ["Cilt", "Hormonal Sistem"], etki: "İzosiyonat — alerjik reaksiyon, astım.", kaynak: "ECHA izosiyonat · REACH", alternatif: "Doğal lastikli organik pamuk", makam: "Hicaz" },
 "LİKRA": { ad: "Elastan/Likra", kat: "Sentetik Kumaş", risk: "yuksek", organlar: ["Cilt", "Hormonal Sistem"], etki: "İzosiyonat alerjisi.", kaynak: "ECHA · REACH", alternatif: "Doğal lastikli pamuk", makam: "Hicaz" },
 "POLİÜRETAN": { ad: "PU Deri (Polyüretan)", kat: "Suni Deri", risk: "kritik", organlar: ["Cilt", "Akciğer", "Karaciğer"], etki: "DMF içerir — cilt yoluyla emilir, karaciğer hasarı.", kaynak: "ECHA DMF · Lancet 2004", alternatif: "Gerçek deri · Mantar derisi", makam: "Acemaşiran" },
 "PU DERİ": { ad: "PU Deri", kat: "Suni Deri", risk: "kritik", organlar: ["Cilt", "Karaciğer"], etki: "DMF kalıntısı — karaciğer hasarı.", kaynak: "Lancet 2004 · ECHA", alternatif: "Gerçek deri · Mantar", makam: "Acemaşiran" },
 "PVC": { ad: "PVC (Vinil)", kat: "Suni Deri", risk: "kritik", organlar: ["Hormonal Sistem", "Karaciğer", "Akciğer"], etki: "Ftalat ve kurşun içerebilir. Üretimde dioksin.", kaynak: "Greenpeace PVC · ECHA ftalat", alternatif: "Gerçek deri · Kanvas", makam: "Acemaşiran" },
 "MİKROFİBER": { ad: "Mikrofiber", kat: "Sentetik Kumaş", risk: "yuksek", organlar: ["Cilt", "Akciğer"], etki: "Her yıkamada 700.000+ mikroplastik salar.", kaynak: "Napper & Thompson · Env Science 2016", alternatif: "Organik pamuk · Bambu", makam: "Hicaz" },
 "PFAS": { ad: "PFAS (Sonsuza Dek Kimyasallar)", kat: "Su/Leke İticisi", risk: "kritik", organlar: ["Karaciğer", "Böbrekler", "Bağışıklık", "Hormonal Sistem"], etki: "IARC 2023: PFOA Grup 1 (kanserojen — insan kanıtı yeterli), PFOS Grup 2B. Sonsuza dek bozulmazlar — vücutta birikir. Bağışıklık sistemi baskılaması, tiroid bozukluğu, böbrek/testis kanseri ile ilişkilendirildi. Su geçirmez yağmurluk, spor giyim, halı, kaplama gibi uygulamalarda. AB 2023: C9-14 PFCAs yasak; Şubat 2025 Fransa yasası: 2026'dan PFAS'lı tekstil yasak; ECHA universal PFAS kısıtlaması süreçte. ABD eyaletleri (Maine, NY, CA) ardışık yasaklar uyguluyor.", kaynak: "IARC Vol 135 (2023) · AB Reg 2024/2462 (PFHxA) · Fransa Loi 2025-188 · ECHA REACH SVHC", alternatif: "PFC-free / PFAS-free sertifikalı (bluesign, OEKO-TEX)", makam: "Acemaşiran" },
 "PFOA": { ad: "PFOA (Perfluorooktanoik Asit)", kat: "Su/Leke İticisi", risk: "kritik", organlar: ["Karaciğer", "Böbrekler", "DNA"], etki: "IARC 2023 (Vol 135): Grup 1 — insanlar için kanserojen. Stockholm Sözleşmesi POP listesi 2019. AB POP Regülasyonu ile tekstillerde yasaklı.", kaynak: "IARC Vol 135 (2023) · Stockholm POP 2019 · AB POP Reg 2019/1021", alternatif: "PFOA-free sertifikalı", makam: "Acemaşiran" },
 "FORMALDEHİT": { ad: "Formaldehit (Kırışmaz Apre)", kat: "Tekstil Reçinesi", risk: "kritik", organlar: ["Cilt (kontakt dermatit)", "Solunum", "Nazofarenks (mesleki maruziyet)"], etki: "IARC Grup 1 — insanlar için kanserojen (nazofarenks kanseri, mesleki maruziyet). 'Kırışmaz', 'ütü gerektirmez' apreler için tekstil reçinesi olarak kullanılır (DMDHEU vb.). Giyimde alerjik kontakt dermatit nedeni — sıklık %0.2-4.2. Japonya yasalla ≤75 ppm sınırı; ABD'de zorunlu sınır yok (Amerikan Apparel & Footwear gönüllü standart <75 ppm yetişkin, <20 ppm 3 yaş altı). Türkiye, AB OEKO-TEX standartları takip eder.", kaynak: "IARC Vol 88/100F · JRC EU Survey (2007) · Reitz Dermatitis 2022", alternatif: "OEKO-TEX Standard 100 · GOTS organik pamuk · Yıkanmamış kırışmaz olmayan ürünler", makam: "Rast" },
 "FORMALDEHYDE": { ad: "Formaldehit", kat: "Tekstil Reçinesi", risk: "kritik", organlar: ["Cilt", "Solunum"], etki: "IARC Grup 1 kanserojen.", kaynak: "IARC Vol 88/100F", alternatif: "OEKO-TEX sertifikalı", makam: "Rast" },
 "TRİKLOSAN": { ad: "Triclosan", kat: "Antibakteriyel Apret", risk: "kritik", organlar: ["Hormonal Sistem", "Bağırsak Florası", "Tiroid"], etki: "FDA 2016'da yasakladı. Tiroid hormonunu etkiler.", kaynak: "FDA 2016 · Darbre 2006", alternatif: "Organik pamuk", makam: "Hüseyni" },
 "AZO BOYASI": { ad: "Yasaklı Azo Boyaları", kat: "Tekstil Boyası", risk: "kritik", organlar: ["Cilt", "Mesane (kanser)", "DNA"], etki: "AB Direktifi 2002/61/EC (REACH Annex XVII Entry 43): cilt veya ağız ile uzun süreli temas eden tekstil/deride 22 aromatik amine bölünebilen azo boyaları yasak (30 mg/kg üzeri). Bu aminler (benzidin, 4-aminobifenil, 2-naftilamin vb.) IARC Grup 1 kanserojen — mesane kanseri ile bağlantılı. Tüm azo boyaları yasak değil — yalnızca %4'ünden azı bu aminleri açığa çıkarır.", kaynak: "AB Direktifi 2002/61/EC · REACH Annex XVII Entry 43 · IARC Vol 99/100F", alternatif: "GOTS sertifikalı · OEKO-TEX Standard 100", makam: "Acemaşiran" },
 "NİKEL": { ad: "Nikel (Aksesuar)", kat: "Metal", risk: "kritik", organlar: ["Cilt", "Akciğer", "Böbrekler"], etki: "IARC Grup 1. Kontakt dermatit.", kaynak: "IARC Vol 49 · AB 94/27/EC", alternatif: "Titanyum · Paslanmaz çelik", makam: "Hicaz" },
 "DMF": { ad: "DMF (Dimetilformamid)", kat: "Kimyasal", risk: "kritik", organlar: ["Karaciğer", "Üreme", "Cilt"], etki: "Cilt yoluyla emilir. Karaciğer hasarı.", kaynak: "EU 2009/251/EC · Lancet 2004", alternatif: "DMF içermeyen sertifikalı", makam: "Acemaşiran" },
 "ALEV GECİKTİRİCİ": { ad: "Alev Geciktirici (HBCD)", kat: "Apret", risk: "kritik", organlar: ["Hormonal Sistem", "Beyin", "Tiroid"], etki: "Stockholm Sözleşmesi ile yasaklı. Hormonal bozucu.", kaynak: "Stockholm Sözleşmesi HBCD", alternatif: "Yün (doğal alev geciktirici)", makam: "Hicaz" },
 "FTALAT": { ad: "Ftalatlar", kat: "Plastik Kimyasalı", risk: "kritik", organlar: ["Hormonal Sistem", "Karaciğer", "Üreme"], etki: "Hormonal bozucu. REACH kısıtlı.", kaynak: "ECHA ftalat · REACH Annex XIV", alternatif: "PVC-free aksesuar", makam: "Hüseyni" },
};

/* ══════════════════════════════════════════════
 EV ÜRÜNLERİ VERİTABANI (halı, koltuk, mobilya, perde, yatak)
 ══════════════════════════════════════════════ */
const EV_DB = {
 "FORMALDEHİT": { ad: "Formaldehit (Apre)", kat: "Halı/Mobilya Apresi", risk: "kritik", organlar: ["Akciğer", "Göz", "DNA"], etki: "MDF, sunta, halı apresi ve mobilya yapıştırıcılarında bulunur. IARC Grup 1 kanserojen — kesin kanserojen.", kaynak: "IARC Monograph Vol 88 · WHO IAQ 2010 · EPA TSCA Title VI", alternatif: "Solid ahşap · E0/E1 düşük emisyonlu mobilya · Doğal pamuk halı" },
 "HBCD": { ad: "HBCD (Heksabromosiklododekan)", kat: "Alev Geciktirici", risk: "kritik", organlar: ["Hormonal Sistem", "Tiroid", "Beyin"], etki: "Koltuk süngeri ve yalıtım malzemelerinde. Stockholm Sözleşmesi ile yasaklandı. Endokrin bozucu, anne sütüne geçer.", kaynak: "Stockholm Convention 2013 · ECHA SVHC", alternatif: "Doğal yün dolgu · Pamuk · Hindistan cevizi lifi" },
 "PU SÜNGER": { ad: "Poliüretan Sünger (TDI)", kat: "Yatak/Koltuk Dolgusu", risk: "yuksek", organlar: ["Akciğer", "Cilt", "Sinir Sistemi"], etki: "TDI ve MDI izosiyanat içerir. Astım ve duyarlılık reaksiyonu tetikleyebilir.", kaynak: "ECHA REACH Annex XVII · OSHA HazCom 2012", alternatif: "Doğal lateks · Atkestanesi lifi · Yün yatak" },
 "PVC PERDE": { ad: "PVC (Polivinil Klorür)", kat: "Perde/Yer Döşeme", risk: "kritik", organlar: ["Hormonal Sistem", "Karaciğer", "Akciğer"], etki: "Ftalat ve organokalay içerir. Üretim ve yanmada dioksin oluşturur. Hormon bozucu.", kaynak: "Greenpeace PVC Report 2007 · ECHA Phthalates · WHO Dioxin 2016", alternatif: "Keten perde · Pamuk · Doğal jüt zemin kaplaması" },
 "PESTİSİT HALI": { ad: "Permetrin (Halı Pestisiti)", kat: "Yün/Halı Koruyucu", risk: "yuksek", organlar: ["Sinir Sistemi", "Cilt"], etki: "Sentetik piretroid. Yün halı güve koruyucusu olarak uygulanır. EPA olası kanserojen.", kaynak: "EPA Permethrin Reregistration 2009 · ATSDR ToxProfile", alternatif: "Doğal lavanta · Sedir ağacı kokusu ile koruma" },
 "VOC CİLA": { ad: "VOC Mobilya Cilası", kat: "Vernik/Boya", risk: "yuksek", organlar: ["Akciğer", "Sinir Sistemi", "Karaciğer"], etki: "Toluen, ksilen, benzen içeren uçucu organik bileşikler. Baş ağrısı, mide bulantısı.", kaynak: "EPA Indoor Air Quality · WHO Indoor Air Guidelines 2010", alternatif: "Doğal keten yağı · Bal mumu · Şellak vernik" },
 "ANTİMON": { ad: "Antimon Trioksit", kat: "Polyester Yatak/Halı", risk: "yuksek", organlar: ["Akciğer", "Kalp", "Cilt"], etki: "PET polyester üretiminde katalizör. Yataktan ısı/ter ile sızabilir.", kaynak: "IARC Monograph Vol 47 · ECHA SVHC List", alternatif: "GOTS sertifikalı organik pamuk yatak · Yün" },
 "PFAS HALI": { ad: "PFAS (Leke Tutmaz Halı Kaplaması)", kat: "Halı/Mobilya Kaplaması", risk: "kritik", organlar: ["Karaciğer", "Böbrek", "Bağışıklık", "Hormonal Sistem"], etki: "Sonsuza dek kimyasal. Halı, kanepe ve koltuk leke tutmaz kaplamalarında. Anne sütüne ve kana geçer.", kaynak: "IARC PFAS 2023 · EPA PFAS Strategic Roadmap · EFSA 2020", alternatif: "PFC-free sertifikalı · Doğal yün · Pamuk" },
 "DEKABDE": { ad: "DecaBDE (Bromlu Alev Geciktirici)", kat: "Elektronik/Mobilya", risk: "kritik", organlar: ["Hormonal Sistem", "Beyin", "Tiroid"], etki: "TV, mobilya, halı altlığında. AB ve ABD'de kademeli yasak. Nörogelişimsel toksin.", kaynak: "Stockholm Convention Annex A · EU POPs 2019/1021", alternatif: "Düşük yanma riski olan doğal malzemeler · Yün" },
 "NAFTALEN": { ad: "Naftalen (Güve Topu)", kat: "Dolap/Halı Koruyucu", risk: "yuksek", organlar: ["Kan", "Akciğer", "Göz"], etki: "Hemolitik anemi, IARC Grup 2B muhtemel kanserojen. Bebeklerde kritik.", kaynak: "IARC Monograph Vol 82 · ATSDR 2005", alternatif: "Sedir ağacı blokları · Kuru lavanta keseleri · Defne yaprağı" },
};

/* ══════════════════════════════════════════════
 KOZMETİK VERİTABANI
 ══════════════════════════════════════════════ */
const KOZMETIK_DB = {
 "PARABEN": { ad: "Paraben (Metil/Propil/Butil)", kat: "Koruyucu", risk: "yuksek", organlar: ["Hormonal Sistem", "Üreme"], etki: "Östrojen taklitçisi. Meme dokusunda birikir. AB bazı parabenleri kısıtladı.", kaynak: "Darbre et al. J Appl Toxicol 2004 · EU Regulation 1004/2014", alternatif: "Paraben-free etiketli · Doğal koruyucular (E vitamini, rozmarin ekstresi)" },
 "SLS": { ad: "Sodyum Lauril Sülfat (SLS)", kat: "Köpürtücü", risk: "orta", organlar: ["Cilt", "Göz"], etki: "Şampuan, sabun, diş macununda. Cilt bariyerini bozar, kuruluk ve tahriş.", kaynak: "EWG Skin Deep Database · CIR Final Report 1983", alternatif: "Sodyum kokoil isetiyonat · Doğal sabun (zeytinyağlı, defne)" },
 "SLES": { ad: "Sodyum Lauret Sülfat (SLES)", kat: "Köpürtücü", risk: "orta", organlar: ["Cilt"], etki: "1,4-dioksan kalıntısı içerebilir (Grup 2B kanserojen).", kaynak: "FDA 1,4-Dioxane in Cosmetics · CIR 2015", alternatif: "Sülfatsız şampuan · Doğal kil temizleyiciler" },
 "FTALAT KOZMETİK": { ad: "Ftalat (DEHP/DBP)", kat: "Parfüm Sabitleyici", risk: "kritik", organlar: ["Hormonal Sistem", "Üreme", "Karaciğer"], etki: "Parfüm, oje ve saç spreyinde. Hormonal bozucu. Çocuklarda risk yüksek.", kaynak: "EU REACH Annex XVII · CDC NHANES Biomonitoring", alternatif: "Ftalat-free etiketli · Doğal esansiyel yağ parfümleri" },
 "OXYBENZONE": { ad: "Oksibenzon (BP-3)", kat: "Güneş Kremi UV Filtresi", risk: "yuksek", organlar: ["Hormonal Sistem", "Cilt"], etki: "Hormon bozucu. Mercanları öldürdüğü için Hawaii ve Palau'da yasak.", kaynak: "Hawaii SB2571 (2018) · FDA Sunscreen 2019", alternatif: "Mineral güneş kremi (çinko oksit, titanyum dioksit non-nano)" },
 "TRİKLOSAN KOZMETİK": { ad: "Triclosan", kat: "Antibakteriyel", risk: "kritik", organlar: ["Hormonal Sistem", "Tiroid"], etki: "Diş macunu, sabunda. FDA 2016'da antibakteriyel sabunlarda yasakladı.", kaynak: "FDA Final Rule 2016 · EU Reg 358/2014", alternatif: "Çay ağacı yağı · Doğal sabunlar" },
 "FORMALDEHYDE COSM": { ad: "Formaldehit Salıcılar (DMDM Hydantoin)", kat: "Koruyucu", risk: "kritik", organlar: ["Cilt", "Akciğer", "DNA"], etki: "Şampuan ve cilt bakımında formaldehit salar. IARC Grup 1.", kaynak: "IARC Vol 88 · EU Cosmetic Regulation Annex V", alternatif: "Formaldehyde-free etiketli ürünler" },
 "TOLUEN OJE": { ad: "Toluen", kat: "Oje Çözücü", risk: "kritik", organlar: ["Sinir Sistemi", "Üreme"], etki: "Hamilelikte beyin gelişimine zarar. AB ojelerde kısıtladı.", kaynak: "EU Cosmetic Reg Annex II · NIOSH Pocket Guide", alternatif: "3-free veya 10-free oje etiketli ürünler" },
 "ALÜMİNYUM KLORHİDRAT": { ad: "Alüminyum Klorhidrat", kat: "Deodorant/Antiperspirant", risk: "orta", organlar: ["Hormonal Sistem", "Meme Dokusu"], etki: "Ter bezlerini tıkar, meme dokusunda birikim hipotezi tartışmalı.", kaynak: "Darbre J Inorg Biochem 2005 · EFSA 2008", alternatif: "Doğal şap taşı · Soda bikarbonat bazlı deodorant" },
 "PEG BİLEŞİKLER": { ad: "PEG (Polietilen Glikol)", kat: "Cilt Yumuşatıcı", risk: "orta", organlar: ["Cilt", "Karaciğer"], etki: "1,4-dioksan ve etilen oksit kalıntısı taşıyabilir.", kaynak: "EWG Cosmetic Database · CIR 2010", alternatif: "Bitkisel yağlar (jojoba, badem, argan)" },
};

/* ══════════════════════════════════════════════
 TEMİZLİK ÜRÜNLERİ VERİTABANI
 ══════════════════════════════════════════════ */
const TEMIZLIK_DB = {
 "KLORİN ÇAMAŞIR SUYU": { ad: "Sodyum Hipoklorit (Çamaşır Suyu)", kat: "Beyazlatıcı", risk: "yuksek", organlar: ["Akciğer", "Göz", "Cilt"], etki: "Amonyakla karışırsa zehirli klorin gazı oluşturur. Solunum tahrişi.", kaynak: "OSHA Sodium Hypochlorite · NIOSH Chemical Listing", alternatif: "Karbonat + sirke · Oksijenli su · Çamaşır sodası" },
 "AMONYAK": { ad: "Amonyak", kat: "Cam/Yüzey Temizleyici", risk: "yuksek", organlar: ["Akciğer", "Göz"], etki: "Astım atak tetikleyici. Klorinle karışırsa öldürücü gaz.", kaynak: "ATSDR Ammonia 2004 · OSHA PEL", alternatif: "Sirke + su · Karbonatlı su" },
 "QUATS": { ad: "Quaternary Ammonium (BAC)", kat: "Dezenfektan", risk: "yuksek", organlar: ["Akciğer", "Üreme", "Cilt"], etki: "Astım tetikleyici. Hayvan çalışmalarında üreme toksisitesi.", kaynak: "Melin et al. Reprod Toxicol 2014 · EPA Antimicrobial", alternatif: "Hidrojen peroksit · Sirke · Çay ağacı yağı" },
 "TRİKLOSAN TEMİZLİK": { ad: "Triclosan (Antibakteriyel Sabun)", kat: "Antibakteriyel", risk: "kritik", organlar: ["Hormonal Sistem", "Bağırsak Florası"], etki: "FDA 2016 yasakladı. Antibiyotik direnci geliştirir.", kaynak: "FDA Final Rule 2016", alternatif: "Sıradan sabun + su (CDC önerisi)" },
 "SENTETIK PARFÜM": { ad: "Sentetik Parfüm (Fragrance)", kat: "Koku Verici", risk: "yuksek", organlar: ["Akciğer", "Hormonal Sistem"], etki: "Etiketteki tek kelime 3000+ kimyasal saklayabilir. Astım, alerji.", kaynak: "EWG Not So Sexy Report 2010 · IFRA Standards", alternatif: "Esansiyel yağ damlatılmış doğal temizleyiciler" },
 "FOSFAT DETERJAN": { ad: "Fosfat", kat: "Çamaşır Deterjanı", risk: "orta", organlar: ["Çevre"], etki: "Su kaynaklarında ötrofikasyon. AB sınırladı.", kaynak: "EU Regulation 259/2012 · WHO Water Quality", alternatif: "Fosfatsız sertifikalı deterjanlar · Çamaşır cevizi · Sabun fındığı" },
 "OPTİK BEYAZLATICI": { ad: "Optik Beyazlatıcı (Stilben)", kat: "Çamaşır Deterjanı", risk: "yuksek", organlar: ["Cilt", "Çevre"], etki: "Kumaşta kalır, UV ışığı yansıtır. Alerji ve fotodermatit.", kaynak: "EWG Cleaners Database · ECHA Stilbene", alternatif: "Çamaşır sodası + güneşte kurutma" },
 "NPE": { ad: "Nonilfenol Etoksilat (NPE)", kat: "Yüzey Aktif Madde", risk: "kritik", organlar: ["Hormonal Sistem"], etki: "Östrojen taklitçisi. AB'de yasaklı. Çin tekstil üretiminde hâlâ kullanılıyor.", kaynak: "EU REACH Annex XVII · Greenpeace Detox 2011", alternatif: "AB üretimi sertifikalı deterjanlar" },
 "DEA TEA": { ad: "DEA / TEA (Etanolamin)", kat: "Köpürtücü", risk: "yuksek", organlar: ["Karaciğer", "Böbrek"], etki: "Nitrosaminlere dönüşebilir (kanserojen).", kaynak: "California Prop 65 · NTP 1999", alternatif: "Bitkisel sabun bazlı deterjanlar" },
 "DİKLORBENZEN": { ad: "Para-Diklorobenzen (Tuvalet Bloğu)", kat: "Koku Giderici", risk: "kritik", organlar: ["Karaciğer", "Böbrek", "Akciğer"], etki: "IARC Grup 2B muhtemel kanserojen.", kaynak: "IARC Vol 73 · ATSDR 2006", alternatif: "Karbonat + esansiyel yağ · Sirke + karbonat" },
};

/* ══════════════════════════════════════════════
 BEBEK ÜRÜNLERİ VERİTABANI
 ══════════════════════════════════════════════ */
const BEBEK_DB = {
 "BPA BİBERON": { ad: "BPA (Bisfenol A)", kat: "Plastik Biberon", risk: "kritik", organlar: ["Hormonal Sistem", "Beyin", "Üreme"], etki: "AB 2011'de bebek biberonlarında yasakladı. Östrojen taklitçisi.", kaynak: "EU Directive 2011/8/EU · FDA BPA Ban 2012", alternatif: "Cam biberon · Paslanmaz çelik · BPA-free polipropilen" },
 "BPS": { ad: "BPS (Bisfenol S)", kat: "BPA-Free Plastik", risk: "yuksek", organlar: ["Hormonal Sistem"], etki: "BPA alternatifi olarak kullanılır ama benzer hormon bozucu etki.", kaynak: "Rochester & Bolden EHP 2015", alternatif: "Cam veya paslanmaz çelik biberon" },
 "FTALAT OYUNCAK": { ad: "Ftalat (DEHP, DINP)", kat: "Yumuşak Plastik Oyuncak", risk: "kritik", organlar: ["Hormonal Sistem", "Üreme"], etki: "AB ve ABD oyuncaklarda yasakladı. Hormonal bozucu.", kaynak: "EU REACH Annex XVII · CPSIA 2008 (ABD)", alternatif: "Ahşap oyuncak · Doğal kauçuk · Pamuk peluş" },
 "KURŞUN BOYALI OYUNCAK": { ad: "Kurşun (Pb)", kat: "Boya/Metal Oyuncak", risk: "kritik", organlar: ["Beyin", "Sinir Sistemi", "Kan"], etki: "Bebeklerde kalıcı IQ ve davranış hasarı. Güvenli düzeyi yok.", kaynak: "WHO Lead Poisoning · CDC Childhood Lead", alternatif: "AB/CE sertifikalı · Doğal ahşap · Su bazlı boya" },
 "PARFÜMLÜ BEZ": { ad: "Bebek Bezi Parfümü", kat: "Tek Kullanımlık Bez", risk: "yuksek", organlar: ["Cilt", "Üreme"], etki: "Ftalat ve sentetik koku içerebilir. Bebek genital bölge teması.", kaynak: "ANSES France 2019 Diaper Study", alternatif: "Parfümsüz ve klorsuz bezler · Bambu/pamuk bezler" },
 "TBT": { ad: "Tributiltin (TBT)", kat: "PVC Oyuncak Stabilizatörü", risk: "kritik", organlar: ["Bağışıklık", "Hormonal Sistem"], etki: "PVC stabilizatörü. Hormonal ve bağışıklık bozucu.", kaynak: "EU REACH · WHO IPCS 1990", alternatif: "PVC-free oyuncaklar (doğal kauçuk, ahşap)" },
 "MİNERAL YAĞ BEBEK": { ad: "Mineral Yağ (Petrolatum)", kat: "Bebek Yağı/Kremi", risk: "orta", organlar: ["Cilt"], etki: "Petrol türevi. Saf olmayan formlarda PAH kalıntısı.", kaynak: "EWG Cosmetics · IARC Untreated Mineral Oil Group 1", alternatif: "Saf badem yağı · Hindistan cevizi yağı · Shea yağı" },
 "PARABEN BEBEK ŞAMPUAN": { ad: "Paraben (Bebek Ürünleri)", kat: "Bebek Şampuan/Krem", risk: "yuksek", organlar: ["Hormonal Sistem"], etki: "Östrojen taklitçisi. Bebek cildi daha geçirgen, risk yüksek.", kaynak: "Danimarka Sağlık 2011 (3 yaş altı yasağı önerisi)", alternatif: "Paraben-free etiketli bebek ürünleri" },
 "PALM YAĞI MAMA": { ad: "Palm Oleini (Bebek Maması)", kat: "Bebek Maması Yağı", risk: "orta", organlar: ["Sindirim", "Mineral Emilimi"], etki: "Bebeklerde kalsiyum emilimini azaltır, sert dışkı yapar.", kaynak: "Koo et al. Pediatrics 2003 · ESPGHAN", alternatif: "Palm yağsız bebek maması · Anne sütü (mümkünse)" },
 "GLİFOSAT MAMA": { ad: "Glifosat Kalıntısı", kat: "Tahıl Bazlı Mama", risk: "yuksek", organlar: ["Bağırsak Florası", "Karaciğer"], etki: "IARC Grup 2A muhtemel kanserojen. Yulaf ve buğday maması ile bebeklere geçer.", kaynak: "IARC Monograph Vol 112 · EWG 2018 Cereal Test", alternatif: "Organik sertifikalı bebek maması" },
};

/* ══════════════════════════════════════════════
 EVCİL HAYVAN VERİTABANI (mizaç/burç/makam YOK)
 ══════════════════════════════════════════════ */
const EVCIL_DB = {
 "BHA MAMA": { ad: "BHA (Bütil Hidroksianisol)", kat: "Mama Koruyucusu", risk: "yuksek", organlar: ["Karaciğer"], etki: "Kuru kedi/köpek mamalarında yaygın. Uzun süreli tüketimde karaciğer yükü.", kaynak: "NTP Report on Carcinogens · Pet Food Institute", alternatif: "Doğal koruyuculu mamalar (E vitamini/tokoferol)" },
 "BHT MAMA": { ad: "BHT (Bütil Hidroksitoluen)", kat: "Mama Koruyucusu", risk: "yuksek", organlar: ["Karaciğer", "Böbrek"], etki: "Kuru mama oksidasyon önleyici. Hayvan çalışmalarında karaciğer ve böbrek toksisitesi.", kaynak: "EFSA 2012 · IARC Vol 40", alternatif: "Rozmarin ekstresi ile korunmuş mamalar" },
 "ETOKSİQUİN": { ad: "Etoksiquin", kat: "Balık Unu Koruyucusu", risk: "kritik", organlar: ["Karaciğer", "Böbrek", "Kan"], etki: "AB 2017'de yem katkı maddesi olarak askıya aldı. İnsan tüketimi için yasaklı.", kaynak: "EU Reg 2017/962 · EFSA FEEDAP 2015", alternatif: "Etoksiquin-free etiketli mamalar" },
 "PROPİLEN GLİKOL KEDİ": { ad: "Propilen Glikol", kat: "Yarı Nemli Mama", risk: "yuksek", organlar: ["Kan (kedilerde)"], etki: "Kedilerde Heinz body anemisine yol açar. FDA kedi mamasında yasakladı.", kaynak: "FDA 21 CFR 589.1001", alternatif: "Propilen glikol içermeyen mamalar" },
 "MELAMİN": { ad: "Melamin Kontaminasyonu", kat: "Düşük Kaliteli Protein", risk: "kritik", organlar: ["Böbrek"], etki: "2007 ABD'de binlerce hayvan ölümüne sebep oldu. Sahte protein katkısı.", kaynak: "FDA 2007 Pet Food Recall · WHO Melamine 2008", alternatif: "Güvenilir markaların sertifikalı mamaları" },
 "AFLATOKSİN": { ad: "Aflatoksin (Küf Toksini)", kat: "Mısır Bazlı Mama", risk: "kritik", organlar: ["Karaciğer"], etki: "Mısır ve fıstık küfünden. IARC Grup 1 kanserojen. Köpek/kedi karaciğer yetmezliği.", kaynak: "IARC Vol 100F · FDA Pet Food Recall (Sunshine Mills 2020)", alternatif: "Aflatoksin testli mamalar · Tahılsız alternatifler" },
 "YAPAY RENK MAMA": { ad: "Yapay Renklendirici (E102, E110, E124)", kat: "Renkli Köpek Maması", risk: "yuksek", organlar: ["Bağırsak", "Bağışıklık"], etki: "Hayvana renk vermez — sahibe estetik. Hayvanda hiperaktivite ve alerji.", kaynak: "EFSA Reevaluation 2009 · McCann Lancet 2007", alternatif: "Doğal renkli (pancar, havuç bazlı) mamalar" },
 "FLEA COLLAR TCVP": { ad: "Tetrachlorvinphos (Pire Tasması)", kat: "Pire/Kene Tasması", risk: "kritik", organlar: ["Sinir Sistemi", "Cilt"], etki: "Organofosfat. NRDC çocuklarda nörogelişimsel risk belgeledi.", kaynak: "NRDC 2009 Pet Pesticide Report · EPA TCVP", alternatif: "Doğal sedir/limon yağı tasmalar · Veteriner reçeteli güvenli formüller" },
 "FİPRONİL": { ad: "Fipronil", kat: "Sırta Damla Pire İlacı", risk: "yuksek", organlar: ["Sinir Sistemi"], etki: "Tavşan, kuş ve kemirgenlerde toksik. Çocuk evlerinde dikkat.", kaynak: "EPA Fipronil RED · EU Commission 2017 (egg scandal)", alternatif: "Doğal pire önleyiciler · Veteriner kontrolünde alternatif" },
 "ÇİKOLATA": { ad: "Teobromin (Çikolata)", kat: "İnsan Yiyeceği", risk: "kritik", organlar: ["Kalp", "Sinir Sistemi"], etki: "Köpek ve kedi için ölümcül. 50g bitter çikolata orta boy köpek için tehlikeli.", kaynak: "ASPCA Animal Poison Control · MSD Vet Manual", alternatif: "Hayvan dostu ödüller (doğal et kurutmalar)" },
 "SOĞAN SARIMSAK": { ad: "Soğan/Sarımsak", kat: "İnsan Yiyeceği", risk: "kritik", organlar: ["Kan"], etki: "Kedi ve köpekte hemolitik anemi (alyuvar yıkımı).", kaynak: "ASPCA Toxic Plants/Foods · Cope J Vet Med 2005", alternatif: "Hayvana özel hazırlanmış maması" },
 "KSİLİTOL": { ad: "Ksilitol (Sakız Tatlandırıcısı)", kat: "İnsan Şekersiz Ürünleri", risk: "kritik", organlar: ["Pankreas", "Karaciğer"], etki: "Köpekte insülin şoku ve karaciğer yetmezliği. Çok küçük miktarda öldürücü.", kaynak: "ASPCA Xylitol Warning · FDA Pet Health 2016", alternatif: "Hayvan ödülü olarak sadece veteriner onaylı ürünler" },
};

/* ══════════════════════════════════════════════
 İLAÇ / VİTAMİN VERİTABANI
 ══════════════════════════════════════════════ */
const ILAC_DB = {
 "PARASETAMOL DOZ AŞIMI": { ad: "Parasetamol (Yüksek Doz)", kat: "Ağrı Kesici", risk: "kritik", organlar: ["Karaciğer"], etki: "Günlük 4g üzeri karaciğer yetmezliği. ABD'de akut karaciğer yetmezliğinin #1 sebebi.", kaynak: "FDA Acetaminophen Warning 2011 · NEJM 2005", alternatif: "Doktor kontrolünde kullanım · Doğal antienflamatuvar (zerdeçal, zencefil)" },
 "NSAID UZUN SÜRE": { ad: "NSAID (İbuprofen Uzun Süreli)", kat: "Ağrı Kesici", risk: "yuksek", organlar: ["Mide", "Böbrek", "Kalp"], etki: "3 günden uzun kullanımda mide kanaması, böbrek hasarı, kardiyovasküler risk.", kaynak: "FDA NSAID Warning 2015 · BMJ 2017", alternatif: "Doktor kontrolünde · Topikal alternatifler" },
 "PPI UZUN SÜRE": { ad: "Proton Pompası İnhibitörü (Uzun Vadeli)", kat: "Mide İlacı", risk: "yuksek", organlar: ["Kemik", "Böbrek", "B12 Emilimi"], etki: "1 yıl üzeri kullanımda osteoporoz, kronik böbrek hastalığı, B12 eksikliği.", kaynak: "JAMA Intern Med 2016 · FDA PPI Safety", alternatif: "Doktor takibi · Beslenme değişikliği · Zencefil, papatya" },
 "MEGADOZ A VİTAMİNİ": { ad: "A Vitamini (Megadoz)", kat: "Yağda Çözünür Vitamin", risk: "kritik", organlar: ["Karaciğer", "Kemik", "Fetüs"], etki: "10.000 IU üzeri günlük doz hamilelerde doğum kusuru, karaciğer toksisitesi.", kaynak: "IOM DRI 2001 · Teratology 1995 (Rothman)", alternatif: "Beta-karoten (havuç, ıspanak) · Önerilen doz 700-900 IU" },
 "MEGADOZ D VİTAMİNİ": { ad: "D Vitamini (Megadoz)", kat: "Yağda Çözünür Vitamin", risk: "yuksek", organlar: ["Böbrek", "Kalp", "Kan"], etki: "Günlük 10.000 IU üzeri uzun süre kullanım hiperkalsemi ve böbrek taşı.", kaynak: "Endocrine Society Guideline 2011 · NIH ODS", alternatif: "Kan testiyle doz ayarı (D-25 OH) · Güneş 15-20 dk" },
 "DEMİR AŞIRI": { ad: "Demir Takviyesi (Test Olmadan)", kat: "Mineral", risk: "yuksek", organlar: ["Karaciğer", "Kalp", "Pankreas"], etki: "Hemokromatoz olanlarda ölümcül. Çocuk zehirlenmesinde #1 sebep (ABD).", kaynak: "AAP Iron Poisoning · NIH ODS Iron", alternatif: "Ferritin testiyle ihtiyaç teyidi · Pekmez, kuru meyve, kırmızı et" },
 "EFEDRA": { ad: "Efedra (Ma Huang) Zayıflama", kat: "Bitkisel Zayıflama", risk: "kritik", organlar: ["Kalp", "Sinir Sistemi"], etki: "FDA 2004'te yasakladı. Kalp krizi, inme ve ölüm raporları.", kaynak: "FDA Final Rule 2004 · NEJM 2000 Haller", alternatif: "Doktor kontrolünde · Yeşil çay, beslenme + egzersiz" },
 "KAVA KAVA": { ad: "Kava Kava", kat: "Bitkisel Sakinleştirici", risk: "yuksek", organlar: ["Karaciğer"], etki: "Akut karaciğer yetmezliği vakaları. Almanya, İngiltere, Kanada sınırladı.", kaynak: "WHO Kava Report 2007 · BfArM Almanya 2002", alternatif: "Papatya · Melisa · Lavanta" },
 "ARALIA HİDRASTİS": { ad: "Hidrastis (Goldenseal) — Hamilelikte", kat: "Bitkisel Antibakteriyel", risk: "kritik", organlar: ["Fetüs", "Karaciğer"], etki: "Berberin alkaloidi yenidoğanda kernikterus riski.", kaynak: "AAP Committee on Drugs · NIH NCCIH Goldenseal", alternatif: "Hamilelikte doktor onayı olmadan bitkisel kullanma" },
 "ST JOHN WORT": { ad: "St. John's Wort (Sarı Kantaron)", kat: "Bitkisel Antidepresan", risk: "yuksek", organlar: ["İlaç Etkileşimi"], etki: "Doğum kontrol, kan sulandırıcı, antidepresan ve kalp ilaçlarının etkisini değiştirir.", kaynak: "NIH NCCIH · Mayo Clinic Drug Interactions", alternatif: "Doktor kontrolünde · Egzersiz, omega-3, beslenme" },
};

/* ══════════════════════════════════════════════
 KATEGORİLER (merkezi yapı)
 ══════════════════════════════════════════════ */
const KATEGORILER = {
 gida: { ad: "Gıda", db: GIDA_DB, mizacGoster: true, ipucu: "Ürünün 'İçindekiler' listesini yapıştır." },
 giyim: { ad: "Giyim", db: GIYIM_DB, mizacGoster: true, ipucu: "Ürünün kumaş/malzeme etiketini yapıştır." },
 ev: { ad: "Ev", db: EV_DB, mizacGoster: true, ipucu: "Halı, koltuk, mobilya, perde veya yatak etiketini yapıştır." },
 kozmetik: { ad: "Kozmetik", db: KOZMETIK_DB, mizacGoster: true, ipucu: "Krem, şampuan, sabun veya makyaj içerik listesini yapıştır." },
 temizlik: { ad: "Temizlik", db: TEMIZLIK_DB, mizacGoster: true, ipucu: "Deterjan, çamaşır suyu veya temizleyici içeriğini yapıştır." },
 bebek: { ad: "Bebek", db: BEBEK_DB, mizacGoster: true, ipucu: "Mama, bebek bezi veya oyuncak etiketini yapıştır." },
 evcil: { ad: "Evcil Hayvan", db: EVCIL_DB, mizacGoster: false, ipucu: "Mama, pire tasması veya evcil hayvan ürünü etiketini yapıştır." },
 ilac: { ad: "İlaç/Vitamin", db: ILAC_DB, mizacGoster: true, ipucu: "İlaç veya vitamin kutusu içeriğini yapıştır." },
};

function analiz(txt, db) {
 const b = txt.toUpperCase().replace(/[()[\]{}\-/\\]/g, " ");
 const bulgu = [], eklendi = new Set();
 for (const [k, v] of Object.entries(db)) {
 if (b.includes(k.toUpperCase()) && !eklendi.has(v.ad)) {
 bulgu.push({ kod: k, ...v }); eklendi.add(v.ad);
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
 { t: "6502 Sayılı Tüketici Kanunu", a: "Tüketici bilgilendirmesi yasal haktır (Madde 63). Bilinçli tüketim hakkı korunmaktadır." },
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
 baslik: "Uluslararası Bilim & Hukuk",
 ozet: "13 kurum · 900+ bilimsel kaynak",
 items: [
 { t: "IARC — WHO Kanser Ajansı", a: "Aspartam 2023 Grup 2B, Sodyum Nitrit Grup 2A, Benzen ve Formaldehit Grup 1 kanserojen.\n iarc.fr · Lyon, France" },
 { t: "EFSA — Avrupa Gıda Güvenliği", a: "E171 (titanyum dioksit) yasağı 2022. Tüm E kodları bağımsız değerlendirme.\n efsa.europa.eu · Parma" },
 { t: "WHO JECFA", a: "Gıda katkı maddelerinin ADI (kabul edilebilir günlük alım) değerlerini belirleyen BM komitesi.\n who.int/foodsafety" },
 { t: "FDA — ABD Gıda ve İlaç İdaresi", a: "Trans yağ 2018, Triclosan 2016 yasaklandı.\n fda.gov/food" },
 { t: "ECHA — Avrupa Kimyasallar Ajansı", a: "PFAS kısıtlama 2023, DMF yasağı, Nikel direktifi.\n echa.europa.eu" },
 { t: "Stockholm Sözleşmesi (BM)", a: "PFOS, HBCD, PFOA yasaklı. 184 ülke imzaladı. Türkiye 2010'da onayladı.\n chm.pops.int" },
 { t: "Türk Gıda Kodeksi", a: "T.C. Tarım ve Orman Bakanlığı · Gıda katkı maddeleri yönetmeliği.\n tarim.gov.tr" },
 { t: "Codex Alimentarius (FAO/WHO)", a: "Uluslararası gıda standartları.\n fao.org/codex" },
 { t: "McCann 2007 — Lancet", a: "Gıda renklendiricileri ve DEHB ilişkisi. AB'de zorunlu uyarı etiketine yol açtı.\n Lancet 370(9598):1560-1567" },
 { t: "Chassaing 2015 — Nature", a: "Polisorbat 80 ve CMC'nin bağırsak florasını yıktığını gösteren çalışma.\n Nature 519:92–96" },
 { t: "Mozaffarian 2009 — NEJM", a: "Trans yağ ve kalp hastalığı. ABD yasağına zemin hazırladı.\n New England Journal of Medicine 2009" },
 { t: "California Prop 65", a: "900+ madde kanserojen listesi. BHA, TBHQ, 4-MEI dahil.\n P65warnings.ca.gov" },
 { t: "Nobel Tıp 2017 — Sirkadiyen Ritim", a: "Eşref saatlerinin modern bilimsel dayanağı.\n Hall, Rosbash, Young · Karolinska Institutet" },
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
 <button key={k.k} onClick={() => setSecilen(k.k)} style={{ background: secilen === k.k ? k.renk + "22" : C.y, border: `2px solid ${secilen === k.k ? k.renk : C.s}`, borderRadius: 12, padding: "12px 8px", cursor: "pointer", textAlign: "left", fontFamily: "Georgia,serif" }}>
 <div style={{ color: secilen === k.k ? k.renk : C.metin, fontWeight: 700, fontSize: 13 }}>{k.baslik}</div>
 <div style={{ color: C.cok, fontSize: 10, marginTop: 2 }}>{k.aciklama}</div>
 </button>
 ))}
 </div>
 {secilen && (
 <>
 <textarea placeholder={`${KATEGORI.find(k => k.k === secilen)?.baslik} hakkında detay yaz...`} value={mesaj} onChange={e => setMesaj(e.target.value)} rows={3} style={{ width: "100%", background: C.y, border: `1px solid ${C.altin}50`, borderRadius: 10, padding: "10px 12px", color: C.metin, fontSize: 13, fontFamily: "Georgia,serif", resize: "none", marginBottom: 8, outline: "none" }} />
 <button onClick={gonder} disabled={!mesaj.trim()} style={{ width: "100%", background: `linear-gradient(135deg,${C.altin},${C.altinA})`, border: "none", borderRadius: 12, padding: "12px", color: "#1A1200", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "Georgia,serif", opacity: mesaj.trim() ? 1 : 0.4 }}>
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
function KameraOCR({ onMetin, onIptal }) {
 const [durum, setDurum] = useState("bekle"); // bekle | aktif | isleniyor | hata
 const [stream, setStream] = useState(null);
 const [ilerleme, setIlerleme] = useState(0);
 const videoRef = useRef(null);
 const canvasRef = useRef(null);

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
 video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } },
 audio: false
 }).then(s => {
 setStream(s);
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

 async function fotografCek() {
 if (!videoRef.current || !canvasRef.current) {
 alert("Kamera henüz hazır değil, biraz bekle.");
 return;
 }
 setDurum("isleniyor");
 setIlerleme(10);
 const v = videoRef.current, c = canvasRef.current;
 c.width = v.videoWidth; c.height = v.videoHeight;
 c.getContext("2d").drawImage(v, 0, 0);
 if (stream) stream.getTracks().forEach(t => t.stop());
 try {
 setIlerleme(30);
 const blob = await new Promise(res => c.toBlob(res, "image/jpeg", 0.85));
 const fd = new FormData();
 fd.append("file", blob, "etiket.jpg");
 fd.append("language", "tur");
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
 alert("Metin okunamadı: " + (e.message || "Bilinmeyen hata") + ". Manuel giriş yapabilirsin.");
 setDurum("bekle");
 }
 }

 if (durum === "hata") return (
 <div style={{ background: C.y, border: `1px solid #FF2D5540`, borderRadius: 16, padding: 20, textAlign: "center", marginBottom: 14 }}>
 <div style={{ fontSize: 36, marginBottom: 8 }}></div>
 <div style={{ color: "#FF2D55", fontWeight: 700, marginBottom: 6 }}>Kamera Erişimi Reddedildi</div>
 <div style={{ color: C.soluk, fontSize: 13, marginBottom: 14 }}>Tarayıcı ayarlarından kamera iznini ver.</div>
 <button onClick={() => setDurum("bekle")} style={{ background: C.altin, border: "none", borderRadius: 10, padding: "10px 20px", color: "#1A1200", fontWeight: 700, cursor: "pointer", fontFamily: "Georgia,serif", marginRight: 8 }}>Tekrar Dene</button>
 <button onClick={onIptal} style={{ background: "none", border: `1px solid ${C.s}`, borderRadius: 10, padding: "10px 20px", color: C.soluk, cursor: "pointer", fontFamily: "Georgia,serif" }}>İptal</button>
 </div>
 );

 if (durum === "bekle") return (
 <div style={{ background: C.y, border: `2px dashed ${C.s}`, borderRadius: 16, padding: 28, textAlign: "center", marginBottom: 14 }}>
 <div style={{ fontSize: 48, marginBottom: 12 }}></div>
 <div style={{ color: C.metin, fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Etiket Fotoğrafı Çek</div>
 <div style={{ color: C.soluk, fontSize: 13, lineHeight: 1.6, marginBottom: 18 }}>Ürünün "İçindekiler" bölümüne kamerayı tut.<br />Metin otomatik okunur ve analiz edilir.</div>
 <button onClick={kameraAc} style={{ width: "100%", background: `linear-gradient(135deg,${C.altin},${C.altinA})`, border: "none", borderRadius: 12, padding: "13px", color: "#1A1200", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "Georgia,serif", marginBottom: 8 }}> Kamerayı Aç</button>
 <button onClick={onIptal} style={{ width: "100%", background: "none", border: `1px solid ${C.s}`, borderRadius: 12, padding: "11px", color: C.soluk, cursor: "pointer", fontFamily: "Georgia,serif", fontSize: 13 }}>← Metin Girişe Dön</button>
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
 <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", background: "#000", marginBottom: 10 }}>
 <video ref={videoRef} autoPlay playsInline muted style={{ width: "100%", display: "block", maxHeight: 480, objectFit: "cover" }} />
 <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", background: C.altin, borderRadius: 6, padding: "4px 12px", pointerEvents: "none" }}>
 <span style={{ color: "#1A1200", fontSize: 11, fontWeight: 700 }}>Etiketi netleştir, fotoğraf çek</span>
 </div>
 </div>
 <canvas ref={canvasRef} style={{ display: "none" }} />
 <div style={{ display: "flex", gap: 8 }}>
 <button onClick={kameraKapat} style={{ flex: 1, background: C.y, border: `1px solid ${C.s}`, borderRadius: 12, padding: "12px", color: C.soluk, fontWeight: 600, cursor: "pointer", fontFamily: "Georgia,serif" }}>✕ Kapat</button>
 <button onClick={fotografCek} style={{ flex: 2, background: `linear-gradient(135deg,${C.altin},${C.altinA})`, border: "none", borderRadius: 12, padding: "12px", color: "#1A1200", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "Georgia,serif" }}> Fotoğraf Çek & Analiz Et</button>
 </div>
 </div>
 );
}

/* ══════════════════════════════════════════════
 STİLLER
 ══════════════════════════════════════════════ */
const css = `*{box-sizing:border-box;margin:0;padding:0;font-family:Georgia,serif!important} body{background:#07070F} input,textarea,button,select{font-family:Georgia,serif!important} textarea:focus,input:focus{outline:2px solid #C9A84C50} ::-webkit-scrollbar{width:3px} ::-webkit-scrollbar-thumb{background:#22223A;border-radius:2px}`;

const S = {
 anaBtn: { width: "100%", background: "linear-gradient(135deg,#C9A84C,#E8C97A)", border: "none", borderRadius: 14, padding: "14px", color: "#1A1200", fontWeight: 700, fontSize: 16, cursor: "pointer", marginBottom: 10, fontFamily: "Georgia,serif" },
 hayaletBtn: { width: "100%", background: "none", border: "1px solid #22223A", borderRadius: 14, padding: "12px", color: "#8A8499", fontSize: 14, cursor: "pointer", fontFamily: "Georgia,serif", marginBottom: 10 },
 geriDaire: { width: 34, height: 34, borderRadius: "50%", background: "#161623", border: "1px solid #22223A", color: "#F0EDE8", cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" },
 geriYazi: { color: "#8A8499", cursor: "pointer", marginBottom: 20, fontSize: 14, background: "none", border: "none", fontFamily: "Georgia,serif" },
 kB: { color: "#C9A84C", fontSize: 10, letterSpacing: 0, fontWeight: 700, marginBottom: 8, marginTop: 6, display: "block" },
 mT: { color: "#8A8499", fontSize: 13, lineHeight: 1.6 },
 ipucu: { color: "#45435A", fontSize: 13, lineHeight: 1.6, background: "#0F0F1A", border: "1px solid #22223A", borderRadius: 10, padding: "10px 14px", marginBottom: 14 },
 textarea: { width: "100%", background: "#161623", border: "1px solid #22223A", borderRadius: 12, padding: 14, color: "#F0EDE8", fontSize: 13, lineHeight: 1.6, resize: "vertical", marginBottom: 10, fontFamily: "Georgia,serif" },
 ornekBtn: { width: "100%", background: "#0F0F1A", border: "1px solid #22223A", borderRadius: 10, padding: "11px 14px", cursor: "pointer", display: "flex", justifyContent: "space-between", marginBottom: 6, fontFamily: "Georgia,serif" },
 dateInput: { width: "100%", background: "#161623", border: "1px solid #22223A", borderRadius: 12, padding: "12px 16px", color: "#F0EDE8", fontSize: 15, marginBottom: 14, colorScheme: "dark", fontFamily: "Georgia,serif" },
 orgTag: { background: "#161623", color: "#8A8499", border: "1px solid #22223A", borderRadius: 6, padding: "3px 8px", fontSize: 11 },
 notUyari: { color: "#45435A", fontSize: 10, fontStyle: "normal", marginBottom: 12, lineHeight: 1.5 },
};

/* ══════════════════════════════════════════════
 ANA UYGULAMA
 ══════════════════════════════════════════════ */
export default function App() {
 const [ekran, setEkran] = useState("yasal");
 const [sekme, setSekme] = useState("tarama");
 const [txt, setTxt] = useState("");
 const [sonuclar, setSonuclar] = useState([]);
 const [profil, setProfil] = useState(null);
 const [dogum, setDogum] = useState("");
 const [modal, setModal] = useState(null);
 const [acik, setAcik] = useState(null);
 const [kategori, setKategori] = useState("gida");
 const [mod, setMod] = useState("metin");
 const [taramaSayisi, setTaramaSayisi] = useState(0);
 const es = esrefAktif();

 function yapAnaliz(metinOverride) {
 const metin = (typeof metinOverride === "string" ? metinOverride : txt).trim();
 if (!metin) return;
 setSonuclar(analiz(metin, KATEGORILER[kategori].db));
 setAcik(null);
 setTaramaSayisi(taramaSayisi + 1);
 setEkran("sonuc");
 }

 function kaydEt() {
 if (!dogum) return;
 const b = burcHesapla(dogum);
 setProfil({ burc: b, dogum, ...BURCLAR[b] });
 setEkran("ana");
 }

 const genelRisk = sonuclar.length === 0 ? null : sonuclar[0]?.risk;
 const tumOrganlar = [...new Set(sonuclar.flatMap(r => r.organlar || []))];

 /* ── YASAL ────────────────────────────────── */
 if (ekran === "yasal") return (
 <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, fontFamily: "Georgia,serif" }}>
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

 /* ── PROFİL KURULUM ───────────────────────── */
 if (ekran === "profil_kur") return (
 <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, fontFamily: "Georgia,serif" }}>
 <div style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 24, padding: 28, maxWidth: 460, width: "100%" }}>
 <button style={S.geriYazi} onClick={() => setEkran("ana")}>← Geri</button>
 <div style={{ fontSize: 36, color: C.altin, marginBottom: 12 }}></div>
 <h2 style={{ color: C.altin, fontSize: 22, marginBottom: 20 }}>Mizaç Profilin</h2>
 <label style={{ display: "block", color: C.metin, marginBottom: 8, fontSize: 13 }}>Doğum Tarihin</label>
 {(() => {
 const AYLAR_TR = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
 const parts = dogum ? dogum.split("-") : ["", "", ""];
 const yy = parts[0] || "", mm = parts[1] || "", dd = parts[2] || "";
 const setPart = (yeniG, yeniA, yeniY) => {
 const g = yeniG !== undefined ? yeniG : dd;
 const a = yeniA !== undefined ? yeniA : mm;
 const y = yeniY !== undefined ? yeniY : yy;
 if (g && a && y) {
 setDogum(`${y}-${String(a).padStart(2,"0")}-${String(g).padStart(2,"0")}`);
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
 <button style={{ ...S.anaBtn, opacity: (dogum && /^\d{4}-\d{2}-\d{2}$/.test(dogum)) ? 1 : 0.4 }} onClick={kaydEt} disabled={!dogum || !/^\d{4}-\d{2}-\d{2}$/.test(dogum)}>Profili Kaydet →</button>
 </div>
 <style>{css}</style>
 </div>
 );

 /* ── SONUÇ EKRANI ─────────────────────────── */
 if (ekran === "sonuc") return (
 <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "Georgia,serif", paddingBottom: 30 }}>
 <div style={{ display: "flex", alignItems: "center", padding: "12px 16px", background: C.y, borderBottom: `1px solid ${C.s}`, position: "sticky", top: 0, zIndex: 20, gap: 10 }}>
 <button style={S.geriDaire} onClick={() => setEkran("ana")}>←</button>
 <span style={{ color: C.metin, fontWeight: 600, flex: 1 }}>{KATEGORILER[kategori].ad} Analiz Sonucu</span>
 {profil && <div style={{ border: `1px solid ${profil.renk}`, borderRadius: 20, padding: "4px 10px", fontSize: 11, color: profil.renk }}>{profil.burc}</div>}
 </div>
 <div style={{ background: `${C.altin}10`, borderBottom: `1px solid ${C.altin}20`, padding: "7px 16px", fontSize: 11, color: C.cok }}> EFSA · WHO · IARC arşivi. Tıbbi tavsiye değildir.</div>

 <div style={{ padding: 16 }}>
 {sonuclar.length === 0 ? (
 <>
 <div style={{ background: C.y, border: `1px solid ${C.turuncu}40`, borderRadius: 18, padding: 28, textAlign: "center", margin: "20px 0" }}>
 <div style={{ width: 60, height: 60, borderRadius: "50%", background: C.turuncu + "20", border: `2px solid ${C.turuncu}`, color: C.turuncu, fontSize: 32, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontWeight: 700 }}>?</div>
 <div style={{ color: C.turuncu, fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Arşiv Kaydı Bulunamadı</div>
 <p style={{ color: C.metin, fontSize: 14, lineHeight: 1.7, marginBottom: 14 }}>Bu madde için henüz bilimsel arşiv kaydımız yok — topluluk katkısıyla ekleniyor.</p>
 <div style={{ background: C.bg, border: `1px solid ${C.s}`, borderRadius: 12, padding: 14, marginBottom: 16, textAlign: "left" }}>
 <div style={{ color: C.altin, fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Genel Uyarı</div>
 <p style={{ color: C.soluk, fontSize: 13, lineHeight: 1.6, margin: 0 }}>Etikette <strong style={{ color: C.metin }}>E</strong> ile başlayan kod veya tanımadığın <strong style={{ color: C.metin }}>kimyasal isim</strong> varsa dikkatli ol. Mümkünse <strong style={{ color: C.metin }}>doğal alternatif</strong> tercih et.</p>
 </div>
 <a href={`mailto:besindedektifii@gmail.com?subject=${encodeURIComponent("Yeni Madde Bildirimi - " + KATEGORILER[kategori].ad)}&body=${encodeURIComponent("Ürün adı: \nMadde: \nKategori: " + KATEGORILER[kategori].ad)}`} style={{ display: "block", width: "100%", background: C.altin, color: C.bg, padding: "14px 18px", borderRadius: 12, border: "none", fontWeight: 700, fontSize: 14, marginBottom: 10, fontFamily: "inherit", cursor: "pointer", textDecoration: "none", textAlign: "center", boxSizing: "border-box" }}>Maddeyi Bildir</a>
 <div style={{ color: C.cok, fontSize: 11, marginBottom: 14, lineHeight: 1.5 }}>besindedektifii@gmail.com</div>
 <button style={{ ...S.anaBtn, background: "transparent", border: `1px solid ${C.altin}`, color: C.altin }} onClick={() => setEkran("ana")}>Yeni Tarama</button>
 </div>
 <ToplulugaKatki taramaSayisi={taramaSayisi} />
 </>
 ) : (
 <>
 {/* RİSK ÖZET KUTUSU + ORGANLAR BİR ARADA */}
 <div style={{ background: C.y, border: `2px solid ${rR(genelRisk)}`, borderRadius: 18, padding: 18, marginBottom: 12 }}>
 <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
 <div style={{ background: rR(genelRisk), borderRadius: 10, padding: "8px 16px", color: "#fff", fontWeight: 700, fontSize: 14 }}>{rE(genelRisk)}</div>
 <div style={{ color: C.metin, fontSize: 14, fontWeight: 600 }}>{sonuclar.length} zararlı madde tespit edildi</div>
 </div>
 <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
 {tumOrganlar.map(o => <span key={o} style={{ background: rR(genelRisk) + "22", color: rR(genelRisk), border: `1px solid ${rR(genelRisk)}66`, borderRadius: 20, padding: "5px 14px", fontSize: 13, fontWeight: 600 }}>{o}</span>)}
 </div>
 </div>

 {/* SAYAÇ KUTULARI */}
 {(() => {
 const sayim = { kritik: 0, yuksek: 0, orta: 0, dusuk: 0 };
 sonuclar.forEach(r => sayim[r.risk]++);
 const kutular = [
 { k: "kritik", l: "KRİTİK", c: C.kirmizi },
 { k: "yuksek", l: "YÜKSEK", c: C.turuncu },
 { k: "orta", l: "ORTA", c: C.sari },
 ].filter(x => sayim[x.k] > 0);
 return (
 <div style={{ display: "grid", gridTemplateColumns: `repeat(${kutular.length}, 1fr)`, gap: 8, marginBottom: 12 }}>
 {kutular.map(x => (
 <div key={x.k} style={{ background: x.c + "15", border: `1px solid ${x.c}44`, borderRadius: 14, padding: "14px 8px", textAlign: "center" }}>
 <div style={{ color: x.c, fontSize: 28, fontWeight: 700, lineHeight: 1 }}>{sayim[x.k]}</div>
 <div style={{ color: x.c, fontSize: 10, fontWeight: 700, letterSpacing: 0, marginTop: 4 }}>{x.l}</div>
 </div>
 ))}
 </div>
 );
 })()}

 {profil && sonuclar.some(r => r.burclar?.includes(profil.burc)) && (
 <div style={{ background: "#FF950018", border: "1px solid #FF950050", borderRadius: 14, padding: 14, marginBottom: 12 }}>
 <div style={{ color: C.turuncu, fontWeight: 700, marginBottom: 4 }}>{profil.burc} burcu — Kişisel risk tespit edildi</div>
 <div style={{ color: C.turuncu + "CC", fontSize: 13 }}>{profil.mizac} mizacı bu maddelerden bazılarına özellikle hassas. {profil.organ} bölgen etkilenebilir.</div>
 </div>
 )}

 {sonuclar.map((r, i) => {
 const ayet = ayetSec(r.organlar);
 const makamBilgi = MAKAMLAR[r.makam] || {};
 const kisisel = profil && r.burclar?.includes(profil.burc);
 const acikMi = acik === i;
 return (
 <div key={i} style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 14, marginBottom: 10, borderLeft: `4px solid ${rR(r.risk)}`, overflow: "hidden" }}>
 <div style={{ padding: "14px 16px", cursor: "pointer" }} onClick={() => setAcik(acikMi ? null : i)}>
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
 {kisisel && <div style={{ background: "#FF950018", borderRadius: 8, padding: "6px 10px", color: C.turuncu, fontSize: 12, marginTop: 8 }}> {profil.burc} burcu — yüksek risk!</div>}
 </div>

 {acikMi && (
 <div style={{ padding: "0 16px 16px" }}>
 <div style={{ height: 1, background: C.s, marginBottom: 14 }} />
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
 <div style={{ color: makamBilgi.renk || C.altin, fontSize: 11, fontWeight: 700, marginBottom: 4 }}> {r.makam} Makamı · {makamBilgi.frekans}</div>
 <div style={{ color: C.metin, fontSize: 13 }}>{makamBilgi.etki}</div>
 <div style={{ color: C.cok, fontSize: 11, marginTop: 4 }}> {makamBilgi.vakit} · {makamBilgi.aletler}</div>
 </div>
 )}
 {r.burclar && r.burclar.length > 0 && KATEGORILER[kategori].mizacGoster && (
 <>
 <div style={S.kB}> Özellikle Etkilenen Burçlar</div>
 <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
 {r.burclar.map(b => (
 <span key={b} style={{ background: (BURCLAR[b]?.renk || C.altin) + "33", color: BURCLAR[b]?.renk || C.altin, border: `1px solid ${BURCLAR[b]?.renk || C.altin}50`, borderRadius: 20, padding: "4px 10px", fontSize: 12 }}>
 {b}
 </span>
 ))}
 </div>
 </>
 )}
 <div style={{ background: "#2ecc7115", border: "1px solid #2ecc7130", borderRadius: 10, padding: 12, marginTop: 12 }}>
 <div style={{ color: C.yesil, fontSize: 12, fontWeight: 700, marginBottom: 4 }}> Doğal Alternatif</div>
 <div style={{ color: C.metin, fontSize: 13 }}>{r.alternatif}</div>
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

 <button style={S.anaBtn} onClick={() => setEkran("ana")}>← Yeni Tarama</button>

 <ToplulugaKatki taramaSayisi={taramaSayisi} />

 <div style={{ background: C.y2, border: `1px solid ${C.s}`, borderRadius: 12, padding: 14, marginTop: 8 }}>
 <div style={{ color: C.cok, fontSize: 11, lineHeight: 1.6, fontStyle: "normal" }}>
 ️ Bu uygulama bir tıbbi cihaz, teşhis aracı veya ilaç değildir. Verilen bilgiler kamuya açık bilimsel kaynakların (EFSA · WHO · IARC · FDA) arşividir ve tıbbi tavsiye yerine geçmez. Hiçbir firma, marka veya ürün suçlanmamaktadır; yalnızca madde bazlı arşiv bilgisi sunulmaktadır. Burç, makam ve eşref saati bilgileri geleneksel birikime dayanır; modern bilimsel kanıt sınırlıdır. Anayasa Madde 26-28 · AİHS Madde 10 · 6502 Sayılı Kanun Madde 63 kapsamında bilgi paylaşımı yasal güvence altındadır.
 </div>
 </div>
 </>
 )}
 </div>
 <style>{css}</style>
 </div>
 );

 /* ══════════════════════════════════════════════
 ANA EKRAN
 ══════════════════════════════════════════════ */
 return (
 <div style={{ minHeight: "100vh", background: C.bg, maxWidth: 520, margin: "0 auto", fontFamily: "Georgia,serif", paddingBottom: 80 }}>
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
 {profil ? profil.burc : "Profil"}
 </span>
 </div>
 </div>

 <div style={{ background: `linear-gradient(90deg,${C.altin}15,transparent)`, borderBottom: `1px solid ${C.altin}20`, padding: "6px 16px", color: C.altin, fontSize: 11 }}>
 {es.ikon} {es.saat} · <b>{es.organ}</b> vakti · {es.eylem}
 </div>

 <div style={{ padding: 16 }}>
 {/* TARAMA */}
 {sekme === "tarama" && (
 <div>
 {/* KATEGORİ SEÇİMİ — 8 kategori grid */}
 <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginBottom: 16 }}>
 {Object.entries(KATEGORILER).map(([k, v]) => (
 <button key={k} onClick={() => setKategori(k)} style={{ padding: "10px 4px", borderRadius: 10, border: `2px solid ${kategori === k ? C.altin : C.s}`, background: kategori === k ? C.altin + "18" : C.y, color: kategori === k ? C.altin : C.soluk, cursor: "pointer", fontFamily: "Georgia,serif", fontSize: 11, fontWeight: kategori === k ? 700 : 500, lineHeight: 1.2 }}>{v.ad}</button>
 ))}
 </div>
 <div style={S.kB}>{KATEGORILER[kategori].ad.toUpperCase()} ETİKETİ ANALİZİ</div>

 {/* MOD SEÇİMİ: METİN / KAMERA */}
 <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
 {[["metin", "Metin Gir"], ["kamera", "Kamera ile Tara"]].map(([k, l]) => (
 <button key={k} onClick={() => setMod(k)} style={{ flex: 1, padding: "11px 6px", borderRadius: 12, border: `2px solid ${mod === k ? C.altin : C.s}`, background: mod === k ? C.altin + "18" : C.y, color: mod === k ? C.altin : C.soluk, cursor: "pointer", fontFamily: "Georgia,serif", fontSize: 13, fontWeight: mod === k ? 700 : 400 }}>{l}</button>
 ))}
 </div>

 {mod === "kamera" ? (
 <KameraOCR onMetin={m => { setTxt(m); setMod("metin"); yapAnaliz(m); }} onIptal={() => setMod("metin")} />
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
 <div style={{ textAlign: "center", marginBottom: 20 }}>
 <div style={{ width: 90, height: 90, borderRadius: "50%", border: `3px solid ${C.altin}`, background: C.altin + "18", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
 <svg width="50" height="50" viewBox="0 0 24 24" fill={C.altin} xmlns="http://www.w3.org/2000/svg">
 <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.4c-3.3 0-9.8 1.6-9.8 4.9v2.4h19.6v-2.4c0-3.3-6.5-4.9-9.8-4.9z"/>
 </svg>
 </div>
 <div style={{ color: C.metin, fontSize: 22, fontWeight: 700 }}>{profil.burc}</div>
 <div style={{ color: profil.renk, fontSize: 13 }}>{profil.element} · {profil.mizac} Mizacı</div>
 </div>
 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
 {[["ELEMENT", profil.element], ["MIZAÇ", profil.mizac], ["HASSAS ORGAN", profil.organ], ["ŞİFA MAKAMI", profil.makam]].map(([k, v]) => (
 <div key={k} style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 12, padding: 12, textAlign: "center" }}>
 <div style={{ color: C.cok, fontSize: 10, letterSpacing: 0, marginBottom: 4 }}>{k}</div>
 <div style={{ color: C.metin, fontWeight: 600, fontSize: 13 }}>{v}</div>
 </div>
 ))}
 </div>
 <div style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 14, padding: 16, marginBottom: 10 }}>
 <div style={{ color: C.turuncu, fontSize: 12, fontWeight: 700, marginBottom: 8 }}>️ Kaçınman Gereken Maddeler</div>
 <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
 {profil.kacinmasi.map(k => <span key={k} style={{ background: "#ff2d5520", color: C.kirmizi, border: "1px solid #ff2d5540", borderRadius: 20, padding: "3px 10px", fontSize: 11 }}>{k}</span>)}
 </div>
 </div>
 <div style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 14, padding: 16, marginBottom: 10 }}>
 <div style={{ color: C.yesil, fontSize: 12, fontWeight: 700, marginBottom: 6 }}> Şifa Bitkiler</div>
 <div style={{ color: C.soluk, fontSize: 13 }}>{profil.bitki}</div>
 </div>
 <div style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 14, padding: 16, marginBottom: 10 }}>
 <div style={{ color: C.yesil, fontSize: 12, fontWeight: 700, marginBottom: 6 }}>️ Beslenme Tavsiyesi</div>
 <div style={{ color: C.soluk, fontSize: 13 }}>{profil.tavsiye}</div>
 </div>
 <div style={{ background: `linear-gradient(135deg,${C.altin}18,${C.y2})`, border: `1px solid ${C.altin}40`, borderRadius: 14, padding: 18, textAlign: "center", marginBottom: 10 }}>
 <div style={S.kB}> GÜNLÜK ZİKRİN</div>
 <div style={{ color: C.metin, fontSize: 20, fontWeight: 700 }}>{profil.zikir}</div>
 </div>
 {MAKAMLAR[profil.makam] && (
 <div style={{ background: C.y, border: `1px solid ${MAKAMLAR[profil.makam].renk}40`, borderRadius: 14, padding: 16, marginBottom: 10 }}>
 <div style={{ color: MAKAMLAR[profil.makam].renk, fontSize: 12, fontWeight: 700, marginBottom: 6 }}> Şifa Makamın: {profil.makam}</div>
 <div style={{ color: C.soluk, fontSize: 13 }}>{MAKAMLAR[profil.makam].etki}</div>
 <div style={{ color: C.cok, fontSize: 11, marginTop: 6 }}>{MAKAMLAR[profil.makam].vakit} · {MAKAMLAR[profil.makam].frekans} · {MAKAMLAR[profil.makam].aletler}</div>
 </div>
 )}
 <button style={S.hayaletBtn} onClick={() => setEkran("profil_kur")}> Profili Değiştir</button>
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
 {sekme === "makam" && (
 <div>
 <div style={S.kB}>OSMANLI TIBBI: MAKAM ARŞİVİ</div>
 <div style={S.ipucu}>Osmanlı darüşşifalarında kullanılan ses terapisi arşivi. Tıbbi tedavi değildir.</div>
 <div style={S.notUyari}>* Bu bölüm; Osmanlı darüşşifa geleneği ve geleneksel müzik terapisi birikimine dayanır. Modern bilimsel kanıt sınırlıdır.</div>
 {Object.entries(MAKAMLAR).map(([isim, m]) => (
 <div key={isim} style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 13, padding: 16, marginBottom: 10, borderLeft: `4px solid ${m.renk}` }}>
 <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
 <div style={{ width: 38, height: 38, borderRadius: "50%", background: m.renk + "33", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}></div>
 <div>
 <div style={{ color: C.metin, fontWeight: 700 }}>{isim} Makamı</div>
 <div style={{ color: m.renk, fontSize: 12 }}>{m.organ}</div>
 </div>
 <div style={{ marginLeft: "auto", color: m.renk, fontSize: 12, fontWeight: 700 }}>{m.frekans}</div>
 </div>
 <div style={{ color: C.soluk, fontSize: 13, marginBottom: 6 }}>{m.etki}</div>
 <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
 <span style={{ color: C.cok, fontSize: 11 }}> {m.vakit}</span>
 <span style={{ color: C.cok, fontSize: 11 }}> {m.aletler}</span>
 </div>
 </div>
 ))}
 {profil && MAKAMLAR[profil.makam] && (
 <div style={{ background: `linear-gradient(135deg,${MAKAMLAR[profil.makam].renk}20,${C.y2})`, border: `1px solid ${MAKAMLAR[profil.makam].renk}40`, borderRadius: 14, padding: 20, textAlign: "center", marginTop: 8 }}>
 <div style={S.kB}> SENİN ŞİFA MAKAMIN</div>
 <div style={{ color: MAKAMLAR[profil.makam].renk, fontSize: 22, fontWeight: 700 }}>{profil.makam}</div>
 <div style={{ color: C.soluk, fontSize: 13, marginTop: 4 }}>{MAKAMLAR[profil.makam].etki}</div>
 <div style={{ color: C.cok, fontSize: 12, marginTop: 4 }}>{MAKAMLAR[profil.makam].frekans} · {MAKAMLAR[profil.makam].vakit}</div>
 </div>
 )}
 </div>
 )}

 {/* EŞREF */}
 {sekme === "esref" && (
 <div>
 <div style={S.kB}>EŞREF SAATLERİ — ORGAN VAKTI</div>
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
 )}

 {/* HAKKINDA */}
 {sekme === "hakkinda" && (
 <div>
 <ToplulugaKatki taramaSayisi={taramaSayisi} />

 <div style={S.kB}>HAKKINDA & BİLİMSEL DAYANAK</div>
 <BolumKart ikon={HAKKINDA.hukuki.ikon} renk={HAKKINDA.hukuki.renk} baslik={HAKKINDA.hukuki.baslik} ozet={HAKKINDA.hukuki.ozet} items={HAKKINDA.hukuki.items} />
 <BolumKart ikon={HAKKINDA.islam.ikon} renk={HAKKINDA.islam.renk} baslik={HAKKINDA.islam.baslik} ozet={HAKKINDA.islam.ozet} items={HAKKINDA.islam.items} />
 <BolumKart ikon={HAKKINDA.bilim.ikon} renk={HAKKINDA.bilim.renk} baslik={HAKKINDA.bilim.baslik} ozet={HAKKINDA.bilim.ozet} items={HAKKINDA.bilim.items} />
 <BolumKart ikon={HAKKINDA.frekans.ikon} renk={HAKKINDA.frekans.renk} baslik={HAKKINDA.frekans.baslik} ozet={HAKKINDA.frekans.ozet} items={HAKKINDA.frekans.items} />

 <div style={{ height: 1, background: C.s, margin: "20px 0" }} />
 <div style={S.kB}>MADDE ARŞİVİ</div>
 <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginBottom: 12 }}>
 {Object.entries(KATEGORILER).map(([k, v]) => (
 <button key={k} onClick={() => setKategori(k)} style={{ padding: "8px 4px", borderRadius: 10, border: `1px solid ${kategori === k ? C.altin : C.s}`, background: kategori === k ? C.altin + "18" : C.y, color: kategori === k ? C.altin : C.soluk, cursor: "pointer", fontFamily: "Georgia,serif", fontSize: 11, fontWeight: kategori === k ? 700 : 500 }}>{v.ad}</button>
 ))}
 </div>
 {Object.entries(KATEGORILER[kategori].db).map(([kod, v]) => (
 <div key={kod} style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 12, padding: 14, marginBottom: 8, borderLeft: `4px solid ${rR(v.risk)}`, cursor: "pointer" }} onClick={() => setModal({ kod, ...v })}>
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

 <div style={{ background: C.y, border: `1px solid ${C.s}`, borderRadius: 12, padding: 14, marginTop: 16 }}>
 <div style={{ color: C.altin, fontWeight: 700, marginBottom: 6 }}> İletişim</div>
 <div style={{ color: C.metin, fontSize: 13 }}>besindedektifii@gmail.com</div>
 <div style={{ color: C.cok, fontSize: 11, marginTop: 4 }}>48 saat içinde yanıtlanır.</div>
 </div>
 </div>
 )}
 </div>

 {/* ALT NAVİGASYON */}
 <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 520, background: C.y, borderTop: `1px solid ${C.s}`, display: "flex", zIndex: 30, paddingBottom: "env(safe-area-inset-bottom)" }}>
 {[["tarama", "", "Tara"], ["profil", "", "Profil"], ["makam", "", "Makam"], ["esref", "", "Eşref"], ["hakkinda", "", "Hakkında"]].map(([k, ikon, label]) => (
 <button key={k} onClick={() => setSekme(k)} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", padding: "10px 4px 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, fontFamily: "Georgia,serif" }}>
 <span style={{ fontSize: 18, filter: sekme === k ? `drop-shadow(0 0 6px ${C.altin})` : "none" }}>{ikon}</span>
 <span style={{ fontSize: 13, color: sekme === k ? C.altin : C.metin, fontWeight: sekme === k ? 700 : 500, letterSpacing: 0 }}>{label}</span>
 {sekme === k && <div style={{ width: 20, height: 2, background: C.altin, borderRadius: 2 }} />}
 </button>
 ))}
 </div>

 {/* MODAL */}
 {modal && (
 <div style={{ position: "fixed", inset: 0, background: "#000000A0", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(4px)" }} onClick={() => setModal(null)}>
 <div style={{ background: C.y, borderRadius: "20px 20px 0 0", padding: 24, width: "100%", maxWidth: 520, maxHeight: "80vh", overflowY: "auto", border: `1px solid ${C.s}`, position: "relative" }} onClick={e => e.stopPropagation()}>
 <button style={{ position: "absolute", top: 14, right: 14, background: C.y2, border: `1px solid ${C.s}`, borderRadius: "50%", width: 30, height: 30, color: C.soluk, cursor: "pointer", fontSize: 13 }} onClick={() => setModal(null)}>✕</button>
 <div style={{ background: rR(modal.risk), borderRadius: 8, padding: "6px 14px", color: "#fff", fontWeight: 700, fontSize: 13, display: "inline-block", marginBottom: 12 }}>{rE(modal.risk)}</div>
 <div style={{ color: C.altin, fontSize: 12, fontWeight: 700 }}>{modal.kod} · {modal.kat}</div>
 <div style={{ color: C.metin, fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{modal.ad}</div>
 <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>{(modal.organlar || []).map(o => <span key={o} style={S.orgTag}>{o}</span>)}</div>
 <div style={S.kB}>Etki</div><div style={S.mT}>{modal.etki}</div>
 <div style={S.kB}>Kaynak</div><div style={{ color: C.cok, fontSize: 12, fontStyle: "normal", marginBottom: 12 }}>{modal.kaynak}</div>
 <div style={{ background: "#2ecc7115", border: "1px solid #2ecc7130", borderRadius: 10, padding: 12 }}>
 <div style={{ color: C.yesil, fontSize: 12, fontWeight: 700, marginBottom: 4 }}> Doğal Alternatif</div>
 <div style={{ color: C.metin, fontSize: 13 }}>{modal.alternatif}</div>
 </div>
 </div>
 </div>
 )}

 <style>{css}</style>
 </div>
 );
}
