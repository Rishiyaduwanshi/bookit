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
      className={` relative ml-20  flex items-center  gap-1 top-15 cursor-pointer`}
      onClick={handleBack}
    >
      <Image
        src="/backArrow.svg"
        alt="Back"
        width={20}
        height={20}
        className="hover:opacity-80"
      />
      <span className="font-medium text-lg text-gray-800 hover:text-black">
        {title}
      </span>
    </div>
  );
}
