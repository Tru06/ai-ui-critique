'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface LoadingAnalysisProps {
  imageUrl: string;
}

export default function LoadingAnalysis({ imageUrl }: LoadingAnalysisProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { label: 'Processing image...', icon: '📸', duration: 2000 },
    { label: 'Analyzing visual hierarchy...', icon: '🎯', duration: 3000 },
    { label: 'Checking accessibility...', icon: '♿', duration: 2500 },
    { label: 'Evaluating color scheme...', icon: '🎨', duration: 2000 },
    { label: 'Reviewing layout...', icon: '📐', duration: 2500 },
    { label: 'Generating insights...', icon: '💡', duration: 3000 }
  ];

  useEffect(() => {
    const totalDuration = 15000; // 15 seconds total
    const interval = 100; // Update every 100ms
    const increment = 100 / (totalDuration / interval);

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return Math.min(prev + increment, 100);
      });
    }, interval);

    return () => clearInterval(progressTimer);
  }, []);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 2500);

    return () => clearInterval(stepInterval);
  }, [steps.length]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h1 className="text-2xl font-bold text-white mb-2">AI Analysis in Progress</h1>
            <p className="text-blue-100">Our AI is carefully reviewing your design...</p>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left: Image Preview */}
              <div className="space-y-6">
                <div className="relative">
                  <div className="relative w-full h-80 bg-slate-100 rounded-2xl overflow-hidden border-2 border-dashed border-slate-300">
                    <Image
                      src={imageUrl}
                      alt="Design being analyzed"
                      fill
                      className="object-contain"
                    />
                    {/* Scanning overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-pulse">
                      <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-scan" />
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Analysis Progress</span>
                    <span className="text-slate-900 font-medium">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Analysis Steps */}
              <div className="space-y-6">
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
                        index === currentStep
                          ? 'bg-blue-50 border-2 border-blue-200 scale-105'
                          : index < currentStep
                          ? 'bg-green-50 border-2 border-green-200'
                          : 'bg-slate-50 border-2 border-slate-200'
                      }`}
                    >
                      <div className={`text-2xl transition-all duration-300 ${
                        index === currentStep ? 'animate-bounce' : ''
                      }`}>
                        {index < currentStep ? '✅' : step.icon}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium transition-colors duration-300 ${
                          index === currentStep
                            ? 'text-blue-700'
                            : index < currentStep
                            ? 'text-green-700'
                            : 'text-slate-600'
                        }`}>
                          {step.label}
                        </p>
                      </div>
                      {index === currentStep && (
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-75" />
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-150" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* AI Brain Animation */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center animate-pulse">
                      <span className="text-3xl">🧠</span>
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-20 animate-ping" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}