export class AppError {
  readonly statusCode: number;
  readonly messageObj: Object;

  constructor(statusCode: number, messageObj: Object) {
    this.statusCode = statusCode;
    this.messageObj = messageObj;
  }
}
