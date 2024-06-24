// ! Old Implementation :- import { Exclude } from 'class-transformer';
import { Report } from 'src/reports/report.entity';
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  // ! Old Implementation :- @Exclude()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @Column({ default: true })
  admin: boolean;

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