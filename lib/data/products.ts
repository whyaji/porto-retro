import productsRaw from "@/assets/products.json";
import type { ProductEntry, ProductStatus } from "@/types/product";

export const productEntries: ProductEntry[] = productsRaw as ProductEntry[];

export function getProducts(): ProductEntry[] {
  return productEntries;
}

export function getProductsByStatus(status: ProductStatus): ProductEntry[] {
  return productEntries.filter((product) => product.status === status);
}

/** External links start with http, internal product links do not. */
export function isExternalLink(link: string): boolean {
  return link.startsWith("http");
}

/** Renders a status for display, e.g. "in-development" -> "IN DEVELOPMENT". */
export function formatProductStatus(status: ProductStatus): string {
  return status.replace("-", " ").toUpperCase();
}
