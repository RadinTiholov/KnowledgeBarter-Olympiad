import './PointsBanner.css'
import wave from '../../../images/wave2.png'
import coinImage from '../../../images/coin-image.webp'
import { Link } from 'react-router-dom'
export const PointsBanner = () => {
    return (
        <>

            <section id="points-banner">
                <img className="wave-image" src={wave} alt="wave" />
                <h1 className="fw-bold text-xl-center">KBPoints</h1>
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
                        <div class="flip-container">
                            <div class="flip-card">
                                <div class="front">
                                    <ul>
                                        <li><p style={{ fontSize: "200%" }}>
                                            With KBP you can unlock lessons and courses.
                                        </p></li>
                                        <li><p style={{ fontSize: "200%" }}>
                                            They are your key to the unlimited knowledge.
                                        </p></li>
                                        <li><p style={{ fontSize: "200%" }}>
                                            You can earn some by creating content.
                                        </p></li>
                                    </ul>
                                </div>
                                <div class="back">
                                    <p style={{ fontSize: "200%" }}>
                                        There are two ways to earn them:
                                    </p>
                                    <ul>
                                        <li><p style={{ fontSize: "150%" }}>Creating a lesson which result in 100 credits given</p></li>
                                        <li><p style={{ fontSize: "150%" }}>Creating a course which result in 500 credits given</p></li>
                                    </ul>

                                    <p style={{ fontSize: "200%" }}>
                                        You only need to have a <Link to='/register'>registration</Link> on the platform to start!
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