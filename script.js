// Vue app will manage which side is selected and visibility of the "Click me" buttons.
const app = Vue.createApp({
  data() {
    return { selected: null };
  },
  methods: {
    toggle(holiday) {
      this.selected = this.selected === holiday ? null : holiday;
    }
  }
});
app.mount('#app');

(function createSnowfall() {
  const snowCount = 200;
  const colors = ["#ffffff", "#eaf6ff", "#fff7f0"];
  for (let i = 0; i < snowCount; i++) {
    const s = document.createElement("div");
    s.className = "snowflake";
    s.textContent = "❄";
    const size = Math.random() * 14 + 4;
    s.style.fontSize = size + "px";
    s.style.left = Math.random() * 100 + "vw";
    s.style.opacity = (Math.random() * 0.6 + 0.3).toFixed(2);
    s.style.color = colors[Math.floor(Math.random() * colors.length)];
    const fallDuration = (Math.random() * 16 + 8).toFixed(2);
    const swayDuration = (Math.random() * 4 + 3).toFixed(2);
    const delay = (Math.random() * -40).toFixed(2);
    s.style.animation = `fall ${fallDuration}s linear ${delay}s infinite, sway ${swayDuration}s ease-in-out ${delay}s infinite`;
    document.body.appendChild(s);
  }
})();
