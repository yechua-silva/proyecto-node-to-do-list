const { resolve } = require('path');

require('colors')

const mostrarMenu = () => {

    return new Promise( resolve => {
        console.clear()

        console.log('================================'.green);
        console.log('      Selecione un opción'.green);
        console.log('================================'.green);
    
        // Opciones
        console.log(`${'1.'.green} Crear tarea`);
        console.log(`${'2.'.green} Listar tareas`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'4.'.green} Listar tareas pendientes`);
        console.log(`${'5.'.green} Completar tarea(s)`);
        console.log(`${'6.'.green} Borrar tarea`);
        console.log(`${'0.'.green} Salir\n`);
    
        // Recibir informacion del usuario
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        // Question - para mostrar infomacion al usuario a través del output, recibe el mensaje y en callback
        readline.question('Seleccione una opción: ', (opt) => {
            // Hay que cerrarlo ya que si no se queda esperando informacion del usuario
            readline.close();
            resolve(opt);
        })
    })
}

const pausa = () => {
    return new Promise( resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPresione ${'ENTER'.green} para continuar\n` , (opt) => {
            readline.close();
            resolve()
        })
    })
}

module.exports = {
    mostrarMenu,
    pausa
}