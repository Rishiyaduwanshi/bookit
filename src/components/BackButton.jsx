'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function BackHeader({ title = 'Back', backTo = '' }) {
  const router = useRouter();

  function handleBack() {
    if (backTo) router.push(backTo);
    else router.back();
  }

  return (
    <div
      className={`relative px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-3 sm:py-4 flex items-center gap-1 cursor-pointer`}
      onClick={handleBack}
    >
      <Image
        src="/BackArrow.svg"
        alt="Back"
        width={20}
        height={20}
        className="hover:opacity-80"
      />
      <span className="font-medium text-base sm:text-lg text-gray-800 hover:text-black">
        {title}
      </span>
    </div>
  );
}
