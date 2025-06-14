import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db';
import { Usuarios } from '../interface/UserInterface';

type UserCreationAttributes = Optional<Usuarios, 'id'>;

class User extends Model<Usuarios, UserCreationAttributes> implements Usuarios {
  public id!: number;
  public name!: string;
  public surname!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 100], 
      },
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  }
);

export default User;
