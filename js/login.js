$(function(){
    // 登录
    $(".submit").click(async function(e){
        let account = $(".userName").val().trim();
        let password = $(".userPass").val().trim();

        if(account === "" || password === ""){
            alert("账号或密码不能为空~");
            return;
        }
        // 加密
        password = md5(password);
        // console.log(account,password);
        
        // ajax请求
        // axios.post("/user/login",{
        //     account,
        //     password
        // }).then(value=>{
        //     console.log(value)
        // }).catch(err=>{
        //     console.log(err)
        // })

        let res = await axios.post("/user/login",{account,password});
        console.log(res);
        if(parseInt(res.code) === 0){
            alert("登录成功~");
            window.location.href = "index.html";
            return ;
        }
        alert("用户名或密码输入错误~");
    })
})