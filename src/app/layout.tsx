import "@/styles/globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "BUET Premier League",
  description:
    "Create your ultimate team and compete in the BUET Fantasy Premier League",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#1f2937",
                color: "#fff",
                border: "1px solid #374151",
              },
              success: {
                style: {
                  background: "#10B981",
                },
              },
              error: {
                style: {
                  background: "#EF4444",
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
