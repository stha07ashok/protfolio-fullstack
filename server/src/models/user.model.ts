import { Table, Column, Model, DataType, Unique } from "sequelize-typescript";

@Table({
  tableName: "users",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class User extends Model<User> {
  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.ENUM("admin"),
    allowNull: false,
  })
  role!: "user" | "admin";
}

export default User;
