const express = require("express");
const app = express();
const cors = require('cors'); // Import the cors middleware
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51NiBQ0DfCWORHf3vF0nwAq9cOgiT67krBoOm18g0ew0iiA609vsy1vgUlUJ2w87q43xMMSJCou99GsOKSMoU7Qd400ykt1fBNI');
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const calculateOrderAmount = (chrono) => {
  const baseAmount = 10.00;
  const chronoMultiplier = parseInt(chrono) || 1; // Use parseInt to ensure it's a valid number

  return baseAmount * chronoMultiplier;
  
};

app.post("/create-payment-intent", async (req, res) => {
  const { chrono } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(chrono),
    currency: "myr",
    payment_method_types: ["card", "fpx"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
