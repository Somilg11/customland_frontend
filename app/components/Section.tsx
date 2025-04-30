/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type SectionProps = {
  section: {
    _id: string;
    type: 'hero' | 'about' | 'logos' | 'footer';
    content: any;
    order?: number;
  };
};

export const Section = ({ section }: SectionProps) => {
  const { type, content } = section;

  return (
    <div className={`${type === 'hero' ? 'bg-blue-50' : 'bg-white'}`}>
      {type === 'hero' && (
        <div className="text-center space-y-6 py-3">
          <h1 className="text-4xl font-bold">{content.title}</h1>
          <p className="text-lg">{content.text}</p>

          {/* Render CTA Buttons */}
          {content.buttons && content.buttons.map((button: any, idx: number) => (
            <Link key={idx} href={button.url}>
              <Button className="mt-4 mx-2" size="lg">{button.label}<ChevronRight/></Button>
            </Link>
          ))}
        </div>
      )}

      {type === 'about' && (
        <div className="text-center space-y-6 mx-2">
          <h2 className="text-3xl font-semibold">{content.title}</h2>
          <div className='flex items-center justify-center w-full mx-auto'>
          {content.image && <Image src={content.image} alt="About Image" className="mx-auto my-4 mx-w-md w-1/4 max-h-md h-1/4" width={96} height={96} />}
          <div className="w-full max-w-md mx-auto flex flex-col items-center justify-items-start">
          <p className="text-lg">{content.text}</p>
          <div className="mt-4">
            <Button variant="outline" size="sm">Learn More</Button>
          </div>
          </div>
          </div>
          
        </div>
      )}

      {type === 'logos' && (
        <div className="overflow-x-auto space-x-2 py-6 mx-1 flex items-end">
          <div className="flex items-center space-x-6">
            {content.logos?.map((logo: string, idx: number) => (
              <Image key={idx} src={logo} alt={`Logo ${idx + 1}`} className="h-10" width={64} height={44} />
            ))}
          </div>
          <h1 className='text-2xl font-bold'>{content.title}</h1>
        </div>
      )}

      {type === 'footer' && (
        <div className="text-center bg-black text-white">
          <div className="flex items-center justify-between mx-4 py-2">
          <h1 className='text-base'>{content.title}</h1>
          <p className="text-sm text-zinc-400">{content.text}</p>
          </div>
          <div className="space-x-4">
            {content.buttons?.map((button: any, idx: number) => (
              <Link key={idx} href={button.url}>
                <Button variant="outline" size="sm">{button.label}</Button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
