import React from 'react';
import Form from './Form';
import Header from './Header';
import Footer from './Footer';
import Background from './Background';

export default function Recommend() {
  return (
    <main>
      <Header />
      <section className="py-11 bg-light-gradient border-bottom border-white border-5">
        <div
          className="bg-holder overlay overlay-light"
          style={{
            backgroundImage: 'url(src/assets/img/gallery/header-bg.png)',
            backgroundSize: 'cover',
          }}
        ></div>

        <Form />
      </section>

      <Footer />
    </main>
  );
}
