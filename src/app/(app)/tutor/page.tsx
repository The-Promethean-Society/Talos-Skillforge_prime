import { Header } from '@/components/app/header';
import { AiTutor } from '@/components/app/ai-tutor';

export default function TutorPage() {
  return (
    <>
      <Header title="AI Tutor" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl">
          <AiTutor />
        </div>
      </main>
    </>
  );
}
