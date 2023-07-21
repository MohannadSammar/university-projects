import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { Review } from "./Review";
import { Product } from "./Product";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  password?: string;

  @Column()
  name: string;

  @Column({ default: "" })
  image: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  passwordChangedAt: Date;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToMany(() => Product, (product) => product.users)
  @JoinTable()
  products: Product[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
