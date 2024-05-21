import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 100})
  title: string;

  @Column()
  content: string;

  @Column()
  link: string;
}
