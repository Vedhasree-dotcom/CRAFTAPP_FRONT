import React from 'react';

function About() {
  const stats = [
    { number: "10K+", label: "Crafters Worldwide" },
    { number: "100+", label: "Craft Tutorials" },
    { number: "20+", label: "Craft Categories" },
    { number: "98%", label: "Happy Creators" },
  ];

  const values = [
    {
      icon: "✦",
      title: "Creativity First",
      desc: "We champion creative expression in every form — no rules, no limits, just pure handmade joy.",
    },
    {
      icon: "◈",
      title: "Community Driven",
      desc: "Every crafter, from beginner to expert, belongs here. We grow together by sharing and inspiring.",
    },
    {
      icon: "❋",
      title: "Mindful Making",
      desc: "Crafting is meditation in motion. We design experiences that slow you down and bring you present.",
    },
    {
      icon: "⬡",
      title: "Always Learning",
      desc: "Our curated kits and guides make learning new skills feel rewarding, not overwhelming.",
    },
  ];

  return (
    <div className="about-page">

      <div className="ab-banner">
        <img
          src="https://images.pexels.com/photos/5709717/pexels-photo-5709717.jpeg"
          alt="About CraftMate"
        />
        <div className="ab-banner-overlay" />
        <div className="ab-banner-content">
          <span className="ab-eyebrow">Our Story</span>
          <h1>About <em>CraftMate</em></h1>
          <p>Where creativity meets community</p>
        </div>
      </div>

      <section className="ab-provide">
        <div className="ab-provide-text">
          <span className="ab-section-eyebrow">Who We Are</span>
          <h2>What We <em>Provide</em></h2>
          <p>
            Welcome to CraftMate, your ultimate destination for all things handmade and creative!
            Our platform is dedicated to connecting craft enthusiasts, artisans, and DIY lovers from around the world.
            Whether you're a seasoned crafter or just starting your creative journey, CraftMate offers a vibrant
            community where you can explore, learn, and share your passion for crafting.
          </p>
          <p>
            CraftMate offers a carefully curated range of guided DIY craft kits that teach you new skills while
            you create beautiful, frame-worthy artwork right at home. Every project is designed to be meditative,
            rewarding, and confidence-building — whether you're picking up a brush for the first time or enjoying
            creative time with family.
          </p>
          <p>
            We believe creativity is not about perfection — it's about expression, relaxation, and self-discovery.
            Our courses are carefully designed to reduce stress, spark imagination, and encourage mindful creativity
            in everyday life.
          </p>
        </div>
        <div className="ab-provide-img">
          <img
            src="https://images.pexels.com/photos/8746113/pexels-photo-8746113.jpeg"
            alt="Crafting"
          />
          <div className="ab-provide-img-badge">
            <span>Est. 2025</span>
          </div>
        </div>
      </section>

      <section className="ab-stats">
        {stats.map((s, i) => (
          <div className="ab-stat" key={i}>
            <span className="ab-stat-number">{s.number}</span>
            <span className="ab-stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      <section className="ab-mv">
        <div className="ab-mv-header">
          <span className="ab-section-eyebrow">What Drives Us</span>
          <h2>Mission &amp; <em>Vision</em></h2>
        </div>
        <div className="ab-mv-cards">
          <div className="ab-mv-card">
            <div className="ab-mv-card-icon">◎</div>
            <h3>Our Mission</h3>
            <p>
              At CraftMate, our mission is to empower individuals to express their creativity through crafting.
              We believe that crafting is not just a hobby — it's a way to connect with others, relieve stress,
              and bring joy into our lives. Our platform provides a space for crafters of all skill levels to
              showcase their work, access valuable resources, and collaborate on exciting projects.
            </p>
          </div>
          <div className="ab-mv-card ab-mv-card--accent">
            <div className="ab-mv-card-icon">◈</div>
            <h3>Our Vision</h3>
            <p>
              Our vision is to create a world where creativity thrives and every individual has the opportunity to
              explore their artistic potential. We aim to inspire and support crafters in their journey, fostering a
              global community that celebrates the beauty and joy of handmade creations.
            </p>
          </div>
        </div>
      </section>

      <section className="ab-values">
        <div className="ab-values-header">
          <span className="ab-section-eyebrow">What We Stand For</span>
          <h2>Our <em>Values</em></h2>
        </div>
        <div className="ab-values-grid">
          {values.map((v, i) => (
            <div className="ab-value-card" key={i}>
              <span className="ab-value-icon">{v.icon}</span>
              <h4>{v.title}</h4>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="ab-cta">
        <div className="ab-cta-content">
          <h2>Ready to start creating?</h2>
          <p>Join thousands of crafters already on CraftMate.</p>
        </div>
        <a href="/crafts" className="ab-cta-btn">Explore Crafts →</a>
      </div>

    </div>
  );
}

export default About;