import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { UserRoleType } from '../user.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 500 })
  firstName: string;

  @Column({ length: 500 })
  lastName: string;

  @Column({ length: 500 })
  fullName?: string;

  @Column({ length: 500, unique: true })
  userName: string;

  @Column({ length: 500 })
  email: string;

  @Column({ length: 500 })
  phoneNumber: string;

  @Column({ length: 500 })
  password: string;

  @Column({ length: 500 })
  nation: string;

  @Column({
    type: "enum",
    enum: UserRoleType,
    default: "USER"
  })
  role: UserRoleType;

  @Column({ type: 'timestamptz' })
  birthDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

}