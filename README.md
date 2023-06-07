1. Wstęp: 
Projekt ten jest aplikacją internetową, która ma na celu ułatwienie zarządzania mniejszymi firmami poprzez umożliwienie zarządzania magazynem, produktami, klientami oraz fakturami. Aplikacja składa się z  kilku modułów: autoryzacja, zarządzania klientami, zarządzania produktami oraz głównego modułu do wystawiania faktur.

Moduł autoryzacji, który umożliwia użytkownikom logowanie i rejestrację. Moduł ten zabezpiecza aplikację przed niepowołanym dostępem do danych i umożliwia jednoznaczne identyfikowanie użytkowników.

W drugim module możliwe jest zarządzanie klientami. Użytkownik może dodawać nowych klientów, usuwać istniejących, edytować dane kontaktowe oraz wyświetlać listę wszystkich klientów zapisanych w systemie. W trzecim module użytkownik ma możliwość zarządzania produktami. Może dodawać nowe produkty, usuwać istniejące, edytować ich opisy oraz wyświetlać listę wszystkich produktów zapisanych w systemie.

Główny moduł aplikacji pozwala na wystawienie faktury, wykorzystując klientów i produkty zapisane w systemie. Użytkownik wybiera klienta i produkty, które chce umieścić na fakturze, a następnie wprowadza pozostałe informacje wymagane na fakturze, takie jak data sprzedaży, numer faktury, kwotę, itp. Po zatwierdzeniu faktury, system automatycznie generuje plik PDF z fakturą, który można pobrać lub wysłać do klienta.


2. Technologie
Projekt został wykonany w technologiach: 
• back-end: .Net 6, 
• front-end: Angular 
• baza danych: MsSql 

3. Baza danych:
Widok schematu bazy danych, który przedstawia relacje między poszczególnymi obiektami w aplikacji internetowej do wystawiania dokumentów sprzedażowych. Schemat ten składa się z tabel, atrybutów i kluczy, które reprezentują poszczególne encje i związki między nimi.

Schemat bazy danych został zaprojektowany tak, aby umożliwić skuteczne zarządzanie klientami i produktami oraz umożliwić wystawianie faktur z uwzględnieniem powiązań między nimi. W schemacie przedstawione są relacje między tabelami, takie jak klucze obce, które umożliwiają przypisanie klientów do faktur oraz produktów do faktur. Ponadto, zastosowano mechanizmy indeksowania, które przyspieszają wykonywanie zapytań na bazie danych i umożliwiają jej efektywne wykorzystanie.

