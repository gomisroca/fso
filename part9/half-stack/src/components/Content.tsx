import { CoursePart } from "../types";
import Part from "./Part";

type Props = {
  parts: CoursePart[];
}

function Content({ parts }: Props) {
  return (
    <div>
      {parts.map(part =>
        <Part part={part} />
      )}
    </div>
  )
}

export default Content