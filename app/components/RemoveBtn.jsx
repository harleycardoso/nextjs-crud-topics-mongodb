"use client"
import { FaTrashCan } from "react-icons/fa6";
import { useRouter } from "next/navigation";
export default function RemoveBtn({id}) {
  const router = useRouter();
  const removeTopic = async() => {
    const confirmed = confirm("Delete?");
    if(confirmed){
      try{
        const res = await fetch(`http://localhost:3000/api/topics?id=${id}`,{
          method: "DELETE",
        });
        if(res.ok){
          router.refresh();
        }
      }catch(error){
        console.log(error)
      }
    }
    
  };
  return (
    <button onClick={removeTopic}>
      <FaTrashCan className="text-red-400" size={16}/>
    </button>
  )
}
