import { QualityFactorScore } from 'src/quality-factor-scores/entities/quality-factor-score.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Craftsman {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  house_number: string;

  @Column({ type: 'double precision' })
  lon: number;

  @Column({ type: 'double precision' })
  lat: number;

  @Column()
  max_driving_distance: number;

  @OneToOne(() => QualityFactorScore, (score) => score.craftsman)
  @JoinColumn()
  score: QualityFactorScore;
}
