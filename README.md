# Rec's Friends and Food Project

The Restaurant Reservation API provides an easy-to-use interface for managing reservations. Built with NestJS, it offers endpoints for creating, finding, and deleting reservations efficiently. This guide will help you set up the API and detail how to use its endpoints.


## API Endpoints

### Create a Reservation

- **Method:** POST
- **Endpoint:** `/reservations`
- **Description:** Creates a new reservation with the provided details in the body.
- **Body:**
  - `tableId`: number; The ID of the table being reserved.
  - `startTime`: Date; The start time of the reservation.
  - `endTime`: Date; The end time of the reservation.
  - `dinerIds`: number[]; An array of diner IDs included in the reservation. 

### Find Restaurants for Diners

- **Method:** GET
- **Endpoint:** `/reservations/findForDiners`
- **Description:** Returns a list of available restaurants for a given number of diners at a specified time, based on the provided query parameters.
- **Params:**
  - `dinerIds`: A comma-separated list of diner IDs. These are the IDs of the diners who will be dining together.
  - `dinersCount`: The number of diners. This is used to ensure that the restaurant has enough capacity.
  - `desiredTime`: The desired reservation time. This is used to check the restaurant's availability at this time.


### Delete a Reservation

- **Method:** DELETE
- **Endpoint:** `/reservations/:reservationId`
- **Description:** Deletes the specified reservation.



