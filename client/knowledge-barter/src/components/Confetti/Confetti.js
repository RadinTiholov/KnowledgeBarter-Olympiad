export const Confetti = () => {
    const handleClick = () => {
        const confetti = document.getElementById("confetti");
        for (let i = 0; i < 50; i++) {
          const dot = document.createElement("div");
          dot.classList.add("confetti");
          dot.style.left = Math.floor(Math.random() * confetti.offsetWidth) + "px";
          dot.style.top = Math.floor(Math.random() * confetti.offsetHeight) + "px";
          confetti.appendChild(dot);
        }
        setTimeout(function () {
          confetti.innerHTML = "";
        }, 3000);
      }
    

    return (
        <>
            <button id="confetti-btn" onClick={() => handleClick()}>
                Confetti Button
            </button>
            <div id="confetti"></div>
        </>
    );
}