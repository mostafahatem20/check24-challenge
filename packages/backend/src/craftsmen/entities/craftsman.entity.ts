import { QualityFactorScore } from 'src/quality-factor-score/entities/quality-factor-score.entity';
import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    OneToOne,
} from 'typeorm';

@Entity()
export class Craftsman {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    first_name: string;

    @Column({ nullable: false })
    last_name: string;

    @Column({ nullable: false })
    city: string;

    @Column({ nullable: false })
    street: string;

    @Column({ nullable: false })
    house_number: string;

    @Column({ type: 'double', nullable: true })
    lon: number;

    @Column({ type: 'double', nullable: true })
    lat: number;

    @Column({ type: 'int64' })
    max_driving_distance: number;

    @OneToOne(() => QualityFactorScore, (score) => score.profile_id)
    score: QualityFactorScore;

    @CreateDateColumn({ type: 'datetime', nullable: true })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime', nullable: true })
    updated_at: Date;
}
