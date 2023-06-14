function onLoadDetalhes(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var idProduto = urlParams.get('idProduto');
    //Chama a função fazGet passando a URL da API de Categories
    let APIResponse = fazGet("https://diwserver.vps.webdock.cloud/products/" + idProduto);
    //Atribui o resultado da chamada da API à variável responseText
    let responseText = JSON.parse(APIResponse.responseText);

    let imgProduto = document.getElementById("imgProduto");
    imgProduto.src = responseText.image;
    
    let detalhesProduto = document.getElementById("detalhesProduto");
    detalhesProduto.innerHTML = 
    "<h3><b>" + responseText.title + " </b><br></h3>" +
    "<b>Price:</b> U$" + responseText.price + "<br>" +
    "<b>Color: </b> " + responseText.baseColour + "<br>" +           
    "<b>Gender: </b> " + responseText.gender + " <br>" +
    "<b>Usage: </b> " + responseText.usage + " <br>" +
    "<b>Year: </b> " + responseText.year + " <br>" +
    "<b>Description: </b>" + responseText.description;
}



onLoadDetalhes();