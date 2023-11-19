class RandomStringGenerator {
  constructor(characterSet = "alphanumeric") {
    this.characterSet = characterSet;
  }

  generate(length) {
    const charSet = {
      numeric: "0123456789",
      alphanumeric:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      alphanumericSymbol:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()",
      customPattern: this.generateCustomPattern(),
    };

    let result = "";
    const characters = charSet[this.characterSet];
    const charactersLength = characters.length;
    if (this.characterSet === "customPattern") {
      result = characters;
    } else {
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
    }
    return result;
  }

  generateCustomPattern() {
    const words = [
      "Apple",
      "Fish",
      "Grape",
      "Kiwi",
      "Lemon",
      "Dog",
      "Cat",
      "Orange",
      "Bird",
      "Color",
      "Red",
      "Train",
      "Car",
      "Lion",
      "Tiger",
      "Family",
      "House",
      "Room",
      "Rice",
      "Road",
    ];
    const symbols = "@#$+-_&";
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const randomSymbol = symbols.charAt(
      Math.floor(Math.random() * symbols.length)
    );
    const randomNumber = Math.floor(Math.random() * 900 + 100);
    return `${randomWord}${randomSymbol}${randomNumber}`;
  }
}

document
  .getElementById("generateButton")
  .addEventListener("click", function () {
    const characterSet = document.getElementById("characters").value;
    const length = parseInt(document.getElementById("length").value);

    const generator = new RandomStringGenerator(characterSet);
    const output = generator.generate(length);

    document.getElementById("output").textContent = output;
  });

document.getElementById("generateButton").click();

document
  .getElementById("generateButton")
  .addEventListener("mouseover", function () {
    document.getElementById("generateButton").click();
  });

document.getElementById("form").addEventListener("input", function (event) {
  const characterSet = document.getElementById("characters").value;
  const length = parseInt(document.getElementById("length").value);

  const generator = new RandomStringGenerator(characterSet);
  const output = generator.generate(length);

  document.getElementById("output").textContent = output;
});

document.getElementById("output").addEventListener("click", function () {
  const range = document.createRange();
  range.selectNode(document.getElementById("output"));
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();

  // Show 'Copied to clipboard!' message
  document.getElementById("copied").style.visibility = "visible";
  setTimeout(function () {
    document.getElementById("copied").style.visibility = "hidden";
  }, 2000);
});
