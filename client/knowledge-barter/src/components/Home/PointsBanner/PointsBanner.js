import './PointsBanner.css'
import wave from '../../../images/wave2.png'
import coinImage from '../../../images/coin-image.webp'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
export const PointsBanner = () => {
    const { t } = useTranslation();

    return (
        <>
            <section id="points-banner">
                <img className="wave-image" src={wave} alt="wave" />
                <h1 className="fw-bold text-xl-center">{t("kBPoints")}</h1>
                <div className="row" style={{ margin: "auto" }}>
                    <div className="col-6 text-center">
                        <img
                            id="knowledge-image2"
                            className="image-fluid"
                            src={coinImage}
                            alt="icon"
                        />
                    </div>
                    <div className="col-6 ">
                        <div className="flip-container">
                            <div className="flip-card">
                                <div className="front">
                                    <ul>
                                        <li><p style={{ fontSize: "200%" }}>
                                            {t("kbUnlock")}
                                        </p></li>
                                        <li><p style={{ fontSize: "200%" }}>
                                            {t("kbUnlimited")}
                                        </p></li>
                                        <li><p style={{ fontSize: "200%" }}>
                                            {t("kbCreating")}
                                        </p></li>
                                    </ul>
                                </div>
                                <div className="back">
                                    <p style={{ fontSize: "200%" }}>
                                        {t("twoWays")}:
                                    </p>
                                    <ul>
                                        <li><p style={{ fontSize: "150%" }}>{t("firstWay")}</p></li>
                                        <li><p style={{ fontSize: "150%" }}>{t("secondWay")}</p></li>
                                    </ul>

                                    <p style={{ fontSize: "200%" }}>
                                        {t("onlyNeed")} <Link to='/register'>{t("registration")}</Link> {t("onThePlatform")}!
                                    </p>

                                    {/* <Link
                                            className="btn btn-outline-warning"
                                            style={{ backgroundColor: "#636EA7" }}
                                            to="/register"
                                        >
                                            Register
                                        </Link> */}
                                </div>
                            </div>
                        </div>

                        <p />
                    </div>
                </div>
            </section>
        </>

    )
}