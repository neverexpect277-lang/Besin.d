/* Statik veriler (DB dışı) — app.jsx'ten ayrıldı */
import { BEBEK_DB } from "./data/bebek.js";
import { EVCIL_DB } from "./data/evcil.js";
import { EV_DB } from "./data/ev.js";
import { GIDA_DB } from "./data/gida.js";
import { GIYIM_DB } from "./data/giyim.js";
import { ILAC_DB } from "./data/ilac.js";
import { KOZMETIK_DB } from "./data/kozmetik.js";
import { TEMIZLIK_DB } from "./data/temizlik.js";

export const ATM_KONUMLAR = [
 { ad: "Şahinbey · Karataş", not: "Besin Dedektifi · Aqua ATM", lat: 37.0380, lng: 37.3300, durum: "Yakında" },
 { ad: "Şehitkamil · Kale önü", not: "Besin Dedektifi · Aqua ATM", lat: 37.0647, lng: 37.3829, durum: "Yakında" },
];

// Haversine — iki konum arası km
export const YASAL = [
 "Bu uygulama bir tıbbi cihaz, teşhis aracı veya ilaç değildir.",
 "Verilen bilgiler hiçbir şekilde tıbbi tavsiye, teşhis veya tedavi yerine geçmez.",
 "Tüm kararlar kullanıcının kendi sorumluluğundadır.",
 "Uygulama; EFSA, WHO, IARC ve Türk Gıda Kodeksi'ndeki kamuya açık verileri arşivlemektedir.",
 "Hiçbir firmayı, markayı veya ürünü suçlamaz; yalnızca madde bazlı arşiv bilgisi sunar.",
];

/* ── ŞİFA AYETLERİ ──────────────────────────── */
export const AYETLER = [
 { sure: "Şuara 80", metin: "Hastalandığımda bana şifa veren O'dur." },
 { sure: "İsra 82", metin: "Biz Kur'an'dan müminler için şifa ve rahmet olan şeyler indiriyoruz." },
 { sure: "Yunus 57", metin: "Ey insanlar! Size Rabbinizden bir öğüt, kalplerdekine bir şifa geldi." },
 { sure: "Nahl 69", metin: "Onun karınlarından türlü renklerde şerbet çıkar; onda insanlar için şifa vardır." },
 { sure: "Tevbe 14", metin: "...ve mü'min topluluğun göğüslerini şifalandırır." },
 { sure: "Fussilet 44", metin: "De ki: O, iman edenler için doğru yolu gösteren ve şifadır." },
];
export const MAKAMLAR = {
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
export const ESREF = [
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
export const MIZAC_MARKET = {
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

export const BURC_EMOJI = { "Koç": "", "Boğa": "", "İkizler": "", "Yengeç": "", "Aslan": "", "Başak": "", "Terazi": "", "Akrep": "", "Yay": "", "Oğlak": "", "Kova": "", "Balık": "" };
export const BURCLAR = {
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

export const KATEGORILER = {
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
export const MARKET_KATEGORI = {
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

export const BELIRSIZ_KELIMELER = [
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

export const HAKKINDA = {
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
export const ORGAN_DESTEK = {
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
export const DOGAL_TARIF = {
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
export const URUN_TURLERI = [
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

export const ORGAN_POZISYON = {
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
export const ORGAN_CINSIYET = {
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
export const VUCUT_SILUET = {
  "Erkek": "M50 4 C44 4 39 9 39 16 C39 22 41 27 44 30 L43 36 C41 37 38 38 36 39 C30 41 25 45 23 52 L21 60 C19 65 18 70 18 76 L19 88 C19 94 19 100 20 106 L20 120 C20 130 18 138 18 146 L19 152 L24 152 L26 165 L28 178 L30 192 L36 196 L42 196 L44 184 L46 170 L48 158 L48 152 L52 152 L52 158 L54 170 L56 184 L58 196 L64 196 L70 192 L72 178 L74 165 L76 152 L81 152 L82 146 C82 138 80 130 80 120 L80 106 C81 100 81 94 81 88 L82 76 C82 70 81 65 79 60 L77 52 C75 45 70 41 64 39 C62 38 59 37 57 36 L56 30 C59 27 61 22 61 16 C61 9 56 4 50 4 Z",
  "Kadın": "M50 4 C44 4 39 9 39 16 C39 22 41 27 44 30 L43 36 C41 37 38 38 36 39 C31 41 26 45 24 52 L22 62 C20 68 20 73 21 79 L23 88 C23 94 22 100 22 106 C22 110 21 114 20 118 L18 130 C17 138 16 146 17 152 L23 152 L25 165 L27 178 L29 192 L36 196 L42 196 L44 184 L46 170 L48 158 L48 152 L52 152 L52 158 L54 170 L56 184 L58 196 L64 196 L71 192 L73 178 L75 165 L77 152 L83 152 C84 146 83 138 82 130 L80 118 C79 114 78 110 78 106 C78 100 77 94 77 88 L79 79 C80 73 80 68 78 62 L76 52 C74 45 69 41 64 39 C62 38 59 37 57 36 L56 30 C59 27 61 22 61 16 C61 9 56 4 50 4 Z",
  "Çocuk": "M50 6 C42 6 36 12 36 20 C36 27 39 33 43 36 L42 42 C40 43 37 44 35 45 C29 47 25 51 23 58 L22 66 C21 72 21 78 22 84 L23 96 C23 104 22 112 22 120 L22 134 C22 142 21 150 22 156 L26 156 L28 168 L30 180 L32 192 L38 196 L44 196 L46 184 L48 172 L49 160 L49 156 L51 156 L51 160 L52 172 L54 184 L56 196 L62 196 L68 192 L70 180 L72 168 L74 156 L78 156 C79 150 78 142 78 134 L78 120 C78 112 77 104 77 96 L78 84 C79 78 79 72 78 66 L77 58 C75 51 71 47 65 45 C63 44 60 43 58 42 L57 36 C61 33 64 27 64 20 C64 12 58 6 50 6 Z"
};

