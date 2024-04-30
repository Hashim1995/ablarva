/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { CardBody, Card } from '@nextui-org/react';

interface ITemplateMessage {
  text: string;
  onSubmit: (arg: { message: string }) => void;
}
/**
 * Renders a template message component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.text - The text of the template message.
 * @param {Function} props.onSubmit - The function to be called when the template message is clicked.
 * @returns {JSX.Element} The template message component.
 */
function TempalteMessage({ text, onSubmit }: ITemplateMessage): JSX.Element {
  return (
    <Card
      aria-hidden
      onClick={() => {
        onSubmit({
          message: text
        });
      }}
      className="flex flex-col relative overflow-hidden height-auto text-foreground box-border bg-transparent outline-none    rounded-large  cursor-pointer "
    >
      <CardBody className="shadow-none bg-transparent">
        <p className="text-sm">{text}</p>
      </CardBody>
    </Card>
  );
}

export default TempalteMessage;
