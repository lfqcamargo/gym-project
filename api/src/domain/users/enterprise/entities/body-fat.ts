import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface BodyFatProps {
  subscapular: number
  triceps: number
  biceps: number
  chest: number
  midAxillary: number
  suprailiac: number
  abdominal: number
  medialThigh: number
  medialCalf: number
  updatedDate: Date
}

export class BodyFat extends Entity<BodyFatProps> {
  get subscapular() {
    return this.props.subscapular
  }

  get triceps() {
    return this.props.triceps
  }

  get biceps() {
    return this.props.biceps
  }

  get chest() {
    return this.props.chest
  }

  get midAxillary() {
    return this.props.midAxillary
  }

  get suprailiac() {
    return this.props.suprailiac
  }

  get abdominal() {
    return this.props.abdominal
  }

  get medialThigh() {
    return this.props.medialThigh
  }

  get medialCalf() {
    return this.props.medialCalf
  }

  get updatedDate() {
    return this.props.updatedDate
  }

  set subscapular(value: number) {
    this.props.subscapular = value
    this.touch()
  }

  set triceps(value: number) {
    this.props.triceps = value
    this.touch()
  }

  set biceps(value: number) {
    this.props.biceps = value
    this.touch()
  }

  set chest(value: number) {
    this.props.chest = value
    this.touch()
  }

  set midAxillary(value: number) {
    this.props.midAxillary = value
    this.touch()
  }

  set suprailiac(value: number) {
    this.props.suprailiac = value
    this.touch()
  }

  set abdominal(value: number) {
    this.props.abdominal = value
    this.touch()
  }

  set medialThigh(value: number) {
    this.props.medialThigh = value
    this.touch()
  }

  set medialCalf(value: number) {
    this.props.medialCalf = value
    this.touch()
  }

  private touch() {
    this.props.updatedDate = new Date()
  }

  static create(
    props: Optional<BodyFatProps, 'updatedDate'>,
    id?: UniqueEntityID,
  ) {
    const bodyFat = new BodyFat(
      {
        ...props,
        updatedDate: new Date(),
      },
      id,
    )

    return bodyFat
  }
}
