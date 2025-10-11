import React, { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import "./App.css";
import * as S from "./App.styles.js";

// 한 번에 불러오는 데이터의 개수 정의
export const DATA_LIMIT = 5;

// getPosts 함수 정의
export const getPosts = async ({ pageParam = 0 }) => {
  const response = await fetch(
    `https://dummyjson.com/products?limit=${DATA_LIMIT}&skip=${
      pageParam * DATA_LIMIT
    }`
  );
  return response.json();
};

const App = () => {
  const [target, setTarget] = useState(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const { total, skip, limit } = lastPage;
      const currentPage = allPages.length - 1;
      return total >= skip + limit * 2 ? currentPage + 1 : undefined;
    },
  });

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && hasNextPage) {
      observer.unobserve(entry.target);
      await fetchNextPage();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.2 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  if (isFetching && !isFetchingNextPage) {
    return <div>fetching</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <S.Container>
      {data.pages.map((group, idx) => (
        <React.Fragment key={idx}>
          {group.products.map(({ id, title, price, stock, images }) => (
            <S.ProductCard key={`product_${id}`}>
              <S.ProductImage src={images[0]} alt="images" />
              <S.ProductDetails>
                <p>{title}</p>
                <p>품번: {id}</p>
                <p>재고: {stock}</p>
                <p>가격: ${price}</p>
              </S.ProductDetails>
            </S.ProductCard>
          ))}
        </React.Fragment>
      ))}
      <S.LoadMoreButton ref={setTarget}>
        {hasNextPage ? "다음 아이템 불러오기" : "마지막 아이템"}
      </S.LoadMoreButton>
    </S.Container>
  );
};

export default App;

//실습 코드 1

// import React from "react";
// import "./App.css";

// // 한 번에 불러오는 데이터의 개수 정의
// export const DATA_LIMIT = 5;

// // getPosts 함수 정의
// export const getPosts = async ({pageParam = 0}) => {
//   const response = await fetch(
//     `https://dummyjson.com/products?limit=${DATA_LIMIT}&skip=${ /* skip 해야하는 데이터의 개수 계산 */ }`
//   );
//   return response.json();
// };

// const App = () => {
//   return;
// };

// export default App;

//실습코드 2

// const {
//     data,
//     error,
//     fetchNextPage,
//     hasNextPage,
//     isFetching,
//     isFetchingNextPage,
//   } = useInfiniteQuery({
//     queryKey: ["posts"],
//     queryFn: getPosts,
//     initialPageParam: 0,
//     getNextPageParam: (lastPage, allPages) => {
//       const { total, skip, limit } = lastPage;
//       const currentPage = /* 현재 페이지를 계싼하는 식을 적어주세요 */ ;  //참고: allPages는 지금까지 가져온 모든 페이지 응답의 "배열"
//       return total >= skip + limit * 2 ? /* 삼항 연산자의 리턴 값을 완성해주세요 */ ;
//     },
//   });

//실습코드 3
// return (
//     <S.Container>
//       {data.pages.map((group, idx) => (
//         <React.Fragment key={idx}>
//           {group.products.map(({ id, title, price, stock, images }) => (
//             <S.ProductCard key={`product_${id}`}>
//               <S.ProductImage src={images[0]} alt="images" />
//               <S.ProductDetails>
//                 <p>{title}</p>
//                 <p>품번: {id}</p>
//                 <p>재고: {stock}</p>
//                 <p>가격: ${price}</p>
//               </S.ProductDetails>
//             </S.ProductCard>
//           ))}
//         </React.Fragment>
//       ))}
//       <S.LoadMoreButton ref={setTarget}>
//         {hasNextPage ? "다음 아이템 불러오기" : "마지막 아이템"}
//       </S.LoadMoreButton>
//     </S.Container>
//   );
