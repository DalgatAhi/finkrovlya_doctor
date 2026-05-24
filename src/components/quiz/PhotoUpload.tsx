import { useRef, ChangeEvent } from 'react';

interface PhotoUploadProps {
  photos: string[];
  onChange: (photos: string[]) => void;
}

export function PhotoUpload({ photos, onChange }: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const remaining = 5 - photos.length;
    const toProcess = files.slice(0, remaining);

    toProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        onChange([...photos, result]);
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  }

  function removePhoto(index: number) {
    onChange(photos.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-4">
      {/* Upload zone */}
      {photos.length < 5 && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`
            w-full rounded-2xl border-2 border-dashed p-6
            flex flex-col items-center gap-3 transition-all
            ${
              photos.length === 0
                ? 'border-brand-blue/30 bg-brand-gradient-soft hover:border-brand-blue/50'
                : 'border-gray-200 bg-gray-50 hover:border-gray-300'
            }
          `}
        >
          <div className="w-12 h-12 rounded-2xl bg-brand-gradient flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 16l4-4 4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 12v8" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M20 16.58A5 5 0 0018 7h-1.26A8 8 0 104 15.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="text-center">
            <p className="font-semibold text-gray-800">
              {photos.length === 0 ? 'Загрузить фото' : `Добавить ещё (${photos.length}/5)`}
            </p>
            <p className="text-sm text-gray-500 mt-0.5">JPG, PNG до 10 МБ каждое</p>
          </div>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Hints */}
      {photos.length === 0 && (
        <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
          <p className="text-sm text-amber-800 font-medium mb-1">Что лучше сфотографировать:</p>
          <ul className="text-sm text-amber-700 space-y-0.5">
            <li>• место протечки или пятна на потолке</li>
            <li>• участок крыши с улицы</li>
            <li>• стык, трубу или водосток</li>
          </ul>
        </div>
      )}

      {/* Previews */}
      {photos.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {photos.map((src, i) => (
            <div key={i} className="relative group aspect-square rounded-xl overflow-hidden">
              <img src={src} alt={`Фото ${i + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(i)}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 1l8 8M9 1L1 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          ))}
          {photos.length < 5 && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="aspect-square rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center hover:border-gray-300 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 4v12M4 10h12" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      )}

      <p className="text-xs text-gray-400 text-center">
        Чем подробнее фото, тем точнее предварительный разбор
      </p>
    </div>
  );
}
