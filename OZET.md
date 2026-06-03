# Devir Özeti (Besin Dedektifi)

Yeni oturum bunu okusun. Tek dosya: `app.jsx` (~9000 satır, tek React bileşeni). Build: `npm run build`.

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
- Aile profilleri (`aileProfiller` / `bd_aile`): okunuyor ama `setAileProfiller` hiç çağrılmıyor → liste hep boş (ölü özellik, dokunulmadı).
- localStorage anahtarları: `bd_profil`, `bd_dogum`, `bd_cinsiyet`, `bd_liyakat`, `bd_gecmis`, `bd_nur`, `bd_aile`.
- Veritabanı: katkı maddeleri ~satır 406+ (E-kodları), burçlar `BURCLAR` ~370.

## Çalışma kuralları (CLAUDE.md)
- Varsayım yapma, belirsizse SOR. Kod yazmadan önce plan + onay al.
- Küçük adım, surgical değişiklik; görmediğin kodu silme.
- Token tasarrufu: dolgu cümle yok, sadece değişen kısmı göster.
- Aynı hatayı 2 kez deneme; 2. denemede dur ve alternatif sun.
