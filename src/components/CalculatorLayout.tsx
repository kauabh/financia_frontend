"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface CalculatorLayoutProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

export default function CalculatorLayout({ title, description, children }: CalculatorLayoutProps) {
    return (
        <main className="max-w-4xl mx-auto px-6 py-12 lg:py-20">
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-foreground/40 hover:text-foreground transition-colors mb-8 group"
            >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Back to Home
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl font-bold tracking-tight mb-2">{title}</h1>
                <p className="text-foreground/50 mb-12">{description}</p>
            </motion.div>

            <div className="grid md:grid-cols-[1fr_350px] gap-12 items-start">
                {children}
            </div>
        </main>
    );
}
