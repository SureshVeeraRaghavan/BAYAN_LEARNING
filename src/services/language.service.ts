import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Lang = 'en' | 'hi' | 'ta' | 'ar';

@Injectable({ providedIn: 'root' })
export class LanguageService {
private langSubject = new BehaviorSubject<Lang>('en');
currentLang$ = this.langSubject.asObservable();

setLanguage(lang: Lang) {
localStorage.setItem('selectedLang', lang);
this.langSubject.next(lang);
}

getLanguage(): Lang {
return (localStorage.getItem('selectedLang') as Lang) || 'en';
}
}
