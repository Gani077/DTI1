document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".login__form");
  
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      if (!email || !password) {
        alert("Please fill in both fields.");
        return;
      }
  
      const userData = { email, password };
  
      try {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          localStorage.setItem("token", data.token);
          alert("Login successful!");
          window.location.href = "main.html"; // Redirect to dashboard/home page
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      }
    });
  });

  
  document.addEventListener("DOMContentLoaded", function () {
    const chatbotButton = document.getElementById("chatbot-button");
    const chatbotContainer = document.getElementById("chatbot"); // Fixed ID
    const closeChatbot = document.getElementById("close-chatbot"); // Fixed missing ID
    const chatbotMessages = document.getElementById("chatbot-messages");
    const chatbotInput = document.getElementById("chatbot-input");
    const sendChatbot = document.getElementById("send-chatbot");

    // Toggle chatbot visibility
    chatbotButton.addEventListener("click", () => {
        chatbotContainer.style.display = chatbotContainer.style.display === "block" ? "none" : "block";
    });

    closeChatbot.addEventListener("click", () => {
        chatbotContainer.style.display = "none";
    });

    // Handle sending messages
    sendChatbot.addEventListener("click", sendMessage);
    chatbotInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        let userMessage = chatbotInput.value.trim();
        if (userMessage === "") return;

        // Display user message
        let userDiv = document.createElement("div");
        userDiv.textContent = "You: " + userMessage;
        chatbotMessages.appendChild(userDiv);

        // Simple bot response
        let botDiv = document.createElement("div");
        botDiv.textContent = "Bot: I'm here to assist you!";
        setTimeout(() => chatbotMessages.appendChild(botDiv), 500);

        chatbotInput.value = "";
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
});
