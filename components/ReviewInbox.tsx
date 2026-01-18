import React, { useState } from 'react';
import { Transaction, BankName } from '../types';
import { BANK_CONFIGS } from '../constants';
import { parseSMSBody } from '../services/parserLogic';

interface ReviewInboxProps {
  onConfirm: (transaction: Transaction) => void;
}

const ReviewInbox: React.FC<ReviewInboxProps> = ({ onConfirm }) => {
  const [filter, setFilter] = useState<'All' | BankName>('All');
  const [parsedTx, setParsedTx] = useState<Transaction | null>(null);
  const [manualInput, setManualInput] = useState('');
  
  // Demo parsed state (Simulating a state where parsing happened)
  const [activeTab, setActiveTab] = useState<'parser' | 'manual'>('parser');

  const handleParse = () => {
     if (!manualInput) return;
     const result = parseSMSBody(manualInput);
     if (result) {
         setParsedTx(result);
     } else {
         alert("Could not parse transaction.");
     }
  };

  const confirmTransaction = (tx: Transaction) => {
      onConfirm({ ...tx, status: 'confirmed' });
      setParsedTx(null);
      setManualInput('');
  };

  return (
    <div className="min-h-screen relative w-full pb-32">
       {/* Background Noise/Mesh */}
       <div className="fixed inset-0 z-0 pointer-events-none opacity-30 mix-blend-soft-light bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>
       <div className="fixed inset-0 z-0 mesh-gradient opacity-80"></div>

       <div className="relative z-10 flex flex-col gap-4">
          
          {/* Header */}
          <div className="sticky top-0 z-40 bg-background-dark/80 backdrop-blur-xl border-b border-white/5">
             <div className="flex items-center justify-between px-4 py-4">
                <div className="flex items-center gap-3">
                    <button className="rounded-full p-2 hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-slate-300">chevron_left</span>
                    </button>
                    <div>
                        <h2 className="text-lg font-extrabold leading-tight tracking-tight text-white">Review Inbox</h2>
                        <div className="flex items-center gap-2">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Parser Online</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <button 
                        onClick={() => setActiveTab(activeTab === 'parser' ? 'manual' : 'parser')}
                        className={`flex items-center justify-center rounded-full w-10 h-10 transition-colors ${activeTab === 'manual' ? 'bg-primary-blue text-white' : 'hover:bg-white/10 text-slate-300'}`}
                    >
                        <span className="material-symbols-outlined">{activeTab === 'manual' ? 'edit_note' : 'auto_awesome'}</span>
                    </button>
                </div>
             </div>

             {/* Filters */}
             <div className="flex gap-2 px-4 pb-4 overflow-x-auto no-scrollbar">
                <button onClick={() => setFilter('All')} className={`flex h-9 items-center gap-2 rounded-full px-4 transition-all ${filter === 'All' ? 'bg-white shadow-lg shadow-white/5 text-slate-900' : 'bg-white/5 border border-white/10 text-slate-300'}`}>
                    <span className="text-xs font-extrabold">All Banks</span>
                    {filter === 'All' && <span className="bg-slate-900/10 rounded-full px-2 py-0.5 text-[10px] font-bold">Active</span>}
                </button>
                <button onClick={() => setFilter('CBE')} className={`flex h-9 items-center gap-2 rounded-full px-4 transition-all ${filter === 'CBE' ? 'bg-white text-slate-900' : 'bg-white/5 border border-white/10 text-slate-300'}`}>
                    <span className="w-2 h-2 rounded-full bg-cbe-purple"></span>
                    <span className="text-xs font-bold">CBE</span>
                </button>
                <button onClick={() => setFilter('Telebirr')} className={`flex h-9 items-center gap-2 rounded-full px-4 transition-all ${filter === 'Telebirr' ? 'bg-white text-slate-900' : 'bg-white/5 border border-white/10 text-slate-300'}`}>
                    <span className="w-2 h-2 rounded-full bg-tele-cyan"></span>
                    <span className="text-xs font-bold">Telebirr</span>
                </button>
             </div>
          </div>

          <main className="flex flex-col gap-4 p-4 min-h-[50vh]">
             
             {activeTab === 'manual' && (
                 <div className="bg-surface-dark/40 backdrop-blur-md rounded-3xl border border-white/10 p-5 animate-in fade-in slide-in-from-top-4">
                     <h3 className="text-white font-bold mb-2">Paste SMS Text</h3>
                     <textarea 
                        value={manualInput}
                        onChange={(e) => setManualInput(e.target.value)}
                        placeholder="Paste transaction SMS here..."
                        className="w-full bg-black/30 text-white rounded-xl border border-white/10 p-3 h-32 text-sm mb-4 focus:ring-2 focus:ring-primary-blue outline-none"
                     />
                     <button 
                        onClick={handleParse}
                        className="w-full h-12 rounded-xl bg-primary-blue text-white font-bold shadow-lg shadow-blue-500/30"
                     >
                         Analyze Text
                     </button>
                 </div>
             )}

             {/* If we have a parsed transaction, show it */}
             {parsedTx && (
                 <TransactionReviewCard transaction={parsedTx} onConfirm={confirmTransaction} />
             )}

             {/* Fallback Empty State if nothing is parsing */}
             {!parsedTx && activeTab === 'parser' && (
                 <div className="text-center py-10 opacity-50">
                     <span className="material-symbols-outlined text-4xl mb-2 text-slate-400">inbox</span>
                     <p className="text-slate-400 text-sm">No new SMS detected in clipboard.<br/>Switch to manual mode or paste text.</p>
                 </div>
             )}

          </main>

          {/* Bulk Action Footer */}
          <div className="fixed bottom-0 left-0 right-0 p-6 z-50 pointer-events-none pb-28">
             <div className="flex flex-col gap-3 items-center">
                {parsedTx && (
                    <button 
                        onClick={() => confirmTransaction(parsedTx)}
                        className="pointer-events-auto flex h-16 w-full max-w-sm items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cbe-purple via-boa-blue to-tele-cyan text-white shadow-2xl shadow-indigo-500/40 transition-all active:scale-95 hover:shadow-indigo-500/60"
                    >
                        <div className="flex flex-col items-start leading-tight">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Parser Review</span>
                            <span className="text-sm font-black">Confirm Transaction</span>
                        </div>
                        <div className="h-8 w-px bg-white/20 mx-2"></div>
                        <span className="material-symbols-outlined text-2xl">verified</span>
                    </button>
                )}
             </div>
          </div>

       </div>
    </div>
  );
};

