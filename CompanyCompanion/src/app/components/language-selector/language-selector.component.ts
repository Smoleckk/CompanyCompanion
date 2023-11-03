import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent {
  constructor(
    private translocoService: TranslocoService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  public languagesList: Array<Record<'code' | 'name' | 'shorthand', string>> = [
    {
      code: 'en',
      name: 'English',
      shorthand: 'ENG',
    },
    {
      code: 'pl',
      name: 'Polish',
      shorthand: 'PL',
    },
  ];
  public changeLanguage(languageCode: string): void {
    this.translocoService.setActiveLang(languageCode);
    this.router.navigate(['/']);
    this.toastr.success(
      this.translocoService.translate(
        'toaster.changeLanguageSuccess' + " : " + languageCode.toUpperCase()
      )
    );
  }
}
