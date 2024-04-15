import { BACKEND_URL } from "./config.js";

// Function to get the score
async function getScore() {
    try {
        const response = await fetch(`${BACKEND_URL}/score`);
        const data = await response.json();
        return data.score;
    } catch (error) {
        console.error("Error getting score:", error);
        return null;
    }
}

// Function to update the score
async function updateScore(newScore) {
    try {
        const response = await fetch(`${BACKEND_URL}/score`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ score: newScore }),
        });
        const data = await response.json();
        return data.success;
    } catch (error) {
        console.error("Error updating score:", error);
        return false;
    }
}

export { getScore, updateScore };