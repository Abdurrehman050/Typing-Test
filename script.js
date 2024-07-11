document.addEventListener("DOMContentLoaded", () => {
  //Select the elements
  const textToTypeElement = document.getElementById("text-to-type");
  const typingInputElement = document.getElementById("typing-input");
  const speedElement = document.getElementById("speed");
  const accuracyElement = document.getElementById("accuracy");

  //Text to display
  const sampleTexts = [
    "A gentle breeze rustled through the trees, carrying the scent of blooming flowers. Birds chirped melodiously, creating a symphony of nature's sounds. Sunlight filtered through the leaves, casting dappled shadows on the ground. The tranquility of the forest was a soothing balm for the weary soul, inviting peace and reflection.",
    "The bustling city streets were alive with energy. People hurried along the sidewalks, their footsteps echoing off the buildings. Vendors called out, advertising their goods, while the aroma of street food filled the air. Amidst the chaos, there was a sense of vibrant life and unending possibilities, a constant hum of urban existence.",
    "As the sun set over the ocean, the sky transformed into a canvas of vibrant hues. Oranges, pinks, and purples blended seamlessly, reflecting off the calm waters. The rhythmic sound of waves crashing against the shore created a soothing soundtrack. It was a moment of pure beauty, a reminder of nature's artistic brilliance.",
    "The old library was a treasure trove of knowledge. Dusty books lined the shelves, their spines cracked from years of use. The smell of aged paper filled the air, mingling with the soft whispers of visitors. Each book held a story, a portal to different worlds and times, waiting to be discovered and cherished.",
  ];
  //initial values
  let currentIndex = 0;
  let startTime = new Date();
  let errors = 0;

  //Function to initialize or restart the game
  function initializeGame() {
    const text = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    textToTypeElement.textContent = text;
    typingInputElement.value = "";
    currentIndex = 0;
    startTime = new Date();
    errors = 0;
    //update fn
    updateFeedback();
  }
  //Function to update the speed and the accuracy feedback
  function updateFeedback() {
    const currentTime = new Date();
    const elapsedTime = (currentTime - startTime) / 60000;
    if (elapsedTime <= 0) {
      speedElement.textContent = 0;
    } else {
      const wordsTyped = typingInputElement.value.trim().split(/\s+/).length;
      const speed = Math.round(wordsTyped / elapsedTime);
      speedElement.textContent = speed;
    }
    //cal accurracy
    const accuracy =
      currentIndex > 0
        ? Math.round(((currentIndex - errors) / currentIndex) * 100)
        : 100;
    accuracyElement.textContent = accuracy;
  }

  //Function to check typed character
  function checkCharacter(inputChar, targetChar) {
    if (inputChar !== targetChar) {
      errors++;
      //play error sound
      new Audio("/error.mp3").play();
      return false;
    } else {
      return true;
    }
  }
  //Function to display messages to the user
  function displayMessage(message) {
    const messageArea = document.getElementById("message-area");
    messageArea.textContent = message;
    //clear the msg after 3s
    setTimeout(() => {
      messageArea.textContent = "";
    }, 3000);
  }
  //Event listener for typing input
  typingInputElement.addEventListener("input", (e) => {
    const typedText = typingInputElement.value;
    const targetText = textToTypeElement.textContent;
    if (currentIndex < targetText.length) {
      const isCorrect = checkCharacter(
        typedText[currentIndex],
        targetText[currentIndex]
      );

      textToTypeElement.innerHTML =
        targetText.substring(0, currentIndex) +
        `<span class='${isCorrect ? "correct" : "incorrect"}'>${
          targetText[currentIndex]
        }</span>` +
        targetText.substring(currentIndex + 1);
      currentIndex++;
      if (currentIndex === targetText.length) {
        displayMessage("Text completed starting a new one.");
        initializeGame();
      }
    }
    //update the feedback
    updateFeedback();
  });
  //Start the game
  initializeGame();
});
