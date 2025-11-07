// import type Post from "../../app/models/post";
// import type { WithId } from "mongodb";
// import axios from "axios";
import Link from "next/link";

// const List = async () => {
//   const readPostList = async (): Promise<WithId<Post>[]> => {
//     try {
//       const response = await axios.get(
//         "http://localhost:3000/api/post/readList"
//       );
//       return response.data;
//     } catch (error) {
//       if (error instanceof Error) throw new Error(error.message);
//       else throw new Error("알 수 없는 오류가 발생했습니다.");
//     }
//   };

//   const posts: WithId<Post>[] = await readPostList();
//   // posts를 활용해서 JSX 반환

//   return (
//     <div className="list-bg">
//       {result.map((a, i) => {
//         return (
//           <div className="list-item" key={i}>
//             <Link href={"/detail/" + result[i]._id}>
//               <h4>{a.title}</h4>
//             </Link>

//             <Link href={"/edit/" + result[i]._id}>✏️</Link>

//             <p>1월 1일</p>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default List;

import type Post from "../models/post";
import type { WithId } from "mongodb";
import axios from "axios";
import ListItem from "./ListItem";

const List = async () => {
  const readPostList = async (): Promise<WithId<Post>[]> => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/post/readList"
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      else throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  };

  const result: WithId<Post>[] = await readPostList();

  return (
    <div className="list-bg">
      <ListItem result={result} />
    </div>
  );
};

export default List;
