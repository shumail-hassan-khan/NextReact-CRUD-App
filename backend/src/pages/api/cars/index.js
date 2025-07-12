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
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.status(200).end();
        return;
    }

    res.setHeader('Access-Control-Allow-Origin', '*');



    if (req.method === 'POST') {
        const { make, model, year, plate } = req.body;

        if (!make || !model || !year || !plate) {
            res.status(400).json({ status: 400, message: 'All fields are required.', data: null });
            return;
        }

        const error = validateInput({ make, model, year, plate });
        if (error) {
            res.status(400).json({ status: 400, message: error, data: null });
            return;
        }

        try {
            const car = await prisma.car.create({
                data: {
                    make,
                    model,
                    year: Number(year),
                    plate,
                    is_deleted: false,
                },
            });

            res.status(201).json({
                status: 201,
                message: 'Car added successfully.',
                data: car,
            });
        } catch (err) {
            res.status(500).json({
                status: 500,
                message: 'Something went wrong while adding the car.',
                data: null,
            });
        }
        return;
    }


    if (req.method === 'GET') {
        try {
            const cars = await prisma.car.findMany({
                where: { is_deleted: false },
                orderBy: { createdAt: 'desc' },
            });

            res.status(200).json({
                status: 200,
                message: 'Cars fetched successfully.',
                data: cars,
            });
        } catch (err) {
            res.status(500).json({
                status: 500,
                message: 'Failed to fetch cars.',
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
