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
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  @Index()
  tag: string;

  @ManyToOne(() => Region, (region) => region.province)
  @JoinColumn({ name: 'id_region' })
  @Index()
  region: Region;

  @OneToMany(() => City, (city) => city.province)
  city: City[];
}
