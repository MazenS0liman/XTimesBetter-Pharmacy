const express = require('express')
const {
    getOrderDetails, addNewAddress, chooseExistingAddress, proceedToPayment, getAllExistingAddresses
} = require('../../controllers/patient/checkoutAddressController');



const router = express.Router()


// GET order details
router.get('/', getOrderDetails)

//Add new delivery Address
router.post('/addNew', addNewAddress)

//Add new delivery Address
router.post('/existing', chooseExistingAddress)

//GET to payment step
router.get('/payment', proceedToPayment)

//GET all existing addresses
router.get('/allExisting', getAllExistingAddresses)


module.exports = router