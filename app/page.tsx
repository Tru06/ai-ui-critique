'use client';

import { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';
import Dashboard from '@/components/Dashboard';
import LoadingAnalysis from '@/components/LoadingAnalysis';

interface Feedback {
  overall_score: number;
  ux_issues: string[];
  accessibility_issues: string[];
  color_feedback: string[];
  layout_feedback: string[];
  suggestions: string[];
}

export default function Home() {
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [showDashboard, setShowDashboard] = useState(false);

  const handleImageUpload = async (file: File) => {
    setLoading(true);
    setError('');
    setFeedback(null);

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setImageUrl(previewUrl);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      setFeedback(data);
      setShowDashboard(true);
    } catch (err) {
      console.error('Error analyzing image:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error analyzing image. Please try again.';
      setError(errorMessage);
      URL.revokeObjectURL(previewUrl);
      setImageUrl('');
    } finally {
      setLoading(false);
    }
  };

  const handleNewAnalysis = () => {
    setShowDashboard(false);
    setFeedback(null);
    setError('');
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
      setImageUrl('');
    }
  };

  // Show loading analysis screen
  if (loading && imageUrl) {
    return <LoadingAnalysis imageUrl={imageUrl} />;
  }

  // Show dashboard if we have feedback and image
  if (showDashboard && feedback && imageUrl) {
    return (
      <Dashboard
        imageUrl={imageUrl}
        feedback={feedback}
        onNewAnalysis={handleNewAnalysis}
      />
    );
  }

  // Show upload interface with smooth transitions
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 transition-all duration-500">
      <div className="max-w-6xl mx-auto p-8">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-slate-900 mb-4 animate-slide-up">
            AI UI Critique Assistant
          </h1>
          <p className="text-lg text-slate-600 animate-slide-up delay-100">
            Upload a screenshot and get instant AI-powered design feedback
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 animate-fade-in delay-200">
          <div className="transform transition-all duration-300 hover:scale-105">
            <ImageUpload onUpload={handleImageUpload} loading={loading} />
          </div>
          
          {/* Feedback Preview */}
          <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">AI Feedback</h2>
            
            <div className="min-h-[400px]">
              {error ? (
                <div className="flex items-center justify-center h-full animate-fade-in">
                  <div className="text-center text-red-600">
                    <svg className="w-12 h-12 mx-auto mb-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="animate-slide-up">{error}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400 animate-fade-in">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-4 text-slate-300 animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="animate-pulse">Upload an image to receive AI feedback</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
