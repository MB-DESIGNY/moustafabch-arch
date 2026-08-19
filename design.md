# design.md — دليل تحويل قالب Minifolio إلى Astro لموقع Draft Studio

> **الهدف:** تحويل قالب HTML الثابت (Minifolio – Gramentheme) إلى مشروع Astro مكوّن، معدّل الألوان فقط دون المساس بالتصميم الأصلي، ثلاثي اللغة (عربي RTL / إنجليزي / فرنسي)، لعرض أعمال وخدمات **Mustafa Benchabane — Draft Studio** في التصميم المعماري والتسويق العقاري حصرًا.

---

## 1. تحليل القالب المصدر (كما استُلم)

القالب: **Minifolio – Portfolio HTML Template** (Gramentheme)، ثيم داكن (dark theme)، مبني على Bootstrap 5 + jQuery + Swiper + WOW.js.

**الملفات المستلمة:**
`index.html`, `service.html`, `service-details.html`, `portfolio.html`, `portfolio-details.html`, `faq.html`, `contact.html`, `main.css` (+ ملفات `assets/` الافتراضية: css/js/img غير مرفوعة بعد — يجب طلبها أو استخراجها من مصدر القالب الكامل).

**متغيرات الألوان الحالية (من `main.css`):**
```css
--body: #060606;
--black: #000;
--white: #fff;
--theme: #BFF747;   /* أخضر نيون — سيُستبدل */
--header: #fff;
--text: #C1C1C1;
--border: 1.5px solid rgba(193,193,193,0.16);
--border-2: 1.5px solid #28E98C;
--bg: #171914;
--bg-2: #060606;
```
ملاحظة: ملف `assets/css/color.css` (المشار إليه في كل صفحة) لم يُرفع — على الأغلب يحتوي متغيرات لون إضافية لنسخ الثيم البديلة. يجب طلبه من الأرشيف الأصلي قبل بدء العمل، أو استخراج القيم الفعلية المطبّقة من `main.css` وحدها إذا لم يتوفر.

### 2. جرد الأقسام (Sections) لكل صفحة — كما تظهر في HTML الفعلي

| الصفحة | الأقسام بالترتيب |
|---|---|
| **الهيكل العام (مشترك)** | Preloader، Back-to-top، Custom Mouse Cursor، Offcanvas Sidebar، Header/Nav، Search Overlay، Footer |
| **index.html** | Hero (hero-3) → Feature (3 بطاقات) → About (about-3) → Service (service-3، 3 خدمات) → Client (شعارات + عداد) → Project/Case-Studies (project-3) → Experience/Resume (timeline) → Testimonials (slider) → Funfact (عدادات) → News/Blog |
| **service.html** | Breadcrumb → Service Grid → Pricing → Awards |
| **service-details.html** | Breadcrumb → Service Details (محتوى طويل + قائمة عمليات post-item + صورتان جانبيتان + اقتباس highlight-text) + Sidebar (قائمة الخدمات + بطاقة تواصل) |
| **portfolio.html** | Breadcrumb → Project Grid (مصفوفة صور بعرض متفاوت project-items-2) |
| **portfolio-details.html** | صورة رئيسية → محتوى تفصيلي (بحث، مشكلة، نتيجة) + صور مزدوجة + Sidebar (معلومات المشروع: الاسم/العميل/الأداة/التكلفة/التاريخ + بطاقة تواصل) |
| **faq.html** | Breadcrumb → Marquee (شريط متحرك) → FAQs (أكورديون) → Testimonials-2 |
| **contact.html** | Breadcrumb → Contact (نموذج + معلومات تواصل، على الأغلب خريطة) |

> **قرار تصميم مهم:** بما أن نطاق العمل محصور بـ"التصميم المعماري والتسويق العقاري فقط"، ستُحذف أقسام غير ذات صلة بمحتوى وهمي (News/Blog، Client logos العشوائية، الاستشهادات القانونية "Law/Lawyer") وتُستبدل نصوصها بمحتوى Draft Studio — لكن **البنية البصرية والـ markup والـ CSS classes تبقى كما هي**، فقط altered content + colors.

