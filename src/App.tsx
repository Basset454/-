import React, { useState, useEffect, useRef } from 'react';
import {
  Code2,
  ShoppingCart,
  Zap,
  CheckCircle2,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Clock,
  Menu,
  X,
  Globe,
  ShieldCheck,
  Smartphone,
  ChevronDown,
  Layers,
  Send,
  MessageCircle,
  ExternalLink,
  Award,
  Users2,
  Sparkles,
  Quote,
  Star
} from 'lucide-react';

// Image assets generated for the agency
const HERO_IMG = '/src/assets/images/hero_web_agency_1791067918486.jpg';
const ABOUT_IMG = '/src/assets/images/about_web_team_1791067931441.jpg';
const SERVICE_DEV_IMG = '/src/assets/images/service_custom_dev_1791067942354.jpg';
const SERVICE_ECOM_IMG = '/src/assets/images/service_ecommerce_1791067952267.jpg';
const SERVICE_OPT_IMG = '/src/assets/images/service_optimization_1791067961883.jpg';

// Client avatars for testimonials
const AVATAR_CEO = '/src/assets/images/client_avatar_ceo_1791068239666.jpg';
const AVATAR_FOUNDER = '/src/assets/images/client_avatar_founder_1791068250811.jpg';
const AVATAR_DIRECTOR = '/src/assets/images/client_avatar_director_1791068259864.jpg';

/**
 * High-performance scroll reveal using native browser IntersectionObserver.
 * Operates on compositor-only properties (opacity, transform) to ensure 60fps
 * with zero impact on page scroll performance. Automatically unobserves once visible.
 */
function RevealOnScroll({
  children,
  className = '',
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Accessibility check: immediately show if user prefers reduced motion or API is missing
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (domRef.current) {
            observer.unobserve(domRef.current);
          }
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const currentElem = domRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      style={{
        transitionDuration: '700ms',
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity, transform',
      }}
      className={`transition-all transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'
      } ${className}`}
    >
      {children}
    </div>
  );
}

interface ProjectEstimate {
  type: string;
  pages: number;
  features: string[];
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'custom-web',
    message: ''
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // Interactive Project Cost Estimator State
  const [estimate, setEstimate] = useState<ProjectEstimate>({
    type: 'company',
    pages: 5,
    features: ['responsive', 'seo']
  });

