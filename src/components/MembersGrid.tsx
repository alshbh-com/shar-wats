import { Member, Section } from '@/types/member';
import MemberCard from './MemberCard';
import { cn } from '@/lib/utils';

interface MembersGridProps {
  members: Member[];
  section: Section;
}

const getSectionInfo = (section: Section) => {
  switch (section) {
    case 'كبار مجال الشير':
      return {
        title: 'كبار مجال الشير',
        subtitle: 'أعلى مستوى في المجتمع • باقة 50 جنيه',
        gradient: 'from-gold/20 via-transparent to-transparent',
        isGold: true,
      };
    case 'نجوم الشير':
      return {
        title: 'نجوم الشير',
        subtitle: 'نجوم المجتمع • باقة 20 جنيه',
        gradient: 'from-silver/20 via-transparent to-transparent',
        isGold: false,
      };
    case 'بتوع الشير':
      return {
        title: 'بتوع الشير',
        subtitle: 'أعضاء المجتمع • باقة 10 جنيه',
        gradient: 'from-muted/20 via-transparent to-transparent',
        isGold: false,
      };
  }
};

const MembersGrid = ({ members, section }: MembersGridProps) => {
  const sectionInfo = getSectionInfo(section);
  
  // Filter members by section
  const sectionMembers = members.filter((m) => m.section === section && m.is_visible);

  return (
    <div className="relative min-h-[40vh]">
      {/* Background Gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-b pointer-events-none",
        sectionInfo.gradient
      )} />

      {/* Header */}
      <div className="relative text-center py-8">
        <h1 className={cn(
          "text-3xl md:text-4xl font-bold mb-2",
          sectionInfo.isGold ? 'text-gradient-gold' : 'text-gradient-purple'
        )}>
          {sectionInfo.title}
        </h1>
        <p className="text-muted-foreground text-base">{sectionInfo.subtitle}</p>
        <p className="text-muted-foreground/60 text-sm mt-1">
          {sectionMembers.length} عضو
        </p>
      </div>

      {/* Members Grid */}
      <div className="container pb-12">
        {section === 'كبار مجال الشير' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectionMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        )}

        {section === 'نجوم الشير' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {sectionMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        )}

        {section === 'بتوع الشير' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {sectionMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {sectionMembers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
              <span className="text-3xl">👥</span>
            </div>
            <p className="text-muted-foreground text-lg">لا يوجد أعضاء في هذا القسم حالياً</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembersGrid;
