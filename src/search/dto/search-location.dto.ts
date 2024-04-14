import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';

export class SearchLocationDto {
  @IsString({ message: 'La query deve essere una stringa' })
  @Length(2, 255, {
    message:
      'La query ha una lunghezza minima di 2 caratteri e una lunghezza massima di 255 caratteri.',
  })
  @Matches(/^[a-zA-Z0-9 ]*$/, {
    message: 'La query può contenere solo caratteri alfanumerici e spazi.',
  })
  @ApiProperty({
    example: 'Torino',
    description:
      'Query di ricerca per località italiane come regioni, province e comuni',
  })
  query: string;
}
