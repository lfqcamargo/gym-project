import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface BodyMeasurementProps {
  leftRelaxedArm: number
  rightRelaxedArm: number
  leftContractedArm: number
  rightContractedArm: number
  leftForearm: number
  rightForearm: number
  leftThigh: number
  rightThigh: number
  leftCalf: number
  rightCalf: number
  relaxedChest: number
  inspiredChest: number
  waist: number
  abdomen: number
  hip: number
  neck: number
  shoulder: number
  upperSkinfolds: number
  lowerSkinfolds: number
  updatedDate: Date
}

export class BodyMeasurement extends Entity<BodyMeasurementProps> {
  get leftRelaxedArm() {
    return this.props.leftRelaxedArm
  }

  get rightRelaxedArm() {
    return this.props.rightRelaxedArm
  }

  get leftContractedArm() {
    return this.props.leftContractedArm
  }

  get rightContractedArm() {
    return this.props.rightContractedArm
  }

  get leftForearm() {
    return this.props.leftForearm
  }

  get rightForearm() {
    return this.props.rightForearm
  }

  get leftThigh() {
    return this.props.leftThigh
  }

  get rightThigh() {
    return this.props.rightThigh
  }

  get leftCalf() {
    return this.props.leftCalf
  }

  get rightCalf() {
    return this.props.rightCalf
  }

  get relaxedChest() {
    return this.props.relaxedChest
  }

  get inspiredChest() {
    return this.props.inspiredChest
  }

  get waist() {
    return this.props.waist
  }

  get abdomen() {
    return this.props.abdomen
  }

  get hip() {
    return this.props.hip
  }

  get neck() {
    return this.props.neck
  }

  get shoulder() {
    return this.props.shoulder
  }

  get upperSkinfolds() {
    return this.props.upperSkinfolds
  }

  get lowerSkinfolds() {
    return this.props.lowerSkinfolds
  }

  get updatedDate() {
    return this.props.updatedDate
  }

  set leftRelaxedArm(value: number) {
    this.props.leftRelaxedArm = value
    this.touch()
  }

  set rightRelaxedArm(value: number) {
    this.props.rightRelaxedArm = value
    this.touch()
  }

  set leftContractedArm(value: number) {
    this.props.leftContractedArm = value
    this.touch()
  }

  set rightContractedArm(value: number) {
    this.props.rightContractedArm = value
    this.touch()
  }

  set leftForearm(value: number) {
    this.props.leftForearm = value
    this.touch()
  }

  set rightForearm(value: number) {
    this.props.rightForearm = value
    this.touch()
  }

  set leftThigh(value: number) {
    this.props.leftThigh = value
    this.touch()
  }

  set rightThigh(value: number) {
    this.props.rightThigh = value
    this.touch()
  }

  set leftCalf(value: number) {
    this.props.leftCalf = value
    this.touch()
  }

  set rightCalf(value: number) {
    this.props.rightCalf = value
    this.touch()
  }

  set relaxedChest(value: number) {
    this.props.relaxedChest = value
    this.touch()
  }

  set inspiredChest(value: number) {
    this.props.inspiredChest = value
    this.touch()
  }

  set waist(value: number) {
    this.props.waist = value
    this.touch()
  }

  set abdomen(value: number) {
    this.props.abdomen = value
    this.touch()
  }

  set hip(value: number) {
    this.props.hip = value
    this.touch()
  }

  set neck(value: number) {
    this.props.neck = value
    this.touch()
  }

  set shoulder(value: number) {
    this.props.shoulder = value
    this.touch()
  }

  set upperSkinfolds(value: number) {
    this.props.upperSkinfolds = value
    this.touch()
  }

  set lowerSkinfolds(value: number) {
    this.props.lowerSkinfolds = value
    this.touch()
  }

  private touch() {
    this.props.updatedDate = new Date()
  }

  static create(
    props: Optional<BodyMeasurementProps, 'updatedDate'>,
    id?: UniqueEntityID,
  ) {
    const bodyMeasurement = new BodyMeasurement(
      {
        ...props,
        updatedDate: new Date(),
      },
      id,
    )

    return bodyMeasurement
  }
}
