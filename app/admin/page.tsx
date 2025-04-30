/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { DndContext, useSensor, useSensors, PointerSensor, closestCorners } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';

import { SectionCard } from './components/SectionCard';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

type Section = {
  _id: string;
  type: 'hero' | 'about' | 'logos' | 'footer';
  content: any;
  order: number;
};

export default function AdminDashboard() {
  const [sections, setSections] = useState<Section[]>([]);
  const router = useRouter(); // Use the router to redirect the user

  // Initialize sensors for drag-and-drop
  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    // Fetch sections from API
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/sections`)
      .then((res) => setSections(res.data))
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  // Handle the end of a drag event
  const handleDragEnd = async ({ active, over }: any) => {
    if (!over || active.id === over.id) return;

    const oldIndex = sections.findIndex((s) => s._id === active.id);
    const newIndex = sections.findIndex((s) => s._id === over.id);

    const newOrder = arrayMove(sections, oldIndex, newIndex);
    setSections(newOrder);

    // Send updated order to backend
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/sections/reorder`, {
      order: newOrder.map((s, idx) => ({ id: s._id, order: idx })), // Create {id, order} pair for each section
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Button to go to the new section page */}
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="default"
          onClick={() => router.push('/admin/new')} // Navigate to the new section page
          className="mt-4"
        >
          Create New Section
        </Button>

        <Button
          variant="default"
          onClick={() => router.push('/')} // Navigate to the homepage
          className="mt-4"
        >
          Home
        </Button>
      </div>

      {/* Section List with Drag-and-Drop */}
      <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <SortableContext items={sections.map((s) => s._id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {sections.map((section) => (
              <SectionCard key={section._id} section={section} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
