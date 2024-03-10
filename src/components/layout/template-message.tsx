/* eslint-disable no-unused-vars */
import { CardBody } from '@nextui-org/react';

interface ITemplateMessage {
  text: string;
  onSubmit: (arg: { message: string }) => void;
}
function TempalteMessage({ text, onSubmit }: ITemplateMessage) {
  return (
    <div
      aria-hidden
      onClick={() => {
        onSubmit({
          message: text
        });
      }}
      className="flex flex-col relative overflow-hidden height-auto text-foreground box-border bg-content1 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large transition-transform-background motion-reduce:transition-none cursor-pointer backdrop-blur-md bg-opacity-20"
    >
      <CardBody>
        <p className="text-sm">{text}</p>
      </CardBody>
    </div>
  );
}

export default TempalteMessage;
