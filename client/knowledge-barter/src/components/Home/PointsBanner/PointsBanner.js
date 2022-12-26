import './PointsBanner.css'
import wave from '../../../images/wave2.png'
import coinImage from '../../../images/coin-image.webp'
export const PointsBanner = () => {
    return (
        <section id="points-banner">
                <img className="wave-image" src={wave} alt="wave" />
                <h1 className="fw-bold text-xl-center">KBPoints</h1>
                <div className="row" style={{ margin: "auto" }}>
                    <div className="col-6 text-center">
                        <img
                            id="knowledge-image"
                            className="image-fluid"
                            src={coinImage}
                            alt="icon"
                        />
                    </div>
                    <div className="col-6 ">
                        <p style={{ fontSize: "200%", marginTop: 150 }}>
                            With KBP you can unlock lessons and courses.
                        </p>
                        <p style={{ fontSize: "200%"}}>
                            They are your key to the unlimited knowledge.
                        </p>
                        <p style={{ fontSize: "200%" }}>
                            You can earn some by creating content.
                        </p>
                        <p />
                    </div>
                </div>
            </section>
    )
}