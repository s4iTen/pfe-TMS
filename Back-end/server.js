const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const userRoutes = require("./routes/userRoutes");
const propretyRoutes = require("./routes/propretyRoutes");
const rentRoutes = require("./routes/rentRoutes");
const expenceRoutes = require("./routes/expenceRoutes");
const authRoutes = require("./routes/authRoutes");
const maintainerRoutes = require("./routes/maintainerRoutes");
const statistiqueRoutes = require("./routes/statistiqueRoutes");
const rentServices = require("./services/rentServices");
require("./services/rentServices");

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use("/api", userRoutes);
app.use("/api", propretyRoutes);
app.use("/api", rentRoutes);
app.use("/api", expenceRoutes);
app.use("/api", authRoutes);
app.use("/api", maintainerRoutes);
app.use("/api", statistiqueRoutes);

app.post("/create-checkout-session", async (req, res) => {
  const { property, data, amount } = req.body;

  if (!property || !data || !amount) {
    return res.status(400).json({ error: "Invalid request data" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: property.title,
              description:
                property.description.split(" ").slice(0, 35).join(" ") + "...",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "http://localhost:5173/",
      metadata: data.state,
    });

    res.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/verify-payment", async (req, res) => {
  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ error: "Session ID is required" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      await rentServices.createRent({
        userRent: session.metadata.userRent,
        userOwner: session.metadata.userOwner,
        property: session.metadata.property,
        startDate: session.metadata.startDate,
        endDate: session.metadata.endDate,
        totalPrice: session.amount_total / 100,
      });
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ error: "Payment not completed" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
