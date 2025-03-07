import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  orderNumber: number;
  @Column()
  paymentDescription: string;
  @Column()
  town: string;
  @Column()
  country: string;
  @Column('bigint')
  amountInCents: number;
  @Column()
  currency: string;
  @Column('timestamp with time zone')
  paymentDueDate: Date;
  @Column({unique: true})
  @Generated('uuid')
  uuid: string
}
