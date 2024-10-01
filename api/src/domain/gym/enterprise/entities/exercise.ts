export interface ExerciseProps {
  id: number
  name: string
  description: string
}

export class Exercise {
  private props: ExerciseProps

  constructor(props: ExerciseProps) {
    this.props = props
  }

  get id() {
    return this.props.id
  }

  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  static create(props: ExerciseProps) {
    const exercise = new Exercise({
      ...props,
    })

    return exercise
  }
}
