
import Link from 'next/link';
import RemoveBtn from './RemoveBtn';
import { FaPencil } from "react-icons/fa6";

const getTopicList = async () => {
  try{
    const res = await fetch("http://localhost:3000/api/topics",{cache:"no-store",});
    if(!res.ok){
      throw new Error("Falied to fetch topics");
    }
    return await res.json();
  }catch(error){
    console.log("Error loading topics:",error);
  }
}

export default async function TopicList() {
  const  topics  = await getTopicList();
  console.log(topics);
  return (
    <>
      {topics?.map((topic) => (
        <div className='p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start'>
            <div>
                <h2 className='font-bold text-2xl'>{topic.title}</h2>
                <div>{topic.description}</div>
            </div>
            <div className='flex gap-2'>
                <RemoveBtn/>
                <Link href={`/editTopic/${topic._id}`}>
                <FaPencil size={16}/>
                </Link>
                
            </div>
        </div>
        ))}
    </>
  )
}
