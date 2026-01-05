import { Member } from '@/types/member';
import { Phone, Crown, Star, Users } from 'lucide-react';

interface MemberCardProps {
  member: Member;
}

const MemberCard = ({ member }: MemberCardProps) => {
  const isPremium = member.package === 50; // كبار مجال الشير
  const isStandard = member.package === 20; // نجوم الشير
  const isBasic = member.package === 10; // بتوع الشير

  // كبار مجال الشير - باقة 50 (صورة + اسم + تواصل)
  if (isPremium) {
    return (
      <div className="group relative overflow-hidden rounded-2xl p-[2px] bg-gradient-to-br from-gold via-gold-glow to-gold animate-pulse-glow">
        <div className="relative h-full rounded-2xl bg-card p-6 transition-all duration-500 group-hover:scale-[0.98]">
          {/* Glow Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-gold/10 to-transparent rounded-2xl" />
          
          {/* Badge */}
          <div className="absolute -top-1 -right-1 flex items-center gap-1 bg-gradient-to-r from-gold to-gold-glow px-3 py-1 rounded-bl-xl rounded-tr-xl">
            <Crown className="w-4 h-4 text-background fill-background" />
            <span className="text-xs font-bold text-background">كبير</span>
          </div>

          {/* Content */}
          <div className="flex flex-col items-center gap-4 pt-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gold glow-gold">
                {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center">
                    <Crown className="w-10 h-10 text-gold" />
                  </div>
                )}
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gold rounded-full p-1">
                <Crown className="w-4 h-4 text-background" />
              </div>
            </div>

            {/* Name */}
            <h3 className="text-xl font-bold text-gradient-gold">{member.name}</h3>

            {/* Contact */}
            {member.contact && (
              <a 
                href={`https://wa.me/2${member.contact}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 px-4 py-2 rounded-full transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">{member.contact}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  // نجوم الشير - باقة 20 (صورة + اسم)
  if (isStandard) {
    return (
      <div className="group relative overflow-hidden rounded-xl border border-silver/30 bg-card p-5 transition-all duration-300 hover:border-silver/60 hover:shadow-lg hover:shadow-silver/10">
        {/* Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-silver/20 px-2 py-1 rounded-full">
          <Star className="w-3 h-3 text-silver" />
          <span className="text-xs font-medium text-silver">نجم</span>
        </div>

        <div className="flex flex-col items-center gap-3 pt-2">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-silver/50">
            {member.image ? (
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-silver/20 to-silver/5 flex items-center justify-center">
                <Star className="w-8 h-8 text-silver" />
              </div>
            )}
          </div>

          {/* Name */}
          <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
        </div>
      </div>
    );
  }

  // بتوع الشير - باقة 10 (اسم فقط)
  return (
    <div className="group relative rounded-lg border border-border/50 bg-card/50 p-4 transition-all duration-300 hover:bg-card hover:border-border">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <Users className="w-5 h-5 text-bronze" />
        </div>
        <h3 className="font-medium text-foreground/80">{member.name}</h3>
      </div>
    </div>
  );
};

export default MemberCard;
