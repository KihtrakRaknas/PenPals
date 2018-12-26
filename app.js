var cart=[];



    var options = {
    fullWidth: true,
    indicators: true,
  }
  var cartModal = M.Modal.init(document.getElementById("modal1"),{});
    document.addEventListener('DOMContentLoaded', function() {


      console.log(cartModal);
      //M.Modal.getInstance(document.getElementById("modal1"));
      var elems = document.querySelectorAll('.carousel');
      var carInstances = M.Carousel.init(elems, options);

      document.getElementById("mainslider").style.height = document.getElementsByTagName("IMG")[1].naturalHeight*screen.width/document.getElementsByTagName("IMG")[1].naturalWidth-100 + "px";

      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems, {});

      var elems = document.querySelectorAll('.parallax');
      var instances = M.Parallax.init(elems, {});

      var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {});

      setInterval(function(){
        for(ins of carInstances){
          ins.next();
        }
      },5000)

      updateCart();
    });

    var artworks = document.getElementById("artworks");

function drawCards(){
for(card in cardInfo){

      var colDiv = document.createElement("DIV");
        colDiv.classList.add("col");
        colDiv.classList.add("s12");
        colDiv.classList.add("m6");
        var cardDiv = document.createElement("DIV");
          cardDiv.classList.add("card");
          var cardImgDiv = document.createElement("DIV");
            cardImgDiv.classList.add("card-image");
            var cardImg = document.createElement("IMG");
              cardImg.classList.add("activator");
              cardImg.src = cardInfo[card].image // IMG GOES HERE
            cardImgDiv.appendChild(cardImg)
            var cardImgSpan = document.createElement("SPAN");
              cardImgSpan.classList.add("card-title");
              cardImgSpan.classList.add("activator");
              cardImgSpan.innerText = card // NAME OF CARD GOES HERE
            cardImgDiv.appendChild(cardImgSpan)
            var cardImgA = document.createElement("A");
              cardImgA.classList.add("btn-floating");
              cardImgA.classList.add("halfway-fab");
              cardImgA.classList.add("waves-effect");
              cardImgA.classList.add("waves-light");
              cardImgA.classList.add("red");
              cardImgA.classList.add("activator");
              var cardImgAI = document.createElement("I");
                cardImgAI.classList.add("material-icons");
                cardImgAI.innerHTML = "add";
              cardImgA.appendChild(cardImgAI)
            cardImgDiv.appendChild(cardImgA)
          cardDiv.appendChild(cardImgDiv)
          var cardContentDiv = document.createElement("DIV");
            cardContentDiv.classList.add("card-content");
            var cardContentDivP = document.createElement("P");
              cardContentDivP.innerText = "$" + (cardInfo[card].price).toFixed(2); //PRICE GOES HERE
            cardContentDiv.appendChild(cardContentDivP)
          cardDiv.appendChild(cardContentDiv)
          var cardRevealDiv = document.createElement("DIV");
            cardRevealDiv.classList.add("card-reveal");
            var cardRevealDivSpan = document.createElement("SPAN");
              cardRevealDivSpan.classList.add("card-title");
              cardRevealDivSpan.classList.add("grey-text");
              cardRevealDivSpan.classList.add("text-darken-4");
              cardRevealDivSpan.innerText = card // NAME OF CARD GOES HERE
              var cardRevealDivSpanI = document.createElement("I");
                cardRevealDivSpanI.classList.add("material-icons");
                cardRevealDivSpanI.classList.add("right");
                cardRevealDivSpanI.innerHTML = "close";
              cardRevealDivSpan.appendChild(cardRevealDivSpanI)
            cardRevealDiv.appendChild(cardRevealDivSpan)
            var cardRevealDivP = document.createElement("P");
              cardRevealDivP.classList.add("flow-text");
              cardRevealDivP.innerText = cardInfo[card].description //DESC goes here
            cardRevealDiv.appendChild(cardRevealDivP)
            if(cardInfo[card].customText){
            var cardRevealDivTextAreaText = document.createElement("TEXTAREA");
              cardRevealDivTextAreaText.id = card+"_text";
              cardRevealDivTextAreaText.classList.add("materialize-textarea");
              cardRevealDivTextAreaText.placeholder = "Costum requests regarding the text here!"
            cardRevealDiv.appendChild(cardRevealDivTextAreaText)
            }
            var cardRevealDivTextBR = document.createElement("BR");
            cardRevealDiv.appendChild(cardRevealDivTextBR);
            if(cardInfo[card].customColor){
            var cardRevealDivTextAreaColor = document.createElement("TEXTAREA");
              cardRevealDivTextAreaColor.id = card+"_color";
              cardRevealDivTextAreaColor.classList.add("materialize-textarea");
              cardRevealDivTextAreaColor.placeholder = "Costum requests regarding the color here!"
            cardRevealDiv.appendChild(cardRevealDivTextAreaColor)
            }
            cardRevealDiv.appendChild(cardRevealDivTextBR)
            var cardRevealDivDiv = document.createElement("DIV");
              cardRevealDivDiv.style.textAlign = "center";
              var cardRevealDivDivA = document.createElement("BUTTON");
                cardRevealDivDivA.classList.add("waves-effect");
                cardRevealDivDivA.classList.add("waves-light");
                cardRevealDivDivA.classList.add("btn-large");
                cardRevealDivDivA.dataset.card = card;
                cardRevealDivDivA.onclick=function() {order(this.dataset.card)};
                var cardRevealDivDivAI = document.createElement("I");
                  cardRevealDivDivAI.classList.add("material-icons");
                  cardRevealDivDivAI.classList.add("right");
                  cardRevealDivDivAI.innerHTML = "add";
                cardRevealDivDivA.appendChild(cardRevealDivDivAI)
                cardRevealDivDivA.innerHTML += "Add to Order";
              cardRevealDivDiv.appendChild(cardRevealDivDivA)
            cardRevealDiv.appendChild(cardRevealDivDiv)
          cardDiv.appendChild(cardRevealDiv)
      colDiv.appendChild(cardDiv)
    artworks.appendChild(colDiv)
}
}

