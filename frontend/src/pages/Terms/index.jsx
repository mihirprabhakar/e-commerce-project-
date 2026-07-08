import { useEffect, useState } from "react";
import termsService from "../../services/terms.service";
import "./Terms.css";

function Terms() {
  const [terms,setTerms]=useState(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");

  // get terms data when page loads only once(1sr rendar)
  useEffect(()=>{
    const fetchTerms=async ()=>{
      setLoading(true);
      try{
        const response=await termsService.getTerms();
        if(response.success){
          setTerms(response.data);
        }
      }
      catch(err){
        setError("failed to load terms data please try again.");
      }
      finally{
        setLoading(false);
      }
    };
    fetchTerms();
  }, []);

  // loading state
  if(loading){
    return(
      <div className="terms-page">
        <div className="loader-wrapper">
          <p>loading</p>
        </div>
      </div>
    );
  }

  // error state
  if (error) {
    return (
      <div className="terms-page">
        <div className="error-message">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="terms-page">
      {terms && (
        <>
          {/* hero part */}
          <div className="terms-hero">
            <h1>{terms.pageTitle}</h1>
            <p>Last Updated: {terms.lastUpdated}</p>
          </div>

          {/* intro */}
          <div className="terms-intro">
            <p>{terms.introduction}</p>
          </div>

          {/* section */}
          <div className="terms-sections">
            {terms.sections.map((section,index) => ( // used () so no return 
              <div className="terms-section-card" key={index}>
                <h2>{section.title}</h2>
                <p>{section.content}</p>
              </div>
            ))}
          </div>

          {/* last edited */}
          <div className="terms-last-updated">
            <p>These terms were last updated in {terms.lastUpdated}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Terms;