-- Create storage bucket for member images
INSERT INTO storage.buckets (id, name, public)
VALUES ('member-images', 'member-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access
CREATE POLICY "Public can view member images"
ON storage.objects FOR SELECT
USING (bucket_id = 'member-images');

-- Allow anyone to upload member images (since admin uses localStorage auth)
CREATE POLICY "Anyone can upload member images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'member-images');

-- Allow anyone to update member images
CREATE POLICY "Anyone can update member images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'member-images');

-- Allow anyone to delete member images
CREATE POLICY "Anyone can delete member images"
ON storage.objects FOR DELETE
USING (bucket_id = 'member-images');