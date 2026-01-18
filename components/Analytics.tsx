import React from 'react';
import { Transaction } from '../types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

interface AnalyticsProps {
  transactions: Transaction[];
}

const Analytics: React.FC<AnalyticsProps> = ({ transactions }) => {
  // Data for Fees vs Spending
  const feeData = transactions.reduce((acc, t) => {
    const existing = acc.find(a => a.name === t.bank);
    const fees = (t.serviceFee || 0) + (t.vat || 0);
    if (existing) {
        existing.spending += t.amount;
        existing.fees += fees;
    } else {
        acc.push({ name: t.bank, spending: t.amount, fees: fees });
    }
    return acc;
  }, [] as any[]);

  // Category Data
  const categoryData = transactions
    .filter(t => t.type === 'debit')
    .reduce((acc, t) => {
        const cat = t.category === 'undefined' ? 'Uncat.' : t.category;
        const existing = acc.find(a => a.name === cat);
        if (existing) existing.value += t.amount;
        else acc.push({ name: cat, value: t.amount });
        return acc;
    }, [] as any[])
    .sort((a, b) => b.value - a.value);

  const COLORS = ['#22d3ee', '#818cf8', '#f472b6', '#fb923c', '#a78bfa'];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
        <h2 className="text-2xl font-bold text-white">Analytics</h2>

        {/* Fees Breakdown */}
        <div className="bg-slate-800/50 border border-white/5 rounded-3xl p-6">
            <h3 className="text-slate-300 font-medium mb-4">Bank Fees vs Spending</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={feeData} layout="vertical">
                        <XAxis type="number" hide />
                        <YAxis type="category" dataKey="name" stroke="#94a3b8" width={60} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', border: 'none' }} 
                            cursor={{fill: 'rgba(255,255,255,0.05)'}}
                        />
                        <Legend />
                        <Bar dataKey="spending" stackId="a" fill="#1e293b" radius={[0, 4, 4, 0]} name="Spending" />
                        <Bar dataKey="fees" stackId="a" fill="#f87171" radius={[0, 4, 4, 0]} name="Fees & VAT" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">Fees are visualized relative to total spending per bank.</p>
        </div>

        {/* Category Breakdown */}
        <div className="bg-slate-800/50 border border-white/5 rounded-3xl p-6">
            <h3 className="text-slate-300 font-medium mb-4">Spending by Category</h3>
            <div className="h-64 flex items-center justify-center">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', border: 'none' }} />
                    </PieChart>
                 </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
                {categoryData.slice(0, 4).map((cat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                        <span className="text-xs text-slate-300 truncate">{cat.name}</span>
                        <span className="text-xs text-white font-mono ml-auto">{cat.value.toLocaleString()}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default Analytics;