---

## 2. هيكلة مشروع Astro المستهدفة

```
src/
├─ components/
│  ├─ layout/
│  │  ├─ Preloader.astro
│  │  ├─ BackToTop.astro
│  │  ├─ CursorFollower.astro
│  │  ├─ OffcanvasMenu.astro
│  │  ├─ Header.astro
│  │  ├─ SearchOverlay.astro
│  │  └─ Footer.astro
│  ├─ sections/
│  │  ├─ HeroSection.astro
│  │  ├─ FeatureSection.astro
│  │  ├─ AboutSection.astro
│  │  ├─ ServiceGridSection.astro       (يُستخدم في index + service)
│  │  ├─ ServicePricingSection.astro
│  │  ├─ ProjectShowcaseSection.astro   (case studies index)
│  │  ├─ ProjectGridSection.astro       (شبكة portfolio الكاملة)
│  │  ├─ ExperienceSection.astro        (المسيرة المهنية — من CV)
│  │  ├─ TestimonialsSection.astro
│  │  ├─ FunfactSection.astro
│  │  ├─ FaqSection.astro
│  │  ├─ ContactFormSection.astro
│  │  └─ BreadcrumbSection.astro
│  └─ ui/
│     ├─ ServiceCard.astro
│     ├─ ProjectCard.astro
│     ├─ SectionTitle.astro
│     └─ ThemeButton.astro
├─ content/
│  ├─ services/          (ملف .md أو .json لكل خدمة × 3 لغات أو i18n key-based)
│  ├─ projects/          (أعمال المعرض — معمارية وتسويق عقاري)
│  └─ config.ts
├─ i18n/
│  ├─ ar.json
│  ├─ en.json
│  └─ fr.json
├─ layouts/
│  ├─ BaseLayout.astro
│  └─ PageLayout.astro   (يضم Breadcrumb + المحتوى + Footer)
├─ pages/
│  ├─ [lang]/
│  │  ├─ index.astro
│  │  ├─ services/
│  │  │  ├─ index.astro
│  │  │  └─ [slug].astro
│  │  ├─ portfolio/
│  │  │  ├─ index.astro
│  │  │  └─ [slug].astro
│  │  ├─ faq.astro
│  │  └─ contact.astro
│  └─ index.astro        (redirect إلى اللغة الافتراضية، عربي)
├─ styles/
│  ├─ theme.css           (متغيرات CSS الجديدة، بدل color.css)
│  └─ main.css            (نفس main.css الأصلي دون تغيير المنطق، فقط تحديث المتغيرات)
└─ utils/
   └─ i18n.ts
```

**القاعدة الذهبية:** كل `<section class="...">` في الـ HTML الأصلي = مكوّن Astro واحد مستقل بنفس الـ class names وبنفس بنية الـ DOM الداخلية تمامًا (props بدل النص الثابت). لا يُعاد ترتيب أو تبسيط الـ markup— فقط "props-ify".

---

## 3. تعيين نظام الألوان (Theme Remap)

القالب الأصلي داكن بالكامل مع لمسة أخضر نيون. الحفاظ على **نفس بنية التصميم** (Dark UI، نفس التخطيطات) مع تبديل لوحة الألوان إلى هوية Draft Studio المسجّلة:

