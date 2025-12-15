import { useState, useEffect } from 'react';
import PopupLoginReminder from '../PopupLoginReminder';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


function Home() {

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userDetails"));
    if (!user) {
      setShowPopup(true);
    }
  }, []);
 

  return (<>
  
       {showPopup && <PopupLoginReminder />}

      <div className={`home-hero ${showPopup ? "blurred" : ""}`}>
        <h1 className='text-overlay'>Every Craft Has a Story</h1>
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

          <Link to='/about' className="about-btn">Learn More</Link>
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
      <div className="highlights">
        <h2>Our highlights</h2>
        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="" />
      <Card.Body>
        <Card.Title>Paper Crafts</Card.Title>
        <Card.Text>
          From origami and quilling to handmade cards and wall art, 
          paper crafting transforms ordinary sheets into beautiful creations.
        </Card.Text>
          <Button variant="primary">Go somewhere</Button>
      </Card.Body>

    </Card>

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="" />
      <Card.Body>
        <Card.Title>Home Decor</Card.Title>
        <Card.Text>
          Handcrafted home décor adds warmth, personality, and elegance to living spaces. 
          Using materials like wood, fabric, clay, and recycled items, 
          home décor crafts blend traditional artistry with modern design
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>

    </Card>

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="" />
      <Card.Body>
        <Card.Title>Painting</Card.Title>
        <Card.Text>
          From watercolor and acrylic to traditional and contemporary styles, 
          painting allows artists to explore creativity while creating visually 
          stunning and expressive artwork.
        </Card.Text>
          <Button variant="primary">Go somewhere</Button>

      </Card.Body>

    </Card>

     <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="" />
      <Card.Body>
        <Card.Title>Knitting</Card.Title>
        <Card.Text>
          This craft blends tradition with modern design, 
          offering comfort, sustainability, and personal expression in every stitch.
        </Card.Text>
          <Button variant="primary">Go somewhere</Button>
      </Card.Body>

    </Card>


      </div>
    </section>




    </>
  )
}

export default Home