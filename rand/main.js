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
    generatePassword();
  });

document.getElementById("generateButton").click();

document.getElementById("copyButton").addEventListener("click", function () {
  copyToClipboard();
});

document
  .getElementById("generateButton")
  .addEventListener("mouseover", function () {
    document.getElementById("generateButton").click();
  });

document
  .getElementById("copyButton")
  .addEventListener("mouseover", function () {
    document.getElementById("copyButton").click();
  });

document.getElementById("form").addEventListener("input", function (event) {
  const characterSet = document.querySelector(
    'input[name="characterSet"]:checked'
  ).value;
  const length = parseInt(document.getElementById("length").value);

  const generator = new RandomStringGenerator(characterSet);
  const passwordOutput = generator.generate(length);

  document.getElementById("passwordOutput").textContent = passwordOutput;
});

function generatePassword() {
  const characterSet = document.querySelector(
    'input[name="characterSet"]:checked'
  ).value;
  const length = parseInt(document.getElementById("length").value);
  const generator = new RandomStringGenerator(characterSet);
  const passwordOutput = generator.generate(length);

  document.getElementById("passwordOutput").value = passwordOutput; // input 要素に表示
}

function copyToClipboard() {
  const passwordOutput = document.getElementById("passwordOutput");
  passwordOutput.select();
  document.execCommand("copy");

  document.getElementById("copied").style.visibility = "visible";
  setTimeout(function () {
    document.getElementById("copied").style.visibility = "hidden";
  }, 2000);
}

document.getElementById("form").addEventListener("change", function () {
  generatePassword();
});
