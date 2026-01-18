import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ReviewInbox from './components/ReviewInbox';
import CategoryManager from './components/CategoryManager';
import Analytics from './components/Analytics';
import { Transaction } from './types';

// Initial Mock Data
const INITIAL_DATA: Transaction[] = [
    {
        id: 'tx1',
        date: new Date().toISOString(),
        amount: 2450.00,
        bank: 'CBE',
        counterparty: 'Ethio Telecom',
        type: 'debit',
        category: 'Bills & Utilities',
        status: 'confirmed',
        vat: 15.50,
        serviceFee: 5.00
    },
    {
        id: 'tx2',
        date: new Date(Date.now() - 86400000).toISOString(),
        amount: 5000.00,
        bank: 'BOA',
        counterparty: 'ATM Withdrawal',
        type: 'debit',
        category: 'Cash',
        status: 'confirmed',
        serviceFee: 10.00
    },
    {
        id: 'tx3',
        date: new Date(Date.now() - 172800000).toISOString(),
        amount: 120.00,
        bank: 'Telebirr',
        counterparty: 'Cafe Latte',
        type: 'debit',
        category: 'Food & Dining',
        status: 'confirmed'
    }
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_DATA);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleNewTransaction = (tx: Transaction) => {
    setTransactions(prev => [tx, ...prev]);
    setActiveTab('dashboard');
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
        setIsSyncing(false);
        alert("Sync complete!");
    }, 1500);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard transactions={transactions} onSync={handleSync} onViewAllBudgets={() => setActiveTab('budgets')} />;
      case 'review':
        return <ReviewInbox onConfirm={handleNewTransaction} />;
      case 'budgets':
        return <CategoryManager transactions={transactions} />;
      case 'settings':
        return <div className="text-center text-slate-500 mt-20 p-10"><span className="material-symbols-outlined text-6xl mb-4">construction</span><br/>Settings Coming Soon</div>;
      default:
        return <Dashboard transactions={transactions} onSync={handleSync} onViewAllBudgets={() => setActiveTab('budgets')} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
       {isSyncing && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
               <div className="flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  <p className="text-white font-bold">Syncing with Bank...</p>
               </div>
           </div>
       )}
       {renderContent()}
    </Layout>
  );
};

export default App;