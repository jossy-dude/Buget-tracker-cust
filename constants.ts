import { BankConfig, BudgetCategory } from './types';

export const BANK_CONFIGS: Record<string, BankConfig> = {
  CBE: {
    name: 'CBE',
    color: 'bg-purple-600',
    gradient: 'from-purple-600 to-purple-900',
    logoShort: 'CB',
  },
  Telebirr: {
    name: 'Telebirr',
    color: 'bg-cyan-500',
    gradient: 'from-cyan-500 to-teal-700',
    logoShort: 'TB',
  },
  BOA: {
    name: 'BOA',
    color: 'bg-orange-500',
    gradient: 'from-orange-500 to-yellow-700',
    logoShort: 'BA',
  },
  Dashen: {
    name: 'Dashen',
    color: 'bg-blue-800',
    gradient: 'from-blue-800 to-indigo-900',
    logoShort: 'DB',
  },
  Bunna: {
    name: 'Bunna',
    color: 'bg-amber-800',
    gradient: 'from-amber-800 to-brown-900',
    logoShort: 'BB',
  },
  'Cash/Other': {
    name: 'Cash/Other',
    color: 'bg-slate-600',
    gradient: 'from-slate-600 to-slate-800',
    logoShort: 'CS',
  }
};

export const DEFAULT_CATEGORIES = [
  { id: '1', name: 'Food & Dining', icon: 'restaurant', color: 'bg-orange-500' },
  { id: '2', name: 'Transportation', icon: 'directions_car', color: 'bg-blue-500' },
  { id: '3', name: 'Shopping', icon: 'shopping_bag', color: 'bg-pink-500' },
  { id: '4', name: 'Bills & Utilities', icon: 'bolt', color: 'bg-yellow-500' },
  { id: '5', name: 'Entertainment', icon: 'local_cafe', color: 'bg-purple-500' },
  { id: '6', name: 'Health', icon: 'medical_services', color: 'bg-red-500' },
  { id: '7', name: 'Rent/Housing', icon: 'home', color: 'bg-green-500' },
  { id: '8', name: 'Transfer/Airtime', icon: 'smartphone', color: 'bg-cyan-500' },
  { id: '0', name: 'Uncategorized', icon: 'help', color: 'bg-slate-500' },
];