import BaseService from "../../../services/base.service.js";
import transactionModel from "./transaction.model.js";
import { randomStringGenerator } from "../../../utils/helpers.js";

class TransactionService extends BaseService {
  constructor() {
    super(transactionModel);
  }

  transformTOTransaction = (order) => {
    return {
      code: randomStringGenerator(15),
      order: order._id,
      amount: order.toal,
      mode: "cash",
      refid: null,
      response: null,
      status: "unpaid",
      customer: order.customer,
    };
  };
}

const transactionSvc = new TransactionService();

export default transactionSvc;
