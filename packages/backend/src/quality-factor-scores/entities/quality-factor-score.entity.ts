import { Craftsman } from 'src/craftsmen/entities/craftsman.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class QualityFactorScore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'double precision' })
  profile_picture_score: number;

  @Column({ type: 'double precision' })
  profile_description_score: number;

  @Column()
  profile_id: number;

  @OneToOne(() => Craftsman, (craftsman) => craftsman.score)
  @JoinColumn({ name: 'profile_id' })
  craftsman: Craftsman;
}
