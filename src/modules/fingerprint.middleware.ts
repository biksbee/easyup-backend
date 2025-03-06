import { NextFunction, Request } from 'express';
import * as fingerprint from 'express-fingerprint';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class FingerprintMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    fingerprint({
      parameters: [
        // Defaults
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        fingerprint.useragent,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        fingerprint.acceptHeaders,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        fingerprint.geoip
      ],
    })(req, res, next);
  }
}