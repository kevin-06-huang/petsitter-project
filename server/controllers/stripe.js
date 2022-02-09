const stripe = require('stripe')(process.env.STRIPE_KEY);


// @route POST /stripe/customer/create
// @desc create new customer
// @access Public
export async function createCustomer(req, res) {
    const customer = await stripe.customers.create({
        description: req.body.description,
    });
    res.status(200).json({
        success: {
            customer
        },
    });
}

// @route GET /stripe/customer/get/:id
// @desc retrieve a customer
// @access Public
export async function getCustomer(req, res) {
    const customer = await stripe.customers.retrieve(
        req.params.id
    );
    res.status(200).json({
        success: {
            customer
        },
    });
}

// @route PUT /stripe/customer/update/:id
// @desc update a customer
// @access Public
export async function updateCustomer(req, res) {
    const customer = await stripe.customers.update(
        req.params.id,
        { metadata: { order_id: req.body.orderId } }
    );
    res.status(200).json({
        success: {
            customer
        },
    });
}

// @route DELETE /stripe/customer/update/:id
// @desc delete a customer
// @access Public
export async function deleteCustomer(req, res) {
    const customer = await stripe.customers.del(
        req.params.id
    );
    res.status(200).json({
        success: {
            customer
        },
    });
}

// @route GET /stripe/delete
// @desc delete a customer
// @access Public
export async function getAllCustomer(req, res) {
    const customer = await stripe.customers.list({
        limit: 3,
    });
    res.status(200).json({
        success: {
            customer
        },
    });
}

// @route POST /stripe/checkout
// @desc delete a customer
// @access Public
export async function stripeCheckout(req, res) {
    const priceId = req.body.priceId;

    const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: "http://localhost:3000/cancel",

    });

    res.status(200).json({
        success: {
            success_url
        },
    });
}  