const TransactionReviewCard: React.FC<{ transaction: Transaction, onConfirm: (t: Transaction) => void }> = ({ transaction, onConfirm }) => {
    const isDebit = transaction.type === 'debit';
    const config = BANK_CONFIGS[transaction.bank] || BANK_CONFIGS['Cash/Other'];
    
    // Determine color theme based on bank
    let themeColor = 'bg-slate-500'; 
    let textColor = 'text-slate-500';
    if (transaction.bank === 'CBE') { themeColor = 'bg-cbe-purple'; textColor = 'text-cbe-purple'; }
    if (transaction.bank === 'Telebirr') { themeColor = 'bg-tele-cyan'; textColor = 'text-tele-cyan'; }
    if (transaction.bank === 'BOA') { themeColor = 'bg-boa-blue'; textColor = 'text-boa-blue'; }

    return (
        <article className="relative bg-surface-dark/40 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-elevation-2 transition-all animate-in zoom-in-95">
            <div className={`absolute top-0 left-0 w-1.5 h-full ${themeColor}`}></div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className={`h-11 w-11 rounded-2xl ${themeColor} flex items-center justify-center shadow-lg`}>
                            <span className="text-white font-black text-[10px]">{config.logoShort}</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-white font-bold text-base">{config.name}</h3>
                                <span className={`${themeColor} bg-opacity-20 ${textColor} text-[9px] font-black px-1.5 py-0.5 rounded border border-white/10 uppercase tracking-tighter`}>Verified</span>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-0.5 font-medium">Extracted via Parser • Now</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">99.2% Conf.</span>
                    </div>
                </div>

                <div className="flex items-end justify-between mb-5">
                    <div>
                        <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1 block">Amount & Type</span>
                        <div className="flex items-baseline gap-2">
                            <h1 className={`text-3xl font-black tracking-tight ${isDebit ? 'text-red-500' : 'text-emerald-400'}`}>
                                {isDebit ? '-' : '+'}{transaction.amount.toLocaleString()}
                            </h1>
                            <span className="text-xs font-bold text-slate-400">ETB</span>
                        </div>
                        <div className="mt-1 flex items-center gap-1.5">
                            <span className={`material-symbols-outlined text-[14px] ${isDebit ? 'text-red-400' : 'text-emerald-400'}`}>
                                {isDebit ? 'arrow_outward' : 'south_west'}
                            </span>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${isDebit ? 'text-red-400' : 'text-emerald-400'}`}>
                                {isDebit ? 'Debit Transaction' : 'Credit Transaction'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-black/30 rounded-2xl p-4 border border-white/5 mb-4 group relative">
                    <span className="absolute top-3 right-4 text-[9px] font-bold text-slate-600 font-mono">RAW_LOG</span>
                    <p className="text-xs font-mono text-slate-400 leading-relaxed pr-8">
                        <span className="text-slate-300">{transaction.bank}:</span> {transaction.originalText || "No raw text available"}
                    </p>
                </div>
            </div>
        </article>
    );
};

export default ReviewInbox;