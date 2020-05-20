
exports.up = function (knex) {
    return knex.schema
        .createTable('roles', tbl => {
            tbl.increments();
            tbl.string('name', 128).notNullable().unique();
        })//roles


        .createTable('users', tbl => {
            tbl.increments()
            tbl.string('username', 128).notNullable().unique().index()
            tbl.string('password', 256).notNullable();
            tbl.string('department', 128).notNullable();

            tbl.integer('role')
                .unsigned()
                .references('roles.id')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')
        })//users

};



exports.down = function (knex) {
    return knex.schema.dropTableIfExists("roles").dropTableIfExists("users");

};