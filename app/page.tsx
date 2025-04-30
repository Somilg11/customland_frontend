/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { Section as SectionComponent } from './components/Section';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type SectionType = {
  _id: string;
  type: 'hero' | 'about' | 'logos' | 'footer';
  content: any;
  order?: number;
  buttons?: string[];
};

export default function HomePage() {
  const [sections, setSections] = useState<SectionType[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/sections`)
      .then((res) => setSections(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="space-y-5">
      <div className="mt-4 mx-2 bg-black text-white rounded-md p-2">
        <Button>
          <Link href="/admin/new">
            Admin
          </Link>
        </Button>
      </div>

      {sections.map((section) => (
        <SectionComponent key={section._id} section={section} />
      ))}
    </div>
  );
}
