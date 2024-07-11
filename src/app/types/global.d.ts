interface fetchRepoFxProps {
  user: string;
  name: string;
}

interface fetchReposFxProps {
  repoName: string | null;
  after: string | null | undefined;
}

interface reposTableProps {
  reposLoading: boolean;
  reposEff: reposEffType | null;
  currentPage: number;
  pageSize: number;
}

interface SearchFormProps {
  setRepoName: React.Dispatch<React.SetStateAction<string | null>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setAfter: React.Dispatch<React.SetStateAction<string | null>>;
  setPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  className: string;
  children: React.ReactNode;
}

interface InputProps {
  type: HTMLInputTypeAttribute | undefined;
  className: string;
  placeholder: string;
  value: string | null;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}

interface ButtonProps {
  className: string;
  type: "submit" | "reset" | "button" | undefined;
  tittle: string | number;
  onClickFn?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  pagesCount: number;
}

// ТИПЫ ДЛЯ РЕПОЗИТОРИЯ
interface LangEdgesType {
  node: {
    id?: string;
    name?: string;
    __typename?: string;
  }
}

interface RepoEffType  {
  name: string;
  description: string | null;
  pushedAt: Date;
  updatedAt: Date;
  stargazerCount: number;
  url: string;
  __typename: string;
  owner : {
    avatarUrl: string;
    login: string;
    __typename: string;
  }
  languages: {
    edges: LangEdgesType[];
    totalCount: number;
    __typename: string;
  };
}

// ТИП ДЛЯ РЕПОЗИТОРИЕВ
type HistoryEdges = {
  node: {
    committedDate: Date;
    __typename: string;
  }
}

type ReposEdgesType = {
  node : {
    id: string;
    name: string;
    stargazerCount: number;
    url: string;
    __typename: string;
    defaultBranchRef: {
      target: {
        history: {
          edges: HistoryEdges[];
          totalCount: number;
          __typename: string;
        }
        __typename: string;
      }
      __typename: string;
    }
    owner: {
      login: string;
      __typename: string;
    }
  }
}

type reposEffType = {
  edges: ReposEdgesType[];
  pageInfo: {
    endCursor: string | null;
    startCursor: string | null;
    __typename: string;
  }
  repositoryCount: number;
  __typename: string;
}