| متغير CSS الأصلي | القيمة الأصلية | القيمة الجديدة المقترحة |
|---|---|---|
| `--theme` (اللون المميز) | `#BFF747` (أخضر نيون) | `#00C4B5` (Teal) |
| `--bg` / `--bg-2` | `#171914` / `#060606` | `#0E1030` أو `#1A1E60` (Deep Navy) كخلفية داكنة متناسقة |
| `--body` | `#060606` | نفس درجة Navy الداكنة أو أسود مائل للأزرق |
| `--text` | `#C1C1C1` | يبقى رمادي فاتح (تباين جيد على الخلفية الداكنة) |
| `--border-2` (لون تمييز الحدود) | `#28E98C` | `#00C4B5` (Teal) |
| عناصر بيضاء/فاتحة (بطاقات، شعارات) | `#fff` | تبقى بيضاء أو `#DFE7FF` (Lavender) كخلفية بطاقات فاتحة |
| لون الأزرار / الروابط النشطة | أخضر نيون | Cobalt `#2F3EC0` كـ CTA أساسي، Teal للـ hover/accents |

> يجب إنشاء `theme.css` جديد يستبدل `assets/css/color.css` بنفس أسماء المتغيرات ونفس نقاط الاستخدام — **لا تُغيّر بنية أي selector في main.css، فقط القيم اللونية**.

---

## 4. البنية متعددة اللغات (AR / EN / FR)

- استخدام Astro i18n routing: `/ar/`, `/en/`, `/fr/` مع `/ar/` كلغة افتراضية (redirect من `/`).
- العربية = RTL كامل (`dir="rtl"` + عكس اتجاه Bootstrap grid والأيقونات ذات الاتجاه مثل الأسهم `fa-arrow-right`).
- كل نص ثابت (عناوين، أزرار، تسميات) يُنقل إلى ملفات ترجمة JSON منفصلة لكل لغة (نفس نمط العمل السابق في مشروع real-estate-portfolio-site: مفاتيح ترجمة موحدة، دعم hreflang لـ SEO).
- المحتوى الديناميكي (الخدمات، الأعمال) عبر Astro Content Collections مع حقل لكل لغة أو ملف منفصل لكل لغة لكل عنصر (`projects/ar/`, `projects/en/`, `projects/fr/`).
- عكس اتجاه العناصر التي تعتمد على الاتجاه فقط عبر CSS logical properties (`margin-inline-start` بدل `margin-left`) حيثما أمكن دون كسر تصميم Bootstrap الأصلي.

---

## 5. نموذج المحتوى (Content Collections)

### 5.1 الخدمات (services) — القائمة النهائية المعتمدة

يُستبدل محتوى "Business Law / Family Law..." بالخدمات التالية فقط:

1. التصميم المعماري للبنايات السكنية
2. التصميم المعماري للبنايات ذات الاستعمال العام أو التجاري
3. تصميم الهويات البصرية للمشاريع المعمارية / الشركات الهندسية والمهندسين
4. تصميم بروفايل للشركات الهندسية
5. تصميم كتالوجات للمشاريع الهندسية
6. إظهار المخططات بالفوتوشوب (Photoshop Rendering)
7. الإظهار المعماري ثلاثي الأبعاد — **قريبًا** (badge "Coming Soon"، غير قابل للنقر أو رابط لصفحة "قريبًا")
8. المونتاج العقاري (Real Estate Video Editing) — **قريبًا**

**Schema مقترح لكل خدمة (`content/config.ts`):**
```ts
{
  title: string,          // لكل لغة
  slug: string,
  icon: string,           // مسار SVG (استبدال أيقونات service-item الأصلية)
  shortDescription: string,
  fullDescription: string,
  processSteps: { title: string; description: string }[],  // يقابل post-item في service-details
  gallery: string[],      // صور post-thumb
  comingSoon: boolean,    // true لعنصري 7 و 8
  order: number
}
```

### 5.2 الأعمال (portfolio/projects)

