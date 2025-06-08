import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Default,
} from "sequelize-typescript";

interface MessageCreationAttributes {
  Name: string;
  Email: string;
  Phone?: string;
  Address?: string;
  MessageText: string;
  Service?: string;
  DateTime?: Date;
}

@Table({
  tableName: "messages",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class Message extends Model<Message, MessageCreationAttributes> {
  @AllowNull(false)
  @Column(DataType.STRING)
  Name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  Email!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  Phone?: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  Address?: string;

  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
    field: "Message",
  })
  MessageText!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  Service?: string;

  @AllowNull(true)
  @Default(DataType.NOW)
  @Column(DataType.DATE)
  DateTime?: Date;
}

export default Message;
