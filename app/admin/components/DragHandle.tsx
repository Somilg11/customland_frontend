import { GripVertical } from 'lucide-react';

export const DragHandle = () => {
  return (
    <div className="cursor-grab active:cursor-grabbing p-2 text-gray-400 hover:text-gray-600">
      <GripVertical className="h-5 w-5" />
    </div>
  );
};
