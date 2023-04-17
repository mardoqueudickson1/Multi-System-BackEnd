import app from './app';

const port = 5000;

app.listen(port, () => {
  console.log();
  console.log('CONEXÃO COM SERVIDOR REALIZADA COM SUCESSO');
  console.log(`API executando na porta ${port}`);
  console.log(`CTL + clique em http://localhost:${port}`);
  console.log();
});
