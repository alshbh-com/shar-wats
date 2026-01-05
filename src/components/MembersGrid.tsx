import { Member, Section } from '@/types/member';
import MemberCard from './MemberCard';
import { cn } from '@/lib/utils';

interface MembersGridProps {
  members: Member[];
  section: Section;
}

const getSectionInfo = (section: Section) => {
  switch (section) {
    case 'الكبار':
      return {
        title: 'الكبار',
        subtitle: 'أعلى مستوى في المجتمع',
        gradient: 'from-gold/20 via-transparent to-transparent',
      };
    case 'كبار مجال الشير':
      return {
        title: 'كبار مجال الشير',
        subtitle: 'المحترفون في مجال الشير',
        gradient: 'from-primary/20 via-transparent to-transparent',
      };
    case 'بتوع الشير':
      return {
        title: 'بتوع الشير',
        subtitle: 'مرحباً بالأعضاء الجدد',
        gradient: 'from-muted/20 via-transparent to-transparent',
      };
  }
};

const MembersGrid = ({ members, section }: MembersGridProps) => {
  const sectionInfo = getSectionInfo(section);
  
  // Sort members by package (50 first, then 20, then 10)
  const sortedMembers = [...members]
    .filter((m) => m.section === section && m.isVisible)
    .sort((a, b) => b.package - a.package);

  const premiumMembers = sortedMembers.filter((m) => m.package === 50);
  const standardMembers = sortedMembers.filter((m) => m.package === 20);
  const basicMembers = sortedMembers.filter((m) => m.package === 10);

  return (
    <div className="relative min-h-[60vh]">
      {/* Background Gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-b pointer-events-none",
        sectionInfo.gradient
      )} />

      {/* Header */}
      <div className="relative text-center py-12">
        <h1 className={cn(
          "text-4xl md:text-5xl font-bold mb-3",
          section === 'الكبار' ? 'text-gradient-gold' : 'text-gradient-purple'
        )}>
          {sectionInfo.title}
        </h1>
        <p className="text-muted-foreground text-lg">{sectionInfo.subtitle}</p>
      </div>

      {/* Premium Members (50 EGP) */}
      {premiumMembers.length > 0 && (
        <div className="relative mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 container">
            {premiumMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      )}

      {/* Standard Members (20 EGP) */}
      {standardMembers.length > 0 && (
        <div className="relative mb-12">
          <div className="container">
            <h2 className="text-xl font-semibold text-muted-foreground mb-6 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-silver/50" />
              الأعضاء المميزون
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {standardMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Basic Members (10 EGP) */}
      {basicMembers.length > 0 && (
        <div className="relative">
          <div className="container">
            <h2 className="text-lg font-medium text-muted-foreground mb-4 flex items-center gap-2">
              <span className="w-6 h-[1px] bg-border" />
              الأعضاء
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {basicMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {sortedMembers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
            <span className="text-4xl">👥</span>
          </div>
          <p className="text-muted-foreground text-lg">لا يوجد أعضاء في هذا القسم حالياً</p>
        </div>
      )}
    </div>
  );
};

export default MembersGrid;
