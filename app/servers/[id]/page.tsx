import { NextPage } from "next";

interface PageProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

const ServerPage: NextPage<PageProps> = ({ params }) => {
  const { id } = params;
  return <div>Server Page {id}</div>;
};

export default ServerPage;
