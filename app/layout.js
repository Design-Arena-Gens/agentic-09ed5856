export const metadata = {
  title: 'Chinese Dota 2 Players - Tier 1 Tournaments 2025',
  description: 'Find all Chinese Dota 2 players who participated in Liquipedia Tier 1 tournaments in 2025',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
