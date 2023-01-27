const express = require('express');
const cors = require('cors');
const path = require('path');
const createPaymentIntent = require('./sever');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/secret', async (req, res) => {
  const intent = await createPaymentIntent();
  return res.json({ client_secret: intent.client_secret });
});

app.listen(3000, () => {
  console.log('Running on port 3000');
});