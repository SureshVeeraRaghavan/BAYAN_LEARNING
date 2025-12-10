import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Auth } from '../auth';
import { LanguageService } from '../../services/language.service';

//sidebar json....
type NavKey =
  | 'home'
  | 'library'
  | 'courses'
  | 'paths'
  | 'goals'
  | 'assessments'
  | 'projects'
  | 'studyGroups'
  | 'aiTools'
  | 'dashboard'
  | 'profile';

@Component({
  selector: 'app-layout1',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout1.html',
  styleUrls: ['./layout1.css'],
})
export class Layout1 implements OnInit {

  open = true;

  showLangDropdown = false;
  showUserDropdown = false;

  selectedLang: 'en' | 'hi' | 'ta' | 'ar' = 'en';

  isRTL = false;

  constructor(
    private auth: Auth,
    private router: Router,
    private langService: LanguageService 
  ) {}

  labels: Record<'en' | 'hi' | 'ta' | 'ar', Record<string, string>> = {
    en: {
      home: 'Home',
      library: 'Library',
      courses: 'Courses',
      paths: 'Learning Paths',
      goals: 'Goals',
      assessments: 'Assessments',
      projects: 'Projects',
      studyGroups: 'Study Groups',
      aiTools: 'AI Tools',
      dashboard: 'Dashboard',
      profile: 'Profile',
    },
    hi: {
      home: 'होम',
      library: 'लाइब्रेरी',
      courses: 'कोर्सेस',
      paths: 'लर्निंग पाथ्स',
      goals: 'लक्ष्य',
      assessments: 'मूल्यांकन',
      projects: 'प्रोजेक्ट्स',
      studyGroups: 'अध्ययन समूह',
      aiTools: 'एआई टूल्स',
      dashboard: 'डैशबोर्ड',
      profile: 'प्रोफ़ाइल',
    },
    ta: {
      home: 'முகப்பு',
      library: 'நூலகம்',
      courses: 'பாடநெறிகள்',
      paths: 'கற்றல் பாதைகள்',
      goals: 'இலக்குகள்',
      assessments: 'மதிப்பீடுகள்',
      projects: 'திட்டங்கள்',
      studyGroups: 'படிப்பு குழுக்கள்',
      aiTools: 'ஏஐ கருவிகள்',
      dashboard: 'டாஷ்போர்ட்',
      profile: 'சுயவிவரம்',
    },
    ar: {
      home: 'الرئيسية',
      library: 'المكتبة',
      courses: 'الدورات',
      paths: 'مسارات التعلم',
      goals: 'الأهداف',
      assessments: 'التقييمات',
      projects: 'المشاريع',
      studyGroups: 'مجموعات الدراسة',
      aiTools: 'أدوات الذكاء الاصطناعي',
      dashboard: 'لوحة التحكم',
      profile: 'الملف الشخصي',
    },
  };


  
  navigation: { key: NavKey; href: string; icon: string }[] = [
    { key: 'home', href: '/app/home', icon: 'fa fa-home' },
    { key: 'library', href: '/app/library', icon: 'fa fa-book' },
    { key: 'courses', href: '/app/courses', icon: 'fa fa-graduation-cap' },
    // { key: 'paths', href: '/app/paths', icon: 'fa fa-sitemap' },
    // { key: 'goals', href: '/app/goals', icon: 'fa fa-bullseye' },
    // { key: 'assessments', href: '/app/assessments', icon: 'fa fa-clipboard-check' },
    // { key: 'projects', href: '/app/projects', icon: 'fa fa-folder-open' },
    // { key: 'studyGroups', href: '/app/study-groups', icon: 'fa fa-users' },
    // { key: 'aiTools', href: '/app/ai-tools', icon: 'fa fa-cogs' },
    // { key: 'dashboard', href: '/app/dashboard', icon: 'fa fa-chart-line' },
    { key: 'profile', href: '/app/profile', icon: 'fa fa-user' },
  ];

  get filteredNavigation() {
    const role = this.getUserRole();
    if (role === 'STUDENT') {
      return this.navigation.filter(item => item.key !== 'courses');
    }
    return this.navigation;
  }

  
  ngOnInit() {
    const savedLang =
      (localStorage.getItem('selectedLang') as 'en' | 'hi' | 'ta' | 'ar') || 'en';

    this.selectedLang = savedLang;

    // Apply RTL/LTR on initial load
    if (savedLang === 'ar') {
      this.isRTL = true;
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      this.isRTL = false;
      document.documentElement.setAttribute('dir', 'ltr');
    }

    //  Notify Home and other components
    this.langService.setLanguage(savedLang);
  }

  //  When changing language from dropdown
  changeLanguage(lang: 'en' | 'hi' | 'ta' | 'ar') {
    this.selectedLang = lang;
    this.showLangDropdown = false;

    // Save in localStorage
    localStorage.setItem('selectedLang', lang);

    //  Update the global language
    this.langService.setLanguage(lang);

    // RTL logic
    if (lang === 'ar') {
      this.isRTL = true;
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      this.isRTL = false;
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }

  toggleSidebar() {
    this.open = !this.open;
  }

  toggleLangDropdown() {
    this.showLangDropdown = !this.showLangDropdown;
  }

  isDark = false;

  toggleTheme() {
    this.isDark = !this.isDark;
    if (this.isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }

  toggleUserDropdown() {
    this.showUserDropdown = !this.showUserDropdown;
  }

  getUserName(): string {
    return localStorage.getItem('currentUser') || 'User';
  }

  getUserEmail(): string {
    return localStorage.getItem('useremail') || '';
  }

  getUserRole(): string {
    return this.auth.getrole() || 'USER';
  }

  goToProfile() {
    this.showUserDropdown = false;
    this.router.navigate(['/app/profile']);
  }

  logout() {
    this.auth.logout();
    this.showUserDropdown = false;
    this.router.navigate(['/login']);
  }

  joinMeeting(){
    window.open('https://meeting.mannit.co/');
  }

  scheduleMeeting(){
    window.open('https://meeting.mannit.co/schedule');
  }

}
