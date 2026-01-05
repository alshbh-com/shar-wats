import { Crown, Star, Users, MessageCircle, Image, Phone, User } from 'lucide-react';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const SubscriptionBanner = () => {
  const [activePackage, setActivePackage] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const handlePackageInteraction = (packageId: number) => {
    if (isMobile) {
      // Toggle on tap for mobile
      setActivePackage(activePackage === packageId ? null : packageId);
    }
  };

  const handleMouseEnter = (packageId: number) => {
    if (!isMobile) {
      setActivePackage(packageId);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setActivePackage(null);
    }
  };

  return (
    <section className="relative py-6 overflow-visible border-b border-border/30" style={{ zIndex: 100 }}>
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[150px] bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="container relative">
        {/* Compact Layout */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Title */}
          <div className="text-center md:text-right">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              انضم لـ <span className="text-gradient-purple">مجتمع الكبار</span>
            </h2>
            <p className="text-muted-foreground text-sm">اختار باقتك وكن معنا</p>
          </div>

          {/* Mini Packages with Tooltips */}
          <div className="flex items-center gap-2 md:gap-3 overflow-visible" style={{ zIndex: 101 }}>
            {/* 50 */}
            <div 
              className="group relative flex items-center gap-2 bg-gradient-to-r from-gold/20 to-gold/10 border border-gold/30 rounded-full px-3 py-2 hover:border-gold/60 transition-all cursor-pointer"
              onClick={() => handlePackageInteraction(50)}
              onMouseEnter={() => handleMouseEnter(50)}
              onMouseLeave={handleMouseLeave}
            >
              <Crown className="w-4 h-4 text-gold" />
              <span className="text-sm font-bold text-gold">50ج</span>
              
              {/* Tooltip */}
              {activePackage === 50 && (
                <div className="absolute top-full mt-2 right-0 md:right-auto md:left-1/2 md:-translate-x-1/2 z-50 w-48 bg-card border border-gold/30 rounded-xl p-3 shadow-xl animate-fade-in">
                  <div className="absolute -top-2 right-4 md:right-auto md:left-1/2 md:-translate-x-1/2 w-3 h-3 bg-card border-t border-r border-gold/30 rotate-[-45deg]" />
                  <p className="font-bold text-gold text-sm mb-2">كبار مجال الشير</p>
                  <ul className="space-y-1.5 text-xs">
                    <li className="flex items-center gap-2 text-foreground">
                      <User className="w-3 h-3 text-gold" />
                      الاسم بالكامل
                    </li>
                    <li className="flex items-center gap-2 text-foreground">
                      <Image className="w-3 h-3 text-gold" />
                      الصورة الشخصية
                    </li>
                    <li className="flex items-center gap-2 text-foreground">
                      <Phone className="w-3 h-3 text-gold" />
                      رقم التواصل
                    </li>
                  </ul>
                </div>
              )}
            </div>
            
            {/* 20 */}
            <div 
              className="group relative flex items-center gap-2 bg-silver/10 border border-silver/30 rounded-full px-3 py-2 hover:border-silver/60 transition-all cursor-pointer"
              onClick={() => handlePackageInteraction(20)}
              onMouseEnter={() => handleMouseEnter(20)}
              onMouseLeave={handleMouseLeave}
            >
              <Star className="w-4 h-4 text-silver" />
              <span className="text-sm font-bold text-silver">20ج</span>
              
              {/* Tooltip */}
              {activePackage === 20 && (
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 w-44 bg-card border border-silver/30 rounded-xl p-3 shadow-xl animate-fade-in">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-card border-t border-r border-silver/30 rotate-[-45deg]" />
                  <p className="font-bold text-silver text-sm mb-2">نجوم الشير</p>
                  <ul className="space-y-1.5 text-xs">
                    <li className="flex items-center gap-2 text-foreground">
                      <User className="w-3 h-3 text-silver" />
                      الاسم بالكامل
                    </li>
                    <li className="flex items-center gap-2 text-foreground">
                      <Image className="w-3 h-3 text-silver" />
                      الصورة الشخصية
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground/50 line-through">
                      <Phone className="w-3 h-3" />
                      رقم التواصل
                    </li>
                  </ul>
                </div>
              )}
            </div>
            
            {/* 10 */}
            <div 
              className="group relative flex items-center gap-2 bg-muted/50 border border-border rounded-full px-3 py-2 hover:border-border/80 transition-all cursor-pointer"
              onClick={() => handlePackageInteraction(10)}
              onMouseEnter={() => handleMouseEnter(10)}
              onMouseLeave={handleMouseLeave}
            >
              <Users className="w-4 h-4 text-bronze" />
              <span className="text-sm font-bold text-bronze">10ج</span>
              
              {/* Tooltip */}
              {activePackage === 10 && (
                <div className="absolute top-full mt-2 left-0 md:left-1/2 md:-translate-x-1/2 z-50 w-40 bg-card border border-border rounded-xl p-3 shadow-xl animate-fade-in">
                  <div className="absolute -top-2 left-4 md:left-1/2 md:-translate-x-1/2 w-3 h-3 bg-card border-t border-r border-border rotate-[-45deg]" />
                  <p className="font-bold text-bronze text-sm mb-2">بتوع الشير</p>
                  <ul className="space-y-1.5 text-xs">
                    <li className="flex items-center gap-2 text-foreground">
                      <User className="w-3 h-3 text-bronze" />
                      الاسم فقط
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground/50 line-through">
                      <Image className="w-3 h-3" />
                      الصورة
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground/50 line-through">
                      <Phone className="w-3 h-3" />
                      التواصل
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* CTA */}
          <a
            href="https://wa.me/201278006248?text=أريد%20الاشتراك%20في%20كبار%20مجال%20الشير"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-all hover:scale-105 hover:shadow-lg hover:shadow-green-500/20"
          >
            <MessageCircle className="w-4 h-4" />
            <span>اشترك الآن</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionBanner;
