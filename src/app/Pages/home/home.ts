import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../services/language.service';

type Lang = 'en' | 'hi' | 'ta' | 'ar';

interface Course {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  enrollments: number;
  duration: string;
  level: string;
  progress?: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html'
})
export class Home implements OnInit {

  selectedLang: Lang = 'en';

  constructor(private langService: LanguageService) {}

  // ---------------------------------------------------------
  //  ⭐ MULTILINGUAL UI LABELS
  // ---------------------------------------------------------
  labels: Record<Lang, any> = {
    en: {
      hero: { title: "Learn Smarter with AI + Human Expertise", subtitle: "Master new skills with AI-powered learning", exploreAI: "Explore AI Features", browseLibrary: "Browse Library" },
      quickActions: { title: "Quick Actions", card1Title: "Set Learning Goal", card1Desc: "Define your objectives with AI guidance", card1Btn: "Create New Goal", card2Title: "AI Skill Assessment", card2Desc: "Test your knowledge with adaptive quizzes", card2Btn: "Start Assessment", card3Title: "Join Study Group", card3Desc: "Connect with AI-matched peers and enjoy learning", card3Btn: "Find Groups" },
      continueLearning: { title: "Continue Learning", viewAll: "View All", progressText: "% complete" },
      recommended: { title: "Recommended for You", viewAll: "View All" }
    },
    hi: {
      hero: { title: "AI + मानव विशेषज्ञता के साथ स्मार्ट सीखें", subtitle: "AI-संचालित सीखने के साथ नई कौशल प्राप्त करें", exploreAI: "AI सुविधाएँ देखें", browseLibrary: "पुस्तकालय ब्राउज़ करें" },
      quickActions: { title: "त्वरित क्रियाएँ", card1Title: "लर्निंग लक्ष्य सेट करें", card1Desc: "AI मार्गदर्शन के साथ अपने उद्देश्यों को परिभाषित करें", card1Btn: "नया लक्ष्य बनाएँ", card2Title: "AI कौशल आकलन", card2Desc: "अनुकूलित क्विज़ के साथ अपने ज्ञान का परीक्षण करें", card2Btn: "आकलन प्रारंभ करें", card3Title: "अध्ययन समूह में शामिल हों", card3Desc: "AI-संगत साथियों के साथ कनेक्ट करें", card3Btn: "समूह खोजें" },
      continueLearning: { title: "सीखना जारी रखें", viewAll: "सभी देखें", progressText: "% पूर्ण" },
      recommended: { title: "आपके लिए अनुशंसित", viewAll: "सभी देखें" }
    },
    ta: {
      hero: { title: "AI + மனித நிபுணத்துவத்துடன் புத்திசாலித்தனமாக கற்றுக்கொள்ளுங்கள்", subtitle: "AI-செயல்படுத்தப்பட்ட கற்றலுடன் புதிய திறன்களை கற்றுக்கொள்ளுங்கள்", exploreAI: "AI அம்சங்களை ஆராய்க", browseLibrary: "புத்தகாலயத்தை உலாவுக" },
      quickActions: { title: "விரைவு செயல்கள்", card1Title: "கற்றல் இலக்கை அமைக்கவும்", card1Desc: "AI வழிகாட்டியுடன் உங்கள் நோக்குகளை வரையறுக்கவும்", card1Btn: "புதிய இலக்கை உருவாக்கவும்", card2Title: "AI திறன் மதிப்பீடு", card2Desc: "உங்கள் அறிவை தழுவிய quizzes மூலம் சோதிக்கவும்", card2Btn: "மதிப்பீட்டை தொடங்கவும்", card3Title: "படிப்பு குழுவில் சேர்ந்துகொள்ளவும்", card3Desc: "AI பொருந்தும் சக மாணவர்களுடன் இணைக்கவும்", card3Btn: "குழுக்களை கண்டறியவும்" },
      continueLearning: { title: "கற்றல் தொடர்க", viewAll: "அனைத்தையும் பார்க்க", progressText: "% நிறைவு" },
      recommended: { title: "உங்களுக்கு பரிந்துரைக்கப்பட்டது", viewAll: "அனைத்தையும் பார்க்க" }
    },
    ar: {
      hero: { title: "تعلّم بذكاء مع خبرة الذكاء الاصطناعي والبشر", subtitle: "تعلّم مهارات جديدة مع التعلم المدعوم بالذكاء الاصطناعي", exploreAI: "استكشف ميزات الذكاء الاصطناعي", browseLibrary: "استعرض المكتبة" },
      quickActions: { title: "الإجراءات السريعة", card1Title: "تحديد هدف التعلم", card1Desc: "حدد أهدافك بمساعدة الذكاء الاصطناعي", card1Btn: "إنشاء هدف جديد", card2Title: "تقييم المهارات بالذكاء الاصطناعي", card2Desc: "اختبر معرفتك من خلال اختبارات تكيفية", card2Btn: "ابدأ التقييم", card3Title: "انضم إلى مجموعة الدراسة", card3Desc: "تواصل مع زملاء متوافقين مع الذكاء الاصطناعي", card3Btn: "ابحث عن مجموعات" },
      continueLearning: { title: "تابع التعلم", viewAll: "عرض الكل", progressText: "% مكتمل" },
      recommended: { title: "مقترح لك", viewAll: "عرض الكل" }
    }
  };

