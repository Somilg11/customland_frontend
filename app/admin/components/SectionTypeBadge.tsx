export const SectionTypeBadge = ({ type }: { type: string }) => {
    const map: Record<string, string> = {
      hero: 'bg-blue-100 text-blue-800',
      about: 'bg-green-100 text-green-800',
      logos: 'bg-yellow-100 text-yellow-800',
      footer: 'bg-gray-200 text-gray-800',
    };
  
    return (
      <span
        className={`text-xs px-2 py-1 rounded ${map[type] ?? 'bg-gray-100 text-gray-800'}`}
      >
        {type}
      </span>
    );
  };
  