import { Transaction, BankName, TransactionType } from '../types';

// Regex patterns ported from the Python script
const DEC_AMOUNT = '((?:\\d{1,3}(?:,\\d{3})*|\\d+)(?:\\.\\d+)?)';

interface Template {
  name: BankName;
  identifiers: string[];
  patterns: {
    amount: RegExp[];
    account: RegExp[];
    balance: RegExp[];
    transaction_id: RegExp[];
  }
}

const TEMPLATES: Template[] = [
  {
    name: 'CBE',
    identifiers: ['CBE', 'Commercial Bank of Ethiopia', 'Current Balance is ETB'],
    patterns: {
      amount: [
        new RegExp(`You have transfer(?:ed|red) ETB\\s*${DEC_AMOUNT}`, 'i'),
        new RegExp(`credited with ETB\\s*${DEC_AMOUNT}`, 'i'),
        new RegExp(`debited with ETB\\s*${DEC_AMOUNT}`, 'i'),
      ],
      account: [new RegExp('account\\s*([0-9\\*\\-]+)', 'i')],
      balance: [new RegExp(`Current Balance is ETB\\s*${DEC_AMOUNT}`, 'i')],
      transaction_id: [new RegExp('id=([A-Za-z0-9\\-_&=]+)', 'i'), new RegExp('Ref No\\s*([A-Z0-9]+)', 'i')],
    }
  },
  {
    name: 'Telebirr',
    identifiers: ['127', 'telebirr', 'ethio telecom'],
    patterns: {
      amount: [new RegExp(`ETB\\s*${DEC_AMOUNT}`, 'i')],
      account: [new RegExp('Account\\s*([0-9\\*\\-]+)', 'i')],
      balance: [],
      transaction_id: [new RegExp('transaction number is\\s*([A-Z0-9\\-]+)', 'i')],
    }
  },
  {
    name: 'BOA',
    identifiers: ['Bank of Abyssinia', 'boa'],
    patterns: {
      amount: [
        new RegExp(`was (?:credited|debited) with ETB\\s*${DEC_AMOUNT}`, 'i'),
        new RegExp(`has been (?:credited|debited) with ETB\\s*${DEC_AMOUNT}`, 'i')
      ],
      account: [new RegExp('account\\s*([0-9\\*\\-]+)', 'i')],
      balance: [],
      transaction_id: [new RegExp('trx=([A-Z0-9]+)', 'i')],
    }
  },
  {
    name: 'Dashen',
    identifiers: ['Dashen', 'Dashen Super App'],
    patterns: {
      amount: [
        new RegExp(`is credited with ETB\\s*${DEC_AMOUNT}`, 'i'),
        new RegExp(`has been debited with ETB\\s*${DEC_AMOUNT}`, 'i'),
        new RegExp(`ETB\\s*${DEC_AMOUNT}`, 'i'), // Fallback
      ],
      account: [new RegExp('account\\s*[\'"]?([0-9\\*\\-]+)[\'"]?', 'i')],
      balance: [],
      transaction_id: [new RegExp('receipt/([A-Za-z0-9/_\\-=]+)', 'i')],
    }
  },
  {
    name: 'Bunna',
    identifiers: ['Bunna Bank'],
    patterns: {
      amount: [
        new RegExp(`Withdrawal of\\s*${DEC_AMOUNT}\\s*ETB`, 'i'),
        new RegExp(`A Withdrawal of\\s*${DEC_AMOUNT}\\s*ETB`, 'i'),
        new RegExp(`A Deposit of\\s*${DEC_AMOUNT}\\s*ETB`, 'i'),
        new RegExp(`has been debited with ETB\\s*${DEC_AMOUNT}`, 'i'),
      ],
      account: [new RegExp('account\\s*([0-9\\*\\-]+)', 'i')],
      balance: [],
      transaction_id: [new RegExp('receipt.*trx=([A-Z0-9]+)', 'i')],
    }
  }
];

function safeFloat(str: string): number {
  if (!str) return 0.0;
  const clean = str.replace(/,/g, '');
  const match = clean.match(/(-?\d+(?:\.\d+)?)/);
  return match ? parseFloat(match[1]) : 0.0;
}

function extractBank(body: string): BankName | null {
  for (const t of TEMPLATES) {
    if (t.identifiers.some(id => body.toLowerCase().includes(id.toLowerCase()))) {
      return t.name;
    }
  }
  return null;
}

function extractAmount(body: string, template: Template): number {
  for (const pat of template.patterns.amount) {
    const m = body.match(pat);
    if (m && m[1]) return safeFloat(m[1]);
  }
  // Fallback generic
  const fallback = body.match(new RegExp(`ETB\\s*${DEC_AMOUNT}`, 'i'));
  if (fallback && fallback[1]) return safeFloat(fallback[1]);
  return 0.0;
}

function determineType(body: string, amount: number): TransactionType {
  const low = body.toLowerCase();
  if (low.includes('credit') || low.includes('received') || low.includes('deposit')) return 'credit';
  if (low.includes('debit') || low.includes('withdraw') || low.includes('transfer')) return 'debit';
  // Fallback based on logic (usually spending apps treat input as debit if positive for expenses)
  // But here we want explicit types.
  return 'debit';
}

function extractCounterparty(body: string): string {
  // Simplified version of the Python counterparty logic
  const patterns = [
    /to\s+([A-Z][A-Za-z\.\'\-\s]{1,80}?)\s+on/i,
    /from\s+([A-Z][A-Za-z\.\'\-\s]{1,80}?)\s+on/i,
    /credited by\s+([A-Z][A-Za-z\.\'\-\s]{1,80}?)\b/i,
    /by\s+([A-Z][A-Za-z\.\'\-\s]{1,80}?)\s*\./i,
    /to\s+(.+?)\s+account number/i
  ];

  for (const pat of patterns) {
    const m = body.match(pat);
    if (m && m[1]) {
      return m[1].trim();
    }
  }
  return "Unknown Counterparty";
}

function extractVatAndFees(body: string): { vat: number, fee: number } {
  let vat = 0;
  let fee = 0;

  // Simple matches for demo purposes
  const vatMatch = body.match(/VAT(?:\s*(?:of)?)\s*(?:ETB)?\s*([0-9,]+(?:\.\d+)?)/i);
  if (vatMatch) vat = safeFloat(vatMatch[1]);

  const feeMatch = body.match(/(?:Service charge|fee)\s*(?:ETB)?\s*([0-9,]+(?:\.\d+)?)/i);
  if (feeMatch) fee = safeFloat(feeMatch[1]);

  return { vat, fee };
}

export const parseSMSBody = (body: string): Transaction | null => {
  const bank = extractBank(body);
  if (!bank) return null;

  const template = TEMPLATES.find(t => t.name === bank)!;
  let amount = extractAmount(body, template);
  const type = determineType(body, amount);

  // CashFlow AI Logic: Debits are negative for math, but we store absolute amount and use 'type'
  // In the Python script, it returned negative. Here we will keep amount positive and use type flag for UI.
  
  const { vat, fee } = extractVatAndFees(body);
  const counterparty = extractCounterparty(body);

  // Generate a random ID for demo
  const id = Math.random().toString(36).substring(2, 9);

  return {
    id,
    date: new Date().toISOString(),
    amount: Math.abs(amount),
    bank,
    counterparty,
    type,
    category: 'undefined',
    status: 'pending',
    vat,
    serviceFee: fee,
    originalText: body
  };
};