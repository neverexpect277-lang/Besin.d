# Devir Özeti (Besin Dedektifi)

Yeni oturum bunu okusun. Build: `npm run build`.

## Dosya yapısı (artık modüler — eskiden tek app.jsx idi)
| Dosya | İçerik | Satır |
|-------|--------|-------|
| `app.jsx` | Sadece `App()` bileşeni (tüm ekranlar/state) | ~4475 |
| `components.jsx` | Bağımsız UI bileşenleri (KameraOCR, PaylasModal, SkorHalkasi, MizacMarket, TarifModal, HaftalikRapor, BolumKart, SuAtmSekmesi, AquaAtmGorsel, ToplulugaKatki, FotoIsim, OrganVucutHaritasi) | ~1071 |
| `helpers.js` | Yardımcı fonksiyonlar (analiz, normalize, burcHesapla, rR/rE, bdToast, …) | ~202 |
| `sabitler.js` | DB dışı statik veri (KATEGORILER, BURCLAR, MAKAMLAR, HAKKINDA, ORGAN_* …) | ~699 |
| `theme.js` | `C` (renk), `css` (global stil), `S` (stil objesi) | ~24 |
| `data/*.js` | 8 ürün veritabanı: gida, giyim, ev, kozmetik, temizlik, bebek, evcil, ilac | ~3400 |

**Bağımlılık yönü (döngü yok):** `data → sabitler → helpers → components → app`. Bir bug'da sadece ilgili modülü oku.

**Bilinen ölü kod:** `OrganVucutHaritasi` (components.jsx) hiçbir yerden kullanılmıyor — tree-shake ile bundle'a girmiyor. Silinmedi (kullanıcıya sormadan dokunma).

## Bu oturumda yapılanlar (hepsi `main`'e push'landı)
| Commit | İş | Yer |
|--------|-----|-----|
| 57f90ae | Kritik/yüksek bulguda haptik titreşim (`navigator.vibrate`) | yapAnaliz, setEkran("sonuc") timeout'u |
| 0d6da89 | Skor halkası 0'dan sayma + dolma + aura animasyonu | `SkorHalkasi` bileşeni (PaylasModal üstü) + risk kutusu |
| 995d7dd | Tartılıyor ekranı sinematik: giriş + tartım dalgaları + düşen zerreler | keyframes `css` string'i + ekran "tartiliyor" |
| 2e8f656 | Paylaşım kartına altın mühür filigranı + doku | `skorKartRef` div'i |
| 113300e | Profil tarih/isim kalıcılığı düzeltmesi | yeni `useEffect` (~5446) |

## Son düzeltmenin özü (profil)
- Sorun: `dogum/aktifUye/cinsiyet` state'leri sadece uygulama açılışında bir kez okunuyordu → girip çıkınca form boşalıyordu.
- Çözüm: profil_kur ekranına her girişte kayıtlı `profil`'den forma otomatik doldurma (`useEffect`, dep: `[ekran]`).
- "Değiştir" ve "Profili Kaydet" butonları korundu.

## Önemli notlar / bilinen durumlar
- TEK PROFİL. Aile/çoklu profil özelliği denendi ve KULLANICI İSTEĞİYLE TAMAMEN KALDIRILDI (`db1f09a`). Tekrar ekleme — istenmiyor.
- Eski `bd_aile` / `bd_kisiler` localStorage anahtarları artık hiçbir kod tarafından okunmuyor (inert kalıntı).
- localStorage anahtarları: `bd_profil`, `bd_dogum`, `bd_cinsiyet`, `bd_liyakat`, `bd_gecmis`, `bd_nur`, `bd_saglik`, `bd_sina_defter`.
- Veritabanı: katkı maddeleri ~satır 406+ (E-kodları), burçlar `BURCLAR` ~370.

## Çalışma kuralları (CLAUDE.md)
- Varsayım yapma, belirsizse SOR. Kod yazmadan önce plan + onay al.
- Küçük adım, surgical değişiklik; görmediğin kodu silme.
- Token tasarrufu: dolgu cümle yok, sadece değişen kısmı göster.
- Aynı hatayı 2 kez deneme; 2. denemede dur ve alternatif sun.
