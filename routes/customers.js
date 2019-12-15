const express = require('express');
const router = express.Router();
const {Customer, validate} = require('../models/customer'); 

router.get('/', async (req, res) => {
    const customers = await Customer.find();
    res.send(customers).status(200);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.send("could not found a customer with the given ID").status(404);

    return res.send(customer).status(200);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name : req.body.name, 
        phone : req.body.phone
    });

    try{
        customer = await customer.save();
    }
    catch(ex) {
        for(field in ex.errors){
            console.log(ex.errors[field].message)
        }
        return res.status(400).send(ex.errors)

    }
    return res.send(customer).status(200);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone
    }, {new:true })

    if(!customer) return res.send("could not found a customer with the given ID").status(404);

    return res.send(customer).status(200);
});


router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if(!customer) return res.send("could not found a customer with the given ID").status(404);

    return res.send(customer).status(200);
})

module.exports = router;