# Flerplattformsapplikationer

Projektgrupp 11 - Peggy Delvret, Eli El-Alawi & Saga Norrman

## Innehållsförteckning

1. ## Beskrivning
2. ## Installation
3. ## API:er
4. ## Funktioner
5. ## Användning
6. ## Jämförelse av ramverk/bibliotek

## Beskrivning

Vårt mål är att utveckla ett projekt som möjliggör för användaren att söka efter olika ord och erhålla deras definitioner med hjälp av ett implementerat dictionary-API. Utöver detta sparas även historiken över de ord som användaren har sökt efter. Projektet inkluderar dessutom en översättningsfunktion som översätter definitionerna av de sökta orden till valfritt språk.

## Installation

1. **Installera Node.js och npm:**
  
   Besök Node.js officiella hemsida (https://nodejs.org/) och ladda ner den senaste versionen. Detta inkluderar npm (Node Package Manager), som behövs för att installera beroenden. Följ installationsinstruktionerna för ditt operativsystem.

2. **Klona GitHub-repositoriet**
   
   Öppna en terminal (macOS/Linux) eller Command Prompt/Powershell (Windows).
   Klona  GitHub-repo genom att köra följande kommando: 
   ```
   git clone https://github.com/peggydelvret/Flerplattformsapplikationer.git
   ```

#### macOS, Windows och Linux
1. **Navigera till projektkatalogen**
   - Byt till projektets katalog:
   ```
   cd Flerplattformsapplikationer/dictionary-react
   ```

1. **Installera projektets beroenden**
   - Kör följande kommando för att installera alla nödvändiga beroenden:
   ```
   npm install
   ```

1. **Installera Docker**

   Installera homebrew enligt instruktionerna på deras hemsida: [Instruktioner på Homebrews hemsida](https://brew.sh/).

   Instalera sedan Docker med hjälp av homebrew
      ```
      brew install docker
      ```
   För att lättare administrera Docker rekomenderas det att instalera Rancher-Desktop:
      ```
      brew install rancher
      ```
   Starta den lokala LibreTranslate instansen genom att köra följande Docker-kommando i terminalen:
      ```
      docker run -d -p 5000:5000 libretranslate/libretranslate
      ```
     
1. **Starta utvecklingsservern**

   Starta utvecklingsservern i ett nytt terminalfönster:
      ```
      npm start
      ```

1. **Öppna applikationen**
   - Applikationen bör automatiskt öppnas i din webbläsare
   - Om den inte gör det, öppna din webbläsare och navigera till [http://localhost:3000](http://localhost:3000)

## API:er

Projektet använder sig av följande API:er:

1. **Dictionary API**
   - URL: 
   ```
   https://api.dictionaryapi.dev/api/v2/entries/en/
   ```
   - Beskrivning: Används för att hämta en eller flera definitioner av engelska ord.
   - Dokumentation: [Dictionary API Documentation](https://dictionaryapi.dev/)

2. **LibreTranslate API**
   - URL: 
   ```
   https://libretranslate.de/translate
   ```
   - Beskrivning: Används för att översätta text till olika språk.
   - Dokumentation: [LibreTranslate API Documentation](https://libretranslate.com/)

## Funktioner

- Sökning av orddefinitioner med hjälp av dictionary-API.
- Sparande av sökhistorik.
- Översättning av definitioner till valfritt språk.

## Användning

För att använda applikationen, följ dessa steg:

1. **Öppna applikationen**
   - Starta utvecklingsservern genom att köra:
   ```
   npm start
   ``` 
   - Applikationen bör automatiskt öppnas i din webbläsare
   - Om den inte gör det, öppna din webbläsare och navigera till [http://localhost:3000](http://localhost:3000)

2. **Söka efter ord**
   - På startsidan kommer du att se ett sökfält.
   - Skriv in det ord du vill söka efter och tryck på "Sök".
   - Applikationen kommer att använda Dictionary API för att hämta definitionen av ordet.

3. **Visa definitionen**
   - Efter att du har sökt efter ett ord, kommer definitionen av ordet att visas på skärmen.
   - Definitionen kan inkludera flera betydelser och exempelmeningar.

4. **Översättning av definitioner**
   - Under definitionen kommer du att se en översättningsknapp eller ett översättningsalternativ.
   - Välj det språk du vill översätta definitionen till från en dropdown-meny.
   - Klicka på "Översätt" för att få definitionen översatt till det valda språket med hjälp av LibreTranslate API.

5. **Sökhistorik**
   - Applikationen håller reda på alla ord du har sökt efter under din session.
   - Din sökhistorik visas antingen i en sidopanel eller längst ner på sidan.
   - Du kan klicka på tidigare sökta ord för att snabbt visa deras definitioner igen.



## Jämförelse av ramverk/bibliotek

### React
Gruppen har valt att använda sig av biblioteket React främst för att det är något som gruppen arbetat med förut och känner sig bekanta med (labb 6). React är ett JavaScript-bibliotek, välkänt för sin enkelhet och flexibilitet, som används för framställning av användargränssnitt. Användargränssnitt är byggda av flera olika byggstenar och React tillåter en att kombinera dessa till återanvändbara, inkapslade komponenter. React är ett bibliotek snarare än ett komplett ramverk, vilket innebär att det ger oss frihet att välja och integrera andra bibliotek och verktyg enligt projektets behov. Detta var avgörande för oss, eftersom vi behövde hantera flera API-anrop (dictionary-API och översättnings-API) samt spara användarens sökhistorik. Med React kan gruppen enkelt hantera tillstånd (state) och side-effects genom att använda hooks som `useState` och `useEffect`.
#### Arkitektur
React's komponentbaserade arkitektur gör det enkelt att återanvända och underhålla kod. Varje del av vår applikation, från sökfältet till historiklistan, kan brytas ner i mindre, hanterbara komponenter. Detta underlättar utveckling och felsökning och gör det enkelt för teammedlemmar att arbeta parallellt på olika delar av projektet.
#### Community
React har ett stort och aktivt community, vilket innebär tillgång till ett brett utbud av tredjepartsbibliotek och resurser. Detta är särskilt användbart när man stöter på problem eller behöver hitta lösningar och exempel på specifika funktioner. För vårt projekt kunde vi snabbt hitta och integrera bibliotek för API-hantering samt anpassa det internationellt (i18n).
### Vue
#### Lägre Inlärningskurva
Vue har en lägre inlärningskurva jämfört med React, vilket kan vara ett argument för att använda Vue istället. Dock hade teamet redan erfarenhet av React, vilket gjorde att vi kunde starta utvecklingen direkt utan att behöva lära oss ett nytt ramverk.
#### Struktur
Vue erbjuder single-file components som inkluderar HTML, JavaScript och CSS i samma fil. Detta kan vara bra för små projekt men det kan uppfattas som svårhanterligt och stökigt i större projekt. I vårt fall, där vi har flera funktioner och interaktioner, föredrar vi React's sätt att separera logik och presentation.
#### Community
Även om Vue har ett växande community, är det fortfarande mindre jämfört med React. Detta innebär färre tredjepartsbibliotek och verktyg att välja mellan, vilket kan begränsa flexibiliteten och lösningsmöjligheterna i mer komplexa projekt.
### Angular
#### Fullständigt Ramverk
Angular är ett fullständigt ramverk, vilket innebär att det kommer med många inbyggda funktioner och en strikt struktur. Detta kan vara både en fördel och en nackdel. För vårt projekt, som kräver flexibilitet i hur vi hanterar API-anrop och tillstånd, skulle Angulars omfattande struktur kunna vara överflödig och svår att anpassa efter våra specifika behov.
#### Typescript och Steep Learning Curve
Angular använder Typescript, vilket innebär en brantare inlärningskurva för utvecklare som är vana vid JavaScript. Även om Typescript erbjuder många fördelar, valde vi att prioritera snabb utveckling och enkelhet, vilket gjorde att React passade bättre för vårt team.
#### Tvingande Arkitektur
Angulars tvingande arkitektur kan vara en fördel för stora företag med behov av strikta riktlinjer, men för vårt projekt, som kräver snabba iterationer och flexibilitet, kan detta vara en begränsning.
### Slutsats
Vi valde React för vårt projekt på grund av dess flexibilitet, enkelhet, och komponentbaserade arkitektur som passar bättre ihop med gruppens behov. Jämfört med Vue och Angular erbjuder React en balans mellan kontroll och enkelhet, vilket gör det till det bästa valet för att utveckla en applikation med sök- och översättningsfunktioner samt historikhantering.
 
