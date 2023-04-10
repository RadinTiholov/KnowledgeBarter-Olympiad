import React from "react";
import "./Confetti.css";

function Confetti(props) {
    const handleClick = () => {
        if (!props.isLiked) {
            function random(max) {
                return Math.random() * (max - 0) + 0;
            }

            const confetti = document.createDocumentFragment();

            for (let i = 0; i < 100; i++) {
                const styles =
                    "transform: translate3d(" +
                    (random(500) - 250) +
                    "px, " +
                    (random(200) - 150) +
                    "px, 0) rotate(" +
                    random(360) +
                    "deg);\
                      background: hsla(" +
                    random(360) +
                    ",100%,50%,1);\
                      animation: bang 700ms ease-out forwards;\
                      opacity: 0";

                const e = document.createElement("i");
                e.style.cssText = styles.toString();
                confetti.appendChild(e);
            }

            document.querySelector(".hoverme").appendChild(confetti);
            document.querySelector(".hoverme").disabled = true;
            // document.querySelector(".hoverme").innerText = 'Liked';
        }

        setTimeout(() => {props.onClick()}, 700)
    };

    return (
        <>
            <button disabled={props.isLiked} className="hoverme btn btn-outline-warning btn-lg mt-4 fw-bold" onClick={handleClick}>
                {props.isLiked ? 'Liked' : 'Like'}
            </button>
        </>
    );
}

export default Confetti;
