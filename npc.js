class Npc{
    constructor(x,y,r){
        var options={
            isStatic:true,
            restitution:0,
            friction:1,
            density:0.2
        }
        this.body=Bodies.circle(x,y,r,options)
        this.image=loadImage("NPC1.png")
        this.r=r
        World.add(world,this.body)
    }
    display(){
        push()
     
     translate(this.body.position.x,this.body.position.y)
     rotate(this.body.angle)
     strokeWeight(2)
     stroke("black")
     imageMode(CENTER)
     image(this.image, 0, 0, this.r,this.r)
     pop()
    }
}