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
  @PrimaryColumn()
  id: number;

  @Column()
  @Index()
  name: string;

  @ManyToOne(() => Province, (province) => province.city)
  @JoinColumn({ name: 'id_province' })
  @Index()
  province: Province;
}
