'use client';
import DisplayDetails from '@/ui/DisplayDetails';
import BackButton from '@/components/BackButton';
import { useParams } from 'next/navigation';

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
