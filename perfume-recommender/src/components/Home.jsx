import React from 'react';
import Header from './Header';
import BgHolder from './BgHolder';
import ListPerfumes from './ListPerfumes';
import Footer from './Footer';
import Gallery from './Gallery';

export default function Home() {
  return (
    <main>
      <Header />

      <BgHolder />

      <ListPerfumes />
      <Gallery />

      <Footer />
    </main>
  );
}
