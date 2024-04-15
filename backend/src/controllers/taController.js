import TA from '../models/taModel.js';

// Get score by ID
const getScore = async (req, res) => {
    try {
        const score = await TA.findById(req.params.id);
        if (!score) {
            return res.status(404).json({ error: 'Score not found' });
        }
        res.json(score);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update score by ID
const updateScore = async (req, res) => {
    try {
        const score = await TA.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!score) {
            return res.status(404).json({ error: 'Score not found' });
        }
        res.json(score);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export { getScore, updateScore};