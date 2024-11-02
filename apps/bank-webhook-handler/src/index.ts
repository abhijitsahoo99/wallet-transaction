// update balance in db, add txn
// balances
// onRampTransaction
import express from "express";
import db from "@repo/db/client";
import dotenv from "dotenv";
import path from "path";
const app = express();

app.use(express.json());

dotenv.config({ path: path.resolve(__dirname, "../../../packages/db/.env") });

app.post("/hdfcWebhook", async (req, res) => {
  //TODO: Add zod validation here?
  //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
  const paymentInformation: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  // Update balance in db, add txn
  try {
    await db.$transaction([
      db.balance.updateMany({
        where: {
          userId: Number(paymentInformation.userId),
        },
        data: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
      }),
      db.onRampTransaction.updateMany({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    res.json({
      message: "Captured",
    });
  } catch (e) {
    console.error(e);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(3003);

// app.post("/hdfcWebhook", async (req, res) => {
//   //TODO: Add zod validation here?
//   //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
//   // TODO: Check if this onRamptxn is processing or not, once done, if sent request again, it shouldn't work neither update balance again.
//   const paymentInformation: {
//     token: string;
//     userId: string;
//     amount: string;
//   } = {
//     token: req.body.token,
//     userId: req.body.user_identifier,
//     amount: req.body.amount,
//   };
//   console.log("Received payment info: ", paymentInformation);

//   try {
//     console.log("Starting transaction...");
//     const userBalance = await db.balance.findUnique({
//       where: {
//         userId: Number(paymentInformation.userId),
//       },
//     });

//     if (!userBalance) {
//       return res.status(404).json({ message: "User balance not found" });
//     }
//     const result = await db.$transaction([
//       db.balance.update({
//         where: {
//           userId: Number(paymentInformation.userId),
//         },
//         data: {
//           amount: {
//             // You can also get this from your DB
//             increment: Number(paymentInformation.amount),
//           },
//         },
//       }),
//       db.onRampTransaction.updateMany({
//         where: {
//           token: paymentInformation.token,
//         },
//         data: {
//           status: "Success",
//         },
//       }),
//     ]);
//     console.log("Transaction result: ", result);
//     res.json({
//       message: "Captured",
//     });
//   } catch (e) {
//     console.error(e);
//     res.status(411).json({
//       message: "Error while processing webhook",
//     });
//   }
// });

// app.listen(3003);
