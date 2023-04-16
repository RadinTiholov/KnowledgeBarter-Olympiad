import { Link } from "react-router-dom"

export const Footer = () => {
    return (
        <footer
            className=" text-center text-white"
            style={{ backgroundColor: "#636ea7" }}
        >
            {/* Grid container */}
            {/* Copyright */}
            <div
                className="text-center p-3"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            >
                <b>© Knowledge Barter App</b>
                <Link className="nav-link text-light" to="/about">
                    About
                </Link>
                <Link className="nav-link text-light" to="/privacy-policy">
                    Privacy Policy
                </Link>
                {/* {' © 2022 Copyright: '} */}
            </div>
            {/* Copyright */}
        </footer>
    )
}