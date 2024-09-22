
export const metadata = {
  title: 'ActFour Fitness',
  description: 'Track your fitness activities',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
