import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/layout.css";

const DefaultLayout = () => (
  <div className="site-layout">
    <Header />
    <main className="site-main"><Outlet /></main>
    <Footer />
  </div>
);

export default DefaultLayout;
