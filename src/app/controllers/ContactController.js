
const ContactsRepository = require('../controllers/repositories/Contactsrepository'); // corrigir o nome para manter consistência
const isValidUUID = require('../controllers/utils/isValidUUID');

class ContactController {
    async index(request, response) {
        const { orderBy } = request.query;
        const contacts = await ContactsRepository.findAll(orderBy);
        response.json(contacts);
    }

    async show(request, response) {
        const { id } = request.params;

        if(!isValidUUID(id)){
            return response.status(400).json({error: 'Invalid user id'})
        }
        const contact = await ContactsRepository.findById(id);

        if (!contact) {
            return response.status(404).json({ error: 'Contact not found' });
        }
        response.json(contact);
    }

    async store(request, response) {
        const { name, email, phone, category_id } = request.body;

        // Validações
        if (!name) {
            return response.status(400).json({ error: 'Name is required' });
        }
        if(category_id && !isValidUUID(category_id)){
            return response.status(400).json({error: 'Invalid category'})
        }
       if (email){
        const contactExists = await ContactsRepository.findByEmail(email);
        if (contactExists){
            return response.status(400).json({error:'This email is already in use'})
        }
       }

        const contact = await ContactsRepository.create({
            name,
            email: email || null,
            phone,
            category_id: category_id || null,
        });

        response.status(201).json(contact);
    }

    async update(request, response) {
        const { id } = request.params;
        const { name, email, phone, category_id } = request.body;

        // Validações
        if (!isValidUUID(id)) {
            return response.status(400).json({ error: 'Invalid contact ID format' });
        }
        if(category_id && !isValidUUID(category_id)){
            return response.status(400).json({error: 'Invalid category'})
        }
        if (!name) {
            return response.status(400).json({ error: 'Name is required' });
        }

        const contactExists = await ContactsRepository.findById(id);
        if (!contactExists) {
            return response.status(404).json({ error: 'Contact not found' });
        }



       if(email){
        const contactByEmail = await ContactsRepository.findByEmail(email);
        if (contactByEmail && contactByEmail.id !== id) {
            return response.status(400).json({ error: 'Email already in use' });
        }

       }
        if (category_id && !isValidUUID(category_id)) {
            return response.status(400).json({ error: 'Invalid category_id format' });
        }

        const contact = await ContactsRepository.update(id, {
            name,
            email: email || null,
            phone,
            category_id: category_id || null,

        });

        response.json(contact);
    }

    async delete(request, response) {
        const { id } = request.params;



        await ContactsRepository.delete(id);
        response.sendStatus(204);
    }
}

module.exports = new ContactController();
