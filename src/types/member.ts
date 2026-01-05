export type Section = 'كبار مجال الشير' | 'نجوم الشير' | 'بتوع الشير';
export type Package = 50 | 20 | 10;

export interface Member {
  id: string;
  name: string;
  image?: string | null;
  contact?: string | null;
  section: Section;
  package: Package;
  is_visible: boolean;
  created_at: string;
  updated_at?: string;
}

// For backward compatibility
export type { Member as MemberType };
