export const Footer = () => {
    return(
        <footer
                className=" text-center text-white"
                style={{ backgroundColor: "#636ea7" }}
            >
                {/* Grid container */}
                <div className="container p-4">
                    {/* Section: Text */}
                    <section className="mb-4">
                        <p>Knowledge Barter App</p>
                    </section>
                    {/* Section: Text */}
                </div>
                {/* Grid container */}
                {/* Copyright */}
                <div
                    className="text-center p-3"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
                >
                    {'© 2022 Copyright: '} 
                    <a className="text-white" href="https://github.com/RadinTiholov">
                         Radin Tiholov
                    </a>
                </div>
                {/* Copyright */}
            </footer>
    )
}