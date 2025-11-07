import { connectDB, postCollection } from "@/utils/database";
import { ObjectId } from "mongodb";

export default async function Edit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const result = await postCollection.findOne({ _id: new ObjectId(id) });

  return (
    <div>
      <h5>수정 페이지</h5>
      <form action="api/post/edit" method="POST">
        <input
          type="text"
          name="title"
          placeholder="제목"
          defaultValue={result?.title}
        />
        <input
          name="content"
          placeholder="내용"
          defaultValue={result?.content}
        />
        <input
          style={{ display: "none" }} //아이디는 유저에게 안 보이는 것이 좋으니까 none으로 안 보이게 설정
          name="_id"
          defaultValue={result?._id.toString()}
        />
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}
