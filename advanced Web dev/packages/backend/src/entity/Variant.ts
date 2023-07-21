import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Attribute } from "./Attribute";
import { Product } from "./Product";
import { Review } from "./Review";

@Entity()
export class Variant {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true, default: "" })
  image?: string;

  @Column({ type: "float" })
  price: number;

  @ManyToOne(() => Product, (product) => product.variants)
  product: Product;

  @OneToMany(() => Review, (review) => review.variant)
  reviews: Review[];

  @OneToMany(() => Attribute, (attribute) => attribute.variant, {
    nullable: true,
  })
  attributes?: Attribute[];
}
