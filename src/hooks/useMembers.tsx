import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Member, Section, Package } from '@/types/member';
import { useToast } from '@/hooks/use-toast';

type MemberInsert = {
  name: string;
  image?: string | null;
  contact?: string | null;
  section: Section;
  package: Package;
  is_visible?: boolean;
};

type MemberUpdate = Partial<MemberInsert>;

// Fetch all members (for admin - includes hidden)
export function useMembersAdmin() {
  return useQuery({
    queryKey: ['members', 'admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Member[];
    },
  });
}

// Fetch visible members only (for public)
export function useMembersPublic() {
  return useQuery({
    queryKey: ['members', 'public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('is_visible', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Member[];
    },
  });
}

// Add member
export function useAddMember() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (member: MemberInsert) => {
      const { data, error } = await supabase
        .from('members')
        .insert({
          name: member.name,
          image: member.image,
          contact: member.contact,
          section: member.section,
          package: member.package,
          is_visible: member.is_visible ?? true,
        })
        .select()
        .single();

      if (error) throw error;
      return data as Member;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      toast({
        title: 'تمت الإضافة',
        description: `تم إضافة ${data.name} بنجاح`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'خطأ',
        description: error.message || 'حدث خطأ أثناء الإضافة',
        variant: 'destructive',
      });
    },
  });
}

// Update member
export function useUpdateMember() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: MemberUpdate }) => {
      const { data, error } = await supabase
        .from('members')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Member;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      toast({
        title: 'تم التحديث',
        description: `تم تحديث بيانات ${data.name}`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'خطأ',
        description: error.message || 'حدث خطأ أثناء التحديث',
        variant: 'destructive',
      });
    },
  });
}

// Delete member
export function useDeleteMember() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('members')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      toast({
        title: 'تم الحذف',
        description: 'تم حذف العضو بنجاح',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'خطأ',
        description: error.message || 'حدث خطأ أثناء الحذف',
        variant: 'destructive',
      });
    },
  });
}

// Toggle visibility
export function useToggleVisibility() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, is_visible }: { id: string; is_visible: boolean }) => {
      const { data, error } = await supabase
        .from('members')
        .update({ is_visible: !is_visible })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Member;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      toast({
        title: data.is_visible ? 'تم الإظهار' : 'تم الإخفاء',
        description: `${data.name} ${data.is_visible ? 'ظاهر الآن' : 'مخفي الآن'}`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'خطأ',
        description: error.message || 'حدث خطأ',
        variant: 'destructive',
      });
    },
  });
}
