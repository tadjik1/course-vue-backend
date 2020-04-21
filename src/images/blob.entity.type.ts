import { Type } from 'mikro-orm';

export class BlobEntityType extends Type {
  convertToDatabaseValue(value: any): any {
    return value;
  }

  convertToJSValue(value: any): any {
    return Buffer.from(value);
  }

  getColumnType(): string {
    return 'blob';
  }
}
