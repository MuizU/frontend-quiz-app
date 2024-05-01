export default function Quiz({ params }: { params: { slug: string } }) {
  return <div>My Post: {params.slug}</div>
}