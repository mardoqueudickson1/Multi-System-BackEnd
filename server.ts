import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.APP_PORT;
const url = process.env.APP_URL;

app.listen(port, () => {
  console.log();
  console.log('CONEXÃO COM SERVIDOR REALIZADA COM SUCESSO');
  console.log(`API executando na porta ${port}`);
  console.log(`CTL + clique em ${url}${port}`);
  console.log();
  
});
