import { Header } from '@/components/app/header';
import { SkillsGraph } from '@/components/app/skills-graph';
import { KarmicAlignment } from '@/components/app/karmic-alignment';
import { CompetencyEvents } from '@/components/app/competency-events';
import { AiTutor } from '@/components/app/ai-tutor';
import { NpcMentor } from '@/components/app/npc-mentor';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { VrHeadset } from 'lucide-react';

export default function DashboardPage() {
  const vrImage = PlaceHolderImages.find((img) => img.id === 'vr-training');

  return (
    <>
      <Header title="Dashboard" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <SkillsGraph />
          <KarmicAlignment />
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Profession Tag</CardTitle>
              <CardDescription>Your designated role in the realm</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="default" className="text-lg">
                Data Scientist
              </Badge>
            </CardContent>
          </Card>
          <Card className="relative flex flex-col justify-between overflow-hidden">
            {vrImage && (
              <Image
                src={vrImage.imageUrl}
                alt="VR Training"
                fill
                className="object-cover z-0"
                data-ai-hint={vrImage.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
            <CardHeader className="z-20">
              <CardTitle className="font-headline text-primary-foreground">
                Immersive Training
              </CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Engage in AR/VR simulations.
              </CardDescription>
            </CardHeader>
            <CardContent className="z-20 mt-auto">
              <Button>
                <VrHeadset className="mr-2 h-4 w-4" />
                Enter VR Mode
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-2">
          <CompetencyEvents />
        </div>
        <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-2">
          <AiTutor />
          <NpcMentor />
        </div>
      </main>
    </>
  );
}
