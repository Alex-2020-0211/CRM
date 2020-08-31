// axios二次封装
axios.defaults.baseURL = "http://127.0.0.1:8888";

// 数据形式-表单
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

// name=3&age=4形式
axios.defaults.transformRequest = function(data){
    if(!data) return data;
    let result = ``;
    for (let attr in data){
        if(!data.hasOwnProperty(attr)) break;
        result += `&${attr}=${data[attr]}`;
    }
    return result.substring(1);
}

// 请求拦截器
axios.interceptors.request.use(config=>{
    return config;
})

// 响应拦截器
axios.interceptors.response.use(response=>{
    return response.data;
},reason=>{
    // console.dir(reason);
    if(reason.response){
        switch (String(reason.response.status)){
            case "404":
                alert("此地址不存在~");
                break;
            default:
                break;
        }
    }
    return Promise.reject(reason);
})