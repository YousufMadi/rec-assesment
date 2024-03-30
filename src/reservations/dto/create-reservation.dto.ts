export class CreateReservationDto {
    readonly tableId: number;
    readonly startTime: Date;
    readonly endTime: Date;
    readonly dinerIds: number[]; // Array of diner IDs to be associated with this reservation
}