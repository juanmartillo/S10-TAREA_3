import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('miapp', 'postgres', 'fabricio4848', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

export default sequelize;
