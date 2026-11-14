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
| 486 téma leckével, 546 feladatgenerátor (minden feladat új számokkal jön) | kész |
| Ábrák: 226 feladattípusnál rajz a feladat mellett vagy a megoldás után, 177 leckében szemléltető ábra (síkidomok, testek, függvénygrafikonok, számegyenes, Venn-diagram, oszlop- és kördiagram, analóg óra, dobozábra, súlyozott gráf, egységkör, haranggörbe, pöttyös tömb, kockatáblázat, prímtényezős létra, lépcsős sűrűségfüggvény, szögmérő, út–idő grafikon, szakadásos függvény, hőmérő, szimmetriatengelyek, empirikus eloszlásfüggvény) | kész |
| Telepíthető webapp (kezdőképernyőre tehető, net nélkül is megy), ha https címről fut | kész |
| Javítás hibatípus szerint (100 nevesített hibatípus), háromlépcsős tipp, lépésenkénti megoldás | kész |
| Tudásszint témánként, térköz-ismétlés, gyökérok-keresés az előfeltételek között, ajánló | kész |
| Minden leckében lépésenként kibontható, újragenerálható példa a tipikus hibával és az előfeltétel-leckék linkjével | kész |
| Felolvasás gomb (a böngésző magyar hangjával, ha van) | kész |
| Hibajelentés: a feladat azonosítója helyben tárolódik, a Beállításokból kimásolható | kész |
| Automatikus tesztek: 218 400 legenerált feladat független újraszámolása, képernyők végigjárása | kész |

### Témák

Hét ösvény van: alsó tagozat (79 téma), felső tagozat (93), középszintű érettségi (102), emelt szintű érettségi (52), egyetemi matek 1 (57), egyetemi matek 2 (51), egyetemi matek 3 (52). Minden ösvény 6–9 témakörre van bontva (például Törtek, Geometria, Integrálszámítás), az Ösvény képernyőn ezek nyithatók-csukhatók. Ugyanitt név szerint keresni lehet a témák között (ékezet nélkül is), és minden témakörből indítható vegyes gyakorlás, amely a témakör több témájából ad egy-egy feladatot. A bővítés a `TANTERV.md` listáját követi; annak a nagyobb része még hátravan.

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
js/content8.js    8. tartalomcsomag: a tanterv-lista első adagja, emelt szintű ösvény
js/content9.js    9. tartalomcsomag: a tanterv-lista második adagja (41 téma)
js/content10.js   10. tartalomcsomag: az egyetemi rész három ösvényre bontva, 30 új téma
js/content11.js   11. tartalomcsomag: 41 új téma mind a hét ösvényen
js/content12.js   12. tartalomcsomag: témakörök minden ösvényen, 21 új téma
js/content13.js   13. tartalomcsomag: 28 új téma a meglévő témakörökbe sorolva
js/content14.js   14. tartalomcsomag: újabb 28 téma a témakörökbe sorolva
js/content15.js   15. tartalomcsomag: 28 téma részletesebb leckékkel, fogalmi (definíció- és tételértő) kérdésekkel
js/content16.js   16. tartalomcsomag: 21 téma részletes leckékkel
js/content17.js   17. csomag: „Hogyan gondolkodj?” magyarázat 111 korábbi téma leckéjéhez
js/content18.js   18. tartalomcsomag: 21 új téma, és magyarázat az alsó tagozat összes maradék leckéjéhez
js/content19.js   19. tartalomcsomag: magyarázat a felső tagozat és a középszint összes maradék leckéjéhez, 14 új téma
js/content20.js   20. tartalomcsomag: magyarázat az emelt szint és az egyetemi ösvények maradék leckéihez (ezzel minden lecke részletes), 7 új téma
js/content21.js   21. csomag: 17 új feladatváltozat a kevés változatot adó témákhoz; az azonos szintű változatok kezdettől váltakoznak
js/content22.js   22. csomag: 11 újabb feladatváltozat
js/content23.js   23. csomag: ábrák a feladatokhoz, megoldásokhoz és leckékhez, 9 új grafikonos téma
js/content24.js   24. csomag: újabb ábrák, 6 új téma (óra, pont koordinátái, egyenes és parabola a grafikonról, dobozábra, téglalapösszeg)
js/content25.js   25. csomag: újabb ábrák, 4 új téma (terület négyzetrácson, kördiagram, párhuzamos szelők, sűrűségfüggvény)
js/content26.js   26. csomag: újabb ábrák, 4 új téma (síkidomok, szögmérés, vektorok az ábráról, integrál a grafikonról)
js/content27.js   27. csomag: újabb ábrák, 4 új téma (színezett rész, mozgás grafikonja, átlag oszlopdiagramról, határérték a grafikonról)
js/content28.js   28. csomag: a tanterv hiányzó témái ábrákkal (hőmérő, testek, szimmetria, alapalakzatok, kör részei, háromszögfajták, középpontos tükrözés, harmadolópont, parabola fókusza, szintvonal, empirikus eloszlásfüggvény)
js/content29.js   29. csomag: írásbeli műveletek kétjegyű számmal, kockaháló, másodfokú egyenletrendszer, gyűjtőjáradék, addíciós tételek, ívhossz, rendőrelv, Leibniz-kritérium
js/content30.js   30. csomag: vonaldiagram, eltolás és forgatás, trigonometrikus egyenletek és egyenlőtlenségek, paritás, húr- és érintőnégyszög, csonkakúp, hajlásszög, fák, szelőtétel
js/content31.js   31. csomag: tájékozódás, számhalmazok, alapszerkesztések, új logaritmusalap, algebrai törtek, törtes egyenletek, kör érintője, forgástest felszíne, súlypont, negatív binomiális eloszlás
js/content32.js   32. csomag: dobókockák, pénzérmék, nagyítás, szerencsekerék, koordinátás terület, polárkoordináták, Markov-lánc
TANTERV.md        a bővítés útiterve (a teljes témalista)
sw.js, manifest.webmanifest, icon.svg   telepíthető webapp
js/figures.js     matek-jelölés és kódból rajzolt ábrák
js/figures2.js    függvénygrafikon, geometriai rajz, számegyenes, Venn-, oszlop- és kördiagram, térbeli testek
js/figures3.js    analóg óra, dobozábra, hasáb, pöttyös tömb, kockatáblázat, prímtényezős létra, szögmérő, hőmérő, csonkakúp, dobókocka, pénzérmék
js/app.js         képernyők és műveletek
tests/run.js      automatikus tesztek
```

## Új feladattípus hozzáadása

1. A `js/content.js` fájlban hívd meg a `reg(téma, azonosító, nehézség, függvény)` függvényt. A függvény adja vissza a kérdést, a jó választ, a tipikus hibás válaszokat (hibakóddal és magyarázattal), három tippet és a megoldást.
2. A `tests/run.js` fájl `verify` listájába írj hozzá egy ellenőrzőt, amely a választ **más módszerrel** számolja ki, mint a generátor.
3. Futtasd a teszteket. Ha a kettő bárhol eltér, a teszt megmondja, melyik példánynál.

## Fontos

A Kisötös nem hivatalos alkalmazás, nem hagyta jóvá az Oktatási Hivatal vagy bármely iskola, és nem helyettesíti a tanárt.
