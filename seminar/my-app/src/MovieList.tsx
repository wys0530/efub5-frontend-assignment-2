import { Fragment, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

export interface Page {
  Search: Movie[]; // 검색된 영화 목록
  totalResults: string; // 검색된 모든 결과의 수
  Response: string; // 'True' or 'False'
}
export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export default function MovieList() {
  const [searchText, setSearchText] = useState("");
  const [queryText, setQueryText] = useState("");

  const {
    data, // 가져온 데이터
    isLoading, // 첫 페이지 가져오는 중
    isFetching, // 다음 페이지 가져오는 중
    isFetched, // 첫 페이지 가져오기 완료
    hasNextPage, // 다음 페이지가 있는지 여부
    fetchNextPage, // 다음 페이지 가져오기 함수
  } = useInfiniteQuery<Page>({
    queryKey: ["movies", queryText], // 검색어로 쿼리 키 생성!
    queryFn: async ({ pageParam }) => {
      const res = await fetch(
        `https://omdbapi.com/?apikey=7035c60c&s=${queryText}&page=${pageParam}`
      );
      return res.json();
    },
    initialPageParam: 1, // 첫 페이지 번호 초기화!
    getNextPageParam: (lastPage, pages) => {
      // 한 페이지당 최대 10개까지의 영화 정보를 가져옴!
      // 마지막 페이지 번호 계산!
      const maxPage = Math.ceil(
        Number.parseInt(pages[0].totalResults, 10) / 10
      );

      // 다음 페이지가 있으면, 다음 페이지 번호 반환!
      if (lastPage.Response === "True" && pages.length < maxPage) {
        return pages.length + 1;
      }
      // 다음 페이지가 없으면 undefined | null 반환!
      return null;
    },
    enabled: Boolean(queryText), // 검색어 입력 전까지 대기!
    staleTime: 1000 * 60 * 60, // 1시간
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // 검색!
    setQueryText(searchText);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchText}
          placeholder="영화 제목을 입력하세요."
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="submit">검색</button>
      </form>
      <div>
        {data?.pages.map((page, index) => (
          // 각 페이지의 출력 최적화를 위해, 페이지 단위 key 속성을 추가!
          <Fragment key={index}>
            {page.Search &&
              page.Search.map((movie) => (
                <div key={movie.imdbID}>{movie.Title}</div>
              ))}
          </Fragment>
        ))}
      </div>
      {isLoading ? <div>로딩 중..</div> : null}
      {isFetched && hasNextPage && (
        <button disabled={isFetching} onClick={() => fetchNextPage()}>
          {isFetching ? "로딩 중.." : "더 보기!"}
        </button>
      )}
    </>
  );
}
