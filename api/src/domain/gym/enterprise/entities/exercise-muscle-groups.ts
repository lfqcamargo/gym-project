export interface ExerciseMuscleGroupsProps {
  id: number
  exerciseId: number
  muscleGroupId: number
  muscleActivation: number
}

export class ExerciseMuscleGroups {
  private props: ExerciseMuscleGroupsProps

  constructor(props: ExerciseMuscleGroupsProps) {
    this.props = props
  }

  get id() {
    return this.props.id
  }

  get exerciseId() {
    return this.props.exerciseId
  }

  get muscleGroupId() {
    return this.props.muscleGroupId
  }

  get muscleActivation() {
    return this.props.muscleActivation
  }
}
