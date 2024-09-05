import { faker } from '@faker-js/faker'

export function generateCPF() {
  const randomDigits = () => String(faker.number.int({ min: 0, max: 9 }))

  const cpf = Array.from({ length: 9 }, randomDigits).join('')

  const calculateVerifierDigit = (cpf: string, weight: number) => {
    const sum = cpf
      .split('')
      .map((digit, index) => parseInt(digit) * (weight - index))
      .reduce((sum, current) => sum + current, 0)

    const remainder = sum % 11
    return remainder < 2 ? '0' : String(11 - remainder)
  }

  const firstVerifierDigit = calculateVerifierDigit(cpf, 10)
  const secondVerifierDigit = calculateVerifierDigit(
    cpf + firstVerifierDigit,
    11,
  )

  return `${cpf}${firstVerifierDigit}${secondVerifierDigit}`
}
