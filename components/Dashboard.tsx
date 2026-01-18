import React from 'react';
import { Transaction } from '../types';
import { BANK_CONFIGS } from '../constants';

interface DashboardProps {
  transactions: Transaction[];
  onSync: () => void;
  onViewAllBudgets: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ transactions, onSync, onViewAllBudgets }) => {
  const totalBalance = transactions
    .reduce((acc, t) => t.type === 'credit' ? acc + t.amount : acc - t.amount, 0);

  // Recent activity sorted by date
  const recentTx = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  return (
    <div className="flex flex-col gap-2 pb-6 pt-6">
      
      {/* TopAppBar */}
      <div className="flex flex-col gap-2 px-4">
        <div className="flex items-center h-12 justify-between">
          <div className="flex size-12 shrink-0 items-center">
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20 bg-slate-700 overflow-hidden">
                {/* Placeholder Avatar */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-blue-500 text-white font-bold">
                    AL
                </div>
            </div>
          </div>
          <div className="flex w-12 items-center justify-end">
            <button className="flex items-center justify-center rounded-xl h-12 w-12 bg-transparent text-slate-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-[28px]">settings</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-2">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Good Morning, Alex</p>
          <h1 className="text-slate-900 dark:text-white text-3xl font-extrabold leading-tight">Dashboard</h1>
        </div>
      </div>

      {/* Sync Status ActionPanel */}
      <div className="px-4 py-4 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-slate-200 dark:border-white/5 bg-surface-light dark:bg-surface-dark p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 text-primary">
              <span className="material-symbols-outlined text-[24px]">mark_email_read</span>
            </div>
            <div className="flex flex-col">
              <p className="text-slate-900 dark:text-white text-sm font-bold leading-tight">Sync Status</p>
              <p className="text-slate-500 dark:text-[#93c8b6] text-xs font-normal leading-normal">Last synced: Just now</p>
            </div>
          </div>
          <button 
            onClick={onSync}
            className="flex w-full sm:w-auto cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-primary text-[#11221c] text-sm font-bold leading-normal hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-[18px] mr-2">refresh</span>
            <span className="truncate">Refresh</span>
          </button>
        </div>
      </div>

      {/* Main Balance Card */}
      <div className="px-4 pb-2">
        <div className="relative overflow-hidden flex flex-col items-stretch justify-end rounded-2xl pt-8 pb-6 px-6 shadow-lg bg-surface-light dark:bg-surface-dark border border-slate-100 dark:border-transparent">
          {/* Abstract Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"></div>
          
          <div className="relative z-10 flex w-full flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <p className="text-slate-500 dark:text-slate-300 text-sm font-medium leading-normal">Total Available Balance</p>
                <h2 className="text-slate-900 dark:text-white text-4xl font-extrabold tracking-tight">
                    ETB {totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h2>
              </div>
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-100 dark:bg-[#253831] text-slate-900 dark:text-white">
                <span className="material-symbols-outlined">account_balance_wallet</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1">
                <span className="material-symbols-outlined text-emerald-600 dark:text-primary text-[16px]">trending_up</span>
                <span className="text-emerald-700 dark:text-primary text-xs font-bold">+12%</span>
              </div>
              <span className="text-slate-400 dark:text-slate-500 text-xs font-medium">vs last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section Header: Budgets */}
      <div className="flex items-center justify-between px-4 pt-6 pb-3">
        <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Budgets</h3>
        <button onClick={onViewAllBudgets} className="text-primary text-sm font-semibold hover:text-primary/80">View All</button>
      </div>

      {/* Carousel: Budgets (Mock Data for Visuals) */}
      <div className="flex overflow-x-auto pb-4 pl-4 gap-4 no-scrollbar snap-x snap-mandatory">
        
        {/* Card 1 */}
        <div className="flex flex-col gap-3 min-w-[160px] w-[160px] snap-start">
          <div className="p-4 rounded-2xl bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-white/5 flex flex-col gap-3 h-full justify-between">
            <div className="flex justify-between items-start">
              <div className="bg-orange-100 dark:bg-orange-500/20 p-2 rounded-lg text-orange-600 dark:text-orange-400">
                <span className="material-symbols-outlined text-[20px]">restaurant</span>
              </div>
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500">75%</span>
            </div>
            <div>
              <p className="text-slate-900 dark:text-white text-base font-bold">Food</p>
              <p className="text-slate-500 dark:text-[#93c8b6] text-xs font-medium mt-1">ETB 450 / 600</p>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-[#11221c] rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-orange-400 w-3/4 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col gap-3 min-w-[160px] w-[160px] snap-start">
          <div className="p-4 rounded-2xl bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-white/5 flex flex-col gap-3 h-full justify-between">
            <div className="flex justify-between items-start">
              <div className="bg-blue-100 dark:bg-blue-500/20 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                <span className="material-symbols-outlined text-[20px]">directions_car</span>
              </div>
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500">60%</span>
            </div>
            <div>
              <p className="text-slate-900 dark:text-white text-base font-bold">Transport</p>
              <p className="text-slate-500 dark:text-[#93c8b6] text-xs font-medium mt-1">ETB 120 / 200</p>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-[#11221c] rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-blue-400 w-[60%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col gap-3 min-w-[160px] w-[160px] snap-start">
          <div className="p-4 rounded-2xl bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-white/5 flex flex-col gap-3 h-full justify-between">
            <div className="flex justify-between items-start">
              <div className="bg-purple-100 dark:bg-purple-500/20 p-2 rounded-lg text-purple-600 dark:text-purple-400">
                <span className="material-symbols-outlined text-[20px]">home</span>
              </div>
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500">100%</span>
            </div>
            <div>
              <p className="text-slate-900 dark:text-white text-base font-bold">Rent</p>
              <p className="text-slate-500 dark:text-[#93c8b6] text-xs font-medium mt-1">Paid</p>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-[#11221c] rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-primary w-full rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-1 shrink-0"></div>
      </div>

      {/* Section Header: Recent Activity */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Recent Activity</h3>
        <button className="text-primary text-sm font-semibold hover:text-primary/80">See All</button>
      </div>

      {/* List: Recent Activity */}
      <div className="flex flex-col px-4 gap-3">
        {recentTx.length === 0 ? (
           <p className="text-slate-500 text-center py-4 text-sm">No recent transactions</p>
        ) : (
          recentTx.map(tx => {
             const bankConfig = BANK_CONFIGS[tx.bank] || BANK_CONFIGS['Cash/Other'];
             const isCredit = tx.type === 'credit';
             
             return (
              <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-light dark:bg-surface-dark border border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full ${isCredit ? 'bg-primary/10 dark:bg-primary/20 text-emerald-600 dark:text-primary' : 'bg-slate-100 dark:bg-[#253831] text-slate-600 dark:text-slate-400'} flex items-center justify-center shrink-0`}>
                    <span className="material-symbols-outlined text-[20px]">
                      {isCredit ? 'payments' : 'shopping_bag'}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-slate-900 dark:text-white text-sm font-bold">{tx.counterparty || tx.category}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">
                      {new Date(tx.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} • {bankConfig.name}
                    </p>
                  </div>
                </div>
                <p className={`font-bold text-sm ${isCredit ? 'text-emerald-600 dark:text-primary' : 'text-slate-900 dark:text-white'}`}>
                  {isCredit ? '+' : '-'}{tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
              </div>
             );
          })
        )}
      </div>

    </div>
  );
};

export default Dashboard;