```ts
{
  title: string,
  slug: string,
  category: "سكني" | "تجاري/عام" | "هوية بصرية" | "بروفايل شركة" | "كتالوج" | "إظهار فوتوشوب",
  coverImage: string,
  gallery: string[],
  client?: string,
  location?: string,
  year?: string,
  tools?: string[],       // AutoCAD, Photoshop, 3ds Max...
  summary: string,
  challenge?: string,     // يقابل "Problem Statement"
  outcome?: string,       // يقابل "Final Outcome & Impact"
  featured: boolean       // للعرض في Case Studies بالصفحة الرئيسية
}
```
> بيانات فعلية جاهزة من السيرة الذاتية لتعبئة أول دفعة أعمال: مخططات الفيلات (70+ وحدة)، مشاريع السكن الاجتماعي (52 و17 وحدة، عين الباي)، مركز القيادة العسكرية بقالمة، محطة بحرية ببجاية، مباني تنافسية (حماية مدنية، مقر إداري، سكن جماعي 272 وحدة، معهد تكوين مهني)، إضافة إلى أي بروفايلات/هويات بصرية سابقة (مثل Marmara Group وBera Marmara إن رغب المستخدم بإدراجها كأمثلة تسويق عقاري/هوية بصرية).

### 5.3 الأقسام المحذوفة كليًا من القالب الأصلي (خارج النطاق)
- News/Blog section والصفحات المرتبطة بالكامل (لا حاجة لمدونة)
- كل نصوص ومصطلحات "Law/Lawyer/Legal"

### 5.4 الأقسام المُبقاة مع تحديث المحتوى فقط
- **Client / Testimonials section** تُبقى في البنية (Client logos + Testimonials slider) لكن بمحتوى حقيقي بدل الوهمي:
  - شعارات العملاء: تُستبدل بشعارات حقيقية إن توفرت (مثل Marmara Group وBera Marmara وعملاء آخرين)، أو تُترك كمكوّن جاهز فارغ (`ClientLogosSection.astro`) قابل للتعبئة لاحقًا دون حذف بنيته.
  - عداد "Active Clients" الوهمي يُستبدل برقم حقيقي (مثال: 138 عميل موثّق على Khamsat + عملاء مباشرون).
  - Testimonials: تُبقى بنية القسم (Swiper slider + بطاقات تقييم) جاهزة لاستقبال شهادات عملاء فعلية عند توفرها؛ إن لم تتوفر شهادات حقيقية عند الإطلاق، تُعرض فارغة أو بعدد محدود دون نص وهمي (Lorem-style)، لا تُحذف من الصفحة.
- **Funfact section** تبقى وتُحدَّث بأرقام حقيقية من السيرة الذاتية: 7 سنوات خبرة، 297+ مشروع منجز، 138 عميل، 97% نسبة رضا.

---

## 6. خريطة الصفحات النهائية

| المسار | يقابل في القالب الأصلي | ملاحظات |
|---|---|---|
| `/[lang]/` | index.html | Hero + Feature + About + Services (٦ مصغّرة) + Client/Testimonials (شعارات + آراء عملاء حقيقية) + Case Studies (أعمال مختارة) + Experience (من CV) + Funfact (أرقام حقيقية) |
| `/[lang]/services/` | service.html | شبكة الخدمات الثمانية (٦ فعّالة + ٢ "قريبًا") — حذف Pricing/Awards أو تكييفها لاحقًا |
| `/[lang]/services/[slug]/` | service-details.html | تفاصيل كل خدمة + Sidebar بقائمة باقي الخدمات وبطاقة تواصل |
| `/[lang]/portfolio/` | portfolio.html | شبكة الأعمال، بفلترة اختيارية حسب الفئة |
| `/[lang]/portfolio/[slug]/` | portfolio-details.html | تفاصيل المشروع + Sidebar (معلومات المشروع) |
| `/[lang]/faq/` | faq.html | أسئلة شائعة تخص العمارة والتسويق العقاري فقط (حذف Marquee إن لم يخدم الهوية، أو استبدال نصه بكلمات مفتاحية للخدمات) |
| `/[lang]/contact/` | contact.html | نموذج تواصل + بيانات Mustafa Benchabane الحقيقية |

