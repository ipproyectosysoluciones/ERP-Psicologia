import { useState } from 'react';
import { LeadForm } from './LeadForm';

export function LeadFormFloatingButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-full shadow-xl hover:bg-blue-700 transition-all hover:scale-105"
      >
        <span className="text-xl">💬</span>
        <span className="font-medium">Contactar</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="w-full max-w-md">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow hover:bg-gray-100 text-gray-500"
            >
              ✕
            </button>
            <LeadForm
              origen="landing-web"
              variant="modal"
              onSuccess={() => setTimeout(() => setOpen(false), 2000)}
            />
          </div>
        </div>
      )}
    </>
  );
}