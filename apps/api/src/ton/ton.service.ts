import { Injectable } from '@nestjs/common';
import { TonApiClient } from '@ton-api/client';

@Injectable()
export class TonService extends TonApiClient {}
