import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/db';
import User from './users.model';

interface ProjectAttributes {
  id: number;
  name: string;
  description?: string;
  owner_id: number;
  created_at?: Date;
  updated_at?: Date;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'id'> {}

class Project extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public owner_id!: number;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    owner_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'projects',
  }
);

// Définition des relations
User.hasMany(Project, { foreignKey: 'owner_id', as: 'projects' });
Project.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });

export default Project;
