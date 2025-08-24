
import React from 'react';

export interface FormData {
  landlordName: string;
  landlordDob: string;
  landlordIdNumber: string;
  landlordAddress: string;
  tenancyDuration: 'limited' | 'unlimited';
  tenancyFrom: string;
  tenancyTo: string;
  propertyAddress: {
    apartmentNumber: string;
    streetAndNumber: string;
    zipAndCity: string;
  };
  relationshipToProperty: string;
  tenantName: string;
  tenantDob: string;
  tenantNationality: string;
  tenantPassportNumber: string;
  placeOfSigning: string;
  dateOfSigning: string;
}

interface Props {
  formData: FormData;
}

const Field = ({ label, value, className = '' }: { label?: string; value: string; className?: string }) => (
  <div className={`flex items-end border-b border-black pb-1 ${className}`}>
    {label && <span className="font-bold mr-2">{label}</span>}
    <span className="flex-grow text-left">{value || '...................................................'}</span>
  </div>
);

const LabeledField = ({ label, value, className = '' }: { label: string; value: string; className?: string }) => (
    <div className={`flex items-end border-b border-black pb-1 ${className}`}>
      <span className="w-48 shrink-0">{label}:</span>
      <span className="flex-grow text-left">{value || '...................................................'}</span>
    </div>
  );
  

const Checkbox = ({ checked, label }: { checked: boolean; label: string }) => (
  <div className="flex items-center space-x-2">
    <div className="w-4 h-4 border border-black flex items-center justify-center">
      {checked && <span className="font-bold">X</span>}
    </div>
    <span>{label}</span>
  </div>
);


export const ProofOfAccommodationDocument = React.forwardRef<HTMLDivElement, Props>(({ formData }, ref) => {
    
    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('cs-CZ');
    }

    return (
    <div ref={ref} className="p-8 bg-white text-black font-serif text-sm">
      <style>
        {`
          @media print {
            @page {
              size: A4;
              margin: 1in;
            }
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        `}
      </style>
      <div className="max-w-2xl mx-auto space-y-4">
        <h1 className="text-center font-bold text-lg">
          DOKLAD (POTVRZENÍ) O ZAJIŠTĚNÍ UBYTOVÁNÍ
        </h1>
        <p className="text-center">
          podle zákona č. 326/1999 Sb., o pobytu cizinců na území České republiky a o změně některých zákonů, ve znění pozdějších předpisů
        </p>

        <div className="space-y-2 pt-4">
            <div className="flex items-center">
                <span className="font-bold mr-2">Já, ubytovatel</span>
                <LabeledField label="(jméno a příjmení)" value={formData.landlordName} className="flex-grow" />
            </div>
          <LabeledField label="datum narození" value={formatDate(formData.landlordDob)} />
          <LabeledField label="číslo dokladu totožnosti (např. občanského průkazu)" value={formData.landlordIdNumber} />
          <LabeledField label="adresa hlášeného trvalého pobytu" value={formData.landlordAddress} />
        </div>

        <p className="pt-4">
          potvrzuji, že poskytnu ubytování na území České republiky
        </p>

        <div className="flex items-center space-x-4">
          <Checkbox checked={formData.tenancyDuration === 'limited'} label="na dobu od *)" />
          <span>{formData.tenancyDuration === 'limited' ? formatDate(formData.tenancyFrom) : '..........'}</span>
          <span>do</span>
          <span>{formData.tenancyDuration === 'limited' ? formatDate(formData.tenancyTo) : '..........'}</span>
          <span>nebo</span>
          <Checkbox checked={formData.tenancyDuration === 'unlimited'} label="na dobu bez omezení*)" />
        </div>

        <div className='pt-2'>
            <div className="border-2 border-black p-2 h-24">
                <p className='font-bold'>na adrese:</p>
                <div className='grid grid-cols-2 gap-x-4'>
                    <p>č. bytu: {formData.propertyAddress.apartmentNumber}</p>
                    <p>ulice + č.p.: {formData.propertyAddress.streetAndNumber}</p>
                </div>
                <p>PSČ + obec: {formData.propertyAddress.zipAndCity}</p>
            </div>
        </div>

        <div className="flex items-center">
            <span className="mr-2">vztah k nemovitosti, např. vlastník, spoluvlastník, nájemce, společný nájemce, podnájemce: *)</span>
            <span className='flex-grow border-b border-black'>{formData.relationshipToProperty}</span>
        </div>

        <div className="pt-4">
          <p className="font-bold">cizinci:</p>
          <div className="space-y-2">
            <LabeledField label="jméno a příjmení" value={formData.tenantName} />
            <div className='flex justify-between gap-4'>
                <LabeledField label="datum narození" value={formatDate(formData.tenantDob)} className="flex-grow" />
                <LabeledField label="státní příslušnost" value={formData.tenantNationality} className="flex-grow" />
            </div>
            <LabeledField label="cestovní doklad" value={formData.tenantPassportNumber} />
          </div>
        </div>

        <div className="pt-4 space-y-2 text-sm">
          <h2 className="font-bold">POUČENÍ:</h2>
          <p>
            Bude-li v tomto dokladu o zajištění ubytování uveden nepravdivě požadovaný údaj, může to mít za následek nevyhovění žádosti, o které se vede řízení podle zákona č. 326/1999 Sb., o pobytu cizinců na území České republiky a o změně některých zákonů, ve znění pozdějších předpisů
          </p>
        </div>

        <div className="flex items-center space-x-4 pt-8">
          <span>V</span>
          <span className='flex-grow border-b border-black text-center'>{formData.placeOfSigning}</span>
          <span>dne</span>
          <span className='flex-grow border-b border-black text-center'>{formatDate(formData.dateOfSigning)}</span>
        </div>

        <div className="pt-8 flex justify-end">
            <div className='w-1/2 space-y-1'>
                <div className='border-b border-black h-12'></div>
                <p className='text-xs'>Vlastnoruční podpis poskytovatele ubytování:</p>
                <p className="text-xs italic text-justify">
                    (v případě dlouhodobého víza, dlouhodobého pobytu a trvalého pobytu musí být podpis úředně ověřen nebo musí být doklad podepsán před pověřeným zaměstnancem Ministerstva vnitra)
                </p>
            </div>
        </div>


        <p className="pt-8 text-xs">*) Nehodící se škrtněte.</p>
      </div>
    </div>
  );
});
ProofOfAccommodationDocument.displayName = 'ProofOfAccommodationDocument';
