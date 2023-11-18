import { Craftsman } from 'src/craftsmen/entities/craftsman.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CraftsmanPostal {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Craftsman, (craftsman) => craftsman.postals)
  craftsman: Craftsman;

  @Column()
  postcode: string;

  @Column({ type: 'double precision' })
  rank: number;

  @Column({ type: 'double precision' })
  distance: number;
}
