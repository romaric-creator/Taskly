import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/db';
import Project from './projet.model';
import User from './users.model';

interface TaskAttributes {
  id: number;
  title: string;
  content?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in_progress' | 'done' | 'backlog';
  project_id: number;
  assigned_to?: number;
  created_at?: Date;
  updated_at?: Date;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, 'id'> {}

class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: number;
  public title!: string;
  public content!: string;
  public priority!: 'low' | 'medium' | 'high';
  public status!: 'todo' | 'in_progress' | 'done' | 'backlog';
  public project_id!: number;
  public assigned_to!: number;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      defaultValue: 'medium',
    },
    status: {
      type: DataTypes.ENUM('todo', 'in_progress', 'done', 'backlog'),
      defaultValue: 'todo',
    },
    project_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Project,
        key: 'id',
      },
    },
    assigned_to: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'tasks',
  }
);

// Définition des relations
Project.hasMany(Task, { foreignKey: 'project_id', as: 'tasks' });
Task.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });

User.hasMany(Task, { foreignKey: 'assigned_to', as: 'assignedTasks' });
Task.belongsTo(User, { foreignKey: 'assigned_to', as: 'assignee' });

export default Task;
