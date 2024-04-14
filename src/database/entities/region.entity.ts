import { Column, Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';
import { Province } from './province.entity';

@Entity()
export class Region {
  @PrimaryColumn()
  id: number;

  @Column()
  @Index()
  name: string;

  @OneToMany(() => Province, (province) => province.region)
  province: Province[];
}
