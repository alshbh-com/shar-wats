import { useState, useRef, useCallback } from 'react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Button } from '@/components/ui/button';
import { Upload, X, Check, RotateCcw, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ImageUploaderProps {
  currentImage?: string;
  onImageChange: (url: string) => void;
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export const ImageUploader = ({ currentImage, onImageChange }: ImageUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [isUploading, setIsUploading] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'خطأ',
        description: 'يرجى اختيار ملف صورة',
        variant: 'destructive',
      });
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setIsCropping(true);
  };

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
  }, []);

  const getCroppedImg = async (): Promise<Blob | null> => {
    if (!imgRef.current || !completedCrop) return null;

    const canvas = document.createElement('canvas');
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    return new Promise((resolve) => {
      canvas.toBlob(resolve, 'image/jpeg', 0.9);
    });
  };

  const handleUpload = async () => {
    if (!selectedFile && !completedCrop) return;

    setIsUploading(true);
    try {
      let fileToUpload: Blob | null = null;

      if (isCropping && completedCrop) {
        fileToUpload = await getCroppedImg();
      } else if (selectedFile) {
        fileToUpload = selectedFile;
      }

      if (!fileToUpload) {
        throw new Error('لا يوجد صورة للرفع');
      }

      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
      const filePath = `members/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('member-images')
        .upload(filePath, fileToUpload, {
          contentType: 'image/jpeg',
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('member-images')
        .getPublicUrl(filePath);

      onImageChange(publicUrl);
      resetState();
      toast({
        title: 'تم',
        description: 'تم رفع الصورة بنجاح',
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: 'خطأ',
        description: error.message || 'فشل رفع الصورة',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const resetState = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setCrop(undefined);
    setCompletedCrop(undefined);
    setIsCropping(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-muted-foreground mb-1 block">
        الصورة
      </label>

      {/* Current or Preview Image */}
      {isCropping && previewUrl ? (
        <div className="space-y-3">
          <div className="relative bg-muted rounded-lg p-2 flex justify-center">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
              circularCrop
            >
              <img
                ref={imgRef}
                src={previewUrl}
                alt="Preview"
                onLoad={onImageLoad}
                className="max-h-64 object-contain"
              />
            </ReactCrop>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={resetState}
              className="flex-1"
            >
              <X className="w-4 h-4 ml-1" />
              إلغاء
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleUpload}
              disabled={isUploading || !completedCrop}
              className="flex-1"
            >
              {isUploading ? (
                <Loader2 className="w-4 h-4 ml-1 animate-spin" />
              ) : (
                <Check className="w-4 h-4 ml-1" />
              )}
              تأكيد
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {currentImage && (
            <div className="relative w-24 h-24 mx-auto">
              <img
                src={currentImage}
                alt="Current"
                className="w-full h-full rounded-full object-cover border-2 border-border"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-1 -left-1 w-6 h-6"
                onClick={() => onImageChange('')}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          )}

          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              <Upload className="w-4 h-4 ml-2" />
              {currentImage ? 'تغيير الصورة' : 'رفع صورة'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
