import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        const { data, message, ...rest } = response;
        
        return {
           success: true,
          message: message || 'Operation successful', 
          data: data || response, 
         
        
        };
      })
    );
  }
}
