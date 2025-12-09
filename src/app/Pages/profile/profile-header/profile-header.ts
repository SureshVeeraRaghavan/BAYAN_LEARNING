import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../../services/language.service';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-header.html',
  styleUrls: ['./profile-header.css']
})
export class ProfileHeader implements OnInit {

  selectedLang: 'en' | 'hi' | 'ta' | 'ar' = 'en';

  constructor(private langService: LanguageService) {}

  ngOnInit(): void {
    this.selectedLang = this.langService.getLanguage();
    this.langService.currentLang$.subscribe(lang => this.selectedLang = lang);
  }

  labels = {
    en: {
      joined: "Joined",
      courses: "Courses",
      certificates: "Certificates",
      learningTime: "Learning Time",
      edit: "Edit Profile",
    },

    hi: {
      joined: "शामिल हुआ",
      courses: "कोर्स",
      certificates: "प्रमाणपत्र",
      learningTime: "सीखने का समय",
      edit: "प्रोफ़ाइल संपादित करें",
    },

    ta: {
      joined: "சேர்ந்தது",
      courses: "பாடங்கள்",
      certificates: "சான்றிதழ்கள்",
      learningTime: "கற்றல் நேரம்",
      edit: "சுயவிவரத்தை திருத்தவும்",
    },

    ar: {
      joined: "انضم",
      courses: "الدورات",
      certificates: "الشهادات",
      learningTime: "وقت التعلم",
      edit: "تعديل الملف الشخصي",
    }
  };

  user = {
    name: "John Doe",
    role: "Full Stack Developer",
    email: "john.doe@example.com",
    location: "San Francisco, CA",
    joined: "January 2024",
    avatar: "assets/profilee.jpg",
    stats: {
      courses: 23,
      certificates: 8,
      learningTime: "127h"
    }
  };

}
