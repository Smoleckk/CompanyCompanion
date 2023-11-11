import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {
  blogList: any[] = [
    {
      Id: '1',
      Title:
        'Sztuka Samodzielnego Uczestnictwa: Dlaczego Warto Być Niezależnym',
      Introduction:
        'W dzisiejszym świecie, w którym dostęp do informacji jest na wyciągnięcie ręki, coraz ważniejsza staje się umiejętność samodzielnego myślenia i działania. W tym artykule przyjrzymy się, dlaczego warto być niezależnym myślicielem i uczestnikiem życia, zamiast podążać za tłumem.',
      Quote:
        'Najlepszym sposobem przewidywania przyszłości jest ją tworzyć. - Peter Drucker',
      Development:
        'Samodzielność umożliwia nam podejmowanie decyzji niezależnie od wpływu innych. To umiejętność, która pozwala nam rozumieć i analizować świat, dokonywać wyborów, a także wpływać na własny los. Samodzielni ludzie często wyznaczają trendy, zamiast podążać za nimi. Samodzielność stwarza przestrzeń do tworzenia, innowacji i osiągania osobistego spełnienia.',
      Summary:
        "Sztuka samodzielnego uczestnictwa polega na aktywnym kształtowaniu swojego życia i otaczającego świata. Jak powiedział Peter Drucker, 'Najlepszym sposobem przewidywania przyszłości jest ją tworzyć.' Niezależność myślenia i działania przyczynia się do naszego rozwoju i wpływa na naszą osobistą satysfakcję.",
      Author: 'John Doe',
      ReadingTime: '5 min',
      Categories: 'Niezależność',
    },
    {
      Id: '2',
      Title:
        'Sztuka Skutecznego Zarządzania Czasem: Strategie Efektywnego Planowania',
      Introduction:
        'Zarządzanie czasem jest kluczowym elementem osiągania sukcesu w dzisiejszym szybkim tempie życia. W tym artykule omówimy strategie efektywnego planowania czasu i osiągania zamierzonych celów.',
      Quote: 'Czas to pieniądz. - Benjamin Franklin',
      Development:
        'Efektywne zarządzanie czasem obejmuje identyfikację priorytetów, tworzenie realistycznych planów, eliminację rozproszeń i skupienie się na kluczowych zadaniach. Osoby potrafiące skutecznie zarządzać czasem mają większą szansę na osiągnięcie sukcesu zawodowego i osobistego.',
      Summary:
        "Sztuka skutecznego zarządzania czasem polega na świadomym wykorzystywaniu każdej chwili, eliminowaniu marnowania czasu i konsekwentnym dążeniu do zdefiniowanych celów. Benjamin Franklin trafnie zauważył, że 'Czas to pieniądz.'",
      Author: 'Jane Smith',
      ReadingTime: '7 min',
      Categories: 'Zarządzanie Czasem',
    },
    {
      Id: '3',
      Title:
        'Jak Pokonywać Wyzwania w Pracy Zespołowej: Kluczowe Umiejętności Lidera',
      Introduction:
        'Praca zespołowa jest nieodłącznym elementem wielu dziedzin zawodowych. W tym artykule omówimy kluczowe umiejętności lidera potrzebne do pokonywania wyzwań w pracy zespołowej.',
      Quote:
        'Nie jest ważne, kto ma pomysł, ale kto ma decyzję. - Peter Drucker',
      Development:
        'Skuteczny lider zespołu powinien posiadać umiejętności komunikacji, zdolność do motywowania członków zespołu, umiejętność rozwiązywania konfliktów i zdolność podejmowania decyzji. Tworzenie pozytywnego środowiska pracy i kierowanie zespołem ku wspólnym celom są kluczowe dla sukcesu.',
      Summary:
        "Lider zespołu odgrywa kluczową rolę w osiąganiu celów organizacyjnych. Decydujące nie jest tylko posiadanie pomysłów, ale także umiejętność podejmowania decyzji. Peter Drucker słusznie stwierdził, 'Nie jest ważne, kto ma pomysł, ale kto ma decyzję.'",
      Author: 'Michael Johnson',
      ReadingTime: '6 min',
      Categories: 'Liderstwo, Praca Zespołowa',
    },
    {
      Id: '4',
      Title: 'Sztuka Równowagi Życia: Jak Łączyć Pracę i Prywatność',
      Introduction:
        'W dzisiejszym świecie, gdzie tempo życia jest coraz szybsze, utrzymanie równowagi między pracą a życiem prywatnym staje się wyzwaniem. W tym artykule omówimy strategie utrzymania równowagi życia zawodowego i osobistego.',
      Quote:
        'Równowaga to nie coś, co znajdujemy. To coś, co tworzymy. - Jana Kingsford',
      Development:
        'Równowaga między pracą a życiem prywatnym wymaga świadomego planowania, określenia priorytetów, umiejętności delegowania obowiązków i umiejętności radzenia sobie ze stresem. Osoby potrafiące utrzymywać równowagę życiową cieszą się lepszym zdrowiem i większą satysfakcją z życia.',
      Summary:
        "Sztuka utrzymywania równowagi życia polega na ciągłym tworzeniu harmonii między obowiązkami zawodowymi a aspektami osobistymi. Jak powiedziała Jana Kingsford, 'Równowaga to nie coś, co znajdujemy. To coś, co tworzymy.'",
      Author: 'Emily White',
      ReadingTime: '8 min',
      Categories: 'Równowaga Życia',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    console.log(this.blogList);
  }
}
