const db = require('../data/config-db');

module.exports = {
    add,
    find,
    findBy,
    findById
};

function find() {
    return db('peoples')
        .select('id', 'username', 'department');
};

async function add(data) {
    const [id] = await db('peoples').insert(data)

    return findById(id)
};

function findBy(filter) {
    return db('peoples')
        .where(filter);
};

function findById(id) {
    return db('peoples')
        .where({ id })
        .first();
};