import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return <img {...props} src="/fosterlog_icon.jpg" alt={props.alt ?? 'Fosterlog Icon'} />;
}
