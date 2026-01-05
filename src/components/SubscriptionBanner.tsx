import { Crown, Star, Users, MessageCircle } from 'lucide-react';

const SubscriptionBanner = () => {
  return (
    <section className="relative py-8 bg-gradient-to-b from-primary/10 via-transparent to-transparent">
      <div className="container">
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            انضم لمجتمع <span className="text-gradient-purple">كبار الشير</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">اختار باقتك وكن جزء من المجتمع</p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-4xl mx-auto">
          {/* Package 50 */}
          <div className="group relative overflow-hidden rounded-xl p-[2px] bg-gradient-to-br from-gold via-gold-glow to-gold">
            <div className="relative h-full rounded-xl bg-card p-4 md:p-6 text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-3">
                <Crown className="w-5 h-5 md:w-6 md:h-6 text-gold" />
              </div>
              <h3 className="font-bold text-gold text-sm md:text-lg mb-1">كبار مجال الشير</h3>
              <p className="text-2xl md:text-3xl font-bold text-foreground mb-2">50<span className="text-sm mr-1">ج</span></p>
              <ul className="text-xs md:text-sm text-muted-foreground space-y-1">
                <li>✓ الاسم</li>
                <li>✓ الصورة</li>
                <li>✓ رقم التواصل</li>
              </ul>
            </div>
          </div>

          {/* Package 20 */}
          <div className="relative overflow-hidden rounded-xl border border-silver/50 bg-card p-4 md:p-6 text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-silver/20 flex items-center justify-center mx-auto mb-3">
              <Star className="w-5 h-5 md:w-6 md:h-6 text-silver" />
            </div>
            <h3 className="font-bold text-silver text-sm md:text-lg mb-1">نجوم الشير</h3>
            <p className="text-2xl md:text-3xl font-bold text-foreground mb-2">20<span className="text-sm mr-1">ج</span></p>
            <ul className="text-xs md:text-sm text-muted-foreground space-y-1">
              <li>✓ الاسم</li>
              <li>✓ الصورة</li>
              <li className="opacity-50">✗ رقم التواصل</li>
            </ul>
          </div>

          {/* Package 10 */}
          <div className="relative overflow-hidden rounded-xl border border-border bg-card/50 p-4 md:p-6 text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
              <Users className="w-5 h-5 md:w-6 md:h-6 text-bronze" />
            </div>
            <h3 className="font-bold text-bronze text-sm md:text-lg mb-1">بتوع الشير</h3>
            <p className="text-2xl md:text-3xl font-bold text-foreground mb-2">10<span className="text-sm mr-1">ج</span></p>
            <ul className="text-xs md:text-sm text-muted-foreground space-y-1">
              <li>✓ الاسم</li>
              <li className="opacity-50">✗ الصورة</li>
              <li className="opacity-50">✗ رقم التواصل</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-6">
          <a
            href="https://wa.me/201278006248?text=أريد%20الاشتراك%20في%20كبار%20مجال%20الشير"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-all hover:scale-105"
          >
            <MessageCircle className="w-5 h-5" />
            <span>اشترك الآن عبر واتساب</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionBanner;
