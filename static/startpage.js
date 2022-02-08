import {User} from "./user.js"

export class Startpage{
    constructor(){
        this.kontejner=null;
    }

    drawStartpage(host){
        this.kontejner=document.createElement("div");
        this.kontejner.className="kont";
        let logform=document.createElement("div");
        logform.className="logform";
        let regform=document.createElement("div");
        regform.className="regform";



        let pom1=document.createElement("div");
        let lab1=document.createElement("label");
        lab1.innerHTML="Username";
        let in1=document.createElement("input");
        in1.className="in1";
        pom1.appendChild(lab1);
        pom1.appendChild(in1);
        logform.appendChild(pom1);

        let pom2=document.createElement("div");
        let lab2=document.createElement("label");
        lab2.innerHTML="Password";
        let in2=document.createElement("input");
        in2.className="in2";
        in2.type="password";
        pom2.appendChild(lab2);
        pom2.appendChild(in2);
        logform.appendChild(pom2);

        let btn1=document.createElement("button");
        btn1.innerHTML="Login";
        btn1.onclick=(ev)=>{
            if(in1.value=="" || in2.value==""){
                alert("Insert username and password!");
                return;
            }

            fetch("http://localhost:5000/login",{

                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    username:in1.value,
                    password: in2.value
                })
            })
            .then(response=>response.json())
            .then(data => {
                if(data["status"]=="ok"){
                    const n = new User(in1.value, data["my_photos"]);
                    n.drawUser(document.body);
                }else{
                    alert("Pogresni podaci, ili korisnik ne postoji, molimo vas pokusajte ponovo!");
                }
            }).catch(p => {
                alert("Greška prilikom prijave.");
            });
        }
        
        logform.appendChild(btn1);


        let pom3=document.createElement("div");
        let lab3=document.createElement("label");
        lab3.innerHTML="Username";
        let in3=document.createElement("input");
        in3.className="in3";
        pom3.appendChild(lab3);
        pom3.appendChild(in3);
        regform.appendChild(pom3);

        let pom4=document.createElement("div");
        let lab4=document.createElement("label");
        lab4.innerHTML="Password";
        let in4=document.createElement("input");
        in4.className="in4";
        in4.type="password";
        pom4.appendChild(lab4);
        pom4.appendChild(in4);
        regform.appendChild(pom4);

        let btn3=document.createElement("button");
        btn3.innerHTML="Register";
        btn3.onclick=(ev)=>{
            if(in3.value=="" || in4.value==""){
                alert("Insert username and password!");
                return;
            }

            fetch("http://localhost:5000/register",{

                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    username:in3.value,
                    password: in4.value
                })
            })
            .then(response=>response.json())
            .then(data => {
                if(data["status"]=="ok"){
                    const n = new User(in3.value, []);
                    n.drawUser(document.body);
                }else{
                    alert("Korisnik vec postoji, pokusajte ponovo!");
                }
            }).catch(p => {
                alert("Greška prilikom registracije.");
            });
        }
        
        logform.appendChild(btn1);
        regform.appendChild(btn3);

        this.kontejner.appendChild(logform);
        this.kontejner.appendChild(regform);

        host.appendChild(this.kontejner);
        
    }
}