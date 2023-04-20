import { useTranslation } from "react-i18next";

export const About = () => {
    const { t } = useTranslation();

    return (
        <>
            {/* Page Content */}
            <div className="container">
                {/* Portfolio Item Row */}
                <div className="row">
                    <div className="col-md-8 pt-3">
                        <h3 style={ {fontWeight: "bold"}} className="my-3 display-5">{t("projectDescriptionName")}</h3>
                        <p className="display-6">
                            {t("projectDescription")}
                        </p>
                    </div>
                    <div className="col-md-4 pt-3">
                        <h3 className="my-3">{t("usedTech")}</h3>
                        <ul>
                            <h4><li>React</li></h4>
                            <h4><li>.NET</li></h4>
                            <h4><li>MSSQL</li></h4>
                            <h4><li>Cloudinary</li></h4>
                            <h4><li>DropBox</li></h4>
                            <h4><li>SendGrid</li></h4>
                            <h4><li>ML.NET</li></h4>
                            <h4><li>Entity Framework Core</li></h4>
                            <h4><li>SignalR</li></h4>
                            <h4><li>AutoMapper</li></h4>
                            <h4><li>ML.Net</li></h4>
                            <h4><li>XUnit</li></h4>
                            <h4><li>Moq</li></h4>
                        </ul>
                    </div>
                </div>
                {/* /.row */}
                {/* Related Projects Row */}
                <h3 className="my-4">{t("authors")}</h3>
                <div className="row">
                    <div className="col-md-3 col-sm-6 mb-4 ">
                        <a href="https://github.com/RadinTiholov">
                            <img
                                className="img-fluid rounded-circle"
                                src="https://avatars.githubusercontent.com/u/74610360?v=4"
                                alt=""
                            />
                        </a>
                    </div>
                    <div className="col-md-3 col-sm-6 mb-4">
                        <a href="https://github.com/MartiHr">
                            <img
                                className="img-fluid rounded-circle"
                                src="https://images-ext-2.discordapp.net/external/dGDPRoAu-rD7Itr8oA6rsSlA7sNnK_UO4hTxlFh2Jyw/https/res.cloudinary.com/dubpxleer/image/upload/v1676222259/IMG_20220910_173222_Bokeh__01-min_knewbo.jpg?width=306&height=306"
                                alt=""
                            />
                        </a>
                    </div>
                </div>
                {/* /.row */}
            </div>
            {/* /.container */}
        </>

    )
}