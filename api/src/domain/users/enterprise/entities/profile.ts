import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface ProfileProps {
  userId: UniqueEntityID
  description: string | null
  profile_photo: BinaryType | null
  cover_photo: BinaryType | null
}

export class Profile extends Entity<ProfileProps> {
  get userId() {
    return this.props.userId
  }

  get description() {
    return this.props.description
  }

  get profile_photo() {
    return this.props.profile_photo
  }

  get cover_photo() {
    return this.props.cover_photo
  }

  set description(description: string | null) {
    this.props.description = description
  }

  set profile_photo(profile_photo: BinaryType | null) {
    this.props.profile_photo = profile_photo
  }

  set cover_photo(cover_photo: BinaryType | null) {
    this.props.cover_photo = cover_photo
  }
}
