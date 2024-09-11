import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface ProfileProps {
  description: string | null
  profilePhoto: Buffer | null
  coverPhoto: Buffer | null
}

export class Profile extends Entity<ProfileProps> {
  get description() {
    return this.props.description
  }

  get profilePhoto() {
    return this.props.profilePhoto
  }

  get coverPhoto() {
    return this.props.coverPhoto
  }

  set description(description: string | null) {
    this.props.description = description
  }

  set profilePhoto(profile_photo: Buffer | null) {
    this.props.profilePhoto = profile_photo
  }

  set coverPhoto(cover_photo: Buffer | null) {
    this.props.coverPhoto = cover_photo
  }

  static create(props: ProfileProps, userId: UniqueEntityID) {
    const profile = new Profile(
      {
        ...props,
      },
      userId,
    )

    return profile
  }
}
