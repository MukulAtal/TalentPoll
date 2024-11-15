import Option from "./Option";

interface Question {
    id: number;
    label: string;
    options: Option[];
}

export default Question;