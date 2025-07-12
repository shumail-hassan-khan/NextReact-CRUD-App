import { prisma } from '../../../lib/prisma';

const validateInput = ({ make, model, year, plate }) => {
    const makeValid = /^[A-Za-z\s]+$/.test(make);
    const modelValid = /^[A-Za-z0-9\s]+$/.test(model);
    const yearValid = /^\d{4}$/.test(year);
    const plateValid = /^[A-Z]{3}-\d{3}$|^[A-Z]{2}-\d{4}$/.test(plate);

    if (!makeValid) return 'Make can only contain letters.';
    if (!modelValid) return 'Model can only contain letters and numbers.';
    if (!yearValid) return 'Year must be exactly 4 digits.';
    if (!plateValid) return 'Plate must be in format ABC-123 or AB-1234.';
    return null;
};

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.status(200).end();
        return;
    }

    res.setHeader('Access-Control-Allow-Origin', '*');



    if (req.method === 'PUT') {
        const { make, model, year, plate } = req.body;

        if (!make || !model || !year || !plate) {
            res.status(400).json({
                status: 400,
                message: 'All fields are required.',
                data: null,
            });
            return;
        }

        const error = validateInput({ make, model, year, plate });
        if (error) {
            res.status(400).json({ status: 400, message: error, data: null });
            return;
        }

        try {
            const updated = await prisma.car.update({
                where: { id: Number(id) },
                data: { make, model, year: Number(year), plate },
            });

            res.status(200).json({
                status: 200,
                message: 'Car updated successfully.',
                data: updated,
            });
        } catch (err) {
            res.status(500).json({
                status: 500,
                message: 'Failed to update.',
                data: null,
            });
        }
        return;
    }


    if (req.method === 'DELETE') {
        try {
            const deleted = await prisma.car.update({
                where: { id: Number(id) },
                data: { is_deleted: true },
            });

            res.status(200).json({
                status: 200,
                message: 'Car deleted (soft) successfully.',
                data: deleted,
            });
        } catch (err) {
            res.status(500).json({
                status: 500,
                message: 'Failed to delete.',
                data: null,
            });
        }
        return;
    }


    res.status(405).json({
        status: 405,
        message: 'Method not allowed',
        data: null,
    });
}
