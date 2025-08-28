
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Globe, MapPin } from 'lucide-react';
import { PragueMap } from './prague-map';

interface Office {
  type: string;
  name: string;
  district: string;
  address: string;
  website: string;
  serves: string;
}

interface OfficeFinderProps {
  offices: Office[];
}

const officeTypeLabels: Record<string, string> = {
    all: 'Všechny typy',
    foreign_police: 'Cizinecká policie (OAMP)',
    trade_office: 'Živnostenský úřad',
    tax_office: 'Finanční úřad',
    social_security: 'Správa sociálního zabezpečení',
    post_office: 'Pošta',
};

export function OfficeFinder({ offices }: OfficeFinderProps) {
  const [typeFilter, setTypeFilter] = useState('all');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  const districts = ['all', ...Array.from(new Set(offices.map(o => o.district).sort((a,b) => a.localeCompare(b, undefined, {numeric: true}))))];

  const filteredOffices = offices.filter(office => {
    const typeMatch = typeFilter === 'all' || office.type === typeFilter;
    const districtMatch = districtFilter === 'all' || office.district.replace(' ','-').toLowerCase() === districtFilter;
    return typeMatch && districtMatch;
  });

  const handleDistrictClick = (districtId: string) => {
    setDistrictFilter(districtId);
  };

  const handleDistrictFilterChange = (value: string) => {
    setDistrictFilter(value);
  };


  return (
    <div className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle>Interaktivní mapa úřadů</CardTitle>
                <CardDescription>Klikněte na městskou část na mapě nebo použijte filtry níže pro zobrazení relevantních úřadů.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full aspect-video md:aspect-[2/1] lg:aspect-[3/1] bg-muted/50 rounded-lg overflow-hidden border">
                    <PragueMap 
                        selectedDistrict={districtFilter}
                        hoveredDistrict={hoveredDistrict}
                        onDistrictClick={handleDistrictClick}
                        onDistrictHover={setHoveredDistrict}
                    />
                </div>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Filtrovat úřady</CardTitle>
                <CardDescription>Vyberte typ úřadu a městskou část pro zúžení výsledků.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger>
                            <SelectValue placeholder="Vyberte typ úřadu..." />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(officeTypeLabels).map(([key, label]) => (
                                <SelectItem key={key} value={key}>{label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={districtFilter} onValueChange={handleDistrictFilterChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Vyberte městskou část..." />
                        </SelectTrigger>
                        <SelectContent>
                            {districts.map(district => (
                                <SelectItem key={district} value={district === 'all' ? 'all' : district.replace(' ','-').toLowerCase()}>
                                    {district === 'all' ? 'Všechny městské části' : district}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOffices.length > 0 ? (
                filteredOffices.map((office, index) => (
                    <Card key={index} className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">{office.name}</CardTitle>
                            <CardDescription>
                                <span className="font-semibold text-primary">{officeTypeLabels[office.type]}</span>
                                {' - '}
                                <span>{office.district}</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                           <div>
                                <h4 className="text-sm font-semibold mb-1">Adresa:</h4>
                                <p className="text-muted-foreground">{office.address}</p>
                           </div>
                            <div>
                                <h4 className="text-sm font-semibold mb-1">Služby:</h4>
                                <p className="text-muted-foreground">{office.serves}</p>
                            </div>
                        </CardContent>
                        <div className="p-6 pt-0 flex gap-2">
                             <Button asChild variant="outline" className="w-full">
                                <a href={office.website} target="_blank" rel="noopener noreferrer">
                                    <Globe className="mr-2 h-4 w-4" /> Web
                                </a>
                            </Button>
                            <Button asChild variant="outline" className="w-full">
                                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`} target="_blank" rel="noopener noreferrer">
                                    <MapPin className="mr-2 h-4 w-4" /> Mapa
                                </a>
                            </Button>
                        </div>
                    </Card>
                ))
            ) : (
                <div className="text-center text-muted-foreground col-span-full py-12">
                    <p>Pro zadaná kritéria nebyly nalezeny žádné úřady.</p>
                </div>
            )}
        </div>
    </div>
  );
}
