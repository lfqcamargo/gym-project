export interface MuscleGroupProps {
  id: number
  description: string
}

export class MuscleGroup {
  private props: MuscleGroupProps

  constructor(props: MuscleGroupProps) {
    this.props = props
  }

  get id() {
    return this.props.id
  }

  get description() {
    return this.props.description
  }

  static create(props: MuscleGroupProps) {
    const musclegroup = new MuscleGroup({
      ...props,
    })

    return musclegroup
  }
}
