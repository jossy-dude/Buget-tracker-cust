import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white pb-24">
      
      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-md mx-auto">
        {children}
      </main>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-md border-t border-slate-200 dark:border-white/5 pb-safe pt-2 px-6 z-50">
        <div className="flex justify-between items-center h-16 max-w-md mx-auto">
          
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'dashboard' ? 'text-primary' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
          >
            <span className={`material-symbols-outlined ${activeTab === 'dashboard' ? 'filled' : ''}`}>dashboard</span>
            <span className="text-[10px] font-medium">Home</span>
          </button>

          <button 
             onClick={() => setActiveTab('review')}
             className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'review' ? 'text-primary' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
          >
            <span className={`material-symbols-outlined ${activeTab === 'review' ? 'filled' : ''}`}>receipt_long</span>
            <span className="text-[10px] font-medium">Transact</span>
          </button>

          <div className="relative -top-6">
            <button 
              onClick={() => setActiveTab('review')} // Shortcuts to add/review
              className="h-14 w-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/40 text-[#11221c] hover:scale-105 transition-transform"
            >
              <span className="material-symbols-outlined text-[32px]">add</span>
            </button>
          </div>

          <button 
             onClick={() => setActiveTab('budgets')}
             className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'budgets' ? 'text-primary' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
          >
            <span className={`material-symbols-outlined ${activeTab === 'budgets' ? 'filled' : ''}`}>pie_chart</span>
            <span className="text-[10px] font-medium">Stats</span>
          </button>

          <button 
             onClick={() => setActiveTab('settings')}
             className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'settings' ? 'text-primary' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
          >
            <span className={`material-symbols-outlined ${activeTab === 'settings' ? 'filled' : ''}`}>person</span>
            <span className="text-[10px] font-medium">Profile</span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default Layout;