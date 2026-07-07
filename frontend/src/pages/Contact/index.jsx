import { useEffect, useState } from "react";
import contactService from "../../services/contact.service";
import "./Contact.css";

function Contact() {
  const [contact,setContact]=useState(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");

  useEffect(()=>{
    const fetchContact=async ()=>{
      setLoading(true);
      try {
        const response = await contactService.getContact();
        if (response.success) {
          setContact(response.data);
        }
      } catch (err) {
        setError("failed to load contact data please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, []);

  if (loading) {
    return (
      <div className="contact-page">
        <div className="loader-wrapper">
          <p>loading</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="contact-page">
        <div className="error-message">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const mapUrl=contact ? contact.mapLink : null;
  const fbLink=contact && contact.socialLinks ? contact.socialLinks.facebook : null;
  const igLink=contact && contact.socialLinks ? contact.socialLinks.instagram : null;
  const twLink=contact && contact.socialLinks ? contact.socialLinks.twitter : null;
  const liLink=contact && contact.socialLinks ? contact.socialLinks.linkedin : null;

  return (
    <div className="contact-page">
      {contact && (
        <>
          {/* hero part */}
          <div className="contact-hero">
            <h1>Contact Us</h1>
            <p>We are here to help you. Reach out to us anytime.</p>
          </div>

          {/* contact info section */}
          <div className="contact-info-grid">

            <div className="contact-info-card">
              <div className="contact-info-icon"><i class="fa-regular fa-envelope-open"></i></div>


              <h3>Email Us</h3>
                <p>{contact.email}</p>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon"><i class="fa-solid fa-phone"></i></div>
              <h3>Call Us</h3>

                <p>{contact.phone}</p>
              {contact.whatsapp && (
                <p>WhatsApp: {contact.whatsapp}</p>
              )}
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon"><i class="fa-solid fa-clock"></i></div>
              <h3>Support Hours</h3>
              <p>{contact.supportHours}</p>

                
          </div>
          </div>

          {/* address part */}
          <div className="contact-address">

            <h2>Our Location</h2>

            <div className="address-grid">
              <div className="address-item">
                  <span className="address-label">Street Address</span>
                <span className="address-value">{contact.address}</span>

              </div>
              <div className="address-item">
                <span className="address-label">City</span>
                  <span className="address-value">{contact.city}</span>

              </div>
              <div className="address-item">
                <span className="address-label">State</span>
                <span className="address-value">{contact.state}</span>
              </div>

              <div className="address-item">
              <span className="address-label">Pincode</span>
                <span className="address-value">{contact.pincode}</span>
              </div>

            </div>

            {mapUrl &&(
              <>
              <i class="fa-solid fa-location-dot"></i> &nbsp;
              <a href={mapUrl} target="_blank" rel="noreferrer" className="map-link">
                 View on Google Maps
              </a></>
            )}
          </div>

          {/* sociazl handles */}
          {contact.socialLinks &&(
            <div className="contact-social">
                <h2>Follow Us</h2>
              <div className="social-grid">
                  {fbLink && (
                  <a href={fbLink} target="_blank" rel="noreferrer" className="social-link">
                    <span className="social-icon"><i class="fa-brands fa-facebook"></i></span>
                      <span>Facebook</span>
                  </a>
                )}
                  {igLink && (
                  <a href={igLink} target="_blank" rel="noreferrer" className="social-link">
                    <span className="social-icon"><i class="fa-brands fa-instagram"></i></span>
                      <span>Instagram</span>
                  </a>
                )}
                {twLink &&(
                  <a href={twLink} target="_blank" rel="noreferrer" className="social-link">
                    <span className="social-icon"><i class="fa-brands fa-x-twitter"></i></span>
                      <span>Twitter</span>
                  </a>
                )}
                  {liLink && (
                  <a href={liLink} target="_blank" rel="noreferrer" className="social-link">
                    <span className="social-icon"><i class="fa-brands fa-linkedin-in"></i></span>
                    <span>LinkedIn</span>
                  </a>
                )}
            </div>
            </div>
          )}
      </>
      )}
    </div>
  );
}

export default Contact;