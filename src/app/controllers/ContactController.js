const Contactsrepository = require('../controllers/repositories/Contactsrepository')
class ContactController {
    async index(request, response) {
        const { orderBy } = request.query;
        const contacts = await Contactsrepository.findAll(orderBy);


        response.json(contacts);
        //Listar todos os contatos

    }

    async show(request, response) {
        const { id } = request.params
        const contact = await Contactsrepository.findById(id);

        if (!contact) {

            return response.status(404).json({ error: 'Contact not found' });
        }
        response.json(contact)
        //para obter um rcontato
    }

    async store(request, response) {
        const { name, email, phone, category_id } = request.body;
        if (!name) {
            return response.status(400).json({ error: 'Name is required' })
        }

        const contactExists = await Contactsrepository.findByEmail(email);

        if (contactExists) {
            return response.status(400).json({ error: 'Email already been used' })
        }

        const contact = await Contactsrepository.create({
            name, email, phone, category_id,
        });

        response.stauts(201).json(contact);
        //para criar novo contato
    }

    async update(request, response) {
        const { id } = request.params;
        const { name, email, phone, category_id, } = request.body
        const contactExists = await Contactsrepository.findById(id);
        if (!contactExists) {
            return response.status(404).json({ error: 'Contact not found ' })
        }
        if (!name) {
            return response.status(400).json({ error: 'Name is required' })
        }
        const contactByEmail = await Contactsrepository.findByEmail(email);

        if (contactByEmail && contactByEmail.id !== id) {
            return response.status(400).json({ error: 'Email already been used' })
        }
        const contact = await Contactsrepository.update(id, {
            name, email, phone, category_id,
        });
        response.json(contact);



        //editar um contato
    }

    async delete(request, response) {
        const { id } = request.params;

        await Contactsrepository.delete(id)
        //204: no content
        response.sendStatus(204);
        //deletar um contato
    }

}
//singleton
module.exports = new ContactController
