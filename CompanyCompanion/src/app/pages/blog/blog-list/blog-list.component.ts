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
      Tytuł:
        'Sztuka Samodzielnego Uczestnictwa: Dlaczego Warto Być Niezależnym',
      Wprowadzenie:
        'W dzisiejszym świecie, w którym dostęp do informacji jest na wyciągnięcie ręki, coraz ważniejsza staje się umiejętność samodzielnego myślenia i działania. W tym artykule przyjrzymy się, dlaczymozna być niezależnym myślicielem i uczestnikiem życia, zamiast podążać za tłumem.',
      Cytat:
        'Najlepszym sposobem przewidywania przyszłości jest ją tworzyć. - Peter Drucker',
      Rozwinięcie:
        'Samodzielność umożliwia nam podejmowanie decyzji niezależnie od wpływu innych. To umiejętność, która pozwala nam rozumieć i analizować świat, dokonywać wyborów, a także wpływać na własny los. Samodzielni ludzie często wyznaczają trendy, zamiast podążać za nimi. Samodzielność stwarza przestrzeń do tworzenia, innowacji i osiągania osobistego spełnienia.',
      Podsumowanie:
        "Sztuka samodzielnego uczestnictwa polega na aktywnym kształtowaniu swojego życia i otaczającego świata. Jak powiedział Peter Drucker, 'Najlepszym sposobem przewidywania przyszłości jest ją tworzyć.' Niezależność myślenia i działania przyczynia się do naszego rozwoju i wpływa na naszą osobistą satysfakcję.",
    },
    {
      Tytuł:
        'Sztuka Publicznego Wystąpienia: Jak Skutecznie Przemawiać przed Publicznością',
      Wprowadzenie:
        'Umiejętność publicznego wystącia jest ważna w wielu sferach życia, od biznesu po politykę i życie społeczne. W tym artykule omówimy, jak skutecznie przemawiać przed publicznością i zdobyć jej uwagę.',
      Cytat:
        'Najważniejsze w wystąpieniu publicznym jest to, co zostaje w głowie słuchacza po zakończeniu prezentacji. - John Zimmer',
      Rozwinięcie:
        'Sztuka publicznego wystąpienia polega na umiejętności przekazywania swoich myśli i idei w sposób przekonujący i zapadający w pamięć. To zdolność do budowania relacji z publicznością, zrozumienia jej potrzeb i dostosowania przekazu do jej oczekiwań. Skuteczne wystąpienia wymagają przygotowania, pewności siebie i umiejętności radzenia sobie z stresem.',
      Podsumowanie:
        'Przygotowanie i trening są kluczem do skutecznego wystąpienia publicznego. Jednak nie chodzi tylko o technikę, ale także o zdolność do budowania autentycznych i trwałych relacji z publicznością.',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    console.log(this.blogList);
  }
}
