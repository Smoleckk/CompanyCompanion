import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent {
  constructor(
    private translocoService: TranslocoService,
    private toastr: ToastrService,
    private cookieService: CookieService
  ) {}
  public languagesList: Array<Record<'code' | 'name' | 'shorthand', string>> = [
    {
      code: 'en',
      name: this.translocoService.translate('language.english'),
      shorthand: 'ENG',
    },
    {
      code: 'pl',
      name: this.translocoService.translate('language.polish'),
      shorthand: 'PL',
    },
  ];

  public changeLanguage(languageCode: string): void {
    this.cookieService.set('language', languageCode, 365);

    this.translocoService.setActiveLang(languageCode);
    this.toastr.success(languageCode.toUpperCase());
    window.location.reload();
  }
}
