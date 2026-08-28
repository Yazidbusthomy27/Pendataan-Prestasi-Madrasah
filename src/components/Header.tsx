import React from 'react';
import { BookOpen } from 'lucide-react';

export default function Header({ title }: { title: string }) {
  return (
    <header className="bg-emerald-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
        <div className="w-12 h-12 flex-shrink-0">
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Kementerian_Agama_new_logo.png" alt="Logo Kemenag" className="w-full h-full object-contain drop-shadow-sm" />
        </div>
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="text-emerald-100 text-sm">Kementerian Agama Kabupaten Jember</p>
        </div>
      </div>
    </header>
  );
}
