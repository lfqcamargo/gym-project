import { Profile } from '@/domain/users/enterprise/entities/profile'

export class ProfilePresenter {
  static toHTTP(profile: Profile) {
    return {
      id: profile.id.toString(),
      description: profile.description,
      profilePhoto: profile.profilePhoto,
      coverPhoto: profile.coverPhoto,
    }
  }
}
