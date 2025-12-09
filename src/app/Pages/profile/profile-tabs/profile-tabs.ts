import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageService } from '../../../../services/language.service';

@Component({
  selector: 'app-profile-tabs',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './profile-tabs.html',
  styleUrls: ['./profile-tabs.css']
})
export class ProfileTabs implements OnInit {

  selectedLang: 'en' | 'hi' | 'ta' | 'ar' = 'en';

  constructor(private langService: LanguageService) {}

  ngOnInit(): void {
    this.selectedLang = this.langService.getLanguage();
    this.langService.currentLang$.subscribe(lang => this.selectedLang = lang);
  }

  // ⭐ MULTILINGUAL LABELS FOR PROFILE TABS
  labels = {
    en: {
      certificates: "Certificates",
      achievements: "Achievements",
      skills: "Skills",
      learningActivity: "Learning Activity"
    },
    hi: {
      certificates: "प्रमाणपत्र",
      achievements: "उपलब्धियाँ",
      skills: "कौशल",
      learningActivity: "सीखने की गतिविधि"
    },
    ta: {
      certificates: "சான்றிதழ்கள்",
      achievements: "சாதனைகள்",
      skills: "திறன்கள்",
      learningActivity: "கற்றல் செயல்பாடு"
    },
    ar: {
      certificates: "الشهادات",
      achievements: "الإنجازات",
      skills: "المهارات",
      learningActivity: "نشاط التعلم"
    }
  };

}
