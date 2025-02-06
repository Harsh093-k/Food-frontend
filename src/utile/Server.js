import { backendUrl } from "./config";

export const makeUnauthenticatedPOSTRequest = async (route, body) => {
    try {
        

        const response = await fetch(backendUrl + route, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Correct header for JSON requests
            },
            body: JSON.stringify(body),
        });

        // Check for non-200 status codes
        if (!response.ok) {
            const errorDetails = await response.json(); // Parse the error response if possible
            console.error("API Error:", errorDetails);
            throw new Error(errorDetails.message || `Error ${response.status}: ${response.statusText}`);
        }

        const formattedResponse = await response.json();
        console.log(formattedResponse);
        return formattedResponse;
    } catch (error) {
        console.error("Error making POST request:", error.message);
        return { error: error.message }; // Return an error object
    }
};


export const makeUnauthenticatedGETRequest = async (route) => {
    try {
        

        const response = await fetch(backendUrl + route, {
            method: "GET",
            headers: {
                "Content-Type": "application/json", // Correct header for JSON requests
            },
          
        });

        // Check for non-200 status codes
        if (!response.ok) {
            const errorDetails = await response.json(); // Parse the error response if possible
            console.error("API Error:", errorDetails);
            throw new Error(errorDetails.message || `Error ${response.status}: ${response.statusText}`);
        }

        const formattedResponse = await response.json();
        console.log(formattedResponse);
        return formattedResponse;
    } catch (error) {
        console.error("Error making POST request:", error.message);
        return { error: error.message }; // Return an error object
    }
};
