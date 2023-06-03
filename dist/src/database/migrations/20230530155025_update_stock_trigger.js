"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = function (knex) {
    return knex.raw(`
    CREATE OR REPLACE FUNCTION atualizar_quantidade_estoque()
    RETURNS TRIGGER AS $$
    BEGIN
      IF TG_OP = 'INSERT' THEN
        UPDATE estoque
        SET quantidade = quantidade + NEW.quantidade
        WHERE id = NEW.estoque_id;
      ELSIF TG_OP = 'DELETE' THEN
        UPDATE estoque
        SET quantidade = quantidade - OLD.quantidade
        WHERE id = OLD.estoque_id;
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
exports.down = function (knex) {
    return knex.raw(`
    DROP TRIGGER atualizar_quantidade_estoque_trigger ON saidas_produtos;
    DROP FUNCTION atualizar_quantidade_estoque();
  `);
};
