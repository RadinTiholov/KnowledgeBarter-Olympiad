import { Link } from "react-router-dom"
import logo from '../../images/logo.png'
import { useTranslation } from "react-i18next";

export const Footer = () => {
    const { t } = useTranslation();

    return (
        // <footer
        //     className=" text-center text-white"
        //     style={{ backgroundColor: "#636ea7" }}
        // >
        //     {/* Grid container */}
        //     {/* Copyright */}
        //     <div
        //         className="text-center p-3"
        //         style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        //     >
        //         <b>© Knowledge Barter App</b>
        //         <Link className="nav-link text-light" to="/about">
        //             About
        //         </Link>
        //         <Link className="nav-link text-light" to="/privacy-policy">
        //             Privacy Policy
        //         </Link>
        //         {/* {' © 2022 Copyright: '} */}
        //     </div>
        //     {/* Copyright */}
        // </footer>
        <>
            {/* Footer */}
            <footer className="text-center text-lg-start text-muted" style={{ backgroundColor: "#636ea7" }}>
                {/* Section: Social media */}
                <section className="d-flex justify-content-center justify-content-lg-between">
                </section>
                {/* Section: Social media */}
                {/* Section: Links  */}
                <section className="">
                    <div className="container text-center text-md-start mt-5">
                        {/* Grid row */}
                        <div className="row mt-3">
                            {/* Grid column */}
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                {/* Content */}
                                <div className="row">
                                    <div className="col-sm-3">
                                        <Link className="navbar-brand logo-container" to="/">
                                            <img className='logo' src={logo} alt="" width={60} height={45} />
                                        </Link>
                                    </div>
                                    <div className="col-sm mt-2 mb-4">
                                        <h5 className="text-uppercase fw-bold">
                                            Knowledge Barter
                                        </h5>
                                    </div>
                                </div>
                                <p>
                                    {t("exchanging")}
                                </p>
                            </div>
                            {/* Grid column */}
                            {/* Grid column */}
                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                {/* Links */}
                                <h5 className="text-uppercase fw-bold mb-4 mt-2 ">{t("usefulLinks")}</h5>
                                <p>
                                    <Link to={"/login"}>
                                        {t("login")}
                                    </Link>
                                </p>
                                <p>
                                    <Link to={"/register"}>
                                        {t("register")}
                                    </Link>
                                </p>
                                <p>
                                    <Link to={"/about"}>
                                        {t("about")}
                                    </Link>
                                </p>
                                <p>
                                    <Link to={"/privacy-policy"}>
                                        {t("privacyPolicy")}
                                    </Link>
                                </p>
                            </div>
                            {/* Grid column */}
                            {/* Grid column */}
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                {/* Links */}
                                <h5 className="text-uppercase fw-bold mb-4 mt-2 ">{t("contact")}</h5>
                                <p>
                                    <i className="fas fa-envelope me-3" />
                                    knowledge-barter@gmail.com
                                </p>
                                <p>
                                    <Link to={"https://www.facebook.com/profile.php?id=100091825306160"}>
                                        <i className="fab fa-facebook-f me-3" />
                                        Facebook
                                    </Link>
                                </p>
                            </div>
                            {/* Grid column */}
                        </div>
                        {/* Grid row */}
                    </div>
                </section>
                {/* Section: Links  */}
                {/* Copyright */}
                <div
                    className="text-center p-4"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                >
                    © 2023 Copyright:
                    <Link to={"/"} className="text-reset fw-bold">
                        Knowledge Barter
                    </Link>
                </div>
                {/* Copyright */}
            </footer>
            {/* Footer */}
        </>

    )
}