export default function () {
  if (Math.random() > 0.5) {
    throw new Error('Ahh!');
  }
  return <p>Hello World</p>;
}
