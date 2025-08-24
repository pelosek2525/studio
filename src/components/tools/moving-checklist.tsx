
'use client';

import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import checklistData from '@/content/checklist.json';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  link?: string;
}

interface ChecklistCategory {
  title: string;
  items: ChecklistItem[];
}

const STORAGE_KEY = 'movingChecklistState';

export function MovingChecklist() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        setCheckedItems(JSON.parse(savedState));
      }
    } catch (error) {
      console.error("Failed to load checklist state from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems));
      } catch (error) {
        console.error("Failed to save checklist state to localStorage", error);
      }
    }
  }, [checkedItems, isClient]);

  const handleCheckedChange = (itemId: string, checked: boolean) => {
    setCheckedItems(prev => ({ ...prev, [itemId]: checked }));
  };

  const allItems = checklistData.categories.flatMap(category => category.items);
  const totalItems = allItems.length;
  const completedItems = Object.values(checkedItems).filter(Boolean).length;
  const progressPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  if (!isClient) {
    // Render a placeholder or loader on the server
    return <div>Loading checklist...</div>;
  }

  return (
    <div className="space-y-6">
       <div className="space-y-2">
            <div className="flex justify-between font-medium">
                <span>Celkový pokrok</span>
                <span>{completedItems} / {totalItems}</span>
            </div>
            <Progress value={progressPercentage} />
       </div>
      <Accordion type="multiple" defaultValue={checklistData.categories.map(c => c.title)} className="w-full">
        {checklistData.categories.map((category: ChecklistCategory) => (
          <AccordionItem value={category.title} key={category.title}>
            <AccordionTrigger className="font-headline text-lg">{category.title}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {category.items.map((item: ChecklistItem) => (
                  <div key={item.id} className="flex items-start rounded-lg border p-4">
                    <Checkbox
                      id={item.id}
                      checked={checkedItems[item.id] || false}
                      onCheckedChange={(checked) => handleCheckedChange(item.id, !!checked)}
                      className="mt-1"
                    />
                    <div className="ml-4 flex-grow">
                      <Label htmlFor={item.id} className="font-bold text-base leading-snug">
                        {item.title}
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </div>
                    {item.link && (
                      <Link href={item.link} passHref legacyBehavior>
                        <a target="_blank" rel="noopener noreferrer" className="ml-4 p-2 text-primary hover:underline flex items-center text-sm">
                          Průvodce <ArrowUpRight className="h-4 w-4 ml-1" />
                        </a>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
