import SnippetHeader from "@/client/components/pages/snippet/snippet-header";
import SQLDisplay from "@/client/components/pages/snippet/sql-display";
import Visualizations from "@/client/components/pages/snippet/visualizations";
import { executeSQL } from "@/server/modules/db/db.service";
import { getSnippetById } from "@/server/modules/snippet/snippet.service";
import { auth } from "@clerk/nextjs";

type Props = {
  params: {
    snippetId: string;
  };
};

const Page = async ({ params: { snippetId } }: Props) => {
  const { userId } = auth();

  const snippetData = await getSnippetById(userId!, snippetId);

  if (!snippetData) {
    return <div>Snippet not found</div>;
  }

  const data = executeSQL(snippetData.sql);

  return (
    <div className="h-[calc(100vh-60px)] space-y-2 overflow-y-scroll p-4">
      <div>
        <SnippetHeader name={snippetData.name} snippetId={snippetId} />
        <p className="text-gray-500">
          Created at: {snippetData.createdAt.toISOString().split("T")[0]}
        </p>
      </div>
      <SQLDisplay sql={snippetData.sql} />
      <Visualizations data={data} />
    </div>
  );
};

export default Page;
