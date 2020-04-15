// import React, { useState, useRef, useEffect, forwardRef } from 'react';
// import { Icon, message} from 'antd';
// import './index.less'
// import axios from '@/api';

// const DefaultSize = 1024*1024  //1mb分片

// function validateFile(file: File){
//     const isValideType=['image/jpeg','image/png','image/gif'].includes(file.type)
//     if(!isValideType){
//         message.error('不支持的文件类型')
//     }
//     const isValideDate=file.size<1024*1024*1024 //单位字节 1024字节=1kb 1024k = 1mb ...
//     if(!isValideDate){
//         message.error('上传文件过大')
//     }
//     return isValideType&&isValideDate
// }

// interface ChunkPart{
//     chunk: Blob;
//     size: number;
//     chunkIndex: number;
//     start?: number;
// }
// interface VerifyData{
//     needUpload: boolean;
//     success: boolean;
//     uploadList: Array<{
//         chunkName: string;
//         size: number;
//     }>;
// }

// function createChunks(file: File){
//     let current = 0;
//     const partList: ChunkPart[]=[]
//     while(current <file.size){
//         const chunk = file.slice(current,DefaultSize+current)
//         partList.push({chunk,size:chunk.size,chunkIndex:current})
//         current+=DefaultSize
//     }
//     return partList
// }
// function createHash(partList: ChunkPart[]){
//     return new Promise((res)=>{
//         const worker=new Worker('public/hashworker.js')
//         worker.postMessage({partList})
//         worker.onmessage=function(event){
//             const {percent ,hash}=event.data
//             console.log(percent,hash)
//             if(hash){
//                 res(hash)
//             }
//         }
//     })
// }
// async function uploadRequest(partList: ChunkPart[],filename: string){
//     const res: VerifyData = await axios.get(`/verify/${filename}`)
//     if(res.needUpload){
//         if(res.uploadList.length!==0){
//             //先过滤出需要上传的分片
//             const solveList = partList.filter((item)=>{
//                 const uploadedItem = res.uploadList.find((it)=>it.chunkName===`${filename}-${item.chunkIndex}`)
//                 if(!uploadedItem){
//                     item.start =0
//                     return true
//                 }
//                 if(uploadedItem.size<item.size){
//                     item.start = uploadedItem.size
//                     return true
//                 }
//                 return false
//             })
//             const requestList = solveList.map(((item: ChunkPart)=>
//             axios.post(`/user/splitupload/${filename}/${filename}-${item.chunkIndex}/${item.start}`,
//                 item.chunk,
//                 {headers:{'Content-Type':'application/octet-stream'}}
//             )))
//             await Promise.all(requestList)
//             await axios.get(`/user/merge/${filename}`)
//             message.success('续传成功')
//         }else{
//             const requestList = partList.map((item: ChunkPart)=>
//             axios.post(`/user/splitupload/${filename}/${filename}-${item.chunkIndex}/${0}`,
//                 item.chunk,
//                 {headers:{'Content-Type':'application/octet-stream'}}
//             ))
//             await Promise.all(requestList)
//             await axios.get(`/user/merge/${filename}`)
//             message.success('上传成功')
//         }

//     }else{
//         message.success('秒传完成')
//     }
// }

// function SpliceUpload(ref: any){
//     const [currentFile,setCurrentFile]=useState<File>()
//     const [objectURL,setObjectURL]=useState<string>()
//     const fileRef = useRef<HTMLInputElement>(null)
//     const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
//         if(e.target.files){
//             const file = e.target.files[0]
//             setCurrentFile(file)

//         }
//     }
//     const handleUpload=()=>{
//         if(fileRef.current){
//             fileRef.current.click()
//         }
//     }
//     const handleSubmit=async()=>{
//         if(!currentFile){
//             return message.error('未选择文件')
//         }
//         if(!validateFile(currentFile))return
//         const partList = createChunks(currentFile)
//         //计算哈希
//         const flieHash = await createHash(partList)
//         //获取扩展名
//         const extname =currentFile.name.slice(currentFile.name.lastIndexOf('.'))
//         const fname = `${flieHash}${extname}`
//         await uploadRequest(partList,fname)
//     }
//     useEffect(()=>{
//         if(currentFile){
//             const reader = new FileReader()
//             reader.addEventListener('load',()=>setObjectURL(reader.result as string))
//             reader.readAsDataURL(currentFile)
//         }
//     },[currentFile])
//     return(
//     <div className='spliceupload'>
//         <input type="file" onChange={handleChange} ref={fileRef}
//             style={{display:'none'}}
//         />
//         <div className='uploadicon' onClick={handleUpload}>
//             {
//                 !objectURL&&<Icon type='upload'></Icon>
//             }
//             {//有url显示图片
//                 objectURL&&<img src={objectURL} style={{width:'100%',height:'100%'}}></img>
//             }

//         </div>
//         <button onClick={handleSubmit} ref={ref} style={{display:'none'}}> 提交</button>
//     </div>)
// }

// export default forwardRef(SpliceUpload)
