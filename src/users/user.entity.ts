import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from 'mikro-orm';

@Entity({ tableName: 'users' })
export class UserEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  fullname!: string;

  @Property()
  @Unique()
  email!: string;

  @Property()
  password!: string;
}
