import Poll from "./Poll";

interface PollListProps {
    polls: Poll[];
    onPollSelect: (poll: Poll) => void;
    onClosePoll?: (pollId: number) => void;
    view: 'active' | 'closed';
}

export default PollListProps;
