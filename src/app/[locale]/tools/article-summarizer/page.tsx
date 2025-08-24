'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { generateSummaryAction } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Sparkles, Terminal } from 'lucide-react';
import { Label } from '@/components/ui/label';

const initialState = {
  summary: undefined,
  error: undefined,
  isError: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Summarizing...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Summary
        </>
      )}
    </Button>
  );
}

export default function ArticleSummarizerPage() {
  const [state, formAction] = useFormState(generateSummaryAction, initialState);

  return (
    <div className="container max-w-4xl py-12">
      <div className="space-y-4 text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
          AI Article Summarizer
        </h1>
        <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl">
          Paste in any article to get a quick, AI-generated TL;DR summary. Perfect for understanding long guides in seconds.
        </p>
      </div>

      <Card>
        <form action={formAction}>
          <CardHeader>
            <CardTitle className="font-headline">Summarize an Article</CardTitle>
            <CardDescription>
              Enter the full text of an article below. We recommend at least a few paragraphs for the best results.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full gap-2">
              <Label htmlFor="articleText" className="sr-only">Article Text</Label>
              <Textarea
                id="articleText"
                name="articleText"
                placeholder="Paste your article text here..."
                rows={15}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      {state.error && state.isError && (
        <Alert variant="destructive" className="mt-8">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}
      
      {state.summary && !state.isError &&(
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              Generated Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/90">{state.summary}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
