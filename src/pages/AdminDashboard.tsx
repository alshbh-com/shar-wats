import { useState, useEffect } from 'react';
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
  Save
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
import { useToast } from '@/hooks/use-toast';
import { Member, Section, Package } from '@/types/member';
import { mockMembers } from '@/data/mockMembers';
import { cn } from '@/lib/utils';

const AdminDashboard = () => {
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [filterSection, setFilterSection] = useState<Section | 'all'>('all');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    contact: '',
    section: 'كبار مجال الشير' as Section,
    package: 50 as Package,
  });

  // Check auth
  useEffect(() => {
    const isAuth = localStorage.getItem('admin_auth');
    if (!isAuth) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
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

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast({
        title: 'خطأ',
        description: 'يرجى إدخال اسم العضو',
        variant: 'destructive',
      });
      return;
    }

    if (editingMember) {
      // Update existing member
      setMembers((prev) =>
        prev.map((m) =>
          m.id === editingMember.id
            ? {
                ...m,
                name: formData.name,
                image: formData.image || undefined,
                contact: formData.contact || undefined,
                section: formData.section,
                package: formData.package,
              }
            : m
        )
      );
      toast({
        title: 'تم التحديث',
        description: `تم تحديث بيانات ${formData.name}`,
      });
    } else {
      // Add new member
      const newMember: Member = {
        id: Date.now().toString(),
        name: formData.name,
        image: formData.image || undefined,
        contact: formData.contact || undefined,
        section: formData.section,
        package: formData.package,
        isVisible: true,
        createdAt: new Date(),
      };
      setMembers((prev) => [...prev, newMember]);
      toast({
        title: 'تمت الإضافة',
        description: `تم إضافة ${formData.name} بنجاح`,
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (member: Member) => {
    if (confirm(`هل أنت متأكد من حذف ${member.name}؟`)) {
      setMembers((prev) => prev.filter((m) => m.id !== member.id));
      toast({
        title: 'تم الحذف',
        description: `تم حذف ${member.name}`,
      });
    }
  };

  const toggleVisibility = (member: Member) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === member.id ? { ...m, isVisible: !m.isVisible } : m
      )
    );
    toast({
      title: member.isVisible ? 'تم الإخفاء' : 'تم الإظهار',
      description: `${member.name} ${member.isVisible ? 'مخفي الآن' : 'ظاهر الآن'}`,
    });
  };

  const filteredMembers = members
    .filter((m) => filterSection === 'all' || m.section === filterSection)
    .sort((a, b) => b.package - a.package);

  const getPackageIcon = (pkg: Package) => {
    if (pkg === 50) return <Crown className="w-4 h-4 text-gold" />;
    if (pkg === 20) return <Star className="w-4 h-4 text-silver" />;
    return <Users className="w-4 h-4 text-bronze" />;
  };

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
                <p className="text-2xl font-bold">{members.filter((m) => m.section === 'كبار مجال الشير').length}</p>
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
                <p className="text-2xl font-bold">{members.filter((m) => m.section === 'نجوم الشير').length}</p>
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
                <p className="text-2xl font-bold">{members.filter((m) => m.section === 'بتوع الشير').length}</p>
                <p className="text-xs text-muted-foreground">بتوع الشير</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button onClick={openAddModal} className="gap-2">
            <Plus className="w-4 h-4" />
            إضافة عضو
          </Button>
          
          <Select 
            value={filterSection} 
            onValueChange={(v) => setFilterSection(v as Section | 'all')}
          >
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="تصفية حسب القسم" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الأقسام</SelectItem>
              <SelectItem value="كبار مجال الشير">كبار مجال الشير</SelectItem>
              <SelectItem value="نجوم الشير">نجوم الشير</SelectItem>
              <SelectItem value="بتوع الشير">بتوع الشير</SelectItem>
            </SelectContent>
          </Select>
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
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        member.isVisible 
                          ? "bg-green-500/20 text-green-400" 
                          : "bg-destructive/20 text-destructive"
                      )}>
                        {member.isVisible ? 'ظاهر' : 'مخفي'}
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
                          {member.isVisible ? (
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
              >
                <Save className="w-4 h-4" />
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
