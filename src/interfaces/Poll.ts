import Question from "./Question";

interface Poll {
    id: string;
    title: string;
    questions: Question[];
    isOpen: boolean;
}

export default Poll;
