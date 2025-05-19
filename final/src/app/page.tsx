'use client';

import { Gallery4, data } from './gallery4';
import { HeroSection } from './hero-section-5';
import { HoverButton } from '@/components/ui/hover-button';
import Link from 'next/link';
import { Footer } from './footer-section';
import { About3 } from './about-3';
import { InlineWidget } from "react-calendly";

export default function Home() {
  return (
    <main>
      <HeroSection /> 

      <div className="pt-32">
        <Gallery4 items={data} />
      </div>
      
      <div id="calendly-section" className="my-12">
        <InlineWidget
          url="https://calendly.com/transcenda-io/30min"
          pageSettings={{
            backgroundColor: '1a1a1a',
            textColor: 'ffffff',
            primaryColor: '00a2ff',
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
          }}
        />
      </div>
      <About3/><div className="flex justify-center py-12">
        <Link href="https://calendly.com/transcenda-io/30min" target="_blank" rel="noopener noreferrer">
          <HoverButton>
            Schedule a Free Consultation
          </HoverButton>
        </Link>
      </div>
      <Footer />
    </main>
  );
}
