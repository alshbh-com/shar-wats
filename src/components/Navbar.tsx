import { Section } from '@/types/member';
import { cn } from '@/lib/utils';

interface NavbarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

const sections: { id: Section; label: string }[] = [
  { id: 'كبار مجال الشير', label: 'كبار مجال الشير' },
  { id: 'نجوم الشير', label: 'نجوم الشير' },
  { id: 'بتوع الشير', label: 'بتوع الشير' },
];

const Navbar = ({ activeSection, onSectionChange }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-center gap-2 md:gap-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={cn(
              "relative px-3 py-2 md:px-6 md:py-2.5 rounded-lg font-semibold text-xs md:text-base transition-all duration-300",
              "hover:bg-primary/20",
              activeSection === section.id
                ? "bg-primary text-primary-foreground glow-purple"
                : "bg-secondary text-secondary-foreground hover:text-foreground"
            )}
          >
            {section.label}
            {activeSection === section.id && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full animate-pulse" />
            )}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
