import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Attribute } from "./Attribute";
import { Category } from "./Category";
import { Review } from "./Review";
import { User } from "./User";
import { Variant } from "./Variant";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ default: "" })
  image?: string;

  @Column()
  manufacturer: string;

  @Column({ type: "float" })
  price: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  //likes
  @ManyToMany(() => User, (user) => user.products)
  users: User[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @OneToMany(() => Attribute, (attribute) => attribute.product)
  attributes: Attribute[];

  @OneToMany(() => Variant, (variant) => variant.product)
  variants: Variant[];
}