  // Active Portfolio Filter
  const [portfolioFilter, setPortfolioFilter] = useState('all');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Handle Form Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (formError) setFormError('');
  };

  // Submit Contact Form
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError('يرجى ملء الحقول المطلوبة (الاسم، البريد الإلكتروني، وتفاصيل المشروع)');
      return;
    }
    
    setFormSubmitting(true);
    setTimeout(() => {
      setFormSubmitting(false);
      setFormSubmitted(true);
    }, 600);
  };

  // Select service and scroll to contact
  const handleSelectService = (serviceId: string) => {
    setFormData(prev => ({ ...prev, service: serviceId }));
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculate estimated budget & timeline
  const calculateEstimate = () => {
    let basePrice = 1200;
    let baseDays = 10;

    if (estimate.type === 'ecommerce') {
      basePrice = 2400;
      baseDays = 18;
    } else if (estimate.type === 'webapp') {
      basePrice = 3800;
      baseDays = 25;
    }

    const pagesExtra = Math.max(0, estimate.pages - 5) * 80;
    const daysExtra = Math.floor(Math.max(0, estimate.pages - 5) / 2);

    const featuresExtra = estimate.features.length * 250;
    const featureDaysExtra = estimate.features.length * 2;

    const totalPrice = basePrice + pagesExtra + featuresExtra;
    const totalDays = baseDays + daysExtra + featureDaysExtra;

    return { totalPrice, totalDays };
  };

  const { totalPrice, totalDays } = calculateEstimate();

  const toggleFeature = (featId: string) => {
    setEstimate(prev => ({
      ...prev,
      features: prev.features.includes(featId)
        ? prev.features.filter(f => f !== featId)
        : [...prev.features, featId]
    }));
  };

  // 3 Core Services
  const services = [
    {
      id: 'custom-web',
      number: '01',
      title: 'تطوير المواقع والتطبيقات المخصصة',
      subtitle: 'Custom Web & App Development',
      description: 'بناء مواقع ويب عصرية وتطبيقات تفاعلية متجاوبة تضمن تجربة تصفح فائقة السرعة على الحواسيب والموبايل، مع كود برمجي نظيف ومهيكل وفق أحدث التقنيات.',
      image: SERVICE_DEV_IMG,
      icon: Code2,
      features: [
        'تصميم تفاعلي استثنائي متوافق كلياً مع جميع الشاشات (Mobile-First)',
        'بنية برمجية نظيفة وقابلة للتطوير والربط البرمجي (APIs)',
        'لوحة تحكم مرنة وسهلة لإدارة المحتوى دون تعقيد',
        'معايير وصول عالمية وسرعة استجابة فورية'
      ],
      deliverables: ['كود مصدري كامل', 'توثيق تقني للمشروع', 'دعم فني وتدريب مجاني']
    },
    {
      id: 'ecommerce',
      number: '02',
      title: 'المتاجر الإلكترونية وحلول التجارة الرقمية',
      subtitle: 'E-Commerce Platforms & Payments',
      description: 'تصميم وإطلاق متاجر رقمية احترافية متكاملة مصممة لرفع معدلات التحويل وزيادة المبيعات، مع ربط موثوق ببوابات الدفع وشركات الشحن.',
      image: SERVICE_ECOM_IMG,
      icon: ShoppingCart,
      features: [
        'ربط آمن مع بوابات الدفع الإلكتروني (مدى، فيزا، ماستركارد، Apple Pay)',
        'إدارة متقدمة للمخزون، المنتجات، وتصنيفات الشحن',
        'سلة شراء سلسة تمنع التخلي عن الطلبات وترفع الأرباح',
        'نظام تقارير وإحصائيات دقيقة لمتابعة أداء المبيعات'
      ],
      deliverables: ['متجر جاهز للبيع فوراً', 'شهادة SSL متقدمة', 'ربط تحليلات جوجل']
    },
    {
      id: 'optimization',
      number: '03',
      title: 'تحسين الأداء وتهيئة محركات البحث والأمان',
      subtitle: 'Speed, SEO & Cyber Protection',
      description: 'تسريع تحميل المواقع لأقل من ثانية واحدة، وتحسين ظهور صفحاتك في مقدمة نتائج بحث Google، مع تعزيز جدار الحماية ضد أي اختراقات.',
      image: SERVICE_OPT_IMG,
      icon: Zap,
      features: [
        'تحسين مقاييس الأداء الأساسية للويب (Core Web Vitals 95+)',
        'تهيئة هيكل الموقع وسرعة الفهرسة لمحركات البحث (SEO)',
        'حماية متقدمة ضد هجمات DDoS والبرمجيات الخبيثة',
        'ضغط الموارد، الصور، وإعداد شبكات توزيع المحتوى (CDN)'
      ],
      deliverables: ['تقرير أداء شامل', 'فحص أمان دوري', 'خطة صيانة شهرية']
    }
  ];

  // Testimonials Data (3 verified client cases with outcomes)
  const testimonials = [
    {
      id: 1,
      name: 'المهندس فهد السبيعي',
      role: 'الرئيس التنفيذي',
      company: 'شركة أفق للاستشارات الاستراتيجية',
      avatar: AVATAR_CEO,
      rating: 5,
      impact: 'زيادة +140% في طلبات التواصل المكتملة',
      text: 'كان اختيارنا لشركة تطوير الويب قراراً استراتيجياً صائباً في مسيرة نمونا. قاموا بإعادة هندسة وبناء منصتنا الرقمية بالكامل مع كود نظيف وتجربة تصفح فائقة السرعة للمستخدمين. تم تسليم العمل قبل الموعد بـ 3 أيام، وانعكس ذلك مباشرة على ثقة المستثمرين ومضاعفة طلبات الاستشارات الرقمية.'
    },
    {
      id: 2,
      name: 'الأستاذة سارة المنصور',
      role: 'المؤسس والمدير العام',
      company: 'متجر بيان للتجارة الإلكترونية',
      avatar: AVATAR_FOUNDER,
      rating: 5,
      impact: 'ارتفاع +85% في عمليات الشراء وانخفاض زمن التحميل إلى 0.6s',
      text: 'فريق استثنائي ومهني لأقصى درجة. نجحوا في تحويل متجرنا إلى تجربة تسوق سريعة وسلسة مع ربط آمن وفوري بكافة بوابات الدفع الإلكترونية وشركات الشحن. انخفض معدل ترك السلة بشكل ملموس وتضاعفت مبيعاتنا الشهرية بفضل سهولة الشراء عبر الهواتف الذكية.'
    },
    {
      id: 3,
      name: 'الدكتور طارق القحطاني',
      role: 'الشريك المؤسس ومدير التقنية',
      company: 'منصة إتقان للحلول الصناعية',
      avatar: AVATAR_DIRECTOR,
      rating: 5,
      impact: 'استقرار تام 100% ومعالجة 50 ألف طلب يومياً',
      text: 'أكثر ما يميز فريق شركة تطوير الويب هو الدقة البرمجية العالية والالتزام الصارم بأفضل معايير الحماية والأداء. صمموا بنية تحتية سحابية متقدمة تتحمل الضغط العالي دون أي تباطؤ. الدعم الفني والمتابعة بعد الإطلاق استثنائية وتستحق كل التقدير.'
    }
  ];

  // Portfolio items
  const portfolioItems = [
    {
      title: 'منصة أفق للاستشارات الإدارية',
      category: 'company',
      tag: 'موقع تعريفي للشركات',
      result: 'تحسن بنسبة +140% في طلبات التواصل',
      summary: 'موقع إلكتروني ثنائي اللغة مع نظام حجز استشارات وإدارة للمقالات والتقارير الدورية.',
      metrics: 'سرعة تحميل 0.7s · تجاوب 100%'
    },
    {
      title: 'متجر بيان للمنتجات الفاخرة',
      category: 'ecommerce',
      tag: 'متجر تجارة إلكترونية',
      result: 'زيادة +85% في عمليات الشراء المكتملة',
      summary: 'متجر سحابي سريع يتيح تصفح أكثر من 1500 منتج مع بوابات دفع سريعة وتتبع للشحن.',
      metrics: 'أكثر من 20 ألف زائر شهرياً'
    },
    {
      title: 'تطبيق رواء لإدارة المشاريع',
      category: 'webapp',
      tag: 'تطبيق ويب سحابي',
      result: 'معالجة 50 ألف طلب بيانات يومياً',
      summary: 'لوحة تحكم إدارية تفاعلية للفرق البرمجية والميدانية مع تقارير وإحصائيات مباشرة.',
      metrics: 'توافق كامل مع متصفحات الموبايل'
    },
    {
      title: 'بوابة إتقان للحلول الصناعية',
      category: 'company',
      tag: 'بوابة صناعية متقدمة',
      result: 'تضاعف عروض الأسعار المستلمة',
      summary: 'تصميم يعكس ريادة الشركة في القطاع الصناعي مع كتالوج رقمي تفاعلي للمعدات.',
      metrics: 'أمان عالي ومطابقة لمعايير ISO'
    }
  ];

  const filteredPortfolio = portfolioFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(p => p.category === portfolioFilter);

  // FAQs
  const faqs = [
    {
      q: 'كم يستغرق بناء وتدشين الموقع الإلكتروني؟',
      a: 'تتراوح المدة عادةً بين 7 إلى 14 يوماً للمواقع التعريفية والشركات، ومن 15 إلى 25 يوماً للمتاجر الإلكترونية والتطبيقات المخصصة، مع الالتزام التام بالمواعيد المحددة في خطة العمل.'
    },
    {
      q: 'هل سيكون موقعي متوافقاً تماماً مع الهواتف الذكية والأجهزة اللوحية؟',
      a: 'نعم بكل تأكيد، نعتمد أسلوب (Mobile-First) في كافة مشاريعنا، مما يضمن عرضاً سلساً وسريعاً وجذاباً على جميع مقاسات الشاشات والهواتف دون أي تشوه.'
    },
    {
      q: 'هل يمكنني تعديل وإضافة المحتوى بسهولة بعد استلام الموقع؟',
      a: 'نوفر لوحة تحكم عصرية وسهلة الاستخدام باللغة العربية، تمكنك من تعديل النصوص، إضافة الصور، المقالات، والمنتجات بكل يسر دون الحاجة لأي خبرة برمجية، مع جلسة تدريب فيديو مخصصة.'
    },
    {
      q: 'ما هي خدمات الدعم الفني والصيانة المتاحة بعد إطلاق الموقع؟',
      a: 'نقدم دعماً فنياً وضماناً شاملاً مجانياً لمدة 3 أشهر بعد التسليم، بالإضافة إلى خطط صيانة شهرية وسنوية اختيارية تشمل النسخ الاحتياطي الدوري، التحديثات الأمنية، وتحسين الأداء المستمر.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white" dir="rtl">
      
      {/* =========================================================================
          1. TOP BAR CONTRACT (Strict 3-zone contract)
          Zone 1: Brand Wordmark (Single text element)
          Zone 2: 4-6 Clean text navigation links
          Zone 3: Primary Action Button
         ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Zone 1: Brand Wordmark */}
          <a href="#" className="flex items-center gap-3 text-slate-900 hover:text-blue-700 transition-colors">
            <span className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-sm">
              <Code2 className="w-6 h-6 text-white" />
            </span>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              شركة تطوير الويب
            </span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <a href="#hero" className="hover:text-blue-600 transition-colors">الرئيسية</a>
            <a href="#about" className="hover:text-blue-600 transition-colors">من نحن</a>
            <a href="#services" className="hover:text-blue-600 transition-colors">خدماتنا</a>
            <a href="#testimonials" className="hover:text-blue-600 transition-colors">شهادات العملاء</a>
            <a href="#portfolio" className="hover:text-blue-600 transition-colors">أعمالنا</a>
            <a href="#estimator" className="hover:text-blue-600 transition-colors">حاسبة التكلفة</a>
          </nav>

          {/* Zone 3: Primary Action & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap"
            >
              <span>ابدأ مشروعك</span>
              <ArrowLeft className="w-4 h-4" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
              aria-label="القائمة الرئيسية"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 shadow-lg animate-fadeIn">
            <nav className="flex flex-col gap-4 text-base font-semibold text-slate-700">
              <a
                href="#hero"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-blue-600 border-b border-slate-100"
              >
                الرئيسية
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-blue-600 border-b border-slate-100"
              >
                من نحن
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-blue-600 border-b border-slate-100"
              >
                خدماتنا (3 خدمات)
              </a>
              <a
                href="#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-blue-600 border-b border-slate-100"
              >
                شهادات العملاء
              </a>
              <a
                href="#portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-blue-600 border-b border-slate-100"
              >
                أعمالنا
              </a>
              <a
                href="#estimator"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-blue-600 border-b border-slate-100"
              >
                حاسبة التكلفة والمدة
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-blue-600 border-b border-slate-100"
              >
                الأسئلة الشائعة
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 py-3 text-center bg-blue-600 text-white rounded-lg font-bold"
              >
                تواصل معنا الآن
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* =========================================================================
          2. HERO SECTION
          High-impact proposition, editorial typography, balanced layout, proof stats
         ========================================================================= */}
      <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50 pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200/60">
        
        {/* Subtle decorative background light */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-10 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Hero Copy (7 cols on desktop) */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-right">
                
                {/* Clean Kicker (Zero-pill discipline) */}
                <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-700 tracking-wide">
                  <span>حلول رقمية رائدة</span>
                  <span aria-hidden="true">·</span>
                  <span>تصميم وبرمجة بأحدث المعايير</span>
                  <span aria-hidden="true">·</span>
                  <span>سرعة استثنائية</span>
                </div>

                {/* Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.2] text-balance">
                  نطوّر مواقع وتطبيقات ويب ترتقي بعلامتك التجارية وتحقق نتائج حقيقية
                </h1>

                {/* Subtitle / Description */}
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  نساعد رواد الأعمال والشركات الطموحة في تحويل رؤيتهم إلى منصات رقمية تفاعلية فائقة السرعة، تجمع بين التصميم الجذاب والأداء البرمجي القوي والمتوافق كلياً مع جميع الأجهزة.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <a
                    href="#contact"
                    className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>اطلب موقعك الآن</span>
                    <ArrowLeft className="w-5 h-5" />
                  </a>

                  <a
                    href="#services"
                    className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-slate-100 text-slate-800 font-bold border border-slate-300 rounded-lg shadow-xs transition-all flex items-center justify-center gap-2"
                  >
                    <span>استكشف الخدمات</span>
                  </a>
                </div>

                {/* Proof / Metrics Bar (Claim-to-Proof Adjacency) */}
                <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-slate-700 max-w-lg mx-auto lg:mx-0">
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 tabular-nums">+120</div>
                    <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">مشروع ويب مكتمل</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 tabular-nums">99.4%</div>
                    <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">رضا العملاء</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 tabular-nums">100%</div>
                    <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">متجاوب مع الموبايل</div>
                  </div>
                </div>
              </div>

              {/* Hero Visual Asset (5 cols on desktop) */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 group">
                  <img
                    src={HERO_IMG}
                    alt="فريق شركة تطوير الويب يعمل في بيئة تقنية حديثة"
                    referrerPolicy="no-referrer"
                    className="w-full h-[360px] sm:h-[440px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Scrim overlay for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                    <div className="flex items-center gap-2 text-xs font-semibold text-blue-300 mb-1">
                      <Sparkles className="w-4 h-4 text-blue-400" />
                      <span>تقنيات حديثة: HTML5 · CSS3 Tailwind · JavaScript</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      حلول برمجية مخصصة لنمو أعمالك
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      كود نظيف، سرعة تحميل خيالية، وحماية أمنية متكاملة لجميع المشاريع.
                    </p>
                  </div>
                </div>

                {/* Floating trust card */}
                <div className="hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-sm border border-slate-200/90 rounded-xl p-3.5 shadow-lg absolute -bottom-5 -right-5 z-10 max-w-xs">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">معايير أمان وأداء معتمدة</div>
                    <div className="text-[11px] text-slate-500">حماية SSL وتوافق كامل مع محركات البحث</div>
                  </div>
                </div>
              </div>

            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* =========================================================================
          3. ABOUT SECTION (من نحن)
          High-fidelity story, team picture, core pillars
         ========================================================================= */}
      <section id="about" className="py-20 lg:py-28 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* About Image / Visual */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                  <img
                    src={ABOUT_IMG}
                    alt="فريق المهندسين والمصممين في شركة تطوير الويب"
                    referrerPolicy="no-referrer"
                    className="w-full h-[380px] sm:h-[460px] object-cover"
                  />
                  
                  {/* Highlight badge on image */}
                  <div className="absolute bottom-4 right-4 left-4 bg-white/95 backdrop-blur-md rounded-xl p-4 border border-slate-200/80 shadow-md text-slate-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-slate-500 font-medium">خبرة متراكمة في السوق</div>
                        <div className="text-lg font-black text-blue-700 tabular-nums">أكثر من 8 سنوات</div>
                      </div>
                      <div className="h-8 w-px bg-slate-200" />
                      <div>
                        <div className="text-xs text-slate-500 font-medium">نسبة إنجاز المشاريع في موعدها</div>
                        <div className="text-lg font-black text-slate-900 tabular-nums">98.5%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* About Narrative (7 cols) */}
              <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
                
                <div className="text-xs font-bold text-blue-700 tracking-wider">
                  من نحن · رحلة الابتكار والتميز
                </div>

                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
                  شريكك التقني الموثوق لبناء حضور رقمي قوي ومستدام
                </h2>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  نحن في <strong className="text-slate-900 font-bold">شركة تطوير الويب</strong> نؤمن بأن الموقع الإلكتروني ليس مجرد صفحات على الإنترنت، بل هو الواجهة الأساسية لنشاطك التجاري وأقوى أداة لاكتساب العملاء وبناء الثقة.
                </p>

                <p className="text-slate-600 text-base leading-relaxed">
                  يجمع فريقنا بين خبراء هندسة البرمجيات، مصممي تجارب المستخدم (UI/UX)، ومتخصصي تحسين محركات البحث والأمان، لنقدم لك حلولاً متكاملة تضمن تفوقك على المنافسين وتحقيق أهداف عملك بكفاءة متناهية.
                </p>

                {/* Three Core Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-3">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">كود نظيف ومعياري</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      برمجة قائمة على معايير W3C لضمان استقرار وسهولة تطوير الموقع مستقبلاً.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-3">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">تجاوب فوري (Responsive)</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      مظهر مبهر وسرعة تصفح انسيابية على جميع الشاشات والأجهزة الذكية.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-3">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">سرعة وأمان فائق</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      أزمنة تحميل قياسية لحماية موقعك وتصدره نتائج محركات البحث.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* =========================================================================
          4. SERVICES SECTION (خدماتنا - 3 خدمات رئيسية كما في الطلب)
          1) تطوير المواقع المخصصة
          2) المتاجر الإلكترونية
          3) تحسين الأداء وتهيئة محركات البحث والأمان
         ========================================================================= */}
      <section id="services" className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <RevealOnScroll>
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="text-xs font-bold text-blue-700 tracking-wider">
                خدماتنا المتخصصة · 3 باقات شاملة
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                حلول رقمية متكاملة مصممة خصيصاً لاحتياجاتك
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                نركز جهودنا على 3 مجالات رئيسية تضمن لك الحصول على منتج برمجي متين، سريع، وجاهز للنجاح في السوق.
              </p>
            </div>
          </RevealOnScroll>

          {/* 3 Services Cards Grid */}
          <RevealOnScroll delay={150}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
                  >
                    {/* Service Visual Thumbnail */}
                    <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                      <img
                        src={service.image}
                        alt={service.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-blue-700 border border-slate-200">
                        خدمة {service.number}
                      </div>
                    </div>

                    {/* Service Content */}
                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-900">
                              {service.title}
                            </h3>
                            <div className="text-xs text-slate-400 font-sans">
                              {service.subtitle}
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-slate-600 leading-relaxed mb-6">
                          {service.description}
                        </p>

                        {/* Feature Bullet Points */}
                        <div className="space-y-2.5 mb-6">
                          <div className="text-xs font-bold text-slate-900">المميزات الرئيسية:</div>
                          {service.features.map((feat, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>

                        {/* Deliverables */}
                        <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 mb-6">
                          <span className="font-semibold text-slate-700">المخرجات: </span>
                          <span>{service.deliverables.join(' · ')}</span>
                        </div>
                      </div>

                      {/* Direct CTA */}
                      <button
                        onClick={() => handleSelectService(service.id)}
                        className="w-full py-3 px-4 bg-slate-900 hover:bg-blue-600 text-white font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>طلب هذه الخدمة</span>
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </RevealOnScroll>

        </div>
      </section>

      {/* =========================================================================
          5. TESTIMONIALS SECTION (شهادات العملاء) - NEW SECTION
          Real attributable client reviews with outcomes, metrics, and avatars
         ========================================================================= */}
      <section id="testimonials" className="py-20 lg:py-28 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <RevealOnScroll>
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="text-xs font-bold text-blue-700 tracking-wider">
                آراء وتجارب حقيقية · ثقة متبادلة
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                شهادات العملاء وشركاء النجاح
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                نفخر بالثقة التي منحنا إياها قادة الأعمال ورواد المشاريع الرقمية، وهذه شهاداتهم حول جودة التنفيذ وسرعة النتائج.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={150}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-blue-400 hover:shadow-lg transition-all duration-300 relative group"
                >
                  <div>
                    {/* Stars & Quote Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <Quote className="w-8 h-8 text-blue-200 group-hover:text-blue-300 transition-colors" />
                    </div>

                    {/* Testimonial Quote */}
                    <p className="text-slate-700 text-sm leading-relaxed mb-6 font-medium">
                      "{item.text}"
                    </p>
                  </div>

                  <div>
                    {/* Impact Tag (Zero-pill discipline: unboxed text with icon) */}
                    <div className="text-xs font-bold text-emerald-700 pb-4 mb-4 border-b border-slate-200/80 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item.impact}</span>
                    </div>

                    {/* Client Info & Avatar */}
                    <div className="flex items-center gap-3">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs shrink-0"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          {item.name}
                        </h4>
                        <div className="text-xs text-slate-500 font-medium">
                          {item.role} · {item.company}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>

        </div>
      </section>

      {/* =========================================================================
          6. PORTFOLIO / CASE STUDIES (أعمال مختارة)
          Proof of execution with filtered tabs and verified impact
         ========================================================================= */}
      <section id="portfolio" className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <RevealOnScroll>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <div className="text-xs font-bold text-blue-700 tracking-wider mb-2">
                  نماذج من أعمالنا · قصص نجاح حقيقية
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
                  مشاريع نفخر بتنفيذها لشركاء النجاح
                </h2>
              </div>

              {/* Filter buttons (Interactive filter controls complying with skill) */}
              <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-lg mt-4 md:mt-0 self-start md:self-auto">
                {[
                  { id: 'all', label: 'الكل' },
                  { id: 'company', label: 'مواقع شركات' },
                  { id: 'ecommerce', label: 'متاجر إلكترونية' },
                  { id: 'webapp', label: 'تطبيقات ويب' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setPortfolioFilter(tab.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                      portfolioFilter === tab.id
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Portfolio Grid */}
          <RevealOnScroll delay={150}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPortfolio.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                      <span className="font-semibold text-blue-700">{item.tag}</span>
                      <span className="tabular-nums">{item.metrics}</span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{item.result}</span>
                    </div>
                    <button
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          message: `أرغب في تصميم موقع بمستوى ونمط مشروع (${item.title}).`
                        }));
                        const c = document.getElementById('contact');
                        if (c) c.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                    >
                      <span>طلب مشروع مشابه</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>

        </div>
      </section>

      {/* =========================================================================
          7. INTERACTIVE ESTIMATOR (حاسبة تقدير المشروع التفاعلية)
          Allows prospective clients to calculate timeline and cost instantly
         ========================================================================= */}
      <section id="estimator" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <RevealOnScroll>
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <div className="text-xs font-bold text-blue-700 tracking-wider">
                أداة تفاعلية سريعة · حاسبة المشروع
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                احسب التكلفة والمدة التقديرية لمشروعك خلال ثوانٍ
              </h2>
              <p className="text-sm text-slate-600">
                اختر نوع موقعك والميزات المطلوبة للحصول على تقدير فوري ومباشر.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={150}>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Controls */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* 1. Project Type */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-2">
                      1. نوع المشروع المطلوب:
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'company', label: 'موقع تعريفي للشركة' },
                        { id: 'ecommerce', label: 'متجر إلكتروني متكامل' },
                        { id: 'webapp', label: 'تطبيق ويب مخصص' },
                      ].map(item => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setEstimate(prev => ({ ...prev, type: item.id }))}
                          className={`p-3 text-xs font-bold rounded-lg border text-center transition-all cursor-pointer ${
                            estimate.type === item.id
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Number of Pages Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-slate-900">
                        2. عدد الصفحات التقريبية:
                      </label>
                      <span className="text-sm font-black text-blue-700 tabular-nums">
                        {estimate.pages} صفحات
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={estimate.pages}
                      onChange={(e) => setEstimate(prev => ({ ...prev, pages: Number(e.target.value) }))}
                      className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                      <span>صفحة واحدة (Landing Page)</span>
                      <span>10 صفحات</span>
                      <span>20 صفحة أو أكثر</span>
                    </div>
                  </div>

                  {/* 3. Extra Features */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-2">
                      3. ميزات وتكاملات إضافية:
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        { id: 'responsive', label: 'تصميم فائق التجاوب للموبايل' },
                        { id: 'seo', label: 'تهيئة متقدمة لمحركات البحث (SEO)' },
                        { id: 'payments', label: 'ربط بوابات دفع إلكتروني آمنة' },
                        { id: 'multilang', label: 'دعم لغات متعددة (عربي / إنجليزي)' },
                      ].map(f => {
                        const isChecked = estimate.features.includes(f.id);
                        return (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => toggleFeature(f.id)}
                            className={`p-2.5 text-xs text-right rounded-lg border flex items-center justify-between transition-colors cursor-pointer ${
                              isChecked
                                ? 'bg-blue-50 border-blue-400 text-blue-900 font-semibold'
                                : 'bg-white border-slate-200 text-slate-600'
                            }`}
                          >
                            <span>{f.label}</span>
                            <CheckCircle2 className={`w-4 h-4 ${isChecked ? 'text-blue-600' : 'text-slate-300'}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Estimate Summary Box */}
                <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between shadow-xs">
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      التقدير الأولي المتوقع
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50/60 rounded-lg border border-blue-100">
                        <div className="text-xs text-blue-900 mb-1">التكلفة التقديرية تبدأ من:</div>
                        <div className="text-3xl font-black text-blue-700 tabular-nums">
                          ${totalPrice.toLocaleString()}
                          <span className="text-xs font-normal text-slate-500 mr-2">دولار تقريباً</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between py-2 border-b border-slate-100 text-xs">
                        <span className="text-slate-500">المدة الزمنية المتوقعة:</span>
                        <span className="font-bold text-slate-800 tabular-nums">{totalDays} يوم عمل</span>
                      </div>

                      <div className="flex items-center justify-between py-2 border-b border-slate-100 text-xs">
                        <span className="text-slate-500">الدعم الفني والضمان:</span>
                        <span className="font-bold text-emerald-600">3 أشهر مجاناً</span>
                      </div>

                      <div className="flex items-center justify-between py-2 text-xs">
                        <span className="text-slate-500">الكود المصدري:</span>
                        <span className="font-bold text-slate-800">ملكية كاملة لك</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={() => {
                        const serviceKey = estimate.type === 'ecommerce' ? 'ecommerce' : 'custom-web';
                        setFormData(prev => ({
                          ...prev,
                          service: serviceKey,
                          message: `أرغب في الاستفسار عن مشروع (${estimate.type === 'company' ? 'موقع شركة' : estimate.type === 'ecommerce' ? 'متجر إلكتروني' : 'تطبيق ويب'})، بحدود ${estimate.pages} صفحات، مع الميزات: ${estimate.features.join('، ')}.`
                        }));
                        const c = document.getElementById('contact');
                        if (c) c.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>طلب عرض سعر رسمي بناءً على هذا التقدير</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div className="text-center text-[10px] text-slate-400 mt-2">
                      التقدير استرشادي، وسيتم تزويدك بعرض تفصيلي دقيق بعد دراسة المتطلبات.
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </RevealOnScroll>

        </div>
      </section>

      {/* =========================================================================
          8. FAQ SECTION (الأسئلة الشائعة)
         ========================================================================= */}
      <section id="faq" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <RevealOnScroll>
            <div className="text-center mb-12 space-y-3">
              <div className="text-xs font-bold text-blue-700 tracking-wider">
                إجابات واضحة ومباشرة
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                الأسئلة الأكثر شيوعاً
              </h2>
              <p className="text-sm text-slate-600">
                كل ما تحتاج لمعرفته حول سير العمل وطريقة التعاقد والتسليم.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={150}>
            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-right p-5 flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <span className="font-bold text-slate-900 text-sm sm:text-base">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-500 transition-transform duration-200 shrink-0 ${
                          isOpen ? 'rotate-180 text-blue-600' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-5 pt-2 bg-white text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </RevealOnScroll>

        </div>
      </section>

      {/* =========================================================================
          9. CONTACT FORM & INFO SECTION (تواصل معنا - بسيط ومباشر)
         ========================================================================= */}
      <section id="contact" className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <RevealOnScroll>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Contact Information & Channels (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="text-xs font-bold text-blue-700 tracking-wider mb-2">
                    تواصل معنا مباشرة
                  </div>
                  <h2 className="text-3xl font-black text-slate-900">
                    دعنا نبدأ في بناء مشروعك القادم اليوم
                  </h2>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                    فريقنا مستعد للإجابة على جميع استفساراتك وتقديم استشارة تقنية مجانية لدراسة متطلبات مشروعك وتحديد أنسب الحلول البرمجية.
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="space-y-4 pt-2">
                  
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">البريد الإلكتروني المباشر</div>
                      <a href="mailto:contact@webdev-company.com" className="text-sm font-bold text-slate-900 hover:text-blue-600">
                        contact@webdev-company.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">رقم الهاتف / الواتساب</div>
                      <a href="tel:+966501234567" className="text-sm font-bold text-slate-900 hover:text-blue-600 dir-ltr text-right inline-block">
                        +966 50 123 4567
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">المقر الرئيسي</div>
                      <div className="text-sm font-bold text-slate-900">
                        برج الأعمال التقني، شارع الملك فهد، الرياض، المملكة العربية السعودية
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">أوقات العمل واستقبال الاستشارات</div>
                      <div className="text-sm font-bold text-slate-900">
                        الأحد - الخميس: 9:00 صباحاً – 6:00 مساءً
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Contact Form (7 cols) */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  نموذج طلب عرض سعر أو استشارة مجانية
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  املأ النموذج وسيقوم مهندس المشاريع بالتواصل معك في غضون ساعتين خلال أوقات العمل.
                </p>

                {formSubmitted ? (
                  <div className="p-8 text-center bg-blue-50/70 border border-blue-200 rounded-xl space-y-4">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900">
                      تم استلام طلبك بنجاح!
                    </h4>
                    <p className="text-sm text-slate-600 max-w-md mx-auto">
                      شكراً لتواصلك مع شركة تطوير الويب. تلقينا تفاصيل مشروعك وسيقوم فريقنا بدراسة المتطلبات والرد عليك عبر البريد الإلكتروني أو الهاتف قريباً.
                    </p>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          service: 'custom-web',
                          message: ''
                        });
                      }}
                      className="px-6 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      إرسال طلب آخر
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    {formError && (
                      <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-semibold">
                        {formError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1.5">
                          الاسم الكامل <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="مثال: محمد الغامدي"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1.5">
                          البريد الإلكتروني <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="name@company.com"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-left"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1.5">
                          رقم الهاتف أو الواتساب
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+966 5..."
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-left"
                          dir="ltr"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1.5">
                          الخدمة المطلوبة <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                        >
                          <option value="custom-web">1. تطوير المواقع والتطبيقات المخصصة</option>
                          <option value="ecommerce">2. المتاجر الإلكترونية وحلول التجارة الرقمية</option>
                          <option value="optimization">3. تحسين الأداء وتهيئة محركات البحث والأمان</option>
                          <option value="other">استشارة عامة لمشروع جديد</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        تفاصيل المشروع أو متطلبات العمل <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="اذكر نبذة عن موقعك أو متجرك، الصفحات المطلوبة، وأي أفكار محددة تود تنفيذها..."
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {formSubmitting ? (
                        <span>جاري إرسال الطلب...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>إرسال الطلب والحصول على استشارة</span>
                        </>
                      )}
                    </button>

                    <div className="text-center text-[11px] text-slate-400 pt-2">
                      نحن نحترم خصوصيتك التامة، ولن يتم مشاركة بياناتك مع أي طرف ثالث على الإطلاق.
                    </div>
                  </form>
                )}
              </div>

            </div>
          </RevealOnScroll>

        </div>
      </section>

      {/* =========================================================================
          10. FOOTER (تذييل الموقع الاحترافي)
          Navy & white palette, clean typographic links, copyright notice
         ========================================================================= */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
            
            {/* Brand column (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                  <Code2 className="w-5 h-5 text-white" />
                </span>
                <span className="text-xl font-bold text-white tracking-tight">
                  شركة تطوير الويب
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                شركة رائدة متخصصة في هندسة المواقع، المنصات الإلكترونية وتطبيقات الويب الحديثة بأحدث التقنيات وأعلى معايير الجودة والأداء.
              </p>
              <div className="text-xs text-slate-400 pt-2">
                <span>المملكة العربية السعودية · الرياض</span>
                <span className="mx-2">·</span>
                <span>سجل تجاري معتمد</span>
              </div>
            </div>

            {/* Quick Links (2 cols) */}
            <div className="lg:col-span-2 space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                روابط الموقع
              </div>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#hero" className="hover:text-white transition-colors">الرئيسية</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">من نحن</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">خدماتنا الثلاث</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">شهادات العملاء</a></li>
                <li><a href="#portfolio" className="hover:text-white transition-colors">نماذج الأعمال</a></li>
                <li><a href="#estimator" className="hover:text-white transition-colors">حاسبة التكلفة</a></li>
              </ul>
            </div>

            {/* Services (3 cols) */}
            <div className="lg:col-span-3 space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                خدماتنا
              </div>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#services" className="hover:text-white transition-colors">تطوير المواقع والتطبيقات المخصصة</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">المتاجر الإلكترونية وبوابات الدفع</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">تحسين الأداء وسرعة التحميل</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">تهيئة محركات البحث (SEO)</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">حماية وأمان المواقع السحابية</a></li>
              </ul>
            </div>

            {/* Direct Contact (2 cols) */}
            <div className="lg:col-span-2 space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                تواصل سريع
              </div>
              <div className="space-y-2 text-xs text-slate-400">
                <div>contact@webdev-company.com</div>
                <div dir="ltr" className="text-right">+966 50 123 4567</div>
                <div>الرياض، المملكة العربية السعودية</div>
              </div>
            </div>

          </div>

          {/* Copyright and quiet metadata */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <div>
              © 2026 شركة تطوير الويب. جميع الحقوق محفوظة.
            </div>
            <div className="flex items-center gap-4">
              <span>HTML5 · CSS3 Tailwind · JavaScript</span>
              <span>·</span>
              <span>تأثيرات حركية فائقة الأداء</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
