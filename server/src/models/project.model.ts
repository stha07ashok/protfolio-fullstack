// src/models/project.model.ts

import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "projects",
  timestamps: true,
})
export class Project extends Model {
  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.STRING)
  category!: string;

  @Column(DataType.TEXT)
  description!: string;

  @Column(DataType.JSON)
  stack!: { name: string }[];

  @Column(DataType.STRING)
  image!: string;

  @Column(DataType.STRING)
  liveUrl!: string;

  @Column(DataType.STRING)
  githubUrl!: string;
}

export default Project;
