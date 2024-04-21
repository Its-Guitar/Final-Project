import { BACKEND_URL } from './config.js';

export async function getScore() {
    const scores = await fetch(`${BACKEND_URL}/tas`).then((r) => r.json());
    return scores;
};

export async function updateScore(taName, score) {
    //console.log(taName, score);

    const payload = {
        name: taName,
        score: score,
    };
    //console.log(payload);
    
    await fetch(`${BACKEND_URL}/tas`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    }).then(response => response.json());
}