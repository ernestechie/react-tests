import { GreetProps } from "./Greet.types";

export default function Greet({ name }: GreetProps) {
  return <div>hello, {name ? name : "guest"}</div>;
}
