import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/db';

// Interface pour les attributs du modèle User
interface UserAttributes {
  id: number;
  email: string;
  password?: string;
  avatar_url?: string;
  created_at?: Date;
  updated_at?: Date;
}

// Interface pour la création (l'ID est optionnel car auto-incrémenté)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public avatar_url!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    avatar_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
);

export default User;
