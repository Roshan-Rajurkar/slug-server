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
        .limit(limit);

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

const checkBlockCustomer = async(req, res) => {
    const {id} = req.params;

    try {
        // Find the customer by ID
        const customer = await Customer.findById(id);

        // If the customer doesn't exist
        if (!customer) {
            return res.status(400).json({
                status: false,
                message: "Customer does not exist."
            });
        }

        // Toggle the published status
        customer.blocked = !customer.blocked;

        // Save the updated customer
        await customer.save();

        res.status(200).json({
            status: true,
            data: customer,
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Something went wrong.",
            error: error.message
        });
    }
}

module.exports = { getAllCustomers, checkBlockCustomer };
