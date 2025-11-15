
'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { guideUsersWithAiNpcs, GuideUsersWithAiNpcsOutput } from '@/ai/flows/guide-users-with-ai-npcs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface Dialogue {
  speaker: 'user' | 'npc';
  text: string;
}

export function NpcMentor() {
  const [isPending, startTransition] = useTransition();
  const [dialogue, setDialogue] = useState<Dialogue[]>([]);
  const [query, setQuery] = useState('');
  const [karmicAlignment, setKarmicAlignment] = useState(0.5); // Neutral
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const npcAvatar = PlaceHolderImages.find((img) => img.id === 'npc-avatar');


  useEffect(() => {
    // Simulate initial NPC greeting
    setDialogue([{ speaker: 'npc', text: 'Welcome, learner. I am the Oracle. How may I guide you on your path to mastery?' }]);
  }, []);

  const handleSend = () => {
    if (!query.trim()) return;

    const newDialogue: Dialogue[] = [...dialogue, { speaker: 'user', text: query }];
    setDialogue(newDialogue);
    setQuery('');

    startTransition(async () => {
      const result = await guideUsersWithAiNpcs({
        query,
        karmicAlignment,
      });
      setDialogue([...newDialogue, { speaker: 'npc', text: result.npcResponse }]);
      // Simulate a change in karmic alignment for demonstration
      setKarmicAlignment(Math.random() * 2 - 1);
    });
  };
  
  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div > div');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [dialogue]);

  const getAlignmentStyle = () => {
    if (karmicAlignment > 0.5) return "text-cyan-400"; // Heroic
    if (karmicAlignment < -0.5) return "text-red-400"; // Vigilante
    return "text-gray-400"; // Neutral
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-primary">
            {npcAvatar && <AvatarImage src={npcAvatar.imageUrl} alt="Oracle Avatar" data-ai-hint={npcAvatar.imageHint} />}
            <AvatarFallback>O</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="font-headline">The Oracle</CardTitle>
            <CardDescription>Guidance is given, not bought. Your <span className={getAlignmentStyle()}>karma</span> decides its nature.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-64 pr-4" ref={scrollAreaRef}>
          <div className="flex flex-col gap-4">
            {dialogue.map((entry, index) => (
              <div key={index} className={`flex flex-col ${entry.speaker === 'npc' ? 'items-start' : 'items-end'}`}>
                <p className={`text-xs mb-1 ${entry.speaker === 'npc' ? 'text-left text-primary' : 'text-right text-muted-foreground'}`}>{entry.speaker === 'npc' ? 'The Oracle' : 'You'}</p>
                <div className={`max-w-md rounded-lg p-3 ${entry.speaker === 'npc' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                  <p className="text-sm">{entry.text}</p>
                </div>
              </div>
            ))}
            {isPending && (
                <div className="flex flex-col items-start animate-pulse">
                    <p className="text-xs mb-1 text-left text-primary">The Oracle</p>
                    <div className="rounded-lg p-3 bg-muted h-10 w-48"></div>
                </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex w-full gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Seek wisdom from the Oracle..."
            disabled={isPending}
          />
          <Button type="submit" disabled={isPending || !query.trim()}>
            Ask
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
