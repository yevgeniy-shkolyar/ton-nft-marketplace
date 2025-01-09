import { Injectable } from '@nestjs/common';
import { Client } from '@notionhq/client';

@Injectable()
export class NotionService extends Client {
    constructor(auth: string) {
        super({ auth });
    }
}
