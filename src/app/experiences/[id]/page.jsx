'use client';
import DisplayDetails from '@/ui/DisplayDetails';
import { useParams } from 'next/navigation';

const ExperienceDetails = () => {
  const params = useParams();
  const id = params.id; // dynamic route param

  return (
    <>
      <DisplayDetails experienceId={id} />
    </>
  );
};

export default ExperienceDetails;
