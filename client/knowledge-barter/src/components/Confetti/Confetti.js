export const Confetti = () => {
    document.getElementById("confetti-btn").addEventListener("click", function () {
        var confetti = document.getElementById("confetti");
        for (var i = 0; i < 50; i++) {
            var dot = document.createElement("div");
            dot.classList.add("confetti");
            dot.style.left = Math.floor(Math.random() * confetti.offsetWidth) + "px";
            dot.style.top = Math.floor(Math.random() * confetti.offsetHeight) + "px";
            confetti.appendChild(dot);
        }
        setTimeout(function () {
            confetti.innerHTML = "";
        }, 3000);
    });

    return (
        <>
            <button id="confetti-btn">Click me!</button>
            <div id="confetti"></div>
        </>
    );
}