import { Crown, Star, Users, MessageCircle } from 'lucide-react';

const SubscriptionBanner = () => {
  return (
    <section className="relative py-6 overflow-hidden border-b border-border/30">
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

          {/* Mini Packages */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* 50 */}
            <div className="group flex items-center gap-2 bg-gradient-to-r from-gold/20 to-gold/10 border border-gold/30 rounded-full px-3 py-2 hover:border-gold/60 transition-all cursor-default">
              <Crown className="w-4 h-4 text-gold" />
              <span className="text-sm font-bold text-gold">50ج</span>
            </div>
            
            {/* 20 */}
            <div className="group flex items-center gap-2 bg-silver/10 border border-silver/30 rounded-full px-3 py-2 hover:border-silver/60 transition-all cursor-default">
              <Star className="w-4 h-4 text-silver" />
              <span className="text-sm font-bold text-silver">20ج</span>
            </div>
            
            {/* 10 */}
            <div className="group flex items-center gap-2 bg-muted/50 border border-border rounded-full px-3 py-2 hover:border-border/80 transition-all cursor-default">
              <Users className="w-4 h-4 text-bronze" />
              <span className="text-sm font-bold text-bronze">10ج</span>
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
