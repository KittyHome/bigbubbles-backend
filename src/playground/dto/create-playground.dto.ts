export class CreatePlaygroundDto {
  readonly name: string;
  readonly width?: number;
  readonly height?: number;
  readonly maxNoOfUsers?: number;
  readonly temperature?: number;
}
