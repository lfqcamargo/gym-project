import { UseCaseError } from '@/core/errors/use-case-error'

export class TokenNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Token Not Found.')
  }
}
