import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiHeader, ApiHeaders } from '@nestjs/swagger';

export const IS_SECURED_KEY = 'isSecured';

export const IsSecured = (value: boolean = true) => {
  if (value) {
    return applyDecorators(
      SetMetadata(IS_SECURED_KEY, value),
      ApiHeader({
        required: true,
        description: 'Authorization token',
        name: 'auth-token',
        schema: {
          type: 'string'
        },
      }),
    );
  } else {
    return SetMetadata(IS_SECURED_KEY, value);
  }
}