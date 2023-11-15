interface IProps {
  title: string;
}
function AuthLoader({ title }: IProps) {
  return (
    <div>
      <h1>authloader {title}</h1>
    </div>
  );
}

export default AuthLoader;
