# Register van verwerkingsactiviteiten

Artikel 30 AVG. Dit register moet je kunnen voorleggen wanneer de
Gegevensbeschermingsautoriteit erom vraagt. Het hoeft niet gepubliceerd te
worden — bewaren en actueel houden volstaat.

De vrijstelling voor ondernemingen met minder dan 250 werknemers geldt niet
wanneer de verwerking niet incidenteel is. Aanvragen via het offerteformulier
komen doorlopend binnen, dus de vrijstelling is hier niet van toepassing.

**Laatst bijgewerkt:** 27 juli 2026
**Nazien:** jaarlijks, en telkens wanneer er een verwerker bijkomt of wegvalt.

---

## 1. Verwerkingsverantwoordelijke

| | |
| --- | --- |
| Naam | SD Light and Sound |
| Zaakvoerder | Stephan Dobos |
| Adres | De Pannelaan 73, 8660 De Panne, België |
| Ondernemingsnummer | _in te vullen_ |
| E-mail | Stephan.dobos@icloud.com |
| Telefoon | +32 456 90 34 50 |
| Functionaris gegevensbescherming | Niet verplicht (geen grootschalige of gevoelige verwerking) |

---

## 2. Verwerkingsactiviteit — Offerteaanvragen

| | |
| --- | --- |
| **Doel** | Beantwoorden van aanvragen en opmaken van offertes |
| **Rechtsgrond** | Art. 6.1.b AVG — precontractuele maatregelen op verzoek van de betrokkene |
| **Categorieën betrokkenen** | Potentiële klanten (particulieren en bedrijven) |
| **Categorieën gegevens** | Naam, e-mailadres, type event, gewenste datum, inhoud bericht |
| **Bijzondere categorieën** | Geen |
| **Ontvangers** | Vercel Inc. (hosting), Resend / Amazon SES (e-mailverzending), Apple iCloud (mailbox) |
| **Doorgifte buiten EER** | Ja — Verenigde Staten. Grondslag: EU-US Data Privacy Framework, subsidiair modelcontractbepalingen |
| **Bewaartermijn** | Eén jaar na laatste contact. Wordt het een opdracht: zeven jaar (boekhoudkundige bewaarplicht) |
| **Beveiligingsmaatregelen** | HTTPS, strikte beveiligingsheaders, rate limiting, honeypot, verwerking in EU-regio (Frankfurt), verzendsleutel met beperkte rechten |

## 3. Verwerkingsactiviteit — Misbruikpreventie formulier

| | |
| --- | --- |
| **Doel** | Voorkomen van geautomatiseerd misbruik van het offerteformulier |
| **Rechtsgrond** | Art. 6.1.f AVG — gerechtvaardigd belang (beschikbaarheid van de dienst, beheersen van verzendkosten) |
| **Categorieën betrokkenen** | Bezoekers die het formulier verzenden |
| **Categorieën gegevens** | IP-adres |
| **Ontvangers** | Geen — blijft in het werkgeheugen van de serverfunctie |
| **Doorgifte buiten EER** | Nee — functie draait in Frankfurt |
| **Bewaartermijn** | Maximaal één uur, daarna automatisch verwijderd |
| **Beveiligingsmaatregelen** | Geen opslag op schijf, geen logging van het IP-adres |

## 4. Verwerkingsactiviteit — Bezoekersstatistieken

| | |
| --- | --- |
| **Doel** | Nagaan hoeveel mensen de site bezoeken en welke pagina's ze raadplegen |
| **Rechtsgrond** | Art. 6.1.f AVG — gerechtvaardigd belang (werking en bruikbaarheid van de site) |
| **Categorieën betrokkenen** | Bezoekers van de website |
| **Categorieën gegevens** | Geaggregeerde paginaweergaven, herkomst, toesteltype. Geen cookies, geen identificeerbare gegevens |
| **Ontvangers** | Vercel Inc. (Vercel Web Analytics) |
| **Doorgifte buiten EER** | Ja — Verenigde Staten. Grondslag: EU-US Data Privacy Framework |
| **Bewaartermijn** | Volgens de bewaartermijn van Vercel Web Analytics |
| **Beveiligingsmaatregelen** | Cookieloos, geen persoonlijke identificatoren |

---

## 5. Verwerkersovereenkomsten

| Verwerker | Rol | Overeenkomst gesloten | Vindplaats |
| --- | --- | --- | --- |
| Vercel Inc. | Hosting, logbestanden, statistieken | _na te gaan_ | Vercel dashboard → Settings → Legal |
| Resend | Verzending van e-mail | _na te gaan_ | Resend dashboard → Settings → Legal |
| Apple (iCloud) | Mailbox waarin aanvragen toekomen | _na te gaan_ | Apple iCloud-voorwaarden |

Zonder ondertekende verwerkersovereenkomst is het inschakelen van een
verwerker op zich al een inbreuk op art. 28 AVG, hoe correct de rest ook
geregeld is. Dit is het eerste wat afgevinkt moet worden.

---

## 6. Procedure bij een gegevenslek

Artikel 33 en 34 AVG.

1. **Vaststellen** — noteer wat er gebeurde, wanneer, welke gegevens en hoeveel
   betrokkenen. Leg dit vast, ook wanneer je uiteindelijk niet meldt.
2. **Beoordelen** — is er een risico voor de rechten en vrijheden van de
   betrokkenen? Bij twijfel: melden.
3. **Melden binnen 72 uur** na kennisname aan de Gegevensbeschermingsautoriteit
   via www.gegevensbeschermingsautoriteit.be. De klok start bij kennisname, niet
   bij het lek zelf.
4. **Betrokkenen inlichten** wanneer het risico hoog is — in duidelijke taal,
   zonder uitstel.
5. **Bijhouden** — elk lek komt in een intern register, ook de niet-gemelde.

Contact GBA: Drukpersstraat 35, 1000 Brussel — contact@apd-gba.be — +32 2 274 48 00

---

## 7. Openstaand

- [ ] Ondernemingsnummer invullen in `src/site.ts` en hierboven
- [ ] Verwerkersovereenkomst Vercel nakijken en aanvaarden
- [ ] Verwerkersovereenkomst Resend nakijken en aanvaarden
- [ ] Bewaartermijn van één jaar effectief toepassen: aanvragen ouder dan een
      jaar uit de mailbox verwijderen
- [ ] Annuleringspercentages in de algemene voorwaarden laten bevestigen
