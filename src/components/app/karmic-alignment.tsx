
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export function KarmicAlignment() {
  const [alignment, setAlignment] = useState(50);
  const [status, setStatus] = useState('Neutral');

  useEffect(() => {
    // Simulate dynamic changes to alignment
    const interval = setInterval(() => {
      setAlignment(Math.floor(Math.random() * 101));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (alignment > 70) {
      setStatus('Heroic');
    } else if (alignment > 40) {
      setStatus('Neutral');
    } else {
      setStatus('Vigilante');
    }
  }, [alignment]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Karmic Alignment</CardTitle>
        <CardDescription>Your moral and ethical standing</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <Progress
            value={alignment}
            className={cn(
              '[&>div]:bg-primary',
              alignment > 70 && '[&>div]:bg-green-500',
              alignment < 40 && '[&>div]:bg-red-500'
            )}
            aria-label={`Karmic alignment is ${alignment}%`}
          />
          <div className="flex justify-between text-sm font-medium">
            <span>{status}</span>
            <span>{alignment}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
