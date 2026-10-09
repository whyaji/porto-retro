"use client";

import React from "react";
import { useI18n } from "@/context/i18n-context";
import { pick, pickList } from "@/lib/data/company";
import { getProducts, isExternalLink, formatProductStatus } from "@/lib/data/products";
import type { ProductStatus } from "@/types/product";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  FiArrowRight,
  FiCheckCircle,
  FiCpu,
  FiUsers,
  FiFileText,
} from "react-icons/fi";

const statusVariant: Record<ProductStatus, "green" | "gold" | "outline"> = {
  live: "green",
  "in-development": "gold",
  planned: "outline",
};

const statusKey: Record<
  ProductStatus,
  "statusLive" | "statusInProgress" | "statusPlanned"
> = {
  live: "statusLive",
  "in-development": "statusInProgress",
  planned: "statusPlanned",
};

export const ProductsPageContent: React.FC = () => {
  const { t, locale } = useI18n();
  const products = getProducts();
  const copy = t.products;

  return (
    <div className="w-full py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          badge={copy.badge}
          title={copy.title}
          subtitle={copy.subtitle}
        />

        {/* Status legend */}
        <div className="bg-[var(--surface-light)] border-2 border-[var(--navy)] p-5 sm:p-6">
          <h4 className="font-mono text-xs font-bold text-[var(--navy)] uppercase tracking-wider">
            {"//"} {copy.statusLegendTitle}
          </h4>
          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
            {(["live", "in-development", "planned"] as const).map((status) => (
              <li
                key={status}
                className="flex items-start gap-2 p-3 bg-white border border-[var(--navy)]/20"
              >
                <Badge variant={statusVariant[status]} size="sm">
                  {formatProductStatus(status)}
                </Badge>
                <span className="text-[var(--navy)]/80">
                  {copy[statusKey[status]]}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Product cards */}
        <div className="space-y-8">
          {products.map((product) => {
            const link = product.link;
            return (
              <article
                key={product.id}
                className="bg-[var(--card)] border-2 border-[var(--navy)] retro-shadow p-6 sm:p-8"
                aria-labelledby={`product-${product.id}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b-2 border-[var(--navy)]">
                  <div className="space-y-1">
                    <h3
                      id={`product-${product.id}`}
                      className="font-display font-extrabold text-xl sm:text-2xl text-[var(--navy)]"
                    >
                      {pick(product.name, locale)}
                    </h3>
                    <p className="text-sm text-[var(--navy)]/75 font-sans leading-relaxed italic max-w-3xl">
                      {pick(product.tagline, locale)}
                    </p>
                  </div>
                  <Badge variant={statusVariant[product.status]} size="md">
                    {formatProductStatus(product.status)}
                  </Badge>
                </div>

                <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-8 space-y-5">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-[var(--navy)]/60 uppercase block mb-1">
                        {"//"} {copy.problemLabel}
                      </span>
                      <p className="text-sm text-[var(--navy)]/90 font-sans leading-relaxed">
                        {pick(product.problem, locale)}
                      </p>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] font-bold text-[var(--navy)]/60 uppercase flex items-center gap-1.5 mb-1">
                        <FiUsers className="w-3.5 h-3.5 text-[var(--green)]" />
                        {copy.usersLabel}
                      </span>
                      <p className="text-sm text-[var(--navy)]/90 font-sans leading-relaxed">
                        {pick(product.users, locale)}
                      </p>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] font-bold text-[var(--navy)]/60 uppercase flex items-center gap-1.5 mb-2">
                        <FiCheckCircle className="w-3.5 h-3.5 text-[var(--green)]" />
                        {copy.featuresLabel}
                      </span>
                      <ul className="space-y-2">
                        {pickList(product.features, locale).map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-2.5 text-sm text-[var(--navy)]/90 font-sans leading-relaxed"
                          >
                            <span
                              className="w-1.5 h-1.5 bg-[var(--gold)] border border-[var(--navy)] shrink-0 mt-2"
                              aria-hidden="true"
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-4">
                    <div className="bg-[var(--surface-light)] border border-[var(--navy)]/25 p-4">
                      <span className="font-mono text-[10px] font-bold text-[var(--navy)]/60 uppercase block mb-1">
                        {"//"} {copy.statusLabel}
                      </span>
                      <p className="text-xs text-[var(--navy)]/85 font-sans leading-relaxed">
                        {pick(product.statusNote, locale)}
                      </p>
                    </div>

                    <div className="bg-[var(--surface-light)] border border-[var(--navy)]/25 p-4">
                      <span className="font-mono text-[10px] font-bold text-[var(--navy)]/60 uppercase flex items-center gap-1.5 mb-1">
                        <FiCpu className="w-3.5 h-3.5 text-[var(--green)]" />
                        {copy.aiLabel}
                      </span>
                      <p className="text-xs text-[var(--navy)]/85 font-sans leading-relaxed">
                        {product.aiRole
                          ? pick(product.aiRole, locale)
                          : copy.noAi}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {product.tech.map((tech) => (
                        <Badge key={tech} variant="navy" size="sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {link && (
                      <Button
                        href={link}
                        external={isExternalLink(link)}
                        variant="gold"
                        size="md"
                        fullWidth
                        rightIcon={<FiArrowRight className="w-4 h-4" />}
                      >
                        {copy.openProduct}
                      </Button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="flex items-start gap-3 p-5 bg-[var(--surface-light)] border-2 border-[var(--navy)]">
          <FiFileText className="w-5 h-5 text-[var(--green)] shrink-0 mt-0.5" />
          <p className="text-sm text-[var(--navy)]/85 font-sans leading-relaxed">
            {copy.workNote}
          </p>
        </div>
      </div>
    </div>
  );
};
