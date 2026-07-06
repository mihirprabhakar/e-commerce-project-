import { useEffect, useState } from "react";
import aboutService from "../../services/about.service";
import "./About.css";

function About() {
  
  const [about,setAbout]=useState(null);
  const [loading, setLoading]=useState(true);
  const [error, setError]=useState("");

  // get about data when page loads
  useEffect(()=>{
    const fetchAbout=async ()=>{
      setLoading(true);
      try{
        const response=await aboutService.getAbout();
        if(response.success){
          setAbout(response.data);
        }
      }
      catch(err){
        setError("failed to load about data please try again");
      }
      finally{
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  //loading state set
  if (loading){
    return (
      <div className="about-page">
        <div className="loader-wrapper">
          <p>loading</p>
        </div>
      </div>
    );
  }

  // error state set
  if (error) {
    return (
      <div className="about-page">
        <div className="error-message">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="about-page">

      {about && (
        <>
          {/* hero part */}

          <div className="about-hero">
            <h1>{about.companyName}</h1>
            <p>{about.tagline}</p>
          </div>

          {/* descriptionn */}
          <div className="about-description">
            <h2>Who We Are</h2>
            <p>{about.description}</p>
          </div>

          {/* mission and vision */}
          <div className="about-grid">
            <div className="about-card">


              <h2> Our Mission</h2>
              <p>{about.mission}</p>

            </div>
            <div className="about-card">
              <h2> Our Vision</h2>
              <p>{about.vision}</p>

          </div>  
          </div>

          {/* stats */}
          <div className="about-stats">
            <div className="stat-card">

              <div className="stat-number">

                  {new Date().getFullYear()-about.foundedYear}+
              </div>
              <div className="stat-label">Years in Business</div>
            </div>
            <div className="stat-card">

              <div className="stat-number">10K+</div>
              <div className="stat-label">Happy Customers</div>
            </div>


            <div className="stat-card">

              <div className="stat-number">500+</div>
              <div className="stat-label">Products Listed</div>
            </div>

            <div className="stat-card">
              <div className="stat-number">50+</div>

              <div className="stat-label">Trusted Vendors</div>
            </div>
          </div>

          {/* contact info */}
          <div className="about-contact">

              <h2>Get In Touch</h2>
            <div className="contact-grid">
              <div className="contact-item">

              <span className="contact-label">Email</span>
                <span className="contact-value">{about.email}</span>
              </div>
              <div className="contact-item">
                  <span className="contact-label">Phone</span>

                <span className="contact-value">{about.phone}</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">Address</span>
                <span className="contact-value">{about.address}</span>
              </div>

          </div>  


          </div>
        </>

      )}
    </div>
  );
}

export default About;