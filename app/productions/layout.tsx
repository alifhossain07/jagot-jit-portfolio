import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Productions",
  description:
    "Explore Jagot Jit's full production catalog featuring professional music production and engineering work.",
  alternates: {
    canonical: "/productions",
  },
  openGraph: {
    title: "Productions | Jagot Jit",
    description:
      "Explore Jagot Jit's full production catalog featuring professional music production and engineering work.",
    url: "/productions",
    images: [
      {
        url: "/images/jagot2.jpg",
        width: 1200,
        height: 630,
        alt: "Jagot Jit productions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Productions | Jagot Jit",
    description:
      "Explore Jagot Jit's full production catalog featuring professional music production and engineering work.",
    images: ["/images/jagot2.jpg"],
  },
};

export default function ProductionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
