html, body {
  margin: 0;
  padding: 0;
  width:100%;
  overflow:hidden;
}
menu{
margin: 0;
padding: 0;
width:100%;
}
canvas {
  display: block;
}
input {
    width:10vw;
    overflow:hidden;
}
input[type=file]::file-selector-button{
  border: 1px solid #222222;
  height:10vh;
  color:white;
  background-color: #333333;
  cursor: pointer;
  text-decoration:none;
  width:10vw;
  -webkit-user-select: none;

}
button{
  border: 1px solid #222222;
  height:10vh;
  color:white;
  background-color: #333333;
  cursor: pointer;
  float:left;
  text-decoration:none;
  width:10vw;
  -webkit-user-select: none;

}
button:hover,input[type=file]::file-selector-button:hover {
  background-color: #555555;
  border: 2px solid #333333;
}
