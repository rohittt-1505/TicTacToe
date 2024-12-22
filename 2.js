document.addEventListener("DOMContentLoaded", () => {
    // Get references to buttons and overlay
    const onePlayerButton = document.getElementById("OnePlayer");
    const twoPlayerButton = document.getElementById("TwoPlayer");
    const overlay = document.getElementById("overlay");
    const closeOverlayButton = document.getElementById("closeOverlay");
    const playEasyButton = document.getElementById("playEasy");
    const playHardButton = document.getElementById("playMedium");
    const playExtremeButton = document.getElementById("playHard");
  
    // Show the overlay when "One Player" is clicked
    onePlayerButton.addEventListener("click", () => {
      overlay.style.display = "flex";
    });
  
    // Navigate to "2.html" when "Two Player" is clicked
    twoPlayerButton.addEventListener("click", () => {
      window.location.href = "2.html";
    });
  
    // Close the overlay when "Cancel" is clicked
    closeOverlayButton.addEventListener("click", () => {
      overlay.style.display = "none";
    });
  
    // Add functionality for each difficulty button
    playEasyButton.addEventListener("click", () => {
      window.location.href = "easy.html"; // Redirect to Easy mode
    });
  
    playHardButton.addEventListener("click", () => {
      window.location.href = "medium.html"; // Redirect to Hard mode
    });
  
    playExtremeButton.addEventListener("click", () => {
      window.location.href = "hard.html"; // Redirect to Extreme mode
    });
  });
  
  // Function to toggle theme (optional, based on your design)
  function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById("themeIcon");
  
    body.classList.toggle("dark-mode");
  
    if (body.classList.contains("dark-mode")) {
      themeIcon.className = "fas fa-moon";
    } else {
      themeIcon.className = "fas fa-sun";
    }
  }
  