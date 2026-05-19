# M15 Premium UI / Art Direction Report

Milestone: M15 Premium UI/UX Polish & Internal Alpha Handoff Readiness

Status: ART DIRECTION ACCEPTED / BUILDER PATCH READY

## 1. Premium UI Vision

M15 hedefi, çalışan prototip hissini premium Android TV / Fire TV streaming ürünü hissine yükseltmektir.

M14 smoke path geçti:

- APK çalışıyor
- Splash -> Login -> Activation `demo123` -> Home -> Detail -> Play Mock -> Player shell doğrulandı
- Crash yok
- M14 LOCKED

M15 davranış değiştirmez. Mevcut çalışan yolu bozmadan görsel kalite ve TV usability yükseltilir.

## 2. Visual Identity Direction

Nexora görsel dili:

- Dark cinematic base
- Deep navy / black gradient
- Cyan/teal accent, az ve kaliteli kullanım
- Soft glow
- Premium panel/card surfaces
- Yumuşak border ve depth
- Büyük TV typography
- Calm, uncluttered layout

Kaçınılacak yön:

- Düz siyah + basit text/button prototip hissi
- Rastgele parlak renkler
- Yoğun teknik/debug metinleri
- Mobile-style form layout

## 3. Screen-by-Screen Polish Direction

### Splash

Mevcut: siyah zemin + ortada NEXORA.

Polish yönü:

- Büyük NEXORA wordmark
- Kısa tagline
- Deep cinematic gradient
- Hafif cyan glow
- Gereksiz loading gürültüsü yok

### Login

Mevcut: plain centered form.

Polish yönü:

- Sol tarafta brand/value paneli
- Sağda premium access card
- Büyük input ve button
- Net focus state
- Mock/legal notu küçük ve ikincil

### Activation

Mevcut: işlevsel ama teknik/demo ağırlıklı.

Polish yönü:

- Tek güçlü activation card
- Demo code rehberi sade
- Active state premium success panel gibi
- Continue aktif olduğunda ana CTA gibi
- Test/debug kartları geri planda

### Home

M15’in en kritik ekranı.

Polish yönü:

- Header alanı hero gibi hissettirmeli
- Side menu daha sakin ve premium olmalı
- Poster yoksa bile kartlar premium placeholder gibi durmalı
- Focused/selected kart: scale + glow + border
- Status tiles alt planda kalmalı
- Row spacing nefes almalı

### Detail

Polish yönü:

- Poster/hero surface daha sinematik
- Type, title, category, description net hiyerarşi
- `Play Mock` güçlü primary CTA
- `Back` secondary CTA
- Mock/legal note küçük ve düşük vurgu

### Player Shell

Mevcut: güvenli ama debug/placeholder hissi ağır.

Polish yönü:

- Gerçek player placeholder hissi
- Siyah ekran + top/bottom overlay hissi
- Orta status panel daha küçük ve şık
- Mock URL ana UI’da baskın olmamalı
- Playback yine başlamamalı

## 4. Focus / Remote UX Direction

TV’de premium hissin ana kaynağı focus kalitesidir.

Gerekenler:

- Focus koltuktan net görünmeli
- Kartlarda border + glow + scale birlikte kullanılmalı
- Menüde selected ve focused karışmamalı
- Buttonlar büyük ve rahat hedef olmalı
- Tiny text ve yoğun kontrol yok

## 5. What To Avoid

M15 kaçınır:

- Full redesign
- Navigation behavior change
- Auth/session/token davranışı
- Backend bridge
- Provider/content/IPTV source entegrasyonu
- Gerçek playback başlatma
- Payment/store/release scope
- Teknik/debug metinlerini ana UI’da büyütme
- Generic IPTV panel havası

## 6. Builder Minimum Patch Recommendation

Builder’a verilecek scope:

`Visual-only Compose polish patch`

İzinli:

- Premium background primitive
- Premium panel/card primitive
- Focus border/glow helper
- Primary/secondary button style
- Splash visual polish
- Login visual polish
- Activation visual polish
- Home visual/focus polish
- Detail visual polish
- Player shell visual polish

Yasak:

- Navigation behavior change
- Backend change
- Real playback change
- Provider/content integration
- Auth/session/payment ekleme
- Full redesign/rewrite

Likely target files:

- `SplashScreen.kt`
- `LoginScreen.kt`
- `DeviceActivationScreen.kt`
- `HomeScreen.kt`
- `ContentDetailScreen.kt`
- `PlayerScreen.kt`
- optional minimal shared UI/theme file

## 7. Acceptance Criteria

M15 UI polish QA’ya ancak şunlar sağlanırsa gidebilir:

- APK build başarılı
- App crash olmadan açılıyor
- Splash -> Login -> Activation `demo123` -> Home akışı bozulmadı
- Home focus/navigation çalışıyor
- Detail -> Play Mock -> Player shell çalışıyor
- Player ilk render’da gerçek stream başlatmıyor
- Provider/payment/auth/backend scope eklenmedi
- UI, M14’e göre net şekilde daha premium ve TV-first hissediliyor

## Director Result

Premium UI / Art Direction report accepted.

M15 can proceed to Builder minimal visual polish patch.

M15 cannot be LOCKED until Builder patch, user test, QA PASS, documentation record, and Director lock.
