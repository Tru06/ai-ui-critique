'use client';

interface Feedback {
  overall_score: number;
  ux_issues: string[];
  accessibility_issues: string[];
  color_feedback: string[];
  layout_feedback: string[];
  suggestions: string[];
}

interface CritiqueDisplayProps {
  feedback: Feedback | null;
  loading: boolean;
  error: string;
}

export default function CritiqueDisplay({ feedback, loading, error }: CritiqueDisplayProps) {
  const renderSection = (title: string, items: string[], icon: string, color: string) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{icon}</span>
          <h3 className={`text-lg font-semibold ${color}`}>{title}</h3>
        </div>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex gap-2 text-slate-700">
              <span className="text-slate-400 mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-slate-900 mb-6">AI Feedback</h2>
      
      <div className="min-h-[400px]">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="space-y-4 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-slate-600">Analyzing your design...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-red-600">
              <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>{error}</p>
            </div>
          </div>
        ) : feedback ? (
          <div className="space-y-6">
            {/* Overall Score */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Overall Score</p>
                  <p className="text-4xl font-bold text-slate-900">{feedback.overall_score}/10</p>
                </div>
                <div className="text-5xl">
                  {feedback.overall_score >= 8 ? '🌟' : feedback.overall_score >= 6 ? '👍' : '💡'}
                </div>
              </div>
            </div>

            {/* Feedback Sections */}
            <div className="space-y-6">
              {renderSection('UX Issues', feedback.ux_issues, '🎯', 'text-orange-700')}
              {renderSection('Accessibility Issues', feedback.accessibility_issues, '♿', 'text-red-700')}
              {renderSection('Color Feedback', feedback.color_feedback, '🎨', 'text-purple-700')}
              {renderSection('Layout Feedback', feedback.layout_feedback, '📐', 'text-blue-700')}
              {renderSection('Suggestions', feedback.suggestions, '💡', 'text-green-700')}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>Upload an image to receive AI feedback</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
