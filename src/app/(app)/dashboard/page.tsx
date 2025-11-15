import { Header } from '@/components/app/header';
import { SkillsGraph } from '@/components/app/skills-graph';
import { KarmicAlignment } from '@/components/app/karmic-alignment';
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
import { Glasses } from 'lucide-react';
import Link from 'next/link';
import { BookCheck, Bot } from 'lucide-react';

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
                <Glasses className="mr-2 h-4 w-4" />
                Enter VR Mode
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-2">
          <Card>
             <CardHeader>
                <CardTitle className="font-headline">Competencies</CardTitle>
                <CardDescription>View your AI-generated learning path and track your progress.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Your personalized Competency-Building Events are ready. Start a quest or begin a new lesson plan.</p>
              </CardContent>
              <CardContent>
                <Button asChild>
                  <Link href="/competencies"><BookCheck /> View Your Competencies</Link>
                </Button>
              </CardContent>
          </Card>
           <Card>
             <CardHeader>
                <CardTitle className="font-headline">AI Tutor</CardTitle>
                <CardDescription>Get personalized help from your AI guide, Talos.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Have a question? Talos is available to provide instant feedback and detailed explanations on any topic.</p>
              </CardContent>
              <CardContent>
                <Button asChild>
                  <Link href="/tutor"><Bot /> Go to AI Tutor</Link>
                </Button>
              </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-4 md:gap-8">
            <NpcMentor />
        </div>
      </main>
    </>
  );
}
