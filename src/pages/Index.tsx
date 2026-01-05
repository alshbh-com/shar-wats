import { useState } from 'react';
import { Section } from '@/types/member';
import Navbar from '@/components/Navbar';
import SubscriptionBanner from '@/components/SubscriptionBanner';
import MembersGrid from '@/components/MembersGrid';
import Footer from '@/components/Footer';
import { useMembersStore } from '@/hooks/useMembersStore';

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>('كبار مجال الشير');
  const { members } = useMembersStore();

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
        <MembersGrid
          members={members}
          section={activeSection}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Index;

