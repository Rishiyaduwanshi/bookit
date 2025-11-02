'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { HomePageSkeleton } from '@/components/loading';
import DisplayCard from '@/ui/DisplayCard';

function HomeContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  return <DisplayCard searchQuery={searchQuery} />;
}

export default function Home() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomeContent />
    </Suspense>
  );
}
