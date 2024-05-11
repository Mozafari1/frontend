import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import Prices from "./components/pages/price/Prices";
import MainBanner from "./components/pages/home/MainBanner";
import SubBanner from "./components/pages/home/SubBanner";
import ServiceSection from "./components/pages/home/ServiceSection";
import AboutUsSection from "./components/pages/home/AboutUsSection";
import WhyChoosenUs from "./components/pages/home/WhyChoosenUs";
import CustomerSection from "./components/pages/home/CustomerSection";
import PartnerList from "./components/pages/home/PartnerList";
import BlogSection from "./components/pages/home/BlogSection";
import ContactSection from "./components/pages/home/ContactSection";
import AboutUs from "./components/pages/about/AboutUs";
import ContactUs from "./components/pages/contact/ContactUs";
import ServicePage from "./components/pages/service/ServicePage";
import Privacy from "./components/pages/privacy/Privacy";
import BlogPage from "./components/pages/blog/BlogPage";
import PortalReg from "./components/pages/login/PortalReg";
import PortalLogin from "./components/pages/login/PortalLogin";
import ProtectedRoute from "./ProtectedRoute";
import IndexDashboard from "./components/features/IndexDashboard";
import FeedbackRoute from "./FeedbackRoute";
import Feedback from "./components/pages/feedback/Feedback";
import CookieConsentComponent from "./components/cookies/Cookies";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { reCAPTCHA_SITE_KEY } from "./components/helper/variable";
import { TrackPageViews } from "./components/helper/helper";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <GoogleReCaptchaProvider reCaptchaKey={reCAPTCHA_SITE_KEY}>
      <Router>
        <div className="app">
          <TrackPageViews />
          {!isLoggedIn && <Header />}
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <MainBanner />
                  <SubBanner />
                  <ServiceSection />
                  <AboutUsSection />
                  <WhyChoosenUs />
                  <CustomerSection />
                  {/* <PartnerList /> */}
                  <BlogSection />
                  <ContactSection />
                </>
              }
            />
            <Route path="/service" element={<ServicePage />} />
            <Route path="/price" element={<Prices />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/portalReg" element={<PortalReg />} />
            <Route path="/portalLogin" element={<PortalLogin />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute setIsLoggedIn={setIsLoggedIn}>
                  <IndexDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/feedback/:token"
              element={
                <FeedbackRoute>
                  <Feedback />
                </FeedbackRoute>
              }
            />
          </Routes>
          <CookieConsentComponent />

          <Footer />
        </div>
      </Router>
    </GoogleReCaptchaProvider>
  );
};

export default App;
