import { UserTemp } from '@/domain/users/enterprise/entities/userTemp'

export abstract class UserTempRepository {
  abstract create(user: UserTemp): Promise<void>
  abstract findById(id: string): Promise<UserTemp | null>
  abstract findByEmail(email: string): Promise<UserTemp | null>
  abstract delete(id: string): Promise<void>
}
