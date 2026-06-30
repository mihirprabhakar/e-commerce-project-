import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageWrapper from "./PageWrapper";

function MainLayout() {
  return (
    <>
      <Header />
      <Navbar />
      <PageWrapper>
        <Outlet />
      </PageWrapper>
      <Footer />
    </>
  );
}

export default MainLayout;