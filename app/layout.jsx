import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800"] });

export const metadata = { title: "CSE Memory database", description: "Rebuild the club's memories, one photo at a time." };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <div className="bubbles" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5].map((i) => <span key={i} className={`bubble b${i}`} />)}
        </div>
        {children}
      </body>
    </html>
  );
}
