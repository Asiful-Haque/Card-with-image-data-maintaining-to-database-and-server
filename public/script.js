document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm");
    const registrationsContainer = document.getElementById("registrations");

    registrationForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent the form from submitting in the traditional way

        const formData = new FormData(registrationForm);
        console.log("Submitting form data:", formData);

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
            console.log("Form reset and calling fetchRegistrations");
            fetchRegistrations();
        } catch (error) {
            console.error("Error:", error);
            alert("Error submitting data. Please try again.");
        }
    });

    async function fetchRegistrations() {
        try {
            const response = await fetch("/api/getRegistrations");

            if (!response.ok) {
                throw new Error("Failed to fetch registrations");
            }
            const registrations = await response.json();

            // Display registrations
            // registrationsContainer.innerHTML = "";
            for (const registration of registrations) {
                const registrationElement = document.createElement("div");
                registrationElement.classList.add("registration-item");

                // Convert binary data to base64 string
                const imageBlob = new Blob([new Uint8Array(registration.image.data.data)], {
                    type: registration.image.contentType,
                });
                const imgSrc = await convertBlobToBase64(imageBlob);

                registrationElement.innerHTML = `
                    <h2>${registration.name}</h2>
                    <p>ID: ${registration.id}</p>
                    <img src="${imgSrc}" alt="${registration.name}'s image" />
                `;
                registrationsContainer.appendChild(registrationElement);
            }
        } catch (error) {
            console.error("Error fetching registrations:", error);
        }
    }

    async function convertBlobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    // Initial fetch of registrations
    fetchRegistrations();
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
