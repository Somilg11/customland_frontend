/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export const SectionEditor = ({
  content,
  setContent,
  type,
}: {
  content: any;
  setContent: (val: any) => void;
  type: 'hero' | 'about' | 'logos' | 'footer';
}) => {
  return (
    <div className="space-y-4 max-w-full">
      {/* Common Fields */}
      <Input
        placeholder="Title"
        value={content.title || ''}
        onChange={(e) => setContent({ ...content, title: e.target.value })}
        className="w-full sm:w-1/2"
      />
      <Textarea
        placeholder="Text or Description"
        value={content.text || ''}
        onChange={(e) => setContent({ ...content, text: e.target.value })}
        className="w-full sm:w-1/2"
      />

      {/* Image for About */}
      {type === 'about' && (
        <Input
          placeholder="Image URL"
          value={content.image || ''}
          onChange={(e) => setContent({ ...content, image: e.target.value })}
          className="w-full sm:w-1/2"
        />
      )}

      {/* Logos array input */}
      {type === 'logos' && (
        <div className="space-y-2">
          {(content.logos || []).map((logo: string, idx: number) => (
            <Input
              key={idx}
              placeholder={`Logo URL #${idx + 1}`}
              value={logo}
              onChange={(e) => {
                const updated = [...content.logos];
                updated[idx] = e.target.value;
                setContent({ ...content, logos: updated });
              }}
              className="w-full sm:w-1/2"
            />
          ))}
          <Button
            variant="outline"
            onClick={() => setContent({ ...content, logos: [...(content.logos || []), ''] })}
          >
            Add Logo
          </Button>
        </div>
      )}

      {/* Hero Buttons array */}
      {type === 'hero' && (
        <div className="space-y-2">
          {(content.buttons || []).map((btn: any, idx: number) => (
            <div key={idx} className="flex flex-col sm:flex-row gap-2 w-full sm:w-2/3">
              <Input
                placeholder="Button Label"
                value={btn.label}
                onChange={(e) => {
                  const updated = [...content.buttons];
                  updated[idx] = { ...btn, label: e.target.value };
                  setContent({ ...content, buttons: updated });
                }}
              />
              <Input
                placeholder="Button URL"
                value={btn.url}
                onChange={(e) => {
                  const updated = [...content.buttons];
                  updated[idx] = { ...btn, url: e.target.value };
                  setContent({ ...content, buttons: updated });
                }}
              />
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() =>
              setContent({ ...content, buttons: [...(content.buttons || []), { label: '', url: '' }] })
            }
          >
            Add CTA Button
          </Button>
        </div>
      )}
    </div>
  );
};