---

## 7. مراحل التنفيذ عبر Manus.im

### المرحلة 0 — التحضير والتدقيق
- رفع كامل ملفات القالب (`assets/` بالكامل: css/js/img/fonts) لأن الرفع الحالي يحوي HTML/CSS فقط دون الأصول.
- تدقيق `color.css` الأصلي لاستخراج كل نقاط استخدام `--theme` والألوان الفرعية غير الظاهرة في `main.css`.
- تثبيت مشروع Astro فارغ + تفعيل TypeScript strict mode (تجنبًا لأخطاء سبق مواجهتها في مشروع مشابه).

### المرحلة 1 — البنية الأساسية (Shell)
- بناء `BaseLayout.astro` مع كل عناصر `<head>` (meta, fonts, css imports).
- تفكيك Header / Offcanvas / Footer / Preloader / BackToTop / CursorFollower إلى مكوّنات مستقلة في `components/layout/`.
- ربط سكربتات jQuery/Swiper/WOW كما هي (import عبر `<script>` في `BaseLayout` أو تحويلها تدريجيًا لاحقًا — لا تُلغَ الوظائف التفاعلية في هذه المرحلة).
- التحقق البصري: الصفحة الرئيسية يجب أن تُطابق القالب الأصل حرفيًا (ألوان أصلية مؤقتًا) قبل الانتقال للمرحلة التالية.

### المرحلة 2 — نظام الألوان الجديد
- إنشاء `theme.css` بالقيم من جدول القسم 3.
- استبدال `assets/css/color.css` بالكامل، دون لمس أي selector في `main.css`.
- مراجعة تباين النصوص (WCAG AA) خصوصًا نصوص فاتحة على خلفيات Teal/Cobalt.

### المرحلة 3 — تفكيك الأقسام إلى مكوّنات (Component Extraction)
- تنفيذ كل مكوّن من قائمة `components/sections/` بالترتيب الوارد في القسم 2، مع props بدل placeholder text.
- كل مكوّن مستقل تمامًا وقابل لإعادة الاستخدام عبر أكثر من صفحة (مثال: `ServiceGridSection` يُستخدم في `/` و`/services/`).

### المرحلة 4 — نظام الترجمة والـ RTL
- إنشاء `ar.json` / `en.json` / `fr.json` بنفس منهجية مشروع `real-estate-portfolio-site` (مفاتيح موحّدة، hreflang، SEO metadata لكل لغة).
- تفعيل `dir="rtl"` للعربية + مراجعة كل مكوّن بصريًا بثلاث اللغات (خصوصًا الأسهم والعناصر ذات الاتجاه في Header/Hero/Cards).

### المرحلة 5 — Content Collections والمحتوى الفعلي
- إنشاء `content/config.ts` بالـ schemas من القسم 5.
- تعبئة الخدمات الثمانية (٦ فعّالة + ٢ Coming Soon) بمحتوى Draft Studio.
- تعبئة أول دفعة أعمال (portfolio) من بيانات السيرة الذاتية.
- حذف قسم News/Blog بالكامل من كل الصفحات.
- تحديث محتوى قسم Client/Testimonials بأرقام وشعارات حقيقية (أو إبقاؤه بمكوّن جاهز فارغ دون نصوص وهمية إن لم تتوفر شهادات بعد)، دون حذف بنيته.

### المرحلة 6 — الصفحات الديناميكية
- بناء `[slug].astro` لكل من الخدمات والأعمال عبر `getStaticPaths` لكل لغة.
- ربط Sidebar (قائمة الخدمات / معلومات المشروع) ديناميكيًا من نفس الـ collection.

### المرحلة 7 — نموذج التواصل والـ SEO
- ربط بيانات التواصل الحقيقية (الهاتف، البريد، الموقع mbdesigny.me، الحسابات: Behance/Dribbble/Instagram/LinkedIn/GitHub).
- Meta tags + Open Graph + hreflang لكل صفحة ولغة.
- Sitemap + robots.txt.

