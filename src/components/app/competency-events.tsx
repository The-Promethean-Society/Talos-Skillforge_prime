
'use client';

import { useState, useTransition } from 'react';
import { generateCompetencyBuildingEvents, GenerateCompetencyBuildingEventsOutput } from '@/ai/flows/generate-competency-building-events';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '../ui/badge';
import { BookCheck, Gamepad2, Sparkles, Target } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const questImages = PlaceHolderImages.filter((img) => img.id.startsWith('quest'));

export function CompetencyEvents() {
  const [isPending, startTransition] = useTransition();
  const [events, setEvents] = useState<GenerateCompetencyBuildingEventsOutput | null>(null);

  const handleGenerateEvents = () => {
    startTransition(async () => {
      const result = await generateCompetencyBuildingEvents({
        userSkills: ['Python', 'Data Analysis'],
        learningGoals: 'Become a proficient data scientist with a focus on machine learning.',
        professionTag: 'Data Scientist',
      });
      setEvents(result);
    });
  };

  const getKarmicColor = (karma: number) => {
    if (karma > 0.5) return 'bg-green-500/20 text-green-700 border-green-500/30';
    if (karma < -0.5) return 'bg-red-500/20 text-red-700 border-red-500/30';
    return 'bg-muted text-muted-foreground border-border';
  }

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="font-headline">Competency-Building Events</CardTitle>
            <CardDescription>AI-generated objectives to advance your skills.</CardDescription>
          </div>
          <Button onClick={handleGenerateEvents} disabled={isPending} className="mt-4 sm:mt-0">
            <Sparkles className="mr-2 h-4 w-4" />
            {isPending ? 'Generating...' : 'Generate New Events'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="realm">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="realm"><Gamepad2 className="mr-2"/>Skillforge Realm</TabsTrigger>
            <TabsTrigger value="credential"><BookCheck className="mr-2"/>Credential Track</TabsTrigger>
          </TabsList>
          <TooltipProvider>
          <TabsContent value="realm" className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {isPending && !events && Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent><Skeleton className="h-20 w-full" /></CardContent>
                </Card>
              ))}
              {events?.events.map((event, index) => {
                const questImage = questImages[index % questImages.length];
                return (
                  <Card key={index} className="flex flex-col overflow-hidden transition-transform hover:scale-105 hover:shadow-lg">
                    {questImage && (
                      <div className="relative h-40 w-full">
                        <Image src={questImage.imageUrl} alt={event.Quest_Objective} fill style={{ objectFit: 'cover' }} data-ai-hint={questImage.imageHint} />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-lg font-headline">Quest: {event.Target_Skill}</CardTitle>
                       <div className="flex gap-2 pt-1">
                        <Badge variant="outline" className="w-fit">
                          <Target className="mr-1 h-3 w-3" />
                          {event.Target_Skill}
                        </Badge>
                         <Tooltip>
                          <TooltipTrigger>
                             <Badge variant="outline" className={`w-fit ${getKarmicColor(event.Karmic_Impact)}`}>
                              K: {event.Karmic_Impact.toFixed(1)}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Karmic Impact</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground">{event.Quest_Objective}</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Accept Quest</Button>
                    </CardFooter>
                  </Card>
                )
              })}
              {!isPending && !events && (
                <div className="col-span-full flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 py-12 text-center">
                  <p className="text-muted-foreground">Click &quot;Generate New Events&quot; to discover your path.</p>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="credential" className="mt-4">
            <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Objective</TableHead>
                  <TableHead className="hidden sm:table-cell">Target Skill</TableHead>
                  <TableHead className="hidden lg:table-cell">Assessment</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isPending && !events && Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                        <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                        <TableCell className="hidden sm:table-cell"><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell className="hidden lg:table-cell"><Skeleton className="h-5 w-36" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
                    </TableRow>
                ))}
                {events?.events.map((event, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{event.Academic_Objective}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant={'secondary'}>
                        {event.Target_Skill}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground text-xs">{event.Assessment_Method}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline">Start</Button>
                    </TableCell>
                  </TableRow>
                ))}
                {!isPending && !events && (
                    <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                            No events generated yet.
                        </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
            </div>
          </TabsContent>
          </TooltipProvider>
        </Tabs>
      </CardContent>
    </Card>
  );
}
