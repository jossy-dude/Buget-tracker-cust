export type TransactionType = 'credit' | 'debit';
export type BankName = 'CBE' | 'Telebirr' | 'BOA' | 'Dashen' | 'Bunna' | 'Cash/Other';

export interface Transaction {
  id: string;
  date: string; // ISO String
  amount: number;
  bank: BankName;
  counterparty: string;
  type: TransactionType;
  category: string; // Defaults to "undefined"
  status: 'pending' | 'confirmed';
  vat?: number;
  serviceFee?: number;
  originalText?: string;
}

export interface BankConfig {
  name: BankName;
  color: string;
  gradient: string;
  logoShort: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  limit: number;
  spent: number;
  icon: string;
  color: string;
}

export interface MonthlyStats {
  totalIncome: number;
  totalExpenses: number;
  fees: number;
}