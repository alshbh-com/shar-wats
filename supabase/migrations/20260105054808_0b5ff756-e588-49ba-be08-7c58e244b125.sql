-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Admins can delete members" ON public.members;
DROP POLICY IF EXISTS "Admins can insert members" ON public.members;
DROP POLICY IF EXISTS "Admins can update members" ON public.members;
DROP POLICY IF EXISTS "Admins can view all members" ON public.members;

-- Create new permissive policies for admin operations (public access)
CREATE POLICY "Anyone can insert members"
ON public.members
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update members"
ON public.members
FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete members"
ON public.members
FOR DELETE
USING (true);

CREATE POLICY "Anyone can view all members"
ON public.members
FOR SELECT
USING (true);