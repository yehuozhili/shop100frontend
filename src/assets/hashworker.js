self.importScripts('https://cdn.bootcss.com/spark-md5/3.0.0/spark-md5.js')


self.onmessage = async (event) => {
    let { partList } = event.data
    const spark = new self.SparkMD5.ArrayBuffer()
    let percent = 0
    let perSize = 100 / partList.length
    let res = await Promise.all(partList.map(({ chunk, size }) => new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsArrayBuffer(chunk)//读取每个chunk,转成arraybuffer
        reader.onload = function (event) {
            percent += perSize
            self.postMessage({ percent: Number(percent.toFixed(2)) })
            resolve(event.target.result)
        }
    })))
    res.forEach((item) => { spark.append(item) })//必须单独拿出来append，因为每个chunk不一样，会导致上面循环顺序不对，从而使得最后算出的hash不一样
    self.postMessage({ percent: 100, hash: spark.end() })
    self.close()
}


