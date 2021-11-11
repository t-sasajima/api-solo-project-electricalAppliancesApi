exports.up = function (knex) {
  // create the 'comments' table
  return knex.schema.createTable("comments", (t) => {
    t.increments() // auto-incrementing id column
      .index(); // index this column

    t.string("username", 255) // maximum length of 255 characters
      .notNullable(); // add a not-null constraint to this column

    t.text("text") // maximum length of 255 characters
      .notNullable(); // add a not-null constraint to this column

    t.integer("appliance_id").unsigned().references("id").inTable("appliances");

    t.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  // undo this migration by destroying the 'comments' table
  return knex.schema.dropTable("comments");
};
