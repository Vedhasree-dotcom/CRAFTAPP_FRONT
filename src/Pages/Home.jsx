import { Link } from 'react-router-dom';

function Home() {
  const highlights = [
    {
      title: "Paper Crafts",
      desc: "From origami and quilling to handmade cards and wall art, paper crafting transforms ordinary sheets into beautiful creations.",
      img: "https://images.pexels.com/photos/7606010/pexels-photo-7606010.jpeg",
      to: "/crafts/paper",
      tall: true,
    },
    {
      title: "Home Decor",
      desc: "Handcrafted home décor adds warmth and personality, blending traditional artistry with modern design.",
      img: "https://images.pexels.com/photos/6212326/pexels-photo-6212326.jpeg",
      to: "/crafts/home-decor",
      tall: false,
    },
    {
      title: "Painting",
      desc: "From watercolor to acrylic, painting allows artists to explore creativity and create expressive artwork.",
      img: "https://images.pexels.com/photos/4860078/pexels-photo-4860078.jpeg",
      to: "/crafts/painting",
      tall: false,
    },
    {
      title: "Knitting",
      desc: "This craft blends tradition with modern design, offering comfort, sustainability, and personal expression.",
      img: "https://images.pexels.com/photos/5807031/pexels-photo-5807031.jpeg",
      to: "/crafts/category/knitting",
      tall: true,
    },
  ];

  return (
    <>
      <div className="ph-hero">
        <div className="ph-hero-content">
          <span className="ph-hero-badge">Art &amp; Craft Education</span>
          <h1>Every Craft<br/>Has a <em>Story</em></h1>
          <p>Discover the beauty of handmade crafts. Learn traditional and modern techniques through guided workshops and creative exploration.</p>
          <div className="ph-hero-btns">
            <Link to="/crafts" className="ph-btn-primary">Explore Crafts</Link>
            <Link to="/about" className="ph-btn-secondary">Our Story</Link>
          </div>
        </div>
       
      </div>

      <section className="ph-about">
        <div className="ph-about-img">
          <img src="https://images.pexels.com/photos/10585186/pexels-photo-10585186.jpeg" alt="Art and Craft" />
        </div>
        <div className="ph-about-text">
          <p className="ph-about-eyebrow">Who We Are</p>
          <h2>Art &amp; Craft<br/><span>Education</span></h2>
          <p>Discover the beauty of handmade crafts and artistic skills. Learn traditional and modern techniques through guided workshops and creative exploration.</p>
          <Link to="/about" className="ph-about-link">Learn More →</Link>
        </div>
      </section>

      <section>
        <div className="ph-section-header">
          <p className="ph-section-eyebrow">Explore</p>
          <h2>Our <em>Highlights</em></h2>
        </div>
        <div className="ph-masonry">
          {highlights.map((item, i) => (
            <Link
              key={i}
              to={item.to}
              className={`ph-pin ${item.tall ? 'ph-pin-tall' : 'ph-pin-short'}`}
            >
              <button
                className="ph-pin-save"
                onClick={e => e.preventDefault()}
              >
                Save
              </button>
              <img src={item.img} alt={item.title} />
              <div className="ph-pin-body">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <div className="ph-pin-footer">
                <span className="ph-pin-tag">Workshop</span>
                <div className="ph-pin-arrow">↗</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="ph-strip">"Every stitch, fold, and brushstroke tells a story."</div>
    </>
  );
}

export default Home;