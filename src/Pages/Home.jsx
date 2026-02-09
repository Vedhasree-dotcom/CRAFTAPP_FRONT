import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

function Home() {
  return (
    <>
      <div className="home-hero">
        <h1 className="text-overlay">Every Craft Has a Story</h1>
      </div>

      <section className="about-section">
        <div className="about-container">
          <div className="about-content">
            <h1>
              Art & Craft <br />
              <span>Education</span>
            </h1>

            <p>
              Discover the beauty of handmade crafts and artistic skills.
              Learn traditional and modern techniques through guided
              workshops and creative exploration.
            </p>

            <Link to="/about" className="about-btn">
              Learn More
            </Link>
          </div>

          <div className="about-image">
            <img
              src="https://images.pexels.com/photos/10585186/pexels-photo-10585186.jpeg"
              alt="Art and Craft"
            />
          </div>
        </div>
      </section>

      <section>
        <h1 className="course">Our Highlights</h1>

        <div className="highlights">
          <Card className="card">
            <Card.Img
              className="image"
              src="https://images.pexels.com/photos/7606010/pexels-photo-7606010.jpeg"
            />
            <Card.Body>
              <Card.Title>Paper Crafts</Card.Title>
              <Card.Text style={{ fontSize: "14px", textAlign: "justify" }}>
                From origami and quilling to handmade cards and wall art,
                paper crafting transforms ordinary sheets into beautiful creations.
              </Card.Text>
              <Link
                to="/crafts/paper"
                style={{
                  backgroundColor: "brown",
                  color: "white",
                  fontSize: "14px",
                  padding: "6px 20px",
                  borderRadius: "4px",
                  textDecoration: "none"
                }}
              >
                View
              </Link>
            </Card.Body>
          </Card>

          <Card className="card">
            <Card.Img
              className="image"
              src="https://images.pexels.com/photos/6212326/pexels-photo-6212326.jpeg"
            />
            <Card.Body>
              <Card.Title>Home Decor</Card.Title>
              <Card.Text style={{ fontSize: "14px", textAlign: "justify" }}>
                Handcrafted home décor adds warmth and personality,
                blending traditional artistry with modern design.
              </Card.Text>
              <Link
                to="/crafts/home-decor"
                style={{
                  backgroundColor: "brown",
                  color: "white",
                  fontSize: "14px",
                  padding: "6px 20px",
                  borderRadius: "4px",
                  textDecoration: "none"
                }}
              >
                View
              </Link>
            </Card.Body>
          </Card>

          <Card className="card">
            <Card.Img
              className="image"
              src="https://images.pexels.com/photos/4860078/pexels-photo-4860078.jpeg"
            />
            <Card.Body>
              <Card.Title>Painting</Card.Title>
              <Card.Text style={{ fontSize: "14px", textAlign: "justify" }}>
                From watercolor to acrylic, painting allows artists
                to explore creativity and create expressive artwork.
              </Card.Text>
              <Link
                to="/crafts/painting"
                style={{
                  backgroundColor: "brown",
                  color: "white",
                  fontSize: "14px",
                  padding: "6px 20px",
                  borderRadius: "4px",
                  textDecoration: "none"
                }}
              >
                View
              </Link>
            </Card.Body>
          </Card>

          <Card className="card">
            <Card.Img
              className="image"
              src="https://images.pexels.com/photos/5807031/pexels-photo-5807031.jpeg"
            />
            <Card.Body>
              <Card.Title>Knitting</Card.Title>
              <Card.Text style={{ fontSize: "14px", textAlign: "justify" }}>
                This craft blends tradition with modern design,
                offering comfort, sustainability, and personal expression.
              </Card.Text>
              <Link
                to="/crafts/category/knitting"
                style={{
                  backgroundColor: "brown",
                  color: "white",
                  fontSize: "14px",
                  padding: "6px 20px",
                  borderRadius: "4px",
                  textDecoration: "none"
                }}
              >
                View
              </Link>
            </Card.Body>
          </Card>
        </div>
      </section>
    </>
  );
}

export default Home;
