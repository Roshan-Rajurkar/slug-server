const Customer = require("../../models/Customer");

const getAllCustomers = async (req, res) => {
    const orderBy = req.query.orderBy || 'desc';
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.query || "";

    try {
        const customers = await Customer.find({
            $or: [
                { username: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ]
        })
        .sort({ createdAt: orderBy })
        .limit(limit)

        res.status(200).json({
            status: true,
            data: customers,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Failed to fetch customers",
            error: error.message
        });
    }
}

module.exports = { getAllCustomers };
