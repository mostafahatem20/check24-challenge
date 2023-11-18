import { Craftsman } from 'src/craftsmen/entities/craftsman.entity';
import { Column, Entity, PrimaryColumn, OneToOne } from 'typeorm';

@Entity()
export class QualityFactorScore {
  @PrimaryColumn()
  profile_id: number;

  @Column({ type: "double precision"})
  profile_picture_score: number;

  @Column({ type: "double precision"})
  profile_description_score: number;

  @OneToOne(() => Craftsman, (craftsman) => craftsman.score)
  craftsman: Craftsman;
}
