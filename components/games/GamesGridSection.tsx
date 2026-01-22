"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/shared/ProductCard";
import type { Product } from "@/types/product.interface";
import { Sparkles, Gamepad2, Trophy, Star } from "lucide-react";

interface GamesGridSectionProps {
  games: Product[];
}

export function GamesGridSection({ games }: GamesGridSectionProps) {
  if (!games || games.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Floating gaming icons */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            animate={{ y: [0, -12, 0], rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-10 hidden xl:block z-10"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-xl shadow-orange-500/30 flex items-center justify-center">
              <Gamepad2 className="w-7 h-7 text-white" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute bottom-20 right-20 hidden xl:block z-10"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl shadow-lg shadow-yellow-500/25 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            animate={{ scale: [1, 1.1, 1], rotate: [0, 15, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
            className="absolute top-8 left-1/4 hidden xl:block z-10"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg shadow-lg shadow-amber-500/25 flex items-center justify-center">
              <Star className="w-5 h-5 text-white fill-white" />
            </div>
          </motion.div>

          {/* Header */}
          <div className="max-w-2xl mb-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              OUR GAMES
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
            >
              Explore all our games
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 dark:text-slate-400 text-lg"
            >
              Explore our growing collection of games. Download free on Android
              and iOS.
            </motion.p>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="relative group"
              >
                {/* Card glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500" />
                <div className="relative">
                  <ProductCard product={game} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12 h-1 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
