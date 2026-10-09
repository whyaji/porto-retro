import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { IS_COMPANY_MODE, IS_PRODUCTS_ENABLED } from "@/lib/site-mode";
import { pageMetadata } from "@/lib/seo";
import { ProductsPageContent } from "@/components/products/ProductsPageContent";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = pageMetadata(
  {
    title: "Projects & Systems Catalogue",
    description:
      "The project catalogue of Wahyu Patriaji: production web, mobile, and backend systems.",
    path: "/products",
  },
  {
    title: "Products",
    description:
      "Patriaworks products with honest development status: a CBT practice app running in production, and document summarization and extraction tools in development.",
    path: "/products",
  },
);

export default function ProductsPage() {
  if (!IS_COMPANY_MODE) {
    redirect("/projects");
  }

  // Hidden behind the products flag for now; the code stays in place.
  if (!IS_PRODUCTS_ENABLED) {
    redirect("/");
  }

  return (
    <div className="w-full flex flex-col">
      <ProductsPageContent />
      <ContactCTA />
    </div>
  );
}
