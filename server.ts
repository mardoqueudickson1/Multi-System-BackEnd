import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log();
  console.log('CONEXÃO COM SERVIDOR REALIZADA COM SUCESSO');
  console.log(`http://localhost:${port}`);
  console.log();
});
