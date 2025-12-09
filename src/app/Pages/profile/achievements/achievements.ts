import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../../services/language.service';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './achievements.html',
  styleUrls: ['./achievements.css']
})
export class Achievements implements OnInit {

  selectedLang: 'en' | 'hi' | 'ta' | 'ar' = 'en';

  constructor(private langService: LanguageService) {}

  ngOnInit(): void {
    // Load current language
    this.selectedLang = this.langService.getLanguage();

    // Listen for language change
    this.langService.currentLang$.subscribe(lang => {
      this.selectedLang = lang;
    });
  }

  // ⭐ Multilingual Achievements Content
  achievementLabels = {
    en: [
      { title: "Python Master", description: "Completed 5 Python courses", earned: "15/1/2024" },
      { title: "Quick Learner", description: "Completed 3 courses in a week", earned: "10/1/2024" },
      { title: "Streak Master", description: "30-day learning streak", earned: "5/1/2024" },
      { title: "Java Master", description: "30-day learning streak on Java", earned: "5/1/2025" }
    ],
    hi: [
      { title: "पाइथन मास्टर", description: "5 पाइथन कोर्स पूरे किए", earned: "15/1/2024" },
      { title: "तेज़ सीखने वाला", description: "एक सप्ताह में 3 कोर्स पूरे किए", earned: "10/1/2024" },
      { title: "स्ट्रिक मास्टर", description: "30-दिन की सीखने की श्रृंखला", earned: "5/1/2024" },
      { title: "जावा मास्टर", description: "जावा पर 30-दिन की सीखने की श्रृंखला", earned: "5/1/2025" }
    ],
    ta: [
      { title: "பைதான் மாஸ்டர்", description: "5 பைதான் படிப்புகளை முடித்தார்", earned: "15/1/2024" },
      { title: "வேகமான கற்றவர்", description: "ஒரு வாரத்தில் 3 பாடங்களை முடித்தார்", earned: "10/1/2024" },
      { title: "ஸ்ட்ரீக் மாஸ்டர்", description: "30 நாட்கள் கற்றல் தொடர்ச்சி", earned: "5/1/2024" },
      { title: "ஜாவா மாஸ்டர்", description: "ஜாவாவில் 30 நாட்கள் கற்றல் தொடர்ச்சி", earned: "5/1/2025" }
    ],
    ar: [
      { title: "ماستر بايثون", description: "أكمل 5 دورات في بايثون", earned: "2024/1/15" },
      { title: "متعلم سريع", description: "أكمل 3 دورات في أسبوع", earned: "2024/1/10" },
      { title: "ماستر السلسلة", description: "سلسلة تعلم لمدة 30 يومًا", earned: "2024/1/5" },
      { title: "ماستر جافا", description: "سلسلة تعلم لمدة 30 يومًا في جافا", earned: "2025/1/5" }
    ]
  };

}
