import { Knex } from 'knex';

exports.up = function (knex: Knex) {
  return knex.raw(`
    CREATE OR REPLACE FUNCTION atualizar_quantidade_estoque()
    RETURNS TRIGGER AS $$
    BEGIN
      IF TG_OP = 'INSERT' THEN
        UPDATE produtos
        SET quantidade_estoque = quantidade_estoque + NEW.quantidade
        WHERE id = NEW.produto_id;
      ELSIF TG_OP = 'DELETE' THEN
        UPDATE produtos
        SET quantidade_estoque = quantidade_estoque - OLD.quantidade
        WHERE id = OLD.produto_id;
      END IF;

      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER atualizar_quantidade_estoque_trigger
    AFTER INSERT OR DELETE ON saidas_produtos
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_quantidade_estoque();
  `);
};

exports.down = function (knex: Knex) {
  return knex.raw(`
    DROP TRIGGER atualizar_quantidade_estoque_trigger ON saidas_produtos;
    DROP FUNCTION atualizar_quantidade_estoque();
  `);
};
