import {
    Entity,
    Column,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { PostcodeExtensionGroup } from '../../../../shared/types';

@Entity()
export class PostalCode {
    @PrimaryColumn()
    postcode: string;

    @Column()
    lon: number;

    @Column()
    lat: number;

    @Column({ type: 'enum', enum: PostcodeExtensionGroup })
    postcode_extension_distance_group: string;

    @CreateDateColumn({ type: 'datetime', nullable: true })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime', nullable: true })
    updated_at: Date;
}
