import getPostByAlias from "@/lib/getPostByAlias";

export default async function Redirection({
  params,
}: {
  params: Promise<{ alias: string }>;
}) {

  const { alias } = await params
  const post = await getPostByAlias(alias);

  if (!post) {
    return <p>Invalid alias.</p>;
  }

  return (
    <html>
      <head>
        <title>Please wait.</title>
      </head>
      <body>
        {/* this is how to render HTML safely*/}
        <script dangerouslySetInnerHTML={{__html: `window.location.replace("${post.url}");`,}}></script>
      </body>
    </html>
  );
}