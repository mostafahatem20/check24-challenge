import { Craftsman } from 'src/craftsmen/entities/craftsman.entity';
import { PostalCode } from 'src/postal-codes/entities/postal-code.entity';
import { QualityFactorScore } from 'src/quality-factor-scores/entities/quality-factor-score.entity';
import {
    Column,
    Entity,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CraftsmenPostal {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => PostalCode, (ps) => ps.postcode)
    postcode: PostalCode;

    @ManyToOne(
        () => QualityFactorScore,
        (score) => {
            score.profile_id, score.profile_picture_score;
        },
    )
    score: QualityFactorScore;

    @Column({ type: 'double precision' })
    distance: number;

    @ManyToOne(
        () => Craftsman,
        (craftsman) => {
            craftsman.id, craftsman.first_name, craftsman.last_name;
        },
    )
    craftsman: Craftsman;

    @Column({ type: 'double precision' })
    distance_score: number;

    @Column({ type: 'double precision' })
    distance_weight: number;

    @Column({ type: 'double precision' })
    rank: number;
}
