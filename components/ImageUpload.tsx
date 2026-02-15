'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  onUpload: (file: File) => void;
  loading: boolean;
}

export default function ImageUpload({ onUpload, loading }: ImageUploadProps) {
  const [preview, setPreview] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  const handleRemove = () => {
    setPreview('');
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-slate-900 mb-6">Upload Screenshot</h2>
      
      <div
        onClick={() => !preview && fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          isDragging
            ? 'border-blue-500 bg-blue-50 scale-105 shadow-lg'
            : preview
            ? 'border-slate-200'
            : 'border-slate-300 cursor-pointer hover:border-blue-400 hover:bg-slate-50 hover:scale-102'
        }`}
      >
        {preview ? (
          <div className="space-y-4 animate-fade-in">
            <div className="relative w-full h-80 bg-slate-100 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-contain transition-all duration-300"
              />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="text-sm text-slate-500 hover:text-slate-700 underline transition-colors duration-200 transform hover:scale-105"
              disabled={loading}
            >
              Remove image
            </button>
          </div>
        ) : (
          <div className="space-y-4 py-8 animate-fade-in">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-110 animate-float">
              <svg
                className="w-8 h-8 text-blue-600 transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <div className="animate-slide-up">
              <p className="text-lg text-slate-700 font-medium">
                Drop your image here, or <span className="text-blue-600 hover:text-blue-700 transition-colors duration-200">browse</span>
              </p>
              <p className="text-sm text-slate-500 mt-2 animate-slide-up delay-100">
                Supports: PNG, JPG, GIF (max 10MB)
              </p>
            </div>
          </div>
        )}
      </div>

      {preview && (
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span className="animate-pulse">Analyzing...</span>
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <span>Analyze Design</span>
            </>
          )}
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={loading}
      />
    </div>
  );
}
