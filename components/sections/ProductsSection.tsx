"use client";

import React from "react";
import { useI18n } from "@/context/i18n-context";
import { pick } from "@/lib/data/company";
import { getProducts, isExternalLink, formatProductStatus } from "@/lib/data/products";
import type { ProductStatus } from "@/types/product";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FiArrowRight, FiCpu, FiStar } from "react-icons/fi";

const statusVariant: Record<ProductStatus, "green" | "gold" | "outline"> = {
  live: "green",
  "in-development": "gold",
  planned: "outline",
};

export const ProductsSection: React.FC = () => {
  const { t, locale } = useI18n();
  const products = getProducts();
  const copy = t.products;

  return (
    <section className="w-full py-16 md:py-24 border-b-2 border-[var(--navy)] bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={copy.badge}
          title={copy.title}
          subtitle={copy.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const link = product.link;
            return (
              <article
                key={product.id}
                className="bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow p-5 sm:p-6 flex flex-col transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-3 pb-3 border-b-2 border-[var(--navy)]">
                  <h3 className="font-display font-extrabold text-lg text-[var(--navy)] leading-snug">
                    {pick(product.name, locale)}
                  </h3>
                  <Badge variant={statusVariant[product.status]} size="sm">
                    {formatProductStatus(product.status)}
                  </Badge>
                </div>

                <p className="mt-3 text-sm text-[var(--navy)]/75 font-sans leading-relaxed italic">
                  {pick(product.tagline, locale)}
                </p>

                <p className="mt-3 text-xs text-[var(--navy)]/70 font-sans leading-relaxed flex-1">
                  {pick(product.statusNote, locale)}
                </p>

                <div className="mt-4 pt-4 border-t border-[var(--navy)]/10 flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] font-bold text-[var(--navy)]/55 uppercase">
                    {product.tech[0]}
                  </span>
                  {link && (
                    <Button
                      href={link}
                      external={isExternalLink(link)}
                      variant="outline"
                      size="sm"
                      rightIcon={<FiArrowRight className="w-3.5 h-3.5" />}
                    >
                      {copy.openProduct}
                    </Button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[var(--surface-light)] border-2 border-[var(--navy)]">
          <div className="flex items-start gap-3">
            <FiStar className="w-5 h-5 text-[var(--green)] shrink-0 mt-0.5" />
            <p className="text-sm text-[var(--navy)]/85 font-sans leading-relaxed max-w-3xl">
              {copy.homeNote}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Button
              href="/ai"
              variant="outline"
              size="md"
              leftIcon={<FiCpu className="w-4 h-4" />}
            >
              {t.ai.badge}
            </Button>
            <Button
              href="/products"
              variant="gold"
              size="md"
              rightIcon={<FiArrowRight className="w-4 h-4" />}
            >
              {copy.viewAll}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
