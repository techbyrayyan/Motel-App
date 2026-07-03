    const data = JSON.parse(localStorage.getItem("orderData"));

    if (data) {
      document.getElementById("name").textContent = data.name;
      document.getElementById("company").textContent = data.company;
      document.getElementById("room").textContent = data.roomNumber;
      document.getElementById("meal").textContent = data.mealType;
      document.getElementById("datetime").textContent = new Date().toLocaleString();
    } else {
      document.getElementById("orderDetails").innerHTML = "<p class='text-red-500'>No order found.</p>";
    }