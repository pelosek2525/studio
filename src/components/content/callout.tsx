import { cva, type VariantProps } from 'class-variance-authority';
import { AlertCircle, Info, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const calloutVariants = cva(
  "",
  {
    variants: {
      type: {
        info: "bg-[hsl(var(--callout-info-background))] border-[hsl(var(--callout-info-border))] text-[hsl(var(--callout-info-foreground))] [&>svg]:text-[hsl(var(--callout-info-foreground))]",
        warning: "bg-[hsl(var(--callout-warning-background))] border-[hsl(var(--callout-warning-border))] text-[hsl(var(--callout-warning-foreground))] [&>svg]:text-[hsl(var(--callout-warning-foreground))]",
        tip: "bg-[hsl(var(--callout-tip-background))] border-[hsl(var(--callout-tip-border))] text-[hsl(var(--callout-tip-foreground))] [&>svg]:text-[hsl(var(--callout-tip-foreground))]",
      },
    },
    defaultVariants: {
      type: "info",
    },
  }
);

interface CalloutProps extends VariantProps<typeof calloutVariants> {
  children: React.ReactNode;
  type: 'info' | 'warning' | 'tip';
}

const icons = {
  info: <Info className="h-5 w-5" />,
  warning: <AlertCircle className="h-5 w-5" />,
  tip: <Lightbulb className="h-5 w-5" />,
};

const titles = {
  info: "Info",
  warning: "Warning",
  tip: "Pro Tip",
};

export function Callout({ children, type = 'info' }: CalloutProps) {
  return (
    <Alert className={cn(calloutVariants({ type }), 'my-6')}>
      {icons[type]}
      <AlertTitle className="font-headline">{titles[type]}</AlertTitle>
      <AlertDescription>
        {children}
      </AlertDescription>
    </Alert>
  );
}
