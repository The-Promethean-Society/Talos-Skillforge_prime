
'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { providePersonalizedTutoring, ProvidePersonalizedTutoringOutput } from '@/ai/flows/provide-personalized-tutoring';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Bot, User } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface Message {
  sender: 'user' | 'ai';
  text: string | { explanation: string, feedback: string };
}

export function AiTutor() {
  const [isPending, startTransition] = useTransition();
  const [messages, setMessages] = useState<Message[]>([]);
  const [query, setQuery] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const npcAvatar = PlaceHolderImages.find((img) => img.id === 'npc-avatar');

  const handleSend = () => {
    if (!query.trim()) return;

    const newMessages: Message[] = [...messages, { sender: 'user', text: query }];
    setMessages(newMessages);
    setQuery('');

    startTransition(async () => {
      const result = await providePersonalizedTutoring({
        question: query,
        skillGaps: 'beginner in machine learning concepts',
        learningStyle: 'visual and example-driven',
        material: 'Introduction to Neural Networks',
      });
      setMessages([...newMessages, { sender: 'ai', text: result }]);
    });
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);


  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className='flex items-center gap-4'>
            <Avatar className="h-12 w-12">
                {npcAvatar && <AvatarImage src={npcAvatar.imageUrl} alt="Talos Avatar" data-ai-hint={npcAvatar.imageHint} />}
                <AvatarFallback>TA</AvatarFallback>
            </Avatar>
            <div>
                <CardTitle className="font-headline">AI Tutor (Talos Agent)</CardTitle>
                <CardDescription>Your personal AI guide for any topic.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-64 pr-4" ref={scrollAreaRef}>
          <div className="flex flex-col gap-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex items-start gap-3 ${message.sender === 'ai' ? '' : 'justify-end'}`}>
                {message.sender === 'ai' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><Bot size={20} /></AvatarFallback>
                  </Avatar>
                )}
                <div className={`max-w-xs rounded-lg px-4 py-2 ${message.sender === 'ai' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                  {typeof message.text === 'string' ? (
                    <p className="text-sm">{message.text}</p>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm font-semibold">Explanation:</p>
                      <p className="text-sm">{message.text.explanation}</p>
                      <p className="text-sm font-semibold mt-2">Feedback:</p>
                      <p className="text-sm">{message.text.feedback}</p>
                    </div>
                  )}
                </div>
                {message.sender === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><User size={20} /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isPending && (
                <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback><Bot size={20} /></AvatarFallback>
                    </Avatar>
                    <div className="max-w-xs rounded-lg px-4 py-2 bg-muted animate-pulse">
                        <div className="h-4 w-20 rounded bg-background/50"></div>
                    </div>
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
            placeholder="Ask Talos anything..."
            disabled={isPending}
          />
          <Button type="submit" disabled={isPending || !query.trim()}>
            Send
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
