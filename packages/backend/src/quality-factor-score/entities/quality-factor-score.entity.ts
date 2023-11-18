import { Craftsman } from 'src/craftsmen/entities/craftsman.entity';
import { Column, Entity, PrimaryColumn, OneToOne } from 'typeorm';

@Entity()
export class QualityFactorScore {
    @PrimaryColumn()
    profile_id: string;

    @Column({ type: 'double' })
    profile_picture_score: number;

    @Column({ type: 'double' })
    profile_description_score: number;

    @OneToOne(() => Craftsman, (craftsman) => craftsman.score)
    craftsman: Craftsman;
}