drawCards();
function order(card){
  cartModal.open();
  M.toast({html: 'Added a '+card+" to your cart!"})
  var cosText = document.getElementById(card+"_text");
  var cosCol = document.getElementById(card+"_color");
  var mess = null;
  var col = null;
  if(cosText!=null){
    mess = cosText.value;
    cosText.value="";
  }
  if(cosCol!=null){
    col = cosCol.value;
    cosCol.value="";
  }

  cart.push({
    Title: card,
    "Costum Message": mess,
    "Costum Color": col,
  })
  updateCart();

  document.getElementById("artworks").innerHTML = "";
  drawCards();
}
function updateCart(){
  var totalCost = 0;


  var cartDisplay = document.getElementById("cartCards");
  cartDisplay.innerHTML="";
  var loopNum=0;
  for(item of cart){
    totalCost+=cardInfo[item.Title].price;
    var itemDiv = document.createElement("DIV");
      itemDiv.style.height = "20vh";
      itemDiv.style.border = "solid";
      itemDiv.style.borderRadius = "5px";
      itemDiv.style.padding = "5px";
      itemDiv.style.overflowY = "scroll";
      var itemDivImg = document.createElement("IMG");
        itemDivImg.style.maxWidth = "100%";
        itemDivImg.style.maxHeight = "100%";
        itemDivImg.style.marginRight = "5px";
        itemDivImg.align = "left";
        itemDivImg.src = cardInfo[item.Title].image;
      itemDiv.appendChild(itemDivImg)
      var itemDivP = document.createElement("P");
        var itemDivPTitle = document.createElement("STRONG");
          itemDivPTitle.innerText = "Title: ";
        itemDivP.appendChild(itemDivPTitle)
        itemDivP.innerText += item.Title;
        if(item["Costum Message"]){
          itemDivP.appendChild(document.createElement("BR"));
          var itemDivPTitle = document.createElement("STRONG");
            itemDivPTitle.innerText = "Costum Message: ";
          itemDivP.appendChild(itemDivPTitle)
          itemDivP.innerText += item["Costum Message"];
        }
        if(item["Costum Color"]){
          itemDivP.appendChild(document.createElement("BR"));
          var itemDivPTitle = document.createElement("STRONG");
            itemDivPTitle.innerText = "Costum Color: ";
          itemDivP.appendChild(itemDivPTitle)
          itemDivP.innerText += item["Costum Color"];
        }
        itemDivP.appendChild(document.createElement("BR"));
        var itemDivPCost = document.createElement("STRONG");
          itemDivPCost.innerText = "Price: ";
        itemDivP.appendChild(itemDivPCost)
        itemDivP.innerText += "$" + (cardInfo[item.Title].price).toFixed(2);
      itemDiv.appendChild(itemDivP)
      var itemDivTrash = document.createElement("A");
        itemDivTrash.dataset.loopNum = loopNum;
        itemDivTrash.onclick = function() {
          console.log(this.dataset.loopNum);
          cart.splice(this.dataset.loopNum, 1); //TODO: DELETE ELEMENT FROM ARRAY NOT WORKING
          updateCart();
        };
        itemDivTrash.classList.add("btn");
        var itemDivTrashI = document.createElement("I");
          itemDivTrashI.classList.add("material-icons");
          itemDivTrashI.innerHTML = "delete";
        itemDivTrash.appendChild(itemDivTrashI)
      itemDiv.appendChild(itemDivTrash)
    cartDisplay.appendChild(itemDiv);
    cartDisplay.appendChild(document.createElement("BR"));

    loopNum++;
  }
  document.getElementById("total").innerText="$" + totalCost.toFixed(2);


  if(cart.length !=0 ){
    var emailMessage = "";
    var count = 0;
    for(var cardselem of cart){
      count++;
      console.log(cardselem);
      emailMessage+="Item #"+count+":%0DType: "+cardselem["Title"]+"%0D"
      if(cardselem["Costum Message"]!="")
        emailMessage+="Costum Message: "+cardselem["Costum Message"]+"%0D"
      if(cardselem["Costum Color"]!="")
        emailMessage+="Costum Color: "+cardselem["Costum Color"]+"%0D"

      emailMessage+="%0D%0D"
    }
    document.getElementById("submitBtn").href='mailto:penpals.fundraising@gmail.com?subject=Card Order Request&body=Hi,%0DI would like to purchase the following cards:%0D%0D'+emailMessage
  }else{
    document.getElementById("submitBtn").href="#"
  }


}

function orderEmail(){
  if(cart.length !=0 ){
    /*var emailMessage = "";
    var count = 0;
    for(var cardselem of cart){
      count++;
      console.log(cardselem);
      emailMessage+="Item #"+count+":%0DType: "+cardselem["Title"]+"%0D"
      if(cardselem["Costum Message"]!="")
        emailMessage+="Costum Message: "+cardselem["Costum Message"]+"%0D"
      if(cardselem["Costum Color"]!="")
        emailMessage+="Costum Color: "+cardselem["Costum Color"]+"%0D"

      emailMessage+="%0D%0D"
    }
    window.open('mailto:penpals.fundraising@gmail.com?subject=Card Order Request&body=Hi,%0DI would like to purchase the following cards:%0D%0D'+emailMessage);
    focus();*/
  }else{
    alert("Your cart is empty!");
  }

}
