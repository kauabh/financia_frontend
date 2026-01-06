"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { motion } from "framer-motion";

interface TaxSlab {
    slab: string;
    rate: string;
    tax: number;
}

interface SalaryResult {
    monthly_gross: number;
    in_hand: number;
    pf_deduction: number;
    employer_pf: number;
    income_tax: number;
    total_deductions: number;
    fixed_ctc: number;
    variable_amount: number;
    tax_breakdown: TaxSlab[];
}

export default function SalaryPage() {
    const [values, setValues] = useState({
        annual_ctc: 1200000,
        variable_pct: 10,
        epf_enabled: true,
        other_deductions: 0,
    });
    const [result, setResult] = useState<SalaryResult | null>(null);
    const [loading, setLoading] = useState(false);

    const calculate = async () => {
        setLoading(true);
        try {
            const res = await fetch("https://financia-mpo8.onrender.com/calculate/salary", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            const data = await res.json();
            setResult(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <CalculatorLayout
            title="Salary Calculator"
            description="Convert your Annual CTC into monthly in-hand salary with detailed deductions."
        >
            <div className="space-y-8 bg-surface p-8 rounded-2xl border border-border">
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-foreground/60">Annual CTC (₹)</label>
                    <input
                        type="number"
                        value={values.annual_ctc}
                        onChange={(e) => setValues({ ...values, annual_ctc: Number(e.target.value) })}
                        className="w-full bg-white border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5"
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-foreground/60">Variable Pay (%)</label>
                        <span className="text-sm font-bold">{values.variable_pct}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={values.variable_pct}
                        onChange={(e) => setValues({ ...values, variable_pct: Number(e.target.value) })}
                        className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-black"
                    />
                </div>

                <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-border">
                    <input
                        type="checkbox"
                        id="epf"
                        checked={values.epf_enabled}
                        onChange={(e) => setValues({ ...values, epf_enabled: e.target.checked })}
                        className="w-5 h-5 rounded border-border focus:ring-black accent-black"
                    />
                    <label htmlFor="epf" className="text-sm font-medium">Enable EPF Deduction (12% of Basic)</label>
                </div>

                <div className="space-y-4">
                    <label className="block text-sm font-medium text-foreground/60">Other Deductions (₹)</label>
                    <input
                        type="number"
                        value={values.other_deductions}
                        onChange={(e) => setValues({ ...values, other_deductions: Number(e.target.value) })}
                        className="w-full bg-white border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5"
                    />
                </div>

                <button
                    onClick={calculate}
                    disabled={loading}
                    className="w-full bg-black text-white rounded-xl py-4 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                    {loading ? "Calculating..." : "Calculate In-Hand Salary"}
                </button>
            </div>

            <div className="sticky top-8">
                {result ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white border border-border rounded-2xl p-8 space-y-6 shadow-sm"
                    >
                        <div className="space-y-1">
                            <span className="text-xs font-bold uppercase tracking-wider text-foreground/40">In-Hand Salary</span>
                            <div className="text-3xl font-bold text-green-600 font-inter">₹{result.in_hand.toLocaleString()}</div>
                            <p className="text-xs text-foreground/40">per month</p>
                        </div>

                        <div className="h-px bg-border" />

                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-foreground/50">Fixed CTC (Annual)</span>
                                <span className="font-semibold font-inter">₹{result.fixed_ctc.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-foreground/50">Variable (Annual)</span>
                                <span className="font-semibold font-inter">₹{result.variable_amount.toLocaleString()}</span>
                            </div>
                            <div className="h-px bg-border/50" />
                            <div className="flex justify-between text-sm">
                                <span className="text-foreground/50">Monthly Gross</span>
                                <span className="font-semibold font-inter">₹{result.monthly_gross.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm text-red-500">
                                <span>Employee PF</span>
                                <span className="font-inter">-₹{result.pf_deduction.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm text-red-500 font-normal">
                                <span className="flex flex-col">
                                    Employer PF
                                    <span className="text-[10px] text-foreground/30 italic">(Already deducted from CTC)</span>
                                </span>
                                <span className="font-inter">₹{result.employer_pf.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm text-red-500">
                                <span>Income Tax (Monthly)</span>
                                <span className="font-inter">-₹{result.income_tax.toLocaleString()}</span>
                            </div>
                            <div className="h-px bg-border/50" />
                            <div className="flex justify-between text-sm font-bold">
                                <span>Total Deductions</span>
                                <span className="font-inter">₹{result.total_deductions.toLocaleString()}</span>
                            </div>
                        </div>

                        {result.tax_breakdown.length > 0 && (
                            <div className="space-y-4 pt-4 border-t border-border">
                                <span className="text-xs font-bold uppercase tracking-wider text-foreground/40">Income Tax Breakdown (New Regime)</span>
                                <div className="space-y-2">
                                    {result.tax_breakdown.map((slab, i) => (
                                        <div key={i} className="flex justify-between text-xs text-foreground/60">
                                            <span>{slab.slab} ({slab.rate})</span>
                                            <span className="font-inter">₹{slab.tax.toLocaleString()}</span>
                                        </div>
                                    ))}
                                    <p className="text-[10px] text-foreground/30 italic mt-2">
                                        * Includes 4% Health & Education Cess. Standard deduction of ₹75,000 applied.
                                    </p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                ) : (
                    <div className="bg-surface/50 border border-dashed border-border rounded-2xl p-8 text-center text-foreground/30">
                        Enter your salary details to see the breakdown
                    </div>
                )}
            </div>
        </CalculatorLayout>
    );
}
