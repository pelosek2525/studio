
'use client';

import { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { ProofOfAccommodationDocument, type FormData } from './proof-of-accommodation-document';
import { Printer } from 'lucide-react';

const initialFormData: FormData = {
  landlordName: '',
  landlordDob: '',
  landlordIdNumber: '',
  landlordAddress: '',
  tenancyDuration: 'limited',
  tenancyFrom: '',
  tenancyTo: '',
  propertyAddress: {
    apartmentNumber: '',
    streetAndNumber: '',
    zipAndCity: '',
  },
  relationshipToProperty: '',
  tenantName: '',
  tenantDob: '',
  tenantNationality: '',
  tenantPassportNumber: '',
  placeOfSigning: '',
  dateOfSigning: '',
};

export function ProofOfAccommodationForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Doklad-o-zajisteni-ubytovani',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent as keyof FormData], [child]: value },
      } as FormData));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, tenancyDuration: value as 'limited' | 'unlimited' }));
  };

  return (
    <div className="space-y-8">
      {/* Form Section */}
      <div className="space-y-6">
        {/* Landlord Details */}
        <div className="space-y-4">
          <h3 className="font-headline text-xl text-primary">Údaje o ubytovateli</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="landlordName">Jméno a příjmení</Label>
              <Input id="landlordName" name="landlordName" value={formData.landlordName} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="landlordDob">Datum narození</Label>
              <Input id="landlordDob" name="landlordDob" type="date" value={formData.landlordDob} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="landlordIdNumber">Číslo dokladu totožnosti</Label>
              <Input id="landlordIdNumber" name="landlordIdNumber" value={formData.landlordIdNumber} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="landlordAddress">Adresa trvalého pobytu</Label>
              <Input id="landlordAddress" name="landlordAddress" value={formData.landlordAddress} onChange={handleChange} />
            </div>
          </div>
        </div>
        
        <Separator />

        {/* Accommodation Details */}
        <div className="space-y-4">
          <h3 className="font-headline text-xl text-primary">Údaje o ubytování</h3>
          <RadioGroup value={formData.tenancyDuration} onValueChange={handleRadioChange}>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="limited" id="limited" />
                <Label htmlFor="limited">Na dobu určitou od</Label>
                <Input name="tenancyFrom" type="date" value={formData.tenancyFrom} onChange={handleChange} disabled={formData.tenancyDuration !== 'limited'} className="w-auto"/>
                <span>do</span>
                <Input name="tenancyTo" type="date" value={formData.tenancyTo} onChange={handleChange} disabled={formData.tenancyDuration !== 'limited'} className="w-auto"/>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="unlimited" id="unlimited" />
                <Label htmlFor="unlimited">Na dobu bez omezení</Label>
            </div>
          </RadioGroup>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
             <div className="space-y-2">
              <Label htmlFor="propertyAddress.streetAndNumber">Ulice a č.p.</Label>
              <Input id="propertyAddress.streetAndNumber" name="propertyAddress.streetAndNumber" value={formData.propertyAddress.streetAndNumber} onChange={handleChange} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="propertyAddress.apartmentNumber">Číslo bytu</Label>
              <Input id="propertyAddress.apartmentNumber" name="propertyAddress.apartmentNumber" value={formData.propertyAddress.apartmentNumber} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="propertyAddress.zipAndCity">PSČ a obec</Label>
              <Input id="propertyAddress.zipAndCity" name="propertyAddress.zipAndCity" value={formData.propertyAddress.zipAndCity} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="relationshipToProperty">Vztah k nemovitosti (např. vlastník)</Label>
              <Input id="relationshipToProperty" name="relationshipToProperty" value={formData.relationshipToProperty} onChange={handleChange} />
            </div>
          </div>
        </div>

        <Separator />

        {/* Tenant Details */}
        <div className="space-y-4">
          <h3 className="font-headline text-xl text-primary">Údaje o cizinci</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tenantName">Jméno a příjmení</Label>
              <Input id="tenantName" name="tenantName" value={formData.tenantName} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tenantDob">Datum narození</Label>
              <Input id="tenantDob" name="tenantDob" type="date" value={formData.tenantDob} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tenantNationality">Státní příslušnost</Label>
              <Input id="tenantNationality" name="tenantNationality" value={formData.tenantNationality} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tenantPassportNumber">Cestovní doklad</Label>
              <Input id="tenantPassportNumber" name="tenantPassportNumber" value={formData.tenantPassportNumber} onChange={handleChange} />
            </div>
          </div>
        </div>

        <Separator />

         {/* Signing Details */}
        <div className="space-y-4">
          <h3 className="font-headline text-xl text-primary">Podpis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="placeOfSigning">V</Label>
                <Input id="placeOfSigning" name="placeOfSigning" value={formData.placeOfSigning} onChange={handleChange} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="dateOfSigning">Dne</Label>
                <Input id="dateOfSigning" name="dateOfSigning" type="date" value={formData.dateOfSigning} onChange={handleChange} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Print Button */}
      <Button onClick={handlePrint} className="w-full" size="lg">
        <Printer className="mr-2" />
        Vytisknout nebo uložit jako PDF
      </Button>

      {/* Hidden Printable Component */}
      <div className="hidden">
        <div ref={printRef}>
          <ProofOfAccommodationDocument formData={formData} />
        </div>
      </div>
    </div>
  );
}
