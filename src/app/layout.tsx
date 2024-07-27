import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
import './globals.css';

const dmSans = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Todo List App',
  description:
    "Stay organized and productive with our simple yet powerful Todo List app. Easily create, edit, and complete tasks. Perfect for managing your daily to-do's.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={dmSans.className}>{children}</body>
    </html>
  );
}
