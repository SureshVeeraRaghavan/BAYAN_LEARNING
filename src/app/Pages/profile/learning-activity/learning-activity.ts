import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../../services/language.service';

@Component({
  selector: 'app-learning-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './learning-activity.html',
  styleUrls: ['./learning-activity.css']
})
export class LearningActivity implements OnInit {

  selectedLang: 'en' | 'hi' | 'ta' | 'ar' = 'en';

  constructor(private langService: LanguageService) {}

  ngOnInit(): void {
    this.selectedLang = this.langService.getLanguage();

    this.langService.currentLang$.subscribe(lang => {
      this.selectedLang = lang;
    });
  }

  // ⭐ MULTILINGUAL LABELS
  labels = {
    en: {
      title: "Learning Activity",
      recent: "Recent Learning History",
      desc: "Your learning journey over the past month"
    },
    hi: {
      title: "लर्निंग गतिविधि",
      recent: "हाल की सीखने की इतिहास",
      desc: "पिछले महीने में आपकी सीखने की यात्रा"
    },
    ta: {
      title: "கற்றல் செயல்பாடு",
      recent: "சமீபத்திய கற்றல் வரலாறு",
      desc: "கடந்த மாதத்தில் உங்கள் கற்றல் பயணம்"
    },
    ar: {
      title: "نشاط التعلم",
      recent: "سجل التعلم الأخير",
      desc: "رحلة تعلمك خلال الشهر الماضي"
    }
  };

  // ⭐ MULTILINGUAL ACTIVITY DATA
  activityData = {
    en: [
      { 
        title: "Completed Python Programming Fundamentals",
        date: "15/1/2024",
        icon: "🏅",
        bg: "#d3f8d0"
      },
      { 
        title: "Started Machine Learning with Python",
        date: "14/1/2024",
        icon: "📘",
        bg: "#d8e8ff"
      },
      { 
        title: "Watched 3 lessons in React.js Complete Guide",
        date: "13/1/2024",
        icon: "🎯",
        bg: "#f0d7ff"
      },
      { 
        title: "Earned Python Master achievement",
        date: "12/1/2024",
        icon: "🏆",
        bg: "#ffeeb3"
      }
    ],

    hi: [
      { 
        title: "पायथन प्रोग्रामिंग मूल बातें पूरी की",
        date: "15/1/2024",
        icon: "🏅",
        bg: "#d3f8d0"
      },
      { 
        title: "पायथन के साथ मशीन लर्निंग शुरू की",
        date: "14/1/2024",
        icon: "📘",
        bg: "#d8e8ff"
      },
      { 
        title: "React.js गाइड में 3 पाठ देखे",
        date: "13/1/2024",
        icon: "🎯",
        bg: "#f0d7ff"
      },
      { 
        title: "पायथन मास्टर उपलब्धि अर्जित की",
        date: "12/1/2024",
        icon: "🏆",
        bg: "#ffeeb3"
      }
    ],

    ta: [
      { 
        title: "பைதான் நிரலாக்க அடிப்படைகளை முடித்தார்",
        date: "15/1/2024",
        icon: "🏅",
        bg: "#d3f8d0"
      },
      { 
        title: "பைதானுடன் மெஷின் லெர்னிங் தொடங்கப்பட்டது",
        date: "14/1/2024",
        icon: "📘",
        bg: "#d8e8ff"
      },
      { 
        title: "React.js முழு வழிகாட்டியில் 3 பாடங்கள் பார்த்தார்",
        date: "13/1/2024",
        icon: "🎯",
        bg: "#f0d7ff"
      },
      { 
        title: "பைதான் மாஸ்டர் சாதனையை பெற்றார்",
        date: "12/1/2024",
        icon: "🏆",
        bg: "#ffeeb3"
      }
    ],

    ar: [
      { 
        title: "اكتمل أساسيات برمجة بايثون",
        date: "2024/1/15",
        icon: "🏅",
        bg: "#d3f8d0"
      },
      { 
        title: "بدأ تعلم الآلة باستخدام بايثون",
        date: "2024/1/14",
        icon: "📘",
        bg: "#d8e8ff"
      },
      { 
        title: "شاهدت 3 دروس في دليل React.js",
        date: "2024/1/13",
        icon: "🎯",
        bg: "#f0d7ff"
      },
      { 
        title: "حصل على إنجاز Python Master",
        date: "2024/1/12",
        icon: "🏆",
        bg: "#ffeeb3"
      }
    ]
  };

}
