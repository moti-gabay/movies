import React from 'react'
import classes from "./header.module.css"
import img from "../../assets/images/Adob.png"
import { Link } from 'react-router-dom'
const Header = () => {
    return (
        <div className={classes.layoutContent}>
            <div className={classes.homeInnerContent}>
                <div className={classes.layoutContentImg}>
                    <Link to="/">
                        <img className={classes.LayoutImg} src={img} alt="" />
                    </Link>
                </div>
                <div className={classes.layoutContentText}>
                    <Link to="/moviesList">
                        <span className={classes.layoutContentLink}>Movies List</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header
