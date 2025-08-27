
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { addDays, differenceInDays, format, isValid, parse, startOfDay, subDays } from 'date-fns';
import { Terminal, Calendar, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip as UiTooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Stay {
  arrival: Date;
  departure: Date;
  duration: number;
}

interface DayInfo {
  date: string;
  daysUsedInWindow: number;
  isOverstay: boolean;
  isFutureStay: boolean;
  isStayDay: boolean;
}

const DATE_FORMAT_INPUT = 'ddMMyyyy';
const DATE_FORMAT_DISPLAY = 'dd MMM yyyy';

export function SchengenCalculator() {
  const [dateInput, setDateInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ stays: Stay[], timeline: DayInfo[], totalDays: number } | null>(null);

  const parseAndValidateDates = (input: string): { type: 'arrival' | 'departure', date: Date }[] => {
    const entries = input.trim().split(/\s+/);
    if (entries.length === 0 || entries[0] === '') return [];

    return entries.map((entry, index) => {
      const typeChar = entry.charAt(0);
      const dateStr = entry.substring(1);

      if (typeChar !== '+' && typeChar !== '-') {
        throw new Error(`Invalid entry at position ${index + 1}: Must start with '+' for arrival or '-' for departure.`);
      }

      if (dateStr.length !== 8) {
        throw new Error(`Invalid date format for entry ${index + 1}: Must be DDMMYYYY.`);
      }
      
      const date = parse(dateStr, DATE_FORMAT_INPUT, new Date());

      if (!isValid(date)) {
        throw new Error(`Invalid date for entry ${index + 1}: "${dateStr}" is not a valid date.`);
      }

      return {
        type: typeChar === '+' ? 'arrival' : 'departure',
        date: startOfDay(date),
      };
    });
  };

  const calculateStays = () => {
    try {
      setError(null);
      setResult(null);
      let dateEvents = parseAndValidateDates(dateInput);

      if (dateEvents.length === 0) {
        throw new Error('Please enter at least one date.');
      }
      
      dateEvents.sort((a, b) => a.date.getTime() - b.date.getTime());

      const stays: Stay[] = [];
      let currentArrival: Date | null = null;
      let arrivalCount = 0;
      let departureCount = 0;

      for (const event of dateEvents) {
        if (event.type === 'arrival') {
            arrivalCount++;
            if (!currentArrival) {
                currentArrival = event.date;
            }
        } else {
            departureCount++;
            if (currentArrival) {
                // Departure date is inclusive, so we add 1 day to duration
                const duration = differenceInDays(event.date, currentArrival) + 1;
                if(duration < 1) {
                    throw new Error(`Departure date ${format(event.date, DATE_FORMAT_INPUT)} must be after arrival date ${format(currentArrival, DATE_FORMAT_INPUT)}.`);
                }
                stays.push({
                    arrival: currentArrival,
                    departure: event.date,
                    duration,
                });
                currentArrival = null;
            }
        }
      }

      if (arrivalCount !== departureCount) {
        throw new Error('The number of arrivals (+) and departures (-) must be equal.');
      }

      if (stays.length === 0) {
        throw new Error('No valid stays could be calculated.');
      }

      const today = startOfDay(new Date());
      const firstDate = stays[0].arrival;
      const lastDate = stays[stays.length - 1].departure;
      
      const timeline: DayInfo[] = [];
      let totalDays = 0;

      for (let day = firstDate; day <= lastDate; day = addDays(day, 1)) {
        const lookbackDate = subDays(day, 179);
        
        let daysUsedInWindow = 0;
        for (const stay of stays) {
          if (stay.arrival > day) continue; // Skip future stays
          
          const start = stay.arrival > lookbackDate ? stay.arrival : lookbackDate;
          const end = stay.departure < day ? stay.departure : day;

          if (end >= start) {
            daysUsedInWindow += differenceInDays(end, start) + 1;
          }
        }

        const isStayDay = stays.some(s => day >= s.arrival && day <= s.departure);
        const isFutureStay = isStayDay && day > today;

        if (isStayDay) {
            totalDays++;
        }
        
        timeline.push({
          date: format(day, DATE_FORMAT_DISPLAY),
          daysUsedInWindow,
          isOverstay: daysUsedInWindow > 90,
          isFutureStay: isFutureStay,
          isStayDay: isStayDay,
        });
      }

      setResult({ stays, timeline, totalDays });

    } catch (e: any) {
      setError(e.message);
      setResult(null);
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as DayInfo;
      return (
        <div className="bg-popover text-popover-foreground p-3 rounded-md border shadow-md">
          <p className="font-bold">{label}</p>
          <p className="text-sm">{`Days in 180-day window: ${data.daysUsedInWindow}`}</p>
          {data.isOverstay && <p className="text-sm text-destructive font-bold">Overstay!</p>}
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="dateInput" className="font-medium">
          Enter arrival (+) and departure (-) dates
        </label>
        <Textarea
          id="dateInput"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
          placeholder="+01012024 -10012024 +15032024 -30042024..."
          rows={4}
        />
        <p className="text-xs text-muted-foreground">Format: +DDMMYYYY for arrival, -DDMMYYYY for departure. Separate entries with a space.</p>
      </div>
      <Button onClick={calculateStays} className="w-full">
        <Calendar className="mr-2 h-4 w-4" />
        Calculate
      </Button>

      {error && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
                <CardTitle>Calculation Results</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Total days of stay calculated: <strong>{result.totalDays}</strong></p>
                <ul className="mt-4 space-y-2">
                    {result.stays.map((stay, index) => (
                        <li key={index} className="text-sm p-2 border rounded-md bg-muted/50">
                            <strong>Stay {index + 1}:</strong> from {format(stay.arrival, DATE_FORMAT_DISPLAY)} to {format(stay.departure, DATE_FORMAT_DISPLAY)} ({stay.duration} days)
                        </li>
                    ))}
                </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    Stay Timeline Visualization
                    <TooltipProvider>
                      <UiTooltip>
                          <TooltipTrigger asChild>
                              <HelpCircle className='h-4 w-4 ml-2 text-muted-foreground cursor-pointer' />
                          </TooltipTrigger>
                          <TooltipContent className='max-w-xs'>
                              <p>This chart visualizes your 90/180-day rolling window. Each bar is a day of your stay. Hover over a bar to see how many days you had used in the preceding 180 days on that specific day.</p>
                          </TooltipContent>
                      </UiTooltip>
                    </TooltipProvider>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center space-x-4 text-xs mb-4">
                    <div className="flex items-center"><div className="w-3 h-3 bg-green-500 mr-1"></div><span>Valid Stay Day</span></div>
                    <div className="flex items-center"><div className="w-3 h-3 bg-red-500 mr-1"></div><span>Overstay Day</span></div>
                    <div className="flex items-center"><div className="w-3 h-3 bg-yellow-500 mr-1"></div><span>Future Stay Day</span></div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={result.timeline.filter(d => d.isStayDay)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis label={{ value: 'Days in Window', angle: -90, position: 'insideLeft' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="daysUsedInWindow" name="Days used in 180-day window">
                        {result.timeline.filter(d => d.isStayDay).map((entry, index) => (
                            <Bar key={`cell-${index}`} fill={entry.isOverstay ? '#ef4444' : entry.isFutureStay ? '#f59e0b' : '#22c55e'} />
                        ))}
                    </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
