import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Toaster } from "sonner";

export const metadata = {
  title: "Ticketo | Premium Event Discovery & Ticket Booking Platform",
  description:
    "Browse, discover, and purchase tickets for the finest premium events near you. Or create your own organizer account and host events seamlessly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-[#080c16] text-[#f3f4f6]">
        <Navbar />

        <main className="flex-grow flex flex-col">
          <PageTransition>
            {children}
          </PageTransition>
          <Toaster
            position="top-center"
            closeButton
            richColors
            toastOptions={{
              style: {
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
              },
            }}
          />
        </main>

        <Footer />
      </body>
    </html>
  );
}
