function sideChosen(holiday) {
  //alert("You have chosen " + holiday + "!");
}

// Snowfall: create floating snowflake elements
(function createSnowfall() {
  // Increased count for denser snowfall
  const snowCount = 200;
  const colors = ["#ffffff", "#eaf6ff", "#fff7f0"];
  for (let i = 0; i < snowCount; i++) {
    const s = document.createElement("div");
    s.className = "snowflake";
    s.textContent = "❄";
    const size = Math.random() * 14 + 4; // 4-18px (smaller for density)
    s.style.fontSize = size + "px";
    s.style.left = Math.random() * 100 + "vw";
    s.style.opacity = (Math.random() * 0.6 + 0.3).toFixed(2);
    s.style.color = colors[Math.floor(Math.random() * colors.length)];
    const fallDuration = (Math.random() * 16 + 8).toFixed(2); // 8-24s
    const swayDuration = (Math.random() * 4 + 3).toFixed(2); // 3-7s
    const delay = (Math.random() * -40).toFixed(2);
    s.style.animation = `fall ${fallDuration}s linear ${delay}s infinite, sway ${swayDuration}s ease-in-out ${delay}s infinite`;
    document.body.appendChild(s);
  }
})();
