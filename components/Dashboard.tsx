'use client';

import Image from 'next/image';
import CircularProgress from './CircularProgress';

interface Feedback {
  overall_score: number;
  ux_issues: string[];
  accessibility_issues: string[];
  color_feedback: string[];
  layout_feedback: string[];
  suggestions: string[];
}

interface DashboardProps {
  imageUrl: string;
  feedback: Feedback;
  onNewAnalysis: () => void;
}

export default function Dashboard({ imageUrl, feedback, onNewAnalysis }: DashboardProps) {
  const renderFeedbackSection = (
    title: string,
    items: string[],
    icon: string,
    bgColor: string,
    textColor: string
  ) => {
    if (!items || items.length === 0) return null;

    return (
      <div className={`${bgColor} rounded-xl p-6 border border-slate-200`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl shadow-sm">
            {icon}
          </div>
          <h3 className={`text-lg font-semibold ${textColor}`}>{title}</h3>
          <span className={`ml-auto px-2 py-1 rounded-full text-xs font-medium bg-white ${textColor}`}>
            {items.length}
          </span>
        </div>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex gap-3">
              <div className={`w-1.5 h-1.5 rounded-full ${textColor.replace('text-', 'bg-')} mt-2 flex-shrink-0`} />
              <p className="text-slate-700 text-sm leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Design Analysis</h1>
            <p className="text-slate-600 text-sm">AI-powered UI/UX critique results</p>
          </div>
          <button
            onClick={onNewAnalysis}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            New Analysis
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Image */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Uploaded Design</h2>
              <div className="relative w-full h-96 bg-slate-100 rounded-xl overflow-hidden">
                <Image
                  src={imageUrl}
                  alt="Uploaded design"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Score Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-6 text-center">Overall Score</h2>
              <div className="flex justify-center">
                <CircularProgress score={feedback.overall_score} size={140} />
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm text-slate-600">
                  {feedback.overall_score >= 8 && "Excellent design quality"}
                  {feedback.overall_score >= 6 && feedback.overall_score < 8 && "Good design with room for improvement"}
                  {feedback.overall_score < 6 && "Needs significant improvements"}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Feedback */}
          <div className="space-y-6">
            {renderFeedbackSection(
              'UX Issues',
              feedback.ux_issues,
              '🎯',
              'bg-orange-50',
              'text-orange-700'
            )}

            {renderFeedbackSection(
              'Accessibility',
              feedback.accessibility_issues,
              '♿',
              'bg-red-50',
              'text-red-700'
            )}

            {renderFeedbackSection(
              'Color Feedback',
              feedback.color_feedback,
              '🎨',
              'bg-purple-50',
              'text-purple-700'
            )}

            {renderFeedbackSection(
              'Layout & Spacing',
              feedback.layout_feedback,
              '📐',
              'bg-blue-50',
              'text-blue-700'
            )}

            {renderFeedbackSection(
              'Recommendations',
              feedback.suggestions,
              '💡',
              'bg-green-50',
              'text-green-700'
            )}
          </div>
        </div>
      </div>
    </div>
  );
}