import { UseCaseError } from '@/core/errors/use-case-error'

export class AlreadyExistsCpfError extends Error implements UseCaseError {
  constructor() {
    super('Already exists cpf.')
  }
}
