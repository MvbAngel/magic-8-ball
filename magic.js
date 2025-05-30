const responses = [
  "Yes", "No", "Maybe", "Ask again", "Definitely", "Unlikely", "Absolutely", "Doubt it"
];

const ball = document.getElementById("magic8ball");
const responseText = document.getElementById("response");

let mousePositions = [];
let lastShakeTime = 0;

// Start tracking mouse movements only when the user clicks and holds
ball.addEventListener("mousedown", () => {
  ball.style.cursor = "grabbing";
  mousePositions = [];

  function onMouseMove(e) {
    mousePositions.push({ x: e.clientX, y: e.clientY, time: Date.now() });

    // Keep the last 10 movements only
    if (mousePositions.length > 10) {
      mousePositions.shift();
    }

    const now = Date.now();
    if (now - lastShakeTime > 1000 && detectShake(mousePositions)) {
      lastShakeTime = now;
      shakeBall();
    }
  }

  function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    ball.style.cursor = "grab";
  }

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});

function detectShake(positions) {
  if (positions.length < 2) return false;
  let totalDistance = 0;
  for (let i = 1; i < positions.length; i++) {
    const dx = positions[i].x - positions[i - 1].x;
    const dy = positions[i].y - positions[i - 1].y;
    totalDistance += Math.sqrt(dx * dx + dy * dy);
  }
  return totalDistance > 300;
}

function shakeBall() {
  const randomIndex = Math.floor(Math.random() * responses.length);
  responseText.textContent = responses[randomIndex];

  ball.classList.add("shake");

  // Remove the animation class so it can be triggered again
  setTimeout(() => {
    ball.classList.remove("shake");
  }, 400);
}

