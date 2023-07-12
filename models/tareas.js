require('colors')
const Tarea = require('./tarea')

class Tareas {

    _listado = {};

    // Getter -Enlaza la propiedad de un objeto con una función que será llamada cuando la propiedad es buscada.
    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        })

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '' ) {
        if ( this._listado[id] ) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = [] ) {
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea
        })
    }

    crearTarea( desc = '' ) {
        const tarea = new Tarea( desc );

        this._listado[tarea.id] = tarea
    }

    listadoCompleto() {
        console.log();
        this.listadoArr.forEach( ( tarea, idx ) => {
            const index = `${idx + 1}.`.green;
            const { desc, completaEn } = tarea;
            const estado = ( completaEn ) ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${index} ${desc} :: ${estado}`);
        })
    }

    listadoPendienteCompletadas( completadas = true ) {
        console.log();
        let cont = 0;
        this.listadoArr.forEach(( tarea ) => {
            const { completaEn, desc } = tarea;
            const estado = ( completaEn ) ? 'Completada'.green : 'Pendiente'.red;

            if ( completadas ) {
                if ( completaEn ) {
                    cont += 1;
                    console.log(`${ (cont + '.').green } ${desc} :: ${completaEn.green}`);
                }
            } else {
                if ( !completaEn ) {
                    cont += 1;
                    console.log(`${ (cont + '.').green } ${desc} :: ${estado}`);
                }
            }

        })
    }

    toggleCompletadas ( ids = [] ) {

        ids.forEach( id => {
            const tarea = this._listado[id];
            if ( !tarea.completaEn ) {
                tarea.completaEn = new Date().toISOString();
            }
        })

        this.listadoArr.forEach( tarea => {
            if ( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completaEn = null;
            }
        })
    }
}

module.exports = Tareas;