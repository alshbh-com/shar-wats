import { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  ArrowRight,
  LogOut,
  Users,
  Crown,
  Star,
  X,
  Save,
  Search,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Member, Section, Package } from '@/types/member';
import { cn } from '@/lib/utils';
import {
  useMembersAdmin,
  useAddMember,
  useUpdateMember,
  useDeleteMember,
  useToggleVisibility,
} from '@/hooks/useMembers';

const AdminDashboard = () => {
  const { data: members = [], isLoading: membersLoading } = useMembersAdmin();
  const addMemberMutation = useAddMember();
  const updateMemberMutation = useUpdateMember();
  const deleteMemberMutation = useDeleteMember();
  const toggleVisibilityMutation = useToggleVisibility();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSection, setFilterSection] = useState<Section | 'all'>('all');
  const [filterPackage, setFilterPackage] = useState<Package | 'all'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'package' | 'created_at'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    contact: '',
    section: 'كبار مجال الشير' as Section,
    package: 50 as Package,
  });

  // Check if logged in via localStorage
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin');
  };

  const openAddModal = () => {
    setEditingMember(null);
    setFormData({
      name: '',
      image: '',
      contact: '',
      section: 'كبار مجال الشير',
      package: 50,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (member: Member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      image: member.image || '',
      contact: member.contact || '',
      section: member.section,
      package: member.package,
    });
    setIsModalOpen(true);
  };

  // Auto-set package based on section
  const handleSectionChange = (section: Section) => {
    let pkg: Package = 50;
    if (section === 'نجوم الشير') pkg = 20;
    if (section === 'بتوع الشير') pkg = 10;
    setFormData({ ...formData, section, package: pkg });
  };

  const handleSave = async () => {
    if (!formData.name.trim()) return;

    if (editingMember) {
      updateMemberMutation.mutate({
        id: editingMember.id,
        updates: {
          name: formData.name,
          image: formData.image || null,
          contact: formData.contact || null,
          section: formData.section,
          package: formData.package,
        },
      });
    } else {
      addMemberMutation.mutate({
        name: formData.name,
        image: formData.image || null,
        contact: formData.contact || null,
        section: formData.section,
        package: formData.package,
        is_visible: true,
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (member: Member) => {
    if (confirm(`هل أنت متأكد من حذف ${member.name}؟`)) {
      deleteMemberMutation.mutate(member.id);
    }
  };

  const toggleVisibility = (member: Member) => {
    toggleVisibilityMutation.mutate({ id: member.id, is_visible: member.is_visible });
  };

  // Filtered and sorted members
  const filteredMembers = useMemo(() => {
    let result = [...members];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((m) =>
        m.name.toLowerCase().includes(query) ||
        m.contact?.toLowerCase().includes(query)
      );
    }

    // Section filter
    if (filterSection !== 'all') {
      result = result.filter((m) => m.section === filterSection);
    }

    // Package filter
    if (filterPackage !== 'all') {
      result = result.filter((m) => m.package === filterPackage);
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name, 'ar');
      } else if (sortBy === 'package') {
        comparison = a.package - b.package;
      } else {
        comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return result;
  }, [members, searchQuery, filterSection, filterPackage, sortBy, sortOrder]);

  // Stats
  const stats = useMemo(() => ({
    كبار: members.filter((m) => m.section === 'كبار مجال الشير').length,
    نجوم: members.filter((m) => m.section === 'نجوم الشير').length,
    بتوع: members.filter((m) => m.section === 'بتوع الشير').length,
  }), [members]);

  const getPackageIcon = (pkg: Package) => {
    if (pkg === 50) return <Crown className="w-4 h-4 text-gold" />;
    if (pkg === 20) return <Star className="w-4 h-4 text-silver" />;
    return <Users className="w-4 h-4 text-bronze" />;
  };

  if (membersLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            <span>الرئيسية</span>
          </Link>

          <h1 className="text-xl font-bold text-gradient-purple">لوحة التحكم</h1>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-destructive hover:text-destructive"
          >
            <LogOut className="w-4 h-4 ml-2" />
            خروج
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center">
                <Crown className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.كبار}</p>
                <p className="text-xs text-muted-foreground">كبار الشير</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-silver/20 flex items-center justify-center">
                <Star className="w-5 h-5 text-silver" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.نجوم}</p>
                <p className="text-xs text-muted-foreground">نجوم الشير</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <Users className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.بتوع}</p>
                <p className="text-xs text-muted-foreground">بتوع الشير</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-card rounded-xl border border-border p-4 mb-6">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="بحث بالاسم أو رقم التواصل..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Select
                value={filterSection}
                onValueChange={(v) => setFilterSection(v as Section | 'all')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="القسم" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأقسام</SelectItem>
                  <SelectItem value="كبار مجال الشير">كبار مجال الشير</SelectItem>
                  <SelectItem value="نجوم الشير">نجوم الشير</SelectItem>
                  <SelectItem value="بتوع الشير">بتوع الشير</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filterPackage === 'all' ? 'all' : filterPackage.toString()}
                onValueChange={(v) => setFilterPackage(v === 'all' ? 'all' : (Number(v) as Package))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="الباقة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الباقات</SelectItem>
                  <SelectItem value="50">50 جنيه</SelectItem>
                  <SelectItem value="20">20 جنيه</SelectItem>
                  <SelectItem value="10">10 جنيه</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
                <SelectTrigger>
                  <SelectValue placeholder="ترتيب حسب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="created_at">تاريخ الإضافة</SelectItem>
                  <SelectItem value="name">الاسم</SelectItem>
                  <SelectItem value="package">الباقة</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as typeof sortOrder)}>
                <SelectTrigger>
                  <SelectValue placeholder="الترتيب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">تنازلي</SelectItem>
                  <SelectItem value="asc">تصاعدي</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-4">
          <Button onClick={openAddModal} className="gap-2">
            <Plus className="w-4 h-4" />
            إضافة عضو
          </Button>
          <span className="text-sm text-muted-foreground">
            {filteredMembers.length} عضو
          </span>
        </div>

        {/* Members Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-right p-4 font-medium text-muted-foreground">الاسم</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">القسم</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">الباقة</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">الحالة</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-10 h-10 rounded-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                            {getPackageIcon(member.package)}
                          </div>
                        )}
                        <span className="font-medium">{member.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">{member.section}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getPackageIcon(member.package)}
                        <span>{member.package} جنيه</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={cn(
                          'px-2 py-1 rounded-full text-xs font-medium',
                          member.is_visible
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-destructive/20 text-destructive'
                        )}
                      >
                        {member.is_visible ? 'ظاهر' : 'مخفي'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditModal(member)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleVisibility(member)}
                        >
                          {member.is_visible ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(member)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredMembers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                      لا يوجد أعضاء مطابقين للبحث
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-card rounded-2xl border border-border p-6 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">
                {editingMember ? 'تعديل العضو' : 'إضافة عضو جديد'}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">
                  الاسم *
                </label>
                <Input
                  placeholder="أدخل اسم العضو"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">
                  القسم
                </label>
                <Select
                  value={formData.section}
                  onValueChange={(v) => handleSectionChange(v as Section)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="كبار مجال الشير">
                      <div className="flex items-center gap-2">
                        <Crown className="w-4 h-4 text-gold" />
                        كبار مجال الشير (50 جنيه)
                      </div>
                    </SelectItem>
                    <SelectItem value="نجوم الشير">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-silver" />
                        نجوم الشير (20 جنيه)
                      </div>
                    </SelectItem>
                    <SelectItem value="بتوع الشير">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-bronze" />
                        بتوع الشير (10 جنيه)
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Show image field for 50 and 20 packages */}
              {(formData.section === 'كبار مجال الشير' || formData.section === 'نجوم الشير') && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1 block">
                    رابط الصورة
                  </label>
                  <Input
                    placeholder="https://..."
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    dir="ltr"
                  />
                </div>
              )}

              {/* Show contact field only for 50 package */}
              {formData.section === 'كبار مجال الشير' && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1 block">
                    رقم التواصل
                  </label>
                  <Input
                    placeholder="01xxxxxxxxx"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    dir="ltr"
                  />
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsModalOpen(false)}
              >
                إلغاء
              </Button>
              <Button
                className="flex-1 gap-2"
                onClick={handleSave}
                disabled={addMemberMutation.isPending || updateMemberMutation.isPending}
              >
                {(addMemberMutation.isPending || updateMemberMutation.isPending) ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                حفظ
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
