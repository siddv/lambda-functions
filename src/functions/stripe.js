import dotenv from 'dotenv';
import Stripe from 'stripe';
import Respond from './modules/stripe/responses'

dotenv.config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  const respond = new Respond(event, context);
  
  if (event.httpMethod !== 'POST') {
    return respond.methodNotAllowed();
  }

  return respond.basicResponse
}