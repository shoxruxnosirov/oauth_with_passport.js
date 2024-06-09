const { db } = require('../services/workingDb');

(async function () {

  try {

    await db.schema.createTable('users', function (table) {
      table.increments('id').primary();
      table.string('username', 50).notNullable();
      table.string('googleId', 150).notNullable().unique();
      table.string('thumbnail').notNullable();
    //   table.string('password').notNullable().defaultTo('password');
      // table.timestamp('created_at').notNullable().defaultTo(db.fn.now());
    //   table.timestamps(true, true);
    });

    await db.destroy();

    console.log("users jadval yaratildi!");


  } catch (err) {
    console.log('users jadvalni yaratishda xatolik: ', err);
  }

})();