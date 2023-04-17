// import { Router, Request, Response } from 'express';
// import db from 'src/config/database';

// export class TransactionController {
//   public router: Router;

//   constructor() {
//     this.router = Router();
//     this.config();
//   }

//   private config(): void {
//     this.router.post('/', async (req: Request, res: Response) => {
//       const { date, type, amount } = req.body;

//       // Insert transaction into the database
//       const [transactionId] = await db('transactions').insert({
//         date,
//         type,
//         amount,
//       });

//       // Calculate the new balance
//       const assets = await db('transactions').where('type', 'asset').sum('amount');
//       const liabilities = await db('transactions').where('type', 'liability').sum('amount');
//       const balance = assets - liabilities;

//       res.send({
//         id: transactionId,
//         date,
//         type,
//         amount,
//         balance,
//       });
//     });
//   }
// }

// export const transactionController = new TransactionController();
