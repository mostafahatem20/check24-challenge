import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { PostcodeExtensionGroup } from '@not-so-software/shared';
import * as moment from 'moment';
import { CraftsmanPostal } from 'src/craftsmen-postals/entities/craftsman-postal.entity';

@Entity()
export class PostalCode {
  @PrimaryColumn()
  postcode: string;

  @Column({ type: 'double precision' })
  lon: number;

  @Column({ type: 'double precision' })
  lat: number;

  @Column({ type: 'enum', enum: PostcodeExtensionGroup })
  postcode_extension_distance_group: string;

  @OneToOne(() => CraftsmanPostal, (postal) => postal.postcode)
  @JoinColumn()
  craftsmen_postals: CraftsmanPostal;

  @CreateDateColumn({
    type: 'timestamp',
    transformer: {
      to(value) {
        return moment(value, 'DD/MM/YYYY HH:mm:ss.SSSSSS').toDate();
      },
      from(value) {
        return moment(value).format('DD/MM/YYYY HH:mm:ss.SSSSSS');
      },
    },
  })
  created_at?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    transformer: {
      to(value) {
        return moment(value, 'DD/MM/YYYY HH:mm:ss.SSSSSS').toDate();
      },
      from(value) {
        return moment(value).format('DD/MM/YYYY HH:mm:ss.SSSSSS');
      },
    },
  })
  updated_at?: Date;
}
