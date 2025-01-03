async function loadProfile() {
  const accessToken = localStorage.getItem("access-token");
  if (!accessToken) {
    window.location.href = "/pages/login.html";
    return;
  }

  try {
    const response = await fetch("/api/user/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const result = await response.json();
      const data = result.data;
      document.getElementById("fullName").textContent = data.fullName;
      document.getElementById("userEmail").textContent = data.email;
      document.getElementById("userRole").textContent = data.role;
    } else {
      localStorage.removeItem("access-token");
      localStorage.removeItem("refresh-token");
      window.location.href = "/pages/login.html";
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while loading profile");
  }
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("access-token");
  window.location.href = "/login";
});

// Load profile when page loads
loadProfile();
