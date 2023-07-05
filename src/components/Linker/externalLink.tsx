import {ReactNode} from 'react';

const NEUTRAL_URL: string = 'javascript: void (0)';

export type Props = {
    /** url that should be open by link */
    url?: string;
    /** title that describes link */
    title?: string;
    /** indicates if link should be open in the new window */
    window?: true;
    /** link content */
    children?: ReactNode;
};

const ExternalLink = ({url, title, window, children}: Props): JSX.Element =>
(
    <a rel="noopener noreferrer" href={url ?? NEUTRAL_URL} title={title} target={window ? '_blank' : undefined}>
        {children}
    </a>
);

export default ExternalLink;