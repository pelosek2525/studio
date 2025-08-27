
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import * as LucideIcons from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface District {
  id: string;
  name: string;
  rent: number;
  transport: number;
  amenities: number;
  atmosphere: string;
  atmosphere_icon: keyof typeof LucideIcons;
  summary: string;
}

interface DistrictComparatorProps {
  districts: District[];
}

const Rating = ({ score }: { score: number }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <LucideIcons.Star
        key={i}
        className={`h-5 w-5 ${i < score ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
      />
    ))}
  </div>
);

const rentLabels: { [key: number]: string } = {
  1: 'Velmi nízké',
  2: 'Nízké',
  3: 'Průměrné',
  4: 'Vysoké',
  5: 'Velmi vysoké',
};

const getAtmosphereIcon = (iconName: keyof typeof LucideIcons) => {
    const Icon = LucideIcons[iconName] as React.ElementType;
    return Icon ? <Icon className="h-5 w-5 mr-2" /> : null;
};

export function DistrictComparator({ districts }: DistrictComparatorProps) {
  const [selected, setSelected] = useState<(string | null)[]>([districts[0]?.id, districts[1]?.id]);

  const handleSelect = (index: number, value: string) => {
    const newSelected = [...selected];
    newSelected[index] = value;
    setSelected(newSelected);
  };

  const addColumn = () => {
    if (selected.length < 3) {
      setSelected([...selected, null]);
    }
  };

  const removeColumn = (index: number) => {
    const newSelected = [...selected];
    newSelected.splice(index, 1);
    setSelected(newSelected);
  };

  const getDistrictById = (id: string | null) => {
    return districts.find((d) => d.id === id);
  };

  const selectedDistricts = selected.map(getDistrictById);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {selected.map((districtId, index) => (
            <div key={index} className="flex items-center gap-2">
              <Select onValueChange={(value) => handleSelect(index, value)} value={districtId || ''}>
                <SelectTrigger>
                  <SelectValue placeholder="Vyberte čtvrť..." />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((d) => (
                    <SelectItem key={d.id} value={d.id} disabled={selected.includes(d.id) && d.id !== districtId}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selected.length > 2 && (
                <Button variant="ghost" size="icon" onClick={() => removeColumn(index)}>
                  <LucideIcons.X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        <Button onClick={addColumn} disabled={selected.length >= 3} className="w-full sm:w-auto">
          <LucideIcons.Plus className="mr-2 h-4 w-4" /> Přidat srovnání
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Kritérium</TableHead>
              {selectedDistricts.map((district, index) => (
                <TableHead key={index}>{district?.name || 'Nevybráno'}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold">Shrnutí</TableCell>
              {selectedDistricts.map((district, index) => (
                <TableCell key={index}>{district?.summary}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Průměrné nájemné</TableCell>
              {selectedDistricts.map((district, index) => (
                <TableCell key={index} className="flex items-center">
                    {district && (
                        <>
                            <Rating score={district.rent} />
                            <span className='ml-2 text-muted-foreground text-xs'>({rentLabels[district.rent]})</span>
                        </>
                    )}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Dostupnost MHD</TableCell>
              {selectedDistricts.map((district, index) => (
                <TableCell key={index}>{district && <Rating score={district.transport} />}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Vybavenost</TableCell>
              {selectedDistricts.map((district, index) => (
                <TableCell key={index}>{district && <Rating score={district.amenities} />}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Atmosféra</TableCell>
              {selectedDistricts.map((district, index) => (
                <TableCell key={index}>
                  {district && (
                    <div className="flex items-center">
                        {getAtmosphereIcon(district.atmosphere_icon)}
                        <span>{district.atmosphere}</span>
                    </div>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
