var dog , dogImg , happyDogImg , database , foodS , foodStock ;
var feed , addFood ;
var fedTime , lastFed ;
var foodObj ;

function preload()
{ 
  dogImg = loadImage("images/dogImg.png") ;
  happyDogImg = loadImage("images/dogImg1.png") ;
  Milk = loadImage("images/Milk.png")
}

function setup() {
  createCanvas(500, 500);
  
  foodObj =new Food() ;

  database = firebase.database() ;
  foodStock = database.ref("food") ;
  foodStock.on("value", readStock) ;
  foodStock.set(20) ;

  dog = createSprite(250,350,10,60) ;
  dog.addImage(dogImg) ;
  dog.scale = 0.2 ;

  feed = createButton("Feed The Dog") ;
  feed.position(570,95) ;
  feed.mousePressed(feed) ;

  addFood = createButton("Add Food") ;
  addFood.position(700,95) ;
  addFood.mousePressed(addFood) ;
}


function draw() {  
 background("green") ;

 fedTime = database.ref("FoodTime") ;
 fedTime.on("value",function(data){
   lastFed = data.val() ;
 })

 fill(255) ;
 textSize(20) ;
 if(lastFed >=12){
   text("Last Feed : " + lastFed % 12 +"PM" , 350,30) ;
 }else if(lastFed==0){
   text("last feed : 12 AM",350,30) ;
 }else{
   text("last feed : " + lastFed +"Am" , 350,30) ;
 }

 foodObj.display() ;
 
  drawSprites();
  

}

function writeStock(x){
  if(x<=0){
    x = 0 ;
  }
  else{
    x = x-1 ;
  }
  database.ref("/").update({
    Food:x
  }) ;
}

function readStock(data){
  foodS = data.val() ;
}

function feed(){
  dog.addImage(happyDogImg) ;
  foodObj.updateFoodStock(foodObj.getFoodSrock() - 1)
  database.ref('/').update({
    Food: foodObg.getFoodStock() ,
    FeedTime : hour() 
  })
}

function addFood(){
  foodS++ ;
  database.ref('/').update({
    Food : foodS
  })
}

