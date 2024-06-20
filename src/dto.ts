import { IsOptional, IsString } from 'class-validator';

export class GetWeatherDataDto {
  @IsString()
  public lat: string;
  @IsString()
  public lon: string;
  @IsString()
  @IsOptional()
  part?: string;
}

export class PostWeatherDataDto {
  @IsString()
  public lat: string;
  @IsString()
  public lon: string;
  @IsString()
  @IsOptional()
  part?: string;
}
