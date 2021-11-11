exports.up = function (knex) {
  // create the 'appliances' table
  return knex.schema.createTable("appliances", (t) => {
    t.increments() // auto-incrementing id column
      .index(); // index this column

    t.string("name", 255) // maximum length of 255 characters
      .notNullable(); // add a not-null constraint to this column

    t.string("maker", 255) // maximum length of 255 characters
      .notNullable(); // add a not-null constraint to this column

    t.integer("price").unsigned().notNullable(); // add a not-null constraint to this column

    t.string("category", 255) // maximum length of 255 characters
      .notNullable(); // add a not-null constraint to this column
  });
};

exports.down = function (knex) {
  // undo this migration by destroying the 'appliances' table
  return knex.schema.dropTable("appliances");
};
