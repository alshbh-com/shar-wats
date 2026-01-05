import { Crown, Star, Users, MessageCircle, Sparkles, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const SubscriptionBanner = () => {
  return (
    <section className="relative py-12 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-[10%] w-2 h-2 bg-gold/60 rounded-full animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-20 right-[25%] w-1.5 h-1.5 bg-primary/60 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-16 left-[15%] w-2 h-2 bg-silver/60 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-24 left-[30%] w-1 h-1 bg-gold/40 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-8 left-[45%] w-1.5 h-1.5 bg-primary/50 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-20 right-0 w-[300px] h-[200px] bg-gold/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="container relative">
        {/* Title with Icon */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">انضم الآن</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            كن جزء من <span className="text-gradient-purple">مجتمع الكبار</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto">
            اختار باقتك المناسبة وابدأ رحلتك معنا
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          
          {/* Package 50 - Premium */}
          <div className="group relative order-2 md:order-1">
            <div className="absolute inset-0 bg-gradient-to-br from-gold via-gold-glow to-gold rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
            <div className="relative overflow-hidden rounded-2xl p-[2px] bg-gradient-to-br from-gold via-gold-glow to-gold">
              <div className="relative h-full rounded-2xl bg-card p-6 md:p-8 text-center transition-transform duration-300 group-hover:scale-[0.98]">
                {/* Popular Badge */}
                <div className="absolute -top-px left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-gold to-gold-glow text-background text-xs font-bold px-4 py-1 rounded-b-lg flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    الأكثر طلباً
                  </div>
                </div>

                {/* Icon */}
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mx-auto mb-5 mt-4 group-hover:scale-110 transition-transform duration-300">
                  <Crown className="w-8 h-8 md:w-10 md:h-10 text-gold" />
                  <div className="absolute inset-0 rounded-2xl bg-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Title */}
                <h3 className="font-bold text-gold text-lg md:text-xl mb-2">كبار مجال الشير</h3>
                
                {/* Price */}
                <div className="flex items-baseline justify-center gap-1 mb-6">
                  <span className="text-4xl md:text-5xl font-bold text-foreground">50</span>
                  <span className="text-lg text-muted-foreground">جنيه</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center justify-center gap-2 text-sm md:text-base text-foreground">
                    <span className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs">✓</span>
                    الاسم بالكامل
                  </li>
                  <li className="flex items-center justify-center gap-2 text-sm md:text-base text-foreground">
                    <span className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs">✓</span>
                    الصورة الشخصية
                  </li>
                  <li className="flex items-center justify-center gap-2 text-sm md:text-base text-foreground">
                    <span className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs">✓</span>
                    رقم التواصل
                  </li>
                  <li className="flex items-center justify-center gap-2 text-sm md:text-base text-foreground">
                    <span className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs">✓</span>
                    كارت مميز + Glow
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Package 20 - Standard */}
          <div className="group relative order-1 md:order-2">
            <div className="absolute inset-0 bg-silver/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
            <div className="relative overflow-hidden rounded-2xl border-2 border-silver/30 bg-card p-6 md:p-8 text-center transition-all duration-300 group-hover:border-silver/60 group-hover:shadow-lg group-hover:shadow-silver/10 h-full">
              {/* Icon */}
              <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-silver/20 to-silver/5 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-7 h-7 md:w-8 md:h-8 text-silver" />
              </div>

              {/* Title */}
              <h3 className="font-bold text-silver text-lg md:text-xl mb-2">نجوم الشير</h3>
              
              {/* Price */}
              <div className="flex items-baseline justify-center gap-1 mb-6">
                <span className="text-3xl md:text-4xl font-bold text-foreground">20</span>
                <span className="text-lg text-muted-foreground">جنيه</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                <li className="flex items-center justify-center gap-2 text-sm md:text-base text-foreground">
                  <span className="w-5 h-5 rounded-full bg-silver/20 flex items-center justify-center text-silver text-xs">✓</span>
                  الاسم بالكامل
                </li>
                <li className="flex items-center justify-center gap-2 text-sm md:text-base text-foreground">
                  <span className="w-5 h-5 rounded-full bg-silver/20 flex items-center justify-center text-silver text-xs">✓</span>
                  الصورة الشخصية
                </li>
                <li className="flex items-center justify-center gap-2 text-sm md:text-base text-muted-foreground/50">
                  <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs">✗</span>
                  رقم التواصل
                </li>
              </ul>
            </div>
          </div>

          {/* Package 10 - Basic */}
          <div className="group relative order-3">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card/50 p-6 md:p-8 text-center transition-all duration-300 group-hover:bg-card group-hover:border-border/80 h-full">
              {/* Icon */}
              <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-7 h-7 md:w-8 md:h-8 text-bronze" />
              </div>

              {/* Title */}
              <h3 className="font-bold text-bronze text-lg md:text-xl mb-2">بتوع الشير</h3>
              
              {/* Price */}
              <div className="flex items-baseline justify-center gap-1 mb-6">
                <span className="text-3xl md:text-4xl font-bold text-foreground">10</span>
                <span className="text-lg text-muted-foreground">جنيه</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                <li className="flex items-center justify-center gap-2 text-sm md:text-base text-foreground">
                  <span className="w-5 h-5 rounded-full bg-bronze/20 flex items-center justify-center text-bronze text-xs">✓</span>
                  الاسم بالكامل
                </li>
                <li className="flex items-center justify-center gap-2 text-sm md:text-base text-muted-foreground/50">
                  <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs">✗</span>
                  الصورة الشخصية
                </li>
                <li className="flex items-center justify-center gap-2 text-sm md:text-base text-muted-foreground/50">
                  <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs">✗</span>
                  رقم التواصل
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-10">
          <a
            href="https://wa.me/201278006248?text=أريد%20الاشتراك%20في%20كبار%20مجال%20الشير"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 overflow-hidden bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:shadow-lg hover:shadow-green-500/30 hover:scale-105"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <MessageCircle className="w-6 h-6 relative z-10" />
            <span className="relative z-10">اشترك الآن عبر واتساب</span>
          </a>
          <p className="text-muted-foreground text-sm mt-4">
            تواصل معنا واختار باقتك المفضلة
          </p>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionBanner;
