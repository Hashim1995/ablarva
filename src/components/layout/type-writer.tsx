/* eslint-disable consistent-return */
import { useReadLocalStorage } from 'usehooks-ts';
import Markdown from 'markdown-to-jsx';
import { markdownOptions } from '@/utils/constants/options';
import { typewriterSound } from '@/assets/sounds/asset-exporter';
import { useState, useEffect } from 'react';

/**
 * A typewriter-style component that reveals the given message character by character while optionally playing a sound effect.
 * It utilizes the `markdown-to-jsx` library to render the message as Markdown. The typing sound can be toggled via local storage.
 *
 * @summary A typewriter-style text component with Markdown support and an optional sound effect.
 * @module Typewriter
 * @exports Typewriter
 * @example
 * // Example usage:
 * <Typewriter
 *   message="Welcome to our platform! **Enjoy your stay.**"
 *   isTyping={true}
 * />
 *
 * @param {Object} props - The properties object.
 * @param {string} props.message - The full text content to be revealed character by character.
 * @param {boolean} props.isTyping - If `true`, starts the typewriter effect; if `false`, displays the full message immediately.
 * @returns {JSX.Element} The typewriter-style text component.
 */

interface ITypewriter {
  message: string;
  isTyping: boolean;
}

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
