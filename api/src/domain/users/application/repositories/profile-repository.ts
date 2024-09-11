import { Profile } from '@/domain/users/enterprise/entities/profile'

export abstract class ProfileRepository {
  abstract create(profile: Profile): Promise<void>
  abstract findById(id: string): Promise<Profile | null>
  abstract save(user: Profile): Promise<void>
}
