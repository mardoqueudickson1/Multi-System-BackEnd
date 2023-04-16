import app from './app';

const port = 3001;

app.listen(port, () => {
  console.log();
  console.log('CONEXÃO REALIZADA COM SUCESSO');
  console.log(`SERVIDOR executando na porta ${port}`);
  console.log(`CTL + clique em http://localhost:${port}`);
  console.log();
});
