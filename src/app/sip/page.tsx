"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { motion } from "framer-motion";

interface SipResult {
    future_value: number;
    total_invested: number;
    wealth_gained: number;
}

export default function SipPage() {
    const [values, setValues] = useState({
        monthly_investment: 10000,
        annual_return_rate: 12,
        years: 10,
    });
    const [result, setResult] = useState<SipResult | null>(null);
    const [loading, setLoading] = useState(false);

    const calculate = async () => {
        setLoading(true);
        try {
            const res = await fetch("https://financia-mpo8.onrender.com/calculate/sip", {
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
            title="SIP Calculator"
            description="Calculate how much wealth you can create through regular monthly investments."
        >
            <div className="space-y-8 bg-surface p-8 rounded-2xl border border-border">
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-foreground/60">Monthly Investment (₹)</label>
                    <input
                        type="number"
                        value={values.monthly_investment}
                        onChange={(e) => setValues({ ...values, monthly_investment: Number(e.target.value) })}
                        className="w-full bg-white border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5"
                    />
                </div>
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-foreground/60">Expected Return Rate (% p.a)</label>
                    <input
                        type="number"
                        value={values.annual_return_rate}
                        onChange={(e) => setValues({ ...values, annual_return_rate: Number(e.target.value) })}
                        className="w-full bg-white border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5"
                    />
                </div>
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-foreground/60">Investment Period (Years)</label>
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
                    {loading ? "Calculating..." : "Calculate Returns"}
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
                            <span className="text-xs font-bold uppercase tracking-wider text-foreground/40">Expected Wealth</span>
                            <div className="text-3xl font-bold text-black font-inter">₹{result.future_value.toLocaleString()}</div>
                        </div>
                        <div className="h-px bg-border" />
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <span className="text-xs font-medium text-foreground/40">Invested</span>
                                <div className="text-lg font-semibold font-inter">₹{result.total_invested.toLocaleString()}</div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs font-medium text-foreground/40">Gains</span>
                                <div className="text-lg font-semibold font-inter">₹{result.wealth_gained.toLocaleString()}</div>
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
