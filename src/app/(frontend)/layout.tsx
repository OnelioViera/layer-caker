import { SanityLive } from "@/sanity/lib/live";
import "@/app/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SanityLive />
        {children}
      </body>
    </html>
  );
}
