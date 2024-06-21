// ! Old Implementation :- import { Exclude } from 'class-transformer';
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  // ! Old Implementation :- @Exclude()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('User inserted', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('User update', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('User removed : ', this.id);
  }
}