  // ---------------------------------------------------------
  //  ⭐ MULTILINGUAL COURSE DATA
  // ---------------------------------------------------------
  courses: Record<Lang, Course[]> = {
    en: [
      { id: 'c1', title: 'Intro to Python', instructor: 'Alice Johnson', rating: 4.7, enrollments: 3200, duration: '6h 20m', level: 'Beginner', progress: 40 },
      { id: 'c2', title: 'Machine Learning Basics', instructor: 'Dr. Ravi Kumar', rating: 4.8, enrollments: 2700, duration: '8h 10m', level: 'Intermediate', progress: 60 },
      { id: 'c3', title: 'Data Analysis with Pandas', instructor: 'Priya Singh', rating: 4.6, enrollments: 1800, duration: '5h 30m', level: 'Beginner', progress: 80 },
      { id: 'c4', title: 'React for Engineers', instructor: 'Mark Lee', rating: 4.5, enrollments: 2200, duration: '7h 0m', level: 'Intermediate', progress: 30 },
      { id: 'c5', title: 'Cloud Fundamentals', instructor: 'Sania Patel', rating: 4.4, enrollments: 1450, duration: '4h 45m', level: 'Beginner', progress: 55 },
      { id: 'c6', title: 'Advanced SQL', instructor: 'Amit Mehra', rating: 4.9, enrollments: 900, duration: '6h 50m', level: 'Advanced', progress: 20 }
    ],

    hi: [
      { id: 'c1', title: 'पाइथन परिचय', instructor: 'एलिस जॉनसन', rating: 4.7, enrollments: 3200, duration: '6 घंटे 20 मिनट', level: 'शुरुआती', progress: 40 },
      { id: 'c2', title: 'मशीन लर्निंग बेसिक्स', instructor: 'डॉ. रवि कुमार', rating: 4.8, enrollments: 2700, duration: '8 घंटे 10 मिनट', level: 'मध्यम', progress: 60 },
      { id: 'c3', title: 'पांडा्स के साथ डेटा विश्लेषण', instructor: 'प्रिया सिंह', rating: 4.6, enrollments: 1800, duration: '5 घंटे 30 मिनट', level: 'शुरुआती', progress: 80 },
      { id: 'c4', title: 'इंजीनियर्स के लिए React', instructor: 'मार्क ली', rating: 4.5, enrollments: 2200, duration: '7 घंटे', level: 'मध्यम', progress: 30 },
      { id: 'c5', title: 'क्लाउड मूल बातें', instructor: 'सानिया पटेल', rating: 4.4, enrollments: 1450, duration: '4 घंटे 45 मिनट', level: 'शुरुआती', progress: 55 },
      { id: 'c6', title: 'एडवांस्ड SQL', instructor: 'अमित मेहरा', rating: 4.9, enrollments: 900, duration: '6 घंटे 50 मिनट', level: 'उन्नत', progress: 20 }
    ],

    ta: [
      { id: 'c1', title: 'பைதான் அறிமுகம்', instructor: 'அலிஸ் ஜான்சன்', rating: 4.7, enrollments: 3200, duration: '6 மணி 20 நிமி', level: 'தொடக்க நிலை', progress: 40 },
      { id: 'c2', title: 'மெஷின் லர்னிங் அடிப்படைகள்', instructor: 'டாக்டர் ரவி குமார்', rating: 4.8, enrollments: 2700, duration: '8 மணி 10 நிமி', level: 'இடைநிலை', progress: 60 },
      { id: 'c3', title: 'Pandas மூலம் தரவு பகுப்பாய்வு', instructor: 'பிரியா சிங்', rating: 4.6, enrollments: 1800, duration: '5 மணி 30 நிமி', level: 'தொடக்க நிலை', progress: 80 },
      { id: 'c4', title: 'React for Engineers', instructor: 'மார்க் லீ', rating: 4.5, enrollments: 2200, duration: '7 மணி', level: 'இடைநிலை', progress: 30 },
      { id: 'c5', title: 'கிளவுட் அடிப்படைகள்', instructor: 'சானியா பட்டேல்', rating: 4.4, enrollments: 1450, duration: '4 மணி 45 நிமி', level: 'தொடக்க நிலை', progress: 55 },
      { id: 'c6', title: 'மேம்பட்ட SQL', instructor: 'அமித் மேஹ்ரா', rating: 4.9, enrollments: 900, duration: '6 மணி 50 நிமி', level: 'மேம்பட்டது', progress: 20 }
    ],

    ar: [
      { id: 'c1', title: 'مقدمة في بايثون', instructor: 'أليس جونسون', rating: 4.7, enrollments: 3200, duration: '6 ساعات 20 دقيقة', level: 'مبتدئ', progress: 40 },
      { id: 'c2', title: 'أساسيات تعلم الآلة', instructor: 'د. رافي كومار', rating: 4.8, enrollments: 2700, duration: '8 ساعات 10 دقائق', level: 'متوسط', progress: 60 },
      { id: 'c3', title: 'تحليل البيانات باستخدام Pandas', instructor: 'بريا سينغ', rating: 4.6, enrollments: 1800, duration: '5 ساعات 30 دقيقة', level: 'مبتدئ', progress: 80 },
      { id: 'c4', title: 'React للمهندسين', instructor: 'مارك لي', rating: 4.5, enrollments: 2200, duration: '7 ساعات', level: 'متوسط', progress: 30 },
      { id: 'c5', title: 'مبادئ السحابة', instructor: 'سانيا باتيل', rating: 4.4, enrollments: 1450, duration: '4 ساعات 45 دقيقة', level: 'مبتدئ', progress: 55 },
      { id: 'c6', title: 'SQL المتقدم', instructor: 'أميت ميهرا', rating: 4.9, enrollments: 900, duration: '6 ساعات 50 دقيقة', level: 'متقدم', progress: 20 }
    ]
  };

  // ---------------------------------------------------------
  //  GET COURSES BASED ON LANGUAGE
  // ---------------------------------------------------------
  get featuredCourses() {
    return this.courses[this.selectedLang].slice(0, 3);
  }

  get recommendedCourses() {
    return this.courses[this.selectedLang].slice(3, 6);
  }

  get continueLearning() {
    return this.courses[this.selectedLang].slice(0, 2);
  }

  // ---------------------------------------------------------
  //  ⭐ FIX: progressFor() function added
  // ---------------------------------------------------------
  progressFor(id: string): number {
    const allCourses = this.courses[this.selectedLang];
    const course = allCourses.find(c => c.id === id);
    return course?.progress ?? 0;
  }

  // ---------------------------------------------------------
  ngOnInit() {
    this.selectedLang = this.langService.getLanguage();

    this.langService.currentLang$.subscribe((lang: Lang) => {
      this.selectedLang = lang;
    });
  }

}
