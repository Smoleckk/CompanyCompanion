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
      QuoteAuthor: 'Peter Drucker.',
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
      Quote: 'Czas to pieniądz.',
      QuoteAuthor: 'Benjamin Franklin.',
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
        'Sztuka Samodzielnego Uczestnictwa: Dlaczego Warto Być Niezależnym',
      Introduction:
        'W dzisiejszym świecie, w którym dostęp do informacji jest na wyciągnięcie ręki, coraz ważniejsza staje się umiejętność samodzielnego myślenia i działania. W tym artykule przyjrzymy się, dlaczego warto być niezależnym myślicielem i uczestnikiem życia, zamiast podążać za tłumem.',
      Quote:
        'Najlepszym sposobem przewidywania przyszłości jest ją tworzyć. - Peter Drucker',
      QuoteAuthor: 'Peter Drucker',
      Development:
        'Samodzielność umożliwia nam podejmowanie decyzji niezależnie od wpływu innych. To umiejętność, która pozwala nam rozumieć i analizować świat, dokonywać wyborów, a także wpływać na własny los. Samodzielni ludzie często wyznaczają trendy, zamiast podążać za nimi. Samodzielność stwarza przestrzeń do tworzenia, innowacji i osiągania osobistego spełnienia.',
      Summary:
        "Sztuka samodzielnego uczestnictwa polega na aktywnym kształtowaniu swojego życia i otaczającego świata. Jak powiedział Peter Drucker, 'Najlepszym sposobem przewidywania przyszłości jest ją tworzyć.' Niezależność myślenia i działania przyczynia się do naszego rozwoju i wpływa na naszą osobistą satysfakcję.",
      Author: 'John Doe',
      ReadingTime: '5 min',
      Categories: 'Niezależność',
    },
    {
      Id: '4',
      Title:
        'Sztuka Skutecznego Zarządzania Czasem: Strategie Efektywnego Planowania',
      Introduction:
        'Zarządzanie czasem jest kluczowym elementem osiągania sukcesu w dzisiejszym szybkim tempie życia. W tym artykule omówimy strategie efektywnego planowania czasu i osiągania zamierzonych celów.',
      Quote: 'Czas to pieniądz.',
      QuoteAuthor: 'Benjamin Franklin',
      Development:
        'Efektywne zarządzanie czasem obejmuje identyfikację priorytetów, tworzenie realistycznych planów, eliminację rozproszeń i skupienie się na kluczowych zadaniach. Osoby potrafiące skutecznie zarządzać czasem mają większą szansę na osiągnięcie sukcesu zawodowego i osobistego.',
      Summary:
        "Sztuka skutecznego zarządzania czasem polega na świadomym wykorzystywaniu każdej chwili, eliminowaniu marnowania czasu i konsekwentnym dążeniu do zdefiniowanych celów. Benjamin Franklin trafnie zauważył, że 'Czas to pieniądz.'",
      Author: 'Jane Smith',
      ReadingTime: '7 min',
      Categories: 'Zarządzanie Czasem',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    console.log(this.blogList);
  }
}
