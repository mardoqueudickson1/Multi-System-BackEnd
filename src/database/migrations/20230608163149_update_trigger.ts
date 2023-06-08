import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE OR REPLACE FUNCTION atualizar_quantidade_estoque()
    RETURNS TRIGGER AS $$
    DECLARE
      produto saidas_produtos.lista_produtos%ROWTYPE;
    BEGIN
      IF TG_OP = 'INSERT' THEN
        -- Iterar sobre os produtos despachados
        FOREACH produto IN ARRAY NEW.lista_produtos
        LOOP
          UPDATE estoque
          SET quantidade = quantidade - produto.quantidade
          WHERE id = produto.id;
        END LOOP;
      END IF;

      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER atualizar_quantidade_estoque_trigger
    AFTER INSERT ON saidas_produtos
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_quantidade_estoque();
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP TRIGGER atualizar_quantidade_estoque_trigger ON saidas_produtos;
    DROP FUNCTION atualizar_quantidade_estoque();
  `);
}
