const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
    createCustomer,
    getCustomer,
    getAllCustomer,
    updateCustomer,
    deleteCustomer,
    stripeCheckout
} = require("../controllers/stripe");

router.route("/create").post(createCustomer);

router.route("/get/:id").get(getCustomer);

router.route("/get/all").get(getAllCustomer);

router.route("/update/:id").put(protect, updateCustomer);

router.route("/delete/:id").delete(protect, deleteCustomer);

router.route("/checkout").post(protect, stripeCheckout);

module.exports = router;
