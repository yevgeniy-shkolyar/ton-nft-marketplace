import { Header } from '@/components/header';
import React, { FC, useEffect, useRef, useState } from 'react';

const TelegramButton: FC<{ botName: string }> = ({ botName }): React.JSX.Element => {
  const buttonReference = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

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

      const handleLoad = () => setLoading(false);
      const handleError = () => setLoading(false);
      script.addEventListener('load', handleLoad);
      script.addEventListener('error', handleError);

      buttonReference.current.append(script);

      return () => {
        script.removeEventListener('load', handleLoad);
        script.removeEventListener('error', handleError);
      };
    }
  }, [buttonReference, botName]);

  return (
    <div className="flex h-full flex-col items-center justify-start">

        <Header>
        {loading ?
            <div className="my-4 whitespace-nowrap">Loading Telegram button...</div>
        : <>
                <div className="my-4 whitespace-nowrap">Ready to get started?</div>
                <div className="my-4 whitespace-nowrap">Sign in via Telegram.</div>
        </>}
        </Header>

        <div ref={buttonReference} />
    </div>

  );
};

export default TelegramButton;
