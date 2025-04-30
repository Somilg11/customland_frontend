'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { SectionEditor } from '../components/SectionEditor';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function NewSectionPage() {
  const [type, setType] = useState<'hero' | 'about' | 'logos' | 'footer'>('hero');
  const [content, setContent] = useState({
    title: '',
    text: '',
    buttons: [], // ✅ Add this to ensure hero buttons work
  });
  
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/sections`, {
        type,
        content,
      });
      router.push('/admin'); // Redirect to admin page after section is created
      toast.success('Section created successfully!');
    } catch (err) {
      console.error('Failed to create section:', err);
      toast.error('Failed to create section. Please try again.');
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 space-y-6">
      <h2 className="text-2xl font-semibold">Create New Section</h2>

      <select
        className="w-full p-2 border rounded"
        value={type}
        onChange={(e) => setType(e.target.value as 'hero' | 'about' | 'logos' | 'footer')}
      >
        <option value="hero">Hero</option>
        <option value="about">About</option>
        <option value="logos">Logos</option>
        <option value="footer">Footer</option>
      </select>

      <SectionEditor content={content} setContent={setContent} type={type} />

      <Button onClick={handleSubmit} className="w-full">
        Create Section
      </Button>

      {/* Manage button to go to the admin page */}
      <Button
        variant="outline"
        onClick={() => router.push('/admin')} // Redirect to the admin page
        className="w-full mt-4"
      >
        Manage Sections
      </Button>
    </div>
  );
}
