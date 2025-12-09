import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../../services/language.service';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificates.html',
  styleUrls: ['./certificates.css']
})
export class Certificates implements OnInit {

  selectedLang: 'en' | 'hi' | 'ta' | 'ar' = 'en';

  constructor(private langService: LanguageService) {}

  ngOnInit(): void {
    this.selectedLang = this.langService.getLanguage();
    this.langService.currentLang$.subscribe(lang => { this.selectedLang = lang; });
  }

  certificateLabels = {
    en: {
      title: "Your Certificates",
      by: "by",
      issued: "Issued",
      credential: "Credential ID",
      download: "Download",
      downloadAll: "Download All",
      share: "Share"
    },
    hi: {
      title: "आपके प्रमाणपत्र",
      by: "द्वारा",
      issued: "जारी किया गया",
      credential: "क्रेडेंशियल आईडी",
      download: "डाउनलोड",
      downloadAll: "सभी डाउनलोड करें",
      share: "शेयर करें"
    },
    ta: {
      title: "உங்கள் சான்றிதழ்கள்",
      by: "ஆல்",
      issued: "வெளியிடப்பட்டது",
      credential: "அடையாள எண்",
      download: "பதிவிறக்கவும்",
      downloadAll: "அனைத்தையும் பதிவிறக்கவும்",
      share: "பகிர்"
    },
    ar: {
      title: "شهاداتك",
      by: "بواسطة",
      issued: "تاريخ الإصدار",
      credential: "معرف الشهادة",
      download: "تحميل",
      downloadAll: "تحميل الكل",
      share: "مشاركة"
    }
  };

  certificateData = {
    en: [
      {
        title: "Python Programming Fundamentals",
        instructor: "Sarah Johnson",
        issued: "15/1/2024",
        id: "CERT-PY-001-2024"
      },
      {
        title: "React.js Complete Guide",
        instructor: "Emma Rodriguez",
        issued: "8/1/2024",
        id: "CERT-REACT-002-2024"
      }
    ],

    hi: [
      {
        title: "पायथन प्रोग्रामिंग मूल बातें",
        instructor: "सारा जॉनसन",
        issued: "15/1/2024",
        id: "CERT-PY-001-2024"
      },
      {
        title: "React.js पूर्ण गाइड",
        instructor: "एमा रोड्रिग्ज़",
        issued: "8/1/2024",
        id: "CERT-REACT-002-2024"
      }
    ],

    ta: [
      {
        title: "பைதான் நிரலாக்க அடிப்படை",
        instructor: "சாரா ஜான்சன்",
        issued: "15/1/2024",
        id: "CERT-PY-001-2024"
      },
      {
        title: "React.js முழு வழிகாட்டி",
        instructor: "எம்மா ரொட்ரிக்ஸ்",
        issued: "8/1/2024",
        id: "CERT-REACT-002-2024"
      }
    ],

    ar: [
      {
        title: "أساسيات برمجة بايثون",
        instructor: "سارة جونسون",
        issued: "2024/1/15",
        id: "CERT-PY-001-2024"
      },
      {
        title: "الدليل الكامل لـ React.js",
        instructor: "إيما رودريغيز",
        issued: "2024/1/8",
        id: "CERT-REACT-002-2024"
      }
    ]
  };

}
