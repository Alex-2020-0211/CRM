$(function(){
    init();

    // 发布
    let $plan = $.Callbacks();
    $plan.add((_,baseInfo)=>{
        console.log("登录",baseInfo)
        $(".baseBox>span").html(`你好,${baseInfo.name || ''}`);
        // 退出登录
        $(".baseBox>a").click(async function(){
            let result = await axios.get("/user/signout");
            if(result.code == 0){
                // 退出登录成功
                window.location.href = "login.html";
                return ;
            }
            // 退出登录失败
            alert("当前网络不给力，请稍后再试~");
        })
    })
    $plan.add((power)=>{
        console.log("渲染",power)
    })
    
    async function init(){
        // 判断用户是否已登录
        let result = await axios.get("/user/login");
        // console.log(result);
        if(result.code != 0 ){
            alert("您尚未登录，请登录~");
            window.location.href = "login.html";
            return ;
        }
        // 已登录
        let [power,baseInfo] = await axios.all([
            axios.get("/user/power"),
            axios.get("/user/info")
        ])
        // console.log(power);
        // console.log(baseInfo);

        baseInfo.code === 0 ? baseInfo = baseInfo.data : null;

        $plan.fire(power,baseInfo);
    }
})