import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Province } from './province.entity';

@Entity()
export class City {
  @PrimaryColumn({name: "city_id"})
  cityId: number;

  @Column()
  @Index()
  name: string;

  @ManyToOne(() => Province, (province) => province.city)
  @JoinColumn({ name: 'province_id' })
  @Index()
  province: Province;
}
