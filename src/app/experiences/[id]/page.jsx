'use client';
import { useParams } from 'next/navigation';
import BackButton from '@/components/BackButton';
import DisplayDetails from '@/ui/DisplayDetails';

const ExperienceDetails = () => {
  const params = useParams();
  const id = params.id;

  return (
    <>
      <BackButton title="Details" className="" />
      <DisplayDetails experienceId={id} />
    </>
  );
};

export default ExperienceDetails;
