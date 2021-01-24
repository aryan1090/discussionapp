
{/* <div class="onequestion">
<h1>Question</h1>
<p>Description</p>
</div> */}
var count=1;
var question = [
    {
        id:0,
        subject:"Web Dev",
        des:"What is DEV?",
        response:[
            {
                name:"Amit",
                ans:"dsjfjkhdskjhfkjshjkdf dfkjhsdkjfhjsdhf khdfkjsdjfsd khdfkjsdkjfhskjhkjdfh dhffkjsdhfkjs"
            }
        ]
    }
];
function addQues(){
    var sub = document.getElementById("subject");
    var des = document.getElementById("des");
    var new_obj={
        id:count,
        subject:sub.value,
        des:des.value,
        response:[]

    }
    question.push(new_obj);
    count++;
    console.log(question);
    var mainques = document.getElementsByClassName("questions")[0];
    var quesdiv = document.createElement("div");
    var subject = document.createElement("h1");
    var description = document.createElement("p");
    description.innerHTML = des.value;
    subject.innerHTML = sub.value;
    quesdiv.setAttribute("class","onequestion");
    quesdiv.appendChild(subject);
    quesdiv.appendChild(description);
    sub.value="";
    des.value="";
    mainques.appendChild(quesdiv);


}