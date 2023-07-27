import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Flexibble",
  description: "Showcase and discover remarkable developer projects",
};

//Home Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        {/* {children} represents the page.tsx file */}
        <Footer />
      </body>
    </html>
  );
}
