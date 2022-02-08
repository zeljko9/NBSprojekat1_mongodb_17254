export class User{
    constructor(usr, mp){
        this.container=null;
        this.name=usr;
        this.my_photos=mp;
    }

    drawUser(host){
        let fd=document.getElementsByClassName("kont")[0];
        fd.remove();
        this.kontejner=document.createElement("div");
        this.kontejner.className="kont";
        let pom=document.createElement("p");
        pom.innerHTML="caooo";

        host.appendChild(this.kontejner);
        this.kontejner.appendChild(pom);
    }
}