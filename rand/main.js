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
      hiragana: this.generateHiragana(),
      katakana: this.generateKatakana(),
      customPattern: this.generateCustomPattern(),
      uuid: this.generateUUID(),
    };

    let result = "";
    const characters = charSet[this.characterSet];
    const charactersLength = characters.length;
    if (
      // 文字数指定を無視する文字種
      this.characterSet === "customPattern" ||
      this.characterSet === "uuid"
    ) {
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

  generateHiragana() {
    // ひらがなのUnicode範囲: 3040-309F
    let hiragana = "";
    for (let i = 0x3041; i <= 0x3096; i++) {
      hiragana += String.fromCharCode(i);
    }
    return hiragana;
  }

  generateKatakana() {
    // カタカナのUnicode範囲: 30A0-30FF
    let katakana = "";
    for (let i = 0x30a1; i <= 0x30fa; i++) {
      katakana += String.fromCharCode(i);
    }
    return katakana;
  }

  generateUUID() {
    const uuids = [
      "feb444aa-3998-4692-9667-d6ddf11ef382",
      "3c1425b1-35d4-447a-a8aa-3c00e1b64dbb",
      "c7f0b593-f7cc-42e9-b907-459dc9caa7ce",
      "b7e5a251-1f80-476d-8e07-ad803e5e7314",
      "11e7939e-bfe2-41c0-9401-1c672752c0ac",
      "c1b32b2e-040d-407a-93b3-eb18715bdf7d",
      "f092b5a7-70a2-4473-a85b-3b8aff27a9a6",
      "68f017e9-7d64-49f6-9fe2-65b4c977e055",
      "a01dbc8f-748d-4d48-b5ce-1a52c0937d64",
      "1861fca2-4b41-4a06-8ab4-63d23ee42ff0",
    ];

    return uuids[Math.floor(Math.random() * uuids.length)];
  }
}

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
  generatePassword();
});

document.getElementById("form").addEventListener("change", function () {
  generatePassword();
});
