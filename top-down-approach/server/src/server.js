import app from './app.js';

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`[Top-Down Server] Running on http://localhost:${PORT}`);
});
