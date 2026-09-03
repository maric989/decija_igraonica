# Čarobna Tastatura

- Ruta: `/igraonica/carobna-tastatura`
- Fajl: `app/igraonica/carobna-tastatura/page.tsx`
- Kategorija: slova
- Ikona: `/icons/carobna-tastatura.jpeg`

## Za dete

Balon sa slovom pada niz nebo. Dete pritisne isto slovo na virtualnoj (ili pravoj) tastaturi pre nego što balon padne. Pogodak donosi zvezdicu i novo slovo.

## Kako radi

- Trenutno koristi **latinicu A–Z**, ne ćirilicu.
- Audio slova: `public/audio/abeceda/{slovo}.mp3`.
- Balon se pomera na interval; ako stigne dole bez pogotka, ide novo slovo.
- Ekran je podeljen: nebo gore, tastatura dole.

## Beleške

Ovo je igrica brzine i prepoznavanja slova. Ako se kasnije prebaci na ćirilicu, treba menjati i azbuku i audio.
