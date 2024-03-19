import { HttpException, HttpStatus } from '@nestjs/common';

export function appError(item: string, status: HttpStatus) {
  switch (status) {
    case HttpStatus.NOT_FOUND:
      return new HttpException(
        `record with id === ${item}Id doesn't exist`,
        status,
      );
    case HttpStatus.BAD_REQUEST:
      return new HttpException(`${item}Id is invalid (not uuid)`, status);
  }
}