### المرحلة 8 — الاختبار والنشر
- اختبار الاستجابة (Responsive) على جميع أحجام الشاشات.
- اختبار الأداء (Lighthouse) وتحسين الصور (lazy loading, WebP).
- بناء (`astro build`) والنشر على Cloudflare Pages (كما في مشاريع سابقة للمستخدم).
- تدقيق نهائي لمفاتيح الترجمة الناقصة (audit prompt مشابه للمستخدم سابقًا للتحقق الشامل من الترجمات عبر الكود).

---

## 8. الإضافات (Skills / Extensions) المطلوبة لأداة Manus

لتنفيذ العمل بأفضل جودة داخل بيئة Manus.im، يُنصح بتفعيل/إضافة القدرات التالية إن كانت متوفرة كإضافات أو Skills قابلة للتفعيل:

1. **Astro / Web Framework skill** — لفهم بنية Content Collections، `getStaticPaths`، ونمط i18n routing في Astro تحديدًا (وليس Next.js أو أطر أخرى).
2. **Frontend Design / Design-to-Code skill** — لضمان مطابقة التصميم الأصلي بدقة أثناء إعادة الهيكلة (تفكيك دون تغيير المسافات، الخطوط، والتناسق البصري).
3. **i18n / Localization skill** — لإدارة ملفات الترجمة الثلاثية وRTL بشكل منهجي دون تكرار أو مفاتيح ناقصة.
4. **Image Optimization / Asset Pipeline skill** — لتحويل صور القالب placeholder واستبدالها بصور فعلية للمشاريع المعمارية بجودة محسّنة (WebP، أحجام متجاوبة).
5. **SEO Metadata skill** — لإعداد hreflang، Open Graph، وBreadcrumb structured data بشكل صحيح لموقع خدمات محلي (Local Business / Architecture Service schema.org).
6. **Git / Version Control integration** — لتتبع التقدم عبر المراحل الثمانية أعلاه بكوميتات منفصلة لكل مرحلة، تسهيلًا للمراجعة والتراجع عند الحاجة.
7. **Cloudflare Pages Deployment skill** (إن وُجد) — لضبط إعدادات البناء والنشر مباشرة، تماشيًا مع بيئة النشر المعتمدة سابقًا لدى المستخدم.
8. **CSS Variable / Theming skill** — للتأكد من استبدال شامل لكل نقاط استخدام الألوان القديمة (`--theme`, `--border-2`, إلخ) دون ترك أي أثر للأخضر النيون الأصلي في أي حالة hover/focus/active غير ظاهرة في الفحص الأول.

> إن لم تكن هذه "Skills" بالمعنى الحرفي داخل Manus، يجب على الأقل تضمين تعليمات مكافئة صراحةً في الـ prompt الأول الموجَّه للأداة (system instructions) بحيث تُفعَّل نفس السلوكيات.

---

## 9. قيود صارمة يجب تذكيرها للأداة في كل مرحلة

- **ممنوع** تغيير أي بنية HTML/CSS-class أو تخطيط (layout) موجود في القالب الأصلي — التعديل يقتصر على: الألوان، النصوص، الصور، وتفكيك الملف الواحد HTML إلى Components.
- **ممنوع** إضافة أقسام جديدة غير موجودة أصلًا في القالب دون طلب صريح.
- **ممنوع** ترك أي نص إنجليزي وهمي (Lorem Ipsum / Law firm placeholder) في الإصدار النهائي بأي من اللغات الثلاث.
- كل خدمة أو مشروع "قريبًا" (الإظهار ثلاثي الأبعاد، المونتاج العقاري) يجب أن يظهر بوضوح كـ Badge غير قابل للنقر، وليس رابطًا مكسورًا أو صفحة فارغة.
