
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Globe, MapPin } from 'lucide-react';

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

  const districts = ['all', ...Array.from(new Set(offices.map(o => o.district)))];

  const filteredOffices = offices.filter(office => {
    const typeMatch = typeFilter === 'all' || office.type === typeFilter;
    const districtMatch = districtFilter === 'all' || office.district === districtFilter;
    return typeMatch && districtMatch;
  });

  return (
    <div className="space-y-8">
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
                    <Select value={districtFilter} onValueChange={setDistrictFilter}>
                        <SelectTrigger>
                            <SelectValue placeholder="Vyberte městskou část..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Všechny městské části</SelectItem>
                            {districts.filter(d => d !== 'all').sort().map(district => (
                                <SelectItem key={district} value={district}>{district}</SelectItem>
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
