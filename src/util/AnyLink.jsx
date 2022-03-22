import { Link } from "react-router-dom";

const BetterLink = props => {
    const { href, children } = props;
    return href.startsWith('/') ?
        <Link {...props} to={href}>{children}</Link>
        :
        <a {...props} href={href}>{children}</a>
}

export default BetterLink;