function load(){
    let req=new XMLHttpRequest();
    req.open("get","http://localhost:8080/WebService/list")
    req.onload=function(){
        let todos=JSON.parse(req.response)
        todos.forEach(todo => {
            addToTable(todo)
        });
    }
    req.send();
}
function addToTable(todo)
{
    let tr=document.createElement("tr");
    let td1=document.createElement("td");
    let td2=document.createElement("td");
    let td3=document.createElement("td");
   // let button = document.createElement("button");
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.id=todo.name
    td3.innerHTML="<button onClick=\"deleteTodo('"+ todo.name+"')\">ok</button>"
   // td3.appendChild(button)
    //button.innerText = "delete";
    td1.innerText=todo.name
    td2.innerText=todo.desc
    document.getElementById("tbody").appendChild(tr)
}
let formData;
let btn=document.getElementById("btn");
btn.addEventListener('click',function(){
    let name=document.getElementById("name").value
    let desc=document.getElementById("desc").value
    let req=new XMLHttpRequest()
    req.open("post","http://localhost:8080/WebService/add")
    req.onload=function()
    {
        console.log(req.response)
        if(req.response=="1"){
            let todo=new Object();
            todo.name=name;
            todo.desc=desc;
            addToTable(todo)
        }
        else{
            alert('error')
        }
        
    }
   formData=new FormData();
    formData.append("name",name)
    formData.append("desc",desc)
    console.log(formData)
    req.send(formData)
})

async function deleteTodo(nom){

    let formData = new FormData();
    formData.append("nom",nom);
  /*  fetch("http://localhost:8080/WebService/delete",{
        "method":"post",
        "body":formData
    }).then(data=>{
        console.log(data)
    }).catch(err=>{console.log(err)})*/
    let data = await fetch("http://localhost:8080/WebService/delete",{
        "method":"post",
        "body":formData
    })
    //console.log(await data.text())
    data.text().then(res=>{
        if(res=="1")
        {
          document.getElementById(nom).remove()
        }
        else
        alert("error")
    })
    console.log("apres appel");
}

load();