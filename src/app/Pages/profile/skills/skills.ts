import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../../services/language.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrls: ['./skills.css']
})
export class Skills implements OnInit {

  selectedLang: 'en' | 'hi' | 'ta' | 'ar' = 'en';

  constructor(private langService: LanguageService) {}

  ngOnInit(): void {
    this.selectedLang = this.langService.getLanguage();
    this.langService.currentLang$.subscribe(lang => this.selectedLang = lang);
  }

  // ⭐ MULTILINGUAL LABELS
  labels = {
    en: { title: "Skills Portfolio" },
    hi: { title: "कौशल पोर्टफोलियो" },
    ta: { title: "திறன் தொகுப்பு" },
    ar: { title: "ملف المهارات" }
  };

  // ⭐ MULTILINGUAL SKILL DATA
  skillGroups = {
    en: [
      {
        title: "Programming Languages",
        skills: ["Python", "JavaScript", "TypeScript", "Java", "C++"]
      },
      {
        title: "Frameworks & Libraries",
        skills: ["React", "Node.js", "Express", "Django", "Flask"]
      },
      {
        title: "Tools & Technologies",
        skills: ["Git", "Docker", "AWS", "MongoDB", "PostgreSQL"]
      }
    ],

    hi: [
      {
        title: "प्रोग्रामिंग भाषाएँ",
        skills: ["पायथन", "जावास्क्रिप्ट", "टाइपस्क्रिप्ट", "जावा", "C++"]
      },
      {
        title: "फ्रेमवर्क और लाइब्रेरी",
        skills: ["React", "Node.js", "Express", "Django", "Flask"]
      },
      {
        title: "उपकरण और तकनीकें",
        skills: ["Git", "Docker", "AWS", "MongoDB", "PostgreSQL"]
      }
    ],

    ta: [
      {
        title: "நிரலாக்க மொழிகள்",
        skills: ["பைதான்", "ஜாவா ஸ்கிரிப்ட்", "டைப் ஸ்கிரிப்ட்", "ஜாவா", "C++"]
      },
      {
        title: "அமைப்புகள் & நூலகங்கள்",
        skills: ["React", "Node.js", "Express", "Django", "Flask"]
      },
      {
        title: "கருவிகள் & தொழில்நுட்பங்கள்",
        skills: ["Git", "Docker", "AWS", "MongoDB", "PostgreSQL"]
      }
    ],

    ar: [
      {
        title: "لغات البرمجة",
        skills: ["بايثون", "جافاسكريبت", "تايب سكريبت", "جافا", "C++"]
      },
      {
        title: "الأطر والمكتبات",
        skills: ["React", "Node.js", "Express", "Django", "Flask"]
      },
      {
        title: "الأدوات والتقنيات",
        skills: ["Git", "Docker", "AWS", "MongoDB", "PostgreSQL"]
      }
    ]
  };

}
