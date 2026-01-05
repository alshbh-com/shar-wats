export type Section = 'الكبار' | 'كبار مجال الشير' | 'بتوع الشير';
export type Package = 50 | 20 | 10;

export interface Member {
  id: string;
  name: string;
  image?: string;
  contact?: string;
  section: Section;
  package: Package;
  isVisible: boolean;
  createdAt: Date;
}

export interface AdminCredentials {
  password: string;
}
