import classes from "./layout.module.css"
import { Outlet } from 'react-router-dom'
import Header from '../header/Header';
import Footer from '../footer/Footer';
function Layout() {
  return (
    <div className={classes.homeContainer}>
      <div className={classes.homeContent}>
        <div className={classes.homeInnerContent}>
          <Header />
        </div>
        <div className={classes.outletContent}>
          <Outlet />
        </div>
        <div className={classes.footerContent}>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Layout
