const stripe = require('stripe')("SECRET_KEY");

module.exports = async function () {
  const customer = await stripe.customers.create();
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'usd',
    setup_future_usage: 'off_session',
    customer: customer.id,
    payment_method_types: ['us_bank_account'],
    payment_method_options: {
      us_bank_account: {
        verification_method: 'instant',
        financial_connections: { permissions: ['payment_method', 'balances'] },
      },
    },
  });

  return paymentIntent;
}