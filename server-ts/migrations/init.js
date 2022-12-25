exports.up = function(knex) {
    return knex.schema
      .createTable('announcement', function (table) {
        table.increments('id').primary();
        table.string('topic', 255).notNullable();
        table.string('description', 1000);
        table.string('remark_if_positive', 1000);
        table.string('remark_if_negative', 1000);
        table.timestamp('pub_date_time', { useTz: false });
        table.string('user_code', 64).notNullable();
      })
      .createTable('user_result', function (table) {
        table.increments('id').primary();
        table.integer('announcement_id').unsigned();
        table.foreign('announcement_id').references('announcement.id');
        table.string('result', 255);
        table.smallint('result_type');
        table.string('remark', 1000);
        table.boolean('is_pinned');
        table.datetime('view_date_time', { useTz: false });
        table.datetime('ack_date_time', { useTz: false });
        table.datetime('update_date_time', { useTz: false });
        table.datetime('expire_date_time', { useTz: false });
        table.string('user_code', 64).notNullable();
      })
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTable("user_result")
      .dropTable("announcement")
  };
  
  exports.config = { transaction: false };