import Stat from '../models/statModel.js';

// Get stat by name
const getStat = async (req, res) => {
    const stat = await Stat.find();
    res.status(200).json(stat);
};

// Update stat by ID
let sessions = {};

const updateStat = async (req, res) => {
    try {
        const filter = { name: req.body.name };
        const increment = { value: req.body.value };
        const options = { new: true, runValidators: true };
        const updatedStat = await Stat.findOneAndUpdate(filter, increment, options);
        if (!updatedStat) {
            return res.status(404).json({ error: 'Stat not found' });
        }

        // Store the CPS of the session
        sessions[req.body.name] = req.body.value;

        res.json(updatedStat);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getTotalCps = async (req, res) => {
    // Calculate the total CPS
    const totalCps = Object.values(sessions).reduce((sum, cps) => sum + cps, 0);

    res.json({ totalCps });
};

export { getStat, updateStat, getTotalCps};