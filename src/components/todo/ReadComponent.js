import React, {useEffect, useState} from 'react';
import {getOne} from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
    tno:0,
    title:'',
    writer:'',
    dueDate: '',
    complete: false
}

function ReadComponent({tno}) {

    const [todo, setTodo] = useState(initState)

    // Custom Hook
    const {moveToList} = useCustomMove()

    // 함수영 Component가 상태를 유지할 수 있도록 씀

    useEffect(()=>{

        getOne(tno).then(data => {
            console.log(data)
            setTodo(data)
        })

   //[] 의존성 / 어떤상태가 되었을때 이함수를 동작시킬것이냐는 뜻
   //[tno]가 바뀔때만 함수 동작
    },[tno]);


    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {makeDiv('Tno', todo.tno)}
            {makeDiv('Writer', todo.writer)}
            {makeDiv('Title', todo.title)}
            {makeDiv('Due Date', todo.dueDate)}
            {makeDiv('Complete', todo.complete ? 'Completed': 'Not Yet')}

            <div className="flex justify-end p-4">
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                        onClick={() => moveToList()}
                >
                    List
                </button>
            </div>


        </div>
    );
}

// JSX 리턴
const makeDiv = (title, value) =>
    <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w 1/5 p-6 text-right font-bold">{title}</div>
            <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
                {value}
            </div>
        </div>
    </div>

export default ReadComponent;