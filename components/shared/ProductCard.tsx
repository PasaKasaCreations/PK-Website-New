"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product.interface";
import { motion } from "framer-motion";
import { Smartphone, Apple, Shield } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden group border-2 hover:border-orange-500 hover:shadow-2xl transition-all duration-300">
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-orange-100 to-blue-50 dark:from-orange-950 dark:to-blue-950">
          <Image
            src={product.thumbnail_url || "/placeholder-game.jpg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {product.status === "coming_soon" && (
            <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg">
              Coming Soon
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <CardContent className="flex-1 p-6 bg-gradient-to-b from-white to-orange-50/30 dark:from-gray-900 dark:to-orange-950/10">
          <h3 className="text-2xl font-bold mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm font-semibold text-orange-600 dark:text-orange-400 mb-3">
            {product.tagline}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {product.description}
          </p>
        </CardContent>

        <CardFooter className="p-6 pt-0 flex flex-col gap-3 bg-gradient-to-b from-orange-50/30 to-white dark:from-orange-950/10 dark:to-gray-900">
          <div className="flex gap-3 w-full">
            {product.play_store_url && (
              <Link
                href={product.play_store_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button
                  size="lg"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white group/btn shadow-md hover:shadow-lg"
                >
                  <Smartphone className="h-4 w-4 mr-2" />
                  <span>Play Store</span>
                </Button>
              </Link>
            )}
            {product.app_store_url && (
              <Link
                href={product.app_store_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button
                  size="lg"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white group/btn shadow-md hover:shadow-lg"
                >
                  <Apple className="h-4 w-4 mr-2" />
                  <span>App Store</span>
                </Button>
              </Link>
            )}
          </div>
          {product.category === "game" && (
            <Link
              href={`/games/${product.slug}/privacy-policy`}
              className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Shield className="h-3 w-3" />
              <span>Privacy Policy</span>
            </Link>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
