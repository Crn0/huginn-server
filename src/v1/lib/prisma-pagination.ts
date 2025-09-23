export type PaginationDirection = "forward" | "backward" | "none";

export interface PaginationProps {
  before: string | undefined;
  after: string | undefined;
  pageSize: number;
}

export interface Pagination {
  skip: 0 | 1;
  take: number;
  cursor?: { id: string };
  direction: PaginationDirection;
}

export interface PaginationCursor {
  before: string | undefined;
  after: string | undefined;
}

const getDirection = (
  before: string | undefined,
  after: string | undefined
): PaginationDirection => {
  if (after) return "forward";
  if (before) return "backward";

  return "none";
};

export const toPrismaPagination = ({ before, after, pageSize }: PaginationProps) => {
  const id = before ?? after;
  const direction = getDirection(before, after);

  const pagination = {
    direction,
    skip: direction === "none" ? 0 : 1,
    take: (direction === "backward" ? -1 : 1) * (pageSize + 1),
  } as Pagination;

  if (id) {
    pagination.cursor = { id };
  }

  return pagination;
};
