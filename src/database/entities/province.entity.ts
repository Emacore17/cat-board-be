import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { City } from './city.entity';
import { Region } from './region.entity';

@Entity()
export class Province {
  @PrimaryColumn({name: "province_id"})
  provinceId: number;

  @Column()
  name: string;

  @Column({ unique: true })
  @Index()
  tag: string;

  @ManyToOne(() => Region, (region) => region.province)
  @JoinColumn({ name: 'region_id' })
  @Index()
  region: Region;

  @OneToMany(() => City, (city) => city.province)
  city: City[];
}
