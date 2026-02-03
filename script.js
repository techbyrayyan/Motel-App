// ===================== FILE VALIDATION CONFIG =====================
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const allowedTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

// DOM Elements
const fileInput = document.getElementById("file");
const dropzone = document.getElementById("dropzone");
const previewContainer = document.getElementById("previewContainer");
const imgPreview = document.getElementById("imgPreview");
const fileInfo = document.getElementById("fileInfo");
const fileNameEl = document.getElementById("fileName");
const fileSizeEl = document.getElementById("fileSize");
const fileError = document.getElementById("fileError");

// ===================== FILE PREVIEW LOGIC =====================
function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function resetPreview() {
  previewContainer.classList.add("hidden");
  imgPreview.classList.add("hidden");
  fileInfo.classList.add("hidden");
  fileError.classList.add("hidden");
  imgPreview.src = "";
}

function handleFile(file) {
  resetPreview();
  if (!file) return;

  if (!allowedTypes.includes(file.type)) {
    fileError.textContent = "Unsupported file type.";
    fileError.classList.remove("hidden");
    return;
  }

  if (file.size > MAX_SIZE) {
    fileError.textContent = "File is too large. Max 5MB allowed.";
    fileError.classList.remove("hidden");
    return;
  }

  previewContainer.classList.remove("hidden");

  if (file.type.startsWith("image/")) {
    imgPreview.src = URL.createObjectURL(file);
    imgPreview.classList.remove("hidden");
  } else {
    fileInfo.classList.remove("hidden");
    fileNameEl.textContent = file.name;
    fileSizeEl.textContent = "(" + formatBytes(file.size) + ")";
  }
}

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  handleFile(file);
});

["dragenter", "dragover"].forEach(evt =>
  dropzone.addEventListener(evt, (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropzone.classList.add("border-blue-400", "ring-1", "ring-blue-200");
  })
);
["dragleave", "drop"].forEach(evt =>
  dropzone.addEventListener(evt, (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropzone.classList.remove("border-blue-400", "ring-1", "ring-blue-200");
  })
);

dropzone.addEventListener("drop", (e) => {
  const dt = e.dataTransfer;
  if (!dt) return;
  const file = dt.files[0];
  if (file) {
    fileInput.files = dt.files;
    handleFile(file);
  }
});

dropzone.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    fileInput.click();
  }
});

document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const file = document.getElementById("file").files[0];
  const name = document.getElementById("name").value;
  const company = document.querySelector("select").value;
  const roomNumber = document.querySelectorAll("select")[1].value;
  const mealType = "Breakfast"; // fixed for breakfast.html

  const formData = new FormData();
  formData.append("name", name);
  formData.append("company", company);
  formData.append("roomNumber", roomNumber);
  formData.append("mealType", mealType);
  formData.append("file", file);

  try {
    const res = await fetch("http://localhost:5000/api/students/register", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      // Store form data in localStorage for the next page
      localStorage.setItem("orderData", JSON.stringify({
        name, company, roomNumber, mealType
      }));

      // Redirect to success page
      window.location.href = "success.html";
    } else {
      alert("❌ Order Failed: Something went wrong");
    }
  } catch (err) {
    console.error(err);
    alert("❌ Order Failed: Server not responding");
  }
});
