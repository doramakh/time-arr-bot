const { Pool } = require("pg")

const { PSQLDB } = require("./config")

const pool = new Pool(PSQLDB)

const fetch = async (SQL, ...params) => {
    const client = await pool.connect()

    try {
        const { rows } = await client.query(SQL, params)
        return rows

    } catch (error) {
        throw error
    }finally {
        client.release()
    }
}

const fetchOne = async (SQL, ...params) => {
    const client = await pool.connect()

    try {
        const { rows:[row] } = await client.query(SQL, params)
        return row

    } catch (error) {
        throw error
    }finally {
        client.release()
    }
}

module.exports.fetch = fetch
module.exports.fetchOne = fetchOne