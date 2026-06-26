import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageWrapper from "./PageWrapper";

function MainLayout({ children }) {
  return (
    <>
      <Header />
      <Navbar />
      <PageWrapper>
        {children}
      </PageWrapper>
      <Footer />
    </>
  );
}
export default MainLayout;