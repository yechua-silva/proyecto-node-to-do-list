const fs = require('fs');
const archivo = './db/data.json';

const guardarDB = ( data ) => {
    fs.writeFileSync( archivo, JSON.stringify( data ) );
}

const leerDB = () => {
    // Verificar existencia del archivo
    if ( !fs.existsSync( archivo ) ) {
        return null;
    }

    const info = fs.readFileSync( archivo, { encoding: 'utf8' });
    const data = JSON.parse( info );

    return data;
}


module.exports = {
    guardarDB,
    leerDB
}