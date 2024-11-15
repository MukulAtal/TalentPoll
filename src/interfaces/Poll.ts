import Question from "./Question";

interface Poll {
    id: number;
    title: string;
    questions: Question[];
    isOpen: boolean;
}

export default Poll;
