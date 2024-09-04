import { UseCaseError } from '@/core/errors/use-case-error'

export class AlreadyExistsEmailError extends Error implements UseCaseError {
  constructor() {
    super('Already exists email.')
  }
}
