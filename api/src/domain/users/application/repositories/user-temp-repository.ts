import { UserTemp } from '@/domain/users/enterprise/entities/user-temp'

export abstract class UserTempRepository {
  abstract create(user: UserTemp): Promise<void>
  abstract findByToken(token: string): Promise<UserTemp | null>
  abstract findByEmail(email: string): Promise<UserTemp | null>
  abstract save(user: UserTemp): Promise<void>
  abstract delete(id: string): Promise<void>
}
