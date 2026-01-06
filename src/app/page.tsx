"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, Wallet, Banknote } from "lucide-react";

const calculators = [
  {
    id: "sip",
    name: "SIP Calculator",
    description: "Systematic Investment Plan for wealth building.",
    icon: <TrendingUp className="w-6 h-6" />,
    href: "/sip",
  },
  {
    id: "swp",
    name: "SWP Calculator",
    description: "Systematic Withdrawal Plan for regular income.",
    icon: <Wallet className="w-6 h-6" />,
    href: "/swp",
  },
  {
    id: "fd",
    name: "FD Calculator",
    description: "Fixed Deposit for guaranteed returns.",
    icon: <Banknote className="w-6 h-6" />,
    href: "/fd",
  },
  {
    id: "salary",
    name: "Salary Calculator",
    description: "Calculate your monthly in-hand salary with deductions.",
    icon: <Wallet className="w-6 h-6" />,
    href: "/salary",
  },
];

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-20 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-20 text-center"
      >
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
          Simple Finance.
        </h1>
        <p className="text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
          Planning your future should be calm. Choose a calculator to get started with your financial goals.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {calculators.map((calc, idx) => (
          <motion.div
            key={calc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Link href={calc.href} className="calculator-card group h-full">
              <div className="p-3 bg-white rounded-xl border border-border group-hover:bg-black group-hover:text-white transition-colors duration-300">
                {calc.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{calc.name}</h3>
                <p className="text-foreground/50 leading-relaxed text-sm">
                  {calc.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
