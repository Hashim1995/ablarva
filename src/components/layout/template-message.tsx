/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { CardBody, Card } from '@nextui-org/react';

/**
 * A message card component that displays a template message and triggers a submission event when clicked.
 * The component utilizes NextUI's Card components for structure and styling.
 *
 * @summary A clickable card component that submits a predefined message.
 * @module TempalteMessage
 * @exports TempalteMessage
 * @example
 * // Example usage:
 * <TempalteMessage
 *   text="Welcome to our service!"
 *   onSubmit={(arg) => console.log('Submitted Message:', arg.message)}
 * />
 *
 * @param {Object} props - The properties object.
 * @param {string} props.text - The message content displayed inside the card.
 * @param {Function} props.onSubmit - Callback function that is triggered with the message when the card is clicked.
 * @returns {JSX.Element} The clickable card component that submits a template message.
 */

interface ITemplateMessage {
  text: string;
  onSubmit: (arg: { message: string }) => void;
}

function TempalteMessage({ text, onSubmit }: ITemplateMessage): JSX.Element {
  return (
    <Card
      aria-hidden
      onClick={() => {
        onSubmit({
          message: text
        });
      }}
      className="relative box-border flex flex-col bg-transparent rounded-large text-foreground cursor-pointer overflow-hidden height-auto outline-none"
    >
      <CardBody className="bg-transparent shadow-none">
        <p className="text-sm">{text}</p>
      </CardBody>
    </Card>
  );
}

export default TempalteMessage;
