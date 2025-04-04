//const { v4 } = require('uuid'); no final a gente apaga usando yarn remove uuid
const db = require('../../../database/index')



class ContactsRepository {
    async findAll(orderBy = 'ASC') {
        const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC' //previnir sql injection pois o $ não funciona aqui
        const rows = await db.query(`
            SELECT contacts.*, categories.name AS category_name
            FROM contacts
            LEFT JOIN categories ON categories.id = contacts.category_id
            ORDER BY contacts.name ${direction}`);
        return rows


        }

   async findById(id) {
        const [row] = await db.query(`
            SELECT contacts.*, categories.name AS category_name
            FROM contacts
            LEFT JOIN categories ON categories.id = contacts.category_id
            WHERE contacts.id = $1`, [id]);
        return row;
    }

    async findByEmail(email) {
        const [row] = await db.query('SELECT * FROM contacts WHERE email = $1', [email]);
        return row;
    }



    async create({ name, email, phone, category_id, }) {
       const [row] = await db.query(` INSERT INTO contacts (name, email, phone, category_id) VALUES(
      $1, $2, $3, $4) RETURNING * `,[name, email, phone, category_id]); // evitar sql injection com o $
      return row;
    }


   async update(id, { name, email, phone, category_id }) {
        const [row] = await db.query(`
            UPDATE contacts
            SET name = $1,
            email = $2,
            phone = $3,
            category_id = $4
            WHERE id = $5
            RETURNING * `, [name, email, phone, category_id, id]); //essa [] serve para pegar o primeiro do aray
        return row;
    }
    async delete(id) {
        const deleteOp = await db.query('DELETE FROM contacts WHERE  id = $1',[id])
        //row vai ser undefined aqui, por isso não podemos usar pois retorna um  array vazio
        return deleteOp;
    }
}

module.exports = new ContactsRepository();
