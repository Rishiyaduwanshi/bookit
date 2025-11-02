'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function BackHeader({ title = 'Back', backTo = '' }) {
  const router = useRouter();

  function handleBack() {
    if (backTo) router.push(backTo);
    else router.back();
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`bg-transparent! ml-20 mt-4 -mb-2   flex items-center gap-1`}
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
    </button>
  );
}
