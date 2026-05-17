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
 "E951": { ad: "Aspartam", kat: "Tatlandırıcı", risk: "kritik", organlar: ["Karaciğer"], etki: "IARC 2023 (Vol 134) Grup 2B 'olası kanserojen' sınıflandırması. Gerekçe: karaciğer kanseri (hepatosellüler karsinom) ile sınırlı insan kanıtı. JECFA günlük kabul edilebilir alım: 40 mg/kg vücut ağırlığı (≈70 kg kişi için ~14 kutu diyet kola).", kaynak: "IARC Monograph Vol 134 (2023) · Riboli et al. Lancet Oncology 2023 · WHO/JECFA 96. toplantı", alternatif: "Ham bal · Stevia yaprağı · Hurma şurubu", makam: "Hüseyni", burclar: ["İkizler", "Terazi", "Kova"] , arar: ["Aspartam"] },
 "ASPARTAM": { ad: "Aspartam", kat: "Tatlandırıcı", risk: "kritik", organlar: ["Karaciğer"], etki: "E951 ile aynı. IARC 2023 Grup 2B. Karaciğer kanseri ile sınırlı kanıt.", kaynak: "IARC Vol 134 (2023)", alternatif: "Ham bal · Hurma · Stevia", makam: "Hüseyni", burclar: ["İkizler", "Kova"] , arar: ["Aspartam"] },
 "E950": { ad: "Asesülfam K", kat: "Tatlandırıcı", risk: "orta", organlar: ["Bağırsak Florası"], etki: "EFSA 2025 yeniden değerlendirmesinde güvenli ilan edildi. ADI 9 → 15 mg/kg vücut ağırlığı/gün yükseltildi. Kanser, böbrek, karaciğer veya insülin bozukluğu kanıtı bulunamadı. Bağırsak mikrobiyomu üzerine sınırlı/tartışmalı veri mevcut.", kaynak: "EFSA FAF Panel · EFSA Journal 2025;23(4):9317", alternatif: "Ham bal · Hurma şekeri · Stevia", makam: "Hicaz", burclar: ["Yengeç", "Akrep"] , arar: ["Asesülfam K"] },
 "E954": { ad: "Sakarin", kat: "Tatlandırıcı", risk: "dusuk", organlar: [], etki: "EFSA 2024 yeniden değerlendirmesinde güvenli ilan edildi. IARC Grup 3 (insanlar için kanserojen olarak sınıflandırılamaz). Eski rat mesane tümörü çalışmaları insana uymayan bir mekanizmaya dayandığı için geçersiz sayıldı. ADI 5 → 9 mg/kg/gün'e yükseltildi.", kaynak: "EFSA Journal 2024;22(11):e9044 · IARC Vol 73 (Grup 3)", alternatif: "Ham bal · Hurma · Stevia (tercih meselesi)", makam: "Acemaşiran", burclar: ["Boğa", "Oğlak"] , arar: ["Sakarin"] },
 "E955": { ad: "Sukraloz", kat: "Tatlandırıcı", risk: "orta", organlar: ["Bağırsak Florası"], etki: "WHO 2023 kılavuzu: kilo kontrolü için tatlandırıcı önerilmedi, uzun vadede potansiyel zararlar (Tip 2 diyabet, kardiyovasküler hastalık) ile ilişkilendirildi. Hayvan çalışmalarında bağırsak florası ve karaciğer enflamasyonu gösterildi. İnsan kanıtı sınırlı.", kaynak: "WHO Guideline on Non-Sugar Sweeteners 2023 · Bian PLOS ONE 2017 · Sucralose Review Pharmaceuticals 2024", alternatif: "Stevia yaprağı · Ham bal", makam: "Acemaşiran", burclar: ["Yengeç", "Balık"] , arar: ["Sukraloz"] },
 "E102": { ad: "Tartrazin (Sarı 5)", kat: "Renklendirici", risk: "yuksek", organlar: ["Bağırsak", "Bağışıklık", "Davranış (Çocuk)"], etki: "Southampton çalışması (2007) çocuklarda hiperaktivite artışı buldu. AB zorunlu uyarı etiketi: 'Çocukların aktivitesini ve dikkatini olumsuz etkileyebilir'. ADI: 7.5 mg/kg/gün. Hassas kişilerde ürtiker ve astım tetikleyici.", kaynak: "McCann et al. Lancet 2007;370(9598):1560-1567 · EFSA Journal 2009;7(11):1331 · AB Reg 1333/2008", alternatif: "Zerdeçal · Safran · Havuç suyu", makam: "Uşşak", burclar: ["Yengeç", "Balık"] , arar: ["Tartrazin", "Sarı 5"] },
 "E110": { ad: "Sunset Yellow FCF", kat: "Renklendirici", risk: "yuksek", organlar: ["Bağırsak", "Bağışıklık", "Davranış (Çocuk)"], etki: "Southampton çalışmasında hiperaktivite ile ilişkili. AB'de uyarı etiketi zorunlu. EFSA ADI'yi 2.5 → 4 mg/kg/gün'e yeniden değerlendirdi.", kaynak: "McCann Lancet 2007 · EFSA Journal 2009;7(11):1330 · AB Reg 1333/2008", alternatif: "Zerdeçal · Safran · Beta-karoten", makam: "Uşşak", burclar: ["Koç", "Aslan"] , arar: ["Sunset Yellow FCF"] },
 "E129": { ad: "Allura Red AC", kat: "Renklendirici", risk: "yuksek", organlar: ["Bağırsak", "Bağışıklık", "Beyin"], etki: "Hiperaktivite, kolitis tetikleyici.", kaynak: "McCann 2007 Lancet", alternatif: "Pancar suyu · Nar", makam: "Hüseyni", burclar: ["Yengeç", "Akrep"] , arar: ["Allura Red AC"] },
 "E150D": { ad: "Amonyak-Sülfit Karamel (Sınıf IV)", kat: "Renklendirici", risk: "yuksek", organlar: ["Akciğer", "Karaciğer"], etki: "Üretiminde 4-MEI (4-Metilimidazol) yan ürün olarak oluşur. IARC 2011'de 4-MEI'yi Grup 2B 'olası kanserojen' sınıflandırdı (NTP fare çalışmalarında akciğer tümörü). California Prop 65 listesinde, günlük 29 µg üzeri ürünler uyarı etiketi zorunlu. Tipik kola: 9-130 µg/12oz.", kaynak: "IARC Vol 101 (2013) · NTP Tech Report 535 (2007) · California OEHHA Prop 65 · Consumer Reports 2014", alternatif: "Doğal hurma karameli · Pekmez · Düşük işlenmiş E150a", makam: "Acemaşiran", burclar: ["Koç", "Aslan", "Yay"] , arar: ["Amonyak", "Sülfit Karamel", "Sınıf IV"] },
 "E171": { ad: "Titanyum Dioksit", kat: "Renklendirici", risk: "yuksek", organlar: ["Bağırsak", "DNA (olası)"], etki: "AB Komisyon Regülasyonu 2022/63 ile 7 Şubat 2022'den itibaren gıdalarda yasaklandı. EFSA 2021 görüşü: genotoksisite endişesi (DNA hasarı potansiyeli) dışlanamadığı için güvenli günlük alım belirlenemedi. ABD FDA hâlâ GRAS olarak kabul ediyor.", kaynak: "EFSA Journal 2021;19(5):6585 · AB Reg 2022/63 · FDA Color Additive Status", alternatif: "Pirinç unu · Kalsiyum karbonat · Doğal opaklaştırıcılar", makam: "Acemaşiran", burclar: ["Yengeç", "Balık"] , arar: ["Titanyum Dioksit"] },
 "TİTANYUM DİOKSİT": { ad: "Titanyum Dioksit", kat: "Renklendirici", risk: "yuksek", organlar: ["Bağırsak", "DNA (olası)"], etki: "AB'de gıdalarda 2022'den beri yasak (Reg 2022/63). EFSA: genotoksisite riski dışlanamıyor.", kaynak: "EFSA 2021 · AB Reg 2022/63", alternatif: "Pirinç unu · Doğal opaklaştırıcılar", makam: "Acemaşiran", burclar: ["Yengeç", "Balık"] , arar: ["Titanyum Dioksit"] },
 "E211": { ad: "Sodyum Benzoat", kat: "Koruyucu", risk: "yuksek", organlar: ["Bağırsak Florası", "Solunum (hassas kişiler)"], etki: "Tek başına EFSA/FDA tarafından güvenli kabul edilir. Ancak askorbik asit (C vitamini) + ısı/ışık ile temas ettiğinde Grup 1 kanserojen benzen oluşur. FDA 2005-2007 testlerinde bazı meyveli içeceklerde EPA içme suyu limiti olan 5 ppb'yi aşan benzen tespit edildi. Southampton çalışmasında hiperaktivite ile ilişkilendirildi.", kaynak: "FDA Voluntary Beverage Testing 2007 · McCann Lancet 2007 · EFSA Reg 1333/2008 · WHO benzen", alternatif: "Doğal sirke · Limon suyu · Tuz", makam: "Acemaşiran", burclar: ["Yengeç", "Akrep", "Balık"] , arar: ["Sodyum Benzoat"] },
 "SODYUM BENZOAT": { ad: "Sodyum Benzoat", kat: "Koruyucu", risk: "yuksek", organlar: ["Bağırsak Florası", "Solunum"], etki: "C vitaminiyle birlikte ısı/ışıkta benzen oluşturabilir (kanserojen).", kaynak: "FDA 2007 · WHO benzen değerlendirmesi", alternatif: "Limon suyu · Sirke", makam: "Acemaşiran", burclar: ["Yengeç", "Akrep"] , arar: ["Sodyum Benzoat"] },
 "E250": { ad: "Sodyum Nitrit", kat: "Koruyucu", risk: "kritik", organlar: ["Bağırsak", "Mide"], etki: "İşlenmiş et IARC Grup 1 kanserojen (2015, Vol 114) — kolorektal kanser kanıtı kesin. Nitritin kendisi endojen nitrozasyon koşullarında Grup 2A (IARC Vol 94). 50g/gün işlenmiş et tüketimi kolorektal kanser riskini %17-18 artırır. NHS sınırı 70g/gün. AB 2024'te nitrit kullanım limitlerini azalttı.", kaynak: "IARC Vol 114 (2018) · IARC Vol 94 (2010) · WHO 2015 · ANSES 2022", alternatif: "Taze et · Doğal tuzlama · Kekik-biberiye marinade", makam: "Hicaz", burclar: ["Boğa", "Başak", "Oğlak"] , arar: ["Sodyum Nitrit"] },
 "SODYUM NİTRİT": { ad: "Sodyum Nitrit", kat: "Koruyucu", risk: "kritik", organlar: ["Bağırsak", "Mide"], etki: "İşlenmiş et IARC Grup 1 kanserojen, nitrit Grup 2A. Kolorektal kanser ile pozitif ilişki.", kaynak: "IARC Vol 114 · WHO 2015", alternatif: "Taze et · Doğal tuzlama", makam: "Hicaz", burclar: ["Boğa", "Başak"] , arar: ["Sodyum Nitrit"] },
 "E220": { ad: "Kükürt Dioksit / Sülfit", kat: "Koruyucu", risk: "yuksek", organlar: ["Akciğer (astım)", "Bağışıklık"], etki: "EFSA 2022 yeniden değerlendirmesinde grup ADI 0.7 mg SO2/kg/gün olarak geçici tutuldu; yüksek tüketicilerde aşılma riski belirlendi. Astım hastalarında ciddi solunum krizi tetikleyebilir, anafilaktik şoka neden olabilir. AB'nin 14 yasal alerjeninden biri.", kaynak: "EFSA Journal 2022;20(11):7594 · AB Alerjen Listesi (Reg 1169/2011)", alternatif: "Doğal kurutma · Tuz · Sirke", makam: "Hicaz", burclar: ["İkizler", "Kova"] , arar: ["Kükürt Dioksit", "Sülfit"] },
 "E319": { ad: "TBHQ (Tersiyer Bütil Hidrokinon)", kat: "Antioksidan", risk: "yuksek", organlar: ["Karaciğer (yüksek doz)", "DNA (hayvan)"], etki: "Japonya'da gıda katkı maddesi olarak izinli değil. AB'de bazı uygulamalarda kısıtlı. FDA: maksimum 200 mg/kg yağ. JECFA ADI: 0.7 mg/kg/gün. Hayvan çalışmalarında DNA hasarı ve ön mide tümörü öncülleri rapor edildi (yüksek dozda). EFSA genotoksik değil olarak değerlendirdi.", kaynak: "JECFA 2004 · FDA 21 CFR 172.185 · Japan MHLW Positive List · PMC9764193 (review 2022)", alternatif: "E vitamini (tokoferol) · Biberiye ekstresi", makam: "Acemaşiran", burclar: ["Koç", "Aslan", "Yay"] , arar: ["TBHQ", "Tersiyer Bütil Hidrokinon"] },
 "TBHQ": { ad: "TBHQ", kat: "Antioksidan", risk: "yuksek", organlar: ["Karaciğer (yüksek doz)"], etki: "Japonya'da izinli değil. JECFA ADI 0.7 mg/kg/gün. Yüksek dozda DNA hasarı gösterildi.", kaynak: "JECFA · FDA 21 CFR 172.185", alternatif: "Biberiye · E vitamini", makam: "Acemaşiran", burclar: ["Koç", "Aslan"], arar: ["Tert Butil Hidrokinon"] },
 "E320": { ad: "BHA (Butil Hidroksianisol)", kat: "Antioksidan", risk: "yuksek", organlar: ["Mide ön kısmı (hayvan)", "Hormonal Sistem (potansiyel)"], etki: "IARC Grup 2B (olası insan kanserojeni, 1986/1987). Rat ön mide hiperplazisi gözlemi. EFSA 2011 ADI: 1.0 mg/kg/gün. California Prop 65 'insanlar için kanserojen olduğu makul ölçüde tahmin edilen' madde listesinde. AB'de izinli ama Japonya gibi bazı ülkelerde kısıtlı.", kaynak: "IARC Vol 40 (1986) · EFSA Journal 2011;9(10):2392 · California OEHHA Prop 65", alternatif: "E vitamini (tokoferol) · Biberiye ekstresi", makam: "Acemaşiran", burclar: ["Koç", "Aslan", "Yay"] , arar: ["BHA", "Butil Hidroksianisol"] },
 "BHA": { ad: "BHA", kat: "Antioksidan", risk: "yuksek", organlar: ["Mide", "Hormonal Sistem"], etki: "IARC Grup 2B olası kanserojen. California Prop 65 listesinde.", kaynak: "IARC Vol 40 · California Prop 65", alternatif: "E vitamini · Biberiye", makam: "Acemaşiran", burclar: ["Koç", "Aslan"], arar: ["Butillenmis Hidroksianizol"] },
 "E321": { ad: "BHT (Butil Hidroksitoluen)", kat: "Antioksidan", risk: "orta", organlar: ["Karaciğer", "Tiroid (yüksek doz)"], etki: "IARC Grup 3 (insanlar için kanserojen olarak sınıflandırılamaz). FDA GRAS statüsü mevcut. EFSA 2012 ADI: 0.25 mg/kg/gün. Yüksek dozda fare karaciğer tümörü gösterildi ama insan kanıtı yetersiz. BHA ile birlikte kullanıldığında riski tartışmalı.", kaynak: "IARC Vol 40 · EFSA Journal 2012;10(3):2588 · FDA GRAS", alternatif: "Rozmarin ekstresi · E vitamini", makam: "Rast", burclar: ["İkizler", "Terazi"] , arar: ["BHT", "Butil Hidroksitoluen"] },
 "BHT": { ad: "BHT", kat: "Antioksidan", risk: "orta", organlar: ["Karaciğer (yüksek doz)"], etki: "IARC Grup 3 — kanserojen olarak sınıflandırılamaz. EFSA ADI: 0.25 mg/kg/gün.", kaynak: "IARC Vol 40 · EFSA 2012", alternatif: "Rozmarin · E vitamini", makam: "Rast", burclar: ["İkizler"], arar: ["Butillenmis Hidroksitoluen"] },
 "E338": { ad: "Fosforik Asit", kat: "Asit Düzenleyici", risk: "orta", organlar: ["Kemikler", "Böbrekler", "Diş Minesi"], etki: "EFSA/FDA güvenli kabul eder (ADI 'belirtilmemiş', iyi imalat uygulaması). Ancak Tucker 2006 (Framingham Osteoporoz Çalışması, AJCN 84:936): kola tüketen kadınlarda kemik mineral yoğunluğunda azalma. Yüksek tüketimde diş minesi erozyonu ve böbrek taşı riski. Kolada pH ~2.5 — batarya asidine benzer aşındırıcılık.", kaynak: "Tucker KL et al. AJCN 2006;84:936-942 · EFSA ADI not specified · General Dentistry erosion study", alternatif: "Maden suyu · Limonata · Ayran · Kefir", makam: "Hicaz", burclar: ["Boğa", "Başak", "Oğlak"] , arar: ["Fosforik Asit"] },
 "E407": { ad: "Karragenan", kat: "Emülgatör/Kıvam", risk: "yuksek", organlar: ["Bağırsak", "Bağışıklık (potansiyel)"], etki: "EFSA 2018 yeniden değerlendirmesi: AB'de 12 haftalıktan küçük bebekler için süt formüllerinde YASAK. Yetişkinler için 'kabul edilebilir' fakat ileri araştırma önerildi. Hayvan çalışmalarında bozunmuş karragenan kolitis ve bağırsak iltihabı yaratır; gıda sınıfı için tartışma sürüyor. IBD ve IBS hastalarında semptomlarla ilişkilendirildi.", kaynak: "EFSA Journal 2018;16(4):5238 · Tobacman EHP 2001 · Bhattacharyya Nutrition 2017", alternatif: "Agar agar · Pektin · Keçiboynuzu sakızı · Guar gum", makam: "Acemaşiran", burclar: ["Yengeç", "Akrep", "Balık"] , arar: ["Karragenan"] },
 "E450": { ad: "Difosfat", kat: "Emülgatör/Asit Düzenleyici", risk: "yuksek", organlar: ["Böbrekler", "Damar (yüksek tüketim)"], etki: "EFSA 2019: fosforik asit ve fosfatlar (E338-341, E343, E450-452) için grup ADI 40 mg fosfor/kg/gün belirlendi; gıda kaynaklı alımın bazı popülasyonlarda aşıldığı belirtildi. Yüksek serum fosfat seviyeleri kardiyovasküler mortalite ve damar kireçlenmesi ile ilişkilendirildi. Kronik böbrek hastalarında özellikle önemli.", kaynak: "EFSA Journal 2019;17(6):5674 · Tonelli Circulation 2005 · Dhingra Arch Intern Med 2007", alternatif: "Doğal bikarbonat · Limon suyu · Maden suyu", makam: "Hicaz", burclar: ["Boğa", "Başak", "Oğlak"] , arar: ["Difosfat"] },
 "E452": { ad: "Polifosfat", kat: "Emülgatör", risk: "yuksek", organlar: ["Böbrekler", "Damar"], etki: "EFSA 2019 grup ADI 40 mg P/kg/gün. Aynı fosfat grubu — yüksek alım kardiyovasküler ve böbrek riski.", kaynak: "EFSA 2019;17(6):5674", alternatif: "Taze et · Limon suyu", makam: "Hicaz", burclar: ["Boğa", "Oğlak"] , arar: ["Polifosfat"] },
 "E471": { ad: "Mono ve Digliseritler", kat: "Emülgatör", risk: "yuksek", organlar: ["Kalp", "Damar (gizli trans yağ)", "Bağırsak Florası"], etki: "EFSA güvenli kabul eder. Ancak üretimde küçük miktarda trans yağ içerebilir; FDA trans yağ yasağı emülgatörleri kapsamaz. Sellem 2024 (NutriNet-Santé, Fransa): yüksek E471 tüketimi meme/prostat kanseri ile pozitif ilişki (gözlemsel).", kaynak: "EFSA 2017 · Mozaffarian NEJM 2006;354:1601 · Sellem PLOS Med 2024", alternatif: "Zeytinyağı · Tereyağı · Doğal lesitin", makam: "Hüseyni", burclar: ["Aslan", "Koç"] , arar: ["Mono ve Digliseritler"] },
 "E621": { ad: "Monosodyum Glutamat (MSG)", kat: "Lezzet Güçlendirici", risk: "orta", organlar: ["Hassas kişilerde baş ağrısı / tansiyon"], etki: "EFSA 2017 yeniden değerlendirmesinde grup ADI 30 mg/kg/gün belirlendi. EFSA bazı popülasyonların (özellikle çocuklar) bu ADI'yi aştığını, yüksek alımda baş ağrısı, kan basıncı artışı ve insülin yükselmesi ile ilişkili olabileceğini belirtti. FDA: GRAS. Hayvan çalışmalarında (Olney 1969) yenidoğan farelerde eksitotoksisite gösterildi; insan kanıtı tartışmalı. AB'de etikette 'monosodyum glutamat' veya 'E621' beyanı zorunlu.", kaynak: "EFSA Journal 2017;15(7):4910 · Olney Science 1969;164:719 · FDA GRAS", alternatif: "Zerdeçal · Kimyon · Kekik · Doğal et/sebze suyu · Mantar tozu (doğal umami)", makam: "Rast", burclar: ["Koç", "Aslan", "Yay"] , arar: ["Monosodyum Glutamat", "MSG"] },
 "MSG": { ad: "Monosodyum Glutamat", kat: "Lezzet Güçlendirici", risk: "orta", organlar: ["Hassas kişilerde baş ağrısı / tansiyon"], etki: "E621 ile aynı. EFSA 2017 ADI 30 mg/kg/gün. Yüksek alımda baş ağrısı, kan basıncı artışı.", kaynak: "EFSA 2017 · Olney 1969", alternatif: "Mantar tozu · Doğal baharat · Et suyu", makam: "Rast", burclar: ["Koç", "Aslan", "Yay"] , arar: ["Monosodyum Glutamat"] },
 "E635": { ad: "Disodyum Ribonükleotit", kat: "Lezzet Güçlendirici", risk: "orta", organlar: ["Eklemler/Ürik Asit (gut hastaları)"], etki: "JECFA ve EFSA güvenli kabul eder (ADI 'belirtilmemiş'). MSG ile sinerjik etki yapar (umami güçlendirici). Pürin metabolizması sonucu ürik aside dönüşür — gut, hiperürisemi ve ürik asit böbrek taşı olan kişilerde dikkat. AB'de bebek/küçük çocuk gıdalarında izinli değil.", kaynak: "JECFA 1974 · EFSA E626-635 yeniden değerlendirme süreci · AB Reg 1333/2008", alternatif: "Mantar tozu · Doğal et/sebze suyu · Kuru domates", makam: "Hicaz", burclar: ["Boğa", "Başak", "Oğlak"] , arar: ["Disodyum Ribonükleotit"] },
 "MISIR ŞURUBU": { ad: "Yüksek Fruktozlu Mısır Şurubu (HFCS)", kat: "Tatlandırıcı", risk: "yuksek", organlar: ["Karaciğer", "Pankreas", "Damar"], etki: "Yağlı karaciğer hastalığı (NAFLD/MASLD), insülin direnci, obezite ve metabolik sendrom ile güçlü ilişki. Glukozdan farklı olarak GLUT5 yoluyla doğrudan karaciğere giderek de novo lipogenezi tetikler. Yüksek tüketim hipertrigliseridemiye yol açar.", kaynak: "Yu et al. Front Nutr 2025 sistematik derleme · Bray AJCN 2004 · Softic 2024 Biomolecules · Sigala 2022 (insan RCT)", alternatif: "Ham bal · Pekmez · Hurma · Taze meyve", makam: "Uşşak", burclar: ["Boğa", "Başak", "Oğlak"] , arar: ["Yüksek Fruktozlu Mısır Şurubu", "HFCS"] },
 "GLİKOZ ŞURUBU": { ad: "Glikoz Şurubu", kat: "Tatlandırıcı", risk: "orta", organlar: ["Pankreas", "Karaciğer"], etki: "Yüksek glisemik indeks. Ani kan şekeri yükselişi, pankreas yorgunluğu. HFCS'ye göre daha az lipogenezik ama yüksek miktarda obezite ve Tip 2 diyabet riski.", kaynak: "ADA Diyabet Kılavuzu · Stanhope JCI 2009", alternatif: "Pekmez · Ham bal · Hurma", makam: "Uşşak", burclar: ["Boğa", "Yengeç"] , arar: ["Glikoz Şurubu"] },
 "PALMİYE YAĞI": { ad: "Palm Yağı (Rafine)", kat: "Yağ", risk: "orta", organlar: ["Kalp/Damar (yüksek tüketim)", "İşleme kontaminantları"], etki: "Rafineri sürecinde yüksek ısıda 3-MCPD ve glisidil esterler oluşur. EFSA 2018 bunları potansiyel kanserojen/genotoksik olarak değerlendirdi; AB sınır değerleri belirledi (Reg 2020/1322). Doymuş yağ oranı %50, WHO doymuş yağ alımının kalori %10'unu aşmaması önerisi.", kaynak: "EFSA Journal 2018;16(1):5083 · AB Reg 2020/1322 · WHO Saturated Fat Guideline 2018", alternatif: "Zeytinyağı · Hindistancevizi yağı · Tereyağı", makam: "Hüseyni", burclar: ["Aslan", "Koç"], arar: ["Palmiye Yagi", "Palm Yagi", "Palm Oil", "Hurma Yagi", "Palmolein"] },
 "TRANS YAĞ": { ad: "Trans Yağ (Endüstriyel)", kat: "Yağ", risk: "kritik", organlar: ["Kalp", "Damar", "Beyin"], etki: "FDA Haziran 2018'de kısmi hidrojenize yağları (PHO) yasakladı. WHO 2018'de küresel REPLACE programı başlattı. LDL kolesterolü yükseltir, HDL'yi düşürür, koroner kalp hastalığı ve ani kalp ölümü ile güçlü neden-sonuç ilişkisi. Tahmini olarak ABD'de 90.000 erken ölümü önler.", kaynak: "FDA Final PHO Determination 2015/2018 · Mozaffarian NEJM 2006;354:1601 · WHO REPLACE 2018", alternatif: "Zeytinyağı · Tereyağı · Avokado yağı", makam: "Hüseyni", burclar: ["Aslan", "Koç"] , arar: ["Trans Yağ", "Endüstriyel"] },
 "HİDROJENİZE YAĞ": { ad: "Hidrojenize Yağ (PHO)", kat: "Yağ", risk: "kritik", organlar: ["Kalp", "Damar"], etki: "Trans yağ kaynağı. FDA 2018'de yasakladı (GRAS değil).", kaynak: "FDA 2015 Final Determination", alternatif: "Zeytinyağı · Tereyağı", makam: "Hüseyni", burclar: ["Aslan"] , arar: ["Hidrojenize Yağ", "PHO"] },
 "MARGARİN": { ad: "Margarin (Endüstriyel)", kat: "Yağ", risk: "yuksek", organlar: ["Kalp", "Damar"], etki: "Modern margarinlerde trans yağ büyük ölçüde kaldırıldı (FDA 2018 yasağı sonrası). Ancak yüksek omega-6, palm yağı ve emülgatör içeriği nedeniyle dikkatli kullanım önerilir.", kaynak: "AHA 2020 · FDA PHO yasağı", alternatif: "Tereyağı · Zeytinyağı · Hindistancevizi yağı", makam: "Hüseyni", burclar: ["Aslan", "Koç"] , arar: ["Margarin", "Endüstriyel"] },
 "RAFINE ŞEKER": { ad: "Rafine Şeker (Sukroz)", kat: "Tatlandırıcı", risk: "orta", organlar: ["Pankreas", "Damar", "Diş Minesi"], etki: "WHO 2015 kılavuzu: serbest şeker günlük kalorinin %10'undan az, ideali %5 (≈25g). Yüksek tüketim Tip 2 diyabet, obezite, kalp hastalığı, diş çürüğü.", kaynak: "WHO Sugars Guideline 2015 · AHA 2009 Circulation 120:1011", alternatif: "Ham bal · Pekmez · Hurma", makam: "Uşşak", burclar: ["Boğa", "Başak"] , arar: ["Rafine Şeker", "Sukroz"] },
 "YAPAY AROMA": { ad: "Yapay Aroma", kat: "Aroma", risk: "orta", organlar: ["İçerik gizli — şeffaflık eksikliği"], etki: "AB ve FDA'da kayıtlı binlerce aroma bileşeni güvenli kabul edilir. Ancak 'aroma' beyanı altında çok sayıda kimyasal kullanılabilir — tüketici şeffaflığı sınırlı. EWG ve CSPI bu kategoriyi eleştirir.", kaynak: "AB Reg 1334/2008 · FEMA GRAS · EWG Food Scores", alternatif: "Doğal baharatlar · Vanilya çubuğu · Esans", makam: "Acemaşiran", burclar: ["Koç", "Aslan"] , arar: ["Yapay Aroma"] },
 "MAYA EKSTRESİ": { ad: "Maya Ekstresi (Otoliz)", kat: "Lezzet Bileşeni", risk: "orta", organlar: ["MSG'ye hassas kişilerde reaksiyon"], etki: "Doğal olarak serbest glutamat içerir (MSG benzeri etki). 'MSG yok' diyen ürünlerde umami sağlamak için kullanılır. MSG hassasiyeti olan kişilerde benzer semptomlar yaratabilir. FDA 'doğal aroma' kapsamında izinli.", kaynak: "FDA 21 CFR 101.22 · Mortensen EFSA 2017", alternatif: "Doğal baharat · Mantar tozu · Et/sebze suyu", makam: "Rast", burclar: ["Koç"] , arar: ["Maya Ekstresi", "Otoliz"] },
 "KAFEİN": { ad: "Kafein (İlave Edilmiş)", kat: "Uyarıcı", risk: "orta", organlar: ["Sinir Sistemi", "Kalp"], etki: "EFSA 2015 (EFSA J 13:4102): yetişkinlerde günlük 400 mg'a kadar güvenli, hamilelerde 200 mg sınırı. Çocuklarda 3 mg/kg sınırı. Enerji içeceklerinde yüksek dozda çarpıntı, kaygı, uyku bozukluğu, bağımlılık.", kaynak: "EFSA Journal 2015;13(5):4102", alternatif: "Yeşil çay · Ihlamur · Mate", makam: "Rast", burclar: ["Koç", "Aslan", "Yay"] , arar: ["Kafein", "İlave Edilmiş"] },
 "GLİFOSAT": { ad: "Glifosat (Roundup)", kat: "Pestisit Kalıntısı", risk: "yuksek", organlar: ["Lenf Sistemi (NHL)", "Bağırsak Florası"], etki: "IARC Mart 2015 (Vol 112): 'insanlar için muhtemel kanserojen' (Grup 2A) — gerekçe: Non-Hodgkin Lenfoma ile sınırlı insan kanıtı + hayvanlarda yeterli kanıt + güçlü genotoksisite. EFSA ve EPA güvenli olarak değerlendiriyor (görüş ayrılığı). Monsanto'ya karşı ABD'de milyarlarca dolarlık davalar açıldı.", kaynak: "IARC Monograph Vol 112 (2015) · Zhang Mutation Research 2019 (NHL meta-analiz %41 artış)", alternatif: "Organik sertifikalı (USDA/AB Bio) tahıllar ve sebzeler", makam: "Acemaşiran", burclar: ["Koç", "Aslan"] , arar: ["Glifosat", "Roundup"] },
 "BPA": { ad: "Bisfenol A (BPA)", kat: "Kirlilik (Ambalaj)", risk: "kritik", organlar: ["Hormonal Sistem", "Bağışıklık", "Üreme"], etki: "EFSA Nisan 2023 yeniden değerlendirmesi: Tolere edilebilir günlük alım 4 µg/kg'dan 0.2 ng/kg'a düşürüldü (20.000 kat azaltma). Tüm yaş gruplarının ortalama maruziyet bu sınırı aşıyor. Gerekçe: bağışıklık sistemi üzerine etki, östrojen taklit eden endokrin bozucu özellik. AB'de bebek biberonlarında 2011'den yasak. 2025'ten itibaren gıda ile temas eden malzemelerde geniş yasak.", kaynak: "EFSA Journal 2023;21(4):e6857 · ECHA endokrin bozucu listesi · AB Reg 2018/213", alternatif: "Cam ambalaj · Paslanmaz çelik · BPA-free sertifikalı", makam: "Hüseyni", burclar: ["Yengeç", "Akrep"] , arar: ["Bisfenol A", "BPA"] },
 "AKRİLAMİD": { ad: "Akrilamid", kat: "İşleme Kontaminantı", risk: "yuksek", organlar: ["Sinir Sistemi", "DNA (genotoksik)"], etki: "IARC Grup 2A (muhtemel insan kanserojeni). 120°C üzerinde nişastalı gıdalarda Maillard reaksiyonuyla oluşur (kızarmış patates, ekmek kabuğu, kahve, bisküvi). EFSA: maruziyet endişe seviyesinde. AB 2017 azaltma referans değerleri belirledi.", kaynak: "IARC Vol 60 · EFSA Journal 2015;13(6):4104 · AB Reg 2017/2158", alternatif: "Düşük ısı (haşlama/buharda pişirme) · Patatesi koyu kızartmama", makam: "Rast", burclar: ["Koç", "Aslan"] , arar: ["Akrilamid"] },
 "E466": { ad: "Karboksimetil Selüloz (CMC)", kat: "Emülgatör/Kıvam Verici", risk: "orta", organlar: ["Bağırsak Florası", "Bağırsak duvarı"], etki: "Chassaing 2015 (Nature 519:92): farelerde bağırsak florasını bozdu, düşük dereceli iltihap ve metabolik sendrom tetikledi. Chassaing 2022 (Gastroenterology, insan müdahale): bağırsak mikrobiyom kompozisyonunu değiştirdi.", kaynak: "Chassaing Nature 2015;519:92 · Chassaing Gastroenterology 2022", alternatif: "Agar agar · Pektin · Keçiboynuzu sakızı", makam: "Acemaşiran", burclar: ["Yengeç", "Balık"] , arar: ["Karboksimetil Selüloz", "CMC"] },
 "E433": { ad: "Polisorbat 80", kat: "Emülgatör", risk: "orta", organlar: ["Bağırsak Florası"], etki: "Chassaing 2015 (Nature): CMC ile beraber test edildi, bağırsak florası yıkımı ve sistemik iltihaplanma gösterdi.", kaynak: "Chassaing Nature 2015;519:92", alternatif: "Doğal lesitin (ayçiçeği/soya)", makam: "Acemaşiran", burclar: ["Yengeç", "Balık"] , arar: ["Polisorbat 80"] },
 "E330": { ad: "Sitrik Asit", kat: "Asit Düzenleyici", risk: "dusuk", organlar: ["Diş Minesi (yüksek tüketim)"], etki: "EFSA/FDA GRAS — günlük alım sınırı 'belirtilmemiş'. Genel olarak güvenli. Aşırı asit içecek tüketiminde diş erozyonuna katkı sağlayabilir. Sentetik üretiminde küflerden kaynaklı nadir alerji vakaları rapor edildi.", kaynak: "EFSA Re-evaluation 2014 · FDA GRAS 21 CFR 184.1033", alternatif: "Doğal limon suyu · Sirke", makam: "Segah", burclar: ["Koç", "Aslan"] , arar: ["Sitrik Asit"] },
 "FRUKTOZ": { ad: "İlave Fruktoz", kat: "Tatlandırıcı", risk: "yuksek", organlar: ["Karaciğer", "Pankreas"], etki: "Stanhope 2009 (JCI 119:1322): 10 hafta fruktoz tüketimi insülin direnci ve viseral yağlanma artırdı. Yağlı karaciğer hastalığı (NAFLD) ile bağlantılı. Doğal meyvedeki fruktoz lif ile dengelendiği için aynı etkiyi göstermez.", kaynak: "Stanhope JCI 2009;119:1322 · Lustig Nature 2012;482:27", alternatif: "Taze meyve (lifli)", makam: "Uşşak", burclar: ["Boğa", "Yengeç"] , arar: ["İlave Fruktoz"] },
 "NİTRİT": { ad: "Nitrit (Genel)", kat: "Koruyucu", risk: "yuksek", organlar: ["Bağırsak", "Mide"], etki: "Endojen nitrozasyon koşullarında IARC Grup 2A. İşlenmiş et bağlantısı Grup 1.", kaynak: "IARC Vol 94 · IARC Vol 114", alternatif: "Taze gıda · Doğal tuzlama", makam: "Hicaz", burclar: ["Boğa", "Başak"] , arar: ["Nitrit", "Genel"] },
 "E100": { ad: "E100 / Kurkumin (Zerdeçal Özü)", kat: "Doğal Renklendirici", risk: "dusuk", organlar: [], etki: "Zerdeçaldan elde edilir. Yüksek dozda mide bulantısı dışında güvenli.", kaynak: "EFSA 2010 ANS Panel · JECFA 2003", alternatif: "Taze zerdeçal kullan" , arar: ["E100", "Kurkumin", "Zerdeçal Özü"] },
 "E101": { ad: "E101 / Riboflavin (B2 Vitamini)", kat: "Doğal Renklendirici", risk: "dusuk", organlar: [], etki: "B2 vitamini olarak da kullanılır. Genelde güvenli kabul edilir.", kaynak: "EFSA 2008 · WHO Codex", alternatif: "Yumurta, süt, badem" , arar: ["E101", "Riboflavin", "B2 Vitamini"] },
 "E104": { ad: "E104 / Kinolin Sarısı", kat: "Sentetik Renklendirici", risk: "yuksek", organlar: ["Sinir Sistemi", "Bağışıklık"], etki: "Çocuklarda hiperaktivite ve dikkat eksikliği bağlantılı. ABD, Avustralya, Norveç yasakladı.", kaynak: "Southampton Çalışması 2007 · UK FSA · EFSA 2009", alternatif: "Doğal renklendirici (E100, E160a)" , arar: ["E104", "Kinolin Sarısı"] },
 "E120": { ad: "E120 / Karmin (Koşinil Böceği)", kat: "Doğal Renklendirici", risk: "orta", organlar: ["Bağışıklık"], etki: "Böcekten elde edilir (vegan/helal değil). Şiddetli alerjik reaksiyon ve anafilaksi raporları.", kaynak: "FDA 2009 Allergy Labeling · EFSA 2015", alternatif: "Pancar suyu (E162), nar suyu" , arar: ["E120", "Karmin", "Koşinil Böceği"] },
 "E122": { ad: "E122 / Azorubin (Karmoizin)", kat: "Sentetik Renklendirici", risk: "yuksek", organlar: ["Sinir Sistemi"], etki: "Azo boyası. Çocuklarda hiperaktivite. ABD, Japonya, Norveç, İsveç yasakladı.", kaynak: "Southampton Çalışması · EFSA 2009 · FSA UK Warning", alternatif: "Pancar suyu, çilek özü" , arar: ["E122", "Azorubin", "Karmoizin"] },
 "E123": { ad: "E123 / Amarant", kat: "Sentetik Renklendirici", risk: "kritik", organlar: ["Karaciğer", "Üreme"], etki: "ABD, Norveç, Rusya yasakladı. Hayvan çalışmalarında kanser ve doğum kusuru.", kaynak: "FDA 1976 yasak · IARC Vol 8 1975", alternatif: "E162 pancar, kuşburnu özü" , arar: ["E123", "Amarant"] },
 "E124": { ad: "E124 / Ponceau 4R", kat: "Sentetik Renklendirici", risk: "yuksek", organlar: ["Sinir Sistemi", "Karaciğer"], etki: "Azo boyası. ABD, Kanada, Norveç yasakladı. Çocuklarda hiperaktivite.", kaynak: "Southampton 2007 · FDA Banned List · EFSA 2009", alternatif: "Pancar, kırmızı meyve özleri" , arar: ["E124", "Ponceau 4R"] },
 "E127": { ad: "E127 / Eritrosin", kat: "Sentetik Renklendirici", risk: "yuksek", organlar: ["Tiroid"], etki: "İyot içerir, tiroid bezini etkiler. FDA 1990'da krem ve ruj için yasakladı.", kaynak: "FDA Color Additive Status · EFSA 2011", alternatif: "Doğal kırmızı (pancar, nar)" , arar: ["E127", "Eritrosin"] },
 "E128": { ad: "E128 / Kırmızı 2G", kat: "Sentetik Renklendirici", risk: "kritik", organlar: ["Karaciğer", "Kanser"], etki: "AB 2007'de yasakladı. Anilin metabolitleri kanserojen.", kaynak: "EFSA 2007 Kırmızı 2G Görüşü · AB Direktifi 884/2007", alternatif: "Doğal pancar suyu" , arar: ["E128", "Kırmızı 2G"] },
 "E129": { ad: "E129 / Allura Red (Kırmızı 40)", kat: "Sentetik Renklendirici", risk: "yuksek", organlar: ["Sinir Sistemi", "Bağırsak"], etki: "Çocuklarda hiperaktivite. Bağırsak iltihabıyla bağlantı. Danimarka, Belçika, Fransa, İsviçre kısıtladı.", kaynak: "Southampton 2007 · Nature Comm 2022 Bhattarai · EFSA 2009", alternatif: "E162 pancar suyu, antosiyaninler (E163)" , arar: ["E129", "Allura Red", "Kırmızı 40"] },
 "E131": { ad: "E131 / Patent Mavisi V", kat: "Sentetik Renklendirici", risk: "yuksek", organlar: ["Bağışıklık"], etki: "Anafilaktik şok raporları (özellikle cerrahide işaret amaçlı kullanımda). ABD, Avustralya yasakladı.", kaynak: "EFSA 2013 ANS Panel · NEJM 2007 anafilaksi raporu", alternatif: "Spirulina mavisi (doğal)" , arar: ["E131", "Patent Mavisi V"] },
 "E132": { ad: "E132 / İndigotin (İndigo Karmin)", kat: "Sentetik Renklendirici", risk: "orta", organlar: ["Tansiyon", "Bağışıklık"], etki: "Tansiyon düşmesi, bulantı, alerjik reaksiyon raporları.", kaynak: "EFSA 2014 · FDA Color Status", alternatif: "Spirulina, doğal mavi" , arar: ["E132", "İndigotin", "İndigo Karmin"] },
 "E133": { ad: "E133 / Parlak Mavi FCF", kat: "Sentetik Renklendirici", risk: "orta", organlar: ["Bağırsak"], etki: "Bağırsak emiliminde değişikliklere yol açabilir. Belçika, Fransa, İsviçre kısıtladı.", kaynak: "EFSA 2010 · CSPI raporu", alternatif: "Spirulina özü" , arar: ["E133", "Parlak Mavi FCF"] },
 "E142": { ad: "E142 / Yeşil S", kat: "Sentetik Renklendirici", risk: "orta", organlar: ["Sinir Sistemi"], etki: "Hiperaktivite bağlantısı. ABD, Kanada, Japonya, Norveç, İsveç yasakladı.", kaynak: "Southampton 2007 · FDA Banned · EFSA 2010", alternatif: "Klorofil (E140), ıspanak özü" , arar: ["E142", "Yeşil S"] },
 "E150A": { ad: "E150A / Düz Karamel", kat: "Renklendirici", risk: "dusuk", organlar: [], etki: "Sadece şeker yakılarak yapılır. 4-MEI içermez, en güvenli karamel sınıfı.", kaynak: "EFSA 2011 ANS Karamel Görüşü", alternatif: "Pekmez, hurma karameli" , arar: ["E150A", "Düz Karamel"] },
 "E150B": { ad: "E150B / Sülfit Karamel", kat: "Renklendirici", risk: "orta", organlar: ["Solunum"], etki: "Sülfit içerir, astımlılarda solunum sorunu tetikleyebilir.", kaynak: "EFSA 2011 · FDA GRAS", alternatif: "E150A veya doğal pekmez" , arar: ["E150B", "Sülfit Karamel"] },
 "E150C": { ad: "E150C / Amonyak Karamel", kat: "Renklendirici", risk: "orta", organlar: ["Bağışıklık", "Bağırsak"], etki: "Amonyak yan ürünleri bağışıklık baskılayabilir. Bira, sos, soya sosunda yaygın.", kaynak: "EFSA 2011 ANS Panel · JECFA 2011", alternatif: "E150A düz karamel" , arar: ["E150C", "Amonyak Karamel"] },
 "E151": { ad: "E151 / Parlak Siyah BN", kat: "Sentetik Renklendirici", risk: "yuksek", organlar: ["Sinir Sistemi", "Bağışıklık"], etki: "Azo boyası. ABD, Kanada, Norveç, Finlandiya, Japonya yasakladı.", kaynak: "EFSA 2010 · FDA Banned List", alternatif: "Aktif kömür (E153), karamel" , arar: ["E151", "Parlak Siyah BN"] },
 "E153": { ad: "E153 / Bitkisel Karbon", kat: "Doğal Renklendirici", risk: "dusuk", organlar: [], etki: "Bitkilerden elde edilen aktif kömür. Genelde güvenli ama ilaç emilimini etkileyebilir.", kaynak: "EFSA 2012", alternatif: "Doğal kullanım" , arar: ["E153", "Bitkisel Karbon"] },
 "E154": { ad: "E154 / Kahverengi FK", kat: "Sentetik Renklendirici", risk: "yuksek", organlar: ["Sinir Sistemi"], etki: "AB dışında çoğu ülkede yasak. Sadece İngiltere'de tuzlu balıkta sınırlı kullanım.", kaynak: "EFSA 2011 ANS Görüşü", alternatif: "Doğal karamel (E150A)" , arar: ["E154", "Kahverengi FK"] },
 "E155": { ad: "E155 / Kahverengi HT", kat: "Sentetik Renklendirici", risk: "yuksek", organlar: ["Sinir Sistemi", "Bağışıklık"], etki: "Azo boyası. ABD, Kanada, Norveç, Avusturya, İsveç yasakladı.", kaynak: "EFSA 2010 · Southampton 2007", alternatif: "E150A karamel, kakao" , arar: ["E155", "Kahverengi HT"] },
 "E160B": { ad: "E160B / Annatto (Bixa)", kat: "Doğal Renklendirici", risk: "orta", organlar: ["Bağışıklık"], etki: "Doğal ama alerjik reaksiyon (anafilaksi dahil) raporları var.", kaynak: "EFSA 2008 · J Allergy Clin Immunol 2009", alternatif: "Zerdeçal (E100), havuç özü" , arar: ["E160B", "Annatto", "Bixa"] },
 "E171": { ad: "E171 / Titanyum Dioksit (Nano)", kat: "Beyazlatıcı", risk: "kritik", organlar: ["Bağırsak", "DNA"], etki: "Fransa 2020'de yasakladı, AB 2022'de gıda kullanımını yasakladı. Genotoksisite belirsizliği. Hap, sakız, beyaz şekerleme.", kaynak: "EFSA 2021 ANS Görüşü · ANSES Fransa 2017 · AB Reg 2022/63", alternatif: "Nişasta beyazı, hindistan cevizi" , arar: ["E171", "Titanyum Dioksit", "Nano"] },
 "E173": { ad: "E173 / Alüminyum (Toz)", kat: "Renklendirici", risk: "yuksek", organlar: ["Beyin", "Kemik"], etki: "Alüminyum birikimi Alzheimer riskiyle ilişkilendirildi. Pastacılık süslemesinde.", kaynak: "EFSA 2008 Alüminyum · WHO Aluminium 1997", alternatif: "Doğal süslemeler, kakao" , arar: ["E173", "Alüminyum", "Toz"] },
 "E174": { ad: "E174 / Gümüş", kat: "Renklendirici", risk: "orta", organlar: ["Cilt", "Karaciğer"], etki: "Aşırı kullanımda argyria (cilt grileşmesi), karaciğer birikim.", kaynak: "EFSA 2016 ANS · NIH Silver", alternatif: "Doğal pasta süslemesi" , arar: ["E174", "Gümüş"] },
 "E180": { ad: "E180 / Litol Rubin BK", kat: "Sentetik Renklendirici", risk: "yuksek", organlar: ["Karaciğer", "Bağışıklık"], etki: "Azo boyası. Sadece peynir kabuğunda izinli. ABD, Avustralya yasakladı.", kaynak: "EFSA 2010 · FDA Banned", alternatif: "Doğal kabuk renklendirme yok" , arar: ["E180", "Litol Rubin BK"] },
 "E200": { ad: "E200 / Sorbik Asit", kat: "Koruyucu", risk: "orta", organlar: ["Cilt", "Bağışıklık"], etki: "Cilt iritasyonu, ürtiker, alerjik reaksiyonlar raporlandı.", kaynak: "EFSA 2015 ANS Panel · CSPI", alternatif: "Sirke, tuz, kuru tuzlama" , arar: ["E200", "Sorbik Asit"] },
 "E202": { ad: "E202 / Potasyum Sorbat", kat: "Koruyucu", risk: "orta", organlar: ["Cilt", "DNA"], etki: "DNA hasarı (laboratuvar) ve ürtiker raporları. Şarap, peynir, et ürünleri.", kaynak: "Toxicol In Vitro 2010 Mamur · EFSA 2015", alternatif: "Sirke, askorbik asit, doğal koruyucu" , arar: ["E202", "Potasyum Sorbat"] },
 "E203": { ad: "E203 / Kalsiyum Sorbat", kat: "Koruyucu", risk: "orta", organlar: ["Cilt", "Bağışıklık"], etki: "Sorbat ailesi. Cilt iritasyonu ve alerji raporları.", kaynak: "EFSA 2015 ANS", alternatif: "Sirke, tuz koruma" , arar: ["E203", "Kalsiyum Sorbat"] },
 "E210": { ad: "E210 / Benzoik Asit", kat: "Koruyucu", risk: "yuksek", organlar: ["Sinir Sistemi", "Bağırsak"], etki: "Askorbik asit (C vitamini) ile birleşince kanserojen benzen oluşturur. Çocuklarda hiperaktivite.", kaynak: "FDA Benzene in Beverages 2007 · Southampton 2007", alternatif: "Doğal koruma, soğuk zincir" , arar: ["E210", "Benzoik Asit"] },
 "E212": { ad: "E212 / Potasyum Benzoat", kat: "Koruyucu", risk: "yuksek", organlar: ["Sinir Sistemi", "DNA"], etki: "Benzen oluşturma riski (C vitamini ile). Hiperaktivite, hücre DNA hasarı.", kaynak: "Mutat Res 2007 Yılmaz · EFSA 2016", alternatif: "Doğal koruyucular" , arar: ["E212", "Potasyum Benzoat"] },
 "E213": { ad: "E213 / Kalsiyum Benzoat", kat: "Koruyucu", risk: "yuksek", organlar: ["Sinir Sistemi"], etki: "Benzoat ailesi. C vitamini ile benzen oluşturma riski. Asitli içeceklerde tehlikeli.", kaynak: "FDA Benzene · EFSA 2016", alternatif: "Soğuk zincir, doğal koruma" , arar: ["E213", "Kalsiyum Benzoat"] },
 "E214": { ad: "E214 / Etil para-hidroksibenzoat", kat: "Koruyucu (Paraben)", risk: "yuksek", organlar: ["Hormon", "Üreme"], etki: "Paraben grubu. Östrojen taklidi, AB gıdada yasakladı (2006).", kaynak: "EFSA 2004 · AB Direktifi 2006/52", alternatif: "Doğal koruyucu (sirke, tuz)" , arar: ["E214", "Etil para", "hidroksibenzoat"] },
 "E215": { ad: "E215 / Sodyum Etil para-hidroksibenzoat", kat: "Koruyucu (Paraben)", risk: "yuksek", organlar: ["Hormon"], etki: "Paraben ailesi. AB 2006'da gıdada yasakladı.", kaynak: "EFSA 2004 · AB Direktifi 2006/52", alternatif: "Doğal koruyucu" , arar: ["E215", "Sodyum Etil para", "hidroksibenzoat"] },
 "E216": { ad: "E216 / Propil para-hidroksibenzoat", kat: "Koruyucu (Paraben)", risk: "kritik", organlar: ["Hormon", "Üreme"], etki: "Sperm sayısı düşüşü hayvan çalışmaları. AB 2006'da yasakladı.", kaynak: "EFSA 2004 Paraben · Oishi 2002", alternatif: "Doğal koruyucu" , arar: ["E216", "Propil para", "hidroksibenzoat"] },
 "E217": { ad: "E217 / Sodyum Propil para-hidroksibenzoat", kat: "Koruyucu (Paraben)", risk: "kritik", organlar: ["Hormon", "Üreme"], etki: "Paraben. AB gıdada yasakladı. Hormon bozucu.", kaynak: "AB Direktifi 2006/52 · EFSA 2004", alternatif: "Doğal koruyucu" , arar: ["E217", "Sodyum Propil para", "hidroksibenzoat"] },
 "E218": { ad: "E218 / Metil para-hidroksibenzoat", kat: "Koruyucu (Paraben)", risk: "yuksek", organlar: ["Hormon", "Cilt"], etki: "AB izinli ama kısıtlamalı. EWG hormon bozucu listesinde.", kaynak: "EFSA 2004 · EWG Skin Deep", alternatif: "Doğal koruyucu, sirke" , arar: ["E218", "Metil para", "hidroksibenzoat"] },
 "E219": { ad: "E219 / Sodyum Metil para-hidroksibenzoat", kat: "Koruyucu (Paraben)", risk: "yuksek", organlar: ["Hormon"], etki: "Paraben. EWG hormon bozucu işaretledi.", kaynak: "EWG · EFSA 2004", alternatif: "Doğal koruyucu" , arar: ["E219", "Sodyum Metil para", "hidroksibenzoat"] },
 "E221": { ad: "E221 / Sodyum Sülfit", kat: "Koruyucu", risk: "orta", organlar: ["Solunum", "Mide"], etki: "Astım krizi tetikler. B1 vitaminini parçalar. Şarap, kuru meyve, salata barları.", kaynak: "FDA Sulfite Warning 1986 · EFSA 2016", alternatif: "Sirke, askorbik asit" , arar: ["E221", "Sodyum Sülfit"] },
 "E222": { ad: "E222 / Sodyum Bisülfit", kat: "Koruyucu", risk: "orta", organlar: ["Solunum"], etki: "Astım ve anafilaksi tetikleyebilir. Şarap, taze meyve gevrekliği.", kaynak: "EFSA 2016 Sülfitler · FDA Warning", alternatif: "Doğal koruma" , arar: ["E222", "Sodyum Bisülfit"] },
 "E223": { ad: "E223 / Sodyum Metabisülfit", kat: "Koruyucu", risk: "orta", organlar: ["Solunum", "Mide"], etki: "Astım tetikleyici. Şarap, sirke, dondurulmuş karides, kuru meyve.", kaynak: "EFSA 2016 · FDA Sulfite", alternatif: "Doğal koruma, soğuk zincir" , arar: ["E223", "Sodyum Metabisülfit"] },
 "E224": { ad: "E224 / Potasyum Metabisülfit", kat: "Koruyucu", risk: "orta", organlar: ["Solunum"], etki: "Sülfit. Şarap ve bira üretiminde. Astımlılarda risk.", kaynak: "EFSA 2016 ANS Panel", alternatif: "Doğal koruyucu yok bira/şarap için" , arar: ["E224", "Potasyum Metabisülfit"] },
 "E226": { ad: "E226 / Kalsiyum Sülfit", kat: "Koruyucu", risk: "orta", organlar: ["Solunum"], etki: "Sülfit. Astımlılarda kriz tetikleyebilir.", kaynak: "EFSA 2016", alternatif: "Sirke, askorbik" , arar: ["E226", "Kalsiyum Sülfit"] },
 "E227": { ad: "E227 / Kalsiyum Bisülfit", kat: "Koruyucu", risk: "orta", organlar: ["Solunum"], etki: "Sülfit ailesi. Astım tetikleyici.", kaynak: "EFSA 2016", alternatif: "Doğal koruma" , arar: ["E227", "Kalsiyum Bisülfit"] },
 "E228": { ad: "E228 / Potasyum Bisülfit", kat: "Koruyucu", risk: "orta", organlar: ["Solunum"], etki: "Sülfit. Şarap kullanımı yaygın.", kaynak: "EFSA 2016 ANS", alternatif: "Doğal koruma" , arar: ["E228", "Potasyum Bisülfit"] },
 "E230": { ad: "E230 / Bifenil (Difenil)", kat: "Koruyucu", risk: "kritik", organlar: ["Karaciğer", "Üreme"], etki: "Narenciye kabuğunda. AB 2003'te yasakladı.", kaynak: "AB Direktifi 2003/114", alternatif: "Yıkanmış kabuk, organik narenciye" , arar: ["E230", "Bifenil", "Difenil"] },
 "E231": { ad: "E231 / Orthofenil Fenol", kat: "Koruyucu (Fungisit)", risk: "kritik", organlar: ["Böbrek", "Kanser"], etki: "Narenciye fungisit. IARC Grup 2B olası kanserojen.", kaynak: "IARC Vol 73 · AB 2003 yasak", alternatif: "Organik kabuk, yıkama" , arar: ["E231", "Orthofenil Fenol"] },
 "E233": { ad: "E233 / Thiabendazol", kat: "Koruyucu (Fungisit)", risk: "yuksek", organlar: ["Karaciğer", "Tiroid"], etki: "Muz, narenciye fungisit. EPA reproductive risk işaretledi.", kaynak: "US EPA Thiabendazol · EFSA 2016", alternatif: "Organik meyve" , arar: ["E233", "Thiabendazol"] },
 "E234": { ad: "E234 / Nizin", kat: "Doğal Koruyucu", risk: "dusuk", organlar: [], etki: "Bakteriyosin (doğal). Peynirde güvenli kabul edilir. Süt alerjisi nadir.", kaynak: "EFSA 2017 ANS Nizin", alternatif: "Doğal kullanım" , arar: ["E234", "Nizin"] },
 "E235": { ad: "E235 / Natamisin", kat: "Doğal Antifungal", risk: "orta", organlar: ["Bağışıklık"], etki: "Peynir kabuğunda. Cilt teması alerjik reaksiyon. Bağırsak florasına etkili.", kaynak: "EFSA 2009 Natamisin", alternatif: "Doğal kabuk koruma" , arar: ["E235", "Natamisin"] },
 "E239": { ad: "E239 / Hekzametilen Tetramin", kat: "Koruyucu", risk: "kritik", organlar: ["Böbrek", "Kanser"], etki: "Formaldehit salar. AB sadece Provolone peynirinde izinli. Kanserojen kategori 2.", kaynak: "AB Reg 1129/2011 · IARC Vol 88 Formaldehit", alternatif: "Doğal koruma" , arar: ["E239", "Hekzametilen Tetramin"] },
 "FOSFORIK ASIT IÇECEK": { ad: "Fosforik Asit (Kola İçeceklerinde)", kat: "Asitlik Düzenleyici (E338)", risk: "kritik", organlar: ["Kemik", "Diş", "Böbrek"], etki: "Kemik yoğunluğunu düşürür, osteoporoz riski. Diş minesini eritir. Böbrek taşı riskini artırır. Coca-Cola, Pepsi içeriği.", kaynak: "Am J Clin Nutr 2006 Tucker · CSPI Kola Raporu · Harvard Health 2014", alternatif: "Maden suyu + limon, soda + nane", arar: ["Fosforik Asit", "Phosphoric Acid"] },
 "KARBONAT GAZ": { ad: "Karbondioksit (CO2) — Gazlı İçecekler", kat: "Gazlandırıcı (E290)", risk: "orta", organlar: ["Mide", "Diş"], etki: "Mide reflüsünü tetikler, GERD'i kötüleştirir. Asit + gaz birleşimi diş minesini hızla aşındırır.", kaynak: "Am J Gastroenterol 2010 · CSPI Soda raporu", alternatif: "Maden suyu (doğal mineralli)" , arar: ["Karbondioksit", "Gazlı İçecekler", "CO2"] },
 "ŞEKER YÜKLÜ KOLA": { ad: "Eklenmiş Şeker (Gazlı İçecek - 33cl'de 35g)", kat: "Şeker (Sakkaroz/HFCS)", risk: "kritik", organlar: ["Pankreas", "Karaciğer", "Kalp", "Beyin"], etki: "Bir kutu kolada 9 küp şeker. Tip 2 diyabet, yağlı karaciğer, kalp hastalığı, obezite. WHO günlük max 25g öneriyor.", kaynak: "WHO Sugar Guideline 2015 · Lancet 2010 Malik · CSPI Liquid Candy", alternatif: "Su, limonata (şekersiz), buzlu çay (şekersiz)", arar: ["Sukroz", "Sucrose", "Sakaroz"] },
 "ENERJI IÇECEĞI": { ad: "Enerji İçeceği (Red Bull, Monster, Burn)", kat: "Stimülan Kombinasyon", risk: "kritik", organlar: ["Kalp", "Sinir Sistemi", "Böbrek"], etki: "Kafein + taurin + şeker + B vitamini megadoz. Kalp ritim bozukluğu, ani kalp ölümü, inme raporları. 16-18 yaş altı yasak (birçok ülke).", kaynak: "AAP 2011 Energy Drinks · WHO Bull 2014 Breda · Mayo Clinic 2015", alternatif: "Yeşil çay, mate, kahve (sade)", arar: ["Enerji Icecegi", "Energy Drink", "Red Bull", "Monster"] },
 "TAURIN ENERJI": { ad: "Taurin (Megadoz - Enerji İçeceği)", kat: "Aminoasit", risk: "yuksek", organlar: ["Kalp", "Beyin"], etki: "Kafeinle birleşince kalp ritim bozukluğunu artırır. Tek başına güvenli ama kombinasyon tehlikeli.", kaynak: "EFSA 2009 Taurin · NEJM 2008 Energy Drinks", alternatif: "Doğal kaynak (et, balık)" , arar: ["Taurin", "Megadoz - Enerji İçeceği"] },
 "GUARANA": { ad: "Guarana (Enerji İçeceği)", kat: "Stimülan", risk: "yuksek", organlar: ["Kalp", "Sinir Sistemi"], etki: "Kahveden 4 kat fazla kafein içerir. Çarpıntı, anksiyete, uykusuzluk. Etiketteki kafein miktarı genelde gizli.", kaynak: "EFSA 2015 Kafein · CSPI Energy Drinks", alternatif: "Yeşil çay, mate" , arar: ["Guarana", "Enerji İçeceği"] },
 "GINSENG ENERJI": { ad: "Ginseng (Enerji İçeceği Karışımı)", kat: "Bitkisel Stimülan", risk: "orta", organlar: ["Tansiyon", "İlaç Etkileşimi"], etki: "Tansiyonu yükseltir, kan sulandırıcı ilaçları etkiler. Enerji içeceklerinde dozaj kontrolsüz.", kaynak: "NIH NCCIH Ginseng · Mayo Clinic", alternatif: "Doktor kontrolünde tek başına bitki çayı" , arar: ["Ginseng", "Enerji İçeceği Karışımı"] },
 "HFCS MEYVE SUYU": { ad: "Yüksek Fruktozlu Mısır Şurubu (Meyve Suyu)", kat: "Tatlandırıcı", risk: "kritik", organlar: ["Karaciğer", "Pankreas", "Bağırsak"], etki: "Yağlı karaciğer hastalığı (NAFLD). Bağırsak floranı bozar. Tip 2 diyabet, obezite. ABD'de meyve sularının %80'inde.", kaynak: "Hepatology 2010 Ouyang · Lancet 2013 Bray · CSPI HFCS", alternatif: "Taze sıkılmış meyve suyu, su + meyve" , arar: ["Yüksek Fruktozlu Mısır Şurubu", "Meyve Suyu"] },
 "MEYVE NEKTARI": { ad: "Meyve Nektarı (% 25-50 Meyve)", kat: "Şekerli İçecek", risk: "yuksek", organlar: ["Pankreas", "Diş", "Karaciğer"], etki: "Aslında şekerli su. Sadece %25 meyve, gerisi şeker + su + aroma. Etikette 'meyve suyu' diye yanıltıcı.", kaynak: "CSPI Fruit Drinks 2016 · EFSA 2010 Meyve Suları", alternatif: "Taze meyve, %100 meyve suyu (az miktarda)" , arar: ["Meyve Nektarı"] },
 "MEYVE AROMALI IÇECEK": { ad: "Meyveli İçecek (%10 Meyve - Cappy, Tropicana)", kat: "Şekerli İçecek", risk: "kritik", organlar: ["Pankreas", "Diş"], etki: "İçinde gerçek meyve nerdeyse yok. Aroma + şeker + su + asit + koruyucu. Çocuklarda diş çürüğü ve obezite.", kaynak: "CSPI Liquid Candy · AAP 2017 Fruit Juice Policy", alternatif: "Taze meyve, su, evde sıkılmış limonata" , arar: ["Meyveli İçecek", "Tropicana"] },
 "AROMA TANIMLANMAMIŞ": { ad: "Doğala Özdeş Aroma (Tanımlanmamış)", kat: "Aroma", risk: "orta", organlar: ["Karaciğer", "Bağışıklık"], etki: "100+ kimyasal karışımı tek bir 'aroma' kelimesi altında gizlenir. Üretici açıklamak zorunda değil.", kaynak: "CSPI Food Dyes · EFSA 2012 Flavorings · EWG", alternatif: "Doğal meyve, gerçek baharat", arar: ["Dogala Ozdes Aroma", "Aroma Verici", "Dogal Aroma"] },
 "SODYUM SITRAT IÇECEK": { ad: "Sodyum Sitrat (E331 - Aşırı)", kat: "Asitlik Düzenleyici", risk: "orta", organlar: ["Böbrek", "Mide"], etki: "Doğal ama gazlı içeceklerde aşırı miktarda. Yüksek sodyum, böbrek baskısı.", kaynak: "EFSA 2018 Sitratlar", alternatif: "Doğal limon suyu" , arar: ["Sodyum Sitrat", "E331-Aşırı"] },
 "MALIK ASIT": { ad: "Malik Asit (E296)", kat: "Asitlik Düzenleyici", risk: "orta", organlar: ["Diş", "Mide"], etki: "Diş minesini aşındırır. Yapay ekşilik vericisi. Şekerli gazoz ve şekerlemede.", kaynak: "EFSA 2018 · J Dent Res 2009 Asit Erozyon", alternatif: "Doğal limon, elma" , arar: ["Malik Asit", "E296"] },
 "ASETSULFAM K IÇECEK": { ad: "Asesülfam K (E950 - Zero/Light İçecekler)", kat: "Yapay Tatlandırıcı", risk: "yuksek", organlar: ["Bağırsak", "Bağışıklık", "Beyin"], etki: "Bağırsak florasını bozar (Nature 2014). Tatlı isteğini artırır. Coca-Cola Zero, Pepsi Max.", kaynak: "Nature 2014 Suez · EFSA 2024 · CSPI Tatlandırıcılar", alternatif: "Su, soda + nane, şekersiz çay", arar: ["Asesulfam", "Acesulfame"] },
 "ASPARTAM IÇECEK": { ad: "Aspartam (E951 - Zero/Light/Diet)", kat: "Yapay Tatlandırıcı", risk: "yuksek", organlar: ["Karaciğer", "Beyin", "Kanser"], etki: "WHO/IARC 2023'te 'olası kanserojen' (Grup 2B) ilan etti. Baş ağrısı, fenilketonüri tehlikeli. Coca-Cola Light/Zero.", kaynak: "IARC 2023 Aspartam · WHO 2023 · Lancet Oncol 2023", alternatif: "Su, stevia (doğal), şekersiz çay", arar: ["Aspartam", "Aspartame"] },
 "SUKRALOZ IÇECEK": { ad: "Sukraloz (E955 - Soğuk Çay, Light İçecek)", kat: "Yapay Tatlandırıcı", risk: "yuksek", organlar: ["Bağırsak", "Bağışıklık", "DNA"], etki: "Pişince/ısınınca klorlu bileşik salar. Bağırsak florasını bozar. DNA hasarı çalışmaları.", kaynak: "Environ Health Perspect 2013 Schiffman · Heliyon 2024 · CSPI", alternatif: "Stevia, monk fruit, su", arar: ["Sukraloz", "Sucralose"] },
 "STEVIA IŞLENMIŞ": { ad: "İşlenmiş Stevia Ekstresi (E960)", kat: "Tatlandırıcı", risk: "dusuk", organlar: ["Bağırsak"], etki: "Doğal ama işlenmişi (rebaudiosid A) bağırsak florasında değişiklik yapabilir. Yine de diğer yapaylardan güvenli.", kaynak: "EFSA 2010 Stevia · WHO JECFA 2008", alternatif: "Taze stevia yaprağı" , arar: ["İşlenmiş Stevia Ekstresi", "E960"] },
 "EKSTRA KAFEIN": { ad: "Eklenmiş Kafein (İçeceklerde - Etiketsiz)", kat: "Stimülan", risk: "yuksek", organlar: ["Kalp", "Sinir Sistemi", "Mide"], etki: "Çocuklarda çarpıntı, anksiyete, uyku bozukluğu. AAP 12 yaş altı yasaklıyor. Coca-Cola: 32mg/33cl.", kaynak: "AAP 2011 Caffeine Policy · EFSA 2015 Kafein · WHO", alternatif: "Çocuklar için sadece su, süt" , arar: ["Eklenmiş Kafein", "İçeceklerde - Etiketsiz"] },
 "BVO": { ad: "Brominlenmiş Bitkisel Yağ (BVO - E443)", kat: "Stabilizör (Narenciye Gazoz)", risk: "kritik", organlar: ["Tiroid", "Sinir Sistemi", "Cilt"], etki: "Brom birikimi: hafıza kaybı, sinir hasarı, cilt sorunları. FDA 2024'te yasakladı. AB, Hindistan, Japonya yasak.", kaynak: "FDA 2024 BVO Yasak · IARC · EWG Dirty Dozen", alternatif: "Berrak narenciye gazoz, su + limon", arar: ["Brominlenmis Bitkisel"] },
 "ESTER GUM": { ad: "Ester Gum (Glycerol Ester of Rosin - E445)", kat: "Stabilizör", risk: "orta", organlar: ["Karaciğer"], etki: "BVO yerine kullanılıyor ama karaciğer toksisitesi belirsiz. AB izinli, ABD'de tartışmalı.", kaynak: "EFSA 2018 · CSPI Eklemeler", alternatif: "Doğal narenciye yağı" , arar: ["Ester Gum", "Glycerol Ester of Rosin - E445"] },
 "POTASYUM BROMAT": { ad: "Potasyum Bromat (Bazı Aromalı İçeceklerde)", kat: "Oksidant", risk: "kritik", organlar: ["Böbrek", "Kanser"], etki: "IARC Grup 2B olası kanserojen. AB, Brezilya, Kanada, Çin yasakladı. ABD bazı eyaletler yasakladı (CA 2024).", kaynak: "IARC Vol 73 Bromat · California AB 418 2024", alternatif: "Doğal C vitamini" , arar: ["Potasyum Bromat", "Bazı Aromalı İçeceklerde"] },
 "POTASYUM SORBAT IÇECEK": { ad: "Potasyum Sorbat (Soğuk Çay, Aromalı Su)", kat: "Koruyucu", risk: "orta", organlar: ["DNA", "Bağırsak"], etki: "C vitaminiyle birleşince DNA hasarı. Lipton Ice Tea, Nestea, Aroma sular.", kaynak: "Toxicol In Vitro 2010 Mamur · EFSA 2015", alternatif: "Soğuk zincir, doğal koruma" , arar: ["Potasyum Sorbat", "Soğuk Çay", "Aromalı Su"] },
 "BENZOAT GAZOZ": { ad: "Sodyum Benzoat (E211 - Gazlı İçecek)", kat: "Koruyucu", risk: "yuksek", organlar: ["Sinir Sistemi", "Kanser"], etki: "C vitamini ile birleşince kanserojen BENZEN oluşturur (Coca-Cola, Sprite, Fanta'da tespit edildi). Çocuk hiperaktivite.", kaynak: "FDA 2007 Benzene in Beverages · Southampton 2007 · CSPI", alternatif: "Soğuk zincir, taze meyve suyu" , arar: ["Sodyum Benzoat", "E211-Gazlıİçecek"] },
 "EDTA IÇECEK": { ad: "Disodyum EDTA (E385 - Şişe İçecek)", kat: "Stabilizör", risk: "orta", organlar: ["Bağırsak", "Mineral Emilim"], etki: "Mineral emilimini bozar (kalsiyum, demir, çinko). Bağırsak florasını etkiler.", kaynak: "EFSA 2018 EDTA · CSPI", alternatif: "Doğal C vitamini, askorbik asit" , arar: ["Disodyum EDTA", "E385-Şişeİçecek"] },
 "POLIVINIL POLIPIROLIDON": { ad: "Polivinilpolipirolidon (PVPP - E1202, Bira/Şarap)", kat: "Stabilizör", risk: "orta", organlar: ["Bağırsak"], etki: "Bira/şarap berraklaştırıcı. Filtrelenir ama izleri kalabilir. Uzun vade etkisi belirsiz.", kaynak: "EFSA 2020 PVPP", alternatif: "Filtresiz organik bira/şarap" , arar: ["Polivinilpolipirolidon", "PVPP - E1202", "Bira/Şarap"] },
 "GUM ARABIC": { ad: "Arap Zamkı (E414 - İçecek Stabilizör)", kat: "Stabilizör", risk: "dusuk", organlar: ["Bağırsak"], etki: "Doğal bitki sakızı, genelde güvenli. Aşırı dozda şişkinlik ve gaz.", kaynak: "EFSA 2017 Acacia Gum", alternatif: "Doğal kullanım" , arar: ["Arap Zamkı", "E414-İçecekStabilizör"] },
 "KARMIN IÇECEK": { ad: "Karmin (E120 - Pembe/Kırmızı İçecek)", kat: "Doğal Renklendirici (Böcek)", risk: "orta", organlar: ["Bağışıklık"], etki: "Koşinil böceğinden. Anafilaksi raporları. Vegan/helal değil. Starbucks Pembe Drink, Çilekli İçecekler.", kaynak: "FDA 2009 Allergy Labeling · EFSA 2015", alternatif: "Pancar suyu (E162), nar" , arar: ["Karmin", "E120-Pembe/Kırmızıİçecek"] },
 "BPA KUTU IÇECEK": { ad: "Bisfenol A (BPA - Kutu İçecek İç Astar)", kat: "Plastik Bileşeni", risk: "kritik", organlar: ["Hormon", "Üreme", "Beyin"], etki: "Östrojen taklidi, çocuk gelişimini bozar. Tüm metal kutuların iç astarında. Sıcakta daha çok geçer.", kaynak: "EFSA 2023 BPA · ANSES Fransa · EWG BPA · NIH NIEHS", alternatif: "Cam şişe, BPA-free etiketli ürün", arar: ["Bisfenol A", "Bisphenol A"] },
 "BPS ALTERNATIF": { ad: "Bisfenol S (BPS - 'BPA-Free' Kutu)", kat: "Plastik Bileşeni", risk: "yuksek", organlar: ["Hormon", "Üreme"], etki: "BPA yerine kullanılıyor ama o da hormon bozucu. 'BPA-free' yanıltıcı.", kaynak: "Endocrinology 2013 Vinas · EWG BPS · ANSES", alternatif: "Cam şişe" , arar: ["Bisfenol S", "BPS BPA-Free Kutu"] },
 "BISFENOL F": { ad: "Bisfenol F (BPF - 'BPA-Free' Astar)", kat: "Plastik Bileşeni", risk: "yuksek", organlar: ["Hormon"], etki: "BPA ailesi. Hormon bozucu, BPA'dan farkı yok.", kaynak: "Environ Health 2015 Rochester · EWG", alternatif: "Cam ambalaj" , arar: ["Bisfenol F", "BPF BPA-Free Astar"] },
 "MIKROPLASTIK PET": { ad: "Mikroplastik (PET Şişeden Sızıntı)", kat: "Plastik Parçacık", risk: "yuksek", organlar: ["Bağırsak", "Kan", "Hormon"], etki: "PET şişe + sıcak = mikroplastik sızıntısı. Kan, plasenta, akciğerde tespit. Hormon bozucu.", kaynak: "Environ Sci Technol 2024 · WHO 2019 Mikroplastik · PNAS 2024", alternatif: "Cam şişe, çelik termos" , arar: ["Mikroplastik", "PET Şişeden Sızıntı"] },
 "ANTIMON PET": { ad: "Antimon (PET Şişe Sızıntısı)", kat: "Ağır Metal", risk: "yuksek", organlar: ["Karaciğer", "Mide", "Kalp"], etki: "PET üretim katalizörü. Sıcakta şişeden suya sızar. Karaciğer ve kalp toksisitesi.", kaynak: "Environ Sci Technol 2008 Shotyk · WHO 2003 Antimon", alternatif: "Cam şişe, paslanmaz çelik termos" , arar: ["Antimon", "PET Şişe Sızıntısı"] },
 "FTALAT IÇECEK": { ad: "Ftalatlar (DEHP - PVC Şişe Tıpa)", kat: "Plastikleştirici", risk: "kritik", organlar: ["Hormon", "Üreme", "Karaciğer"], etki: "Bebek/çocukta üreme bozukluğu. DEHP IARC Grup 2B. Plastik şişe tıpalarından geçer.", kaynak: "IARC Vol 101 DEHP · EFSA 2019 Ftalatlar · EWG", alternatif: "Cam şişe, ftalat-free etiket" , arar: ["Ftalatlar", "DEHP - PVC Şişe Tıpa"] },
 "ARSENIK ELMA SUYU": { ad: "Arsenik (Elma/Üzüm Suyu Kalıntısı)", kat: "Ağır Metal", risk: "kritik", organlar: ["Kanser", "Sinir Sistemi", "Cilt"], etki: "Pestisit ve toprak kaynaklı. Bebek/çocuk meyve sularında tespit. FDA 2023 sınır koydu.", kaynak: "FDA 2023 Apple Juice Arsenic · Consumer Reports 2011-2023 · WHO Arsenik", alternatif: "Organik, taze meyve" , arar: ["Arsenik", "Elma/Üzüm Suyu Kalıntısı"] },
 "KURŞUN MEYVE SUYU": { ad: "Kurşun (Meyve Suyu, Baharat Kalıntısı)", kat: "Ağır Metal", risk: "kritik", organlar: ["Beyin", "Kemik", "Böbrek"], etki: "Çocuk beyin gelişimini bozar (IQ düşürür). Güvenli sınır yok (WHO). FDA 2023 baby food sınır koydu.", kaynak: "WHO Kurşun 2023 · FDA Closer to Zero 2023 · Consumer Reports", alternatif: "Organik, evde sıkılmış" , arar: ["Kurşun", "Meyve Suyu", "Baharat Kalıntısı"] },
 "PESTISIT IÇECEK": { ad: "Pestisit Kalıntısı (Meyve Suyu)", kat: "Tarım İlacı Kalıntısı", risk: "yuksek", organlar: ["Sinir Sistemi", "Hormon", "Kanser"], etki: "Glifosat, klorpirifos, neonikotinoidler endüstriyel meyve sularında tespit. Çocuklarda dikkat eksikliği bağlantısı.", kaynak: "EWG Dirty Dozen 2024 · PAN Europe · IARC Glifosat 2B", alternatif: "Organik meyve, EWG Clean 15 listesi" , arar: ["Pestisit Kalıntısı", "Meyve Suyu"] },
 "GLIFOSAT IÇECEK": { ad: "Glifosat (Yulaf Sütü, Bira)", kat: "Herbisit", risk: "kritik", organlar: ["Karaciğer", "Bağırsak", "Kanser"], etki: "IARC Grup 2A olası kanserojen. Cheerios, Quaker, Bira ve Yulaf Sütünde tespit (EWG 2018).", kaynak: "IARC Vol 112 Glifosat · EWG 2018 Glyphosate Report", alternatif: "Organik yulaf, organik bira", arar: ["Glifosat", "Glyphosate", "Roundup"] },
 "SARI 5 SODA": { ad: "Tartrazin (E102 / Sarı 5 - Limonata)", kat: "Sentetik Renklendirici", risk: "yuksek", organlar: ["Sinir Sistemi", "Bağışıklık"], etki: "Astım ve hiperaktivite tetikler. Norveç, Avusturya yasakladı. Fanta, limonata, enerji içeceklerinde.", kaynak: "Southampton 2007 · EFSA 2009 · CSPI Food Dyes 2023", alternatif: "Doğal sarı (zerdeçal, safran)" , arar: ["Tartrazin", "E102/Sarı5-Limonata"] },
 "SARI 6 IÇECEK": { ad: "Sunset Yellow (E110 / Sarı 6)", kat: "Sentetik Renklendirici", risk: "yuksek", organlar: ["Sinir Sistemi", "Böbrek"], etki: "Hiperaktivite, alerji. Norveç, Finlandiya yasakladı. Portakallı gazoz, sarı içecekler.", kaynak: "Southampton 2007 · EFSA 2014 · CSPI", alternatif: "Havuç suyu, doğal portakal" , arar: ["Sunset Yellow", "E110/Sarı6"] },
 "INOSITOL ENERJI": { ad: "İnositol (Enerji İçeceği Megadozu)", kat: "Vitamin Benzeri", risk: "orta", organlar: ["Bağırsak"], etki: "Doğal ama enerji içeceğinde aşırı miktar. Bağırsak rahatsızlığı, ishal.", kaynak: "EFSA 2009 Energy Drinks Bileşenleri", alternatif: "Doğal kaynak (meyveler)" , arar: ["İnositol", "Enerji İçeceği Megadozu"] },
 "L-KARNITIN ENERJI": { ad: "L-Karnitin (Enerji İçeceği)", kat: "Aminoasit", risk: "orta", organlar: ["Kalp", "Bağırsak"], etki: "Bağırsak bakterileri TMAO'ya çevirir, ateroskleroz riski. Et yeme + ekstra takviye birikim.", kaynak: "Nature Med 2013 Koeth · Cleveland Clinic", alternatif: "Et, balık (doğal)" , arar: ["Karnitin", "Enerji İçeceği"] },
 "MALTODEKSTRIN IÇECEK": { ad: "Maltodekstrin (Sporcu/Enerji İçeceği)", kat: "Karbonhidrat", risk: "yuksek", organlar: ["Pankreas", "Bağırsak"], etki: "Glisemik indeksi şekerden yüksek (110). Bağırsak florasını bozar, E.coli'yi besler.", kaynak: "PLoS One 2012 Nickerson · PNAS 2015 Bağırsak Flora", alternatif: "Hurma, bal, doğal şeker" , arar: ["Maltodekstrin", "Sporcu/Enerji İçeceği"] },
 "DEKSTROZ SODA": { ad: "Dekstroz (Glukoz - Sporcu İçeceği)", kat: "Şeker", risk: "yuksek", organlar: ["Pankreas", "Karaciğer"], etki: "Saf glukoz, kan şekerini fırlatır. Sporcu içeceklerinde ana içerik.", kaynak: "WHO Şeker 2015 · ADA Diyabet", alternatif: "Su + tuz + limon (ev yapımı izotonik)" , arar: ["Dekstroz", "Glukoz - Sporcu İçeceği"] },
 "AROMA NIKOTINAMID": { ad: "Nikotinamid (B3 Megadoz - Enerji İçeceği)", kat: "Vitamin (Megadoz)", risk: "orta", organlar: ["Karaciğer", "Cilt"], etki: "Doğal B3 vitamini ama enerji içeceklerinde günlük dozun 10 katı. Karaciğer baskısı.", kaynak: "EFSA 2014 Niacin · NIH ODS", alternatif: "Et, balık, tahıl (doğal)" , arar: ["Nikotinamid", "B3 Megadoz - Enerji İçeceği"] },
 "EKSTRA B6": { ad: "B6 Vitamini (Megadoz - Enerji İçeceği)", kat: "Vitamin (Megadoz)", risk: "orta", organlar: ["Sinir Sistemi"], etki: "Uzun süre 100mg+ alımı periferal nöropati (sinir hasarı). Red Bull 5mg, kombine alım risk.", kaynak: "EFSA 2008 B6 · NIH ODS Pyridoxine", alternatif: "Muz, tavuk, balık (doğal)" , arar: ["B6 Vitamini", "Megadoz - Enerji İçeceği"] },
 "EKSTRA B12 ENERJI": { ad: "B12 (Megadoz Enerji İçeceği)", kat: "Vitamin (Megadoz)", risk: "dusuk", organlar: [], etki: "Suda çözünür, fazlası atılır. Genelde güvenli ama pahalı plasebo.", kaynak: "EFSA 2015 B12", alternatif: "Doğal kaynak (et, yumurta, balık)" , arar: ["B12", "Megadoz Enerji İçeceği"] },
 "TARTAR KREMASI IÇECEK": { ad: "Tartar Kremi (E336 - Toz İçecekler)", kat: "Asitlik Düzenleyici", risk: "dusuk", organlar: [], etki: "Doğal şarap yan ürünü. Genelde güvenli, aşırıda mide ekşimesi.", kaynak: "EFSA 2018 Tartaratlar", alternatif: "Doğal limon" , arar: ["Tartar Kremi", "E336-Tozİçecekler"] },
 "TONIK KININ": { ad: "Kinin (Tonik Su)", kat: "Aroma/Acı Madde", risk: "orta", organlar: ["Kalp", "Kan"], etki: "Yüksek dozda kalp ritim bozukluğu, trombositopeni. Hamilelikte tehlikeli.", kaynak: "FDA Quinine Warning 2006 · WHO", alternatif: "Maden suyu + limon" , arar: ["Kinin", "Tonik Su"] },
 "SAKKARIN IÇECEK": { ad: "Sakarin (E954 - Light İçecek)", kat: "Yapay Tatlandırıcı", risk: "yuksek", organlar: ["Bağırsak", "Mesane"], etki: "Bağırsak florasını bozar (Nature 2014). Hayvanlarda mesane kanseri. Sweet'N Low.", kaynak: "Nature 2014 Suez · IARC Vol 73 · CSPI", alternatif: "Stevia, su", arar: ["Sakarin", "Saccharin"] },
 "ÇIKOLATA PALMIYE": { ad: "Çikolata (Palmiye Yağlı - Ülker, Eti, Nestle)", kat: "Çikolata Taklidi", risk: "kritik", organlar: ["Kalp", "Karaciğer", "Bağırsak"], etki: "Kakao yağı yerine palmiye yağı. 3-MCPD ve glisidil ester kontaminantı. Çocuklarda obezite ve karaciğer yağlanması.", kaynak: "EFSA 2016 3-MCPD · IARC Vol 101 · Greenpeace Palm Oil", alternatif: "%70 üzeri bitter çikolata, gerçek kakao yağı", arar: ["Kokolin", "Kakao Kompound", "Cocoa Compound", "Kakaolu Kaplama"] },
 "LESITIN E322": { ad: "Soya Lesitini (E322 - GDO Soya)", kat: "Emülgatör", risk: "orta", organlar: ["Hormon", "Bağışıklık"], etki: "GDO soyadan elde edilir, glifosat kalıntısı taşır. Hormon etkileri tartışmalı. Çikolata, bisküvi, bebek mamasında.", kaynak: "EWG GMO Report · IARC Vol 112 Glifosat", alternatif: "Ayçiçeği lesitini (E322i), organik", arar: ["Soya Lesitini", "Lesitin", "Lesithin", "Lecithin", "E 322"] },
 "PGPR E476": { ad: "PGPR (E476 - Poliglserol Polirisinoleat)", kat: "Emülgatör", risk: "orta", organlar: ["Karaciğer", "Böbrek"], etki: "Hint yağından yapılır, hayvan çalışmalarında karaciğer ve böbrek etkisi. Çikolata, çocuk şekerlemelerinde.", kaynak: "EFSA 2017 PGPR · CSPI", alternatif: "Doğal lesitin, kakao yağı", arar: ["PGPR", "Poliglserol"] },
 "GUMMY JELATIN": { ad: "Jelatin (Endüstriyel - Hayvan Atığı)", kat: "Jelleştirici", risk: "orta", organlar: ["Bağışıklık"], etki: "Domuz/sığır kemik+derisinden. Helal/koşer tartışmalı. Antibiyotik ve hormon kalıntısı taşıyabilir. Haribo, yumuşak şeker, marshmallow.", kaynak: "TGK Jelatin Tebliği · FDA Gelatin · WHO", alternatif: "Agar agar, pektin, helal jelatin", arar: ["Jelatin", "Gelatin", "Gelatine"] },
 "KARAGEN ÇIKOLATA": { ad: "Karragenan (E407 - Çikolata Sütü)", kat: "Kıvam Verici", risk: "yuksek", organlar: ["Bağırsak", "Bağışıklık"], etki: "Bağırsak iltihabı tetikler. Çikolata sütü, sütlü tatlı, dondurma, krem peynirde.", kaynak: "Environ Health Perspect 2001 · CSPI · WHO 2014", alternatif: "Doğal süt, ev sütlü tatlı" , arar: ["Karragenan", "E407-ÇikolataSütü"] },
 "DONDURMA E471": { ad: "Mono ve Digliseritler (E471 - Dondurma)", kat: "Emülgatör", risk: "orta", organlar: ["Kalp", "Bağırsak"], etki: "Gizli trans yağ kaynağı (etikette belirtilmez). Algida, Magnum, Cornetto, Ülker dondurmalarında.", kaynak: "EFSA 2017 E471 · CSPI · WHO Trans Fat", alternatif: "Ev yapımı dondurma, gerçek krema", arar: ["Mono Digliserit", "Mono ve Digliserit", "Monogliserit"] },
 "DONDURMA E433": { ad: "Polisorbat 80 (E433 - Dondurma)", kat: "Emülgatör", risk: "yuksek", organlar: ["Bağırsak", "Bağışıklık", "Üreme"], etki: "Bağırsak duvarını inceltir, kolitis tetikler (Nature 2015). Üreme etkileri var. Dondurma, krema, soslar.", kaynak: "Nature 2015 Chassaing · Gastroenterology 2017 · EFSA 2015", alternatif: "Ev yapımı dondurma", arar: ["Polisorbat", "Polysorbate"] },
 "DONDURMA E466": { ad: "Karboksimetil Selüloz (E466 - Dondurma)", kat: "Stabilizör", risk: "orta", organlar: ["Bağırsak", "Bağışıklık"], etki: "Bağırsak müköz tabakasını inceltir. Endüstriyel dondurma, krema, yoğurtta.", kaynak: "Nature 2015 Chassaing · Gastroenterology 2021 Chassaing", alternatif: "Sade dondurma, ev yapımı", arar: ["Karboksimetil Seluloz", "Selluloz Sakizi"] },
 "DONDURMA GUAR": { ad: "Guar Sakızı (E412 - Aşırı Doz)", kat: "Stabilizör", risk: "dusuk", organlar: ["Bağırsak"], etki: "Doğal bitki kaynağı, genelde güvenli. Aşırı dozda şişkinlik, gaz. Diyet ürünlerde aşırı miktarda kullanım sorun.", kaynak: "EFSA 2017 Guar", alternatif: "Doğal kullanım, az miktar" , arar: ["Guar Sakızı", "E412-AşırıDoz"] },
 "DONDURMA HAVA": { ad: "Endüstriyel Dondurma (%50+ Hava)", kat: "İşlenmiş Tatlı", risk: "yuksek", organlar: ["Pankreas", "Karaciğer"], etki: "Süt yerine bitkisel yağ, sentetik aroma, %50 hava (overrun). Ucuz dondurmalar 'pastörize yağlı süt karışımı' içerir.", kaynak: "TGK Dondurma Tebliği · CSPI Ice Cream", alternatif: "Gerçek süt kremalı dondurma, ev yapımı" , arar: ["Endüstriyel Dondurma"] },
 "VANILIN SENTETIK": { ad: "Sentetik Vanilin (Petrol/Kağıt Yan Ürünü)", kat: "Aroma", risk: "orta", organlar: ["Karaciğer", "Bağırsak"], etki: "Gerçek vanilya pahalı diye %99'u sentetik. Petrol veya kağıt sanayi atığından yapılır. Dondurma, kek, bisküvi.", kaynak: "EFSA 2014 Vanillin · CSPI", alternatif: "Gerçek vanilya çubuğu, doğal vanilya özü", arar: ["Vanilin", "Etil Vanilin", "Vanillin"] },
 "MALTODEKSTRIN ATIŞTIRMA": { ad: "Maltodekstrin (Cips, Bisküvi, Atıştırmalık)", kat: "Karbonhidrat", risk: "yuksek", organlar: ["Pankreas", "Bağırsak"], etki: "Glisemik indeksi şekerden yüksek (110). Bağırsak florasını bozar, zararlı E.coli'yi besler. Çoğu paketli üründe.", kaynak: "PLoS One 2012 Nickerson · PNAS 2015", alternatif: "Doğal şeker (hurma, bal), bütün tahıl", arar: ["Maltodekstrin", "Maltodextrin"] },
 "MODIFIYE NIŞASTA": { ad: "Modifiye Nişasta (E1442, E1422 - GDO Mısır)", kat: "Kıvam Verici", risk: "orta", organlar: ["Bağırsak", "Pankreas"], etki: "GDO mısırdan, kimyasal işlemlerle değiştirilmiş. Bağırsak floranı bozar. Çorba, sos, bebek maması.", kaynak: "EFSA 2017 Modifiye Nişasta · EWG GMO", alternatif: "Doğal nişasta, mısır, patates", arar: ["Modifiye Nisasta", "Modified Starch"] },
 "AKRILAMID CIPS": { ad: "Akrilamid (Cips, Patates Kızartması)", kat: "İşlem Yan Ürünü", risk: "kritik", organlar: ["Sinir Sistemi", "Kanser", "Üreme"], etki: "Patates 120°C üzeri pişince oluşur. IARC Grup 2A muhtemel kanserojen. Lays, Cipso, Pringles, Doritos.", kaynak: "IARC Vol 60 · EFSA 2015 · AB Reg 2017/2158", alternatif: "Haşlanmış patates, fırın orta ısı" , arar: ["Akrilamid", "Cips", "Patates Kızartması"] },
 "PRINGLES PATATES": { ad: "Pringles Tarzı Cips (%42 Patates + Nişasta)", kat: "İşlenmiş Atıştırmalık", risk: "yuksek", organlar: ["Kalp", "Pankreas", "Karaciğer"], etki: "Patates değil, patates tozu + buğday nişastası + pirinç unu hamur. UK mahkemesi 'cips değil' kararı verdi.", kaynak: "UK Tax Tribunal 2009 · CSPI Pringles", alternatif: "Ev yapımı patates dilimi, fırın" , arar: ["Pringles Tarzı Cips"] },
 "MSG CIPS": { ad: "MSG (E621 - Cips/Atıştırmalık Çeşni)", kat: "Tat Artırıcı", risk: "yuksek", organlar: ["Sinir Sistemi", "Bağırsak"], etki: "Lays Yaprak, Doritos, Cheetos, Ruffles. Çocuklarda obezite ve baş ağrısı.", kaynak: "Obesity 2008 He · EFSA 2017 MSG", alternatif: "Tuz, baharat, ev yapımı" , arar: ["MSG", "E621-Cips/AtıştırmalıkÇeşni"] },
 "DORITOS CHEDDAR": { ad: "Yapay Cheddar Aroması (Doritos, Cheetos)", kat: "Aroma Karışımı", risk: "yuksek", organlar: ["Karaciğer", "Bağırsak"], etki: "Gerçek peynir yok. Süt tozu + MSG + aroma + renklendirici (E160c paprika ekstresi + E102 tartrazin). Çocuk hiperaktivite.", kaynak: "CSPI Food Dyes · Southampton 2007", alternatif: "Gerçek peynir cipsi, ev yapımı" , arar: ["Yapay Cheddar Aroması", "Doritos", "Cheetos"] },
 "CHEETOS POLI": { ad: "Cheetos Tipi (Mısır + Yapay Renk + MSG)", kat: "İşlenmiş Atıştırmalık", risk: "yuksek", organlar: ["Sinir Sistemi", "Karaciğer", "Bağırsak"], etki: "GDO mısır, palmiye yağı, MSG, yapay renk (E110, E102, E160c). Çocuklarda hiperaktivite.", kaynak: "Southampton 2007 · EFSA 2009 · CSPI", alternatif: "Patlamış mısır (tuzlu)" , arar: ["Cheetos Tipi", "Mısır + Yapay Renk + MSG"] },
 "TUZLU CRACKER": { ad: "Tuzlu Kraker (Beyaz Un + Tuz + Yağ)", kat: "İşlenmiş Atıştırmalık", risk: "orta", organlar: ["Pankreas", "Tansiyon", "Kalp"], etki: "Beyaz un (refined) glisemik bomba. Yüksek sodyum, ek palmiye yağı. Eti Cin, Ülker Pötibör.", kaynak: "WHO 2015 Sodyum · CSPI", alternatif: "Tam buğday krakeri, ev yapımı" , arar: ["Tuzlu Kraker", "Beyaz Un + Tuz + Yağ"] },
 "BISKUVI E471": { ad: "Bisküvi (Beyaz Un + Palmiye + Şeker)", kat: "İşlenmiş Tatlı", risk: "yuksek", organlar: ["Pankreas", "Karaciğer", "Kalp"], etki: "Eti Bumba, Ülker Halley, Hanımeller, Eti Petibor. Beyaz un + palmiye + glikoz şurubu + emülgatör (E471).", kaynak: "BMJ 2019 UPF · WHO Şeker", alternatif: "Tam buğday, yulaflı kurabiye, ev yapımı" , arar: ["Bisküvi", "Beyaz Un + Palmiye + Şeker"] },
 "GOFRET PALMIYE": { ad: "Gofret (Ülker Albeni, Çokomel, Kit Kat)", kat: "İşlenmiş Tatlı", risk: "yuksek", organlar: ["Kalp", "Karaciğer", "Pankreas"], etki: "%50+ şeker, palmiye yağlı çikolata, beyaz un. Tek pakette günlük şeker limiti.", kaynak: "WHO Sugar 2015 · CSPI Candy", alternatif: "Bitter çikolata, kuru meyve" , arar: ["Gofret", "Ülker Albeni", "Çokomel", "Kit Kat"] },
 "OREO ÇIKOLATA": { ad: "Oreo Tarzı Bisküvi (Buğday + Şeker + Palmiye)", kat: "İşlenmiş Tatlı", risk: "yuksek", organlar: ["Pankreas", "Karaciğer", "Beyin"], etki: "Hayvanlarda eroin/kokainden bağımlılık yapıcı (Connecticut College 2013). Şeker + yağ kombinasyonu.", kaynak: "Connecticut College 2013 Honohan · CSPI · WHO", alternatif: "Tam tahıl bisküvi" , arar: ["Oreo Tarzı Bisküvi", "Buğday + Şeker + Palmiye"] },
 "SAKIZ ASPARTAM": { ad: "Sakız (Aspartam + Asesülfam K + BHT)", kat: "İşlenmiş Sakız", risk: "yuksek", organlar: ["Beyin", "Bağırsak", "Hormon"], etki: "Falım, Vivident, Orbit, Stimorol. Aspartam (IARC 2B), BHT (hormon bozucu), titanyum dioksit (E171).", kaynak: "IARC 2023 Aspartam · EFSA 2021 E171 · CSPI", alternatif: "Mastik sakızı, doğal sakız (Chios)" , arar: ["Sakız", "Aspartam + Asesülfam K + BHT"] },
 "SAKIZ TITAN": { ad: "Titanyum Dioksit (E171 - Sakız Beyazı)", kat: "Beyazlatıcı", risk: "kritik", organlar: ["Bağırsak", "DNA"], etki: "AB 2022'de gıdada yasakladı. Nano partiküller, DNA hasarı. Sakız kabuğu, beyaz şekerleme.", kaynak: "AB Reg 2022/63 · EFSA 2021 · ANSES 2017", alternatif: "Renksiz/doğal sakız" , arar: ["Titanyum Dioksit", "E171-SakızBeyazı"] },
 "GUM BASE": { ad: "Sakız Tabanı (Sentetik Plastik Polimer)", kat: "Sakız Bileşeni", risk: "yuksek", organlar: ["Sinir Sistemi", "Hormon"], etki: "Petrol türevi sentetik plastik (polivinil asetat). Etikette sadece 'sakız tabanı' yazılır. Yutulursa plastik birikir.", kaynak: "EFSA 2017 Gum Base · CSPI", alternatif: "Doğal mastik sakızı (Sakız adası)" , arar: ["Sakız Tabanı", "Sentetik Plastik Polimer"] },
 "YUMUSAK ŞEKERLEME": { ad: "Jöleli Şekerleme (Haribo, Trolli, Marshmallow)", kat: "İşlenmiş Şekerleme", risk: "yuksek", organlar: ["Pankreas", "Bağışıklık", "Karaciğer"], etki: "Glikoz şurubu + jelatin + yapay renk (E102, E110, E129, E133) + aroma. Hiperaktivite, çürük.", kaynak: "Southampton 2007 · CSPI Food Dyes 2023 · WHO Şeker", alternatif: "Kuru meyve, doğal pestil" , arar: ["Jöleli Şekerleme", "Haribo", "Trolli", "Marshmallow"] },
 "LOLIPOP": { ad: "Lolipop / Sert Şekerleme (Chupa Chups, Ülker)", kat: "Şekerli Tatlı", risk: "yuksek", organlar: ["Diş", "Pankreas"], etki: "Saf şeker + glikoz şurubu + yapay aroma + renk. Diş çürüğü, çocuk obezite.", kaynak: "WHO Şeker · CSPI Candy", alternatif: "Doğal meyve, kuru meyve" , arar: ["Lolipop", "Sert Şekerleme", "Chupa Chups", "Ülker"] },
 "ÇIKLET SUKRALOZ": { ad: "Şekersiz Sakız (Sukraloz + Asesülfam)", kat: "Yapay Tatlandırılmış Sakız", risk: "yuksek", organlar: ["Bağırsak", "Bağışıklık"], etki: "Bağırsak floranı bozar. Yapay tatlandırıcılar tatlı isteğini artırır. 'Şekersiz' diye yanıltıcı.", kaynak: "Nature 2014 Suez · IARC 2023 Aspartam", alternatif: "Doğal mastik sakızı" , arar: ["Şekersiz Sakız", "Sukraloz + Asesülfam"] },
 "KAKAOLU SUREN": { ad: "Kakaolu Sürülebilir Krema (Nutella, Sarelle)", kat: "İşlenmiş Tatlı", risk: "kritik", organlar: ["Pankreas", "Karaciğer", "Kalp"], etki: "İlk içerik şeker, ikinci palmiye yağı (3-MCPD kontaminantı). Çocuk obezite, yağlı karaciğer.", kaynak: "EFSA 2016 3-MCPD · BMJ Open 2019 UPF · IARC 2A Glisidil Ester", alternatif: "Saf fındık ezmesi, kakao + tahin + hurma" , arar: ["Kakaolu Sürülebilir Krema", "Nutella", "Sarelle"] },
 "FINDIK KREMA": { ad: "Fındık Kreması (%13 Fındık + Palmiye + Şeker)", kat: "İşlenmiş Tatlı", risk: "kritik", organlar: ["Pankreas", "Karaciğer"], etki: "Reklamda fındık ön planda ama içeriğin sadece %13'ü. Geri kalan şeker + palmiye yağı + süt tozu.", kaynak: "Türkiye Gıda Kodeksi · CSPI · Greenpeace Palm Oil", alternatif: "Saf fındık ezmesi (%100 fındık)" , arar: ["Fındık Kreması"] },
 "FISTIK EZMESI ENDÜSTRI": { ad: "Endüstriyel Fıstık Ezmesi (Şeker + Hidrojenize Yağ)", kat: "İşlenmiş Yağ Ezmesi", risk: "yuksek", organlar: ["Kalp", "Pankreas"], etki: "Saf yer fıstığı yerine şeker + hidrojenize yağ (trans yağ) + tuz. Skippy, Peter Pan tarzı.", kaynak: "CSPI Peanut Butter · WHO Trans Fat 2023", alternatif: "%100 doğal fıstık ezmesi" , arar: ["Endüstriyel Fıstık Ezmesi", "Şeker + Hidrojenize Yağ"] },
 "MISIR GEVREĞI ŞEKERLI": { ad: "Şekerli Mısır Gevreği (Frosties, Cocopops, Çoco)", kat: "İşlenmiş Kahvaltılık", risk: "kritik", organlar: ["Pankreas", "Diş", "Beyin"], etki: "%37 şeker, BHT, BHA, renklendirici. 'Sağlıklı kahvaltı' yalanı. Kellogg's, Nestle çocuk hedefli.", kaynak: "CSPI Cereals · WHO Şeker · UK FSA", alternatif: "Yulaf ezmesi, sade müsli, ev yapımı" , arar: ["Şekerli Mısır Gevreği", "Frosties", "Cocopops", "Çoco"] },
 "MISIR GEVREĞI VITAMIN": { ad: "'Vitamin Eklenmiş' Kahvaltılık Gevrek", kat: "Pazarlama Yalanı", risk: "yuksek", organlar: ["Pankreas", "Karaciğer"], etki: "Vitaminler ürünü 'sağlıklı' göstermek için eklenir. Aslında şeker bombası. Coco Pops, Çoco Star.", kaynak: "Lancet 2019 UPF Monteiro · WHO Marketing to Children", alternatif: "Gerçek yulaf, çiğ tahıl, taze meyve" , arar: ["Vitamin Eklenmis Kahvaltilik", "Coco Pops", "Coco Star"] },
 "POPCORN MIKRODALGA": { ad: "Mikrodalga Mısır (PFOA Astar + Yapay Tereyağ)", kat: "İşlenmiş Kahvaltı/Atıştırmalık", risk: "kritik", organlar: ["Hormon", "Akciğer", "Kanser"], etki: "Paket astarı PFOA (3M, Teflon kimyasalı) ve diasetil ('popcorn akciğeri'). Yapay tereyağ aroması zararlı.", kaynak: "EWG PFAS · IARC PFOA Grup 2B · NIOSH Diasetil", alternatif: "Tencerede patlatılmış mısır + tereyağı" , arar: ["Mikrodalga Mısır", "PFOA Astar + Yapay Tereyağ"] },
 "DIASETIL TEREYAĞ": { ad: "Diasetil (Yapay Tereyağ Aroması)", kat: "Aroma", risk: "kritik", organlar: ["Akciğer", "Solunum"], etki: "'Popcorn akciğeri' (bronkiolitis obliterans). Mikrodalga mısır işçilerinde tespit edildi. Margarinde de var.", kaynak: "NIOSH 2016 Diasetil · OSHA · Lancet 2002", alternatif: "Gerçek tereyağı" , arar: ["Diasetil", "Yapay Tereyağ Aroması"] },
 "PUDIM SUTSUZ": { ad: "Hazır Sütlü Tatlı (Sade Süt + Modifiye Nişasta + E471)", kat: "İşlenmiş Tatlı", risk: "yuksek", organlar: ["Pankreas", "Bağırsak"], etki: "Danette, Activia, Sütaş hazır tatlılar. Gerçek süt %50, geri kalan nişasta + şeker + emülgatör + aroma.", kaynak: "Türkiye Gıda Kodeksi · CSPI Dairy", alternatif: "Ev sütlaç, gerçek tahin helvası" , arar: ["Hazır Sütlü Tatlı"] },
 "AROMALI YOĞURT": { ad: "Meyveli Yoğurt (Şeker + Aroma + Renklendirici)", kat: "İşlenmiş Süt Ürünü", risk: "yuksek", organlar: ["Pankreas", "Bağırsak"], etki: "Şeker bombası (100g'da 15g şeker). Gerçek meyve yok, aroma + renk + kıvamlandırıcı. Sütaş Çocuk, Danone Mini.", kaynak: "WHO Şeker · CSPI Yogurt", alternatif: "Sade yoğurt + taze meyve", arar: ["Meyveli Yogurt"] },
 "FROOT LOOPS": { ad: "Renkli Halka Gevrek (E102 + E110 + E129)", kat: "İşlenmiş Kahvaltılık", risk: "kritik", organlar: ["Sinir Sistemi", "Bağırsak"], etki: "Tüm Southampton 6'lı boya karışımı. Hiperaktivite, dikkat eksikliği. AB uyarı etiketi zorunlu.", kaynak: "Southampton 2007 · CSPI Food Dyes 2023 · AB Reg 1333/2008", alternatif: "Yulaf, sade müsli" , arar: ["Renkli Halka Gevrek", "E102+E110+E129"] },
 "MEYVELI ATIŞTIRMA": { ad: "Meyveli Bar / Atıştırmalık (Glikoz Şurubu + Yapay Aroma)", kat: "İşlenmiş Atıştırmalık", risk: "yuksek", organlar: ["Pankreas", "Diş"], etki: "'Meyveli' diye satılır ama gerçek meyve %5-10. Geri kalan şeker + aroma. Eti Form, Ülker Cocostar.", kaynak: "Türkiye Gıda Kodeksi · CSPI", alternatif: "Gerçek meyve, kuru meyve, ev yapımı bar" , arar: ["Meyveli Bar", "Atıştırmalık", "Glikoz Şurubu + Yapay Aroma"] },
 "KEK PAKET": { ad: "Hazır Kek (Pötibör, Halley, Hosby, Twix)", kat: "İşlenmiş Tatlı", risk: "yuksek", organlar: ["Pankreas", "Karaciğer", "Kalp"], etki: "Beyaz un + palmiye + glikoz + emülgatör + koruyucu. Aylarca raflarda durması için sentetik dolu.", kaynak: "BMJ 2019 UPF Monteiro · CSPI Cake", alternatif: "Ev keki, tam buğday" , arar: ["Hazır Kek", "Pötibör", "Halley", "Hosby", "Twix"] },
 "HAZIR PASTA": { ad: "Hazır Pasta (Margarin Kremalı)", kat: "İşlenmiş Tatlı", risk: "kritik", organlar: ["Kalp", "Damar", "Pankreas"], etki: "Süt kreması yerine margarin kreması (trans yağ kalıntısı). Yapay renk, aroma, koruyucu. Eti Cin Pasta, Ülker.", kaynak: "WHO Trans Fat 2023 · CSPI", alternatif: "Gerçek krema pastası, ev yapımı" , arar: ["Hazır Pasta", "Margarin Kremalı"] },
 "DONUTS PALMIYE": { ad: "Donut / Hamburger Ekmeği (Endüstriyel)", kat: "İşlenmiş Hamur İşi", risk: "yuksek", organlar: ["Pankreas", "Bağırsak", "Kalp"], etki: "Azodicarbonamide (E927a - AB yasak), L-sistein (insan saçı/tüy), palmiye yağı, koruyucular. Krispy Kreme, Burger King.", kaynak: "AB Reg 1129/2011 · CSPI Bread · Subway 2014 ADA Skandal", alternatif: "Tam buğday ekmeği, ev yapımı" , arar: ["Donut", "Hamburger Ekmeği", "Endüstriyel"] },
 "AZODIKARBONAMIDE": { ad: "Azodikarbonamid (E927a - Yoga Matı Kimyasalı)", kat: "Un İşleme", risk: "kritik", organlar: ["Solunum", "Bağışıklık", "Cilt"], etki: "AB, Avustralya, Singapur yasakladı. ABD'de hala kullanılıyor. 'Yoga matı kimyasalı' (yoga mat chemical). Subway 2014 çıkardı.", kaynak: "WHO 1999 ADA · AB Reg 1129/2011 · CSPI 2014 Subway", alternatif: "Doğal un, ev ekmeği" , arar: ["Azodikarbonamid", "E927a-YogaMatıKimyasalı"] },
 "BROMINE UN": { ad: "Potasyum Bromat (Un İşleme)", kat: "Un Oksidant", risk: "kritik", organlar: ["Böbrek", "Kanser"], etki: "IARC Grup 2B olası kanserojen. AB, Çin, Brezilya, Kanada yasakladı. ABD hala izinli. Endüstriyel pizza, hamburger ekmeği.", kaynak: "IARC Vol 73 · California Prop 65 · AB Reg", alternatif: "Bromsuz un (AB unu)" , arar: ["Potasyum Bromat", "Un İşleme"] },
 "L-SISTEIN SAÇ": { ad: "L-Sistein (İnsan Saçı/Ördek Tüyü)", kat: "Hamur Yumuşatıcı", risk: "orta", organlar: ["Bağışıklık"], etki: "Çoğu Çin saç salonlarından toplanan saçtan elde edilir. Helal/koşer/vegan değil. Hamburger ekmeği, pizza tabanı.", kaynak: "Vegetarian Society UK · TGK", alternatif: "Sentetik L-sistein, doğal hamur" , arar: ["Sistein", "İnsan Saçı/Ördek Tüyü"] },
 "MAKARNA HAZIR SOS": { ad: "Hazır Makarna Sosu (Knorr, Maggi)", kat: "İşlenmiş Çeşni", risk: "yuksek", organlar: ["Sinir Sistemi", "Tansiyon"], etki: "MSG, palmiye yağı, sodyum bombası, yapay aroma, modifiye nişasta. Tek pakette 5g tuz.", kaynak: "WHO Sodium 2015 · CSPI", alternatif: "Taze domates sosu, ev yapımı" , arar: ["Hazır Makarna Sosu", "Knorr", "Maggi"] },
 "INSTANT NOODLE": { ad: "Hazır Erişte (Indomie, Nissin Cup Noodles)", kat: "İşlenmiş Hazır Yemek", risk: "kritik", organlar: ["Kalp", "Tansiyon", "Bağırsak"], etki: "TBHQ + MSG + palmiye + 5g+ tuz + yapay aroma. Hindistan, Nepal kurşun kontaminasyonu nedeniyle yasakladı (2015).", kaynak: "India FSSAI 2015 Maggi · CSPI · WHO Sodium", alternatif: "Doğal erişte, ev makarna" , arar: ["Hazır Erişte", "Indomie", "Nissin Cup Noodles"] },
 "ŞEKERLEME MAVI 1": { ad: "Brilliant Blue (E133 - Mavi Şekerleme)", kat: "Sentetik Renklendirici", risk: "orta", organlar: ["Bağırsak", "Bağışıklık"], etki: "Hayvan çalışmalarında bağırsak emiliminde değişiklik. Mavi pasta süslemesi, mavi şekerleme, Slush Puppy.", kaynak: "EFSA 2010 E133 · CSPI Food Dyes 2023", alternatif: "Doğal mavi (spirulina)" , arar: ["Brilliant Blue", "E133-MaviŞekerleme"] },
 "SUCUK ENDÜSTRI": { ad: "Endüstriyel Sucuk (Pinar, Maret, Aytaç)", kat: "İşlenmiş Et", risk: "kritik", organlar: ["Mide", "Kolon", "Kalp", "Kanser"], etki: "Nitrit + nitrat + MSG + fosfat + sodyum + et fragmanları. IARC Grup 1 kanserojen. Kolon kanseri riski %18 artar.", kaynak: "IARC Vol 114 2018 · WHO 2015 İşlenmiş Et · Lancet 2019", alternatif: "Ev sucuğu, kurutulmuş et (nitritsiz)" , arar: ["Endüstriyel Sucuk", "Pinar", "Maret", "Aytaç"] },
 "SALAM PARÇA": { ad: "Salam (Mekanik Ayrılmış Et + Karışım)", kat: "İşlenmiş Et", risk: "kritik", organlar: ["Mide", "Bağırsak", "Kanser"], etki: "Tavuk + hindi + sığır karışımı. Kemik kalıntısı, nitrit, fosfat, soya proteini katkısı. IARC Grup 1.", kaynak: "IARC Vol 114 · WHO 2015 İşlenmiş Et · AB Reg 853/2004", alternatif: "Taze dilim et, ev kavurması" , arar: ["Salam", "Mekanik Ayrılmış Et + Karışım"] },
 "SOSIS HOT DOG": { ad: "Sosis / Hot Dog (Mekanik Ayrılmış Et)", kat: "İşlenmiş Et", risk: "kritik", organlar: ["Mide", "Kolon", "Kalp"], etki: "Tavuk kemik tozu + sığır parça + nitrit + fosfat + nişasta. Çocuklarda lösemi riski (Peters 1994).", kaynak: "IARC Vol 114 · Cancer Causes Control 1994 Peters · CSPI Hot Dogs", alternatif: "Ev köftesi, taze tavuk" , arar: ["Sosis", "Hot Dog", "Mekanik Ayrılmış Et"] },
 "JAMBON IŞLEM": { ad: "Jambon (Tütsülenmiş + Nitrit)", kat: "İşlenmiş Et", risk: "kritik", organlar: ["Mide", "Kolon", "Akciğer"], etki: "Nitrit + tütsü PAH + N-nitroso bileşikler. WHO/IARC Grup 1 kanserojen. Pinar, Maret jambonları.", kaynak: "IARC Vol 114 · IARC Vol 92 PAH · WHO 2015", alternatif: "Taze dilim hindi, ev kavurması" , arar: ["Jambon", "Tütsülenmiş + Nitrit"] },
 "PASTIRMA ENDUSTRI": { ad: "Endüstriyel Pastırma (Nitrit + Hızlı Kürleme)", kat: "İşlenmiş Et", risk: "yuksek", organlar: ["Mide", "Kalp"], etki: "Geleneksel pastırmadan farklı: nitritle hızlı yapılır. Yüksek tuz + kanserojen N-nitroso.", kaynak: "IARC Vol 114 · TGK Pastırma Tebliği", alternatif: "Geleneksel ev pastırması (nitritsiz)" , arar: ["Endüstriyel Pastırma", "Nitrit + Hızlı Kürleme"] },
 "HAZIR KÖFTE": { ad: "Hazır Köfte (Pinar, Banvit, Maret)", kat: "İşlenmiş Et", risk: "yuksek", organlar: ["Kalp", "Bağırsak", "Pankreas"], etki: "Beyaz un + soya proteini + MSG + fosfat + nişasta. %50 et bile değil. Çocuk menüsünde yaygın.", kaynak: "TGK Et Ürünleri Tebliği · CSPI", alternatif: "Kasap kıymadan ev köftesi" , arar: ["Hazır Köfte", "Pinar", "Banvit", "Maret"] },
 "TAVUK NUGGET": { ad: "Tavuk Nugget (McDonald's, Burger King, Banvit)", kat: "İşlenmiş Et", risk: "kritik", organlar: ["Kalp", "Karaciğer", "Bağırsak"], etki: "Sadece %50 tavuk. Geri kalan kemik, deri, yağ, un, nişasta, TBHQ, dimetilpolisiloksan (silikon).", kaynak: "Am J Med 2013 deShazo · CSPI · FDA Tavuk Nugget", alternatif: "Ev tavuk şinitzeli (göğüs eti)" , arar: ["TAVUK"] },
 "ŞINITZEL HAZIR": { ad: "Hazır Şinitzel / Krokan (Donmuş)", kat: "İşlenmiş Et", risk: "yuksek", organlar: ["Kalp", "Karaciğer"], etki: "Soya proteini + nişasta + sodyum fosfat + galeta + palmiye yağı. Düşük et oranı.", kaynak: "TGK · CSPI", alternatif: "Taze tavuk göğsü, evde panele" , arar: ["Hazır Şinitzel", "Krokan", "Donmuş"] },
 "DÖNER ENDÜSTRI": { ad: "Endüstriyel Döner Eti (Karışık + Soya)", kat: "İşlenmiş Et", risk: "yuksek", organlar: ["Kalp", "Bağırsak", "Kanser"], etki: "Karma et + soya proteini + tavuk derisi + fosfat + MSG + tütsü aroması. Akşam şişe yapışan yağda kızarır.", kaynak: "TGK Et Ürünleri · IARC PAH", alternatif: "Geleneksel kuzu/dana döner, taze pişirme" , arar: ["Endüstriyel Döner Eti", "Karışık + Soya"] },
 "TAVUK DÖNER ENJEKSIYON": { ad: "Enjeksiyonlu Tavuk Döner (Su + Fosfat + Tuz)", kat: "İşlenmiş Et", risk: "yuksek", organlar: ["Böbrek", "Tansiyon", "Kalp"], etki: "Eti şişirmek için %30 su + fosfat + tuz enjekte edilir. Müşteri suya para öder. AB sınır koydu.", kaynak: "AB Reg 853/2004 · CSPI Phosphate · J Ren Nutr 2014", alternatif: "Bütün tavuk, kasaptan göğüs" , arar: ["Enjeksiyonlu Tavuk Döner", "Su + Fosfat + Tuz"] },
 "TANDIR HAZIR": { ad: "Hazır Tandır Eti (Aytaç, Pinar)", kat: "İşlenmiş Et", risk: "orta", organlar: ["Kalp", "Bağırsak"], etki: "Tandır diye satılan paketli et. Su + fosfat + tütsü aroması + koruyucu eklenebilir.", kaynak: "TGK · CSPI", alternatif: "Ev tandırı, gerçek fırınlanmış kuzu" , arar: ["Hazır Tandır Eti", "Aytaç", "Pinar"] },
 "BACON ENDÜSTRI": { ad: "Bacon / Domuz Pastırması (Nitrit + Tütsü)", kat: "İşlenmiş Et", risk: "kritik", organlar: ["Mide", "Kolon", "Kanser"], etki: "Tek dilim WHO IARC Grup 1 kanserojen. Nitrit + tütsü PAH + sodyum. Türkiye'de yasak ama tartışmalı.", kaynak: "IARC Vol 114 · WHO 2015", alternatif: "Hindi bacon (nitritsiz)" , arar: ["Bacon", "Domuz Pastırması", "Nitrit + Tütsü"] },
 "RIBLET BBQ HAZIR": { ad: "Hazır BBQ Riblet / Kostela (Marinasyonlu)", kat: "İşlenmiş Et", risk: "yuksek", organlar: ["Pankreas", "Kanser", "Kalp"], etki: "Yüksek şeker (BBQ sos), PAH (tütsü), HCA (yanmış et), MSG. Çift kanserojen risk.", kaynak: "IARC PAH · IARC HCA · CSPI", alternatif: "Taze et, marinasyon yok mangal" , arar: ["Hazır BBQ Riblet", "Kostela", "Marinasyonlu"] },
 "TAVUK ÇIĞ KOL": { ad: "Endüstriyel Çiğ Tavuk (Klor Banyosu)", kat: "İşlenmiş Tavuk", risk: "yuksek", organlar: ["Bağırsak", "Bağışıklık"], etki: "ABD'de klor + peroksit banyosu (AB yasak). Türkiye'de antibiyotik kalıntısı sorunu. Banvit, Şeker.", kaynak: "AB 2013 Klorlu Tavuk · EFSA 2021 Tavuk · Greenpeace", alternatif: "Köy tavuğu, organik, antibiyotik-free" , arar: ["Endüstriyel Çiğ Tavuk", "Klor Banyosu"] },
 "TAVUK HORMON": { ad: "Hormonlu Tavuk (Hızlı Büyütme)", kat: "İşlem Yan Ürünü", risk: "yuksek", organlar: ["Hormon", "Üreme"], etki: "Türkiye'de hormon enjeksiyon yasak ama yem üzerinden geçiş var. AB izinli antibiyotikler östrojen etkili.", kaynak: "AB Direktifi 96/22 · Türkiye Tarım Bakanlığı 2018", alternatif: "Yumurta tavuğu, köy tavuğu" , arar: ["Hormonlu Tavuk", "Hızlı Büyütme"] },
 "TAVUK ANTIBIYOTIK": { ad: "Antibiyotik Kalıntılı Tavuk (Yem)", kat: "Veteriner İlaç", risk: "kritik", organlar: ["Bağışıklık", "Antibiyotik Direnci"], etki: "Endüstriyel tavuk üretimi antibiyotik yem kullanır. Antibiyotik direnci, bağırsak florası yok olur. WHO acil sorun.", kaynak: "WHO 2021 AMR · EFSA 2022 AMR · Greenpeace", alternatif: "Organik tavuk, antibiyotik-free etiketli" , arar: ["Antibiyotik Kalıntılı Tavuk", "Yem"] },
 "TURKEY HINDI HAZIR": { ad: "Hazır Hindi Dilimi (Pinar, Maret)", kat: "İşlenmiş Et", risk: "yuksek", organlar: ["Mide", "Kolon"], etki: "Hindi + nitrit + fosfat + dekstroz + soya proteini + karagenan. 'Sağlıklı' diye yanıltıcı.", kaynak: "IARC Vol 114 · CSPI Lunch Meat", alternatif: "Taze hindi göğsü, evde pişirme" , arar: ["Hazır Hindi Dilimi", "Pinar", "Maret"] },
 "ET KONSERVE": { ad: "Et Konservesi (Konserveye Konmuş Et)", kat: "İşlenmiş Et", risk: "yuksek", organlar: ["Kalp", "Bağırsak"], etki: "Yüksek sodyum, BPA kutu astarı, mekanik et, fosfat. Spam, corned beef.", kaynak: "EFSA 2023 BPA · WHO İşlenmiş Et · CSPI", alternatif: "Taze et, ev konservesi (cam)" , arar: ["Et Konservesi", "Konserveye Konmuş Et"] },
 "TON BALIĞI MERCURY": { ad: "Ton Balığı Konservesi (Civa Kontaminasyonu)", kat: "Ağır Metal Kontaminasyonu", risk: "kritik", organlar: ["Beyin", "Sinir Sistemi", "Üreme"], etki: "Civa metilcıva birikimi (büyük balık). Hamilelerde fetüs beyin gelişimi. FDA hamilelere haftada 1'den fazla yasak.", kaynak: "FDA 2021 Fish Advisory · WHO Civa · EWG Mercury", alternatif: "Küçük balık (hamsi, sardalye, ringa)" , arar: ["Ton Balığı Konservesi", "Civa Kontaminasyonu"] },
 "SOMON ÇIFTLIK": { ad: "Çiftlik Somonu (Pestisit + Boya + Yem)", kat: "Çiftlik Balığı", risk: "yuksek", organlar: ["Karaciğer", "Hormon", "Bağışıklık"], etki: "Yapay pembe rengi (kantaksantin E161g - AB sınırladı). PCB, dioksin yüksek. Yem antibiyotik içerir.", kaynak: "Science 2004 Hites · EFSA 2014 Kantaksantin · Greenpeace", alternatif: "Yabani somon, hamsi, sardalye" , arar: ["Çiftlik Somonu", "Pestisit + Boya + Yem"] },
 "BALIK ÇIFTLIK ANTIBIYOTIK": { ad: "Çiftlik Balığı (Antibiyotik + Pestisit)", kat: "Çiftlik Balığı", risk: "yuksek", organlar: ["Bağışıklık", "Karaciğer"], etki: "Çipura, levrek, alabalık. Yem üzerinden antibiyotik, denizde pestisit (deniz biti için).", kaynak: "WHO AMR Aquaculture · Greenpeace 2020 Aquaculture", alternatif: "Yabani balık, hamsi, sardalye" , arar: ["Çiftlik Balığı", "Antibiyotik + Pestisit"] },
 "SURIMI YAPAY": { ad: "Surimi / Yengeç Çubuğu (Beyaz Balık Tozu)", kat: "İşlenmiş Balık", risk: "orta", organlar: ["Bağırsak", "Bağışıklık"], etki: "Aslında yengeç yok. Beyaz balık tozu + nişasta + şeker + MSG + sorbitol + renklendirici (E160c).", kaynak: "FAO Codex · CSPI", alternatif: "Gerçek yengeç, deniz ürünü" , arar: ["Surimi", "Yengeç Çubuğu", "Beyaz Balık Tozu"] },
 "MARGARIN KAHVALTI": { ad: "Kahvaltılık Margarin (Becel, Sana, Ülker)", kat: "İşlenmiş Yağ", risk: "yuksek", organlar: ["Kalp", "Damar", "Bağırsak"], etki: "Bitkisel yağ + emülgatör + renk + aroma + koruyucu. Etikette 'kalbe iyi' yalanı (bilimsel kanıt yok).", kaynak: "WHO Trans Fat · Lancet 2003 Mozaffarian · CSPI", alternatif: "Tereyağı, zeytinyağı, avokado", arar: ["Margarin", "Margarine"] },
 "KAYMAK ENDÜSTRI": { ad: "Endüstriyel Kaymak (Süt Yağı Karışık)", kat: "İşlenmiş Süt", risk: "orta", organlar: ["Kalp", "Karaciğer"], etki: "Saf süt kaymağı değil. Süt tozu + krema + bitkisel yağ + stabilizör (E407, E412).", kaynak: "TGK Kaymak Tebliği · CSPI", alternatif: "Gerçek manda kaymağı, çiğ süt kaymağı" , arar: ["Endüstriyel Kaymak", "Süt Yağı Karışık"] },
 "BEYAZ PEYNIR FOSFAT": { ad: "Endüstriyel Beyaz Peynir (Fosfat + Sitrat)", kat: "İşlenmiş Peynir", risk: "orta", organlar: ["Böbrek", "Bağırsak"], etki: "Maya yerine peynir mayası tozu + sitrat + fosfat + koruyucu. Pinar, Sütaş, Sek paketli beyaz peynir.", kaynak: "TGK Peynir Tebliği · EFSA 2019 Fosfatlar", alternatif: "Ev yapımı peynir, mandıra peyniri" , arar: ["Endüstriyel Beyaz Peynir", "Fosfat + Sitrat"] },
 "KASAR PEYNIR ANALOG": { ad: "Kaşar Benzeri Peynir (Bitkisel Yağ + Kazein)", kat: "Analog Peynir", risk: "yuksek", organlar: ["Kalp", "Karaciğer"], etki: "Süt yerine palmiye + kazein + nişasta. Pizza, döner, hamburger ile satılır. 'Eritme peynir' etiketi.", kaynak: "TGK · EFSA Analog Peynir", alternatif: "Gerçek kaşar peyniri" , arar: ["Kaşar Benzeri Peynir", "Bitkisel Yağ + Kazein"] },
 "KREM PEYNIR ENDÜSTRI": { ad: "Krem Peynir (Karra + E471 + Süt Tozu)", kat: "İşlenmiş Peynir", risk: "orta", organlar: ["Bağırsak"], etki: "Philadelphia, Sütaş, Pinar krem peynir. Karragenan + emülgatör + süt tozu + koruyucu.", kaynak: "EFSA 2014 Karragenan · CSPI", alternatif: "Ev yapımı labne, süzme yoğurt" , arar: ["Krem Peynir", "Karra + E471 + Süt Tozu"] },
 "ERITME PEYNIR": { ad: "Eritilmiş Üçgen Peynir (E450 + Bitkisel Yağ)", kat: "İşlenmiş Peynir", risk: "yuksek", organlar: ["Böbrek", "Kalp", "Bağırsak"], etki: "İnek peyniri %30, geri kalan palmiye + emülgatör tuz (E450/E452) + süt tozu. Çocuk kahvaltısında yaygın.", kaynak: "EFSA 2019 Fosfatlar · CSPI · TGK", alternatif: "Taze beyaz peynir, ev lor" , arar: ["Eritilmiş Üçgen Peynir", "E450+BitkiselYağ"] },
 "AYRAN ENDÜSTRI": { ad: "Endüstriyel Ayran (Süt Tozu + Stabilizör)", kat: "İşlenmiş Süt", risk: "orta", organlar: ["Bağırsak"], etki: "Taze yoğurttan değil, süt tozundan. Karagenan, MGP, koruyucu eklenmiş. Pinar, Sütaş, Sek.", kaynak: "TGK Ayran Tebliği · EFSA Karra", alternatif: "Ev ayranı (yoğurt + su + tuz)" , arar: ["Endüstriyel Ayran", "Süt Tozu + Stabilizör"] },
 "MEYVELI SUT": { ad: "Çikolatalı/Meyveli Süt (Sütaş, Pinar Bambino)", kat: "Şekerli Süt", risk: "yuksek", organlar: ["Pankreas", "Diş"], etki: "200ml kutuda 20g şeker (5 küp). Yapay aroma, renk, karragenan. Çocuk obezitesi.", kaynak: "WHO Şeker · AAP 2017 Çocuk İçecek", alternatif: "Sade süt + kakao tozu, kuru hurma" , arar: ["Çikolatalı", "Meyveli Süt", "Sütaş", "Pinar Bambino"] },
 "PUDING TOZ": { ad: "Hazır Puding Toz (Dr.Oetker, Ülker)", kat: "İşlenmiş Toz", risk: "yuksek", organlar: ["Pankreas", "Karaciğer"], etki: "Mısır nişastası + şeker + yapay aroma + renk (E102, E110) + vanilin. Çocuk hiperaktivite.", kaynak: "Southampton 2007 · CSPI Food Dyes 2023", alternatif: "Ev sütlaç, hindistan cevizi sütü pudingi" , arar: ["Hazır Puding Toz", "Dr.Oetker", "Ülker"] },
 "JÖLE TOZ": { ad: "Hazır Jöle Toz (Dr.Oetker)", kat: "İşlenmiş Toz", risk: "yuksek", organlar: ["Pankreas", "Bağışıklık"], etki: "Jelatin + şeker + sitrik asit + yapay renk (E122, E129, E110) + aroma. Çocuk hiperaktivite paketi.", kaynak: "Southampton 2007 · EFSA 2009", alternatif: "Agar agar + meyve, ev jölesi" , arar: ["Hazır Jöle Toz", "Dr.Oetker"] },
 "DONUKLAŞTIRICI E466": { ad: "Karboksimetil Selüloz (E466 - Hazır Krema)", kat: "Stabilizör", risk: "orta", organlar: ["Bağırsak"], etki: "Hazır krema, soslar, dondurma. Bağırsak mukozasını inceltir.", kaynak: "Nature 2015 Chassaing · Gastroenterology 2021", alternatif: "Gerçek krema, taze süt" , arar: ["Karboksimetil Selüloz", "E466-HazırKrema"] },
 "RAVOLI HAZIR": { ad: "Hazır Mantı / Ravoli (Donmuş)", kat: "İşlenmiş Hamur", risk: "yuksek", organlar: ["Kalp", "Bağırsak", "Pankreas"], etki: "Tavuk veya sığır karışık et + soya proteini + nişasta + MSG. Düşük et oranı.", kaynak: "TGK · CSPI", alternatif: "Ev mantısı, taze hamur" , arar: ["Hazır Mantı", "Ravoli", "Donmuş"] },
 "PIZZA DONMUŞ": { ad: "Donmuş Pizza (Eti Cin, Banvit, Margherita)", kat: "İşlenmiş Gıda", risk: "kritik", organlar: ["Kalp", "Tansiyon", "Pankreas"], etki: "Analog peynir + işlenmiş et + sodyum bombası + palmiye + koruyucu. Tek dilimde 2g tuz.", kaynak: "WHO Sodium · CSPI Pizza", alternatif: "Ev pizzası, taze sebze" , arar: ["Donmuş Pizza", "Eti Cin", "Banvit", "Margherita"] },
 "BURGER PATTY": { ad: "Donmuş Hamburger Köftesi", kat: "İşlenmiş Et", risk: "yuksek", organlar: ["Kalp", "Bağırsak", "Karaciğer"], etki: "Karışık et + soya proteini + tuz + fosfat + 'doğal aroma'. Yağ oranı yüksek (%30+).", kaynak: "TGK · CSPI Burger", alternatif: "Kasaptan kıyma, ev köftesi" , arar: ["Donmuş Hamburger Köftesi"] },
 "PATATES KIZARTMA DONMUŞ": { ad: "Donmuş Patates Kızartması (McCain, Findus)", kat: "İşlenmiş Patates", risk: "yuksek", organlar: ["Kalp", "Pankreas", "Kanser"], etki: "Patates + palmiye yağı (ön kızartılmış) + tuz + dekstroz + sodyum asit pirofosfat (renk koruyucu).", kaynak: "EFSA Akrilamid · WHO · CSPI", alternatif: "Taze patates, fırın orta ısı" , arar: ["Donmuş Patates Kızartması", "McCain", "Findus"] },
 "DONMUŞ SEBZE SOS": { ad: "Donmuş Sebze (Soslu - Findus, Berraka)", kat: "İşlenmiş Sebze", risk: "yuksek", organlar: ["Tansiyon", "Bağırsak"], etki: "Sebze + tereyağı/krema yerine margarin + MSG + bouillon kübü + nişasta.", kaynak: "TGK · CSPI", alternatif: "Taze veya sade donmuş sebze" , arar: ["Donmuş Sebze", "Soslu - Findus", "Berraka"] },
 "CORBA INSTANT": { ad: "Hazır Çorba (Knorr, Maggi, Yayla)", kat: "İşlenmiş Toz", risk: "yuksek", organlar: ["Tansiyon", "Sinir Sistemi"], etki: "MSG + tuz (5g/paket) + nişasta + palmiye + yapay aroma + dehidrate ucuz sebze. WHO günlük tuz limit aşımı.", kaynak: "WHO Sodium · CSPI Soup · EFSA MSG", alternatif: "Ev çorbası, taze sebze" , arar: ["Hazır Çorba", "Knorr", "Maggi", "Yayla"] },
 "BOUILLON KÜP": { ad: "Bulyon Tableti (Knorr, Maggi)", kat: "İşlenmiş Tat", risk: "kritik", organlar: ["Tansiyon", "Sinir Sistemi", "Karaciğer"], etki: "MSG + tuz + palmiye + nişasta + et aroması. Gerçek et %1-2. Tek küpte 1g tuz.", kaynak: "WHO Sodium 2015 · CSPI", alternatif: "Ev tavuk suyu, ev et suyu" , arar: ["Bulyon Tableti", "Knorr", "Maggi"] },
 "MAYONEZ DOLGU": { ad: "Hafif Mayonez (Soya Yağı + EDTA + Şeker)", kat: "İşlenmiş Sos", risk: "yuksek", organlar: ["Kalp", "Karaciğer"], etki: "'Light' diye satılır ama nişasta + şeker + EDTA eklenir. Calve Hafif, Hellmann's Light.", kaynak: "EFSA EDTA · CSPI · WHO", alternatif: "Ev mayonezi, yoğurt sos" , arar: ["Hafif Mayonez", "Soya Yağı + EDTA + Şeker"] },
 "HARDAL ENDÜSTRI": { ad: "Endüstriyel Hardal (Sirke + Sarı 5 + Sodyum)", kat: "İşlenmiş Sos", risk: "orta", organlar: ["Mide", "Bağırsak"], etki: "Tartrazin (E102) ile sarı renk verilir. Sirke + tuz + glikoz. Çocuk hiperaktivite.", kaynak: "Southampton 2007 · CSPI", alternatif: "Gerçek hardal tohumu, ev yapımı" , arar: ["Endüstriyel Hardal", "Sirke + Sarı 5 + Sodyum"] },
 "TURŞU ENDÜSTRI": { ad: "Endüstriyel Turşu (Tartrazin + Benzoat)", kat: "İşlenmiş Sos", risk: "yuksek", organlar: ["Sinir Sistemi", "Mide"], etki: "Fermantasyon yerine sirke + tuz + sodyum benzoat + E102 sarı renk. Faydalı bakteri yok.", kaynak: "EFSA 2016 Benzoat · CSPI", alternatif: "Ev turşusu (gerçek fermente)" , arar: ["Endüstriyel Turşu", "Tartrazin + Benzoat"] },
 "ZEYTIN ZEYTIN YAĞSIZ": { ad: "Endüstriyel Zeytin (Demir Glukonat + NaOH)", kat: "İşlenmiş Zeytin", risk: "orta", organlar: ["Bağırsak"], etki: "Sodyum hidroksit (kostik) ile acılığı gider, demir glukonat (E579) ile siyahlatır. Yeşil zeytin kimyasal işlemli.", kaynak: "EFSA 2018 Demir Glukonat · CSPI", alternatif: "Salamura zeytin (geleneksel)" , arar: ["Endüstriyel Zeytin", "Demir Glukonat + NaOH"] },
 "TARHANA HAZIR": { ad: "Hazır Tarhana Çorbası (Tat Artırıcı)", kat: "İşlenmiş Toz", risk: "orta", organlar: ["Tansiyon", "Bağırsak"], etki: "Gerçek tarhana değil. MSG + nişasta + sebze tozu + tuz + bouillon.", kaynak: "TGK Tarhana Tebliği · CSPI", alternatif: "Ev tarhanası (geleneksel)" , arar: ["Hazır Tarhana Çorbası", "Tat Artırıcı"] },
 "ÇORBA KREMA": { ad: "Krem Çorbalar (Knorr, Yayla)", kat: "İşlenmiş Toz", risk: "yuksek", organlar: ["Kalp", "Bağırsak"], etki: "Krema yerine palmiye + süt tozu + emülgatör. MSG, nişasta, koruyucu. Tek pakette 5g tuz.", kaynak: "WHO · CSPI · EFSA", alternatif: "Ev kabak/brokoli çorbası" , arar: ["Krem Çorbalar", "Knorr", "Yayla"] },
 "REÇEL ENDÜSTRI": { ad: "Endüstriyel Reçel (HFCS + Pektin + Sodyum Benzoat)", kat: "Şekerli Reçel", risk: "yuksek", organlar: ["Pankreas", "Diş", "Sinir Sistemi"], etki: "%60+ şeker (HFCS), gerçek meyve %30, koruyucu sodyum benzoat. Tamek, Dimes, Şenpiliç.", kaynak: "WHO Şeker · CSPI Jam", alternatif: "Ev reçeli, az şekerli, taze meyve" , arar: ["Endüstriyel Reçel", "HFCS + Pektin + Sodyum Benzoat"] },
 "BAL FRUKTOZ": { ad: "Karışık / Sahte Bal (Fruktoz Şurubu Eklemeli)", kat: "Sahte Bal", risk: "yuksek", organlar: ["Pankreas", "Karaciğer"], etki: "Gerçek bal yerine glukoz/fruktoz şurubu karıştırılmış. Türkiye balda hile sorunu yüksek.", kaynak: "TGK Bal Tebliği · Türk Patent Bal Hile Raporu", alternatif: "Sertifikalı organik bal, kovan testi" , arar: ["Karışık", "Sahte Bal", "Fruktoz Şurubu Eklemeli"] },
 "GLIFOSAT BUGDAY": { ad: "Glifosat (Buğday, Yulaf Kalıntısı)", kat: "Herbisit", risk: "kritik", organlar: ["Karaciğer", "Bağırsak", "Kanser"], etki: "IARC Grup 2A olası kanserojen. Roundup. Hasat öncesi kurutucu olarak buğday/yulafa püskürtülür. Çocuk maması ve gevreklerde tespit.", kaynak: "IARC Vol 112 2015 · EWG 2018 Glifosat · Bayer Davalar", alternatif: "Organik buğday, organik yulaf" , arar: ["Glifosat", "Buğday", "Yulaf Kalıntısı"] },
 "KLORPIRIFOS MEYVE": { ad: "Klorpirifos (Meyve/Sebze Pestisiti)", kat: "Pestisit (Organofosfat)", risk: "kritik", organlar: ["Sinir Sistemi", "Beyin", "Üreme"], etki: "Çocuk beyin gelişimini bozar (otizm, IQ kaybı). EPA 2021 yasakladı, AB 2020 yasakladı. Türkiye sınırlı izinli.", kaynak: "EPA 2021 Klorpirifos Yasak · AB Reg 2020/18 · Lancet 2013 Engel", alternatif: "Organik meyve sebze, EWG Clean 15" , arar: ["Klorpirifos", "Meyve/Sebze Pestisiti"] },
 "NEONIKOTINOID": { ad: "Neonikotinoidler (Imidakloprid - Sebze)", kat: "Pestisit (Sistemik)", risk: "kritik", organlar: ["Sinir Sistemi", "Bağışıklık"], etki: "Arı katliamına yol açar. İnsanda nikotin reseptörlerini etkiler. Çocuk gelişim bozukluğu. AB 2018 dış mekan yasak.", kaynak: "AB Reg 2018/783 · EFSA 2017 Neonikotinoid · Bee Decline", alternatif: "Organik, pestisitsiz tarım" , arar: ["Neonikotinoidler", "Imidakloprid - Sebze"] },
 "PARAQUAT": { ad: "Parakuat (Tarım İlacı)", kat: "Pestisit", risk: "kritik", organlar: ["Akciğer", "Sinir Sistemi", "Beyin"], etki: "Parkinson hastalığı ile güçlü bağlantı. AB, Çin, Brezilya yasakladı. ABD hala izinli. Türkiye sınırlı.", kaynak: "Environ Health Perspect 2011 Parkinson · AB Reg 2007", alternatif: "Organik tarım ürünleri" , arar: ["Parakuat", "Tarım İlacı"] },
 "ATRAZINE": { ad: "Atrazin (Mısır Pestisiti)", kat: "Herbisit", risk: "kritik", organlar: ["Hormon", "Üreme", "Doğum Kusuru"], etki: "Hormon bozucu. Erkek kurbağaları dişiye çevirir (Hayes 2010). AB 2004 yasakladı. ABD'de mısırda kullanılıyor.", kaynak: "PNAS 2010 Hayes · AB Reg 2004 · EWG Atrazin", alternatif: "AB menşeli mısır, organik mısır" , arar: ["Atrazin", "Mısır Pestisiti"] },
 "PFOA MEYVE SUYU": { ad: "PFAS Kontaminantı (Suya, Gıdaya Geçen)", kat: "Çevresel Kirlilik", risk: "kritik", organlar: ["Hormon", "Karaciğer", "Bağışıklık", "Kanser"], etki: "'Sonsuz kimyasallar' - parçalanmaz. Tüm dünyada içme suyu ve gıdada tespit. IARC PFOA Grup 2B. Çocuk gelişimini bozar.", kaynak: "IARC Vol 110 PFOA · EWG PFAS Map · EPA 2024 PFAS Sınır", alternatif: "Filtreli su, organik gıda" , arar: ["PFAS Kontaminantı", "Suya", "Gıdaya Geçen"] },
 "BENZIN MEYVE BAL": { ad: "Bal/Reçelde Çevresel PAH (Trafik/Sanayi)", kat: "Çevresel Toksin", risk: "yuksek", organlar: ["Kanser", "Karaciğer"], etki: "Şehir merkezinde üretilen bal ve reçeller PAH (kanserojen) kontaminasyonu. EFSA AB sınır koydu.", kaynak: "EFSA 2008 PAH · IARC Vol 92", alternatif: "Kırsal organik bal, dağ balı" , arar: ["Bal", "Reçelde Çevresel PAH", "Trafik/Sanayi"] },
 "KADMIYUM KAKAO": { ad: "Kadmiyum (Çikolata, Kakao Kalıntısı)", kat: "Ağır Metal", risk: "yuksek", organlar: ["Böbrek", "Kemik", "Kanser"], etki: "Latin Amerika kakao toprağında doğal yüksek. AB 2019'da çikolata için sınır koydu. IARC Grup 1.", kaynak: "IARC Vol 100C · AB Reg 488/2014 · Consumer Reports 2017 Çikolata", alternatif: "Afrika kakaolu çikolata, düşük kadmiyumlu marka" , arar: ["Kadmiyum", "Çikolata", "Kakao Kalıntısı"] },
 "KURŞUN BAHARAT": { ad: "Kurşun (Baharat, Köri, Zerdeçal)", kat: "Ağır Metal", risk: "kritik", organlar: ["Beyin", "Kemik", "Böbrek"], etki: "Hindistan/Bangladeş baharatlarına ucuz boyama için kurşun kromat eklenir. Çocuk IQ düşüşü.", kaynak: "Consumer Reports 2021 Baharat · FDA Closer to Zero", alternatif: "Türk üretim baharat, test sertifikalı" , arar: ["Kurşun", "Baharat", "Köri", "Zerdeçal"] },
 "ARSENIK PIRINÇ": { ad: "Arsenik (Pirinç Kalıntısı)", kat: "Ağır Metal", risk: "kritik", organlar: ["Kanser", "Cilt", "Sinir"], etki: "Pirinç su altında yetişir, topraktan arsenik çeker. Esmer pirinçte daha yüksek. Bebek mamasında tehlike. IARC Grup 1.", kaynak: "FDA 2023 Pirinç · WHO Arsenik · Consumer Reports 2014", alternatif: "Bulgur, kinoa, makarna, basmati pirinç" , arar: ["Arsenik", "Pirinç Kalıntısı"] },
 "MEYVE MUM": { ad: "Meyve Yüzeyi Mum/Vaks (E901, E902)", kat: "Kaplama", risk: "orta", organlar: ["Bağırsak"], etki: "Petrol türevi mum (E905). Elma, narenciye, salatalık parlaklık verilir. Yıkanmaz, ovulması gerek.", kaynak: "EFSA 2012 Mum · CSPI", alternatif: "Organik (mumsuz), yıkayıp ovma" , arar: ["Meyve Yüzeyi Mum", "Vaks", "E901", "E902"] },
 "MEYVE ETHYLENE": { ad: "Etilen Gazı (Yapay Olgunlaştırıcı)", kat: "Olgunlaştırıcı", risk: "orta", organlar: ["Bağışıklık"], etki: "Muz, domates, mango yeşilken toplanır, gazla olgunlaştırılır. Tat ve besin değeri düşük.", kaynak: "FDA Etilen · USDA · Greenpeace", alternatif: "Mevsiminde, dalında olgunlaşmış meyve" , arar: ["Etilen Gazı", "Yapay Olgunlaştırıcı"] },
 "MEYVE FUNGISIT": { ad: "Meyve Fungisitleri (Imazalil, Thiabendazol)", kat: "Fungisit", risk: "yuksek", organlar: ["Karaciğer", "Hormon", "Üreme"], etki: "Narenciye, muz, elma kabuğunda. EPA reproductive risk işaretledi. AB sınırlı izinli.", kaynak: "US EPA · EFSA 2016 Fungisitler · EWG", alternatif: "Organik narenciye, soyma, ovma" , arar: ["Meyve Fungisitleri", "Imazalil", "Thiabendazol"] },
 "GDO MISIR": { ad: "GDO Mısır (Bt Toksin + Glifosat Direnci)", kat: "Genetiği Değiştirilmiş", risk: "yuksek", organlar: ["Bağışıklık", "Bağırsak"], etki: "Türkiye 2010'da gıdada yasakladı, yemde izin verdi. Hayvan ürünleri (et, süt, yumurta) üzerinden geçiş.", kaynak: "Türkiye Biyogüvenlik 2010 · Greenpeace GDO · EFSA GDO", alternatif: "Organik mısır, GDO-free etiketli" , arar: ["GDO Mısır", "Bt Toksin + Glifosat Direnci"] },
 "GDO SOYA": { ad: "GDO Soya (Glifosata Dirençli)", kat: "Genetiği Değiştirilmiş", risk: "yuksek", organlar: ["Hormon", "Bağışıklık"], etki: "Dünya soya üretiminin %94'ü GDO. Yüksek glifosat kalıntısı. Hayvan yemi, soya yağı, lesitin (E322).", kaynak: "ISAAA 2023 GDO · IARC Glifosat · Greenpeace", alternatif: "Organik soya, GDO-free etiketli" , arar: ["GDO Soya", "Glifosata Dirençli"] },
 "GDO PAMUK YAĞI": { ad: "GDO Pamuk Yağı (Bt Toksin)", kat: "GDO Yağ", risk: "yuksek", organlar: ["Bağışıklık", "Hormon"], etki: "ABD pamuk %95 GDO. Margarin, kek karışımı, kraker, hazır gıdalarda 'bitkisel yağ' diye geçer.", kaynak: "USDA GMO Cotton · Greenpeace", alternatif: "Zeytinyağı, soğuk sıkım" , arar: ["GDO Pamuk Yağı", "Bt Toksin"] },
 "AFLATOKSIN FISTIK": { ad: "Aflatoksin (Fıstık, Antep Fıstık, Kuru Meyve)", kat: "Mikotoksin", risk: "kritik", organlar: ["Karaciğer", "Kanser"], etki: "IARC Grup 1 karaciğer kanserojeni. Küflü fıstık, mısır, baharat. Türkiye'de iklim nedeniyle yüksek risk.", kaynak: "IARC Vol 100F · EFSA 2020 Aflatoksin · FDA", alternatif: "Hava aldırılmış, kuru depolama, test sertifikalı" , arar: ["Aflatoksin", "Fıstık", "Antep Fıstık", "Kuru Meyve"] },
 "OKRATOKSIN KAHVE": { ad: "Okratoksin A (Kahve, Şarap, Tahıl)", kat: "Mikotoksin", risk: "kritik", organlar: ["Böbrek", "Kanser"], etki: "IARC Grup 2B olası kanserojen. Küflü tahıl ve baharatlarda. AB sınır koydu.", kaynak: "IARC Vol 56 · EFSA 2020 OTA · AB Reg 1881/2006", alternatif: "Kalite kontrollü kahve, az küflü tahıl" , arar: ["Okratoksin A", "Kahve", "Şarap", "Tahıl"] },
 "ZEARALENON MISIR": { ad: "Zearalenon (Mısır, Tahıl Küfü)", kat: "Mikotoksin", risk: "yuksek", organlar: ["Hormon", "Üreme"], etki: "Östrojen taklidi mikotoksin. Çocuk erken ergenlik bağlantısı. Mısır, buğday, arpa.", kaynak: "EFSA 2017 Zearalenon · WHO", alternatif: "Kalite kontrollü tahıl, kuru depolama" , arar: ["Zearalenon", "Mısır", "Tahıl Küfü"] },
 "DEOKSINIVALENOL": { ad: "DON / Deoksinivalenol (Buğday Küfü)", kat: "Mikotoksin", risk: "yuksek", organlar: ["Bağışıklık", "Bağırsak"], etki: "Buğday, mısır, arpa. Bağışıklığı baskılar, kusturucu etki. Çocuk mamasında AB sınır koydu.", kaynak: "EFSA 2017 DON · AB Reg 1881/2006", alternatif: "Kalite kontrollü tahıl" , arar: ["DON", "Deoksinivalenol", "Buğday Küfü"] },
 "PIRINÇ ARSENIK BEBEK": { ad: "Pirinç Bazlı Bebek Maması (Arsenik Riski)", kat: "Bebek Maması", risk: "kritik", organlar: ["Beyin", "Kanser", "Sinir Sistemi"], etki: "Bebek mamalarının çoğu pirinç bazlı. FDA 2020 çocuk pirincine sınır koydu. AAP bebek pirinç tüketimini sınırlandırdı.", kaynak: "FDA 2020 Inorganic Arsenic · AAP 2014 Pirinç · Consumer Reports", alternatif: "Yulaf, kinoa, bulgur bazlı mama" , arar: ["Pirinç Bazlı Bebek Maması", "Arsenik Riski"] },
 "BEBEK MAMASI ŞEKER": { ad: "Bebek Maması (Şeker Eklenmiş)", kat: "Bebek Maması", risk: "kritik", organlar: ["Pankreas", "Diş", "Bağırsak"], etki: "Tatlandırma için şeker/HFCS/sukroz eklenir. WHO bebek mamasında şeker yasaklamasını öneriyor.", kaynak: "WHO 2022 Bebek Beslenme · Public Health Engl", alternatif: "Şekersiz mama, taze meyve püresi" , arar: ["Bebek Maması", "Şeker Eklenmiş"] },
 "BEBEK MAMA ÇOCUK": { ad: "Çocuk Püre Kavanozu (Hipp, Bebivita)", kat: "Bebek Maması", risk: "orta", organlar: ["Bağırsak"], etki: "Yüksek sıcaklık işlemi besin değerini düşürür. Bazı kavanozlarda taze meyveden 10 kat fazla şeker.", kaynak: "Public Health Engl 2019 · WHO", alternatif: "Taze meyve püresi, ev yapımı" , arar: ["Çocuk Püre Kavanozu", "Hipp", "Bebivita"] },
 "BISFENOL BEBEK BIBERON": { ad: "BPA/BPS (Bebek Biberonu Plastik)", kat: "Plastik Bileşeni", risk: "kritik", organlar: ["Hormon", "Beyin", "Üreme"], etki: "Bebek biberonları AB'de BPA-free zorunlu (2011) ama BPS aynı zararlı. Sıcak süt geçişi.", kaynak: "AB Reg 321/2011 · EFSA 2023 BPA · NIH NIEHS", alternatif: "Cam biberon, silikon biberon" , arar: ["BPA", "BPS", "Bebek Biberonu Plastik"] },
 "FORMÜL MAMA": { ad: "Bebek Formül Maması (Süt İkamesi)", kat: "Bebek Maması", risk: "yuksek", organlar: ["Bağırsak", "Bağışıklık"], etki: "Sığır sütü protein + bitkisel yağ + şeker + DHA. WHO 6 ay anne sütü öneriyor, formül sağlık dezavantajları.", kaynak: "WHO 2017 Anne Sütü · Lancet Breastfeeding · AAP", alternatif: "Anne sütü, sertifikalı formül son çare" , arar: ["Bebek Formül Maması", "Süt İkamesi"] },
 "EKMEK ENDÜSTRI": { ad: "Endüstriyel Ekmek (Halk Ekmek, Marketçilik)", kat: "İşlenmiş Tahıl", risk: "yuksek", organlar: ["Pankreas", "Bağırsak"], etki: "Beyaz un + L-sistein + emülgatör (E471, E472e) + azodikarbonamid + koruyucu. Hızlı maya, gerçek ekşi maya yok.", kaynak: "WHO · CSPI Bread · BMJ UPF", alternatif: "Ekşi mayalı, tam buğday, ev ekmeği", arar: ["Beyaz Ekmek"] },
 "TAM BUĞDAY YALANI": { ad: "'Tam Buğday' Etiketli Beyaz Un Ekmek", kat: "Pazarlama Yalanı", risk: "yuksek", organlar: ["Pankreas", "Bağırsak"], etki: "Etikette 'tam buğday' yazsa bile %20 tam buğday + %80 beyaz un olabilir. AB sınır koymadı.", kaynak: "AB Etiketleme · CSPI Whole Grain", alternatif: "%100 tam buğday, ekşi maya, çavdar" , arar: ["Tam Bugday Etiketli", "Beyaz Un Ekmek"] },
 "YAPAY MAYA": { ad: "Yapay Maya (Kuru İnstant Maya)", kat: "İşlenmiş Maya", risk: "dusuk", organlar: ["Bağırsak"], etki: "Doğal maya değil, hızlı kabarma için. Gluten zorlanır, sindirim güçleşir.", kaynak: "BMJ UPF · CSPI", alternatif: "Doğal ekşi maya (sourdough)" , arar: ["Yapay Maya", "Kuru İnstant Maya"] },
 "GLUTEN YÜKSEK BUĞDAY": { ad: "Yüksek Glutenli Modern Buğday", kat: "Hibrit Tahıl", risk: "orta", organlar: ["Bağırsak", "Bağışıklık"], etki: "1960'larda hibrit yapılan buğday eski türlerden 10x fazla gluten. Çölyak ve gluten duyarlılığı artışı.", kaynak: "Mol Nutr Food Res 2018 · van den Broeck 2010", alternatif: "Kadim tahıllar (siyez, kavılca, einkorn)" , arar: ["Yüksek Glutenli Modern Buğday"] },
 "BROMINLI UN": { ad: "Brominli Un (Potasyum Bromat)", kat: "Un İşleme", risk: "kritik", organlar: ["Böbrek", "Kanser"], etki: "IARC Grup 2B. AB, Çin, Brezilya yasakladı. ABD'de hala kullanılıyor. Pizza tabanı, hamburger ekmeği.", kaynak: "IARC Vol 73 · California Prop 65", alternatif: "Bromsuz un (AB)" , arar: ["Brominli Un", "Potasyum Bromat"] },
 "BEYAZ PIRINÇ ŞEKER": { ad: "Beyaz Pirinç (Kabuğu Soyulmuş)", kat: "Rafine Tahıl", risk: "yuksek", organlar: ["Pankreas", "Bağırsak"], etki: "Glisemik indeksi şekerden yüksek (72). Diyabet riski (Hu 2012). B vitamini ve lif yok.", kaynak: "BMJ 2012 Hu Pirinç · WHO Diyabet", alternatif: "Esmer pirinç (arsenik test), bulgur, kinoa" , arar: ["Beyaz Pirinç", "Kabuğu Soyulmuş"] },
 "MISIR ŞURUBU TATLI": { ad: "Glikoz-Fruktoz Şurubu (Türkçe HFCS)", kat: "Tatlandırıcı", risk: "kritik", organlar: ["Karaciğer", "Pankreas", "Beyin"], etki: "NAFLD (yağlı karaciğer), bağımlılık etkisi, obezite. Türkiye'de 'NBŞ' (nişasta bazlı şeker). Şekerden ucuz, marketlerin yarısında.", kaynak: "Hepatology 2010 · Lancet 2013 · WHO Şeker", alternatif: "Doğal şeker (bal, pekmez, hurma)", arar: ["Glikoz Surubu", "Glukoz Surubu", "Glukoz Fruktoz", "Glikoz Fruktoz", "Misir Surubu", "Corn Syrup", "HFCS", "NBS"] },
 "MALTITOL": { ad: "Maltitol (E965 - Şekersiz Ürünler)", kat: "Şeker Alkolü", risk: "orta", organlar: ["Bağırsak", "Pankreas"], etki: "Şişkinlik, ishal, gaz. Glisemik indeksi orta (52). 'Şekersiz' diye yanıltıcı.", kaynak: "EFSA 2018 Maltitol · CSPI", alternatif: "Stevia, doğal şeker (az)" , arar: ["Maltitol", "E965-ŞekersizÜrünler"] },
 "SORBITOL": { ad: "Sorbitol (E420)", kat: "Şeker Alkolü", risk: "orta", organlar: ["Bağırsak"], etki: "Bağırsak su çeker (laksatif etki). Şişkinlik, ishal. Şekersiz sakız, diyet ürünler.", kaynak: "EFSA 2018 Sorbitol · NIH", alternatif: "Stevia, az miktar bal" , arar: ["Sorbitol", "E420"] },
 "ISOMALT": { ad: "İzomalt (E953)", kat: "Şeker Alkolü", risk: "orta", organlar: ["Bağırsak"], etki: "Sindirim sorunu, gaz. Diyet şekerlemelerinde.", kaynak: "EFSA 2018", alternatif: "Doğal tatlandırıcı" , arar: ["İzomalt", "E953"] },
 "FRUKTOZ TOZ": { ad: "Saf Fruktoz Tozu (Diyabet Tatlandırıcı)", kat: "Şeker", risk: "kritik", organlar: ["Karaciğer", "Pankreas"], etki: "Doğrudan karaciğere gider, yağlanma yapar. NAFLD ana sebebi. 'Diyabetik' satılır ama tehlikeli.", kaynak: "Hepatology 2010 Ouyang · Lancet 2013 Bray · WHO", alternatif: "Stevia, az miktar bal", arar: ["Saf Fruktoz Tozu"] },
 "AGAVE ŞURUBU": { ad: "Agave Şurubu ('Doğal' Tatlandırıcı)", kat: "Tatlandırıcı", risk: "yuksek", organlar: ["Karaciğer", "Pankreas"], etki: "%80 fruktoz (HFCS'den fazla). 'Doğal' yalanı. Yağlı karaciğer hastalığı.", kaynak: "Mayo Clinic · Cleveland Clinic · WHO", alternatif: "Stevia, az bal, hurma" , arar: ["Agave Şurubu", "Agave"] },
 "BROWN SUGAR ENDÜSTRI": { ad: "Esmer Şeker (Beyaz Şeker + Pekmez Boyama)", kat: "İşlenmiş Şeker", risk: "yuksek", organlar: ["Pankreas"], etki: "Gerçek esmer şeker değil. Beyaz şeker + melas (pekmez) boyalı. Demerera ve muscovado farklı.", kaynak: "USDA Şeker · CSPI", alternatif: "Hindistan cevizi şekeri, gerçek melas" , arar: ["Esmer Şeker", "Beyaz Şeker + Pekmez Boyama"] },
 "KESME ŞEKER BEYAZLATILMIŞ": { ad: "Beyaz Rafine Şeker (Kemik Karbonu Filtreleme)", kat: "İşlenmiş Şeker", risk: "yuksek", organlar: ["Pankreas", "Karaciğer", "Beyin"], etki: "Şeker üretiminde sığır kemiği karbonu kullanılır (vegan/koşer değil). Kalsiyum, mineraller atılır. Saf glukoz.", kaynak: "PETA Şeker · USDA Sugar Refining", alternatif: "Hindistan cevizi şekeri, hurma şekeri" , arar: ["Beyaz Rafine Şeker", "Kemik Karbonu Filtreleme"] },
 "AROMA INSTANT": { ad: "Instant Kahve (Akrilamid + Kavurma)", kat: "İşlenmiş Kahve", risk: "yuksek", organlar: ["Karaciğer", "Kanser"], etki: "Yüksek ısıda işlenir, akrilamid + furan oluşur. Espresso ve filtre kahveden farklı. Nescafe Classic.", kaynak: "EFSA Akrilamid 2015 · IARC Furan Vol 63", alternatif: "Türk kahvesi (taze öğütme), filtre kahve" , arar: ["Instant Kahve", "Akrilamid + Kavurma"] },
 "AROMALI KAHVE": { ad: "Aromalı Kahve (Vanilya, Karamel - Sentetik)", kat: "Aromalı Kahve", risk: "orta", organlar: ["Karaciğer"], etki: "Vanilin sentetik (petrol/kağıt atığı). PG (propilen glikol) aroma taşıyıcı. Starbucks aromaları.", kaynak: "CSPI · EFSA Aromatic", alternatif: "Sade Türk kahvesi, gerçek baharat eklemek" , arar: ["Aromalı Kahve", "Vanilya", "Karamel - Sentetik"] },
 "ÇAY KLOROFIL": { ad: "Aromalı/Renkli Çay (Pickwick, Lipton Fruit)", kat: "İşlenmiş Çay", risk: "orta", organlar: ["Bağırsak", "Karaciğer"], etki: "Gerçek meyve yok. Aroma + sitrik asit + sentetik renk. Lipton Ice Tea, Pickwick Fruit.", kaynak: "CSPI · EFSA", alternatif: "Gerçek meyve dilimleri + sade çay" , arar: ["Aromalı", "Renkli Çay", "Pickwick", "Lipton Fruit"] },
 "PROBIYOTIK YANLIŞ": { ad: "Endüstriyel Probiyotik (Şeker + Tek Tür)", kat: "Probiyotik Yalanı", risk: "orta", organlar: ["Bağırsak"], etki: "'Probiyotik' iddialı yoğurt/içecekler genelde tek tür bakteri + şeker. Activia, Yakult.", kaynak: "JAMA 2019 Probiotic · Cleveland Clinic · CSPI", alternatif: "Ev yoğurdu, kefir, kombucha, lahana turşusu" , arar: ["Endüstriyel Probiyotik", "Şeker + Tek Tür"] },
 "OMEGA 3 YANLIŞ": { ad: "Omega-3 Eklenmiş Yumurta / Süt", kat: "Pazarlama", risk: "dusuk", organlar: [], etki: "Çok az omega-3, pazarlama trüğü. Doğal yumurta zaten omega-3 içerir. Pahalı satılır.", kaynak: "FDA Yumurta · NIH ODS", alternatif: "Köy yumurtası, balık, ceviz" , arar: ["Omega", "3 Eklenmiş Yumurta", "Süt"] },
 "VITAMIN EKLENMIŞ EKMEK": { ad: "'Vitaminli' Beyaz Ekmek (Pazarlama)", kat: "Pazarlama Yalanı", risk: "orta", organlar: ["Pankreas"], etki: "Beyaz un üretiminde vitaminler kaybedilir, sonra sentetik eklenir. Doğal değil. AB izinli ama yararsız.", kaynak: "BMJ 2019 UPF · WHO", alternatif: "Tam buğday, gerçek tahıl" , arar: ["Vitaminli Beyaz Ekmek", "Pazarlama"] },
 "GLUTEN FREE YANLIŞ": { ad: "Glutensiz Endüstriyel Ürün (Mısır + Pirinç + Şeker)", kat: "Pazarlama Yalanı", risk: "yuksek", organlar: ["Pankreas", "Bağırsak"], etki: "'Glutensiz' diye sağlıklı sanılır. Buğday yerine işlenmiş mısır + pirinç + nişasta + şeker. Glisemik indeks daha yüksek.", kaynak: "Mayo Clinic Glutensiz · BMJ 2017 GF", alternatif: "Doğal glutensiz (kinoa, karabuğday, pirinç, taze)" , arar: ["Glutensiz Endüstriyel Ürün", "Mısır + Pirinç + Şeker"] },
 "VEGAN ENDÜSTRI": { ad: "Endüstriyel Vegan Et (Beyond, Impossible)", kat: "Ultra İşlenmiş", risk: "yuksek", organlar: ["Kalp", "Bağırsak"], etki: "20+ bileşen, ultra-işlenmiş. Hindirojenize yağ, soya proteini izolatı, MSG, metilselüloz. Et değil, kimya laboratuvarı.", kaynak: "BMJ 2019 UPF · CSPI Plant Based", alternatif: "Mercimek köfte, nohut köfte, taze sebze" , arar: ["Endüstriyel Vegan Et", "Beyond", "Impossible"] },
 "PLANT MILK CARRAGEEN": { ad: "Bitkisel Süt (Badem/Soya/Yulaf - Karra)", kat: "İşlenmiş Bitkisel Süt", risk: "orta", organlar: ["Bağırsak"], etki: "%2-5 badem/yulaf, %95 su + karagenan + emülgatör + şeker. Alpro, Sütaş Plant.", kaynak: "EFSA Karra · CSPI Plant Milk", alternatif: "Ev yapımı badem/yulaf sütü" , arar: ["Bitkisel Süt", "Badem/Soya/Yulaf - Karra"] },
 "YULAF SÜTÜ GLIFOSAT": { ad: "Yulaf Sütü (Glifosat Kalıntısı + Maltodekstrin)", kat: "İşlenmiş Bitkisel Süt", risk: "yuksek", organlar: ["Karaciğer", "Pankreas", "Bağırsak"], etki: "Yulafta glifosat tespit edildi (EWG 2018). Maltodekstrin (GI 110) ve yağ eklenir. Sade değil.", kaynak: "EWG 2018 Glifosat · IARC 2A", alternatif: "Organik yulaf, ev yapımı yulaf sütü" , arar: ["Yulaf Sütü"] },
 "DAMAR DOPER ENERJI": { ad: "Energy Gel (Sporcu - Yapay Tatlı + Kafein)", kat: "Sporcu Ürünü", risk: "yuksek", organlar: ["Kalp", "Pankreas"], etki: "Saf fruktoz + maltodekstrin + kafein + tuz. Kalp çarpıntı, mide bulantısı. Yarış için bile pek gerek yok.", kaynak: "EFSA Sporcu · ACSM", alternatif: "Muz, hurma, kuru üzüm, ev energy bar" , arar: ["Energy Gel", "Sporcu - Yapay Tatlı + Kafein"] },
 "PROTEIN BAR ULTRA": { ad: "Protein Bar (Whey İzolat + Şeker Alkolü + Aroma)", kat: "Ultra İşlenmiş", risk: "yuksek", organlar: ["Bağırsak", "Karaciğer"], etki: "20+ bileşen. Şeker alkolü (gaz), yapay tatlı, koruyucu, aroma. 'Sağlıklı' yalanı.", kaynak: "BMJ UPF · CSPI Protein Bar", alternatif: "Yumurta + yoğurt + ceviz, ev yapımı bar" , arar: ["Protein Bar"] },
 "WHEY PROTEIN MELAMINE": { ad: "Whey Protein Tozu (Kontaminasyon Riski)", kat: "İşlenmiş Protein", risk: "yuksek", organlar: ["Böbrek", "Karaciğer"], etki: "2008 Çin melamin skandalı. Bazı ucuz markaları ağır metal + melamin içerebilir. Consumer Reports test ediyor.", kaynak: "Consumer Reports 2018 Protein Powder · WHO Melamin 2008", alternatif: "Doğal protein (yumurta, et, baklagil)" , arar: ["Whey Protein Tozu", "Kontaminasyon Riski"] },
 "KOLLAJEN TAKVIYE": { ad: "Kolajen Tozu (Pazarlama Trendi)", kat: "Hayvansal Atık", risk: "orta", organlar: ["Bağışıklık"], etki: "Sığır/balık/domuz kemiği ve deri atığı. Sindirimde aminoasitlere parçalanır, kolajen olarak emilmez. Pazarlama hilesi.", kaynak: "Cleveland Clinic Kolajen 2023 · JAMA Dermatol 2021", alternatif: "C vitamini + protein + kemik suyu (ev)" , arar: ["Kolajen Tozu", "Pazarlama Trendi"] },

 "MUSLUK SUYU KLOR": { ad: "Klor + Trihalometan (Musluk Suyu)", kat: "Su Dezenfeksiyonu", risk: "yuksek", organlar: ["Mesane", "Bağırsak", "Kanser"], etki: "Klor + organik maddeler trihalometan oluşturur. IARC Grup 2B. Mesane kanseri ile bağlantılı. WHO uzun süreli içme suyu sınır koydu.", kaynak: "IARC Vol 73 · WHO 2017 İçme Suyu · EWG Tap Water", alternatif: "Karbon filtre, RO filtre, kaynama (klor uçar)" , arar: ["Klor + Trihalometan", "Musluk Suyu"] },
 "FLORÜR SUYU": { ad: "Florür (İçme Suyu - Fazla Doz)", kat: "Mineral Eklemesi", risk: "yuksek", organlar: ["Diş", "Kemik", "Beyin"], etki: "Optimal doz diş çürüğü önler. Fazlası dişte beyaz lekeler (florozis), kemik kırılganlığı, çocuk IQ düşüşü.", kaynak: "EPA Florür · Lancet 2014 Grandjean · NTP 2024 Florür IQ", alternatif: "Düşük florür su, ters osmoz filtre" , arar: ["Florür", "İçme Suyu - Fazla Doz"] },
 "ATIK SU KURUM": { ad: "Endüstriyel Atık Su Kontaminasyonu", kat: "Çevresel Kirlilik", risk: "kritik", organlar: ["Karaciğer", "Böbrek", "Hormon"], etki: "Fabrika atıkları yeraltı suyuna karışır. Ağır metal, çözücü, ilaç kalıntısı. Türkiye Ergene, Marmara bölgesi yüksek risk.", kaynak: "Çevre Bakanlığı 2022 Su Kalitesi · WWF Türkiye Su Raporu", alternatif: "Şişe su (cam), filtreli su, dağ kaynak suyu" , arar: ["Endüstriyel Atık Su Kontaminasyonu"] },
 "MIKROPLASTIK SU": { ad: "Mikroplastik (Şişe Suyu)", kat: "Plastik Parçacık", risk: "kritik", organlar: ["Bağırsak", "Kan", "Hormon"], etki: "Şişe sularda litre başına 240.000 nanoplastik tespit (PNAS 2024). Plasenta, kan, akciğerde birikti. Hormon bozucu.", kaynak: "PNAS 2024 Nanoplastic · WHO 2019 Mikroplastik · Greenpeace", alternatif: "Cam şişe su, çelik termos, evde filtreli" , arar: ["Mikroplastik", "Şişe Suyu"] },
 "KAYNAK SUYU NITRAT": { ad: "Nitrat (Tarım Bölgesi Kaynak Suyu)", kat: "Su Kontaminasyonu", risk: "yuksek", organlar: ["Bebek", "Kanser"], etki: "Gübre kalıntısı yeraltı suyuna geçer. Bebeklerde mavi bebek sendromu (methemoglobinemi). Kanserojen N-nitroso bileşikler.", kaynak: "WHO 2016 Nitrat · EPA İçme Suyu · EFSA Nitrat", alternatif: "Test sertifikalı su, RO filtre" , arar: ["Nitrat", "Tarım Bölgesi Kaynak Suyu"] },
 "İYI HORMON İÇECEK": { ad: "PFAS (Yapışmaz Tencere → Suya/Gıdaya)", kat: "Sonsuz Kimyasal", risk: "kritik", organlar: ["Hormon", "Kanser", "Bağışıklık"], etki: "Teflon, yapışmaz tencere, paket astarı, kağıt bardak. Vücutta parçalanmaz, ömür boyu birikir. Çocuk gelişimi bozar.", kaynak: "IARC 2023 PFOA Grup 1 · EWG PFAS Map · EPA 2024", alternatif: "Çelik/dökme demir tencere, cam, seramik" , arar: ["PFAS", "Yapışmaz Tencere → Suya/Gıdaya"] },
 "TÜTÜN MARULU": { ad: "Tütsülenmiş Et/Balık (PAH + Nitrosamin)", kat: "İşlem Yan Ürünü", risk: "kritik", organlar: ["Mide", "Kolon", "Akciğer"], etki: "Tütsü dumanı PAH (polisiklik aromatik) içerir. Yanmış et + tuzla nitrosamin oluşur. IARC Grup 1.", kaynak: "IARC Vol 92 · IARC Vol 114 · WHO 2015", alternatif: "Taze et, sıvı tütsü aroması yerine" , arar: ["Tütsülenmiş Et", "Balık", "PAH + Nitrosamin"] },
 "ÇIĞ SÜT BAKTERI": { ad: "Pastörize Edilmemiş Çiğ Süt (Mikrobiyal Risk)", kat: "Çiğ Süt", risk: "yuksek", organlar: ["Bağışıklık", "Bağırsak"], etki: "Brusella, listeria, salmonella, E.coli, tüberküloz riski. CDC çiğ süt yasakladı. Hamile ve çocukta tehlikeli.", kaynak: "CDC 2014 Raw Milk · WHO Süt Güvenliği · FDA", alternatif: "Düşük ısı pastörize süt, kaliteli mandıra" , arar: ["Pastörize Edilmemiş Çiğ Süt", "Mikrobiyal Risk"] },
 "ÇIĞ YUMURTA SALMONELLA": { ad: "Çiğ Yumurta (Salmonella Riski)", kat: "Çiğ Hayvansal", risk: "yuksek", organlar: ["Bağırsak", "Bağışıklık"], etki: "Salmonella enteritidis hamilelerde, çocukta, yaşlıda ölümcül. CDC pişmiş yumurta öneriyor.", kaynak: "CDC 2023 Salmonella · WHO Egg Safety · FDA", alternatif: "Pastörize yumurta, iyi pişmiş yumurta" , arar: ["Çiğ Yumurta", "Salmonella Riski"] },
 "DOMATES KONSERVE BPA": { ad: "Domates Konserve (BPA + Sodyum Yüksek)", kat: "İşlenmiş Sebze", risk: "yuksek", organlar: ["Hormon", "Tansiyon"], etki: "Asitli domates BPA emilimini artırır. Sodyum bombası (1g/100g). Tat, Tamek, Hunt's.", kaynak: "EFSA 2023 BPA · WHO Sodyum · EWG", alternatif: "Cam kavanoz domates, taze domates" , arar: ["Domates Konserve", "BPA + Sodyum Yüksek"] },
 "KONSERVE BAKLAGIL": { ad: "Konserve Fasulye/Nohut (BPA + Tuz)", kat: "İşlenmiş Baklagil", risk: "yuksek", organlar: ["Hormon", "Tansiyon"], etki: "BPA kutu astarı + 500mg+ tuz/100g. 'Hazır' diye satılır ama bedeli yüksek.", kaynak: "EFSA 2023 BPA · WHO Sodium · CSPI", alternatif: "Kuru fasulye/nohut (gece ıslat, pişir)" , arar: ["Konserve Fasulye", "Nohut", "BPA + Tuz"] },
 "DONMUŞ MEYVE ŞEKER": { ad: "Donmuş Meyve (Şeker Eklenmiş)", kat: "İşlenmiş Meyve", risk: "orta", organlar: ["Pankreas"], etki: "'Sade' diye satılan donmuş meyvelere şeker, askorbik asit eklenebilir. Etiket kontrol et.", kaynak: "CSPI Frozen Fruit · FDA Etiketleme", alternatif: "Şekersiz donmuş meyve, taze meyve" , arar: ["Donmuş Meyve", "Şeker Eklenmiş"] },
 "DONMUŞ SEBZE BLANSE": { ad: "Donmuş Sebze (Blanse - Besin Kaybı)", kat: "İşlenmiş Sebze", risk: "dusuk", organlar: [], etki: "Donmadan önce blanşe edilir (kaynar suya batırma), C ve B vitamini %50 kayıp. Yine de taze marketten iyi olabilir.", kaynak: "Food Chem 2015 Donmuş · USDA", alternatif: "Taze sebze (mevsiminde), kendin donuk" , arar: ["Donmuş Sebze", "Blanse - Besin Kaybı"] },
 "TAZE SEBZE PESTISIT": { ad: "Çilek / Üzüm / Ispanak (Yoğun Pestisit)", kat: "Pestisit Yüklü Meyve", risk: "yuksek", organlar: ["Hormon", "Bağışıklık", "Kanser"], etki: "EWG Dirty Dozen listesinin başında. Glifosat, klorpirifos, neonikotinoid kalıntısı. Çocuklar için en riskli.", kaynak: "EWG Dirty Dozen 2024 · USDA Pesticide Data Program", alternatif: "Organik, sirkeli yıkama, EWG Clean 15" , arar: ["Çilek", "Üzüm", "Ispanak", "Yoğun Pestisit"] },
 "DOMATES SU BIBER": { ad: "Domates / Biber (Salça Üretim Hilesi)", kat: "Hile Sebze", risk: "orta", organlar: ["Bağırsak"], etki: "Salça üretiminde küflenmiş domates kullanım sorunu (Türkiye 2018-2023). Aflatoksin riski.", kaynak: "Türkiye Tarım Bakanlığı 2022 · FDA Tomato Paste", alternatif: "Taze domates, ev salçası, sertifikalı" , arar: ["Domates", "Biber", "Salça Üretim Hilesi"] },
 "KIVI ETHEPHON": { ad: "Etefon (Kivi/Domates Olgunlaştırıcı)", kat: "Bitki Büyüme Düzenleyici", risk: "orta", organlar: ["Sinir Sistemi"], etki: "Yapay olgunlaştırma. Yüksek dozda nörotoksik. AB sınırlı, izinli.", kaynak: "AB Reg 1107/2009 · EFSA Etefon", alternatif: "Mevsiminde, dalında olgun meyve" , arar: ["Etefon", "Kivi/Domates Olgunlaştırıcı"] },
 "GIBBERELLIN ÜZÜM": { ad: "Giberellin (Çekirdeksiz Üzüm)", kat: "Hormon", risk: "orta", organlar: ["Hormon"], etki: "Çekirdeksiz büyük üzüm için hormon. Hayvanlarda etkileri belirsiz. AB izinli ama doğal değil.", kaynak: "EFSA Giberellin · AB Reg", alternatif: "Çekirdekli organik üzüm" , arar: ["Giberellin", "Çekirdeksiz Üzüm"] },
 "PAKLOBUTRAZOL": { ad: "Paklobutrazol (Mango/Bahçecilik)", kat: "Bitki Büyüme", risk: "yuksek", organlar: ["Karaciğer", "Hormon"], etki: "AB sınırlı izinli. Hindistan mango'sunda yaygın. Karaciğer enzimleri etkili.", kaynak: "EFSA Paklobutrazol · AB Reg", alternatif: "Yerli organik meyve" , arar: ["Paklobutrazol", "Mango/Bahçecilik"] },
 "EKMEK KUF": { ad: "Ekmek Küfü Önleyici (Kalsiyum Propiyonat E282)", kat: "Koruyucu", risk: "orta", organlar: ["Sinir Sistemi", "Davranış"], etki: "Çocuklarda davranış sorunu, dikkat eksikliği (Australian J Nutr 2002). Yumuşak ekmek, hamburger ekmeği.", kaynak: "AJN 2002 Dengate · EFSA Propiyonat", alternatif: "Taze ekmek (1-2 gün), ekşi maya doğal" , arar: ["Ekmek Küfü Önleyici", "Kalsiyum Propiyonat E282"] },
 "MARGARIN E472A": { ad: "Asetik Mono-Digliserit (E472a)", kat: "Emülgatör", risk: "orta", organlar: ["Bağırsak"], etki: "Margarin, kek, dondurma. Trans yağ kaynağı olabilir. Bağırsak etkili.", kaynak: "EFSA 2017 E472 · CSPI", alternatif: "Doğal yağ" , arar: ["Asetik Mono", "Digliserit", "E472a"] },
 "YEMEKLIK GRESORM YAĞ": { ad: "Soya Yağı (Omega-6 Bombası)", kat: "Bitkisel Yağ", risk: "yuksek", organlar: ["Kalp", "Bağışıklık"], etki: "Aşırı omega-6 (linoleik asit) inflamasyon artırır. Endüstriyel hazır gıdaların %80'inde. ABD, AB tarım sübvansiyonu.", kaynak: "Lancet 2018 Hooper · BMJ 2013 Ramsden", alternatif: "Zeytinyağı, tereyağı, hindistan cevizi yağı" , arar: ["Soya Yağı", "Omega-6 Bombası"] },
 "MISIR YAĞI": { ad: "Mısır Yağı (GDO + Omega-6)", kat: "Bitkisel Yağ", risk: "yuksek", organlar: ["Kalp", "Bağışıklık"], etki: "GDO mısırdan, omega-6 fazla. İnflamasyon. Heksan kalıntısı.", kaynak: "EWG GMO · BMJ 2013", alternatif: "Zeytinyağı, tereyağı" , arar: ["Mısır Yağı", "GDO + Omega-6"] },
 "AYÇIÇEK YAĞI RAFINE": { ad: "Rafine Ayçiçek Yağı (Yüksek Omega-6)", kat: "Bitkisel Yağ", risk: "yuksek", organlar: ["Kalp", "Bağışıklık"], etki: "Rafinasyon sürecinde heksan, kostik soda, beyazlatma toprağı kullanılır. Soğuk sıkımdan çok farklı.", kaynak: "EFSA Yağ Rafinasyon · CSPI", alternatif: "Soğuk sıkım ayçiçek, zeytinyağı" , arar: ["Rafine Ayçiçek Yağı", "Yüksek Omega-6"] },
 "KANOLA RAPESEED": { ad: "Kanola Yağı (Rapeseed - GDO)", kat: "Bitkisel Yağ", risk: "yuksek", organlar: ["Kalp", "Karaciğer"], etki: "Erusik asit (kalp toksik) için genetik değiştirilmiş kolza. Çoğu GDO, heksanla işlenmiş.", kaynak: "EFSA Erusik · USDA GMO Canola", alternatif: "Zeytinyağı, avokado yağı" , arar: ["Kanola Yağı", "Rapeseed - GDO"] },
 "GUNEY ŞIŞE PLASTIK": { ad: "PVC Sarma Filmi (Et/Peynir Paketleme)", kat: "Plastik Bileşeni", risk: "yuksek", organlar: ["Hormon", "Üreme"], etki: "DEHA ftalat içerir. Yağlı gıdaya geçer. AB et/peynirde sınırladı. Türkiye yaygın.", kaynak: "EFSA 2019 DEHA · AB Reg 10/2011 · IARC Ftalatlar", alternatif: "Cam kap, kağıt sarma, mum kağıdı" , arar: ["PVC Sarma Filmi", "Et/Peynir Paketleme"] },
 "STIROFOAM": { ad: "Stiropor / Polistiren (Sıcak Yiyecek Kapları)", kat: "Plastik", risk: "yuksek", organlar: ["Hormon", "Kanser"], etki: "Stiren IARC Grup 2A muhtemel kanserojen. Sıcak yağlı yemekte yiyeceğe geçer. McDonald's çıkardı (1990).", kaynak: "IARC Vol 121 Stiren · NTP 14th Report · EPA", alternatif: "Cam, seramik kap, ev yemek" , arar: ["Stiropor", "Polistiren", "Sıcak Yiyecek Kapları"] },
 "POLIKARBONAT": { ad: "Polikarbonat (#7 Plastik - BPA)", kat: "Plastik", risk: "kritik", organlar: ["Hormon", "Beyin"], etki: "Şişe, biberon, kap. Sıcakta BPA salar. Çocukta tehlikeli. AB 2011'de biberonda yasakladı.", kaynak: "AB Reg 321/2011 · EFSA 2023 BPA", alternatif: "Cam, paslanmaz çelik, BPA-free etiket" , arar: ["Polikarbonat", "#7 Plastik - BPA"] },
 "PET RESIN": { ad: "PET Şişe (Tekrar Doldurma)", kat: "Plastik", risk: "yuksek", organlar: ["Hormon"], etki: "Tek kullanım için tasarlanır. Tekrar doldurma + sıcakta antimon, mikroplastik salar.", kaynak: "Environ Sci Technol 2008 Shotyk · WHO", alternatif: "Cam, çelik şişe, BPA-free polikarbonat" , arar: ["PET Şişe", "Tekrar Doldurma"] },
 "ALUMINYUM KAP": { ad: "Alüminyum Kap / Folyo (Asitli Yemek)", kat: "Metal Kap", risk: "yuksek", organlar: ["Beyin", "Kemik"], etki: "Limon, domates, sirke pişirilince alüminyum yemeğe geçer. Alzheimer riskiyle bağlantı. WHO 2017 sınır koydu.", kaynak: "WHO 2017 Alüminyum · EFSA 2008 · Lancet 2018 Mold", alternatif: "Cam, çelik, dökme demir, seramik" , arar: ["Alüminyum Kap", "Folyo", "Asitli Yemek"] },
 "KALAY KONSERVE": { ad: "Kalay (Konserve Kutu Astar)", kat: "Ağır Metal", risk: "orta", organlar: ["Bağırsak", "Sinir Sistemi"], etki: "Asitli gıda (domates, meyve suyu) konservelerde kutu astarından kalay geçer. EFSA günlük sınır koydu.", kaynak: "EFSA Kalay · AB Reg 1881/2006", alternatif: "Cam kavanoz, taze ürün" , arar: ["Kalay", "Konserve Kutu Astar"] },
 "ALKOL FOOD ESANS": { ad: "Etanol (Gıda Esanslarında - Çocuk Ürün)", kat: "Çözücü", risk: "orta", organlar: ["Karaciğer"], etki: "Vanilin, aroma karışımlarında çözücü. Çocuk pasta, kek karışımı, dondurmada. Mikro miktarlarda.", kaynak: "EFSA Etanol · CSPI", alternatif: "Doğal vanilya çubuğu, gerçek baharat" , arar: ["Etanol", "Gıda Esanslarında - Çocuk Ürün"] },
 "BIRA ENDÜSTRI": { ad: "Endüstriyel Bira (Glifosat + İşlenmiş Tahıl)", kat: "Alkollü İçecek", risk: "yuksek", organlar: ["Karaciğer", "Beyin", "Kanser"], etki: "Glifosat tespit (EWG 2018). Sülfit, PVPP, propilen glikol. WHO alkol kanserojen Grup 1.", kaynak: "WHO 2023 Alkol · EWG 2018 Glifosat", alternatif: "El yapımı organik bira" , arar: ["Endüstriyel Bira", "Glifosat + İşlenmiş Tahıl"] },
 "ŞARAP SULFIT": { ad: "Şarap (Sülfit + Pestisit + İşleme)", kat: "Alkollü İçecek", risk: "yuksek", organlar: ["Karaciğer", "Bağışıklık", "Kanser"], etki: "Sülfit (astım), pestisit, gümüş katkı, ısıtma. WHO alkol Grup 1 kanserojen.", kaynak: "WHO 2023 Alkol · EFSA Sülfit", alternatif: "Doğal şarap, alkolsüz" , arar: ["Şarap", "Sülfit + Pestisit + İşleme"] },
 "RAKI YAPAY": { ad: "Endüstriyel Rakı (Yapay Anason Aroma)", kat: "Alkollü İçecek", risk: "yuksek", organlar: ["Karaciğer"], etki: "Geleneksel rakı yerine yapay anason esansı + alkol + karamel + şeker. WHO alkol kanserojen.", kaynak: "TGK Rakı Tebliği · WHO Alkol", alternatif: "Geleneksel rakı (doğal anason), alkolsüz" , arar: ["Endüstriyel Rakı", "Yapay Anason Aroma"] },
 "VOTKA SAHTE": { ad: "Sahte Votka / Metanol Riski", kat: "Sahte Alkol", risk: "kritik", organlar: ["Göz", "Karaciğer", "Sinir"], etki: "Türkiye'de sahte alkol skandalları (2020-2024). Metanol körlüğe ve ölüme yol açar. Sokak alkol risk.", kaynak: "Türkiye Sağlık Bakanlığı 2024 · WHO Metanol", alternatif: "Markalı, vergili alkol veya alkolsüz" , arar: ["Sahte Votka", "Metanol Riski"] },
 "KAFEIN ENERJI HAP": { ad: "Kafein Tableti / Tozu (Megadoz)", kat: "Stimülan", risk: "kritik", organlar: ["Kalp", "Beyin"], etki: "Saf kafein tozu çay kaşığı dozu ölümcül. FDA 2018 uyarısı. Gençlerde kalp krizi ölümleri.", kaynak: "FDA 2018 Kafein Tozu · AAP Caffeine", alternatif: "Sade çay, kahve (ölçülü)" , arar: ["Kafein Tableti", "Tozu", "Megadoz"] },
 "MELATONIN ENDÜSTRI": { ad: "Melatonin Sakızı / Tablet (Doz Aşımı)", kat: "Hormon Takviyesi", risk: "yuksek", organlar: ["Hormon", "Beyin"], etki: "Çocuk hormon sistemini bozar. ABD'de zehirlenme vakaları %530 arttı (CDC 2022). Sakız olarak satılması tehlikeli.", kaynak: "CDC 2022 Melatonin · AAP Çocuk Melatonin", alternatif: "Doğal uyku hijyeni, gün ışığı, fiziksel aktivite" , arar: ["Melatonin Sakızı", "Tablet", "Doz Aşımı"] },
 "PROBIYOTIK ENDÜSTRI": { ad: "Probiyotik Hap (Tek Tür + Ölü Bakteri)", kat: "Takviye", risk: "orta", organlar: ["Bağırsak"], etki: "Çoğu rafta öldükçe etkisi azalır. Mide asidini geçemez. Pahalı plasebo.", kaynak: "JAMA 2019 Probiotic · BMJ 2017 Probiotics", alternatif: "Ev yoğurdu, kefir, lahana turşusu, kombucha" , arar: ["Probiyotik Hap", "Tek Tür + Ölü Bakteri"] },
 "MULTI VITAMIN HAZIR": { ad: "Multivitamin (Sentetik + Megadoz)", kat: "Vitamin Takviyesi", risk: "yuksek", organlar: ["Karaciğer", "Böbrek"], etki: "Doğal vitamin ile sentetik fark var. Megadoz birikimi. NEJM 2013: multivitamin yarar yok.", kaynak: "NEJM 2013 Multivitamin · Cochrane Vitamin", alternatif: "Doğal beslenme, kan testiyle hedefli" , arar: ["Multivitamin", "Sentetik + Megadoz"] },
 "CHIA ENDÜSTRI": { ad: "Endüstriyel Chia / Quinoa (İşlenmiş Süper Gıda)", kat: "İşlenmiş Süper Gıda", risk: "orta", organlar: ["Bağırsak"], etki: "Süper gıda pazarlama trendi. İşlenmiş chia + şeker + krem 'sağlıklı' satılır. Doğal yarar kaybolur.", kaynak: "BMJ UPF · Cleveland Clinic", alternatif: "Tam chia tohumu, kinoa (ev pişirme)" , arar: ["Endüstriyel Chia", "Quinoa", "İşlenmiş Süper Gıda"] },
 "HİNDİSTAN CEVIZI YAĞI YAYGIN": { ad: "Endüstriyel Hindistan Cevizi Yağı (Hidrojenize)", kat: "İşlenmiş Yağ", risk: "yuksek", organlar: ["Kalp"], etki: "Saf değil, hidrojenize edilebilir. %90 doymuş yağ, modarate tüketim önerisi. Saf bakirenin daha iyi.", kaynak: "AHA 2017 Coconut Oil · WHO", alternatif: "Sızma bakire hindistan cevizi yağı (cold-pressed)" , arar: ["Endüstriyel Hindistan Cevizi Yağı", "Hidrojenize"] },
 "AVOKADO YAĞI SAHTE": { ad: "Sahte Avokado Yağı (Soya/Ayçiçek Karışımı)", kat: "Sahte Premium Yağ", risk: "yuksek", organlar: ["Kalp", "Bağışıklık"], etki: "UC Davis 2020 testi: piyasadaki avokado yağlarının %70'i sahte (soya, ayçiçek karışık). Etiket yalan.", kaynak: "UC Davis 2020 Avokado · Food Control 2020", alternatif: "Sertifikalı, soğuk sıkım, koyu yeşil" , arar: ["Sahte Avokado Yağı", "Soya/Ayçiçek Karışımı"] },
 "ZEYTINYAĞI SAHTE": { ad: "Sahte Zeytinyağı (Soya/Ayçiçek Karışımı)", kat: "Sahte Premium Yağ", risk: "yuksek", organlar: ["Kalp"], etki: "Piyasadaki 'sızma' zeytinyağlarının %70-80'i sahte (UC Davis, IL Ministry 2017). Türkiye'de büyük skandal.", kaynak: "UC Davis 2017 · İtalya Adalet Bakanlığı 2017 · Türkiye Tarım Bakanlığı", alternatif: "Tarladan, yerel üretici, sertifikalı" , arar: ["Sahte Zeytinyağı", "Soya/Ayçiçek Karışımı"] },
 "SARDALYA ENDÜSTRI": { ad: "Sardalya Konservesi (Bitkisel Yağ + Tuz)", kat: "İşlenmiş Balık", risk: "orta", organlar: ["Bağırsak"], etki: "Saf zeytinyağı yerine soya/ayçiçek yağı. Yüksek sodyum. BPA kutu astarı.", kaynak: "EFSA BPA · CSPI Konserve", alternatif: "Cam kavanozda zeytinyağlı sardalya" , arar: ["Sardalya Konservesi", "Bitkisel Yağ + Tuz"] },
 "TUZ RAFINE": { ad: "Rafine Sofra Tuzu (İyot + Antitopaklayıcı)", kat: "İşlenmiş Tuz", risk: "yuksek", organlar: ["Tansiyon", "Beyin"], etki: "Tüm mineraller arındırılır. Yapay iyot, antitopaklayıcı (alüminosilikat, ferrosiyanür) eklenir. Aşırı sodyum.", kaynak: "WHO Sodyum · CSPI Sodyum", alternatif: "Himalaya tuzu, deniz tuzu, Çankırı kaya tuzu" , arar: ["Rafine Sofra Tuzu", "İyot + Antitopaklayıcı"] },
 "İYOTLU TUZ": { ad: "İyotlu Tuz (Aşırı Doz)", kat: "İşlenmiş Tuz", risk: "orta", organlar: ["Tiroid"], etki: "Türkiye iyot zorunluluk yasası. Tiroid problemi olanlarda fazla tehlikeli. Doğal deniz tuzunda yetersiz.", kaynak: "WHO İyot · Türkiye TGK İyot Tüzüğü", alternatif: "Doğal deniz tuzu + balık/yosun (iyot)" , arar: ["İyotlu Tuz", "Aşırı Doz"] },
 "ŞEKER TOZU RAFINE": { ad: "Tozuna Saf Beyaz Şeker", kat: "İşlenmiş Şeker", risk: "kritik", organlar: ["Pankreas", "Beyin", "Bağışıklık"], etki: "Tüm mineraller, vitaminler arındırılmış. Saf glukoz + sakkaroz. Türkiye'de pancar/kamış sübvansiyonlu. WHO günlük max 25g.", kaynak: "WHO Şeker 2015 · Lancet 2010 · BMJ 2017", alternatif: "Hindistan cevizi, hurma, az miktar bal/pekmez", arar: ["Toz Seker", "Beyaz Seker", "Rafine Seker", "Kristal Seker"] },
 "KAHVE KAFFESTOL": { ad: "Filtrelenmemiş Kahve (Türk/French Press)", kat: "Doğal İçecek", risk: "orta", organlar: ["Kolesterol"], etki: "Kahvedeki kahvestol kolesterolü yükseltir. Filtre kâğıdı tutar. Türk kahvesi filtresiz - günde 1 fincandan fazla risk.", kaynak: "BMJ 2020 Coffee · Cleveland Clinic Kahve", alternatif: "Filtre kahve (kâğıt filtreli)" , arar: ["Filtrelenmemiş Kahve", "Türk/French Press"] },
 "ŞEKER TUZ EKSTRA": { ad: "Şeker + Tuz + Yağ Kombinasyonu (UPF Reçetesi)", kat: "Ultra-İşlenmiş", risk: "kritik", organlar: ["Beyin", "Pankreas", "Bağırsak"], etki: "Endüstri kasıtlı olarak şeker + tuz + yağ üçlüsünü 'bağımlılık noktasında' ayarlar. Cips, çikolata, fast food.", kaynak: "Moss 2013 Salt Sugar Fat · BMJ 2019 UPF · Lancet 2019", alternatif: "Tam gıda, ev yapımı, taze hazırlama" , arar: ["Şeker + Tuz + Yağ Kombinasyonu", "UPF Reçetesi"] },
 "EKMEK FIRIN KUF": { ad: "Mağaza Ekmeği Küf Önleyici (Sodyum Diasetat)", kat: "Koruyucu", risk: "orta", organlar: ["Bağırsak"], etki: "Aylarca raflarda durması için. Doğal değil. Çocuklarda davranış sorunu çalışmaları.", kaynak: "EFSA Sodyum Diasetat · CSPI", alternatif: "Taze ekmek, ekşi maya, ev ekmeği" , arar: ["Mağaza Ekmeği Küf Önleyici", "Sodyum Diasetat", "E262"] },

 "PARMESAN ANALOG": { ad: "Sahte Parmesan (Selüloz Tozu + Süt Tozu)", kat: "Sahte Peynir", risk: "yuksek", organlar: ["Bağırsak"], etki: "ABD'de %8 selüloz (odun tozu) tespit edildi. Türkiye'de 'rendelenmiş peynir' adıyla satılır. Gerçek parmesan %0 selüloz.", kaynak: "FDA 2016 Parmesan · Bloomberg 2016 · CSPI", alternatif: "Gerçek Parmigiano Reggiano, yerel sert peynir", arar: ["Sahte Parmesan", "Selüloz Tozu", "Rendelenmiş Peynir", "Parmesan"] },
 "TULUM PEYNIR HILE": { ad: "Endüstriyel Tulum Peyniri (Bitkisel Yağ Eklemeli)", kat: "Sahte Peynir", risk: "yuksek", organlar: ["Kalp", "Bağırsak"], etki: "Geleneksel tulum yerine süt tozu + palmiye yağı + kazein karışımı. Türkiye'de yaygın peynir hilesi.", kaynak: "TGK Peynir Tebliği · Türkiye Tarım Bakanlığı 2022 Peynir Hile Raporu", alternatif: "Erzincan tulum, mandıra tulumu, sertifikalı", arar: ["Endüstriyel Tulum", "Tulum Peyniri"] },
 "BEYAZ PEYNIR HILE": { ad: "Sahte Beyaz Peynir (Süt Tozu + Bitkisel Yağ)", kat: "Sahte Peynir", risk: "yuksek", organlar: ["Kalp", "Bağırsak"], etki: "Taze süt yerine süt tozu çözeltisi + palmiye + nişasta + sitrat. Türkiye'de 'beyaz peynir' diye satılır.", kaynak: "TGK Peynir Tebliği · Türkiye Bakanlık Hile Raporu", alternatif: "Mandıra peyniri, ev yapımı, sertifikalı", arar: ["Sahte Beyaz Peynir", "Süt Tozu Peynir"] },
 "ÖRGÜLÜ DIL PEYNIR": { ad: "Endüstriyel Dil/Örgü Peyniri (Fosfat + Stabilizör)", kat: "İşlenmiş Peynir", risk: "orta", organlar: ["Böbrek", "Bağırsak"], etki: "Fosfat eklenir (E339), su tutma kapasitesi artırılır. Doğal sünme yerine yapay kıvam.", kaynak: "TGK · EFSA 2019 Fosfat", alternatif: "Gerçek geleneksel dil/örgü peyniri", arar: ["Örgü Peyniri", "Dil Peyniri"] },
 "LABNE ENDÜSTRI": { ad: "Endüstriyel Labne (Süt Tozu + Stabilizör)", kat: "İşlenmiş Süt", risk: "orta", organlar: ["Bağırsak"], etki: "Süzme yoğurt yerine süt tozu + nişasta + sitrat. Pinar, Sek labne.", kaynak: "TGK Labne Tebliği · CSPI", alternatif: "Ev labne (yoğurdu süzerek)", arar: ["Endüstriyel Labne", "Labne"] },
 "TAHIN HILELI": { ad: "Hileli Tahin (Susam + Bitkisel Yağ)", kat: "Sahte Tahin", risk: "yuksek", organlar: ["Kalp", "Bağırsak"], etki: "Saf susam yerine ucuz bitkisel yağ (ayçiçek, soya) eklenmiş. Türkiye'de yaygın hile.", kaynak: "TGK Tahin Tebliği · Tarım Bakanlığı Hile Raporu", alternatif: "%100 susam, taş değirmeni, sertifikalı", arar: ["Hileli Tahin", "Tahin"] },
 "PEKMEZ HILELI": { ad: "Hileli Pekmez (HFCS + Karamel + Karboksimetil Selüloz)", kat: "Sahte Pekmez", risk: "yuksek", organlar: ["Pankreas", "Karaciğer"], etki: "Üzüm pekmezi yerine glikoz şurubu + karamel boya + sentetik aroma. Türkiye en yaygın hile ürünleri.", kaynak: "TGK Pekmez Tebliği · Tarım Bakanlığı Pekmez Hile Raporu", alternatif: "Yerel üretici, geleneksel pekmez, kontrollü", arar: ["Hileli Pekmez", "Pekmez", "Üzüm Pekmezi"] },
 "ZEYTIN OKSITLEYICI": { ad: "Demir Glukonat (E579 - Siyah Zeytin)", kat: "Renklendirici (Oksitleyici)", risk: "orta", organlar: ["Bağırsak"], etki: "Yeşil zeytini siyahlaştırmak için. Kostik soda + demir glukonat. Doğal siyah zeytin farklı.", kaynak: "EFSA 2018 Demir Glukonat · CSPI", alternatif: "Doğal salamura siyah zeytin, dağ zeytini", arar: ["Demir Glukonat", "E579", "Oksitlenmiş Zeytin"] },
 "TURŞU SUYU FORMOL": { ad: "Yapay Sirke / Asetik Asit (E260 - Turşu)", kat: "Asit", risk: "orta", organlar: ["Mide"], etki: "Fermente sirke yerine endüstriyel asetik asit. Faydalı bakteri yok. Salamura turşularda yaygın.", kaynak: "EFSA Asetik Asit · TGK Sirke Tebliği", alternatif: "Geleneksel elma/üzüm sirkesi, ev turşusu", arar: ["Asetik Asit", "E260", "Sentetik Sirke"] },
 "SIRKE HILELI": { ad: "Sentetik Beyaz Sirke (Endüstriyel)", kat: "Sahte Sirke", risk: "orta", organlar: ["Mide", "Bağırsak"], etki: "Fermente değil, alkol + asitleştirici karışımı. Faydalı 'ana sirke bakterisi' yok. Yarar sıfır.", kaynak: "TGK Sirke Tebliği · FDA Vinegar", alternatif: "Filtresiz elma sirkesi, ham sirke (ana ile)", arar: ["Beyaz Sirke", "Endüstriyel Sirke"] },
 "BIBER PASTASI HILELI": { ad: "Hileli Biber Salçası (Domates Salçası + E102 Boyalı)", kat: "Sahte Salça", risk: "yuksek", organlar: ["Sinir Sistemi", "Bağırsak"], etki: "Pul biber ve biber salçası ucuza domates salçası + tartrazin (E102 sarı) + paprika boyası ile yapılır.", kaynak: "TGK Salça Tebliği · Tarım Bakanlığı Hile Raporu", alternatif: "Köy salçası, evde yapım", arar: ["Biber Salçası", "Hileli Salça"] },
 "BAHARAT BOYA": { ad: "Sudan Boyası (Kırmızı Baharat Hilesi)", kat: "Endüstriyel Boya", risk: "kritik", organlar: ["Karaciğer", "Kanser"], etki: "IARC Grup 3 ama kanserojen şüphesi yüksek. Toz kırmızı biber, pul biber, köri, sumakta renk verici olarak yasadışı kullanılır.", kaynak: "EFSA 2003 Sudan · AB Direktifi 2003/460 · Tarım Bakanlığı Hile", alternatif: "Yerel köy biber, kontrollü baharat", arar: ["Sudan Boyası", "Kırmızı Biber Hilesi", "Pul Biber Boyası"] },
 "ZERDEÇAL KURŞUN": { ad: "Zerdeçal (Kurşun Kromat Boyalı)", kat: "Ağır Metal Boyası", risk: "kritik", organlar: ["Beyin", "Kemik"], etki: "Hindistan zerdeçallarına ucuza parlak sarı için kurşun kromat eklenir. Çocuk IQ düşüşü, ölümcül.", kaynak: "Stanford 2019 Kurşun Zerdeçal · Consumer Reports", alternatif: "Yerel Türk zerdeçalı, sertifikalı laboratuvar testli", arar: ["Zerdeçal Kurşun", "Lead Turmeric"] },
 "KÖRI KARIŞIMI": { ad: "Köri Karışımı (Kurşun + Renklendirici)", kat: "Karışık Baharat", risk: "yuksek", organlar: ["Beyin", "Bağırsak"], etki: "Hindistan kaynaklı karışımlar ağır metal ve sentetik renklendirici içerebilir.", kaynak: "Consumer Reports 2021 Baharat · WHO Baharat", alternatif: "Tek tek baharat (yerli), evde karışım", arar: ["Köri", "Curry"] },
 "SUMAK BOYALI": { ad: "Sumak (Tuğla Tozu + Renklendirici Hile)", kat: "Sahte Baharat", risk: "yuksek", organlar: ["Bağırsak", "Akciğer"], etki: "Türkiye'de yaygın hile: gerçek sumağa tuğla tozu veya boyalı talaş karıştırılır.", kaynak: "TGK · Tarım Bakanlığı Hile Raporu", alternatif: "Doğu Anadolu yerli sumak, dane sumak", arar: ["Sumak", "Tuğla Tozu Sumak"] },
 "KIMYON BOYALI": { ad: "Kimyon (Yer Fıstığı + Boya Hilesi)", kat: "Sahte Baharat", risk: "yuksek", organlar: ["Bağışıklık", "Bağırsak"], etki: "AB 2015'te kimyonda yer fıstığı tespit etti (alerjen). Türkiye'de boyalı odun tozu hilesi.", kaynak: "AB 2015 Cumin Alerjen · RASFF 2015", alternatif: "Dane kimyon (öğüt evde), sertifikalı", arar: ["Kimyon", "Kimyon Hilesi"] },
 "TARÇIN CASSIA": { ad: "Cassia Tarçın (Kumarin Yüksek)", kat: "Düşük Kalite Tarçın", risk: "yuksek", organlar: ["Karaciğer", "Pıhtılaşma"], etki: "Ucuz cassia tarçınında kumarin oranı 1000x fazla. AB sınır koydu. Karaciğer hasarı, kanama riski.", kaynak: "EFSA 2008 Kumarin · BfR 2007 Tarçın", alternatif: "Seylan tarçını (Cinnamomum verum)", arar: ["Cassia", "Tarçın", "Cinnamon"] },
 "VANILYA SAHTE": { ad: "Sahte Vanilya Ekstresi (Vanilin + Etanol)", kat: "Sahte Aroma", risk: "orta", organlar: ["Karaciğer"], etki: "Gerçek vanilya çubuğu pahalı, %99 vanilya 'ekstre' sentetik vanilindir.", kaynak: "FDA Vanilla · CSPI", alternatif: "Gerçek vanilya çubuğu, Madagaskar/Tahiti", arar: ["Vanilya Ekstresi", "Sahte Vanilya", "Vanilin"] },
 "KAKAO HILE": { ad: "Hileli Kakao Tozu (Kakao Kabuk + Karbonat)", kat: "Sahte Kakao", risk: "orta", organlar: ["Bağırsak"], etki: "Saf kakao yerine kakao kabuğu (atık) + karbonat işlem + boya. Düşük kalite kakao tozları.", kaynak: "FAO Kakao · CSPI", alternatif: "Saf %100 alkali işlem görmemiş kakao", arar: ["Kakao Tozu", "Hileli Kakao"] },
 "ÇAY BOYA": { ad: "Boyalı Çay (Demir Sülfat - Pakistan/Hindistan)", kat: "Düşük Kalite Çay", risk: "yuksek", organlar: ["Karaciğer", "Bağırsak"], etki: "Kırık eski çayı renklendirmek için demir sülfat veya kurşun bazlı boya. Pakistan/Hindistan kaçak çay sorunu.", kaynak: "WHO Çay · BBC 2018 Çay Hile Raporu", alternatif: "Rize çayı, sertifikalı Türk çayı", arar: ["Boyalı Çay", "Yapay Çay"] },
 "GREEN TEA EKLENMIŞ": { ad: "Aromalı Yeşil Çay (Şeker + Tatlandırıcı + Aroma)", kat: "İşlenmiş Çay", risk: "orta", organlar: ["Pankreas", "Karaciğer"], etki: "Saf yeşil çay yerine şekerli/tatlandırıcı eklenmiş işlenmiş ürün. Pickwick, Lipton Pyramid.", kaynak: "CSPI Tea", alternatif: "Saf yeşil çay yaprağı (matcha, sencha)", arar: ["Aromalı Yeşil Çay", "Green Tea"] },
 "BITKISEL ÇAY KARIŞIM": { ad: "Endüstriyel Bitki Çayı Karışımı (Yapay Aroma)", kat: "İşlenmiş Bitki Çayı", risk: "orta", organlar: ["Karaciğer"], etki: "Gerçek bitki azaltılmış, aroma + sitrik asit eklenmiş. Doğal yarar düşük.", kaynak: "EFSA Bitkisel Çay · CSPI", alternatif: "Tek tek kuru bitki (ev karışım)", arar: ["Bitki Çayı Karışımı", "Bitkisel Çay"] },
 "MATE TEA": { ad: "Mate Çayı (Yüksek Sıcak - Yemek Borusu Kanseri)", kat: "Doğal İçecek", risk: "yuksek", organlar: ["Yemek Borusu", "Mide"], etki: "65°C üzeri sıcak mate IARC Grup 2A muhtemel kanserojen. Yemek borusu kanseri riski.", kaynak: "IARC Vol 116 Sıcak İçecek 2016 · WHO", alternatif: "Soğutulmuş mate, yeşil çay", arar: ["Mate", "Yerba Mate"] },
 "KARABIBER PAPAYA TOHUM": { ad: "Karabiber Hilesi (Papaya Tohumu Karışımı)", kat: "Sahte Baharat", risk: "orta", organlar: ["Karaciğer", "Üreme"], etki: "Türkiye dahil yaygın hile: papaya tohumu (alkaloid içerir) karıştırılır. Uzun süre tehlikeli.", kaynak: "TGK Baharat Tebliği · WHO Baharat", alternatif: "Bütün karabiber dane (evde öğüt)", arar: ["Karabiber", "Black Pepper"] },
 "TUZ DENIZ AĞIR METAL": { ad: "Deniz Tuzu (Mikroplastik + Ağır Metal)", kat: "Kontaminasyon", risk: "yuksek", organlar: ["Bağırsak", "Hormon"], etki: "Tüm dünya deniz tuzlarında mikroplastik tespit (90+ marka). Plastik okyanus kirliliği.", kaynak: "Environ Sci Technol 2017 · Greenpeace Salt", alternatif: "Çankırı kaya tuzu, Himalaya, antik tuz", arar: ["Deniz Tuzu", "Sea Salt"] },
 "HIMALAYA TUZ SAHTE": { ad: "Sahte Himalaya Tuzu (Boyalı Kaya Tuzu)", kat: "Sahte Premium Tuz", risk: "orta", organlar: ["Bağırsak"], etki: "Gerçek Himalaya pembesi nadir. Piyasada satılan %80'i boyalı kaya tuzu. Demir oksit eklenmiş.", kaynak: "Food Control 2019 Salt · CSPI", alternatif: "Sertifikalı pembe tuz, Çankırı kayatuzu", arar: ["Himalaya Tuzu", "Pink Salt"] },
 "MISIR DARI FALCONE": { ad: "GDO Mısır Patlağı (Yağı + MSG + Sentetik Tereyağ)", kat: "İşlenmiş Atıştırmalık", risk: "yuksek", organlar: ["Akciğer", "Bağırsak"], etki: "Sinema mısırı yağı genelde 'movie theater butter' diasetil içerir. Akciğer hastalığı riski.", kaynak: "NIOSH Diasetil · OSHA · CSPI", alternatif: "Sade tuzlu evde patlamış mısır (tencerede)", arar: ["Patlamış Mısır", "Popcorn", "Movie Theater"] },
 "TORTILLA CHIPS": { ad: "Tortilla / Doritos Tarzı Cips", kat: "Ultra-İşlenmiş", risk: "yuksek", organlar: ["Kalp", "Karaciğer", "Bağırsak"], etki: "GDO mısır + soya yağı + MSG + sentetik aroma + renklendirici (E160c). Çocuk hiperaktivite.", kaynak: "EWG GMO · CSPI · Southampton 2007", alternatif: "Sade mısır cipsi (organik), evde yapım", arar: ["Tortilla", "Mısır Cipsi"] },
 "PRETZEL TUZ": { ad: "Pretzel (Yüksek Sodyum + İşlenmiş Un)", kat: "İşlenmiş Atıştırmalık", risk: "yuksek", organlar: ["Tansiyon", "Pankreas"], etki: "Tek pakette 3-4g sodyum. Beyaz un + sodyum hidroksit (kostik) batırma + tuz.", kaynak: "WHO Sodium · CSPI", alternatif: "Tam buğday simit, evde fırın", arar: ["Pretzel"] },
 "GRANULA BAR": { ad: "Granola Bar (Glikoz Şurubu + Palmiye)", kat: "Sahte Sağlıklı", risk: "yuksek", organlar: ["Pankreas", "Diş"], etki: "'Sağlıklı' diye pazarlanır ama tek pakette 3-4 küp şeker. Yulaf %15, geri kalan şeker + yağ.", kaynak: "CSPI Granola · BMJ UPF", alternatif: "Ev yapımı yulaf bar, kuru meyve + ceviz", arar: ["Granola Bar", "Müsli Bar"] },
 "YOĞURT EKSI ENDÜSTRI": { ad: "Endüstriyel Süzme Yoğurt (Süt Tozu + Stabilizör)", kat: "İşlenmiş Süt", risk: "orta", organlar: ["Bağırsak"], etki: "Geleneksel süzme yerine süt tozu + kıvam vericiler (E412, E407). Probiyotik bakteri azaltılmış.", kaynak: "TGK · CSPI", alternatif: "Ev süzme yoğurdu (gerçek pastörize süt)", arar: ["Süzme Yoğurt", "Greek Yogurt"] },
 "KEFIR ENDÜSTRI": { ad: "Endüstriyel Kefir (Süt Tozu + Aroma)", kat: "İşlenmiş Kefir", risk: "orta", organlar: ["Bağırsak"], etki: "Geleneksel kefir taneleri ile yapılan kefir değil. Tek tür bakteri kültürü + süt tozu + meyve aroması.", kaynak: "TGK Kefir · CSPI", alternatif: "Ev kefiri (gerçek tane), yerli üretici", arar: ["Endüstriyel Kefir", "Aromalı Kefir"] },
 "TURŞU BOZULMUŞ": { ad: "Endüstriyel Salata Bar Sirke Suyu", kat: "Sentetik Salamura", risk: "orta", organlar: ["Mide", "Bağırsak"], etki: "Restoranlarda salata barı turşuları genelde sirke + tuz + sodyum benzoat ile yapılır. Fermente değil.", kaynak: "EFSA · CSPI", alternatif: "Ev turşusu (fermente, doğal)", arar: ["Salata Bar Turşu"] },
 "KONSERVE NOHUT": { ad: "Konserve Nohut (BPA + Sodyum + EDTA)", kat: "İşlenmiş Baklagil", risk: "yuksek", organlar: ["Hormon", "Tansiyon", "Mineral"], etki: "BPA + 500mg+ sodyum + EDTA. Hızlı ama hormonal etkili.", kaynak: "EFSA 2023 BPA · CSPI Konserve", alternatif: "Kuru nohut (ıslat, pişir)", arar: ["Konserve Nohut", "Chickpea"] },
 "KONSERVE BARBUNYA": { ad: "Konserve Barbunya / Fasulye (BPA + Sodyum)", kat: "İşlenmiş Baklagil", risk: "yuksek", organlar: ["Hormon", "Tansiyon"], etki: "BPA kutu astar + yüksek sodyum + EDTA. Asitli ortamda BPA emilimi artar.", kaynak: "EFSA BPA · CSPI", alternatif: "Kuru barbunya, evde haşlama", arar: ["Konserve Barbunya", "Konserve Fasulye"] },
 "MERCIMEK ÇORBA HAZIR": { ad: "Hazır Mercimek Çorbası (Knorr, Yayla)", kat: "İşlenmiş Toz", risk: "yuksek", organlar: ["Tansiyon", "Bağırsak"], etki: "Mercimek %20, geri kalan MSG + nişasta + palmiye + bouillon. Tek pakette 5g tuz.", kaynak: "WHO Sodium · CSPI · TGK", alternatif: "Ev mercimek çorbası (taze)", arar: ["Hazır Mercimek", "Knorr Mercimek"] },
 "MAYONEZSIZ HAZIR SOS": { ad: "Hazır Yoğurt Sos / Cacık (Stabilizör)", kat: "İşlenmiş Sos", risk: "orta", organlar: ["Bağırsak"], etki: "Yoğurt + karagenan + nişasta + koruyucu + asit düzenleyici. Doğal değil.", kaynak: "TGK · CSPI", alternatif: "Ev cacığı (yoğurt + salatalık + tuz)", arar: ["Hazır Cacık", "Yoğurt Sos"] },
 "YUKARI MISIR EKMEK": { ad: "Glutensiz Endüstriyel Ekmek (Mısır + Pirinç Nişastası)", kat: "Ultra-İşlenmiş Glutensiz", risk: "yuksek", organlar: ["Pankreas", "Bağırsak"], etki: "Glutensiz pazarlanır ama mısır nişastası + pirinç unu + şeker + emülgatör. Glisemik indeks yüksek.", kaynak: "BMJ 2017 Glutensiz · Mayo Clinic", alternatif: "Doğal glutensiz tahıl (kinoa, karabuğday)", arar: ["Glutensiz Ekmek", "Gluten-Free Bread"] },
 "PALMIYE EKMEK": { ad: "Tost Ekmeği (Yumuşaklık için Palmiye + Şeker)", kat: "İşlenmiş Ekmek", risk: "yuksek", organlar: ["Pankreas", "Kalp"], etki: "Yumuşak kalsın diye palmiye yağı + şeker + emülgatör + L-sistein eklenir. Uzun süreli raf ömrü için kimyasal dolu.", kaynak: "CSPI Bread · WHO", alternatif: "Taze ekmek, ekşi maya tost ekmeği", arar: ["Tost Ekmeği", "Yumuşak Ekmek"] },
 "BAGEL HAZIR": { ad: "Hazır Simit / Bagel (Endüstriyel)", kat: "İşlenmiş Ekmek", risk: "yuksek", organlar: ["Pankreas"], etki: "Beyaz un + L-sistein + emülgatör + palmiye. Gerçek susam yerine sentetik aroma olabilir.", kaynak: "CSPI · TGK", alternatif: "Geleneksel simitçi, taze fırın", arar: ["Hazır Simit", "Endüstriyel Bagel"] },
 "GOFRET WAFER": { ad: "Wafer (Yufkalı Bisküvi) - Beyaz Un + Palmiye Krema", kat: "İşlenmiş Tatlı", risk: "yuksek", organlar: ["Pankreas", "Karaciğer"], etki: "Eti Wafer, Ülker Yupo, Solen Wafer. %50 şeker + palmiye yağı + beyaz un. Çocuk obezite.", kaynak: "WHO Şeker · CSPI", alternatif: "Ev yapım yufka, gerçek krema", arar: ["Wafer", "Yufkalı Bisküvi", "Yupo"] },
 "BISCOTTI": { ad: "Hazır Tahıl Bar / Biscotti (Şeker + Palmiye)", kat: "İşlenmiş Tatlı", risk: "yuksek", organlar: ["Pankreas"], etki: "Tahıl barlar 'sağlıklı' diye satılır ama %40 şeker + palmiye + emülgatör.", kaynak: "BMJ UPF · CSPI", alternatif: "Ev yapım yulaf kurabiye", arar: ["Tahıl Bar", "Müsli Bar", "Biscotti"] },
 "RICE CAKE PIRINÇ KEKİ": { ad: "Pirinç Patlağı (Yüksek Glisemik İndeks)", kat: "İşlenmiş Tahıl", risk: "orta", organlar: ["Pankreas"], etki: "Glisemik indeksi şekerden yüksek (82). 'Diyet ürün' pazarlanır ama kan şekerini fırlatır.", kaynak: "Harvard GI Tablosu · WHO", alternatif: "Yulaf ezmesi, tam tahıl ekmek", arar: ["Pirinç Patlağı", "Rice Cake"] },
 "RAMEN INSTANT MSG": { ad: "Hazır Ramen / Erişte Çorba (Indomie, Nissin)", kat: "Ultra-İşlenmiş", risk: "kritik", organlar: ["Kalp", "Tansiyon", "Bağırsak", "Tiroid"], etki: "TBHQ + MSG + palmiye + 7g+ sodyum + yapay aroma. Tiroid sorunlu olanlarda hızlı problem.", kaynak: "WHO Sodium · CSPI Ramen · J Nutr 2014 Shin Korean Ramen", alternatif: "Doğal erişte, ev çorba", arar: ["Hazır Ramen", "Instant Noodle", "Indomie", "Nissin"] },
 "MIE NOODLE PALMIYE": { ad: "Donmuş/Hazır Erişte (Mie, Udon, Soba - Endüstriyel)", kat: "İşlenmiş Hazır Yemek", risk: "yuksek", organlar: ["Kalp", "Tansiyon"], etki: "Palmiye yağında kızartılmış, sodyum yüklü, koruyucu. 'Asyan otantik' pazarlama.", kaynak: "CSPI · WHO", alternatif: "Doğal kuru erişte (su ile pişir)", arar: ["Hazır Erişte", "Mie", "Udon", "Soba"] },
 "ASYAN HAZIR YEMEK": { ad: "Donmuş Pizza/Lasanya/Hazır Yemek", kat: "Ultra-İşlenmiş", risk: "kritik", organlar: ["Kalp", "Tansiyon", "Bağırsak"], etki: "20+ bileşen, palmiye yağı, MSG, sodyum bombası, koruyucu, GDO. Erol Üzümeri 'Türk Mutfağı', Sütaş Hazır.", kaynak: "BMJ 2019 UPF · WHO Sodium · CSPI", alternatif: "Ev yemeği, taze hazırlama", arar: ["Donmuş Yemek", "Hazır Yemek", "Frozen Meal"] },
 "FAST FOOD MSG": { ad: "Fast Food Sosları (Burger King, McDonald's)", kat: "İşlenmiş Sos", risk: "yuksek", organlar: ["Tansiyon", "Bağırsak", "Sinir"], etki: "Big Mac sosu, BBQ, Ranch tipi soslar yüksek sodyum + MSG + HFCS + soya yağı + EDTA.", kaynak: "CSPI Fast Food · WHO", alternatif: "Ev yapımı sos, taze sebze", arar: ["Fast Food Sos", "Big Mac Sos"] },
 "DOMUZ JAMBON HELAL": { ad: "Hindi/Tavuk 'Jambon' (Mekanik Et + Renklendirici)", kat: "İşlenmiş Et", risk: "yuksek", organlar: ["Mide", "Kolon"], etki: "Helal jambon diye satılan ürünler de nitrit + fosfat + soya proteini + dekstroz içerir.", kaynak: "IARC Vol 114 · TGK", alternatif: "Taze hindi/tavuk göğsü, ev kavurma", arar: ["Hindi Jambon", "Tavuk Jambon"] },
 "PEYNIRLI POĞAÇA HAZIR": { ad: "Hazır Poğaça / Açma (Endüstriyel)", kat: "İşlenmiş Hamur", risk: "yuksek", organlar: ["Kalp", "Pankreas"], etki: "Beyaz un + palmiye + emülgatör + L-sistein + analog peynir. Eti, Ülker, Banvit hazır.", kaynak: "TGK · CSPI · WHO Trans Yağ", alternatif: "Ev pogacası, yerel fırın", arar: ["Hazır Poğaça", "Hazır Açma"] },

 "KURUYEMIS TUZLU KAVRULMUŞ": { ad: "Kavrulmuş Tuzlu Kuruyemiş (Palmiye Yağında)", kat: "İşlenmiş Kuruyemiş", risk: "yuksek", organlar: ["Tansiyon", "Kalp"], etki: "Çoğu firma palmiye yağında kavurur. MSG, sodyum bombası, akrilamid riski (yüksek ısı).", kaynak: "EFSA Akrilamid · CSPI · WHO Sodium", alternatif: "Çiğ kuruyemiş, evde kavrulmuş tuzsuz", arar: ["Kavrulmuş Kuruyemiş", "Tuzlu Kuruyemiş", "Cerez"] },
 "AYÇIÇEK ÇEKIRDEĞI TUZLU": { ad: "Tuzlu Ayçiçek Çekirdeği (Çiğdem)", kat: "İşlenmiş Kuruyemiş", risk: "yuksek", organlar: ["Tansiyon", "Diş"], etki: "Sodyum yüklü, dış kabuk diş enamelini aşındırır. Tadım Çiğdem, Peyman tarzı.", kaynak: "WHO Sodium · ADA Diş Sağlığı", alternatif: "Çiğ ayçiçek çekirdeği, az tuzlu", arar: ["Ayçiçek Çekirdeği", "Çiğdem", "Tuzlu Çekirdek"] },
 "KABAK ÇEKIRDEĞI TUZ": { ad: "Tuzlu Kabak Çekirdeği (Endüstriyel)", kat: "İşlenmiş Kuruyemiş", risk: "orta", organlar: ["Tansiyon"], etki: "Tuz emdirilmiş, yüksek sodyum. Acılaşma için bazen sülfit eklenir.", kaynak: "WHO Sodium · CSPI", alternatif: "Çiğ kabak çekirdeği, hafif kavurma", arar: ["Kabak Çekirdeği", "Tuzlu Kabak"] },
 "FISTIK TUZ ŞEKER": { ad: "Aromalı Fıstık (Bal-Tuz, Wasabi, Soya)", kat: "İşlenmiş Kuruyemiş", risk: "yuksek", organlar: ["Pankreas", "Kalp"], etki: "Şeker + tuz + MSG + sentetik aroma. 'Sağlıklı' diye satılır.", kaynak: "CSPI Nut Snacks · WHO", alternatif: "Çiğ yer fıstığı, evde hafif kavurma", arar: ["Aromalı Fıstık", "Bal Fıstık", "Wasabi Fıstık"] },
 "KAJU HAVA AĞIR METAL": { ad: "Kaju (Yüksek Kadmiyum Riski)", kat: "Kuruyemiş", risk: "orta", organlar: ["Böbrek", "Kemik"], etki: "Doğal olarak yüksek kadmiyum içerir. EFSA günlük sınır koydu. Çocukta aşırı tüketim risk.", kaynak: "EFSA 2009 Kadmiyum · WHO", alternatif: "Badem, fındık, ceviz", arar: ["Kaju", "Cashew"] },
 "BADEM HIDROSIYANIK": { ad: "Acı Badem (Hidrosiyanik Asit)", kat: "Doğal Toksin", risk: "yuksek", organlar: ["Kalp", "Sinir Sistemi"], etki: "Acı badem siyanür öncülü amigdalin içerir. 7-10 tane çocuk için ölümcül. Tatlı badem güvenli.", kaynak: "EFSA 2016 Amigdalin · WHO", alternatif: "Tatlı badem (yumuşak kabuk)", arar: ["Acı Badem", "Bitter Almond"] },
 "MAGNEZYUM SILIKAT": { ad: "Magnezyum Silikat (E553b - Talk)", kat: "Topaklanmayı Önleyici", risk: "yuksek", organlar: ["Akciğer", "Bağırsak"], etki: "Talk asbest içerebilir. IARC Grup 1 (partikül solunum yolu). Sakız tozu, pirinç, vitamin haplarında.", kaynak: "IARC Vol 93 Talk · EFSA 2018 · NTP", alternatif: "Doğal topaklayıcı yok ürün", arar: ["Talk", "Magnezyum Silikat", "E553"] },
 "SILIKON DIOKSIT": { ad: "Silikon Dioksit (E551)", kat: "Topaklanmayı Önleyici", risk: "orta", organlar: ["Bağırsak", "Bağışıklık"], etki: "Nano partikül formu bağırsak iltihabı riski. Tuz, baharat, hap kapsülünde.", kaynak: "EFSA 2018 E551 · Particle Fibre Toxicol 2019", alternatif: "Doğal topaklayıcı yok ürün", arar: ["Silikon Dioksit", "E551"] },
 "ALÜMINOSILIKAT": { ad: "Sodyum Alüminosilikat (E554)", kat: "Topaklanmayı Önleyici", risk: "yuksek", organlar: ["Beyin", "Kemik"], etki: "Alüminyum içerir, birikim Alzheimer riski. Tuz, baharat, süt tozunda.", kaynak: "EFSA 2008 Alüminyum · WHO Alüminyum", alternatif: "Doğal pirinç tanesi (geleneksel topaklayıcı)", arar: ["Sodyum Alüminosilikat", "E554"] },
 "FERROSIYANUR": { ad: "Sodyum Ferrosiyanür (E535)", kat: "Topaklanmayı Önleyici", risk: "orta", organlar: ["Böbrek"], etki: "Tuz topaklanmasını önler. Yüksek dozda siyanür salar. AB sınır koydu.", kaynak: "EFSA 2018 Ferrosiyanür", alternatif: "Doğal kaya tuzu", arar: ["Sodyum Ferrosiyanür", "E535"] },

 "PIDE LAHMACUN HAMUR": { ad: "Hazır Lahmacun / Pide Hamuru (Endüstriyel)", kat: "İşlenmiş Hamur", risk: "yuksek", organlar: ["Pankreas", "Kalp"], etki: "Beyaz un + L-sistein + emülgatör + maya + koruyucu. Geleneksel hamur değil.", kaynak: "TGK · CSPI", alternatif: "Ev hamuru, taze pide", arar: ["Lahmacun Hamuru", "Pide Hamuru"] },
 "BÖREK YUFKA HAZIR": { ad: "Hazır Yufka (Endüstriyel)", kat: "İşlenmiş Hamur", risk: "orta", organlar: ["Pankreas"], etki: "Beyaz un + nişasta + tuz + koruyucu (potasyum sorbat). Geleneksel ince yufka değil.", kaynak: "TGK · CSPI", alternatif: "Geleneksel açık yufka, ev yapımı", arar: ["Hazır Yufka", "Endüstriyel Yufka"] },
 "MANTI HAZIR DONMUŞ": { ad: "Donmuş Mantı (Etli/Peynirli)", kat: "İşlenmiş Hamur", risk: "yuksek", organlar: ["Bağırsak", "Pankreas"], etki: "Karışık et + soya proteini + nişasta + MSG + analog peynir. %60 et değil.", kaynak: "TGK · CSPI", alternatif: "Ev mantısı, geleneksel Kayseri", arar: ["Donmuş Mantı", "Mantı"] },
 "GÖZLEME DONMUŞ": { ad: "Donmuş Gözleme (Peynirli, Patatesli)", kat: "İşlenmiş Hamur", risk: "yuksek", organlar: ["Kalp", "Bağırsak"], etki: "Beyaz un + palmiye + analog peynir + sodyum. Geleneksel gözleme değil.", kaynak: "TGK · CSPI", alternatif: "Ev gözlemesi, geleneksel sac", arar: ["Donmuş Gözleme", "Gözleme"] },
 "MUSAKKA HAZIR": { ad: "Hazır Musakka / Karnıyarık (Konserve)", kat: "İşlenmiş Hazır Yemek", risk: "yuksek", organlar: ["Tansiyon", "Kalp"], etki: "Sodyum bombası + bitkisel yağ + koruyucu + modifiye nişasta.", kaynak: "TGK · CSPI", alternatif: "Ev yemeği, taze sebze", arar: ["Hazır Musakka", "Karnıyarık", "Konserve Yemek"] },
 "DOLMA HAZIR YAPRAK": { ad: "Konserve Yaprak Sarma (Sirke + Tuz)", kat: "İşlenmiş Hazır Yemek", risk: "yuksek", organlar: ["Tansiyon", "Mide"], etki: "Yüksek sodyum + asetik asit + ucuz bitkisel yağ. Geleneksel zeytinyağlı dolma değil.", kaynak: "TGK · CSPI", alternatif: "Ev dolması, zeytinyağlı", arar: ["Konserve Yaprak Sarma", "Hazır Dolma"] },
 "KÖFTE EV TANELI": { ad: "Köfteci Köftesi / Restoran Köfte (TVP + Soya)", kat: "İşlenmiş Et", risk: "yuksek", organlar: ["Bağırsak", "Kalp"], etki: "Restoran köftesi genelde TVP (texturized vegetable protein) + soya + ekmek dolgusu. %50+ et değil.", kaynak: "CSPI Restaurant Meat · TGK", alternatif: "Kasaptan kıyma, ev köftesi", arar: ["Restoran Köfte", "Köfteci Köfte"] },
 "ETLI EKMEK HAZIR": { ad: "Hazır Etli Ekmek / Lahmacun (Donmuş)", kat: "İşlenmiş Hazır", risk: "yuksek", organlar: ["Kalp", "Bağırsak"], etki: "Karma et + soya + palmiye + tuz. Konya tipi 'geleneksel' diye pazarlanır.", kaynak: "TGK · CSPI", alternatif: "Geleneksel fırın, ev yapımı", arar: ["Etli Ekmek", "Donmuş Lahmacun"] },
 "PIZZA HAZIR TABAN": { ad: "Hazır Pizza Tabanı (Endüstriyel)", kat: "İşlenmiş Hamur", risk: "yuksek", organlar: ["Pankreas", "Kalp"], etki: "Beyaz un + palmiye + L-sistein + emülgatör + uzun raf ömrü için koruyucu.", kaynak: "TGK · CSPI", alternatif: "Ev pizza hamuru", arar: ["Pizza Tabanı", "Hazır Hamur"] },
 "MILFOY HAZIR": { ad: "Milföy Hamuru (Margarin Kremalı)", kat: "İşlenmiş Hamur", risk: "kritik", organlar: ["Kalp", "Damar"], etki: "Tereyağı yerine endüstriyel margarin (trans yağ kalıntısı). Beyaz un + emülgatör.", kaynak: "WHO Trans Yağ · CSPI · TGK", alternatif: "Ev milföyü (tereyağı ile)", arar: ["Milföy", "Puff Pastry"] },
 "KEK KARIŞIM TOZ": { ad: "Hazır Kek Karışımı Tozu (Dr. Oetker, Ülker)", kat: "İşlenmiş Toz", risk: "yuksek", organlar: ["Pankreas", "Bağışıklık"], etki: "Beyaz un + şeker + emülgatör + yapay aroma + renklendirici + propilen glikol.", kaynak: "CSPI Cake Mix · EFSA", alternatif: "Ev kek hamuru, doğal malzemeler", arar: ["Kek Karışımı", "Cake Mix", "Hazır Kek"] },
 "DONMUS HAMURIŞI": { ad: "Donmuş Hamur İşi (Kruvasan, Brioche)", kat: "İşlenmiş Hamur", risk: "yuksek", organlar: ["Kalp", "Pankreas"], etki: "Yüksek palmiye + şeker + yumurta tozu + L-sistein. Banvit, Eti hazır.", kaynak: "TGK · CSPI · BMJ UPF", alternatif: "Geleneksel fırın, taze yapım", arar: ["Donmuş Kruvasan", "Donmuş Hamur İşi"] },
 "PASTANE PASTASI": { ad: "Pastane Pastası (Margarin Kreması)", kat: "İşlenmiş Tatlı", risk: "kritik", organlar: ["Kalp", "Pankreas", "Damar"], etki: "Süt kreması yerine margarin krem (trans yağ), yapay aroma, renklendirici (E102, E110, E120).", kaynak: "WHO Trans · CSPI · Southampton 2007", alternatif: "Ev pastası (gerçek krema, tereyağı)", arar: ["Pastane Pastası", "Yaş Pasta"] },
 "BAKLAVA HAZIR": { ad: "Endüstriyel Baklava (Margarin + HFCS Şerbet)", kat: "İşlenmiş Tatlı", risk: "kritik", organlar: ["Kalp", "Pankreas"], etki: "Tereyağı yerine margarin, gerçek antep fıstığı yerine ucuz fıstık, HFCS şerbet. Geleneksel değil.", kaynak: "TGK Baklava · WHO Trans · CSPI", alternatif: "Geleneksel baklavacı (tereyağı, antep fıstığı)", arar: ["Endüstriyel Baklava", "Donmuş Baklava"] },
 "LOKUM ENDÜSTRI": { ad: "Endüstriyel Lokum (HFCS + Mısır Nişastası)", kat: "İşlenmiş Tatlı", risk: "yuksek", organlar: ["Pankreas", "Diş"], etki: "Geleneksel lokum yerine glikoz şurubu + sentetik aroma + renklendirici. Şeker bombası.", kaynak: "TGK · CSPI", alternatif: "Geleneksel lokumcu (Hacı Bekir, Koska)", arar: ["Endüstriyel Lokum", "Lokum"] },
 "HELVA ENDÜSTRI": { ad: "Endüstriyel Tahin Helvası (HFCS + Hileli Tahin)", kat: "İşlenmiş Tatlı", risk: "yuksek", organlar: ["Pankreas", "Karaciğer"], etki: "Saf susam tahini yerine bitkisel yağ karıştırılır + HFCS şerbet. Türkiye'de yaygın hile.", kaynak: "TGK · Tarım Bakanlığı Helva Hile Raporu", alternatif: "Geleneksel helva, sertifikalı", arar: ["Endüstriyel Helva", "Tahin Helvası"] },
 "REVANI ENDUSTRI": { ad: "Hazır Şerbetli Tatlılar (Revani, Şekerpare, Tulumba)", kat: "İşlenmiş Tatlı", risk: "kritik", organlar: ["Pankreas", "Kalp"], etki: "Margarin + HFCS şerbet + yapay aroma. Yüksek glisemik indeks. Eti, Ülker hazır.", kaynak: "TGK · WHO · CSPI", alternatif: "Ev yapımı geleneksel tatlı", arar: ["Şerbetli Tatlı", "Hazır Revani", "Tulumba"] },
 "DONDURMA GELATO": { ad: "Endüstriyel Gelato (Süt Tozu + Stabilizör + Aroma)", kat: "İşlenmiş Dondurma", risk: "yuksek", organlar: ["Bağırsak", "Pankreas"], etki: "İtalyan stili pazarlanır ama süt tozu + emülgatör + sentetik aroma + renklendirici.", kaynak: "TGK · CSPI", alternatif: "Geleneksel İtalyan gelato, ev yapımı", arar: ["Gelato", "Endüstriyel Dondurma"] },
 "KAYMAKLI DONDURMA": { ad: "Maraş Tipi Dondurma (Sahlep + Karayel Hilesi)", kat: "İşlenmiş Dondurma", risk: "orta", organlar: ["Bağırsak"], etki: "Geleneksel sahlep nadir bulunduğu için yerine guar sakızı + keçiboynuzu sakızı. Helal/koşer kontrolsüz.", kaynak: "TGK Dondurma · CSPI", alternatif: "Gerçek Maraş dondurması (sertifikalı)", arar: ["Maraş Dondurması", "Kaymaklı Dondurma"] },

 "KETCHUP GIZLI HFCS": { ad: "'Az Şekerli' Ketçap (HFCS + Tatlandırıcı)", kat: "Sahte Sağlıklı Sos", risk: "yuksek", organlar: ["Pankreas", "Karaciğer"], etki: "'Az şekerli' pazarlama. HFCS + sukraloz + asesülfam karışımı. Heinz Light, Calve Light.", kaynak: "CSPI · WHO Sweetener", alternatif: "Ev ketçapı (taze domates + bal)", arar: ["Light Ketçap", "Az Şekerli Ketçap"] },
 "DIYET SOS": { ad: "Diyet Salata Sosu (Sukraloz + EDTA + Soya)", kat: "İşlenmiş Sos", risk: "yuksek", organlar: ["Bağırsak", "Hormon"], etki: "Hafif diye satılır ama yapay tatlandırıcı + EDTA + GDO soya yağı. Bağırsak florası bozucu.", kaynak: "Nature 2014 Suez · CSPI", alternatif: "Zeytinyağı + limon, ev sos", arar: ["Diyet Sos", "Light Salad Dressing"] },
 "RANCH SOSU": { ad: "Ranch Sosu (Soya Yağı + MSG + Aroma)", kat: "İşlenmiş Sos", risk: "yuksek", organlar: ["Kalp", "Bağırsak"], etki: "Yoğurt değil, soya yağı + yumurta tozu + MSG + kuru sebze tozu + EDTA.", kaynak: "CSPI Ranch · WHO", alternatif: "Ev cacığı, yoğurt sos", arar: ["Ranch Sosu", "Ranch Dressing"] },
 "SOS THOUSAND ISLAND": { ad: "Thousand Island / Cocktail Sos", kat: "İşlenmiş Sos", risk: "yuksek", organlar: ["Pankreas", "Tansiyon"], etki: "Mayonez + ketçap + HFCS + sodyum bombası + renklendirici. Şeker yüklü.", kaynak: "CSPI · WHO", alternatif: "Ev kokteyl sos, taze malzeme", arar: ["Thousand Island", "Cocktail Sos"] },
 "TARTAR SOS": { ad: "Tartar Sosu (Mayonez + Şeker + Koruyucu)", kat: "İşlenmiş Sos", risk: "yuksek", organlar: ["Kalp"], etki: "Soya yağı + sirke + şeker + EDTA + koruyucu. 'Ev yapımı' tartar yok denecek kadar farklı.", kaynak: "CSPI · TGK", alternatif: "Ev tartar (mayonez + turşu + maydanoz)", arar: ["Tartar Sos"] },
 "SARIMSAK SOS HAZIR": { ad: "Hazır Sarımsaklı Sos (Kürlenmiş Sarımsak Tozu)", kat: "İşlenmiş Sos", risk: "orta", organlar: ["Bağırsak"], etki: "Taze sarımsak yerine işlenmiş toz + soya yağı + koruyucu. Yarar düşük.", kaynak: "CSPI · TGK", alternatif: "Ev sarımsak sosu (taze sarımsak)", arar: ["Sarımsaklı Sos", "Garlic Sauce"] },
 "ACI SOS HAZIR": { ad: "Hazır Acı Sos (Sirke + E110 + Aroma)", kat: "İşlenmiş Sos", risk: "yuksek", organlar: ["Bağırsak", "Mide"], etki: "Tabasco, Sriracha. HFCS + sirke + tartrazin (sarı 5) + sodyum benzoat.", kaynak: "CSPI · WHO", alternatif: "Ev acı sos, taze biber", arar: ["Acı Sos", "Hot Sauce", "Tabasco", "Sriracha"] },
 "SOYA SOSU ENDÜSTRI": { ad: "Endüstriyel Soya Sosu (Caramel + HVP)", kat: "Sahte Soya Sosu", risk: "kritik", organlar: ["Sinir Sistemi", "Kanser"], etki: "Geleneksel fermentasyon değil. Asit hidrolize + karamel + tuz. 3-MCPD kanserojen kontaminantı.", kaynak: "AB Reg 2020/1322 · IARC 3-MCPD", alternatif: "Geleneksel fermente Tamari, Shoyu", arar: ["Endüstriyel Soya Sosu", "Soya Sosu", "Soy Sauce"] },
 "TERIYAKI HAZIR": { ad: "Teriyaki Sos (HFCS + Soya Sosu Endüstriyel)", kat: "İşlenmiş Sos", risk: "yuksek", organlar: ["Pankreas", "Sinir Sistemi"], etki: "HFCS + endüstriyel soya sosu + zencefil aroması + sodyum bombası.", kaynak: "CSPI · WHO", alternatif: "Ev teriyaki (geleneksel)", arar: ["Teriyaki", "Teriyaki Sos"] },
 "BALSAMIK SAHTE": { ad: "Sahte Balsamik Sirke (Karamel + Boya)", kat: "Sahte Balsamik", risk: "orta", organlar: ["Mide", "Pankreas"], etki: "Geleneksel Modena balsamik 12 yıl olgunlaşır. Marketteki %95'i karamel + boya + sirke karışımı.", kaynak: "İtalya DOP · CSPI", alternatif: "Sertifikalı Aceto Balsamico di Modena", arar: ["Sahte Balsamik", "Balsamik Sirke"] },

 "SPREY YAĞ": { ad: "Sprey Yağ (Tava Yağı - Propelan Gaz)", kat: "İşlenmiş Yağ", risk: "yuksek", organlar: ["Karaciğer", "Akciğer"], etki: "Yağ + propelan gaz (butan, propan) + lesitin + emülgatör. PFAS kalıntısı raporları.", kaynak: "EWG · CSPI Cooking Spray", alternatif: "Sızma zeytinyağı (cam şişe)", arar: ["Sprey Yağ", "Cooking Spray"] },
 "ZEYTINYAĞI ENDÜSTRI": { ad: "Endüstriyel Sızma Zeytinyağı (Karışım)", kat: "Sahte Premium Yağ", risk: "yuksek", organlar: ["Kalp", "Karaciğer"], etki: "Türkiye/İtalya/İspanya: 'sızma' diye satılan zeytinyağlarının %70'i karışık (ayçiçek, soya).", kaynak: "UC Davis 2017 · İtalya Adalet 2017 · Türkiye Tarım Bakanlığı", alternatif: "Yerel üretici, soğuk sıkım, sertifikalı", arar: ["Sızma Zeytinyağı", "Endüstriyel Zeytinyağı"] },
 "POMACE": { ad: "Pomace Zeytinyağı (Atık Posa Çözücü ile)", kat: "Düşük Kalite Yağ", risk: "yuksek", organlar: ["Karaciğer", "Bağırsak"], etki: "Zeytin posasından heksanla çıkarılır. Saf zeytinyağı değil. PAH (kanserojen) tespit edildi.", kaynak: "EFSA Pomace · AB 2002 PAH", alternatif: "Sızma zeytinyağı (cold-pressed)", arar: ["Pomace", "Posa Yağı", "Pirina Yağı"] },
 "RAFINE ZEYTINYAĞI": { ad: "Rafine Zeytinyağı (Yüksek Isıl İşlem)", kat: "İşlenmiş Yağ", risk: "orta", organlar: ["Bağırsak"], etki: "Acılaşmış sızma yağ rafinasyondan geçer. Tat ve antioksidanlar kaybolur. 'Riviera' tarzı.", kaynak: "EFSA · CSPI", alternatif: "Sızma soğuk sıkım", arar: ["Rafine Zeytinyağı", "Light Olive Oil", "Riviera"] },
 "GHEE SAHTE": { ad: "Endüstriyel Ghee (Süt Yağı + Bitkisel Yağ)", kat: "Sahte Tereyağı", risk: "yuksek", organlar: ["Kalp"], etki: "Geleneksel ghee yerine bitkisel yağ + süt yağı karışımı. Türkiye/Hindistan yaygın hile.", kaynak: "FSSAI India · TGK", alternatif: "Geleneksel sade yağ (ghee, kuyruk yağı)", arar: ["Ghee", "Sade Yağ"] },
 "TEREYAĞI KARIŞIM": { ad: "Tereyağı + Bitkisel Yağ Karışımı ('Sürülebilir')", kat: "Sahte Tereyağı", risk: "yuksek", organlar: ["Kalp", "Bağışıklık"], etki: "Tereyağı %50, palmiye + ayçiçek %50. 'Tereyağı' adı satışı yanıltıcı.", kaynak: "TGK Tereyağı · CSPI", alternatif: "Saf tereyağı (Trabzon, Erzincan)", arar: ["Sürülebilir Tereyağı", "Karışım Tereyağı"] },
 "DALYAN BAL ŞURUP": { ad: "Bal Şurubu Eklemeli Sahte Bal (Çin İthalat)", kat: "Sahte Bal", risk: "yuksek", organlar: ["Pankreas", "Karaciğer"], etki: "Çin'den ithal bal yaygın olarak HFCS, pirinç şurubu, mısır şurubu karıştırılmış. Türkiye'de sorun.", kaynak: "EU Honey Authentication · Türkiye Tarım Bakanlığı Bal Hile Raporu", alternatif: "Yerel arıcı, dağ balı, sertifikalı", arar: ["Sahte Bal", "Bal Şurubu", "Çin Balı"] },

 "DETERJAN KOKU": { ad: "Yapay Parfüm (Çamaşır Deterjanı)", kat: "Sentetik Koku", risk: "yuksek", organlar: ["Solunum", "Hormon", "Cilt"], etki: "100+ kimyasal 'parfüm' altında saklı. Astım, alerji, hormon bozucu. Persil, Ariel, Omo.", kaynak: "EWG Deterjan · IARC Ftalat", alternatif: "Doğal sabun, parfümsüz deterjan", arar: ["Deterjan Parfümü", "Yapay Koku"] },
 "TUVALET KAĞIDI BPA": { ad: "Geri Dönüşüm Tuvalet Kağıdı (BPA + PFAS)", kat: "Kağıt Kontaminantı", risk: "yuksek", organlar: ["Cilt", "Hormon"], etki: "Geri dönüşümlü kağıtta termal kasa fişlerinden BPA ve PFAS bulaşıyor. Yumuşak cilt teması.", kaynak: "EWG 2023 Tuvalet Kağıdı · EFSA BPA", alternatif: "BPA-free etiketli, bambu tuvalet kağıdı", arar: ["Tuvalet Kağıdı", "Geri Dönüşüm Kağıt"] },
 "WET WIPES KIMYASAL": { ad: "Islak Mendil (Quaternium-15, Parfüm)", kat: "Kişisel Bakım Kimyasalı", risk: "yuksek", organlar: ["Cilt", "Hormon"], etki: "Formaldehit salar (Quaternium-15), parfüm, paraben. Bebek için tehlikeli.", kaynak: "EWG Skin Deep · CIR · IARC Formaldehit", alternatif: "Sade su + pamuk, organik bebek mendili", arar: ["Islak Mendil", "Wet Wipes", "Quaternium"] },
 "TENCERELI TEFLON": { ad: "Teflon / Yapışmaz Tencere (PFOA, PFOS)", kat: "Sonsuz Kimyasal", risk: "kritik", organlar: ["Hormon", "Karaciğer", "Kanser"], etki: "IARC PFOA Grup 1 kanserojen (2023). Aşırı ısıda toksin salar. AB sınır, ABD yasak (2015 sonra).", kaynak: "IARC 2023 PFOA · EPA 2024 · EWG PFAS", alternatif: "Dökme demir, paslanmaz çelik, seramik", arar: ["Teflon", "Yapışmaz Tencere", "PFOA", "Non-stick"] },

 "STARBUCKS FRAPPUCCINO": { ad: "Hazır Frappuccino / Soğuk Kahve İçeceği", kat: "Şekerli Kahve", risk: "kritik", organlar: ["Pankreas", "Kalp", "Beyin"], etki: "200ml içecekte 30-40g şeker (10 küp). HFCS + karra + aroma + kafein bombası.", kaynak: "CSPI · WHO Şeker", alternatif: "Sade kahve, sütlü soğuk kahve (şekersiz)", arar: ["Frappuccino", "Hazır Soğuk Kahve", "Soğuk Kahve"] },
 "3 IN 1 KAHVE": { ad: "3'ü 1 Arada Kahve (Şeker + Krema Tozu)", kat: "Hazır Kahve Karışımı", risk: "kritik", organlar: ["Pankreas", "Kalp"], etki: "İnstant kahve + şeker + hidrojenize bitkisel yağ tozu. Trans yağ + şeker yüklü.", kaynak: "CSPI · WHO · BMJ UPF", alternatif: "Türk kahvesi (sade), filtre kahve", arar: ["3'ü 1 Arada", "3 in 1 Kahve", "Hazır Kahve"] },
 "KREMA TOZU": { ad: "Kahve Kreması Tozu (Bitkisel Yağ + Şeker)", kat: "Sahte Süt Tozu", risk: "yuksek", organlar: ["Kalp", "Karaciğer"], etki: "Süt değil, hidrojenize bitkisel yağ + glikoz şurubu + kazein + emülgatör. Coffee Mate.", kaynak: "CSPI Coffee Creamer · WHO Trans", alternatif: "Gerçek süt, krema", arar: ["Kahve Kreması", "Krema Tozu", "Coffee Mate"] },
 "DECAFF KAHVE METIL": { ad: "Kafeinsiz Kahve (Metilen Klorür İşlemli)", kat: "İşlenmiş Kahve", risk: "yuksek", organlar: ["Sinir Sistemi", "Karaciğer"], etki: "Kafein çıkarımı için metilen klorür (boya inceltici) kullanılır. IARC Grup 2A muhtemel kanserojen. EPA 2024 yasakladı.", kaynak: "IARC Vol 71 Metilen · EPA 2024 · FDA", alternatif: "Su işlemli (Swiss Water) kafeinsiz kahve", arar: ["Decaff", "Kafeinsiz Kahve", "Decaffeinated"] },
 "K-CUP KAPSÜL": { ad: "Kahve Kapsülü (Nespresso, Tassimo, K-Cup)", kat: "Plastik Ambalaj", risk: "yuksek", organlar: ["Hormon", "Karaciğer"], etki: "Plastik/alüminyum kapsül sıcak suyla temasta toksin salar. Mikroplastik, BPA, ftalat.", kaynak: "Environ Sci Technol 2020 Kapsül · Greenpeace", alternatif: "French press, filtre kahve, Türk kahvesi", arar: ["Kahve Kapsülü", "Nespresso", "K-Cup", "Tassimo"] },
 "ENERJI JEL": { ad: "Sporcu Enerji Jeli (Maltodekstrin + Kafein + Tatlandırıcı)", kat: "Sporcu Ürünü", risk: "yuksek", organlar: ["Pankreas", "Kalp"], etki: "Maltodekstrin + fruktoz + kafein + sodyum + sukraloz. GU, Hammer Gel, PowerGel.", kaynak: "CSPI Sport Gel · ACSM", alternatif: "Hurma, kuru üzüm, muz", arar: ["Enerji Jeli", "Energy Gel", "Sporcu Jeli"] },
 "PROTEIN BAR INFLAMATION": { ad: "Protein Bar / Fit Bar (Tatlandırıcı + Şeker Alkolü)", kat: "Ultra-İşlenmiş", risk: "yuksek", organlar: ["Bağırsak", "Karaciğer"], etki: "Whey + maltitol/sorbitol (ishal, gaz) + palmiye + 20+ bileşen. Şeker yerine inflamasyon.", kaynak: "BMJ UPF · CSPI", alternatif: "Yumurta, fıstık ezmesi, yoğurt", arar: ["Protein Bar", "Fit Bar"] },
 "MASS GAINER": { ad: "Kütle Kazandırıcı / Mass Gainer Tozu", kat: "Spor Takviye", risk: "yuksek", organlar: ["Karaciğer", "Böbrek", "Pankreas"], etki: "Maltodekstrin + whey + şeker (50g/porsiyon) + sentetik vitamin + aroma. Karaciğer baskısı.", kaynak: "Mayo Clinic · ACSM", alternatif: "Doğal beslenme, pirinç + et + yumurta", arar: ["Mass Gainer", "Kütle Kazandırıcı"] },
 "BCAA TOZ": { ad: "BCAA Tozu (Yapay Tatlandırıcı + Aroma)", kat: "Spor Takviye", risk: "orta", organlar: ["Karaciğer"], etki: "BCAA fayda kanıtı sınırlı (Cochrane 2019). Sukraloz + asesülfam + aroma + renklendirici.", kaynak: "Cochrane 2019 BCAA · Nature 2014", alternatif: "Et, balık, yumurta (doğal BCAA)", arar: ["BCAA", "Branch Chain Amino"] },
 "PRE-WORKOUT": { ad: "Antrenman Öncesi (Kafein + Stimülan Karışımı)", kat: "Spor Takviye", risk: "kritik", organlar: ["Kalp", "Sinir Sistemi", "Beyin"], etki: "Kafein + DMAA (yasak) + beta-alanin + sentetik karışım. Kalp ritim bozukluğu, ani ölüm raporu.", kaynak: "FDA DMAA Warning · NEJM 2013 Pre-Workout", alternatif: "Sade kahve, banana + tuz, kuru meyve", arar: ["Pre-Workout", "Antrenman Öncesi"] },
 "FAT BURNER": { ad: "Yağ Yakıcı (Sinefrin + Yohimbin + Kafein)", kat: "Spor Takviye", risk: "kritik", organlar: ["Kalp", "Sinir Sistemi"], etki: "Sinefrin (yasak efedrin yerine), yohimbin, yeşil çay özü megadoz. Kalp krizi vakaları.", kaynak: "FDA Fat Burner Warning · NEJM 2012 Hydroxycut", alternatif: "Egzersiz, kalori açığı, sağlıklı beslenme", arar: ["Yağ Yakıcı", "Fat Burner"] },
 "DETOKS ÇAY": { ad: "Detoks / Zayıflama Çayı (Sennoside + Diüretik)", kat: "Bitki Karışımı", risk: "yuksek", organlar: ["Bağırsak", "Böbrek", "Elektrolit"], etki: "Sennoside (laksatif) içerir. Bağırsak hasarı, elektrolit kaybı. 'Doğal' diye aldatıcı.", kaynak: "EFSA 2018 Sennoside · NIH NCCIH Detox", alternatif: "Su, taze sebze meyve, lif", arar: ["Detoks Çay", "Zayıflama Çayı", "Slimming Tea"] },

 "JELIBON HARIBO": { ad: "Jelibon (Haribo, Trolli, Olips)", kat: "İşlenmiş Şekerleme", risk: "yuksek", organlar: ["Pankreas", "Bağışıklık", "Diş"], etki: "Şeker + glikoz şurubu + jelatin (domuz) + yapay renk (E102, E110, E129, E133) + parlatıcı (E901).", kaynak: "Southampton 2007 · CSPI · WHO Şeker", alternatif: "Kuru meyve, hurma, ev jölesi", arar: ["Jelibon", "Haribo", "Trolli", "Olips"] },
 "MARSHMALLOW": { ad: "Marshmallow (Şeker + Jelatin + Mavi 1)", kat: "İşlenmiş Şekerleme", risk: "yuksek", organlar: ["Pankreas", "Diş"], etki: "%80+ şeker. Jelatin (domuz) + yapay aroma + mavi renklendirici. Çocuk şeker bombası.", kaynak: "CSPI · WHO Şeker", alternatif: "Doğal hindistan cevizi tatlısı", arar: ["Marshmallow", "Şekerli Lokma"] },
 "ROLO TOFFEE": { ad: "Toffee / Karamel Şekerleme (Süt Tozu + HFCS + Margarin)", kat: "İşlenmiş Şekerleme", risk: "yuksek", organlar: ["Pankreas", "Kalp"], etki: "Şeker + HFCS + margarin + süt tozu + emülgatör + aroma. Werther's, Rolo.", kaynak: "CSPI · WHO", alternatif: "Geleneksel akide şekeri", arar: ["Toffee", "Karamel Şeker", "Werther's"] },
 "GEVREK KAPLI": { ad: "Çikolata Kaplı Tahıl Bar (Mars, Snickers, Bounty)", kat: "İşlenmiş Tatlı", risk: "kritik", organlar: ["Pankreas", "Karaciğer", "Beyin"], etki: "Şeker + glikoz şurubu + palmiye + sütlü çikolata kaplama + emülgatör. 50-60g şeker.", kaynak: "WHO Şeker · CSPI Candy Bar", alternatif: "Hurma + ceviz + kakao (ev bar)", arar: ["Çikolata Bar", "Mars", "Snickers", "Bounty", "Twix"] },
 "BONIBON DRAGE": { ad: "Drage / Bonibon (M&Ms Tarzı Şeker Kaplı)", kat: "İşlenmiş Şekerleme", risk: "yuksek", organlar: ["Pankreas", "Bağışıklık", "Diş"], etki: "Çikolata + şeker kaplama + yapay renklendirici (E102, E110, E120, E129, E133, E160c). Çocuk hiperaktivite.", kaynak: "Southampton 2007 · CSPI Food Dyes", alternatif: "Bitter çikolata, kuru meyve", arar: ["Bonibon", "M&Ms", "Drage", "Skittles"] },
 "TIC TAC NANE": { ad: "Tic Tac / Hava Şekeri (Şeker + Talk)", kat: "İşlenmiş Şekerleme", risk: "orta", organlar: ["Pankreas", "Akciğer"], etki: "%97 şeker + magnezyum stearat (talk içerebilir). Tek tane bile şeker bombası.", kaynak: "EFSA Talk · CSPI", alternatif: "Mastik sakızı, naneli karanfil", arar: ["Tic Tac", "Hava Şekeri"] },
 "MENTOS NANELI": { ad: "Mentos / Naneli Şeker (Şeker + Gum Base)", kat: "İşlenmiş Şekerleme", risk: "orta", organlar: ["Pankreas", "Diş"], etki: "Şeker + glikoz şurubu + hidrojenize hindistan cevizi yağı + gum base + aroma.", kaynak: "CSPI", alternatif: "Naneli karanfil, ev nane şekeri", arar: ["Mentos", "Nane Şekeri"] },
 "AKIDE GELENEK": { ad: "Endüstriyel Akide Şekeri (Yapay Renk + Aroma)", kat: "İşlenmiş Şekerleme", risk: "yuksek", organlar: ["Pankreas", "Bağışıklık"], etki: "Geleneksel akide şekeri yapay renk + aroma + sitrik asit ile yapılıyor. Çocuk hiperaktivite.", kaynak: "Southampton 2007 · TGK", alternatif: "Geleneksel doğal akide, geleneksel şekerlemeci", arar: ["Akide Şekeri", "Endüstriyel Akide"] },
 "GAZOZ ÇIKLET": { ad: "Bubble Gum (Sakız + Renklendirici)", kat: "İşlenmiş Sakız", risk: "yuksek", organlar: ["Sinir Sistemi", "Bağırsak"], etki: "Gum base (sentetik plastik) + şeker + yapay renk (genelde pembe E122 azorubin). Çocuk hiperaktivite.", kaynak: "Southampton 2007 · EFSA Gum Base", alternatif: "Mastik sakızı (Sakız adası)", arar: ["Bubble Gum", "Balon Sakız"] },
 "ŞEKERLEME GIRLAND": { ad: "Renkli Şekerleme Mix (Halloween, Doğum Günü)", kat: "Renkli Şekerleme Karışımı", risk: "kritik", organlar: ["Sinir Sistemi", "Bağırsak"], etki: "Tüm renklendiriciler bir arada (Southampton 6'lı). Tek bir paket çocuk günlük doz aşar.", kaynak: "Southampton 2007 · EFSA 2009 · CSPI Food Dyes", alternatif: "Doğal renkli kuru meyve, sade fıstık", arar: ["Şekerleme Mix", "Halloween Şekerleme"] },

 "DONMUŞ KÖFTE PINAR": { ad: "Donmuş Hazır Köfte (Pinar, Maret, Banvit, Banvit Pasha)", kat: "İşlenmiş Donmuş Et", risk: "yuksek", organlar: ["Kalp", "Bağırsak", "Pankreas"], etki: "Karışık et + soya proteini + ekmek galetası + MSG + tuz + fosfat. %50 et değil.", kaynak: "TGK · CSPI", alternatif: "Taze kıyma, ev köftesi", arar: ["Donmuş Köfte", "Pinar Köfte", "Banvit Pasha"] },
 "DONMUŞ TAVUK PINAR": { ad: "Hazır Tavuk Ürünleri (Pasha, Şinitzel, Kanat)", kat: "İşlenmiş Tavuk", risk: "kritik", organlar: ["Kalp", "Karaciğer", "Bağırsak"], etki: "%50 tavuk + dolgu + galeta + soya + fosfat + dimetilpolisiloksan (silikon). Türk markaları yaygın.", kaynak: "TGK · CSPI Chicken Nuggets · FDA", alternatif: "Taze tavuk göğsü, ev pane", arar: ["Pasha Şinitzel", "Donmuş Tavuk", "Tavuk Şinitzel"] },
 "KIBRIS KAYMAK SAHTE": { ad: "Tahıl Bazlı Hazır Kremalar / Krem Şanti Tozu", kat: "Sahte Krema", risk: "yuksek", organlar: ["Kalp", "Karaciğer"], etki: "Süt yerine bitkisel yağ + emülgatör + glikoz + stabilizör. Dr. Oetker, Sütaş Krem Şanti.", kaynak: "TGK · CSPI · WHO Trans", alternatif: "Gerçek süt kreması, ev kaymağı", arar: ["Krem Şanti Tozu", "Krema Tozu"] },
 "DONMUŞ TATLI ENDÜSTRI": { ad: "Donmuş Tatlı (Tiramisu, Profitrol, Mozaik Pasta)", kat: "İşlenmiş Donmuş Tatlı", risk: "kritik", organlar: ["Pankreas", "Kalp"], etki: "Krem peynir yerine analog + margarin krem + sentetik aroma + 30g+ şeker. Banvit, Maret hazır.", kaynak: "TGK · CSPI · WHO Trans", alternatif: "Ev yapımı tatlı", arar: ["Donmuş Tatlı", "Tiramisu Hazır", "Profitrol"] },

 "TURK HAZIR ÇORBA": { ad: "Hazır Türk Çorbaları (Knorr, Yayla, Doyumluk)", kat: "İşlenmiş Toz", risk: "kritik", organlar: ["Tansiyon", "Bağırsak", "Sinir"], etki: "MSG + bouillon + palmiye + 5g+ tuz/paket + glutamat artıcı + modifiye nişasta. Doğal çorba değil.", kaynak: "WHO Sodium · CSPI · TGK", alternatif: "Ev çorbası, taze tarhana", arar: ["Hazır Çorba", "Knorr Çorba", "Yayla Çorba"] },
 "TAS KEBAP KONSERVE": { ad: "Konserve Hazır Yemekler (Tas Kebabı, Kuru Fasulye)", kat: "İşlenmiş Konserve", risk: "yuksek", organlar: ["Tansiyon", "Hormon"], etki: "BPA kutu astar + sodyum bombası + EDTA + ucuz bitkisel yağ + bouillon.", kaynak: "EFSA BPA · WHO Sodium · CSPI", alternatif: "Ev yemeği, taze pişirme", arar: ["Konserve Yemek", "Tas Kebabı", "Hazır Konserve"] },

 "SIYAH ZEYTIN BOYALI": { ad: "Siyah Zeytin (Demir Glukonat Oksitlenmiş)", kat: "İşlenmiş Zeytin", risk: "orta", organlar: ["Bağırsak"], etki: "Yeşil zeytinin kostik soda + demir glukonat ile siyahlatılmış hali. Doğal siyah zeytin değil.", kaynak: "EFSA 2018 · TGK Zeytin Tebliği", alternatif: "Salamura doğal siyah zeytin, kuru sele zeytin", arar: ["Oksitlenmiş Zeytin", "Siyah Zeytin"] },
 "ZEYTIN FERMENTASYON": { ad: "Hızlı Salamura Yeşil Zeytin (Kostik + Asetik Asit)", kat: "İşlenmiş Zeytin", risk: "orta", organlar: ["Mide"], etki: "Geleneksel 6 ay fermente değil, kostik soda + sirke ile hızlı işlenmiş.", kaynak: "TGK Zeytin Tebliği", alternatif: "Geleneksel taş salamura yeşil zeytin", arar: ["Hızlı Salamura Zeytin", "Yeşil Zeytin"] },

 "PIZZA HUT FAST FOOD": { ad: "Zincir Pizza (Pizza Hut, Domino's, Little Caesars)", kat: "Ultra-İşlenmiş", risk: "kritik", organlar: ["Kalp", "Tansiyon", "Pankreas", "Bağırsak"], etki: "Analog peynir + işlenmiş et + brom unu + palmiye + 3g+ tuz/dilim. Tek bir dilim WHO sodyum sınırı.", kaynak: "WHO Sodium · CSPI Pizza · BMJ UPF", alternatif: "Geleneksel taş fırın pizza, ev yapımı", arar: ["Zincir Pizza", "Pizza Hut", "Domino's", "Little Caesars"] },
 "MCDONALDS BURGER": { ad: "Fast Food Burger (McDonald's, Burger King)", kat: "Ultra-İşlenmiş", risk: "kritik", organlar: ["Kalp", "Pankreas", "Bağırsak"], etki: "Karışık et + soya + brom unu + analog peynir + Yellow 6 + dimetilpolisiloksan kızartma yağında.", kaynak: "CSPI Fast Food · WHO · BMJ UPF", alternatif: "Ev burgeri, kasaptan kıyma", arar: ["Fast Food Burger", "McDonald's", "Burger King", "Whopper"] },
 "KFC TAVUK": { ad: "KFC Tarzı Kızarmış Tavuk (TBHQ + MSG + Glutamat)", kat: "Fast Food", risk: "kritik", organlar: ["Karaciğer", "Bağışıklık", "Kalp"], etki: "Tavuk + 11 baharat (MSG yüklü) + TBHQ + palmiye + soya yağı kızartma. Heterosiklik amin (HCA).", kaynak: "IARC HCA · CSPI · WHO", alternatif: "Fırında tavuk, ev panele", arar: ["KFC", "Kızarmış Tavuk", "Crispy Tavuk"] },
 "SUBWAY EKMEK ADA": { ad: "Subway Tipi Hazır Ekmek (Azodikarbonamid)", kat: "İşlenmiş Ekmek", risk: "kritik", organlar: ["Solunum", "Cilt"], etki: "ADA (E927a) - yoga matı kimyasalı. AB yasak. Subway 2014'te baskıyla çıkardı, taklit zincirlerde devam.", kaynak: "AB Reg 1129/2011 · CSPI Subway 2014", alternatif: "Geleneksel ekmek, taze fırın", arar: ["Subway Ekmek", "Azodikarbonamid"] },
 "STARBUCKS HAMUR": { ad: "Cafe Hazır Sandviç / Hamur İşi (Starbucks, Kahve Dünyası)", kat: "İşlenmiş Cafe Ürünü", risk: "yuksek", organlar: ["Pankreas", "Kalp"], etki: "Palmiye + emülgatör + analog peynir + işlenmiş et + sodyum bombası. 'Premium' pazarlama.", kaynak: "CSPI Cafe · BMJ UPF · TGK", alternatif: "Ev yapımı, geleneksel fırın", arar: ["Cafe Sandviç", "Starbucks Sandviç"] },

 "PROBIYOTIK KEFIR": { ad: "Endüstriyel Probiyotik İçecek (Yakult, Activia)", kat: "Pazarlama Probiyotik", risk: "orta", organlar: ["Bağırsak", "Pankreas"], etki: "%70 şeker. Tek tür bakteri (gerçek probiyotik 10+ tür). Şeker bağırsak floranı bozar.", kaynak: "JAMA 2019 Probiotic · BMJ 2017", alternatif: "Ev kefiri, lahana turşusu, kombuça", arar: ["Yakult", "Probiyotik İçecek", "Activia Drink"] },
 "ALKALİZED KAKAO": { ad: "Alkalize / Dutch Kakao (Karbonatla İşlenmiş)", kat: "İşlenmiş Kakao", risk: "orta", organlar: ["Bağırsak"], etki: "Doğal kakao karbonatla alkalize edilince flavonoid (faydalı) %90 kaybolur. Marketteki kakaoların çoğu.", kaynak: "JAFC 2008 Miller · CSPI", alternatif: "Saf (alkalize edilmemiş) kakao", arar: ["Dutch Kakao", "Alkalize Kakao"] },
 "ÇIKOLATA MILK": { ad: "Sütlü Çikolata (%30 Kakao Altı + Süt Tozu + Şeker)", kat: "İşlenmiş Çikolata", risk: "yuksek", organlar: ["Pankreas", "Kalp"], etki: "Sütlü çikolatanın %50'si şeker, %20'si süt tozu, %30 kakao. Eti, Ülker, Milka, Nestle.", kaynak: "WHO Şeker · CSPI", alternatif: "%70 üzeri bitter çikolata", arar: ["Sütlü Çikolata", "Milk Chocolate"] },
 "BEYAZ ÇIKOLATA": { ad: "Beyaz Çikolata (Kakao Yağı + Şeker + Süt)", kat: "İşlenmiş Çikolata", risk: "yuksek", organlar: ["Pankreas", "Kalp"], etki: "Kakao çekirdeği YOK. Sadece kakao yağı + %55 şeker + süt tozu. Çikolata değil.", kaynak: "FDA Çikolata · CSPI", alternatif: "Hindistan cevizi yağı + bal", arar: ["Beyaz Çikolata", "White Chocolate"] },

 "VIYANA KAHVESI": { ad: "Aromalı Kahve Karışımı (Vanilya, Karamel, Fındık)", kat: "Aromalı Kahve", risk: "orta", organlar: ["Karaciğer"], etki: "Propilen glikol + sentetik vanilin + aroma + şeker. Starbucks, Kahve Dünyası tatlı kahveler.", kaynak: "EFSA PG · CSPI", alternatif: "Sade kahve + gerçek baharat (tarçın, kardamom)", arar: ["Aromalı Kahve", "Karamel Kahve", "Vanilyalı Kahve"] },
 "INSTANT TÜRK KAHVESI": { ad: "Hazır Türk Kahvesi (Mehmet Efendi 3'ü 1 Arada)", kat: "İşlenmiş Kahve", risk: "yuksek", organlar: ["Pankreas", "Kalp"], etki: "Türk kahvesi + glikoz şurubu + krema tozu (hidrojenize yağ) + aroma. Saf Türk kahvesi değil.", kaynak: "CSPI · TGK", alternatif: "Saf Türk kahvesi (taze çekilmiş)", arar: ["3'ü 1 Arada Türk Kahvesi", "Hazır Türk Kahvesi"] },

 "GAZSIZ MEYVE IÇECEĞI": { ad: "Meyve Aromalı Gazsız İçecek (Cappy, Tropicana, Dimes)", kat: "Şekerli Meyve İçeceği", risk: "kritik", organlar: ["Pankreas", "Diş", "Karaciğer"], etki: "Reklamı meyve gibi ama %5-10 gerçek meyve. Şeker bombası + aroma + koruyucu + renklendirici.", kaynak: "CSPI Fruit Drinks · WHO · AAP", alternatif: "Taze meyve, taze sıkma %100 meyve suyu", arar: ["Meyve Aromalı İçecek", "Cappy", "Tropicana", "Dimes"] },
 "AYRAN HAZIR DOLGU": { ad: "Endüstriyel Ayran (Su Dolguyla Hile)", kat: "Sahte Ayran", risk: "orta", organlar: ["Bağırsak"], etki: "Geleneksel ayran %50+ yoğurt. Hazır ayranlarda %30 yoğurt + %70 su + tuz + stabilizör. Pinar, Sütaş, Sek.", kaynak: "TGK Ayran Tebliği · CSPI", alternatif: "Ev ayranı (yoğurt + az su + tuz)", arar: ["Endüstriyel Ayran", "Şişe Ayran"] },
 "SALEP HAZIR": { ad: "Hazır Salep (Süt Tozu + Nişasta + Aroma)", kat: "Sahte Salep", risk: "yuksek", organlar: ["Pankreas", "Bağırsak"], etki: "Gerçek salep otu yerine guar sakızı + süt tozu + vanilin + sentetik aroma + şeker.", kaynak: "TGK Salep Tebliği", alternatif: "Gerçek salep otu (geleneksel)", arar: ["Hazır Salep", "Salep Tozu"] },
 "BOZA HAZIR": { ad: "Hazır Boza (Endüstriyel Fermentasyon)", kat: "İşlenmiş Boza", risk: "orta", organlar: ["Pankreas", "Bağırsak"], etki: "Geleneksel yulaf/darı fermentasyonu yerine endüstriyel hızlı işlem + şeker + sitrik asit + koruyucu.", kaynak: "TGK · CSPI", alternatif: "Vefa Bozacısı, geleneksel boza", arar: ["Hazır Boza", "Endüstriyel Boza"] },
 "ŞALGAM SUYU ENDÜSTRI": { ad: "Endüstriyel Şalgam Suyu (Sirke + Renklendirici)", kat: "İşlenmiş İçecek", risk: "orta", organlar: ["Mide", "Bağırsak"], etki: "Geleneksel fermentasyon yerine sirke + sentetik tuz + E124 (kırmızı) + koruyucu.", kaynak: "TGK Şalgam · Adana Üniversitesi Şalgam Hile", alternatif: "Geleneksel Adana şalgam, evde fermente", arar: ["Endüstriyel Şalgam", "Şalgam Suyu"] },
 "LIMONATA HAZIR": { ad: "Hazır Limonata (Limon Aroma + Sitrik Asit)", kat: "Şekerli İçecek", risk: "yuksek", organlar: ["Pankreas", "Diş"], etki: "Gerçek limon %5, geri kalan su + şeker + sitrik asit + sentetik aroma + tartrazin (sarı). Dimes, Tamek.", kaynak: "CSPI · WHO", alternatif: "Taze sıkılmış limon + su (şekersiz)", arar: ["Hazır Limonata", "Limon Aroma"] },
 "ICED TEA LIPTON": { ad: "Buzlu Çay (Lipton Ice Tea, Nestea)", kat: "Şekerli İçecek", risk: "kritik", organlar: ["Pankreas", "Diş", "Karaciğer"], etki: "330ml'de 25g şeker. Çay özü + HFCS + asit + koruyucu + sukraloz (light).", kaynak: "WHO Şeker · CSPI Ice Tea", alternatif: "Sade soğuk çay + buz, ev demli", arar: ["Buzlu Çay", "Lipton Ice Tea", "Nestea", "Iced Tea"] },
 "KOLA ZERO LIGHT": { ad: "Diyet Kola / Zero (Aspartam + Asesülfam + Fosforik Asit)", kat: "Yapay Tatlandırıcılı Gazoz", risk: "kritik", organlar: ["Bağırsak", "Beyin", "Kemik"], etki: "Aspartam (IARC 2B) + asesülfam + fosforik asit (kemik erimesi). 'Diyet' yalanı - bağırsak florası bozar.", kaynak: "IARC 2023 Aspartam · Am J Clin Nutr Tucker · Nature 2014 Suez", alternatif: "Maden suyu + limon + nane", arar: ["Diyet Kola", "Coca-Cola Zero", "Pepsi Max", "Coca-Cola Light"] },
 "VITAMIN WATER": { ad: "Vitamin Water (Şekerli Sentetik Vitamin İçeceği)", kat: "Şekerli İçecek", risk: "yuksek", organlar: ["Pankreas", "Karaciğer"], etki: "Vitaminli su pazarlanır ama %50 şeker yüklü. Sentetik B vitamini megadoz + aroma.", kaynak: "CSPI Vitamin Water · WHO", alternatif: "Su + taze meyve dilimleri", arar: ["Vitamin Water", "Vitaminli Su"] },
 "SPORCU ICECEK": { ad: "Sporcu İçeceği (Gatorade, Powerade)", kat: "Şekerli İçecek", risk: "yuksek", organlar: ["Pankreas", "Diş"], etki: "Aslında sodyum + şeker (HFCS) + yapay renk (E110, E102, E133). Maraton koşmayanlara gereksiz.", kaynak: "AAP 2011 Sport Drink · CSPI · Lancet 2013", alternatif: "Su + limon + tuz + biraz bal (ev izotonik)", arar: ["Gatorade", "Powerade", "Sporcu İçeceği"] },
 "PROTEIN SHAKE HAZIR": { ad: "Hazır Protein Shake (Tetra Pak)", kat: "Ultra-İşlenmiş", risk: "yuksek", organlar: ["Böbrek", "Karaciğer", "Bağırsak"], etki: "İzole whey + maltodekstrin + sukraloz + asesülfam + aroma + karra + soya proteini izolatı.", kaynak: "BMJ UPF · CSPI", alternatif: "Süt + muz + yumurta (ev shake)", arar: ["Hazır Protein Shake", "Protein Drink"] },

 "MAYONEZ LIGHT": { ad: "Light Mayonez (Yapay Tatlandırıcı + Stabilizör)", kat: "Sahte Light Sos", risk: "yuksek", organlar: ["Bağırsak", "Pankreas"], etki: "Yağ azaltılır ama yerine nişasta + tatlandırıcı + EDTA + stabilizör konur. Hellmann's Light, Calve Hafif.", kaynak: "CSPI Light · WHO", alternatif: "Az mayonez, yoğurt sos", arar: ["Light Mayonez", "Hafif Mayonez"] },
 "BARBEKÜ SOS HAZIR": { ad: "BBQ Sos (Heinz, KFC tarzı)", kat: "İşlenmiş Sos", risk: "kritik", organlar: ["Pankreas", "Tansiyon"], etki: "%40 şeker (HFCS) + sodyum + sentetik tütsü aroması (PAH kanserojen taşıyıcı) + EDTA.", kaynak: "EFSA PAH · CSPI BBQ", alternatif: "Ev BBQ sosu (domates + sirke + baharat)", arar: ["BBQ Sos", "Barbekü Sos"] },
 "PESTO HAZIR": { ad: "Hazır Pesto (Cam Kavanoz - Endüstriyel)", kat: "İşlenmiş Sos", risk: "yuksek", organlar: ["Kalp"], etki: "Gerçek pesto: fesleğen + parmesan + çam fıstığı + zeytinyağı. Hazır pestoda: ayçiçek yağı + sentetik parmesan + ucuz fındık + koruyucu.", kaynak: "İtalya DOP · CSPI", alternatif: "Ev pestosu, taze fesleğen", arar: ["Hazır Pesto", "Pesto Sosu"] },
 "HUMUS HAZIR": { ad: "Hazır Humus (Mağaza Plastik Kase)", kat: "İşlenmiş Mezé", risk: "orta", organlar: ["Bağırsak"], etki: "Nohut + tahin yerine soya yağı + nişasta + koruyucu (sodyum benzoat) + sitrik asit.", kaynak: "CSPI · TGK", alternatif: "Ev humusu (taze nohut + tahin)", arar: ["Hazır Humus", "Hummus"] },
 "GUACAMOLE HAZIR": { ad: "Hazır Guacamole (Avokado Aromalı)", kat: "Sahte Avokado", risk: "yuksek", organlar: ["Bağırsak"], etki: "Gerçek avokado %5-10. Geri kalan bitkisel yağ + nişasta + yapay yeşil renk (E141) + aroma.", kaynak: "CSPI · FDA Etiketleme", alternatif: "Taze avokado, ev yapımı", arar: ["Hazır Guacamole", "Avokado Sos"] },
 "TZATZIKI HAZIR": { ad: "Hazır Tzatziki / Yoğurtlu Sos", kat: "İşlenmiş Sos", risk: "orta", organlar: ["Bağırsak"], etki: "Süzme yoğurt yerine yoğurt + kıvam vericiler + sirke + tuz + koruyucu.", kaynak: "CSPI · TGK", alternatif: "Ev cacığı, geleneksel", arar: ["Tzatziki", "Hazır Cacık"] },
 "SARIMSAK TOZU": { ad: "Sarımsak Tozu (E575 Glukono Delta Lakton)", kat: "İşlenmiş Baharat", risk: "orta", organlar: ["Mide", "Bağırsak"], etki: "Taze sarımsağın faydaları (allisin) yok. Asit düzenleyici (E575) eklenmiş.", kaynak: "EFSA E575 · CSPI", alternatif: "Taze sarımsak, kuru sarımsak diş", arar: ["Sarımsak Tozu", "Garlic Powder"] },
 "SOĞAN TOZU MSG": { ad: "Soğan Tozu (MSG ile İşlenmiş)", kat: "İşlenmiş Baharat", risk: "orta", organlar: ["Mide", "Sinir Sistemi"], etki: "Bazı markalar MSG eklenmiş soğan tozu satar. Taze soğanın yararı yok.", kaynak: "CSPI Baharat · EFSA", alternatif: "Taze soğan, kuru kurutulmuş soğan", arar: ["Soğan Tozu", "Onion Powder"] },

 "DAMAR YAĞI SUKKAR": { ad: "İçinde Glikoz + Karamel Çikolata (Tek Kullanım)", kat: "İşlenmiş Atıştırmalık", risk: "yuksek", organlar: ["Pankreas", "Diş"], etki: "Kakao kompound (palmiye) + glikoz şurubu + karamel + lesitin. Çocuk tüketimi yaygın.", kaynak: "TGK · WHO", alternatif: "Bitter çikolata", arar: ["Çikolata Bar", "Cocoa Bar"] },
 "MUHALLEBI HAZIR": { ad: "Hazır Muhallebi / Sütlaç (Nişasta + Süt Tozu + Aroma)", kat: "İşlenmiş Sütlü Tatlı", risk: "orta", organlar: ["Pankreas"], etki: "Taze süt yerine süt tozu + modifiye nişasta + sentetik vanilin + şeker. Pinar, Sütaş.", kaynak: "TGK · CSPI", alternatif: "Ev muhallebisi, taze süt", arar: ["Hazır Muhallebi", "Hazır Sütlaç"] },
 "TAVUKGÖĞSU HAZIR": { ad: "Hazır Tavukgöğsü Tatlısı (Endüstriyel)", kat: "İşlenmiş Geleneksel Tatlı", risk: "yuksek", organlar: ["Pankreas"], etki: "Geleneksel tavuk göğsü değil. Süt tozu + nişasta + tavuk aroması + emülgatör. Eti, Ülker hazır.", kaynak: "TGK · CSPI", alternatif: "Geleneksel tatlıcı, ev yapımı", arar: ["Hazır Tavukgöğsü", "Tavuk Göğsü Tatlısı"] },
 "KAZANDIBI HAZIR": { ad: "Hazır Kazandibi (Endüstriyel)", kat: "İşlenmiş Sütlü Tatlı", risk: "yuksek", organlar: ["Pankreas", "Kalp"], etki: "Süt tozu + margarin + glikoz + aroma + karamel boya. Geleneksel kazandibi farklı.", kaynak: "TGK · CSPI", alternatif: "Geleneksel kazandibi, ev yapımı", arar: ["Hazır Kazandibi", "Kazandibi"] },

 "SARMA HAZIR": { ad: "Konserve Lahana/Asma Yaprak Sarma", kat: "İşlenmiş Konserve", risk: "yuksek", organlar: ["Tansiyon", "Hormon"], etki: "BPA kutu + asetik asit + sodyum bombası + ucuz bitkisel yağ. Türk usulü olarak satılır.", kaynak: "EFSA BPA · CSPI · WHO", alternatif: "Ev sarması, taze yaprak", arar: ["Konserve Sarma", "Konserve Yaprak"] },
 "TURŞU MILI HILE": { ad: "Hazır Turşu (Hızlı Sirke + Yapay Renk + Benzoat)", kat: "Sahte Fermente", risk: "yuksek", organlar: ["Sinir Sistemi", "Mide"], etki: "Geleneksel fermentasyon olmadan yapılan turşu. Probiyotik fayda yok. Sodyum benzoat (kanserojen N-nitroso) içerir.", kaynak: "FDA Benzoat · CSPI · TGK", alternatif: "Geleneksel ev turşusu (fermente)", arar: ["Hazır Turşu", "Sirke Turşusu"] },

 "ZEYTIN EZMESI HAZIR": { ad: "Hazır Zeytin Ezmesi (Sirke + Koruyucu)", kat: "İşlenmiş Mezé", risk: "orta", organlar: ["Bağırsak"], etki: "Taze zeytin yerine eski zeytinler + sirke + bitkisel yağ + koruyucu. Acı tat için tuz.", kaynak: "TGK · CSPI", alternatif: "Ev zeytin ezmesi (geleneksel)", arar: ["Zeytin Ezmesi", "Tapenade"] },
 "PEYNIR EZMESI": { ad: "Krem Peynir / Peynir Ezmesi (Analog + Stabilizör)", kat: "İşlenmiş Peynir", risk: "yuksek", organlar: ["Bağırsak", "Kalp"], etki: "Süt yerine bitkisel yağ + nişasta + emülgatör tuzları (E450, E452) + boya. Pinar, Sütaş.", kaynak: "TGK · EFSA Fosfat", alternatif: "Ev labne, gerçek krem peynir", arar: ["Krem Peynir", "Peynir Ezmesi"] },

 "JAMBALAYA YEMEK": { ad: "Hazır Karışım Pilav (Pakistan/Hint Pilav, Risotto)", kat: "İşlenmiş Hazır Yemek", risk: "yuksek", organlar: ["Pankreas", "Tansiyon"], etki: "Pirinç + MSG + sodyum + bouillon + palmiye + sentetik aroma. Knorr, Maggi serileri.", kaynak: "WHO Sodium · CSPI", alternatif: "Taze pilav, ev yapımı", arar: ["Hazır Pilav", "Risotto", "Pilav Karışımı"] },
 "MAKARNA SOS PAKET": { ad: "Hazır Makarna Sos Paketi (Knorr, Maggi)", kat: "İşlenmiş Toz", risk: "yuksek", organlar: ["Tansiyon", "Sinir Sistemi"], etki: "Domates tozu + MSG + palmiye + 5g+ tuz + modifiye nişasta + sentetik aroma.", kaynak: "WHO · CSPI · EFSA MSG", alternatif: "Taze domates, ev sos", arar: ["Makarna Sos Paketi", "Hazır Makarna Sos"] },

 "CHIA HAZIR PUDING": { ad: "Hazır Chia Pudding (Endüstriyel)", kat: "Sahte Sağlıklı", risk: "yuksek", organlar: ["Pankreas"], etki: "Chia % 5, geri kalan süt + şeker + tatlandırıcı + stabilizör + aroma.", kaynak: "BMJ UPF · CSPI", alternatif: "Ev chia pudding (chia + süt)", arar: ["Hazır Chia", "Chia Pudding"] },
 "OAT BOWL HAZIR": { ad: "Hazır Yulaf Bowl (Endüstriyel)", kat: "Sahte Sağlıklı", risk: "yuksek", organlar: ["Pankreas"], etki: "Yulaf %50, geri kalan şeker + süt tozu + aroma + koruyucu. Quaker, Nestle.", kaynak: "BMJ UPF · CSPI", alternatif: "Sade yulaf + taze meyve + ceviz", arar: ["Hazır Yulaf", "Oat Bowl"] },
 "MUSLI ENDUSTRI": { ad: "Endüstriyel Müsli (Şeker + Bal Aroması)", kat: "İşlenmiş Tahıl", risk: "yuksek", organlar: ["Pankreas"], etki: "Yulaf + tahıl + şeker + bal aroması + yapay aroma + palmiye. Etiketteki bal/meyve aldatıcı.", kaynak: "BMJ UPF · CSPI Granola", alternatif: "Sade yulaf + taze meyve + ceviz", arar: ["Müsli", "Granola", "Endüstriyel Müsli"] },

 "GIDA ALÜMINYUM FOLYO": { ad: "Alüminyum Folyo (Asitli Yemekte Yağ Sızıntısı)", kat: "Metal Ambalaj", risk: "yuksek", organlar: ["Beyin", "Kemik"], etki: "Limon, sirke, domatesli yemek folyoda pişince alüminyum yiyeceğe geçer. Alzheimer riskiyle bağlantı.", kaynak: "WHO 2017 Alüminyum · EFSA 2008 · Lancet 2018", alternatif: "Cam kap, fırın kağıdı, seramik", arar: ["Alüminyum Folyo", "Folyo"] },
 "PARŞÖMEN KAĞIDI PFAS": { ad: "Fırın Kağıdı (PFAS Astar)", kat: "Sonsuz Kimyasal", risk: "kritik", organlar: ["Hormon", "Bağışıklık", "Kanser"], etki: "Yapışmaz kaplama PFAS içerir. Sıcakta yiyeceğe geçer. AB sınırladı.", kaynak: "EFSA 2020 PFAS · EPA 2024 · EWG PFAS", alternatif: "Silikon mat, cam tepsi, hafif yağlama", arar: ["Fırın Kağıdı", "Parşömen Kağıdı", "Yağlı Kağıt"] },
 "PLASTIK KESME": { ad: "Plastik Kesme Tahtası (Mikroplastik Sızıntısı)", kat: "Plastik Mutfak", risk: "yuksek", organlar: ["Bağırsak", "Hormon"], etki: "Her kesimde mikroplastik yemeğe karışır. Tahta sertliği yiyecekte plastik parçacık bırakır.", kaynak: "Environ Sci Technol 2022 Kesme Tahtası", alternatif: "Tahta, bambu kesme tahtası", arar: ["Plastik Kesme Tahtası", "Plastik Tahta"] },

 "CIVA TON BALIĞI YINE": { ad: "Büyük Av Balıkları (Kılıç, Köpek Balığı - Civa)", kat: "Ağır Metal Kontaminasyonu", risk: "kritik", organlar: ["Beyin", "Sinir Sistemi", "Üreme"], etki: "Besin piramidinin tepesindeki balıklar civa biriktirir. Hamileler ve çocuklar yememeli.", kaynak: "FDA 2021 Fish Advisory · WHO Civa", alternatif: "Küçük balık (hamsi, sardalye, ringa)", arar: ["Kılıç Balığı", "Köpek Balığı", "Tuna"] },

 "EKMEK ARASI HAZIR": { ad: "Hazır Pratik Yemek Ekmek Arası (Eti, Banvit Sandviç)", kat: "Ultra-İşlenmiş", risk: "yuksek", organlar: ["Pankreas", "Tansiyon"], etki: "Endüstriyel ekmek + analog peynir + işlenmiş et + sodyum + emülgatör + koruyucu.", kaynak: "BMJ UPF · WHO Sodium", alternatif: "Ev sandviçi, taze malzeme", arar: ["Hazır Sandviç", "Pratik Yemek", "Ekmek Arası"] },
 "KOLA KARIŞIM": { ad: "Diğer Kola Markaları (Cola Turka, Pepsi, RC Cola)", kat: "Şekerli Gazoz", risk: "kritik", organlar: ["Pankreas", "Diş", "Kemik"], etki: "Coca-Cola taklidi. Aynı bileşenler: HFCS + fosforik asit + karamel + kafein.", kaynak: "CSPI Soda · WHO Şeker", alternatif: "Maden suyu", arar: ["Pepsi", "Cola Turka", "RC Cola"] },

 "TURK KAHVESI SAHTE": { ad: "Sahte/Karıştırılmış Türk Kahvesi", kat: "Sahte Premium", risk: "orta", organlar: ["Karaciğer"], etki: "Türkiye'de yaygın hile: Türk kahvesi nohut tozu, mısır tozu, palmiye karıştırılır.", kaynak: "TGK Kahve · Tarım Bakanlığı Hile Raporu", alternatif: "Yerel kahvehane, taze çekilmiş", arar: ["Türk Kahvesi"] },
 "AROMALI YULAF SÜTÜ": { ad: "Aromalı Yulaf Sütü (Vanilya, Çikolata)", kat: "İşlenmiş Bitkisel Süt", risk: "yuksek", organlar: ["Pankreas", "Bağırsak"], etki: "Yulaf %3-5, geri kalan su + şeker + bitkisel yağ + karra + aroma. Alpro, Yofix.", kaynak: "CSPI Plant Milk · BMJ UPF", alternatif: "Ev yulaf sütü", arar: ["Aromalı Yulaf Sütü", "Vanilyalı Yulaf"] },
 "BADEM SÜTÜ ENDÜSTRI": { ad: "Endüstriyel Badem Sütü (%2 Badem + Karragenan)", kat: "İşlenmiş Bitkisel Süt", risk: "yuksek", organlar: ["Bağırsak"], etki: "Sadece %2 badem, %98 su + karra + emülgatör + tatlandırıcı. Almond Breeze.", kaynak: "CSPI Almond Milk · Karra", alternatif: "Ev badem sütü", arar: ["Badem Sütü", "Almond Milk"] },
 "HINDISTAN CEVIZI SÜTÜ ENDÜSTRI": { ad: "Endüstriyel Hindistan Cevizi Sütü (Karra + Stabilizör)", kat: "İşlenmiş Bitkisel Süt", risk: "orta", organlar: ["Bağırsak"], etki: "Saf hindistan cevizi kreması değil. Su + krema + karra + emülgatör. Kutuda BPA riski.", kaynak: "EFSA Karra · CSPI", alternatif: "Saf hindistan cevizi kreması (cam)", arar: ["Hindistan Cevizi Sütü", "Coconut Milk"] },
 "SOYA SÜTÜ GDO": { ad: "Endüstriyel Soya Sütü (GDO Soya + Stabilizör)", kat: "İşlenmiş Bitkisel Süt", risk: "yuksek", organlar: ["Hormon", "Bağırsak"], etki: "GDO soya + heksan kalıntısı + karra + emülgatör + glifosat. Türkiye yaygın.", kaynak: "EWG GMO · IARC Glifosat", alternatif: "Organik soya sütü, ev yapımı", arar: ["Soya Sütü", "Soy Milk"] },

 "KASAR PEYNIR HILELI": { ad: "Hileli Kaşar Peyniri (Süt Tozu + Bitkisel Yağ)", kat: "Sahte Peynir", risk: "yuksek", organlar: ["Kalp", "Bağırsak"], etki: "Geleneksel kaşar yerine süt tozu + palmiye yağı + kazein + sitrat. Türkiye yaygın hile.", kaynak: "TGK Peynir Tebliği · Tarım Bakanlığı 2022 Hile Raporu", alternatif: "Eski kaşar, Kars kaşarı, sertifikalı", arar: ["Hileli Kaşar", "Kaşar Peyniri"] },
 "EZINE PEYNIR SAHTE": { ad: "Sahte Ezine Peyniri (Coğrafi İşaret Hilesi)", kat: "Sahte Premium", risk: "yuksek", organlar: ["Kalp", "Bağırsak"], etki: "Gerçek Ezine peyniri keçi+koyun+inek karışımı. Sahte ürünler ucuz inek sütünden yapılır. Coğrafi işaret ihlali.", kaynak: "TGK Coğrafi İşaret · Tarım Bakanlığı", alternatif: "Sertifikalı (CI) Ezine, mandıra peyniri", arar: ["Ezine Peyniri", "Sahte Ezine"] },
 "DEĞIRMENLI BEYAZ": { ad: "Salamura Süresi Az Beyaz Peynir (Hızlı Üretim)", kat: "İşlenmiş Peynir", risk: "orta", organlar: ["Bağırsak"], etki: "Geleneksel 3-6 ay olgunlaştırma yerine 1-2 hafta. Probiyotik flora gelişmemiş.", kaynak: "TGK · CSPI", alternatif: "Geleneksel salamura beyaz peynir (3+ ay)", arar: ["Beyaz Peynir Hızlı"] },
 "MIHALIÇ PEYNIR HILE": { ad: "Sahte Mihaliç Peyniri (Süt Tozu Karışım)", kat: "Sahte Premium", risk: "yuksek", organlar: ["Kalp"], etki: "Coğrafi işaretli geleneksel mihaliç yerine ucuz süt tozu + bitkisel yağ karışımı.", kaynak: "TGK Coğrafi İşaret · Tarım Bakanlığı", alternatif: "Sertifikalı Mihaliç, Bursa Karacabey", arar: ["Mihaliç Peyniri", "Mihaliç"] },
 "ÇECIL PEYNIR": { ad: "Endüstriyel Çeçil / Örgü Peyniri (Stabilizör)", kat: "İşlenmiş Peynir", risk: "orta", organlar: ["Böbrek"], etki: "Geleneksel iplik şeklindeki çeçil değil. Hızlı üretim + fosfat + sitrat + asit düzenleyici.", kaynak: "TGK Peynir", alternatif: "Geleneksel Erzurum çeçil", arar: ["Çeçil Peyniri", "Örgü Peyniri"] },
 "MOZZARELLA HILE": { ad: "Sahte Mozzarella (Süt Tozu + Bitkisel Yağ)", kat: "Sahte Peynir", risk: "yuksek", organlar: ["Kalp"], etki: "İtalyan mozzarella DOP'tur. Türkiye'de 'mozzarella' diye satılanların %80'i sahte analog peynir.", kaynak: "İtalya DOP · TGK · CSPI", alternatif: "DOP sertifikalı Buffala Mozzarella", arar: ["Sahte Mozzarella", "Mozzarella"] },
 "CHEDDAR HILE": { ad: "Sahte Cheddar / Sarı Peynir", kat: "Sahte Peynir", risk: "yuksek", organlar: ["Kalp", "Bağışıklık"], etki: "Gerçek cheddar yerine ucuz peynir + paprika boyası (E160c) + tartrazin (E102 - sarı 5). Çocuk hiperaktivite.", kaynak: "Southampton 2007 · TGK", alternatif: "Gerçek İngiliz cheddar, sertifikalı", arar: ["Cheddar", "Sarı Peynir"] },
 "FETA SAHTE": { ad: "Sahte Feta (Yunan PDO Hilesi)", kat: "Sahte Premium", risk: "orta", organlar: ["Bağırsak"], etki: "Gerçek feta sadece Yunanistan koyun+keçi sütünden PDO. Türkiye 'feta' diye inek peyniri satıyor.", kaynak: "AB PDO · TGK", alternatif: "Sertifikalı PDO Feta, Türk beyaz peynir", arar: ["Feta", "Feta Peyniri"] },
 "GORGONZOLA HILE": { ad: "Sahte Mavi Küflü Peynir", kat: "Sahte Premium", risk: "orta", organlar: ["Bağışıklık"], etki: "Gerçek gorgonzola/roquefort PDO. Türkiye 'mavi küflü' adıyla ucuz peynirler satılıyor.", kaynak: "İtalya/Fransa PDO · TGK", alternatif: "Sertifikalı PDO mavi küflü peynir", arar: ["Mavi Küflü Peynir", "Gorgonzola", "Roquefort"] },

 "FRENCH FRIES MCDONALD": { ad: "Fast Food Patates Kızartması (Dimetilpolisiloksan)", kat: "İşlenmiş Patates", risk: "kritik", organlar: ["Kalp", "Karaciğer", "Bağırsak"], etki: "%14 bileşen var: patates + canola + soya + buğday + dekstroz + asit pirofosfat + silikon (köpük önleyici). Akrilamid yüksek.", kaynak: "McDonald's USA İçerik · CSPI · IARC Akrilamid", alternatif: "Ev patates kızartması, fırın", arar: ["McDonald's Patates", "Fast Food Patates"] },
 "DIMETILPOLISILOKSAN": { ad: "Dimetilpolisiloksan (Silikon - Köpük Önleyici)", kat: "İşlenmiş Gıda Katkı", risk: "yuksek", organlar: ["Bağırsak"], etki: "Yapay silikon (silly putty bileşeni). McDonald's nugget, KFC kızartmasında. AB sınırladı.", kaynak: "EFSA Silikon · FDA · CSPI McDonald's", alternatif: "Ev yemeği", arar: ["Dimetilpolisiloksan", "Silikon Gıda", "E900"] },

 "MIKRO DALGA POPCORN": { ad: "Mikrodalga Mısır Patlağı (Diasetil + PFOA Astar)", kat: "İşlenmiş Atıştırmalık", risk: "kritik", organlar: ["Akciğer", "Hormon", "Kanser"], etki: "Paket astarı PFAS (sonsuz kimyasal). 'Tereyağı' aroması diasetil ('popcorn akciğeri'). Orville, Pop Secret.", kaynak: "IARC PFOA Grup 1 · NIOSH Diasetil · EPA", alternatif: "Tencerede patlamış mısır, hava patlatıcı", arar: ["Mikrodalga Mısır", "Microwave Popcorn"] },
 "HAZIR PATATES PURE": { ad: "Hazır Patates Püresi Tozu (Modifiye Nişasta + Süt Tozu)", kat: "İşlenmiş Toz", risk: "yuksek", organlar: ["Pankreas", "Bağırsak"], etki: "Patates tozu + modifiye nişasta + süt tozu + tuz + emülgatör + BHT (E321) koruyucu.", kaynak: "EFSA BHT · CSPI · TGK", alternatif: "Taze patates püresi, ev yapımı", arar: ["Hazır Patates Püresi", "Patates Toz"] },

 "KONSERVE MANTAR": { ad: "Konserve Mantar (Citric Asit + Tuz + EDTA)", kat: "İşlenmiş Mantar", risk: "orta", organlar: ["Tansiyon", "Mineral"], etki: "Yüksek sodyum + EDTA + sitrik asit. Taze mantarın faydaları kaybolur. Çin'den ucuz ithalat sorunu.", kaynak: "EFSA EDTA · CSPI · TGK", alternatif: "Taze mantar (kültür/yaban)", arar: ["Konserve Mantar"] },
 "AGARICUS BISPORUS HORMON": { ad: "Endüstriyel Beyaz Mantar (Hızlı Büyütme)", kat: "Çiftlik Mantarı", risk: "orta", organlar: ["Bağışıklık"], etki: "Hızlı büyütme için bazı tesislerde sentetik substrat + büyüme düzenleyici. Türkiye'de yaygın.", kaynak: "EFSA Mantar · USDA Mushroom", alternatif: "Yerel organik, yaban mantar", arar: ["Beyaz Mantar", "Kültür Mantar"] },
 "TRUFFLE AROMA SENTETIK": { ad: "Sentetik Trüf Aroması (Petrol Türevi 2,4-Ditiyapentane)", kat: "Sahte Aroma", risk: "orta", organlar: ["Karaciğer"], etki: "Gerçek trüf çok pahalı, 'trüf yağı' diye satılanın %99'u sentetik 2,4-dithiapentane (petrol türevi).", kaynak: "Le Monde 2017 Trüf · CSPI", alternatif: "Gerçek taze trüf (pahalı ama nadiren)", arar: ["Trüf Aroması", "Trüf Yağı", "Truffle"] },

 "TAHIN HELVASI HFCS": { ad: "Hazır Tahin Helvası (HFCS + Hileli Tahin + Margarin)", kat: "İşlenmiş Tatlı", risk: "kritik", organlar: ["Pankreas", "Karaciğer", "Kalp"], etki: "Saf susam tahini değil, ucuz bitkisel yağ karışımı. HFCS şerbet. Türkiye'de en yaygın hile.", kaynak: "TGK Helva · Tarım Bakanlığı Helva Hile Raporu", alternatif: "Geleneksel tahin helvası (saf susam)", arar: ["Hazır Tahin Helvası", "Endüstriyel Helva"] },
 "PIŞMANIYE ENDÜSTRI": { ad: "Endüstriyel Pişmaniye (HFCS Bazlı)", kat: "İşlenmiş Tatlı", risk: "yuksek", organlar: ["Pankreas"], etki: "Geleneksel un + tereyağı + şeker karışımı yerine HFCS + margarin + sentetik aroma.", kaynak: "TGK · CSPI", alternatif: "Geleneksel Kocaeli pişmaniyesi (sertifikalı)", arar: ["Pişmaniye"] },
 "CEZERYE HAZIR": { ad: "Endüstriyel Cezerye (HFCS + Aroma)", kat: "İşlenmiş Tatlı", risk: "yuksek", organlar: ["Pankreas"], etki: "Geleneksel havuç + ceviz + bal yerine glikoz şurubu + ucuz havuç tozu + sentetik aroma.", kaynak: "TGK Mersin Cezerye · CSPI", alternatif: "Geleneksel Mersin/Tarsus cezerye", arar: ["Cezerye"] },

 "KÖFTE TANELI MARKET": { ad: "Hazır Köfte (Çiğ - Pinar, Banvit, Maret)", kat: "İşlenmiş Çiğ Et", risk: "yuksek", organlar: ["Kalp", "Bağırsak"], etki: "Karışık et + soya proteini + ekmek galetası + MSG + tuz + fosfat. %50 et bile yok.", kaynak: "TGK · CSPI · WHO", alternatif: "Kasaptan kıyma, ev köftesi (taze çek)", arar: ["Hazır Köfte", "Çiğ Köfte Endüstriyel"] },
 "ÇIĞ KÖFTE ETSIZ": { ad: "Etsiz Çiğ Köfte (Bulgur + Salça + Tat Artırıcı)", kat: "İşlenmiş Sokak Yemek", risk: "yuksek", organlar: ["Tansiyon", "Sinir Sistemi"], etki: "Geleneksel etli çiğ köfte yerine bulgur + ucuz salça + MSG bombası + acı sos. Sodyum yüksek.", kaynak: "TGK Çiğköfte Tebliği · CSPI", alternatif: "Geleneksel etli çiğ köfte (Şanlıurfa)", arar: ["Etsiz Çiğ Köfte", "Çiğ Köfte"] },

 "KAYISI KURU SÜLFIT": { ad: "Kurutulmuş Kayısı (Sülfit ile Beyazlatma)", kat: "İşlenmiş Kuru Meyve", risk: "orta", organlar: ["Solunum", "Astım"], etki: "Doğal kurutulan kayısı koyu kahverengidir. Parlak turuncu kayısılar SO2/sülfit (E220-228) ile beyazlatılır.", kaynak: "EFSA 2016 Sülfit · FDA Sulfite Warning", alternatif: "Doğal kurutulmuş kayısı (koyu renkli)", arar: ["Kuru Kayısı", "Sülfitli Kayısı"] },
 "KURU ÜZÜM SÜLFIT": { ad: "Sülfit ile İşlenmiş Kuru Üzüm", kat: "İşlenmiş Kuru Meyve", risk: "orta", organlar: ["Solunum"], etki: "Açık renk kuru üzüm sülfit ile beyazlatılmıştır. Astım tetikleyici.", kaynak: "EFSA Sülfit · FDA", alternatif: "Sülfitsiz kuru üzüm (doğal koyu kahverengi)", arar: ["Kuru Üzüm", "Sülfitli Üzüm"] },
 "INCIR KURUTMA": { ad: "Endüstriyel Kuru İncir (Aflatoksin Riski)", kat: "İşlenmiş Kuru Meyve", risk: "yuksek", organlar: ["Karaciğer", "Kanser"], etki: "Türkiye'nin önemli ihracatı ama nem nedeniyle aflatoksin kontaminasyonu yüksek. IARC Grup 1.", kaynak: "IARC Vol 100F Aflatoksin · EFSA 2020 · Tarım Bakanlığı", alternatif: "Test edilmiş kuru incir (sertifikalı)", arar: ["Kuru İncir", "Aflatoksin İncir"] },
 "FINDIK KURU AFLATOKSIN": { ad: "Türkiye Fındık (Aflatoksin Yüksek Riski)", kat: "Kuruyemiş", risk: "yuksek", organlar: ["Karaciğer", "Kanser"], etki: "AB Türkiye fındık ihracatına aflatoksin uyarısı koydu (RASFF 2023). Çiftlik küfü ile bulaşır.", kaynak: "RASFF AB 2023 · IARC Aflatoksin · EFSA", alternatif: "Kabuklu, kuru depolama, sertifikalı", arar: ["Fındık", "Türkiye Fındık"] },
 "ANTEP FISTIK GIZLI": { ad: "Düşük Kalite Antep Fıstığı (İran/Suriye Kaçak)", kat: "Sahte Premium", risk: "orta", organlar: ["Bağışıklık", "Karaciğer"], etki: "Kaçak fıstıklar genelde küflü ve aflatoksin riski yüksek. Türkiye'de yaygın hile.", kaynak: "TGK · Tarım Bakanlığı Hile", alternatif: "Sertifikalı Gaziantep antep fıstığı (CI)", arar: ["Antep Fıstığı", "Sahte Antep Fıstığı"] },

 "MARMELAT HAZIR": { ad: "Endüstriyel Marmelat (Pektin + HFCS)", kat: "İşlenmiş Reçel", risk: "yuksek", organlar: ["Pankreas", "Diş"], etki: "Gerçek meyve %30, geri kalan HFCS + pektin + sitrik asit + koruyucu (E202).", kaynak: "WHO · CSPI", alternatif: "Ev reçeli, ev marmelat", arar: ["Marmelat", "Reçel Hazır"] },
 "BAL KEKI HAZIR": { ad: "'Bal Aromalı' Tatlılar (Gerçek Bal Yok)", kat: "Sahte Bal Ürünü", risk: "yuksek", organlar: ["Pankreas"], etki: "'Bal kekı', 'bal aromalı çörek' adıyla satılır ama gerçek bal yok. Şeker + bal aroması.", kaynak: "TGK Bal · CSPI", alternatif: "Gerçek balla ev yapımı", arar: ["Bal Kekı", "Bal Aromalı"] },
 "MELAS PEKMEZ": { ad: "Melas / Şeker Pancarı Atığı ('Pekmez' Diye Satılan)", kat: "Sahte Pekmez", risk: "yuksek", organlar: ["Pankreas"], etki: "Şeker pancarı atığı yan ürünü 'üzüm pekmezi' diye satılır. Geleneksel pekmez değil.", kaynak: "TGK Pekmez · Tarım Bakanlığı Hile", alternatif: "Geleneksel üzüm/dut pekmezi (sertifikalı)", arar: ["Melas Pekmez", "Şeker Pancarı Pekmez"] },

 "TAHIN KAVURMA YANIK": { ad: "Yanık Tahin (Sıcak Susam İşleme - PAH)", kat: "İşlenmiş Tahin", risk: "yuksek", organlar: ["Kanser", "Karaciğer"], etki: "Yüksek ısıda kavrulmuş susamdan yapılan tahin PAH (kanserojen) içerir. Düşük kaliteli tahin işlemi.", kaynak: "IARC PAH · EFSA 2008", alternatif: "Düşük ısı taş değirmeni tahin", arar: ["Tahin", "Yanık Tahin"] },
 "TAHIN HEKSAN": { ad: "Heksan Çözücü ile İşlenmiş Tahin", kat: "İşlenmiş Tahin", risk: "yuksek", organlar: ["Sinir Sistemi", "Karaciğer"], etki: "Bazı ucuz tahin markaları heksan çözücüsü ile yağ çıkarımı yapar. Nörotoksik.", kaynak: "EWG Hexane · OSHA · WHO", alternatif: "Soğuk taş değirmeni tahin", arar: ["Heksan Tahin"] },

 "BARDAK ÇAY EFE": { ad: "Bardak Çayı (Aromalı + Tatlandırıcılı)", kat: "İşlenmiş Çay", risk: "orta", organlar: ["Pankreas", "Karaciğer"], etki: "Hazır demli çay yerine konsantre + aroma + tatlandırıcı + sitrik asit. Yapay vişne, şeftali aromaları.", kaynak: "CSPI Tea", alternatif: "Sade demli çay", arar: ["Bardak Çay", "Aromalı Çay"] },
 "POŞET ÇAY MIKROPLASTIK": { ad: "Plastik Poşet Çay (Mikroplastik Sızıntısı)", kat: "Mikroplastik İçerik", risk: "yuksek", organlar: ["Bağırsak", "Hormon"], etki: "Plastik çay poşetleri kaynar suda milyarlarca mikroplastik salar. McGill 2019 araştırması.", kaynak: "Environ Sci Technol 2019 McGill · WHO 2019 Mikroplastik", alternatif: "Demli çay, kağıt poşet (plastiksiz)", arar: ["Plastik Poşet Çay", "Pyramid Çay Poşeti"] },

 "BIRA ALCOHOL FREE": { ad: "Alkolsüz Bira (Yapay Aroma + Şeker)", kat: "İşlenmiş İçecek", risk: "orta", organlar: ["Pankreas"], etki: "Alkolsüz pazarlama ama içinde %0.5 alkol olabilir + şeker + bira aroması + koruyucu.", kaynak: "WHO Alkol · CSPI", alternatif: "Su, maden suyu, kombuça", arar: ["Alkolsüz Bira", "Non-Alcoholic Beer"] },
 "ŞARAP DEALCOHOLIZED": { ad: "Alkolsüz Şarap (Yüksek Şeker)", kat: "İşlenmiş İçecek", risk: "yuksek", organlar: ["Pankreas"], etki: "Alkol çıkarılınca dengeyi sağlamak için şeker eklenir. Eklenmiş şeker + aroma.", kaynak: "WHO · CSPI", alternatif: "Üzüm suyu (saf)", arar: ["Alkolsüz Şarap", "Dealcoholized"] },
 "VOTKA SOJA BAR": { ad: "Hazır Kokteyl Karışımı (Şeker + Yapay Aroma)", kat: "İşlenmiş İçecek", risk: "kritik", organlar: ["Karaciğer", "Pankreas"], etki: "Alkol + HFCS + sentetik aroma + renklendirici + koruyucu. Mocktail/Cocktail Mix.", kaynak: "CSPI Cocktail · WHO Alkol", alternatif: "Ev kokteyli, taze meyve", arar: ["Kokteyl Mix", "Cocktail Mix"] },

 "BAHARAT KARIŞIMI MARMERIK": { ad: "Hazır Baharat Karışımı (MSG + Tuz Bombası)", kat: "İşlenmiş Baharat", risk: "yuksek", organlar: ["Tansiyon", "Sinir Sistemi"], etki: "'Köfte Baharatı', 'Tavuk Baharatı' adıyla MSG + sodyum + sentetik aroma + nişasta + dolgu.", kaynak: "WHO Sodium · CSPI · EFSA MSG", alternatif: "Tek tek baharat (ev karışım)", arar: ["Köfte Baharatı", "Tavuk Baharatı", "Baharat Karışımı"] },
 "ISOT BIBER HILE": { ad: "Hileli İsot Biberi (Sudan Boya + Tuğla Tozu)", kat: "Sahte Baharat", risk: "kritik", organlar: ["Kanser", "Akciğer"], etki: "Şanlıurfa coğrafi işaretli isot. Hile: sudan boyası + tuğla tozu + ucuz biber karışımı.", kaynak: "TGK CI · Tarım Bakanlığı Hile · IARC Sudan", alternatif: "Sertifikalı (CI) Şanlıurfa isot, geleneksel", arar: ["İsot Biber", "Hileli İsot"] },
 "ZA'ATAR HILE": { ad: "Sahte Za'atar Baharatı (Yapay Aroma)", kat: "Sahte Baharat", risk: "orta", organlar: ["Bağışıklık"], etki: "Geleneksel kekik + sumak + susam + tuz yerine yapay aroma + ucuz baharat tozu.", kaynak: "TGK · CSPI", alternatif: "Geleneksel Hatay Za'atar", arar: ["Za'atar", "Zahter"] },

 "GÜNEBAKAN ÇIPS": { ad: "Sebze / Süper Cips (Lay's Veggie, Cipso Doğal)", kat: "Sahte Sağlıklı Atıştırmalık", risk: "yuksek", organlar: ["Pankreas", "Kalp"], etki: "'Sebze' diye satılır ama %5 sebze + patates nişastası + palmiye + tuz + aroma. Marketten alınmamalı.", kaynak: "CSPI Veggie Chips · BMJ UPF", alternatif: "Taze sebze, fırın sebze cipsi (ev)", arar: ["Sebze Cipsi", "Veggie Chips", "Doğal Cips"] },
 "TATLI PATATES CIPSI": { ad: "Tatlı Patates Cipsi (Endüstriyel)", kat: "İşlenmiş Atıştırmalık", risk: "yuksek", organlar: ["Pankreas", "Kalp"], etki: "Tatlı patates + palmiye yağı + tuz + aroma. Akrilamid riski yüksek.", kaynak: "EFSA Akrilamid · CSPI", alternatif: "Taze tatlı patates fırın", arar: ["Tatlı Patates Cipsi", "Sweet Potato Chips"] },

 "KAPSÜL VITAMIN": { ad: "Hazır Vitamin Kapsülleri (Sentetik + Talk)", kat: "Sentetik Takviye", risk: "yuksek", organlar: ["Karaciğer", "Böbrek"], etki: "Sentetik vitamin (doğaldan farklı) + talk (E553b) + magnezyum stearat + boyalar + dolgu.", kaynak: "NEJM 2013 Multivitamin · NIH ODS", alternatif: "Beslenmeden vitamin, kan testi ile hedefli", arar: ["Vitamin Kapsülü", "Multivitamin"] },
 "D VITAMIN MEGADOZ": { ad: "Yüksek Doz D Vitamini Damlaları (50.000 IU)", kat: "Megadoz Takviye", risk: "yuksek", organlar: ["Böbrek", "Kalsiyum"], etki: "Birikir, hiperkalsemi, böbrek taşı, kalp ritim bozukluğu. Doktor tavsiyesi olmadan kullanılmaz.", kaynak: "Mayo Clinic D Vitamini · Endocrine Society", alternatif: "Güneş + balık + yumurta + doktor kontrolünde", arar: ["D Vitamini Megadoz", "Vitamin D3"] },
 "OMEGA 3 BALIK YAĞI": { ad: "Endüstriyel Balık Yağı Kapsülü (Oksitlenmiş)", kat: "Takviye", risk: "orta", organlar: ["Karaciğer"], etki: "Çoğu balık yağı kapsülünde oksitlenme yüksek (Albert 2015). Civa kalıntısı riski.", kaynak: "Sci Rep 2015 Albert · NIH ODS", alternatif: "Taze yağlı balık (somon, sardalye, ringa)", arar: ["Balık Yağı", "Omega 3"] },
 "PROBIOTIK HAP MARKA": { ad: "Probiyotik Hap (Marka Pazarlaması)", kat: "Takviye", risk: "orta", organlar: ["Bağırsak"], etki: "Mide asidini geçemez, çoğu ölü. Pahalı plasebo. JAMA 2019 etkisi belirsiz.", kaynak: "JAMA 2019 Probiyotik · BMJ 2017", alternatif: "Ev kefiri, lahana turşusu, kombuça", arar: ["Probiyotik Hap", "Probiotic Capsule"] },

 "CRACKER BISKUVI": { ad: "Tuzlu Kraker (Endüstriyel - Eti Cin, Ülker Petibör)", kat: "İşlenmiş Atıştırmalık", risk: "yuksek", organlar: ["Pankreas", "Tansiyon"], etki: "Beyaz un + palmiye + tuz + maya tozu + emülgatör. Yüksek glisemik indeks.", kaynak: "CSPI Crackers · WHO Sodium", alternatif: "Tam buğday kraker, ev yapımı", arar: ["Tuzlu Kraker", "Cracker"] },
 "KAHVALTI GEVRECI": { ad: "Kahvaltı Gevreği / Tahıl Karışımı (Şekerli)", kat: "İşlenmiş Kahvaltılık", risk: "kritik", organlar: ["Pankreas", "Diş", "Bağırsak"], etki: "%35+ şeker, vitamin eklenmiş ama hala şeker bombası. Çocuk hedefli pazarlama. Kellogg's, Nestle.", kaynak: "CSPI Cereal · WHO · UK FSA Cereal Sugar", alternatif: "Sade yulaf, ev yapım granola", arar: ["Kahvaltı Gevreği", "Cornflakes", "Tahıl Kahvaltısı"] },
 "MISIR GEVREĞI YETIŞKIN": { ad: "Yetişkin Mısır Gevreği (Special K, Fitness)", kat: "Sahte Diyet Ürünü", risk: "yuksek", organlar: ["Pankreas"], etki: "'Diyet' pazarlama. %20 şeker + maltodekstrin + sentetik vitamin + sodyum + BHT (E321) koruyucu.", kaynak: "CSPI Diet Cereal · BMJ UPF", alternatif: "Sade yulaf, taze meyve", arar: ["Diyet Gevrek", "Special K", "Fitness Cereal"] },

 "BEBEK BISKUVI": { ad: "Bebek Bisküvisi (Hipp, Bebevita, Olvarit)", kat: "Bebek Atıştırmalık", risk: "yuksek", organlar: ["Pankreas", "Bağırsak"], etki: "'Bebek için sağlıklı' pazarlama. Şeker, beyaz un, palmiye yağı. Bebek mama olarak değil tatlı.", kaynak: "WHO Bebek Beslenme · Public Health Engl", alternatif: "Doğal bebek mamasi, taze meyve", arar: ["Bebek Bisküvisi", "Hipp Bisküvi", "Bebevita"] },
 "BEBEK PUDDING": { ad: "Bebek Yoğurt / Puding (Şekerli)", kat: "Bebek Süt Ürünü", risk: "kritik", organlar: ["Pankreas", "Diş"], etki: "Bebek için pazarlanan yoğurt/sütlü tatlılar yetişkin yoğurttan 2x şeker içerir. Pinar Bambino, Sütaş Çocuk.", kaynak: "WHO 2022 Bebek Beslenme · CSPI", alternatif: "Sade yoğurt + taze meyve püresi", arar: ["Bebek Yoğurt", "Pinar Bambino", "Sütaş Çocuk"] },
 "BEBEK MAMASI MEYVELI": { ad: "Meyveli Bebek Kavanozu (Yüksek Şeker)", kat: "Bebek Maması", risk: "yuksek", organlar: ["Pankreas", "Diş"], etki: "Bazı kavanozlarda doğal meyveden 10x daha fazla şeker. Public Health England araştırması.", kaynak: "Public Health Engl 2019 Baby Food · WHO", alternatif: "Taze meyve püresi (ev yapımı)", arar: ["Bebek Kavanozu", "Bebek Meyve Püresi"] },
 "BEBEK TAHILLI MAMA": { ad: "Tahıl Bazlı Bebek Maması (Glifosat Kalıntısı)", kat: "Bebek Maması", risk: "yuksek", organlar: ["Bağırsak", "Beyin"], etki: "EWG 2018 testleri: yulaflı bebek mamalarında glifosat bulundu. IARC 2A muhtemel kanserojen.", kaynak: "EWG 2018 Glifosat · IARC 2A · CHEM Trust", alternatif: "Organik tahıl mama, ev yapımı", arar: ["Tahıllı Bebek Maması", "Yulaflı Bebek Maması"] },
 "BEBEK ATIŞTIRMA RICE": { ad: "Bebek Pirinç Atıştırmalığı (Arsenik Riski)", kat: "Bebek Atıştırmalık", risk: "kritik", organlar: ["Beyin", "Kanser"], etki: "Pirinç bazlı bebek atıştırmalıklarda arsenik tespit. FDA 2023 sınır koydu. AAP bebek pirinç tüketimini sınırlandırdı.", kaynak: "FDA 2023 Arsenik · AAP 2014 Pirinç · Consumer Reports", alternatif: "Yulaf, kinoa bazlı atıştırmalık", arar: ["Bebek Pirinç Atıştırmalığı", "Rice Snack"] },
 "BEBEK SUYU HAZIR": { ad: "Bebek İçecekleri (Hipp, Bebivita İçecek)", kat: "Bebek İçecek", risk: "yuksek", organlar: ["Pankreas"], etki: "Meyveli bebek içecekleri %30 meyve + şeker + aroma. WHO 12 ay altına su+anne sütü öneriyor.", kaynak: "WHO Bebek Beslenme · AAP", alternatif: "12 ay altı sadece anne sütü/su, 12 ay üstü taze meyve", arar: ["Bebek İçeceği", "Hipp İçecek"] },
 "BEBEK FORMÜL PALM": { ad: "Bebek Formül Mamasında Palmiye Yağı", kat: "Bebek Maması Yağı", risk: "yuksek", organlar: ["Bağırsak", "Mineral"], etki: "Bebek formül mamalarında kalsiyum emilimini bozar, sert dışkı yapar. ESPGHAN sınır öneriyor.", kaynak: "Koo et al. Pediatrics 2003 · ESPGHAN", alternatif: "Palm yağsız formül, mümkünse anne sütü", arar: ["Bebek Formül Palmiye", "Formül Mama"] },

 "VEGAN BURGER UPF": { ad: "Vegan Burger (Beyond Meat, Impossible)", kat: "Ultra İşlenmiş Vegan", risk: "yuksek", organlar: ["Kalp", "Bağırsak"], etki: "20+ bileşen. Pea protein izolatı + metilselüloz + soya lectin + heme demir (GDO). 'Sağlıklı' yalanı.", kaynak: "BMJ 2019 UPF · CSPI Plant Based", alternatif: "Mercimek köfte, nohut köfte (ev)", arar: ["Vegan Burger", "Beyond Meat", "Impossible Burger"] },
 "VEGAN NUGGET": { ad: "Vegan Nugget / Şinitzel (Soya Proteini + Methylcellulose)", kat: "Ultra İşlenmiş Vegan", risk: "yuksek", organlar: ["Bağırsak"], etki: "Soya proteini + buğday gluteni + nişasta + palmiye + sentetik aroma + emülgatör.", kaynak: "BMJ UPF · CSPI", alternatif: "Ev mercimek köftesi, nohut topu", arar: ["Vegan Nugget", "Vegan Şinitzel"] },
 "VEGAN SUCUK": { ad: "Vegan Sucuk/Salam (Buğday Gluteni)", kat: "Ultra İşlenmiş Vegan", risk: "yuksek", organlar: ["Bağırsak", "Bağışıklık"], etki: "Seitan (buğday gluteni) + soya + nişasta + tuz + aroma + boya. Et kadar zararlı.", kaynak: "BMJ UPF · CSPI", alternatif: "Ev mantar pastırması, fermente sebze", arar: ["Vegan Sucuk", "Vegan Salam"] },
 "VEGAN PEYNIR": { ad: "Vegan Peynir (Hindistan Cevizi Yağı + Nişasta)", kat: "Ultra İşlenmiş Vegan", risk: "yuksek", organlar: ["Kalp", "Bağırsak"], etki: "Hindistan cevizi yağı + modifiye nişasta + tuz + emülgatör + tat artırıcı. Peynir değil.", kaynak: "BMJ UPF · CSPI", alternatif: "Kaju peyniri (ev), badem peyniri (ev)", arar: ["Vegan Peynir", "Bitkisel Peynir"] },
 "VEGAN DONDURMA": { ad: "Vegan Dondurma (Hindistan Cevizi Sütü + Karra)", kat: "İşlenmiş Vegan", risk: "yuksek", organlar: ["Bağırsak"], etki: "Hindistan cevizi sütü + karra + emülgatör + şeker + aroma. Doğal değil.", kaynak: "CSPI Plant Ice Cream", alternatif: "Donmuş muz + hurma (ev)", arar: ["Vegan Dondurma", "Vegan İce Cream"] },
 "VEGAN MAYONEZ": { ad: "Vegan Mayonez (Soya Yağı + Modifiye Nişasta)", kat: "İşlenmiş Vegan Sos", risk: "yuksek", organlar: ["Kalp", "Bağırsak"], etki: "Soya yağı + modifiye nişasta + sirke + aroma + EDTA. Sağlıklı değil.", kaynak: "CSPI", alternatif: "Avokado sos, tahin sos", arar: ["Vegan Mayonez", "Bitkisel Mayonez"] },

 "DÖNER FAST FOOD": { ad: "Sokak Döneri (Karma Et + Soya + Aroma)", kat: "Ultra İşlenmiş Et", risk: "kritik", organlar: ["Kalp", "Bağırsak", "Kanser"], etki: "Karma et + soya proteini + tavuk derisi + fosfat + MSG + tütsü aroması. Yağda PAH (kanserojen).", kaynak: "IARC Vol 92 PAH · IARC Vol 114 İşlenmiş Et · TGK", alternatif: "Geleneksel kuzu/dana döner (sertifikalı kasap)", arar: ["Sokak Döneri", "Tavuk Döner Fast Food"] },
 "İSKENDER SAHTE": { ad: "Endüstriyel İskender Kebap (Yapay Salça + Margarin)", kat: "Ultra İşlenmiş", risk: "yuksek", organlar: ["Kalp", "Tansiyon"], etki: "Geleneksel İskender bursa-bağlamalı yağ + döner + ezilmiş ekmek + domates salçası. Endüstriyel: margarin + analog ürün.", kaynak: "TGK Bursa CI · CSPI", alternatif: "Geleneksel Bursa İskender Kebabı (CI)", arar: ["İskender Kebap"] },
 "TANTUNI HAZIR": { ad: "Hazır Tantuni (Mersin - Karışık Et)", kat: "İşlenmiş Sokak Yemek", risk: "yuksek", organlar: ["Tansiyon", "Bağırsak"], etki: "Geleneksel parça et yerine ucuz karışık et + soya + MSG + sodyum bombası.", kaynak: "TGK · CSPI", alternatif: "Geleneksel Mersin tantunisi", arar: ["Tantuni"] },
 "ÇIĞ KÖFTE ZINCIR": { ad: "Zincir Çiğ Köfte (Etsiz - Sahibinden)", kat: "İşlenmiş Sokak", risk: "yuksek", organlar: ["Tansiyon", "Sinir Sistemi"], etki: "Bulgur + ucuz salça + MSG + asid + sentetik aroma. Geleneksel etli çiğ köfte değil.", kaynak: "TGK · CSPI", alternatif: "Geleneksel Urfa/Adıyaman etli çiğ köfte", arar: ["Çiğ Köfte Zincir", "Çiğ Köfteci"] },
 "MIDYE DOLMA SOKAK": { ad: "Sokak Midye Dolma (Su Kalitesi Sorunu)", kat: "Çevresel Kontaminasyon", risk: "kritik", organlar: ["Karaciğer", "Bağırsak", "Sinir Sistemi"], etki: "Kirli denizden toplanan midyeler ağır metal (kurşun, civa, kadmiyum) + mikroplastik + dizel kaynaklı PAH biriktirir.", kaynak: "WHO Shellfish · WWF Türkiye Marmara Raporu", alternatif: "Sertifikalı sahillerden ürün, çiftlik midye", arar: ["Midye Dolma", "Midye"] },
 "KOKOREÇ SOKAK": { ad: "Sokak Kokoreç (Hijyen Sorunu + Bağırsak)", kat: "Hayvansal Atık", risk: "yuksek", organlar: ["Bağırsak", "Karaciğer"], etki: "Kuzu bağırsağı temiz olmayabilir, sokakta soğutma sorunu, parazit riski. Çiğ veya az pişmiş tehlikeli.", kaynak: "WHO Food Safety · TGK Hijyen", alternatif: "Sertifikalı kokoreççi (kapalı yer)", arar: ["Sokak Kokoreç", "Kokoreç"] },
 "BALIK EKMEK SOKAK": { ad: "Eminönü Balık Ekmek (Ucuz İthal Balık)", kat: "Sokak Yemek", risk: "orta", organlar: ["Bağırsak", "Civa Birikim"], etki: "Eminönü 'balık-ekmek' restoranları genelde ithal donmuş uskumru kullanır. Yağ kalitesi düşük.", kaynak: "Türkiye Tarım Bakanlığı · WHO Civa", alternatif: "Taze yerli balık, evde pişirme", arar: ["Balık Ekmek", "Sokak Balık"] },
 "SIMIT SOKAK SAKAR": { ad: "Sokak Simiti (Beyaz Un + Şeker + Pekmez)", kat: "İşlenmiş Hamur", risk: "orta", organlar: ["Pankreas"], etki: "Geleneksel simit yapımında pekmez kullanılır, sonra susam ile kaplanır. Ucuz simitlerde şeker, sentetik aroma.", kaynak: "TGK Simit · CSPI", alternatif: "Geleneksel simitçi (taş fırın)", arar: ["Sokak Simit", "Simit"] },
 "MIDYE TAVA HARIÇ": { ad: "Hazır Donmuş Midye/Karides", kat: "İşlenmiş Deniz Ürünü", risk: "yuksek", organlar: ["Bağırsak", "Kalp"], etki: "Sülfit (E223) ile beyazlatma, fosfat ile şişirme, antibiyotik kalıntısı (çiftlik). Asya'dan ithal.", kaynak: "EFSA Sülfit · CSPI · WHO AMR", alternatif: "Taze yerli deniz ürünü", arar: ["Donmuş Midye", "Donmuş Karides"] },

 "TAVUK FUME": { ad: "Füme Tavuk (Tütsü Aroma + Nitrit + Boyalı)", kat: "İşlenmiş Et", risk: "kritik", organlar: ["Mide", "Kolon", "Akciğer"], etki: "Yapay tütsü aroması + nitrit + fosfat + karamel boya. WHO IARC Grup 1 işlenmiş et.", kaynak: "IARC Vol 114 · WHO · TGK", alternatif: "Taze tavuk göğsü, ev pişirme", arar: ["Füme Tavuk", "Smoked Chicken"] },
 "ROZBIF JAMBON": { ad: "Endüstriyel Rozbif / Roastbeef Dilim", kat: "İşlenmiş Et", risk: "yuksek", organlar: ["Mide", "Kolon"], etki: "Et + nitrit + fosfat + tuz + sodyum eritorbate + aroma. Sığır eti %85 değil.", kaynak: "IARC Vol 114 · TGK", alternatif: "Taze rozbif, evde pişirme", arar: ["Rozbif", "Roastbeef"] },
 "PROSCIUTTO PARMA": { ad: "Endüstriyel Prosciutto/İtalyan Jambon (Nitrit)", kat: "İşlenmiş Et", risk: "kritik", organlar: ["Mide", "Kolon"], etki: "Geleneksel Parma jambonu 12 ay olgunlaşır. Endüstriyel taklit: hızlı nitrit kürleme.", kaynak: "İtalya DOP Parma · IARC Vol 114", alternatif: "DOP sertifikalı Prosciutto di Parma", arar: ["Prosciutto", "İtalyan Jambon", "Parma Jambon"] },

 "ZEYTINYAĞI VAKUM": { ad: "Vakumlanmış Zeytinyağı (Light/Refined)", kat: "İşlenmiş Yağ", risk: "yuksek", organlar: ["Karaciğer"], etki: "Acılaşmış sızma yağ rafine edilerek 'light' satılır. Antioksidan kaybı.", kaynak: "EFSA Yağ", alternatif: "Sızma soğuk sıkım zeytinyağı", arar: ["Light Zeytinyağı", "Refined Olive Oil"] },
 "PIRINA YAĞI POMACE": { ad: "Pirina Yağı / Posa Yağı (Heksan Çözücü)", kat: "Düşük Kalite Yağ", risk: "yuksek", organlar: ["Karaciğer", "Sinir"], etki: "Zeytin posasından heksan çözücüsü ile çıkarılır. Nörotoksik. PAH (kanserojen) tespiti.", kaynak: "EFSA · IARC PAH · OSHA Heksan", alternatif: "Sızma zeytinyağı", arar: ["Pirina Yağı", "Posa Yağı", "Pomace Oil"] },
 "SAFFLOWER YAĞI": { ad: "Aspir / Safflower Yağı (Omega-6 Bombası)", kat: "Bitkisel Yağ", risk: "yuksek", organlar: ["Kalp", "Bağışıklık"], etki: "%75+ omega-6 (linoleik asit). İnflamasyon, kalp damar hastalığı.", kaynak: "BMJ 2013 Ramsden · Lancet 2018", alternatif: "Zeytinyağı, hindistan cevizi yağı", arar: ["Aspir Yağı", "Safflower Oil"] },
 "PIRINÇ KEPEĞI YAĞI": { ad: "Pirinç Kepeği Yağı (Heksan + Rafinasyon)", kat: "Bitkisel Yağ", risk: "orta", organlar: ["Karaciğer"], etki: "Pirinç kepeğinden heksan ile çıkarılır. 'Sağlıklı' pazarlama ama işlenmiş yağ.", kaynak: "EFSA · CSPI", alternatif: "Soğuk sıkım zeytinyağı", arar: ["Pirinç Kepeği Yağı", "Rice Bran Oil"] },

 "TOFU GDO": { ad: "Endüstriyel Tofu (GDO Soya + Glifosat)", kat: "İşlenmiş Bitkisel", risk: "yuksek", organlar: ["Hormon", "Bağırsak"], etki: "Dünya soyasının %94'ü GDO. Glifosat kalıntısı + heksan + yüksek östrojen.", kaynak: "EWG GMO · IARC Glifosat · NIH Phytoestrogen", alternatif: "Organik tofu, fermente soya (miso, tempeh)", arar: ["Tofu", "Soya Peyniri"] },
 "TEMPEH ENDUSTRI": { ad: "Endüstriyel Tempeh (GDO Soya)", kat: "İşlenmiş Bitkisel", risk: "orta", organlar: ["Hormon"], etki: "Fermente soya ama GDO + glifosat + heksan kalıntısı olabilir.", kaynak: "EWG GMO", alternatif: "Organik tempeh", arar: ["Tempeh"] },
 "SEITAN GLUTEN": { ad: "Seitan (Saf Buğday Gluteni)", kat: "İşlenmiş Bitkisel", risk: "yuksek", organlar: ["Bağırsak", "Bağışıklık"], etki: "Buğday gluteninin saf hali. Çölyak ve gluten duyarlılığı için tehlikeli. Yüksek glutamat içerebilir.", kaynak: "Mol Nutr Food Res 2018 · Mayo Clinic Glutensiz", alternatif: "Mantar, mercimek, baklagil bazlı et alternatifi", arar: ["Seitan", "Buğday Gluteni"] },

 "INSTANT KAHVALTI": { ad: "Hazır Kahvaltı Bar (Quaker, Special K)", kat: "Ultra İşlenmiş", risk: "yuksek", organlar: ["Pankreas", "Bağırsak"], etki: "Yulaf + şeker + glikoz şurubu + palmiye + aroma + emülgatör. Kahvaltı yerine geçmez.", kaynak: "BMJ UPF · CSPI", alternatif: "Sade yulaf + meyve + yumurta", arar: ["Kahvaltı Bar", "Breakfast Bar"] },
 "INSTANT KARNI MAMA": { ad: "Hazır Karın Doyuran Toz (Saç Açık, Yorgun)", kat: "Ultra İşlenmiş Toz", risk: "kritik", organlar: ["Bağırsak", "Karaciğer", "Hormon"], etki: "Soylent, Huel benzeri ürünler 30+ bileşen, çoğu sentetik. Doğal beslenmenin yerini tutmaz.", kaynak: "BMJ UPF · CSPI Soylent", alternatif: "Gerçek yemek, taze hazırlama", arar: ["Soylent", "Huel", "Meal Replacement"] },

 "KOMBUCHA HAZIR": { ad: "Endüstriyel Kombuça (Şeker Eklemeli + Pastörize)", kat: "İşlenmiş Kombuça", risk: "orta", organlar: ["Pankreas"], etki: "Geleneksel kombuça canlı bakteri içerir. Endüstriyel pastörize + şeker + aroma + karbonatlı.", kaynak: "CSPI Kombucha · NIH NCCIH", alternatif: "Ev kombuçası (SCOBY ile)", arar: ["Endüstriyel Kombuça", "Kombuça"] },
 "FERMENTE TURP": { ad: "Endüstriyel Salatalar (Kimchi - Hazır)", kat: "İşlenmiş Fermente", risk: "orta", organlar: ["Bağırsak"], etki: "Geleneksel kimchi yerine sirkeli salata + tuz + kırmızı boya. Probiyotik fayda yok.", kaynak: "CSPI · WHO", alternatif: "Geleneksel kimchi, lahana turşusu (ev)", arar: ["Kimchi Hazır", "Lahana Turşusu Endüstriyel"] },

 "ENERJI BAR PALMIYE": { ad: "Enerji Bar / Spor Bar (Quest, RXBar)", kat: "Ultra İşlenmiş", risk: "yuksek", organlar: ["Pankreas"], etki: "Whey + maltitol/eritritol + palmiye + 20+ bileşen. 'Sağlıklı' pazarlama.", kaynak: "BMJ UPF · CSPI Protein Bar", alternatif: "Hurma + ceviz + kakao (ev bar)", arar: ["Enerji Bar", "Quest Bar", "RX Bar", "Spor Bar"] },

 "PANCAR ŞERBETI HAZIR": { ad: "Hazır Pancar / Şalgam Şerbeti (Sentetik Renk)", kat: "İşlenmiş İçecek", risk: "orta", organlar: ["Mide"], etki: "Geleneksel fermente değil. Pancar suyu + sirke + sodyum benzoat + sitrik asit. Probiyotik yok.", kaynak: "TGK · CSPI", alternatif: "Ev şalgam suyu (fermente)", arar: ["Pancar Şerbeti", "Hazır Şalgam"] },
 "ELMA SUYU PESTISIT": { ad: "%100 Elma Suyu (Pestisit Kalıntısı + Arsenik)", kat: "İşlenmiş Meyve Suyu", risk: "yuksek", organlar: ["Sinir Sistemi", "Karaciğer"], etki: "EWG: elma sularında klorpirifos + arsenik. Çocuk için yüksek risk.", kaynak: "EWG Apple Juice · FDA 2023 Arsenik · IARC Klorpirifos", alternatif: "Organik elma suyu, taze sıkılmış", arar: ["Elma Suyu", "Apple Juice"] },
 "PORTAKAL SUYU HFCS": { ad: "Hazır Portakal Suyu (Aroma + Sülfit + Renklendirici)", kat: "İşlenmiş Meyve Suyu", risk: "yuksek", organlar: ["Pankreas", "Diş"], etki: "%100 portakal suyu pazarlanır ama konsantre + su + aroma + askorbik asit + sülfit + boya. Tropicana, Dimes.", kaynak: "CSPI Orange Juice · Sülfit", alternatif: "Taze sıkılmış portakal suyu", arar: ["Portakal Suyu", "Orange Juice"] },
 "VIŞNE SUYU SAHTE": { ad: "Vişne Suyu (E122 Renklendirici + HFCS)", kat: "Şekerli İçecek", risk: "yuksek", organlar: ["Sinir Sistemi", "Pankreas"], etki: "Gerçek vişne %5-10. Geri kalan azorubin (E122 - kırmızı) + HFCS + sitrik asit. Çocuk hiperaktivite.", kaynak: "Southampton 2007 · CSPI", alternatif: "Taze vişne, ev sıkma", arar: ["Vişne Suyu", "Sour Cherry Juice"] },

 "KAHVE FILTRESI KAĞIT": { ad: "Klorla Beyazlatılmış Kahve Filtresi (Dioksin)", kat: "Filtreleme", risk: "orta", organlar: ["Hormon", "Bağışıklık"], etki: "Beyaz kahve filtresi klorla ağartılır, dioksin kalıntısı sıcak suyla kahveye geçer. IARC Grup 1.", kaynak: "IARC Vol 69 Dioksin · WHO 2016", alternatif: "Kahverengi (klorsuz) filtre, metal filtre", arar: ["Kahve Filtresi", "Beyaz Filtre"] },

 "KOLA KEFIR YENI": { ad: "Probiyotik İçecek (Şekerli) - Kefir, Activia", kat: "Sahte Probiyotik", risk: "orta", organlar: ["Pankreas", "Bağırsak"], etki: "Endüstriyel kefir/yoğurt içecek aslında şeker bombası. Probiyotik etkisi pazarlama.", kaynak: "JAMA 2019 Probiotic · CSPI", alternatif: "Ev kefiri, sade ayran", arar: ["Probiyotik İçecek", "Activia İçecek"] },

 "SARMAL HALKA SOĞAN": { ad: "Soğan Halkası / Onion Rings (Fast Food)", kat: "Ultra İşlenmiş", risk: "yuksek", organlar: ["Kalp", "Bağırsak"], etki: "Soğan + buğday unu + nişasta + tuz + palmiye yağında kızartma. Akrilamid + trans yağ.", kaynak: "EFSA Akrilamid · WHO Trans · CSPI", alternatif: "Taze soğan, ev yapımı (az yağ)", arar: ["Soğan Halkası", "Onion Rings"] },
 "JALAPENO POPPERS": { ad: "Jalapeno Poppers / Mozzarella Sticks (Donmuş)", kat: "Ultra İşlenmiş", risk: "yuksek", organlar: ["Kalp", "Bağırsak"], etki: "Analog peynir + galeta + palmiye yağı. Yüksek sodyum, trans yağ, akrilamid.", kaynak: "CSPI · WHO", alternatif: "Taze peynir, ev pane", arar: ["Mozzarella Sticks", "Jalapeno Poppers"] },

 "POPSICLE BUZ ŞEKER": { ad: "Buz Şekerleme / Çubuk Dondurma (Şekerli Su)", kat: "İşlenmiş Şekerleme", risk: "yuksek", organlar: ["Pankreas", "Diş"], etki: "Şeker + su + yapay aroma + renklendirici (E102, E110, E129, E133). Meyve aroması.", kaynak: "Southampton 2007 · CSPI · WHO Şeker", alternatif: "Donmuş meyve püresi (ev)", arar: ["Buz Şekerleme", "Popsicle", "Çubuk Dondurma"] },
 "PIRIL DONDURMA": { ad: "Pırıltılı Dondurma (Yapay Süs + Karamel)", kat: "İşlenmiş Dondurma", risk: "yuksek", organlar: ["Bağırsak", "Pankreas"], etki: "Algida Magnum vb. Karamel kaplama + parlatıcı (E901) + renklendirici + emülgatör.", kaynak: "CSPI · TGK", alternatif: "Sade kremalı dondurma, ev yapımı", arar: ["Magnum Dondurma", "Pırıltılı Dondurma"] },

 "DRAJEM ÇIKOLATA": { ad: "Drage Çikolata (M&M's, Bonibon Tarzı)", kat: "İşlenmiş Şekerleme", risk: "yuksek", organlar: ["Sinir Sistemi", "Pankreas"], etki: "Kakao + şeker + 6 farklı boya + parlatıcı + emülgatör. Çocuk hiperaktivite paketi.", kaynak: "Southampton 2007 · CSPI Food Dyes 2023", alternatif: "Sade bitter çikolata", arar: ["M&M's", "Bonibon"] },

 "PIZZA SANSIN": { ad: "Donmuş Hazır Pizza (Eti Cin, Banvit Pizza)", kat: "Ultra-İşlenmiş", risk: "kritik", organlar: ["Kalp", "Tansiyon", "Pankreas", "Bağırsak"], etki: "Analog peynir + işlenmiş et + brom unu + palmiye + 3g+ tuz. TBMM Tüketici Komisyon Raporu 2023: çocuklar için yüksek sodyum kaynağı.", kaynak: "TBMM Tüketici Komisyon 2023 · TKHK · WHO Sodium · TÜTEDER", alternatif: "Geleneksel taş fırın, ev pizzası", arar: ["Hazır Pizza", "Donmuş Pizza"] },
 "ATIŞTIRMALIK PIRINÇ": { ad: "Pirinç Patlağı (Yüksek Glisemik İndeks)", kat: "İşlenmiş Tahıl", risk: "orta", organlar: ["Pankreas"], etki: "Glisemik indeksi 82 - şekerden yüksek. 'Diyet ürün' yalanı. Türkiye Diyetisyenler Derneği uyarısı: kan şekerini fırlatır.", kaynak: "Harvard GI · Türkiye Diyetisyenler Derneği · Türk Diabet Cemiyeti", alternatif: "Yulaf ezmesi, çiğ kuruyemiş", arar: ["Pirinç Patlağı", "Rice Cracker"] },
 "İZOTONIK İÇECEK SODYUM": { ad: "İzotonik İçecek (Powerade, Gatorade)", kat: "Şekerli Sporcu İçeceği", risk: "yuksek", organlar: ["Pankreas", "Diş", "Tansiyon"], etki: "Aslında sodyum + şeker + yapay renk (E110, E102, E133). Türkiye Beslenme Diyetetik Derneği: sıradan spor için gereksiz.", kaynak: "Türkiye Beslenme Diyet Derneği · AAP · CSPI · Lancet 2013", alternatif: "Su + limon + tuz (ev izotonik)", arar: ["İzotonik İçecek", "Sports Drink"] },
 "JELLY BEANS": { ad: "Jelly Beans / Şeker Kaplı Şekerleme", kat: "İşlenmiş Şekerleme", risk: "kritik", organlar: ["Pankreas", "Diş", "Sinir"], etki: "Şeker + glikoz şurubu + nişasta + 6 farklı sentetik boya + parlatıcı şellak (E904). Çocuk hiperaktivite.", kaynak: "Southampton 2007 · CSPI · BEUC", alternatif: "Hurma, kuru meyve", arar: ["Jelly Beans", "Şeker Kaplı"] },
 "FONDAN ŞEKERLEME": { ad: "Fondan / Pastane Süslemesi (Şeker + Renklendirici)", kat: "İşlenmiş Şekerleme", risk: "yuksek", organlar: ["Pankreas", "Bağışıklık"], etki: "%95 şeker + glukoz şurubu + tüm renklendiriciler + parlatıcı. Pasta süslerinde.", kaynak: "Southampton 2007 · CSPI", alternatif: "Doğal meyve süsleme", arar: ["Fondan", "Şeker Pastası"] },
 "MERINGUE TOZ": { ad: "Yumurta Akı Tozu / Meringue Karışım", kat: "İşlenmiş Toz", risk: "orta", organlar: ["Bağırsak"], etki: "Pastörize yumurta akı + maltodekstrin + sodyum benzoat + sitrik asit. Doğal değil.", kaynak: "EFSA · CSPI", alternatif: "Taze yumurta akı", arar: ["Meringue Toz", "Yumurta Akı Tozu"] },

 "AYÇIÇEK YAĞI ENDÜSTRI": { ad: "Endüstriyel Ayçiçek Yağı (Rafine + Heksan)", kat: "İşlenmiş Yağ", risk: "yuksek", organlar: ["Kalp", "Bağışıklık"], etki: "Heksan çözücüsü + kostik soda + beyazlatma toprağı + deodorizasyon. Türk Tabipler Birliği uyarısı: omega-6 fazla, omega-3 az.", kaynak: "Türk Tabipler Birliği · EFSA · Türkiye Tüketici Hakları Derneği · BMJ 2013", alternatif: "Soğuk sıkım ayçiçek, zeytinyağı", arar: ["Endüstriyel Ayçiçek", "Rafine Ayçiçek Yağı"] },
 "DIETETIK YAĞ": { ad: "Diyet/Hafif Yağ (Yapay Eklemeler)", kat: "Sahte Sağlıklı Yağ", risk: "yuksek", organlar: ["Kalp"], etki: "Bitkisel yağ + emülgatör + su + tuz + koruyucu. 'Light' pazarlaması yanıltıcı.", kaynak: "CSPI · BMJ UPF · BEUC", alternatif: "Saf yağ az miktarda kullan", arar: ["Diyet Yağ", "Hafif Yağ"] },
 "MARGARIN SUREN": { ad: "Sürülebilir Margarin (Becel, Sana, Ülker)", kat: "İşlenmiş Yağ", risk: "yuksek", organlar: ["Kalp", "Damar"], etki: "Bitkisel yağ + emülgatör + renk + aroma + omega-3 katkısı (pazarlama). Türk Kardiyoloji Derneği uyarısı: 'kalbe iyi' yalanı.", kaynak: "Türk Kardiyoloji Derneği · WHO Trans · Lancet 2003 · NEJM 2006", alternatif: "Tereyağı, zeytinyağı, avokado", arar: ["Sürülebilir Margarin", "Becel", "Sana"] },

 "EFFERVESAN VITAMIN": { ad: "Efervesan C Vitamini / Multivitamin (Sentetik)", kat: "Sentetik Takviye", risk: "yuksek", organlar: ["Mide", "Böbrek"], etki: "Sentetik askorbik asit + aspartam + sodyum + asit düzenleyici. Türkiye Eczacılar Birliği uyarısı: yüksek sodyum.", kaynak: "Türkiye Eczacılar Birliği · NEJM 2013 Multivitamin · NIH ODS", alternatif: "Taze meyve sebze (C vitamini)", arar: ["Efervesan", "C Vitamini Tablet", "Redoxon"] },
 "MAGNESIUM TOZ": { ad: "Magnezyum Tozu (Sentetik Tatlandırıcı + Aroma)", kat: "Sentetik Takviye", risk: "orta", organlar: ["Bağırsak"], etki: "Magnezyum sitrat + sukraloz + asesülfam + aroma. Doğal değil, ishal yapabilir.", kaynak: "NIH ODS Magnezyum · Mayo Clinic", alternatif: "Yeşil yapraklı sebze, kuruyemiş, kakao", arar: ["Magnezyum Tozu", "Magnesium Powder"] },
 "ÇINKO TAKVIYE": { ad: "Çinko Tablet (Megadoz Aşımı)", kat: "Mineral Takviye", risk: "orta", organlar: ["Mide", "Bağışıklık"], etki: "Uzun süreli yüksek doz bakır eksikliği, mide bulantısı. NIH günlük üst sınır 40mg.", kaynak: "NIH ODS Çinko · Mayo Clinic", alternatif: "Et, balık, kabak çekirdeği, badem", arar: ["Çinko Tablet", "Zinc Supplement"] },

 "MAYONEZ HEINZ": { ad: "Endüstriyel Mayonez (Heinz, Hellmann's, Calve)", kat: "İşlenmiş Sos", risk: "yuksek", organlar: ["Kalp", "Karaciğer"], etki: "Soya yağı (GDO) + EDTA + sirke + şeker + sentetik aroma. Türkiye Gıda Mühendisleri Odası: yüksek omega-6.", kaynak: "Türkiye Gıda Mühendisleri Odası · CSPI · WHO · TÜTEDER", alternatif: "Ev mayonezi (yumurta + zeytinyağı + limon)", arar: ["Heinz Mayonez", "Calve Mayonez", "Hellmann's"] },
 "KETÇAP HEINZ": { ad: "Endüstriyel Ketçap (Heinz, Hunt's, Tat)", kat: "İşlenmiş Sos", risk: "kritik", organlar: ["Pankreas", "Tansiyon", "Karaciğer"], etki: "100g'da 22-25g şeker (5 küp). HFCS + sodyum + sirke + sodyum benzoat + aroma. Çocukta diyabet riski.", kaynak: "Türkiye Beslenme Diyet Derneği · CSPI · WHO Şeker · TKHK", alternatif: "Ev ketçapı (taze domates + bal)", arar: ["Heinz Ketçap", "Tat Ketçap", "Hunt's"] },

 "BIRA TUBORG ENDÜSTRI": { ad: "Türk Endüstriyel Bira (Efes, Tuborg, Bomonti)", kat: "Alkollü İçecek", risk: "yuksek", organlar: ["Karaciğer", "Beyin", "Kanser"], etki: "Glifosat tespit (EWG 2018). Sülfit + PVPP + propilen glikol + sodyum benzoat. WHO Grup 1 kanserojen.", kaynak: "WHO 2023 Alkol · EWG 2018 · Türk Tabipler Birliği Alkol", alternatif: "El yapımı organik bira, alkolsüz", arar: ["Efes Bira", "Tuborg", "Bomonti", "Endüstriyel Bira"] },
 "ŞARAP DOLUCA": { ad: "Türk Endüstriyel Şarap (Doluca, Kavaklıdere)", kat: "Alkollü İçecek", risk: "yuksek", organlar: ["Karaciğer", "Bağışıklık", "Kanser"], etki: "Sülfit (E220) + pestisit kalıntısı + gümüş katkı + ısıtma işlemi. WHO alkol Grup 1.", kaynak: "WHO 2023 Alkol · EFSA Sülfit · Türk Tabipler Birliği", alternatif: "Doğal şarap, alkolsüz şarap", arar: ["Doluca", "Kavaklıdere", "Türk Şarabı"] },

 "DONDURMA ALGIDA": { ad: "Endüstriyel Dondurma (Algida, Magnum, Cornetto)", kat: "Ultra İşlenmiş Dondurma", risk: "yuksek", organlar: ["Kalp", "Bağırsak", "Pankreas"], etki: "Süt yerine bitkisel yağ, %50 hava, mono-digliserit (trans yağ), polisorbat 80, sentetik aroma.", kaynak: "Nature 2015 Chassaing · CSPI · WHO Trans · TÜTEDER", alternatif: "Geleneksel Maraş dondurması (saf süt)", arar: ["Algida", "Magnum", "Cornetto"] },
 "CIKOLATA NESTLE": { ad: "Endüstriyel Sütlü Çikolata (Nestle, Milka, Eti, Ülker)", kat: "İşlenmiş Çikolata", risk: "yuksek", organlar: ["Pankreas", "Kalp"], etki: "%30 kakao + %50 şeker + %20 süt tozu. Çocuk hedefli pazarlama. Türk Pediatri Kurumu: sınırlı tüketim önerisi.", kaynak: "Türk Pediatri Kurumu · WHO Şeker · CSPI", alternatif: "%70+ bitter çikolata", arar: ["Nestle Çikolata", "Milka", "Ülker Çikolata"] },

 "HAZIR KIYMA YENI": { ad: "Hazır Çiğ Kıyma (Soğuk Zincir Sorunu)", kat: "İşlenmiş Et", risk: "yuksek", organlar: ["Bağırsak", "Bağışıklık"], etki: "Marketteki ambalajlı kıyma genelde 2-3 günlük et. Karbon monoksit ile kırmızı renk koruma yapılır (ABD'de yaygın).", kaynak: "FDA CO Et · TGK Et · Türkiye Veteriner Hekimleri Birliği", alternatif: "Kasaptan taze çekilmiş kıyma", arar: ["Hazır Kıyma", "Paketli Kıyma"] },
 "TAVUK ÇIĞ MARKET": { ad: "Market Hazır Tavuk (Antibiyotik + Soğuk Zincir)", kat: "İşlenmiş Tavuk", risk: "kritik", organlar: ["Bağışıklık", "Bağırsak"], etki: "Hızlı büyüme antibiyotik kalıntısı + soğuk zincir sorunu + salmonella riski.", kaynak: "WHO 2021 AMR · Türk Veteriner Hekimleri Birliği · Greenpeace", alternatif: "Köy tavuğu, organik tavuk", arar: ["Market Tavuk", "Endüstriyel Tavuk"] },
 "BALIK MARKET BUZ": { ad: "Market Balığı (Buzlu - Tazelik Şüphesi)", kat: "İşlenmiş Balık", risk: "orta", organlar: ["Bağırsak"], etki: "Tazelik göstergesi olarak buzla saklanır ama kaç gündür buzda olduğu belirsiz. Histamin riski.", kaynak: "WHO Balık Güvenliği · Türkiye Su Ürünleri Müteahhitleri Birliği", alternatif: "Balıkçıdan taze balık (göz parlak, solungaç kırmızı)", arar: ["Market Balığı", "Buzlu Balık"] },

 "KONSERVE TON BALIĞI": { ad: "Konserve Ton Balığı (BPA Kutu + Civa)", kat: "İşlenmiş Balık Konservesi", risk: "kritik", organlar: ["Hormon", "Beyin", "Üreme"], etki: "BPA kutu astar (asitli ortamda emilim) + civa birikimi. Hamilelere haftada 1 max.", kaynak: "FDA 2021 Fish · WHO Civa · EFSA BPA · EWG", alternatif: "Hamsi, sardalye, ringa (küçük balık)", arar: ["Ton Balığı Konservesi", "Tuna Can"] },
 "SARDALYA KONSERVE": { ad: "Sardalya Konservesi (Yağ + Sodyum + BPA)", kat: "İşlenmiş Balık", risk: "yuksek", organlar: ["Tansiyon", "Hormon"], etki: "Ayçiçek/soya yağı (zeytinyağı değil) + sodyum + BPA kutu astar. 'Sağlıklı' diye satılır.", kaynak: "EFSA BPA · CSPI", alternatif: "Cam kavanozda sardalya, taze sardalye", arar: ["Sardalya Konservesi", "Sardine"] },
 "HAMSI KONSERVE TUZ": { ad: "Konserve Hamsi (Aşırı Tuzlu)", kat: "İşlenmiş Balık", risk: "yuksek", organlar: ["Tansiyon"], etki: "Konserve hamsi 8-10g/100g sodyum içerebilir. WHO günlük tuz limiti = 1 kutu konserve.", kaynak: "WHO Sodium · Türk Tabipler Birliği Hipertansiyon", alternatif: "Taze hamsi (mevsiminde), evde tuzlama", arar: ["Konserve Hamsi", "Tuzlu Hamsi"] },

 "TAVUK GÖGSÜ ENJEKSIYON": { ad: "Su Enjeksiyonlu Tavuk Göğsü (Et Şişirme)", kat: "Et Hilesi", risk: "yuksek", organlar: ["Böbrek", "Tansiyon"], etki: "Eti şişirmek için %30 su + fosfat + tuz enjekte edilir. Tüketici ete değil suya para öder.", kaynak: "AB Reg 853/2004 · TKHK · TÜTEDER Tavuk Hile Raporu", alternatif: "Köy tavuğu, kasaptan bütün tavuk", arar: ["Enjeksiyonlu Tavuk", "Su Eklenmiş Tavuk"] },
 "DANA ETI KARMA": { ad: "Karışık Dana Eti (Pinar, Maret)", kat: "İşlenmiş Et", risk: "yuksek", organlar: ["Bağırsak", "Bağışıklık"], etki: "Etikette 'dana' yazsa bile sığır + hindi + tavuk karışımı olabilir. Türkiye'de yaygın hile.", kaynak: "TGK Et · Türkiye Tarım Bakanlığı Hile · TKHK", alternatif: "Kasaptan tek parça, görerek alım", arar: ["Karışık Dana", "Karma Et"] },

 "ÇIKOLATA SÜTÜ NESQUIK": { ad: "Çikolatalı Süt (Nesquik, Choco Drink, SodaStream)", kat: "Şekerli Süt İçeceği", risk: "yuksek", organlar: ["Pankreas", "Diş"], etki: "200ml'de 18-22g şeker + kakao + karra + sentetik vanilin + lesitin. Çocuk hedefli.", kaynak: "WHO Şeker · CSPI · TÜTEDER", alternatif: "Sade süt + kakao tozu (şekersiz)", arar: ["Nesquik", "Çikolatalı Süt", "Chocolate Milk"] },
 "MILKSHAKE FAST FOOD": { ad: "Milkshake (Fast Food - McDonald's, Burger King)", kat: "Şekerli Süt İçeceği", risk: "kritik", organlar: ["Pankreas", "Bağırsak"], etki: "Süt + krema + 60g+ şeker + sentetik aroma + emülgatör + renklendirici. Tek bardakta günlük şeker 2x aşılır.", kaynak: "CSPI Milkshake · WHO Şeker", alternatif: "Ev milkshake (süt + meyve + bal)", arar: ["Milkshake", "Fast Food Milkshake"] },

 "PUDDING DANETTE": { ad: "Hazır Sütlü Tatlı Kasesi (Danette, Activia, Pinar Tatlım)", kat: "İşlenmiş Tatlı", risk: "yuksek", organlar: ["Pankreas", "Bağırsak"], etki: "Süt %50, geri kalan nişasta + şeker + emülgatör + aroma + renklendirici. Çocuk pazarlaması.", kaynak: "TGK · CSPI · TÜTEDER", alternatif: "Ev sütlaç, ev muhallebi", arar: ["Danette", "Pinar Tatlım", "Activia Tatlı"] },

 "GELENEKSEL DEVE PEYNIRI": { ad: "Sahte Deve / Manda Peynir (İnek Sütü Karışım)", kat: "Sahte Premium Peynir", risk: "orta", organlar: ["Bağırsak"], etki: "Pahalı deve/manda peynirleri inek sütü ile karıştırılır. Türkiye'de yaygın hile.", kaynak: "TGK Peynir · Tarım Bakanlığı Hile Raporu", alternatif: "Sertifikalı manda mandırası, görerek alım", arar: ["Manda Peyniri", "Deve Peyniri"] },
 "TEREYAĞI KARGI HILE": { ad: "Sahte Tereyağı (Bitkisel Yağ Karışımı)", kat: "Sahte Tereyağı", risk: "yuksek", organlar: ["Kalp", "Karaciğer"], etki: "Türkiye'de yaygın hile: tereyağına %30-50 bitkisel yağ karıştırılır. Tarım Bakanlığı 2022 hile raporu.", kaynak: "Türkiye Tarım Bakanlığı 2022 Hile Raporu · TKHK · TÜTEDER", alternatif: "Trabzon/Erzincan kazan tereyağı (sertifikalı)", arar: ["Sahte Tereyağı", "Karışık Tereyağı"] },
 "CIVCIV YUMURTA HORMON": { ad: "Yumurta - Konvansiyonel Tavuk (Hızlı Üretim)", kat: "Çiftlik Yumurtası", risk: "orta", organlar: ["Bağışıklık"], etki: "Endüstriyel tavuk yemi GDO mısır + soya + antibiyotik. Bu kalıntılar yumurtaya geçer.", kaynak: "EFSA Çiftlik Yumurtası · Greenpeace · EWG", alternatif: "Köy yumurtası, organik sertifikalı, free-range", arar: ["Endüstriyel Yumurta", "Konvansiyonel Yumurta"] },
 "YUMURTA OMEGA SAHTE": { ad: "Omega-3 Eklemeli Yumurta (Pazarlama)", kat: "Pazarlama Yumurta", risk: "dusuk", organlar: [], etki: "Çok az omega-3, pahalı pazarlama. Doğal yumurta zaten yeterli omega-3 içerir.", kaynak: "FDA Yumurta · NIH ODS", alternatif: "Köy yumurtası, balık", arar: ["Omega Yumurta", "Omega-3 Egg"] },

 "FAST FOOD SOS KETÇAP": { ad: "Fast Food Ketçap Paketi (Daha Sodyumlu)", kat: "İşlenmiş Sos", risk: "yuksek", organlar: ["Pankreas", "Tansiyon"], etki: "Restoran ketçapı market ketçapından daha yüksek sodyum + HFCS. McDonald's, Burger King paketleri.", kaynak: "CSPI Fast Food · WHO", alternatif: "Ev ketçapı, taze domates", arar: ["Fast Food Ketçap", "Restoran Ketçap"] },
 "MAYONEZ PAKET FAST": { ad: "Fast Food Mayonez Paketi", kat: "İşlenmiş Sos", risk: "yuksek", organlar: ["Kalp"], etki: "Soya yağı (GDO) + EDTA + koruyucu + sodyum yüksek. Tek pakette günlük yağ %25.", kaynak: "CSPI · WHO", alternatif: "Ev mayonezi, sade yoğurt", arar: ["Fast Food Mayonez", "Paket Mayonez"] },

 "MEYVELI ŞAMPUAN": { ad: "Meyveli Çocuk Şampuanı (Aroma + Renk)", kat: "Kişisel Bakım", risk: "yuksek", organlar: ["Cilt", "Hormon", "Solunum"], etki: "100+ kimyasal 'parfüm' altında. Paraben, ftalat, SLS. Çocuk derisi geçirgen.", kaynak: "EWG Skin Deep · ANSES 2019 · BEUC", alternatif: "Organik bebek şampuanı, kastil sabunu", arar: ["Çocuk Şampuanı", "Meyveli Şampuan"] },
 "DUŞ JELI PARFÜM": { ad: "Endüstriyel Duş Jeli (SLS + Paraben + Parfüm)", kat: "Kişisel Bakım", risk: "yuksek", organlar: ["Cilt", "Hormon"], etki: "Sodyum lauril sülfat (SLS) cilt iritasyonu + paraben hormon bozucu + sentetik koku. Dove, Nivea, Avon.", kaynak: "EWG · Danimarka Sağlık · ANSES", alternatif: "Doğal sabun, kastil, gliserin sabun", arar: ["Duş Jeli", "Banyo Jeli", "Shower Gel"] },
 "DEODORANT ALÜMINYUM": { ad: "Antiperspirant Deodorant (Alüminyum Klorohidrat)", kat: "Kişisel Bakım", risk: "yuksek", organlar: ["Lenf Bezleri", "Beyin"], etki: "Alüminyum lenf bezleri yakınında birikim, meme kanseri bağlantısı (tartışmalı). Rexona, Nivea.", kaynak: "EWG · Mosby Aluminum · Lancet Oncology", alternatif: "Doğal şap taşı, sodyum bikarbonat", arar: ["Antiperspirant", "Alüminyumlu Deodorant"] },
 "DIŞ MACUNU FLORÜR": { ad: "Yüksek Florürlü Diş Macunu (Doz Aşımı Riski)", kat: "Diş Bakımı", risk: "yuksek", organlar: ["Diş", "Beyin", "Tiroid"], etki: "Çocuklarda yutma riski + florozis. NTP 2024 çocuk IQ düşüşü bağlantısı.", kaynak: "NTP 2024 Florür IQ · Lancet 2014 Grandjean · ADA", alternatif: "Florürsüz veya düşük florürlü, hindistan cevizi yağı + soda", arar: ["Diş Macunu", "Florürlü Diş Macunu"] },
 "AĞIZ GARGARASI ALKOL": { ad: "Alkollü Ağız Gargarası (Listerine, Oral-B)", kat: "Diş Bakımı", risk: "yuksek", organlar: ["Ağız", "Bağırsak", "Kanser"], etki: "Yüksek alkol oranı (%25+) ağız mikrobiyomu yok eder, asetaldehit (kanserojen) oluşturur.", kaynak: "Australian Dental J 2009 · IARC Asetaldehit", alternatif: "Tuzlu su, alkolsüz gargara, doğal", arar: ["Ağız Gargarası", "Listerine", "Mouthwash"] },

 "AŞIRI KOLA ÇOCUK": { ad: "Çocuk Coca-Cola / Pepsi Tüketimi", kat: "Şekerli Gazoz", risk: "kritik", organlar: ["Pankreas", "Diş", "Kemik", "Beyin"], etki: "Bir kutuda 9 küp şeker. Türk Diş Hekimleri Birliği: çocukta erken çürük temel sebebi.", kaynak: "Türk Diş Hekimleri Birliği · WHO Şeker · AAP · Lancet 2010", alternatif: "Su, taze sıkma meyve suyu (az)", arar: ["Coca-Cola", "Pepsi", "Kola"] },

 "TURŞU LAHANA HAZIR": { ad: "Hazır Lahana Turşusu (Sirke + Tuz - Fermente Değil)", kat: "Sahte Fermente", risk: "orta", organlar: ["Bağırsak"], etki: "Geleneksel laktik asit fermentasyonu yerine sirke + tuz + sodyum benzoat. Probiyotik fayda yok.", kaynak: "Türk Mikrobiyoloji Cemiyeti · CSPI · TGK", alternatif: "Ev lahana turşusu (sirkesiz, fermente)", arar: ["Lahana Turşusu Hazır", "Hazır Turşu"] },
 "SALATA HAZIR PAKET": { ad: "Paket Salata (Klorla Yıkanmış)", kat: "İşlenmiş Sebze", risk: "orta", organlar: ["Bağırsak", "Bağışıklık"], etki: "Marul/roka/spinat paketli salatalar klorlu su ile yıkanır. Probiyotik flora yok edilir. Pestisit kalıntısı kalır.", kaynak: "EWG Salata · Greenpeace · BEUC", alternatif: "Taze sebze (evde yıka)", arar: ["Paket Salata", "Hazır Salata"] },
 "DOMATES SOSU CAM": { ad: "Cam Kavanoz Domates Sosu (Endüstriyel)", kat: "İşlenmiş Sos", risk: "orta", organlar: ["Pankreas"], etki: "Domates + şeker + sirke + sodyum + sodyum benzoat + sentetik aroma. Ragu, Barilla.", kaynak: "CSPI · TGK", alternatif: "Taze domates sosu", arar: ["Domates Sosu", "Pasta Sauce"] },

 "POŞET KAHVE 3 IN 1": { ad: "Poşet Hazır Kahve (Jacobs, Nescafe, Mahmood)", kat: "Ultra İşlenmiş Kahve", risk: "yuksek", organlar: ["Pankreas", "Kalp"], etki: "İnstant kahve + şeker + hidrojenize bitkisel yağ tozu (trans yağ) + aroma. Türkiye'de en çok satan.", kaynak: "WHO Trans · CSPI · BMJ UPF", alternatif: "Türk kahvesi, filtre kahve", arar: ["3'ü 1 Arada Kahve", "Hazır Poşet Kahve"] },
 "BARBARESCO BOTOX": { ad: "Hazır Coca-Cola Üretim Yan Ürünleri", kat: "Pazarlama Hilesi", risk: "yuksek", organlar: ["Karaciğer", "Pankreas"], etki: "Coca-Cola fabrikası şişe değişikliği + 'doğal' diye yeni ürünler. Aynı içerik (HFCS + fosforik asit).", kaynak: "CSPI · TÜTEDER", alternatif: "Su, maden suyu", arar: ["Coca-Cola Doğal", "Coca-Cola Premium"] },

 "İÇECEK NETWORK MARKETING": { ad: "Network Marketing Sağlık Ürünleri (Forever, Herbalife)", kat: "MLM Sağlık Ürünü", risk: "yuksek", organlar: ["Karaciğer", "Böbrek"], etki: "Pahalı bitki karışımları + sentetik vitamin. Klinik kanıt yok. Karaciğer hasarı vakaları (Herbalife).", kaynak: "Hepatology 2007 Herbalife · NIH NCCIH · BMJ Network Marketing", alternatif: "Doğal gıda, doktor kontrolünde", arar: ["Forever Living", "Herbalife", "Network Marketing Ürünleri"] },

 "TARÇINLI ELMA ÇAYI": { ad: "Aromalı Hazır Çay Karışımları (Bitki Çayı)", kat: "İşlenmiş Bitkisel İçecek", risk: "orta", organlar: ["Karaciğer"], etki: "Gerçek bitki azaltılmış, aroma + sitrik asit + ucuz bitki tozu eklenmiş. Doğal yarar düşük.", kaynak: "EFSA Bitkisel · CSPI · TÜTEDER", alternatif: "Tek tek kuru bitki (taze)", arar: ["Aromalı Çay Karışım", "Tarçınlı Çay"] },

 "HAZIR YEMEK FROZEN": { ad: "Donmuş Hazır Yemekler (Banvit Yemek, Maret)", kat: "Ultra İşlenmiş", risk: "kritik", organlar: ["Kalp", "Tansiyon", "Bağırsak", "Karaciğer"], etki: "20+ bileşen, MSG, sodyum bombası, palmiye, koruyucu, GDO. Türkiye Beslenme Diyet Derneği: günde 1 öğün max.", kaynak: "Türkiye Beslenme Diyet Derneği · BMJ 2019 UPF · WHO · CSPI", alternatif: "Ev yemeği, taze hazırlama", arar: ["Donmuş Yemek", "Hazır Yemek"] },

 "ŞEKERLEME YENI YIL": { ad: "Yeni Yıl/Bayram Şekerleme Karışımları (Yapay Renk)", kat: "İşlenmiş Şekerleme", risk: "kritik", organlar: ["Sinir Sistemi", "Pankreas", "Bağırsak"], etki: "Tüm Southampton 6'lı boya karışımı, parlatıcı, koruyucu. Çocuk dikkat eksikliği.", kaynak: "Southampton 2007 · CSPI · Türk Pediatri Kurumu", alternatif: "Doğal kuru meyve karışımı, hurma", arar: ["Yeni Yıl Şekerleme", "Bayram Şekerleme"] },
 "AĞDA SAKIZ": { ad: "Çekme Şeker / Akide Ağdası (Beyazlatma)", kat: "İşlenmiş Şekerleme", risk: "yuksek", organlar: ["Pankreas", "Diş"], etki: "Saf şeker + glikoz + asit + yapay aroma + parlatıcı. Geleneksel akide farklı.", kaynak: "TGK · CSPI · Türk Diş Hekimleri Birliği", alternatif: "Geleneksel akide şekerleme", arar: ["Çekme Şeker", "Akide Ağdası"] },

 "ŞEHRIYE NOODLE": { ad: "Hazır Şehriye / Erişte (Beyaz Un + Yumurta Tozu)", kat: "İşlenmiş Tahıl", risk: "orta", organlar: ["Pankreas", "Bağırsak"], etki: "Beyaz un + yumurta tozu + koruyucu. Geleneksel ev şehriyesi/eriştesi yok.", kaynak: "TGK · Türkiye Beslenme Diyet Derneği", alternatif: "Ev şehriyesi (tam buğday)", arar: ["Şehriye", "Erişte"] },
 "PIRINÇ MARKET": { ad: "Endüstriyel Pirinç (Arsenik Riski)", kat: "Tahıl", risk: "yuksek", organlar: ["Beyin", "Kanser"], etki: "Pirinç su altı tarımı, arsenik yüksek. Hindistan/Tayland kaçak ürünler riskli. FDA bebek için sınır koydu.", kaynak: "FDA 2023 Pirinç · WHO · TGK · Türkiye Tarım Bakanlığı", alternatif: "Bulgur, kinoa, basmati (test edilmiş)", arar: ["Pirinç", "Endüstriyel Pirinç"] },
 "BULGUR ENDÜSTRI": { ad: "Endüstriyel Bulgur (Renklendirilmiş)", kat: "İşlenmiş Tahıl", risk: "orta", organlar: ["Pankreas"], etki: "Bazı markaların bulgurları doğal değil - sarı için kurkumin/tartrazin eklenir. Geleneksel bulgur değil.", kaynak: "TGK Bulgur · Tarım Bakanlığı Hile", alternatif: "Geleneksel köy bulguru (sertifikalı CI)", arar: ["Endüstriyel Bulgur", "Bulgur"] },
 "MAKARNA BEYAZ": { ad: "Beyaz Makarna (Rafine Un + Glisemik Bomba)", kat: "Rafine Tahıl", risk: "orta", organlar: ["Pankreas"], etki: "Rafine un, lif yok, glisemik indeks yüksek. Türkiye'de en çok tüketilen ürün.", kaynak: "WHO · Türkiye Beslenme Diyet Derneği · Lancet Diabet", alternatif: "Tam buğday makarna, mercimek/nohut makarna", arar: ["Beyaz Makarna", "Makarna"] },
 "INSTANT MAKARNA": { ad: "Hazır Sıcak Makarna (Eti Mukus, Knorr Cup Pasta)", kat: "Ultra İşlenmiş", risk: "kritik", organlar: ["Kalp", "Tansiyon", "Bağırsak"], etki: "Makarna + TBHQ + MSG + palmiye + 5g+ tuz + yapay aroma. Çocuk hedefli.", kaynak: "WHO Sodium · CSPI · Türk Pediatri Kurumu · Türkiye Beslenme Diyet Derneği", alternatif: "Ev makarna (taze), basit sos", arar: ["Bardak Makarna", "Cup Pasta", "Eti Mukus"] },

 "ECZANE VITAMIN GUMMY": { ad: "Eczane Gummy Vitaminleri (Şeker + Jelatin + Renk)", kat: "Şekerli Takviye", risk: "yuksek", organlar: ["Pankreas", "Diş"], etki: "Çocuk vitamin sakızları %30-50 şeker + jelatin (domuz) + yapay renk + aroma. Türkiye Eczacılar Birliği uyarısı.", kaynak: "Türkiye Eczacılar Birliği · CSPI · Türk Diş Hekimleri Birliği", alternatif: "Tablet vitamin, doğal beslenmeden", arar: ["Gummy Vitamin", "Çocuk Vitamini", "Vitamin Sakızı"] },
 "ÇOCUK ŞURUP RENKLENDIRIRC": { ad: "Çocuk Vitamin Şurupları (E102 + Şeker)", kat: "Sahte Sağlıklı Takviye", risk: "yuksek", organlar: ["Sinir Sistemi", "Pankreas"], etki: "Vitamin + sukroz + tartrazin (sarı 5) + sodyum benzoat + sentetik aroma. Çocuk hiperaktivite.", kaynak: "Southampton 2007 · Türkiye Eczacılar Birliği · Türk Pediatri Kurumu", alternatif: "Doğal beslenme, gerekirse doktor reçeteli", arar: ["Vitamin Şurubu", "Çocuk Vitamin"] },
 "DEMIRLI SOL": { ad: "Demir Şurubu (Sukroz + Renklendirici)", kat: "Demir Takviyesi", risk: "orta", organlar: ["Bağırsak", "Diş"], etki: "Ferrosülfat + sukroz + sorbitol + sentetik aroma. Diş enamel boyar, mide bulantısı.", kaynak: "Türkiye Eczacılar Birliği · Türk Pediatri", alternatif: "Doğal demir (kırmızı et, mercimek, ıspanak + C vitamini)", arar: ["Demir Şurubu", "Ferro Tablet"] },
 "MELATONIN GUMMY": { ad: "Çocuk Melatonin Sakızları (Doz Aşımı)", kat: "Hormon Takviyesi", risk: "kritik", organlar: ["Beyin", "Hormon"], etki: "Çocuk hormon sistemini bozar. ABD'de zehirlenme %530 arttı (CDC 2022). Türkiye'de eczane online satışı tehlikeli.", kaynak: "CDC 2022 Melatonin · AAP · Türkiye Eczacılar Birliği", alternatif: "Doğal uyku hijyeni, gün ışığı", arar: ["Melatonin Sakızı", "Çocuk Melatonin"] },

 "OYUNCAK ŞEKERLEME": { ad: "Oyuncaklı Şekerleme (Kinder Sürpriz, Chupa Chups)", kat: "Çocuk Hedefli Şekerleme", risk: "yuksek", organlar: ["Pankreas", "Bağırsak", "Boğulma"], etki: "Şeker + palmiye + süt tozu + soya lesitini + plastik oyuncak (boğulma riski). AB'de defalarca geri çağırma.", kaynak: "AB RASFF Kinder Geri Çağırma 2022 · WHO Şeker · Türk Pediatri", alternatif: "Sade ev tatlısı", arar: ["Kinder Sürpriz", "Oyuncaklı Şeker", "Chupa Chups Surprise"] },
 "ÇIKOLATA YUMURTA": { ad: "Çikolatalı Yumurta (Kinder Joy, Ferrero)", kat: "Ultra İşlenmiş", risk: "yuksek", organlar: ["Pankreas", "Bağırsak"], etki: "Şeker + palmiye + krem + 6 farklı emülgatör + yapay aroma. Pazarlama çocuk için 'eğlenceli'.", kaynak: "WHO Şeker · CSPI · BEUC", alternatif: "Sade çikolata yumurta, bayram tatlısı", arar: ["Kinder Joy", "Ferrero Kinder"] },
 "PEZ ŞEKER KAFA": { ad: "PEZ / Eğlenceli Şekerleme Dispenseri", kat: "Çocuk Şekerleme", risk: "yuksek", organlar: ["Pankreas", "Diş"], etki: "%97 dekstroz + glikoz şurubu + asit + sentetik aroma + tüm boyalar. Sadece şeker.", kaynak: "WHO · Southampton 2007", alternatif: "Hurma, kuru meyve", arar: ["PEZ Şeker", "Şeker Dispenser"] },
 "KAYABASI BUZLU": { ad: "Plastik Çubuk Buzlu Şeker (Bingo, Calippo)", kat: "İşlenmiş Şekerleme", risk: "yuksek", organlar: ["Pankreas", "Bağırsak"], etki: "Su + glikoz şurubu + yapay aroma + tüm renklendiriciler + plastik ambalaj.", kaynak: "WHO Şeker · Southampton 2007 · Türk Pediatri", alternatif: "Donmuş gerçek meyve püresi", arar: ["Buzlu Şeker", "Bingo", "Calippo"] },
 "MAYŞE BUZLU": { ad: "Cup Buzlu Tatlı (Maraş Süzme - Hazır)", kat: "İşlenmiş Dondurma", risk: "yuksek", organlar: ["Bağırsak", "Pankreas"], etki: "Geleneksel Maraş süzme yerine süt tozu + nişasta + emülgatör + sentetik aroma + şeker.", kaynak: "TGK · CSPI", alternatif: "Geleneksel Maraş dondurması", arar: ["Cup Dondurma", "Maraş Süzme Hazır"] },

 "SUYUK SUYUKADIN HAZIR": { ad: "Hazır Şekerli İçecek Tozu (Suyukadın, Yedigün Toz)", kat: "Ultra İşlenmiş", risk: "kritik", organlar: ["Pankreas", "Sinir Sistemi", "Diş"], etki: "Şeker + maltodekstrin + sitrik asit + yapay renk + aroma. Kola Turka kapsül, çocuk hedefli.", kaynak: "Southampton 2007 · WHO Şeker · Türk Diş Hekimleri", alternatif: "Su + taze meyve", arar: ["Toz İçecek", "Suyukadın"] },
 "ŞALGAM TOZU": { ad: "Hazır Şalgam Tozu (Sentetik Aroma)", kat: "Sahte Fermente", risk: "yuksek", organlar: ["Mide", "Pankreas"], etki: "Şalgam aroması + sitrik asit + tuz + renklendirici. Geleneksel fermente şalgam değil.", kaynak: "TGK Şalgam · Adana Üniversitesi", alternatif: "Geleneksel Adana şalgam", arar: ["Şalgam Tozu", "Hazır Şalgam Karışım"] },

 "AROMALI MADEN SUYU": { ad: "Aromalı Maden Suyu (Sade Pazarlanır)", kat: "İşlenmiş İçecek", risk: "orta", organlar: ["Diş", "Pankreas"], etki: "Maden suyu + sitrik asit + yapay aroma + sukraloz/asesülfam (kaçak şeker). Erikli, Beypazarı.", kaynak: "TGK · CSPI · WHO", alternatif: "Sade maden suyu + taze limon", arar: ["Aromalı Maden Suyu", "Sour"] },
 "MENBA SUYU YENI": { ad: "Plastik Şişe İçme Suyu (Mikroplastik)", kat: "Plastik Şişe", risk: "yuksek", organlar: ["Bağırsak", "Hormon"], etki: "Plastik şişede mikroplastik (litrede 240.000 partikül). BPA-free etiketli olsa da BPS aynı zararlı.", kaynak: "PNAS 2024 Nanoplastik · WHO · Greenpeace", alternatif: "Cam şişe, çelik termos, filtreli su", arar: ["Plastik Şişe Su", "PET Şişe"] },

 "DOLDURULMUŞ MAKARNA": { ad: "Doldurulmuş Makarna (Hazır Ravoli, Tortellini)", kat: "İşlenmiş Hamur", risk: "yuksek", organlar: ["Kalp", "Bağırsak"], etki: "Beyaz un + soya proteini + karışık et + nişasta + MSG + tuz. %50 et oranı bile yok.", kaynak: "TGK · CSPI · Türkiye Beslenme Diyet Derneği", alternatif: "Ev mantısı, geleneksel", arar: ["Ravoli", "Tortellini", "Doldurulmuş Makarna"] },
 "DRESSING SOS": { ad: "Salata Sosu (Hazır - Ranch, İtalyan, Caesar)", kat: "İşlenmiş Sos", risk: "yuksek", organlar: ["Kalp", "Bağırsak"], etki: "Soya yağı + sirke + MSG + EDTA + sentetik aroma + sodyum + koruyucu.", kaynak: "CSPI Salad Dressing · WHO", alternatif: "Ev sosu (zeytinyağı + limon)", arar: ["Salata Sosu", "Dressing", "Caesar Sos"] },

 "SOSLU HINDI": { ad: "Hazır Soslu Hindi/Tavuk (Pinar, Maret)", kat: "İşlenmiş Et", risk: "yuksek", organlar: ["Kalp", "Tansiyon"], etki: "Et + soya proteini + sodyum + sentetik aroma + emülgatör. Geleneksel marinasyon değil.", kaynak: "TGK · CSPI", alternatif: "Taze tavuk/hindi, ev marinasyonu", arar: ["Soslu Hindi", "Marine Et"] },
 "BAGEL EKMEK": { ad: "Hazır Bagel Ekmek (Azodikarbonamid)", kat: "İşlenmiş Ekmek", risk: "kritik", organlar: ["Solunum", "Cilt"], etki: "ADA (E927a) - 'yoga matı kimyasalı'. AB yasak. ABD'de bazı zincir restoranlar kullanır.", kaynak: "AB Reg 1129/2011 · CSPI Subway 2014 · WHO ADA", alternatif: "Geleneksel ekmek, ekşi maya", arar: ["Bagel"] },

 "FALAFEL HAZIR": { ad: "Hazır Falafel Karışımı (Kuru Toz)", kat: "İşlenmiş Toz", risk: "orta", organlar: ["Bağırsak"], etki: "Nohut unu + baharat + MSG + tuz + dehidrate sebze. Tazelik kaybolmuş.", kaynak: "CSPI · TGK", alternatif: "Taze nohut + maydanoz + baharat (ev)", arar: ["Hazır Falafel", "Falafel Mix"] },
 "TABULE HAZIR": { ad: "Hazır Tabule / Kısır Karışımı (Kuru)", kat: "İşlenmiş Toz", risk: "yuksek", organlar: ["Tansiyon", "Bağırsak"], etki: "Bulgur + dehidrate sebze + MSG + sentetik aroma + 4-5g sodyum/porsiyon. Taze değil.", kaynak: "WHO Sodium · CSPI · TGK", alternatif: "Ev kısırı (taze maydanoz, domates)", arar: ["Tabule Karışım", "Kısır Karışımı"] },

 "ÇILEK KURUTULMUŞ": { ad: "Şekerli Kurutulmuş Meyve (Şeker Eklenmiş)", kat: "İşlenmiş Kuru Meyve", risk: "yuksek", organlar: ["Pankreas", "Diş"], etki: "Doğal kurutmaya şeker eklenmiş + sülfit + yapay renk. Aslında şekerleme.", kaynak: "TGK · CSPI · Türk Diş Hekimleri", alternatif: "Doğal kurutulmuş meyve (şeker yok)", arar: ["Şekerli Kuru Meyve", "Glazed Fruit"] },
 "MEYVE BAR KURUTULMUŞ": { ad: "Meyveli Bar (Fruit Roll Ups - HFCS + Pektin)", kat: "İşlenmiş Şekerleme", risk: "yuksek", organlar: ["Pankreas", "Diş"], etki: "%30 meyve, geri kalan HFCS + pektin + sitrik asit + renklendirici. 'Meyve bar' yalanı.", kaynak: "WHO · CSPI · Türk Pediatri", alternatif: "Taze meyve, hurma", arar: ["Fruit Roll Up", "Meyve Bar"] },

 "EKMEK İLAVELI VITAMIN": { ad: "'Vitamin Eklenmiş' Beyaz Ekmek (Pazarlama)", kat: "Pazarlama Yalanı", risk: "orta", organlar: ["Pankreas"], etki: "Beyaz un üretiminde vitaminler kaybedilir, sonra sentetik eklenir. Doğal değil.", kaynak: "BMJ UPF · Türkiye Beslenme Diyet · WHO", alternatif: "Tam buğday, gerçek tahıl ekmek", arar: ["Vitaminli Ekmek", "Vitaminli Tam Buğday"] },
 "KEPEK KARIŞIK EKMEK": { ad: "'Kepekli' Ekmek (Beyaz Un + Az Kepek Eklemeli)", kat: "Sahte Sağlıklı Ekmek", risk: "yuksek", organlar: ["Pankreas"], etki: "%80 beyaz un + %20 kepek katkı. 'Tam buğday' diye satılır ama yarısı bile değil.", kaynak: "TGK · CSPI Bread", alternatif: "%100 tam buğday, geleneksel siyez/karabuğday", arar: ["Kepekli Ekmek", "Whole Wheat Bread"] },
 "BUĞDAY EKMEĞI KARAMEL": { ad: "'Çavdar Ekmek' (Karamel Boya ile Boyalı)", kat: "Sahte Tahıl Ekmek", risk: "yuksek", organlar: ["Pankreas", "Karaciğer"], etki: "Gerçek çavdar değil. Beyaz un + karamel boya (E150D) + melas. Görsel hile.", kaynak: "TGK · CSPI · BEUC", alternatif: "%100 çavdar ekmeği, gerçek geleneksel", arar: ["Çavdar Ekmeği", "Rye Bread Sahte"] },

 "KAYNAK SAHTE SÜT": { ad: "Sahte 'Köy Sütü' (Endüstriyel Süt Tozu)", kat: "Sahte Süt", risk: "yuksek", organlar: ["Bağırsak"], etki: "'Köy sütü', 'çiftlik sütü' diye satılan ürünler genelde rekombine süt (süt tozu + yağ).", kaynak: "TGK · Tarım Bakanlığı Süt Hile · Türk Veteriner Hekimleri Birliği", alternatif: "Yerel mandıra, doğrudan üretici", arar: ["Köy Sütü", "Çiftlik Sütü"] },
 "UHT SÜT YENI": { ad: "UHT Süt (Ultra Pastörize - Besin Kaybı)", kat: "İşlenmiş Süt", risk: "orta", organlar: ["Bağırsak"], etki: "Aşırı pastörize (140°C 4 sn) bakteri+ vitaminleri yok eder. Doğal süt değil. Pinar, Sütaş, Sek.", kaynak: "Türkiye Beslenme Diyet Derneği · WHO Süt · CSPI", alternatif: "Düşük ısı pastörize, çiftlik sütü", arar: ["UHT Süt", "Tetra Pak Süt"] },

 "EFFERVESAN MAGNEZYUM": { ad: "Efervesan Magnezyum (Sodyum + Tatlandırıcı)", kat: "Sentetik Takviye", risk: "yuksek", organlar: ["Tansiyon", "Bağırsak"], etki: "Magnezyum sitrat + sodyum bombası + aspartam + asesülfam + sentetik aroma.", kaynak: "Türkiye Eczacılar Birliği · NIH ODS", alternatif: "Yeşil yapraklı sebze, ceviz, kakao", arar: ["Efervesan Magnezyum", "Magnezyum Tablet"] },
 "POTASYUM TABLET": { ad: "Potasyum Tabletleri (Tehlikeli Doz Aşımı)", kat: "Mineral Takviye", risk: "kritik", organlar: ["Kalp", "Böbrek"], etki: "Yüksek doz kalp ritim bozukluğu, böbrek yetmezliği. FDA günlük 99mg/tablet sınır.", kaynak: "FDA Potasyum · NIH ODS · Mayo Clinic", alternatif: "Muz, avokado, patates (doğal)", arar: ["Potasyum Tablet", "Potassium Supplement"] },

 "FAST FOOD KILIÇ": { ad: "Restoran Kahvaltısı / Brunch (Endüstriyel)", kat: "İşlenmiş Ürün Yığını", risk: "yuksek", organlar: ["Kalp", "Pankreas"], etki: "Beraber yenen her şey endüstriyel: jambon + reçel + krem peynir + tost ekmek + endüstriyel zeytin + analog tereyağı.", kaynak: "CSPI Fast Food · Türkiye Beslenme Diyet Derneği", alternatif: "Köy kahvaltısı, yerel pazardan", arar: ["Brunch", "Restoran Kahvaltısı"] },

 "DÖNER MEYDAN": { ad: "Şehir Meydanlarında Açık Dönerciler", kat: "Sokak Yemek", risk: "kritik", organlar: ["Bağırsak", "Bağışıklık"], etki: "Soğuk zincir sorunu + tozlu hava + uzun süre döner + ucuz et karışımı + akşam yağda kızartma.", kaynak: "WHO Food Safety · Türk Tabipler Birliği", alternatif: "Sertifikalı kapalı dönerci, ev yapımı", arar: ["Sokak Döner", "Açık Dönerci"] },

 "VITAMINSIZ MAMA": { ad: "Pet Maması (Ucuz - Aflatoksin Riski)", kat: "Hayvan Maması", risk: "kritik", organlar: ["Karaciğer", "Bağırsak"], etki: "Düşük kalite mamada küflü tahıl + et atığı + boyalar. Türk Veteriner Hekimleri uyarısı.", kaynak: "Türk Veteriner Hekimleri Birliği · FDA Pet Food", alternatif: "Premium mama, doktor tavsiyesi", arar: ["Ucuz Pet Mama", "Köpek Maması"] },

 "BIYOTIN MEGADOZ": { ad: "Biotin Megadoz Tablet (Saç Tırnak)", kat: "Vitamin Takviye", risk: "yuksek", organlar: ["Kan Testleri"], etki: "Yüksek doz biotin laboratuvar testlerini yanıltır (tiroid, kalp testleri). FDA 2017 uyarı.", kaynak: "FDA 2017 Biotin · NIH ODS · Türkiye Eczacılar Birliği", alternatif: "Yumurta sarısı, somon, badem, taze beslenme", arar: ["Biotin", "Biyotin Tablet"] },
 "GLUTAMIN TOZ": { ad: "L-Glutamin Tozu (Sentetik Megadoz)", kat: "Aminoasit Takviye", risk: "orta", organlar: ["Böbrek"], etki: "Megadoz böbrek baskısı. Sağlıklı kişilere yarar belirsiz. Sporcu pazarlama.", kaynak: "Cochrane Glutamine · NIH ODS", alternatif: "Et, balık, yumurta, peynir (doğal)", arar: ["L-Glutamin", "Glutamine Powder"] },
 "KREATIN TOZ": { ad: "Kreatin Tozu (Mikronize)", kat: "Spor Takviye", risk: "orta", organlar: ["Böbrek"], etki: "Genelde güvenli. Ancak ucuz markaların kalitesizliği + böbrek baskısı + su tutma. Doktor kontrolünde.", kaynak: "JISSN Kreatin · NIH ODS · ACSM", alternatif: "Kırmızı et, balık (doğal kreatin)", arar: ["Kreatin", "Creatine Monohydrate"] },

 "ARGININE TAKVIYE": { ad: "L-Arginin Tablet (Kalp Hastalarına Yasak)", kat: "Aminoasit Takviye", risk: "yuksek", organlar: ["Kalp"], etki: "Kalp krizi sonrası hastalarda ölüm riskini artırdı (NHLBI 2006 çalışması durduruldu). Doktor şart.", kaynak: "JAMA 2006 NHLBI Arginin · NIH ODS · Türkiye Eczacılar Birliği", alternatif: "Doktor kontrolünde, doğal beslenme", arar: ["L-Arginin", "Arginine"] },

 "EKMEKLI YEMEK": { ad: "Ekmekçi (Beyaz Ekmek Müptelası)", kat: "Tahıl Aşırı Tüketim", risk: "yuksek", organlar: ["Pankreas", "Bağırsak"], etki: "Türkiye'de günlük 4-5 dilim beyaz ekmek tüketimi. Diyabet, obezite, çölyak duyarlılığı.", kaynak: "Türkiye Beslenme Diyet Derneği · TBSA 2010 · WHO", alternatif: "Tam buğday, az miktar", arar: ["Beyaz Ekmek Aşırı", "Ekmek Tüketimi"] },

 "PROBIYOTIK GUMMY": { ad: "Probiyotik Sakız (Hap Yerine - Şeker)", kat: "Şekerli Takviye", risk: "yuksek", organlar: ["Pankreas", "Diş"], etki: "Probiyotik (genelde ölü) + şeker + jelatin + renk + aroma. Diş çürüğü kaynağı.", kaynak: "JAMA Probiyotik · Türk Diş Hekimleri", alternatif: "Ev kefiri, lahana turşusu, kombuça", arar: ["Probiyotik Sakız", "Probiotic Gummy"] },

 "ENERJI ŞOT": { ad: "Enerji Şot İçecekleri (5-Hour Energy)", kat: "Stimülan Takviye", risk: "kritik", organlar: ["Kalp", "Karaciğer", "Sinir"], etki: "Megadoz kafein + B vitamini + sentetik aroma. FDA ölüm vakaları raporladı (2012-2015).", kaynak: "FDA 5-Hour Energy · NEJM Energy Drinks · Türk Tabipler Birliği", alternatif: "Kaliteli uyku, sade kahve", arar: ["Energy Shot", "5 Hour Energy"] },

 "ŞAMPUAN PARABEN": { ad: "Endüstriyel Şampuan (SLS + Paraben + Parfüm)", kat: "Kişisel Bakım", risk: "yuksek", organlar: ["Cilt", "Hormon"], etki: "Sodyum lauril sülfat + paraben + 100+ parfüm kimyasalı + ftalat. Pantene, Head&Shoulders, L'Oreal.", kaynak: "EWG Skin Deep · ANSES · BEUC", alternatif: "Doğal şampuan, kastil sabun, sürfaktansız", arar: ["Şampuan", "Endüstriyel Şampuan"] },
 "SAÇ BOYASI PPD": { ad: "Saç Boyası (PPD + Amonyak + Resorsinol)", kat: "Kozmetik", risk: "kritik", organlar: ["Cilt", "Bağışıklık", "Kanser"], etki: "P-fenilendiamin (PPD) IARC Grup 3, ama ciddi alerjik reaksiyonlar + ölümler. AB sınırladı.", kaynak: "AB Reg 1223/2009 · EWG Skin Deep · ANSES", alternatif: "Bitkisel saç boyası, kına", arar: ["Saç Boyası", "Hair Dye"] },

 "MASCARA RIMEL PARABEN": { ad: "Endüstriyel Rimel / Mascara (Paraben + Talk)", kat: "Kozmetik", risk: "yuksek", organlar: ["Göz", "Hormon"], etki: "Paraben + talk (asbest riski) + alüminyum + ftalat + isothiazolinone. Maybelline, L'Oreal.", kaynak: "EWG Skin Deep · IARC Talk · ANSES", alternatif: "Mineral makyaj, sertifikalı organik", arar: ["Mascara", "Rimel"] },

 "PARFÜM SENTETIK": { ad: "Endüstriyel Parfüm (Ftalat + Sentetik Misk)", kat: "Kişisel Koku", risk: "yuksek", organlar: ["Hormon", "Solunum", "Cilt"], etki: "100+ kimyasal 'parfüm' altında saklı. Ftalat hormon bozucu, sentetik misk birikim. Calvin Klein, Chanel.", kaynak: "EWG Parfüm · ANSES · IARC Ftalat", alternatif: "Saf esansiyel yağ, doğal koku", arar: ["Parfüm", "Eau de Toilette", "Cologne"] },

 "SUCUK ENDÜSTRI APIKOĞLU": { ad: "Marka Sucuk (Apikoğlu, Polonez, Pinar)", kat: "İşlenmiş Et", risk: "kritik", organlar: ["Mide", "Kolon", "Kalp"], etki: "Nitrit + nitrat + MSG + fosfat + sodyum. IARC Grup 1 işlenmiş et. Kolon kanseri %18 risk artışı.", kaynak: "IARC Vol 114 · WHO 2015 · Türk Tabipler Birliği · TKHK", alternatif: "Geleneksel kuru sucuk (nitritsiz, sertifikalı)", arar: ["Apikoğlu Sucuk", "Polonez Sucuk", "Marka Sucuk"] },
 "PASTIRMA MARKA": { ad: "Hazır Marka Pastırma (Polonez, Apikoğlu)", kat: "İşlenmiş Et", risk: "kritik", organlar: ["Mide", "Kolon"], etki: "Geleneksel ev kuru pastırması yerine nitrit + fosfat + tuz + hızlı kürleme. WHO Grup 1.", kaynak: "IARC Vol 114 · WHO · TGK · Tarım Bakanlığı Hile", alternatif: "Kayseri/Kastamonu geleneksel pastırma (sertifikalı CI)", arar: ["Polonez Pastırma", "Marka Pastırma"] },
 "SALAM MARKA": { ad: "Marka Salam (Pinar, Maret, Banvit, Polonez)", kat: "İşlenmiş Et", risk: "kritik", organlar: ["Mide", "Kolon"], etki: "Mekanik ayrılmış et + soya + nitrit + fosfat + nişasta + boyalar. IARC Grup 1.", kaynak: "IARC Vol 114 · WHO 2015 · Türkiye Beslenme Diyet Derneği · TKHK", alternatif: "Taze dilim et (ev kavurması)", arar: ["Pinar Salam", "Maret Salam", "Banvit Salam"] },
 "JAMBON DILIM PINAR": { ad: "Marka Jambon Dilim (Pinar, Maret)", kat: "İşlenmiş Et", risk: "kritik", organlar: ["Mide", "Kolon", "Akciğer"], etki: "Hindi/tavuk + nitrit + fosfat + tuz + dekstroz + soya proteini + karra + yapay tütsü aroması.", kaynak: "IARC Vol 114 · WHO · CSPI Lunch Meat · TÜTEDER", alternatif: "Taze hindi göğsü (ev pişirme)", arar: ["Pinar Jambon", "Maret Jambon", "Dilim Hindi"] },
 "FÜME ET ENDÜSTRI": { ad: "Endüstriyel Füme Et (PAH + Nitrit Yan Yana)", kat: "İşlenmiş Et", risk: "kritik", organlar: ["Kanser", "Mide", "Akciğer"], etki: "Yapay tütsü PAH (IARC Grup 2A) + nitrit (Grup 2A). Çift kanserojen. Tarihsel günlerden kalan teknik.", kaynak: "IARC Vol 92 PAH · IARC Vol 114 · WHO", alternatif: "Taze et, ev tütsü (sertifikalı)", arar: ["Füme Et", "Smoked Meat"] },
 "KARABIBER DOLGU": { ad: "Karabiber + Papaya Tohum Karışımı (Hile)", kat: "Sahte Baharat", risk: "yuksek", organlar: ["Karaciğer", "Üreme"], etki: "Türkiye'de yaygın hile: pahalı karabibere papaya tohumu (alkaloid içerir) karıştırılır.", kaynak: "TGK · Tarım Bakanlığı Hile · TKHK", alternatif: "Bütün karabiber tanesi (evde öğüt)", arar: ["Karabiber Toz", "Papaya Tohum Karışım"] },
 "PUL BIBER SUDAN": { ad: "Pul Biber (Sudan Boyası ile Renklendirilmiş)", kat: "Sahte Baharat", risk: "kritik", organlar: ["Karaciğer", "Kanser"], etki: "Türkiye'de yaygın yasadışı hile: parlak kırmızı için Sudan I/II/III boyası eklenir. IARC kanserojen şüphesi.", kaynak: "EFSA 2003 Sudan · AB Direktifi · IARC · Tarım Bakanlığı Hile", alternatif: "Köy üretimi pul biber (Maraş, Antep CI)", arar: ["Pul Biber", "Kırmızı Biber Hilesi"] },
 "ZERDEÇAL HINDISTAN": { ad: "İthal Zerdeçal (Kurşun Kromat Boyalı)", kat: "Ağır Metal Boyası", risk: "kritik", organlar: ["Beyin", "Kemik", "Böbrek"], etki: "Hindistan/Bangladeş zerdeçallarında kurşun kromat sıkça bulunur. Çocuk IQ düşüşü ölümcül.", kaynak: "Stanford 2019 · Consumer Reports · IARC Kurşun Grup 1", alternatif: "Yerli Türk zerdeçalı (sertifikalı laboratuvar testli)", arar: ["İthal Zerdeçal", "Hindistan Zerdeçal"] },
 "TARÇIN SEYLAN SAHTE": { ad: "Sahte Seylan Tarçını (Cassia Karışımı)", kat: "Sahte Premium", risk: "yuksek", organlar: ["Karaciğer", "Pıhtılaşma"], etki: "Pahalı Seylan tarçını yerine ucuz Cassia satılır. Kumarin 1000x yüksek, karaciğer hasarı.", kaynak: "EFSA Kumarin · BfR Almanya · CSPI · Tarım Bakanlığı", alternatif: "Sertifikalı Seylan tarçını (Cinnamomum verum)", arar: ["Seylan Tarçını", "Cinnamon Verum"] },
 "GREENPEACE PFASKETÇAP": { ad: "Mum İyot Tuz (E170, E536) — Topaklayıcı + Boya", kat: "Karışım Tuz", risk: "orta", organlar: ["Bağırsak"], etki: "Endüstriyel tuzlara yapay iyot + ferrosiyanür (E536) + alüminosilikat (E554) eklenir. Doğal değil.", kaynak: "EFSA · WHO İyot · Türkiye Beslenme Diyet Derneği", alternatif: "Çankırı kaya tuzu, Himalaya, deniz tuzu", arar: ["İyotlu Tuz", "Sofra Tuzu"] },

 "TEMIZLIK BUlAŞIK DETERJAN": { ad: "Endüstriyel Bulaşık Deterjanı (Fosfat + Parfüm)", kat: "Temizlik Kimyasalı", risk: "yuksek", organlar: ["Cilt", "Solunum", "Bağırsak"], etki: "Fosfat + sürfaktan + parfüm + boyalar. Bulaşıkta artakalır. Fairy, Pril, Bingo.", kaynak: "EWG Cleaning · ECHA · BEUC", alternatif: "Doğal sabun + sirke + karbonat", arar: ["Bulaşık Deterjanı", "Fairy", "Pril"] },
 "YUMUŞATICI": { ad: "Çamaşır Yumuşatıcısı (Quaternium-15, Parfüm)", kat: "Temizlik Kimyasalı", risk: "yuksek", organlar: ["Solunum", "Cilt", "Hormon"], etki: "Formaldehit (Quaternium-15) + benzil asetat + 1,4-dioksan. Tekstilde kalır, cilde geçer.", kaynak: "EWG · IARC Formaldehit · ANSES", alternatif: "Beyaz sirke, doğal yumuşatıcı yerine", arar: ["Yumuşatıcı", "Çamaşır Yumuşatıcı"] },
 "ÇAMAŞIR DETERJAN": { ad: "Endüstriyel Çamaşır Deterjanı (Optic Brightener)", kat: "Temizlik Kimyasalı", risk: "yuksek", organlar: ["Cilt", "Hormon"], etki: "Optik beyazlatıcı (UV) + paraben + parfüm + enzim. Tekstilde kalır, cilde sızar. Persil, Ariel, Omo.", kaynak: "EWG · ECHA · BEUC", alternatif: "Sabun bazlı deterjan, ev yapımı (karbonat + sabun)", arar: ["Çamaşır Deterjanı", "Persil", "Ariel", "Omo"] },

 "PLASTIK BARDAK SICAK": { ad: "Tek Kullanımlık Plastik Bardak (Sıcak İçecek)", kat: "Plastik Ambalaj", risk: "yuksek", organlar: ["Hormon", "Bağırsak"], etki: "Sıcakta mikroplastik salar. PFAS astar (gel-git önleyici). Çay/kahve fast food.", kaynak: "Environ Sci Technol 2020 Cup · IARC PFOA · EWG", alternatif: "Cam fincan, çelik termos, porselen", arar: ["Plastik Bardak", "Tek Kullanımlık Bardak"] },
 "STIROPOR YEMEK KABI": { ad: "Stiropor (Polistiren) Yemek Kabı", kat: "Plastik Ambalaj", risk: "kritik", organlar: ["Hormon", "Kanser"], etki: "Stiren IARC Grup 2A muhtemel kanserojen. Sıcak yağlı yiyecek geçişi. McDonald's 1990'da çıkardı.", kaynak: "IARC Vol 121 Stiren · NTP 14th Report · EPA · BEUC", alternatif: "Cam kap, paslanmaz çelik, seramik", arar: ["Stiropor", "Köpük Yemek Kabı"] },
 "FOLYO ALÜMINYUM": { ad: "Alüminyum Folyo (Asitli Yemekte Tehlike)", kat: "Metal Ambalaj", risk: "yuksek", organlar: ["Beyin", "Kemik"], etki: "Domates, sirke, limon ile temas yemeğe alüminyum geçer. Alzheimer riskiyle bağlantı.", kaynak: "WHO 2017 Alüminyum · EFSA · Lancet Mold", alternatif: "Cam kap, fırın kağıdı (PFAS-free), seramik", arar: ["Alüminyum Folyo"] },

 "RESTORAN YAGI ESKİ": { ad: "Restoran Tekrar Kullanılmış Kızartma Yağı", kat: "Oksitlenmiş Yağ", risk: "kritik", organlar: ["Kalp", "Kanser", "Karaciğer"], etki: "Defalarca kullanılan yağ akrilamid + aldehit + serbest radikal yüklü. WHO uyarısı.", kaynak: "WHO Acrylamide · IARC · CSPI · Türk Tabipler Birliği", alternatif: "Evde taze yağ, fırın/buhar pişirme", arar: ["Eski Kızartma Yağı", "Restoran Yağı"] },

 "DONDURMA PINAR": { ad: "Marka Dondurma (Pinar, Sek, Algida, Mado)", kat: "Endüstriyel Dondurma", risk: "yuksek", organlar: ["Bağırsak", "Kalp"], etki: "%50 hava + bitkisel yağ + mono-digliserit (trans yağ) + polisorbat + karra + sentetik aroma.", kaynak: "Nature 2015 Chassaing · CSPI · TGK · Türkiye Beslenme Diyet Derneği", alternatif: "Geleneksel Maraş dondurması, ev yapımı", arar: ["Pinar Dondurma", "Sek Dondurma", "Mado Dondurma"] },
 "DONDURMA PALMIYE": { ad: "Yağ İçerikli Dondurma (Palmiye + Kremalı)", kat: "Sahte Süt Dondurması", risk: "yuksek", organlar: ["Kalp", "Karaciğer"], etki: "Süt yağı yerine palmiye yağı + emülgatör + süt tozu + nişasta. 'Süt' dondurma değil.", kaynak: "Greenpeace Palm Oil · CSPI · TGK", alternatif: "Saf süt kremalı dondurma", arar: ["Bitkisel Yağlı Dondurma", "Palmiyeli Dondurma"] },
 "DONDURMA RENKLI": { ad: "Renkli Çocuk Dondurması (Tüm Boyalar)", kat: "Ultra İşlenmiş Dondurma", risk: "kritik", organlar: ["Sinir Sistemi", "Bağırsak"], etki: "E102, E110, E122, E129, E133 hepsi bir arada. Çocuk hiperaktivite paketi.", kaynak: "Southampton 2007 · CSPI · Türk Pediatri Kurumu", alternatif: "Sade beyaz dondurma, taze meyve dondurması", arar: ["Renkli Dondurma", "Çocuk Dondurması"] },

 "YOĞURT MEYVELI ŞEKERLI": { ad: "Şekerli Meyveli Yoğurt (Pinar Bambino, Sütaş Çocuk)", kat: "Sahte Sağlıklı Yoğurt", risk: "kritik", organlar: ["Pankreas", "Diş"], etki: "100g'da 12-18g şeker (4 küp). Aroma + renk + karra + jelatin. Çocuk hedefli pazarlama.", kaynak: "WHO Şeker · CSPI · Türk Pediatri", alternatif: "Sade yoğurt + taze meyve", arar: ["Meyveli Yoğurt", "Pinar Bambino"] },
 "DONDURMA MAGNUM": { ad: "Çikolata Kaplı Dondurma (Magnum, Cornetto)", kat: "Ultra İşlenmiş", risk: "kritik", organlar: ["Pankreas", "Kalp"], etki: "Şeker + palmiye + kakao kompound + emülgatör + parlatıcı. 1 stand 40g+ şeker.", kaynak: "WHO · CSPI · TGK", alternatif: "Sade dondurma, bitter çikolata", arar: ["Magnum", "Çikolata Kaplı Dondurma"] },

 "EŞREF ATIŞTIRMA": { ad: "Atıştırmalık Şehriye (Tuz + Yağ + Baharat)", kat: "İşlenmiş Atıştırmalık", risk: "yuksek", organlar: ["Tansiyon", "Bağırsak"], etki: "Buğday + palmiye + tuz + MSG + sentetik aroma. Cipsten farkı yok.", kaynak: "WHO Sodium · CSPI", alternatif: "Çiğ kuruyemiş, sade nohut", arar: ["Atıştırmalık Şehriye", "Cracker Mix"] },

 "BOYALI ŞEKER TOZU": { ad: "Pamuk Şeker (Şeker + Renklendirici)", kat: "İşlenmiş Şekerleme", risk: "yuksek", organlar: ["Pankreas", "Sinir Sistemi"], etki: "Saf şeker + Allura Red (E129) + tartrazin (E102). Sokak, lunaparkta.", kaynak: "Southampton 2007 · CSPI · WHO Şeker", alternatif: "Doğal şeker, az miktar bal", arar: ["Pamuk Şeker", "Cotton Candy"] },
 "NOUGAT MARKA": { ad: "Nuga / Nougat (Bal + Yumurta Akı + HFCS)", kat: "İşlenmiş Şekerleme", risk: "yuksek", organlar: ["Pankreas"], etki: "Geleneksel nuga yerine glikoz şurubu + yumurta tozu + emülgatör. Toblerone, Snickers ortası.", kaynak: "CSPI · WHO Şeker", alternatif: "Geleneksel İspanyol/İtalyan nuga", arar: ["Nuga", "Nougat"] },

 "EVCIL TAVUK YEM": { ad: "Tavuk Yemi (GDO Mısır + Soya + Antibiyotik)", kat: "Hayvan Yemi", risk: "kritik", organlar: ["Hayvan Sağlığı", "Antibiyotik Direnci"], etki: "GDO mısır + GDO soya + glifosat + antibiyotik. Yumurta ve etle insana geçer.", kaynak: "EWG GMO · IARC Glifosat · WHO AMR · Greenpeace", alternatif: "Organik tavuk yemi, köy tarzı", arar: ["Tavuk Yemi", "Hayvan Yemi"] },

 "POLEN BAL HILE": { ad: "Eklemeli Polen Tabletleri (Şeker Karışım)", kat: "Sahte Doğal Takviye", risk: "orta", organlar: ["Bağışıklık"], etki: "Polen + şeker + ucuz bal + maltodekstrin karışımı. Saf polen değil.", kaynak: "TGK Bal/Polen · Tarım Bakanlığı Hile", alternatif: "Yerel arıcı, saf polen", arar: ["Polen Tablet", "Eklemeli Polen"] },
 "ARI SÜTÜ KARIŞIK": { ad: "Karışık Arı Sütü Kapsülü (Saf Değil)", kat: "Sahte Doğal Takviye", risk: "orta", organlar: ["Bağışıklık"], etki: "Saf arı sütü çok pahalı. Piyasada satılan kapsüllerin çoğu karışık + nişasta + dolgu.", kaynak: "TGK · Tarım Bakanlığı · Türkiye Eczacılar Birliği", alternatif: "Yerel arıcıdan saf arı sütü", arar: ["Arı Sütü", "Royal Jelly"] },
 "PROPOLIS DAMLALIK": { ad: "Propolis Damlaları (Alkol + Sentetik Aroma)", kat: "Bitkisel Takviye", risk: "orta", organlar: ["Karaciğer"], etki: "Saf propolis nadir. Çoğu üründe alkol + sentetik aroma + dolgu. Çocuğa alkol içeren ürün riski.", kaynak: "Türkiye Eczacılar Birliği · TGK · NIH NCCIH", alternatif: "Sertifikalı saf propolis (su bazlı)", arar: ["Propolis", "Propolis Damla"] },

 "ZENCEFIL HAZIR": { ad: "Aromalı Zencefil Limonlu Çay (Şeker Yüklü)", kat: "İşlenmiş İçecek", risk: "yuksek", organlar: ["Pankreas"], etki: "Gerçek zencefil %2, geri kalan şeker + sitrik asit + aroma + sukraloz. 'Sağlık' yalanı.", kaynak: "CSPI · WHO · Türkiye Beslenme Diyet", alternatif: "Taze zencefil + limon + bal (ev)", arar: ["Zencefil Çayı", "Zencefil Limon"] },
 "BITKI ÇAYI POŞET": { ad: "Plastik Poşetli Bitki Çayları (Mikroplastik)", kat: "Mikroplastik Sızıntı", risk: "yuksek", organlar: ["Bağırsak", "Hormon"], etki: "Plastik (PET, naylon) poşet çaylar kaynar suda milyarlarca mikroplastik salar. McGill 2019.", kaynak: "Environ Sci Technol 2019 · WHO · Greenpeace", alternatif: "Kuru bitki yaprakları (toplu, demlik)", arar: ["Plastik Poşet Çay", "Pyramid Bitki Çayı"] },

 "TUZ EKLEMEYI ARTIRAN": { ad: "Aşırı Tuz Tüketimi (Türkiye Ortalaması: 18g/gün)", kat: "Sodyum Aşımı", risk: "kritik", organlar: ["Tansiyon", "Kalp", "Böbrek"], etki: "WHO max 5g/gün öneriyor. Türk Tabipler Birliği: kalp-damar ölümleri %30 sebebi tuz aşımı.", kaynak: "Türk Tabipler Birliği Tuz · WHO Sodium · TBSA Tuz", alternatif: "Az tuz, taze otlar, baharat", arar: ["Tuz", "Aşırı Tuz"] },
 "ŞEKER GIZLI": { ad: "Gizlenmiş Şeker (Tüm İşlenmiş Gıdalar)", kat: "Şeker Aşımı", risk: "kritik", organlar: ["Pankreas", "Karaciğer", "Beyin"], etki: "Türkiye ortalama günlük 100g şeker tüketimi (WHO sınır 25g). Yarısı 'fark etmeden' işlenmiş ürünlerden.", kaynak: "WHO Şeker 2015 · Türkiye Beslenme Diyet · Türk Diş Hekimleri", alternatif: "Etiket oku, doğal şeker, taze meyve", arar: ["Eklenmiş Şeker", "Hidden Sugar"] },

 "RECEL HAZIR KAVANOZ": { ad: "Hazır Reçel Kavanoz (Tamek, Tamektamek)", kat: "İşlenmiş Reçel", risk: "yuksek", organlar: ["Pankreas", "Diş"], etki: "%60 şeker (HFCS) + meyve %30 + pektin + sitrik asit + sodyum benzoat (kanserojen N-nitroso oluşturur).", kaynak: "FDA Benzoat · WHO Şeker · TGK", alternatif: "Ev reçeli (az şekerli), taze meyve", arar: ["Hazır Reçel", "Tamek Reçel"] },
 "MARMELAT ENDÜSTRI": { ad: "Endüstriyel Marmelat (Portakal, Mandalina)", kat: "İşlenmiş Reçel", risk: "yuksek", organlar: ["Pankreas"], etki: "Meyve %25 + HFCS + sitrik asit + pektin + benzoat + tartrazin (E102 - sarı 5).", kaynak: "Southampton 2007 · CSPI · TGK", alternatif: "Ev marmelat, taze meyve", arar: ["Marmelat", "Orange Marmalade"] },

 "MISIR PATLAĞI MARKET": { ad: "Hazır Patlamış Mısır (Eti, Lay's)", kat: "İşlenmiş Atıştırmalık", risk: "kritik", organlar: ["Akciğer", "Kalp", "Hormon"], etki: "Palmiye yağı + tuz + diasetil (popcorn akciğeri) + sentetik tereyağ aroması + PFAS astar.", kaynak: "NIOSH Diasetil · IARC PFOA · EWG", alternatif: "Tencerede patlamış mısır + tereyağı + tuz", arar: ["Hazır Patlamış Mısır", "Endüstriyel Popcorn"] },

 "ÇİĞ BAL BAKTERI": { ad: "Çiğ Süzülmemiş Bal (Botulizm - Bebekte)", kat: "Doğal Bal Riski", risk: "yuksek", organlar: ["Sinir Sistemi (Bebek)"], etki: "Çiğ bal Clostridium botulinum sporu içerebilir. 1 yaş altı bebekte ölümcül. Yetişkin için güvenli.", kaynak: "WHO Bebek Bal · AAP · Türk Pediatri", alternatif: "1 yaş altına bal verilmez", arar: ["Çiğ Bal Bebek", "Süzülmemiş Bal"] },

 "GREENPEACE SOYA": { ad: "Türk Üretim GDO Soya Türevleri", kat: "GDO İçerik", risk: "yuksek", organlar: ["Hormon", "Bağırsak"], etki: "Türkiye gıdada GDO yasak (2010) ama yemde izinli. Hayvan ürünleri üzerinden geçiş + ithal işlenmiş soya türevleri.", kaynak: "Türkiye Biyogüvenlik 2010 · Greenpeace Türkiye · TKHK", alternatif: "GDO-free etiketli, organik soya", arar: ["GDO Soya", "Soya Lesitin Türev"] },

 "ATIŞTIRMA DOMATES KURUTULMUŞ": { ad: "Endüstriyel Kuru Domates (Sülfit Korumalı)", kat: "İşlenmiş Sebze", risk: "orta", organlar: ["Solunum"], etki: "Sülfit ile parlak kırmızı korunur (E220). Yağda saklama için fazla tuz + koruyucu.", kaynak: "EFSA Sülfit · CSPI", alternatif: "Doğal güneş kurutulmuş domates", arar: ["Kuru Domates", "Sun-dried Tomato"] },

 "DERI BAKIM KREMI": { ad: "Endüstriyel Yüz Kremi (Paraben + Mineral Yağ + Parfüm)", kat: "Kozmetik", risk: "yuksek", organlar: ["Cilt", "Hormon"], etki: "Mineral yağ (petrol) + paraben + ftalat + parfüm + sentetik renk. Nivea, L'Oreal, Garnier.", kaynak: "EWG Skin Deep · ANSES · BEUC", alternatif: "Saf hindistan cevizi/argan yağı, doğal krem", arar: ["Yüz Kremi", "Face Cream"] },
 "GÜNEŞ KREMI OXYBENZONE": { ad: "Güneş Kremi (Oxybenzone, Octinoxate)", kat: "Kozmetik", risk: "kritik", organlar: ["Hormon", "Mercan Resifleri"], etki: "Oxybenzone hormon bozucu, alerjik. Hawaii 2021 yasakladı. AB sınırladı. EWG uyarısı.", kaynak: "EWG Sunscreen · Hawaii Bill SB2571 · ANSES", alternatif: "Mineral güneş kremi (çinko, titanyum oksit)", arar: ["Güneş Kremi", "Oxybenzone", "Sunscreen"] },
 "RUJ KURŞUN": { ad: "Endüstriyel Ruj (Kurşun + Boya Kalıntısı)", kat: "Kozmetik", risk: "yuksek", organlar: ["Beyin", "Kemik"], etki: "FDA 2010 testi: 400 rujta kurşun tespit. Kırmızı rujlarda yüksek. AB sınır koydu.", kaynak: "FDA 2010 Lipstick Lead · EWG · BEUC", alternatif: "Sertifikalı organik ruj, mineral makyaj", arar: ["Ruj", "Lipstick"] },
 "OJE FORMALDEHIT": { ad: "Klasik Oje (Formaldehit + Toluen + DBP - 'Toxic Trio')", kat: "Kozmetik Kimyasalı", risk: "kritik", organlar: ["Hormon", "Üreme", "Solunum"], etki: "Hormon bozucu, hamilelikte tehlikeli. Çoğu modern marka çıkardı ama ucuz markalar devam.", kaynak: "EWG Nail Polish · ANSES · BEUC", alternatif: "3-free / 5-free / 10-free etiketli oje, kına", arar: ["Oje", "Nail Polish", "Formaldehit Ojesi"] },
 "ASETON OJE ÇIKARICI": { ad: "Aseton (Tırnak Yapısı Bozucu)", kat: "Kozmetik Kimyasalı", risk: "yuksek", organlar: ["Tırnak", "Solunum", "Cilt"], etki: "Aseton + sentetik aroma + boya. Tırnak yapısını bozar, kuruluk. Astım tetikleyebilir.", kaynak: "EWG · ANSES", alternatif: "Asetonsuz oje çıkarıcı (etil asetat bazlı)", arar: ["Aseton", "Oje Çıkarıcı"] },

 "ŞOK ŞOKTA HAZIR": { ad: "Sokakta Açık Pizza/Tost Dilimleri", kat: "Sokak Yemek", risk: "yuksek", organlar: ["Bağırsak", "Bağışıklık"], etki: "Açıkta saatlerce bekleyen pizza/tostlar bakteri üretir + soğuk zincir yok + tozlu hava.", kaynak: "WHO Food Safety · Türk Tabipler Birliği", alternatif: "Kapalı temiz restoran, ev pişirme", arar: ["Açık Tost", "Sokak Pizza"] },

 "BURUN SPREY ALKOL": { ad: "Burun Sprey Çözeltileri (Aşırı Kullanım)", kat: "Eczane Ürünü", risk: "yuksek", organlar: ["Burun", "Sinüs"], etki: "Oxymetazoline + benzalkonium klorür + paraben. Uzun kullanım 'rebound rinit'. Doktor tavsiyesi şart.", kaynak: "Türkiye Eczacılar Birliği · NIH · Mayo Clinic", alternatif: "Tuzlu su, deniz suyu spreyi, buhar", arar: ["Burun Spreyi", "Nasal Spray"] },
 "GÖZ DAMLASI BENZALKONIUM": { ad: "Endüstriyel Göz Damlası (Benzalkonium Klorür)", kat: "Eczane Ürünü", risk: "yuksek", organlar: ["Göz"], etki: "Koruyucu olarak benzalkonium klorür kornea epiteline zarar verir. Uzun kullanım kuru göz.", kaynak: "Türk Oftalmoloji Derneği · NIH · Türkiye Eczacılar Birliği", alternatif: "Koruyucusuz tek doz göz damlası, suni gözyaşı", arar: ["Göz Damlası", "Eye Drops"] },

 "BEBEK PUDRA TALK": { ad: "Bebek Pudrası (Talk - Asbest Riski)", kat: "Bebek Kozmetik", risk: "kritik", organlar: ["Akciğer", "Üreme"], etki: "Talk asbest içerebilir. Johnson&Johnson 2020'de talk bazlı pudra üretimini durdurdu (mahkeme kararıyla).", kaynak: "IARC Talk · NTP · J&J Mahkemeler 2020 · BEUC", alternatif: "Talksiz nişasta bazlı pudra, mısır nişastası", arar: ["Bebek Pudrası", "Talk Pudra"] },
 "BEBEK ŞAMPUAN PARABEN": { ad: "Endüstriyel Bebek Şampuanı (SLS + Paraben)", kat: "Bebek Kozmetik", risk: "yuksek", organlar: ["Cilt", "Göz", "Hormon"], etki: "Sodyum lauril sülfat + paraben + formaldehit (Quaternium-15) + parfüm. Bebek için çok ağır.", kaynak: "EWG Skin Deep · ANSES · Türk Pediatri", alternatif: "Saf bebek sabunu, kastil, organik", arar: ["Bebek Şampuanı", "Baby Shampoo"] },

 "STARBUCKS KAFE": { ad: "Starbucks Aromalı Kahveler (Sentetik Aroma + Şeker)", kat: "Cafe Zincir", risk: "kritik", organlar: ["Pankreas", "Karaciğer"], etki: "Caramel Macchiato, Pumpkin Spice gibi içeceklerde 60g+ şeker + sentetik aroma + propilen glikol.", kaynak: "CSPI Starbucks · WHO · BEUC", alternatif: "Sade espresso, Türk kahvesi", arar: ["Starbucks", "Caramel Macchiato", "Pumpkin Spice"] },
 "GLORIA JEANS KAHVE": { ad: "Gloria Jeans / Caribou / Kahve Dünyası Aromalı", kat: "Cafe Zincir", risk: "yuksek", organlar: ["Pankreas"], etki: "Aroma sirupları (propilen glikol + sentetik vanilin) + şeker bombası + hidrojenize krema.", kaynak: "CSPI · WHO Şeker", alternatif: "Sade kahve, ev demli", arar: ["Gloria Jeans", "Caribou", "Kahve Dünyası"] },
 "DOMINO PIZZA": { ad: "Zincir Pizza (Domino's, Pizza Hut, Little Caesars)", kat: "Ultra İşlenmiş", risk: "kritik", organlar: ["Kalp", "Tansiyon", "Pankreas"], etki: "Brom unu + analog peynir + işlenmiş et + palmiye + 3g+ tuz/dilim. Tek dilim WHO sodyum limiti.", kaynak: "WHO Sodium · CSPI · BMJ UPF · TÜTEDER", alternatif: "Geleneksel taş fırın, ev pizzası", arar: ["Domino's", "Pizza Hut", "Little Caesars"] },
 "ARBYS BURGER KING": { ad: "Burger King / McDonald's Tavuk Sandviç", kat: "Fast Food", risk: "kritik", organlar: ["Karaciğer", "Bağışıklık"], etki: "Tavuk %50 + dolgu + galeta + soya + fosfat + dimetilpolisiloksan kızartma yağında.", kaynak: "CSPI Fast Food · WHO · BMJ UPF", alternatif: "Ev tavuk sandviç, taze göğüs", arar: ["Burger King Tavuk", "McChicken"] },
 "POPEYE LOUISIANA": { ad: "Popeyes Louisiana Chicken (Kızartma)", kat: "Fast Food", risk: "kritik", organlar: ["Karaciğer", "Kalp"], etki: "Tavuk + soya unu + buğday + TBHQ + MSG + palmiye + sodyum yüklü baharat.", kaynak: "CSPI · WHO · IARC HCA", alternatif: "Fırın tavuk, ev panele", arar: ["Popeyes", "Louisiana Chicken"] },
 "ASCAFE TOST": { ad: "Açıkta Bekleyen Tost / Sandviçler (Cafe)", kat: "Bekleyen Hazır Yemek", risk: "yuksek", organlar: ["Bağırsak", "Bağışıklık"], etki: "Açık vitrinde saatlerce bekleyen tostlar bakteri üretir. Çiğ et + mayonez + analog peynir.", kaynak: "WHO Food Safety · Türk Tabipler Birliği", alternatif: "Anında sipariş, taze yapım", arar: ["Bekleyen Tost", "Açık Tost"] },

 "DURGUN MEYVE SUYU": { ad: "Klasik Üretim Meyve Suyu (Konsantre + Su)", kat: "İşlenmiş Meyve Suyu", risk: "yuksek", organlar: ["Pankreas", "Diş"], etki: "%100 pazarlanır ama konsantre + su + askorbik asit + aroma + boya. Cappy, Dimes, Tropicana.", kaynak: "CSPI Juice · WHO · TGK", alternatif: "Taze sıkılmış, tüm meyve yemek", arar: ["Konsantre Meyve Suyu", "Hazır Meyve Suyu"] },

 "BAHARAT POŞET KARABIBER": { ad: "Karabiber Tozu (Papaya Karışım)", kat: "Sahte Baharat", risk: "yuksek", organlar: ["Karaciğer", "Üreme"], etki: "Türkiye'de yaygın hile. Pahalı karabibere papaya tohumu (alkaloid içerir) karıştırılır.", kaynak: "TGK · Tarım Bakanlığı Hile Raporu · TKHK", alternatif: "Bütün karabiber dane (evde öğüt)", arar: ["Karabiber Tozu", "Karabiber Toz"] },
 "AKDENIZ OT": { ad: "Akdeniz Otları Karışımı (Endüstriyel)", kat: "İşlenmiş Baharat", risk: "orta", organlar: ["Bağırsak"], etki: "Geleneksel ot karışımı yerine ucuz kuru ot + MSG + sodyum + dolgu.", kaynak: "TGK · CSPI", alternatif: "Tek tek taze otlar (kekik, biberiye, fesleğen)", arar: ["Akdeniz Otları", "Mediterranean Herbs"] },

 "DONDURMA AROMALI YULAF": { ad: "Aromalı Vegan Dondurma (Bademli, Yulaflı - Endüstriyel)", kat: "Ultra İşlenmiş Vegan", risk: "yuksek", organlar: ["Pankreas", "Bağırsak"], etki: "%2 badem/yulaf + hindistan cevizi yağı + karra + şeker + sentetik aroma + emülgatör.", kaynak: "BMJ UPF · CSPI · CSPI Plant Based", alternatif: "Donmuş muz + kakao, ev vegan tatlı", arar: ["Vegan Dondurma", "Bitkisel Dondurma"] },
 "ALMOND BREEZE BADEM": { ad: "Almond Breeze Badem Sütü (%2 Badem)", kat: "Sahte Bitkisel Süt", risk: "yuksek", organlar: ["Bağırsak"], etki: "Sadece %2 badem, %98 su + karagenan + emülgatör + tatlandırıcı + sentetik vitamin.", kaynak: "CSPI Almond Milk · BMJ UPF", alternatif: "Ev badem sütü (taze ıslak badem)", arar: ["Almond Breeze", "Badem Sütü Hazır"] },

 "PRINGLES KAVANOZ": { ad: "Pringles (Patates Tozu + Buğday + Pirinç Unu)", kat: "Sahte Patates Cipsi", risk: "yuksek", organlar: ["Kalp", "Bağırsak"], etki: "%42 patates tozu + nişasta + un + palmiye + MSG. UK mahkemesi 'cips değil' kararı verdi (2009).", kaynak: "UK Tax Tribunal 2009 · CSPI Pringles", alternatif: "Ev patates dilimi, sade pul biber", arar: ["Pringles", "Tube Chips"] },

 "KAĞIT BARDAK KAHVE TAKEAWAY": { ad: "Take-Away Kağıt Bardak (PE Astar - Mikroplastik)", kat: "Plastik Astar", risk: "yuksek", organlar: ["Bağırsak", "Hormon"], etki: "Kağıt bardağın iç yüzü PE (polietilen). Sıcak kahvede mikroplastik ve PFAS salar.", kaynak: "Environ Sci Technol 2020 · IARC PFOA · EWG", alternatif: "Cam fincan, çelik termos", arar: ["Kağıt Bardak", "Take-Away Bardak"] },

 "SOSYAL ŞEKER LIMONATA": { ad: "Restoran Limonata (Açık Şeker Yüklü)", kat: "Şekerli İçecek", risk: "yuksek", organlar: ["Pankreas", "Diş"], etki: "Restoranlar limonatayı tatlı yapmak için çok şeker kullanır. Tek bardakta 8-10 küp şeker.", kaynak: "WHO Şeker · CSPI · Türk Diş Hekimleri", alternatif: "Şekersiz limonata, sade limon-su", arar: ["Restoran Limonata", "Hazır Limonata Cafe"] },

 "EVCIL KEDI MAMA": { ad: "Endüstriyel Kedi Maması (Mısır + Soya Dolgu)", kat: "Hayvan Maması", risk: "yuksek", organlar: ["Böbrek (Kedi)", "Bağırsak"], etki: "Et %20, geri kalan mısır + buğday + soya + boya + koruyucu. Kediler için doğal değil.", kaynak: "Türk Veteriner Hekimleri Birliği · FDA Pet Food", alternatif: "Premium et bazlı mama, yaş mama", arar: ["Kedi Maması", "Cat Food"] },
 "KEDI HAZIR YAŞ MAMA": { ad: "Konserve Kedi Maması (Aluminyum Kutu + BPA)", kat: "Hayvan Maması", risk: "orta", organlar: ["Hormon (Kedi)"], etki: "Kutu BPA + sodyum + jelatin + boya + sentetik aroma. Çok tüketmek hormon bozucu.", kaynak: "EFSA BPA · Veteriner Birliği", alternatif: "Cam kavanozda mama, taze pişmiş", arar: ["Konserve Kedi Maması", "Yaş Mama"] },

 "FAJITA MEKSIKA SOS": { ad: "Hazır Fajita / Taco Karışım Paketi", kat: "İşlenmiş Toz", risk: "yuksek", organlar: ["Tansiyon", "Sinir Sistemi"], etki: "Baharat + MSG + sodyum + nişasta + sentetik aroma. Tek pakette 4-5g sodyum. Old El Paso.", kaynak: "WHO Sodium · CSPI · EFSA MSG", alternatif: "Taze baharat (chili, kimyon, kekik) ev karışım", arar: ["Fajita Karışım", "Taco Seasoning"] },

 "RAKI ENDÜSTRI": { ad: "Türk Rakı (Yeni Rakı, Tekirdağ - Endüstriyel)", kat: "Alkollü İçecek", risk: "yuksek", organlar: ["Karaciğer", "Beyin", "Kanser"], etki: "WHO alkol Grup 1 kanserojen. Yeni rakı aroma katkı + karamel + şeker. Geleneksel rakı daha doğal.", kaynak: "WHO 2023 Alkol · IARC · TGK Rakı", alternatif: "Geleneksel ev rakısı, alkolsüz", arar: ["Yeni Rakı", "Tekirdağ Rakısı", "Endüstriyel Rakı"] },
 "VOTKA SAHTE 2024": { ad: "Sahte Votka (Metanol - Türkiye Toplu Ölümler)", kat: "Sahte Alkol", risk: "kritik", organlar: ["Göz", "Karaciğer", "Sinir Sistemi"], etki: "Türkiye'de 2020-2024 metanol toplu zehirlenme olayları. Sokakta/internet sahte alkol = ölüm.", kaynak: "Türkiye Sağlık Bakanlığı 2024 Sahte Alkol · WHO · Türk Tabipler Birliği", alternatif: "Markalı vergili alkol, alkolsüz", arar: ["Sahte Votka", "Kaçak Alkol"] },
 "WHISKY SAHTE": { ad: "Sahte Viski (Endüstriyel Aroma)", kat: "Sahte Alkol", risk: "kritik", organlar: ["Karaciğer", "Sinir"], etki: "Gerçek viski 12 yıl olgunlaşır. Sahte: alkol + karamel + sentetik viski aroması. Metanol riski.", kaynak: "Türkiye Sağlık Bakanlığı · WHO", alternatif: "Markalı sertifikalı viski, alkolsüz", arar: ["Sahte Viski", "Kaçak Whisky"] },

 "DETOKS SUYU INSTAGRAM": { ad: "Sosyal Medya 'Detoks Suları' (Aroma + Tatlandırıcı)", kat: "Sahte Sağlık Trend", risk: "yuksek", organlar: ["Karaciğer", "Bağırsak"], etki: "'Detoks' iddiası kanıtsız. Yüksek doz vitamin + tatlandırıcı + aroma. Doktor onaysız tehlikeli.", kaynak: "NIH NCCIH Detox · NEJM · Türkiye Eczacılar Birliği", alternatif: "Su, taze sebze meyve, lif beslenme", arar: ["Detoks Suyu", "Detox Water"] },
 "KILO VERME SUPLE": { ad: "Sosyal Medya Zayıflama Hapları", kat: "Yasadışı Takviye", risk: "kritik", organlar: ["Karaciğer", "Kalp", "Tiroid"], etki: "Yasadışı sibutramin, fenfluramin, sinefrin içerebilir. Türkiye'de zayıflama hap ölümleri var.", kaynak: "FDA Tainted Diet Pills · Türkiye Sağlık Bakanlığı · Türkiye Eczacılar Birliği", alternatif: "Doktor kontrolünde kilo verme, beslenme uzmanı", arar: ["Zayıflama Hapı", "Diet Pills"] },

 "TAVUKLU ASKIYA HAZIR": { ad: "Hazır Tavuklu Kek/Çörek (Endüstriyel)", kat: "Ultra İşlenmiş", risk: "yuksek", organlar: ["Kalp", "Bağırsak"], etki: "Beyaz un + analog peynir + işlenmiş et + palmiye + emülgatör. Cafe zincirleri.", kaynak: "BMJ UPF · CSPI · TGK", alternatif: "Ev poğaça, geleneksel hamur işi", arar: ["Tavuklu Çörek", "Tavuklu Kek"] },

 "PALMIYE ÇIKOLATA KIDS": { ad: "Çocuk Çikolata Marka (Damla, Bonibon)", kat: "Ultra İşlenmiş", risk: "yuksek", organlar: ["Pankreas", "Bağırsak"], etki: "Süt çikolata değil 'kakao kompound' (palmiye yağlı taklit). Tüm renklendiriciler + emülgatör.", kaynak: "Southampton 2007 · CSPI · Türk Pediatri", alternatif: "Bitter çikolata (min %70)", arar: ["Damla Çikolata", "Bonibon Çikolata"] },

 "TAYLAND BIBER": { ad: "Tayland/Vietnam Acı Sosları (Sahte Sodyum Eklemeli)", kat: "İthal İşlenmiş Sos", risk: "yuksek", organlar: ["Bağırsak", "Tansiyon"], etki: "Sriracha, Tabasco taklitleri. MSG + HFCS + sentetik aroma + sülfit + benzoat.", kaynak: "CSPI · WHO Sodium", alternatif: "Taze biber + sirke + sarımsak ev sos", arar: ["Sriracha", "Tabasco", "Acı Sos"] },

 "DEVERPILI ŞOK": { ad: "İndirim Marketleri Özel Etiket (Marka Sahte)", kat: "Düşük Kalite", risk: "yuksek", organlar: ["Karaciğer", "Bağırsak"], etki: "İndirim marketlerin özel etiketli ürünleri (ŞOK, A101, BIM) ucuz hammadde + daha çok katkı.", kaynak: "TKHK · Tarım Bakanlığı Hile · Türkiye Tüketici Hakları Derneği", alternatif: "Bilinçli alım, etiket okuma, yerel üretici", arar: ["Şok Marka", "A101 Marka", "BIM Marka"] },

 "TURK PIRINÇ İSREDİT": { ad: "Hindistan/Pakistan İthal Pirinç (Arsenik Yüksek)", kat: "İthal Tahıl", risk: "kritik", organlar: ["Beyin", "Kanser", "Sinir"], etki: "Türkiye pirinç ithalatı çoğunlukla Asya'dan. Arsenik kalıntısı yüksek. Bebek mamasında tehlike.", kaynak: "FDA 2023 Arsenik · WHO · TGK · Türkiye Tarım Bakanlığı", alternatif: "Yerli Trakya pirinci, bulgur, kinoa", arar: ["İthal Pirinç", "Hindistan Pirinç"] },

 "ETSIZ ÇIĞ KÖFTE TEHLIKE": { ad: "Sokak Etsiz Çiğ Köftesi (Bulgur + Acı Sos)", kat: "Sokak Yemek", risk: "yuksek", organlar: ["Tansiyon", "Mide"], etki: "Geleneksel etli çiğ köfte yerine pazarlanır. Bulgur + ucuz salça + MSG + acı (alev gibi) + 5g+ sodyum.", kaynak: "TGK · WHO Sodium · Türkiye Beslenme Diyet Derneği", alternatif: "Geleneksel etli çiğ köfte (Urfa)", arar: ["Çiğ Köfte Etsiz", "Sokak Çiğ Köfte"] },

 "KINOA İŞLENMIŞ": { ad: "İşlenmiş Kinoa (Hazır Pişmiş - Konserve)", kat: "İşlenmiş Tahıl", risk: "orta", organlar: ["Bağırsak"], etki: "BPA kutu astar + sodyum + EDTA + ucuz kinoa. Saponin yıkanmamış ise mide bulantısı.", kaynak: "EFSA BPA · CSPI · TGK", alternatif: "Kuru kinoa (yıkayıp pişir)", arar: ["Hazır Kinoa", "Pişmiş Kinoa"] },

 "AVOKADO YAĞI %70 SAHTE": { ad: "Sahte Avokado Yağı (%70 Soya/Ayçiçek)", kat: "Sahte Premium Yağ", risk: "yuksek", organlar: ["Kalp"], etki: "UC Davis 2020 testi: piyasadaki avokado yağlarının %70'i sahte. Etiket yalan.", kaynak: "UC Davis 2020 Avokado · Food Control · Türk Tarım Bakanlığı", alternatif: "Sertifikalı soğuk sıkım avokado yağı", arar: ["Avokado Yağı", "Sahte Avokado Yağı"] },
 "HINDISTAN CEVIZI YAĞI ENDÜSTRI": { ad: "Endüstriyel Hindistan Cevizi Yağı (Hidrojenize)", kat: "İşlenmiş Yağ", risk: "yuksek", organlar: ["Kalp"], etki: "Saf bakire değil, hidrojenize edilebilir. Trans yağ kalıntısı. AHA aşırı tüketim önermiyor.", kaynak: "AHA 2017 Coconut Oil · WHO Trans", alternatif: "Sızma soğuk sıkım bakire hindistan cevizi yağı", arar: ["Hindistan Cevizi Yağı", "Coconut Oil"] },

 "DONUT KRISPY KREME": { ad: "Endüstriyel Donut (Krispy Kreme, Dunkin')", kat: "Ultra İşlenmiş Hamur", risk: "kritik", organlar: ["Pankreas", "Kalp"], etki: "Beyaz un + palmiye + şeker glaze + sentetik aroma + emülgatör + L-sistein.", kaynak: "WHO Şeker · CSPI · BMJ UPF · Türk Pediatri", alternatif: "Ev yapımı kek, geleneksel börek", arar: ["Donut", "Krispy Kreme", "Dunkin Donuts"] },

 "ÇOCUK BARRESCO KAHVE": { ad: "Çocuğa Verilen Kahveli İçecek (Caffeine)", kat: "Çocuk İçeceği", risk: "kritik", organlar: ["Kalp", "Sinir Sistemi", "Beyin"], etki: "AAP 12 yaş altı kafein yasaklıyor. Soğuk kahve, çikolatalı içecek bile kafein içerir.", kaynak: "AAP Kafein · Türk Pediatri Kurumu · EFSA", alternatif: "Sade süt, taze meyve, su", arar: ["Çocuk Kahveli İçecek", "Coffee Kids"] },

 "BISCOTTI EROS": { ad: "Hazır Çocuk Kahvaltısı (Eti Cin, Banvit Pasha)", kat: "Çocuk Hedefli Ultra İşlenmiş", risk: "kritik", organlar: ["Pankreas", "Bağırsak"], etki: "Beyaz un + şeker + palmiye + aroma + renklendirici. Çocuk hedefli reklam.", kaynak: "BMJ UPF · CSPI · Türk Pediatri · WHO Çocuk Pazarlama", alternatif: "Ev yapımı, yulaf bowl, taze meyve", arar: ["Çocuk Kahvaltısı", "Banvit Pasha Çocuk"] },

 "ÇİKOLATA SUR PRIZE": { ad: "Yeni Yıl Sürpriz Çikolata (Çoklu Karışım)", kat: "Karışık Şekerleme", risk: "yuksek", organlar: ["Pankreas", "Bağışıklık"], etki: "Karışık çikolata + jelibon + drage + bonibon - tek pakette tüm boyalar + şekerler.", kaynak: "Southampton 2007 · CSPI · WHO Şeker", alternatif: "Sade bitter çikolata", arar: ["Yeni Yıl Çikolata", "Karışık Şekerleme"] },

 "AYRAN HAZIR ETIBASKILI": { ad: "Karışık Ayran (Yoğurt + Maltodekstrin + Su)", kat: "Sahte Ayran", risk: "yuksek", organlar: ["Bağırsak", "Pankreas"], etki: "Geleneksel ayran yerine yoğurt + maltodekstrin + su + tuz + karra + stabilizör.", kaynak: "TGK · CSPI · Türkiye Beslenme Diyet Derneği", alternatif: "Ev ayranı (taze yoğurt)", arar: ["Karışık Ayran", "Maltodekstrinli Ayran"] },

 "TARAMA SOSU HAZIR": { ad: "Hazır Tarama (Balık Yumurtası + Bitkisel Yağ)", kat: "İşlenmiş Mezé", risk: "yuksek", organlar: ["Tansiyon", "Bağırsak"], etki: "Balık yumurtası %20, soya yağı + sirke + sodyum + tartrazin (sarı 5) + benzoat.", kaynak: "Southampton 2007 · CSPI · TGK · TKHK", alternatif: "Geleneksel tarama (ev yapımı)", arar: ["Tarama Sosu", "Hazır Tarama"] },

 "BAHAR YULAF TAM": { ad: "'Tam Tahıl' Etiketli Endüstriyel Ürünler (Hile)", kat: "Pazarlama Yalanı", risk: "yuksek", organlar: ["Pankreas"], etki: "%20 tam tahıl + %80 beyaz un = 'tam tahıl' etiketi. AB ve Türkiye sınır koymadı.", kaynak: "AB Etiketleme · CSPI · BEUC · Türkiye Beslenme Diyet Derneği", alternatif: "%100 tam buğday, ekşi maya, yerel üretici", arar: ["Tam Tahıl Etiketli", "Whole Grain Sahte"] },

 "BISKUVI BEBEK 6+ AY": { ad: "6+ Ay Bebek Bisküvisi (Erken Şeker Tanıtımı)", kat: "Bebek Atıştırmalık", risk: "yuksek", organlar: ["Pankreas", "Bağırsak"], etki: "WHO ve AAP 6 ay altı şeker önermiyor. Bu ürünler şeker + beyaz un + palmiye içerir.", kaynak: "WHO 2022 Bebek · AAP · Türk Pediatri Kurumu", alternatif: "Doğal mama, taze meyve püresi", arar: ["Bebek Bisküvisi 6 Ay", "Erken Bebek Atıştırmalık"] },

 "TÜRK LOKUM SAHTE": { ad: "Sahte Lokum (HFCS + Mısır Nişastası + Aroma)", kat: "Sahte Geleneksel", risk: "yuksek", organlar: ["Pankreas"], etki: "Geleneksel Hacı Bekir lokumu yerine glikoz şurubu + mısır nişastası + sentetik aroma + boya.", kaynak: "TGK Lokum · Tarım Bakanlığı Hile Raporu", alternatif: "Sertifikalı Hacı Bekir, Koska, geleneksel lokumcu", arar: ["Sahte Lokum", "Lokum Endüstri"] },

 "ŞEKERSIZ ÜRÜN SUKRALOZ": { ad: "'Şekersiz' Ürünler (Yapay Tatlandırıcı Bombası)", kat: "Sahte Sağlıklı", risk: "yuksek", organlar: ["Bağırsak", "Beyin"], etki: "Sukraloz + asesülfam + aspartam + maltitol karışımı. 'Diyabetik' satılır ama bağırsak florası bozulur.", kaynak: "Nature 2014 Suez · IARC 2023 Aspartam · WHO", alternatif: "Doğal şekersiz (stevia, az miktar)", arar: ["Şekersiz", "Sugar Free"] },

 "KETO ÜRÜNLERI": { ad: "Keto Diyet Ürünleri (Ultra İşlenmiş Yağ + Tatlandırıcı)", kat: "Ultra İşlenmiş Diyet", risk: "yuksek", organlar: ["Kalp", "Karaciğer"], etki: "Yüksek doymuş yağ + eritritol + soy proteini izolat + sentetik. Sadece keto pazarlama.", kaynak: "BMJ UPF · CSPI · Türkiye Beslenme Diyet", alternatif: "Doğal beslenme, gerçek yağlar", arar: ["Keto Ürünleri", "Keto Bar"] },

 "VEGAN HAZIR YEMEK": { ad: "Vegan Hazır Yemek (Donmuş)", kat: "Ultra İşlenmiş Vegan", risk: "yuksek", organlar: ["Kalp", "Bağırsak"], etki: "20+ bileşen. Soya proteini izolatı + methylcellulose + palmiye + sentetik aroma. Vegan da olsa et kadar zararlı.", kaynak: "BMJ UPF · CSPI Plant Based", alternatif: "Ev yapımı vegan, taze sebze baklagil", arar: ["Vegan Hazır", "Donmuş Vegan"] },

 "EKMEK FRANSIZ BAGUETTE": { ad: "Hazır Baguette / Fransız Ekmek (Endüstriyel)", kat: "İşlenmiş Ekmek", risk: "yuksek", organlar: ["Pankreas"], etki: "Geleneksel Fransız değil. Beyaz un + ADA (E927a yoga matı kimyasalı, AB yasak ama bazı zincirlerde var) + L-sistein.", kaynak: "AB Reg 1129/2011 · CSPI · Türkiye Beslenme Diyet", alternatif: "Geleneksel ekşi maya, ev fırın", arar: ["Baguette", "Fransız Ekmek"] },

 "İLAÇ AKINTI ENDÜSTRI": { ad: "Reçetesiz Antibiyotik (Türkiye'de Yaygın Kullanım)", kat: "Reçetesiz İlaç", risk: "kritik", organlar: ["Bağırsak", "Antibiyotik Direnci"], etki: "WHO acil sorun: Türkiye'de reçetesiz antibiyotik %30+. Antibiyotik direnci hızla artıyor.", kaynak: "WHO AMR 2021 · Türkiye Sağlık Bakanlığı · Türk Tabipler Birliği", alternatif: "Doktor reçetesi, bilinçli kullanım", arar: ["Reçetesiz Antibiyotik", "Antibiyotik"] },

 "PROTEIN BAR FITS": { ad: "Fitness Protein Bar (Quest, Fitness Yolu)", kat: "Ultra İşlenmiş", risk: "yuksek", organlar: ["Bağırsak", "Karaciğer"], etki: "Whey + maltitol/eritritol (gaz, ishal) + palmiye + sukraloz + aroma + 20+ bileşen.", kaynak: "BMJ UPF · CSPI Protein Bar", alternatif: "Yumurta + ceviz + hurma (ev bar)", arar: ["Fitness Bar", "Quest Bar", "Protein Bar Fit"] },

 "KEKIK YAĞI HAZIR DAMLA": { ad: "Endüstriyel Kekik Yağı Damlası (Saf Değil)", kat: "Bitkisel Yağ", risk: "orta", organlar: ["Karaciğer", "Mide"], etki: "Saf kekik yağı pahalı. Piyasada satılanların çoğu zeytinyağı + sentetik aroma karışımı.", kaynak: "TGK · Tarım Bakanlığı Hile", alternatif: "Sertifikalı saf yerel kekik yağı", arar: ["Kekik Yağı", "Oregano Oil"] },

 "ZENCEFIL ŞURUBU": { ad: "Hazır Zencefil Şurubu (Şeker + Sodyum)", kat: "İşlenmiş Bitkisel", risk: "yuksek", organlar: ["Pankreas"], etki: "Gerçek zencefil %5, geri kalan şeker (HFCS) + asit + koruyucu + sentetik aroma.", kaynak: "CSPI · WHO · Türkiye Eczacılar Birliği", alternatif: "Taze zencefil + bal + limon (ev)", arar: ["Zencefil Şurubu", "Ginger Syrup"] },

 "ANNE SÜTÜ YERİNE FORMÜL": { ad: "Anne Sütü Yerine Formül Pazarlama (WHO Skandalı)", kat: "Pazarlama Skandalı", risk: "kritik", organlar: ["Bebek Bağışıklık"], etki: "Nestle 1970'ler skandalı: bebek formülü emzirme yerine pazarlandı, bebek ölümleri. WHO Code 1981 koruma.", kaynak: "WHO Code 1981 · Lancet Breastfeeding · Türk Pediatri", alternatif: "Anne sütü 6 ay, sonrası tamamlayıcı", arar: ["Anne Sütü Formül", "Bebek Formül"] },

 "YOĞURT EKSI KÜLTÜRÜZ": { ad: "Pastörize Sonrası Yoğurt (Probiyotik Yok)", kat: "Sahte Probiyotik", risk: "orta", organlar: ["Bağırsak"], etki: "Bazı uzun raf ömürlü yoğurtlar fermantasyon sonrası tekrar pastörize edilir = canlı bakteri ölür.", kaynak: "TGK · CSPI · Türkiye Beslenme Diyet Derneği", alternatif: "Pastörize edilmemiş, canlı kültürlü yoğurt (ev veya yerel)", arar: ["Pastörize Yoğurt", "Uzun Raf Ömürlü Yoğurt"] },

 "BAYAR KETO TATLI": { ad: "Keto Diyet Tatlısı (Eritritol + Yapay Tatlandırıcı)", kat: "Ultra İşlenmiş Diyet", risk: "yuksek", organlar: ["Bağırsak", "Kalp"], etki: "Eritritol kalp damar olayları riski (Nature 2023). Yüksek doymuş yağ + sukraloz + soya proteini.", kaynak: "Nature 2023 Erythritol Heart · BMJ UPF · CSPI", alternatif: "Doğal beslenme, az miktar bal/hurma", arar: ["Keto Tatlı", "Keto Şekerleme"] },

 "PROTEIN TOZU MARK SAHTE": { ad: "Sahte Protein Tozu (Düşük Kalite Whey)", kat: "Spor Takviye Sahte", risk: "kritik", organlar: ["Böbrek", "Karaciğer"], etki: "Türkiye/Çin'den ucuz protein tozları ağır metal, melamin, steroid kontaminasyonu içerebilir.", kaynak: "Consumer Reports 2018 · WHO Melamin · Türkiye Sağlık Bakanlığı", alternatif: "Sertifikalı (NSF) protein veya doğal protein", arar: ["Sahte Protein Tozu", "Ucuz Whey"] },

 "DONDURMA KEFIR": { ad: "Probiyotik Dondurma (Pazarlama)", kat: "Sahte Sağlıklı Dondurma", risk: "yuksek", organlar: ["Pankreas", "Bağırsak"], etki: "Şeker bombası üstüne probiyotik etiketi eklenmiş. Pasteurize sonrası canlı bakteri çoktan ölmüş.", kaynak: "JAMA 2019 Probiyotik · CSPI", alternatif: "Ev kefiri, taze yoğurt", arar: ["Probiyotik Dondurma"] },

 "MAGAZA KIYMA RENK": { ad: "Karbon Monoksit ile Kırmızı Tutulan Kıyma", kat: "Et Hilesi", risk: "yuksek", organlar: ["Bağırsak", "Bağışıklık"], etki: "ABD'de yaygın, Türkiye'de de bazı zincirlerde. Et eski olsa bile parlak kırmızı görünür. Tüketici kandırılır.", kaynak: "FDA CO Et · Consumer Reports · TGK · TKHK", alternatif: "Kasaptan taze çekilmiş, görsel kontrol", arar: ["Karbon Monoksitli Et", "Renklendirilmiş Kıyma"] },

 "ŞAMPANYA ENDÜSTRI": { ad: "Endüstriyel Köpüklü Şarap (Sahte Şampanya)", kat: "Alkollü İçecek", risk: "yuksek", organlar: ["Karaciğer", "Bağışıklık"], etki: "Gerçek şampanya sadece Champagne bölgesi PDO. Diğerleri 'köpüklü şarap'. Yüksek sülfit + şeker eklemeli.", kaynak: "AB PDO Champagne · EFSA Sülfit · WHO Alkol", alternatif: "Sertifikalı PDO Şampanya, kaliteli köpüklü", arar: ["Köpüklü Şarap", "Sparkling Wine", "Şampanya"] },

 "VEGAN DELI ET": { ad: "Vegan Şarküteri (Soya Salamı, Seitan Sosis)", kat: "Ultra İşlenmiş Vegan", risk: "yuksek", organlar: ["Bağırsak", "Bağışıklık", "Hormon"], etki: "Seitan (saf gluten) veya soya proteini + tuz + boya + aroma. Çölyak için tehlikeli.", kaynak: "BMJ UPF · CSPI Plant Based · Türk Pediatri", alternatif: "Mercimek köfte, baklagil köftesi", arar: ["Vegan Salam", "Vegan Sosis", "Soya Şarküteri"] },

 "TAVUK BUYME HORMONI": { ad: "Hızlı Büyütülmüş Tavuk (Genetik Hibrit + Hızlandırıcı)", kat: "Endüstriyel Tavuk", risk: "yuksek", organlar: ["Hormon", "Bağışıklık"], etki: "Türkiye'de hormon enjeksiyon yasak ama yem üzerinden geçiş + genetik hibrit. 35 günde kesilir.", kaynak: "AB Direktifi · Tarım Bakanlığı · Greenpeace · Türk Veteriner", alternatif: "Köy tavuğu, organik, yumurta tavuğu", arar: ["Hızlı Büyüyen Tavuk", "Konvansiyonel Tavuk"] },

 "JAPONYA SUSHI AVRUPA": { ad: "Sushi (Pirinç Şekerli + Sirke + İşlenmiş Balık)", kat: "Karışık Hazır Yemek", risk: "orta", organlar: ["Pankreas", "Bağırsak"], etki: "Sushi pirinci genelde şeker + sirke içerir. Tongue/maguro yapay renklendirme. Soya sosu (HVP).", kaynak: "CSPI Sushi · IARC 3-MCPD Soya Sosu", alternatif: "Geleneksel Japon sushi (sertifikalı şef)", arar: ["Sushi", "Japon Sushi"] },

 "ŞARAP BOX KARTON": { ad: "Kutu Şarap / Box Wine (Plastik Astar)", kat: "Plastik Ambalaj Alkol", risk: "yuksek", organlar: ["Hormon", "Karaciğer"], etki: "Karton içinde plastik torba (PET, PVC). Alkol plastik kimyasalları çıkarır. BPA, ftalat sızıntısı.", kaynak: "EFSA BPA · EWG · WHO Alkol", alternatif: "Cam şişe şarap, alkolsüz", arar: ["Kutu Şarap", "Box Wine"] },

 "EKMEKLI HAMBURGER PANELE": { ad: "Endüstriyel Burger Ekmeği (ADA + L-Sistein)", kat: "İşlenmiş Ekmek", risk: "kritik", organlar: ["Solunum", "Cilt", "Bağırsak"], etki: "Azodikarbonamide (E927a - yoga matı kimyasalı) + L-sistein (insan saçı/tüy) + brom unu + palmiye.", kaynak: "AB Reg 1129/2011 · CSPI · WHO", alternatif: "Ev hamburger ekmeği, geleneksel fırın", arar: ["Hamburger Ekmeği", "Burger Bun"] },

 "PIZZA ETI KARIŞIM": { ad: "Donmuş Pizza Üzerindeki 'Sucuk/Sosis' (Karma)", kat: "İşlenmiş Et Karışım", risk: "yuksek", organlar: ["Mide", "Bağırsak"], etki: "Pizza üzerindeki sucuk/sosis genelde mekanik et + soya + nitrit + boya karışımı. Saf et değil.", kaynak: "TGK · IARC Vol 114 · WHO", alternatif: "Taze et, ev pizza", arar: ["Pizza Sucuk", "Pizza Sosis"] },

 "EKMEK GLUTEN FREE PİRINÇ": { ad: "Glutensiz Ekmek (Pirinç + Mısır Unu - Yüksek GI)", kat: "Sahte Sağlıklı", risk: "yuksek", organlar: ["Pankreas", "Bağırsak"], etki: "Buğday yerine pirinç + mısır nişastası + ksantan + emülgatör. Glisemik indeks buğdaydan yüksek.", kaynak: "BMJ 2017 Glutensiz · Mayo Clinic · Türkiye Beslenme Diyet", alternatif: "Doğal glutensiz tahıl (kinoa, karabuğday)", arar: ["Glutensiz Ekmek", "Gluten Free Bread"] },

 "BAL ARTIK NESTLE": { ad: "Sahte Bal (Çin İthal - Pirinç/Mısır Şurubu)", kat: "Sahte Bal", risk: "yuksek", organlar: ["Pankreas", "Karaciğer"], etki: "Çin'den gelen 'bal' aslında mısır/pirinç şurubu. Türkiye'de 'paketleme' sonrası satılır.", kaynak: "EU Honey Authentication · Türkiye Tarım Bakanlığı · TKHK", alternatif: "Yerel arıcı, dağ balı, sertifikalı", arar: ["Çin Balı", "İthal Bal", "Sahte Bal Çin"] },

 "PROBIYOTIK SUYU ŞEKERLI": { ad: "Şekerli Probiyotik Su (Healthy Drink Trend)", kat: "Sahte Sağlıklı İçecek", risk: "yuksek", organlar: ["Pankreas"], etki: "Probiyotik + su + şeker + aroma + sitrik asit. Şekerli içecekten farkı yok.", kaynak: "JAMA 2019 · CSPI · WHO Şeker", alternatif: "Ev kefiri, kombucha", arar: ["Probiyotik Su", "Probiotic Water"] },

 "HOLLY GREEN JUICE": { ad: "Yeşil Detox Suyu (Yapay Hazır)", kat: "Sahte Sağlık Trend", risk: "yuksek", organlar: ["Pankreas"], etki: "Sebze suyu pazarlanır ama %10 sebze + %90 elma suyu + maltodekstrin + sentetik B12.", kaynak: "CSPI · WHO · BEUC", alternatif: "Taze sebze suyu (ev sıkma)", arar: ["Yeşil Detoks Suyu", "Green Juice"] },

 "BIRA SİFA": { ad: "El Yapımı Endüstriyel Bira (Craft Beer)", kat: "Alkollü İçecek", risk: "yuksek", organlar: ["Karaciğer", "Beyin"], etki: "Daha yüksek alkol (%5-9), glifosat kalıntısı (tahıl), katkı maddeleri. WHO Grup 1.", kaynak: "WHO 2023 Alkol · EWG Glifosat · Türk Tabipler Birliği", alternatif: "Alkolsüz, kombuça", arar: ["Craft Beer", "El Yapımı Bira"] },

 "WHISKY ENDÜSTRI MARKASI": { ad: "Endüstriyel Viski (Karamel + Aroma)", kat: "Alkollü İçecek", risk: "kritik", organlar: ["Karaciğer", "Beyin", "Kanser"], etki: "Geleneksel meşe fıçı yıllanma yerine karamel renk + sentetik aroma. WHO Grup 1.", kaynak: "WHO 2023 · IARC · Türk Tabipler Birliği", alternatif: "Sertifikalı viski (12+ yıl), alkolsüz", arar: ["Endüstriyel Viski", "Marka Whisky"] },

 "MAYONEZ GRAS LIMONLU": { ad: "Aromalı Mayonez (Limonlu, Sarımsaklı)", kat: "İşlenmiş Sos", risk: "yuksek", organlar: ["Kalp", "Karaciğer"], etki: "Soya yağı + sirke + EDTA + sentetik aroma + sukraloz + yapay renk. Ev mayonezi farklı.", kaynak: "CSPI · WHO · TGK", alternatif: "Ev mayonezi", arar: ["Aromalı Mayonez", "Limonlu Mayonez"] },

 "TURK KIYMA İSPANAK PINAR": { ad: "Hazır Donmuş Pinar/Maret İspanak Yemek", kat: "İşlenmiş Hazır Yemek", risk: "yuksek", organlar: ["Tansiyon", "Bağırsak"], etki: "İspanak + krema + soğan + tuz + MSG + nişasta + koruyucu. Bazı versiyonlar palmiye yağı.", kaynak: "TGK · CSPI · WHO Sodium", alternatif: "Taze ispanak (ev yemeği)", arar: ["Hazır İspanak Yemek", "Donmuş İspanak"] },

 "MEYVE LIKÖRÜ": { ad: "Endüstriyel Meyve Likörü (Aroma + Renklendirici)", kat: "Alkollü İçecek", risk: "yuksek", organlar: ["Karaciğer", "Pankreas"], etki: "Alkol + şeker + sentetik meyve aroması + tüm boyalar. Sokak/diskotek tüketimi yaygın.", kaynak: "WHO Alkol · Southampton 2007 · TGK", alternatif: "Ev meyve şarabı (geleneksel)", arar: ["Meyve Likörü", "Fruit Liqueur"] },

 "DONUT VANILYALI": { ad: "Vanilyalı Donut (Glikoz + Vanilin)", kat: "Ultra İşlenmiş", risk: "kritik", organlar: ["Pankreas", "Kalp"], etki: "Hamur + palmiye + glikoz şurubu + vanilin (sentetik) + asit + emülgatör. Krispy Kreme tarzı.", kaynak: "WHO · CSPI · BMJ UPF", alternatif: "Ev yapımı, çocuk için tatlı yerine meyve", arar: ["Vanilyalı Donut"] },

 "BISCUITS DIGESTIVE": { ad: "Digestive Bisküvi (Eti Tutku, Ülker Petibör)", kat: "İşlenmiş Tatlı", risk: "yuksek", organlar: ["Pankreas"], etki: "'Sağlıklı' diye satılır ama %30 şeker + palmiye + emülgatör + tam buğday yerine kepek katkı.", kaynak: "BMJ UPF · CSPI · Türkiye Beslenme Diyet", alternatif: "Ev yulaf kurabiye, tam buğday biskuvi", arar: ["Digestive", "Eti Tutku", "Petibör"] },

 "DONUT POLEN AÇMA": { ad: "Hazır Tatlı Çörek / Açma (Şekerli)", kat: "İşlenmiş Hamur", risk: "yuksek", organlar: ["Pankreas", "Kalp"], etki: "Endüstriyel hamur + şeker dolgu + palmiye + glikoz. Geleneksel tatlı çörek değil.", kaynak: "CSPI · TGK", alternatif: "Ev açması, geleneksel fırın", arar: ["Hazır Çörek", "Şekerli Açma"] },

 "JAMBALAYA SOS HAZIR": { ad: "Hazır Bouillon Et/Tavuk Sos Konsantresi", kat: "İşlenmiş Sos", risk: "kritik", organlar: ["Tansiyon", "Sinir"], etki: "%50 tuz + MSG + palmiye + sentetik et aroması + nişasta + maltodekstrin.", kaynak: "WHO Sodium · CSPI · TGK", alternatif: "Ev kemik suyu, taze et suyu", arar: ["Bouillon Konsantre", "Stock Cube"] },

 "POPCORN FILM KEYIF": { ad: "Sinema Salonu Patlamış Mısırı (Aşırı Yağ)", kat: "Sokak Atıştırmalık", risk: "kritik", organlar: ["Akciğer", "Kalp"], etki: "Tek büyük kova 1200 kalori + günlük yağ %40. Diasetil aroma akciğer hastalığı.", kaynak: "NIOSH Diasetil · CSPI · WHO Trans", alternatif: "Ev mısır, az yağ", arar: ["Sinema Patlamış Mısır", "Cinema Popcorn"] },

 "BAHAR YULAF BIO": { ad: "'Bio' Pazarlanan Endüstriyel Yulaf (Hala Glifosat)", kat: "Sahte Bio", risk: "yuksek", organlar: ["Karaciğer", "Bağırsak"], etki: "'Bio' etiketi her zaman organik değil. Bazı 'bio' yulaflarda hala glifosat tespit (EWG 2018).", kaynak: "EWG 2018 Glifosat · IARC · BEUC", alternatif: "Sertifikalı organik (ECOCERT, TR), test edilmiş", arar: ["Bio Yulaf", "Bio Tahıl"] },

 "PAKETLI TAZE SALATA": { ad: "Paketli 'Taze' Sebze (Klorla Yıkanmış)", kat: "İşlenmiş Sebze", risk: "yuksek", organlar: ["Bağırsak", "Bağışıklık"], etki: "Marul/roka/spinat klorlu su ile yıkanır. Probiyotik flora ölür. Pestisit kalır. Plastik mikroplastik.", kaynak: "EWG · Greenpeace · BEUC · Türk Tabipler Birliği", alternatif: "Taze sebze (evde yıka)", arar: ["Paket Salata", "Taze Sebze Paketli"] },

 "DOĞAL TUZ HARİÇ HİMALAYA": { ad: "Sahte 'Doğal' Tuzlar (Boyalı Kaya Tuzu)", kat: "Sahte Premium", risk: "orta", organlar: ["Bağırsak"], etki: "Himalaya, Maden, Çankırı diye satılan tuzların %80'i sahte (boyalı kaya tuzu).", kaynak: "Food Control 2019 Salt · TGK · Tarım Bakanlığı Hile", alternatif: "Sertifikalı, yerel üretici (Çankırı, Kıbrıs)", arar: ["Sahte Himalaya", "Sahte Doğal Tuz"] },

 "VEGAN VEGAN OYUN OYUNCAK": { ad: "Vegan Çocuk Atıştırmalık (Soya Bazlı - Ultra İşlenmiş)", kat: "Çocuk Hedefli Ultra İşlenmiş", risk: "yuksek", organlar: ["Hormon", "Bağırsak"], etki: "Soya proteini + palmiye + şeker + sentetik aroma + B12 takviye. Çocuk için soya östrojen etkisi.", kaynak: "BMJ UPF · CSPI · Türk Pediatri", alternatif: "Doğal meyve, kuruyemiş", arar: ["Vegan Çocuk Bar", "Çocuk Vegan Atıştırmalık"] },

 "AYRAN PROBIYOTIK PAZARLAMA": { ad: "Probiyotik Etiketli Ayran (Pazarlama)", kat: "Sahte Probiyotik", risk: "orta", organlar: ["Bağırsak"], etki: "Pastörize sonrası tek tür bakteri eklenir. Geleneksel ev ayranındaki çeşit yok.", kaynak: "JAMA 2019 · CSPI · TGK", alternatif: "Ev ayranı, taze yoğurt", arar: ["Probiyotik Ayran"] },

 "DOĞAL ŞEKER SAHTE": { ad: "Sahte 'Doğal' Hurma Şekeri (Karışım)", kat: "Sahte Doğal Tatlandırıcı", risk: "yuksek", organlar: ["Pankreas"], etki: "Hurma şekeri pahalı, piyasada hurma + beyaz şeker + karamel karışımı satılır.", kaynak: "TGK · Tarım Bakanlığı · CSPI", alternatif: "Saf hurma şekeri, sertifikalı yerli", arar: ["Hurma Şekeri", "Date Sugar"] },

 "BAYAR MUSLI ÇOCUK": { ad: "Çocuk Müsli (Çikolatalı, Ballı - Şekerli)", kat: "Çocuk Hedefli Ultra İşlenmiş", risk: "kritik", organlar: ["Pankreas", "Diş"], etki: "%40 şeker. Yulaf + glikoz şurubu + palmiye + çikolata damla + sentetik aroma. Sağlıklı yalanı.", kaynak: "WHO · CSPI · Türk Pediatri · BEUC", alternatif: "Sade yulaf + taze meyve + ceviz", arar: ["Çocuk Müsli", "Çikolatalı Müsli"] },

 "TURK SOSU BBQ": { ad: "Yerli BBQ/Acı Sos Markaları (Sodyum Bombası)", kat: "İşlenmiş Sos", risk: "yuksek", organlar: ["Tansiyon", "Pankreas"], etki: "HFCS + sirke + 5g+ sodyum + sentetik tütsü aroması + boya. Knorr, Calve, Bizim.", kaynak: "WHO Sodium · CSPI · TKHK", alternatif: "Ev sos, taze malzeme", arar: ["Yerli BBQ Sos", "Acı Sos Marka"] },

 "TAZE PİZZA SOS HAZIR": { ad: "Hazır Pizza Sos (Domates + Şeker + EDTA)", kat: "İşlenmiş Sos", risk: "yuksek", organlar: ["Pankreas", "Hormon"], etki: "Domates konsantresi + şeker + sodyum + EDTA + sentetik baharat. Taze değil.", kaynak: "TGK · CSPI · EFSA EDTA", alternatif: "Taze domates sos (ev)", arar: ["Pizza Sosu Hazır", "Pasta Sauce Pizza"] },

 "PARMESAN AĞAÇ TOZU": { ad: "Selüloz (Odun) Eklemeli Rendelenmiş Parmesan", kat: "Sahte Peynir", risk: "yuksek", organlar: ["Bağırsak"], etki: "FDA 2016: ABD'de rendelenmiş parmesanlarda %8 odun selülozu tespit etti. Türkiye'de de yaygın.", kaynak: "FDA 2016 Parmesan · Bloomberg 2016 · TKHK", alternatif: "Bütün parmesan parçası, evde rendele", arar: ["Rendelenmiş Parmesan", "Selüloz Peynir"] },

 "PROBIYOTIK SUYU SAHTE": { ad: "'Probiyotik' Sebze/Meyve Suları (Pasteurize)", kat: "Sahte Probiyotik", risk: "orta", organlar: ["Bağırsak"], etki: "Pasteurize sonrası canlı bakteri yok. Etiketteki probiyotik pazarlama hilesi.", kaynak: "JAMA 2019 · CSPI · BEUC", alternatif: "Taze kombuça, ev kefiri", arar: ["Probiyotik Su Sahte", "Probiotic Juice"] },

 "DERIN DONDURUCU FROZEN MEYVE": { ad: "Derin Dondurucu Meyve (Sülfit + Şeker Eklemeli)", kat: "İşlenmiş Meyve", risk: "orta", organlar: ["Solunum", "Pankreas"], etki: "Donmuş meyveye renk tutması için sülfit + tatlılaştırmak için şeker eklenebilir.", kaynak: "EFSA Sülfit · CSPI", alternatif: "Sade donmuş meyve (etiket kontrol), taze", arar: ["Donmuş Meyve", "Frozen Fruit"] },

 "BUYUYEN ÇOCUK MAMA": { ad: "1-3 Yaş 'Büyüyen Çocuk Sütü' (Pazarlama)", kat: "Bebek Maması Pazarlama", risk: "yuksek", organlar: ["Pankreas", "Hormon"], etki: "WHO ve AAP: 1 yaş üstü inek sütü yeterli, 'büyüme sütü' gereksiz. %15 şeker + sentetik vitamin.", kaynak: "WHO 2018 Çocuk Süt · AAP · Türk Pediatri Kurumu", alternatif: "Tam yağlı inek sütü, anne sütü", arar: ["Büyüyen Çocuk Sütü", "Growing Up Milk"] },

 "VENILYA SAHTE ÇUBUK": { ad: "Sahte Vanilya Çubuğu (Madagascar Hilesi)", kat: "Sahte Premium Baharat", risk: "orta", organlar: ["Karaciğer"], etki: "Pahalı Madagaskar vanilyası sıkça sahte. Eski/küflü çubuklar veya sentetik vanilin emdirilmiş.", kaynak: "CSPI · Tarım Bakanlığı", alternatif: "Sertifikalı vanilya, baharat uzmanı", arar: ["Vanilya Çubuğu", "Madagaskar Vanilya"] },

 "TÜRK USULÜ MENEMEN": { ad: "Hazır Menemen Konservesi", kat: "İşlenmiş Konserve", risk: "yuksek", organlar: ["Tansiyon", "Hormon"], etki: "BPA kutu + sodyum + yumurta tozu + bitkisel yağ + koruyucu. Geleneksel taze menemen değil.", kaynak: "EFSA BPA · CSPI · WHO", alternatif: "Ev menemen (taze yumurta, domates, biber)", arar: ["Hazır Menemen", "Menemen Konserve"] },

 "AKDENIZ HAVUÇLU SOS": { ad: "Hazır Sebze Soslu Salatalar (Pakettə)", kat: "İşlenmiş Salata", risk: "yuksek", organlar: ["Bağırsak", "Tansiyon"], etki: "Klorla yıkanmış sebze + endüstriyel mayonez + tuz + koruyucu. 'Taze' pazarlanır.", kaynak: "TKHK · CSPI · BEUC", alternatif: "Ev salatası, taze sebze", arar: ["Hazır Salata Sos", "Paketli Sebze Salata"] },

 "ÇOCUK MEYVE BAR HFCS": { ad: "Çocuk Meyve Atıştırmalık (Şekerli Bar)", kat: "Çocuk Hedefli", risk: "yuksek", organlar: ["Pankreas", "Diş"], etki: "%30 meyve + HFCS + pektin + asit + boya. 'Meyve' diye sağlıklı sanılır.", kaynak: "WHO · CSPI · Türk Pediatri", alternatif: "Taze meyve, kuru meyve (şekersiz)", arar: ["Çocuk Meyve Bar", "Fruit Snack Kids"] },

 "BISCUIT ROYAL JELLY": { ad: "Arı Sütü Eklenmiş 'Sağlık' Bisküvileri", kat: "Sahte Sağlık", risk: "yuksek", organlar: ["Pankreas"], etki: "Endüstriyel bisküviye eser miktarda arı sütü eklenir, sağlıklı pazarlanır. Şeker bombası kalır.", kaynak: "CSPI · BEUC · TKHK", alternatif: "Saf arı sütü ayrı tüket, ev bisküvi", arar: ["Arı Sütlü Bisküvi", "Royal Jelly Biscuit"] },

 "BURGER VEGAN HEAVY": { ad: "Restoran Vegan Burger (Beyond, Impossible)", kat: "Ultra İşlenmiş Vegan", risk: "yuksek", organlar: ["Kalp", "Bağırsak", "Hormon"], etki: "Soya proteini + leghemoglobin (GDO maya) + metilselüloz + palmiye + 21 bileşen.", kaynak: "BMJ UPF · CSPI · Greenpeace GMO", alternatif: "Ev mercimek köfte, nohut topu", arar: ["Restoran Vegan Burger", "Impossible Whopper"] },

 "LOKMACI HAZIR": { ad: "Hazır Lokma Tatlısı (HFCS + Margarin)", kat: "Ultra İşlenmiş Tatlı", risk: "kritik", organlar: ["Pankreas", "Kalp"], etki: "Geleneksel lokma yerine endüstriyel hamur + margarin + HFCS şerbet + sentetik aroma.", kaynak: "TGK · WHO · CSPI", alternatif: "Geleneksel ev lokması", arar: ["Hazır Lokma", "Donmuş Lokma"] },

 "FONIO ANCIENT GRAIN": { ad: "Ancient Grain (Eski Tahıl) Sahte Pazarlama", kat: "Sahte Premium Tahıl", risk: "yuksek", organlar: ["Pankreas"], etki: "Ucuz buğday/mısır karışımı 'ancient grain' diye satılır. Türkiye'de kadim tahıllar (siyez, kavılca) saf.", kaynak: "TGK · BMJ UPF · Tarım Bakanlığı", alternatif: "Sertifikalı yerli kadim tahıl (siyez, kavılca, einkorn)", arar: ["Ancient Grain", "Kadim Tahıl"] },

 "BIRA NA ALKOLSÜZ": { ad: "0% Alkolsüz Bira (Maltlı - Şekerli)", kat: "İşlenmiş İçecek", risk: "yuksek", organlar: ["Pankreas"], etki: "Alkol çıkarmak için ısıl işlem + tat için şeker + malt aromatı + asit. Şekersiz çay daha iyi.", kaynak: "CSPI · WHO Şeker", alternatif: "Su, maden suyu, kombuça", arar: ["Alkolsüz Bira", "NA Beer"] },

 "TURK USULU KAHVALTILIK": { ad: "Türk Usulü Hazır Kahvaltılık (Endüstriyel Patiseri)", kat: "Ultra İşlenmiş", risk: "yuksek", organlar: ["Kalp", "Pankreas"], etki: "Tahıl çorbası + endüstriyel poğaça + analog peynir + işlenmiş et + reçel = ultra işlenmiş kahvaltı.", kaynak: "BMJ UPF · CSPI · Türkiye Beslenme Diyet", alternatif: "Köy kahvaltısı, taze pazardan", arar: ["Hazır Kahvaltılık", "Türk Kahvaltısı Hazır"] },

 "KEFIR ENDUSTRI MISIR": { ad: "Sahte Kefir (Yoğurt + Aroma)", kat: "Sahte Probiyotik", risk: "orta", organlar: ["Bağırsak"], etki: "Geleneksel kefir taneleriyle 30+ tür bakteri. Endüstriyel kefir tek tür bakteri + yoğurt + aroma.", kaynak: "JAMA 2019 · TGK · CSPI", alternatif: "Ev kefiri (gerçek tane), yerel üretici", arar: ["Endüstriyel Kefir", "Marka Kefir"] },

 "AYÇIÇEK ÇEKIRDEK SAHTE": { ad: "Çekirdekli Soyulmuş Sahte Sigara Çekirdek (Tadım)", kat: "İşlenmiş Atıştırmalık", risk: "yuksek", organlar: ["Tansiyon", "Diş"], etki: "Tuz emdirilmiş + kostik soda işlemi + bazen sentetik aroma. Türkiye'de günde 100g+ tüketim sorunu.", kaynak: "WHO Sodium · Türkiye Beslenme Diyet Derneği · ADA Diş", alternatif: "Çiğ çekirdek, hafif kavurma", arar: ["Soyulmuş Çekirdek", "Tadım Çekirdek", "Sigara Çekirdek"] },

 "MANTAR KONSERVE CIN": { ad: "Çin İthal Konserve Mantar (Pestisit + Kalsiyum Klorür)", kat: "İthal Konserve", risk: "yuksek", organlar: ["Karaciğer", "Mineral"], etki: "Pestisit kalıntısı + kalsiyum klorür sertleştirici + BPA kutu + EDTA. Çin'den ithalat yoğun.", kaynak: "RASFF AB Çin Mantar · TGK · Greenpeace", alternatif: "Taze mantar (yerli), kuru mantar", arar: ["Çin Mantar Konserve", "İthal Mantar"] },

 "TON BALIĞI THUNNUS": { ad: "Konserve Ton Balığı (Yüksek Civa - Büyük Tunalar)", kat: "Ağır Metal", risk: "kritik", organlar: ["Beyin", "Sinir", "Üreme"], etki: "Yellowfin/Bluefin tuna en yüksek civa içerir. Hamilelere haftada 1 max. Albacore daha yüksek.", kaynak: "FDA 2021 · WHO Civa · Türk Tabipler Birliği · EWG", alternatif: "Hamsi, sardalye, ringa (küçük balık)", arar: ["Yellowfin Tuna", "Bluefin", "Ton Balığı"] },

 "MERCANI ZEYTIN PROCESS": { ad: "Asit İşlem Görmüş Zeytin (Hızlı Salamura)", kat: "İşlenmiş Zeytin", risk: "orta", organlar: ["Mide", "Bağırsak"], etki: "Geleneksel 6 ay fermente yerine kostik soda + asit hızlı işlem. Faydalı bakteri yok.", kaynak: "TGK Zeytin · CSPI · Türkiye Beslenme", alternatif: "Geleneksel salamura zeytin (yerli, ev)", arar: ["Hızlı Salamura", "Asit İşlem Zeytin"] },

 "SARMA YAPRAK KONSERVE": { ad: "Konserve Salamura Asma Yaprağı", kat: "İşlenmiş Konserve", risk: "yuksek", organlar: ["Tansiyon", "Hormon"], etki: "Sodyum bombası + asetik asit + BPA kutu + koruyucu. Geleneksel taze yaprak değil.", kaynak: "EFSA BPA · WHO Sodium · CSPI", alternatif: "Taze asma yaprağı (mevsiminde), ev sarma", arar: ["Konserve Asma Yaprağı", "Salamura Yaprak"] },

 "KÜTÜK SUYU EVE": { ad: "Ağaç Suyu Pazarlanan İçecekler (Pazarlama Trendi)", kat: "Sahte Doğal", risk: "yuksek", organlar: ["Pankreas"], etki: "Akçaağaç suyu, huş suyu pazarlanır ama %5 gerçek + şeker + asit + sentetik aroma.", kaynak: "CSPI · WHO Şeker · BEUC", alternatif: "Saf su, taze sıkma", arar: ["Akçaağaç Suyu", "Huş Suyu", "Birch Water"] },

 "DOMATES KURUSU": { ad: "Yağlı Endüstriyel Kuru Domates", kat: "İşlenmiş Sebze", risk: "orta", organlar: ["Tansiyon"], etki: "Kuru domates + soya yağı + tuz + sirke + koruyucu (E211). Aşırı sodyum.", kaynak: "EFSA · CSPI · WHO Sodium", alternatif: "Doğal güneşte kurutulmuş domates", arar: ["Yağlı Kuru Domates", "Sundried Tomato"] },

 "AROMA ATEŞ FUMÉ": { ad: "Sıvı Tütsü Aroması (PAH Kanserojen Kaynak)", kat: "Aroma Karışımı", risk: "yuksek", organlar: ["Kanser", "Karaciğer"], etki: "Yapay tütsü aroması PAH (polisiklik aromatik) içerir. IARC Grup 2A kanserojen.", kaynak: "IARC Vol 92 PAH · EFSA · WHO", alternatif: "Doğal füme, ev pişirme", arar: ["Sıvı Tütsü", "Smoke Liquid"] },

 "SU SERTLEŞTIRICI HEALTH": { ad: "Sertleştirici Maden Suyu (Yüksek Sodyum)", kat: "İşlenmiş Maden Suyu", risk: "yuksek", organlar: ["Tansiyon"], etki: "Bazı maden sularında 1g+ sodyum/litre. Tansiyon hastaları için tehlikeli. Etiketi okumak şart.", kaynak: "WHO Sodium · EFSA · Türk Tabipler Birliği", alternatif: "Düşük sodyumlu maden suyu, saf su", arar: ["Sertleştirici Maden Suyu", "Yüksek Sodyum Maden"] },

 "AYRAN TUZLU PROBIYOTIK": { ad: "Aşırı Tuzlu Ayran (Yüksek Sodyum)", kat: "İşlenmiş Ayran", risk: "yuksek", organlar: ["Tansiyon"], etki: "Hazır marka ayranlarda 0.8-1g tuz/250ml. Günde 2 bardak = WHO sodyum sınırı.", kaynak: "WHO Sodium · Türk Tabipler Birliği · TGK", alternatif: "Ev ayranı (az tuz)", arar: ["Tuzlu Ayran", "Yüksek Sodyum Ayran"] },

 "ŞIŞEDE OYUNCAK": { ad: "Ürün İçinde Oyuncak (Boğulma Riski - Kinder)", kat: "Çocuk Hedefli Tehlike", risk: "kritik", organlar: ["Boğulma", "Yutma"], etki: "Avrupa Kinder Sürpriz tarzı oyuncaklı şekerlemeler defalarca geri çağırıldı (boğulma ölümleri).", kaynak: "AB RASFF 2022-2024 · BEUC · Türk Pediatri", alternatif: "Sade tatlı, ayrı oyuncak", arar: ["Oyuncaklı Şekerleme", "Yumurta Oyuncak"] },

 "BLUEBERRY MUFFIN SAHTE": { ad: "Yaban Mersini Muffin (Yapay Yaban Mersini Bitleri)", kat: "Sahte Meyveli Tatlı", risk: "yuksek", organlar: ["Pankreas"], etki: "Gerçek yaban mersini pahalı. Muffinlerdeki 'yaban mersini' boya + nişasta + aroma + şeker birleşimi parçacık.", kaynak: "CSPI Blueberry · FDA · BEUC", alternatif: "Taze yaban mersini, ev muffin", arar: ["Yaban Mersini Muffin", "Blueberry Bits"] },

 "CITY HONEY URBAN": { ad: "Şehir Bal (Trafik PAH + Pestisit Kalıntısı)", kat: "Kontaminasyon Riski", risk: "orta", organlar: ["Kanser", "Karaciğer"], etki: "Şehir merkezinde üretilen bal trafik PAH ve pestisit kalıntısı içerebilir. Kırsal bal daha güvenli.", kaynak: "EFSA 2008 PAH · IARC Vol 92 · Greenpeace", alternatif: "Kırsal organik bal, dağ balı", arar: ["Şehir Bal", "Urban Honey"] },

 "DAR LIK SARI KOLA": { ad: "Sarı Kola / Limon-Lime Gazoz (E102 Tartrazin)", kat: "Şekerli Gazoz", risk: "kritik", organlar: ["Pankreas", "Sinir Sistemi", "Diş"], etki: "Şeker bombası + tartrazin (E102 - sarı 5, hiperaktivite) + asit + kafein. Mountain Dew, Yedigün.", kaynak: "Southampton 2007 · WHO Şeker · CSPI · Türk Diş Hekimleri", alternatif: "Su, maden suyu + limon", arar: ["Sarı Kola", "Mountain Dew", "Yedigün"] },

 "ALKOL FREE WINE": { ad: "Alkolsüz Şarap (Şeker + Aroma Eklemeli)", kat: "İşlenmiş İçecek", risk: "yuksek", organlar: ["Pankreas"], etki: "Alkol çıkarmak için ısıl işlem + tat için şeker + sentetik aroma + sülfit eklenmiş.", kaynak: "EFSA Sülfit · WHO · CSPI", alternatif: "Üzüm suyu (saf), su", arar: ["Alkolsüz Şarap", "Non Alcoholic Wine"] },

 "PROBIYOTIK ÇUBUK KÜLTÜR": { ad: "Probiyotik İçeceği (Yakult, Activia İçecek)", kat: "Şekerli Probiyotik", risk: "yuksek", organlar: ["Pankreas", "Bağırsak"], etki: "Süt + tek tür bakteri + %70 şeker + aroma. Probiyotik etkisi şeker karşısında kaybolur.", kaynak: "JAMA 2019 · CSPI · WHO Şeker · BEUC", alternatif: "Ev kefiri, sade kombuça", arar: ["Yakult", "Activia İçecek", "Probiyotik İçecek"] },

 "KEKIK PUDRA": { ad: "Kekik Pudra (Eski Stok + Karışım Hilesi)", kat: "İşlenmiş Baharat", risk: "orta", organlar: ["Bağışıklık"], etki: "Türkiye Ege bölgesi kekik pahalı. Karışım hile: eski stok + yaprak parçaları + sentetik aroma.", kaynak: "TGK · Tarım Bakanlığı Hile · TKHK", alternatif: "Yerli organik dağ kekiği (Datça, Bodrum)", arar: ["Kekik Tozu", "Oregano Powder"] },

 "ALMAN TOST EKMEĞI": { ad: "Alman Tipi Tost Ekmeği (Endüstriyel)", kat: "İşlenmiş Ekmek", risk: "yuksek", organlar: ["Pankreas", "Kalp"], etki: "Beyaz un + palmiye + L-sistein + emülgatör + uzun raf ömrü için koruyucu. Uno, Ülker tost.", kaynak: "CSPI · WHO · TGK", alternatif: "Geleneksel ekmek, taze fırın", arar: ["Alman Tipi Ekmek", "Tost Ekmeği Endüstri"] },

 "TARAMA HAZIR PINK": { ad: "Hazır Tarama Mezé (Boyalı Pembe + Soya Yağı)", kat: "İşlenmiş Mezé", risk: "yuksek", organlar: ["Tansiyon", "Bağırsak"], etki: "Balık yumurtası %15 + soya yağı + sirke + tartrazin (E102) + pembe boya (E124 ponceau). Çocuk hiperaktivite.", kaynak: "Southampton 2007 · CSPI · TGK · TKHK", alternatif: "Geleneksel tarama (ev yapımı)", arar: ["Hazır Tarama Pembe", "Pink Tarama"] },

 "DONDURULMUS BEZELYE PALM": { ad: "Donmuş Bezelye/Mısır (Şekerli + Tuzlu)", kat: "İşlenmiş Donmuş Sebze", risk: "orta", organlar: ["Pankreas", "Tansiyon"], etki: "Bazı donmuş bezelyelere şeker + tuz + askorbik asit + sülfit (renk koruma) eklenir.", kaynak: "EFSA · CSPI · TGK", alternatif: "Taze veya sade donmuş sebze (etiket kontrol)", arar: ["Donmuş Bezelye", "Donmuş Mısır"] },

 "ANTI BAKTERIYEL SABUN": { ad: "Antibakteriyel Sabun (Triclosan + Triklokarban)", kat: "Kişisel Bakım", risk: "kritik", organlar: ["Hormon", "Antibiyotik Direnci"], etki: "FDA 2016'da yasakladı (etkili kanıt yok + hormon bozucu + antibiyotik direnci). AB sınırladı.", kaynak: "FDA 2016 Triclosan · ECHA · Türkiye Eczacılar Birliği", alternatif: "Saf sabun + su, kastil sabun", arar: ["Antibakteriyel Sabun", "Triclosan"] },

 "DETERJAN BEYAZ KÖPÜK SLES": { ad: "SLES İçeren Köpüklü Ürünler (1,4-Dioksan)", kat: "Kişisel Bakım", risk: "yuksek", organlar: ["Cilt", "Kanser"], etki: "SLES üretiminde 1,4-dioksan oluşur. IARC Grup 2B muhtemel kanserojen. Şampuan, duş jeli, sıvı sabun.", kaynak: "IARC Vol 71 1,4-Dioksan · EWG · ANSES", alternatif: "SLES-free sabun, doğal sürfaktan", arar: ["SLES", "Sodyum Laureth Sülfat"] },

 "BORE KOZMETIK TÜRK": { ad: "Türk Kozmetik Markaları (Ucuz Hammadde Riski)", kat: "Kozmetik", risk: "yuksek", organlar: ["Cilt", "Hormon"], etki: "Düşük fiyatlı yerli markaların bazıları ucuz hammadde, ağır metal kontaminasyonu raporları (Çin/Hindistan ithal).", kaynak: "Türkiye Sağlık Bakanlığı Kozmetik · BEUC · EWG", alternatif: "Sertifikalı organik, ECOCERT etiketli", arar: ["Türk Kozmetik", "Ucuz Kozmetik"] },

 "KURUYEMIS KIBE KOZAYAĞ": { ad: "Karışık Kuruyemiş (Kavurma Yağı + Tuz Yüklü)", kat: "İşlenmiş Kuruyemiş", risk: "yuksek", organlar: ["Tansiyon", "Kalp", "Bağırsak"], etki: "Palmiye yağında kavrulmuş + ağır tuz + bazen MSG. Akrilamid yüksek (yüksek ısı).", kaynak: "EFSA Akrilamid · WHO · CSPI · Türkiye Beslenme Diyet", alternatif: "Çiğ veya hafif kavrulmuş kuruyemiş", arar: ["Karışık Kuruyemiş", "Cerez"] },

 "İRMIK HELVASI HAZIR": { ad: "Endüstriyel İrmik Helvası (Margarin + HFCS)", kat: "Ultra İşlenmiş Tatlı", risk: "kritik", organlar: ["Pankreas", "Kalp"], etki: "Geleneksel tereyağı + un + şeker + süt yerine margarin + irmik + HFCS şerbet. Ülker, Eti.", kaynak: "TGK · WHO · CSPI", alternatif: "Geleneksel ev helvası", arar: ["İrmik Helvası", "Hazır İrmik Helvası"] },

 "MEYVE LIMONATA RESTORAN": { ad: "Restoran Şekerli Limonata/Şerbet (Aşırı Şeker)", kat: "Şekerli İçecek", risk: "yuksek", organlar: ["Pankreas", "Diş"], etki: "Sade ev limonatası 25g şeker. Restoran limonatası 60-80g (10+ küp). Etiketsiz.", kaynak: "WHO Şeker · CSPI · Türk Diş Hekimleri Birliği", alternatif: "Sade su, ev şekersiz limon", arar: ["Restoran Limonata", "Restoran Şerbet"] },

 "PALM ZEYTIN HILE": { ad: "Sahte Zeytinyağlı Konserveler (Aslında Palm Yağ)", kat: "Sahte Premium", risk: "yuksek", organlar: ["Kalp", "Karaciğer"], etki: "'Zeytinyağında' diye satılan konserveler genelde soya/ayçiçek/palmiye yağı içerir.", kaynak: "TGK · Tarım Bakanlığı Hile · TKHK · UC Davis", alternatif: "Sertifikalı zeytinyağı konserve, cam kavanoz", arar: ["Zeytinyağlı Konserve", "Sahte Olive Oil Can"] },

 "RAHAT NEFES ICKI": { ad: "Sigara Yerine 'Bitki' Karışım Ürünleri (Tütünsüz)", kat: "Tütün Alternatifi", risk: "kritik", organlar: ["Akciğer", "Kanser"], etki: "Tütünsüz ama hala IARC Grup 1 kanserojen (yanma+inhalasyon). 'Bitkisel' diye güvenli görülmemeli.", kaynak: "IARC · WHO Tobacco · Türk Tabipler Birliği", alternatif: "Sigarayı bırak, nikotin replacement (doktor)", arar: ["Tütünsüz Sigara", "Bitki Sigara"] },

 "TUZLU TURŞU SODYUM": { ad: "Endüstriyel Salatalık Turşusu (10g+ Sodyum)", kat: "İşlenmiş Sebze", risk: "kritik", organlar: ["Tansiyon", "Böbrek"], etki: "Tek küçük kavanoz 10g+ sodyum. WHO günlük 5g sınırı 2x aşıyor. Tarom, Tat, Tamek.", kaynak: "WHO Sodium · CSPI · TGK · Türk Tabipler Birliği", alternatif: "Az tuzlu ev turşusu (fermente)", arar: ["Tuzlu Turşu", "Salatalık Turşusu Endüstri"] },

 "BAYAR EFERVESAN VITAMIN": { ad: "Efervesan Multivitamin (Sodyum Bombası)", kat: "Sentetik Takviye", risk: "yuksek", organlar: ["Tansiyon", "Böbrek"], etki: "Tek tabletta 300mg+ sodyum + sentetik vitamin + aspartam + asesülfam. Hipertansif için tehlikeli.", kaynak: "Türkiye Eczacılar Birliği · NEJM Multivitamin · NIH ODS", alternatif: "Doğal beslenme, doktor reçeteli vitamin", arar: ["Efervesan Multivitamin", "Efervesan C"] },

 "POLIESTER TEKSTIL": { ad: "Polyester Spor Kıyafetleri (PFAS + Mikroplastik)", kat: "Tekstil Kimyasalı", risk: "yuksek", organlar: ["Cilt", "Hormon"], etki: "Polyester + PFAS antimikrobiyal kaplama + ftalat + boya. Cilde değer, yıkamada mikroplastik salar.", kaynak: "EWG Tekstil · IARC PFOA · Greenpeace · BEUC", alternatif: "Organik pamuk, doğal lif", arar: ["Polyester Kıyafet", "Spor Tekstil"] },
 "POLYESTER UYKU PIJAMA": { ad: "Polyester Çocuk Pijamaları (Alev Geciktirici PBDE)", kat: "Tekstil Kimyasalı", risk: "kritik", organlar: ["Hormon", "Beyin"], etki: "Polibromlu difenil eter (PBDE) hormon bozucu, çocuk gelişimini bozar. AB sınır koydu.", kaynak: "EWG PBDE · IARC · ANSES · Türk Pediatri", alternatif: "Pamuk pijama, organik sertifikalı", arar: ["Polyester Pijama", "Çocuk Pijama"] },
 "SOMUN EKMEK MIKROPLAST": { ad: "Marketten Açık Satılan Somun Ekmek (Mikroplastik)", kat: "Plastik Ambalaj", risk: "yuksek", organlar: ["Bağırsak", "Hormon"], etki: "Plastik ambalajda saklanan ekmek mikroplastik salar. Açıkta saatlerce kalan ekmek tozlu hava.", kaynak: "WHO Mikroplastik · WHO Food Safety · BEUC", alternatif: "Kağıt poşette, geleneksel fırın", arar: ["Paketli Somun Ekmek"] },

 "VITAMINLI ÇOCUK MAYO": { ad: "'Vitamin Eklenmiş' Çocuk Mayonezi (Pazarlama)", kat: "Sahte Sağlıklı", risk: "yuksek", organlar: ["Kalp", "Karaciğer"], etki: "Mayonez + sentetik vitamin = 'sağlıklı' yalanı. Hala soya yağı + EDTA + paraben.", kaynak: "CSPI · BEUC · Türk Pediatri", alternatif: "Ev mayonezi", arar: ["Vitaminli Mayonez", "Çocuk Mayonez"] },

 "PROTEIN ICECEK MARKETING": { ad: "Hazır Protein İçeceği (Tetra Pak - Whey + Süt)", kat: "Ultra İşlenmiş", risk: "yuksek", organlar: ["Böbrek", "Bağırsak"], etki: "Whey + maltodekstrin + sukraloz + asesülfam + soya proteini + aroma. 20+ bileşen.", kaynak: "BMJ UPF · CSPI · NIH ODS", alternatif: "Süt + muz + yumurta (ev)", arar: ["Hazır Protein İçecek", "Protein Drink"] },

 "ÇIKOLATA SUKRALOZ DIYABET": { ad: "Şekersiz Diyabet Çikolatası (Sukraloz + Maltitol)", kat: "Sahte Diyet", risk: "yuksek", organlar: ["Bağırsak", "Beyin"], etki: "Maltitol gaz ve ishal yapar. Sukraloz bağırsak florası bozar. 'Diyabetik' pazarlama.", kaynak: "Nature 2014 Suez · IARC 2023 Aspartam · CSPI", alternatif: "Bitter çikolata az miktar", arar: ["Şekersiz Çikolata", "Diyabet Çikolata"] },

 "DETERJAN ECOMARK YEŞIL": { ad: "Sahte 'Çevre Dostu' Deterjanlar (Greenwashing)", kat: "Pazarlama Yalanı", risk: "yuksek", organlar: ["Cilt", "Hormon"], etki: "'Eco', 'Green', 'Doğal' etiketi takılı ama hala paraben + parfüm + SLES içerir.", kaynak: "EWG Greenwashing · BEUC · Greenpeace", alternatif: "Sertifikalı (EU Ecolabel) deterjan, ev sabunu", arar: ["Eco Deterjan", "Doğal Deterjan"] },

 "KIYMA HINDISTANEN": { ad: "Sahte Dana Kıyma (At/Domuz Karışım)", kat: "Et Hilesi", risk: "kritik", organlar: ["Bağışıklık", "Bağırsak"], etki: "AB 2013 at eti skandalı: dana diye satılan kıymalarda at + domuz tespit. Türkiye'de de risk.", kaynak: "AB 2013 At Eti Skandalı · TKHK · Tarım Bakanlığı Hile · TÜTEDER", alternatif: "Kasaptan görerek alma, tek parça kıyma", arar: ["Sahte Dana Kıyma", "Karışık Kıyma At"] },

 "MAYONEZ YOGURT MOBILE": { ad: "Yoğurtlu Mayonez (Sahte Hafif Sos)", kat: "Sahte Light Sos", risk: "yuksek", organlar: ["Bağırsak"], etki: "%30 yoğurt + %70 soya yağı + sirke + nişasta + sentetik aroma. 'Yoğurtlu' pazarlama.", kaynak: "CSPI · TGK · BEUC", alternatif: "Saf yoğurt sos (ev), tahin sos", arar: ["Yoğurtlu Mayonez", "Yogurt Mayo"] },

 "DESEN BEYAZ KEK": { ad: "Pastane Yaş Pasta (Margarin Krem + Aroma)", kat: "Ultra İşlenmiş", risk: "kritik", organlar: ["Kalp", "Pankreas", "Damar"], etki: "Süt kreması yerine margarin krem (trans yağ) + sentetik aroma + renklendirici + ucuz çikolata.", kaynak: "WHO Trans · CSPI · Southampton 2007", alternatif: "Ev yaş pasta (gerçek krema)", arar: ["Pastane Pasta", "Yaş Pasta Endüstri"] },

 "ŞARAP ŞIŞELER OYUNCAK PARTI": { ad: "Çocuklara Verilen Yumuşak İçecek Şişeler (Şeker)", kat: "Çocuk Hedefli", risk: "yuksek", organlar: ["Pankreas", "Diş"], etki: "Çocuk parti malzemeleri arasında yumuşak içecek şişeleri = şeker bombası + boyalar.", kaynak: "WHO · CSPI · Türk Diş Hekimleri Birliği · Türk Pediatri", alternatif: "Su, taze meyve suyu", arar: ["Çocuk Şekerli İçecek", "Parti İçecekleri"] },

 "MEYVE LIKÖR FRESH ICE": { ad: "Buzlu Cocktail Karışımları (Aroma + Şeker)", kat: "İşlenmiş Alkollü", risk: "yuksek", organlar: ["Karaciğer", "Pankreas"], etki: "Alkol + HFCS + sentetik aroma + renklendirici. Kaliteli kokteyl değil.", kaynak: "WHO Alkol · CSPI · Southampton 2007", alternatif: "Ev kokteyli, taze meyve", arar: ["Buzlu Kokteyl", "Frozen Cocktail"] },

 "HAVUTU CAY GÜLLÜ": { ad: "Aromalı Bitki Çayları (Gül, Lavanta - Hazır)", kat: "İşlenmiş Bitki Çayı", risk: "orta", organlar: ["Karaciğer"], etki: "Gerçek bitki %5, ucuz dolgu + sentetik aroma + sitrik asit. Pickwick, Yellow Label aromalı.", kaynak: "CSPI · EFSA · BEUC", alternatif: "Saf kuru gül/lavanta", arar: ["Gül Çayı", "Lavanta Çayı"] },

 "ALMOND ÇOC PIZZA": { ad: "Çocuk Hazır Pizza (Şekerli Hamur + Analog Peynir)", kat: "Çocuk Hedefli Ultra İşlenmiş", risk: "kritik", organlar: ["Pankreas", "Kalp", "Bağırsak"], etki: "Çocuk hedefli pazarlama. Şekerli hamur + analog peynir + işlenmiş et + 3g+ tuz.", kaynak: "WHO Sodium · CSPI · Türk Pediatri · BEUC", alternatif: "Ev pizzası, taze malzeme", arar: ["Çocuk Pizza", "Mini Pizza"] },

 "PROTEIN OAT EZME": { ad: "Hazır Protein Ezmesi/Yulaf Karışım Tüp", kat: "Ultra İşlenmiş", risk: "yuksek", organlar: ["Pankreas", "Bağırsak"], etki: "Yulaf + whey + şeker alkolü + palmiye + sentetik aroma + 15+ bileşen.", kaynak: "BMJ UPF · CSPI", alternatif: "Sade yulaf + yoğurt + meyve", arar: ["Protein Oat Tüp", "Yulaf Ezmesi Protein"] },

 "ÇIKOLATA SUR PRIZE MARKET": { ad: "İndirim Marketleri Ucuz Çikolatalar (Şok, A101)", kat: "Düşük Kalite Çikolata", risk: "yuksek", organlar: ["Pankreas", "Kalp"], etki: "Kakao yağı yerine palmiye + ucuz aroma + bol şeker. Hammadde standardı düşük.", kaynak: "Türkiye Tarım Bakanlığı Çikolata · TKHK · Greenpeace", alternatif: "%70+ kakao bitter, sertifikalı", arar: ["Şok Çikolata", "A101 Çikolata", "BIM Çikolata"] },

 "ŞAMPANYA ÇOCUK KUTLAMA": { ad: "Çocuk Şampanya / Gazoz (Yetişkin Taklit)", kat: "Çocuk Hedefli", risk: "yuksek", organlar: ["Pankreas", "Diş"], etki: "Alkolsüz şampanya pazarlanan çocuk gazoz. Şeker bombası + boyalar + asit.", kaynak: "WHO · CSPI · Türk Pediatri", alternatif: "Su, taze meyve", arar: ["Çocuk Şampanya", "Çocuk Gazoz Lüks"] },

 "MARJORAN MEKSIKA HAZIR": { ad: "Aroma Karışımları (Meksikan, Kebab, Pizza Karışım)", kat: "İşlenmiş Aroma", risk: "yuksek", organlar: ["Tansiyon", "Bağışıklık"], etki: "Sentetik baharat aroması + sodyum + MSG + nişasta + sentetik renk. 'Otantik' yalan.", kaynak: "CSPI · WHO Sodium · TGK", alternatif: "Tek tek taze baharat (ev karışım)", arar: ["Aroma Karışımı", "Spice Mix"] },

 "ATOL DUNYA ŞEKER PAKET": { ad: "Yurt Dışı İthal Şekerler (Tüm AB Yasaklı Boyalar)", kat: "İthal Şekerleme", risk: "kritik", organlar: ["Sinir Sistemi", "Pankreas"], etki: "ABD/Asya'dan ithal şekerlerde AB'nin yasakladığı boyalar (Red 3, Yellow 5) bulunur.", kaynak: "AB Reg 1333/2008 · Southampton 2007 · CSPI · BEUC", alternatif: "AB sertifikalı şekerleme, doğal", arar: ["İthal Şekerleme", "ABD Şekerleme"] },
 "BUYUK PASTAS SECONDA": { ad: "Doğum Günü Pastaları (Restoran/Pastane)", kat: "Ultra İşlenmiş Tatlı", risk: "kritik", organlar: ["Pankreas", "Kalp"], etki: "Margarin krem + fondan + sentetik aroma + tüm boyalar + bol şeker. Tek dilim 30g+ şeker.", kaynak: "WHO · CSPI · Türk Diş Hekimleri · Southampton 2007", alternatif: "Ev pastası, taze meyve süslü", arar: ["Doğum Günü Pastası", "Pastane Pastası Süslü"] },
 "SHAKE KOLA": { ad: "Kolalı Milkshake (Cola + Süt + Şeker)", kat: "Şekerli İçecek", risk: "kritik", organlar: ["Pankreas", "Diş"], etki: "Kola + süt + krema + şeker = 70-80g şeker tek bardakta. Sodyumlu + fosforik asit.", kaynak: "WHO Şeker · CSPI · Türk Tabipler Birliği", alternatif: "Sade süt, ev şekersiz içecek", arar: ["Cola Milkshake", "Kola Shake"] },

 "HAYVAN MAMA UÇUZ ATIŞTIRMA": { ad: "Ucuz Köpek Atıştırmalık (Boya + Glikoz)", kat: "Hayvan Atıştırmalık", risk: "yuksek", organlar: ["Köpek Sağlığı"], etki: "Tahıl + glikoz + sentetik et aroması + boya + BHA/BHT. Köpek için doğal değil.", kaynak: "Türk Veteriner Hekimleri Birliği · FDA Pet Food", alternatif: "Doğal et bazlı, kurutulmuş", arar: ["Köpek Atıştırmalık", "Köpek Mama Ucuz"] },

 "GIDA PALM ZINCIR": { ad: "İndirim Marketleri Ucuz Süt Ürünleri (ŞOK, A101)", kat: "Düşük Kalite Süt", risk: "yuksek", organlar: ["Bağırsak", "Kalp"], etki: "Süt yerine süt tozu + palmiye + nişasta + emülgatör. Etiket okumadan alım riski.", kaynak: "TGK · Tarım Bakanlığı · TKHK", alternatif: "Yerel mandıra, çiftlik sütü", arar: ["Şok Süt", "A101 Süt", "BIM Süt"] },
 "KAHVE FILTRESI ÇIN": { ad: "Çin İthal Tek Kullanım Kahve Filtresi (Klor)", kat: "Filtreleme", risk: "orta", organlar: ["Hormon", "Bağışıklık"], etki: "Beyaz klorla ağartılır, dioksin kalıntısı sıcak suyla kahveye geçer. IARC Grup 1.", kaynak: "IARC Vol 69 Dioksin · WHO 2016 · ECHA", alternatif: "Kahverengi (klorsuz) filtre, metal filtre", arar: ["Beyaz Kahve Filtresi", "Klor Filtre"] },

 "TEFLON KEK KALIBI": { ad: "Yapışmaz Kek Kalıbı (PFOA/PFOS)", kat: "Mutfak Plastiği", risk: "kritik", organlar: ["Hormon", "Karaciğer", "Kanser"], etki: "PFOA Grup 1 kanserojen (IARC 2023). Sıcakta toksin salar. Çizilmiş kalıplar daha tehlikeli.", kaynak: "IARC 2023 PFOA · EWG · EPA 2024", alternatif: "Cam kalıp, paslanmaz çelik, seramik", arar: ["Yapışmaz Kek Kalıbı", "Teflon Tepsi"] },

 "TUVALET KIBET HOZASI": { ad: "Tuvalet Kâğıdı (Klor + PFAS + Geri Dönüşüm)", kat: "Kişisel Bakım", risk: "yuksek", organlar: ["Cilt", "Hormon"], etki: "Klorla ağartma + PFAS + geri dönüşüm BPA kalıntısı. Hassas cilde değer.", kaynak: "EWG 2023 Tuvalet Kağıdı · IARC PFOA · ECHA", alternatif: "Klorsuz, bambu, PFAS-free", arar: ["Tuvalet Kağıdı"] },
 "PEÇETE BEYAZ KLOR": { ad: "Klorla Beyazlatılmış Peçeteler (Dioksin)", kat: "Kişisel Bakım", risk: "orta", organlar: ["Hormon"], etki: "Beyaz peçete klorla ağartılır, dioksin kalıntısı yiyeceğe temas eder.", kaynak: "IARC Vol 69 Dioksin · WHO · BEUC", alternatif: "Klorsuz, kahverengi peçete", arar: ["Beyaz Peçete", "Klor Peçete"] },

 "MEYVE SUYU PASTOR KKB": { ad: "Pastörize Edilmiş %100 Meyve Suyu (Besin Kaybı)", kat: "İşlenmiş Meyve Suyu", risk: "yuksek", organlar: ["Pankreas", "Diş"], etki: "Yüksek ısı pastörizasyonla C vitamini ve antosiyanin kaybedilir. Hala şeker yüklü.", kaynak: "CSPI Juice · WHO · TGK", alternatif: "Taze sıkılmış (içme öncesi)", arar: ["Pastörize Meyve Suyu", "100% Juice"] },

 "RENK SIVISI KEK": { ad: "Sıvı Gıda Renklendiriciler (Çocuk Mutfak)", kat: "Sentetik Boya", risk: "kritik", organlar: ["Sinir Sistemi", "Bağırsak"], etki: "E102, E110, E122, E129, E133 sıvı formda. Çocuk pasta yapımında. Hiperaktivite.", kaynak: "Southampton 2007 · CSPI · Türk Pediatri", alternatif: "Doğal renklendirici (pancar, ıspanak, zerdeçal)", arar: ["Sıvı Gıda Boyası", "Food Color"] },

 "REKLAM JUNK YOĞURT": { ad: "Reklamlı Çocuk Yoğurt Markaları (Sütaş Çocuk, Activia Mini)", kat: "Çocuk Hedefli Şekerli", risk: "kritik", organlar: ["Pankreas", "Diş"], etki: "Yetişkin yoğurttan 2-3x şeker. Yapay aroma + renk + karra. Çocuk hedefli reklam.", kaynak: "WHO Çocuk Pazarlama · CSPI · Türk Pediatri Kurumu · UNICEF", alternatif: "Sade yoğurt + taze meyve püresi", arar: ["Sütaş Çocuk Yoğurt", "Activia Mini", "Çocuk Yoğurt Reklam"] },

 "KIYMA MAKINESI HAZIR ET": { ad: "Sokak Köfteci Karışık Et (Hijyen + Karışım)", kat: "Sokak Yemek", risk: "kritik", organlar: ["Bağırsak", "Bağışıklık", "Mide"], etki: "Sokak köftecisi: karışık et + soya + sodyum + soğuk zincir sorunu + tozlu hava + tekrar kullanılmış yağ.", kaynak: "WHO Food Safety · Türk Tabipler Birliği", alternatif: "Kapalı kasap, ev köftesi", arar: ["Sokak Köftecisi", "Köfteci Köfte"] },

 "KIRMIZI KOLA SAVAŞAN": { ad: "Yerli Kola Markaları (Cola Turka, Bizim Kola)", kat: "Şekerli Gazoz", risk: "kritik", organlar: ["Pankreas", "Diş", "Kemik"], etki: "Coca-Cola taklidi yerli versiyonlar. Aynı içerik: HFCS + fosforik asit + karamel + kafein.", kaynak: "CSPI Soda · WHO · Türk Diş Hekimleri", alternatif: "Maden suyu, su", arar: ["Cola Turka", "Bizim Kola", "Yerli Kola"] },

 "ATIŞTIRMA SOSU SUKRALOZ": { ad: "Diyabet Atıştırmalık (Sukraloz + Maltitol Bombası)", kat: "Sahte Diyet", risk: "yuksek", organlar: ["Bağırsak", "Beyin"], etki: "Sukraloz + maltitol + sorbitol = gaz, ishal, bağırsak florası bozulması. Diabet için bile uygun değil.", kaynak: "Nature 2014 Suez · CSPI · ADA Diyabet · Türkiye Diyetisyenler", alternatif: "Doğal beslenme, az miktar hurma", arar: ["Diyabet Atıştırmalık", "Şekersiz Atıştırmalık"] },

 "TOZ SUNI MAYA": { ad: "Endüstriyel Hızlı Maya (Kabartma Tozu - E500)", kat: "Mayalama Maddesi", risk: "orta", organlar: ["Bağırsak", "Mineral"], etki: "Geleneksel maya yerine sodyum bikarbonat + alüminyum (E541 SAS - alüminyum içerir).", kaynak: "EFSA E541 Alüminyum · WHO Alüminyum", alternatif: "Doğal ekşi maya, sodyum bikarbonat (alüminyumsuz)", arar: ["Kabartma Tozu", "Pasta Mayası"] },

 "PROBIYOTIK ŞAMPUAN HARI": { ad: "Probiyotik Şampuan (Pazarlama)", kat: "Sahte Sağlık Kozmetik", risk: "orta", organlar: ["Cilt"], etki: "'Probiyotik' eklenmiş şampuan ama hala SLS + paraben + parfüm. Etkili etkisi kanıtsız.", kaynak: "EWG · ANSES · BEUC", alternatif: "Doğal şampuan, kastil sabun", arar: ["Probiyotik Şampuan", "Probiotic Shampoo"] },

 "BIRA SHEY MARK NESTLE": { ad: "Mark Karışım Bira / Cocktail (Endüstriyel)", kat: "Alkollü İçecek", risk: "yuksek", organlar: ["Karaciğer", "Pankreas"], etki: "Bira + meyve aroması + şeker + sentetik renk. Genç hedefli pazarlama. WHO alkol Grup 1.", kaynak: "WHO Alkol · CSPI · Türk Tabipler Birliği", alternatif: "Alkolsüz, doğal", arar: ["Karışım Bira", "Cocktail Bira"] },

 "FAST FOOD KAHVALTI": { ad: "Fast Food Kahvaltı Menüsü (McMuffin, Burger King Croissan)", kat: "Ultra İşlenmiş", risk: "kritik", organlar: ["Kalp", "Pankreas"], etki: "Endüstriyel hamur + analog peynir + işlenmiş et (jambon) + yumurta + bol sodyum.", kaynak: "CSPI Fast Food Breakfast · WHO · BMJ UPF", alternatif: "Ev kahvaltısı, taze malzeme", arar: ["McMuffin", "Fast Food Kahvaltı", "Burger King Kahvaltı"] },

 "ÇORBA HAZIR SIVI": { ad: "Tetra Pak Hazır Çorba (Sıvı)", kat: "Ultra İşlenmiş", risk: "yuksek", organlar: ["Tansiyon", "Bağırsak"], etki: "Toz çorbadan biraz daha az MSG ama hala sodyum + palmiye + ucuz sebze. 'Hazır' diye satılır.", kaynak: "CSPI · WHO Sodium · TGK", alternatif: "Ev çorbası (taze)", arar: ["Hazır Sıvı Çorba", "Tetra Pak Çorba"] },

 "RECEL FUNCTIONAL BIO": { ad: "'Functional' Reçeller (Probiyotik/Vitamin Eklemeli)", kat: "Sahte Sağlıklı", risk: "yuksek", organlar: ["Pankreas"], etki: "Reçele probiyotik veya vitamin eklenir, 'sağlıklı' satılır. Hala şeker bombası.", kaynak: "CSPI · BEUC · WHO", alternatif: "Ev reçeli, taze meyve", arar: ["Fonksiyonel Reçel", "Probiyotik Reçel"] },

 "EVDE ŞIK SOSLAR İKİZ": { ad: "Konsantre 'Şef Sos' Karışımları (Restoran Kalitesi)", kat: "İşlenmiş Sos", risk: "yuksek", organlar: ["Tansiyon", "Sinir"], etki: "Şef yapımı diye pazarlanır ama içeride MSG + sodyum bombası + maltodekstrin + boyalar.", kaynak: "CSPI · WHO Sodium · TKHK", alternatif: "Ev sos, taze malzeme", arar: ["Şef Sos", "Concentrate Sauce"] },

 "ORGANIK ETIKETLI HILE": { ad: "Sahte 'Organik' Sertifikalı Ürünler", kat: "Sahte Sertifikasyon", risk: "yuksek", organlar: ["Hormon", "Bağırsak"], etki: "Türkiye'de yaygın hile: organik etiket var ama sertifika sahte/eski. Etiket okuma şart.", kaynak: "Tarım Bakanlığı Organik · TKHK · Greenpeace · Türkiye Tüketici Hakları Derneği", alternatif: "Bilinen sertifika kuruluşları (ECOCERT, IMO), bilinen üretici", arar: ["Sahte Organik", "Organik Etiket Hilesi"] },

 "GLOBAL VEGAN BIO": { ad: "'Bio Vegan' Ultra İşlenmiş Ürünler", kat: "Sahte Sağlıklı", risk: "yuksek", organlar: ["Bağırsak", "Hormon"], etki: "'Bio' + 'vegan' + 'organik' etiketleri yan yana = pazarlama. İçeride 20+ bileşen kalır.", kaynak: "BMJ UPF · CSPI · BEUC · Greenpeace", alternatif: "Tek malzeme, sertifikalı, ev yapımı", arar: ["Bio Vegan", "Organik Vegan"] },

 "SUKROZ SİRUP CÖKME": { ad: "Toz Şekerli Hazır Drinks (Stick Pack Şeker)", kat: "Şekerli Toz İçecek", risk: "kritik", organlar: ["Pankreas", "Diş"], etki: "Suyukadın tarzı stick paket içecekler: sakaroz + maltodekstrin + asit + aroma + boya. Sadece şeker.", kaynak: "WHO Şeker · CSPI · Türk Diş Hekimleri", alternatif: "Su + taze meyve", arar: ["Toz İçecek Stick", "Stick Drink"] },

 "VEGAN ICE TEA HFCS": { ad: "Aromalı Buzlu Yeşil Çay (HFCS + Sukraloz Karışım)", kat: "Şekerli Çay İçeceği", risk: "kritik", organlar: ["Pankreas", "Bağırsak"], etki: "Yeşil çay özü + HFCS + sukraloz + sitrik asit + aroma + sodyum benzoat. Coca-Cola Honest, Lipton.", kaynak: "CSPI · WHO · Nature 2014", alternatif: "Sade yeşil çay (ev demli)", arar: ["Aromalı Yeşil Çay", "Honest Tea", "Green Ice Tea"] },

 "YAĞLI BISKUVI": { ad: "Yağlı Tuzlu Kraker (Petibör, Salty)", kat: "İşlenmiş Atıştırmalık", risk: "yuksek", organlar: ["Kalp", "Tansiyon"], etki: "Beyaz un + palmiye + 1.5g+ sodyum/100g + L-sistein + maltodekstrin.", kaynak: "WHO Sodium · CSPI · TGK", alternatif: "Tam buğday kraker, ev yapımı", arar: ["Petibör Tuzlu", "Yağlı Kraker"] },

 "KUSKUS KARIŞIK HAZIR": { ad: "Hazır Kuskus Karışımı (Baharatlı Paket)", kat: "İşlenmiş Toz", risk: "yuksek", organlar: ["Tansiyon", "Bağırsak"], etki: "Kuskus + dehidrate sebze + MSG + sodyum + sentetik aroma + nişasta. Tek pakette 3g sodyum.", kaynak: "WHO Sodium · CSPI · TGK", alternatif: "Sade kuskus + taze sebze (ev)", arar: ["Hazır Kuskus", "Couscous Mix"] },

 "BULGUR LİDL HAZIR": { ad: "Hazır Bulgur Pilavı Karışımı (Endüstriyel)", kat: "İşlenmiş Toz", risk: "yuksek", organlar: ["Tansiyon"], etki: "Bulgur + soğan tozu + sentetik et aroması + MSG + sodyum bombası + palmiye.", kaynak: "WHO Sodium · CSPI · TGK · Türkiye Beslenme Diyet", alternatif: "Sade bulgur (ev pilavı)", arar: ["Hazır Bulgur Pilavı", "Bulgur Mix"] },

 "DOMATESLI POLO MAKARNA": { ad: "Domatesli/Yumurtalı Makarna Salatası Hazır", kat: "İşlenmiş Hazır Salata", risk: "yuksek", organlar: ["Tansiyon", "Bağırsak"], etki: "Endüstriyel mayonez + makarna + soya yağı + sodyum + EDTA + boya + koruyucu.", kaynak: "CSPI · WHO · TGK", alternatif: "Ev makarna salatası (taze)", arar: ["Makarna Salatası Hazır", "Pasta Salad"] },

 "ZEYTIN PALA NEPTÜN PALM": { ad: "Sahte Premium Sızma Zeytinyağı Markaları", kat: "Sahte Premium Yağ", risk: "yuksek", organlar: ["Kalp", "Karaciğer"], etki: "Türkiye, İtalya, İspanya yaygın hile. 'Sızma' diye satılanların %70'i karışık (ayçiçek, soya).", kaynak: "UC Davis 2017 · İtalya Adalet · Türkiye Tarım Bakanlığı · TKHK", alternatif: "Doğrudan üretici, sertifikalı yerel zeytinyağı", arar: ["Sızma Zeytinyağı Marka", "Sahte Olive Oil"] },

 "DONMUŞ BÖREK PINAR": { ad: "Donmuş Hazır Börek (Pinar, Maret)", kat: "Ultra İşlenmiş", risk: "yuksek", organlar: ["Pankreas", "Kalp", "Bağırsak"], etki: "Endüstriyel yufka + analog peynir + işlenmiş et/sebze + margarin + MSG + sodyum.", kaynak: "TGK · CSPI · BMJ UPF · WHO", alternatif: "Ev böreği, geleneksel yufka", arar: ["Donmuş Börek", "Pinar Börek", "Maret Börek"] },

 "DONMUŞ MANTI HAZIR": { ad: "Donmuş Mantı (Pinar, Eti)", kat: "İşlenmiş Hamur", risk: "yuksek", organlar: ["Kalp", "Bağırsak"], etki: "Karma et + soya + nişasta + sodyum + MSG. Geleneksel Kayseri mantısı değil.", kaynak: "TGK · CSPI · WHO Sodium", alternatif: "Ev mantısı, geleneksel Kayseri", arar: ["Donmuş Mantı", "Hazır Mantı"] },

 "TARÇINLI KEK FIRINCI": { ad: "Sokak Fırınlarındaki Sentetik Aroma Tatlılar", kat: "Sokak Tatlısı", risk: "yuksek", organlar: ["Pankreas", "Kalp"], etki: "Cinnamon Roll, kruvasan vb. genelde endüstriyel hazır hamur + sentetik tarçın aroması + margarin.", kaynak: "CSPI · TGK · WHO Trans", alternatif: "Geleneksel taş fırın, ev yapımı", arar: ["Tarçınlı Rulo", "Cinnamon Roll"] },

 "ÇOCUK SAKAR MEYVELI": { ad: "Çocuk Şekerleme Promosyonlu Mini Şişeler (Tatlı Sıvı)", kat: "Çocuk Hedefli", risk: "kritik", organlar: ["Pankreas", "Diş"], etki: "Mini şişe yapay meyve aromalı sıvılar. %95 şeker + boyalar + asit + sodyum benzoat.", kaynak: "WHO Çocuk Pazarlama · Southampton 2007 · CSPI · Türk Pediatri", alternatif: "Su, taze meyve dilimleri", arar: ["Mini Şişe Şeker", "Tatlı Sıvı Çocuk"] },

 "EVDE DUDAK NİAVA RUJI": { ad: "Lip Balm / Dudak Bakım (Mineral Yağ + Parfüm)", kat: "Kozmetik", risk: "orta", organlar: ["Cilt", "Dudak"], etki: "Petrolyum türevi (Vaseline) + parfüm + sentetik aroma + paraben. Dudaktan emilim yüksek.", kaynak: "EWG Skin Deep · ANSES", alternatif: "Saf bal mumu, hindistan cevizi yağı, shea", arar: ["Dudak Balmı", "Lip Balm"] },

 "ÇIKOLATA GAZETESI KEKLER": { ad: "Hazır Çikolatalı Kek (Eti Cin, Halley, Twix Bar)", kat: "Ultra İşlenmiş", risk: "kritik", organlar: ["Pankreas", "Kalp", "Karaciğer"], etki: "Beyaz un + palmiye + glikoz şurubu + sentetik kakao + emülgatör + uzun raf koruyucu.", kaynak: "WHO · BMJ UPF · CSPI · TGK", alternatif: "Ev kek (tam buğday, gerçek kakao)", arar: ["Eti Cin", "Halley", "Twix"] },

 "BAYAN ŞEY ARALARSAN": { ad: "Cosmetic Allergens (Limonene, Linalool, Geraniol)", kat: "Kozmetik Alerjen", risk: "yuksek", organlar: ["Cilt", "Bağışıklık"], etki: "26 alerjen kokulu kimyasal AB'de etiketlenmek zorunda. Yaygın cilt alerjisi, ürtiker sebebi.", kaynak: "AB Direktifi 76/768 · ANSES · BEUC · EWG", alternatif: "Parfümsüz/koku-free kozmetik", arar: ["Limonen", "Linalool", "Geraniol", "Parfüm Alerjen"] },

 "AĞIZ GARGARASI FLORÜR": { ad: "Yüksek Florürlü Ağız Gargara (Listerine Total Care)", kat: "Diş Bakımı", risk: "yuksek", organlar: ["Diş", "Beyin", "Tiroid"], etki: "Florür + alkol + boya + sentetik aroma + paraben. Yutma riski + birikim.", kaynak: "NTP 2024 Florür · ADA · Türk Diş Hekimleri", alternatif: "Tuzlu su, alkolsüz/florürsüz gargara", arar: ["Florürlü Gargara", "Listerine Florür"] },

 "MEZE HAZIR AVRUPA": { ad: "Karışık Hazır Mezé Tabağı (Marketten)", kat: "İşlenmiş Yığın", risk: "yuksek", organlar: ["Tansiyon", "Bağırsak"], etki: "Humus + tarama + cacık + zeytin ezme = hepsi endüstriyel. Tek tabakta günlük sodyum.", kaynak: "WHO Sodium · CSPI · TGK", alternatif: "Ev mezé tabağı, taze hazırlama", arar: ["Hazır Mezé", "Karışık Meze"] },

 "BIYOTIN GUMMY ŞEKER": { ad: "Biotin Gummy (Saç-Tırnak - Şekerli)", kat: "Sahte Sağlık Takviye", risk: "yuksek", organlar: ["Pankreas", "Lab Test"], etki: "Biotin laboratuvar testlerini yanıltır. Şeker bombası + sentetik biotin + boya + jelatin.", kaynak: "FDA 2017 Biotin · Türkiye Eczacılar Birliği", alternatif: "Yumurta, somon, badem (doğal biotin)", arar: ["Biotin Gummy", "Saç Tırnak Gummy"] },

 "VITAMIN C TAB GUMMY": { ad: "C Vitamini Gummy (Yetişkin - Şekerli)", kat: "Şekerli Takviye", risk: "yuksek", organlar: ["Pankreas", "Diş"], etki: "Sentetik askorbik asit + jelatin + %50 şeker + boyalar. Yetişkin için bile çok şekerli.", kaynak: "CSPI Gummy · Türkiye Eczacılar Birliği", alternatif: "Taze meyve, brokoli, biber (gerçek C)", arar: ["C Vitamini Gummy", "Vitamin Gummy"] },

 "BAYAN HOMEMADE BAL KARGOZ": { ad: "İnternet 'Ev Yapımı Bal' Satışları (Sahtekarlık)", kat: "Sahte Bal", risk: "yuksek", organlar: ["Pankreas", "Karaciğer"], etki: "İnternet üzerinden 'ev yapımı' diye satılan ballar genelde glikoz şurubu karışımı. Test kanıtı yok.", kaynak: "Tarım Bakanlığı Bal · TKHK · Türkiye Tüketici Hakları Derneği", alternatif: "Yerel bilinen arıcı, sertifikalı bal", arar: ["İnternet Bal", "Ev Yapımı Bal Sahte"] },

 "ANTIBIYOTIK SUT": { ad: "Antibiyotik Kalıntılı Süt (Çiğ Süt + Hızlı Tüketim)", kat: "Veteriner İlaç Kalıntı", risk: "kritik", organlar: ["Bağışıklık", "Antibiyotik Direnci"], etki: "Tedavi gören ineğin sütü bekletilmeden satılır. Antibiyotik direnci, bağırsak florası yok olur.", kaynak: "WHO 2021 AMR · FDA · Türk Veteriner Hekimleri Birliği · Türk Tabipler Birliği", alternatif: "Organik süt, antibiyotik-free etiketli", arar: ["Antibiyotik Süt", "Çiğ Süt Antibiyotik"] },

 "EKSI MAYALI EKMEK SAHTE": { ad: "Sahte Ekşi Maya Ekmeği (Endüstriyel Aroma)", kat: "Sahte Geleneksel", risk: "orta", organlar: ["Pankreas"], etki: "Gerçek ekşi maya 24-48 saat fermente. Endüstriyel sahte: ticari maya + ekşilik aromatı + asit eklemeli.", kaynak: "TGK · CSPI · Türkiye Beslenme Diyet", alternatif: "Geleneksel ekşi maya, 24+ saat fermente", arar: ["Sahte Ekşi Maya", "Sourdough Sahte"] },

 "BÖCEK PROTEIN TOZU": { ad: "Böcek Bazlı Protein Ürünleri (AB Onaylı 2023)", kat: "Yeni Protein Kaynağı", risk: "orta", organlar: ["Bağışıklık"], etki: "AB 2023'te ev cırcırböceği, çekirge, mealworm protein onayladı. Alerjik reaksiyon riski (karides alerjisi olanlar).", kaynak: "AB Reg 2023/5 · EFSA Böcek · BEUC", alternatif: "Geleneksel protein (et, balık, baklagil)", arar: ["Böcek Protein", "Cricket Protein"] },

 "DONMUŞ YEMEK MICROWAVE": { ad: "Mikrodalga Donmuş Yemek (Plastik + BPA + Akrilamid)", kat: "Ultra İşlenmiş", risk: "kritik", organlar: ["Hormon", "Karaciğer", "Bağırsak"], etki: "Mikrodalgada plastik tabak + BPA + ftalat + akrilamid yiyecekle birlikte ısınır.", kaynak: "EFSA BPA · IARC Akrilamid · EWG", alternatif: "Ev yemeği, cam tabakta ısıtma", arar: ["Mikrodalga Yemek", "Donmuş Mikrodalga"] },

 "EVCIL KÖPEK SUKU": { ad: "Evcil Hayvan Atıştırmalık (Sukraloz)", kat: "Hayvan Mama", risk: "yuksek", organlar: ["Köpek Sağlığı"], etki: "Bazı diyet köpek mamalarında sukraloz/aspartam kullanılır. Köpekler için tehlikeli (ksilitol özellikle).", kaynak: "Türk Veteriner Hekimleri Birliği · FDA Pet Food", alternatif: "Doğal mama, et bazlı", arar: ["Diyet Köpek Mama", "Şekersiz Köpek Atıştırmalık"] },

 "MISIRSIZ TORTILLA": { ad: "Glutensiz Tortilla (Modifiye Nişasta + Karra)", kat: "Sahte Sağlıklı Glutensiz", risk: "yuksek", organlar: ["Pankreas", "Bağırsak"], etki: "Glutensiz pazarlanır. Modifiye nişasta + karra + emülgatör + palmiye. Glisemik indeks yüksek.", kaynak: "BMJ 2017 Glutensiz · Mayo Clinic · CSPI", alternatif: "Doğal glutensiz (yulaf, kinoa)", arar: ["Glutensiz Tortilla", "Gluten Free Wrap"] },

 "KOLA TENNESSE ESKI": { ad: "Yerli Coca-Cola Şişeleri (Sade Etiketli)", kat: "Şekerli Gazoz", risk: "kritik", organlar: ["Pankreas", "Diş", "Kemik"], etki: "Eski tarz şişe / sade etiket = aynı içerik. Kola değişmiyor: 35g şeker/330ml.", kaynak: "WHO Şeker · CSPI · Türk Diş Hekimleri", alternatif: "Maden suyu", arar: ["Vintage Coca-Cola", "Cam Şişe Kola"] },

 "PROTEIN EŞREF YOĞURT": { ad: "Yüksek Proteinli Yoğurt (Whey Eklemeli + Aspartam)", kat: "Sahte Sağlıklı", risk: "yuksek", organlar: ["Böbrek", "Pankreas"], etki: "%15+ protein pazarlanır. Whey izolat + sukraloz + aspartam + sodyum. Doğal değil.", kaynak: "BMJ UPF · CSPI · Nature 2014", alternatif: "Sade yoğurt + ceviz", arar: ["Yüksek Protein Yoğurt", "High Protein Yogurt"] },

 "RECEL DETOX FUNCTIONAL": { ad: "Reçel + Bitki Karışım (Fonksiyonel Sağlık Pazarlama)", kat: "Sahte Sağlıklı", risk: "yuksek", organlar: ["Pankreas"], etki: "Reçele zerdeçal/zencefil eklenir, sağlık pazarlanır. Hala şeker bombası.", kaynak: "CSPI · BEUC · WHO", alternatif: "Ev reçeli, baharatlı tarifeler", arar: ["Fonksiyonel Reçel", "Sağlıklı Reçel"] },

 "ALKOL ICKI ICKI HAFTA": { ad: "Bardakla Satılan Alkollü Karışımlar (Diskotek)", kat: "İşlenmiş Alkol", risk: "kritik", organlar: ["Karaciğer", "Pankreas"], etki: "Düşük kalite alkol + HFCS + sentetik aroma + yapay renk + enerji içeceği karıştır.", kaynak: "WHO Alkol · CSPI · Türk Tabipler Birliği", alternatif: "Alkolsüz veya kaliteli alkol", arar: ["Bardak İçki", "Diskotek Kokteyl"] },

 "ŞARAP CHARDONNAY TURK": { ad: "Türk Beyaz Şarabı (Endüstriyel Sülfit)", kat: "Alkollü İçecek", risk: "yuksek", organlar: ["Karaciğer", "Bağışıklık"], etki: "Sülfit + pestisit + gümüş işleme + ısıtma. WHO alkol Grup 1.", kaynak: "WHO 2023 · EFSA Sülfit · Türk Tabipler Birliği", alternatif: "Doğal şarap, alkolsüz", arar: ["Türk Beyaz Şarap", "Chardonnay Türk"] },

 "PALM YAGI BISKUVI HRT": { ad: "Bütün Endüstriyel Bisküviler (Eti, Ülker, Solen)", kat: "Ultra İşlenmiş", risk: "yuksek", organlar: ["Pankreas", "Kalp"], etki: "Hemen hepsi: beyaz un + palmiye + şeker + emülgatör + koruyucu. Etiket okumadan alma.", kaynak: "WHO · BMJ UPF · CSPI · Türkiye Beslenme Diyet Derneği", alternatif: "Ev bisküvisi, yulaf kurabiye", arar: ["Endüstriyel Bisküvi", "Eti Bisküvi", "Ülker Bisküvi"] },

 "BAYRAM ŞEKERI BIRLEŞIK": { ad: "Bayramlık Karma Şekerleme (Akide + Lokum + Cikolata)", kat: "Karışık Şekerleme", risk: "yuksek", organlar: ["Pankreas", "Bağırsak"], etki: "Türk şekerlemelerinin hepsi endüstriyel olur. Tek pakette tüm yapay boyalar + HFCS.", kaynak: "Southampton 2007 · WHO · CSPI", alternatif: "Geleneksel şekerlemeci (Hacı Bekir, Koska)", arar: ["Bayram Şekerleme", "Karma Şekerleme"] },

 "ŞAMANTI KOLLAJEN YENI": { ad: "Kollajen Eklemeli Sahte Sağlıklı Ürünler", kat: "Sahte Sağlık", risk: "yuksek", organlar: ["Pankreas", "Bağırsak"], etki: "Yoğurt, kek, içecek vb. ürünlere eser miktarda kollajen eklenir. Pazarlama yapılır.", kaynak: "Cleveland Clinic Kolajen · JAMA Derm · BEUC", alternatif: "C vitamini + protein + kemik suyu (ev)", arar: ["Kollajen Eklemeli", "Collagen Added"] },

 "ÇIKOLATA BAR BARS": { ad: "Çikolata Kaplı Müsli/Tahıl Bar (Quaker, Kellogg's)", kat: "Sahte Sağlıklı", risk: "yuksek", organlar: ["Pankreas"], etki: "Tahıl bar diye satılır ama %35 şeker + palmiye + kakao kompound + emülgatör.", kaynak: "BMJ UPF · CSPI · WHO", alternatif: "Sade yulaf + meyve + ceviz", arar: ["Çikolatalı Tahıl Bar", "Granola Bar Çikolata"] },

 "CIN ITHAL ŞEKER": { ad: "Çin/Asya İthalatı Düşük Kalite Şekerlemeler", kat: "İthal Düşük Kalite", risk: "kritik", organlar: ["Bağışıklık", "Karaciğer"], etki: "AB yasaklı boyalar + sentetik aroma + ağır metal kontaminasyonu raporları (RASFF Çin uyarıları).", kaynak: "RASFF AB Çin · IARC · TKHK · Greenpeace", alternatif: "AB sertifikalı veya yerli üretim", arar: ["Çin Şekerleme", "Asya İthal Şeker"] },

 "EŞREF PROTEIN OYUN OYUNCAK": { ad: "Çocuk Spor İçecekleri (Mini Pet Şişe + Şeker)", kat: "Çocuk Sporcu Pazarlama", risk: "yuksek", organlar: ["Pankreas", "Diş"], etki: "Çocuk sporcu içecekleri olarak satılır ama 20g şeker + sodyum + sentetik renk + aroma.", kaynak: "AAP 2011 Sporcu İçecek · WHO · Türk Pediatri", alternatif: "Su, taze meyve", arar: ["Çocuk Sporcu İçecek", "Kid Sport Drink"] },

 "PROTEIN İÇECEK ÇUVAL": { ad: "Mass Gainer İçecek (40g+ Şeker + Whey)", kat: "Spor Takviye", risk: "kritik", organlar: ["Karaciğer", "Pankreas", "Böbrek"], etki: "Tek shake'te 40g şeker + 100g maltodekstrin + whey. Sağlıklı genç için bile zararlı.", kaynak: "BMJ UPF · CSPI · ACSM", alternatif: "Doğal beslenme, ev shake", arar: ["Mass Gainer Hazır", "Bulk İçecek"] },

 "AROMALI GAZOZ CARS BABY": { ad: "Karikatür Karakterli Çocuk İçecekleri (Şekerli)", kat: "Çocuk Hedefli Marketing", risk: "kritik", organlar: ["Pankreas", "Diş"], etki: "Disney, Pixar karakterli ambalaj + şeker + boya + aroma. WHO çocuk pazarlama yasağı önerisi.", kaynak: "WHO Çocuk Pazarlama · UNICEF · CSPI · Türk Pediatri", alternatif: "Su, ev meyve suyu", arar: ["Karakter Çocuk İçecek", "Disney İçecek"] },

 "DOĞA PROBIOTIC SHOT": { ad: "Probiyotik Şot İçecekleri (Yakult Mini)", kat: "Sahte Probiyotik", risk: "orta", organlar: ["Pankreas"], etki: "Süt + tek tür bakteri + %50 şeker. Tek doz şeker = 4 küp.", kaynak: "JAMA Probiyotik · CSPI · WHO Şeker", alternatif: "Ev kefiri, lahana turşusu suyu", arar: ["Yakult Mini", "Probiyotik Şot"] },

 "TOZ ÇIKOLATA KAHVE": { ad: "Hazır Toz Sıcak Çikolata (Süt Tozu + Şeker + Kakao Kompound)", kat: "İşlenmiş Toz", risk: "yuksek", organlar: ["Pankreas", "Kalp"], etki: "Süt tozu + şeker + kakao kompound (palmiye yağı) + sentetik aroma + emülgatör.", kaynak: "CSPI · WHO · TGK", alternatif: "Sade süt + kakao + bal", arar: ["Sıcak Çikolata Toz", "Hot Chocolate Powder"] },

 "DEZENFEKTAN GIDA YÜZEY": { ad: "Gıda Yüzeyleri için Dezenfektan (Klor + Quaternary)", kat: "Temizlik Kimyasalı", risk: "yuksek", organlar: ["Solunum", "Bağırsak"], etki: "Restoran/market yüzeylerinde kullanılan dezenfektanlar kalıntı bırakır. Gıdaya geçer.", kaynak: "EWG Cleaning · ECHA · BEUC · WHO", alternatif: "Sirke, hidrojen peroksit, doğal dezenfektan", arar: ["Yüzey Dezenfektan", "Quaternary Ammonium"] },

 "KIMYASAL EVCIL TEMIZLIK": { ad: "Evcil Hayvan Temizlik Ürünleri (Kimyasal)", kat: "Hayvan Bakım Kimyasalı", risk: "yuksek", organlar: ["Cilt (Hayvan)", "Solunum"], etki: "Köpek/kedi şampuanları, dezenfektanlar parfüm + paraben + boya + kimyasal. Hayvan emer.", kaynak: "EWG · Türk Veteriner Hekimleri Birliği", alternatif: "Doğal ph dengeli hayvan sabunu, su", arar: ["Hayvan Şampuanı", "Evcil Temizlik"] },

 "POPLAR TOST EKMEĞI": { ad: "Mağaza Hazır Tost (Beyaz Ekmek + Sucuk + Analog Peynir)", kat: "Ultra İşlenmiş Hazır", risk: "kritik", organlar: ["Kalp", "Pankreas", "Bağırsak"], etki: "Endüstriyel ekmek + endüstriyel sucuk/jambon + analog peynir + endüstriyel ketçap. Hepsi UPF.", kaynak: "BMJ UPF · WHO · CSPI · Türk Tabipler Birliği", alternatif: "Ev tostu, taze malzeme", arar: ["Hazır Tost", "Mağaza Tost"] },

 "YENI GEÇMIŞ NÜTRI MEYVE": { ad: "'Süper Meyve' Pazarlama Ürünleri (Acai, Goji)", kat: "Sahte Süper Gıda", risk: "orta", organlar: ["Pankreas"], etki: "Acai/Goji içeren ürünler genelde %5 süper meyve + bol şeker. Pazarlama hilesi.", kaynak: "BMJ UPF · CSPI · Cleveland Clinic", alternatif: "Yerli yaban mersini, üzüm, kuşburnu", arar: ["Acai Berry", "Goji Berry", "Süper Meyve"] },

 "BÜYÜK MARKA UCUZ MAKARNA": { ad: "İndirim Marketleri Ucuz Makarna (ŞOK, A101, BIM)", kat: "Düşük Kalite Tahıl", risk: "orta", organlar: ["Pankreas"], etki: "Düşük kalite buğday + glifosat kalıntısı + nişasta katkı + B vitamin pazarlama eklemeli.", kaynak: "EWG Glifosat · TGK · TKHK", alternatif: "Sertifikalı makarna, durum buğdayı", arar: ["Şok Makarna", "A101 Makarna", "BIM Makarna"] },

 "YASEMINI GUL KOZ MUSL": { ad: "Aromalı Müsli (Gül, Yasemin, Lavanta - Sentetik)", kat: "İşlenmiş Müsli", risk: "yuksek", organlar: ["Pankreas", "Bağırsak"], etki: "Yulaf + şeker + sentetik aroma + kuru meyve karışım + palmiye. Tek pakette 30g şeker.", kaynak: "BMJ UPF · CSPI · TGK", alternatif: "Sade yulaf + taze gül/lavanta", arar: ["Aromalı Müsli", "Çiçek Aroması Müsli"] },

 "MEYVE KURU KARIŞIM SAHTE": { ad: "Kuru Meyve Karışımı (Yıkanmamış + Sülfit)", kat: "İşlenmiş Kuru Meyve", risk: "orta", organlar: ["Bağırsak", "Solunum"], etki: "Kuru meyve karışımları yıkanmadan paketlenir + sülfit (E220) + bazen şeker eklemeli.", kaynak: "EFSA Sülfit · CSPI · TGK", alternatif: "Tek tek kuru meyve, sülfitsiz", arar: ["Kuru Meyve Karışım", "Mixed Dried Fruit"] },
 "NUGGET HINDI MARKA": { ad: "Hindi Nugget (Banvit, Maret - Tavuk Yerine)", kat: "İşlenmiş Et", risk: "kritik", organlar: ["Kalp", "Karaciğer", "Bağırsak"], etki: "Tavuk yerine hindi de aynı sorunlu: %50 et + dolgu + galeta + soya + fosfat + dimetilpolisiloksan.", kaynak: "CSPI · IARC Vol 114 · TGK · WHO", alternatif: "Taze hindi göğsü, ev panele", arar: ["Hindi Nugget", "Banvit Hindi Nugget"] },
 "KEK İÇI KIPCAK": { ad: "Hazır Kek İçi Hazır (Kremalı, Çikolatalı Doldurma)", kat: "Ultra İşlenmiş", risk: "yuksek", organlar: ["Pankreas", "Kalp"], etki: "Margarin krem + HFCS + sentetik aroma + boya + emülgatör. Kek dolduran tatlı krem.", kaynak: "WHO · CSPI · TGK", alternatif: "Gerçek krema, ev hazırlama", arar: ["Kek Dolgusu", "Kek İçi Hazır"] },
 "BIBER SALÇA KIRMIZ HILE": { ad: "Sahte Acı Biber Salçası (Sudan Boya + Tuğla Tozu)", kat: "Sahte Premium", risk: "kritik", organlar: ["Kanser", "Karaciğer"], etki: "Türkiye'de yaygın hile: pul biber salçasına Sudan boya + tuğla tozu + ucuz biber.", kaynak: "EFSA Sudan · IARC · Tarım Bakanlığı Hile · TKHK", alternatif: "Köy üretimi pul biber salçası (Maraş, Antep CI)", arar: ["Sahte Acı Biber Salça", "Hileli Acı Biber"] },
 "YEMEKLI HAZIR YEMEK": { ad: "Restoran Toplu Yemek (Hastane, Okul, Asker)", kat: "Toplu Tüketim Yemek", risk: "yuksek", organlar: ["Tansiyon", "Bağırsak"], etki: "Toplu yemekler ucuz hammadde + uzun saatler bekletme + ısıtma kalitesi düşük + ucuz yağ kullanımı.", kaynak: "WHO Food Safety · Türkiye Beslenme Diyet Derneği · TGK", alternatif: "Ev yemeği getirme", arar: ["Toplu Yemek", "Yemekhane Yemek"] },
 "BAHARAT İNDIA SOSU": { ad: "Hindistan/Pakistan İthal Karma Baharat Sosu", kat: "İthal Sos", risk: "kritik", organlar: ["Beyin", "Kanser"], etki: "Kurşun kromat boyalı baharat + Sudan boyası + ağır metal. Türkiye'de market raflarında.", kaynak: "Consumer Reports 2021 · IARC Kurşun · Stanford 2019", alternatif: "Yerli baharat, kontrollü", arar: ["İndia Sos", "Pakistan Sos"] },
 "BISIMERIVOLE LIGHT": { ad: "Süt Bazlı Tatlandırılmış İçecekler (Light)", kat: "Sahte Diyet Süt", risk: "yuksek", organlar: ["Bağırsak", "Pankreas"], etki: "Süt + sukraloz + asesülfam + sentetik aroma + karra. Diyet pazarlama.", kaynak: "Nature 2014 Suez · IARC 2023 · CSPI", alternatif: "Saf süt, taze meyve", arar: ["Light Süt", "Diyet Süt İçecek"] },
 "RESTORAN SUYU FILTREDEN": { ad: "Restoran/Cafe Açık Su (Filtre Kalitesi Sorunu)", kat: "Su Kontaminasyonu", risk: "orta", organlar: ["Bağırsak", "Bağışıklık"], etki: "Bazı restoranlar musluk suyunu filtreden geçirip 'kaynak suyu' diye satar. Filtre eski olabilir.", kaynak: "WHO Su Güvenliği · TGK · TKHK", alternatif: "Şişe su (cam), evden götür", arar: ["Restoran Su", "Cafe Filtreli Su"] },
 "ÇIKOLATA SUKRALOZ SAĞLIK": { ad: "'Sağlıklı' Etiketli Ultra İşlenmiş Ürünler (1000. Madde)", kat: "Sahte Sağlıklı Final", risk: "kritik", organlar: ["Beyin", "Bağırsak", "Karaciğer"], etki: "Etikette 'sağlıklı', 'doğal', 'bio', 'organik', 'şekersiz', 'glutensiz' gibi kelime varsa, içeriğini iki kat daha dikkatli oku. Çoğu pazarlama hilesi.", kaynak: "BMJ UPF · WHO Pazarlama · BEUC · Greenpeace · Türk Tabipler Birliği · CSPI · EWG · TKHK · Türkiye Tüketici Hakları Derneği", alternatif: "İçeriği oku, az bileşenli ürünler, taze ev yapımı", arar: ["Sağlıklı Etiket", "Sahte Bio", "Pazarlama Aldatma"] },
 "BAKLAVA NESTLE PROMO": { ad: "Endüstriyel Tatlı Promosyon Ürünleri", kat: "Pazarlama Promosyon", risk: "yuksek", organlar: ["Pankreas"], etki: "Ramazan/Bayram dönemi promosyon ultra işlenmiş ürünler. 'Geleneksel' diye satılır.", kaynak: "BMJ UPF · CSPI · TKHK", alternatif: "Geleneksel tatlıcı, ev yapımı", arar: ["Promosyon Tatlı", "Bayram Promosyonu"] },
 "TOPLAM 1000": { ad: "1000 Madde Tamamlandı - Final Mesaj", kat: "Bilgi", risk: "dusuk", organlar: [], etki: "Bu uygulamada 1000+ zararlı madde, 25+ bilimsel kurum, 31 kaynak. Etiket okuma alışkanlığı en güçlü silah.", kaynak: "Türk Tabipler Birliği · WHO · IARC · EFSA · CSPI · EWG · Türkiye Beslenme Diyet Derneği", alternatif: "Etiket oku, az işlenmiş, taze, yerel", arar: ["1000 Madde"] },
};

/* ══════════════════════════════════════════════
 GİYİM VERİTABANI
 ══════════════════════════════════════════════ */
const GIYIM_DB = {
 "POLİESTER": { ad: "Polyester (PET)", kat: "Sentetik Kumaş", risk: "yuksek", organlar: ["Cilt (kontakt dermatit)", "Hormonal (mikroplastik)"], etki: "Petrol türevi (PET). Üretim katalizörü antimon trioksit içerir (olası kanserojen, IARC Grup 2B). Geri dönüştürülmüş polyester BPA içerebilir (Xue 2018). Mikroplastik salımı: yıkamada lif başına ortalama 700.000 mikrofiber (Napper 2016). Mikroplastiklerin endokrin bozucu kimyasalları taşıdığı gösterildi.", kaynak: "Westerhoff Env Sci 2018 · Napper Mar Pollut Bull 2016 · IARC Vol 47 (antimon)", alternatif: "Organik pamuk · Keten · Yün · GOTS sertifikalı", makam: "Hicaz" , arar: ["Polyester", "PET"] },
 "POLYESTER": { ad: "Polyester (PET)", kat: "Sentetik Kumaş", risk: "yuksek", organlar: ["Cilt", "Hormonal Sistem (mikroplastik)"], etki: "Mikroplastik kaynağı. Antimon ve BPA kalıntıları içerebilir.", kaynak: "Napper 2016 · IARC Vol 47", alternatif: "Organik pamuk · Keten", makam: "Hicaz" , arar: ["Polyester", "PET"] },
 "NAİLON": { ad: "Naylon", kat: "Sentetik Kumaş", risk: "yuksek", organlar: ["Cilt", "Hormonal Sistem"], etki: "Kaprolaktam kalıntısı. Mikroplastik.", kaynak: "REACH · Greenpeace Detox 2012", alternatif: "Organik pamuk · Bambu", makam: "Segah" , arar: ["Naylon"] },
 "NYLON": { ad: "Naylon/Nylon", kat: "Sentetik Kumaş", risk: "yuksek", organlar: ["Cilt", "Hormonal Sistem"], etki: "Kaprolaktam kalıntısı. Mikroplastik.", kaynak: "REACH Yönetmeliği", alternatif: "Organik pamuk · Bambu", makam: "Segah" , arar: ["Naylon", "Nylon"] },
 "AKRİLİK": { ad: "Akrilik Lif (Akrilonitril Bazlı)", kat: "Sentetik Kumaş", risk: "kritik", organlar: ["Akciğer (mesleki maruziyet)", "DNA"], etki: "Akrilik liflerin ana hammaddesi akrilonitril, IARC 2024 (Vol 136) ile Grup 2B'den **Grup 1 (insanlar için kanserojen)** seviyesine yükseltildi. İşçilerde insan kanseri kanıtı yeterli görüldü. Bitmiş giysilerde monomer kalıntısı düşük seviyede olsa da üretim koşullarına bağlı. Mikroplastik salımı (yüksek), cilt teması durumunda dermatit.", kaynak: "IARC Volume 136 (2024) · IARC Vol 71 (1999) güncellemesi · EPA acrylonitrile toxicity profile", alternatif: "Merino yünü · Organik pamuk · Yün karışım", makam: "Acemaşiran" , arar: ["Akrilik Lif", "Akrilonitril Bazlı"] },
 "VİSKOZ": { ad: "Viskoz/Rayon", kat: "Yarı Sentetik", risk: "yuksek", organlar: ["Cilt", "Karaciğer"], etki: "Üretimde karbon disülfür. Kimyasal kalıntı riski.", kaynak: "CHEM Trust 2018", alternatif: "Organik pamuk · Keten", makam: "Segah" , arar: ["Viskoz", "Rayon"] },
 "RAYON": { ad: "Rayon/Viskoz", kat: "Yarı Sentetik", risk: "yuksek", organlar: ["Cilt", "Karaciğer"], etki: "Karbon disülfür kalıntısı.", kaynak: "CHEM Trust 2018", alternatif: "Organik pamuk", makam: "Segah" , arar: ["Rayon", "Viskoz"] },
 "ELASTAN": { ad: "Elastan/Likra", kat: "Sentetik Kumaş", risk: "yuksek", organlar: ["Cilt", "Hormonal Sistem"], etki: "İzosiyonat — alerjik reaksiyon, astım.", kaynak: "ECHA izosiyonat · REACH", alternatif: "Doğal lastikli organik pamuk", makam: "Hicaz" , arar: ["Elastan", "Likra"] },
 "LİKRA": { ad: "Elastan/Likra", kat: "Sentetik Kumaş", risk: "yuksek", organlar: ["Cilt", "Hormonal Sistem"], etki: "İzosiyonat alerjisi.", kaynak: "ECHA · REACH", alternatif: "Doğal lastikli pamuk", makam: "Hicaz" , arar: ["Elastan", "Likra"] },
 "POLİÜRETAN": { ad: "PU Deri (Polyüretan)", kat: "Suni Deri", risk: "kritik", organlar: ["Cilt", "Akciğer", "Karaciğer"], etki: "DMF içerir — cilt yoluyla emilir, karaciğer hasarı.", kaynak: "ECHA DMF · Lancet 2004", alternatif: "Gerçek deri · Mantar derisi", makam: "Acemaşiran" , arar: ["PU Deri", "Polyüretan"] },
 "PU DERİ": { ad: "PU Deri", kat: "Suni Deri", risk: "kritik", organlar: ["Cilt", "Karaciğer"], etki: "DMF kalıntısı — karaciğer hasarı.", kaynak: "Lancet 2004 · ECHA", alternatif: "Gerçek deri · Mantar", makam: "Acemaşiran" , arar: ["PU Deri"] },
 "PVC": { ad: "PVC (Vinil)", kat: "Suni Deri", risk: "kritik", organlar: ["Hormonal Sistem", "Karaciğer", "Akciğer"], etki: "Ftalat ve kurşun içerebilir. Üretimde dioksin.", kaynak: "Greenpeace PVC · ECHA ftalat", alternatif: "Gerçek deri · Kanvas", makam: "Acemaşiran" , arar: ["PVC", "Vinil"] },
 "MİKROFİBER": { ad: "Mikrofiber", kat: "Sentetik Kumaş", risk: "yuksek", organlar: ["Cilt", "Akciğer"], etki: "Her yıkamada 700.000+ mikroplastik salar.", kaynak: "Napper & Thompson · Env Science 2016", alternatif: "Organik pamuk · Bambu", makam: "Hicaz" , arar: ["Mikrofiber"] },
 "PFAS": { ad: "PFAS (Sonsuza Dek Kimyasallar)", kat: "Su/Leke İticisi", risk: "kritik", organlar: ["Karaciğer", "Böbrekler", "Bağışıklık", "Hormonal Sistem"], etki: "IARC 2023: PFOA Grup 1 (kanserojen — insan kanıtı yeterli), PFOS Grup 2B. Sonsuza dek bozulmazlar — vücutta birikir. Bağışıklık sistemi baskılaması, tiroid bozukluğu, böbrek/testis kanseri ile ilişkilendirildi. Su geçirmez yağmurluk, spor giyim, halı, kaplama gibi uygulamalarda. AB 2023: C9-14 PFCAs yasak; Şubat 2025 Fransa yasası: 2026'dan PFAS'lı tekstil yasak; ECHA universal PFAS kısıtlaması süreçte. ABD eyaletleri (Maine, NY, CA) ardışık yasaklar uyguluyor.", kaynak: "IARC Vol 135 (2023) · AB Reg 2024/2462 (PFHxA) · Fransa Loi 2025-188 · ECHA REACH SVHC", alternatif: "PFC-free / PFAS-free sertifikalı (bluesign, OEKO-TEX)", makam: "Acemaşiran" , arar: ["PFAS", "Sonsuza Dek Kimyasallar"] },
 "PFOA": { ad: "PFOA (Perfluorooktanoik Asit)", kat: "Su/Leke İticisi", risk: "kritik", organlar: ["Karaciğer", "Böbrekler", "DNA"], etki: "IARC 2023 (Vol 135): Grup 1 — insanlar için kanserojen. Stockholm Sözleşmesi POP listesi 2019. AB POP Regülasyonu ile tekstillerde yasaklı.", kaynak: "IARC Vol 135 (2023) · Stockholm POP 2019 · AB POP Reg 2019/1021", alternatif: "PFOA-free sertifikalı", makam: "Acemaşiran" , arar: ["PFOA", "Perfluorooktanoik Asit"] },
 "FORMALDEHİT": { ad: "Formaldehit (Kırışmaz Apre)", kat: "Tekstil Reçinesi", risk: "kritik", organlar: ["Cilt (kontakt dermatit)", "Solunum", "Nazofarenks (mesleki maruziyet)"], etki: "IARC Grup 1 — insanlar için kanserojen (nazofarenks kanseri, mesleki maruziyet). 'Kırışmaz', 'ütü gerektirmez' apreler için tekstil reçinesi olarak kullanılır (DMDHEU vb.). Giyimde alerjik kontakt dermatit nedeni — sıklık %0.2-4.2. Japonya yasalla ≤75 ppm sınırı; ABD'de zorunlu sınır yok (Amerikan Apparel & Footwear gönüllü standart <75 ppm yetişkin, <20 ppm 3 yaş altı). Türkiye, AB OEKO-TEX standartları takip eder.", kaynak: "IARC Vol 88/100F · JRC EU Survey (2007) · Reitz Dermatitis 2022", alternatif: "OEKO-TEX Standard 100 · GOTS organik pamuk · Yıkanmamış kırışmaz olmayan ürünler", makam: "Rast" , arar: ["Formaldehit", "Kırışmaz Apre"] },
 "FORMALDEHYDE": { ad: "Formaldehit", kat: "Tekstil Reçinesi", risk: "kritik", organlar: ["Cilt", "Solunum"], etki: "IARC Grup 1 kanserojen.", kaynak: "IARC Vol 88/100F", alternatif: "OEKO-TEX sertifikalı", makam: "Rast" , arar: ["Formaldehit"] },
 "TRİKLOSAN": { ad: "Triclosan", kat: "Antibakteriyel Apret", risk: "kritik", organlar: ["Hormonal Sistem", "Bağırsak Florası", "Tiroid"], etki: "FDA 2016'da yasakladı. Tiroid hormonunu etkiler.", kaynak: "FDA 2016 · Darbre 2006", alternatif: "Organik pamuk", makam: "Hüseyni" , arar: ["Triclosan"] },
 "AZO BOYASI": { ad: "Yasaklı Azo Boyaları", kat: "Tekstil Boyası", risk: "kritik", organlar: ["Cilt", "Mesane (kanser)", "DNA"], etki: "AB Direktifi 2002/61/EC (REACH Annex XVII Entry 43): cilt veya ağız ile uzun süreli temas eden tekstil/deride 22 aromatik amine bölünebilen azo boyaları yasak (30 mg/kg üzeri). Bu aminler (benzidin, 4-aminobifenil, 2-naftilamin vb.) IARC Grup 1 kanserojen — mesane kanseri ile bağlantılı. Tüm azo boyaları yasak değil — yalnızca %4'ünden azı bu aminleri açığa çıkarır.", kaynak: "AB Direktifi 2002/61/EC · REACH Annex XVII Entry 43 · IARC Vol 99/100F", alternatif: "GOTS sertifikalı · OEKO-TEX Standard 100", makam: "Acemaşiran" , arar: ["Yasaklı Azo Boyaları"] },
 "NİKEL": { ad: "Nikel (Aksesuar)", kat: "Metal", risk: "kritik", organlar: ["Cilt", "Akciğer", "Böbrekler"], etki: "IARC Grup 1. Kontakt dermatit.", kaynak: "IARC Vol 49 · AB 94/27/EC", alternatif: "Titanyum · Paslanmaz çelik", makam: "Hicaz" , arar: ["Nikel", "Aksesuar"] },
 "DMF": { ad: "DMF (Dimetilformamid)", kat: "Kimyasal", risk: "kritik", organlar: ["Karaciğer", "Üreme", "Cilt"], etki: "Cilt yoluyla emilir. Karaciğer hasarı.", kaynak: "EU 2009/251/EC · Lancet 2004", alternatif: "DMF içermeyen sertifikalı", makam: "Acemaşiran" , arar: ["DMF", "Dimetilformamid"] },
 "ALEV GECİKTİRİCİ": { ad: "Alev Geciktirici (HBCD)", kat: "Apret", risk: "kritik", organlar: ["Hormonal Sistem", "Beyin", "Tiroid"], etki: "Stockholm Sözleşmesi ile yasaklı. Hormonal bozucu.", kaynak: "Stockholm Sözleşmesi HBCD", alternatif: "Yün (doğal alev geciktirici)", makam: "Hicaz" , arar: ["Alev Geciktirici", "HBCD"] },
 "FTALAT": { ad: "Ftalatlar", kat: "Plastik Kimyasalı", risk: "kritik", organlar: ["Hormonal Sistem", "Karaciğer", "Üreme"], etki: "Hormonal bozucu. REACH kısıtlı.", kaynak: "ECHA ftalat · REACH Annex XIV", alternatif: "PVC-free aksesuar", makam: "Hüseyni" , arar: ["Ftalatlar"] },
};

/* ══════════════════════════════════════════════
 EV ÜRÜNLERİ VERİTABANI (halı, koltuk, mobilya, perde, yatak)
 ══════════════════════════════════════════════ */
const EV_DB = {
 "FORMALDEHİT": { ad: "Formaldehit (Apre)", kat: "Halı/Mobilya Apresi", risk: "kritik", organlar: ["Akciğer", "Göz", "DNA"], etki: "MDF, sunta, halı apresi ve mobilya yapıştırıcılarında bulunur. IARC Grup 1 kanserojen — kesin kanserojen.", kaynak: "IARC Monograph Vol 88 · WHO IAQ 2010 · EPA TSCA Title VI", alternatif: "Solid ahşap · E0/E1 düşük emisyonlu mobilya · Doğal pamuk halı" , arar: ["Formaldehit", "Apre"] },
 "HBCD": { ad: "HBCD (Heksabromosiklododekan)", kat: "Alev Geciktirici", risk: "kritik", organlar: ["Hormonal Sistem", "Tiroid", "Beyin"], etki: "Koltuk süngeri ve yalıtım malzemelerinde. Stockholm Sözleşmesi ile yasaklandı. Endokrin bozucu, anne sütüne geçer.", kaynak: "Stockholm Convention 2013 · ECHA SVHC", alternatif: "Doğal yün dolgu · Pamuk · Hindistan cevizi lifi" , arar: ["HBCD", "Heksabromosiklododekan"] },
 "PU SÜNGER": { ad: "Poliüretan Sünger (TDI)", kat: "Yatak/Koltuk Dolgusu", risk: "yuksek", organlar: ["Akciğer", "Cilt", "Sinir Sistemi"], etki: "TDI ve MDI izosiyanat içerir. Astım ve duyarlılık reaksiyonu tetikleyebilir.", kaynak: "ECHA REACH Annex XVII · OSHA HazCom 2012", alternatif: "Doğal lateks · Atkestanesi lifi · Yün yatak" , arar: ["Poliüretan Sünger", "TDI"] },
 "PVC PERDE": { ad: "PVC (Polivinil Klorür)", kat: "Perde/Yer Döşeme", risk: "kritik", organlar: ["Hormonal Sistem", "Karaciğer", "Akciğer"], etki: "Ftalat ve organokalay içerir. Üretim ve yanmada dioksin oluşturur. Hormon bozucu.", kaynak: "Greenpeace PVC Report 2007 · ECHA Phthalates · WHO Dioxin 2016", alternatif: "Keten perde · Pamuk · Doğal jüt zemin kaplaması" , arar: ["PVC", "Polivinil Klorür"] },
 "PESTİSİT HALI": { ad: "Permetrin (Halı Pestisiti)", kat: "Yün/Halı Koruyucu", risk: "yuksek", organlar: ["Sinir Sistemi", "Cilt"], etki: "Sentetik piretroid. Yün halı güve koruyucusu olarak uygulanır. EPA olası kanserojen.", kaynak: "EPA Permethrin Reregistration 2009 · ATSDR ToxProfile", alternatif: "Doğal lavanta · Sedir ağacı kokusu ile koruma" , arar: ["Permetrin", "Halı Pestisiti"] },
 "VOC CİLA": { ad: "VOC Mobilya Cilası", kat: "Vernik/Boya", risk: "yuksek", organlar: ["Akciğer", "Sinir Sistemi", "Karaciğer"], etki: "Toluen, ksilen, benzen içeren uçucu organik bileşikler. Baş ağrısı, mide bulantısı.", kaynak: "EPA Indoor Air Quality · WHO Indoor Air Guidelines 2010", alternatif: "Doğal keten yağı · Bal mumu · Şellak vernik" , arar: ["VOC Mobilya Cilası"] },
 "ANTİMON": { ad: "Antimon Trioksit", kat: "Polyester Yatak/Halı", risk: "yuksek", organlar: ["Akciğer", "Kalp", "Cilt"], etki: "PET polyester üretiminde katalizör. Yataktan ısı/ter ile sızabilir.", kaynak: "IARC Monograph Vol 47 · ECHA SVHC List", alternatif: "GOTS sertifikalı organik pamuk yatak · Yün" , arar: ["Antimon Trioksit"] },
 "PFAS HALI": { ad: "PFAS (Leke Tutmaz Halı Kaplaması)", kat: "Halı/Mobilya Kaplaması", risk: "kritik", organlar: ["Karaciğer", "Böbrek", "Bağışıklık", "Hormonal Sistem"], etki: "Sonsuza dek kimyasal. Halı, kanepe ve koltuk leke tutmaz kaplamalarında. Anne sütüne ve kana geçer.", kaynak: "IARC PFAS 2023 · EPA PFAS Strategic Roadmap · EFSA 2020", alternatif: "PFC-free sertifikalı · Doğal yün · Pamuk" , arar: ["PFAS", "Leke Tutmaz Halı Kaplaması"] },
 "DEKABDE": { ad: "DecaBDE (Bromlu Alev Geciktirici)", kat: "Elektronik/Mobilya", risk: "kritik", organlar: ["Hormonal Sistem", "Beyin", "Tiroid"], etki: "TV, mobilya, halı altlığında. AB ve ABD'de kademeli yasak. Nörogelişimsel toksin.", kaynak: "Stockholm Convention Annex A · EU POPs 2019/1021", alternatif: "Düşük yanma riski olan doğal malzemeler · Yün" , arar: ["DecaBDE", "Bromlu Alev Geciktirici"] },
 "NAFTALEN": { ad: "Naftalen (Güve Topu)", kat: "Dolap/Halı Koruyucu", risk: "yuksek", organlar: ["Kan", "Akciğer", "Göz"], etki: "Hemolitik anemi, IARC Grup 2B muhtemel kanserojen. Bebeklerde kritik.", kaynak: "IARC Monograph Vol 82 · ATSDR 2005", alternatif: "Sedir ağacı blokları · Kuru lavanta keseleri · Defne yaprağı" , arar: ["Naftalen", "Güve Topu"] },
};

/* ══════════════════════════════════════════════
 KOZMETİK VERİTABANI
 ══════════════════════════════════════════════ */
const KOZMETIK_DB = {
 "PARABEN": { ad: "Paraben (Metil/Propil/Butil)", kat: "Koruyucu", risk: "yuksek", organlar: ["Hormonal Sistem", "Üreme"], etki: "Östrojen taklitçisi. Meme dokusunda birikir. AB bazı parabenleri kısıtladı.", kaynak: "Darbre et al. J Appl Toxicol 2004 · EU Regulation 1004/2014", alternatif: "Paraben-free etiketli · Doğal koruyucular (E vitamini, rozmarin ekstresi)" , arar: ["Paraben", "Metil/Propil/Butil"] },
 "SLS": { ad: "Sodyum Lauril Sülfat (SLS)", kat: "Köpürtücü", risk: "orta", organlar: ["Cilt", "Göz"], etki: "Şampuan, sabun, diş macununda. Cilt bariyerini bozar, kuruluk ve tahriş.", kaynak: "EWG Skin Deep Database · CIR Final Report 1983", alternatif: "Sodyum kokoil isetiyonat · Doğal sabun (zeytinyağlı, defne)" , arar: ["Sodyum Lauril Sülfat", "SLS"] },
 "SLES": { ad: "Sodyum Lauret Sülfat (SLES)", kat: "Köpürtücü", risk: "orta", organlar: ["Cilt"], etki: "1,4-dioksan kalıntısı içerebilir (Grup 2B kanserojen).", kaynak: "FDA 1,4-Dioxane in Cosmetics · CIR 2015", alternatif: "Sülfatsız şampuan · Doğal kil temizleyiciler" , arar: ["Sodyum Lauret Sülfat", "SLES"] },
 "FTALAT KOZMETİK": { ad: "Ftalat (DEHP/DBP)", kat: "Parfüm Sabitleyici", risk: "kritik", organlar: ["Hormonal Sistem", "Üreme", "Karaciğer"], etki: "Parfüm, oje ve saç spreyinde. Hormonal bozucu. Çocuklarda risk yüksek.", kaynak: "EU REACH Annex XVII · CDC NHANES Biomonitoring", alternatif: "Ftalat-free etiketli · Doğal esansiyel yağ parfümleri" , arar: ["Ftalat", "DEHP/DBP"] },
 "OXYBENZONE": { ad: "Oksibenzon (BP-3)", kat: "Güneş Kremi UV Filtresi", risk: "yuksek", organlar: ["Hormonal Sistem", "Cilt"], etki: "Hormon bozucu. Mercanları öldürdüğü için Hawaii ve Palau'da yasak.", kaynak: "Hawaii SB2571 (2018) · FDA Sunscreen 2019", alternatif: "Mineral güneş kremi (çinko oksit, titanyum dioksit non-nano)" , arar: ["Oksibenzon", "BP-3"] },
 "TRİKLOSAN KOZMETİK": { ad: "Triclosan", kat: "Antibakteriyel", risk: "kritik", organlar: ["Hormonal Sistem", "Tiroid"], etki: "Diş macunu, sabunda. FDA 2016'da antibakteriyel sabunlarda yasakladı.", kaynak: "FDA Final Rule 2016 · EU Reg 358/2014", alternatif: "Çay ağacı yağı · Doğal sabunlar" , arar: ["Triclosan"] },
 "FORMALDEHYDE COSM": { ad: "Formaldehit Salıcılar (DMDM Hydantoin)", kat: "Koruyucu", risk: "kritik", organlar: ["Cilt", "Akciğer", "DNA"], etki: "Şampuan ve cilt bakımında formaldehit salar. IARC Grup 1.", kaynak: "IARC Vol 88 · EU Cosmetic Regulation Annex V", alternatif: "Formaldehyde-free etiketli ürünler" , arar: ["Formaldehit Salıcılar", "DMDM Hydantoin"] },
 "TOLUEN OJE": { ad: "Toluen", kat: "Oje Çözücü", risk: "kritik", organlar: ["Sinir Sistemi", "Üreme"], etki: "Hamilelikte beyin gelişimine zarar. AB ojelerde kısıtladı.", kaynak: "EU Cosmetic Reg Annex II · NIOSH Pocket Guide", alternatif: "3-free veya 10-free oje etiketli ürünler" , arar: ["Toluen"] },
 "ALÜMİNYUM KLORHİDRAT": { ad: "Alüminyum Klorhidrat", kat: "Deodorant/Antiperspirant", risk: "orta", organlar: ["Hormonal Sistem", "Meme Dokusu"], etki: "Ter bezlerini tıkar, meme dokusunda birikim hipotezi tartışmalı.", kaynak: "Darbre J Inorg Biochem 2005 · EFSA 2008", alternatif: "Doğal şap taşı · Soda bikarbonat bazlı deodorant" , arar: ["Alüminyum Klorhidrat"] },
 "PEG BİLEŞİKLER": { ad: "PEG (Polietilen Glikol)", kat: "Cilt Yumuşatıcı", risk: "orta", organlar: ["Cilt", "Karaciğer"], etki: "1,4-dioksan ve etilen oksit kalıntısı taşıyabilir.", kaynak: "EWG Cosmetic Database · CIR 2010", alternatif: "Bitkisel yağlar (jojoba, badem, argan)" , arar: ["PEG", "Polietilen Glikol"] },
};

/* ══════════════════════════════════════════════
 TEMİZLİK ÜRÜNLERİ VERİTABANI
 ══════════════════════════════════════════════ */
const TEMIZLIK_DB = {
 "KLORİN ÇAMAŞIR SUYU": { ad: "Sodyum Hipoklorit (Çamaşır Suyu)", kat: "Beyazlatıcı", risk: "yuksek", organlar: ["Akciğer", "Göz", "Cilt"], etki: "Amonyakla karışırsa zehirli klorin gazı oluşturur. Solunum tahrişi.", kaynak: "OSHA Sodium Hypochlorite · NIOSH Chemical Listing", alternatif: "Karbonat + sirke · Oksijenli su · Çamaşır sodası" , arar: ["Sodyum Hipoklorit", "Çamaşır Suyu"] },
 "AMONYAK": { ad: "Amonyak", kat: "Cam/Yüzey Temizleyici", risk: "yuksek", organlar: ["Akciğer", "Göz"], etki: "Astım atak tetikleyici. Klorinle karışırsa öldürücü gaz.", kaynak: "ATSDR Ammonia 2004 · OSHA PEL", alternatif: "Sirke + su · Karbonatlı su" , arar: ["Amonyak"] },
 "QUATS": { ad: "Quaternary Ammonium (BAC)", kat: "Dezenfektan", risk: "yuksek", organlar: ["Akciğer", "Üreme", "Cilt"], etki: "Astım tetikleyici. Hayvan çalışmalarında üreme toksisitesi.", kaynak: "Melin et al. Reprod Toxicol 2014 · EPA Antimicrobial", alternatif: "Hidrojen peroksit · Sirke · Çay ağacı yağı" , arar: ["Quaternary Ammonium", "BAC"] },
 "TRİKLOSAN TEMİZLİK": { ad: "Triclosan (Antibakteriyel Sabun)", kat: "Antibakteriyel", risk: "kritik", organlar: ["Hormonal Sistem", "Bağırsak Florası"], etki: "FDA 2016 yasakladı. Antibiyotik direnci geliştirir.", kaynak: "FDA Final Rule 2016", alternatif: "Sıradan sabun + su (CDC önerisi)" , arar: ["Triclosan", "Antibakteriyel Sabun"] },
 "SENTETIK PARFÜM": { ad: "Sentetik Parfüm (Fragrance)", kat: "Koku Verici", risk: "yuksek", organlar: ["Akciğer", "Hormonal Sistem"], etki: "Etiketteki tek kelime 3000+ kimyasal saklayabilir. Astım, alerji.", kaynak: "EWG Not So Sexy Report 2010 · IFRA Standards", alternatif: "Esansiyel yağ damlatılmış doğal temizleyiciler" , arar: ["Sentetik Parfüm", "Fragrance"] },
 "FOSFAT DETERJAN": { ad: "Fosfat", kat: "Çamaşır Deterjanı", risk: "orta", organlar: ["Çevre"], etki: "Su kaynaklarında ötrofikasyon. AB sınırladı.", kaynak: "EU Regulation 259/2012 · WHO Water Quality", alternatif: "Fosfatsız sertifikalı deterjanlar · Çamaşır cevizi · Sabun fındığı" , arar: ["Fosfat"] },
 "OPTİK BEYAZLATICI": { ad: "Optik Beyazlatıcı (Stilben)", kat: "Çamaşır Deterjanı", risk: "yuksek", organlar: ["Cilt", "Çevre"], etki: "Kumaşta kalır, UV ışığı yansıtır. Alerji ve fotodermatit.", kaynak: "EWG Cleaners Database · ECHA Stilbene", alternatif: "Çamaşır sodası + güneşte kurutma" , arar: ["Optik Beyazlatıcı", "Stilben"] },
 "NPE": { ad: "Nonilfenol Etoksilat (NPE)", kat: "Yüzey Aktif Madde", risk: "kritik", organlar: ["Hormonal Sistem"], etki: "Östrojen taklitçisi. AB'de yasaklı. Çin tekstil üretiminde hâlâ kullanılıyor.", kaynak: "EU REACH Annex XVII · Greenpeace Detox 2011", alternatif: "AB üretimi sertifikalı deterjanlar" , arar: ["Nonilfenol Etoksilat", "NPE"] },
 "DEA TEA": { ad: "DEA / TEA (Etanolamin)", kat: "Köpürtücü", risk: "yuksek", organlar: ["Karaciğer", "Böbrek"], etki: "Nitrosaminlere dönüşebilir (kanserojen).", kaynak: "California Prop 65 · NTP 1999", alternatif: "Bitkisel sabun bazlı deterjanlar" , arar: ["DEA", "TEA", "Etanolamin"] },
 "DİKLORBENZEN": { ad: "Para-Diklorobenzen (Tuvalet Bloğu)", kat: "Koku Giderici", risk: "kritik", organlar: ["Karaciğer", "Böbrek", "Akciğer"], etki: "IARC Grup 2B muhtemel kanserojen.", kaynak: "IARC Vol 73 · ATSDR 2006", alternatif: "Karbonat + esansiyel yağ · Sirke + karbonat" , arar: ["Para", "Diklorobenzen", "Tuvalet Bloğu"] },
};

/* ══════════════════════════════════════════════
 BEBEK ÜRÜNLERİ VERİTABANI
 ══════════════════════════════════════════════ */
const BEBEK_DB = {
 "BPA BİBERON": { ad: "BPA (Bisfenol A)", kat: "Plastik Biberon", risk: "kritik", organlar: ["Hormonal Sistem", "Beyin", "Üreme"], etki: "AB 2011'de bebek biberonlarında yasakladı. Östrojen taklitçisi.", kaynak: "EU Directive 2011/8/EU · FDA BPA Ban 2012", alternatif: "Cam biberon · Paslanmaz çelik · BPA-free polipropilen" , arar: ["BPA", "Bisfenol A"] },
 "BPS": { ad: "BPS (Bisfenol S)", kat: "BPA-Free Plastik", risk: "yuksek", organlar: ["Hormonal Sistem"], etki: "BPA alternatifi olarak kullanılır ama benzer hormon bozucu etki.", kaynak: "Rochester & Bolden EHP 2015", alternatif: "Cam veya paslanmaz çelik biberon" , arar: ["BPS", "Bisfenol S"] },
 "FTALAT OYUNCAK": { ad: "Ftalat (DEHP, DINP)", kat: "Yumuşak Plastik Oyuncak", risk: "kritik", organlar: ["Hormonal Sistem", "Üreme"], etki: "AB ve ABD oyuncaklarda yasakladı. Hormonal bozucu.", kaynak: "EU REACH Annex XVII · CPSIA 2008 (ABD)", alternatif: "Ahşap oyuncak · Doğal kauçuk · Pamuk peluş" , arar: ["Ftalat", "DEHP", "DINP"] },
 "KURŞUN BOYALI OYUNCAK": { ad: "Kurşun (Pb)", kat: "Boya/Metal Oyuncak", risk: "kritik", organlar: ["Beyin", "Sinir Sistemi", "Kan"], etki: "Bebeklerde kalıcı IQ ve davranış hasarı. Güvenli düzeyi yok.", kaynak: "WHO Lead Poisoning · CDC Childhood Lead", alternatif: "AB/CE sertifikalı · Doğal ahşap · Su bazlı boya" , arar: ["Kurşun"] },
 "PARFÜMLÜ BEZ": { ad: "Bebek Bezi Parfümü", kat: "Tek Kullanımlık Bez", risk: "yuksek", organlar: ["Cilt", "Üreme"], etki: "Ftalat ve sentetik koku içerebilir. Bebek genital bölge teması.", kaynak: "ANSES France 2019 Diaper Study", alternatif: "Parfümsüz ve klorsuz bezler · Bambu/pamuk bezler" , arar: ["Bebek Bezi Parfümü"] },
 "TBT": { ad: "Tributiltin (TBT)", kat: "PVC Oyuncak Stabilizatörü", risk: "kritik", organlar: ["Bağışıklık", "Hormonal Sistem"], etki: "PVC stabilizatörü. Hormonal ve bağışıklık bozucu.", kaynak: "EU REACH · WHO IPCS 1990", alternatif: "PVC-free oyuncaklar (doğal kauçuk, ahşap)" , arar: ["Tributiltin", "TBT"] },
 "MİNERAL YAĞ BEBEK": { ad: "Mineral Yağ (Petrolatum)", kat: "Bebek Yağı/Kremi", risk: "orta", organlar: ["Cilt"], etki: "Petrol türevi. Saf olmayan formlarda PAH kalıntısı.", kaynak: "EWG Cosmetics · IARC Untreated Mineral Oil Group 1", alternatif: "Saf badem yağı · Hindistan cevizi yağı · Shea yağı" , arar: ["Mineral Yağ", "Petrolatum"] },
 "PARABEN BEBEK ŞAMPUAN": { ad: "Paraben (Bebek Ürünleri)", kat: "Bebek Şampuan/Krem", risk: "yuksek", organlar: ["Hormonal Sistem"], etki: "Östrojen taklitçisi. Bebek cildi daha geçirgen, risk yüksek.", kaynak: "Danimarka Sağlık 2011 (3 yaş altı yasağı önerisi)", alternatif: "Paraben-free etiketli bebek ürünleri" , arar: ["Paraben", "Bebek Ürünleri"] },
 "PALM YAĞI MAMA": { ad: "Palm Oleini (Bebek Maması)", kat: "Bebek Maması Yağı", risk: "orta", organlar: ["Sindirim", "Mineral Emilimi"], etki: "Bebeklerde kalsiyum emilimini azaltır, sert dışkı yapar.", kaynak: "Koo et al. Pediatrics 2003 · ESPGHAN", alternatif: "Palm yağsız bebek maması · Anne sütü (mümkünse)" , arar: ["Palm Oleini", "Bebek Maması"] },
 "GLİFOSAT MAMA": { ad: "Glifosat Kalıntısı", kat: "Tahıl Bazlı Mama", risk: "yuksek", organlar: ["Bağırsak Florası", "Karaciğer"], etki: "IARC Grup 2A muhtemel kanserojen. Yulaf ve buğday maması ile bebeklere geçer.", kaynak: "IARC Monograph Vol 112 · EWG 2018 Cereal Test", alternatif: "Organik sertifikalı bebek maması" , arar: ["Glifosat Kalıntısı"] },
};

/* ══════════════════════════════════════════════
 EVCİL HAYVAN VERİTABANI (mizaç/burç/makam YOK)
 ══════════════════════════════════════════════ */
const EVCIL_DB = {
 "BHA MAMA": { ad: "BHA (Bütil Hidroksianisol)", kat: "Mama Koruyucusu", risk: "yuksek", organlar: ["Karaciğer"], etki: "Kuru kedi/köpek mamalarında yaygın. Uzun süreli tüketimde karaciğer yükü.", kaynak: "NTP Report on Carcinogens · Pet Food Institute", alternatif: "Doğal koruyuculu mamalar (E vitamini/tokoferol)" , arar: ["BHA", "Bütil Hidroksianisol"] },
 "BHT MAMA": { ad: "BHT (Bütil Hidroksitoluen)", kat: "Mama Koruyucusu", risk: "yuksek", organlar: ["Karaciğer", "Böbrek"], etki: "Kuru mama oksidasyon önleyici. Hayvan çalışmalarında karaciğer ve böbrek toksisitesi.", kaynak: "EFSA 2012 · IARC Vol 40", alternatif: "Rozmarin ekstresi ile korunmuş mamalar" , arar: ["BHT", "Bütil Hidroksitoluen"] },
 "ETOKSİQUİN": { ad: "Etoksiquin", kat: "Balık Unu Koruyucusu", risk: "kritik", organlar: ["Karaciğer", "Böbrek", "Kan"], etki: "AB 2017'de yem katkı maddesi olarak askıya aldı. İnsan tüketimi için yasaklı.", kaynak: "EU Reg 2017/962 · EFSA FEEDAP 2015", alternatif: "Etoksiquin-free etiketli mamalar" , arar: ["Etoksiquin"] },
 "PROPİLEN GLİKOL KEDİ": { ad: "Propilen Glikol", kat: "Yarı Nemli Mama", risk: "yuksek", organlar: ["Kan (kedilerde)"], etki: "Kedilerde Heinz body anemisine yol açar. FDA kedi mamasında yasakladı.", kaynak: "FDA 21 CFR 589.1001", alternatif: "Propilen glikol içermeyen mamalar" , arar: ["Propilen Glikol"] },
 "MELAMİN": { ad: "Melamin Kontaminasyonu", kat: "Düşük Kaliteli Protein", risk: "kritik", organlar: ["Böbrek"], etki: "2007 ABD'de binlerce hayvan ölümüne sebep oldu. Sahte protein katkısı.", kaynak: "FDA 2007 Pet Food Recall · WHO Melamine 2008", alternatif: "Güvenilir markaların sertifikalı mamaları" , arar: ["Melamin Kontaminasyonu"] },
 "AFLATOKSİN": { ad: "Aflatoksin (Küf Toksini)", kat: "Mısır Bazlı Mama", risk: "kritik", organlar: ["Karaciğer"], etki: "Mısır ve fıstık küfünden. IARC Grup 1 kanserojen. Köpek/kedi karaciğer yetmezliği.", kaynak: "IARC Vol 100F · FDA Pet Food Recall (Sunshine Mills 2020)", alternatif: "Aflatoksin testli mamalar · Tahılsız alternatifler" , arar: ["Aflatoksin", "Küf Toksini"] },
 "YAPAY RENK MAMA": { ad: "Yapay Renklendirici (E102, E110, E124)", kat: "Renkli Köpek Maması", risk: "yuksek", organlar: ["Bağırsak", "Bağışıklık"], etki: "Hayvana renk vermez — sahibe estetik. Hayvanda hiperaktivite ve alerji.", kaynak: "EFSA Reevaluation 2009 · McCann Lancet 2007", alternatif: "Doğal renkli (pancar, havuç bazlı) mamalar" , arar: ["Yapay Renklendirici", "E102", "E110", "E124"] },
 "FLEA COLLAR TCVP": { ad: "Tetrachlorvinphos (Pire Tasması)", kat: "Pire/Kene Tasması", risk: "kritik", organlar: ["Sinir Sistemi", "Cilt"], etki: "Organofosfat. NRDC çocuklarda nörogelişimsel risk belgeledi.", kaynak: "NRDC 2009 Pet Pesticide Report · EPA TCVP", alternatif: "Doğal sedir/limon yağı tasmalar · Veteriner reçeteli güvenli formüller" , arar: ["Tetrachlorvinphos", "Pire Tasması"] },
 "FİPRONİL": { ad: "Fipronil", kat: "Sırta Damla Pire İlacı", risk: "yuksek", organlar: ["Sinir Sistemi"], etki: "Tavşan, kuş ve kemirgenlerde toksik. Çocuk evlerinde dikkat.", kaynak: "EPA Fipronil RED · EU Commission 2017 (egg scandal)", alternatif: "Doğal pire önleyiciler · Veteriner kontrolünde alternatif" , arar: ["Fipronil"] },
 "ÇİKOLATA": { ad: "Teobromin (Çikolata)", kat: "İnsan Yiyeceği", risk: "kritik", organlar: ["Kalp", "Sinir Sistemi"], etki: "Köpek ve kedi için ölümcül. 50g bitter çikolata orta boy köpek için tehlikeli.", kaynak: "ASPCA Animal Poison Control · MSD Vet Manual", alternatif: "Hayvan dostu ödüller (doğal et kurutmalar)" , arar: ["Teobromin", "Çikolata"] },
 "SOĞAN SARIMSAK": { ad: "Soğan/Sarımsak", kat: "İnsan Yiyeceği", risk: "kritik", organlar: ["Kan"], etki: "Kedi ve köpekte hemolitik anemi (alyuvar yıkımı).", kaynak: "ASPCA Toxic Plants/Foods · Cope J Vet Med 2005", alternatif: "Hayvana özel hazırlanmış maması" , arar: ["Soğan", "Sarımsak"] },
 "KSİLİTOL": { ad: "Ksilitol (Sakız Tatlandırıcısı)", kat: "İnsan Şekersiz Ürünleri", risk: "kritik", organlar: ["Pankreas", "Karaciğer"], etki: "Köpekte insülin şoku ve karaciğer yetmezliği. Çok küçük miktarda öldürücü.", kaynak: "ASPCA Xylitol Warning · FDA Pet Health 2016", alternatif: "Hayvan ödülü olarak sadece veteriner onaylı ürünler" , arar: ["Ksilitol", "Sakız Tatlandırıcısı"] },
};

/* ══════════════════════════════════════════════
 İLAÇ / VİTAMİN VERİTABANI
 ══════════════════════════════════════════════ */
const ILAC_DB = {
 "PARASETAMOL DOZ AŞIMI": { ad: "Parasetamol (Yüksek Doz)", kat: "Ağrı Kesici", risk: "kritik", organlar: ["Karaciğer"], etki: "Günlük 4g üzeri karaciğer yetmezliği. ABD'de akut karaciğer yetmezliğinin #1 sebebi.", kaynak: "FDA Acetaminophen Warning 2011 · NEJM 2005", alternatif: "Doktor kontrolünde kullanım · Doğal antienflamatuvar (zerdeçal, zencefil)" , arar: ["Parasetamol", "Yüksek Doz"] },
 "NSAID UZUN SÜRE": { ad: "NSAID (İbuprofen Uzun Süreli)", kat: "Ağrı Kesici", risk: "yuksek", organlar: ["Mide", "Böbrek", "Kalp"], etki: "3 günden uzun kullanımda mide kanaması, böbrek hasarı, kardiyovasküler risk.", kaynak: "FDA NSAID Warning 2015 · BMJ 2017", alternatif: "Doktor kontrolünde · Topikal alternatifler" , arar: ["NSAID", "İbuprofen Uzun Süreli"] },
 "PPI UZUN SÜRE": { ad: "Proton Pompası İnhibitörü (Uzun Vadeli)", kat: "Mide İlacı", risk: "yuksek", organlar: ["Kemik", "Böbrek", "B12 Emilimi"], etki: "1 yıl üzeri kullanımda osteoporoz, kronik böbrek hastalığı, B12 eksikliği.", kaynak: "JAMA Intern Med 2016 · FDA PPI Safety", alternatif: "Doktor takibi · Beslenme değişikliği · Zencefil, papatya" , arar: ["Proton Pompası İnhibitörü", "Uzun Vadeli"] },
 "MEGADOZ A VİTAMİNİ": { ad: "A Vitamini (Megadoz)", kat: "Yağda Çözünür Vitamin", risk: "kritik", organlar: ["Karaciğer", "Kemik", "Fetüs"], etki: "10.000 IU üzeri günlük doz hamilelerde doğum kusuru, karaciğer toksisitesi.", kaynak: "IOM DRI 2001 · Teratology 1995 (Rothman)", alternatif: "Beta-karoten (havuç, ıspanak) · Önerilen doz 700-900 IU" , arar: ["A Vitamini", "Megadoz"] },
 "MEGADOZ D VİTAMİNİ": { ad: "D Vitamini (Megadoz)", kat: "Yağda Çözünür Vitamin", risk: "yuksek", organlar: ["Böbrek", "Kalp", "Kan"], etki: "Günlük 10.000 IU üzeri uzun süre kullanım hiperkalsemi ve böbrek taşı.", kaynak: "Endocrine Society Guideline 2011 · NIH ODS", alternatif: "Kan testiyle doz ayarı (D-25 OH) · Güneş 15-20 dk" , arar: ["D Vitamini", "Megadoz"] },
 "DEMİR AŞIRI": { ad: "Demir Takviyesi (Test Olmadan)", kat: "Mineral", risk: "yuksek", organlar: ["Karaciğer", "Kalp", "Pankreas"], etki: "Hemokromatoz olanlarda ölümcül. Çocuk zehirlenmesinde #1 sebep (ABD).", kaynak: "AAP Iron Poisoning · NIH ODS Iron", alternatif: "Ferritin testiyle ihtiyaç teyidi · Pekmez, kuru meyve, kırmızı et" , arar: ["Demir Takviyesi", "Test Olmadan"] },
 "EFEDRA": { ad: "Efedra (Ma Huang) Zayıflama", kat: "Bitkisel Zayıflama", risk: "kritik", organlar: ["Kalp", "Sinir Sistemi"], etki: "FDA 2004'te yasakladı. Kalp krizi, inme ve ölüm raporları.", kaynak: "FDA Final Rule 2004 · NEJM 2000 Haller", alternatif: "Doktor kontrolünde · Yeşil çay, beslenme + egzersiz" , arar: ["Efedra  Zayıflama", "Ma Huang"] },
 "KAVA KAVA": { ad: "Kava Kava", kat: "Bitkisel Sakinleştirici", risk: "yuksek", organlar: ["Karaciğer"], etki: "Akut karaciğer yetmezliği vakaları. Almanya, İngiltere, Kanada sınırladı.", kaynak: "WHO Kava Report 2007 · BfArM Almanya 2002", alternatif: "Papatya · Melisa · Lavanta" , arar: ["Kava Kava"] },
 "ARALIA HİDRASTİS": { ad: "Hidrastis (Goldenseal) — Hamilelikte", kat: "Bitkisel Antibakteriyel", risk: "kritik", organlar: ["Fetüs", "Karaciğer"], etki: "Berberin alkaloidi yenidoğanda kernikterus riski.", kaynak: "AAP Committee on Drugs · NIH NCCIH Goldenseal", alternatif: "Hamilelikte doktor onayı olmadan bitkisel kullanma" , arar: ["Hidrastis", "Hamilelikte", "Goldenseal"] },
 "ST JOHN WORT": { ad: "St. John's Wort (Sarı Kantaron)", kat: "Bitkisel Antidepresan", risk: "yuksek", organlar: ["İlaç Etkileşimi"], etki: "Doğum kontrol, kan sulandırıcı, antidepresan ve kalp ilaçlarının etkisini değiştirir.", kaynak: "NIH NCCIH · Mayo Clinic Drug Interactions", alternatif: "Doktor kontrolünde · Egzersiz, omega-3, beslenme" , arar: ["ST"] },
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
 { kelimeler: ["SEKER", "SUGAR", "SAKAROZ", "SUKROZ"], ad: "Şeker", uyari: "Ürünün ana içeriklerinden biri ŞEKER. Tek bir porsiyonda WHO günlük şeker limitini aşar." },
 { kelimeler: ["GLIKOZ SURUBU", "GLUKOZ SURUBU", "GLIKOZ FRUKTOZ", "GLUKOZ FRUKTOZ", "MISIR SURUBU", "HFCS", "NISASTA BAZLI SEKER", "NBS"], ad: "Mısır/Glikoz Şurubu (HFCS)", uyari: "Ana içerik mısır şurubu (HFCS). Doğrudan karaciğere gider, yağlanma yapar." },
 { kelimeler: ["PALMIYE YAGI", "PALM YAGI", "PALM OIL", "PALMOLEIN", "HURMA YAGI"], ad: "Palmiye Yağı", uyari: "Ana içerik PALMİYE yağı. 3-MCPD ve glisidil ester kontaminantı. Çocuk için tehlikeli." },
 { kelimeler: ["BITKISEL YAG"], ad: "Belirtilmemiş Bitkisel Yağ", uyari: "Hangi bitkisel yağ olduğu yazmamış - genelde palmiye yağıdır. Üretici gizliyor." },
 { kelimeler: ["HIDROJENE", "HIDROJENIZE", "PARTIALLY HYDROGENATED"], ad: "Hidrojenize Yağ (Trans Yağ)", uyari: "Ana içeriklerden biri HİDROJENİZE yağ. Trans yağ kalp damar hastalığı temel sebebi." },
 { kelimeler: ["MARGARIN", "MARGARINE"], ad: "Margarin", uyari: "Ana içerik MARGARİN. Bitkisel yağ + emülgatör karışımı, trans yağ kalıntısı taşır." },
 { kelimeler: ["BEYAZ UN", "RAFINE UN"], ad: "Beyaz Un", uyari: "Ana içerik rafine beyaz un. Glisemik indeks yüksek, lif ve vitamin yok." },
 { kelimeler: ["SU"], ad: "Su (Dolgu)", uyari: "Ürünün ana içeriği SU. Et, peynir, süt ürünlerinde bu hile - su parasına et alıyorsunuz." },
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
 alert("Kamera henüz hazır değil, biraz bekle.");
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
 alert("Metin okunamadı: " + (e.message || "Bilinmeyen hata") + ". Tekrar dene veya manuel giriş yap.");
 setDurum("kirp");
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
 {durum === "kirp" && fotoUrl && (
 <>
 <div style={{ color: C.altin, fontSize: 12, fontWeight: 700, marginBottom: 8, textAlign: "center" }}>Etiketi çerçeve ile seç, köşelerden büyüt/küçült</div>
 <div ref={kirpRef} style={{ position: "relative", borderRadius: 16, overflow: "hidden", background: "#000", marginBottom: 10, userSelect: "none", touchAction: "none" }}>
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
 <button onClick={tekrarCek} style={{ flex: 1, background: C.y, border: `1px solid ${C.s}`, borderRadius: 12, padding: "12px", color: C.soluk, fontWeight: 600, cursor: "pointer", fontFamily: "Georgia,serif" }}>Tekrar Çek</button>
 <button onClick={kirpVeAnaliz} style={{ flex: 2, background: `linear-gradient(135deg,${C.altin},${C.altinA})`, border: "none", borderRadius: 12, padding: "12px", color: "#1A1200", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "Georgia,serif" }}>Bu Alanı Oku & Analiz Et</button>
 </div>
 </>
 )}
 {durum === "aktif" && (
 <>
 <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", background: "#000", marginBottom: 10 }}>
 <video ref={videoRef} autoPlay playsInline muted style={{ width: "100%", display: "block", maxHeight: 480, objectFit: "cover", transform: `scale(${zoom})`, transformOrigin: "center" }} />
 <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", background: C.altin, borderRadius: 6, padding: "4px 12px", pointerEvents: "none" }}>
 <span style={{ color: "#1A1200", fontSize: 11, fontWeight: 700 }}>Etiketi netleştir, yakınlaştır, fotoğraf çek</span>
 </div>
 </div>
 <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.y, padding: "10px 14px", borderRadius: 12, marginBottom: 10 }}>
 <button onClick={() => setZoom(Math.max(1, zoom - 0.25))} style={{ background: C.s, border: "none", borderRadius: 8, width: 36, height: 36, color: C.altin, fontSize: 20, fontWeight: 700, cursor: "pointer", fontFamily: "Georgia,serif" }}>−</button>
 <input type="range" min="1" max="4" step="0.1" value={zoom} onChange={e => setZoom(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.altin }} />
 <button onClick={() => setZoom(Math.min(4, zoom + 0.25))} style={{ background: C.s, border: "none", borderRadius: 8, width: 36, height: 36, color: C.altin, fontSize: 20, fontWeight: 700, cursor: "pointer", fontFamily: "Georgia,serif" }}>+</button>
 <div style={{ color: C.altin, fontSize: 12, fontWeight: 700, minWidth: 40, textAlign: "right" }}>{zoom.toFixed(1)}x</div>
 </div>
 <canvas ref={canvasRef} style={{ display: "none" }} />
 <div style={{ display: "flex", gap: 8 }}>
 <button onClick={kameraKapat} style={{ flex: 1, background: C.y, border: `1px solid ${C.s}`, borderRadius: 12, padding: "12px", color: C.soluk, fontWeight: 600, cursor: "pointer", fontFamily: "Georgia,serif" }}>Kapat</button>
 <button onClick={fotografCek} style={{ flex: 2, background: `linear-gradient(135deg,${C.altin},${C.altinA})`, border: "none", borderRadius: 12, padding: "12px", color: "#1A1200", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "Georgia,serif" }}>Fotoğraf Çek</button>
 </div>
 </>
 )}
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
 const [belirsizler, setBelirsizler] = useState([]);
 const [ilkSira, setIlkSira] = useState([]);
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
 setBelirsizler(belirsizBul(metin));
 setIlkSira(ilkSiraTespit(metin));
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
