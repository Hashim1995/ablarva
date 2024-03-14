/* eslint-disable consistent-return */
import { useReadLocalStorage } from 'usehooks-ts';
import Markdown from 'markdown-to-jsx';
import { markdownOptions } from '@/utils/constants/options';
import { typewriterSound } from '@/assets/sounds/asset-exporter';
import { useState, useEffect } from 'react';

interface ITypewriter {
  message: string;
  isTyping: boolean;
}

/**
 * `Typewriter` is a React component that renders text with a typewriter effect.
 *
 * @component
 * @param {Object} props The properties object.
 * @param {string} props.message The message to be displayed with the typewriter effect.
 * @param {boolean} props.isTyping A flag indicating whether the typewriter effect is active.
 *
 * @returns {JSX.Element} The rendered `Typewriter` component.
 *
 * @example
 * <Typewriter message="Hello, world!" isTyping={true} />
 */

function Typewriter({ message, isTyping }: ITypewriter): JSX.Element {
  const [displayedContent, setDisplayedContent] = useState('');
  const audioEnable = useReadLocalStorage('audioEnable');

  useEffect(() => {
    if (!isTyping) return;

    if (displayedContent.length < message.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedContent(message.slice(0, displayedContent.length + 1));
        audioEnable && typewriterSound.play();
      }, 5);

      return () => {
        clearTimeout(timeoutId);
      };
    }

    // Stop the sound when the full message is displayed
    if (audioEnable) {
      typewriterSound.pause();
      typewriterSound.currentTime = 0;
    }
  }, [displayedContent, message, isTyping]);

  const stopAudio = () => {
    if (audioEnable) {
      typewriterSound.pause();
      typewriterSound.currentTime = 0;
    }
  };

  useEffect(
    () => () => {
      stopAudio();
    },
    []
  );

  return (
    <Markdown options={markdownOptions}>
      {isTyping ? displayedContent : message}
    </Markdown>
  );
}

export default Typewriter;
