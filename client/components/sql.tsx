import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { format } from "sql-formatter";

type Props = { sql: string };

const SQL = ({ sql }: Props) => {
  return (
    <SyntaxHighlighter
      language="sql"
      style={oneDark}
      wrapLongLines
      customStyle={{
        borderRadius: "8px",
        boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.05)",
      }}
    >
      {format(sql, {
        tabWidth: 2,
        logicalOperatorNewline: "before",
        newlineBeforeSemicolon: false,
      })}
    </SyntaxHighlighter>
  );
};

export default SQL;
