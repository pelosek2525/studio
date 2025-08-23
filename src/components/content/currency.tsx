'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface CurrencyProps {
  amount: number;
  currency: string;
}

// Dummy conversion rates
const CONVERSION_RATES: Record<string, { usd: number; eur: number }> = {
  CZK: {
    usd: 0.043,
    eur: 0.04,
  },
};

export function Currency({ amount, currency }: CurrencyProps) {
  const rates = CONVERSION_RATES[currency.toUpperCase()];

  if (!rates) {
    return (
      <span className="font-semibold">
        {amount.toLocaleString()} {currency}
      </span>
    );
  }

  const usdAmount = (amount * rates.usd).toFixed(2);
  const eurAmount = (amount * rates.eur).toFixed(2);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="font-semibold text-accent border-b border-accent border-dashed cursor-help">
            {amount.toLocaleString()} {currency}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex flex-col gap-1 p-1">
            <p className="text-sm font-semibold text-center">Approximate Conversion</p>
            <p>
              <span className="font-mono">{usdAmount}</span> USD
            </p>
            <p>
              <span className="font-mono">{eurAmount}</span> EUR
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
