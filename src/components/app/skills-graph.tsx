
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

const chartData = [
  { skill: 'Python', level: 85, fill: 'var(--color-python)' },
  { skill: 'React', level: 78, fill: 'var(--color-react)' },
  { skill: 'Leadership', level: 65, fill: 'var(--color-leadership)' },
  { skill: 'Sys Design', level: 72, fill: 'var(--color-sysdesign)' },
  { skill: 'GenAI', level: 92, fill: 'var(--color-genai)' },
];

const chartConfig = {
  level: {
    label: 'Skill Level',
  },
  python: {
    label: 'Python',
    color: 'hsl(var(--chart-1))',
  },
  react: {
    label: 'React',
    color: 'hsl(var(--chart-2))',
  },
  leadership: {
    label: 'Leadership',
    color: 'hsl(var(--chart-3))',
  },
  sysdesign: {
    label: 'System Design',
    color: 'hsl(var(--chart-4))',
  },
  genai: {
    label: 'GenAI',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export function SkillsGraph() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Skills Graph</CardTitle>
        <CardDescription>Your current skill proficiency</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="skill"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="level" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
