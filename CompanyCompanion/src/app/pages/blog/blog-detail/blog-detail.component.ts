import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent {
  contactForm: FormGroup = this.builder.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: [''],
  });

  constructor(
    private builder: FormBuilder,
    private toaster: ToastrService,
    private readonly translocoService: TranslocoService
  ) {}

  proceedLogin(): void {
    this.contactForm.markAllAsTouched();
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      this.contactForm.reset({
        username: '',
        email: '',
        message: '',
      });
      this.toaster.success(
        this.translocoService.translate('toaster.toasterRegisterSuccessfully')
      );
    } else {
      this.toaster.warning(
        this.translocoService.translate('toaster.toasterWrongInputData')
      );
    }
  }

  blogDetail: any = {
    Id: '2',
    title: 'Sztuka Samodzielnego Uczestnictwa: Dlaczego Warto Być Niezależnym',
    introduction:
      'W dzisiejszym świecie, w którym dostęp do informacji jest na wyciągnięcie ręki, coraz ważniejsza staje się umiejętność samodzielnego myślenia i działania. W tym artykule przyjrzymy się, dlaczego warto być niezależnym myślicielem i uczestnikiem życia, zamiast podążać za tłumem.',
    quote:
      'Najlepszym sposobem przewidywania przyszłości jest ją tworzyć. - Peter Drucker',
    development:
      'Samodzielność umożliwia nam podejmowanie decyzji niezależnie od wpływu innych. To umiejętność, która pozwala nam rozumieć i analizować świat, dokonywać wyborów, a także wpływać na własny los. Samodzielni ludzie często wyznaczają trendy, zamiast podążać za nimi. Samodzielność stwarza przestrzeń do tworzenia, innowacji i osiągania osobistego spełnienia.',
    summary:
      "Sztuka samodzielnego uczestnictwa polega na aktywnym kształtowaniu swojego życia i otaczającego świata. Jak powiedział Peter Drucker, 'Najlepszym sposobem przewidywania przyszłości jest ją tworzyć.' Niezależność myślenia i działania przyczynia się do naszego rozwoju i wpływa na naszą osobistą satysfakcję.",
    author: 'John Doe',
    readingTime: '5 min',
    categories: 'Niezależność',
  };
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
  ];
  comments: any[] = [
    {
      author: 'Anna Smith',
      comment: 'Świetny artykuł! Bardzo inspirujący i dobrze napisany.',
      date: '2023-11-09',
    },
    {
      author: 'Jan Kowalski',
      comment:
        'Ciekawy punkt widzenia. Zgadzam się z wieloma przedstawionymi argumentami.',
      date: '2023-11-10',
    },
    {
      author: 'Emily Johnson',
      comment: 'Dziękuję za podzielenie się tym artykułem. Bardzo motywujący!',
      date: '2023-11-11',
    },
    {
      author: 'Adam Nowak',
      comment:
        'Wartość samodzielności nie może być przeceniana. Świetne podsumowanie!',
      date: '2023-11-12',
    },
  ];
}
