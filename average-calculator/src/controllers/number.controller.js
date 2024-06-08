import { getNumbers as fetchNumbers } from '../services/number.service.js';

export async function getNumbers(req, res) {
  try {
    const numberId = req.params.numberid;
    const result = await fetchNumbers(numberId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
