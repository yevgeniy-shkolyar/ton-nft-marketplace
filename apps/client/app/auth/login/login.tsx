import React, { useEffect, FC, useRef } from 'react';

const TelegramButton: FC<{ botName: string }> = ({
    botName,
}): React.JSX.Element => {
    const buttonReference = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (buttonReference.current) {
            const script = document.createElement('script');
            script.src = 'https://telegram.org/js/telegram-widget.js?22';
            script.dataset.telegramLogin = botName;
            script.dataset.size = 'large';
            script.dataset.authUrl = '/auth/callback';
            script.dataset.requestAccess = 'write';
            script.dataset.userpic = 'true';

            script.async = true;

            buttonReference.current.append(script);

            return () => {
                buttonReference.current?.append(script);
            };
        }
    }, [buttonReference, botName]);

    return <div ref={buttonReference}></div>;
};

export default TelegramButton;
