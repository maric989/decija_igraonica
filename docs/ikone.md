# Ikone i slike igara

3D/plastelin slike za kartice na početnoj strani i naslove igara. Većina stiže kao **JPEG sa belom pozadinom**. JPEG ne može da ima providnost, zato ih ili „mešamo“ sa bojom kartice (`mix-blend-multiply`) ili pretvaramo u **PNG sa alfa kanalom**.

## Gde šta stoji

| Putanja | Šta |
|---|---|
| `public/icons/` | Ikone igara (kartica + `GameTitleIcon`) |
| `public/senke/` | Slike unutar igre Senke (bager, dinosaurus, raketa, kraba) |
| `public/vaga/` | Jabuka za igru Vaga (`apple.png`) |
| koren repo-a | Privremeno: `*-logo.jpeg` koje korisnik ubaci. **Ne ostavljati tu** — prebaciti u `public/icons/` |

Imena: kebab-case, bez razmaka. Ikona igre = ime igre, npr. `vaga.png`, `senke.png`, `uci-slova.jpeg`.

## Šta kod radi sa slikom

`ActionCard` i `GameTitleIcon`:

- **`.jpeg` / `.jpg`** → dodaju `mix-blend-multiply`. Bela pozadina JPEG-a se „proguta“ i vidi se boja kartice (rose, lime, amber…).
- **`.png`** → **bez** `mix-blend-multiply`. PNG već ima providnu pozadinu; multiply bi pokvario boje predmeta.

Zato: čim ikona postane PNG, putanja u kodu mora da se završava na `.png`.

## Kad JPEG radi, a kad ne

`mix-blend-multiply` radi samo ako je pozadina **skoro čisto bela** (255, 255, 255).

Ako je pozadina sivkasta (npr. 245–252), na kartici ostaje **sivi pravougaonik**. Tako je bilo sa Senke i Vaga logoom. Rešenje: JPEG → PNG, bela/siva u providno.

## Korak po korak: nova ikona

1. Ubaci fajl u koren (npr. `vaga-logo.jpeg`).
2. Premesti u ikone:

```bash
mv vaga-logo.jpeg public/icons/vaga.jpeg
```

3. Ako je pozadina čisto bela: ostavi JPEG, u kodu `imageSrc="/icons/vaga.jpeg"` (multiply će je sakriti).
4. Ako vidiš sivi okvir na kartici: konvertuj u PNG (sledeći odeljak), obriši JPEG, u kodu stavi `.png`.
5. Poveži:
   - početna: `ActionCard` `imageSrc="/icons/ime.png"`
   - naslov igre: `<GameTitleIcon src="/icons/ime.png" alt="" />`

## Konverzija JPEG → providni PNG

Koristimo **sharp** (već dolazi uz Next.js, `require("sharp")` iz korena projekta).

Šta skripta radi:

1. Smanji na max **800×800** (ikona se crta ~80–96 px, original je često 2048²).
2. Dodaj alfa kanal.
3. Piksel koji je **neutralan** (R, G, B skoro isti) i **svetao** postaje providan.
4. Mekši rub (`FEATHER` → `WHITE`) da ne ostane beli halo.
5. Sačuva `public/icons/<ime>.png` i obriše JPEG.

Pragovi koje smo koristili za Senke i Vagu (sivkasta, ne čisto bela):

- `WHITE = 238` — iznad toga, potpuno providno
- `FEATHER = 220` — između, postepena providnost
- `max - min < 18` — samo sivi/beli pikseli, ne žuta zvezda ni mint baza vage

Ako posle konverzije ostane „pod“ / senka na podu (svetli oval ispod predmeta), drugi prolaz: `luminance > 200` i `max - min < 28` → alfa 0.

### Skripta (kopiraj, zameni `IME`)

Pokreni iz korena repo-a:

```bash
node <<'EOF'
const sharp = require("sharp");
const fs = require("fs");

const IME = "vaga"; // npr. senke, vaga
const src = `public/icons/${IME}.jpeg`;
const dest = `public/icons/${IME}.png`;

const WHITE = 238;
const FEATHER = 220;

(async () => {
  const { data, info } = await sharp(src)
    .resize(800, 800, { fit: "inside", withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const minC = Math.min(r, g, b);
    const maxC = Math.max(r, g, b);
    const isNeutral = maxC - minC < 18;
    if (isNeutral && minC >= WHITE) {
      data[i + 3] = 0;
    } else if (isNeutral && minC >= FEATHER) {
      data[i + 3] = Math.round(((WHITE - minC) / (WHITE - FEATHER)) * 255);
    }
  }

  const png = await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toBuffer();

  fs.writeFileSync(dest, png);
  fs.unlinkSync(src);
  console.log("ok", dest, Math.round(png.length / 1024) + "KB");
})();
EOF
```

Provera ugla (mora biti alfa 0):

```bash
node -e "require('sharp')('public/icons/vaga.png').extract({left:0,top:0,width:1,height:1}).raw().toBuffer().then(b=>console.log('RGBA', [...b]))"
```

## Slike unutar igre Senke

Iste JPEG-ove (bela pozadina) pretvorili smo u PNG u `public/senke/*.png`, jer igra pravi senke sa `brightness-0` — to radi samo na obliku predmeta, ne na belom kvadratu. Tu **nema** `mix-blend-multiply`.

## Trenutno stanje

| Fajl | Format | Napomena |
|---|---|---|
| `uci-slova.jpeg` | JPEG + multiply | bela pozadina, OK |
| `uci-brojeve.jpeg` | JPEG + multiply | OK |
| `slovo-na-slovo.jpeg` | JPEG + multiply | OK |
| `memorija.jpeg` | JPEG + multiply | OK |
| `brojalica.jpeg` | JPEG + multiply | OK |
| `pogodi-rec.jpeg` | JPEG + multiply | OK |
| `matematika.jpeg` | JPEG + multiply | OK |
| `pisaca-masina.jpeg` | JPEG + multiply | OK |
| `carobna-tastatura.jpeg` | JPEG + multiply | OK |
| `senke.png` | PNG, bez multiply | konvertovano zbog sivog okvira |
| `vaga.png` | PNG, bez multiply | konvertovano zbog sivog okvira |
| `poredjenje.png` | PNG, bez multiply | konvertovano zbog sivog okvira |

Ako ubaciš novi logo i na kartici vidiš kutiju oko slike — nemoj jačati multiply. Idi na PNG.
