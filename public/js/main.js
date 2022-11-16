setTimeout(() => {
  document.querySelector('.alert').remove();
},2000 );


let box = document.querySelector('.scrolling')
let tbody = document.getElementsByTagName('tr')

  if(tbody.length >= 8) 
  box.style = "height: 400px; width:100%; overflow-y: scroll;scrollbar-width: thin;";
