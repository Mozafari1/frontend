// App.tsx
import React, { useEffect, useState } from "react";
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
import getApiUrl from "./components/helper/helper";
import Loader from "./components/common/loader/Loader";
import ErrorPage from "./components/common/error/Error";
import FeedbackRoute from "./FeedbackRoute";
import Feedback from "./components/pages/feedback/Feedback";

interface IData {
  [key: string]: {
    file_name: string;
    type: string;
  }[];
}
const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [data, setData] = useState<IData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetch(`${getApiUrl()}/get-logos`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch logo data");
        }
        return response.json();
      })
      .then((responseData: IData) => {
        setData(responseData);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
        console.error("Error fetching logo data:", error);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <Router>
      <div className="app">
        {!isLoggedIn && (
          <Header
            imgSrc={`${getApiUrl()}/images/${data?.HeaderLogo[0]?.file_name}`}
          />
        )}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <MainBanner
                  imgSrc={`${getApiUrl()}/images/${
                    data?.BannerMainPage[0]?.file_name
                  }`}
                />
                <SubBanner
                  imgSrc={data?.SubBannerMainPage.map(
                    (item) => item?.file_name
                  )}
                />
                <ServiceSection
                  imgSrc={`${getApiUrl()}/images/${
                    data?.ServiceMainPage[0]?.file_name
                  }`}
                />
                <AboutUsSection
                  imgSrc={`${getApiUrl()}/images/${
                    data?.AboutUsMainPage[0]?.file_name
                  }`}
                />
                <WhyChoosenUs />
                <CustomerSection />
                <PartnerList />
                <BlogSection />
                <ContactSection />
              </>
            }
          />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/price" element={<Prices />} />
          <Route
            path="/about-us"
            element={
              <AboutUs
                imgSrc={`${getApiUrl()}/images/${
                  data?.AboutUsPage[0]?.file_name
                }`}
              />
            }
          />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route
            path="/privacy"
            element={
              <Privacy
                imgSrc={`${getApiUrl()}/images/${data?.Privacy[0]?.file_name}`}
              />
            }
          />
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
        <Footer
          imgSrc={`${getApiUrl()}/images/${data?.FooterLogo[0]?.file_name}`}
        />
      </div>
    </Router>
  );
};

export default App;
