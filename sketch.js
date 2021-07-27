let img = []; // images array
let grid;
let imouse;
let imgNum = 0; //number of images
let selected = null; //currently selected image
let dragging; // mouse dragging boolean
let keyCounter; //timer for keypressed to keyisdown
let zoom = 1; //shift-zoom scale value
let magLock=false;
let sL = false; //shift lock
let gO=false; //grid overlay
let cT=true; // clear toggle lock
let lock=false; // mouse input lock
let menu;
let c;
document.addEventListener('gesturestart', function(e) {
  e.preventDefault();
});
function preload(){
  grid = loadImage('grid.jpg');
}
function windowResized() {
   c = createCanvas(windowWidth,windowHeight-(windowHeight/10));
  getFileLoader();
}
function setup(){
  
  c = createCanvas(windowWidth,windowHeight-(windowHeight/10));
  c.position(0,(windowHeight/10));
  input = createFileInput(handleFile);

  menu = new Menu();
  getFileLoader(); //startup menu
  c.drop(gotFile);


}
function lockTogg(){
  if(lock==false){
    lock=true;
    menu.lock.style('background-color',"#ff5c33")
  }
  else{
    lock=false;
    menu.lock.style('background-color',"#333333")
  }
}
function clearTogg(){
  if(cT==false){
    cT=true;
    menu.clear.style('background-color',"#4d9900")
  }
  else{
    cT=false;
    menu.clear.style('background-color',"#333333")
  }
}
function gridOverlay(){
  if(gO==false){
    gO=true;
    menu.grid.style('background-color',"#4d9900")
  }
  else{
    gO=false;
    menu.grid.style('background-color',"#333333")
  }
}
function gridSnap(){
  if(magLock ==false){
    magLock=true;
    menu.magLock.style('background-color',"#4d9900")
  }
  else{
    magLock=false;
    menu.magLock.style('background-color',"#333333")
  }
}
function shiftLock(){
  if(sL==false){
    sL=true;
    zoom=5;
    menu.shift.style('background-color',"#4d9900")
  }
  else{
    sL=false;
    zoom=1;
    menu.shift.style('background-color',"#333333")
  }
}



function getFileLoader(){ //load main menu to instruct image drop
    background(220);
  textAlign(CENTER);
  fill(0)

    noStroke();
  text('drop image or browse', width / 2, height / 2);
  
  
}

function draw(){
  
  if(imgNum>0){  //if there are images, draw them
    if(gO){
      gridDraw();
    }
    else{
      if(cT){
      background(220);
      }
      else{
        background(220,1)
      }
    }

    
    
    for(let i = 0; i < imgNum;i++){
      img[i].display();
    }
  }
}
function gridDraw(){
  imageMode(CORNER);
  image(grid,0,0,width,width)
}
function handleFile(file) {
  if (file.type === 'image') {
    img[imgNum] = new imageBox(imgNum);
    img[imgNum].img = createImg(file.data, '').hide();
    selected = imgNum
    imgNum++
    
  } 
  else {
    print("Incorrect file type. Please use .png or .jpg only")
  }
}
function gotFile(file) { //image file has been dropped onto the canvas
  if(file.subtype=='png'||file.subtype=='jpg'||file.subtype=='jpeg'){
  img[imgNum] = new imageBox(imgNum); //create a new image box
  img[imgNum].img = createImg(file.data,'').hide(); //set img box's img to dropped img
  selected= imgNum //set selected image to dropped image
  imgNum++ //setup for next dropped image
  }
  else{
    print("Incorrect file type. Please use .png or .jpg only")
  }
}
class imageBox{
  constructor(i){
    this.img= 0;//initliaze img
    this.loc = createVector(width/2,height/2); //image location
    this.index = i; //image array index
    this.sx=1 //image width scale
    this.sy=1 //image height scale
    this.update();
    this.preloaded=false;

  }
  load(){
    if(this.img.width<width){
    this.sx = width/3;//update w/h since dropped images arent preloaded
    this.sy = this.img.height/(this.img.width/this.sx);
    }
    else{
      this.sx = this.img.width/3;
      this.sy = this.img.height/3;
    }
  }
  update(){
    
    controller(); //user input control function
  }
  display(){
    if(this.img.width!=null&this.preloaded==false){
      this.preloaded=true;
      this.load();
    }
    this.update();
    imageMode(CENTER); //center images
    rectMode(CENTER);
    if(this.index==selected){ //if image is selected add a border
      stroke(sin(millis()/100)*125+125,0,0,150);
      strokeWeight(5)
    }
    else{
      noStroke();
    }
    //rect is used to draw border around the image
    noFill();
    
    if(magLock&&selected==this.index){
    img[selected].loc = createVector(round(this.loc.x/10)*10,round(this.loc.y/10)*10)
    }
    rect(this.loc.x,this.loc.y,this.sx,this.sy)
    image(this.img,this.loc.x,this.loc.y,this.sx,this.sy);

    
    
  }
}
function mousePressed(){
  pressed(mouseX,mouseY)
}
function touchStarted() {
  pressed(0,0)
}

