import { Link } from 'react-router-dom';
import { ArrowRight, Shield } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            <span>العودة للرئيسية</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container py-12 max-w-3xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">الشروط والأحكام</h1>
        </div>

        <div className="space-y-8 text-foreground/90">
          <section className="bg-card rounded-xl p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4 text-primary">تعريف الموقع</h2>
            <p className="leading-relaxed">
              موقع "كبار مجال الشير" هو منصة عرض عضوية مدفوعة داخل مجتمع رقمي. 
              الموقع لا يعبّر عن شهرة حقيقية أو توثيق أو اعتماد رسمي من أي جهة.
            </p>
          </section>

          <section className="bg-card rounded-xl p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4 text-primary">طبيعة العضوية</h2>
            <ul className="space-y-3 list-disc list-inside text-foreground/80">
              <li>العضوية في الموقع هي عضوية رمزية داخل مجتمع رقمي محدد</li>
              <li>لا تمنح العضوية أي صفة رسمية أو اعتراف خارجي</li>
              <li>ظهور الاسم في الموقع لا يعني أي ادعاء بالشهرة أو النفوذ</li>
            </ul>
          </section>

          <section className="bg-card rounded-xl p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4 text-primary">باقات الاشتراك</h2>
            <p className="mb-4">تتوفر ثلاث باقات للاشتراك:</p>
            <ul className="space-y-2 text-foreground/80">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold" />
                <strong>باقة 50 جنيه:</strong> الاسم + الصورة + وسيلة التواصل + كارت مميز
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-silver" />
                <strong>باقة 20 جنيه:</strong> الاسم + الصورة + كارت متوسط
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-bronze" />
                <strong>باقة 10 جنيه:</strong> الاسم فقط + كارت بسيط
              </li>
            </ul>
          </section>

          <section className="bg-card rounded-xl p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4 text-primary">إخلاء المسؤولية</h2>
            <p className="leading-relaxed text-foreground/80">
              إدارة الموقع غير مسؤولة عن أي استخدام خاطئ للعضوية أو أي ادعاءات 
              تتعلق بالشهرة أو النفوذ بناءً على الظهور في الموقع. المستخدم يتحمل 
              كامل المسؤولية عن استخدامه للموقع وتفسيره لطبيعة العضوية.
            </p>
          </section>

          <section className="bg-card rounded-xl p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4 text-primary">التواصل</h2>
            <p className="leading-relaxed text-foreground/80">
              للاستفسارات أو الشكاوى، يرجى التواصل مع المطور عبر واتساب: 
              <a 
                href="https://wa.me/201278006248" 
                className="text-primary hover:underline mr-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                01278006248
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Terms;
