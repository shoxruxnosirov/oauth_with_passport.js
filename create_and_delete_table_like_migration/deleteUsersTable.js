const { db } = require('../services/workingDb');

(async function () {

    try {

        await db.schema.dropTableIfExists('users');

        await db.destroy();

        console.log("users jadval o'chirildi!");

    } catch (err) {
        console.log('users jadvalni o\'chirishda xatolik: ', err);
    }

})();

// deleteTableUsers();