function pressed(mx,my){
  if(lock==false){
    imouse= createVector(mx,my)
  if(dragging==false){ //check if dragging is false to make sure you dont deselect
    let anySelect =false; //setup no selection variable
  for(let i = 0; i < imgNum;i++){ //check if mouse is within boxes radius
      let m = createVector(mx,my);
      let l = (img[i].loc);
      let s = createVector(img[i].sx,img[i].sy)
      if(m.x>l.x-s.x/2&m.x<l.x+s.x/2&m.y>l.y-s.y/2&m.y<l.y+s.y/2){
        anySelect=true; //something has been selected
        selected = i; //set selection to currently selected box
      }
      
      
    }
    if(anySelect==false){ //if nothing has been selected, set selection to null
      if(mx>0&mx<width&my>0&my<height){
      selected=null;
      }
      
    }
  }
  }
}


function mouseReleased(){//stop dragging
  released(mouseX,mouseY);
}
function released(mx,my){
  if(mx>0&mx<width&my>0&my<height){
  dragging=false;
  }
}


function mouseDragged(){ //drag image if an image is selected
  dragged(mouseX,mouseY,pmouseX,pmouseY);
}

function dragged(mx,my,px,py){
  if(lock==false){
    
    let pM=createVector(px-imouse.x,py-imouse.y)
    if(pM.mag()>5){//prevent accidental dragging by setting a drag deadzone
  dragging=true; //set dragging boolean to true
  if(selected!=null){
    img[selected].loc = createVector(mx,my)
    
  }
  }
  }
}

function controller(){ //input controlls
  keyCounter++; //if timer has surpassed 15 switch to keyisdown instead of keyreleased
  if(keyCounter>15){
    controls();
  }
}
function mouseWheel(event){ //scale image from scroll wheel
  if(lock==false){
  if(selected!=null){
    if(event.delta!=0){
    let scalar = 1-(zoom/event.delta)//exponential scaling
    img[selected].sx*=scalar; 
      img[selected].sy*=scalar; 
    }
  }
  }
}
function controls(){
  if(keyIsDown(76)){ // lock controls - L
    lockTogg();
  }
  if(keyIsDown(67)){//clear toggle -- c
    clearTogg();
  }
  if(lock==false){
  if(keyIsDown(71)){ //grid overlay --g
      gridOverlay();
      
    }
  if(keyIsDown(32)){ //alt key location locking
      gridSnap();
    }
  if(keyIsDown(16)){ //turbo mode -- shift
    shiftLock();
  }
  if(selected!=null){
    if(keyIsDown(17)){
      if(keyIsDown(83)){
        sav();
      }
    }
    let snapExtra=0
    if(magLock){
      snapExtra =2;
    }
    if(keyIsDown(UP_ARROW)){ //move up
      img[selected].loc.y-=zoom*2;
    }
    if(keyIsDown(DOWN_ARROW)){ //move down
      img[selected].loc.y+=zoom*2;
    }
    if(keyIsDown(LEFT_ARROW)){ //move left
      img[selected].loc.x-=zoom*2;
    }
    if(keyIsDown(RIGHT_ARROW)){ //move right
      img[selected].loc.x+=zoom*2;
    }
    
    if(keyIsDown(219)){ //'[' = scale down
      zoomOut();
    }
    if(keyIsDown(221)){ // ']' = scale up
      zoomIn();
    }
    if(keyIsDown(46)){ // del key
      del();
    }
    
    
      
      
  }
  }
}
function sav(){
saveCanvas(c, 'canvas', 'jpg');
}
function del(){
  
      
      img.splice(selected,1);
      for(let i = 0; i < img.length; i++){
        img[i].index = i;
      }
      imgNum--;
      if(imgNum<0){
        imgNum=0;
      }
      selected=null
      
      getFileLoader();
}
function keyPressed(){ //keypressed controls
  
  keyCounter = 0; //start timer for keyisdown
  controls();
    
}
function zoomIn(){
  let scalar = 1+zoom/10
  if(selected!=null){
  img[selected].sx*=scalar
    img[selected].sy*=scalar
  }
}
function zoomOut(){
  print("zoomout")
  let scalar = 1/(1+zoom/10)
  if(selected!=null){
      img[selected].sx*=scalar
    img[selected].sy*=scalar
  }
}
