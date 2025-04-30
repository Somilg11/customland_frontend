/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionTypeBadge } from './SectionTypeBadge';
import { Trash2, Pencil } from 'lucide-react';
import axios from 'axios';
import { DragHandle } from './DragHandle';
import toast from 'react-hot-toast';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const SectionCard = ({ section }: { section: any }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: section._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this section?')) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/sections/${section._id}`);
      toast.success('Section deleted successfully!');
      window.location.reload(); // Or ideally, update state in parent
    } catch (err) {
      toast.error('Error deleting section.');
      console.error('Delete error:', err);
    }
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="touch-none">
      <Card className="shadow-md border rounded-md">
        <CardContent className="flex items-center justify-between p-4">
          {/* Drag handle with listeners */}
          <div {...listeners}>
            <DragHandle />
          </div>

          <div className="flex-1 ml-2">
            <h2 className="text-lg font-semibold capitalize">{section.type}</h2>
            <SectionTypeBadge type={section.type} />
          </div>

          <div className="flex gap-2">
            <Link href={`/admin/${section._id}/edit`}>
              <Button size="sm" variant="secondary">
                <Pencil className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </Link>
            <Button size="sm" variant="destructive" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