![image](https://github.com/Smoleckk/CompanyCompanion/assets/73690548/5bb78c33-9eec-4e65-90fb-046b840d3fc3)

4. Bezpieczny dostęp do danych
Aplikacja został zabezpieczony przy użyciu protokołu OAuth2, który umożliwia bezpieczną autoryzację użytkowników poprzez wydanie tokena dostępowego (JWT - JSON Web Token) po pomyślnym procesie logowania. Token ten jest generowany po autoryzacji użytkownika przez serwer autoryzacji i jest przypisany do danego użytkownika oraz ma określony czas ważności, po upływie którego token przestaje być aktywny i użytkownik musi ponownie się zalogować, aby uzyskać nowy token.

![image](https://github.com/Smoleckk/CompanyCompanion/assets/73690548/9c3b1336-10fb-4045-b870-4deb55238546)

5.Autoryzacja
W ramach modułu autoryzacji zostały wystawione 2 endpointy, które umożliwiają użytkownikom rejestrację i logowanie do aplikacji internetowej do wystawiania dokumentów sprzedażowych.

Endpoint rejestracji umożliwia użytkownikowi utworzenie nowego konta, poprzez wypełnienie formularza z danymi osobowymi oraz hasłem. Po poprawnym wypełnieniu formularza, dane zostają zapisane w bazie danych, a użytkownik otrzymuje powiadomienie o pomyślnej rejestracji.

Natomiast endpoint logowania umożliwia zalogowanie już istniejącego użytkownika, poprzez podanie danych logowania (login i hasło). Po poprawnym wypełnieniu formularza, serwer autoryzacji przeprowadza proces weryfikacji danych, a następnie generuje token JWT, który jest zwracany w odpowiedzi na zapytanie. Token ten jest następnie wykorzystywany przez klienta do autoryzacji dostępu do chronionych zasobów aplikacji, takich jak moduł zarządzania klientami i produktami czy moduł wystawiania faktur.

Po pomyślnym procesie logowania, użytkownik może swobodnie korzystać z funkcjonalności aplikacji, a w przypadku wylogowania się lub upłynięcia czasu ważności tokenu JWT, zostanie automatycznie przekierowany do strony logowania w celu ponownej autoryzacji.

![image](https://github.com/Smoleckk/CompanyCompanion/assets/73690548/0650659a-1818-43be-b014-68225815f395)
![image](https://github.com/Smoleckk/CompanyCompanion/assets/73690548/bcfabf55-f90d-4ee7-aaa8-39d34c9a6758)
![image](https://github.com/Smoleckk/CompanyCompanion/assets/73690548/7b8e71d6-83ba-4a76-845b-c6df845204bf)

6.Zarzadzanie klientami
Moduł zarządzania klientami umożliwia użytkownikom aplikacji internetowej do wystawiania dokumentów sprzedażowych wykonanie szeregu operacji na danych dotyczących klientów. Dostępne operacje obejmują pobieranie informacji o klientach, dodawanie nowych klientów, aktualizowanie już istniejących rekordów oraz usuwanie klientów z bazy danych.

Operacje na danych klientów są zabezpieczone przed nieautoryzowanym dostępem przez mechanizm uwierzytelniania oparty na tokenach JWT, co zapewnia poufność i bezpieczeństwo przetwarzanych informacji.

Przed wysłaniem formularza z danymi klienta do serwera, dane te są poddawane walidacji pod kątem poprawności wypełnienia. W przypadku nieprawidłowo wypełnionych pól formularza, użytkownik otrzymuje odpowiednie komunikaty o błędach, które pozwalają na szybką korektę danych i uniknięcie błędów przy przetwarzaniu danych.
![image](https://github.com/Smoleckk/CompanyCompanion/assets/73690548/fd001f62-6cf9-40b2-8584-d21015b14200)
![image](https://github.com/Smoleckk/CompanyCompanion/assets/73690548/a11317c8-d5af-4991-ba7e-66538c920c26)

Po usunięciu jednego rekordu:

![image](https://github.com/Smoleckk/CompanyCompanion/assets/73690548/114ddffe-a1ca-4052-8917-9ac311794964)
![image](https://github.com/Smoleckk/CompanyCompanion/assets/73690548/adac9524-cd11-41f7-9fc7-14fa16d246ab)
![image](https://github.com/Smoleckk/CompanyCompanion/assets/73690548/749459e7-8878-41ad-922d-7431471c0924)

7.Zarządzanie produktami
Moduł zarządzania produktami umożliwia użytkownikom aplikacji internetowej wykonanie szeregu operacji na danych dotyczących produktów. Dostępne operacje obejmują pobieranie informacji o produktach, dodawanie nowych produktów, aktualizowanie już istniejących rekordów oraz usuwanie produktów z bazy danych.

Wszystkie operacje na danych produktów są zabezpieczone przed nieautoryzowanym dostępem przez mechanizm uwierzytelniania oparty na tokenach JWT, co zapewnia poufność i bezpieczeństwo przetwarzanych informacji.

Przed wysłaniem formularza z danymi produktu do serwera, dane te są poddawane walidacji pod kątem poprawności wypełnienia. W przypadku nieprawidłowo wypełnionych pól formularza, użytkownik otrzymuje odpowiednie komunikaty o błędach, które pozwalają na szybką korektę danych i uniknięcie błędów przy przetwarzaniu danych.

![image](https://github.com/Smoleckk/CompanyCompanion/assets/73690548/128e00a4-8223-4305-93f5-02a2f705bddc)
![image](https://github.com/Smoleckk/CompanyCompanion/assets/73690548/2e18eea8-e747-47b1-8d01-9f348f7d6e00)
![image](https://github.com/Smoleckk/CompanyCompanion/assets/73690548/fc4c6ca5-adb0-4b9d-983c-282d9395b85b)
![image](https://github.com/Smoleckk/CompanyCompanion/assets/73690548/d845c10c-d5c9-4a58-8081-3a59bd8d2899)

Tabela po dodaniu produktu:

![image](https://github.com/Smoleckk/CompanyCompanion/assets/73690548/de16159b-4654-4224-b2d6-409128b14165)

Tabela po przefiltrowaniu: 

![image](https://github.com/Smoleckk/CompanyCompanion/assets/73690548/3ff11214-2029-47b5-9793-2bed3fbd5840)

8.  Wystawienie faktur
Główny moduł aplikacji internetowej do wystawiania dokumentów sprzedażowych umożliwia użytkownikom wystawienie dokumentu faktury, wykorzystując dane klientów i produktów zapisanych w systemie. Moduł ten udostępnia wiele operacji, które umożliwiają poprawne wygenerowanie oraz edycję faktury.

Przy tworzeniu faktury, użytkownik może wybrać klienta z bazy danych oraz wybierać produkty, które chce dodać do faktury. Moduł ten pozwala również na podanie innych danych wymaganych do wystawienia faktury, takich jak numer i datę wystawienia, numer zamówienia czy termin płatności.

Po zatwierdzeniu danych faktury, moduł ten generuje dokument w formacie PDF, który użytkownik może następnie pobrać i wykorzystać. Możliwe jest także edytowanie danych faktury, takich jak zmiana danych klienta, dodanie nowych produktów lub zmiana danych już istniejących produktów.

W ramach implementacji modułu faktur, zastosowano szereg mechanizmów zabezpieczających przed nieautoryzowanym dostępem do danych oraz walidujących poprawność wprowadzanych danych. 

![image](https://github.com/Smoleckk/CompanyCompanion/assets/73690548/40a437e5-c316-4071-9fb6-82497ca103a4)
![image](https://github.com/Smoleckk/CompanyCompanion/assets/73690548/2165c478-1c06-43c1-9c20-d1e4301baf13)
![image](https://github.com/Smoleckk/CompanyCompanion/assets/73690548/9ec20242-ccb6-4e9d-b902-4c82826c791f)
![image](https://github.com/Smoleckk/CompanyCompanion/assets/73690548/cf3fee57-3846-4791-a8b8-b7d4f892bb43)

9. Raporty
Raporty w aplikacji umożliwia użytkownikom dostęp do prostego dashboardu, w którym prezentowane są wykresy oraz podstawowe informacje związane z działaniem systemu. Dashboard ten umożliwia użytkownikowi na szybkie i łatwe zrozumienie kluczowych aspektów działania aplikacji. Dzięki wykresom i statystykom, użytkownik może na przykład zobaczyć, ile faktur zostało wygenerowanych, czy jaki jest jego dochód.

![image](https://github.com/Smoleckk/CompanyCompanion/assets/73690548/07b303b1-13bc-4f92-8dfa-b2d25a7610fa)

10. Wnioski
W ramach projektu wykonano aplikację internetową do wystawiania dokumentów sprzedażowych, składającą się z trzech modułów: zarządzania klientami, zarządzania produktami oraz modułu pozwalającego na wystawianie faktur. Ponadto, zaimplementowano moduł autoryzacji, który umożliwia użytkownikom rejestrację i logowanie do systemu.

Wszystkie moduły zostały wykonane zgodnie z najlepszymi praktykami programistycznymi, z uwzględnieniem dobrych wzorców projektowych oraz odpowiednich zabezpieczeń. Wszystkie formularze w systemie zostały poddane walidacji, co pozwala na uniknięcie błędów i usprawnienie procesu obsługi klienta.

Dodatkowo, w aplikacji zaimplementowano moduł raportowania, który umożliwia użytkownikom dostęp do prostego dashboardu z wykresami i podstawowymi informacjami związanymi z działaniem systemu. Dzięki temu użytkownicy mogą łatwo monitorować kluczowe aspekty działania systemu i szybko podejmować decyzje.

Wnioski z projektu są bardzo pozytywne. Aplikacja internetowa do wystawiania dokumentów sprzedażowych została wykonana zgodnie z wymaganiami, spełniając wszystkie postawione przed nią cele. Implementacja wszystkich modułów, w tym modułu raportowania, umożliwia prostą i intuicyjną obsługę systemu, a także pozwala na łatwe rozszerzanie jego funkcjonalności.
