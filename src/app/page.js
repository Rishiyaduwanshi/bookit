"use client"
import DisplayCard from "@/ui/DisplayCard";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function HomeContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  return <DisplayCard searchQuery={searchQuery} />;
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="p-4 sm:p-6 md:p-8 lg:p-12 xl:p-20 text-center">
        Loading...
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
