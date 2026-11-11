# Kisötös

Magyar nyelvű matek tanuló app: alsó tagozattól az érettségiig. Ez az első működő verzió (1. szakasz, webes változat).

## Indítás

- **Kipróbálás:** nyisd meg az `index.html` fájlt egy böngészőben (dupla kattintás). Telepíteni semmit nem kell.
- **Tesztek:** `node tests/run.js` (Node 18 vagy újabb kell hozzá, más csomag nem).

A betűtípusok a Google Fonts oldaláról töltődnek be. Net nélkül az app a rendszer betűivel működik tovább.

## Mi van benne

| Rész | Állapot |
| --- | --- |
| Három hangulat (Felfedező, Tanuló, Fókusz), fehér és fekete mód (a fejlécben egy gombbal váltható), „kevesebb zsúfoltság” mód | kész |
| Ma, Ösvény, Lecke, Gyakorlás, Tudástérkép, Beállítások képernyő | kész |
| Telefonon alsó menüs app-nézet, 900 képpont felett asztali nézet oldalsó menüvel | kész |
| 104 téma leckével, 135 feladatgenerátor (minden feladat új számokkal jön) | kész |
| Telepíthető webapp (kezdőképernyőre tehető, net nélkül is megy), ha https címről fut | kész |
| Javítás hibatípus szerint (98 nevesített hibatípus), háromlépcsős tipp, lépésenkénti megoldás | kész |
| Tudásszint témánként, térköz-ismétlés, gyökérok-keresés az előfeltételek között, ajánló | kész |
| Minden leckében lépésenként kibontható, újragenerálható példa a tipikus hibával és az előfeltétel-leckék linkjével | kész |
| Felolvasás gomb (a böngésző magyar hangjával, ha van) | kész |
| Hibajelentés: a feladat azonosítója helyben tárolódik, a Beállításokból kimásolható | kész |
| Automatikus tesztek: 54 000 legenerált feladat független újraszámolása, képernyők végigjárása | kész |

### Témák

- **Alsó tagozat:** összeadás és kivonás tízig, kétjegyű számok összeadása, pótlás tízre, összeadás és kivonás tízes átlépéssel, szorzótábla, osztás, kerekítés tízesre, téglalap kerülete, páros és páratlan számok, felezés és kétszerezés, szöveges feladatok, számok összehasonlítása, számsorozatok, kétjegyű kivonás, maradékos osztás, szorzás kerek tízesekkel, tízesek és egyesek, hiányzó tényező, óra és perc, négyzet, kerek százasok
- **Felső tagozat:** legnagyobb közös osztó, terület, műveleti sorrend, helyettesítési érték, törtek bővítése, közös nevező, törtek összeadása, kivonása, szorzása, osztása, negatív számok, százalékszámítás, elsőfokú egyenlet, arányos osztás, hatványozás, tizedes törtek összeadása, mértékegységek, százalékalap, zárójelfelbontás, prímszámok, mennyiség törtrésze, átlag, egyenes arányosság, háromszög szögei, zárójeles egyenlet, tizedes törtek szorzása 10-zel és 100-zal, koordináta-rendszer, kocka, leárazás, Pitagorasz-tétel
- **Érettségi (középszint):** lineáris függvény, másodfokú egyenlet, másodfokú függvény, valószínűség, derékszögű háromszög, hatványozás azonosságai, logaritmus, számtani és mértani sorozat, átlag és medián, kombinatorika, abszolút értékes egyenlet, elsőfokú egyenlőtlenség, nevezetes szögek, kör, exponenciális egyenlet, koordinátageometria, téglatest, négyzetgyök, szögfüggvények derékszögű háromszögben, kamatos kamat, halmazok, nevezetes azonosságok, egyenes egyenlete, egymás utáni százalékos változás, henger, független események, logaritmus azonosságai, gúla, vektorok a síkban
- **Egyetem (Matek 1):** határérték a végtelenben, deriválás, határozott integrál, determináns és mátrix–vektor szorzás, komplex számok, végtelen mértani sor, parciális derivált, lineáris egyenletrendszer, deriválási szabályok, sajátérték, szélsőérték-keresés, skaláris szorzat, inverz mátrix, határozatlan alakú határérték, második derivált, vektoriális szorzat, várható érték, primitív függvény, improprius integrál, mátrix rangja, binomiális eloszlás

Ez még nem a teljes tananyag: minden szinten hiányoznak témakörök.

## Mi nincs benne még

- **Élő AI** (tutor-beszélgetés, szabad szöveges megoldás javítása, esszéértékelés): API-kulcs és szerver kell hozzá.
- **Fiók és szinkron:** a haladás csak az adott eszközön tárolódik. Emiatt személyes adatot sem gyűjt az app.
- **Szülői nézet, szintfelmérő, próbaérettségi, történelem, magyar.**
- **Áruházi alkalmazás:** iOS-re és Androidra fejlesztői fiók kell. A `js/core.js` és a `js/content.js` felülettől független, így változtatás nélkül átvihető.
- **Saját tárhely:** a telepíthetőséghez https cím kell (például GitHub Pages).
- **Tanári lektorálás:** a megoldókulcsot kód ellenőrzi, de a szövegeket és a magyarázatokat ember még nem nézte át.
- **Tantervi egyeztetés:** a témák nincsenek összevetve az Oktatási Hivatal aktuális követelményeivel.

## Szerkezet

```
index.html        belépési pont
css/app.css       dizájnrendszer (színek, betűk, hangulatok)
js/core.js        mag: véletlen, törtek, javítás, tudásszint, ismétlés, ajánló, mentés
js/content.js     hibakatalógus, témák, leckék, feladatgenerátorok
js/content2.js    2. tartalomcsomag: új témák és az egyetemi ösvény
js/content3.js    3. tartalomcsomag: további témák mind a négy szinten
js/content4.js    4. tartalomcsomag: alapozó témák mind a négy szinten
js/content5.js    5. tartalomcsomag: további alapozó témák
js/content6.js    6. tartalomcsomag: húsz új téma
js/content7.js    7. tartalomcsomag: tizenhét új téma és új feladattípusok
sw.js, manifest.webmanifest, icon.svg   telepíthető webapp
js/figures.js     matek-jelölés és kódból rajzolt ábrák
js/app.js         képernyők és műveletek
tests/run.js      automatikus tesztek
```

## Új feladattípus hozzáadása

1. A `js/content.js` fájlban hívd meg a `reg(téma, azonosító, nehézség, függvény)` függvényt. A függvény adja vissza a kérdést, a jó választ, a tipikus hibás válaszokat (hibakóddal és magyarázattal), három tippet és a megoldást.
2. A `tests/run.js` fájl `verify` listájába írj hozzá egy ellenőrzőt, amely a választ **más módszerrel** számolja ki, mint a generátor.
3. Futtasd a teszteket. Ha a kettő bárhol eltér, a teszt megmondja, melyik példánynál.

## Fontos

A Kisötös nem hivatalos alkalmazás, nem hagyta jóvá az Oktatási Hivatal vagy bármely iskola, és nem helyettesíti a tanárt.
