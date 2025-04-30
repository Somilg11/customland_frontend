/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { SectionEditor } from '../../components/SectionEditor';
import axios from 'axios';

export default function EditSectionPage() {
  const { id } = useParams();
  const router = useRouter();

  const [type, setType] = useState<'hero' | 'about' | 'logos' | 'footer' | null>(null);
  const [content, setContent] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/sections`)
      .then((res) => {
        const section = res.data.find((s: any) => s._id === id);
        if (!section) {
          alert('Section not found');
          router.push('/admin');
          return;
        }
        setType(section.type);
        setContent(section.content);
        setLoading(false);
      })
      .catch(() => {
        alert('Failed to load section');
        router.push('/admin');
      });
  }, [id, router]);

  const handleSave = async () => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/sections/${id}`, {
        content,
      });
      router.push('/admin');
    } catch (err) {
      console.error('Update failed', err);
      alert('Failed to update section');
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto py-10 space-y-6">
      <h2 className="text-2xl font-semibold">Edit &quot;{type}&quot; Section</h2>

      {/* 🔧 Pass type prop here */}
      {type && <SectionEditor content={content} setContent={setContent} type={type} />}

      <Button onClick={handleSave} className="w-full">
        Save Changes
      </Button>
    </div>
  );
}
