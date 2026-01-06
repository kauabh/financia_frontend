"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { motion } from "framer-motion";

interface FdResult {
    maturity_value: number;
    total_investment: number;
    interest_earned: number;
}

export default function FdPage() {
    const [values, setValues] = useState({
        principal: 100000,
        annual_interest_rate: 6.5,
        years: 5,
    });
    const [result, setResult] = useState<FdResult | null>(null);
    const [loading, setLoading] = useState(false);

    const calculate = async () => {
        setLoading(true);
        try {
            const res = await fetch("https://financia-mpo8.onrender.com/calculate/fd", {
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
            title="FD Calculator"
            description="Calculate the maturity value of your fixed deposit with quarterly compounding."
        >
            <div className="space-y-8 bg-surface p-8 rounded-2xl border border-border">
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-foreground/60">Principal Amount (₹)</label>
                    <input
                        type="number"
                        value={values.principal}
                        onChange={(e) => setValues({ ...values, principal: Number(e.target.value) })}
                        className="w-full bg-white border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5"
                    />
                </div>
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-foreground/60">Annual Interest Rate (% p.a)</label>
                    <input
                        type="number"
                        value={values.annual_interest_rate}
                        onChange={(e) => setValues({ ...values, annual_interest_rate: Number(e.target.value) })}
                        className="w-full bg-white border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5"
                    />
                </div>
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-foreground/60">Period (Years)</label>
                    <input
                        type="number"
                        value={values.years}
                        onChange={(e) => setValues({ ...values, years: Number(e.target.value) })}
                        className="w-full bg-white border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5"
                    />
                </div>
                <button
                    onClick={calculate}
                    disabled={loading}
                    className="w-full bg-black text-white rounded-xl py-4 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                    {loading ? "Calculating..." : "Calculate Maturity"}
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
                            <span className="text-xs font-bold uppercase tracking-wider text-foreground/40">Maturity Value</span>
                            <div className="text-3xl font-bold text-black font-inter">₹{result.maturity_value.toLocaleString()}</div>
                        </div>
                        <div className="h-px bg-border" />
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <span className="text-xs font-medium text-foreground/40">Investment</span>
                                <div className="text-lg font-semibold font-inter">₹{result.total_investment.toLocaleString()}</div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs font-medium text-foreground/40">Interest</span>
                                <div className="text-lg font-semibold font-inter">₹{result.interest_earned.toLocaleString()}</div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <div className="bg-surface/50 border border-dashed border-border rounded-2xl p-8 text-center text-foreground/30">
                        Enter values to see projection
                    </div>
                )}
            </div>
        </CalculatorLayout>
    );
}

