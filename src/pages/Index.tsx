import { useState } from 'react';
import { Section } from '@/types/member';
import Navbar from '@/components/Navbar';
import SubscriptionBanner from '@/components/SubscriptionBanner';
import MembersGrid from '@/components/MembersGrid';
import Footer from '@/components/Footer';
import { useMembersPublic } from '@/hooks/useMembers';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>('كبار مجال الشير');
  const { data: members = [], isLoading } = useMembersPublic();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <main className="flex-1">
        {/* Subscription Banner */}
        <SubscriptionBanner />

        {/* Members Display */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <MembersGrid
            members={members}
            section={activeSection}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
