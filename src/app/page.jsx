import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';

const About = dynamic(() => import('@/components/About'));
const Activities = dynamic(() => import('@/components/Activities'));
const Team = dynamic(() => import('@/components/Team'));

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Activities />
      <Team />
    </>
  );
}
