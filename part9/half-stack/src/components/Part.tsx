import { CoursePart } from "../types";

type Props = {
  part: CoursePart;
}

function Part({ part }: Props) {
  if (part.kind === "basic") {
    return (
      <div>
        <h2>{part.name}</h2>
        <p>{part.description}</p>
        <p>Exercises: {part.exerciseCount}</p>
      </div>
    )
  }

  if (part.kind === "group") {
    return (
      <div>
        <h2>{part.name}</h2>
        <p>Exercises: {part.exerciseCount}</p>
        <p>Group project count: {part.groupProjectCount}</p>
      </div>
    )
  }

  if (part.kind === "background") {
    return (
      <div>
        <h2>{part.name}</h2>
        <p>{part.description}</p>
        <p>Exercises: {part.exerciseCount}</p>
        <p>Background material: {part.backgroundMaterial}</p>
      </div>
    )
  }

  if (part.kind === "requirements") {
    return (
      <div>
        <h2>{part.name}</h2>
        <p>{part.description}</p>
        <p>Exercises: {part.exerciseCount}</p>
        <p>Requirements: {part.requirements.join(", ")}</p>
      </div>
    )
  }
}

export default Part