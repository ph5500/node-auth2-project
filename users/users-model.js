const db = require("../database/connection.js")

module.exports = {
    add,
    find,
    findBy,
    findById,
}

function find() {
    return db('users')
    // .join('roles', 'users.role', 'roles.id')
    // .select('users.id', 'users.username', 'role.name')
    // .orderBy('users.id')
}

function findBy(filter) {
    console.log(filter)
    return db('users')
        // .join('roles', 'users.role', 'roles.id')
        // .select('users.id', 'users.username', 'role.name', 'users.password')
        .where('users.username', filter.username)
    // .orderBy('users.id')
}

async function add(user) {
    try {
        console.log("this is async user function", user);
        const [id] = await db('users').insert(user, 'id')
        return findById(id)
    } catch (error) {
        throw error;
    }
}

function findById(id) {
    return db('users').where({ id })
        .first()
}