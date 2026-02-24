"use client"
import { useState } from 'react';

interface AerialMeasurementToolProps {
    city?: string;
    stateCode?: string;
}

export default function AerialMeasurementTool({ city, stateCode }: AerialMeasurementToolProps) {
    const locationText = city ? `${city}${stateCode ? `, ${stateCode.toUpperCase()}` : ''}` : 'your area';
    const [step, setStep] = useState(0);
    const [address, setAddress] = useState('');

    const startScan = (e: React.FormEvent) => {
        e.preventDefault();
        if (!address) return;
        setStep(1);

        // Simulate steps
        setTimeout(() => setStep(2), 2500);
        setTimeout(() => setStep(3), 5000);
    };

    const reset = () => {
        setStep(0);
        setAddress('');
    };

    return (
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative border border-slate-800 my-8">
            <style>{`
        @keyframes scan {
          0% { top: 0; }
          50% { top: 100%; }
          100% { top: 0; }
        }
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>

            <div className="text-center mb-8 relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Try GutterScope / RoofScope+</h3>
                <p className="text-slate-400">See how precise aerial measurements work instantly for homes in {locationText}.</p>
            </div>

            <div className="max-w-xl mx-auto relative z-10 flex flex-col items-center min-h-[300px] justify-center">
                {step === 0 && (
                    <form onSubmit={startScan} className="w-full animate-fadeIn transition-all duration-500">
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder={`Enter an address (e.g., 123 Main St${city ? `, ${city}, ${stateCode?.toUpperCase() || ''}` : ', Orlando, FL'})`}
                                className="flex-grow px-5 py-4 rounded-xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/50 bg-white shadow-inner"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 whitespace-nowrap shadow-lg shadow-blue-600/30"
                            >
                                Scan Now
                            </button>
                        </div>
                    </form>
                )}

                {step === 1 && (
                    <div className="w-full text-center space-y-6 animate-fadeIn">
                        <div className="relative w-32 h-32 mx-auto">
                            <div className="absolute inset-0 border-4 border-blue-500/30 rounded-2xl grid place-items-center bg-slate-800">
                                <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </div>
                            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_15px_#22d3ee] rounded-full animate-scan"></div>
                        </div>
                        <h4 className="text-xl font-bold text-white">Scanning Aerial Imagery...</h4>
                        <p className="text-slate-400">Analyzing rooflines, pitch, and gutter lengths via Scope Technologies.</p>
                    </div>
                )}

                {step === 2 && (
                    <div className="w-full text-center space-y-6 animate-fadeIn">
                        <div className="relative w-32 h-32 mx-auto">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <svg className="animate-spin h-16 w-16 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                        </div>
                        <h4 className="text-xl font-bold text-white">Calculating Measurements...</h4>
                        <p className="text-slate-400">Applying slope calculations and identifying downspout locations.</p>
                    </div>
                )}

                {step === 3 && (
                    <div className="w-full animate-fadeIn bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
                        <div className="flex items-center justify-between mb-6 border-b border-slate-700 pb-4">
                            <h4 className="text-lg font-bold text-white flex items-center gap-2">
                                <span className="text-green-400 font-bold text-xl">✓</span> Scan Complete
                            </h4>
                            <button onClick={reset} className="text-sm text-slate-400 hover:text-white transition-colors underline">Start Over</button>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-left">
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Total Linear Feet</p>
                                <p className="text-2xl font-bold text-blue-400">184 ft</p>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Downspouts Required</p>
                                <p className="text-2xl font-bold text-cyan-400">6</p>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Corners (Miters)</p>
                                <p className="text-2xl font-bold text-emerald-400">8</p>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Estimated Slope</p>
                                <p className="text-2xl font-bold text-blue-400">4.6 in</p>
                            </div>
                        </div>
                        <div className="mt-6 text-center">
                            <button className="bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-xl transition-all border border-white/10 w-full mb-2">
                                View GutterScope Sample Report
                            </button>
                            <button className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 font-medium py-3 px-6 rounded-xl transition-all border border-emerald-500/20 w-full">
                                View RoofScope+ Sample Report
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Decorative background effects */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-3xl z-0">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20"></div>
            </div>
        </div>
    );
}
