import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { Variant } from "./Variant";

@Entity()
export class Attribute {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true, type: "text" })
  description: string;

  //Better way??
  @ManyToOne(() => Product, (product) => product.attributes, { nullable: true })
  product?: Product;

  @ManyToOne(() => Variant, (variant) => variant.attributes, { nullable: true })
  variant?: Variant;
}
