import { Header } from '@/components/app/header';
import { CompetencyEvents } from '@/components/app/competency-events';

export default function CompetenciesPage() {
  return (
    <>
      <Header title="Competencies" />
      <main className="flex-1 p-4 md:p-6">
        <div className="grid grid-cols-1 gap-4 md:gap-8">
          <CompetencyEvents />
        </div>
      </main>
    </>
  );
}
