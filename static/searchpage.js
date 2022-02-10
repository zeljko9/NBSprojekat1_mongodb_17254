export class Searchpage{
    constructor(u, mp, ap){
        this.container=null;
        this.my_photos=mp;
        this.all_photos=ap;
        this.username=u;
    }

    drawSearchpage(host){
        document.getElementsByClassName("kont")[0].remove();

        this.container=document.createElement("div");
        this.container.className="kont";
        host.appendChild(this.container);

        let photosform=document.createElement("div");
        photosform.classList="inputform";
        this.container.appendChild(photosform);

        this.all_photos.forEach(photo => {
            if(!this.my_photos.includes(photo)){
                let imgg=document.createElement("img");
                imgg.src=photo;
                imgg.width=100;
                imgg.height=100;
                photosform.appendChild(imgg);
            }
        });

        let requestform=document.createElement("div");
        requestform.className="requestform";
        this.container.appendChild(requestform);

        let lab1=document.createElement("label");
        lab1.innerHTML="Select picture to request: ";
        requestform.appendChild(lab1);

        let in1=document.createElement("input");
        requestform.appendChild(in1);

        let btn1=document.createElement("button");
        btn1.innerHTML="Request and wait";
        btn1.onclick=(ev)=>{
            if(in1.value=="" || parseInt(in1.value)<1 || parseInt(in1.value)>this.all_photos.length){
                alert("Please insert valid photo number!");
                return;
            }

            fetch("http://localhost:5000/askForPhoto",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    username:this.username,
                    imgsrc: this.all_photos[parseInt(in1.value)]
                })
            })
            .then(response=>response.json())
            .then(data => {
                if(data["status"]=="ok"){
                    alert("Successfully asked for new photo!");
                }
                else{
                    alert("Unsuccessfully asked for new photo, please try again later!");
                }
            })
            .catch(p => {
                alert("Error, please try again later!");
            });
        }
        requestform.appendChild(btn1);
    }
}