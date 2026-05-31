# Şadırvân-ı Şifa — Ses Dosyası Kılavuzu

Şadırvân çaları, bu klasöre eklenen ses dosyalarını **kendiliğinden** çalar.
Kod tarafında hiçbir değişiklik gerekmez; sadece dosyaları doğru isimle bu
klasöre koyup commit etmen yeterlidir.

## Gerekli dosyalar

Bu klasöre (`public/ses/`) tam olarak şu iki dosyayı ekle:

| Dosya adı   | İçerik                                  | Öneri                          |
|-------------|------------------------------------------|--------------------------------|
| `su.mp3`    | Çeşme / şadırvan su şırıltısı (döngü)    | 1–3 dk, sorunsuz loop, stereo  |
| `ney.mp3`   | Ney makam icrası / dingin enstrümantal   | 1–3 dk, sorunsuz loop          |

> Dosyalar döngüye (loop) alınacağı için **başı ve sonu birbirine yumuşak
> bağlanan** kayıtlar seç; ani kesik duyulmasın.

## Biçim

- Format: **MP3** (en geniş tarayıcı/iOS-Android uyumu).
- Örnekleme: 44.1 kHz, 128–192 kbps yeterli.
- İstersen `.mp3` yerine `.ogg` de eklenebilir; ancak kod `.mp3` arar.

## Telif

Yalnızca **telifsiz / lisansı uygun** (CC0, kendi kaydın, satın alınmış
lisans) ses kullan. Kaynak ve lisans bilgisini bu klasörde bir not olarak
saklaman önerilir.

## Nasıl çalışır

- Kullanıcı "Şadırvânı Uyandır"a bastığında ve üstteki ses açıksa,
  uygulama `su.mp3` ve `ney.mp3` dosyalarını döngüde çalar.
- Dosyalar yoksa modül **sessiz** çalışır; yalnız görsel (su akışı, dalga,
  fıskiye) animasyonu oynar. Hata vermez.

## Ekledikten sonra

1. Dosyaları bu klasöre koy.
2. `git add public/ses/su.mp3 public/ses/ney.mp3`
3. `git commit -m "Şadırvân ses dosyalarını ekle"`
4. Push et. Build sırasında dosyalar otomatik olarak `dist/ses/` altına kopyalanır.
