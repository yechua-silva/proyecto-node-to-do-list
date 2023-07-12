require('colors')
const Tareas = require('./models/tareas')
const { 
    inquirerMenu, 
    pausa, 
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
} = require('./helpers/inquirer');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');



const main = async () => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDb = leerDB();

    if ( tareasDb ) { // Cargar tareas
        tareas.cargarTareasFromArray( tareasDb )
    }

    do {
        //Imprimir el menu
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // Crear opcion
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea( desc );
            break;
            case '2': // Listar opciones
                tareas.listadoCompleto();
            break;
            case '3': // Listar completadas
                tareas.listadoPendienteCompletadas( completadas = true )
            break;
            case '4': // Listar pendientes
                tareas.listadoPendienteCompletadas( completadas = false )
            break;
            case '5': // Completado | Pendiente
                const ids = await mostrarListadoChecklist( tareas.listadoArr )
                tareas.toggleCompletadas( ids );
            break;
            case '6': // Borrar
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if ( id !== '0' ) {
                    const confirmacion = await confirmar('¿Estas seguro?')
                    if ( confirmacion ) {
                        tareas.borrarTarea( id );
                        console.log(`\nTarea borrada correctamente`.green);
                    }
                }
            break;
        }

        guardarDB( tareas.listadoArr );

         await pausa();
    } while ( opt !== '0');
}

main()