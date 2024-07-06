document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm");

    registrationForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent the form from submitting in the traditional way

        const formData = new FormData(registrationForm);

        try {
            const response = await fetch("/api/submit", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const responseData = await response.json();
            console.log("Response from server:", responseData);

            showTemporaryAlert("Registered successfully!", 5000);

            // Clear the form fields
            registrationForm.reset();
        } catch (error) {
            console.error("Error:", error);
            alert("Error submitting data. Please try again.");
        }
    });

    function showTemporaryAlert(message, duration) {
        const alertDiv = document.createElement("div");
        alertDiv.textContent = message;
        alertDiv.style.position = "fixed";
        alertDiv.style.top = "20px";
        alertDiv.style.left = "50%";
        alertDiv.style.transform = "translateX(-50%)";
        alertDiv.style.backgroundColor = "#4CAF50";
        alertDiv.style.color = "white";
        alertDiv.style.padding = "10px";
        alertDiv.style.borderRadius = "5px";
        alertDiv.style.zIndex = "9999";

        document.body.appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.remove();
        }, duration);
    }
});
