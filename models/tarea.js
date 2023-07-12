const { v4: uuidv4 } = require('uuid')

class Tarea {
    id = '';
    desc = '';
    completaEn = null;

    constructor( desc ) {
        // Crea id unico
        this.id = uuidv4();
        this.desc = desc;
        this.completaEn = null;
    }
}


module.exports = Tarea

