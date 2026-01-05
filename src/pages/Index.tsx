import { useState } from 'react';
import { Section } from '@/types/member';
import { mockMembers } from '@/data/mockMembers';
import Navbar from '@/components/Navbar';
import SubscriptionBanner from '@/components/SubscriptionBanner';
import MembersGrid from '@/components/MembersGrid';
import Footer from '@/components/Footer';

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>('كبار مجال الشير');

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
          members={mockMembers} 
          section={activeSection} 
        />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
