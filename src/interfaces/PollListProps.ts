import Poll from "./Poll";

interface PollListProps {
    polls: Poll[];
    onPollSelect: (poll: Poll) => void;
    onClosePoll?: (pollId: string) => void;
    view: 'active' | 'closed';
}

export default PollListProps;
