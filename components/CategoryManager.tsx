import React, { useState } from 'react';
import { Transaction } from '../types';
import { DEFAULT_CATEGORIES } from '../constants';

interface CategoryManagerProps {
    transactions: Transaction[];
}

const CategoryManager: React.FC<CategoryManagerProps> = ({ transactions }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white pb-32">
            
            {/* Header */}
            <header className="sticky top-0 z-30 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5">
                <div className="flex items-center p-4 justify-between max-w-md mx-auto">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary-blue" style={{ fontSize: '28px' }}>account_balance_wallet</span>
                        <h2 className="text-xl font-extrabold tracking-tight">Budgets</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="relative p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                        </button>
                        <button className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                            <span className="material-symbols-outlined">settings</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-md mx-auto">
                {/* Review Queue Banner */}
                <div className="m-4 p-4 bg-primary-blue/10 border border-primary-blue/20 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary-blue text-white rounded-lg p-2 flex items-center justify-center">
                            <span className="material-symbols-outlined text-sm">mail</span>
                        </div>
                        <div>
                            <p className="text-sm font-bold">Review Queue</p>
                            <p className="text-xs opacity-70">Check imported items</p>
                        </div>
                    </div>
                    <span className="material-symbols-outlined opacity-50">chevron_right</span>
                </div>

                {/* Summary Stats Card */}
                <div className="px-4 py-2">
                    <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-white/5">
                        <div className="flex justify-between items-start">
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">Total Monthly Spending</p>
                            <span className="text-xs font-bold px-2 py-1 bg-green-500/10 text-green-500 rounded-full">+5% vs last month</span>
                        </div>
                        <div className="mt-1">
                            <p className="text-3xl font-extrabold tracking-tight">$1,770 <span className="text-lg font-medium text-slate-400">/ $1,900</span></p>
                        </div>
                        <div className="w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-full mt-3 overflow-hidden">
                            <div className="bg-primary-blue h-full rounded-full" style={{ width: '93%' }}></div>
                        </div>
                    </div>
                </div>

                {/* Section Header */}
                <div className="flex items-center justify-between px-4 mt-6">
                    <h3 className="text-lg font-bold tracking-tight">Your Categories</h3>
                    <button className="text-primary-blue text-sm font-bold flex items-center gap-1">
                        View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                </div>

                {/* Categories List */}
                <div className="flex flex-col gap-4 p-4">
                    {/* Mock Cards matching HTML */}
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-white/5">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                                <span className="material-symbols-outlined filled">shopping_basket</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-bold text-lg">Groceries</h4>
                                    <span className="text-xs font-bold text-slate-400">75%</span>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">$450 / $600</p>
                            </div>
                        </div>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="bg-orange-500 h-full rounded-full" style={{ width: '75%' }}></div>
                        </div>
                    </div>

                     <div className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-white/5 ring-2 ring-red-500/50">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                                <span className="material-symbols-outlined filled">sports_esports</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-bold text-lg">Gaming</h4>
                                    <span className="text-xs font-bold text-red-500">OVER BUDGET</span>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">$120 / $100</p>
                            </div>
                        </div>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="bg-red-500 h-full rounded-full" style={{ width: '100%' }}></div>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-white/5">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                                <span className="material-symbols-outlined filled">home</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-bold text-lg">Rent</h4>
                                    <span className="text-xs font-bold text-slate-400">100%</span>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">$1,200 / $1,200</p>
                            </div>
                        </div>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }}></div>
                        </div>
                    </div>

                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="w-full p-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center gap-2 text-slate-400 hover:text-primary-blue hover:border-primary-blue transition-all"
                    >
                        <span className="material-symbols-outlined">add_circle</span>
                        <span className="font-bold">Add New Category</span>
                    </button>
                </div>
            </main>

            {/* Modal Dialog (iOS Bottom Sheet Style) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm animate-in fade-in">
                    <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-t-[2.5rem] p-6 pb-12 animate-in slide-in-from-bottom duration-300 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.3)]">
                        {/* Drag Indicator */}
                        <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-6"></div>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-extrabold tracking-tight">New Category</h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                                <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                        </div>
                        <div className="space-y-6">
                            {/* Name Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">Category Name</label>
                                <input className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-lg focus:ring-2 focus:ring-primary-blue outline-none" placeholder="e.g. Subscriptions" type="text"/>
                            </div>
                            {/* Monthly Limit Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">Monthly Budget Limit</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-400">$</span>
                                    <input className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 pl-8 text-lg focus:ring-2 focus:ring-primary-blue font-bold outline-none" placeholder="0.00" type="number"/>
                                </div>
                            </div>
                            {/* Icon Picker */}
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">Pick an Icon</label>
                                <div className="grid grid-cols-6 gap-3">
                                    <div className="aspect-square bg-primary-blue/20 text-primary-blue border-2 border-primary-blue rounded-xl flex items-center justify-center cursor-pointer">
                                        <span className="material-symbols-outlined">payments</span>
                                    </div>
                                    {['directions_car', 'restaurant', 'fitness_center', 'flight', 'more_horiz'].map(icon => (
                                        <div key={icon} className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center cursor-pointer text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700">
                                            <span className="material-symbols-outlined">{icon}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Action Button */}
                            <button className="w-full bg-primary-blue hover:bg-primary-blue/90 text-white font-extrabold py-4 rounded-2xl shadow-lg shadow-primary-blue/20 transition-all active:scale-[0.98] mt-4">
                                Create Category
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryManager;