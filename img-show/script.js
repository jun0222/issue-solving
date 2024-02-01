document.getElementById("imageInput").addEventListener("change", function () {
  const files = this.files;
  const imageContainer = document.getElementById("imageContainer");

  // 画像を表示
  for (let file of files) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.style.width = "100px";
      img.style.height = "100px";
      img.style.margin = "10px";

      // 削除ボタンを追加
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "削除";
      deleteButton.onclick = function () {
        if (confirm("この画像を削除しますか？")) {
          // 画像とボタンを削除
          img.remove();
          deleteButton.remove();
          // ローカルストレージから削除
          removeImageFromLocalStorage(img.src);
        }
      };

      imageContainer.appendChild(img);
      imageContainer.appendChild(deleteButton);
    };
    reader.readAsDataURL(file);
  }
});

function uploadImages() {
  const imageContainer = document.getElementById("imageContainer");
  const images = imageContainer.getElementsByTagName("img");
  for (let img of images) {
    saveImageToLocalStorage(img.src);
  }
  alert("画像がアップロードされました！");
}

function saveImageToLocalStorage(dataUrl) {
  let images = localStorage.getItem("images");
  images = images ? JSON.parse(images) : [];
  if (images.length < 10) {
    images.push(dataUrl);
    localStorage.setItem("images", JSON.stringify(images));
  } else {
    alert("10枚までしかアップロードできません！");
  }
}

function removeImageFromLocalStorage(dataUrl) {
  let images = localStorage.getItem("images");
  images = images ? JSON.parse(images) : [];
  images = images.filter((image) => image !== dataUrl);
  localStorage.setItem("images", JSON.stringify(images));
}

function clearAllImages() {
  if (confirm("全ての画像を削除しますか？")) {
    localStorage.removeItem("images");
    document.getElementById("imageContainer").innerHTML = "";
    alert("全ての画像が削除されました！");
  }
}

// ページ読み込み時にローカルストレージから画像を読み込む
window.onload = function () {
  const images = JSON.parse(localStorage.getItem("images")) || [];
  const imageContainer = document.getElementById("imageContainer");
  images.forEach((dataUrl) => {
    const img = document.createElement("img");
    img.src = dataUrl;
    // img.style.width = "100px";
    // img.style.height = "100px";
    img.style.margin = "10px";
    imageContainer.appendChild(img);
  });
};
