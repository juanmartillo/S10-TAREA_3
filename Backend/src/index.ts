import app from './app'
import { PORT } from './config'
import sequelize from './db';


 async function main() {
    try {
        await sequelize.authenticate();
        console.log('Conexión exitosa a PostgreSQL.');
        await sequelize.sync(); 
        app.listen(PORT)
        console.log(`Servidor arrancado en el puerto ${PORT}`)
    } catch (error) {
          console.error('No se pudo conectar:', error);

    }
}
main()
