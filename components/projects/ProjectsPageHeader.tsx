"use client";

import React from "react";
import { useI18n } from "@/context/i18n-context";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { IS_COMPANY_MODE } from "@/lib/site-mode";

export const ProjectsPageHeader: React.FC = () => {
  const { t } = useI18n();

  return (
    <SectionHeader
      number="01"
      badge={IS_COMPANY_MODE ? "SELECTED WORK" : "PORTFOLIO REPOSITORY"}
      title={
        IS_COMPANY_MODE
          ? t.projects.title
          : "Project Catalog & Engineering Systems"
      }
      subtitle={
        IS_COMPANY_MODE
          ? t.projects.subtitle
          : "Explore 16 production systems spanning geospatial GIS platforms, offline-first mobile apps, and enterprise backends."
      }
    />
  );
};
