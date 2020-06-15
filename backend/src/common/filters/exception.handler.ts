/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class ExceptionHandler extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let data, status, message;
    if (exception instanceof HttpException) {
      message = exception.message;
      status = exception.getStatus();
      data = exception.getResponse();
    } else {
      message = exception['message'];
      status = exception['status'] || exception['statusCode'] || 500;
      if (exception['response']?.data) {
        data = exception['response']?.data;
        status = exception['response']?.status || status;
      }
    }
    response.status(status).json({
      status,
      message,
      data,
    });
  }
}
