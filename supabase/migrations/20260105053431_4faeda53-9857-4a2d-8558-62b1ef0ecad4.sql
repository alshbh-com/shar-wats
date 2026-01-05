-- Create members table
CREATE TABLE public.members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  image text,
  contact text,
  section text NOT NULL CHECK (section IN ('كبار مجال الشير', 'نجوم الشير', 'بتوع الشير')),
  package integer NOT NULL CHECK (package IN (10, 20, 50)),
  is_visible boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

-- Everyone can view visible members
CREATE POLICY "Anyone can view visible members"
ON public.members
FOR SELECT
USING (is_visible = true);

-- Admins can view all members (including hidden)
CREATE POLICY "Admins can view all members"
ON public.members
FOR SELECT
USING (is_admin());

-- Admins can insert members
CREATE POLICY "Admins can insert members"
ON public.members
FOR INSERT
WITH CHECK (is_admin());

-- Admins can update members
CREATE POLICY "Admins can update members"
ON public.members
FOR UPDATE
USING (is_admin());

-- Admins can delete members
CREATE POLICY "Admins can delete members"
ON public.members
FOR DELETE
USING (is_admin());

-- Trigger for updated_at
CREATE TRIGGER update_members_updated_at
BEFORE UPDATE ON public.members
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial data from mockMembers
INSERT INTO public.members (name, image, contact, section, package, is_visible) VALUES
('محمد الكبير', 'https://i.pravatar.cc/300?img=1', '01012345678', 'كبار مجال الشير', 50, true),
('أحمد العظيم', 'https://i.pravatar.cc/300?img=2', '01023456789', 'كبار مجال الشير', 50, true),
('عمر الشريف', 'https://i.pravatar.cc/300?img=3', '01034567890', 'كبار مجال الشير', 50, true),
('خالد المميز', 'https://i.pravatar.cc/300?img=4', '01045678901', 'كبار مجال الشير', 50, true),
('سامي النجم', 'https://i.pravatar.cc/300?img=5', NULL, 'نجوم الشير', 20, true),
('كريم المحترف', 'https://i.pravatar.cc/300?img=6', NULL, 'نجوم الشير', 20, true),
('فارس الأسطورة', 'https://i.pravatar.cc/300?img=7', NULL, 'نجوم الشير', 20, true),
('حسن الفنان', 'https://i.pravatar.cc/300?img=8', NULL, 'نجوم الشير', 20, true),
('ياسر البطل', 'https://i.pravatar.cc/300?img=9', NULL, 'نجوم الشير', 20, true),
('علي الجديد', NULL, NULL, 'بتوع الشير', 10, true),
('مصطفى الشاطر', NULL, NULL, 'بتوع الشير', 10, true),
('عبدالله المتحمس', NULL, NULL, 'بتوع الشير', 10, true),
('رامي الجديد', NULL, NULL, 'بتوع الشير', 10, true),
('هاني النشيط', NULL, NULL, 'بتوع الشير', 10, true),
('أيمن المبتدئ', NULL, NULL, 'بتوع الشير', 10, true);